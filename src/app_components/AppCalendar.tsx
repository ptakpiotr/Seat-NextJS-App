"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import AppCalendarAddEvent from "./AppCalendarAddEvent";
import { isAfter, getDate } from "date-fns";
import { PlusCircleIcon } from "lucide-react";
import { useCallback, useState } from "react";
import type { IAppCalendarEvent } from "../../Types";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function AppCalendar() {
  const [events, setEvents] = useState<IAppCalendarEvent[]>([]);
  const [baseDate, setBaseDate] = useState<Date>(new Date());

  const addNewEvent = useCallback((event: IAppCalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  }, []);

  const deleteEvent = useCallback((event: IAppCalendarEvent) => {
    setEvents((prev) => {
      return [
        ...prev.filter((p) => p.start !== event.start && p.info !== event.info),
      ];
    });
  }, []);

  return (
    <div style={{ height: "90vh" }}>
      <Drawer>
        <Calendar<IAppCalendarEvent>
          localizer={localizer}
          startAccessor="start"
          events={events}
          onDoubleClickEvent={deleteEvent}
          components={{
            month: {
              dateHeader: ({ date }) => {
                if (isAfter(date, new Date())) {
                  return (
                    <DrawerTrigger
                      onClick={() => {
                        setBaseDate(date);
                      }}
                    >
                      {getDate(date)}
                      <PlusCircleIcon />
                    </DrawerTrigger>
                  );
                }
                return <>{getDate(date)}</>;
              },
              event: (e) => {
                return <div>{e.event.info}</div>;
              },
            },
          }}
        />
        <AppCalendarAddEvent date={baseDate} addEvent={addNewEvent} />
      </Drawer>
    </div>
  );
}

export default AppCalendar;
