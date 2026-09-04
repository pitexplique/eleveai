// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `ecriture_mots` ne peut
// atteindre que /fiches-cours/francais/cp/ecriture-mots.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheDicteeCp, slidesDicteeCp } from "@/lib/fiches/francais-cp-dictee";

export const metadata: Metadata = {
  title: "Écrire les mots qu'on entend au CP (2026-2027) : dictée, lettres muettes",
  description:
    "Programme de français CP 2026-2027 : écrire sous la dictée. Dire le mot au ralenti, écrire les sons dans l'ordre, et retrouver la lettre muette dans un mot de la même famille — « chat » cache un t, et « chaton » le réveille. Réglure Seyès, dix exercices à faire au crayon, corrigé sur page détachable.",
};

export default function EcritureMotsCpPage() {
  return <FicheCoursClient fiche={ficheDicteeCp} slides={slidesDicteeCp} />;
}
