import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDureeCp } from "@/lib/fiches-exercices/maths-cp-duree";

// ⚠️ Cette page répond à « exercices heure CP : lire l'heure pile, placer les aiguilles, matin midi soir ».
export const metadata: Metadata = {
  title: "Lire l'heure CP : 20 exercices corrigés, heures entières et aiguilles (PDF)",
  description:
    "Vingt exercices corrigés pour lire l'heure au CP : lire une heure entière sur une horloge à aiguilles, placer la petite et la grande aiguille, associer une heure à un moment de la journée, ranger les moments dans l'ordre. Défis : l'horloge qui avance, le réveil mal réglé. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDureeCpPage() {
  return <FicheExercicesClient fiche={exercicesDureeCp} />;
}
