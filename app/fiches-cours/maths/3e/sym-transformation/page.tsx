// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheTransformations3e, slidesTransformations3e } from "@/lib/fiches/maths-3e-transformations";

export const metadata: Metadata = {
  title: "Transformations et homothétie — 3e : cours et exercices corrigés",
  description:
    "Reconnaître une homothétie à ses droites concourantes, construire l'image d'une figure, calculer le rapport k, et comprendre pourquoi les longueurs sont multipliées par k, les aires par k² et les volumes par k³ : la fiche de cours complète en 3e, avec sept propriétés dessinées, quatre exemples corrigés et cinq exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function TransformationsTroisiemePage() {
  return <FicheCoursClient fiche={ficheTransformations3e} slides={slidesTransformations3e} />;
}
