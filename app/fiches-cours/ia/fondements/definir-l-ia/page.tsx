// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDefinirLIa,
  slidesDefinirLIa,
} from "@/lib/fiches/ia-fondements-definir-l-ia";

export const metadata: Metadata = {
  title: "Définir l'IA — fiche de cours | EleveAI",
  description:
    "Définition, deux grandes approches, exemples corrigés et exercices : la fiche de cours complète pour comprendre ce qu'est l'intelligence artificielle (référentiel Pix, domaine Fondements).",
};

export default function DefinirLIaPage() {
  return <FicheCoursClient fiche={ficheDefinirLIa} slides={slidesDefinirLIa} />;
}
