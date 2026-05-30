// app/qui-sommes-nous/metadata.ts

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — EleveAI, plusieurs portes pour apprendre les maths",
  description:
    "EleveAI est un espace pédagogique né à La Réunion : plusieurs portes d’entrée pour apprendre les maths et un suivi réel de la progression des élèves, du CM1 au Bac.",
  alternates: {
    canonical: "https://eleveai.fr/qui-sommes-nous",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/qui-sommes-nous",
    title: "Qui sommes-nous ? — EleveAI",
    description:
      "EleveAI : un outil pour tous avec plusieurs portes d’entrée et une cartographie de l’évolution des élèves.",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qui sommes-nous ? — EleveAI",
    description:
      "EleveAI accompagne les élèves avec des activités courtes, motivantes et un suivi clair de leur progression.",
  },
};
