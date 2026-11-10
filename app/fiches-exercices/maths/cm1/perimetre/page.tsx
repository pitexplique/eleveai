import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPerimetreCm1 } from "@/lib/fiches-exercices/maths-cm1-perimetre";

// ⚠️ Cette page répond à « exercices périmètre CM1 : le tour d'une figure, triangle, rectangle, carré, polygone, côté manquant ».
export const metadata: Metadata = {
  title: "Périmètre CM1 : 20 exercices corrigés, quadrillage, triangle, rectangle, carré (PDF)",
  description:
    "Vingt exercices corrigés sur le périmètre au CM1 : faire le tour d'une figure sur un quadrillage, additionner les côtés d'un triangle, d'un rectangle, d'un carré, d'un polygone à côtés égaux, retrouver un côté qui manque. Problèmes : un parc, un cadre, des plinthes, les tables d'une fête. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPerimetreCm1Page() {
  return <FicheExercicesClient fiche={exercicesPerimetreCm1} />;
}
