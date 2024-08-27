"use server";
import { PrismaClient } from "@prisma/client";
import { BlobServiceClient } from "@azure/storage-blob";
import { uuid } from "uuidv4";
import { newsSchema } from "../../validation";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const handleNewsFormSubmit = async (formData: FormData) => {
  const title = formData.get("title");
  const image = formData.get("image") as File;
  const description = formData.get("description");
  const tags = formData.get("tags");
  const session = await getServerSession();

  if (!session?.user) {
    return;
  }

  const tagsList = tags?.toString()?.split(",");

  try {
    const client = new PrismaClient();
    const blob = BlobServiceClient.fromConnectionString(
      process.env.AZ_STORAGE_CONN_STRING!
    );

    const containerClient = blob.getContainerClient("seat-planner");
    const name = `${uuid()}_${image.name}`;
    const blobClient = containerClient.getBlockBlobClient(name);
    const data = await image.arrayBuffer();
    const uploadInfo = await blobClient.uploadData(data);

    const news = {
      description,
      image: name,
      title,
    };

    const newsValidated = await newsSchema.validate(news);

    await client.news.create({
      data: {
        ...newsValidated,
        tags: {
          create: tagsList?.map((tl) => ({
            name: tl,
          })),
        },
        author: {
          connectOrCreate: {
            create: {
              id: session.user.email!,
              name: session.user.name!,
            },
            where: {
              id: session.user.email!,
            },
          },
        },
      },
    });
    revalidatePath("/news", "page");
  } catch (err) {
    console.error(err);
  }
};
