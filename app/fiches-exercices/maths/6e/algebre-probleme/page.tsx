import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgebreProbleme6e } from "@/lib/fiches-exercices/maths-6e-algebre-probleme";

// Cette page répond à « exercices corrigés schéma en barres 6e » et « motifs
// évolutifs 6e » (pas de fiche de cours de 6e pour cette notion).
export const metadata: Metadata = {
  title: "Schéma en barres et motifs 6e : 20 exercices corrigés, nombres inconnus (PDF)",
  description:
    "Vingt exercices corrigés de 6e sur les problèmes à nombres inconnus, sans lettre : schéma en barres, retirer ce qui dépasse, partager en parts égales, trouver deux nombres par échange, motifs évolutifs en allumettes et en carreaux. Problèmes : tirelire, banquet, randonneurs, places de cinéma. Rappel avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAlgebreProbleme6ePage() {
  return <FicheExercicesClient fiche={exercicesAlgebreProbleme6e} />;
}
