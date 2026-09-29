import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatStatistique5e } from "@/lib/fiches-exercices/maths-5e-stat-statistique";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les statistiques ») :
// cette page répond à « exercices corrigés statistiques 5e ».
export const metadata: Metadata = {
  title: "Statistiques 5e : 20 exercices corrigés, effectifs, fréquences, moyenne (PDF)",
  description:
    "Vingt exercices corrigés de statistiques en 5e : ranger des données dans un tableau d'effectifs, lire un tableau et un diagramme, fréquence en fraction, décimal et pourcentage, diagrammes en bâtons, en barres et circulaire, choisir une représentation, calculer et viser une moyenne. Problèmes : petit-déjeuner, comptage d'oiseaux, deux joueuses, pluie de six mois. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesStatStatistique5ePage() {
  return <FicheExercicesClient fiche={exercicesStatStatistique5e} />;
}
