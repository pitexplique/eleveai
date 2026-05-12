// app/tarifs/page.tsx
import type { Metadata } from "next";
import TarifsClient from "./TarifsClient";

const url = "https://eleveai.fr/tarifs";

export const metadata: Metadata = {
  title: "Tarifs EleveAI — Formules mensuelle et annuelle",
  description:
    "Tarifs EleveAI : choisissez une formule mensuelle ou annuelle, ajoutez plusieurs enfants et profitez des exercices guidés avec suivi des progrès.",
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url,
    title: "Tarifs EleveAI — Formules mensuelle et annuelle",
    description:
      "Découvrez les tarifs EleveAI : formules mensuelle et annuelle, accès maths, exercices guidés et suivi personnalisé des progrès.",
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
    title: "Tarifs EleveAI — Formules mensuelle et annuelle",
    description:
      "Tarifs EleveAI : formules mensuelle et annuelle, ajout d’enfants, exercices guidés et suivi personnalisé.",
    images: ["/preview.jpg"],
  },
};

export default function Page() {
  return <TarifsClient />;
}
