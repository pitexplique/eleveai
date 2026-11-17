import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionCe2 } from "@/lib/fiches-exercices/maths-ce2-fraction";

// ⚠️ Cette page répond à « exercices fractions CE2 : lire, fractions égales, additionner, comparer, droite graduée ».
export const metadata: Metadata = {
  title: "Fractions CE2 : 20 exercices corrigés, fractions égales, comparer, additionner (PDF)",
  description:
    "Vingt exercices corrigés sur les fractions inférieures ou égales à 1 au CE2 : partager l'unité en parts égales, lire et représenter une fraction, fractions égales, additionner et soustraire, bande unité, droite graduée, comparer deux fractions et comparer à 1. Problèmes : un jardin partagé, un ruban de couturière, une course de relais, un gâteau d'anniversaire. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesFractionCe2Page() {
  return <FicheExercicesClient fiche={exercicesFractionCe2} />;
}
