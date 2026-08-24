import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheContenancesCM2,
  slidesContenancesCM2,
} from "@/lib/fiches/maths-cm2-contenances";

export const metadata: Metadata = {
  title: "Les contenances — CM2 : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des contenances (litre, centilitre, millilitre, estimer, comparer, convertir L/mL, 1 L = 1000 mL) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function ContenancesCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheContenancesCM2}
      slides={slidesContenancesCM2}
    />
  );
}
