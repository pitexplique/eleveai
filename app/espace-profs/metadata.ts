import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace professeurs | EleveAI — Suivre vos élèves en maths",
  description:
    "EleveAI dans votre classe : codes élèves, suivi des résultats, parcours de notions, Brevet, Bac Spé, Calcul rapide et English Maths. Demandez un accès pilote.",
  alternates: { canonical: "https://eleveai.fr/espace-profs" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-profs",
    siteName: "EleveAI",
    title: "Espace professeurs | EleveAI",
    description:
      "Donnez à vos élèves un accès EleveAI et suivez leur progression notion par notion.",
  },
  twitter: {
    card: "summary",
    title: "Espace professeurs | EleveAI",
    description:
      "Coach Maths IA, Brevet, suivi de classe — EleveAI dans votre établissement.",
  },
};

