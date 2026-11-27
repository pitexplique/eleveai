import type { Metadata } from "next";
import FAQTarifs from "./FAQTarifs";
// ⛔ LA DESCRIPTION SUIT LE TEXTE VISIBLE, c'est la condition pour que Google la
// retienne plutôt que d'en fabriquer une (leçon du 08/08). Elle annonçait des
// « essais gratuits » — il n'y en a pas : l'élève ne paie jamais, ce n'est pas
// un essai qui expire. Et elle promettait « paiement Stripe » alors que la
// caisse n'est pas ouverte.
// ⛔⛔ LES TROIS CONSTANTES `*_ETABLISSEMENT*` SONT PARTIES LE 01/09/2026.
// Cette description-là est ce que Google affiche : elle annonçait encore un
// tarif établissement et son plafond six jours après le retrait de l'offre, sur
// la page dont les réponses partent en plus dans un `FAQPage`. Retirer la carte
// n'éteint rien tant que la description dit le contraire.
// 22/11/2026 : au modèle du 22/11 (note modele-tarifaire-22-11).
import { PHRASE_ELEVE, PHRASE_ESSAI, PHRASE_FAMILLE, PHRASE_PROF } from "@/lib/tarifs";

const resume = `${PHRASE_ESSAI} Élève : ${PHRASE_ELEVE}. Famille : ${PHRASE_FAMILLE}. Prof : ${PHRASE_PROF}.`;

export const metadata: Metadata = {
  title: "FAQ Tarifs",
  description: resume,
  alternates: { canonical: "/faq/faq-tarifs" },
  /* ⛔ ÉTEINTE LE 09/09/2026 avec /tarifs — page conservée, débranchée.
     ⚠️ C'est la troisième page de prix, et la plus facile à oublier : elle est
     rangée sous /faq et non sous /tarifs, donc elle échappe à un `grep tarifs`
     fait sur les chemins. Elle affichait onze montants. */
  robots: { index: false, follow: false },
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
