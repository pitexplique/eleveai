import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVariableAleatoireTerminale } from "@/lib/fiches-exercices/maths-terminale-variable-aleatoire";

export const metadata: Metadata = {
  title: "Sommes de variables aléatoires terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les sommes de variables aléatoires en terminale spécialité : linéarité de l'espérance, E(aX + b) et V(aX + b), variance d'une somme de variables indépendantes, échantillon et moyenne, démonstration du cours, simulation en Python. Problèmes de bac : file d'une caisse, jeu de pièce et de dé, charge d'un ascenseur, mesures répétées. Rappel de cours avant chaque niveau, lois dessinées, PDF à imprimer.",
};

export default function ExercicesVariableAleatoireTerminalePage() {
  return <FicheExercicesClient fiche={exercicesVariableAleatoireTerminale} />;
}
