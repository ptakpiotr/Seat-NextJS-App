"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useCallback, useState, createContext, useContext } from "react";
import { PanelBottomCloseIcon } from "lucide-react";
import SeatManageShapePersonalizer from "./SeatManageShapePersonalizer";
import { uuid } from "uuidv4";
import {
  ObjectMode,
  type IManagedObjectContext,
  type IObject,
  type ManagableObject,
} from "../../Types";
import { SeatObjectsContext } from "./SeatWrapper";

export const ManagedObjectContext = createContext<IManagedObjectContext>({});

function SeatManageShape() {
  const { addObject } = useContext(SeatObjectsContext);
  const [managedObject, setManagedObject] = useState<Partial<IObject>>({
    id: uuid(),
    type: ObjectMode.RECT,
    coords: {
      x: 0,
      y: 0,
    },
    rotation: 0,
    reservation: {
      isReserved: false,
      by: "",
    },
  });

  const manageObject = useCallback((object: Partial<ManagableObject>) => {
    setManagedObject((prev) => ({
      ...prev,
      ...object,
    }));
  }, []);

  const addObjectToList = useCallback(() => {
    if (addObject) {
      addObject(managedObject as IObject);
    }
  }, [addObject, managedObject]);

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
            Add new seat
          </DrawerTitle>
          <DrawerClose>
            <Button variant="ghost">
              <PanelBottomCloseIcon />
            </Button>
          </DrawerClose>
        </div>
        <DrawerDescription>
          Manage seat allocation by adding new item
        </DrawerDescription>
        <ManagedObjectContext.Provider
          value={{
            object: managedObject,
            manageObject,
          }}
        >
          <SeatManageShapePersonalizer />
        </ManagedObjectContext.Provider>
      </DrawerHeader>
      <DrawerFooter>
        <Button onClick={addObjectToList}>Submit</Button>
      </DrawerFooter>
    </DrawerContent>
  );
}

export default SeatManageShape;
