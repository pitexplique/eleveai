import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionsNombres4e } from "@/lib/fiches-exercices/maths-4e-fractions-nombres";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Fractions et nombres
// rationnels ») : cette page répond à « exercices corrigés fractions 4e »,
// l'autre à « cours fractions 4e ».
export const metadata: Metadata = {
  title:
    "Fractions 4e : 20 exercices corrigés, simplifier, comparer, écriture décimale et rationnels (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur les fractions : fractions égales, simplifier jusqu'à l'irréductible, passer de la fraction au décimal et retour, reconnaître un nombre rationnel, comparer et ranger des fractions, négatifs compris, trouver une fraction entre deux autres. Problèmes : les lancers francs, l'échappée du Tour de France, les braquets du vélo, qui vient le plus à vélo ? Rappel de cours avant chaque niveau, corrigé étape par étape avec un dessin à chaque exercice, PDF à imprimer.",
};

export default function ExercicesFractionsNombres4ePage() {
  return <FicheExercicesClient fiche={exercicesFractionsNombres4e} />;
}
