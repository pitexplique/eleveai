import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoRepresentationsCroiseesPremiere } from "@/lib/fiches-exercices/maths-premiere-info-representations-croisees";

export const metadata: Metadata = {
  title: "Représenter deux caractères — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première pour représenter deux caractères croisés : barres groupées, barres empilées à 100 %, diagrammes circulaires et semi-circulaires, choisir et commenter. Mix électrique, énergie d'une maison, hémicycle, budget de deux familles. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesInfoRepresentationsCroiseesPremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoRepresentationsCroiseesPremiere} />;
}
