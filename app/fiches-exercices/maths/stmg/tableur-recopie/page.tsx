import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTableurRecopieStmg } from "@/lib/fiches-exercices/maths-stmg-tableur-recopie";

export const metadata: Metadata = {
  title: "Tableur : recopier et exploiter STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le tableur : recopier une formule, références relatives et absolues, lecture d'une colonne et choix du graphique. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesTableurRecopieStmgPage() {
  return <FicheExercicesClient fiche={exercicesTableurRecopieStmg} />;
}
