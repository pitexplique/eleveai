// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page n'est
// qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheTriangles6e, slidesTriangles6e } from "@/lib/fiches/maths-6e-triangles";

export const metadata: Metadata = {
  title: "Les triangles — 6e : cours et exercices corrigés",
  description:
    "Nommer un triangle, reconnaître sa nature selon ses côtés et ses angles, utiliser la somme des angles égale à 180° et l'inégalité triangulaire : la fiche de cours complète de 6e avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function TrianglesSixiemePage() {
  return <FicheCoursClient fiche={ficheTriangles6e} slides={slidesTriangles6e} />;
}
