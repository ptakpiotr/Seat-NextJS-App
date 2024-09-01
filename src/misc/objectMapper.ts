import {
  Object,
  Coords,
  Dimensions,
  ObjectMode as DbObjectMode,
  Reservation,
} from "@prisma/client";
import { IObject, ObjectMode } from "../../Types";

type ObjectWithAdditionalProperties = Object & {
  dimensions: Dimensions;
  coords: Coords;
  reservation: Reservation | null;
};

export const mapDbObjectToAppObject = (
  obj: ObjectWithAdditionalProperties
): IObject => {
  const appObject: IObject = {
    id: obj.id,
    type: obj.type === DbObjectMode.RECT ? ObjectMode.RECT : ObjectMode.CIRCLE,
    rotation: obj.rotation,
    reservation: obj.reservation
      ? {
          isReserved: true,
          by: obj.reservation.by ? obj.reservation.by : undefined,
        }
      : undefined,
    coords: {
      ...obj.coords,
    },
    dimensions: {
      ...obj.dimensions,
    },
  };

  return appObject;
};
