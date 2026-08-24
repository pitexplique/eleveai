import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePhrase5e,
  slidesPhrase5e,
} from "@/lib/fiches/francais-5e-grammaire-phrase";

// ⭐ L'ANNÉE SCOLAIRE EST DANS LE TITRE (24/08/2026). La 5e est la SEULE classe
// déjà passée au programme du 5 mars 2026 : « français 5e 2026-2027 » est la
// requête réellement tapée à la rentrée, et les sites qui nous devancent
// l'écrivent. Elle est aussi dans le H1 et, par ricochet, dans tous les H2 de la
// page — le `titre` de la fiche les alimente tous.
export const metadata: Metadata = {
  title: "La phrase en 5e (2026-2027) : types, formes et ponctuation",
  description:
    "Programme de français 5e 2026-2027 : les trois types de phrases, les formes négative et exclamative, la phrase simple, complexe et non verbale, le rôle de chaque signe de ponctuation, la juxtaposition et la coordination. Chaque règle dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammairePhrase5ePage() {
  return <FicheCoursClient fiche={fichePhrase5e} slides={slidesPhrase5e} />;
}
