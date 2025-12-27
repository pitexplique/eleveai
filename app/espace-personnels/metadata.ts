import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace personnels | EleveAI",
  description:
    "Génère des prompts clairs pour rédiger des consignes, notes internes, fiches sécurité, protocoles, affiches ou messages de remerciement à destination des personnels d’un établissement.",
  alternates: {
    canonical: "https://eleveai.fr/espace-personnels",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-personnels",
    siteName: "EleveAI",
    title: "Espace personnels | EleveAI",
    description:
      "Prompts prêts à coller pour consignes, protocoles, fiches sécurité, notes internes et affiches.",
  },
  twitter: {
    card: "summary",
    title: "Espace personnels | EleveAI",
    description:
      "Prompts prêts à coller pour consignes, protocoles, fiches sécurité, notes internes et affiches.",
  },
};
