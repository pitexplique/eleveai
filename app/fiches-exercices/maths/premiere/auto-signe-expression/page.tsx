import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoSigneExpressionPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-signe-expression";

export const metadata: Metadata = {
  title: "Signe d'une expression — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : équation produit nul, signe de ax + b, tableau de signes d'une expression factorisée, seuil de rentabilité, solde commercial, prix d'équilibre. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoSigneExpressionPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoSigneExpressionPremiere} />;
}
