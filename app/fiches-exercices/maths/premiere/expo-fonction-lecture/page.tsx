import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoFonctionLecturePremiere } from "@/lib/fiches-exercices/maths-premiere-expo-fonction-lecture";

export const metadata: Metadata = {
  title: "Fonction exponentielle, variations et courbe en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les fonctions x ↦ aˣ en première, enseignement de mathématiques hors spécialité : sens de variation selon la base, lecture graphique, résolution graphique de aˣ = k, fonction qui prolonge une suite géométrique. Voiture, fréquence cardiaque, recensements, CO₂, pression en montagne, exode rural, truites. Courbes à lire, rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesExpoFonctionLecturePremierePage() {
  return <FicheExercicesClient fiche={exercicesExpoFonctionLecturePremiere} />;
}
