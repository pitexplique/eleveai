// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheExpressionsLitterales4e,
  slidesExpressionsLitterales4e,
} from "@/lib/fiches/maths-4e-expressions-litterales";

export const metadata: Metadata = {
  title: "Les expressions littérales — 4e : cours et exercices corrigés",
  description:
    "Comprendre une expression avec une lettre, traduire une phrase en expression littérale, calculer sa valeur pour un nombre donné et réduire les termes semblables : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function ExpressionsLitteralesQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheExpressionsLitterales4e}
      slides={slidesExpressionsLitterales4e}
    />
  );
}
