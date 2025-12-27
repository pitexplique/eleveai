import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace élèves | EleveAI",
  description:
    "Un coach IA pour apprendre sans tricher : crée ton prompt d’aide pour comprendre un cours, réviser ou préparer un contrôle.",
  alternates: {
    canonical: "https://eleveai.fr/espace-eleves",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-eleves",
    siteName: "EleveAI",
    title: "Espace élèves | EleveAI",
    description:
      "Crée un prompt clair pour comprendre, réviser et progresser avec l’IA, sans tricher.",
  },
  twitter: {
    card: "summary",
    title: "Espace élèves | EleveAI",
    description:
      "Ton coach IA pour comprendre un cours, réviser et préparer un contrôle.",
  },
};
