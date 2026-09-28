import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLinSuiteArithmetiquePremiere } from "@/lib/fiches-exercices/maths-premiere-lin-suite-arithmetique";

// La première SANS spécialité : le titre le dit, pour ne pas voler la requête
// de la feuille des suites de la spé.
export const metadata: Metadata = {
  title: "Suite arithmétique en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés pour reconnaître une suite arithmétique en première, enseignement de mathématiques hors spécialité : raison, relation de récurrence, notations u(n) et uₙ, terme de rang donné. Tirelire, forêt, club de sport, ruches, tramway, température et altitude, haies, salaires. Termes dessinés dans un repère, PDF à imprimer.",
};

export default function ExercicesLinSuiteArithmetiquePremierePage() {
  return <FicheExercicesClient fiche={exercicesLinSuiteArithmetiquePremiere} />;
}
