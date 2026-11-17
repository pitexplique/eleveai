import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesReperageCp } from "@/lib/fiches-exercices/maths-cp-reperage";

// ⚠️ Cette page répond à « exercices repérage dans l'espace CP : sur sous entre, gauche droite, plan de la classe, cubes ».
export const metadata: Metadata = {
  title: "Se repérer dans l'espace CP : 20 exercices corrigés, gauche, droite, plan (PDF)",
  description:
    "Vingt exercices corrigés de repérage dans l'espace au CP : sur, sous, entre, devant, derrière, au-dessus ; la gauche et la droite ; le plan de la classe ; des déplacements sur un quadrillage ; des assemblages de cubes. Défis : un trésor caché, une chanteuse sur scène, le mur du maçon. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesReperageCpPage() {
  return <FicheExercicesClient fiche={exercicesReperageCp} />;
}
