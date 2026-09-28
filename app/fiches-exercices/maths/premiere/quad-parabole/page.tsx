import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesQuadParabolePremiere } from "@/lib/fiches-exercices/maths-premiere-quad-parabole";

export const metadata: Metadata = {
  title: "Parabole et expression de degré 2 — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première (sans spécialité) sur la parabole : calculer une image, rôle de a et de c, lire les racines sur la courbe et sur la forme factorisée. Jet d'eau, freinage, trébuchet, chute sur la Lune, papillons. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesQuadParabolePremierePage() {
  return <FicheExercicesClient fiche={exercicesQuadParabolePremiere} />;
}
