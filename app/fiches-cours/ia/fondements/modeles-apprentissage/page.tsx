// Fiche IA « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheModelesApprentissage,
  slidesModelesApprentissage,
} from "@/lib/fiches/ia-fondements-modeles-apprentissage";

export const metadata: Metadata = {
  title: "Les modèles d'apprentissage — fiche de cours | EleveAI",
  description:
    "Arbre de décision, régression, réseau de neurones : les familles de modèles d'IA, leurs forces, leurs limites et l'explicabilité. Fiche de cours IA (référentiel Pix, Fondements) avec exemples et exercices corrigés.",
};

export default function ModelesApprentissagePage() {
  return (
    <FicheCoursClient
      fiche={ficheModelesApprentissage}
      slides={slidesModelesApprentissage}
    />
  );
}
