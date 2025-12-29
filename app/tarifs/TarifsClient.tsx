// app/tarifs/page.tsx
"use client";

import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  usesMonth: string; // "utilisations / mois"
  highlight?: boolean;
  description: string;
  includes?: string[];
  idealFor: string[];
  checkoutUrl?: string;
  ctaLabel?: string;
  footnote?: string;
  retention?: string; // ex: "Historique : 1 mois"
};

const STRIPE_CHECKOUT_URL = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;

/**
 * Politique validée (version PRO + vocabulaire clair) :
 * - “Utilisation” = une demande envoyée à l’IA (un prompt + une réponse).
 * - Gratuit : 5 utilisations / mois, historique conservé 1 mois.
 * - Starter (5€) : 100 utilisations / mois, usage libre + historique complet.
 * - Essentiel (9€) : 300 utilisations / mois, usage régulier.
 * - Annuel (79€/an) : 300 utilisations / mois (équivalent Essentiel) + remise.
 * - Avancé (20€) : 1 000 utilisations / mois.
 * - Pro (50€) : 4 000 utilisations / mois.
 * - Établissement : 95–149€/mois, plafond global (plafonné à 149€).
 */
const PLANS: Plan[] = [
  {
    name: "Gratuit — Découverte",
    price: "0 €",
    usesMonth: "5 utilisations / mois",
    description:
      "Cette formule sert uniquement à découvrir EleveAI et sa méthode pédagogique. Suffisant pour tester, pas pour un usage régulier.",
    includes: [
      "✅ Accès aux presets essentiels (élèves + profs)",
      "🛡️ Cadre anti-triche (prompts guidés, usage responsable)",
      "🧾 Historique conservé 1 mois",
      "🚫 Quota découverte (pas d’usage intensif)",
    ],
    retention: "Historique : 1 mois",
    idealFor: [
      "Élève / parent : comprendre la méthode",
      "Prof : tester avant abonnement",
      "Curieux : vérifier l’UX",
    ],
    ctaLabel: "Créer un compte gratuit",
  },
  {
    name: "Starter",
    price: "5 € / mois",
    usesMonth: "100 utilisations / mois",
    description:
      "Pour utiliser EleveAI de temps en temps, en toute liberté, avec l’enregistrement de toutes tes utilisations.",
    includes: [
      "⭐ Usage libre (dans la limite du quota)",
      "🧾 Historique complet (toutes tes utilisations sont conservées)",
      "📌 Presets officiels + favoris",
      "🛡️ Cadre anti-triche conservé",
    ],
    retention: "Historique : complet",
    idealFor: ["Élève motivé", "Parent curieux", "Auto-formation légère"],
    checkoutUrl: STRIPE_CHECKOUT_URL,
    ctaLabel: "Choisir Starter via Stripe",
  },
  {
    name: "Essentiel",
    price: "9 € / mois",
    usesMonth: "300 utilisations / mois",
    highlight: true,
    description:
      "Le bon équilibre pour un usage régulier : entraînement, révisions, devoirs IA-friendly, et traces claires.",
    includes: [
      "✅ Usage régulier (quota confortable)",
      "🧾 Historique complet + traces",
      "🧩 Presets officiels + presets personnels",
      "📬 Support mail prioritaire",
      "🛡️ Cadre anti-triche conservé",
    ],
    retention: "Historique : complet",
    idealFor: ["Professeur", "Parent très impliqué", "Élève autonome / régulier"],
    checkoutUrl: STRIPE_CHECKOUT_URL,
    ctaLabel: "Choisir Essentiel via Stripe",
    footnote:
      "Recommandé si tu utilises EleveAI chaque semaine avec un vrai suivi.",
  },
  {
    name: "Annuel",
    price: "79 € / an",
    usesMonth: "300 utilisations / mois",
    description:
      "Pour les utilisateurs réguliers : même esprit que l’Essentiel, avec une remise et plus de simplicité.",
    includes: [
      "✅ 300 utilisations / mois (comme Essentiel)",
      "💸 Remise vs mensuel",
      "🧾 Historique complet + traces",
      "📬 Support prioritaire",
    ],
    retention: "Historique : complet",
    idealFor: ["Profs", "Parents", "Tuteurs", "Utilisateurs réguliers"],
    checkoutUrl: STRIPE_CHECKOUT_URL,
    ctaLabel: "Choisir Annuel via Stripe",
  },
  {
    name: "Avancé",
    price: "20 € / mois",
    usesMonth: "1 000 utilisations / mois",
    description:
      "Pour celles et ceux qui utilisent l’IA tous les jours, tout en gardant un cadre éducatif anti-triche.",
    includes: [
      "🚀 1 000 utilisations / mois",
      "🧾 Historique complet + organisation",
      "📬 Support prioritaire",
    ],
    retention: "Historique : complet",
    idealFor: ["Prof très utilisateur", "Tuteur / coach scolaire", "AED / vie scolaire"],
    checkoutUrl: STRIPE_CHECKOUT_URL,
    ctaLabel: "Choisir Avancé via Stripe",
  },
  {
    name: "Pro",
    price: "50 € / mois",
    usesMonth: "4 000 utilisations / mois",
    description:
      "Pour une petite équipe ou structure qui souhaite centraliser son usage (et garder des traces propres).",
    includes: [
      "🏷️ 4 000 utilisations / mois",
      "👥 Usage équipe / groupe (selon configuration)",
      "📊 Suivi global (selon périmètre)",
      "📬 Support prioritaire",
    ],
    retention: "Historique : complet",
    idealFor: [
      "Petite structure de soutien scolaire",
      "Association / tiers-lieu éducatif",
      "Équipe pédagogique réduite",
    ],
    checkoutUrl: STRIPE_CHECKOUT_URL,
    ctaLabel: "Choisir Pro via Stripe",
  },
  {
    name: "Établissement",
    price: "95–149 € / mois",
    usesMonth: "Plafond global d’établissement",
    description:
      "Pour un collège ou un lycée : profs, vie scolaire, direction et classes pilotes élèves. Tarif ajusté au volume, plafonné à 149 €.",
    includes: [
      "🏫 Accès pour la communauté éducative",
      "📈 Plafonds globaux adaptés",
      "🚀 Accompagnement au lancement",
      "📊 Suivi d’usage (selon périmètre)",
    ],
    idealFor: [
      "Collège pilote",
      "Lycée",
      "Établissement en expérimentation IA",
      "Communauté éducative complète",
    ],
    checkoutUrl: STRIPE_CHECKOUT_URL,
    ctaLabel: "Demander une offre établissement",
  },
];

