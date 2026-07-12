// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheStatistiques4e,
  slidesStatistiques4e,
} from "@/lib/fiches/maths-4e-statistiques";

export const metadata: Metadata = {
  title: "Les statistiques — fiche de cours 4e | EleveAI",
  description:
    "Définition, propriétés, moyenne, médiane et étendue, exemples corrigés et exercices : la fiche de cours complète des statistiques en 4e, à lire, imprimer ou réviser en flashcards.",
};

export default function StatistiquesQuatriemePage() {
  return (
    <FicheCoursClient fiche={ficheStatistiques4e} slides={slidesStatistiques4e} />
  );
}
