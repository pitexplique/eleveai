// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProbabilites4e,
  slidesProbabilites4e,
} from "@/lib/fiches/maths-4e-probabilites";

export const metadata: Metadata = {
  title: "Les probabilités — fiche de cours 4e",
  description:
    "Définition, propriétés, formule, exemples corrigés et exercices : la fiche de cours complète des probabilités en 4e, à lire, imprimer ou réviser en flashcards.",
};

export default function ProbabilitesQuatriemePage() {
  return (
    <FicheCoursClient fiche={ficheProbabilites4e} slides={slidesProbabilites4e} />
  );
}
