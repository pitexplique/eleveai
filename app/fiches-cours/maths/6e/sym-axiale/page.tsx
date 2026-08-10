// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page n'est
// qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheSymetrie6e, slidesSymetrie6e } from "@/lib/fiches/maths-6e-symetrie";

export const metadata: Metadata = {
  title: "La symétrie axiale — fiche de cours 6e",
  description:
    "Reconnaître une symétrie axiale, construire l'image d'un point ou d'une figure, utiliser ses propriétés et trouver les axes des figures usuelles : la fiche de cours complète de 6e avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function SymetrieSixiemePage() {
  return <FicheCoursClient fiche={ficheSymetrie6e} slides={slidesSymetrie6e} />;
}
