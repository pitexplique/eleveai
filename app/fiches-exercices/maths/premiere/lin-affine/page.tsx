import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLinAffinePremiere } from "@/lib/fiches-exercices/maths-premiere-lin-affine";

// La première SANS spécialité : le titre le dit.
export const metadata: Metadata = {
  title: "Fonction affine et taux d'accroissement en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les fonctions affines en première, enseignement de mathématiques hors spécialité : taux d'accroissement et coefficient directeur, expression à partir de deux images, sens de variation. Celsius et Fahrenheit, distance de freinage, batterie, route de montagne, ville nouvelle, fréquence cardiaque, névé. Droites et tableaux dessinés, PDF à imprimer.",
};

export default function ExercicesLinAffinePremierePage() {
  return <FicheExercicesClient fiche={exercicesLinAffinePremiere} />;
}
