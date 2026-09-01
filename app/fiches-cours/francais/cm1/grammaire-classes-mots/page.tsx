// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireClassesMotsCm1,
  slidesGrammaireClassesMotsCm1,
} from "@/lib/fiches/francais-cm1-grammaire-classes-mots";

export const metadata: Metadata = {
  title: "Les petits mots et leur nature en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : identifier déterminants, conjonctions de coordination et adverbes, distinguer les pronoms personnels sujets et compléments, se familiariser avec la nature et la fonction. Un seul geste pour les reconnaitre — mettre la phrase au pluriel et regarder qui a bougé. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireClassesMotsCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammaireClassesMotsCm1}
      slides={slidesGrammaireClassesMotsCm1}
    />
  );
}
