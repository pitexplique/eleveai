import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctDegre2CourbeStmg } from "@/lib/fiches-exercices/maths-stmg-fct-degre2-courbe";

export const metadata: Metadata = {
  title: "Degré 2, la parabole STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur la parabole : associer une courbe à son expression, lire le signe et la valeur de a, interpréter b comme une translation verticale. Une fontaine, un skatepark, une arche de pont, une antenne. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctDegre2CourbeStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctDegre2CourbeStmg} />;
}
