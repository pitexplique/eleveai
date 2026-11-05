import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoEvoEnchaineesStmg } from "@/lib/fiches-exercices/maths-stmg-auto-evo-enchainees";

export const metadata: Metadata = {
  title: "Évolutions successives et réciproque STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les évolutions successives : multiplier les coefficients, lire le taux global, trouver le taux réciproque, retrouver une valeur de départ, et voir qu'une baisse puis une hausse de même taux ne se compensent pas. Des soldes, un placement, une TVA et une remise. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoEvoEnchaineesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoEvoEnchaineesStmg} />;
}
