import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaArbreCalculStmg } from "@/lib/fiches-exercices/maths-stmg-proba-arbre-calcul";

export const metadata: Metadata = {
  title: "Arbre : chemins et probabilités totales, STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG pour calculer sur un arbre : le produit le long d'un chemin, la somme des chemins, la formule des probabilités totales, le passage de l'arbre au tableau. Une cave à vin, des moteurs, une radio, un réseau de bus. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesProbaArbreCalculStmgPage() {
  return <FicheExercicesClient fiche={exercicesProbaArbreCalculStmg} />;
}
