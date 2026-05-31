// app/accueil/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";
const HERO_IMAGE = "/images/accueil-eleveai-reunion.webp";

export const metadata: Metadata = {
  title: "EleveAI - Coach IA maths, français et anglais",

  description:
    "EleveAI aide les élèves à progresser en maths, en français et en anglais avec le Coach IA, le calcul rapide, les parcours guidés, les défis et la leçon du jour.",

  alternates: {
    canonical: `${SITE_URL}/accueil`,
  },

  openGraph: {
    title: "EleveAI - Maths, français et anglais",

    description:
      "Coach IA, parcours guidés, leçons et entraînements courts : une plateforme conçue pour développer les automatismes, la compréhension et la progression en maths, français et anglais.",

    url: `${SITE_URL}/accueil`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",

    images: [
      {
        url: HERO_IMAGE,
        width: 1680,
        height: 945,
        alt: "EleveAI - Maths, français et anglais",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "EleveAI - Coach IA maths, français et anglais",

    description:
      "Une plateforme pédagogique moderne pour progresser en maths, en français et en anglais grâce aux parcours, aux défis et aux entraînements personnalisés.",

    images: [HERO_IMAGE],
  },

  keywords: [
    "EleveAI",
    "mathématiques",
    "français cycle 2",
    "english maths",
    "anglais A1 A2 B1 B2",
    "coach IA",
    "coach maths IA",
    "coach français IA",
    "calcul rapide",
    "leçon du jour",
    "parcours maths",
    "parcours français",
    "automatismes",
    "raisonnement",
    "défis mathématiques",
    "révision collège",
    "entraînement maths",
    "entraînement français",
    "CP",
    "CE1",
    "CE2",
    "6e",
    "5e",
    "4e",
    "3e",
    "plateforme éducative",
    "IA éducation",
    "La Réunion",
    "apprendre autrement",
  ],
};
