import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOperationsRelatifs5e,
  slidesOperationsRelatifs5e,
} from "@/lib/fiches/maths-5e-operations-relatifs";

export const metadata: Metadata = {
  title: "Calculer avec les relatifs — 5e : cours et exercices corrigés",
  description:
    "Définition, règles de signes, méthode, exemples corrigés et exercices : la fiche de cours complète des additions et soustractions de nombres relatifs en 5e, à lire, imprimer ou réviser en flashcards.",
};

export default function OperationsRelatifsCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheOperationsRelatifs5e}
      slides={slidesOperationsRelatifs5e}
    />
  );
}
