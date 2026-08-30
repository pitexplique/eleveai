// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheTriangle4e, slidesTriangle4e } from "@/lib/fiches/maths-4e-triangle";

export const metadata: Metadata = {
  title: "Le triangle pour démontrer — 4e : cours et exercices corrigés",
  description:
    "Inégalité triangulaire, somme des angles à 180°, hauteurs et médiatrices, les trois cas d'égalité, les triangles semblables et l'écriture d'un protocole de construction : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function TriangleQuatriemePage() {
  return <FicheCoursClient fiche={ficheTriangle4e} slides={slidesTriangle4e} />;
}
