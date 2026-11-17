import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPerimetreCe2 } from "@/lib/fiches-exercices/maths-ce2-perimetre";

// ⚠️ Cette page répond à « exercices périmètre CE2 : polygone, rectangle, carré, comparer au compas ».
export const metadata: Metadata = {
  title: "Périmètre CE2 : 20 exercices corrigés, polygone, rectangle, carré (PDF)",
  description:
    "Vingt exercices corrigés sur le périmètre au CE2 : comprendre que le périmètre est le tour d'une figure, additionner les côtés d'un polygone, compter le tour sur un quadrillage, comparer des périmètres au compas, le rectangle et le carré. Problèmes : un poulailler, une nappe, deux carreaux collés, un fil de fer. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesPerimetreCe2Page() {
  return <FicheExercicesClient fiche={exercicesPerimetreCe2} />;
}
