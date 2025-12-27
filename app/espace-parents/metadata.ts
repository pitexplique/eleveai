// app/espace-parents/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace parents — Accompagner son enfant avec l’IA | EleveAI",
  description:
    "Espace parents EleveAI : accompagner son enfant avec l’IA sans faire à sa place. Cadre clair, prompts guidés, anti-triche et confiance.",
  alternates: {
    canonical: "https://eleveai.fr/espace-parents",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-parents",
    title: "Espace parents — Accompagner son enfant avec l’IA",
    description:
      "Aider son enfant à apprendre avec l’IA : comprendre, réviser, progresser — sans tricher.",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Espace parents — EleveAI",
    description:
      "Un cadre simple pour aider son enfant avec l’IA, sans conflits ni triche.",
  },
};
