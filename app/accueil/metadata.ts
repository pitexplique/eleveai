// app/accueil/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";

export const metadata: Metadata = {
  title: "EleveAI • Valeria — IA encadrée (Éducation & Entreprise)",

  description:
    "EleveAI génère des ressources pédagogiques robustes. Valeria (score /20) clarifie et optimise vos prompts avec des critères mesurables : éducation, formation, entreprise (procédures, qualité, checklists).",

  alternates: {
    canonical: `${SITE_URL}/accueil`,
  },

  openGraph: {
    title: "EleveAI • Valeria — IA encadrée (Éducation & Entreprise)",
    description:
      "Clarifier → mesurer → améliorer. Valeria (score /20) renforce la robustesse des prompts. EleveAI génère des ressources pour l’école. Valeria Consulting accompagne aussi les entreprises (formation, procédures, qualité).",
    url: `${SITE_URL}/accueil`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg", // garde ton image ou remplace par /preview-valeria.jpg
        width: 1200,
        height: 630,
        alt: "EleveAI • Valeria — IA encadrée pour l’éducation et l’entreprise",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI • Valeria — IA encadrée (Éducation & Entreprise)",
    description:
      "Valeria (score /20) clarifie et sécurise vos prompts. EleveAI génère des ressources pédagogiques. Entreprises : formation, procédures, qualité (critères mesurables).",
    images: ["/preview.jpg"],
  },
};


