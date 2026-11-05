import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteNotationStmg } from "@/lib/fiches-exercices/maths-stmg-suite-notation";

export const metadata: Metadata = {
  title: "Suites, notation et modes de génération STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur la notation des suites : le rang et le terme, u(n) et l'indice, définition fonctionnelle ou par récurrence, traduire une situation en relation. Une piscine, un club d'escalade, un théâtre, un glacier. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteNotationStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteNotationStmg} />;
}
