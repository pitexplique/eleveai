// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `langage_oral` ne peut atteindre
// que /fiches-cours/francais/cp/langage-oral.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheOralCp, slidesOralCp } from "@/lib/fiches/francais-cp-oral";

export const metadata: Metadata = {
  title: "Parler pour être compris au CP (2026-2027) : raconter, écouter, échanger",
  description:
    "Programme de français CP 2026-2027 : le langage oral. Retenir l'important d'un message, trouver le verbe d'une consigne, redire avec d'autres mots, raconter avec parce que, alors, ensuite, parler chacun son tour et adapter sa façon de dire. Celui qui t'écoute n'a pas entendu l'histoire. Dix exercices, corrigé sur page détachable.",
};

export default function LangageOralCpPage() {
  return <FicheCoursClient fiche={ficheOralCp} slides={slidesOralCp} />;
}
