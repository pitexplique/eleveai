// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireSens4e,
  slidesVocabulaireSens4e,
} from "@/lib/fiches/francais-4e-vocabulaire-sens";

export const metadata: Metadata = {
  title: "Le sens des mots en 4e (2026-2027) : contexte, intensité, connotation",
  description:
    "Programme de français 4e 2026-2027 : trouver le sens d'un mot par le contexte, distinguer famille de mots et champ lexical, classer les mots par degré d'intensité et par degré de généralité, séparer ce qu'un mot désigne de ce qu'il suggère, et trancher entre polysémie, homonymie, synonymie et antonymie. L'intensité dessinée en échelle, la généralité en emboitement, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireSensQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireSens4e}
      slides={slidesVocabulaireSens4e}
    />
  );
}
