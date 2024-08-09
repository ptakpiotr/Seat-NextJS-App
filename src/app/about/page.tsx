import type { Metadata } from "next";
import { Constants } from "../../../Constants";
import { WeatherForecast } from "../../../Types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WeatherCard from "@/app_components/WeatherCard";
import AboutTechnologies from "@/app_components/AboutTechnologies";

async function About() {
  const data = await fetch(Constants.urls.weatherApi);
  const forecast = (await data.json()) as WeatherForecast;

  return (
    <div>
      <h1>About</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="weather">
          <AccordionTrigger>Weather in Cracow</AccordionTrigger>
          <AccordionContent>
            <WeatherCard {...forecast.daily} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="technologies">
          <AccordionTrigger>Used technologies</AccordionTrigger>
          <AccordionContent>
            <AboutTechnologies />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="project">
          <AccordionTrigger>About project</AccordionTrigger>
          <AccordionContent>
            Simple project created as the practical proof of concept to showcase
            the usage of Next.js with related technologies
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default About;

export const revalidate = 7200;

export const metadata: Metadata = {
  title: "About",
};
