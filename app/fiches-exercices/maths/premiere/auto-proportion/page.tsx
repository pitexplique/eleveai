import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoProportionPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-proportion";

export const metadata: Metadata = {
  title: "Proportions et pourcentages — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : calculer une proportion, passer de la fraction au décimal et au pourcentage, prendre un pourcentage d'une quantité, élections, budget d'un ménage, soldes, TVA, parité, empreinte carbone. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoProportionPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoProportionPremiere} />;
}
