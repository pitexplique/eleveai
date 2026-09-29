import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAngleMesure6e } from "@/lib/fiches-exercices/maths-6e-angle-mesure";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les angles ») :
// cette page répond à « exercices corrigés angles 6e ».
export const metadata: Metadata = {
  title: "Angles 6e : 20 exercices corrigés, rapporteur, aigu, obtus, plat (PDF)",
  description:
    "Vingt exercices corrigés sur les angles en 6e : nommer un angle, le classer (aigu, droit, obtus, plat), le comparer, le mesurer et le tracer au rapporteur, calculer un angle dans un angle plat ou un tour complet. Problèmes : horloge, tarte, éventail, rose des vents, grande roue, miroir, ordinateur portable. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAngleMesure6ePage() {
  return <FicheExercicesClient fiche={exercicesAngleMesure6e} />;
}
