import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoProportionStmg } from "@/lib/fiches-exercices/maths-stmg-auto-proportion";

export const metadata: Metadata = {
  title: "Proportions et pourcentages STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les proportions et les pourcentages : calculer une proportion, passer d'une fraction à un décimal et à un pourcentage, appliquer un taux, prendre la proportion d'une proportion. Un hôpital, une cantine, une facture avec TVA, un marathon, le budget d'une commune. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoProportionStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoProportionStmg} />;
}
