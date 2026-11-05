import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteArithmetiqueStmg } from "@/lib/fiches-exercices/maths-stmg-suite-arithmetique";

export const metadata: Metadata = {
  title: "Suite arithmétique STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les suites arithmétiques : trouver la raison, écrire la relation de récurrence, lire le sens de variation, démontrer qu'une suite est arithmétique. Un cinéma, un taxi, un drone, une ligne de bus. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteArithmetiqueStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteArithmetiqueStmg} />;
}
