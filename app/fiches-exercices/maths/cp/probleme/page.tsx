import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProblemeCp } from "@/lib/fiches-exercices/maths-cp-probleme";

// ⚠️ Cette page répond à « problèmes CP : parties-tout, retrait, écart, deux étapes, groupes égaux, partage ».
export const metadata: Metadata = {
  title: "Problèmes CP : 20 problèmes corrigés, additions, soustractions, partages (PDF)",
  description:
    "Vingt problèmes corrigés au CP : comprendre ce qu'on cherche, réunir, enlever, comparer, faire un schéma en barre, compter des groupes égaux, partager, résoudre en deux étapes, vérifier que la réponse est possible. Un aquarium, un bus, des araignées, une bibliothèque, une sortie au zoo. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesProblemeCpPage() {
  return <FicheExercicesClient fiche={exercicesProblemeCp} />;
}
