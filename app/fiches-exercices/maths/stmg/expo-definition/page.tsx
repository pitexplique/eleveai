import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoDefinitionStmg } from "@/lib/fiches-exercices/maths-stmg-expo-definition";

export const metadata: Metadata = {
  title: "Fonction exponentielle x ↦ aˣ STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur la fonction x ↦ aˣ : la reconnaître, calculer une image, l'exposant négatif, prolonger une suite géométrique aux durées non entières. Des bactéries, un musée, le carbone 14, un podcast, une forêt. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesExpoDefinitionStmgPage() {
  return <FicheExercicesClient fiche={exercicesExpoDefinitionStmg} />;
}
