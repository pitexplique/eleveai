import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheProblemeCM2, slidesProblemeCM2 } from "@/lib/fiches/maths-cm2-probleme";

export const metadata: Metadata = {
  title: "Résoudre un problème — fiche de cours CM2 | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète pour résoudre un problème de maths (choisir la bonne opération, une ou plusieurs étapes, schéma en barres, phrase réponse) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function ProblemeCM2Page() {
  return <FicheCoursClient fiche={ficheProblemeCM2} slides={slidesProblemeCM2} />;
}
