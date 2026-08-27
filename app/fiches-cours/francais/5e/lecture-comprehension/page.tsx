// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureComprehension5e,
  slidesLectureComprehension5e,
} from "@/lib/fiches/francais-5e-lecture-comprehension";

export const metadata: Metadata = {
  title: "Comprendre et interpréter un texte en 5e (2026-2027) : l'implicite",
  description:
    "Programme de français 5e 2026-2027 : situer un passage dans les cinq moments du récit, savoir où retourner chercher un indice selon la question posée, comprendre ce qu'un texte fait comprendre sans l'écrire — la peur par le corps, le mensonge par l'écart, la colère par le rythme — et se débloquer seul en lisant. L'arc de justification dessiné sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureComprehensionCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureComprehension5e}
      slides={slidesLectureComprehension5e}
    />
  );
}
