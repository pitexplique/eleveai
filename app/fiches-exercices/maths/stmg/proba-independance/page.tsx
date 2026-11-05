import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaIndependanceStmg } from "@/lib/fiches-exercices/maths-stmg-proba-independance";

export const metadata: Metadata = {
  title: "Indépendance de deux évènements STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur l'indépendance : comparer deux probabilités, utiliser le produit, justifier sur un tableau ou un arbre, ne plus confondre indépendants et incompatibles. Un recrutement, une collecte de sang, un jeu vidéo. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesProbaIndependanceStmgPage() {
  return <FicheExercicesClient fiche={exercicesProbaIndependanceStmg} />;
}
