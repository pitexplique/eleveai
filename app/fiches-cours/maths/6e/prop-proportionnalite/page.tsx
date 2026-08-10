// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page n'est
// qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProportionnalite6e,
  slidesProportionnalite6e,
} from "@/lib/fiches/maths-6e-proportionnalite";

export const metadata: Metadata = {
  title: "Proportionnalité — fiche de cours 6e",
  description:
    "Définition, propriétés, exemples corrigés et exercices : la fiche de cours complète de la proportionnalité en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function ProportionnaliteSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheProportionnalite6e}
      slides={slidesProportionnalite6e}
    />
  );
}
