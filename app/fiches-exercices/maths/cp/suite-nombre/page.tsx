import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteNombreCp } from "@/lib/fiches-exercices/maths-cp-suite-nombre";

// ⚠️ Cette page répond à « exercices suites de nombres CP : compter en avant, à rebours, de 2 en 2, de 5 en 5, de 10 en 10 ».
export const metadata: Metadata = {
  title: "Suites de nombres CP : 20 exercices corrigés, compter de 2 en 2, de 10 en 10 (PDF)",
  description:
    "Vingt exercices corrigés sur les suites de nombres au CP : le nombre d'après et d'avant, compter de 2 en 2, de 5 en 5, de 10 en 10, compter à rebours, compléter une suite, passer la dizaine. Une fusée, une grenouille, un facteur et une boulangère. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesSuiteNombreCpPage() {
  return <FicheExercicesClient fiche={exercicesSuiteNombreCp} />;
}
