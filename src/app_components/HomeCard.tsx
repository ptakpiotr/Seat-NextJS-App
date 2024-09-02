import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  imageSrc: string;
  title: string;
  href: string;
}

function HomeCard({ imageSrc, title, href }: IProps) {
  return (
    <Link href={href} target="_blank">
      <Card className="p-2 m-2">
        <CardTitle className="p-2 m-1">{title}</CardTitle>
        <CardContent>
          <Image alt={title} src={imageSrc} width={600} height={400} />
        </CardContent>
      </Card>
    </Link>
  );
}

export default HomeCard;
