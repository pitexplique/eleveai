import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheSymetrieCM2, slidesSymetrieCM2 } from "@/lib/fiches/maths-cm2-symetrie";

export const metadata: Metadata = {
  title: "La symétrie axiale — fiche de cours CM2 | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète de la symétrie axiale (l'axe miroir, image d'un point, compléter et construire une figure, axes du carré et du rectangle) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function SymetrieCM2Page() {
  return <FicheCoursClient fiche={ficheSymetrieCM2} slides={slidesSymetrieCM2} />;
}
