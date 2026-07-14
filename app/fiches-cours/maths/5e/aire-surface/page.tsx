import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAires5e, slidesAires5e } from "@/lib/fiches/maths-5e-aires";

export const metadata: Metadata = {
  title: "Les aires — fiche de cours 5e | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des aires en 5e (aire du triangle base × hauteur ÷ 2, du parallélogramme base × hauteur, figures composées), à lire, imprimer ou réviser en flashcards.",
};

export default function AiresCinquiemePage() {
  return <FicheCoursClient fiche={ficheAires5e} slides={slidesAires5e} />;
}
