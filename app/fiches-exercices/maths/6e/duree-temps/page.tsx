import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDureeTemps6e } from "@/lib/fiches-exercices/maths-6e-duree-temps";

// Cette page répond à « exercices corrigés durées horaires 6e » (pas de fiche
// de cours de 6e pour cette notion).
export const metadata: Metadata = {
  title: "Horaires et durées 6e : 20 exercices corrigés, calculer, convertir (PDF)",
  description:
    "Vingt exercices corrigés sur les horaires et les durées en 6e : calculer une heure de fin ou une durée, convertir heures, minutes, secondes, jours et semaines, comprendre une durée décimale (1,5 h, 2,75 h), passer minuit, lire un tableau d'horaires. Problèmes : trains, marathon, nuit de sommeil, randonnée. Rappel avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDureeTemps6ePage() {
  return <FicheExercicesClient fiche={exercicesDureeTemps6e} />;
}
