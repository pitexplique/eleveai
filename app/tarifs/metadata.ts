import type { Metadata } from "next";

const url = "https://eleveai.fr/tarifs";

export const metadata: Metadata = {
  title: "Tarifs EleveAI — Des formules claires et sans surprise",
  description:
    "Tarifs EleveAI : abonnements basés sur le nombre de requêtes, sans surprise. Offres élèves, parents, professeurs et établissements, avec plafonds clairs et cadre anti-triche.",
  alternates: {
    canonical: url,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url,
    title: "Tarifs EleveAI — Des formules claires et sans surprise",
    description:
      "Découvrez les tarifs EleveAI : une IA éducative avec quotas clairs, sans sur-facturation, pensée pour élèves, parents, professeurs et établissements.",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — Tarifs et abonnements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs EleveAI — Des formules claires et sans surprise",
    description:
      "Tarifs EleveAI : abonnements simples, plafonds clairs, IA éducative anti-triche pour élèves, parents, professeurs et établissements.",
    images: ["/preview.jpg"],
  },
};
