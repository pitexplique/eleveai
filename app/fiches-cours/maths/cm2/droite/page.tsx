import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheDroiteCM2, slidesDroiteCM2 } from "@/lib/fiches/maths-cm2-droite";

export const metadata: Metadata = {
  title: "Droites et segments — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète sur les droites (droite, segment, demi-droite, droites parallèles et perpendiculaires, angle droit, équerre) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function DroiteCM2Page() {
  return <FicheCoursClient fiche={ficheDroiteCM2} slides={slidesDroiteCM2} />;
}
