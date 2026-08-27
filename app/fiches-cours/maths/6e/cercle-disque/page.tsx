// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCercleDisque6e,
  slidesCercleDisque6e,
} from "@/lib/fiches/maths-6e-cercle-disque";

export const metadata: Metadata = {
  title: "Le cercle et le disque — 6e : cours et exercices corrigés",
  description:
    "Centre, rayon, diamètre et corde, la différence entre le cercle et le disque, le tour proportionnel au diamètre et le calcul du périmètre avec π : la fiche de cours complète en 6e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function CercleDisqueSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCercleDisque6e}
      slides={slidesCercleDisque6e}
    />
  );
}
