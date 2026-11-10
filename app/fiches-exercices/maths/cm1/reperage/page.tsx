import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesReperageCm1 } from "@/lib/fiches-exercices/maths-cm1-reperage";

// ⚠️ Cette page répond à « exercices repérage CM1 : cases d'un quadrillage, coordonnées, déplacements ».
export const metadata: Metadata = {
  title: "Repérage CM1 : 20 exercices corrigés, quadrillage, cases B3, coordonnées (PDF)",
  description:
    "Vingt exercices corrigés sur le repérage au CM1 : trouver une case comme B3 sur un quadrillage, lire les coordonnées d'un point dans le bon ordre, trouver le point d'une adresse, suivre un trajet ou un code de flèches. Bataille navale, plan de ville, chasse au trésor, jeu vidéo. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesReperageCm1Page() {
  return <FicheExercicesClient fiche={exercicesReperageCm1} />;
}
