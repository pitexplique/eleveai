import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaArbreStmg } from "@/lib/fiches-exercices/maths-stmg-proba-arbre";

export const metadata: Metadata = {
  title: "Arbre de probabilités : construire, STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG pour construire un arbre de probabilités : premier et second niveau, placer un nombre de l'énoncé, compléter, repérer un arbre impossible, traduire une branche par une phrase. Une épicerie, les urgences, un port de pêche. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesProbaArbreStmgPage() {
  return <FicheExercicesClient fiche={exercicesProbaArbreStmg} />;
}
