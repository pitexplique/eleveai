// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDemiDroiteGraduee6e,
  slidesDemiDroiteGraduee6e,
} from "@/lib/fiches/maths-6e-demi-droite-graduee";

export const metadata: Metadata = {
  title: "La demi-droite graduée — 6e : cours et exercices corrigés",
  description:
    "Lire l'abscisse d'un point, placer un nombre décimal ou une fraction, graduer un segment : la fiche de cours de 6e sur la demi-droite graduée, avec un dessin par règle, quatre exemples corrigés et des exercices.",
};

export default function DemiDroiteGradueeSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheDemiDroiteGraduee6e}
      slides={slidesDemiDroiteGraduee6e}
    />
  );
}
