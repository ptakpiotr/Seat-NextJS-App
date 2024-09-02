import HomeCard from "@/app_components/HomeCard";
import type { Metadata } from "next";

export default function Home() {
  return (
    <main className="mainPage">
      <HomeCard
        href="/about"
        imageSrc="https://images.unsplash.com/photo-1703437837573-de358e01943d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="About"
      />
      <HomeCard
        href="/calendar"
        imageSrc="https://images.unsplash.com/photo-1718815628185-2ff0f9332b32?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Calendar"
      />
      <HomeCard
        href="/news"
        imageSrc="https://images.unsplash.com/photo-1565478441918-ba8d56c559a9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="News"
      />
      <HomeCard
        href="/planner"
        imageSrc="https://images.unsplash.com/photo-1672928386554-c48b7bba5268?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Planner"
      />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Planner - Home page",
};
