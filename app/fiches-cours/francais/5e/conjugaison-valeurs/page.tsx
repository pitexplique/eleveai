// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonValeurs5e,
  slidesConjugaisonValeurs5e,
} from "@/lib/fiches/francais-5e-conjugaison-valeurs";

export const metadata: Metadata = {
  title: "La valeur des temps et des modes en 5e (2026-2027) : imparfait ou passé simple",
  description:
    "Programme de français 5e 2026-2027 : savoir ce que fait chaque temps du récit — l'imparfait installe le décor, le passé simple fait avancer, le temps composé dit ce qui était déjà accompli —, distinguer l'indicatif de l'impératif, et choisir le mode que l'intention appelle : conditionnel, subjonctif, infinitif. Le partage des rôles dessiné sur une seule phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ConjugaisonValeursCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonValeurs5e}
      slides={slidesConjugaisonValeurs5e}
    />
  );
}
