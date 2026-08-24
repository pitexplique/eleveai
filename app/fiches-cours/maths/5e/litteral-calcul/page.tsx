import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCalculLitteral5e,
  slidesCalculLitteral5e,
} from "@/lib/fiches/maths-5e-calcul-litteral";

export const metadata: Metadata = {
  title: "Le calcul littéral — 5e : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète du calcul littéral en 5e (expression, coefficient, traduire, substituer, réduire les termes semblables), à lire, imprimer ou réviser en flashcards.",
};

export default function CalculLitteralCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCalculLitteral5e}
      slides={slidesCalculLitteral5e}
    />
  );
}
