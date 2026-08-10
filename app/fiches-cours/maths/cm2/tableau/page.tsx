import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheTableauxCM2, slidesTableauxCM2 } from "@/lib/fiches/maths-cm2-tableaux";

export const metadata: Metadata = {
  title: "Lire un tableau — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète pour lire un tableau (ligne, colonne, croisement, total, interpréter des données) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function TableauxCM2Page() {
  return <FicheCoursClient fiche={ficheTableauxCM2} slides={slidesTableauxCM2} />;
}
