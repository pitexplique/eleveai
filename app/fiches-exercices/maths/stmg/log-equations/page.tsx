import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLogEquationsStmg } from "@/lib/fiches-exercices/maths-stmg-log-equations";

export const metadata: Metadata = {
  title: "Résoudre aˣ = b avec le logarithme STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG : résoudre aˣ = b et xᵃ = b, reconnaître où est l'inconnue, trouver le plus petit entier n tel que aⁿ > b, et l'inégalité qui se retourne quand la grandeur diminue. Un parc éolien, un glacier, un médicament, un tournoi d'e-sport. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesLogEquationsStmgPage() {
  return <FicheExercicesClient fiche={exercicesLogEquationsStmg} />;
}
