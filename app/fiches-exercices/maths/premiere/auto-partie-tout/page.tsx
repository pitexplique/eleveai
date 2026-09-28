import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoPartieToutPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-partie-tout";

export const metadata: Metadata = {
  title: "La partie et le tout — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : calculer une partie connaissant le tout, retrouver le tout connaissant une partie, pourcentage d'un pourcentage, loyer et salaire, élections, TVA, budget d'une commune, chômage, vieillissement, soldes. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoPartieToutPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoPartieToutPremiere} />;
}
