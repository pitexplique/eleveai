// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheCosinus4e, slidesCosinus4e } from "@/lib/fiches/maths-4e-cosinus";

export const metadata: Metadata = {
  title: "Le cosinus d'un angle aigu — 4e : cours et exercices corrigés",
  description:
    "Identifier le côté adjacent et l'hypoténuse, écrire la définition du cosinus, calculer une longueur puis un angle avec la touche cos⁻¹ : la fiche de cours complète du cosinus en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function CosinusQuatriemePage() {
  return <FicheCoursClient fiche={ficheCosinus4e} slides={slidesCosinus4e} />;
}
