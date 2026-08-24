import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheVolumes5e, slidesVolumes5e } from "@/lib/fiches/maths-5e-volumes";

export const metadata: Metadata = {
  title: "Les volumes — 5e : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des volumes en 5e (pavé droit L × l × h, prisme et cylindre aire de base × hauteur, unités et litres), à lire, imprimer ou réviser en flashcards.",
};

export default function VolumesCinquiemePage() {
  return <FicheCoursClient fiche={ficheVolumes5e} slides={slidesVolumes5e} />;
}
