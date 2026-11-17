import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMasseContenanceCp } from "@/lib/fiches-exercices/maths-cp-masse-contenance";

// ⚠️ Cette page répond à « exercices masses CP : lourd, léger, balance à plateaux, comparer, ranger ».
export const metadata: Metadata = {
  title: "Masses CP : 20 exercices corrigés, lourd, léger, balance, ranger (PDF)",
  description:
    "Vingt exercices corrigés sur les masses au CP, sans aucune unité comme le veut le programme : dire lourd ou léger, lire une balance à plateaux, comparer deux objets, ranger trois objets, se méfier du plus gros. Un marché, des chiots, des boîtes mystère et une bascule au parc. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMasseContenanceCpPage() {
  return <FicheExercicesClient fiche={exercicesMasseContenanceCp} />;
}
