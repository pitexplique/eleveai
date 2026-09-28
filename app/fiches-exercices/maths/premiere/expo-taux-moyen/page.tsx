import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoTauxMoyenPremiere } from "@/lib/fiches-exercices/maths-premiere-expo-taux-moyen";

export const metadata: Metadata = {
  title: "Taux d'évolution moyen en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur le taux d'évolution moyen en première, enseignement de mathématiques hors spécialité : coefficient moyen C puissance 1/n, passer du taux moyen au taux global, interpréter un taux moyen, ne pas le confondre avec la moyenne des taux. Chiffre d'affaires, filtres, population mondiale, 10 km, émissions, castors, inflation, four, placements, vidéo virale. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesExpoTauxMoyenPremierePage() {
  return <FicheExercicesClient fiche={exercicesExpoTauxMoyenPremiere} />;
}
