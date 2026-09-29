import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSymCentrale5e } from "@/lib/fiches-exercices/maths-5e-sym-centrale";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La symétrie centrale ») :
// cette page répond à « exercices corrigés symétrie centrale 5e ».
export const metadata: Metadata = {
  title: "Symétrie centrale 5e : 20 exercices corrigés sur quadrillage (PDF)",
  description:
    "Vingt exercices corrigés sur la symétrie centrale en 5e : reconnaître un demi-tour, construire l'image d'un point, d'un segment, d'un triangle sur quadrillage, retrouver le centre, propriétés (longueurs, angles, aires, alignement, droite parallèle, point invariant). Problèmes : terrain de football, dominos, parallélogramme caché, logo. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSymCentrale5ePage() {
  return <FicheExercicesClient fiche={exercicesSymCentrale5e} />;
}
