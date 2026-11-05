import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVaLoiProbabiliteStmg } from "@/lib/fiches-exercices/maths-stmg-va-loi-probabilite";

export const metadata: Metadata = {
  title: "Variable aléatoire : loi de probabilité STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur la loi d'une variable aléatoire : traduire « au moins » et « au plus », additionner les colonnes, passer par le contraire, dresser une loi, trouver la case manquante. Une tombola, des ruches, des trains, un cinéma. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesVaLoiProbabiliteStmgPage() {
  return <FicheExercicesClient fiche={exercicesVaLoiProbabiliteStmg} />;
}
