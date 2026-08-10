// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEvaluerLInformation,
  slidesEvaluerLInformation,
} from "@/lib/fiches/ia-usages-evaluer-l-information";

export const metadata: Metadata = {
  title: "Évaluer l'information à l'ère de l'IA — fiche de cours",
  description:
    "Hypertrucages (deepfakes), bots, vérification des sources : la fiche de cours complète pour apprendre à évaluer l'information à l'ère de l'IA, avec réflexes, exemples corrigés et exercices (référentiel Pix, domaine Usages).",
};

export default function EvaluerLInformationPage() {
  return (
    <FicheCoursClient
      fiche={ficheEvaluerLInformation}
      slides={slidesEvaluerLInformation}
    />
  );
}
