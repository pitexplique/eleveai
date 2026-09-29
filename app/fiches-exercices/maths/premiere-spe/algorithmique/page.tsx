import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmiquePremiere } from "@/lib/fiches-exercices/maths-premiere-algorithmique";

export const metadata: Metadata = {
  title: "Algorithmique 1re spé : 20 exercices corrigés en Python, listes et seuils (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique en première spécialité : affectation simultanée, listes en extension, par ajouts et en compréhension, indices et parcours, fonctions qui renvoient une valeur, boucle while de seuil sur une suite, simulation d'un jeu, méthodes d'Euler et de Newton. Traces des programmes et listes dessinées dans les corrigés, PDF à imprimer.",
};

export default function ExercicesAlgorithmiquePremierePage() {
  return <FicheExercicesClient fiche={exercicesAlgorithmiquePremiere} />;
}
