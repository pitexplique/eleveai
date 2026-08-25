// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammairePhrase4e,
  slidesGrammairePhrase4e,
} from "@/lib/fiches/francais-4e-grammaire-phrase";

export const metadata: Metadata = {
  title: "Les groupes de la phrase en 4e (2026-2027) : nature et fonction",
  description:
    "Programme de français 4e 2026-2027 : distinguer la nature d'un groupe de sa fonction, reconnaitre groupe nominal, verbal, prépositionnel et adverbial, prouver sujet, complément d'objet direct et indirect, complément circonstanciel, attribut du sujet et complément du nom par les trois manipulations, accorder le verbe quand le sujet est loin, inversé ou collectif, et distinguer la grammaire de l'oral de celle de l'écrit. Chaque règle dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammairePhraseQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheGrammairePhrase4e}
      slides={slidesGrammairePhrase4e}
    />
  );
}
