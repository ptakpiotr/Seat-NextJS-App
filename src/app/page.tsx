import type { Metadata } from "next";
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        columnGap: "0.5rem",
      }}
    >
      <Link href="/about">About</Link>
      <Link href="/calendar">Calendar</Link>
      <Link href="/news">News</Link>
      <Link href="/planner">Planner</Link>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Planner - Home page",
};
