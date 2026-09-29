import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPropProportionnalite5e } from "@/lib/fiches-exercices/maths-5e-prop-proportionnalite";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La proportionnalité ») :
// cette page répond à « exercices corrigés proportionnalité 5e ».
export const metadata: Metadata = {
  title: "Proportionnalité 5e : 20 exercices corrigés, tableau, coefficient, unité (PDF)",
  description:
    "Vingt exercices corrigés sur la proportionnalité en 5e : reconnaître une situation proportionnelle ou non, compléter un tableau, trouver le coefficient, passer par l'unité, calculer une quatrième proportionnelle, lire un graphique. Problèmes : pressoir, robinet qui goutte, tarifs de photos, podomètre. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPropProportionnalite5ePage() {
  return <FicheExercicesClient fiche={exercicesPropProportionnalite5e} />;
}
