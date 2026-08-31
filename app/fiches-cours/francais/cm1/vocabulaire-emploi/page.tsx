// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireEmploiCm1,
  slidesVocabulaireEmploiCm1,
} from "@/lib/fiches/francais-cm1-vocabulaire-emploi";

export const metadata: Metadata = {
  title: "La lettre qu'on n'entend pas en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : trouver la lettre muette grâce à un mot de la même famille, mémoriser l'orthographe des mots étudiés, réemployer le vocabulaire dans une phrase. Comment faire parler un mot — grand donne grande, chant donne chanter — et quels mots ne se laissent pas faire. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireEmploiCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireEmploiCm1}
      slides={slidesVocabulaireEmploiCm1}
    />
  );
}
