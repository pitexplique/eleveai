// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionCalcul6e,
  slidesFractionCalcul6e,
} from "@/lib/fiches/maths-6e-fraction-calcul";

export const metadata: Metadata = {
  title: "Calculer avec les fractions — 6e : cours et exercices corrigés",
  description:
    "Prendre une fraction d'un nombre, additionner et soustraire des fractions, multiplier une fraction par un entier : la fiche de cours de 6e, avec des barres partagées pour voir les parts, des exemples corrigés et des exercices.",
};

export default function FractionCalculSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheFractionCalcul6e}
      slides={slidesFractionCalcul6e}
    />
  );
}
