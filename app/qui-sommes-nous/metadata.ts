// app/qui-sommes-nous/metadata.ts

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — EleveAI, plusieurs portes pour apprendre",
  description:
    "EleveAI est un espace pédagogique créé par Frédéric Lacoste, professeur de mathématiques à La Réunion : maths, français, anglais, espagnol et IA, avec un suivi réel de la progression des élèves, du CP au Bac.",
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
