import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAdditionSoustractionCe1 } from "@/lib/fiches-exercices/maths-ce1-addition-soustraction";

// ⚠️ Cette page répond à « exercices addition et soustraction posées CE1 : retenue, nombre qui manque, estimer ».
export const metadata: Metadata = {
  title: "Additions et soustractions CE1 : 20 exercices corrigés, posées avec retenue (PDF)",
  description:
    "Vingt exercices corrigés sur l'addition et la soustraction au CE1 : poser une addition avec ou sans retenue, additionner trois nombres, poser une soustraction, trouver le nombre qui manque, estimer un résultat, corriger l'erreur d'un camarade. Problèmes : un car pour le zoo, une bibliothèque, des devinettes, une course de relais. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesAdditionSoustractionCe1Page() {
  return <FicheExercicesClient fiche={exercicesAdditionSoustractionCe1} />;
}
