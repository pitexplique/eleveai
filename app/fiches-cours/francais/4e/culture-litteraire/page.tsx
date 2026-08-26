// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureLitteraire4e,
  slidesCultureLitteraire4e,
} from "@/lib/fiches/francais-4e-culture-litteraire";

export const metadata: Metadata = {
  title: "Situer une œuvre en 4e (2026-2027) : genres, contexte, carnet de lecture",
  description:
    "Programme de français 4e 2026-2027 : reconnaitre un genre littéraire à la disposition du texte sur la page, situer une œuvre en raisonnant sur un détail matériel plutôt qu'en récitant une date, mettre deux œuvres en réseau en nommant le lien — reprise, opposition, même motif —, et garder une trace de lecture qui se relira encore dans six mois. Chaque genre dessiné par sa silhouette, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureLitteraireQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCultureLitteraire4e}
      slides={slidesCultureLitteraire4e}
    />
  );
}
