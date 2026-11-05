import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteTermesStmg } from "@/lib/fiches-exercices/maths-stmg-suite-termes";

export const metadata: Metadata = {
  title: "Suites, calculer des termes STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour calculer les termes d'une suite : premiers termes, terme de rang donné, remonter en arrière, compter les pas, reconnaître une suite ni arithmétique ni géométrique. Des ruches, un podcast, une boulangerie, un lac. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteTermesStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteTermesStmg} />;
}
