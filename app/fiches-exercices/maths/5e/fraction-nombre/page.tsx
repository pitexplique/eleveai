import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionNombre5e } from "@/lib/fiches-exercices/maths-5e-fraction-nombre";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les fractions ») :
// cette page répond à « exercices corrigés fractions égales simplifier comparer 5e ».
export const metadata: Metadata = {
  title: "Fractions 5e : 20 exercices corrigés, simplifier, comparer, opposé (PDF)",
  description:
    "Vingt exercices corrigés sur les fractions en 5e : fractions égales, simplifier, écrire un quotient en fraction et en décimal, comparer et ranger, l'opposé d'une fraction. Problèmes : vote de trois classes, tablettes de chocolat, tirs au but, jardin partagé, fractions de l'heure, fraction mystère. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFractionNombre5ePage() {
  return <FicheExercicesClient fiche={exercicesFractionNombre5e} />;
}
