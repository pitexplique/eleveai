// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `orthographe_lexicale` ne peut
// atteindre que /fiches-cours/francais/cp/orthographe-lexicale.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOrthographeLexicaleCp,
  slidesOrthographeLexicaleCp,
} from "@/lib/fiches/francais-cp-orthographe-lexicale";

export const metadata: Metadata = {
  title: "Orthographe au CP (2026-2027) : s ou ss, c et g, n devient m, accents",
  description:
    "Programme de français CP 2026-2027 : mémoriser l'orthographe lexicale. Un s entre deux voyelles chante z (poison), deux s sifflent (poisson) ; le c et le g changent de son devant e et i ; devant m, b et p le n devient m. Nommer les trois accents. Dix exercices à faire au crayon, corrigé sur page détachable.",
};

export default function OrthographeLexicaleCpPage() {
  return (
    <FicheCoursClient
      fiche={ficheOrthographeLexicaleCp}
      slides={slidesOrthographeLexicaleCp}
    />
  );
}