function planQueryValue(name: string) {
  return name.toLowerCase().replace(/\s+/g, "_").replace(/[’']/g, "");
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
                  Des tarifs simples : tu choisis selon ton{" "}
                  <strong>nombre d’utilisations mensuelles</strong>.{" "}
                  <span className="text-slate-400">
                    (Une utilisation = une demande envoyée à l’IA : un prompt + une réponse.)
                  </span>
                </p>

                <p className="text-xs sm:text-sm text-slate-400">
                  ✅ Une offre <strong>Gratuite</strong> existe :{" "}
                  <strong>5 utilisations / mois</strong> (historique conservé 1 mois).
                  C’est une formule de <strong>découverte</strong>, pas un usage régulier.
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
                    <span>Paiement Stripe (pas de surprise)</span>
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

              {/* Bloc “devis” */}
              <div className="rounded-2xl border border-emerald-600/70 bg-emerald-500/10 p-4 space-y-2 shadow-lg shadow-emerald-500/10">
                <p className="text-sm font-semibold text-emerald-200">
                  Besoin d’un devis clair ?
                </p>
                <p className="text-xs text-slate-200">
                  Écris-nous ton besoin (profil, volume estimé, établissement). Réponse
                  rapide avec la formule adaptée.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow hover:bg-emerald-400"
                  >
                    Écrire à l’équipe
                  </Link>
                  <Link
                    href="#offre-etablissement"
                    className="inline-flex items-center justify-center rounded-full border border-emerald-400/80 bg-slate-900/80 px-4 py-2 text-[11px] font-semibold text-emerald-200 hover:border-emerald-300"
                  >
                    Voir l’offre établissement
                  </Link>
                </div>
                <p className="text-[11px] text-emerald-300">
                  Paiement par carte (Stripe). Mandat administratif possible sur demande.
                </p>
              </div>
            </div>
          </div>

          {/* Mini navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href="#plans"
              className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-700"
            >
              Voir les formules
            </a>
            <a
              href="#faq"
              className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-700"
            >
              Questions fréquentes
            </a>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const canCheckout = Boolean(plan.checkoutUrl && stripeOk);

            const ctaText =
              plan.ctaLabel ??
              (plan.name.startsWith("Gratuit")
                ? "Créer un compte gratuit"
                : "Choisir ce plan via Stripe");

            const href =
              plan.name.startsWith("Gratuit")
                ? "/auth/signup"
                : `${plan.checkoutUrl}?plan=${encodeURIComponent(planQueryValue(plan.name))}`;

            return (
              <div
                key={plan.name}
                className={[
                  "relative rounded-2xl border bg-slate-900/60 p-5 sm:p-6 flex flex-col gap-4",
                  plan.highlight
                    ? "border-emerald-500/70 shadow-lg shadow-emerald-500/20"
                    : "border-slate-800",
                ].join(" ")}
              >
                {/* Badge recommandé */}
                {plan.highlight && (
                  <div className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-950 shadow">
                    Le + populaire
                  </div>
                )}

                {/* En-tête */}
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-slate-50">{plan.name}</h2>
                  <p className="text-2xl font-bold text-emerald-300">{plan.price}</p>
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
                  <p className="text-[11px] text-emerald-200/90">{plan.footnote}</p>
                )}

                {/* CTA */}
                <div className="mt-4 flex flex-col gap-2">
                  {plan.name.startsWith("Gratuit") ? (
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
                    Pas de surfacturation surprise : alerte avant la limite, puis blocage
                    ou proposition de passer à l’offre supérieure (selon les règles de ton
                    compte).
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
                Pas de pub, pas de revente de données. Des plafonds clairs (pas de facture
                surprise) et un cadre pédagogique anti-triche conçu pour l’école.
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
              Conformité RGPD, bonnes pratiques pour les données élèves, et cadre pédagogique
              “anti-triche”.
            </p>
            <p className="text-xs text-slate-500">
              Objectif : une IA utile et rassurante, sans surprise de facturation.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-600/60 bg-emerald-500/10 p-5 space-y-2">
            <h3 className="text-base font-semibold text-emerald-200">
              Accompagnement humain
            </h3>
            <p className="text-sm text-slate-200">
              Presets prêts à l’emploi, conseils d’usage, et aide au lancement pour une équipe.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
            >
              Me faire recommander une formule →
            </Link>
          </div>
        </div>

        {/* OFFRE PILOTE */}
        <div className="mt-10 rounded-2xl border border-emerald-600/60 bg-slate-950/70 px-4 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-300 flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span>Offre Pilote – Collèges & Lycées</span>
            </h2>

            <p className="text-sm text-slate-200 max-w-2xl">
              Testez EleveAI dans votre établissement pendant <strong>8 semaines</strong>.
              Aucun engagement : un échange + un code établissement.
            </p>

            <ul className="text-sm text-slate-200 space-y-1 text-left max-w-xl">
              <li>✓ Accès cadré pour la communauté éducative</li>
              <li>✓ Plafonds d’utilisations élargis</li>
              <li>✓ Accompagnement au lancement</li>
              <li>✓ Tableau de bord de suivi (selon périmètre)</li>
              <li>✓ Rapport final d’usage (si souhaité)</li>
            </ul>

            <Link
              href="/offre-pilote"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Devenir établissement pilote
            </Link>
          </div>
        </div>

        {/* Offre établissement (ancre) */}
        <div
          id="offre-etablissement"
          className="mt-10 rounded-2xl border border-emerald-700/60 bg-emerald-500/5 p-5 sm:p-6 space-y-3"
        >
          <h2 className="text-base sm:text-lg font-semibold text-emerald-200">
            Offre Établissement : comment fonctionne le tarif 95–149 € ?
          </h2>
          <p className="text-sm text-slate-200">
            Pensée pour un <strong>collège ou un lycée</strong> : professeurs, vie scolaire,
            direction, et classes pilotes élèves.
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Prix plancher : <strong>95 € / mois</strong>.</li>
            <li>
              • Le tarif s’ajuste selon le <strong>nombre de professeurs</strong> et le{" "}
              <strong>volume global</strong>.
            </li>
            <li>
              • Il est <strong>toujours plafonné</strong> à <strong>149 € / mois</strong>.
            </li>
          </ul>
          <p className="text-xs text-emerald-200">
            Petit établissement peu utilisateur : proche de 95 €. Gros établissement très
            utilisateur : proche du plafond — sans jamais le dépasser.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center text-xs sm:text-sm text-emerald-300 hover:text-emerald-200 mt-1"
          >
            Discuter d’une offre établissement →
          </Link>
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
                Est-ce que je peux changer de formule ?
              </p>
              <p className="mt-1">
                Oui. Tu peux monter ou descendre d’offre selon ton usage. L’objectif est
                de rester sur une formule adaptée, sans payer “trop”.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">
                Que se passe-t-il si je dépasse mon quota ?
              </p>
              <p className="mt-1">
                Alerte avant la limite, puis blocage ou proposition de bascule vers l’offre
                supérieure (selon tes paramètres). Pas de surfacturation surprise.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">
                Pourquoi une offre Gratuite limitée ?
              </p>
              <p className="mt-1">
                Parce que l’IA a un coût réel. Le gratuit sert à découvrir la méthode ; les
                offres payantes financent un usage régulier (modèles IA, sécurité, maintenance).
              </p>
            </div>

            <div className="mt-4 text-xs text-slate-400">
              Tu veux comprendre le “pourquoi” derrière les quotas et le modèle ?{" "}
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

        {/* Note technique (si Stripe manque) */}
        {/*{!stripeOk && (
          <div className="mt-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
            ⚠️ Stripe Checkout non configuré : ajoute{" "}
            <code className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700 text-amber-200">
              NEXT_PUBLIC_STRIPE_CHECKOUT_URL
            </code>{" "}
            dans Vercel / env.
          </div>
        )}*/}
      </section>
    </main>
  );
}



