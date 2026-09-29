// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePropEchelle6e,
  slidesPropEchelle6e,
} from "@/lib/fiches/maths-6e-prop-echelle";

export const metadata: Metadata = {
  title: "Les échelles — 6e : cours et exercices corrigés",
  description:
    "Lire une échelle, passer du plan à la réalité en multipliant et de la réalité au plan en divisant, comprendre l'échelle 1/200 et retrouver ce que vaut 1 cm : la fiche de cours de 6e, dessinée, avec trois exemples corrigés et des exercices.",
};

export default function PropEchelleSixiemePage() {
  return (
    <FicheCoursClient
      fiche={fichePropEchelle6e}
      slides={slidesPropEchelle6e}
    />
  );
}
