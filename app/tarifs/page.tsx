// app/tarifs/page.tsx
import type { Metadata } from "next";
import TarifsClient from "./TarifsClient";

const url = "https://eleveai.fr/tarifs";

export const metadata: Metadata = {
  title: "Tarifs EleveAI — Le juste prix, en réflexion avec vous",
  description:
    "EleveAI ne fige pas son tarif : gratuit pour l'élève, jamais payé par les familles, payé globalement par l'établissement. Fourchette 2 à 7 €/élève/an en réflexion — donnez votre avis.",
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url,
    title: "Tarifs EleveAI — Le juste prix, en réflexion avec vous",
    description:
      "Gratuit pour l'élève, jamais payé par les familles. Fourchette 2 à 7 €/élève/an payée par l'établissement, en réflexion. Donnez votre avis sur le juste prix.",
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
    title: "Tarifs EleveAI — Le juste prix, en réflexion avec vous",
    description:
      "Gratuit pour l'élève, jamais payé par les familles. Fourchette 2 à 7 €/élève/an, en réflexion. Donnez votre avis.",
    images: ["/preview.jpg"],
  },
};

export default function Page() {
  return <TarifsClient />;
}
