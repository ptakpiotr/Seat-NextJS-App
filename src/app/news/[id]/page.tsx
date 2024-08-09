import { Metadata } from "next";
import Image from "next/image";

interface IProps {
  params: {
    id: string;
  };
}

function SingleNews({ params: { id } }: IProps) {
  return (
    <div>
      SingleNews {id}
      <Image
        src="https://images.unsplash.com/photo-1700519141361-268fcb0390ea?q=80&w=326&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width="600"
        height="300"
        alt="News image"
      />
    </div>
  );
}

export default SingleNews;

export const revalidate = 36000;
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    {
      id: "1",
    },
    {
      id: "2",
    },
  ];
}

export function generateMetadata({ params: { id } }: IProps): Metadata {
  return {
    title: `News with id ${id}`,
  };
}
