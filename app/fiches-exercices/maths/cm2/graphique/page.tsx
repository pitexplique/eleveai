import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesGraphiqueCm2 } from "@/lib/fiches-exercices/maths-cm2-graphique";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Lire un graphique ») :
// cette page répond à « exercices corrigés lire un graphique CM2 ».
export const metadata: Metadata = {
  title: "Lire un graphique CM2 : 20 exercices corrigés, barres, courbes, diagramme circulaire (PDF)",
  description:
    "Vingt exercices corrigés pour lire un graphique en CM2 : diagramme en barres sur un axe gradué, valeur au milieu de deux graduations, courbe qui monte et qui descend, diagramme circulaire avec la moitié et le quart, barre à compléter, total à vérifier. Problèmes : la durée du jour, une rivière en crue, une journée de 24 heures, les pièces d'une archéologue. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesGraphiqueCm2Page() {
  return <FicheExercicesClient fiche={exercicesGraphiqueCm2} />;
}
