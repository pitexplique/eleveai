import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteComparerStmg } from "@/lib/fiches-exercices/maths-stmg-suite-comparer";

export const metadata: Metadata = {
  title: "Comparer deux suites STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG pour comparer deux suites : le rang du croisement, qui l'emporte à long terme, intérêts simples ou composés, taux proportionnel ou taux équivalent. Deux cinémas, deux parcs éoliens, deux contrats de travail, la somme d'une grand-mère. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteComparerStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteComparerStmg} />;
}
