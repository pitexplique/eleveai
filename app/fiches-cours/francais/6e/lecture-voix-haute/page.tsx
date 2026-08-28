// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureVoixHaute6e,
  slidesLectureVoixHaute6e,
} from "@/lib/fiches/francais-6e-lecture-voix-haute";

export const metadata: Metadata = {
  title: "Lire à voix haute en 6e (2026-2027) : mettre le ton",
  description:
    "Programme de français 6e 2026-2027 : préparer une lecture de dix à vingt lignes en la lisant d'abord en silence, lire en regardant l'auditoire, et trouver le ton là où il est écrit — le verbe de parole, la ponctuation de fin, les mots du récit. Le tiret qui annonce une autre voix, la lecture monotone, et l'oubli qui se répare par une courte pause. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureVoixHauteSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureVoixHaute6e}
      slides={slidesLectureVoixHaute6e}
    />
  );
}
