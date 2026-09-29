import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesParallelogramme5e } from "@/lib/fiches-exercices/maths-5e-parallelogramme";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le parallélogramme ») :
// cette page répond à « exercices corrigés parallélogramme 5e ».
export const metadata: Metadata = {
  title: "Parallélogramme 5e : 20 exercices corrigés, losange, rectangle, carré (PDF)",
  description:
    "Vingt exercices corrigés sur le parallélogramme en 5e : le reconnaître, côtés et angles opposés, angles consécutifs, diagonales et centre de symétrie, losange, rectangle et carré, constructions. Problèmes : portail extensible, pavage de losanges, segment qui passe par le centre, cadre qu'on pousse. Rappel de cours avant chaque niveau, corrigé étape par étape, figures codées à l'échelle, PDF à imprimer.",
};

export default function ExercicesParallelogramme5ePage() {
  return <FicheExercicesClient fiche={exercicesParallelogramme5e} />;
}
