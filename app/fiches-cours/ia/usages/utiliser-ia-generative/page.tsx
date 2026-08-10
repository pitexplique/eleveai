// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheUtiliserIaGenerative,
  slidesUtiliserIaGenerative,
} from "@/lib/fiches/ia-usages-utiliser-ia-generative";

export const metadata: Metadata = {
  title: "Utiliser l'IA générative — fiche de cours",
  description:
    "Écrire un bon prompt (contexte, tâche, contraintes, format), itérer, vérifier les réponses et rester responsable : la fiche de cours complète pour utiliser une IA générative, avec exemples corrigés et exercices (référentiel Pix, domaine Usages).",
};

export default function UtiliserIaGenerativePage() {
  return (
    <FicheCoursClient
      fiche={ficheUtiliserIaGenerative}
      slides={slidesUtiliserIaGenerative}
    />
  );
}
