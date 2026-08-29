// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureOeuvres6e,
  slidesLectureOeuvres6e,
} from "@/lib/fiches/francais-6e-lecture-oeuvres";

export const metadata: Metadata = {
  title: "Lire une œuvre entière en 6e (2026-2027) : fonder son avis",
  description:
    "Programme de français 6e 2026-2027 : suivre une œuvre longue en lecture intégrale ou cursive — une phrase par chapitre, un peu chaque jour —, relier le livre à ce qu'on a vécu, fonder son interprétation sur un passage précis, et débattre d'une œuvre en s'appuyant sur le texte. Pourquoi deux lectures d'une même fin sont normales. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureOeuvresSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureOeuvres6e}
      slides={slidesLectureOeuvres6e}
    />
  );
}
