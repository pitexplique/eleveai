import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbaExperience6e } from "@/lib/fiches-exercices/maths-6e-proba-experience";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Premiers pas en
// probabilités ») : cette page répond à « exercices corrigés probabilités 6e ».
export const metadata: Metadata = {
  title: "Probabilités 6e : 20 exercices corrigés, certain, possible, impossible (PDF)",
  description:
    "Vingt exercices corrigés de probabilités en 6e : expérience aléatoire, issues, événement certain, possible ou impossible, comparer des chances, l'échelle de 0 à 1. Problèmes : tombola, qui commence au dé, sachet de bulbes, roue de fête foraine. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProbaExperience6ePage() {
  return <FicheExercicesClient fiche={exercicesProbaExperience6e} />;
}
