import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionCalcul5e } from "@/lib/fiches-exercices/maths-5e-fraction-calcul";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Calculer avec les
// fractions — 5e : … cours et exercices corrigés ») : cette page répond à
// « exercices corrigés fractions 5e », l'autre à « cours fractions 5e ».
export const metadata: Metadata = {
  title:
    "Fractions 5e : 20 exercices corrigés, additionner, soustraire, multiplier (PDF)",
  description:
    "Vingt exercices corrigés sur le calcul avec les fractions en 5e : additionner et soustraire (même dénominateur, dénominateurs multiples, dénominateurs différents), multiplier, prendre une fraction d'un nombre ou d'une fraction, expliquer l'erreur 1/2 + 1/3 = 2/5, problèmes (gâteau, récolte, recette, ordre des calculs). Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFractionCalcul5ePage() {
  return <FicheExercicesClient fiche={exercicesFractionCalcul5e} />;
}
