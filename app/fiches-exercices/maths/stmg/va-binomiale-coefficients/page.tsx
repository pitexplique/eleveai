import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVaBinomialeCoefficientsStmg } from "@/lib/fiches-exercices/maths-stmg-va-binomiale-coefficients";

export const metadata: Metadata = {
  title: "Coefficients binomiaux et triangle de Pascal STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur les coefficients binomiaux : compter les chemins d'un arbre, lire le triangle de Pascal, construire une ligne, utiliser la symétrie, dénombrer « au moins » et « au plus ». Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesVaBinomialeCoefficientsStmgPage() {
  return <FicheExercicesClient fiche={exercicesVaBinomialeCoefficientsStmg} />;
}
