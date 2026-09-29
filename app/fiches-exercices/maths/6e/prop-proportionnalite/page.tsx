import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPropProportionnalite6e } from "@/lib/fiches-exercices/maths-6e-prop-proportionnalite";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La proportionnalité ») :
// cette page répond à « exercices corrigés proportionnalité 6e ».
export const metadata: Metadata = {
  title: "Proportionnalité 6e : 20 exercices corrigés, tableau, coefficient, passage à l'unité (PDF)",
  description:
    "Vingt exercices corrigés sur la proportionnalité en 6e : reconnaître une situation proportionnelle, compléter un tableau, trouver le coefficient, passer par l'unité. Problèmes : pique-nique, roue de vélo, plein d'essence, salle d'escalade. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPropProportionnalite6ePage() {
  return <FicheExercicesClient fiche={exercicesPropProportionnalite6e} />;
}
