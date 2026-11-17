import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmiqueCp } from "@/lib/fiches-exercices/maths-cp-algorithmique";

// ⚠️ Cette page répond à « exercices instructions et déplacements codés CP : flèches, robot, suites qui se répètent ».
export const metadata: Metadata = {
  title: "Instructions et déplacements codés CP : 20 exercices corrigés, flèches, robot (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique au CP : suivre des flèches sur un quadrillage, coder un déplacement, lire les cartes d'instructions du robot, trouver le dessin suivant ou le 10e dessin d'une suite qui se répète. Défis : le robot livreur, le collier de perles, le chemin du jardinier. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesAlgorithmiqueCpPage() {
  return <FicheExercicesClient fiche={exercicesAlgorithmiqueCp} />;
}
