import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProblemeCe1 } from "@/lib/fiches-exercices/maths-ce1-probleme";

// ⚠️ Cette page répond à « exercices problèmes CE1 : additifs, comparaison, deux étapes, multiplicatifs, partages, schéma en barre ».
export const metadata: Metadata = {
  title: "Problèmes CE1 : 20 exercices corrigés, schéma en barre, +, −, ×, ÷ (PDF)",
  description:
    "Vingt problèmes corrigés pour le CE1 : choisir le bon calcul, parties et tout, comparaison, deux étapes, multiplications et partages, schéma en barre, phrase réponse avec l'unité. Une ferme, un car, une kermesse, une cantine, un pâtissier. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesProblemeCe1Page() {
  return <FicheExercicesClient fiche={exercicesProblemeCe1} />;
}
