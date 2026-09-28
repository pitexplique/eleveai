import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoFormulesPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-formules";

export const metadata: Metadata = {
  title: "Utiliser une formule — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : valeur d'une expression littérale, isoler une lettre, application numérique d'une formule, TVA, salaire brut et net, intérêts, coût moyen, échelle d'une carte, densité de population. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoFormulesPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoFormulesPremiere} />;
}
