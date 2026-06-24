import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheRobot } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — L'IA incarnée et la robotique",
  description:
    "Percevoir, décider, agir : l'IA incarnée dans les robots. Fiche de cours IA (référentiel Pix, Fondements).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheRobot} />;
}
