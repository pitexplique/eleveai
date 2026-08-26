// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheIdentitesRemarquables4e,
  slidesIdentitesRemarquables4e,
} from "@/lib/fiches/maths-4e-identites-remarquables";

export const metadata: Metadata = {
  title: "Les identités remarquables — 4e : cours et exercices corrigés",
  description:
    "Le carré d'une somme, le carré d'une différence et la différence de deux carrés : reconnaître la forme, développer sans oublier le double produit, et éviter l'erreur (x + 5)² = x² + 25. La fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function IdentitesRemarquablesQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheIdentitesRemarquables4e}
      slides={slidesIdentitesRemarquables4e}
    />
  );
}
