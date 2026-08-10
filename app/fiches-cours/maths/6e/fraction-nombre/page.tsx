import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractions6e,
  slidesFractions6e,
} from "@/lib/fiches/maths-6e-fractions";

export const metadata: Metadata = {
  title: "Les fractions — fiche de cours 6e",
  description:
    "Définition, propriétés, exemples corrigés et exercices : la fiche de cours complète des fractions en 6e (lire, représenter, comparer), à lire, imprimer ou réviser en flashcards.",
};

export default function FractionsSixiemePage() {
  return <FicheCoursClient fiche={ficheFractions6e} slides={slidesFractions6e} />;
}
