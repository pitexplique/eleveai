// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureReperes6e,
  slidesCultureReperes6e,
} from "@/lib/fiches/francais-6e-culture-reperes";

export const metadata: Metadata = {
  title: "Narrateur, genres et carnet de lecture en 6e (2026-2027)",
  description:
    "Programme de français 6e 2026-2027 : les mots pour parler d'un livre — le narrateur, le héros, l'adversaire, le cadre —, pourquoi l'auteur n'est pas le narrateur, reconnaitre un genre à une marque (vers, répliques, passé simple, morale), situer une œuvre, mettre deux œuvres en réseau, et tenir un carnet de lecture qui garde un avis et le passage qui le justifie. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureReperesSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCultureReperes6e}
      slides={slidesCultureReperes6e}
    />
  );
}
