// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheRatioPourcentage4e,
  slidesRatioPourcentage4e,
} from "@/lib/fiches/maths-4e-ratio-pourcentage";

export const metadata: Metadata = {
  title: "Ratios et pourcentages — 4e : cours et exercices corrigés",
  description:
    "Exprimer et simplifier un ratio, le relier à une égalité de quotients, utiliser un ratio à trois termes, partager une quantité selon un ratio, appliquer un pourcentage et un coefficient multiplicateur : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et huit exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function RatioPourcentageQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheRatioPourcentage4e}
      slides={slidesRatioPourcentage4e}
    />
  );
}
