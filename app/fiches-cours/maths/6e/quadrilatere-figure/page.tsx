// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page n'est
// qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheQuadrilateres6e,
  slidesQuadrilateres6e,
} from "@/lib/fiches/maths-6e-quadrilateres";

export const metadata: Metadata = {
  title: "Les quadrilatères — 6e : cours et exercices corrigés",
  description:
    "Nommer un quadrilatère, lire ses propriétés et reconnaître sa nature (rectangle, losange, carré) : la fiche de cours complète de 6e avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function QuadrilateresSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheQuadrilateres6e}
      slides={slidesQuadrilateres6e}
    />
  );
}
