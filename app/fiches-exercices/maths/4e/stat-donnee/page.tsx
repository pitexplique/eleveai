import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatDonnee4e } from "@/lib/fiches-exercices/maths-4e-stat-donnee";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Lire et interpréter
// des données ») : cette page répond à « exercices corrigés effectif fréquence
// 4e », l'autre à « cours lire des données 4e ».
export const metadata: Metadata = {
  title: "Effectifs et fréquences 4e : 20 exercices corrigés pour lire des données (PDF)",
  description:
    "Vingt exercices corrigés de 4e pour lire et interpréter des données : tableau à double entrée, diagramme en barres et en bâtons sur un axe gradué, axe tronqué, diagramme circulaire en pourcentages, effectif total et effectif manquant, fréquence en fraction, en décimal et en pourcentage, pourcentage d'un total. Le palmarès du Grand Chelem, les départements de France, l'électricité de 2023, les 206 os du squelette, les groupes sanguins et les 88 touches du piano. Rappel de cours avant chaque niveau, corrigé étape par étape avec le piège nommé, PDF à imprimer.",
};

export default function ExercicesStatDonnee4ePage() {
  return <FicheExercicesClient fiche={exercicesStatDonnee4e} />;
}
