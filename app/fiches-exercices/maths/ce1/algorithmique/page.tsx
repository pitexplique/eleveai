import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmiqueCe1 } from "@/lib/fiches-exercices/maths-ce1-algorithmique";

// ⚠️ Cette page répond à « exercices déplacements codés quadrillage robot CE1 ».
export const metadata: Metadata = {
  title: "Déplacements codés CE1 : 20 exercices corrigés, flèches, robot, répéter (PDF)",
  description:
    "Vingt exercices corrigés sur les instructions et les déplacements codés au CE1 : suivre des flèches sur un quadrillage, écrire le code d'un chemin, tourner d'un quart de tour, utiliser « répéter », éviter les obstacles. Problèmes : un drone livreur, un robot d'entrepôt, une informaticienne, une tondeuse robot. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesAlgorithmiqueCe1Page() {
  return <FicheExercicesClient fiche={exercicesAlgorithmiqueCe1} />;
}
