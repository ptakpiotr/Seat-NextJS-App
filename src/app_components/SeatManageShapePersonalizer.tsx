"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SquareIcon, CircleIcon } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { ObjectMode } from "../../Types";
import SeatManagerSquare from "./SeatManagerSquare";
import SeatManagerCircle from "./SeatManagerCircle";
import { ManagedObjectContext } from "./SeatManageShape";

function SeatManageShapePersonalizer() {
  const { object, manageObject } = useContext(ManagedObjectContext);
  const mode = object?.type ? object.type : ObjectMode.RECT;

  const setShapeMode = useCallback((m: ObjectMode) => {
    if (manageObject) {
      manageObject({
        type: m,
      });
    }
  }, [manageObject]);

  return (
    <div>
      <Label htmlFor="mode">Choose mode</Label>
      <div id="mode">
        <Button
          variant={mode === ObjectMode.RECT ? "default" : "ghost"}
          onClick={() => {
            setShapeMode(ObjectMode.RECT);
          }}
        >
          <SquareIcon />
        </Button>
        <Button
          variant={mode === ObjectMode.CIRCLE ? "default" : "ghost"}
          onClick={() => {
            setShapeMode(ObjectMode.CIRCLE);
          }}
        >
          <CircleIcon />
        </Button>
      </div>
      <Label htmlFor="sizes">Modify the sizes</Label>
      <div id="sizes" style={{ maxWidth: "50%", margin: "0 auto" }}>
        {mode === ObjectMode.RECT ? (
          <SeatManagerSquare />
        ) : (
          <SeatManagerCircle />
        )}
      </div>
    </div>
  );
}

export default SeatManageShapePersonalizer;
