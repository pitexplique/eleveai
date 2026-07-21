import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheCalculCM2, slidesCalculCM2 } from "@/lib/fiches/maths-cm2-calcul";

export const metadata: Metadata = {
  title: "Le calcul — fiche de cours CM2 | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète du calcul (calcul mental, addition et soustraction posées, retenues, addition et soustraction de décimaux, priorités opératoires) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function CalculCM2Page() {
  return <FicheCoursClient fiche={ficheCalculCM2} slides={slidesCalculCM2} />;
}
