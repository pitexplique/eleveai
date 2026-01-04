// app/tarifs/page.tsx
"use client";

import Link from "next/link";

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

const STRIPE_CHECKOUT_URL = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;

/**
 * Modèle 3 offres :
 * - Gratuit : découverte (quota faible)
 * - Abonnement : 5,95€/mois (offre principale)
 * - Sponsor : soutien type crowdfunding (même accès que l'abonnement, + reconnaissance)
 *
 * NOTE : Pour Stripe, on passe un query param `plan=...` vers ton checkout.
 * Tu peux ensuite router vers un Price Stripe différent selon le plan.
 */
const PLANS: Plan[] = [
  {
    kind: "free",
    name: "Gratuit — Découverte",
    price: "0 €",
    usesMonth: "5 utilisations / mois",
    description:
      "Pour découvrir EleveAI et sa méthode. Suffisant pour tester, pas pour un usage régulier.",
    includes: [
      "✅ Accès aux presets essentiels (élèves + profs)",
      "🛡️ Cadre anti-triche (prompts guidés, usage responsable)",
      "🧾 Historique conservé 1 mois",
      "🚫 Quota découverte (pas d’usage intensif)",
    ],
    retention: "Historique : 1 mois",
    idealFor: ["Curieux", "Élèves / parents : tester", "Profs : essayer l’UX"],
    ctaLabel: "Créer un compte gratuit",
  },
  {
    kind: "sub",
    name: "Abonnement EleveAI",
    price: "5,95 € / mois",
    usesMonth: "Accès complet (utilisations raisonnables)",
    highlight: true,
    description:
      "L’offre simple : un seul tarif pour utiliser EleveAI régulièrement, avec historique complet et cadre éducatif.",
    includes: [
      "✅ Accès aux espaces (élèves / profs / parents)",
      "🧩 Presets officiels + favoris",
      "🛡️ Cadre anti-triche + traces",
      "🧾 Historique complet",
      "📬 Support par email",
    ],
    retention: "Historique : complet",
    idealFor: ["Élèves réguliers", "Parents", "Professeurs", "Soutien scolaire"],
    checkoutUrl: STRIPE_CHECKOUT_URL,
    ctaLabel: "S’abonner via Stripe",
    footnote: "Résiliable à tout moment. Paiement sécurisé via Stripe.",
  },
  {
    kind: "sponsor",
    name: "Sponsor — Encourager le projet",
    price: "À partir de 9,95 € / mois",
    usesMonth: "Soutien crowdfunding (au choix)",
    description:
      "Pour celles et ceux qui veulent soutenir EleveAI et accélérer le développement (contenus, sécurité, maintenance).",
    includes: [
      "❤️ Soutien direct au projet (crowdfunding)",
      "🏷️ Badge “Sponsor” sur ton profil (optionnel)",
      "📬 Accès aux nouveautés en avant-première (newsletter)",
      "🙏 Ton prénom dans la page “Merci” (optionnel)",
    ],
    retention: "Historique : complet",
    idealFor: [
      "Parents / profs qui encouragent",
      "Anciens élèves",
      "Soutiens du projet",
    ],
    checkoutUrl: STRIPE_CHECKOUT_URL,
    ctaLabel: "Devenir Sponsor via Stripe",
    footnote:
      "Le sponsoring n’est pas nécessaire pour utiliser EleveAI : c’est un soutien volontaire.",
  },
];

