// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheArithmetique3e, slidesArithmetique3e } from "@/lib/fiches/maths-3e-arithmetique";

export const metadata: Metadata = {
  title: "Multiples, diviseurs et facteurs premiers — 3e : cours et exercices corrigés",
  description:
    "Décomposer un entier en produit de facteurs premiers, reconnaître un nombre premier, calculer un PGCD, rendre une fraction irréductible et répartir sans reste : la fiche de cours complète en 3e, avec cinq propriétés dessinées, trois exemples corrigés et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function ArithmetiqueTroisiemePage() {
  return <FicheCoursClient fiche={ficheArithmetique3e} slides={slidesArithmetique3e} />;
}
