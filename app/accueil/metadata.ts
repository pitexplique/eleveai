// app/accueil/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";
const HERO_IMAGE = "/images/accueil-eleveai-reunion.webp";

export const metadata: Metadata = {
  title: "EleveAI - Que veux-tu travailler aujourd'hui ?",

  description:
    "Maths, français ou anglais — choisis ce que tu veux travailler aujourd'hui. Coach IA, parcours guidés, calcul rapide, défis et leçon du jour. Du CP à la Terminale, à La Réunion.",

  alternates: {
    canonical: `${SITE_URL}/accueil`,
  },

  openGraph: {
    title: "EleveAI - Que veux-tu travailler aujourd'hui ?",

    description:
      "Maths, français ou anglais — choisis, clique, entraîne-toi. Coach IA, parcours, défis et calcul rapide. Du CP à la Terminale.",

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

    title: "EleveAI - Que veux-tu travailler aujourd'hui ?",

    description:
      "Maths, français ou anglais — choisis ce que tu veux travailler aujourd'hui. Coach IA, parcours, défis, calcul rapide. Du CP à la Terminale.",

    images: [HERO_IMAGE],
  },

  keywords: [
    "EleveAI",
    "mathématiques",
    "français cycle 2",
    "english maths",
    "verbes anglais maths",
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
