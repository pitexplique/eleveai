import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoSuiteGeometriquePremiere } from "@/lib/fiches-exercices/maths-premiere-expo-suite-geometrique";

export const metadata: Metadata = {
  title: "Reconnaître une suite géométrique en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les suites géométriques en première, enseignement de mathématiques hors spécialité : reconnaître une suite géométrique par les quotients, écrire la relation de récurrence, relier la raison à un taux d'évolution, calculer les termes. Livret d'épargne, lumière sous l'eau, légende de l'échiquier, course à pied, médicament, balle qui rebondit. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesExpoSuiteGeometriquePremierePage() {
  return <FicheExercicesClient fiche={exercicesExpoSuiteGeometriquePremiere} />;
}
