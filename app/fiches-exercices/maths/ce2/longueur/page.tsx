import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLongueurCe2 } from "@/lib/fiches-exercices/maths-ce2-longueur";

// ⚠️ Cette page répond à « exercices longueurs CE2 : km, m, dm, cm, mm, mesurer, comparer ».
export const metadata: Metadata = {
  title: "Longueurs CE2 : 20 exercices corrigés, km, m, cm, mm, mesurer à la règle (PDF)",
  description:
    "Vingt exercices corrigés sur les longueurs au CE2 : 1 km = 1 000 m, 1 m = 100 cm, 1 cm = 10 mm, mesurer à la règle au millimètre, comparer et ranger des longueurs, choisir l'unité, estimer. Problèmes : une guirlande, un escargot, la tournée du facteur, trois rubans. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesLongueurCe2Page() {
  return <FicheExercicesClient fiche={exercicesLongueurCe2} />;
}
