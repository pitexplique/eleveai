// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDistributivite4e,
  slidesDistributivite4e,
} from "@/lib/fiches/maths-4e-distributivite";

export const metadata: Metadata = {
  title: "La distributivité — 4e : cours et exercices corrigés",
  description:
    "Développer avec un facteur devant une parenthèse, développer un produit de deux parenthèses, réduire après développement et reconnaître une forme factorisée : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function DistributiviteQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheDistributivite4e}
      slides={slidesDistributivite4e}
    />
  );
}
