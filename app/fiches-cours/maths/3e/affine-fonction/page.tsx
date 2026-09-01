// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheFonctionsAffines3e, slidesFonctionsAffines3e } from "@/lib/fiches/maths-3e-fonctions-affines";

export const metadata: Metadata = {
  title: "Fonctions affines — 3e : cours et exercices corrigés",
  description:
    "Reconnaître une fonction affine ou linéaire, comprendre le coefficient directeur et l'ordonnée à l'origine, calculer une image, retrouver l'expression à partir de deux points, lire un graphique et comparer deux offres : la fiche de cours complète en 3e, avec sept propriétés dessinées, trois exemples corrigés et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function FonctionsAffinesTroisiemePage() {
  return <FicheCoursClient fiche={ficheFonctionsAffines3e} slides={slidesFonctionsAffines3e} />;
}
