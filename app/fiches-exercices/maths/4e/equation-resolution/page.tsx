import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEquations4e } from "@/lib/fiches-exercices/maths-4e-equations";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les équations ») :
// cette page répond à « exercices corrigés équations 4e », l'autre à « cours
// équation 4e ».
export const metadata: Metadata = {
  title: "Équations 4e : 20 exercices corrigés, réduire, développer, mettre en équation (PDF)",
  description:
    "Vingt exercices corrigés de 4e : reconnaître une équation, traduire une phrase, résoudre en un geste puis en plusieurs, réduire, développer une parenthèse, regrouper les x d'un côté, vérifier une solution, et mettre un problème en équation. Un terrain de football, électrique ou essence, le CO₂ de l'air, un marathon en relais. Rappel de cours avant chaque niveau, corrigé étape par étape avec la balance dessinée, PDF à imprimer.",
};

export default function ExercicesEquations4ePage() {
  return <FicheExercicesClient fiche={exercicesEquations4e} />;
}
