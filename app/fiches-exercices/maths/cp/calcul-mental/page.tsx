import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCalculMentalCp } from "@/lib/fiches-exercices/maths-cp-calcul-mental";

// ⚠️ Cette page répond à « exercices calcul mental CP : compléments à 10, doubles, moitiés, +10, +9 ».
export const metadata: Metadata = {
  title: "Calcul mental CP : 20 exercices corrigés, compléments à 10, doubles, moitiés (PDF)",
  description:
    "Vingt exercices corrigés de calcul mental au CP : tables d'addition, compléments à 10, doubles et moitiés, ajouter ou enlever 1, 2, 10 et des dizaines, ajouter 9, passer la dizaine, ajouter deux nombres comme 47 + 28. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesCalculMentalCpPage() {
  return <FicheExercicesClient fiche={exercicesCalculMentalCp} />;
}
