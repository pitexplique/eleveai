import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCalculMentalCe2 } from "@/lib/fiches-exercices/maths-ce2-calcul-mental";

// ⚠️ Cette page répond à « exercices calcul mental CE2 : compléments à 100 et 1 000, doubles, moitiés, + 9, − 19, × 4, × 8, multiples de 25 ».
export const metadata: Metadata = {
  title: "Calcul mental CE2 : 20 exercices corrigés, compléments, doubles et moitiés, + 9, × 4 (PDF)",
  description:
    "Vingt exercices corrigés de calcul mental au CE2 : compléter à 100 et à 1 000, doubles et moitiés, ajouter 9 ou 19, enlever 29 ou 39, multiplier par 4 ou par 8 en doublant, les multiples de 25, multiplier par un nombre de dizaines, calculer 23 × 4 en coupant 23. Défis : des fléchettes, un glacier, un pâtissier, un nombre mystère. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesCalculMentalCe2Page() {
  return <FicheExercicesClient fiche={exercicesCalculMentalCe2} />;
}
