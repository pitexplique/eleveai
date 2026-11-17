import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesReperageCe1 } from "@/lib/fiches-exercices/maths-ce1-reperage";

// ⚠️ Cette page répond à « exercices repérage CE1 : positions, plan, cubes, quadrillage, cases, déplacements ».
export const metadata: Metadata = {
  title: "Repérage CE1 : 20 exercices corrigés, positions, plan, quadrillage (PDF)",
  description:
    "Vingt exercices corrigés sur le repérage au CE1 : devant, entre, au-dessus, à gauche ; lire le plan de la classe et du quartier ; compter des cubes ; cases et nœuds d'un quadrillage ; repérer une case (C2) ; suivre un déplacement codé. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesReperageCe1Page() {
  return <FicheExercicesClient fiche={exercicesReperageCe1} />;
}
