"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback, useContext, useEffect, useState } from "react";
import { ManagedObjectContext } from "./SeatManageShape";
import { IRectDimensions, ObjectMode } from "../../Types";

function SeatManagerSquare() {
  const { manageObject } = useContext(ManagedObjectContext);
  const [dimensions, setDimensions] = useState<IRectDimensions>({
    width: 25,
    height: 25,
  });
  const manageWidth = useCallback((newWidth: number) => {
    setDimensions((prev) => ({
      ...prev,
      width: newWidth,
    }));
  }, []);

  const manageHeight = useCallback((newHeight: number) => {
    setDimensions((prev) => ({
      ...prev,
      height: newHeight,
    }));
  }, []);

  useEffect(() => {
    if (manageObject) {
      manageObject({
        type: ObjectMode.RECT,
        dimensions,
      });
    }
  }, [dimensions]);

  return (
    <div>
      <Label htmlFor="width">Width</Label>
      <Slider
        id="width"
        min={20}
        max={50}
        step={5}
        defaultValue={[35]}
        onValueChange={(val) => {
          manageWidth(val[0]);
        }}
      />
      <Label htmlFor="height">Height</Label>
      <Slider
        id="height"
        min={20}
        max={50}
        step={5}
        defaultValue={[35]}
        onValueChange={(val) => {
          manageHeight(val[0]);
        }}
      />
    </div>
  );
}

export default SeatManagerSquare;
