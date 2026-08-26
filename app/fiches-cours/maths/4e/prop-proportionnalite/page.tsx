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
    "Reconnaître une situation proportionnelle, compléter un tableau, calculer une quatrième proportionnelle au produit en croix, et faire évoluer un prix avec un coefficient multiplicateur : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function ProportionnaliteQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheProportionnalite4e}
      slides={slidesProportionnalite4e}
    />
  );
}
