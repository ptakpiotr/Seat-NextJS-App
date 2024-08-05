"use client";

import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { PlusCircleIcon } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";
import type { IContextMenuOption } from "../../Types";

interface IProps {
  options: IContextMenuOption[];
}

function SeatContextMenu({ options }: IProps) {
  return (
    <ContextMenuContent>
      <ContextMenuItem>
        <DrawerTrigger
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          Add <PlusCircleIcon />
        </DrawerTrigger>
      </ContextMenuItem>
      {options.map((opt) => (
        <ContextMenuItem
          key={opt.label}
          onClick={opt.onClick}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {opt.label} {opt?.icon}
        </ContextMenuItem>
      ))}
    </ContextMenuContent>
  );
}

export default SeatContextMenu;
