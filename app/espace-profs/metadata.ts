import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace professeurs | EleveAI",
  description:
    "Générateur de prompts pédagogiques pour enseignants : séances, exercices, évaluations, corrections et fiches méthode, prêts à coller dans Word.",
  alternates: {
    canonical: "https://eleveai.fr/espace-profs",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-profs",
    siteName: "EleveAI",
    title: "Espace professeurs | EleveAI",
    description:
      "Crée des prompts pédagogiques structurés pour générer séances, évaluations et ressources Word-friendly.",
  },
  twitter: {
    card: "summary",
    title: "Espace professeurs | EleveAI",
    description:
      "Prompts pédagogiques prêts à coller pour enseignants : séances, exercices, évaluations.",
  },
};

