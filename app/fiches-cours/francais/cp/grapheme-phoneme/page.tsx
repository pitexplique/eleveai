// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `grapheme_phoneme` ne peut
// atteindre que /fiches-cours/francais/cp/grapheme-phoneme.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGraphemesCp,
  slidesGraphemesCp,
} from "@/lib/fiches/francais-cp-graphemes";

export const metadata: Metadata = {
  title: "Des lettres aux sons au CP (2026-2027) : voyelles, b/d, ou ch on oi",
  description:
    "Programme de français CP 2026-2027 : les correspondances entre lettres et sons. Un même son s'écrit de plusieurs façons (o, au, eau), une même lettre se lit de plusieurs façons (le c de cari et celui de cerise). Le b et le d, les deux jumeaux qui se retournent, se séparent en les traçant. Réglure Seyès, dessins à colorier, à imprimer ou à projeter.",
};

export default function GraphemePhonemeCpPage() {
  return (
    <FicheCoursClient fiche={ficheGraphemesCp} slides={slidesGraphemesCp} />
  );
}
