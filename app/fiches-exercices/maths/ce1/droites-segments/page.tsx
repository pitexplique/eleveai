import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDroitesSegmentsCe1 } from "@/lib/fiches-exercices/maths-ce1-droites-segments";

// ⚠️ Cette page répond à « exercices droites segments points alignés CE1 ».
export const metadata: Metadata = {
  title: "Droites et segments CE1 : 20 exercices corrigés, alignement, règle, milieu (PDF)",
  description:
    "Vingt exercices corrigés sur les droites et les segments au CE1 : reconnaître un segment et une droite, vérifier des points alignés avec la règle, mesurer un segment en partant du 0, trouver le milieu par pliage. Problèmes : des piquets de jardin, un ruban, une planche, des fils électriques. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDroitesSegmentsCe1Page() {
  return <FicheExercicesClient fiche={exercicesDroitesSegmentsCe1} />;
}
