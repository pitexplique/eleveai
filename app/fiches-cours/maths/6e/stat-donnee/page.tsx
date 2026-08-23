// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page n'est
// qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheDonnees6e, slidesDonnees6e } from "@/lib/fiches/maths-6e-donnees";

export const metadata: Metadata = {
  title: "Lire et interpréter des données — 6e : cours et exercices corrigés",
  description:
    "Lire un tableau, un graphique en barres et un diagramme circulaire, prélever une information, comparer et interpréter : la fiche de cours complète de 6e avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function DonneesSixiemePage() {
  return <FicheCoursClient fiche={ficheDonnees6e} slides={slidesDonnees6e} />;
}
