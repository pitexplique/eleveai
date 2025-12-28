import type { Metadata } from "next";

const url = "https://eleveai.fr/pourquoi-nos-tarifs-sont-justes";

export const metadata: Metadata = {
  title: "Pourquoi nos tarifs sont justes | EleveAI",
  description:
    "Pourquoi EleveAI n’est pas gratuit : coûts réels, sécurité, RGPD, qualité pédagogique, support, et plafonds sans surprise. Une page transparente pour parents, professeurs et établissements.",
  alternates: {
    canonical: url,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "article",
    url,
    title: "Pourquoi nos tarifs sont justes | EleveAI",
    description:
      "Transparence sur les coûts réels et le choix d’un modèle durable : sécurité, RGPD, support, qualité pédagogique et plafonds sans surprise.",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — Pourquoi nos tarifs sont justes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pourquoi nos tarifs sont justes | EleveAI",
    description:
      "Une page transparente : coûts, RGPD, sécurité, support, plafonds, et choix d’un modèle durable pour l’école.",
    images: ["/preview.jpg"],
  },
};
