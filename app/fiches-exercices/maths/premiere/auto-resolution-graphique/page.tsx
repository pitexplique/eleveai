import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoResolutionGraphiquePremiere } from "@/lib/fiches-exercices/maths-premiere-auto-resolution-graphique";

export const metadata: Metadata = {
  title: "Résolution graphique — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : résoudre graphiquement f(x) = k et f(x) < k, lire le signe d'une fonction, dresser un tableau de variations, lire une croissance qui accélère ou ralentit. Bénéfice, placements, chômage, balance commerciale, marée, qualité de l'air, bassin minier. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoResolutionGraphiquePremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoResolutionGraphiquePremiere} />;
}
