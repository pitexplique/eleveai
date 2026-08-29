// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureOeuvresCm2,
  slidesLectureOeuvresCm2,
} from "@/lib/fiches/francais-cm2-lecture-oeuvres";

export const metadata: Metadata = {
  title: "Le thème d'une œuvre en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : identifier le thème, les personnages et les enjeux d'une œuvre — pourquoi un thème tient en un mot et n'est pas l'histoire —, relier une lecture à une autre œuvre par son thème, et la relier à son expérience par l'émotion plutôt que par la situation. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureOeuvresCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheLectureOeuvresCm2}
      slides={slidesLectureOeuvresCm2}
    />
  );
}
