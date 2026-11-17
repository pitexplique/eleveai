import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSymetrieCe2 } from "@/lib/fiches-exercices/maths-ce2-symetrie";

// ⚠️ Cette page répond à « exercices symétrie axiale axe de symétrie quadrillage compléter une figure CE2 ».
export const metadata: Metadata = {
  title: "Symétrie axiale CE2 : 20 exercices corrigés, axes, quadrillage, compléter une figure (PDF)",
  description:
    "Vingt exercices corrigés sur la symétrie axiale au CE2 : trouver les axes de symétrie d'une figure ou d'une lettre, compléter une figure sur quadrillage, trouver la case ou le point symétrique en comptant depuis l'axe. Problèmes : le papillon d'une artiste, la frise d'une carreleuse, la façade d'une case créole, les rosiers d'un jardin. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesSymetrieCe2Page() {
  return <FicheExercicesClient fiche={exercicesSymetrieCe2} />;
}
