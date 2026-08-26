// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireJouer5e,
  slidesVocabulaireJouer5e,
} from "@/lib/fiches/francais-5e-vocabulaire-jouer";

export const metadata: Metadata = {
  title: "Sens propre et sens figuré en 5e (2026-2027) : jouer avec les mots",
  description:
    "Programme de français 5e 2026-2027 : distinguer le sens propre du sens figuré avec le test de la photographie, choisir le sens qui va avec la phrase, et comprendre les quatre portes par lesquelles un mot neuf entre dans la langue — fabriqué, sens neuf, emprunté, sigle. Chaque mécanisme dessiné avec son propre schéma, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireJouerCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireJouer5e}
      slides={slidesVocabulaireJouer5e}
    />
  );
}
