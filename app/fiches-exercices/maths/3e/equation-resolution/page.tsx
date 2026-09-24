import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEquations3e } from "@/lib/fiches-exercices/maths-3e-equations";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Résoudre une
// équation ») : cette page répond à « exercices corrigés équations 3e », l'autre
// à « cours équation 3e ».
export const metadata: Metadata = {
  title: "Équations 3e : 20 exercices corrigés, produit nul, mise en équation (PDF)",
  description:
    "Vingt exercices corrigés de 3e : résoudre une équation du premier degré, avec parenthèses ou fractions, vérifier une solution, l'équation produit nul, x² = a, et mettre un problème en équation comme au brevet. Deux loueurs de vélos, le triathlon olympique, une chandelle au football, une échappée du Tour de France. Rappel de cours avant chaque niveau, corrigé étape par étape avec la balance dessinée, PDF à imprimer.",
};

export default function ExercicesEquations3ePage() {
  return <FicheExercicesClient fiche={exercicesEquations3e} />;
}
