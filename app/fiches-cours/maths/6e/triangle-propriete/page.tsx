// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheTrianglePropriete6e,
  slidesTrianglePropriete6e,
} from "@/lib/fiches/maths-6e-triangle-propriete";

export const metadata: Metadata = {
  title: "Les angles du triangle et le triangle possible — 6e : cours et exercices corrigés",
  description:
    "La somme des angles d'un triangle vaut 180°, calculer un angle manquant, reconnaître un triangle possible avec trois longueurs : la fiche de cours de 6e avec figures justes, exemples corrigés et exercices.",
};

export default function TriangleProprieteSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheTrianglePropriete6e}
      slides={slidesTrianglePropriete6e}
    />
  );
}
