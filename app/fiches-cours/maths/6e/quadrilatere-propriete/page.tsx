// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheQuadrilaterePropriete6e,
  slidesQuadrilaterePropriete6e,
} from "@/lib/fiches/maths-6e-quadrilatere-propriete";

export const metadata: Metadata = {
  title: "Les propriétés des quadrilatères — 6e : cours et exercices corrigés",
  description:
    "Lire le codage d'une figure, reconnaître un parallélogramme, un rectangle, un losange ou un carré par ses propriétés, conclure sans se fier à l'œil : la fiche de cours de 6e avec figures codées, exemples corrigés et exercices.",
};

export default function QuadrilatereProprieteSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheQuadrilaterePropriete6e}
      slides={slidesQuadrilaterePropriete6e}
    />
  );
}
