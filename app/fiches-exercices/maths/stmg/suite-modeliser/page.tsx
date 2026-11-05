import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteModeliserStmg } from "@/lib/fiches-exercices/maths-stmg-suite-modeliser";

export const metadata: Metadata = {
  title: "Modéliser par une suite STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour modéliser par une suite : croissance linéaire ou exponentielle, premier terme et relation, rang d'une année, capital à intérêts composés, phrase de conclusion. Un glacier, un tramway, une salle de sport, une voiture d'auto-école. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteModeliserStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteModeliserStmg} />;
}
