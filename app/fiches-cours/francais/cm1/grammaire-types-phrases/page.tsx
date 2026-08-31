// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireTypesPhrasesCm1,
  slidesGrammaireTypesPhrasesCm1,
} from "@/lib/fiches/francais-cm1-grammaire-types-phrases";

export const metadata: Metadata = {
  title: "Les types et les formes de phrases en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : identifier les trois types de phrases (déclaratif, interrogatif, impératif), reconnaitre les formes négative et exclamative, transformer une phrase d'un type à l'autre et poser une question de trois façons. Pourquoi l'exclamatif n'est pas un type et pourquoi le type ne se lit pas au point final. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireTypesPhrasesCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammaireTypesPhrasesCm1}
      slides={slidesGrammaireTypesPhrasesCm1}
    />
  );
}
