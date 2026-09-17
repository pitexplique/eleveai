import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuitesPremiere } from "@/lib/fiches-exercices/maths-premiere-suites";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés suites 1re », l'autre à « cours suites première ».
export const metadata: Metadata = {
  title: "Suites 1re spé : 20 exercices corrigés, de la raison à la suite auxiliaire (PDF)",
  description:
    "Vingt exercices corrigés sur les suites en première spécialité : calculer des termes, montrer qu'une suite est arithmétique ou géométrique, sens de variation, sommes 1+2+…+n et 1+q+…+qⁿ, taux d'évolution, seuil et algorithme, et la suite auxiliaire v = u − L. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSuitesPremierePage() {
  return <FicheExercicesClient fiche={exercicesSuitesPremiere} />;
}
