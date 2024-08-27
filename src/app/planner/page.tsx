import { PrismaClient } from "@prisma/client";
import dynamic from "next/dynamic";

const SeatWrapper = dynamic(() => import("@/app_components/SeatWrapper"), {
  ssr: false,
});

async function Planner() {
  const client = new PrismaClient();
  const events = await client.event.findMany({
    where: {
      start: {
        gte: new Date(),
      },
    },
  });
  

  return (
    <div>
      <SeatWrapper isEditable={true} eventsToChoose={events} />
    </div>
  );
}

export default Planner;
