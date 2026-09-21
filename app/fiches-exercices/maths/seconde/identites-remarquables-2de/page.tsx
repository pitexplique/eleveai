import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesIdentitesSeconde } from "@/lib/fiches-exercices/maths-seconde-identites";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés identités remarquables seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Identités remarquables en seconde : 20 exercices corrigés, du calcul mental à la preuve (PDF)",
  description:
    "Vingt exercices corrigés sur les identités remarquables en seconde : développer (a + b)², (a − b)² et (a − b)(a + b), factoriser, calcul mental, identités avec des racines, équations, et deux preuves (deux impairs consécutifs, la racine chassée du dénominateur). Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesIdentitesSecondePage() {
  return <FicheExercicesClient fiche={exercicesIdentitesSeconde} />;
}
