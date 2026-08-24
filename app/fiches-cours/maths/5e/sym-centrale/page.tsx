import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheSymetrieCentrale5e,
  slidesSymetrieCentrale5e,
} from "@/lib/fiches/maths-5e-symetrie-centrale";

export const metadata: Metadata = {
  title: "La symétrie centrale — 5e : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète de la symétrie centrale en 5e (demi-tour, centre, image d'un point et d'une figure, propriétés), à lire, imprimer ou réviser en flashcards.",
};

export default function SymetrieCentraleCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheSymetrieCentrale5e}
      slides={slidesSymetrieCentrale5e}
    />
  );
}
