// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureVoixHauteCm2,
  slidesLectureVoixHauteCm2,
} from "@/lib/fiches/francais-cm2-lecture-voix-haute";

export const metadata: Metadata = {
  title: "Lire à voix haute en CM2 (2026-2027) : mettre le ton",
  description:
    "Programme de français CM2 2026-2027 : lire à voix haute avec expressivité — articuler jusqu'au fond de la salle, régler son rythme sur celui qui écoute, mettre le ton que le texte indique, faire varier pour ne pas être monotone, et prendre plaisir à lire, comme le programme le demande. Pourquoi c'est l'auditoire qui juge une lecture, et non le nombre d'erreurs. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureVoixHauteCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheLectureVoixHauteCm2}
      slides={slidesLectureVoixHauteCm2}
    />
  );
}
