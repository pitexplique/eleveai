// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireFormationCm2,
  slidesVocabulaireFormationCm2,
} from "@/lib/fiches/francais-cm2-vocabulaire-formation";

export const metadata: Metadata = {
  title: "La formation des mots en CM2 : préfixes, suffixes, racines (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : familles de mots, préfixes et suffixes, racines latines et grecques, mots composés et homonymes. Pourquoi c'est le sens du morceau qui compte et non sa forme — « thermite » ne contient pas thermo, « grandeur » n'est pas un mot composé. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireFormationCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireFormationCm2}
      slides={slidesVocabulaireFormationCm2}
    />
  );
}
