import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoFonctionPremiere } from "@/lib/fiches-exercices/maths-premiere-expo-fonction";

export const metadata: Metadata = {
  title: "Fonction exponentielle x ↦ aˣ en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les fonctions x ↦ aˣ en première, enseignement de mathématiques hors spécialité : reconnaître une fonction exponentielle, calculer une image pour x non entier, propriétés aˣ⁺ʸ = aˣ × aʸ, exposant 1/n et racine. Levures, abonnement, médicament, population, polluant, taux mensuel, écran de plomb, yaourt, exode rural. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesExpoFonctionPremierePage() {
  return <FicheExercicesClient fiche={exercicesExpoFonctionPremiere} />;
}
