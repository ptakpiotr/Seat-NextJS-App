import NewsContent from "@/app_components/NewsContent";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

async function News() {
  const session = await getServerSession();
  const isLogged = !!session?.user;
  const client = new PrismaClient();
  const data = await client.news.findMany({
    select: {
      description: true,
      id: true,
      image: true,
      tags: true,
      title: true,
    },
  });

  return (
    <div>
      <NewsContent isLogged={isLogged} news={data} />
    </div>
  );
}

export default News;
