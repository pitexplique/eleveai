import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoTauxEvolutionPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-taux-evolution";

export const metadata: Metadata = {
  title: "Taux d'évolution — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : calculer un taux d'évolution, enchaîner des évolutions successives, trouver le taux réciproque, éviter le piège de la baisse puis hausse. Chômage, pouvoir d'achat, soldes, bourse, reconstruction, forêt. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoTauxEvolutionPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoTauxEvolutionPremiere} />;
}
