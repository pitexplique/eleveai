import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoComparerPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-comparer";

export const metadata: Metadata = {
  title: "Comparer deux nombres — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : comparer par la différence ou par le quotient, ranger des fractions, prix au kilo, densité de population, placements, remises. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoComparerPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoComparerPremiere} />;
}
