import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProbabilites5e,
  slidesProbabilites5e,
} from "@/lib/fiches/maths-5e-probabilites";

export const metadata: Metadata = {
  title: "Les probabilités — fiche de cours 5e | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des probabilités en 5e (expérience aléatoire, issue, événement, équiprobabilité, calcul d'une probabilité), à lire, imprimer ou réviser en flashcards.",
};

export default function ProbabilitesCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheProbabilites5e}
      slides={slidesProbabilites5e}
    />
  );
}
