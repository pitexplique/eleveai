import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFigurePlaneCm1 } from "@/lib/fiches-exercices/maths-cm1-figure-plane";

// ⚠️ Cette page répond à « exercices figures planes CM1 » : triangles,
// quadrilatères, cercle (rayon, diamètre), codage.
export const metadata: Metadata = {
  title: "Figures planes CM1 : 20 exercices corrigés, triangles, carré, rectangle, cercle (PDF)",
  description:
    "Vingt exercices corrigés sur les figures planes au CM1 : nommer un triangle, un carré, un rectangle, un losange, reconnaître un triangle rectangle, isocèle ou équilatéral, lire le codage d'une figure, utiliser le centre, le rayon et le diamètre d'un cercle, compter des figures cachées. Problèmes : un vitrail, un massif de fleurs rond, un couvercle de menuisière, des cadres photo. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFigurePlaneCm1Page() {
  return <FicheExercicesClient fiche={exercicesFigurePlaneCm1} />;
}
