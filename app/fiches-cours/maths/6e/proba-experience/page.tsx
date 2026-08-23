// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page n'est
// qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheProbabilites6e, slidesProbabilites6e } from "@/lib/fiches/maths-6e-probabilites";

export const metadata: Metadata = {
  title: "Premiers pas en probabilités — 6e : cours et exercices corrigés",
  description:
    "Découvrir les probabilités en 6e : le vocabulaire du hasard (possible, certain, impossible), repérer et compter les issues, comparer et estimer des chances, avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function ProbabilitesSixiemePage() {
  return <FicheCoursClient fiche={ficheProbabilites6e} slides={slidesProbabilites6e} />;
}
