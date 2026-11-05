import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoEvoCoefficientStmg } from "@/lib/fiches-exercices/maths-stmg-auto-evo-coefficient";

export const metadata: Metadata = {
  title: "Coefficient multiplicateur STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le coefficient multiplicateur : traduire une hausse ou une baisse, lire un coefficient, calculer une valeur finale, retrouver une valeur initiale, passer du prix TTC au prix HT. Une boulangerie, un garage, une forêt, une librairie. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoEvoCoefficientStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoEvoCoefficientStmg} />;
}
