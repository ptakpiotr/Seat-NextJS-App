import type { ReactNode } from "react";

export interface IContextMenuOption {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

export interface IRectDimensions {
  width: number;
  height: number;
}

export interface ICircleDimensions {
  radius: number;
}

export interface IReservation {
  isReserved: boolean;
  by?: string;
}

export interface IObject {
  id: string;
  coords: {
    x: number;
    y: number;
  };
  type?: ObjectMode;
  rotation: number;
  dimensions: IRectDimensions | ICircleDimensions;
  reservation: IReservation;
}

export type ManagableObject = Omit<IObject, "id" | "coords">;

export interface IManagedObjectContext {
  object?: Partial<IObject>;
  manageObject?: (object: Partial<ManagableObject>) => void;
}

export interface ISeatObjectsContext {
  objects?: IObject[];
  addObject?: (object: IObject) => void;
}

export enum ObjectMode {
  RECT,
  CIRCLE,
}
