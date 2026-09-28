import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerGraphiquePremiere } from "@/lib/fiches-exercices/maths-premiere-der-graphique";

export const metadata: Metadata = {
  title: "Lire un nombre dérivé sur un graphique — 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés pour lire la dérivée sur une courbe en première, enseignement de mathématiques hors spécialité : pente d'une tangente, signe du nombre dérivé, tangente horizontale, comparer deux vitesses. Crue, route d'un col, exode rural, voiture qui démarre, thé qui refroidit, marathon. Courbes et tangentes dessinées, PDF à imprimer.",
};

export default function ExercicesDerGraphiquePremierePage() {
  return <FicheExercicesClient fiche={exercicesDerGraphiquePremiere} />;
}
