import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFiguresSolidesCp } from "@/lib/fiches-exercices/maths-cp-figures-solides";

// ⚠️ Cette page répond à « exercices figures planes et solides CP : carré rectangle triangle disque, cube pavé boule, alignement ».
export const metadata: Metadata = {
  title: "Figures et solides CP : 20 exercices corrigés, carré, triangle, cube, faces (PDF)",
  description:
    "Vingt exercices corrigés de géométrie au CP : reconnaître le carré, le rectangle, le triangle et le disque, compter leurs côtés et leurs sommets ; reconnaître le cube, le pavé et la boule, compter leurs faces ; vérifier un alignement avec la règle ; finir une figure sur un quadrillage. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesFiguresSolidesCpPage() {
  return <FicheExercicesClient fiche={exercicesFiguresSolidesCp} />;
}
