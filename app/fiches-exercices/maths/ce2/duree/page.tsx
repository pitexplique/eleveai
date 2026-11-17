import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDureeCe2 } from "@/lib/fiches-exercices/maths-ce2-duree";

// ⚠️ Cette page répond à « exercices temps et durées CE2 : lire l'heure, aiguilles, h et min, calculer une durée ».
export const metadata: Metadata = {
  title: "Temps et durées CE2 : 20 exercices corrigés, lire l'heure, calculer une durée (PDF)",
  description:
    "Vingt exercices corrigés sur le temps et les durées au CE2 : lire l'heure à 5 minutes près sur une horloge à aiguilles, placer les aiguilles, 1 h = 60 min et 1 jour = 24 h, changer les heures en minutes, calculer une durée en passant par l'heure pile. Problèmes : un zoo, une sortie au volcan, une pendule, un sirop. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDureeCe2Page() {
  return <FicheExercicesClient fiche={exercicesDureeCe2} />;
}
