// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureApprecier5e,
  slidesLectureApprecier5e,
} from "@/lib/fiches/francais-5e-lecture-apprecier";

export const metadata: Metadata = {
  title: "Apprécier un texte en 5e (2026-2027) : fonder son jugement de lecteur",
  description:
    "Programme de français 5e 2026-2027 : nommer ce qui, dans le texte, a produit l'effet ressenti, dire sur quoi se fonde un jugement — une émotion, la façon d'écrire, les idées défendues, ou un simple gout — et choisir l'outil d'analyse que la question appelle : point de vue, ordre du récit, champ lexical, images. L'arc qui va de l'effet vers sa cause, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureApprecierCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureApprecier5e}
      slides={slidesLectureApprecier5e}
    />
  );
}
