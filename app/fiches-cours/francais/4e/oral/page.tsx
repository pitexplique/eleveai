// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheOral4e, slidesOral4e } from "@/lib/fiches/francais-4e-oral";

export const metadata: Metadata = {
  title: "L'oral en 4e (2026-2027) : écouter, exposer, argumenter, jouer un texte",
  description:
    "Programme de français 4e 2026-2027 : écouter en rangeant ce qu'on entend — thèse, argument, exemple, objection, transition —, enchainer les gestes d'un exposé clair, distinguer un vrai argument des quatre choses qui lui ressemblent — affirmation nue, appel à l'autorité, attaque personnelle, appel au nombre —, employer la concession, et jouer un texte en suivant les indications qu'il porte. Chaque prise de parole démontée, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralQuatriemePage() {
  return <FicheCoursClient fiche={ficheOral4e} slides={slidesOral4e} />;
}
