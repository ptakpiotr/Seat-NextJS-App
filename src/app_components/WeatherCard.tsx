import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Daily } from "../../Types";
import WeatherSingleItem from "./WeatherSingleItem";

type Props = Daily;

function WeatherCard({
  sunrise,
  sunset,
  temperature_2m_max,
  temperature_2m_min,
  time,
  weather_code,
}: Props) {
  const values = sunrise.map((value, idx) => ({
    sunrise: value,
    sunset: sunset[idx],
    temp_max: temperature_2m_max[idx],
    temp_min: temperature_2m_min[idx],
    time: time[idx],
    weather_code: weather_code[idx],
  }));
  
  return (
    <Carousel>
      <CarouselContent>
        {values.map((val) => (
          <WeatherSingleItem key={`weather_${val.time}`} {...val} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default WeatherCard;
