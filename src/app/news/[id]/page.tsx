import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import Image from "next/image";

interface IProps {
  params: {
    id: string;
  };
}

async function SingleNews({ params: { id } }: IProps) {
  const client = new PrismaClient();
  const news = await client.news.findFirst({
    where: {
      id: {
        equals: BigInt(id),
      },
    },
    include: {
      tags: true,
    },
  });
  return news ? (
    <div>
      {news.title} {id}
      <Image
        src={`${process.env.NEXT_PUBLIC_AZ_STORAGE_CONTAINER_URL}${news.image}`}
        width="600"
        height="300"
        alt={news.title}
      />
      <Separator />
      <p>{news.description}</p>
      <div>
        {news.tags.map((c) => (
          <Badge key={`badge_${c.id}`} variant="secondary">
            {c.name}
          </Badge>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default SingleNews;

export const revalidate = 36000;
export const dynamicParams = false;

export async function generateStaticParams() {
  const client = new PrismaClient();

  const ids = await client.news.findMany({
    select: {
      id: true,
    },
  });

  return ids.map((id) => {
    id: id?.toString();
  });
}

export function generateMetadata({ params: { id } }: IProps): Metadata {
  return {
    title: `News with id ${id}`,
  };
}
