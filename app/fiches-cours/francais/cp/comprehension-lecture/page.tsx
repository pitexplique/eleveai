// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `comprehension_lecture` ne peut
// atteindre que /fiches-cours/francais/cp/comprehension-lecture.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComprehensionCp,
  slidesComprehensionCp,
} from "@/lib/fiches/francais-cp-comprehension";

export const metadata: Metadata = {
  title: "Comprendre ce qu'on lit au CP (2026-2027) : anaphore et inférence",
  description:
    "Programme de français CP 2026-2027 : comprendre un texte. Trouver les personnages et le lieu, suivre la chaine des noms (un margouillat → le petit lézard → il), deviner ce qui n'est pas écrit et le justifier par un retour au texte. On a le droit de deviner, à condition de montrer où c'est écrit. Texte court et dix exercices, corrigé sur page détachable.",
};

export default function ComprehensionLectureCpPage() {
  return (
    <FicheCoursClient
      fiche={ficheComprehensionCp}
      slides={slidesComprehensionCp}
    />
  );
}
