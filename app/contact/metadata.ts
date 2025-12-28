// app/contact/metadata.ts

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact EleveAI — Échanger autour d’une IA éducative responsable",
  description:
    "Contactez EleveAI pour toute question, retour pédagogique, idée d’amélioration ou proposition de collaboration autour d’un usage responsable de l’IA à l’école.",
  alternates: {
    canonical: "https://eleveai.fr/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/contact",
    title: "Contact EleveAI — Échanger autour d’une IA éducative responsable",
    description:
      "Parents, enseignants et partenaires peuvent contacter EleveAI pour échanger sur l’IA éducative, les usages en classe et les collaborations.",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact EleveAI",
    description:
      "Une IA éducative pensée pour faire apprendre. Contactez EleveAI pour échanger, proposer ou collaborer.",
  },
};
