// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH, pas un nom plus court.
// `ficheHrefPourCoach` ne fait que remplacer les underscores par des tirets :
// la notion `conscience_phonologique` ne peut atteindre que
// /fiches-cours/francais/cp/conscience-phonologique. Un dossier « phonologie »
// aurait rendu la fiche invisible depuis le coach, sans erreur nulle part.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePhonologieCp,
  slidesPhonologieCp,
} from "@/lib/fiches/francais-cp-phonologie";

export const metadata: Metadata = {
  title: "Les syllabes et les sons au CP (2026-2027) : compter, découper, rimer",
  description:
    "Programme de français CP 2026-2027 : compter les syllabes en frappant dans ses mains, découper un mot, reconnaitre une rime et situer un son au début, au milieu ou à la fin. « margouillat » a onze lettres et trois syllabes : les lettres se voient, les syllabes s'entendent. Dessins à colorier, à imprimer ou à projeter.",
};

export default function ConsciencePhonologiqueCpPage() {
  return (
    <FicheCoursClient fiche={fichePhonologieCp} slides={slidesPhonologieCp} />
  );
}
