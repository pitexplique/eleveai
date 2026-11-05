import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVaBernoulliStmg } from "@/lib/fiches-exercices/maths-stmg-va-bernoulli";

export const metadata: Metadata = {
  title: "Loi de Bernoulli STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur la loi de Bernoulli : reconnaître une épreuve à deux issues, écrire son espérance, la simuler avec un nombre aléatoire, compter les tirages, lire le diagramme des fréquences observées. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesVaBernoulliStmgPage() {
  return <FicheExercicesClient fiche={exercicesVaBernoulliStmg} />;
}
