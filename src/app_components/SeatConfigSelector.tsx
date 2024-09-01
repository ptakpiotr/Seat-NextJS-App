"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Event } from "@prisma/client";

interface IProps {
  events: Event[];
  setEvent: (event: Event) => void;
}

function SeatConfigSelector({ events, setEvent }: IProps) {
  return (
    <Select
      onValueChange={(val: string) => {
        const event = events.find((e) => e.id === parseInt(val));

        if (event) {
          setEvent(event);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Configuration" />
      </SelectTrigger>
      <SelectContent>
        {events.map((ev) => (
          <SelectItem key={`event_${ev.id}`} value={ev.id.toString()}>
            {ev.info}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeatConfigSelector;
