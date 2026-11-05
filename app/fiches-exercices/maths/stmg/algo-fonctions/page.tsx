import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgoFonctionsStmg } from "@/lib/fiches-exercices/maths-stmg-algo-fonctions";

export const metadata: Metadata = {
  title: "Fonctions en Python STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les fonctions en Python : entrées, sortie, définition, appel et structuration. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAlgoFonctionsStmgPage() {
  return <FicheExercicesClient fiche={exercicesAlgoFonctionsStmg} />;
}
