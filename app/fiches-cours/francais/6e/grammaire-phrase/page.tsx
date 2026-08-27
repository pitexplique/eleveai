// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammairePhrase6e,
  slidesGrammairePhrase6e,
} from "@/lib/fiches/francais-6e-grammaire-phrase";

export const metadata: Metadata = {
  title: "La phrase et ses groupes en 6e : sujet, verbe, compléments",
  description:
    "Programme de français 6e (cycle 3) : trouver le verbe et compter les verbes conjugués, repérer le sujet même quand il est placé après le verbe, distinguer complément d'objet et complément circonstanciel, et prouver une fonction par les manipulations — déplacer, supprimer, remplacer, encadrer. Chaque geste dessiné sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammairePhraseSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheGrammairePhrase6e}
      slides={slidesGrammairePhrase6e}
    />
  );
}
