import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProportionnaliteCM2,
  slidesProportionnaliteCM2,
} from "@/lib/fiches/maths-cm2-proportionnalite";

export const metadata: Metadata = {
  title: "La proportionnalité — fiche de cours CM2",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète de la proportionnalité (reconnaître, tableau, coefficient, retour à l'unité, problèmes) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function ProportionnaliteCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheProportionnaliteCM2}
      slides={slidesProportionnaliteCM2}
    />
  );
}
