import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLogProprietesStmg } from "@/lib/fiches-exercices/maths-stmg-log-proprietes";

export const metadata: Metadata = {
  title: "Propriétés du logarithme décimal STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur les propriétés du logarithme décimal : produit, quotient, puissance, inverse, calculs avec un tableau de valeurs. Le gain d'un amplificateur, la magnitude des étoiles, un code secret, une population de bouquetins. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesLogProprietesStmgPage() {
  return <FicheExercicesClient fiche={exercicesLogProprietesStmg} />;
}
