// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComprehensionTextesCm2,
  slidesComprehensionTextesCm2,
} from "@/lib/fiches/francais-cm2-comprehension-textes";

export const metadata: Metadata = {
  title: "Comprendre un texte seul en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : comprendre seul un texte plus long — que faire quand ça bloque, et pourquoi relire lentement suffit presque toujours —, restituer l'essentiel en peu de mots, distinguer ce qui est écrit de ce qui se déduit, et reconnaitre le genre d'un texte avant de le lire. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ComprehensionTextesCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheComprehensionTextesCm2}
      slides={slidesComprehensionTextesCm2}
    />
  );
}
