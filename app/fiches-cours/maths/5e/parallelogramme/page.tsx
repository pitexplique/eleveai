// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheParallelogramme5e,
  slidesParallelogramme5e,
} from "@/lib/fiches/maths-5e-parallelogramme";

export const metadata: Metadata = {
  title: "Le parallélogramme — fiche de cours 5e",
  description:
    "Définition, propriétés dessinées, aire, diagonales et cas particuliers (losange, rectangle, carré) : la fiche de cours complète du parallélogramme en 5e, avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function ParallelogrammeCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheParallelogramme5e}
      slides={slidesParallelogramme5e}
    />
  );
}
