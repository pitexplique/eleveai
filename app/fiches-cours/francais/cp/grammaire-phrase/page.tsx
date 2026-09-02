// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { fichePhraseCp, slidesPhraseCp } from "@/lib/fiches/francais-cp-grammaire-phrase";

export const metadata: Metadata = {
  title: "La phrase au CP (2026-2027) : la majuscule et le point",
  description:
    "Programme de français CP 2026-2027 : reconnaitre une phrase, la majuscule au début et le point à la fin, le point d'exclamation et le point d'interrogation, et remettre les mots d'une phrase dans l'ordre. Des dessins à colorier, à lire, à imprimer ou à projeter en classe.",
};

export default function PhraseCpPage() {
  return <FicheCoursClient fiche={fichePhraseCp} slides={slidesPhraseCp} />;
}
