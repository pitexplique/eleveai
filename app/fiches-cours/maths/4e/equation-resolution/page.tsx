// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEquations4e,
  slidesEquations4e,
} from "@/lib/fiches/maths-4e-equations";

export const metadata: Metadata = {
  title: "Les équations — 4e : cours et exercices corrigés",
  description:
    "Reconnaître une équation, la traduire depuis un énoncé, isoler l'inconnue en faisant la même opération des deux côtés, réduire, résoudre avec une parenthèse et vérifier sa solution : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function EquationsQuatriemePage() {
  return (
    <FicheCoursClient fiche={ficheEquations4e} slides={slidesEquations4e} />
  );
}
