import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTableurFormulesStmg } from "@/lib/fiches-exercices/maths-stmg-tableur-formules";

export const metadata: Metadata = {
  title: "Tableur : écrire une formule STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le tableur : lire une cellule, comprendre une formule et écrire une formule. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesTableurFormulesStmgPage() {
  return <FicheExercicesClient fiche={exercicesTableurFormulesStmg} />;
}
