import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteGeometriqueStmg } from "@/lib/fiches-exercices/maths-stmg-suite-geometrique";

export const metadata: Metadata = {
  title: "Suite géométrique STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les suites géométriques : trouver la raison par un quotient, dérouler la relation de récurrence, remonter en divisant, démontrer qu'une suite est géométrique. Une rumeur, une voiture de société, un placement, un festival. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteGeometriqueStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteGeometriqueStmg} />;
}
