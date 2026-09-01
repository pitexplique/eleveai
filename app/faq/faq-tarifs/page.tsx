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
import { PERIODE_ANNUELLE, PRIX_ANNUEL, PRIX_MENSUEL, montant } from "@/lib/tarifs";

const resume =
  `L'élève ne paie jamais : le coach, les exercices, les parcours et les évaluations ne se paient pas. ` +
  `Ce qui se paie, c'est la fenêtre du parent — ${montant(PRIX_MENSUEL)} par mois sans engagement, ou ${montant(PRIX_ANNUEL)} ${PERIODE_ANNUELLE}, ` +
  `sur une seule adresse courriel et quel que soit le nombre d'enfants. ` +
  `Les enseignants, eux, ont un compte gratuit à titre personnel, ouvert sur leur adresse académique.`;

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
