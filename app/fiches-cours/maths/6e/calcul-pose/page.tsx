import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCalculPose6e,
  slidesCalculPose6e,
} from "@/lib/fiches/maths-6e-calcul-pose";

export const metadata: Metadata = {
  title: "Le calcul posé — fiche de cours 6e | EleveAI",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète du calcul posé (addition, soustraction, multiplication, division) en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function CalculPoseSixiemePage() {
  return (
    <FicheCoursClient fiche={ficheCalculPose6e} slides={slidesCalculPose6e} />
  );
}
