// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionNombre4e,
  slidesFractionNombre4e,
} from "@/lib/fiches/maths-4e-fraction-nombre";

export const metadata: Metadata = {
  title: "Fractions et nombres rationnels — 4e : cours et exercices corrigés",
  description:
    "Reconnaître des fractions égales, simplifier, comparer, passer à l'écriture décimale et savoir ce qu'est un nombre rationnel : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function FractionNombreQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheFractionNombre4e}
      slides={slidesFractionNombre4e}
    />
  );
}
