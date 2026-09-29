// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAlgebreProbleme6e,
  slidesAlgebreProbleme6e,
} from "@/lib/fiches/maths-6e-algebre-probleme";

export const metadata: Metadata = {
  title: "Problèmes à nombres cachés et motifs — 6e : cours et exercices corrigés",
  description:
    "Le schéma en barres pour trouver des nombres cachés, retrouver un prix, repérer la régularité d'un motif et le remonter : la fiche de cours de 6e, sans lettre ni équation, avec un dessin par règle, des exemples corrigés et des exercices.",
};

export default function AlgebreProblemeSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheAlgebreProbleme6e}
      slides={slidesAlgebreProbleme6e}
    />
  );
}
