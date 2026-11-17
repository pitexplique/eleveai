import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDonneesCe2 } from "@/lib/fiches-exercices/maths-ce2-donnees";

// ⚠️ Cette page répond à « exercices tableaux et diagrammes en barres CE2 : lire, compléter, tracer ».
export const metadata: Metadata = {
  title: "Tableaux et diagrammes en barres CE2 : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les données au CE2 : lire un tableau et un tableau à double entrée, compléter un tableau, lire un diagramme en barres gradué de 2 en 2, de 5 en 5 ou de 10 en 10, tracer une barre, comparer et calculer. Problèmes : une tombola, un atelier de vélos, un potager, un club de sport. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDonneesCe2Page() {
  return <FicheExercicesClient fiche={exercicesDonneesCe2} />;
}
