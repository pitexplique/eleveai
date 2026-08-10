// app/espace-ecoles/espace-personnels/metadata.ts
import type { Metadata } from "next";

// ⚠️ Même histoire que la vie scolaire (10/08/2026) : rangée sous
// `/espace-ecoles/`, canonique restée à la racine — une adresse en 404. Et le
// titre finissait par « | EleveAI », que le layout redouble en « — EleveAI ».
export const metadata: Metadata = {
  title: "Espace personnels — Documents & services",
  description:
    "Générateur de prompts pour les personnels et services : notes, protocoles, fiches sécurité, affiches, remerciements. Clair, respectueux, adapté terrain.",
  alternates: {
    canonical: "https://www.eleveai.fr/espace-ecoles/espace-personnels",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.eleveai.fr/espace-ecoles/espace-personnels",
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


