import type { Metadata } from "next";
import PodiumClient from "./PodiumClient";

export const metadata: Metadata = {
  title: "Podium de la classe",
  robots: { index: false, follow: false },
};

export default function PodiumPage() {
  return <PodiumClient />;
}
