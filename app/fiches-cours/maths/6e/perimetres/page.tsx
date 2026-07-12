import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePerimetres6e,
  slidesPerimetres6e,
} from "@/lib/fiches/maths-6e-perimetres";

export const metadata: Metadata = {
  title: "Les périmètres — fiche de cours 6e | EleveAI",
  description:
    "Définition, formules du carré et du rectangle, exemples corrigés et exercices : la fiche de cours complète des périmètres en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function PerimetresSixiemePage() {
  return (
    <FicheCoursClient fiche={fichePerimetres6e} slides={slidesPerimetres6e} />
  );
}
