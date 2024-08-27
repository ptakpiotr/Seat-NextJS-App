import AppCalendar from "@/app_components/AppCalendar";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

async function Calendar() {
  const client = new PrismaClient();
  const session = await getServerSession();

  const events = await client.event.findMany({
    where: {
      authorId: session!.user!.email!,
    },
  });

  return (
    <div>
      <h1>Calendar</h1>
      <br />
      <AppCalendar
        events={events}
      />
    </div>
  );
}

export default Calendar;
export const metadata: Metadata = {
  title: "Calendar",
};
