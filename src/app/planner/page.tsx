"use client";
import dynamic from "next/dynamic";

const SeatWrapper = dynamic(() => import("@/app_components/SeatWrapper"), {
  ssr: false,
});

function Planner() {
  return (
    <div>
      <SeatWrapper isEditable={false} />
    </div>
  );
}

export default Planner;
