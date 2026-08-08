import type { Metadata } from "next";

// La page tient la 2e place de la SERP de marque (constat Bing 25/07) : ce
// texte est la vitrine « élève » vue des moteurs. Aucune promesse datée.
export const metadata: Metadata = {
  title: "Apprendre à ton rythme, du CP au Bac",
  description:
    "Ton espace EleveAI : cinq coachs (maths, français, anglais, espagnol, IA), la dictée et les mots du jour, des parcours pour faire le point et des machines pour comprendre. Gratuit, du CP au Bac.",
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
      "Cinq coachs, des rituels chaque jour, des parcours et des machines pour comprendre — tous tes outils au même endroit, du CP au Bac.",
  },
  twitter: {
    card: "summary",
    title: "Espace élèves | EleveAI",
    description:
      "Ton coach personnel dans cinq matières. Progresse notion par notion, du CP au Bac.",
  },
};
