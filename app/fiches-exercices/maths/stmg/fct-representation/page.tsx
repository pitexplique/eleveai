import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctRepresentationStmg } from "@/lib/fiches-exercices/maths-stmg-fct-representation";

export const metadata: Metadata = {
  title: "Fonction : représenter et noter STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour lire une fonction : image et antécédent, courbe et tableau de valeurs, écrire et relire un coût C(x) = ax + b, grandeurs inversement proportionnelles et grandeurs liées à un carré. Un food truck, un taxi, un lancer de poids. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctRepresentationStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctRepresentationStmg} />;
}
