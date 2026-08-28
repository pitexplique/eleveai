// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureConnaissances5e,
  slidesCultureConnaissances5e,
} from "@/lib/fiches/francais-5e-culture-connaissances";

export const metadata: Metadata = {
  title: "Connaissances littéraires en 5e (2026-2027) : genres et époques",
  description:
    "Programme de français 5e 2026-2027 : reconnaitre un genre dès son ouverture, situer une œuvre parmi quatre périodes (Moyen Âge, Renaissance, XVIIe, XIXe), savoir ce qu'il faut connaitre pour comprendre une scène — et quand il n'y a rien à savoir —, rapprocher deux textes par le personnage, l'épreuve, le lieu ou la leçon, et tenir un carnet de lecture qui se relit. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureConnaissancesCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCultureConnaissances5e}
      slides={slidesCultureConnaissances5e}
    />
  );
}
