import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVariationsPremiere } from "@/lib/fiches-exercices/maths-premiere-variations";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés variations 1re », l'autre à « cours variations fonctions ».
export const metadata: Metadata = {
  title:
    "Variations d'une fonction 1re spé : 20 exercices corrigés, du signe de f′ à l'optimisation (PDF)",
  description:
    "Vingt exercices corrigés sur les variations et les courbes en première spécialité : signe de la dérivée, tableau de variations, extremums et tangente horizontale, lecture de la courbe de f′, position relative de deux courbes, démonstration d'une inégalité, problèmes d'optimisation (boîte, enclos, bénéfice). Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesVariationsPremierePage() {
  return <FicheExercicesClient fiche={exercicesVariationsPremiere} />;
}
