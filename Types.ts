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
  reservation?: IReservation;
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

export interface WeatherForecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Daily {
  time: Date[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

export interface ISingleWeather {
  sunrise: string;
  sunset: string;
  temp_max: number;
  temp_min: number;
  time: Date;
  weather_code: number;
}

export interface IAppCalendarEvent {
  id?: number;
  start: Date;
  end: Date;
  info: string;
}

interface ICategory {
  id: number;
  name: string;
}

interface IAuthor {
  id: string;
  name: string;
}

export interface IBasicNews {
  id: number;
  author: IAuthor;
  image: string;
  title: string;
  categories: ICategory[];
}

export interface ICardNews {
  id: bigint;
  title: string;
  description: string;
  image: string;
  authorId: string;
  tags: {
    id: bigint;
    name: string;
  }[];
  author: {
    id: string;
    name: string;
  };
}
[];

type DailyUnits = {
  [Property in keyof ISingleWeather]: string;
};

export enum ObjectMode {
  RECT,
  CIRCLE,
}
