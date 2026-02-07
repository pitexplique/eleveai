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
        {/* Fond clair avec halo discret */}
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
              IA pédagogique encadrée — prompts prêts à l’emploi (BO / Éduscol)
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">
                Arrête de réécrire 10 fois la même consigne.
              </span>{" "}
              Génère un prompt clair, conforme, utilisable immédiatement en classe.
            </p>

            {/* Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Chip label="👩‍🏫 Profs" onClick={() => scrollTo("profs")} />
              <Chip label="🎒 Élèves" onClick={() => scrollTo("eleves")} />
              <Chip label="👨‍👩‍👧 Parents" onClick={() => scrollTo("parents")} />
              <Chip label="🏫 École" onClick={() => scrollTo("ecole")} />

            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white
                          hover:bg-blue-500 transition sm:w-auto"
              >
                S’inscrire gratuitement →
              </Link>

              <Link
                href="/auth/signin"
                className="inline-flex w-full items-center justify-center rounded-lg border border-blue-600 bg-white px-6 py-3 text-sm font-semibold text-blue-600
                          hover:bg-blue-50 transition sm:w-auto"
              >
                Se connecter →
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-600">
              Prompts calibrés pour produire des sorties exploitables : consigne →
              étapes → critères → différenciation → traces.
            </p>

            <p className="mt-6 text-xs text-slate-500">
              ✅ Traces pédagogiques · ✅ Cadre établissement · ✅ L’IA propose,
              l’humain justifie
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="mx-auto max-w-6xl px-4 py-12 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["1) Choisir un profil", "Un cadre adapté à ton rôle"],
            ["2) Générer un prompt", "Structuré, fiable, directement exploitable"],
            ["3) Gagner du temps", "Moins d’essais, plus d’efficacité"],
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

        <div className="grid gap-6 lg:grid-cols-2">
<div id="profs" className="scroll-mt-24">
  <Card
    title="PROFESSEURS"
    punchline="Des prompts pédagogiques solides"
    line1="Mettez en forme vos cours ou testez des séances inédites."
    line2="Gagnez du temps tout en gardant la maîtrise pédagogique."
    ctaHref="/espace-profs"
    ctaLabel="Accéder à l’espace Professeurs"
  />
</div>

          <div id="eleves" className="scroll-mt-24">
            <Card
              title="ÉLÈVES"
              punchline="Ton coach IA "
              line1="Comprendre, corriger, améliorer "
              line2="Un cadre clair pour apprendre sans tricher."
              ctaHref="/espace-eleves"
              ctaLabel="Accéder au générateur (Élèves)"
            />
          </div>

<div id="parents" className="scroll-mt-24">
  <Card
    title="PARENTS"
    punchline="Le suivi de votre enfant💛"
    line1="Expliquez la situation de votre enfant (niveau, difficultés, objectifs)."
    line2="Besoins spécifiques, rythme personnel, attention, confiance, mémorisation."
    ctaHref="/espace-parents"
    ctaLabel="Accéder à l’espace Parents"
  />
</div>

          <div id="ecole" className="scroll-mt-24">
            <Card
              title="ÉCOLE / ÉTABLISSEMENT"
              punchline="Un cadre commun ."
              line1="Des espaces dédiés à l’administration, à la vie scolaire, aux AESH et aux personnels."
              line2="Ressources, repères et pratiques alignées pour un usage cohérent et rassurant de l’IA."
              ctaHref="/espace-ecoles"
              ctaLabel="Accéder à l’espace Écoles"
            />
          </div>

        </div>

        {/* Footer crédibilité */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-900">Une exigence simple</p>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            Si un prompt ne te fait pas gagner du temps dès la première utilisation,
            il ne sert à rien. EleveAI est conçu pour éviter ça.
          </p>
        </div>
      </section>
    </main>
  );
}




