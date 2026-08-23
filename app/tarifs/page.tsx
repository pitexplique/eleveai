// app/tarifs/page.tsx
import type { Metadata } from "next";
import TarifsClient from "./TarifsClient";
import {
  EXEMPLE_ETABLISSEMENT,
  PRIX_CLASSE_ELEVE_MOIS,
  PRIX_FAMILLE_AN,
  PRIX_FAMILLE_MOIS,
  PLAFOND_ETABLISSEMENT_AN,
  PRIX_ETABLISSEMENT_ELEVE_MOIS,
  euros,
} from "@/lib/tarifs";

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
  `Le suivi par les parents est à ${euros(PRIX_FAMILLE_AN)} par an et par famille, quel que soit le nombre d'enfants. ` +
  `Une échelle : ${PRIX_FAMILLE_MOIS} € par élève et par mois pour une famille seule, ${PRIX_CLASSE_ELEVE_MOIS} € quand c'est le professeur qui organise sa classe, ${PRIX_ETABLISSEMENT_ELEVE_MOIS} € quand c'est l'établissement — plafonné à ${euros(PLAFOND_ETABLISSEMENT_AN)} par an. Plus le payeur est large, moins l'élève coûte, et on ne paie jamais deux fois.`;

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
    title: "Tarifs EleveAI — familles, classes, établissements",
    description: resume,
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — les tarifs pour les familles, les classes et les établissements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs EleveAI — familles, classes, établissements",
    description: resume,
    images: ["/preview.jpg"],
  },
};

export default function Page() {
  return <TarifsClient />;
}
