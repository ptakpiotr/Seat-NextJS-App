"use client";

import AddNews from "@/app_components/AddNews";
import SingleNewsCard from "@/app_components/SingleNewsCard";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { News } from "prisma/prisma-client";

interface IProps {
  isLogged: boolean;
  news: News[];
}

function NewsContent({ isLogged, news }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const manageOpenState = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const closeDrawer = useCallback(() => {
    manageOpenState(false);
  }, []);

  return (
    <Drawer open={isOpen}>
      {isLogged && (
        <DrawerTrigger onClick={() => manageOpenState(true)}>
          <Button>
            Add <PlusIcon />
          </Button>
        </DrawerTrigger>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {news.map((n) => (
          <SingleNewsCard
            author={{
              id: 1,
              image: "http://openweathermap.org/img/wn/01d@2x.png",
              name: "Piotr Ptak",
            }}
            id={parseInt(n.id.toString())}
            image={`${process.env.NEXT_PUBLIC_AZ_STORAGE_CONTAINER_URL}${n.image}`}
            title={n.title}
            categories={[]}
          />
        ))}
      </div>
      <AddNews closeDrawer={closeDrawer} />
    </Drawer>
  );
}

export default NewsContent;
