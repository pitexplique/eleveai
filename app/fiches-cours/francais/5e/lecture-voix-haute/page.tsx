// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureVoixHaute5e,
  slidesLectureVoixHaute5e,
} from "@/lib/fiches/francais-5e-lecture-voix-haute";

export const metadata: Metadata = {
  title: "Lire à voix haute en 5e (2026-2027) : préparer, ponctuer, réciter",
  description:
    "Programme de français 5e 2026-2027 : préparer la lecture orale d'un texte d'une vingtaine de lignes, découper en groupes de souffle, lire la ponctuation comme une consigne (virgule, point, deux-points, tiret de dialogue), apprendre un texte par cœur et repérer ce qui est à améliorer dans une lecture entendue. Le texte annoté comme une partition, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureVoixHauteCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureVoixHaute5e}
      slides={slidesLectureVoixHaute5e}
    />
  );
}
