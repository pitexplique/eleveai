import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePourcentagesCM2,
  slidesPourcentagesCM2,
} from "@/lib/fiches/maths-cm2-pourcentages";

export const metadata: Metadata = {
  title: "Les pourcentages — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des pourcentages (sur 100, fractions simples, 50/25/10 %, calculer un pourcentage, réductions) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function PourcentagesCM2Page() {
  return (
    <FicheCoursClient
      fiche={fichePourcentagesCM2}
      slides={slidesPourcentagesCM2}
    />
  );
}
