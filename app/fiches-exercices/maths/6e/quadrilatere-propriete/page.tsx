import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesQuadrilaterePropriete6e } from "@/lib/fiches-exercices/maths-6e-quadrilatere-propriete";

// Cette page répond à « exercices corrigés propriétés des quadrilatères 6e » :
// côtés, diagonales, conclure, compléter et construire.
export const metadata: Metadata = {
  title: "Propriétés des quadrilatères 6e : 20 exercices corrigés, diagonales, construire (PDF)",
  description:
    "Vingt exercices corrigés sur les propriétés du rectangle, du losange et du carré en 6e : côtés opposés égaux et parallèles, diagonales de même longueur ou perpendiculaires, conclure sur la nature, compléter une figure sur quadrillage, construire à l'équerre et au compas. Problèmes : terrain de sport, foulard, pailles articulées, jardin partagé. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesQuadrilaterePropriete6ePage() {
  return <FicheExercicesClient fiche={exercicesQuadrilaterePropriete6e} />;
}
