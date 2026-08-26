// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOperationsRelatifs4e,
  slidesOperationsRelatifs4e,
} from "@/lib/fiches/maths-4e-operations-relatifs";

export const metadata: Metadata = {
  title: "Opérations sur les nombres relatifs — 4e : cours et exercices corrigés",
  description:
    "Additionner, soustraire, multiplier et diviser des nombres relatifs : la règle des signes, « soustraire c'est ajouter l'opposé », les priorités de calcul et les problèmes de température. La fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function OperationsRelatifsQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheOperationsRelatifs4e}
      slides={slidesOperationsRelatifs4e}
    />
  );
}
