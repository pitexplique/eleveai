import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionsCM2,
  slidesFractionsCM2,
} from "@/lib/fiches/maths-cm2-fractions";

export const metadata: Metadata = {
  title: "Les fractions — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des fractions (numérateur, dénominateur, parts égales, barre, disque, grille, droite graduée) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function FractionsCM2Page() {
  return (
    <FicheCoursClient fiche={ficheFractionsCM2} slides={slidesFractionsCM2} />
  );
}
