import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesContenanceCe2 } from "@/lib/fiches-exercices/maths-ce2-contenance";

// ⚠️ Cette page répond à « exercices contenances CE2 : L, dL, cL, comparer, problèmes ».
export const metadata: Metadata = {
  title: "Contenances CE2 : 20 exercices corrigés, litres, décilitres, centilitres (PDF)",
  description:
    "Vingt exercices corrigés sur les contenances au CE2 : 1 L = 10 dL = 100 cL, lire un pichet gradué, comparer des récipients sans se fier à leur forme, convertir. Problèmes : un aquarium, le jus de la fête de l'école, l'énigme des deux bidons, un robinet qui fuit. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesContenanceCe2Page() {
  return <FicheExercicesClient fiche={exercicesContenanceCe2} />;
}
