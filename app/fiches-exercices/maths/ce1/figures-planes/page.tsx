import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFiguresPlanesCe1 } from "@/lib/fiches-exercices/maths-ce1-figures-planes";

// ⚠️ Cette page répond à « exercices figures planes carré rectangle triangle cercle angle droit CE1 ».
export const metadata: Metadata = {
  title: "Figures planes CE1 : 20 exercices corrigés, carré, rectangle, angle droit (PDF)",
  description:
    "Vingt exercices corrigés sur les figures planes au CE1 : nommer le carré, le rectangle, le triangle et le cercle, reconnaître un triangle rectangle, vérifier un angle droit à l'équerre, lire son code, distinguer angle aigu et obtus, tracer un cercle au compas. Problèmes : un carrelage, un massif rond, un gâteau, une fenêtre. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesFiguresPlanesCe1Page() {
  return <FicheExercicesClient fiche={exercicesFiguresPlanesCe1} />;
}
