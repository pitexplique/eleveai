import type { Metadata } from "next";
import FAQTarifs from "./FAQTarifs";
// ⛔ LA DESCRIPTION SUIT LE TEXTE VISIBLE, c'est la condition pour que Google la
// retienne plutôt que d'en fabriquer une (leçon du 08/08). Elle annonçait des
// « essais gratuits » — il n'y en a pas : l'élève ne paie jamais, ce n'est pas
// un essai qui expire. Et elle promettait « paiement Stripe » alors que la
// caisse n'est pas ouverte.
import { PRIX_ETABLISSEMENT_AN, PRIX_FAMILLE_AN, PRIX_PROF_AN, euros } from "@/lib/tarifs";

const resume =
  `L'élève ne paie jamais : le coach, les exercices, les parcours et les évaluations ne se paient pas. ` +
  `Ce qui se paie, c'est la fenêtre du parent — ${euros(PRIX_FAMILLE_AN)} par an et par famille, ` +
  `quel que soit le nombre d'enfants. Un professeur équipe sa classe pour ${euros(PRIX_PROF_AN)} par an, ` +
  `un établissement entier pour ${euros(PRIX_ETABLISSEMENT_AN)} — des forfaits, sans élèves à compter.`;

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
