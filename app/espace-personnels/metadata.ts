// app/espace-personnels/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace personnels — Documents & services | EleveAI",
  description:
    "Générateur de prompts pour les personnels et services : notes, protocoles, fiches sécurité, affiches, remerciements. Clair, respectueux, adapté terrain.",
  alternates: {
    canonical: "https://eleveai.fr/espace-personnels",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://eleveai.fr/espace-personnels",
    title: "Espace personnels — Documents & services | EleveAI",
    description:
      "Prompts prêts à copier pour documents clairs (note, protocole, fiche sécurité, affiche, remerciements).",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Espace personnels — EleveAI",
    description:
      "Documents clairs et respectueux pour les personnels : notes, protocoles, sécurité, affiches.",
  },
};


