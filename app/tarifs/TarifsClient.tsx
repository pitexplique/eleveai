// app/tarifs/TarifsClient.tsx
"use client";

import Link from "next/link";
import { QUOTAS } from "@/lib/constants/quotas";


type Plan = {
  name: string;
  price: string;
  usesMonth: string;
  highlight?: boolean;
  description: string;
  includes?: string[];
  idealFor: string[];
  checkoutUrl?: string;
  ctaLabel?: string;
  footnote?: string;
  retention?: string;
  kind?: "free" | "sub" | "sponsor";
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const STRIPE_CHECKOUT_URL = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;

const PLANS: Plan[] = [
    {
      kind: "free",
      name: "Gratuit — Découverte",
      price: "0 €",
      usesMonth: `${QUOTAS.EMAIL_FREE_DAILY} utilisations / jour`,
      description:
        "Pour découvrir EleveAI et sa méthode. Suffisant pour tester, pas pour un usage régulier.",
      includes: [
        "✅ Accès aux presets essentiels (élèves + profs)",
        "🛡️ Cadre anti-triche (prompts guidés, usage responsable)",
        `🕒 Quota : ${QUOTAS.EMAIL_FREE_DAILY} essais / jour`,
        "🚫 Pas d’historique : les presets ne sont pas enregistrés",
      ],
      retention: "Historique : non (version gratuite)",
      idealFor: ["Curieux", "Élèves / parents : tester", "Profs : essayer l’UX"],
      ctaLabel: "Créer un compte gratuit",
    },

{
  kind: "sub",
  name: "Abonnement EleveAI",
  price: "5,95 € / mois",
  usesMonth: "Accès complet (utilisations quotidiennes raisonnables)",
  highlight: true,
  description:
    "L’offre simple : un seul tarif pour utiliser EleveAI régulièrement, avec historique complet et un cadre éducatif clair.",
  includes: [
    "✅ Accès à tous les espaces (élèves / profs / parents)",
    "🧩 Presets officiels + favoris",
    "🛡️ Cadre anti-triche avec traces et justification",
    "🧾 Historique complet (tous vos presets)",
    "⚖️ Utilisations quotidiennes raisonnables (usage scolaire normal)",
    "📬 Support par email",
  ],
  retention: "Historique : complet (sans limite de durée)",
  idealFor: ["Élèves réguliers", "Parents", "Professeurs", "Soutien scolaire"],
  checkoutUrl: STRIPE_CHECKOUT_URL,
  ctaLabel: "S’abonner via Stripe",
  footnote:
    "Résiliable à tout moment. Paiement sécurisé via Stripe. Un plafond technique existe pour éviter les abus, sans bloquer un usage pédagogique classique.",
},

  {
    kind: "sponsor",
    name: "Sponsor — Encourager le projet",
    price: "Soutien libre",
    usesMonth: "Crowdfunding (au choix)",
    description:
      "Pour celles et ceux qui veulent soutenir EleveAI et accélérer le développement (contenus, sécurité, maintenance).",
    includes: [
      "❤️ Soutien direct au projet (crowdfunding)",
      "🏷️ Badge “Sponsor” sur ton profil (optionnel)",
      "📬 Accès aux nouveautés en avant-première (newsletter) (optionnel)",
      "🙏 Ton prénom dans la page “Merci” (optionnel)",
    ],
    retention: "Historique : complet",
    idealFor: [
      "Parents / profs qui encouragent",
      "Anciens élèves",
      "Soutiens du projet",
    ],
    ctaLabel: "Soutenir EleveAI →",
    footnote:
      "Le sponsoring n’est pas nécessaire pour utiliser EleveAI : c’est un soutien volontaire.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Enfin une IA qui n’encourage pas le “fait à la place”. Les traces et la structure aident vraiment les élèves à expliquer.",
    author: "A. (prof)",
    role: "Collège",
  },
  {
    quote:
      "En tant que parent, je vois mieux ce que mon enfant a tenté, et où il bloque. Ça change tout.",
    author: "M. (parent)",
    role: "Accompagnement à la maison",
  },
  {
    quote:
      "Pour réviser, c’est clair : étapes → justification → correction. Je gagne du temps sans tricher.",
    author: "L. (élève)",
    role: "Lycée",
  },
];

function planQueryValue(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[’']/g, "")
    .replace(/[—–-]/g, "_");
}

export default function TarifsClient() {
  const stripeOk =
    typeof STRIPE_CHECKOUT_URL === "string" &&
    STRIPE_CHECKOUT_URL.trim().length > 0;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-8">
          {/* Fil d’Ariane */}
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span>/</span>
            <span>Tarifs</span>
          </div>

          {/* Titre & pitch */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-50">
              Tarifs EleveAI
            </h1>

            <div className="grid gap-4 lg:grid-cols-[2fr_1fr] lg:items-start">
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                  Trois options simples :{" "}
                  <strong>Découvrir gratuitement</strong>,{" "}
                  <strong>s’abonner à 5,95 € / mois</strong>, ou{" "}
                  <strong>soutenir le projet</strong>.{" "}
                  <span className="text-slate-400">
                    (Une utilisation = un prompt + une réponse.)
                  </span>
                </p>

                <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-200">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1">
                    <span>🛡️</span>
                    <span>Cadre anti-triche + traces</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
                    <span>🔒</span>
                    <span>RGPD & bonnes pratiques élèves</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
                    <span>💳</span>
                    <span>Paiement Stripe</span>
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/pourquoi-nos-tarifs-sont-justes"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
                  >
                    Pourquoi nos tarifs sont justes →
                  </Link>
                </div>
              </div>

              {/* Bloc contact */}
              <div className="rounded-2xl border border-emerald-600/70 bg-emerald-500/10 p-4 space-y-2 shadow-lg shadow-emerald-500/10">
                <p className="text-sm font-semibold text-emerald-200">
                  Besoin d’un avis ?
                </p>
                <p className="text-xs text-slate-200">
                  Usage, établissement, contraintes : écris-nous et on te répond
                  rapidement.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow hover:bg-emerald-400"
                  >
                    Écrire à l’équipe
                  </Link>

                  <Link
                    href="/offre-pilote"
                    className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-slate-950/40 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-slate-900"
                  >
                    Offre pilote (établissements)
                  </Link>
                </div>

                <p className="text-[11px] text-emerald-300">
                  Résiliation à tout moment. Paiement sécurisé via Stripe.
                </p>
              </div>
            </div>
          </div>

          {/* Orientation par profil */}
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/faq-professeurs"
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 transition"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Professeurs
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-50">
                Je veux cadrer l’usage en classe
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Voir la FAQ professeurs (cadre, usages, préparation, anti-triche).
              </p>
            </Link>

            <Link
              href="/faq-parents"
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 transition"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Parents
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-50">
                Je veux aider sans faire à la place
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Voir la FAQ parents (méthode, suivi, autonomie, rassurance).
              </p>
            </Link>

            <Link
              href="/faq-administration"
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 transition"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Établissements
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-50">
                Je veux une approche encadrée
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Voir la FAQ établissements (pilote, charte, gouvernance).
              </p>
            </Link>
          </div>

          {/* Mini navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href="#plans"
              className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-700"
            >
              Voir les offres
            </a>
            <a
              href="#pourquoi"
              className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-700"
            >
              Pourquoi EleveAI
            </a>
            <a
              href="#etablissements"
              className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-700"
            >
              Établissements
            </a>
            <a
              href="#temoignages"
              className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-700"
            >
              Témoignages
            </a>
            <a
              href="#faq"
              className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-700"
            >
              Questions fréquentes
            </a>
            <Link
              href="/sponsor"
              className="inline-flex items-center rounded-full border border-sky-600/60 bg-sky-900/20 px-3 py-1 text-xs text-sky-100 hover:bg-sky-900/35"
            >
              Soutenir EleveAI
            </Link>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        {/* ✅ AJOUT MINIMAL : TABLEAU COMPARATIF (lecture rapide) */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Lecture rapide
              </p>
              <h2 className="text-base sm:text-lg font-semibold text-slate-50">
                Comparer les offres en 10 secondes
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                Un tableau simple pour décider vite. Les cartes détaillées sont juste en dessous.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-white transition"
              >
                Essayer gratuitement →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 transition"
              >
                Établissement : devis
              </Link>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[860px] text-left border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-xs font-semibold text-slate-400 border-b border-slate-800">
                    Offre
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold text-slate-400 border-b border-slate-800">
                    Prix
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold text-slate-400 border-b border-slate-800">
                    Accès
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold text-slate-400 border-b border-slate-800">
                    Cadre pédagogique
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold text-slate-400 border-b border-slate-800">
                    Idéal pour
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold text-slate-400 border-b border-slate-800">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm text-slate-200">
                <tr>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    <span className="font-semibold text-slate-50">Découverte</span>
                  </td>

                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    <span className="font-semibold text-slate-50">0 €</span>
                  </td>

                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    ✅ Essentiel · {QUOTAS.EMAIL_FREE_DAILY} essais / jour
                  </td>

                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    ✅ Prompts guidés · 🚫 Pas d’historique
                  </td>

                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    Découvrir et tester
                  </td>

                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    <Link
                      href="/auth/signup"
                      className="text-xs font-semibold text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
                    >
                      Créer un compte →
                    </Link>
                  </td>
                </tr>


                <tr>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    <span className="font-semibold text-emerald-200">Abonnement</span>
                    <span className="ml-2 inline-flex items-center rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                      Recommandé
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    <span className="font-semibold text-slate-50">5,95 € / mois</span>
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    ✅ Complet (élèves / profs / parents)
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    ✅ Traces + historique complet
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    Usage régulier
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    {stripeOk ? (
                      <a
                        href={`${STRIPE_CHECKOUT_URL}?plan=${encodeURIComponent(
                          planQueryValue("Abonnement EleveAI")
                        )}`}
                        className="text-xs font-semibold text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
                      >
                        S’abonner →
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Stripe en cours
                      </span>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    <span className="font-semibold text-sky-200">Établissement</span>
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    <span className="font-semibold text-slate-50">Sur devis</span>
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    ✅ Multi-classes (selon pilote)
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    ✅ Charte + gouvernance (cadre IA-friendly)
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    Collèges / Lycées
                  </td>
                  <td className="px-3 py-3 text-xs border-b border-slate-900">
                    <Link
                      href="/contact"
                      className="text-xs font-semibold text-sky-200 underline underline-offset-4 hover:text-sky-100"
                    >
                      Demander un devis →
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            NB : le tableau sert à décider vite ; les cartes ci-dessous détaillent chaque offre (inclus, idéal pour, etc.).
          </p>
        </div>

        {/* (le reste de ton code est inchangé) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isFree = plan.kind === "free";
            const isSponsor = plan.kind === "sponsor";
            const isSub = plan.kind === "sub";

            const canCheckout = isFree || isSponsor || (isSub && stripeOk);

            const ctaText =
              plan.ctaLabel ?? (isFree ? "Créer un compte gratuit" : "Choisir");

            const href = isFree
              ? "/auth/signup"
              : isSponsor
              ? "/sponsor"
              : stripeOk && plan.checkoutUrl
              ? `${plan.checkoutUrl}?plan=${encodeURIComponent(
                  planQueryValue(plan.name)
                )}`
              : "#";

            const cardBorder =
              isSponsor
                ? "border-sky-600/60"
                : plan.highlight
                ? "border-emerald-500/70"
                : "border-slate-800";

            const cardShadow =
              plan.highlight
                ? "shadow-lg shadow-emerald-500/20"
                : isSponsor
                ? "shadow-lg shadow-sky-500/10"
                : "";

            return (
              <div
                key={plan.name}
                className={[
                  "relative rounded-2xl border bg-slate-900/60 p-5 sm:p-6 flex flex-col gap-4",
                  cardBorder,
                  cardShadow,
                ].join(" ")}
              >
                {/* Badges */}
                {plan.highlight && (
                  <div className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-950 shadow">
                    Recommandé
                  </div>
                )}
                {isSponsor && !plan.highlight && (
                  <div className="absolute -top-3 right-4 rounded-full bg-sky-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-950 shadow">
                    Soutien
                  </div>
                )}

                {/* En-tête */}
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-slate-50">
                    {plan.name}
                  </h2>
                  <p
                    className={[
                      "text-2xl font-bold",
                      isSponsor ? "text-sky-300" : "text-emerald-300",
                    ].join(" ")}
                  >
                    {plan.price}
                  </p>
                  <p className="text-xs text-slate-400">{plan.usesMonth}</p>
                  {plan.retention && (
                    <p className="text-[11px] text-slate-500">{plan.retention}</p>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300">{plan.description}</p>

                {/* Inclus */}
                {plan.includes && plan.includes.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs font-semibold text-slate-400 mb-1">
                      Inclus :
                    </p>
                    <ul className="text-xs text-slate-300 space-y-0.5">
                      {plan.includes.map((x) => (
                        <li key={x}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Idéal pour */}
                <div className="mt-1">
                  <p className="text-xs font-semibold text-slate-400 mb-1">
                    Idéal pour :
                  </p>
                  <ul className="text-xs text-slate-300 space-y-0.5">
                    {plan.idealFor.map((who) => (
                      <li key={who}>• {who}</li>
                    ))}
                  </ul>
                </div>

                {plan.footnote && (
                  <p
                    className={[
                      "text-[11px]",
                      isSponsor ? "text-sky-200/90" : "text-emerald-200/90",
                    ].join(" ")}
                  >
                    {plan.footnote}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-4 flex flex-col gap-2">
                  {isFree ? (
                    <Link
                      href={href}
                      className="inline-flex items-center justify-center rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white transition"
                    >
                      {ctaText}
                    </Link>
                  ) : canCheckout ? (
                    isSub && !stripeOk ? (
                      <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed">
                        Paiement Stripe en cours d’activation
                      </span>
                    ) : (
                      <Link
                        href={href}
                        prefetch={false}
                        className={[
                          "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
                          plan.highlight
                            ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                            : isSponsor
                            ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
                            : "bg-slate-800 text-slate-100 hover:bg-slate-700",
                        ].join(" ")}
                      >
                        {ctaText}
                      </Link>
                    )
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed">
                      Indisponible
                    </span>
                  )}

                  {isSponsor && (
                    <Link
                      href="/sponsor"
                      className="inline-flex items-center justify-center text-xs text-sky-200 underline underline-offset-4 hover:text-sky-100"
                    >
                      Voir la page Sponsor (transparence) →
                    </Link>
                  )}

                  <p className="text-[11px] text-slate-500">
                    Pas de surfacturation surprise : tu gardes le contrôle.
                    L’objectif est une IA utile et rassurante.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* DIFFÉRENCIATION POSITIVE */}
        <div
          id="pourquoi"
          className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Pourquoi EleveAI
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-50">
                Une IA autorisée, mais encadrée (et utile au quotidien)
              </h3>
              <p className="text-sm text-slate-200 max-w-2xl">
                EleveAI n’est pas “juste une IA”. C’est une méthode : guider,
                exiger des traces, développer l’esprit critique — et rester simple
                pour les familles et les professeurs.
              </p>
            </div>

            <Link
              href="/atelier-IA"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Voir la méthode (Atelier-IA) →
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-600/30 bg-slate-950/40 p-4">
              <p className="text-sm font-semibold text-slate-50">
                🛡️ Anti-triche intégré
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-300">
                <li>• ✅ Prompts guidés (pas “fais mon devoir”)</li>
                <li>• ✅ Exigence de justification et d’étapes</li>
                <li>• ✅ Traces réutilisables pour apprendre</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-600/30 bg-slate-950/40 p-4">
              <p className="text-sm font-semibold text-slate-50">
                🧠 Apprendre (vraiment)
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-300">
                <li>• ✅ Comprendre avant d’écrire la réponse</li>
                <li>• ✅ Détection d’erreurs fréquentes</li>
                <li>• ✅ Reformulation, exemples, entraînement</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-600/30 bg-slate-950/40 p-4">
              <p className="text-sm font-semibold text-slate-50">
                🤝 Rassurant pour l’école
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-300">
                <li>• ✅ Cadre compatible “IA-friendly”</li>
                <li>• ✅ Simple pour parents / profs</li>
                <li>• ✅ Transparence sur l’usage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ÉTABLISSEMENTS */}
        <div
          id="etablissements"
          className="mt-10 rounded-2xl border border-sky-700/50 bg-sky-900/15 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">
                Établissements
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-50">
                Tester EleveAI en mode pilote (cadre + charte + gouvernance)
              </h3>
              <p className="text-sm text-slate-200 max-w-2xl">
                Pour un collège/lycée : on démarre par une phase pilote courte,
                puis on ajuste selon vos contraintes (règlement intérieur, usages
                autorisés, niveaux, matières, traces demandées).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/offre-pilote"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition"
              >
                Voir l’offre pilote →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition"
              >
                Demander un devis
              </Link>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-sky-200/80">
            Objectif : une IA utile et rassurante, conforme au cadre d’usage en
            éducation (usage autorisé si encadré).{" "}
            <Link
              href="/faq-administration"
              className="underline underline-offset-4 hover:text-sky-100"
            >
              En savoir plus →
            </Link>
          </p>
        </div>

        {/* TÉMOIGNAGES */}
        <div
          id="temoignages"
          className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Confiance
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-50">
                Ce que les utilisateurs apprécient
              </h3>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Donner un retour →
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-emerald-600/30 bg-slate-950/40 p-4"
              >
                <p className="text-sm text-slate-100">“{t.quote}”</p>
                <p className="mt-3 text-xs text-emerald-200 font-semibold">
                  {t.author}
                </p>
                <p className="text-[11px] text-slate-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div
          id="faq"
          className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6"
        >
          <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-4">
            Questions fréquentes
          </h2>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">
                Je peux résilier quand je veux ?
              </p>
              <p className="mt-1">Oui, à tout moment.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">
                C’est quoi une “utilisation” ?
              </p>
              <p className="mt-1">Un prompt + une réponse IA.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">Le sponsor change quoi ?</p>
              <p className="mt-1">
                Rien d’obligatoire : c’est un soutien volontaire.{" "}
                <Link
                  href="/sponsor"
                  className="text-sky-200 underline underline-offset-4 hover:text-sky-100"
                >
                  En savoir plus →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
