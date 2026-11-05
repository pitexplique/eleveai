import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoResolutionGraphiqueStmg } from "@/lib/fiches-exercices/maths-stmg-auto-resolution-graphique";

export const metadata: Metadata = {
  title: "Résoudre graphiquement STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG où tout se lit sur le dessin : résoudre f(x) = k et f(x) < k, trouver le signe d'une fonction, décrire ses variations. Une chambre froide, un camping, un barrage, un stand de crêpes, une randonnée. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoResolutionGraphiqueStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoResolutionGraphiqueStmg} />;
}
