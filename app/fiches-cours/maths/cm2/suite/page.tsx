import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheSuitesCM2, slidesSuitesCM2 } from "@/lib/fiches/maths-cm2-suites";

export const metadata: Metadata = {
  title: "Les suites de nombres — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des suites de nombres (trouver la règle, continuer, terme manquant, suite croissante ou décroissante) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function SuitesCM2Page() {
  return <FicheCoursClient fiche={ficheSuitesCM2} slides={slidesSuitesCM2} />;
}
