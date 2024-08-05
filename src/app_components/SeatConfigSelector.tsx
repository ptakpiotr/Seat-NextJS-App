"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IObject } from "../../Types";

interface IProps {
  setObjects: (newObjects: IObject[]) => void;
}

function SeatConfigSelector() {
  //TODO: get objects
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Configuration" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">First</SelectItem>
        <SelectItem value="dark">Second</SelectItem>
        <SelectItem value="system">Third</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SeatConfigSelector;
