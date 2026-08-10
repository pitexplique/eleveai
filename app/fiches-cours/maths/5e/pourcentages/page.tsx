// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePourcentages5e,
  slidesPourcentages5e,
} from "@/lib/fiches/maths-5e-pourcentages";

export const metadata: Metadata = {
  title: "Les pourcentages — fiche de cours 5e",
  description:
    "Définition, propriétés, formule, exemples corrigés et exercices : la fiche de cours complète des pourcentages en 5e, à lire, imprimer ou réviser en flashcards.",
};

export default function PourcentagesCinquiemePage() {
  return (
    <FicheCoursClient fiche={fichePourcentages5e} slides={slidesPourcentages5e} />
  );
}
