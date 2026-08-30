// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralEcouterCm2,
  slidesOralEcouterCm2,
} from "@/lib/fiches/francais-cm2-oral-ecouter";

export const metadata: Metadata = {
  title: "Écouter pour comprendre en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : écouter pour retenir l'idée principale ET des détails, puis reformuler et synthétiser. Pourquoi ce ne sont pas deux façons de dire la même chose — reformuler prouve qu'on a compris, synthétiser prouve qu'on a trié — et pourquoi faire court par oubli n'est pas une synthèse. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralEcouterCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheOralEcouterCm2}
      slides={slidesOralEcouterCm2}
    />
  );
}
