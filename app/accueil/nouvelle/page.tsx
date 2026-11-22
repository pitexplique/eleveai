// /accueil/nouvelle — MAQUETTE de l'accueil « comme un CEO » (22/11/2026). noindex.
// Le contenu vit dans ../AccueilCeo.tsx. Sur le oui de Frédéric, /accueil le monte.

import type { Metadata } from "next";
import AccueilCeo from "../AccueilCeo";

export const metadata: Metadata = {
  title: { absolute: "EleveAI — accueil (maquette)" },
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

export default function AccueilNouvellePage() {
  return <AccueilCeo />;
}
