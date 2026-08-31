// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheVisionEspace4e, slidesVisionEspace4e } from "@/lib/fiches/maths-4e-vision-espace";

export const metadata: Metadata = {
  title: "Solides et représentations — 4e : cours et exercices corrigés",
  description:
    "Reconnaître les sept solides du programme, lire les vues de face et de dessus, comprendre le patron et la perspective cavalière, trouver la forme d'une section plane : la fiche de cours complète en 4e, avec sept propriétés dessinées, trois exemples corrigés et douze exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function VisionEspaceQuatriemePage() {
  return <FicheCoursClient fiche={ficheVisionEspace4e} slides={slidesVisionEspace4e} />;
}
