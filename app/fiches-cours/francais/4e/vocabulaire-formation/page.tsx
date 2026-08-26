// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireFormation4e,
  slidesVocabulaireFormation4e,
} from "@/lib/fiches/francais-4e-vocabulaire-formation";

export const metadata: Metadata = {
  title: "La formation des mots en 4e (2026-2027) : préfixe, radical, suffixe, racines",
  description:
    "Programme de français 4e 2026-2027 : démonter un mot en préfixe, radical et suffixe, voir le changement de classe qu'opère la dérivation, reconnaitre les racines latines et grecques pour deviner un mot savant, comprendre comment la construction d'un verbe change son sens, réemployer un lexique précis et écrire avec justesse en passant par la famille du mot. Chaque mot démonté en wagons, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireFormationQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireFormation4e}
      slides={slidesVocabulaireFormation4e}
    />
  );
}
