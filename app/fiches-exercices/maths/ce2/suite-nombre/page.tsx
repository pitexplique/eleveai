import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteNombreCe2 } from "@/lib/fiches-exercices/maths-ce2-suite-nombre";

// ⚠️ Cette page répond à « exercices suites de nombres CE2 : continuer une suite, trouver la règle, croissante ou décroissante ».
export const metadata: Metadata = {
  title: "Suites de nombres CE2 : 20 exercices corrigés, continuer, trouver la règle, croissante ou décroissante (PDF)",
  description:
    "Vingt exercices corrigés sur les suites de nombres au CE2 : compter de 25 en 25, de 50 en 50, de 1 000 en 1 000, trouver la règle, dire si la suite est croissante ou décroissante, passer le millier. Défis : des nénuphars qui doublent, deux compteurs, les places d'un théâtre, un verger. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesSuiteNombreCe2Page() {
  return <FicheExercicesClient fiche={exercicesSuiteNombreCe2} />;
}
