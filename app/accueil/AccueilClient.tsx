"use client";

import Link from "next/link";
import { useCallback } from "react";

const HEADER_OFFSET = 80;

export default function AccueilPage() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - HEADER_OFFSET;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }, []);

  const Chip = ({
    label,
    onClick,
  }: {
    label: string;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800
      hover:bg-slate-100 hover:border-slate-400 transition
      focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2"
    >
      {label}
    </button>
  );

  const Card = ({
    title,
    punchline,
    line1,
    line2,
    ctaHref,
    ctaLabel,
  }: {
    title: string;
    punchline: string;
    line1: string;
    line2: string;
    ctaHref: string;
    ctaLabel: string;
  }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-slate-500">{title}</p>

      <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900">
        {punchline}
      </h3>

      <div className="mt-4 space-y-2 text-sm text-slate-700 leading-relaxed">
        <p>{line1}</p>
        <p className="text-slate-600">{line2}</p>
      </div>

      <div className="mt-6">
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
        >
          {ctaLabel} →
        </Link>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200">
        {/* Fond clair avec halos très doux */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_40%,rgba(59,130,246,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Générateur de Prompts Pédagogiques
            </h1>

            <h2 className="mt-4 text-lg sm:text-xl font-semibold text-blue-600">
                IA pédagogique encadrée — programmes officiels (BO / Éduscol)
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed">
              Choisis ton profil. On te guide. Tu gardes la main.
            </p>

            {/* Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Chip label="👩‍🏫 Profs" onClick={() => scrollTo("profs")} />
              <Chip label="🎒 Élèves" onClick={() => scrollTo("eleves")} />
              <Chip label="👨‍👩‍👧 Parents" onClick={() => scrollTo("parents")} />
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition"
              >
                S’inscrire gratuitement →
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              ✅ Traces pédagogiques · ✅ Cadre établissement · ✅ L’IA propose, l’humain justifie
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="mx-auto max-w-6xl px-4 py-12 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["1) Choisir un profil", "Profs / Élèves / Parents"],
            ["2) Générer un prompt", "Clair, structuré, exploitable"],
            ["3) Garder des traces", "Justification, corrections, recul"],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm"
            >
              <p className="font-semibold text-slate-900">{t}</p>
              <p className="mt-1 text-slate-600">{d}</p>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-slate-200" />

        <div className="grid gap-6 lg:grid-cols-3">
          <div id="profs" className="scroll-mt-24">
            <Card
              title="PROFESSEURS"
              punchline="Tu gardes la main. L’IA t’aide à structurer."
              line1="Génère des consignes claires, alignées, différenciées."
              line2="Moins de flou → moins d’allers-retours → plus de progrès élèves."
              ctaHref="/espace-profs"
              ctaLabel="Aller au générateur (Profs)"
            />
          </div>

          <div id="eleves" className="scroll-mt-24">
            <Card
              title="ÉLÈVES"
              punchline="Tu as le droit d’utiliser l’IA. Tu dois penser."
              line1="Comprendre, repérer une erreur, améliorer."
              line2="On valorise ce que tu fais après la réponse."
              ctaHref="/espace-eleves"
              ctaLabel="Aller au générateur (Élèves)"
            />
          </div>

          <div id="parents" className="scroll-mt-24">
            <Card
              title="PARENTS"
              punchline="Aider, sans faire à la place."
              line1="Un cadre simple pour accompagner sans pression."
              line2="On suit une trace de travail, pas juste une réponse."
              ctaHref="/espace-parents"
              ctaLabel="Aller au générateur (Parents)"
            />
          </div>
        </div>

        {/* Footer crédibilité */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-900">Cadre IA encadrée</p>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            EleveAI n’est pas un générateur magique : l’IA propose, l’humain analyse,
            corrige, justifie. La valeur, c’est la méthode.
          </p>
        </div>
      </section>
    </main>
  );
}



