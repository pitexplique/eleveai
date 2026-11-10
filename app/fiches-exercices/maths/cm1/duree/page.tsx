import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDureeCm1 } from "@/lib/fiches-exercices/maths-cm1-duree";

// ⚠️ Cette page répond à « exercices durées CM1 : lire l'heure, convertir h, min, s, calculer une durée ».
export const metadata: Metadata = {
  title: "Durées CM1 : 20 exercices corrigés, lire l'heure, calculer une durée (PDF)",
  description:
    "Vingt exercices corrigés sur les durées au CM1 : lire l'heure sur une horloge à aiguilles, placer les aiguilles, convertir heures, minutes et secondes, calculer une durée, trouver l'heure de fin. Problèmes : un train, un boulanger, une infirmière de nuit, un concert. Rappel de cours avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDureeCm1Page() {
  return <FicheExercicesClient fiche={exercicesDureeCm1} />;
}
