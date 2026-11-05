import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgoListesStmg } from "@/lib/fiches-exercices/maths-stmg-algo-listes";

export const metadata: Metadata = {
  title: "Listes STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les listes en Python : indices, génération, ajout et parcours. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAlgoListesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAlgoListesStmg} />;
}
