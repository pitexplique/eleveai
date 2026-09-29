import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTriangleFigure6e } from "@/lib/fiches-exercices/maths-6e-triangle-figure";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les triangles ») :
// cette page répond à « exercices corrigés triangles 6e ».
export const metadata: Metadata = {
  title: "Triangles 6e : 20 exercices corrigés, isocèle, équilatéral, rectangle (PDF)",
  description:
    "Vingt exercices corrigés sur les triangles en 6e : nommer un triangle, sommets, côtés et côté opposé, reconnaître un triangle isocèle, équilatéral ou quelconque, rectangle, obtusangle ou aigu, périmètre d'un triangle particulier. Problèmes : panneau de danger, cerf-volant, potager, pavage. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesTriangleFigure6ePage() {
  return <FicheExercicesClient fiche={exercicesTriangleFigure6e} />;
}
