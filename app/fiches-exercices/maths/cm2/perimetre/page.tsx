import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPerimetreCm2 } from "@/lib/fiches-exercices/maths-cm2-perimetre";

export const metadata: Metadata = {
  title: "Périmètres CM2 : 20 exercices corrigés, triangle, rectangle, polygones (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Faire le tour d'une figure sur quadrillage puis avec des mesures (triangle, carré, rectangle, losange, polygones), trouver un côté qui manque. Un terrain de basket, une pièce en L, des cadres photo, une clôture et l'enclos de la fermière. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPerimetreCm2Page() {
  return <FicheExercicesClient fiche={exercicesPerimetreCm2} />;
}
