import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPropEchelle6e } from "@/lib/fiches-exercices/maths-6e-prop-echelle";

// Cette page répond à « exercices corrigés échelles 6e » (pas de fiche de cours
// de 6e pour cette notion).
export const metadata: Metadata = {
  title: "Échelles 6e : 20 exercices corrigés, plan, carte, maquette (PDF)",
  description:
    "Vingt exercices corrigés sur les échelles en 6e : lire une échelle, passer du plan à la réalité et de la réalité au plan, retrouver l'échelle, échelles 1/10, 1/50, 1/100. Problèmes : chasse au trésor, maquette d'avion, potager, plan d'une rue. Sans produit en croix. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPropEchelle6ePage() {
  return <FicheExercicesClient fiche={exercicesPropEchelle6e} />;
}
