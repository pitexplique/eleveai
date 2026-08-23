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
import {
  EXEMPLE_CLASSE,
  EXEMPLE_ETABLISSEMENT,
  PLAFOND_ETABLISSEMENT_AN,
  PRIX_CLASSE_ELEVE_MOIS,
  PRIX_ETABLISSEMENT_ELEVE_MOIS,
  PRIX_FAMILLE_AN,
  PRIX_FAMILLE_MOIS,
  centimes,
  euros,
  montant,
} from "@/lib/tarifs";

export default function FAQTarifs() {
  // La même phrase que sur /tarifs et dans le llms.txt : tant que Stripe
  // n'encaisse pas, on annonce un prix ferme et une caisse fermée. Annoncer une
  // offre achetable dont le paiement ne répond pas est pire que le silence.
  const etatVente = VENTE.ouverte
    ? "L'abonnement est ouvert."
    : "L'abonnement n'ouvre pas encore : la vue du parent se construit en ce moment, et rien n'est encaissé tant qu'elle n'est pas prête. Le prix, lui, est ferme.";

  const faq = [
    {
      q: "Mon enfant peut-il travailler sur EleveAI sans que je paie ?",
      a: "Oui, entièrement et sans limite de temps. Le coach dans les cinq matières, les exercices corrigés, les parcours, le calcul rapide, les défis, les cahiers, les fiches de cours et les évaluations blanches ne se paient pas, et il n'y a aucune publicité. Il garde ses résultats. Rien de tout cela ne deviendra payant.",
    },
    {
      q: "Alors qu'est-ce qui se paie ?",
      a: "La fenêtre du parent. Votre enfant voit déjà sa progression ; ce que l'abonnement ouvre, c'est votre vue à vous — son bulletin, ce qu'il a travaillé cette semaine, son historique, et des recommandations qui vous disent quoi reprendre maintenant, notion par notion. Elles sont calculées sur des règles explicites et non par une IA opaque : chacune s'explique devant un professeur.",
    },
    {
      q: `${euros(PRIX_FAMILLE_AN)} par enfant ou par famille ?`,
      a: `Par famille, quel que soit le nombre d'enfants, sur une seule adresse e-mail. Le frère ou la sœur d'à côté n'a pas à apprendre moins parce qu'il est le deuxième. Cela fait un euro par mois pour toute la maison.`,
    },
    {
      q: "Et si je suis professeur ?",
      a: `${montant(
        PRIX_CLASSE_ELEVE_MOIS,
      )} par élève et par mois, soit ${centimes(
        EXEMPLE_CLASSE.parMois,
      )} par mois pour une classe de ${
        EXEMPLE_CLASSE.eleves
      }. Vous ne sortez rien de votre poche : c'est le tarif de groupe que vous ouvrez à vos familles, qui paient alors 25 % de moins que si chacune s'abonnait seule à ${montant(
        PRIX_FAMILLE_MOIS,
      )}. Et vous ne savez pas qui a payé — votre tableau de bord affiche tous vos élèves sans distinction.`,
    },
    {
      q: "Et pour un établissement entier ?",
      a: `${montant(
        PRIX_ETABLISSEMENT_ELEVE_MOIS,
      )} par élève et par mois, et jamais plus de ${euros(
        PLAFOND_ETABLISSEMENT_AN,
      )} par an quel que soit l'effectif : tous les niveaux, toutes les classes, tous les professeurs, plus la vue complète de la direction. Un collège de ${
        EXEMPLE_ETABLISSEMENT.eleves
      } élèves paie ${euros(EXEMPLE_ETABLISSEMENT.total)} par an, soit ${montant(
        EXEMPLE_ETABLISSEMENT.parEleveAn,
      )} par élève. Aucune famille ne paie, et il n'y a aucun paiement à gérer côté foyers.`,
    },
    {
      q: "Pourquoi est-ce à ce point moins cher qu'ailleurs ?",
      a: "Parce que la structure n'est pas la même : aucun investisseur à rémunérer, aucun commercial, des exercices écrits ici plutôt qu'achetés, et un élève de plus qui ne coûte presque rien. L'IA démultiplie le travail, et l'enseignant vérifie — les deux moitiés ne se séparent jamais. C'est un professeur en exercice qui relit ses propres exercices.",
    },
    {
      q: "Comment mon enfant se connecte-t-il ?",
      a: "Le compte élève est gratuit et se crée en quelques secondes. Si son établissement participe, il reçoit un code établissement et un code élève de son professeur — et dans ce cas, la famille n'a rien à payer du tout.",
    },
    {
      q: "Puis-je arrêter quand je veux ?",
      a: "Oui. Sans engagement, résiliable à tout moment depuis votre espace, et vous avez quatorze jours pour changer d'avis, remboursés, même si votre enfant a déjà tout utilisé. C'est écrit dans les conditions de vente.",
    },
    {
      q: "Et si je ne peux pas payer ?",
      a: "Alors vous ne payez pas, et personne ne le saura. Si l'enfant d'à côté ne paie pas, il apprend exactement la même chose : aucun élève n'a jamais eu à demander quoi que ce soit pour travailler ici.",
    },
    {
      q: "Les données de mon enfant sont-elles protégées ?",
      a: "Oui. On ne collecte que le strict nécessaire — de quoi l'identifier dans sa classe et suivre ses résultats. Aucune donnée sensible n'est stockée, et les recommandations sont calculées chez nous, sans appel à un service externe. Le détail est dans la politique de confidentialité.",
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

        <p className="text-slate-300 text-sm leading-relaxed">
          Un tableau de bord, c&apos;est {euros(PRIX_FAMILLE_AN)} par an — celui
          d&apos;une famille comme celui d&apos;un professeur. L&apos;élève, lui, ne
          paie jamais. {etatVente}
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
          {" · "}
          <Link
            href="/espace-ecoles"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            EleveAI dans un établissement
          </Link>
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
