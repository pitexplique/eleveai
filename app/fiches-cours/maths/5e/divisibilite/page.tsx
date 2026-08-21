// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDivisibilite5e,
  slidesDivisibilite5e,
} from "@/lib/fiches/maths-5e-divisibilite";

export const metadata: Metadata = {
  title: "Multiples, diviseurs et divisibilité — fiche de cours 5e",
  description:
    "Multiples et diviseurs, critères de divisibilité par 2, 5, 10, 3 et 9, liste des diviseurs par paires : la fiche de cours de 5e avec propriétés dessinées, exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function DivisibiliteCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheDivisibilite5e}
      slides={slidesDivisibilite5e}
    />
  );
}
