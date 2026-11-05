import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctMonotonieStmg } from "@/lib/fiches-exercices/maths-stmg-fct-monotonie";

export const metadata: Metadata = {
  title: "Fonction monotone sur un intervalle STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le sens de variation : le relier au signe du taux, lire et dresser un tableau de variations, comparer deux images sans calculer, savoir quand on ne peut pas conclure. Une randonnée, un camping, une ruche, une station de ski. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctMonotonieStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctMonotonieStmg} />;
}
