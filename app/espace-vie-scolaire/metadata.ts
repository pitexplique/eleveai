// app/espace-vie-scolaire/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vie scolaire — Messages & documents | EleveAI",
  description:
    "Générateur de prompts pour la vie scolaire : messages aux familles, rappels de règles, convocations, comptes-rendus, bilans d’incident. Clair, factuel, respectueux.",
  alternates: {
    canonical: "https://eleveai.fr/espace-vie-scolaire",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-vie-scolaire",
    title: "Vie scolaire — Messages & documents | EleveAI",
    description:
      "Prompts prêts à copier pour la vie scolaire : rappel de règles, convocation, message aux familles, compte-rendu, suivi d’incident.",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vie scolaire — EleveAI",
    description:
      "Documents clairs et factuels pour la vie scolaire : familles, règles, incidents, suivi.",
  },
};

