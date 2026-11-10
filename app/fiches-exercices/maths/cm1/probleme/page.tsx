import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProblemeCm1 } from "@/lib/fiches-exercices/maths-cm1-probleme";

// ⚠️ Cette page répond à « exercices problèmes CM1 ».
export const metadata: Metadata = {
  title: "Problèmes CM1 : 20 exercices corrigés, choisir l'opération, plusieurs étapes, schéma en barres (PDF)",
  description:
    "Vingt problèmes corrigés pour le CM1 : choisir la bonne opération, résoudre en une ou plusieurs étapes, choisir la bonne phrase réponse, vérifier qu'un résultat est possible, faire un schéma en barres. Des billes, un bus, des croissants, un car scolaire, un zoo, une électricienne. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProblemeCm1Page() {
  return <FicheExercicesClient fiche={exercicesProblemeCm1} />;
}
