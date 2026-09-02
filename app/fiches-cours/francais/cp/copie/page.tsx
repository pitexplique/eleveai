// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheCopieCp, slidesCopieCp } from "@/lib/fiches/francais-cp-copie";

export const metadata: Metadata = {
  title: "Copier sans se tromper au CP (2026-2027) : le sens du tracé",
  description:
    "Programme de français CP 2026-2027 : copier une lettre dans le bon sens du tracé, respecter la hauteur des lettres, copier un mot puis une phrase avec sa majuscule et son point, copier par groupes de mots plutôt que lettre à lettre, et se relire du doigt. Des lignes d'écriture à repasser, à lire, à imprimer ou à projeter en classe.",
};

export default function CopieCpPage() {
  return <FicheCoursClient fiche={ficheCopieCp} slides={slidesCopieCp} />;
}
