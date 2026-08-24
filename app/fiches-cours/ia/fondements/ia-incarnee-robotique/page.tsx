// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheIaIncarneeRobotique,
  slidesIaIncarneeRobotique,
} from "@/lib/fiches/ia-fondements-ia-incarnee-robotique";

export const metadata: Metadata = {
  title: "L'IA incarnée et la robotique — cours et exercices corrigés",
  description:
    "Percevoir, décider, agir : la fiche de cours complète sur l'IA incarnée et la robotique (référentiel Pix IA, Fondements), avec exemples, pièges et exercices, à lire ou réviser en flashcards.",
};

export default function IaIncarneeRobotiquePage() {
  return (
    <FicheCoursClient
      fiche={ficheIaIncarneeRobotique}
      slides={slidesIaIncarneeRobotique}
    />
  );
}
