// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireFormation5e,
  slidesVocabulaireFormation5e,
} from "@/lib/fiches/francais-5e-vocabulaire-formation";

export const metadata: Metadata = {
  title: "La formation des mots en 5e (2026-2027) : radical, suffixe, racines grecques",
  description:
    "Programme de français 5e 2026-2027 : fabriquer le mot qu'une définition demande, comprendre que le suffixe donne au mot son métier, et reconnaitre les éléments latins et grecs qui rendent lisibles des centaines de mots savants. Les mots démontés en wagons, les familles dessinées, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireFormationCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireFormation5e}
      slides={slidesVocabulaireFormation5e}
    />
  );
}
