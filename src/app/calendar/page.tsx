import AppCalendar from "@/app_components/AppCalendar";
import { Metadata } from "next";

function Calendar() {
  return (
    <div>
      <h1>Calendar</h1>
      <br />
      <AppCalendar />
    </div>
  );
}

export default Calendar;
export const metadata: Metadata = {
  title: "Calendar",
};
