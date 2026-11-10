import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDureeCm2 } from "@/lib/fiches-exercices/maths-cm2-duree";

export const metadata: Metadata = {
  title: "Durées CM2 : 20 exercices corrigés, lire l'heure, convertir, calculer (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Lire l'heure sur une horloge à aiguilles et sur un réveil, placer les aiguilles, convertir, puis calculer une durée ou une heure de fin en passant par l'heure pile. Un car scolaire, un film, un vol de nuit, le gâteau du pâtissier et un entraînement de natation. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDureeCm2Page() {
  return <FicheExercicesClient fiche={exercicesDureeCm2} />;
}
