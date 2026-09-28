import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAleaBernoulliPremiere } from "@/lib/fiches-exercices/maths-premiere-alea-bernoulli";

export const metadata: Metadata = {
  title: "Épreuves de Bernoulli, reconnaître — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première : reconnaître une épreuve de Bernoulli, une répétition d'épreuves identiques et indépendantes, distinguer tirage avec et sans remise. Urnes, roues, dés, tirs au but, carbone 14, sondages, contrôle qualité, météo, tortues marines, conscrits du XIXᵉ siècle. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAleaBernoulliPremierePage() {
  return <FicheExercicesClient fiche={exercicesAleaBernoulliPremiere} />;
}
