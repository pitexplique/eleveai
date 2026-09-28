import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoModeliserPremiere } from "@/lib/fiches-exercices/maths-premiere-expo-modeliser";

export const metadata: Metadata = {
  title: "Modéliser une évolution exponentielle en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés pour modéliser une évolution exponentielle en première, enseignement de mathématiques hors spécialité : reconnaître une croissance exponentielle, choisir entre modèle linéaire et exponentiel, les comparer, estimer des ordres de grandeur. Intérêts composés, Malthus, lapins d'Australie, épidémie, loi de Moore, légende de l'échiquier, rumeur. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesExpoModeliserPremierePage() {
  return <FicheExercicesClient fiche={exercicesExpoModeliserPremiere} />;
}
