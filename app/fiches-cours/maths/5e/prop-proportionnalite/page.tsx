import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProportionnalite5e,
  slidesProportionnalite5e,
} from "@/lib/fiches/maths-5e-proportionnalite";

export const metadata: Metadata = {
  title: "La proportionnalité — 5e : cours et exercices corrigés",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète de la proportionnalité en 5e (coefficient, tableau, retour à l'unité, ratio, pourcentage, hausse et baisse), à lire, imprimer ou réviser en flashcards.",
};

export default function ProportionnaliteCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheProportionnalite5e}
      slides={slidesProportionnalite5e}
    />
  );
}
