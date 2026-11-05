import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVaBinomialeCalculStmg } from "@/lib/fiches-exercices/maths-stmg-va-binomiale-calcul";

export const metadata: Metadata = {
  title: "Loi binomiale : calculer STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG pour calculer avec une loi binomiale : aucun succès, un seul échec, exactement k succès avec le triangle de Pascal, « au moins un » par le contraire, espérance. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesVaBinomialeCalculStmgPage() {
  return <FicheExercicesClient fiche={exercicesVaBinomialeCalculStmg} />;
}
