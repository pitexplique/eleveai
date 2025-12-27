import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace vie scolaire | EleveAI",
  description:
    "Générateur de prompts pour la vie scolaire : messages aux élèves, courriers aux familles, comptes rendus, sanctions éducatives, fiches de suivi et protocoles.",
  alternates: {
    canonical: "https://eleveai.fr/espace-vie-scolaire",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-vie-scolaire",
    siteName: "EleveAI",
    title: "Espace vie scolaire | EleveAI",
    description:
      "Des prompts clairs et professionnels pour gérer les situations de vie scolaire avec justesse et cadre.",
  },
  twitter: {
    card: "summary",
    title: "Espace vie scolaire | EleveAI",
    description:
      "Outils IA pour la communication, le suivi et les documents de vie scolaire.",
  },
};
