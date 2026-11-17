import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesNombreEntierCe2 } from "@/lib/fiches-exercices/maths-ce2-nombre-entier";

// ⚠️ Cette page répond à « exercices nombres jusqu'à 10 000 CE2 : lire, écrire, décomposer, comparer, encadrer, droite graduée ».
export const metadata: Metadata = {
  title: "Nombres jusqu'à 10 000 CE2 : 20 exercices corrigés, milliers, décomposer, comparer, encadrer (PDF)",
  description:
    "Vingt exercices corrigés sur les nombres jusqu'à 10 000 au CE2 : lire et écrire les nombres, milliers, centaines, dizaines et unités, décomposer, comparer et ranger, encadrer, placer sur une droite graduée. Défis : un nombre mystère, une usine de bouchons, une course, un bocal de kermesse. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesNombreEntierCe2Page() {
  return <FicheExercicesClient fiche={exercicesNombreEntierCe2} />;
}
