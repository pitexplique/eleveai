import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesQuadrilatereFigure6e } from "@/lib/fiches-exercices/maths-6e-quadrilatere-figure";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les quadrilatères ») :
// cette page répond à « exercices corrigés quadrilatères 6e ».
export const metadata: Metadata = {
  title: "Quadrilatères 6e : 20 exercices corrigés, rectangle, losange, carré (PDF)",
  description:
    "Vingt exercices corrigés sur les quadrilatères en 6e : nommer un quadrilatère, côtés opposés et consécutifs, diagonales, reconnaître un rectangle, un losange ou un carré par ses codages, et les distinguer. Problèmes : tablette de chocolat, feuille A4 pliée, carrés à compter, quadrilatères mystères. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesQuadrilatereFigure6ePage() {
  return <FicheExercicesClient fiche={exercicesQuadrilatereFigure6e} />;
}
