import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDemiDroiteGraduee6e } from "@/lib/fiches-exercices/maths-6e-demi-droite-graduee";

// ⚠️ Cette page répond à « exercices corrigés demi-droite graduée 6e » : lire une
// abscisse, placer un décimal ou une fraction, graduer un segment.
export const metadata: Metadata = {
  title: "Demi-droite graduée 6e : 20 exercices corrigés, abscisse, fraction (PDF)",
  description:
    "Vingt exercices corrigés sur la demi-droite graduée en 6e : lire l'abscisse d'un point, placer un nombre décimal, placer une fraction, graduer un segment. Problèmes : thermomètre, ruban, saut en longueur, nombre mystère. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDemiDroiteGraduee6ePage() {
  return <FicheExercicesClient fiche={exercicesDemiDroiteGraduee6e} />;
}