function planQueryValue(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[’']/g, "")
    .replace(/[—–-]/g, "_");
}

export default function TarifsPage() {
  const stripeOk =
    typeof STRIPE_CHECKOUT_URL === "string" && STRIPE_CHECKOUT_URL.trim().length > 0;

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
                  <strong>devenir Sponsor</strong> pour encourager le projet.{" "}
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
                  Usage, établissement, contraintes : écris-nous et on te répond rapidement.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow hover:bg-emerald-400"
                  >
                    Écrire à l’équipe
                  </Link>
                </div>
                <p className="text-[11px] text-emerald-300">
                  Résiliation à tout moment. Paiement sécurisé via Stripe.
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Nouveau : Orientation par profil (conversion + SEO) */}
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
              href="#faq"
              className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-700"
            >
              Questions fréquentes
            </a>
            <Link
              href="/offre-pilote"
              className="inline-flex items-center rounded-full border border-sky-700/60 bg-sky-900/20 px-3 py-1 text-xs text-sky-100 hover:bg-sky-900/35"
            >
              Offre pilote (établissements)
            </Link>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isFree = plan.kind === "free";
            const canCheckout = Boolean(plan.checkoutUrl && stripeOk);

            const ctaText =
              plan.ctaLabel ?? (isFree ? "Créer un compte gratuit" : "Choisir via Stripe");

            const href = isFree
              ? "/auth/signup"
              : `${plan.checkoutUrl}?plan=${encodeURIComponent(planQueryValue(plan.name))}`;

            const cardBorder =
              plan.kind === "sponsor"
                ? "border-sky-600/60"
                : plan.highlight
                ? "border-emerald-500/70"
                : "border-slate-800";

            const cardShadow =
              plan.highlight
                ? "shadow-lg shadow-emerald-500/20"
                : plan.kind === "sponsor"
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
                {plan.kind === "sponsor" && !plan.highlight && (
                  <div className="absolute -top-3 right-4 rounded-full bg-sky-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-950 shadow">
                    Soutien
                  </div>
                )}

                {/* En-tête */}
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-slate-50">{plan.name}</h2>
                  <p
                    className={[
                      "text-2xl font-bold",
                      plan.kind === "sponsor" ? "text-sky-300" : "text-emerald-300",
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
                    <p className="text-xs font-semibold text-slate-400 mb-1">Inclus :</p>
                    <ul className="text-xs text-slate-300 space-y-0.5">
                      {plan.includes.map((x) => (
                        <li key={x}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Idéal pour */}
                <div className="mt-1">
                  <p className="text-xs font-semibold text-slate-400 mb-1">Idéal pour :</p>
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
                      plan.kind === "sponsor" ? "text-sky-200/90" : "text-emerald-200/90",
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
                    <Link
                      href={href}
                      prefetch={false}
                      className={[
                        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
                        plan.highlight
                          ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                          : plan.kind === "sponsor"
                          ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
                          : "bg-slate-800 text-slate-100 hover:bg-slate-700",
                      ].join(" ")}
                    >
                      {ctaText}
                    </Link>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed">
                      Paiement Stripe en cours d’activation
                    </span>
                  )}

                  <p className="text-[11px] text-slate-500">
                    Pas de surfacturation surprise : tu gardes le contrôle. L’objectif est une IA utile et rassurante.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA : Pourquoi nos tarifs sont justes */}
        <div className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Transparence
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-50">
                Pourquoi nos tarifs sont justes
              </h3>
              <p className="text-sm text-slate-200 max-w-2xl">
                Pas de pub, pas de revente de données. Un cadre éducatif anti-triche conçu pour l’école,
                et une expérience claire, sans surprise.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/pourquoi-nos-tarifs-sont-justes"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Lire la page →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition"
              >
                Poser une question
              </Link>
            </div>
          </div>
        </div>

        {/* Garanties */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-2">
            <h3 className="text-base font-semibold text-slate-100">Clarté & sécurité</h3>
            <p className="text-sm text-slate-300">
              Conformité RGPD, bonnes pratiques pour les données élèves, et cadre pédagogique “anti-triche”.
            </p>
            <p className="text-xs text-slate-500">
              Objectif : une IA utile et rassurante, sans surprise de facturation.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-600/60 bg-emerald-500/10 p-5 space-y-2">
            <h3 className="text-base font-semibold text-emerald-200">Accompagnement humain</h3>
            <p className="text-sm text-slate-200">
              Presets prêts à l’emploi, conseils d’usage, et aide si tu veux cadrer un usage “équipe / établissement”.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
            >
              Nous écrire →
            </Link>
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
              <p className="font-semibold text-slate-100">Je peux résilier quand je veux ?</p>
              <p className="mt-1">Oui, à tout moment.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">C’est quoi une “utilisation” ?</p>
              <p className="mt-1">Un prompt + une réponse IA.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">Le sponsor change quoi ?</p>
              <p className="mt-1">
                Rien d’obligatoire : c’est un soutien volontaire pour encourager le projet.
                L’accès “utile” est déjà dans l’abonnement standard.
              </p>
            </div>

            {/* ✅ Nouveau : liens FAQ par profil */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">Je veux la FAQ adaptée à mon profil</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <Link
                  href="/faq-professeurs"
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-slate-200 hover:bg-slate-900"
                >
                  FAQ professeurs →
                </Link>
                <Link
                  href="/faq-parents"
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-slate-200 hover:bg-slate-900"
                >
                  FAQ parents →
                </Link>
                <Link
                  href="/faq-administration"
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-slate-200 hover:bg-slate-900"
                >
                  FAQ établissements →
                </Link>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-400">
              Tu veux comprendre le “pourquoi” ?{" "}
              <Link
                href="/pourquoi-nos-tarifs-sont-justes"
                className="text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
              >
                Lire “Pourquoi nos tarifs sont justes”
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
