import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoOrdresUnitesPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-ordres-unites";

export const metadata: Metadata = {
  title: "Ordres de grandeur et conversions — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : calcul mental, ordre de grandeur, vraisemblance d'un résultat, conversions d'aires, de volumes, de durées et de vitesses. Cartes et échelles, pluie, montée des océans, soldes, salaire horaire. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoOrdresUnitesPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoOrdresUnitesPremiere} />;
}
