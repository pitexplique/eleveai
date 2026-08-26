// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureComprehension4e,
  slidesLectureComprehension4e,
} from "@/lib/fiches/francais-4e-lecture-comprehension";

export const metadata: Metadata = {
  title: "Comprendre et interpréter un texte en 4e (2026-2027) : indices et implicite",
  description:
    "Programme de français 4e 2026-2027 : reconnaitre ce qu'un texte fait — raconter, décrire, faire un portrait, argumenter —, relever les six familles d'indices qui justifient une interprétation, comprendre l'implicite d'une phrase, fonder une appréciation sur le texte et entrer dans un débat interprétatif. Chaque indice dessiné sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureComprehensionQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureComprehension4e}
      slides={slidesLectureComprehension4e}
    />
  );
}
