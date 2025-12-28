// app/tarifs/page.tsx
"use client";

import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  reqMonth: string;
  highlight?: boolean;
  description: string;
  idealFor: string[];
  checkoutUrl?: string;
  ctaLabel?: string;
};

const STRIPE_CHECKOUT_URL = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;

const PLANS: Plan[] = [
  {
    name: "Découverte",
    price: "0 € / mois",
    reqMonth: "≈ 30 requêtes / mois",
    description:
      "Pour tester EleveAI tranquillement, sans carte bancaire et avec un petit quota de requêtes.",
    idealFor: [
      "Curieux qui découvrent l’IA",
      "Élève ou parent qui veut essayer",
      "Prof qui teste l’outil avant de s’abonner",
    ],
    ctaLabel: "Créer un compte gratuit",
  },
  {
    name: "Starter",
    price: "5 € / mois",
    reqMonth: "≈ 100 requêtes / mois",
    description: "Pour utiliser EleveAI de temps en temps, sans se prendre la tête.",
    idealFor: ["Élève motivé", "Parent curieux", "Auto-formation légère"],
    checkoutUrl: STRIPE_CHECKOUT_URL,
  },
  {
    name: "Essentiel",
    price: "9 € / mois",
    reqMonth: "≈ 300 requêtes / mois",
    highlight: true,
    description:
      "Le bon équilibre pour un usage régulier : cours, devoirs, mails, révisions.",
    idealFor: ["Professeur", "Parent très impliqué", "Étudiant en formation"],
    checkoutUrl: STRIPE_CHECKOUT_URL,
  },
  {
    name: "Avancé",
    price: "20 € / mois",
    reqMonth: "≈ 1 000 requêtes / mois",
    description:
      "Pour ceux qui utilisent l’IA tous les jours dans leur pratique scolaire ou professionnelle.",
    idealFor: ["Prof très utilisateur", "Tuteur / coach scolaire", "AED / vie scolaire"],
    checkoutUrl: STRIPE_CHECKOUT_URL,
  },
  {
    name: "Pro",
    price: "50 € / mois",
    reqMonth: "≈ 4 000 requêtes / mois",
    description: "Pour une équipe ou un groupe qui souhaite centraliser son usage.",
    idealFor: [
      "Équipe pédagogique réduite",
      "Service vie scolaire / direction",
      "Petite structure de soutien scolaire",
    ],
    checkoutUrl: STRIPE_CHECKOUT_URL,
  },
  {
    name: "Établissement",
    price: "95–149 € / mois",
    reqMonth: "Plafond global d’établissement",
    description:
      "Pour un collège ou un lycée : accès pour élèves, profs, CPE, AED et direction. Le tarif s’adapte au volume et au nombre de professeurs, avec un plafond garanti à 149 €.",
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
                  Des tarifs simples, basés sur le{" "}
                  <strong>nombre de requêtes par mois</strong>.{" "}
                  Choisis la formule qui correspond à ton usage réel : tu peux la faire évoluer à tout moment.
                </p>


                <p className="text-xs sm:text-sm text-slate-400">
                  Une offre <strong>0 €</strong> est disponible pour tester EleveAI
                  avec un quota limité, sans carte bancaire.
                </p>

                <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-200">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1">
                    <span>✅</span>
                    <span>Support mail prioritaire dès Essentiel</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
                    <span>🔒</span>
                    <span>RGPD & comptes enfants respectés</span>
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

              {/* Bloc “devis” (une seule fois) */}
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
              (plan.name === "Découverte"
                ? "Créer un compte gratuit"
                : "Choisir ce plan via Stripe");

            const href =
              plan.name === "Découverte"
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
                  <p className="text-xs text-slate-400">{plan.reqMonth}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300">{plan.description}</p>

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

                {/* CTA */}
                <div className="mt-4 flex flex-col gap-2">
                  {plan.name === "Découverte" ? (
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
                    Quotas mensuels. En cas de dépassement : alerte, puis blocage ou
                    bascule vers l’offre supérieure (selon les règles de ton compte).
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Garanties (une seule fois) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-2">
            <h3 className="text-base font-semibold text-slate-100">Clarté & sécurité</h3>
            <p className="text-sm text-slate-300">
              Conformité RGPD, bonnes pratiques pour les données élèves, et cadre
              pédagogique “anti-triche”.
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
              Modèles prêts à l’emploi, conseils d’usage, et ateliers rapides pour
              lancer une équipe.
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
              Aucun engagement : un simple échange + un code établissement.
            </p>

            <ul className="text-sm text-slate-200 space-y-1 text-left max-w-xl">
              <li>✓ Accès complet pour élèves, parents, profs et personnels</li>
              <li>✓ Plafonds de requêtes élargis</li>
              <li>✓ Accompagnement au lancement</li>
              <li>✓ Tableau de bord de suivi</li>
              <li>✓ Rapport final d’usage</li>
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
            Pensée pour un <strong>collège ou un lycée entier</strong> : professeurs,
            vie scolaire, direction, et éventuellement classes pilotes élèves.
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Prix plancher : <strong>95 € / mois</strong>.</li>
            <li>
              • Le tarif peut monter jusqu’à <strong>149 € / mois</strong> selon le{" "}
              <strong>nombre de professeurs</strong> et le <strong>volume global</strong>.
            </li>
            <li>• Le montant est <strong>toujours plafonné</strong> à 149 €.</li>
          </ul>
          <p className="text-xs text-emerald-200">
            Un petit établissement peu utilisateur reste proche de 95 €. Un gros
            établissement intensif approche le plafond, sans jamais le dépasser.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center text-xs sm:text-sm text-emerald-300 hover:text-emerald-200 mt-1"
          >
            Discuter d’une offre établissement → 
          </Link>
        </div>

        {/* Formule annuelle */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-50">
            Et la formule annuelle ?
          </h2>
          <p className="text-sm text-slate-300">
            Une formule annuelle avec remise sera proposée pour les utilisateurs réguliers
            (profs, parents, tuteurs, établissements).
          </p>
          <p className="text-xs text-slate-500">
            L’esprit reste le même : vous choisissez surtout votre{" "}
            <strong>volume de requêtes</strong>, pas une étiquette de profil.
          </p>
        </div>

        {/* Mini FAQ (simple et efficace) */}
        <div id="faq" className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6">
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
                de garder une formule adaptée à ton volume réel.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">
                Que se passe-t-il si je dépasse mon quota ?
              </p>
              <p className="mt-1">
                Tu reçois une alerte, puis un blocage ou une proposition de bascule (selon
                tes paramètres). Pas de “sur-facturation surprise”.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-semibold text-slate-100">
                L’offre Découverte coûte vraiment 0 € ?
              </p>
              <p className="mt-1">
                Oui : pas de carte bancaire, quota limité. Idéal pour tester.
              </p>
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
        )} */}
      </section>
    </main>
  );
}
