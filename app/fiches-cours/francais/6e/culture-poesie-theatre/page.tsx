// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCulturePoesieTheatre6e,
  slidesCulturePoesieTheatre6e,
} from "@/lib/fiches/francais-6e-culture-poesie-theatre";

export const metadata: Metadata = {
  title: "Poésie et théâtre en 6e (2026-2027) : vers, rimes, didascalies",
  description:
    "Programme de français 6e 2026-2027 : reconnaitre un poème à sa forme — vers, strophes, blancs —, comprendre la rime comme un son et non une orthographe, lire une image poétique, et distinguer réplique, didascalie et aparté au théâtre. Pourquoi le public rit d'une ruse : il en sait plus que le personnage trompé. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CulturePoesieTheatreSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCulturePoesieTheatre6e}
      slides={slidesCulturePoesieTheatre6e}
    />
  );
}
