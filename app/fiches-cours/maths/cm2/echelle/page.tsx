import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheEchelleCM2, slidesEchelleCM2 } from "@/lib/fiches/maths-cm2-echelle";

export const metadata: Metadata = {
  title: "Les échelles — fiche de cours CM2 | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des échelles (lire une échelle, passer du plan à la distance réelle et l'inverse, proportionnalité) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function EchelleCM2Page() {
  return <FicheCoursClient fiche={ficheEchelleCM2} slides={slidesEchelleCM2} />;
}
