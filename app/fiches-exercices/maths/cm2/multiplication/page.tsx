import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMultiplicationCm2 } from "@/lib/fiches-exercices/maths-cm2-multiplication";

export const metadata: Metadata = {
  title: "Multiplication CM2 : 20 exercices corrigés, tables, ×10 ×100, poser (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Les tables, le calcul de tête, multiplier par 10, 100 ou 1 000 par la valeur des chiffres, poser une multiplication avec ou sans virgule. Une boulangerie, un cinéma, des crêpes, un voyage en train et des panneaux solaires. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesMultiplicationCm2Page() {
  return <FicheExercicesClient fiche={exercicesMultiplicationCm2} />;
}
