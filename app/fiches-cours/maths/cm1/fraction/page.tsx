import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionsCM1,
  slidesFractionsCM1,
} from "@/lib/fiches/maths-cm1-fractions";

export const metadata: Metadata = {
  title: "Les fractions — CM1 : cours et exercices corrigés",
  description:
    "Définition, propriétés, exemples corrigés et exercices : la fiche de cours des fractions en CM1 (lire, représenter, placer sur la droite, comparer, fractions égales et fractions décimales), à lire, imprimer ou réviser en flashcards.",
};

export default function FractionsCM1Page() {
  return <FicheCoursClient fiche={ficheFractionsCM1} slides={slidesFractionsCM1} />;
}
