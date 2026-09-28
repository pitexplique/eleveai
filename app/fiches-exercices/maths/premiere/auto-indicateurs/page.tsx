import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoIndicateursPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-indicateurs";

export const metadata: Metadata = {
  title: "Moyenne, médiane, quartiles — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : moyenne (avec effectifs, avec classes), médiane, quartiles, boîtes à moustaches, interpréter les indicateurs. Salaires, loyers, patrimoine, climat, dons. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoIndicateursPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoIndicateursPremiere} />;
}
