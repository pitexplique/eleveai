import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheMultiplicationCM2,
  slidesMultiplicationCM2,
} from "@/lib/fiches/maths-cm2-multiplication";

export const metadata: Metadata = {
  title: "La multiplication — fiche de cours CM2 | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète de la multiplication (tables, calcul mental, multiplication posée, × 10 100 1000, problèmes) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function MultiplicationCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheMultiplicationCM2}
      slides={slidesMultiplicationCM2}
    />
  );
}
