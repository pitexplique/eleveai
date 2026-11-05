import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoTauxMoyenStmg } from "@/lib/fiches-exercices/maths-stmg-expo-taux-moyen";

export const metadata: Metadata = {
  title: "Taux d'évolution moyen STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur le taux d'évolution moyen : l'exposant 1/n, le coefficient global, sa racine, et le piège : le taux moyen n'est pas la moyenne des taux. Une commune, une cantine, le prix du blé, une station de ski. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesExpoTauxMoyenStmgPage() {
  return <FicheExercicesClient fiche={exercicesExpoTauxMoyenStmg} />;
}
