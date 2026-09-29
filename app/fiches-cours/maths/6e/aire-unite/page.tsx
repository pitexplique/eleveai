// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAireUnite6e,
  slidesAireUnite6e,
} from "@/lib/fiches/maths-6e-aire-unite";

export const metadata: Metadata = {
  title: "L'aire et ses unités — 6e : cours et exercices corrigés",
  description:
    "Ce que mesure une aire, le cm² comme aire d'un carré de 1 cm de côté, compter les carreaux d'un quadrillage et convertir entre m², dm² et cm² avec le carré découpé en 100 : la fiche de cours de 6e, dessinée, avec exemples corrigés et exercices.",
};

export default function AireUniteSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheAireUnite6e}
      slides={slidesAireUnite6e}
    />
  );
}
