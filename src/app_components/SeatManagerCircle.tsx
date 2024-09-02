"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback, useContext } from "react";
import { ManagedObjectContext } from "./SeatManageShape";
import { ObjectMode } from "../../Types";

function SeatManagerCircle() {
  const { manageObject } = useContext(ManagedObjectContext);

  const manageRadius = useCallback((radius: number) => {
    if (manageObject) {
      manageObject({
        type: ObjectMode.CIRCLE,
        dimensions: {
          radius,
        },
      });
    }
  }, [manageObject]);

  return (
    <div>
      <Label htmlFor="radius">Radius</Label>
      <Slider
        id="radius"
        min={20}
        max={50}
        step={1}
        defaultValue={[35]}
        onValueChange={(val) => {
          manageRadius(val[0]);
        }}
      />
    </div>
  );
}

export default SeatManagerCircle;
