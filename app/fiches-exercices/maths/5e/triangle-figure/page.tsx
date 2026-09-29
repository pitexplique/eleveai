import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTriangleFigure5e } from "@/lib/fiches-exercices/maths-5e-triangle-figure";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les triangles ») :
// cette page répond à « exercices corrigés triangles 5e ».
export const metadata: Metadata = {
  title: "Triangles 5e : 20 exercices corrigés, inégalité triangulaire, somme des angles (PDF)",
  description:
    "Vingt exercices corrigés sur les triangles en 5e : sommets et côtés, triangle isocèle, équilatéral, rectangle, inégalité triangulaire, construction au compas et au rapporteur, somme des angles égale à 180°. Problèmes : une tente, trois refuges, le triangle d'or, un bateau vu de deux phares. Rappel de cours avant chaque niveau, corrigé étape par étape, figures à l'échelle, PDF à imprimer.",
};

export default function ExercicesTriangleFigure5ePage() {
  return <FicheExercicesClient fiche={exercicesTriangleFigure5e} />;
}
