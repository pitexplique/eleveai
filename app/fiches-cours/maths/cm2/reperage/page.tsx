import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheReperageCM2, slidesReperageCM2 } from "@/lib/fiches/maths-cm2-reperage";

export const metadata: Metadata = {
  title: "Le repérage — fiche de cours CM2 | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète du repérage sur quadrillage (coordonnées x et y, lire, placer un point, se déplacer, origine) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function ReperageCM2Page() {
  return <FicheCoursClient fiche={ficheReperageCM2} slides={slidesReperageCM2} />;
}
