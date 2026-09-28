import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesQuadSommetAxePremiere } from "@/lib/fiches-exercices/maths-premiere-quad-sommet-axe";

export const metadata: Metadata = {
  title: "Parabole : sommet et axe de symétrie — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première (sans spécialité) : trouver l'axe de symétrie et le sommet d'une parabole sans formule, par les racines, par f(x) = c ou par la symétrie. Plongeon, lob, vallée glaciaire, arche de pont, prix d'un billet. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesQuadSommetAxePremierePage() {
  return <FicheExercicesClient fiche={exercicesQuadSommetAxePremiere} />;
}
