import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSecondDegrePremiere } from "@/lib/fiches-exercices/maths-premiere-second-degre";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le second degré — 1re
// spé : … cours et exercices corrigés ») : cette page répond à « exercices
// corrigés second degré 1re », l'autre à « cours second degré ».
export const metadata: Metadata = {
  title:
    "Second degré 1re spé : 20 exercices corrigés, du discriminant au problème (PDF)",
  description:
    "Vingt exercices corrigés sur le second degré en première spécialité : calculer le discriminant, résoudre une équation (Δ > 0, Δ = 0, Δ < 0), factoriser, somme et produit des racines, forme canonique et sommet, signe d'un trinôme, inéquations, problèmes (ballon, enclos, parabole et droite, paramètre m). Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSecondDegrePremierePage() {
  return <FicheExercicesClient fiche={exercicesSecondDegrePremiere} />;
}
