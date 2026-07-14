import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAlgorithmique5e,
  slidesAlgorithmique5e,
} from "@/lib/fiches/maths-5e-algorithmique";

export const metadata: Metadata = {
  title: "Algorithmique et programmation — fiche de cours 5e | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète d'algorithmique en 5e (Scratch, variables, tests « si… », boucles « répéter… », valeur d'une expression), à lire, imprimer ou réviser en flashcards.",
};

export default function AlgorithmiqueCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheAlgorithmique5e}
      slides={slidesAlgorithmique5e}
    />
  );
}
