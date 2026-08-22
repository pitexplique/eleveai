import type { Metadata } from "next";
// ⚠️ LA DESCRIPTION DÉCRIVAIT L'ANCIENNE PAGE, celle des « coûts réels » et des
// « plafonds sans surprise » — un modèle à quotas qui n'a jamais existé chez
// nous et que la page ne défend plus depuis le 22/08. Elle ouvrait par
// « Pourquoi EleveAI n'est pas gratuit », c'est-à-dire par une justification
// défensive, là où la page répond maintenant au vrai doute : pourquoi c'est
// moins cher SANS être moins bon.
// ⛔ La description suit le texte visible, sinon Google en fabrique une autre.
import { PRIX_FAMILLE_AN, euros } from "@/lib/tarifs";

const url = "https://www.eleveai.fr/pourquoi-nos-tarifs-sont-justes";

const resume =
  `Un prix dix fois plus bas que les autres se lit « dix fois moins bon » tant que personne n'explique l'écart. ` +
  `Voici d'où il vient : aucun investisseur à rémunérer, aucun commercial, des exercices écrits ici et non achetés. ` +
  `L'IA démultiplie le travail, l'enseignant vérifie. L'élève ne paie jamais — ce qui se paie, ` +
  `c'est la fenêtre du parent, ${euros(PRIX_FAMILLE_AN)} par an et par famille.`;

export const metadata: Metadata = {
  title: "Pourquoi nos tarifs sont justes",
  description: resume,
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
    description: resume,
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
    description: resume,
    images: ["/preview.jpg"],
  },
};
