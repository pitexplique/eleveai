import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesReperageCe2 } from "@/lib/fiches-exercices/maths-ce2-reperage";

// ⚠️ Cette page répond à « exercices repérage quadrillage CE2 : cases, déplacements codés, plan ».
export const metadata: Metadata = {
  title: "Repérage sur quadrillage CE2 : 20 exercices corrigés, cases, codes, plans (PDF)",
  description:
    "Vingt exercices corrigés sur le repérage au CE2 : trouver une case avec sa lettre et son nombre (C2), suivre un déplacement codé par des flèches, décrire un trajet, lire le plan d'une école, d'un zoo, d'un supermarché. Problèmes : un trésor de pirates, une ferme, le retour d'un robot, deux amis qui se retrouvent. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesReperageCe2Page() {
  return <FicheExercicesClient fiche={exercicesReperageCe2} />;
}
