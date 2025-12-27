// app/manifeste/metadata.ts (optionnel) -> NON, plus simple: directement dans app/manifeste/page.tsx via export
// ✅ Next.js App Router : mets ça en haut de app/manifeste/page.tsx (au-dessus du composant)

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifeste EleveAI — Une IA pour apprendre, pas pour tricher",
  description:
    "Le manifeste EleveAI : une IA utile et rassurante, pensée pour faire apprendre (questions, essais, correction), sans encourager la triche. Cadre clair pour élèves, professeurs et parents.",
  alternates: {
    canonical: "https://eleveai.fr/manifeste",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "article",
    url: "https://eleveai.fr/manifeste",
    title: "Manifeste EleveAI — Une IA pour apprendre, pas pour tricher",
    description:
      "Une IA éducative : guider, faire essayer, corriger et expliquer. Pas produire du devoir prêt à rendre.",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifeste EleveAI — Une IA pour apprendre, pas pour tricher",
    description:
      "EleveAI : une IA qui fait apprendre (questions → essais → correction), dans un cadre anti-triche.",
  },
};
