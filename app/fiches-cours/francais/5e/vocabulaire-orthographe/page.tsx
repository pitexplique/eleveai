// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireOrthographe5e,
  slidesVocabulaireOrthographe5e,
} from "@/lib/fiches/francais-5e-vocabulaire-orthographe";

export const metadata: Metadata = {
  title: "Orthographe des mots en 5e (2026-2027) : lettres muettes et homophones",
  description:
    "Programme de français 5e 2026-2027 : trouver une lettre muette grâce à un mot de la même famille (tapis, tapisser), et trancher les homophones lexicaux en remplaçant le mot par sa définition — sont ou son, où ou ou, plutôt ou plus tôt, sa ou ça. Les mots démontés en wagons, les tests dessinés sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireOrthographeCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireOrthographe5e}
      slides={slidesVocabulaireOrthographe5e}
    />
  );
}
