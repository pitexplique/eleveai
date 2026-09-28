import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesQuadVariationsPremiere } from "@/lib/fiches-exercices/maths-premiere-quad-variations";

export const metadata: Metadata = {
  title: "Parabole : variations et extremum — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première (sans spécialité) : maximum ou minimum d'une fonction de degré 2, tableau de variations, comparer deux images sans calcul. Fusée à eau, pêche durable, zone de baignade, vol parabolique, prix d'un abonnement. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesQuadVariationsPremierePage() {
  return <FicheExercicesClient fiche={exercicesQuadVariationsPremiere} />;
}
