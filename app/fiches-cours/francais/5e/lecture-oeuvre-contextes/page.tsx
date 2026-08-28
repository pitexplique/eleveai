// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureOeuvreContextes5e,
  slidesLectureOeuvreContextes5e,
} from "@/lib/fiches/francais-5e-lecture-oeuvre-contextes";

export const metadata: Metadata = {
  title: "Le parcours d'un personnage en 5e (2026-2027) : suivre une œuvre",
  description:
    "Programme de français 5e 2026-2027 : suivre le parcours d'un personnage en comparant la fin au premier chapitre, comparer ce que peuvent les mots, l'image, la musique et la scène, et se servir du contexte de production pour interpréter une œuvre. Les quatre étapes de la transformation, l'arc qui remonte de la fin vers le début, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureOeuvreContextesCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureOeuvreContextes5e}
      slides={slidesLectureOeuvreContextes5e}
    />
  );
}
