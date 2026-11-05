import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctInverseStmg } from "@/lib/fiches-exercices/maths-stmg-fct-inverse";

export const metadata: Metadata = {
  title: "Fonction inverse STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur la fonction inverse : lire l'hyperbole, retrouver le coefficient, comprendre ce qui se passe quand x devient très grand ou très proche de zéro, et calculer un coût moyen. Un cours de yoga, un théâtre, un abonnement de piscine. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctInverseStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctInverseStmg} />;
}
