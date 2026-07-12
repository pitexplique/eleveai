import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAires6e, slidesAires6e } from "@/lib/fiches/maths-6e-aires";

export const metadata: Metadata = {
  title: "Les aires — fiche de cours 6e | EleveAI",
  description:
    "Définition, propriétés, formules, exemples corrigés et exercices : la fiche de cours complète des aires en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function AiresSixiemePage() {
  return <FicheCoursClient fiche={ficheAires6e} slides={slidesAires6e} />;
}
