import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaConditionnelleDistinguerStmg } from "@/lib/fiches-exercices/maths-stmg-proba-conditionnelle-distinguer";

export const metadata: Metadata = {
  title: "Ne pas confondre les probabilités conditionnelles STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour distinguer une intersection et deux probabilités conditionnelles, les traduire par une phrase, et comprendre les tests : faux positifs, faux négatifs, sensibilité, spécificité. Une alarme incendie, un filtre anti-spam, un scanner d'aéroport. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesProbaConditionnelleDistinguerStmgPage() {
  return <FicheExercicesClient fiche={exercicesProbaConditionnelleDistinguerStmg} />;
}
