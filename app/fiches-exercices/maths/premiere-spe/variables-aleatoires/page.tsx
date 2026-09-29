import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVariablesAleatoiresPremiere } from "@/lib/fiches-exercices/maths-premiere-variables-aleatoires";

export const metadata: Metadata = {
  title: "Variables aléatoires 1re spé : 20 exercices corrigés, espérance et écart type (PDF)",
  description:
    "Vingt exercices corrigés sur les variables aléatoires en première spécialité : loi de probabilité, notations P(X = a) et P(X ≤ a), espérance, variance, écart type, jeu équitable, E(aX + b), simulation en Python et moyenne d'un échantillon, capture-recapture. Lois dessinées en barres, espérance marquée sur la droite graduée, PDF à imprimer.",
};

export default function ExercicesVariablesAleatoiresPremierePage() {
  return <FicheExercicesClient fiche={exercicesVariablesAleatoiresPremiere} />;
}
