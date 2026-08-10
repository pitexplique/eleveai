// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page n'est
// qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheEntiers6e, slidesEntiers6e } from "@/lib/fiches/maths-6e-entiers";

export const metadata: Metadata = {
  title: "Les nombres entiers — fiche de cours 6e",
  description:
    "Lire, écrire, comparer, décomposer et encadrer les nombres entiers : la fiche de cours complète de 6e avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function EntiersSixiemePage() {
  return <FicheCoursClient fiche={ficheEntiers6e} slides={slidesEntiers6e} />;
}
