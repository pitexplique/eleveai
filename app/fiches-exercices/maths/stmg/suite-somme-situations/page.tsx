import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteSommeSituationsStmg } from "@/lib/fiches-exercices/maths-stmg-suite-somme-situations";

export const metadata: Metadata = {
  title: "Emprunts et placements STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur les sommes en situation : un terme ou une somme, le total versé, la valeur acquise de versements réguliers, le gain, le coût d'un crédit, la mensualité. Un four de boulangerie, un voyage de classe, une voiture à crédit ou à l'épargne. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteSommeSituationsStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteSommeSituationsStmg} />;
}
