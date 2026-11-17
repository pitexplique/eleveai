import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDroitesAnglesCe2 } from "@/lib/fiches-exercices/maths-ce2-droites-angles";

// ⚠️ Cette page répond à « exercices droites angle droit équerre codage perpendiculaires CE2 ».
export const metadata: Metadata = {
  title: "Droites et angles droits CE2 : 20 exercices corrigés, équerre, codage, perpendiculaires (PDF)",
  description:
    "Vingt exercices corrigés sur les droites et les angles droits au CE2 : vérifier des points alignés à la règle, reconnaître un angle droit à l'équerre, lire le codage (petit carré, petits traits), trouver deux côtés perpendiculaires. Problèmes : les vitres d'une fenêtre, le tour d'un terrain de sport, les étagères d'une menuisière, un cerf-volant. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDroitesAnglesCe2Page() {
  return <FicheExercicesClient fiche={exercicesDroitesAnglesCe2} />;
}
