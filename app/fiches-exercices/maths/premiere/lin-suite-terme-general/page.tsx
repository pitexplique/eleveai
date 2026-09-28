import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLinSuiteTermeGeneralPremiere } from "@/lib/fiches-exercices/maths-premiere-lin-suite-terme-general";

// La première SANS spécialité : le titre le dit, pour ne pas voler la requête
// de la feuille des suites de la spé.
export const metadata: Metadata = {
  title: "Terme général d'une suite arithmétique en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur le terme général d'une suite arithmétique en première, enseignement de mathématiques hors spécialité : uₙ = u₀ + nr, sens de variation, représentation graphique des termes, interprétation. Petites lignes de train, hérissons, ressort, zone humide, 400 m, émissions de CO₂. Points dessinés dans un repère, PDF à imprimer.",
};

export default function ExercicesLinSuiteTermeGeneralPremierePage() {
  return <FicheExercicesClient fiche={exercicesLinSuiteTermeGeneralPremiere} />;
}
