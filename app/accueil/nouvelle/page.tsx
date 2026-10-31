// /accueil/nouvelle — MAQUETTE de l'accueil « suivi d'élève » AVEC les offres
// pour les familles « en préparation » (suivi famille, cours en visio). noindex.
// Le contenu vit dans ../AccueilSuivi.tsx, que /accueil monte SANS les offres
// tant que le rectorat n'a pas donné son feu vert.

import type { Metadata } from "next";
import AccueilSuivi from "../AccueilSuivi";

export const metadata: Metadata = {
  title: { absolute: "EleveAI — le suivi de chaque élève (maquette)" },
  robots: { index: false, follow: false },
};

export default function AccueilNouvellePage() {
  return <AccueilSuivi offresFamille />;
}
