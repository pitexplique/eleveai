// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDistanceSegment6e,
  slidesDistanceSegment6e,
} from "@/lib/fiches/maths-6e-distance-segment";

export const metadata: Metadata = {
  title: "Distances et milieu d'un segment — 6e : cours et exercices corrigés",
  description:
    "La différence entre (AB), [AB] et AB, le milieu d'un segment et le plus court chemin AC + CB ⩾ AB : la fiche de cours de 6e, avec un dessin par propriété, des exemples corrigés et des exercices.",
};

export default function DistanceSegmentSixiemePage() {
  return <FicheCoursClient fiche={ficheDistanceSegment6e} slides={slidesDistanceSegment6e} />;
}
