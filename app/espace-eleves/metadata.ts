import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace élèves | EleveAI — Coach maths, Brevet, Parcours",
  description:
    "Ton espace EleveAI : Coach Maths IA, Parcours, Calcul rapide, Brevet des collèges, Bac Spé, English Maths et Défis du jour. Connecte-toi et suis ta progression.",
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
      "Coach Maths IA, Parcours, Brevet, Calcul rapide, English Maths — tous tes outils au même endroit.",
  },
  twitter: {
    card: "summary",
    title: "Espace élèves | EleveAI",
    description:
      "Ton coach maths personnel. Progresse notion par notion, du CM1 au Bac.",
  },
};
