import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheVolumes6e, slidesVolumes6e } from "@/lib/fiches/maths-6e-volumes";

export const metadata: Metadata = {
  title: "Les volumes — fiche de cours 6e",
  description:
    "Définition, unités de volume, exemples corrigés et exercices : la fiche de cours complète des volumes en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function VolumesSixiemePage() {
  return <FicheCoursClient fiche={ficheVolumes6e} slides={slidesVolumes6e} />;
}
