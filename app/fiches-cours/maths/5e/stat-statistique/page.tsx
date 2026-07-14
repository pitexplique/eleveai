import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheStatistiques5e,
  slidesStatistiques5e,
} from "@/lib/fiches/maths-5e-statistiques";

export const metadata: Metadata = {
  title: "Les statistiques — fiche de cours 5e | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des statistiques en 5e (effectif, total, fréquence, moyenne, diagramme en barres et camembert), à lire, imprimer ou réviser en flashcards.",
};

export default function StatistiquesCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheStatistiques5e}
      slides={slidesStatistiques5e}
    />
  );
}
