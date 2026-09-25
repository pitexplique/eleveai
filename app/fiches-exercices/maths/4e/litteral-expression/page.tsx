import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpressions4e } from "@/lib/fiches-exercices/maths-4e-expressions";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les expressions
// littérales ») : cette page répond à « exercices corrigés expressions
// littérales 4e », l'autre à « cours expressions littérales 4e ».
export const metadata: Metadata = {
  title: "Calcul littéral 4e : 20 exercices corrigés, traduire, substituer, réduire (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur les expressions littérales : lire les termes et les coefficients, écrire sans le signe ×, traduire une phrase, remplacer la lettre par un nombre, réduire. Problèmes : périmètres de rectangles et de triangles, programme de calcul, tarifs d'escalade, fréquence cardiaque maximale, carrés en allumettes, l'eau de la douche. Rappel de cours avant chaque niveau, corrigé étape par étape avec rectangles à l'échelle et tuiles d'algèbre, PDF à imprimer.",
};

export default function ExercicesExpressions4ePage() {
  return <FicheExercicesClient fiche={exercicesExpressions4e} />;
}
