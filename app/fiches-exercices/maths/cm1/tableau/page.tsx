import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTableauCm1 } from "@/lib/fiches-exercices/maths-cm1-tableau";

// ⚠️ Cette page répond à « exercices tableau CM1 » : lire une case, compléter
// un total ou une case vide, comparer, résoudre un petit problème.
export const metadata: Metadata = {
  title: "Lire un tableau CM1 : 20 exercices corrigés, total, case manquante (PDF)",
  description:
    "Vingt exercices corrigés pour lire et compléter un tableau au CM1 : lire une case, croiser une ligne et une colonne, calculer un total, une case vide, un écart, vérifier un total. Problèmes : tortues, tournoi de football, bus, festival. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesTableauCm1Page() {
  return <FicheExercicesClient fiche={exercicesTableauCm1} />;
}
