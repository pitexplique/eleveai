import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProblemeCe2 } from "@/lib/fiches-exercices/maths-ce2-probleme";

// ⚠️ Cette page répond à « problèmes CE2 corrigés : parties-tout, comparaison, fois plus, produit cartésien, deux et trois étapes ».
export const metadata: Metadata = {
  title: "Problèmes CE2 : 20 problèmes corrigés, schéma en barres, fois plus, deux étapes (PDF)",
  description:
    "Vingt problèmes corrigés au CE2 : choisir l'opération, chercher le tout ou une partie avec un schéma en barres, comparer (de plus, de moins, fois plus, fois moins), compter les tenues possibles, vérifier un résultat, problèmes à deux et trois étapes. Une fleuriste, une cantine, une kermesse, un nombre mystère. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesProblemeCe2Page() {
  return <FicheExercicesClient fiche={exercicesProblemeCe2} />;
}
