// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheFonctions4e, slidesFonctions4e } from "@/lib/fiches/maths-4e-fonctions";

export const metadata: Metadata = {
  title: "Dépendance entre deux grandeurs — 4e : cours et exercices corrigés",
  description:
    "Reconnaître qu'une grandeur en détermine une autre, suivre un programme de calcul et le remonter, lire un tableau et un graphique dans les deux sens, passer d'une représentation à l'autre — et comprendre pourquoi dépendre n'est pas être proportionnel : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et huit exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function FonctionsQuatriemePage() {
  return <FicheCoursClient fiche={ficheFonctions4e} slides={slidesFonctions4e} />;
}
