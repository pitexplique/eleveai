import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmiqueCm1 } from "@/lib/fiches-exercices/maths-cm1-algorithmique";

// ⚠️ Cette page répond à « exercices algorithmique CM1 » : programmer un
// déplacement sur quadrillage, flèches, Scratch, répéter, suites logiques.
export const metadata: Metadata = {
  title: "Algorithmique CM1 : 20 exercices corrigés, quadrillage, flèches, Scratch (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique au CM1 : suivre des instructions dans l'ordre, continuer une suite logique, déplacer un robot sur un quadrillage avec des flèches et trouver sa case d'arrivée, choisir le bon programme, lire des blocs Scratch, utiliser « répéter ». Problèmes : une tondeuse robot, un programme de calcul, un robot d'entrepôt, le plan d'un architecte. Rappel de cours avant chaque niveau, corrigé étape par étape avec le trajet dessiné, PDF à imprimer.",
};

export default function ExercicesAlgorithmiqueCm1Page() {
  return <FicheExercicesClient fiche={exercicesAlgorithmiqueCm1} />;
}
