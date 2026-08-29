// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheEchelles4e, slidesEchelles4e } from "@/lib/fiches/maths-4e-echelles";

export const metadata: Metadata = {
  title: "Agrandissement, réduction et échelles — 4e : cours et exercices corrigés",
  description:
    "Lire une échelle, passer du plan à la réalité et de la réalité au plan, utiliser un rapport d'agrandissement, et surtout comprendre pourquoi les aires sont multipliées par k² et les volumes par k³ : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et huit exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function EchellesQuatriemePage() {
  return <FicheCoursClient fiche={ficheEchelles4e} slides={slidesEchelles4e} />;
}
