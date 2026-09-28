import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLinSeuilPremiere } from "@/lib/fiches-exercices/maths-premiere-lin-seuil";

// La première SANS spécialité : le titre le dit.
export const metadata: Metadata = {
  title: "Problème de seuil, croissance linéaire en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les problèmes de seuil en première, enseignement de mathématiques hors spécialité : trouver le premier rang par le calcul (inéquation), avec un tableau de valeurs ou sur un graphique où le seuil est une horizontale. Cagnotte, émissions de CO₂, rivière en crue, rail qui se dilate, station de ski, cigognes. PDF à imprimer.",
};

export default function ExercicesLinSeuilPremierePage() {
  return <FicheExercicesClient fiche={exercicesLinSeuilPremiere} />;
}
