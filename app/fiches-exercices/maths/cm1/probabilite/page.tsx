import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbabiliteCm1 } from "@/lib/fiches-exercices/maths-cm1-probabilite";

// ⚠️ Cette page répond à « exercices probabilités CM1 » : certain, possible,
// impossible, le hasard, comparer des chances, dé, roue, sac de billes.
export const metadata: Metadata = {
  title: "Probabilités CM1 : 20 exercices corrigés, certain, possible, impossible (PDF)",
  description:
    "Vingt exercices corrigés sur le hasard au CM1 : dire si un événement est certain, possible ou impossible, reconnaître une situation de hasard, compter les cas gagnants sur un dé, une roue ou dans un sac de billes, comparer des chances, trouver tous les résultats d'une expérience. Problèmes : une tombola, des chaussettes dans le noir, un tour de cartes, un jeu de société. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProbabiliteCm1Page() {
  return <FicheExercicesClient fiche={exercicesProbabiliteCm1} />;
}
