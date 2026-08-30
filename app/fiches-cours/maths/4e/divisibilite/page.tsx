// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheDivisibilite4e, slidesDivisibilite4e } from "@/lib/fiches/maths-4e-divisibilite";

export const metadata: Metadata = {
  title: "Multiples, diviseurs et division euclidienne — 4e : cours et exercices corrigés",
  description:
    "Reconnaître un multiple et un diviseur, utiliser les critères de divisibilité par 2, 3, 5, 9 et 10, poser une division euclidienne avec son quotient et son reste, lister tous les diviseurs par paires et résoudre les problèmes de lots et de rendez-vous : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function DivisibiliteQuatriemePage() {
  return <FicheCoursClient fiche={ficheDivisibilite4e} slides={slidesDivisibilite4e} />;
}
