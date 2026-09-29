import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesGeometrieRepereePremiere } from "@/lib/fiches-exercices/maths-premiere-geometrie-reperee";

export const metadata: Metadata = {
  title: "Géométrie repérée 1re spé : 20 exercices corrigés, droites, cercles, projeté (PDF)",
  description:
    "Vingt exercices corrigés de géométrie repérée en première spécialité : vecteur normal et vecteur directeur, équation cartésienne d'une droite, droites parallèles ou perpendiculaires, projeté orthogonal, équation de cercle, cercle de diamètre [AB], tangente, axe et sommet d'une parabole. Médiatrice, radar, nageur, laser et miroir. Corrigés dessinés, PDF à imprimer.",
};

export default function ExercicesGeometrieRepereePremierePage() {
  return <FicheExercicesClient fiche={exercicesGeometrieRepereePremiere} />;
}
