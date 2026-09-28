import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoSuiteTermeGeneralPremiere } from "@/lib/fiches-exercices/maths-premiere-expo-suite-terme-general";

export const metadata: Metadata = {
  title: "Suite géométrique, terme général en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur le terme général d'une suite géométrique en première, enseignement de mathématiques hors spécialité : écrire uₙ = u₀ × qⁿ, sens de variation selon la raison, placer les points (n ; uₙ), interpréter un terme. Capital, condensateur, population mondiale, exode rural, CO₂, nénuphars, café qui refroidit, abeilles. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesExpoSuiteTermeGeneralPremierePage() {
  return <FicheExercicesClient fiche={exercicesExpoSuiteTermeGeneralPremiere} />;
}
