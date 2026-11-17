import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMultiplicationCe1 } from "@/lib/fiches-exercices/maths-ce1-multiplication";

// ⚠️ Cette page répond à « exercices multiplication CE1 : addition répétée, signe ×, tables de 2, 5 et 10, pair et impair ».
export const metadata: Metadata = {
  title: "Multiplication CE1 : 20 exercices corrigés, tables de 2, 5 et 10, pair ou impair (PDF)",
  description:
    "Vingt exercices corrigés sur la multiplication au CE1 : comprendre « 4 fois 3 », écrire avec le signe ×, lire un rectangle de billes, savoir que 3 × 5 = 5 × 3, reconnaître un nombre pair ou impair, les tables de 2, de 5 et de 10. Défis : des bouquets, une grande roue, des chaussettes, un jeu de mains. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMultiplicationCe1Page() {
  return <FicheExercicesClient fiche={exercicesMultiplicationCe1} />;
}
