"use client";

import AddNews from "@/app_components/AddNews";
import SingleNewsCard from "@/app_components/SingleNewsCard";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { ICardNews } from "../../Types";

interface IProps {
  isLogged: boolean;
  news: ICardNews[];
}

function NewsContent({ isLogged, news }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const manageOpenState = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const closeDrawer = useCallback(() => {
    manageOpenState(false);
  }, [manageOpenState]);

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
            key={n.id?.toString()}
            author={{
              id: n.authorId,
              name: n.author.name,
            }}
            id={n.id?.toString()}
            description={n.description}
            image={`${process.env.NEXT_PUBLIC_AZ_STORAGE_CONTAINER_URL}${n.image}`}
            title={n.title}
            tags={n.tags}
          />
        ))}
      </div>
      <AddNews closeDrawer={closeDrawer} />
    </Drawer>
  );
}

export default NewsContent;
