import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheNombresEntiersCM2,
  slidesNombresEntiersCM2,
} from "@/lib/fiches/maths-cm2-nombres-entiers";

export const metadata: Metadata = {
  title: "Les nombres entiers — fiche de cours CM2 | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des nombres entiers (tableau de numération, lire, comparer, décomposer, arrondir, multiples) en CM2, à lire, imprimer ou réviser en flashcards.",
};

export default function NombresEntiersCM2Page() {
  return (
    <FicheCoursClient
      fiche={ficheNombresEntiersCM2}
      slides={slidesNombresEntiersCM2}
    />
  );
}
