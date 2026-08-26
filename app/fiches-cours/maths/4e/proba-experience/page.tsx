// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProbabilites4e,
  slidesProbabilites4e,
} from "@/lib/fiches/maths-4e-probabilites";

export const metadata: Metadata = {
  title: "Les probabilités — 4e : cours et exercices corrigés",
  description:
    "Issues, événement certain, impossible ou contraire, équiprobabilité, calcul d'une probabilité en fraction, en décimal et en pourcentage, et expériences à deux épreuves : la fiche de cours complète des probabilités en 4e, avec le dé, l'urne, la roue et l'arbre dessinés, trois exemples corrigés et des exercices.",
};

export default function ProbabilitesQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheProbabilites4e}
      slides={slidesProbabilites4e}
    />
  );
}
