import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMultiplicationCe2 } from "@/lib/fiches-exercices/maths-ce2-multiplication";

// ⚠️ Cette page répond à « exercices multiplication CE2 : tables de 2 à 9, facteur, produit, multiple, × 10 et × 100, multiplication posée ».
export const metadata: Metadata = {
  title: "Multiplication CE2 : 20 exercices corrigés, tables, × 10 et × 100, multiplication posée (PDF)",
  description:
    "Vingt exercices corrigés sur la multiplication au CE2 : lire un rectangle de billes, les tables de 2 à 9, les mots facteur, produit et multiple, multiplier par 10 et par 100 par la valeur des chiffres, poser une multiplication par un nombre à un ou deux chiffres. Défis : un maraîcher, une salle de concert, des boîtes de chocolats, des maillots de foot. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMultiplicationCe2Page() {
  return <FicheExercicesClient fiche={exercicesMultiplicationCe2} />;
}
