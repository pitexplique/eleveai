import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAdditionSoustractionCp } from "@/lib/fiches-exercices/maths-cp-addition-soustraction";

// ⚠️ Cette page répond à « exercices addition soustraction CP : sens, calcul, égalité à trou, addition posée, fois ».
export const metadata: Metadata = {
  title: "Additions et soustractions CP : 20 exercices corrigés, signe =, addition posée (PDF)",
  description:
    "Vingt exercices corrigés sur l'addition et la soustraction au CP : réunir et enlever, calculer, comprendre le signe =, trouver le nombre qui manque, poser une addition en colonnes, le sens de « fois ». Des dessins à compter, une pyramide de nombres, un match de basket. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesAdditionSoustractionCpPage() {
  return <FicheExercicesClient fiche={exercicesAdditionSoustractionCp} />;
}
