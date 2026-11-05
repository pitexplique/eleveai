import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgoBouclesStmg } from "@/lib/fiches-exercices/maths-stmg-algo-boucles";

export const metadata: Metadata = {
  title: "Boucles et instruction conditionnelle STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les boucles for et while, les conditions if et le déroulement d'un programme en Python. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAlgoBouclesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAlgoBouclesStmg} />;
}
