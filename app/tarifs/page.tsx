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
import { ETABLISSEMENT_ETRANGER, OUVERTURE_SUIVI, PRIX_MENSUEL, VIDEOS_SITE, montant } from "@/lib/tarifs";

const url = "https://www.eleveai.fr/tarifs";

// ⭐ 02/11/2026 — LA PAGE SE RALLUME, refaite autour de la grille 2026
// (lib/tarifs.ts). Le rectorat n'exige aucune autorisation pour être
// indépendant ; ouverture fin décembre. ⚠️ Ce texte est ce que Google affiche :
// il suit le texte visible, et ses prix viennent des constantes.
const resume =
  `Le coach de maths reste ouvert à tous. Le suivi famille (${montant(PRIX_MENSUEL)} par mois en France, un prix adapté à chaque pays) ouvre ${OUVERTURE_SUIVI} : ` +
  `${VIDEOS_SITE} vidéos, un bilan chaque semaine, et les visios « Maths réelles ». Offre aux établissements hors de France : ${ETABLISSEMENT_ETRANGER.parEleveEtParAn} par élève et par an.`;

export const metadata: Metadata = {
  title: "Offres — le suivi famille, la visio, les établissements hors de France",
  description: resume,
  alternates: { canonical: url },
  /* ✅ 02/11/2026 : `noindex` levé (il datait du 09/09, « je veux plus voir des
     prix »), la page revient au sitemap. */
  openGraph: {
    type: "website",
    url,
    title: "Les offres d'EleveAI",
    description: resume,
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [{ url: "/preview.jpg", width: 1200, height: 630, alt: "EleveAI — les offres" }],
  },
  twitter: { card: "summary_large_image", title: "Les offres d'EleveAI", description: resume, images: ["/preview.jpg"] },
};

export default function Page() {
  return <TarifsClient />;
}
