import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteNombreCe1 } from "@/lib/fiches-exercices/maths-ce1-suite-nombre";

// ⚠️ Cette page répond à « exercices suites de nombres CE1 : compter de 2 en 2, de 10 en 10, de 100 en 100, trouver le pas ».
export const metadata: Metadata = {
  title: "Suites de nombres CE1 : 20 exercices corrigés, compter de 10 en 10 et de 100 en 100 (PDF)",
  description:
    "Vingt exercices corrigés sur les suites de nombres au CE1 : compter de 1 en 1, de 2 en 2, de 5 en 5, de 10 en 10 et de 100 en 100, en avançant et à l'envers, trouver le pas, trouver le nombre caché, passer la centaine. Défis : un escalier, une tirelire, deux suites qui se croisent, les maisons d'une rue. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesSuiteNombreCe1Page() {
  return <FicheExercicesClient fiche={exercicesSuiteNombreCe1} />;
}
