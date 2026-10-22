import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoDonneesGraphiquesStmg } from "@/lib/fiches-exercices/maths-stmg-auto-donnees-graphiques";

export const metadata: Metadata = {
  title: "Lire un graphique en STMG, automatismes : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes de STMG pour lire des données chiffrées : origine et pas d'un axe, axe tronqué, diagramme en barres, en bâtons, diagramme circulaire, diagramme en boîte (médiane, quartiles, écart interquartile), passer du graphique au tableau et du tableau au graphique. Boulangerie, budget d'association, salaires, chiffre d'affaires, délais de livraison, publicité trompeuse ; les régions de France, la Coupe du monde 2026, les plus hautes tours. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoDonneesGraphiquesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoDonneesGraphiquesStmg} />;
}
