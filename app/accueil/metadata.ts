// app/accueil/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";

export const metadata: Metadata = {
  title: "EleveAI — IA pédagogique encadrée (Profs · Élèves · Parents)",
  description:
    "EleveAI aide à créer des consignes IA (prompts) claires et guidées pour apprendre sans tricher : profs, élèves et parents. Atelier-IA, traces, esprit critique, collège/lycée.",
  alternates: {
    canonical: "/accueil",
  },
  openGraph: {
    title: "EleveAI — IA pédagogique encadrée",
    description:
      "Créer des consignes IA claires et guidées pour apprendre sans tricher. Pensé collège/lycée.",
    url: `${SITE_URL}/accueil`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — IA pédagogique encadrée",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EleveAI — IA pédagogique encadrée",
    description:
      "Consignes IA claires, Atelier-IA, anti-triche pédagogique. Profs, élèves, parents.",
    images: ["/preview.jpg"],
  },
};

