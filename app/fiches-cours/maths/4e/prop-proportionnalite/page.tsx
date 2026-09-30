// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProportionnalite4e,
  slidesProportionnalite4e,
} from "@/lib/fiches/maths-4e-proportionnalite";

export const metadata: Metadata = {
  title: "La proportionnalité — 4e : cours et exercices corrigés",
  description:
    "Reconnaître une situation de proportionnalité dans un tableau ou sur un graphique (une droite qui passe par l'origine), trouver le coefficient, calculer une quatrième proportionnelle par le produit en croix : la fiche de cours de 4e, un dessin par propriété, trois exemples corrigés et des exercices.",
};

export default function ProportionnaliteQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheProportionnalite4e}
      slides={slidesProportionnalite4e}
    />
  );
}
