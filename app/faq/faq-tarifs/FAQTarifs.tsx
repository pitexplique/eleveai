"use client";

import Script from "next/script";
import Link from "next/link";
// ⛔ CETTE PAGE A ÉTÉ RÉÉCRITE LE 22/08/2026, ET C'ÉTAIT LA PLUS URGENTE.
// Elle décrivait encore le modèle d'avant, mot pour mot : « EleveAI est
// actuellement en phase pilote », « contactez-nous pour un devis », « un accès
// individuel payant pour les familles est prévu, les modalités seront
// communiquées prochainement ». Le prix était publié sur /tarifs depuis le
// 21/08 ; ici, il n'existait pas encore.
//
// ⚠️ ET ELLE ÉMET UN JSON-LD `FAQPage` : ces réponses-là ne dorment pas dans
// une page peu visitée, elles peuvent s'afficher DANS les résultats de Google,
// sous la marque. Une FAQ périmée est le pire endroit où laisser un ancien
// modèle économique — c'est le seul format que les moteurs recopient tel quel.
//
// ⛔ Aucun prix n'est écrit à la main ici. Ils viennent tous de `lib/tarifs.ts`,
// et l'état de la vente de `lib/legal/editeur.ts`, exactement comme /tarifs et
// le llms.txt. C'est ce couple-là qui s'était désaccordé en juin.
import { VENTE } from "@/lib/legal/editeur";
// ⛔⛔ LES QUATRE CONSTANTES `*_ETABLISSEMENT*` SONT PARTIES LE 01/09/2026 avec
// la question qu'elles servaient. Cette FAQ ÉMET UN `FAQPage` : la réponse
// « et pour un établissement entier ? » ne dormait pas dans une page peu
// visitée, elle partait dans les résultats de Google et y proposait encore un
// contrat qu'il est interdit de signer — six jours après la décision du 29/08.
// C'est pour ça qu'on la SUPPRIME au lieu de la réécrire en « non » : une
// réponse qui reste ici reste dans le JSON-LD.
// ⭐ 22/11/2026 — RÉÉCRITE AU MODÈLE DU 22/11 (note modele-tarifaire-22-11).
// Ancienne FAQ (« l'élève ne paie jamais », prof gratuit) : git show 664275b6:app/faq/faq-tarifs/FAQTarifs.tsx
import { ENFANT_EN_PLUS, FORMULES_FAMILLE, MENTION_TVA, OFFRE, OUVERTURE_SUIVI, PHRASE_A_VENIR, PHRASE_ELEVE, PHRASE_ESSAI, PHRASE_FAMILLE, PHRASE_PROF, montant } from "@/lib/tarifs";

