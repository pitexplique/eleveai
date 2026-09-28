import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoTableauCroisePremiere } from "@/lib/fiches-exercices/maths-premiere-info-tableau-croise";

export const metadata: Metadata = {
  title: "Le tableau croisé — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première sur le tableau croisé d'effectifs : lire une case ou une marge, compléter un tableau, le dresser à partir d'un énoncé. Tri des déchets, véhicules électriques, semi-marathon, exode rural, station de ski. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesInfoTableauCroisePremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoTableauCroisePremiere} />;
}
