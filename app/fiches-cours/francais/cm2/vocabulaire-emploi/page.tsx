// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireEmploiCm2,
  slidesVocabulaireEmploiCm2,
} from "@/lib/fiches/francais-cm2-vocabulaire-emploi";

export const metadata: Metadata = {
  title: "Niveaux de langue et dictionnaire en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : les trois niveaux de langue (familier, courant, soutenu), le réemploi d'un mot dans une phrase à soi, l'orthographe des mots fréquents et l'usage du dictionnaire — ordre alphabétique, mots-repères, verbes à chercher à l'infinitif. Pourquoi un mot compris n'est pas encore un mot possédé. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireEmploiCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireEmploiCm2}
      slides={slidesVocabulaireEmploiCm2}
    />
  );
}
