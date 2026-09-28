import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoLectureGraphiquePremiere } from "@/lib/fiches-exercices/maths-premiere-auto-lecture-graphique";

export const metadata: Metadata = {
  title: "Lecture graphique — automatismes 1re : 20 exercices corrigés sans calculatrice (PDF)",
  description:
    "Vingt exercices corrigés d'automatismes pour l'épreuve anticipée de maths de première : lire une image, un antécédent, un seuil sur une courbe, repérer unités et échelles, vérifier qu'un point est sur une courbe. Bénéfice, prix de vente, loyer, randonnée, climat, barrage, trébuchet, exode rural, débit d'un fleuve. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAutoLectureGraphiquePremierePage() {
  return <FicheExercicesClient fiche={exercicesAutoLectureGraphiquePremiere} />;
}
