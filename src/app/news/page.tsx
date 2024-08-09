import AddNews from "@/app_components/AddNews";
import SingleNewsCard from "@/app_components/SingleNewsCard";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {PlusIcon} from "lucide-react";

function News() {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Button>Add <PlusIcon /></Button>
        </DrawerTrigger>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SingleNewsCard
            image="http://openweathermap.org/img/wn/01d@2x.png"
            title="Testowy post"
            id={1}
            author={{
              id: 1,
              image: "http://openweathermap.org/img/wn/01d@2x.png",
              name: "Piotr Ptak",
            }}
            categories={[
              {
                id: 1,
                name: "News",
              },
            ]}
          />
          <SingleNewsCard
            image="http://openweathermap.org/img/wn/01d@2x.png"
            title="Testowy post"
            id={1}
            author={{
              id: 1,
              image: "http://openweathermap.org/img/wn/01d@2x.png",
              name: "Piotr Ptak",
            }}
            categories={[
              {
                id: 1,
                name: "News",
              },
            ]}
          />
          <SingleNewsCard
            image="http://openweathermap.org/img/wn/01d@2x.png"
            title="Testowy post"
            id={1}
            author={{
              id: 1,
              image: "http://openweathermap.org/img/wn/01d@2x.png",
              name: "Piotr Ptak",
            }}
            categories={[
              {
                id: 1,
                name: "News",
              },
            ]}
          />
        </div>
        <AddNews />
      </Drawer>
    </div>
  );
}

export default News;
