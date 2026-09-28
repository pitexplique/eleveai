import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAleaBernoulliCalculPremiere } from "@/lib/fiches-exercices/maths-premiere-alea-bernoulli-calcul";

export const metadata: Metadata = {
  title: "Répétition d'épreuves, calculer — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première : arbre d'une répétition de deux, trois ou quatre épreuves de Bernoulli, probabilité d'un chemin, « exactement k succès » en comptant les chemins, « au moins un » par l'évènement contraire. Lancers francs, signal numérique, élection, conteneurs frigorifiques, LED, disettes médiévales, relais radio, éoliennes, tennis. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAleaBernoulliCalculPremierePage() {
  return <FicheExercicesClient fiche={exercicesAleaBernoulliCalculPremiere} />;
}
