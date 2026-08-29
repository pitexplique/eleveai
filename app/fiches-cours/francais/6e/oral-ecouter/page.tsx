// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralEcouter6e,
  slidesOralEcouter6e,
} from "@/lib/fiches/francais-6e-oral-ecouter";

export const metadata: Metadata = {
  title: "Écouter pour comprendre en 6e (2026-2027)",
  description:
    "Programme de français 6e 2026-2027 : l'écoute active orientée par un but — savoir ce qu'on cherche change ce qu'on entend —, reformuler avec ses propres mots pour prouver qu'on a compris, reconnaitre le genre d'un discours à ce à quoi il sert, exprimer son ressenti, et noter des mots clés quand on n'entend qu'une seule fois. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralEcouterSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheOralEcouter6e}
      slides={slidesOralEcouter6e}
    />
  );
}
