// app/espace-parents/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace parents | EleveAI — Suivre la progression de votre enfant",
  description:
    "EleveAI accompagne votre enfant en maths : Coach IA, Parcours, Brevet des collèges, Calcul rapide, English Maths. Résultats enregistrés, progression visible.",
  alternates: { canonical: "https://eleveai.fr/espace-parents" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-parents",
    siteName: "EleveAI",
    title: "Espace parents | EleveAI",
    description:
      "Suivez la progression de votre enfant en maths : parcours de notions, scores enregistrés, outils adaptés du CM1 au Bac.",
  },
  twitter: {
    card: "summary",
    title: "Espace parents | EleveAI",
    description:
      "Coach Maths IA, Brevet, Calcul rapide — suivez la progression de votre enfant.",
  },
};
