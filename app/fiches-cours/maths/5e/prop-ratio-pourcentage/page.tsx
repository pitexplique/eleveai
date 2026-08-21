// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheRatioPourcentage5e,
  slidesRatioPourcentage5e,
} from "@/lib/fiches/maths-5e-ratio-pourcentage";

export const metadata: Metadata = {
  title: "Ratios, pourcentages et coefficient multiplicateur — fiche de cours 5e",
  description:
    "Lire et simplifier un ratio, prendre un pourcentage, passer d'une hausse ou d'une baisse au coefficient multiplicateur : la fiche de cours de 5e avec propriétés dessinées, exemples corrigés et exercices.",
};

export default function RatioPourcentageCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheRatioPourcentage5e}
      slides={slidesRatioPourcentage5e}
    />
  );
}
