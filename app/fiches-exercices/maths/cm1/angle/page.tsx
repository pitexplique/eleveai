import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAngleCm1 } from "@/lib/fiches-exercices/maths-cm1-angle";

// ⚠️ Cette page répond à « exercices angles CM1 : angle droit, aigu, obtus, comparer, gabarit, notation ».
export const metadata: Metadata = {
  title: "Angles CM1 : 20 exercices corrigés, angle droit, aigu, obtus, gabarit (PDF)",
  description:
    "Vingt exercices corrigés sur les angles au CM1 : trouver le sommet et les côtés, reconnaître un angle droit à l'équerre, dire si un angle est aigu ou obtus, comparer deux angles avec un gabarit, nommer un angle avec trois lettres. Horloges, pizzas, lettres, cadre de menuisier, robot, toit. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAngleCm1Page() {
  return <FicheExercicesClient fiche={exercicesAngleCm1} />;
}
