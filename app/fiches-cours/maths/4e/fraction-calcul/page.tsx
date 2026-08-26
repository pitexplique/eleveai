// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionCalcul4e,
  slidesFractionCalcul4e,
} from "@/lib/fiches/maths-4e-fraction-calcul";

export const metadata: Metadata = {
  title: "Calculer avec les fractions — 4e : cours et exercices corrigés",
  description:
    "Additionner, multiplier, prendre une fraction d'une quantité, reconnaître l'inverse et l'opposé, et diviser en multipliant par l'inverse : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function FractionCalculQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheFractionCalcul4e}
      slides={slidesFractionCalcul4e}
    />
  );
}
