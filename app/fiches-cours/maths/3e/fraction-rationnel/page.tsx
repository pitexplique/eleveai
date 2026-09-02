// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheNombresRationnels3e, slidesNombresRationnels3e } from "@/lib/fiches/maths-3e-nombres-rationnels";

export const metadata: Metadata = {
  title: "Les nombres rationnels — 3e : cours et exercices corrigés",
  description:
    "Reconnaître un nombre rationnel, passer d'une écriture fractionnaire à une écriture décimale, comparer deux fractions — y compris négatives —, additionner et multiplier, trouver la forme irréductible et comprendre pourquoi il existe toujours un rationnel entre deux autres : la fiche de cours complète en 3e, avec sept propriétés dessinées, quatre exemples corrigés, les sept erreurs classiques et dix exercices.",
};

export default function NombresRationnelsTroisiemePage() {
  return <FicheCoursClient fiche={ficheNombresRationnels3e} slides={slidesNombresRationnels3e} />;
}
