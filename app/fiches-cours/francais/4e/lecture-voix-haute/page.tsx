// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureVoixHaute4e,
  slidesLectureVoixHaute4e,
} from "@/lib/fiches/francais-4e-lecture-voix-haute";

export const metadata: Metadata = {
  title: "Lire à voix haute en 4e (2026-2027) : souffle, ponctuation, récitation",
  description:
    "Programme de français 4e 2026-2027 : préparer un texte pour la voix en l'annotant, le découper en groupes de souffle, repérer les mots qui doivent s'entendre, suivre la ponctuation qui commande la voix — suspension, montée, incise plus basse, accélération —, changer de voix quand un personnage parle, et traverser un accident de récitation sans s'arrêter. Chaque texte dessiné comme une partition, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureVoixHauteQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureVoixHaute4e}
      slides={slidesLectureVoixHaute4e}
    />
  );
}
