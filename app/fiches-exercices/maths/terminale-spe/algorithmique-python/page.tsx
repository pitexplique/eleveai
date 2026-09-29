import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmiquePythonTerminale } from "@/lib/fiches-exercices/maths-terminale-algorithmique-python";

export const metadata: Metadata = {
  title: "Algorithmique et Python terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique en Python pour la terminale spécialité : boucles et fonctions, termes d'une suite, seuils calculés avec ln, dichotomie, méthode des rectangles, méthode d'Euler, simulations, loi binomiale et inégalité de Bienaymé-Tchebychev. Problèmes de bac : café qui refroidit, contrôle qualité, aire sans primitive, rumeur au lycée. Rappel de cours avant chaque niveau, traces des programmes, PDF à imprimer.",
};

export default function ExercicesAlgorithmiquePythonTerminalePage() {
  return <FicheExercicesClient fiche={exercicesAlgorithmiquePythonTerminale} />;
}
