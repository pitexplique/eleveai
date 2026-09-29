import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMediatriceSegment6e } from "@/lib/fiches-exercices/maths-6e-mediatrice-segment";

// ⚠️ Pas de fiche de cours pour cette notion : cette page répond à
// « exercices corrigés médiatrice d'un segment 6e ».
export const metadata: Metadata = {
  title: "Médiatrice d'un segment 6e : 20 exercices corrigés, construire, propriété (PDF)",
  description:
    "Vingt exercices corrigés sur la médiatrice en 6e : la reconnaître, utiliser sa propriété dans les deux sens, la construire à l'équerre, au compas ou par pliage, trouver le milieu d'une corde et le centre perdu d'un cercle. Problèmes : un gymnase, une assiette cassée, un cerf-volant, deux puits. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesMediatriceSegment6ePage() {
  return <FicheExercicesClient fiche={exercicesMediatriceSegment6e} />;
}
