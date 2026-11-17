import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSolidesCe1 } from "@/lib/fiches-exercices/maths-ce1-solides";

// ⚠️ Cette page répond à « exercices solides cube pavé pyramide faces sommets arêtes CE1 ».
export const metadata: Metadata = {
  title: "Solides CE1 : 20 exercices corrigés, cube, pavé, faces, sommets, arêtes (PDF)",
  description:
    "Vingt exercices corrigés sur les solides au CE1 : reconnaître et nommer le cube, le pavé, la boule, le cylindre, le cône et la pyramide, compter les faces, les sommets et les arêtes, même cachés, construire un cube avec des pailles. Problèmes : une boîte de bonbons, un escalier de cubes, des dés, des cartons. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesSolidesCe1Page() {
  return <FicheExercicesClient fiche={exercicesSolidesCe1} />;
}
