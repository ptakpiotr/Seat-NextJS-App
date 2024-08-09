import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ISingleWeather } from "../../Types";
import { format } from "date-fns";
import {
  SunriseIcon,
  SunsetIcon,
  ThermometerIcon,
  ThermometerSnowflakeIcon,
} from "lucide-react";
import Image from "next/image";
import descriptions from "../../wmo_descriptions.json";

type Props = ISingleWeather;

function WeatherSingleItem({
  sunrise,
  sunset,
  temp_max,
  temp_min,
  weather_code,
}: Props) {
  const imageSrc =
    descriptions[weather_code?.toString() as keyof typeof descriptions].day
      .image;

  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <Card>
        <Image
          src={imageSrc}
          width="100"
          height="100"
          alt="Weather code image"
          style={{ position: "absolute" }}
        />
        <CardContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "2rem",
            padding: "2rem",
          }}
        >
          <Card>
            <CardContent>
              <ThermometerSnowflakeIcon />{" "}
              <span style={{ color: "lightblue" }}>{temp_min}</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <ThermometerIcon />{" "}
              <span style={{ color: "tomato", fontWeight: "500" }}>
                {temp_max}
              </span>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "1rem",
          }}
        >
          <Card>
            <CardContent style={{ fontSize: "0.5rem", display: "flex" }}>
              <SunriseIcon size={24} />
              {format(Date.parse(sunrise), "yyyy-MM-dd hh:mm")}
            </CardContent>
          </Card>
          <Card>
            <CardContent style={{ fontSize: "0.5rem", display: "flex" }}>
              <SunsetIcon size={24} />
              {format(Date.parse(sunset), "yyyy-MM-dd hh:mm")}
            </CardContent>
          </Card>
        </CardFooter>
      </Card>
    </CarouselItem>
  );
}

export default WeatherSingleItem;
