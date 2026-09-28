import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLinAffineLecturePremiere } from "@/lib/fiches-exercices/maths-premiere-lin-affine-lecture";

// La première SANS spécialité : le titre le dit.
export const metadata: Metadata = {
  title: "Fonction affine, lire et exploiter en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés en première, enseignement de mathématiques hors spécialité : tracer et lire une fonction affine, fonction affine par morceaux (barème d'impôt, taux marginal et taux moyen, tarif progressif de l'eau), point d'équilibre entre l'offre et la demande. Plongée, carte à l'échelle, périurbanisation. Droites dessinées, PDF à imprimer.",
};

export default function ExercicesLinAffineLecturePremierePage() {
  return <FicheExercicesClient fiche={exercicesLinAffineLecturePremiere} />;
}
