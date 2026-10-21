import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesGraphiqueCm1 } from "@/lib/fiches-exercices/maths-cm1-graphique";

// Cette page répond à « exercices lire un graphique CM1 » : la lecture sur un
// axe gradué, le diagramme circulaire, la barre à compléter.
export const metadata: Metadata = {
  title: "Lire un graphique CM1 : 20 exercices corrigés, diagramme en barres (PDF)",
  description:
    "Vingt exercices corrigés pour lire un graphique au CM1 : lire une barre sur un axe gradué, un diagramme circulaire, compléter une barre effacée, comparer, calculer un écart ou un total. Problèmes : vivarium, météo, musée, cantine. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesGraphiqueCm1Page() {
  return <FicheExercicesClient fiche={exercicesGraphiqueCm1} />;
}
