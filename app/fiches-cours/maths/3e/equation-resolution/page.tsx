// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheEquations3e, slidesEquations3e } from "@/lib/fiches/maths-3e-equations";

export const metadata: Metadata = {
  title: "Résoudre une équation — 3e : cours et exercices corrigés",
  description:
    "Isoler x en appliquant la même opération aux deux membres, développer avant de résoudre, et surtout maîtriser l'équation produit nul et ses DEUX solutions — sans se tromper de signe : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés et sept exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function EquationsTroisiemePage() {
  return <FicheCoursClient fiche={ficheEquations3e} slides={slidesEquations3e} />;
}
