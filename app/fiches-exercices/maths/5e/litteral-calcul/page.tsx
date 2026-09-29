import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLitteralCalcul5e } from "@/lib/fiches-exercices/maths-5e-litteral-calcul";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le calcul littéral ») :
// cette page répond à « exercices corrigés expressions littérales 5e ».
export const metadata: Metadata = {
  title: "Expressions littérales 5e : 20 exercices corrigés, réduire, développer (PDF)",
  description:
    "Vingt exercices corrigés de calcul littéral en 5e : lire une expression, traduire une phrase, substituer une valeur, réduire, tester une égalité, développer k(a + b). Problèmes : programmes de calcul, allumettes, location de vélo, tarifs d'une piscine, potager, bordure d'un bassin. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesLitteralCalcul5ePage() {
  return <FicheExercicesClient fiche={exercicesLitteralCalcul5e} />;
}
