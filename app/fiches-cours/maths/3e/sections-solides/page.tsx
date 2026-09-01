// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheSectionsSolides3e, slidesSectionsSolides3e } from "@/lib/fiches/maths-3e-sections-solides";

export const metadata: Metadata = {
  title: "Sections planes de solides — 3e : cours et exercices corrigés",
  description:
    "Reconnaître une section plane, savoir qu'un cylindre donne un disque OU un rectangle selon la coupe, identifier la section d'un cube, d'un cône ou d'une pyramide, et calculer une diagonale par Pythagore : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés et six exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function SectionsSolidesTroisiemePage() {
  return <FicheCoursClient fiche={ficheSectionsSolides3e} slides={slidesSectionsSolides3e} />;
}
