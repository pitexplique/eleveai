import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAngleMesure5e } from "@/lib/fiches-exercices/maths-5e-angle-mesure";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les angles ») :
// cette page répond à « exercices corrigés angles 5e ».
export const metadata: Metadata = {
  title: "Angles 5e : 20 exercices corrigés, rapporteur, parallèles et sécante (PDF)",
  description:
    "Vingt exercices corrigés sur les angles en 5e : nommer, mesurer et tracer au rapporteur, estimer, angles complémentaires, supplémentaires et opposés par le sommet, angles alternes-internes et correspondants. Problèmes : rues d'une ville, horloge, pointe entre deux parallèles, ombre au soleil. Rappel de cours avant chaque niveau, corrigé étape par étape, figures à l'échelle, PDF à imprimer.",
};

export default function ExercicesAngleMesure5ePage() {
  return <FicheExercicesClient fiche={exercicesAngleMesure5e} />;
}
