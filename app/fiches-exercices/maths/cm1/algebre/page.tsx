import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgebreCm1 } from "@/lib/fiches-exercices/maths-cm1-algebre";

// ⚠️ Cette page répond à « exercices algèbre CM1 ».
export const metadata: Metadata = {
  title: "Algèbre CM1 : 20 exercices corrigés, égalités, nombre inconnu, motifs, programmes de calcul (PDF)",
  description:
    "Vingt exercices corrigés de premiers pas en algèbre au CM1 : comprendre le signe =, compléter une égalité, trouver le nombre qui manque, poursuivre un motif qui grandit, trouver la règle entre deux quantités, suivre un programme de calcul, lire un schéma en barres. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAlgebreCm1Page() {
  return <FicheExercicesClient fiche={exercicesAlgebreCm1} />;
}
