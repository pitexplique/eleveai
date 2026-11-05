import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteSeuilStmg } from "@/lib/fiches-exercices/maths-stmg-suite-seuil";

export const metadata: Metadata = {
  title: "Problème de seuil STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les problèmes de seuil : lire un rang dans un tableau ou sur un graphique, calculer de proche en proche, écrire la condition d'une boucle « tant que », repérer quand une suite dépasse une autre. Une recyclerie, un médicament, un food-truck, une réserve d'eau. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteSeuilStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteSeuilStmg} />;
}
