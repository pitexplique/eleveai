import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoEquationsPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-equations";

export const metadata: Metadata = {
  title: "Équations et inéquations — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : ax + b = cx + d, x² = a, a/x = b et inéquations du premier degré, avec balances, droites graduées et graphiques. Location de voiture, prix d'équilibre, densité, intérêts composés, abonnement, taxi ou VTC. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoEquationsPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoEquationsPremiere} />;
}
