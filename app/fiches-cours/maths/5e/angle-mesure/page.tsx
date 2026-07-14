import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAngles5e,
  slidesAngles5e,
} from "@/lib/fiches/maths-5e-angles";

export const metadata: Metadata = {
  title: "Les angles — fiche de cours 5e | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des angles en 5e (sommet, degré, rapporteur, angle aigu, droit, obtus, plat), à lire, imprimer ou réviser en flashcards.",
};

export default function AnglesCinquiemePage() {
  return <FicheCoursClient fiche={ficheAngles5e} slides={slidesAngles5e} />;
}
