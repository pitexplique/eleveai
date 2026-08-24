import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFigurePlaneCM2,
  slidesFigurePlaneCM2,
} from "@/lib/fiches/maths-cm2-figure-plane";

export const metadata: Metadata = {
  title: "Les figures planes — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des figures planes (triangle, carré, rectangle, losange, cercle, côtés, angles droits, rayon, diamètre) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function FigurePlaneCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheFigurePlaneCM2}
      slides={slidesFigurePlaneCM2}
    />
  );
}
