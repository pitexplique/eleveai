// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionsAddition5e,
  slidesFractionsAddition5e,
} from "@/lib/fiches/maths-5e-fractions-addition";

export const metadata: Metadata = {
  title: "Additionner des fractions — fiche de cours 5e | EleveAI",
  description:
    "Définition, propriétés, formule, exemples corrigés et exercices : la fiche de cours complète de l'addition de fractions en 5e, à lire, imprimer ou réviser en flashcards.",
};

export default function FractionsAdditionCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheFractionsAddition5e}
      slides={slidesFractionsAddition5e}
    />
  );
}
