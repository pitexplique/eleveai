import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoLireStatistiquesPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-lire-statistiques";

export const metadata: Metadata = {
  title: "Lire des graphiques statistiques — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : lire un diagramme en barres, en bâtons, circulaire, un nuage de points, passer du graphique aux données. Population par âge, élections, sondage, salaires, loyers, budget d'un ménage. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoLireStatistiquesPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoLireStatistiquesPremiere} />;
}
