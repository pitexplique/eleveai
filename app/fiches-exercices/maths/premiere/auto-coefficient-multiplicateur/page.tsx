import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoCoefficientMultiplicateurPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-coefficient-multiplicateur";

export const metadata: Metadata = {
  title: "Coefficient multiplicateur — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : traduire une hausse ou une baisse par un coefficient, calculer une valeur d'arrivée, retrouver une valeur de départ. Soldes, salaire, TVA, fiche de paie, immobilier, population. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoCoefficientMultiplicateurPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoCoefficientMultiplicateurPremiere} />;
}
