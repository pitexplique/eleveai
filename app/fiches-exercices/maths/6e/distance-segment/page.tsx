import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDistanceSegment6e } from "@/lib/fiches-exercices/maths-6e-distance-segment";

// ⚠️ Pas de fiche de cours pour cette notion : cette page répond à
// « exercices corrigés distance milieu d'un segment 6e ».
export const metadata: Metadata = {
  title: "Distance et milieu d'un segment 6e : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les distances en 6e : (AB), [AB] ou AB, lire une longueur sur la règle, trouver et construire le milieu d'un segment, le plus court chemin et les points alignés. Problèmes : un raccourci dans un parc, une ligne de tram, un ruban plié, une carte au trésor. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDistanceSegment6ePage() {
  return <FicheExercicesClient fiche={exercicesDistanceSegment6e} />;
}
