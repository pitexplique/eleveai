// Fiche IA « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrandsModelesDeLangage,
  slidesGrandsModelesDeLangage,
} from "@/lib/fiches/ia-fondements-grands-modeles-de-langage";

export const metadata: Metadata = {
  title: "Les grands modèles de langage — cours et exercices corrigés",
  description:
    "Comment fonctionne un chatbot : prédire le mot suivant, entraînement, hallucinations. La fiche de cours IA complète (référentiel Pix, Fondements), à lire ou réviser en flashcards.",
};

export default function GrandsModelesDeLangagePage() {
  return (
    <FicheCoursClient
      fiche={ficheGrandsModelesDeLangage}
      slides={slidesGrandsModelesDeLangage}
    />
  );
}
