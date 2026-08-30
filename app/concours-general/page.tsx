// app/concours-general/page.tsx
//
// ⚠️ LES MÉTADONNÉES SONT ICI, PAS DANS LE CLIENT (29/08/2026). Cette page est
// un composant serveur qui n'enveloppe qu'un client : elle PEUT donc exporter
// ses métadonnées, et n'en avait aucune. Elle servait le titre et la
// description de l'accueil, sans canonique — un doublon déclaré au sitemap.

import type { Metadata } from "next";
import ConcoursGeneralClient from "./ConcoursGeneralClient";

const TITRE = "Préparer le Concours général des collèges";
const DESCRIPTION =
  "Des maths pas comme les autres : des problèmes d'ingéniosité pour préparer le Concours général des collèges, corrigés et expliqués. Gratuit.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/concours-general" },
  openGraph: {
    title: TITRE,
    description: DESCRIPTION,
    url: "/concours-general",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function ConcoursGeneralPage() {
  return <ConcoursGeneralClient />;
}