// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFactorisation4e,
  slidesFactorisation4e,
} from "@/lib/fiches/maths-4e-factorisation";

export const metadata: Metadata = {
  title: "La factorisation — 4e : cours et exercices corrigés",
  description:
    "Trouver le facteur commun, diviser chaque terme, factoriser avec une identité remarquable et vérifier en développant : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function FactorisationQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheFactorisation4e}
      slides={slidesFactorisation4e}
    />
  );
}
