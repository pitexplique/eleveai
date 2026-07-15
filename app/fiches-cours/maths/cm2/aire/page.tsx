import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAiresCM2, slidesAiresCM2 } from "@/lib/fiches/maths-cm2-aires";

export const metadata: Metadata = {
  title: "Les aires — fiche de cours CM2 | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des aires (la surface d'une figure, compter les carreaux, rectangle L × l, carré, triangle rectangle, figure composée) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function AiresCM2Page() {
  return <FicheCoursClient fiche={ficheAiresCM2} slides={slidesAiresCM2} />;
}
