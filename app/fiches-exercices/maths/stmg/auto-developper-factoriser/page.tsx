import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoDevelopperFactoriserStmg } from "@/lib/fiches-exercices/maths-stmg-auto-developper-factoriser";

export const metadata: Metadata = {
  title: "Développer, factoriser, réduire STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le calcul littéral : développer un produit, le double produit des identités remarquables, le plus grand facteur commun, la différence de deux carrés. Un terrain de sport, une affiche, un food truck, un cadre photo. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoDevelopperFactoriserStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoDevelopperFactoriserStmg} />;
}
