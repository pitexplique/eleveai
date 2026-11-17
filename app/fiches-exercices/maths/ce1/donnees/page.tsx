import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDonneesCe1 } from "@/lib/fiches-exercices/maths-ce1-donnees";

// ⚠️ Cette page répond à « exercices tableaux diagrammes en barres CE1 ».
export const metadata: Metadata = {
  title: "Tableaux et graphiques CE1 : 20 exercices corrigés, diagramme en barres (PDF)",
  description:
    "Vingt exercices corrigés sur les tableaux et les graphiques au CE1 : lire un tableau et un tableau à double entrée, lire un diagramme en barres sur un axe gradué, compléter un tableau d'enquête, préparer un diagramme. Problèmes : une boulangère, une vétérinaire, un marché, des voitures à compter. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDonneesCe1Page() {
  return <FicheExercicesClient fiche={exercicesDonneesCe1} />;
}
