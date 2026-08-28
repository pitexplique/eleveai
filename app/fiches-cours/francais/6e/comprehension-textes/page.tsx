// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComprehensionTextes6e,
  slidesComprehensionTextes6e,
} from "@/lib/fiches/francais-6e-comprehension-textes";

export const metadata: Metadata = {
  title: "Comprendre un texte en 6e (2026-2027) : l'implicite",
  description:
    "Programme de français 6e 2026-2027 : dégager le sens global d'un texte, rattacher un texte à son genre, comprendre l'implicite et faire une inférence, et justifier son interprétation en citant le passage. Les trois endroits où chercher une réponse — écrite, déduite, ou inventée —, et pourquoi une réponse peut être vraie dans la vie et fausse dans le texte. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ComprehensionTextesSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheComprehensionTextes6e}
      slides={slidesComprehensionTextes6e}
    />
  );
}
