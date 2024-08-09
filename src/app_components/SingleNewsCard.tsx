import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { IBasicNews } from "../../Types";

type Props = IBasicNews;

function SingleNewsCard({ author, categories, id, image, title }: Props) {
  return (
    <Link href={`/news/${id}`}>
      <Card
        style={{
          padding: "1rem",
          margin: "1rem",
          maxWidth: "50vw",
        }}
      >
        <CardContent
          style={{
            padding: "0.5rem",
            margin: "0.5rem",
          }}
        >
          <CardHeader
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Avatar>
              <AvatarImage src={author.image} />
              <AvatarFallback>{author.name.substring(2)}</AvatarFallback>
            </Avatar>
            <h1>{title}</h1>
          </CardHeader>
          <CardDescription>
            <Image src={image} width="600" height="350" alt={title} />
          </CardDescription>
          <CardFooter>
            {categories.map((c) => (
              <Badge key={`badge_${c.id}`} variant="secondary">
                {c.name}
              </Badge>
            ))}
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
}

export default SingleNewsCard;
