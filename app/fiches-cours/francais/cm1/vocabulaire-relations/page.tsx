// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireRelationsCm1,
  slidesVocabulaireRelationsCm1,
} from "@/lib/fiches/francais-cm1-vocabulaire-relations";

export const metadata: Metadata = {
  title: "Familles de mots et contraires en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : identifier racine, familles de mots et dérivation, utiliser synonymes et antonymes. Pourquoi deux mots qui commencent pareil ne sont pas forcément de la même famille, pourquoi le contraire de content n'est ni joyeux ni ravi, et à quel moment tout cela sert vraiment — quand on se relit. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireRelationsCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireRelationsCm1}
      slides={slidesVocabulaireRelationsCm1}
    />
  );
}
