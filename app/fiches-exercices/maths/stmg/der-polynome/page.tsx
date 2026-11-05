import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerPolynomeStmg } from "@/lib/fiches-exercices/maths-stmg-der-polynome";

export const metadata: Metadata = {
  title: "Dériver un polynôme STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour dériver un polynôme de degré 2 ou 3 : terme à terme, le nombre dérivé, la tangente horizontale, la forme factorisée à vérifier. Un chocolat, un ballon-sonde, des huîtres, un glacier. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDerPolynomeStmgPage() {
  return <FicheExercicesClient fiche={exercicesDerPolynomeStmg} />;
}
