import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctEquationsPuissanceStmg } from "@/lib/fiches-exercices/maths-stmg-fct-equations-puissance";

export const metadata: Metadata = {
  title: "Résoudre x² = c et x³ = c STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour résoudre x² = c et x³ = c : deux solutions opposées pour le carré, une seule pour le cube, la racine cubique et son arrondi, se ramener à une puissance seule. Une cuve, un plongeon, un parc animalier, une brasserie. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctEquationsPuissanceStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctEquationsPuissanceStmg} />;
}
