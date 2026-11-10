import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProportionnaliteCm2 } from "@/lib/fiches-exercices/maths-cm2-proportionnalite";

export const metadata: Metadata = {
  title: "Proportionnalité CM2 : 20 exercices corrigés, tableau, coefficient, prix d'un seul (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Reconnaître une situation de proportionnalité, compléter un tableau, trouver le nombre par lequel on multiplie, chercher « 2 fois plus » ou le prix d'un seul. Des crêpes, des tulipes, un zoo, de la peinture, un ressort, des cordes de guitare et un voyage en voiture. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProportionnaliteCm2Page() {
  return <FicheExercicesClient fiche={exercicesProportionnaliteCm2} />;
}
