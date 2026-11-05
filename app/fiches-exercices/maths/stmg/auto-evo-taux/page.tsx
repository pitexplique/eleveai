import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoEvoTauxStmg } from "@/lib/fiches-exercices/maths-stmg-auto-evo-taux";

export const metadata: Metadata = {
  title: "Calculer un taux d'évolution STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le taux d'évolution : variation absolue et variation relative, taux d'une hausse ou d'une baisse, taux lu sur un coefficient, proportion ou évolution. Un parc éolien, les urgences, deux glaciers, un festival, deux hôtels. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoEvoTauxStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoEvoTauxStmg} />;
}