export default function FAQTarifs() {
  // La même phrase que sur /tarifs et dans le llms.txt : tant que Stripe
  // n'encaisse pas, on annonce un prix ferme et une caisse fermée. Annoncer une
  // offre achetable dont le paiement ne répond pas est pire que le silence.
  const etatVente = VENTE.ouverte
    ? "L'abonnement est ouvert."
    : `Les abonnements ouvrent ${OUVERTURE_SUIVI}. Rien n'est encaissé avant.`;

  const faq = [
    {
      q: "Mon enfant peut-il essayer sans que je paie ?",
      a: `Oui. ${PHRASE_ESSAI}`,
    },
    {
      q: `Qu'est-ce qui compte dans les ${OFFRE.questionsGratuitesParJour} questions ?`,
      a: "Chaque réponse donnée au coach, aux exercices interactifs, au calcul rapide, aux automatismes ou à un QCM. C'est un seul compteur pour tout le site, chaque jour.",
    },
    {
      q: "Combien coûte le compte Famille ?",
      a: `Famille : ${PHRASE_FAMILLE}. Un seul compte par courriel. Il ne contient pas d'aide par l'IA. ${MENTION_TVA}.`,
    },
    {
      q: "Par enfant ou par famille ?",
      a: `Les deux. Pour un enfant, le compte Élève : ${PHRASE_ELEVE}. Pour plusieurs, le compte Famille : ${montant(OFFRE.famille)} par mois jusqu'à ${FORMULES_FAMILLE.famille.enfants} enfants, chacun avec son tableau de bord, puis ${montant(ENFANT_EN_PLUS.mensuel)} par mois par enfant en plus.`,
    },
    {
      q: "Et si je suis professeur ?",
      a: `${PHRASE_PROF}. Vos élèves entrent avec votre code quand vous êtes connecté, et pour un devoir daté. Le compte Prof n'utilise pas l'IA.`,
    },
    {
      q: "Mon professeur a EleveAI : est-ce gratuit pour ma classe ?",
      a: "En classe, oui : avec le code de son professeur, votre enfant n'est jamais compté, et il ne voit ni compteur ni offre. À la maison, il passe par le compte Famille : ce sont deux accès séparés.",
    },
    {
      q: "Et l'aide de Ti Margo, par l'IA ?",
      a: "Elle viendra dans une option Premium : Ti Margo donne un indice, puis un autre, sans donner la réponse. Pour les moins de 15 ans, c'est le parent qui l'active. Son prix sera annoncé plus tard.",
    },
    {
      q: "D'autres pays ? L'option Premium ?",
      a: PHRASE_A_VENIR,
    },
    {
      q: "Puis-je arrêter quand je veux ?",
      a: "Oui. Sans engagement, résiliable à tout moment depuis votre espace, et vous avez quatorze jours pour changer d'avis. C'est écrit dans les conditions de vente.",
    },
    {
      q: "Les données de mon enfant sont-elles protégées ?",
      a: "Oui. On ne collecte que le strict nécessaire : de quoi l'identifier dans sa classe et suivre ses résultats. Aucune donnée sensible n'est stockée. Le détail est dans la politique de confidentialité.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-16">
      <Script
        id="faq-tarifs-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-300 transition">
            Accueil
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/faq" className="hover:text-emerald-300 transition">
            FAQ
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">Tarifs</span>
        </div>

        <h1 className="text-3xl font-bold text-emerald-300">
          FAQ Tarifs – EleveAI
        </h1>

        {/* ⚠️ « CELUI D'UNE FAMILLE COMME CELUI D'UN PROFESSEUR » ÉTAIT FAUX
            DEPUIS LE 22/08 et a tenu jusqu'au 01/09 : le professeur ne paie pas
            de tableau de bord, il ouvre un tarif à ses familles. Une constante
            protège d'un chiffre faux, jamais d'une phrase fausse — celle-ci
            citait le bon montant à côté du mauvais payeur, et c'est ce qui l'a
            rendue invisible à toutes les relectures. */}
        <p className="text-slate-300 text-sm leading-relaxed">
          {OFFRE.questionsGratuitesParJour} questions offertes chaque jour. Puis {montant(OFFRE.eleve)} par mois
          pour un enfant, {montant(OFFRE.famille)} par mois pour la famille, ou {montant(OFFRE.prof)} par mois pour toutes vos classes. {etatVente}
        </p>

        <section className="space-y-4">
          {faq.map((f, i) => (
            <details
              key={i}
              className="rounded-xl border border-slate-700 bg-slate-900/60 p-4"
            >
              <summary className="cursor-pointer font-semibold text-emerald-300">
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </section>

        <div className="pt-6 border-t border-slate-800 text-sm text-slate-400">
          Besoin d&apos;un avis ?{" "}
          <Link
            href="/contact"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Écrire à l&apos;équipe
          </Link>
          {/* ⛔ « EleveAI dans un établissement » menait à /espace-ecoles,
              supprimée le 31/08/2026 : rien ne se vend à un établissement. */}
          {" · "}
          <Link
            href="/tarifs"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Page Tarifs
          </Link>
        </div>
      </div>
    </main>
  );
}
