"use client";

import Image from "next/image";
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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{punchline}</p>
      </div>

      <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
        <li>{line1}</li>
        <li>{line2}</li>
      </ul>

      <Link
        href={ctaHref}
        className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
      >
        {ctaLabel}
      </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-16">
        {/* HERO */}
        <section className="space-y-6">
          <h1 className="text-3xl font-bold">
            EleveAI — Apprendre à penser avec l’IA
          </h1>

          <p className="max-w-2xl text-slate-600">
            Une plateforme éducative pour professeurs, élèves et familles.
            L’IA n’est pas une béquille : c’est un outil guidé pour comprendre,
            s’entraîner et progresser.
          </p>

          <div className="flex flex-wrap gap-3">
            <Chip label="Professeurs" onClick={() => scrollTo("profs")} />
            <Chip label="Élèves" onClick={() => scrollTo("eleves")} />
            <Chip label="Parents" onClick={() => scrollTo("parents")} />
          </div>
        </section>

        {/* PROFS */}
        <section id="profs" className="scroll-mt-24 space-y-8">
          <h2 className="text-2xl font-bold">Professeurs</h2>

          {/* Notation IA */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Image
                src="/notationgpt.png"
                alt="Notation IA des prompts enseignants"
                width={420}
                height={240}
                className="rounded-xl border border-slate-200"
                priority
              />

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  Notation IA actuelle
                </div>

                <p className="text-lg font-semibold">
                  Prompts enseignants :
                  <span className="ml-2 text-emerald-600">Note IA : 19,5 / 20 (évaluation multi-critères, arrondi au demi-point)</span>
                </p>

                <p className="text-sm text-slate-600 max-w-md">
                  Score basé sur la clarté pédagogique, la structure,
                  la conformité aux programmes officiels, la différenciation
                  et l’exploitabilité en classe.
                </p>
              </div>
            </div>
          </div>

          <Card
            title="PROFESSEURS"
            punchline="Pilotez l’IA sans perdre votre métier"
            line1="Générez cours, évaluations, diagnostics et aides différenciées."
            line2="Transparence, cadre scolaire, et gain de temps réel."
            ctaHref="/espace-profs"
            ctaLabel="Accéder à l’espace profs"
          />
        </section>

        {/* ÉLÈVES */}
        <section id="eleves" className="scroll-mt-24 space-y-8">
          <h2 className="text-2xl font-bold">Élèves</h2>

          <Card
            title="ÉLÈVES"
            punchline="Comprendre avant de répondre"
            line1="L’IA t’aide à reformuler, t’entraîner et progresser pas à pas."
            line2="Chaque réponse laisse une trace et développe l’esprit critique."
            ctaHref="/espace-eleves"
            ctaLabel="Accéder à l’espace élèves"
          />

          <p className="text-sm text-slate-600 max-w-2xl">
            EleveAI n’est pas une machine à réponses.
            C’est un atelier guidé pour apprendre à expliquer,
            justifier et améliorer son travail, avec ou sans IA.
          </p>
        </section>

        {/* PARENTS */}
        <section id="parents" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-bold">Parents</h2>

          <Card
            title="PARENTS"
            punchline="Accompagner sans faire à la place"
            line1="Comprenez les aides utilisées par votre enfant."
            line2="Favorisez autonomie, confiance et progrès durables."
            ctaHref="/espace-parents"
            ctaLabel="Accéder à l’espace parents"
          />
        </section>
      </div>
    </main>
  );
}

