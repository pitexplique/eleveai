import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoTableurPremiere } from "@/lib/fiches-exercices/maths-premiere-info-tableur";

export const metadata: Metadata = {
  title: "Le tableur — 1re : 20 exercices corrigés sur les feuilles de calcul (PDF)",
  description:
    "Vingt exercices corrigés de tableur pour la première : lire une cellule, comprendre et écrire une formule (=B2*1,05, SOMME, MOYENNE), la recopier vers le bas, trouver un seuil, choisir le bon diagramme. Épargne, forêt, entraînement, énergie électrique, ville industrielle, compteur d'eau. PDF à imprimer.",
};

export default function ExercicesInfoTableurPremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoTableurPremiere} />;
}
