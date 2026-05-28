// app/qui-sommes-nous/metadata.ts

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — EleveAI",
  description:
    "Découvrez EleveAI, une plateforme éducative née à La Réunion pour aider les élèves à progresser grâce à plusieurs portes d’entrée et une cartographie de leur évolution.",
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
