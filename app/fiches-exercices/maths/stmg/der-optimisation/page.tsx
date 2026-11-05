import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerOptimisationStmg } from "@/lib/fiches-exercices/maths-stmg-der-optimisation";

export const metadata: Metadata = {
  title: "Problèmes d'optimisation STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur l'optimisation par la dérivée : la quantité qui rend un bénéfice maximal, celle qui rend un coût minimal, le prix qui maximise une recette, et la phrase de conclusion. Des savons, un concert, des skis, la consommation d'une voiture. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDerOptimisationStmgPage() {
  return <FicheExercicesClient fiche={exercicesDerOptimisationStmg} />;
}
