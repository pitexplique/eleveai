// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheBissectriceAngle6e,
  slidesBissectriceAngle6e,
} from "@/lib/fiches/maths-6e-bissectrice-angle";

export const metadata: Metadata = {
  title: "La bissectrice d'un angle — 6e : cours et exercices corrigés",
  description:
    "La bissectrice partage un angle en deux angles égaux : la définition, l'axe de symétrie, la construction par pliage et au rapporteur, la moitié ou le double. Fiche de cours de 6e avec figures, exemples corrigés et exercices.",
};

export default function BissectriceAngleSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheBissectriceAngle6e}
      slides={slidesBissectriceAngle6e}
    />
  );
}
