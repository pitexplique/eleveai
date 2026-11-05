import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoProprietesStmg } from "@/lib/fiches-exercices/maths-stmg-expo-proprietes";

export const metadata: Metadata = {
  title: "Propriétés algébriques de aˣ STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur les propriétés de aˣ : un produit additionne les exposants, un quotient les soustrait, une puissance de puissance les multiplie. Un placement, des levures, le prix de l'électricité, une copie à corriger. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesExpoProprietesStmgPage() {
  return <FicheExercicesClient fiche={exercicesExpoProprietesStmg} />;
}
