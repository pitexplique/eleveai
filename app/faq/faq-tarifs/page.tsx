import type { Metadata } from "next";
import FAQTarifs from "./FAQTarifs";
// ⛔ LA DESCRIPTION SUIT LE TEXTE VISIBLE, c'est la condition pour que Google la
// retienne plutôt que d'en fabriquer une (leçon du 08/08). Elle annonçait des
// « essais gratuits » — il n'y en a pas : l'élève ne paie jamais, ce n'est pas
// un essai qui expire. Et elle promettait « paiement Stripe » alors que la
// caisse n'est pas ouverte.
import {
  PLAFOND_ETABLISSEMENT_AN,
  PRIX_CLASSE_ELEVE_MOIS,
  PRIX_ETABLISSEMENT_ELEVE_MOIS,
  PRIX_FAMILLE_AN,
  PRIX_FAMILLE_MOIS,
  euros,
  montant,
} from "@/lib/tarifs";

const resume =
  `L'élève ne paie jamais : le coach, les exercices, les parcours et les évaluations ne se paient pas. ` +
  `Ce qui se paie, c'est la fenêtre du parent — ${euros(PRIX_FAMILLE_AN)} par an et par famille, ` +
  `quel que soit le nombre d'enfants. Le prix suit une échelle : ${montant(PRIX_FAMILLE_MOIS)} par élève et par mois ` +
  `pour une famille seule, ${montant(PRIX_CLASSE_ELEVE_MOIS)} quand son professeur organise la classe, ` +
  `${montant(PRIX_ETABLISSEMENT_ELEVE_MOIS)} quand c'est l'établissement — jamais plus de ${euros(PLAFOND_ETABLISSEMENT_AN)} par an.`;

export const metadata: Metadata = {
  title: "FAQ Tarifs",
  description: resume,
  alternates: { canonical: "/faq/faq-tarifs" },
  openGraph: {
    title: "FAQ Tarifs – EleveAI",
    description: resume,
    url: "/faq/faq-tarifs",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function Page() {
  return <FAQTarifs />;
}
