import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTransformations4e } from "@/lib/fiches-exercices/maths-4e-transformations";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les transformations ») :
// cette page répond à « exercices corrigés symétrie translation rotation 4e »,
// l'autre à « cours transformations 4e ».
export const metadata: Metadata = {
  title: "Symétries, translation, rotation 4e : 20 exercices corrigés sur quadrillage (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur quadrillage : symétrie axiale (axe oblique compris), symétrie centrale, translation, rotation d'un quart de tour, puis ce que ces transformations conservent — longueurs, angles, aires — pour justifier et calculer. Problèmes : une pièce de Tetris, le cavalier des échecs, un cerf-volant, un terrain de handball, la grande roue de Londres, un flocon de neige, des panneaux solaires. Rappel de cours avant chaque niveau, corrigé étape par étape avec la figure et son image dessinées, PDF à imprimer.",
};

export default function ExercicesTransformations4ePage() {
  return <FicheExercicesClient fiche={exercicesTransformations4e} />;
}
