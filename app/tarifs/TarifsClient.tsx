// app/tarifs/TarifsClient.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const STRIPE_CHECKOUT_URL = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;

const BASE_MONTHLY_PRICE = 9.95;
const BASE_YEARLY_MONTHLY_PRICE = 6.59;
const BASE_YEARLY_TOTAL = 79;
const EXTRA_CHILD_MONTHLY = 2;
const MAX_CHILDREN = 6;

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function checkoutHref(plan: "mensuel" | "annuel", children: number) {
  if (!STRIPE_CHECKOUT_URL) return "#";

  const separator = STRIPE_CHECKOUT_URL.includes("?") ? "&" : "?";
  const params = new URLSearchParams({
    plan,
    enfants: String(children),
  });

  return `${STRIPE_CHECKOUT_URL}${separator}${params.toString()}`;
}

export default function TarifsClient() {
  const [children, setChildren] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<"mensuel" | "annuel">(
    "mensuel"
  );

  const stripeOk =
    typeof STRIPE_CHECKOUT_URL === "string" &&
    STRIPE_CHECKOUT_URL.trim().length > 0;

  const prices = useMemo(() => {
    const extraChildren = Math.max(0, children - 1);
    const extraMonthly = extraChildren * EXTRA_CHILD_MONTHLY;

    return {
      monthly: BASE_MONTHLY_PRICE + extraMonthly,
      yearlyMonthly: BASE_YEARLY_MONTHLY_PRICE + extraMonthly,
      yearlyTotal: BASE_YEARLY_TOTAL + extraMonthly * 12,
    };
  }, [children]);

  return (
    <main className="min-h-screen bg-[#eefdfb] text-[#092457]">
      <section className="bg-[#4dbd00] text-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-white px-3 py-1 text-2xl font-black tracking-tight text-[#f6bd00] shadow-sm"
              aria-label="Retour à l’accueil EleveAI"
            >
              <span className="text-[#06a9df]">E</span>LEVE<span className="text-[#00a651]">AI</span>
            </Link>

            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="flex w-full max-w-xl items-center rounded-full bg-white/95 px-4 py-2 text-sm text-slate-500 shadow-inner">
                <span className="mr-2 text-lg text-[#4dbd00]">⌕</span>
                Recherchez un niveau, une notion ou une compétence
                <span className="ml-auto text-xl text-slate-300">›</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="rounded-md bg-[#0799d8] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#008bc8]"
              >
                Connexion
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-md bg-[#dff7d9] px-4 py-2 text-sm font-semibold text-[#0783b7] hover:bg-white"
              >
                S’inscrire
              </Link>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-lg font-serif sm:text-2xl">
            <Link href="/tutor" className="hover:text-[#fff0a8]">
              Maths
            </Link>
            <Link href="/defis" className="hover:text-[#fff0a8]">
              Récompenses
            </Link>
            <Link href="/dashboard" className="hover:text-[#fff0a8]">
              Suivi des progrès
            </Link>
            <Link href="/pourquoi-nos-tarifs-sont-justes" className="hover:text-[#fff0a8]">
              Les avantages d’EleveAI
            </Link>
          </nav>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-4 py-5 text-sm sm:text-base">
          <div className="flex items-center gap-3 text-[#00a6d6]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00a6d6] font-semibold text-white">
              1
            </span>
            <span>Devenir membre</span>
          </div>
          <div className="hidden h-px w-16 bg-slate-300 sm:block" />
          <div className="flex items-center gap-3 text-[#ff9f16]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ff9f16] font-semibold">
              2
            </span>
            <span>Configurer votre compte</span>
          </div>
          <div className="hidden h-px w-16 bg-slate-300 sm:block" />
          <div className="flex items-center gap-3 text-[#00a6b8]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#00a6b8] font-semibold">
              3
            </span>
            <span>Bienvenue sur EleveAI</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-medium text-[#08265c]">
              Nombre d’enfants
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="inline-flex overflow-hidden rounded-md border border-slate-300 bg-white text-sm shadow-sm">
                <button
                  type="button"
                  onClick={() => setChildren((value) => Math.max(1, value - 1))}
                  className="h-11 w-12 text-lg text-slate-600 hover:bg-slate-50 disabled:text-slate-300"
                  disabled={children === 1}
                  aria-label="Retirer un enfant"
                >
                  -
                </button>
                <span className="flex h-11 w-16 items-center justify-center border-x border-slate-300 bg-white">
                  {children}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setChildren((value) => Math.min(MAX_CHILDREN, value + 1))
                  }
                  className="h-11 w-12 text-lg text-slate-600 hover:bg-slate-50 disabled:text-slate-300"
                  disabled={children === MAX_CHILDREN}
                  aria-label="Ajouter un enfant"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-slate-500">
                Seulement {EXTRA_CHILD_MONTHLY} €/mois pour chaque enfant supplémentaire
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#08265c]">
              Choisissez une formule
            </h2>

            <div className="mt-5 grid overflow-hidden rounded-md bg-gradient-to-r from-[#c8f6dc] to-[#b9eeea] p-5 shadow-sm lg:grid-cols-[1fr_1fr_1.15fr] lg:gap-5">
              <article className="mb-5 overflow-hidden rounded-md bg-white shadow-[0_2px_8px_rgba(0,0,0,0.28)] ring-2 ring-[#22b8bd] lg:mb-0">
                <div className="flex items-center gap-3 bg-[#27b4bb] px-6 py-5 text-white">
                  <span className="text-4xl" aria-hidden="true">
                    🎒
                  </span>
                  <h3 className="font-serif text-2xl font-semibold">Mensuelle</h3>
                </div>

                <div className="space-y-7 px-8 py-8 text-center">
                  <p className="text-sm text-[#00aebc]">✧ Formule la plus flexible</p>
                  <p className="text-4xl font-semibold tracking-wide text-black">
                    {formatEuro(prices.monthly)} €
                    <span className="ml-1 text-base font-semibold">/mois</span>
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan("mensuel")}
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#25b6bd] px-5 py-3 text-sm font-semibold text-white hover:bg-[#17a6ad]"
                  >
                    <span className="mr-3 text-xl">✓</span>
                    {selectedPlan === "mensuel" ? "Formule choisie" : "Choisir"}
                  </button>
                </div>
              </article>

              <article className="relative mb-5 overflow-hidden rounded-md bg-white shadow-sm lg:mb-0">
                <div className="absolute right-[-36px] top-5 rotate-45 bg-[#ffd31a] px-10 py-1 text-xs font-semibold text-[#5b4c00]">
                  Bon plan
                </div>
                <div className="flex items-center gap-3 bg-[#6865c9] px-6 py-5 text-white">
                  <span className="text-4xl" aria-hidden="true">
                    📐
                  </span>
                  <h3 className="font-serif text-2xl font-semibold">Annuelle</h3>
                </div>

                <div className="space-y-4 px-8 py-8 text-center">
                  <div className="text-sm text-[#655fd6]">
                    <p>⚙ Formule la plus économique</p>
                    <p className="text-xs text-slate-500">Économisez 40 €/an</p>
                  </div>
                  <p className="text-4xl font-semibold tracking-wide text-black">
                    {formatEuro(prices.yearlyMonthly)} €
                    <span className="ml-1 text-base font-semibold">/mois</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatEuro(prices.yearlyTotal)} €/facturés en une seule fois
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan("annuel")}
                    className="inline-flex w-full items-center justify-center rounded-md border border-[#655fd6] bg-white px-5 py-3 text-sm font-semibold text-[#655fd6] hover:bg-[#f3f2ff]"
                  >
                    {selectedPlan === "annuel" ? "Formule choisie" : "Choisir"}
                  </button>
                </div>
              </article>

              <aside className="flex flex-col justify-center px-3 py-3 lg:px-5">
                <h3 className="text-2xl font-medium text-[#08265c]">Inclus avec EleveAI</h3>
                <ul className="mt-5 space-y-5 text-sm text-[#08265c]">
                  <li className="flex gap-3">
                    <span className="text-xl text-[#00a6d6]">△</span>
                    <span>Maths du CM2 à la 3e</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-xl text-[#00a6d6]">∞</span>
                    <span>Accès à tous les niveaux, sans limite de progression</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-xl text-[#00a6d6]">▣</span>
                    <span>Exercices interactifs, guidés et auto-corrigés</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-xl text-[#00a6d6]">▥</span>
                    <span>Suivi personnalisé en temps réel</span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>

          <div className="rounded-md border border-slate-300 bg-white px-6 py-5 shadow-sm">
            <p className="text-sm text-slate-700">
              <span className="mr-2 text-[#ff9f16]">☏</span>
              Vous avez des questions ? Consultez notre{" "}
              <Link href="/faq/faq-tarifs" className="font-semibold underline underline-offset-4">
                FAQ
              </Link>{" "}
              ou{" "}
              <Link href="/contact" className="font-semibold underline underline-offset-4">
                contactez-nous
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-500">
              Le renouvellement est automatique. Vous pouvez résilier à tout moment en ligne.
            </p>

            {stripeOk ? (
              <Link
                href={checkoutHref(selectedPlan, children)}
                prefetch={false}
                className="inline-flex rounded-md bg-[#25b6bd] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#17a6ad]"
              >
                Continuer
              </Link>
            ) : (
              <Link
                href="/auth/signup"
                className="inline-flex rounded-md bg-[#25b6bd] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#17a6ad]"
              >
                Continuer
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
