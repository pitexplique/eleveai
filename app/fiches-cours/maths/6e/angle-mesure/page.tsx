import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAngles6e, slidesAngles6e } from "@/lib/fiches/maths-6e-angles";

export const metadata: Metadata = {
  title: "Les angles — fiche de cours 6e",
  description:
    "Définition, propriétés, méthode au rapporteur, exemples corrigés et exercices : la fiche de cours complète des angles en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function AnglesSixiemePage() {
  return <FicheCoursClient fiche={ficheAngles6e} slides={slidesAngles6e} />;
}
