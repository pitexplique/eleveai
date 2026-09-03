// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `lecture_syllabique` ne peut
// atteindre que /fiches-cours/francais/cp/lecture-syllabique.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureSyllabiqueCp,
  slidesLectureSyllabiqueCp,
} from "@/lib/fiches/francais-cp-lecture-syllabique";

export const metadata: Metadata = {
  title: "Lire en assemblant les syllabes au CP (2026-2027) : déchiffrer",
  description:
    "Programme de français CP 2026-2027 : faire glisser les sons l'un sur l'autre (b + a = ba), coller les morceaux (cha + peau = chapeau), reconnaitre les mots outils et lire une phrase mot par mot. Le piège du déchiffrage : deviner sur la première syllabe. « cha… », c'est chat ou chapeau ? Dix exercices à faire au crayon, corrigé sur page détachable.",
};

export default function LectureSyllabiqueCpPage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureSyllabiqueCp}
      slides={slidesLectureSyllabiqueCp}
    />
  );
}
