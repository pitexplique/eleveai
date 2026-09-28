import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoDevelopperFactoriserPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-developper-factoriser";

export const metadata: Metadata = {
  title: "Développer et factoriser — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : développer, identités remarquables, factoriser par un facteur commun ou par une identité, avec les développements dessinés comme des aires. Recette d'un cinéma, coût moyen, « +10 % puis −10 % », bénéfice maximal. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoDevelopperFactoriserPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoDevelopperFactoriserPremiere} />;
}
