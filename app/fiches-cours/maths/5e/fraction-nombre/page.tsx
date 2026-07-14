// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractions5e,
  slidesFractions5e,
} from "@/lib/fiches/maths-5e-fractions";

export const metadata: Metadata = {
  title: "Les fractions — fiche de cours 5e | EleveAI",
  description:
    "Définition, propriétés, exemples corrigés et exercices : la fiche de cours complète des fractions en 5e (simplifier, comparer, additionner, multiplier, diviser, inverse, opposé), à lire, imprimer ou réviser en flashcards.",
};

export default function FractionsCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheFractions5e}
      slides={slidesFractions5e}
    />
  );
}
