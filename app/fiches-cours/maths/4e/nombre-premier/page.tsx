// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheNombresPremiers4e, slidesNombresPremiers4e } from "@/lib/fiches/maths-4e-nombres-premiers";

export const metadata: Metadata = {
  title: "Nombres premiers et décomposition — 4e : cours et exercices corrigés",
  description:
    "Reconnaître un nombre premier, connaître la liste jusqu'à 30, déterminer les premiers jusqu'à 100 avec le crible d'Ératosthène, décomposer un entier en produit de facteurs premiers et s'en servir pour simplifier une fraction : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function NombresPremiersQuatriemePage() {
  return <FicheCoursClient fiche={ficheNombresPremiers4e} slides={slidesNombresPremiers4e} />;
}
