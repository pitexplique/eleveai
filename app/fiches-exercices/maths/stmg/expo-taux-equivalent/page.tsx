import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoTauxEquivalentStmg } from "@/lib/fiches-exercices/maths-stmg-expo-taux-equivalent";

export const metadata: Metadata = {
  title: "Taux équivalent sur une autre période STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur les taux équivalents : du taux moyen au taux global, du taux annuel au taux mensuel et l'inverse, lire ce que dit un taux moyen. Un crédit, une facture d'énergie, le prix d'une baguette, deux offres à comparer. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesExpoTauxEquivalentStmgPage() {
  return <FicheExercicesClient fiche={exercicesExpoTauxEquivalentStmg} />;
}
