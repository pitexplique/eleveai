import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSymAxiale6e } from "@/lib/fiches-exercices/maths-6e-sym-axiale";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La symétrie axiale ») :
// cette page répond à « exercices corrigés symétrie axiale 6e ».
export const metadata: Metadata = {
  title: "Symétrie axiale 6e : 20 exercices corrigés sur quadrillage, image, axes (PDF)",
  description:
    "Vingt exercices corrigés sur la symétrie axiale en 6e : reconnaître un pliage, construire l'image d'un point, d'un segment, d'un triangle, trouver l'axe, compter les axes d'une figure, utiliser ce que la symétrie conserve. Problèmes : un logo, un rebond au billard, trois drapeaux, une feuille pliée en quatre. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSymAxiale6ePage() {
  return <FicheExercicesClient fiche={exercicesSymAxiale6e} />;
}
