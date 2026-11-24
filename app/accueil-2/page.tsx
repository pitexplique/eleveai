// /accueil-2 — l'accueil en nuage (24/11/2026), le même que /accueil depuis la bascule. noindex.
// Le contenu vit dans ../accueil/AccueilNuage.tsx.

import type { Metadata } from "next";
import AccueilNuage from "../accueil/AccueilNuage";

export const metadata: Metadata = {
  title: { absolute: "EleveAI — accueil en nuage (maquette)" },
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

export default function Accueil2Page() {
  return <AccueilNuage />;
}
