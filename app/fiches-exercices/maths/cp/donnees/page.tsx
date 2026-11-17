import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDonneesCp } from "@/lib/fiches-exercices/maths-cp-donnees";

// ⚠️ Cette page répond à « exercices tableaux et diagrammes CP : bâtons, tableau, diagramme en barres, double entrée ».
export const metadata: Metadata = {
  title: "Tableaux et diagrammes CP : 20 exercices corrigés, bâtons, barres (PDF)",
  description:
    "Vingt exercices corrigés sur les données au CP : compter des bâtons, lire un tableau, lire un diagramme en barres gradué de un en un, trouver la case d'un tableau à double entrée, dire le plus, le moins, autant. Problèmes : une boulangère, un vétérinaire, un peintre, le potager de l'école. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDonneesCpPage() {
  return <FicheExercicesClient fiche={exercicesDonneesCp} />;
}
