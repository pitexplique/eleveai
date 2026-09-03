// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonCp,
  slidesConjugaisonCp,
} from "@/lib/fiches/francais-cp-conjugaison";

export const metadata: Metadata = {
  title: "Être et avoir au présent au CP (2026-2027) : je suis, j'ai",
  description:
    "Programme de français CP 2026-2027 : conjuguer être et avoir au présent, repérer les terminaisons fréquentes (nous -ons, vous -ez, ils -ent), et comprendre que la marque du pluriel ne s'entend pas. « Il chante » et « ils chantent » se disent pareil : seul l'œil voit. Dessins à colorier, à imprimer ou à projeter.",
};

export default function ConjugaisonCpPage() {
  return (
    <FicheCoursClient fiche={ficheConjugaisonCp} slides={slidesConjugaisonCp} />
  );
}
