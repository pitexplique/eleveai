// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireRelations6e,
  slidesVocabulaireRelations6e,
} from "@/lib/fiches/francais-6e-vocabulaire-relations";

export const metadata: Metadata = {
  title: "Synonymes, mots dérivés et composés en 6e : comment un mot est fait",
  description:
    "Programme de français 6e (cycle 3) : donner un synonyme ou un antonyme de la même classe grammaticale, distinguer un mot simple, un mot dérivé et un mot composé, décomposer un mot en préfixe, radical et suffixe, et reconnaitre une racine grecque ou latine. La classe du mot lue dans la bande grise, les mots démontés en wagons, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireRelationsSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireRelations6e}
      slides={slidesVocabulaireRelations6e}
    />
  );
}
