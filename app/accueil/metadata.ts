// app/accueil/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";

export const metadata: Metadata = {
  title:
    "EleveAI — Mathématiques, automatismes et raisonnement scientifique",

  description:
    "EleveAI aide les élèves à progresser en mathématiques grâce à des entraînements courts, du calcul rapide, des parcours guidés et des explications étape par étape. Une approche pédagogique centrée sur les automatismes, le raisonnement et la confiance.",

  alternates: {
    canonical: `${SITE_URL}/accueil`,
  },

  openGraph: {
    title:
      "EleveAI — Apprendre, raisonner, progresser en mathématiques",

    description:
      "Calcul rapide, parcours guidés, leçon du jour et entraînement progressif : EleveAI aide les élèves à consolider leurs bases et développer leur raisonnement scientifique.",

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
      "EleveAI — Mathématiques, automatismes et progression",

    description:
      "Une plateforme pédagogique pour aider les élèves à progresser grâce au calcul rapide, aux parcours guidés et au raisonnement étape par étape.",

    images: ["/preview.jpg"],
  },

  keywords: [
    "mathématiques",
    "calcul rapide",
    "automatismes",
    "raisonnement scientifique",
    "brevet 2026",
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


