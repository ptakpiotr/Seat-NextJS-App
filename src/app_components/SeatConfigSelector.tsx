"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Event } from "@prisma/client";
import { IObject } from "../../Types";

interface IProps {
  events: Event[];
  setObjects?: (newObjects: IObject[]) => void;
}

function SeatConfigSelector({ events }: IProps) {
  return (
    <Select>
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
