import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDroiteCm1 } from "@/lib/fiches-exercices/maths-cm1-droite";

// ⚠️ Cette page répond à « exercices droites parallèles perpendiculaires CM1 » :
// segment, demi-droite, droite, parallèles, perpendiculaires, points alignés.
export const metadata: Metadata = {
  title: "Droites parallèles et perpendiculaires CM1 : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les droites au CM1 : reconnaître un segment, une demi-droite, une droite, repérer des droites parallèles (même écart) et perpendiculaires (angle droit) sur quadrillage, trouver des points alignés, lire les notations [AB] et (AB). Problèmes : une échelle, un terrain de handball, des plots de sport, un plan d'architecte. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDroiteCm1Page() {
  return <FicheExercicesClient fiche={exercicesDroiteCm1} />;
}
