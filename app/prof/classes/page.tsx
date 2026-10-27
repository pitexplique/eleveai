import type { Metadata } from "next";
import MesClassesClient from "./MesClassesClient";

export const metadata: Metadata = {
  title: "Mes classes",
  robots: { index: false, follow: false },
};

export default function MesClassesPage() {
  return <MesClassesClient />;
}
