// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheFonctions3e, slidesFonctions3e } from "@/lib/fiches/maths-3e-fonctions";

export const metadata: Metadata = {
  title: "Fonctions : image et antécédent — 3e : cours et exercices corrigés",
  description:
    "Comprendre ce qu'est une fonction, lire et écrire f(x), calculer une image en remplaçant, chercher un antécédent en résolvant, utiliser un tableau de valeurs, lire une courbe dans les deux sens et reconnaître une fonction linéaire ou affine : la fiche de cours complète en 3e, avec sept propriétés dessinées, quatre exemples corrigés et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function FonctionsTroisiemePage() {
  return <FicheCoursClient fiche={ficheFonctions3e} slides={slidesFonctions3e} />;
}
