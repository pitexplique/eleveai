import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePourcentages6e,
  slidesPourcentages6e,
} from "@/lib/fiches/maths-6e-pourcentages";

export const metadata: Metadata = {
  title: "Les pourcentages — fiche de cours 6e | EleveAI",
  description:
    "Définition, lien avec les fractions et les décimaux, exemples corrigés et exercices : la fiche de cours complète des pourcentages en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function PourcentagesSixiemePage() {
  return (
    <FicheCoursClient fiche={fichePourcentages6e} slides={slidesPourcentages6e} />
  );
}
