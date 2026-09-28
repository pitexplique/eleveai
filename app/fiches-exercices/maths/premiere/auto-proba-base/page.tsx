import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoProbaBasePremiere } from "@/lib/fiches-exercices/maths-premiere-auto-proba-base";

export const metadata: Metadata = {
  title: "Probabilités : les bases — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : une probabilité entre 0 et 1, la somme des issues, l'évènement contraire, l'équiprobabilité. Dés, urnes, roue, population par âge, sondage, roulette, jurés d'assises, retards de train, tombola. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoProbaBasePremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoProbaBasePremiere} />;
}
