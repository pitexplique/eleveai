// Fiche IA « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheApprentissageAutomatique,
  slidesApprentissageAutomatique,
} from "@/lib/fiches/ia-fondements-apprentissage-automatique";

export const metadata: Metadata = {
  title: "L'apprentissage automatique — fiche de cours",
  description:
    "Comment une IA apprend à partir de données : supervisé, non supervisé, renforcement. Définition, exemples corrigés et exercices — fiche de cours IA (référentiel Pix, Fondements), à lire ou réviser en flashcards.",
};

export default function ApprentissageAutomatiquePage() {
  return (
    <FicheCoursClient
      fiche={ficheApprentissageAutomatique}
      slides={slidesApprentissageAutomatique}
    />
  );
}
