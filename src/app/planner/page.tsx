import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const SeatWrapper = dynamic(() => import("@/app_components/SeatWrapper"), {
  ssr: false,
});

async function Planner() {
  const client = new PrismaClient();
  const session = await getServerSession();
  const events = await client.event.findMany({
    where: {
      start: {
        gte: new Date(),
      },
      authorId: session?.user?.email ?? "",
    },
  });

  return (
    <div>
      <SeatWrapper isEditable={true} eventsToChoose={events} />
    </div>
  );
}

export default Planner;
