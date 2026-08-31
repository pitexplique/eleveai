// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireSensCm1,
  slidesVocabulaireSensCm1,
} from "@/lib/fiches/francais-cm1-vocabulaire-sens";

export const metadata: Metadata = {
  title: "Comprendre un mot inconnu en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : comprendre un mot inconnu grâce au contexte, deviner un mot en regardant comment il est fabriqué, distinguer les sens d'un mot polysémique. Pourquoi il n'y a presque rien à deviner — l'explication est déjà écrite dans la phrase, souvent juste après une virgule. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireSensCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireSensCm1}
      slides={slidesVocabulaireSensCm1}
    />
  );
}
