import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoProbaLecturePremiere } from "@/lib/fiches-exercices/maths-premiere-auto-proba-lecture";

export const metadata: Metadata = {
  title: "Lire une probabilité dans un tableau ou un arbre — automatismes 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première, sans calculatrice : lire P(A ∩ B) dans un tableau croisé, une probabilité conditionnelle sur une ligne ou un arbre pondéré, distinguer P_A(B) et P_B(A). Clients satisfaits, vote par âge, chômage des jeunes, fraude bancaire. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoProbaLecturePremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoProbaLecturePremiere} />;
}
