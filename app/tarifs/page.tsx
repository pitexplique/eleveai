// app/tarifs/page.tsx
import type { Metadata } from "next";
import TarifsClient from "./TarifsClient";

const url = "https://eleveai.fr/tarifs";

export const metadata: Metadata = {
  title: "Tarifs EleveAI — Des formules claires et sans surprise",
  description:
    "Tarifs EleveAI : offres simples (découverte, abonnement, établissement), cadre anti-triche, quotas clairs et usage responsable.",
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url,
    title: "Tarifs EleveAI — Des formules claires et sans surprise",
    description:
      "Découvrez les tarifs EleveAI : une IA éducative encadrée, avec quotas clairs, pensée pour élèves, parents, professeurs et établissements.",
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
      "Tarifs EleveAI : offres simples, plafonds clairs, IA éducative anti-triche pour élèves, parents, professeurs et établissements.",
    images: ["/preview.jpg"],
  },
};

export default function Page() {
  return <TarifsClient />;
}
