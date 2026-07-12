import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLongueurs6e,
  slidesLongueurs6e,
} from "@/lib/fiches/maths-6e-longueurs";

export const metadata: Metadata = {
  title: "Les longueurs — fiche de cours 6e | EleveAI",
  description:
    "Définition, unités, conversions, exemples corrigés et exercices : la fiche de cours complète des longueurs en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function LongueursSixiemePage() {
  return <FicheCoursClient fiche={ficheLongueurs6e} slides={slidesLongueurs6e} />;
}
