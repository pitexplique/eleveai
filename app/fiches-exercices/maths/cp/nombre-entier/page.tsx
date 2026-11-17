import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesNombreEntierCp } from "@/lib/fiches-exercices/maths-cp-nombre-entier";

// ⚠️ Cette page répond à « exercices nombres CP : dénombrer, dizaines et unités, comparer, ranger, ordinaux ».
export const metadata: Metadata = {
  title: "Nombres jusqu'à 100 CP : 20 exercices corrigés, dizaines, unités, comparer (PDF)",
  description:
    "Vingt exercices corrigés sur les nombres jusqu'à 100 au CP : compter une collection, lire les dizaines et les unités, écrire en chiffres, comparer et ranger, placer sur une ligne graduée, trouver le rang dans une file. Des dessins à chaque exercice, un rappel avant chaque niveau, un corrigé étape par étape, la réponse vérifiée en ligne, un PDF à imprimer.",
};

export default function ExercicesNombreEntierCpPage() {
  return <FicheExercicesClient fiche={exercicesNombreEntierCp} />;
}
