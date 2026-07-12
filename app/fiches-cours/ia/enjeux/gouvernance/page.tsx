// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGouvernance,
  slidesGouvernance,
} from "@/lib/fiches/ia-enjeux-gouvernance";

export const metadata: Metadata = {
  title: "La gouvernance de l'IA — fiche de cours | EleveAI",
  description:
    "Qui régule l'IA ? L'IA Act européen, la souveraineté numérique, les valeurs encodées : la fiche de cours complète avec exemples corrigés et exercices (référentiel Pix, domaine Enjeux).",
};

export default function GouvernancePage() {
  return <FicheCoursClient fiche={ficheGouvernance} slides={slidesGouvernance} />;
}
