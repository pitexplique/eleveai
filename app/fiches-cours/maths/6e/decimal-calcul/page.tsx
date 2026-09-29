// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDecimalCalcul6e,
  slidesDecimalCalcul6e,
} from "@/lib/fiches/maths-6e-decimal-calcul";

export const metadata: Metadata = {
  title: "Calculer avec les décimaux — 6e : cours et exercices corrigés",
  description:
    "Additionner et soustraire en alignant les virgules, multiplier un décimal, multiplier par 0,1 · 0,01 · 0,001, diviser par un entier et vérifier l'ordre de grandeur : la fiche de cours de 6e, avec un dessin par règle, des exemples corrigés et des exercices.",
};

export default function DecimalCalculSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheDecimalCalcul6e}
      slides={slidesDecimalCalcul6e}
    />
  );
}
