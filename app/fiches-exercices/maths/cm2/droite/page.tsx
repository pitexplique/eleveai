import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDroiteCm2 } from "@/lib/fiches-exercices/maths-cm2-droite";

export const metadata: Metadata = {
  title: "Droites, parallèles et perpendiculaires CM2 : 20 exercices corrigés, parallèles, perpendiculaires (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Reconnaître et écrire un segment, une demi-droite, une droite, repérer des parallèles et des perpendiculaires, choisir le bon point pour en tracer une. Des rails, une guitare, le plan d'un quartier, un cerf-volant et l'échelle des pompiers. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDroiteCm2Page() {
  return <FicheExercicesClient fiche={exercicesDroiteCm2} />;
}
