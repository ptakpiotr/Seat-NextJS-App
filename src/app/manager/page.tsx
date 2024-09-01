import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const SeatWrapper = dynamic(() => import("@/app_components/SeatWrapper"), {
  ssr: false,
});

async function Manager() {
  const client = new PrismaClient();
  const session = await getServerSession();

  const events = await client.event.findMany({
    where: {
      start: {
        gte: new Date(),
      },
    },
  });

  return (
    <div>
      <SeatWrapper
        isEditable={false}
        userId={session?.user?.email}
        eventsToChoose={events}
      />
    </div>
  );
}

export default Manager;
