import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDivisionCM2,
  slidesDivisionCM2,
} from "@/lib/fiches/maths-cm2-division";

export const metadata: Metadata = {
  title: "La division — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète de la division (partage, dividende, diviseur, quotient, reste, division posée, lien avec la multiplication) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function DivisionCM2Page() {
  return (
    <FicheCoursClient fiche={ficheDivisionCM2} slides={slidesDivisionCM2} />
  );
}
