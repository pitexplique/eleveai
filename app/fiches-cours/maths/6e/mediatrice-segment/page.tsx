// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheMediatriceSegment6e,
  slidesMediatriceSegment6e,
} from "@/lib/fiches/maths-6e-mediatrice-segment";

export const metadata: Metadata = {
  title: "La médiatrice d'un segment — 6e : cours et exercices corrigés",
  description:
    "La médiatrice d'un segment en 6e : sa définition (perpendiculaire et par le milieu), sa propriété dans les deux sens, sa construction au compas, à l'équerre ou par pliage, et les problèmes du centre d'un cercle, avec exemples corrigés et exercices.",
};

export default function MediatriceSegmentSixiemePage() {
  return <FicheCoursClient fiche={ficheMediatriceSegment6e} slides={slidesMediatriceSegment6e} />;
}
