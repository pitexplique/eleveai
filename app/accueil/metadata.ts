// app/accueil/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";

export const metadata: Metadata = {
  title:
    "EleveAI — Coach Maths IA, calcul rapide et parcours de progression",

  description:
    "EleveAI aide les collégiens à progresser en mathématiques avec le Coach Maths IA, le calcul rapide, les parcours guidés, les défis et la leçon du jour.",

  alternates: {
    canonical: `${SITE_URL}/accueil`,
  },

  openGraph: {
    title:
      "EleveAI — Apprendre les maths autrement",

    description:
      "Calcul rapide, Coach Maths IA, parcours guidés et leçon du jour : une plateforme conçue pour développer les automatismes, la compréhension et la progression des élèves.",

    url: `${SITE_URL}/accueil`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",

    images: [
      {
        url: "/images/accueil-eleveai-reunion.png",
        width: 1200,
        height: 630,
        alt: "EleveAI — plateforme pédagogique de mathématiques",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "EleveAI — Coach Maths IA et calcul rapide",

    description:
      "Une plateforme pédagogique moderne pour progresser en mathématiques grâce aux automatismes, aux défis et aux parcours personnalisés.",

    images: ["/images/accueil-eleveai-reunion.png"],
  },

  keywords: [
    "EleveAI",
    "mathématiques",
    "coach maths IA",
    "calcul rapide",
    "leçon du jour",
    "parcours maths",
    "automatismes",
    "raisonnement",
    "défis mathématiques",
    "révision collège",
    "entraînement maths",
    "6e",
    "5e",
    "4e",
    "3e",
    "maths collège",
    "plateforme éducative",
    "IA éducation",
    "La Réunion",
    "apprendre autrement",
  ],
};