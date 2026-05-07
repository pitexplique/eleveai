// app/accueil/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";

export const metadata: Metadata = {
  title:
    "EleveAI — Mathématiques, automatismes et raisonnement",

  description:
    "EleveAI aide les élèves à progresser en mathématiques grâce au calcul rapide, aux parcours guidés, à la leçon du jour et à des entraînements réguliers centrés sur les automatismes et le raisonnement scientifique.",

  alternates: {
    canonical: `${SITE_URL}/accueil`,
  },

  openGraph: {
    title:
      "EleveAI — Apprendre, raisonner et progresser en mathématiques",

    description:
      "Calcul rapide, leçon du jour, défis et parcours guidés : EleveAI aide les élèves à développer leurs automatismes et leur raisonnement scientifique.",

    url: `${SITE_URL}/accueil`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",

    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — plateforme pédagogique de mathématiques",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "EleveAI — Mathématiques, raisonnement et progression",

    description:
      "Une plateforme pédagogique pour progresser en maths grâce au calcul rapide, aux défis et aux parcours guidés.",

    images: ["/preview.jpg"],
  },

  keywords: [
    "mathématiques",
    "calcul rapide",
    "automatismes",
    "raisonnement scientifique",
    "défis mathématiques",
    "révision maths",
    "collège",
    "6e",
    "5e",
    "4e",
    "3e",
    "entraînement mathématiques",
    "parcours pédagogique",
    "EleveAI",
    "La Réunion",
  ],
};