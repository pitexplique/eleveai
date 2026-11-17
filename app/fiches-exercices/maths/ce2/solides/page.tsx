import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSolidesCe2 } from "@/lib/fiches-exercices/maths-ce2-solides";

// ⚠️ Cette page répond à « exercices solides cube pavé pyramide faces arêtes sommets patron CE2 ».
export const metadata: Metadata = {
  title: "Solides CE2 : 20 exercices corrigés, cube, pyramide, faces, arêtes, sommets, patron (PDF)",
  description:
    "Vingt exercices corrigés sur les solides au CE2 : nommer le cube, le pavé, la boule, le cylindre, le cône et la pyramide, compter faces, arêtes et sommets sur un dessin en perspective, les faces d'une pyramide, choisir un patron de cube. Problèmes : la boîte d'une chocolatière, la pyramide du Louvre, des dés collés, les cartons d'un déménageur. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesSolidesCe2Page() {
  return <FicheExercicesClient fiche={exercicesSolidesCe2} />;
}
