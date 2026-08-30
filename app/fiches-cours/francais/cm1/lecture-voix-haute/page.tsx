// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureVoixHauteCm1,
  slidesLectureVoixHauteCm1,
} from "@/lib/fiches/francais-cm1-lecture-voix-haute";

export const metadata: Metadata = {
  title: "Lire à voix haute en CM1 : volume, débit et rythme (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : lire à voix haute avec aisance et expressivité, tenir un rythme régulier pour que l'auditoire suive, régler le volume et le débit de sa voix. Pourquoi parler plus fort ne rend jamais plus clair, pourquoi le volume se règle sur le dernier rang, et pourquoi on lit toujours trop vite. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureVoixHauteCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheLectureVoixHauteCm1}
      slides={slidesLectureVoixHauteCm1}
    />
  );
}
