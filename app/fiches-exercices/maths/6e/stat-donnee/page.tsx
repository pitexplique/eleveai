import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatDonnee6e } from "@/lib/fiches-exercices/maths-6e-stat-donnee";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Lire et interpréter
// des données ») : cette page répond à « exercices corrigés lire un graphique 6e ».
export const metadata: Metadata = {
  title: "Lire un graphique 6e : 20 exercices corrigés, tableau, diagramme circulaire (PDF)",
  description:
    "Vingt exercices corrigés pour lire et interpréter des données en 6e : diagramme en barres, graphique, diagramme circulaire, tableau à double entrée, total, écart, vrai ou faux. Problèmes : compteur de vélos, cantine, météo, défi anti-gaspi. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesStatDonnee6ePage() {
  return <FicheExercicesClient fiche={exercicesStatDonnee6e} />;
}
