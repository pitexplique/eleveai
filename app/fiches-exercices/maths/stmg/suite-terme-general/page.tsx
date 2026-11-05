import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteTermeGeneralStmg } from "@/lib/fiches-exercices/maths-stmg-suite-terme-general";

export const metadata: Metadata = {
  title: "Terme général d'une suite STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur le terme général d'une suite : écrire u(n) en fonction de n, calculer un terme lointain, lire une raison, remonter au premier terme, tester trois nombres consécutifs. Des bornes de recharge, un podcast, une digue, un plan vélo. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteTermeGeneralStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteTermeGeneralStmg} />;
}
