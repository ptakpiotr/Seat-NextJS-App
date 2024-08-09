"use client";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import TimePicker from "react-time-picker";
import { useCallback, useState } from "react";
import { format, setHours, setMinutes, addMinutes } from "date-fns";
import { IAppCalendarEvent } from "../../Types";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Button } from "@/components/ui/button";
import { PanelBottomCloseIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface IProps {
  date: Date;
  addEvent: (event: IAppCalendarEvent) => void;
}

function AppCalendarAddEvent({ date, addEvent }: IProps) {
  const [time, onTimeChange] = useState<string | undefined>("12:00");
  const [value, setValue] = useState<string>("");

  const onChange = useCallback((time: any) => {
    onTimeChange(time?.value?.toString() ?? "12:00");
  }, []);

  const addEventToList = () => {
    const hrs = parseInt(time?.split(":")[0] ?? "12");
    const mnts = parseInt(time?.split(":")[1] ?? "0");
    const start = setMinutes(setHours(date, hrs), mnts);
    addEvent({
      start,
      end: addMinutes(start, 10),
      info: value,
    });
  };

  return (
    <DrawerContent>
      <DrawerHeader className="sm:text-center">
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DrawerTitle style={{ flex: 1, marginLeft: "3.5rem" }}>
            Add new event
          </DrawerTitle>
          <DrawerClose>
            <Button variant="ghost">
              <PanelBottomCloseIcon />
            </Button>
          </DrawerClose>
        </div>
        <DrawerDescription>
          Add event at {format(date, "yyyy-MM-dd")}
        </DrawerDescription>
        <TimePicker onChange={onChange} value={time} />
        <Input
          placeholder="Event name"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </DrawerHeader>
      <DrawerFooter>
        <Button onClick={addEventToList}>Submit</Button>
      </DrawerFooter>
    </DrawerContent>
  );
}

export default AppCalendarAddEvent;
