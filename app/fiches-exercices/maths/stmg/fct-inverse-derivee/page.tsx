import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctInverseDeriveeStmg } from "@/lib/fiches-exercices/maths-stmg-fct-inverse-derivee";

export const metadata: Metadata = {
  title: "Fonction inverse : dérivée et variations STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour dériver la fonction inverse : le nombre dérivé, le sens de variation sur chaque intervalle, puis les coûts en ax + b/x jusqu'au coût minimal, avec le tableau de variations. Une pharmacie, un entrepôt, une cave à vin, un cargo. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctInverseDeriveeStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctInverseDeriveeStmg} />;
}
