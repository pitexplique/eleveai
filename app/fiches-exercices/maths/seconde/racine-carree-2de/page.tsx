import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRacinesSeconde } from "@/lib/fiches-exercices/maths-seconde-racines";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés racine carrée seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "La racine carrée en seconde : 20 exercices corrigés, du calcul au problème (PDF)",
  description:
    "Vingt exercices corrigés sur la racine carrée en seconde : calculer, racine d'un carré, produit de racines, simplifier, additionner des racines de même radical comme au contrôle, développer. Problèmes : une diagonale, un triangle rectangle, le carré construit sur la diagonale, le secret de la feuille A4. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesRacinesSecondePage() {
  return <FicheExercicesClient fiche={exercicesRacinesSeconde} />;
}
