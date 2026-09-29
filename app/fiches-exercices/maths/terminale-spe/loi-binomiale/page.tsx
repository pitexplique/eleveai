import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLoiBinomialeTerminale } from "@/lib/fiches-exercices/maths-terminale-loi-binomiale";

export const metadata: Metadata = {
  title: "Loi binomiale terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur la loi binomiale en terminale spécialité : schéma de Bernoulli, reconnaître une loi binomiale, calculer P(X = k) et P(X ≤ k), espérance, variance et écart-type, « au moins une fois », seuils avec le logarithme et une boucle Python, démonstration de la formule. Problèmes de bac : QCM au hasard, parc d'éoliennes, deux ateliers, avion en surréservation. Rappel de cours avant chaque niveau, lois dessinées en barres, PDF à imprimer.",
};

export default function ExercicesLoiBinomialeTerminalePage() {
  return <FicheExercicesClient fiche={exercicesLoiBinomialeTerminale} />;
}
