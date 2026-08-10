import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAnglesCM2, slidesAnglesCM2 } from "@/lib/fiches/maths-cm2-angles";

export const metadata: Metadata = {
  title: "Les angles — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des angles (sommet, côtés, angle droit 90°, aigu, obtus, plat, mesurer au rapporteur) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function AnglesCM2Page() {
  return <FicheCoursClient fiche={ficheAnglesCM2} slides={slidesAnglesCM2} />;
}
