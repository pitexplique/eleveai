// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheTransformations4e,
  slidesTransformations4e,
} from "@/lib/fiches/maths-4e-transformations";

export const metadata: Metadata = {
  title: "Les transformations — 4e : cours et exercices corrigés",
  description:
    "Symétrie axiale, symétrie centrale, translation et rotation : reconnaître laquelle, construire une image point par point, et savoir ce qui se conserve. La fiche de cours complète des transformations en 4e, avec les quatre transformations dessinées, trois exemples corrigés et des exercices.",
};

export default function TransformationsQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheTransformations4e}
      slides={slidesTransformations4e}
    />
  );
}
