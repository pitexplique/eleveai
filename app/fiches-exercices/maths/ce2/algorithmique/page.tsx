import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmiqueCe2 } from "@/lib/fiches-exercices/maths-ce2-algorithmique";

// ⚠️ Cette page répond à « exercices programmer déplacement robot quadrillage flèches répéter CE2 ».
export const metadata: Metadata = {
  title: "Programmes et déplacements codés CE2 : 20 exercices corrigés, robot, flèches, répéter (PDF)",
  description:
    "Vingt exercices corrigés sur les programmes et les déplacements codés au CE2 : suivre un code de flèches sur un quadrillage, avancer et tourner d'un quart de tour, utiliser une répétition, corriger une instruction fausse. Problèmes : un livreur à vélo, une tondeuse robot, un robot d'entrepôt, un robot qui dessine un carré. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesAlgorithmiqueCe2Page() {
  return <FicheExercicesClient fiche={exercicesAlgorithmiqueCe2} />;
}
