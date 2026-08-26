// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheStatistiques4e,
  slidesStatistiques4e,
} from "@/lib/fiches/maths-4e-statistiques";

export const metadata: Metadata = {
  title: "Les statistiques — 4e : cours et exercices corrigés",
  description:
    "Lire un tableau et un graphique, calculer un effectif, une fréquence, une moyenne pondérée, une médiane et une étendue, puis comparer deux séries : la fiche de cours complète des statistiques en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function StatistiquesQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheStatistiques4e}
      slides={slidesStatistiques4e}
    />
  );
}
