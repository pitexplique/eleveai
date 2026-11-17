import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDureeCe1 } from "@/lib/fiches-exercices/maths-ce1-duree";

// ⚠️ Cette page répond à « exercices temps et durées CE1 : lire l'heure, aiguilles, h et min, durées, calendrier ».
export const metadata: Metadata = {
  title: "Temps et durées CE1 : 20 exercices corrigés, lire l'heure, calendrier (PDF)",
  description:
    "Vingt exercices corrigés sur le temps et les durées au CE1 : lire l'heure sur une horloge à aiguilles (heures, demi-heures, quarts d'heure), placer les aiguilles, le matin et l'après-midi, 1 h = 60 min, calculer une durée, lire un calendrier. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDureeCe1Page() {
  return <FicheExercicesClient fiche={exercicesDureeCe1} />;
}
