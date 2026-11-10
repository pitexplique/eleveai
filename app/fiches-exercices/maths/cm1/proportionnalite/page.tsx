import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProportionnaliteCm1 } from "@/lib/fiches-exercices/maths-cm1-proportionnalite";

// ⚠️ Cette page répond à « exercices proportionnalité CM1 ».
export const metadata: Metadata = {
  title: "Proportionnalité CM1 : 20 exercices corrigés, fois plus, fois moins, tableaux, valeur pour 1 (PDF)",
  description:
    "Vingt exercices corrigés sur la proportionnalité au CM1 : reconnaître une situation de proportionnalité, raisonner en fois plus et fois moins, compléter un tableau, trouver le coefficient, passer par la valeur pour 1. Des recettes, des tickets, un plan d'architecte, un cycliste, de la peinture, des photos. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProportionnaliteCm1Page() {
  return <FicheExercicesClient fiche={exercicesProportionnaliteCm1} />;
}
