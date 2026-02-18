// app/valeria-consulting/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";

export const metadata: Metadata = {
  title: "Valeria Consulting — Consultant IA & optimisation mesurable | La Réunion",

  description:
    "Valeria Consulting accompagne les établissements et entreprises à La Réunion dans l’intégration structurée de l’IA : objectifs mesurables, prompts robustes, formation, qualité.",

  alternates: {
    canonical: `${SITE_URL}/valeria-consulting`,
  },

  openGraph: {
    title: "Valeria Consulting — Consultant IA",
    description:
      "Optimisation mesurable des pratiques pédagogiques et professionnelles par itération contrôlée.",
    url: `${SITE_URL}/valeria-consulting`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Valeria Consulting — Consultant IA à La Réunion",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Valeria Consulting — Consultant IA",
    description:
      "Intégration IA structurée pour établissements et entreprises.",
    images: ["/preview.jpg"],
  },
};
