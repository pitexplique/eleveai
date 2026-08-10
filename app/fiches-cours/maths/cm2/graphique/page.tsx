import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGraphiquesCM2,
  slidesGraphiquesCM2,
} from "@/lib/fiches/maths-cm2-graphiques";

export const metadata: Metadata = {
  title: "Lire un graphique — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète pour lire un graphique (diagramme en barres, en bâtons, camembert, échelle, hauteur, interpréter des données) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function GraphiquesCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheGraphiquesCM2}
      slides={slidesGraphiquesCM2}
    />
  );
}
