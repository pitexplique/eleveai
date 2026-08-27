// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAires4e, slidesAires4e } from "@/lib/fiches/maths-4e-aires";

export const metadata: Metadata = {
  title: "Les aires — 4e : cours et exercices corrigés",
  description:
    "Calculer l'aire d'un rectangle, d'un carré, d'un triangle et d'un parallélogramme, découper une figure composée, convertir les unités et ne plus confondre aire et périmètre : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function AiresQuatriemePage() {
  return <FicheCoursClient fiche={ficheAires4e} slides={slidesAires4e} />;
}
