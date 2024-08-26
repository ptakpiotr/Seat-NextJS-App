"use server";
import { PrismaClient } from "@prisma/client";
import { BlobServiceClient } from "@azure/storage-blob";
import { uuid } from "uuidv4";
import { newsSchema } from "../../validation";

export const handleNewsFormSubmit = async (formData: FormData) => {
  const title = formData.get("title");
  const image = formData.get("image") as File;
  const description = formData.get("description");

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
      },
    });
  } catch (err) {
    console.error(err);
  }
};
