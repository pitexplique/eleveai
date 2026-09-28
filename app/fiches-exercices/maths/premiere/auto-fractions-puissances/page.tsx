import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoFractionsPuissancesPremiere } from "@/lib/fiches-exercices/maths-premiere-auto-fractions-puissances";

export const metadata: Metadata = {
  title: "Fractions et puissances — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : opérations sur les fractions, règles des puissances, passer d'une fraction à un décimal ou à un pourcentage. Budget d'un ménage, TVA, pouvoir d'achat, richesse par habitant. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoFractionsPuissancesPremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoFractionsPuissancesPremiere} />;
}
