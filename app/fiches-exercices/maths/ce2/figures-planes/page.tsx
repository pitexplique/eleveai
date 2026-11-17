import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFiguresPlanesCe2 } from "@/lib/fiches-exercices/maths-ce2-figures-planes";

// ⚠️ Cette page répond à « exercices figures planes carré rectangle losange triangle rectangle cercle compas CE2 ».
export const metadata: Metadata = {
  title: "Figures planes CE2 : 20 exercices corrigés, carré, rectangle, losange, triangle rectangle, cercle (PDF)",
  description:
    "Vingt exercices corrigés sur les figures planes au CE2 : reconnaître le carré, le rectangle, le losange, le triangle rectangle et le cercle, même penchés, utiliser les angles droits et les côtés égaux, ouvrir le compas du rayon. Problèmes : la terrasse d'un carreleur, le massif rond d'une jardinière, le drapeau du Brésil, le cadre d'un menuisier. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesFiguresPlanesCe2Page() {
  return <FicheExercicesClient fiche={exercicesFiguresPlanesCe2} />;
}
