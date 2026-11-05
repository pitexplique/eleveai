import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerVariationsStmg } from "@/lib/fiches-exercices/maths-stmg-der-variations";

export const metadata: Metadata = {
  title: "Signe de la dérivée et variations STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le signe de la dérivée et le tableau de variations : où la dérivée s'annule, le sens de variation, le maximum et le minimum. Un parapente, une cuve de lait, une serre, un étang à truites. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDerVariationsStmgPage() {
  return <FicheExercicesClient fiche={exercicesDerVariationsStmg} />;
}
