"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import AppCalendarAddEvent from "./AppCalendarAddEvent";
import { isAfter, getDate } from "date-fns";
import { PlusCircleIcon } from "lucide-react";
import { useCallback, useState } from "react";
import type { IAppCalendarEvent } from "../../Types";
import { Event } from "@prisma/client";
import { eventSchema } from "../../validation";
import { ValidationError } from "yup";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface IProps {
  events: Event[];
}

function AppCalendar({ events }: IProps) {
  const [baseDate, setBaseDate] = useState<Date>(new Date());
  const { toast } = useToast();
  const router = useRouter();

  const addNewEvent = useCallback(async (event: IAppCalendarEvent) => {
    try {
      console.log(event);
      const eventValidated = await eventSchema.validate(event);
      await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
    } catch (err) {
      const validationErr = err as ValidationError;
      
      toast({
        title: "An error occured",
        content: validationErr.message,
      });
    }

    router.refresh();
  }, []);

  const deleteEvent = useCallback(async (event: IAppCalendarEvent) => {
    if (event.id) {
      await fetch(`/api/events?id=${event.id}`, {
        method: "DELETE",
        credentials: "include",
      });
    }

    router.refresh();
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
