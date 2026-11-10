import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSymetrieCm1 } from "@/lib/fiches-exercices/maths-cm1-symetrie";

// ⚠️ Cette page répond à « exercices symétrie axiale CM1 » : axe de symétrie,
// compléter une figure sur quadrillage, symétrique d'un point.
export const metadata: Metadata = {
  title: "Symétrie axiale CM1 : 20 exercices corrigés, axes, quadrillage (PDF)",
  description:
    "Vingt exercices corrigés sur la symétrie axiale au CM1 : reconnaître un axe de symétrie, compter les axes d'une figure ou d'une lettre, trouver la case ou le point symétrique sur un quadrillage, compléter une figure, savoir que la symétrie garde les longueurs. Problèmes : une case créole, un carrelage à deux axes, des drapeaux, un jardin à la française. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSymetrieCm1Page() {
  return <FicheExercicesClient fiche={exercicesSymetrieCm1} />;
}
