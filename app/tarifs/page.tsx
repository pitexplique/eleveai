// app/tarifs/page.tsx
import type { Metadata } from "next";
import TarifsClient from "./TarifsClient";
// ⛔⛔ LES QUATRE CONSTANTES `*_ETABLISSEMENT*` ONT QUITTÉ CET IMPORT LE
// 01/09/2026, ET C'ÉTAIT LA CORRECTION LA PLUS URGENTE DE LA PAGE. La carte
// établissement avait été retirée le 29/08 et l'offre déclarée interdite le
// 31/08 — mais la DESCRIPTION, celle que Google affiche dans ses résultats,
// annonçait toujours « 0,50 € par élève et par mois, plafonné à 2 000 € par
// an ». Trois jours durant, la page ne vendait plus rien et la SERP vendait
// encore. C'est exactement la leçon de `retirer-du-sitemap-ne-ferme-rien` :
// retirer une carte n'éteint pas une page, il faut éteindre les quatre
// endroits — la carte, la description, le JSON-LD et le llms.txt.
import { OFFRE, montant } from "@/lib/tarifs";

const url = "https://www.eleveai.fr/tarifs";

// ⭐ 22/11/2026 — LES TARIFS DU 22/11 (note modele-tarifaire-22-11). ⚠️ Ce texte
// est ce que Google affiche : il suit le texte visible, ses prix viennent de
// lib/tarifs.ts. ⛔ Aucun prix non validé (année, Premium, pays, établissements).
const resume =
  `${OFFRE.questionsGratuitesParJour} questions offertes chaque jour pour essayer. Famille : ${montant(OFFRE.famille)} par mois, autant d'enfants que vous voulez, du CP à la Terminale. ` +
  `Prof : ${montant(OFFRE.prof)} par mois, toutes vos classes. Les fiches de cours, les énigmes à projeter et les PDF restent libres.`;

export const metadata: Metadata = {
  title: `Tarifs — ${montant(OFFRE.famille)} par mois pour la famille ou le prof`,
  description: resume,
  alternates: { canonical: url },
  /* ✅ 02/11/2026 : `noindex` levé (il datait du 09/09, « je veux plus voir des
     prix »), la page revient au sitemap. */
  openGraph: {
    type: "website",
    url,
    title: "Les tarifs d'EleveAI",
    description: resume,
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [{ url: "/preview.jpg", width: 1200, height: 630, alt: "EleveAI — les tarifs" }],
  },
  twitter: { card: "summary_large_image", title: "Les tarifs d'EleveAI", description: resume, images: ["/preview.jpg"] },
};

export default function Page() {
  return <TarifsClient />;
}
