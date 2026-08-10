// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCosinus4e,
  slidesCosinus4e,
} from "@/lib/fiches/maths-4e-cosinus";

export const metadata: Metadata = {
  title: "Le cosinus — fiche de cours 4e",
  description:
    "Définition, propriétés, formule, exemples corrigés et exercices : la fiche de cours complète du cosinus en 4e, à lire, imprimer ou réviser en flashcards.",
};

export default function CosinusQuatriemePage() {
  return <FicheCoursClient fiche={ficheCosinus4e} slides={slidesCosinus4e} />;
}
