import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoPointMoyenPremiere } from "@/lib/fiches-exercices/maths-premiere-info-point-moyen";

export const metadata: Metadata = {
  title: "Le point moyen d'un nuage — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première sur le point moyen d'un nuage de points : calculer ses coordonnées, le placer, vérifier qu'une droite d'ajustement passe par lui, retrouver une donnée manquante. Ressort, population d'une ville, niveau de la mer, éoliennes, forfaits mobiles. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesInfoPointMoyenPremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoPointMoyenPremiere} />;
}
