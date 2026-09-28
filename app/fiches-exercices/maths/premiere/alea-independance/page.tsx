import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAleaIndependancePremiere } from "@/lib/fiches-exercices/maths-premiere-alea-independance";

export const metadata: Metadata = {
  title: "Indépendance de deux évènements — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première : reconnaître deux évènements indépendants, utiliser P(A ∩ B) = P(A) × P(B), justifier par un calcul, distinguer indépendance et incompatibilité. Lancers francs, circuit électrique, vote par région, noyaux de radon, registres de mariage, détecteurs de fumée, pièges photographiques. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAleaIndependancePremierePage() {
  return <FicheExercicesClient fiche={exercicesAleaIndependancePremiere} />;
}
