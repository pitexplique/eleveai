// app/tarifs/page.tsx
import type { Metadata } from "next";
import TarifsClient from "./TarifsClient";

const url = "https://www.eleveai.fr/tarifs";

// ⚠️ CES TEXTES SONT CE QUE GOOGLE AFFICHE DANS SES RÉSULTATS. Ils annonçaient
// « Abonnement famille 4,90 €/mois » et « formules mensuelle et annuelle » —
// une offre aux particuliers qui n'est pas ouverte. Corriger la carte sur la
// page sans corriger la description, c'est laisser la promesse dans la SERP,
// là où elle est justement le plus lue.
export const metadata: Metadata = {
  title: "Tarifs — pilote gratuit, écoles et établissements",
  description:
    "Accès pilote gratuit 4 semaines pour les collèges et lycées. 5 €/élève/an pour une classe, 4 €/élève/an pour un établissement — et gratuit pour chaque élève, rien à payer pour les familles.",
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url,
    title: "Tarifs EleveAI — classes, établissements, pilote gratuit",
    description:
      "5 €/élève/an pour une classe, 4 €/élève/an pour tout un établissement. Gratuit pour chaque élève, aucun paiement demandé aux familles. Pilote gratuit de 4 semaines.",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — Tarifs pour les classes et les établissements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs EleveAI — classes, établissements, pilote gratuit",
    description:
      "5 €/élève/an pour une classe, 4 €/élève/an pour un établissement. Gratuit pour chaque élève. Pilote gratuit de 4 semaines.",
    images: ["/preview.jpg"],
  },
};

export default function Page() {
  return <TarifsClient />;
}
