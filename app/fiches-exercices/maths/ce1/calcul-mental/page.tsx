import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCalculMentalCe1 } from "@/lib/fiches-exercices/maths-ce1-calcul-mental";

// ⚠️ Cette page répond à « exercices calcul mental CE1 : tables, doubles et moitiés, compléments, + 9, − 9, × 10 ».
export const metadata: Metadata = {
  title: "Calcul mental CE1 : 20 exercices corrigés, doubles, moitiés, + 9, × 10 (PDF)",
  description:
    "Vingt exercices corrigés de calcul mental au CE1 : tables d'addition et de multiplication, doubles et moitiés, compter de 25 en 25, compléter à la dizaine ou à la centaine, ajouter 9, 19 ou 29, enlever 9, multiplier par 10, calculer 13 × 4 en coupant 13. Défis : un jeu de points, une boulangère, un fleuriste, un nombre mystère. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesCalculMentalCe1Page() {
  return <FicheExercicesClient fiche={exercicesCalculMentalCe1} />;
}
