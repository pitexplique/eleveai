"use client";

import Script from "next/script";
import Link from "next/link";
import { QUOTAS } from "@/lib/constants/quotas";

export default function FAQTarifs() {
  const faq = [
    {
      q: "Quelle différence entre version gratuite et abonnement ?",
      a: `La version gratuite sert à découvrir EleveAI : ${QUOTAS.EMAIL_FREE_DAILY} essais par jour (compte connecté) et pas d’historique. L’abonnement débloque l’historique complet (tous vos presets) et un accès régulier pour un usage scolaire normal.`,
    },
    {
      q: "C’est quoi un “essai” / une “utilisation” ?",
      a: "Une utilisation correspond à un prompt (ta demande) + une réponse IA. C’est l’unité simple pour compter l’usage.",
    },
    {
      q: `En gratuit, j’ai bien ${QUOTAS.EMAIL_FREE_DAILY} essais par jour ?`,
      a: `Oui, pour un compte connecté en version gratuite : ${QUOTAS.EMAIL_FREE_DAILY} essais par jour. L’objectif est de pouvoir tester la méthode (comprendre → s’entraîner → vérifier) sans usage intensif.`,
    },
    {
      q: "En gratuit, mes presets sont-ils enregistrés ?",
      a: "Non. En version gratuite, les presets ne sont pas enregistrés dans l’historique : c’est une utilisation de découverte. Pour conserver et retrouver tout votre travail, il faut l’abonnement.",
    },
    {
      q: "Que veut dire “historique complet” dans l’abonnement ?",
      a: "Historique complet = accès à tous vos presets enregistrés, sans limite de durée : vous pouvez les retrouver, les relancer, les améliorer et les réutiliser dans le temps.",
    },
    {
      q: "L’abonnement est-il “illimité” ?",
      a: "L’abonnement donne un accès complet pour un usage scolaire normal. Pour éviter les abus et garantir la stabilité du service, un plafond technique peut exister, sans gêner un usage pédagogique classique.",
    },
    {
      q: "Je peux résilier quand je veux ?",
      a: "Oui. L’abonnement est résiliable à tout moment (paiement sécurisé via Stripe).",
    },
    {
      q: "Le sponsoring change quoi ?",
      a: "Le sponsoring est un soutien volontaire au projet. Il n’est pas nécessaire pour utiliser EleveAI : l’abonnement suffit pour l’accès complet.",
    },
    {
      q: "Existe-t-il une offre pour les établissements ?",
      a: "Oui : une offre pilote (sur devis) pour tester EleveAI dans un cadre établissement, avec charte, gouvernance et ajustements selon vos contraintes.",
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
          Ici, on répond simplement aux questions sur les essais gratuits,
          l’abonnement, l’historique et le paiement.
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
          Besoin d’un avis ?{" "}
          <Link
            href="/contact"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Écrire à l’équipe
          </Link>
          {" · "}
          <Link
            href="/offre-pilote"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Offre pilote (établissements)
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
