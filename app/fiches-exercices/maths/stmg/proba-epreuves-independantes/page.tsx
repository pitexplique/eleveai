import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaEpreuvesIndependantesStmg } from "@/lib/fiches-exercices/maths-stmg-proba-epreuves-independantes";

export const metadata: Metadata = {
  title: "Deux épreuves indépendantes STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les épreuves indépendantes : l'arbre, le produit le long d'un chemin, « au moins une fois » par le contraire, tirage avec ou sans remise. Un tir à l'arc, des feux tricolores, une sauvegarde informatique, une tombola. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesProbaEpreuvesIndependantesStmgPage() {
  return <FicheExercicesClient fiche={exercicesProbaEpreuvesIndependantesStmg} />;
}
