// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureQuestionnements4e,
  slidesCultureQuestionnements4e,
} from "@/lib/fiches/francais-4e-culture-questionnements";

export const metadata: Metadata = {
  title: "Les questionnements de 4e (2026-2027) : dire l'amour, individu et société",
  description:
    "Programme de français 4e 2026-2027 : les quatre entrées littéraires de l'année et la complémentaire — Dire l'amour, Individu et société : confrontations de valeurs ?, La fiction pour interroger le réel, Informer, s'informer, déformer ?, et La ville, lieu de tous les possibles ? Chaque entrée expliquée comme une tension entre deux forces, et non comme un thème, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureQuestionnementsQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCultureQuestionnements4e}
      slides={slidesCultureQuestionnements4e}
    />
  );
}
