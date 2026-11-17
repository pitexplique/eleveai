import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLongueurCp } from "@/lib/fiches-exercices/maths-cp-longueur";

// ⚠️ Cette page répond à « exercices longueurs CP : comparer, mesurer à la règle, m et cm ».
export const metadata: Metadata = {
  title: "Longueurs CP : 20 exercices corrigés, comparer, mesurer à la règle, m et cm (PDF)",
  description:
    "Vingt exercices corrigés sur les longueurs au CP : long, court, près, loin, comparer deux rubans en les alignant, compter les carreaux, mesurer un trait avec la règle en partant du 0, choisir entre le mètre et le centimètre, 1 m = 100 cm. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesLongueurCpPage() {
  return <FicheExercicesClient fiche={exercicesLongueurCp} />;
}
