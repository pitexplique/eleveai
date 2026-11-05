import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLogDefinitionStmg } from "@/lib/fiches-exercices/maths-stmg-log-definition";

export const metadata: Metadata = {
  title: "Logarithme décimal, définition STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur le logarithme décimal : log(b), solution de 10^x = b, valeurs à connaître, retrouver x, encadrer un logarithme, sens de variation. Les décibels, le pH, un séisme, une dilution. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesLogDefinitionStmgPage() {
  return <FicheExercicesClient fiche={exercicesLogDefinitionStmg} />;
}
