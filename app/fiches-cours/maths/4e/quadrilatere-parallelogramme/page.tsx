// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheParallelogramme4e,
  slidesParallelogramme4e,
} from "@/lib/fiches/maths-4e-parallelogramme";

export const metadata: Metadata = {
  title: "Le parallélogramme — 4e : cours et exercices corrigés",
  description:
    "Reconnaître un parallélogramme, utiliser ses côtés, ses angles et ses diagonales, démontrer qu'un quadrilatère en est un, et calculer son aire sans confondre hauteur et côté oblique : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function ParallelogrammeQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheParallelogramme4e}
      slides={slidesParallelogramme4e}
    />
  );
}
