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
import { PERIODE_ANNUELLE, PRIX_ANNUEL, PRIX_MENSUEL, montant } from "@/lib/tarifs";

const url = "https://www.eleveai.fr/tarifs";

// ⚠️ CES TEXTES SONT CE QUE GOOGLE AFFICHE DANS SES RÉSULTATS. Ils annonçaient
// « Abonnement famille 4,90 €/mois » et « formules mensuelle et annuelle » —
// une offre aux particuliers qui n'est pas ouverte. Corriger la carte sur la
// page sans corriger la description, c'est laisser la promesse dans la SERP,
// là où elle est justement le plus lue.
// ⛔ Aucun prix recopié ici : ils viennent de `lib/tarifs.ts`, comme sur la
// page. C'est exactement ce couple-là qui s'était désaccordé en juin.
// ⛔ Le mot « gratuit » ne s'écrit plus sur cette page (Frédéric, 21/08) : il y
// figurait sept fois, sur une page qui demande de l'argent. La description suit
// le texte visible — c'est la condition pour que Google la retienne (leçon du
// 08/08, app/accueil/metadata.ts).
const resume =
  `Plusieurs portes pour apprendre, progresser et s'évaluer : cinq matières du CP au Bac, coachs, parcours, rituels, cahiers et fiches. ` +
  `Le suivi par les parents est à ${montant(PRIX_MENSUEL)} par mois sans engagement, ou ${montant(PRIX_ANNUEL)} ${PERIODE_ANNUELLE} — une seule adresse courriel, tous les enfants de la maison. ` +
  `Les enseignants ont un compte gratuit, à titre personnel, ouvert sur leur adresse académique. Et l'élève ne paie jamais : le coach, les exercices et les évaluations restent ouverts.`;

export const metadata: Metadata = {
  // ⚠️ Le titre suit le <h1> : une description ou un titre qui ne dit plus la
  // même chose que la page se fait remplacer par Google (leçon du 08/08).
  title: "Tarifs — apprendre, progresser, s'évaluer",
  description: resume,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url,
    title: "Tarifs EleveAI — deux formules pour les familles",
    description: resume,
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — les tarifs pour les familles et pour les classes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs EleveAI — deux formules pour les familles",
    description: resume,
    images: ["/preview.jpg"],
  },
};

export default function Page() {
  return <TarifsClient />;
}
