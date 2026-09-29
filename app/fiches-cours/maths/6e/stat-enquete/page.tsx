// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheStatEnquete6e,
  slidesStatEnquete6e,
} from "@/lib/fiches/maths-6e-stat-enquete";

export const metadata: Metadata = {
  title: "Mener une enquête et faire un tableau — 6e : cours et exercices corrigés",
  description:
    "Poser une bonne question, interroger le bon groupe, noter ses mesures avec l'unité dans l'en-tête, compter avec des bâtons et construire un tableau d'effectifs : la fiche de cours de 6e, dessinée, avec exemples corrigés et exercices.",
};

export default function StatEnqueteSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheStatEnquete6e}
      slides={slidesStatEnquete6e}
    />
  );
}
