// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheThales3e, slidesThales3e } from "@/lib/fiches/maths-3e-thales";

export const metadata: Metadata = {
  title: "Théorème de Thalès — 3e : cours et exercices corrigés",
  description:
    "Reconnaître les DEUX configurations — triangles emboîtés et papillon —, écrire les trois quotients dans le bon ordre, calculer une longueur par produit en croix, prouver un parallélisme avec la réciproque et rédiger comme au brevet : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés et six exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function ThalesTroisiemePage() {
  return <FicheCoursClient fiche={ficheThales3e} slides={slidesThales3e} />;
}
