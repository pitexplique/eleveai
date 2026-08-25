// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⭐ LE MOT « FRANÇAIS » EST DANS LA DESCRIPTION, et ce n'est pas décoratif.
// Mesuré le 25/08/2026 : il n'était dans AUCUN des 94 titres de fiches du site,
// et dans dix descriptions — dont les huit de la 5e, qui servent de modèle. Une
// requête « français 4e phrase complexe » doit trouver le mot sur la page.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePhraseComplexe4e,
  slidesPhraseComplexe4e,
} from "@/lib/fiches/francais-4e-phrase-complexe";

export const metadata: Metadata = {
  title: "La phrase complexe en 4e (2026-2027) : propositions et subordonnées",
  description:
    "Programme de français 4e 2026-2027 : compter les verbes conjugués pour distinguer phrase simple, complexe et non verbale, séparer juxtaposition, coordination et subordination, reconnaitre les cinq sortes de propositions subordonnées — conjonctive, interrogative indirecte, relative, infinitive, participiale —, donner leur fonction et celle du pronom relatif. Chaque règle dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function PhraseComplexeQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={fichePhraseComplexe4e}
      slides={slidesPhraseComplexe4e}
    />
  );
}
