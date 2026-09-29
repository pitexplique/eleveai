import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaExperience5e } from "@/lib/fiches-exercices/maths-5e-proba-experience";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les probabilités ») :
// cette page répond à « exercices corrigés probabilités 5e ».
export const metadata: Metadata = {
  title: "Probabilités 5e : 20 exercices corrigés, issues, événements et calcul (PDF)",
  description:
    "Vingt exercices corrigés de probabilités en 5e : expérience aléatoire, issues, événement certain ou impossible, équiprobabilité, calculer une probabilité (issues favorables ÷ issues possibles) en fraction, en décimal et en pourcentage. Problèmes : sac du Scrabble, roue de kermesse, oiseaux bagués, dé fabriqué à la main. Rappel de cours avant chaque niveau, corrigé étape par étape avec le matériel dessiné, PDF à imprimer.",
};

export default function ExercicesProbaExperience5ePage() {
  return <FicheExercicesClient fiche={exercicesProbaExperience5e} />;
}
