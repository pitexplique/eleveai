import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProbabiliteCM2,
  slidesProbabiliteCM2,
} from "@/lib/fiches/maths-cm2-probabilite";

export const metadata: Metadata = {
  title: "Les probabilités — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des probabilités (le hasard, certain, possible, impossible, comparer les chances avec un dé, une roue, un sac de billes) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function ProbabiliteCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheProbabiliteCM2}
      slides={slidesProbabiliteCM2}
    />
  );
}
