// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionCalcul5e,
  slidesFractionCalcul5e,
} from "@/lib/fiches/maths-5e-fraction-calcul";

export const metadata: Metadata = {
  title: "Calculer avec les fractions — fiche de cours 5e",
  description:
    "Additionner, soustraire, multiplier des fractions et calculer une fraction d'une quantité : définition, propriétés dessinées, exemples corrigés et exercices, la fiche de cours complète de 5e à lire, imprimer ou réviser en flashcards.",
};

export default function FractionCalculCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheFractionCalcul5e}
      slides={slidesFractionCalcul5e}
    />
  );
}
