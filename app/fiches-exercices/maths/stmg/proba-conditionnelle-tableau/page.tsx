import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaConditionnelleTableauStmg } from "@/lib/fiches-exercices/maths-stmg-proba-conditionnelle-tableau";

export const metadata: Metadata = {
  title: "Probabilité conditionnelle sur un tableau STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur la probabilité conditionnelle lue dans un tableau croisé : repérer « parmi » et « sachant que », écrire la notation, choisir le dénominateur, calculer. Une école de musique, les urgences, un verger, une agence immobilière, la météo. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesProbaConditionnelleTableauStmgPage() {
  return <FicheExercicesClient fiche={exercicesProbaConditionnelleTableauStmg} />;
}
