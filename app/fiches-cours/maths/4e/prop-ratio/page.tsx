// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
// ⭐ 02/10/2026 : née de la coupe de « Ratios et pourcentages » en deux
// notions (`prop_ratio` + `prop_pourcentages`).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheRatio4e, slidesRatio4e } from "@/lib/fiches/maths-4e-ratio";

export const metadata: Metadata = {
  title: "Ratios en 4e : simplifier, a/2 = b/3, partager selon un ratio – fiche de cours",
  description:
    "Fiche de cours de 4e sur les ratios : des parts égales, simplifier un ratio, l'égalité de quotients du programme, le ratio à trois termes et le partage d'une quantité, avec des dessins, des exemples corrigés et des exercices.",
};

export default function RatioQuatriemePage() {
  return <FicheCoursClient fiche={ficheRatio4e} slides={slidesRatio4e} />;
}
