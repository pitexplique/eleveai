import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionCe1 } from "@/lib/fiches-exercices/maths-ce1-fraction";

// ⚠️ Cette page répond à « exercices fractions simples CE1 : demi, tiers, quart, numérateur, comparer, ajouter ».
export const metadata: Metadata = {
  title: "Fractions simples CE1 : 20 exercices corrigés, demi, tiers, quart, comparer (PDF)",
  description:
    "Vingt exercices corrigés sur les fractions au CE1 : couper un tout en parts égales, reconnaître un demi, un tiers, un quart, un cinquième, un dixième, le numérateur et le dénominateur, comparer deux fractions, ajouter et enlever des parts, compléter jusqu'au tout. Défis : un jardin partagé, un ruban, des pizzas, une tablette de chocolat. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesFractionCe1Page() {
  return <FicheExercicesClient fiche={exercicesFractionCe1} />;
}
