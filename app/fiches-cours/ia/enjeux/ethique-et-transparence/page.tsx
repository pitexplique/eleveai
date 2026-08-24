// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEthiqueEtTransparence,
  slidesEthiqueEtTransparence,
} from "@/lib/fiches/ia-enjeux-ethique-et-transparence";

export const metadata: Metadata = {
  title: "Éthique et transparence de l'IA — cours et exercices corrigés",
  description:
    "Transparence, explicabilité, non-discrimination, responsabilité, RGPD et IA Act : la fiche de cours complète sur l'éthique de l'IA, avec exemples corrigés et exercices (référentiel Pix, domaine Enjeux).",
};

export default function EthiqueEtTransparencePage() {
  return (
    <FicheCoursClient
      fiche={ficheEthiqueEtTransparence}
      slides={slidesEthiqueEtTransparence}
    />
  );
}
