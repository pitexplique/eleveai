import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgoVariablesStmg } from "@/lib/fiches-exercices/maths-stmg-algo-variables";

export const metadata: Metadata = {
  title: "Variables, compteur et accumulateur STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les variables, l'affectation, le compteur, l'accumulateur et l'aléatoire en Python. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAlgoVariablesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAlgoVariablesStmg} />;
}
