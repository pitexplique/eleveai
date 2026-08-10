import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePerimetresCM2,
  slidesPerimetresCM2,
} from "@/lib/fiches/maths-cm2-perimetres";

export const metadata: Metadata = {
  title: "Les périmètres — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des périmètres (le tour d'une figure, triangle, rectangle P = 2 × (L + l), carré P = 4 × c, figure quelconque) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function PerimetresCM2Page() {
  return (
    <FicheCoursClient fiche={fichePerimetresCM2} slides={slidesPerimetresCM2} />
  );
}
