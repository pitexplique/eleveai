// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAlgorithmesDeRecommandation,
  slidesAlgorithmesDeRecommandation,
} from "@/lib/fiches/ia-fondements-algorithmes-de-recommandation";

export const metadata: Metadata = {
  title: "Les algorithmes de recommandation — fiche de cours | EleveAI",
  description:
    "Comment YouTube, TikTok ou Netflix te recommandent des contenus, la bulle de filtre et comment reprendre la main : fiche de cours IA (référentiel Pix, Fondements) avec exemples et exercices.",
};

export default function AlgorithmesDeRecommandationPage() {
  return (
    <FicheCoursClient
      fiche={ficheAlgorithmesDeRecommandation}
      slides={slidesAlgorithmesDeRecommandation}
    />
  );
}
