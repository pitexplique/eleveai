import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoDroitesPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-droites";

export const metadata: Metadata = {
  title: "Droites et coefficient directeur — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : reconnaître une fonction affine ou linéaire, tracer une droite, lire son équation réduite, calculer un coefficient directeur à partir de deux points. Taxis, location, facture d'électricité, food-truck, carte de réduction, glacier, montée des eaux. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoDroitesPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoDroitesPremiere} />;
}
