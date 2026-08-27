// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAlgorithmique4e,
  slidesAlgorithmique4e,
} from "@/lib/fiches/maths-4e-algorithmique";

export const metadata: Metadata = {
  title: "Algorithmique et programmation — 4e : cours et exercices corrigés",
  description:
    "Comprendre une condition vraie ou fausse, écrire un « si … alors … sinon », manipuler une variable, traduire un objectif en condition et modifier un programme sans le casser : la fiche de cours complète en 4e, avec les propriétés dessinées en blocs, trois exemples corrigés et des exercices.",
};

export default function AlgorithmiqueQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheAlgorithmique4e}
      slides={slidesAlgorithmique4e}
    />
  );
}
