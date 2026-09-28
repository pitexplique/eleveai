import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoSeuilPremiere } from "@/lib/fiches-exercices/maths-premiere-expo-seuil";

export const metadata: Metadata = {
  title: "Problème de seuil, croissance exponentielle en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les problèmes de seuil en première, enseignement de mathématiques hors spécialité : tester les rangs à la calculatrice, lire un tableau de valeurs, lire une courbe avec la droite du seuil, demi-vie et temps de doublement. Livret, iode 131, population mondiale, cycliste, carbone 14, exode rural, règle de 72, glacier. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesExpoSeuilPremierePage() {
  return <FicheExercicesClient fiche={exercicesExpoSeuilPremiere} />;
}
