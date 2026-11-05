import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLogiqueConnecteursStmg } from "@/lib/fiches-exercices/maths-stmg-logique-connecteurs";

export const metadata: Metadata = {
  title: "Logique : et, ou, non STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les connecteurs logiques : et, ou, non, négation d'une inégalité et « ou » courant. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesLogiqueConnecteursStmgPage() {
  return <FicheExercicesClient fiche={exercicesLogiqueConnecteursStmg} />;
}
