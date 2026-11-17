import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTrierClasserCe1 } from "@/lib/fiches-exercices/maths-ce1-trier-classer";

// ⚠️ Cette page répond à « exercices trier classer intrus ensembles CE1 ».
export const metadata: Metadata = {
  title: "Trier et classer CE1 : 20 exercices corrigés, intrus, ensembles (PDF)",
  description:
    "Vingt exercices corrigés pour trier et classer au CE1 : trier selon une règle, trouver l'intrus, trouver le point commun d'un groupe, lire deux ensembles qui se croisent. Problèmes : une bibliothèque, un facteur, un marchand de fruits, une colonie. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesTrierClasserCe1Page() {
  return <FicheExercicesClient fiche={exercicesTrierClasserCe1} />;
}
