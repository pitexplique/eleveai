import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVisionEspace6e } from "@/lib/fiches-exercices/maths-6e-vision-espace";

// Pas de fiche de cours pour cette notion : la page répond à « exercices
// corrigés vision dans l'espace 6e », vues et empilements de cubes.
export const metadata: Metadata = {
  title: "Vision dans l'espace 6e : 20 exercices corrigés, vues et cubes (PDF)",
  description:
    "Vingt exercices corrigés de vision dans l'espace en 6e : compter les cubes d'un empilement, même cachés, dessiner les vues de dessus, de face, de gauche et de droite, lire un plan à nombres, reconnaître un patron de cube, lire une perspective cavalière. Problèmes : cube peint, solides aux mêmes vues, caisses d'un entrepôt, patron d'un dé. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesVisionEspace6ePage() {
  return <FicheExercicesClient fiche={exercicesVisionEspace6e} />;
}
