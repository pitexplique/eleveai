// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `orthographe` ne peut atteindre
// que /fiches-cours/francais/cp/orthographe.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAccordsCp, slidesAccordsCp } from "@/lib/fiches/francais-cp-accords";

export const metadata: Metadata = {
  title: "Les accords au CP (2026-2027) : masculin, féminin, singulier, pluriel",
  description:
    "Programme de français CP 2026-2027 : la chaine d'accords. Masculin et féminin (un petit garçon → une petite fille), singulier et pluriel (le chien → deux chiens), et le sujet qui entraine le verbe (le chat miaule → les chats miaulent). Le s du pluriel ne s'entend pas : c'est le petit mot devant qui prévient. Dix exercices à faire au crayon, corrigé sur page détachable.",
};

export default function OrthographeCpPage() {
  return <FicheCoursClient fiche={ficheAccordsCp} slides={slidesAccordsCp} />;
}
