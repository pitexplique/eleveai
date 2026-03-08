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
      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2"
    >
      {label}
    </button>
  );

  const StatCard = ({
    eyebrow,
    value,
    text,
  }: {
    eyebrow: string;
    value: string;
    text: string;
  }) => (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {eyebrow}
      </p>
      <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );

  const Card = ({
    id,
    badge,
    title,
    description,
    details,
    href,
    cta,
    variant = "blue",
  }: {
    id: string;
    badge: string;
    title: string;
    description: string;
    details: string;
    href: string;
    cta: string;
    variant?: "blue" | "slate" | "emerald";
  }) => {
    const styles = {
      blue: {
        badge:
          "border-blue-200 bg-blue-50 text-blue-700",
        button:
          "bg-blue-600 text-white hover:bg-blue-500",
      },
      slate: {
        badge:
          "border-slate-200 bg-slate-100 text-slate-700",
        button:
          "bg-slate-900 text-white hover:bg-slate-800",
      },
      emerald: {
        badge:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        button:
          "bg-emerald-700 text-white hover:bg-emerald-600",
      },
    };

    const current = styles[variant];

    return (
      <div
        id={id}
        className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
      >
        <div
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${current.badge}`}
        >
          {badge}
        </div>

        <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {description}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {details}
        </p>

        <div className="mt-6">
          <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition ${current.button}`}
          >
            {cta} →
          </Link>
        </div>
      </div>
    );
  };

  const SectionTitle = ({
    id,
    overline,
    title,
    text,
  }: {
    id?: string;
    overline: string;
    title: string;
    text: string;
  }) => (
    <div id={id} className="scroll-mt-24 mx-auto max-w-3xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
        {overline}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        {text}
      </p>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_10%,rgba(59,130,246,0.10),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
              EleveAI
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Laboratoire d’IA pédagogique
            </h1>

            <p className="mt-6 text-lg font-semibold text-slate-700 sm:text-xl">
              Études et réalisations
            </p>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              EleveAI étudie, teste et structure les usages pédagogiques de
              l’intelligence artificielle. Avec Valeria, un prompt peut passer de{" "}
              <span className="font-semibold text-slate-900">5/20 à 18/20</span>,
              pour produire une demande plus claire, plus fiable et plus exploitable.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <StatCard
                eyebrow="Progression type"
                value="5/20 → 18/20"
                text="Prompt retravaillé avec Valeria."
              />
              <StatCard
                eyebrow="Objectif"
                value="Plus fiable"
                text="Structure, critères, précision, différenciation."
              />
              <StatCard
                eyebrow="Cadre"
                value="Humain valide"
                text="L’IA aide, l’enseignant décide."
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Chip label="🧪 Le laboratoire" onClick={() => scrollTo("laboratoire")} />
              <Chip label="🛡️ Sécuriser vos prompts" onClick={() => scrollTo("securiser")} />
              <Chip label="⭐ Valeria" onClick={() => scrollTo("valeria")} />
              <Chip label="🎓 Tutor" onClick={() => scrollTo("tutor")} />
              <Chip label="❤️ Faire un don" onClick={() => scrollTo("don")} />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/optimiseur"
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
              >
                Ouvrir Valeria →
              </Link>

              <Link
                href="/tutor"
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
              >
                Découvrir le Tutor →
              </Link>

              <Link
                href="/don"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 sm:w-auto"
              >
                Faire un don ❤️
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              IA encadrée • supervision humaine • usages pédagogiques concrets
            </p>

            <p className="mt-3 text-xs text-slate-400">
              Projet indépendant — optimisation mesurable, apprentissage guidé, approche responsable.
            </p>
          </div>
        </div>
      </section>

      {/* LABORATOIRE */}
      <section id="laboratoire" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Le laboratoire"
          title="Un lieu d’étude, d’expérimentation et de création"
          text="EleveAI explore des usages concrets de l’IA en pédagogie. Le projet avance comme un laboratoire indépendant : on teste, on mesure, on améliore, puis on transforme ces travaux en outils réellement utiles pour les professeurs, les élèves et les établissements."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Étudier</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Observer les usages de l’IA en contexte scolaire, identifier les
              risques, les limites et les bonnes pratiques.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Expérimenter</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Tester des prompts, des interfaces, des cadres de validation et
              des parcours d’apprentissage progressifs.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Construire</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Créer des outils utiles : Valeria pour les prompts, Tutor pour
              l’apprentissage, et des ressources pédagogiques exploitables.
            </p>
          </div>
        </div>
      </section>

      {/* AXES */}
      <section className="border-y border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            overline="Axes de travail"
            title="Trois piliers pour structurer EleveAI"
            text="Une architecture simple et lisible : sécuriser les usages, optimiser les prompts, développer des systèmes d’apprentissage."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card
              id="securiser"
              badge="Profs · élèves"
              title="Sécuriser vos prompts"
              description="Un cadre pour produire des demandes plus claires, plus fiables et plus adaptées au contexte scolaire."
              details="Objectif : éviter les prompts flous, les réponses instables, les oublis de critères et les usages peu maîtrisés."
              href="/espace-profs"
              cta="Sécuriser mes prompts"
              variant="emerald"
            />

            <Card
              id="valeria"
              badge="Valeria"
              title="Optimiser vos prompts"
              description="Valeria évalue, score et améliore un prompt pour le rendre plus robuste, plus exploitable et plus constant."
              details="Le prompt devient une vraie base de travail : plus clair, plus structuré, plus facile à réutiliser."
              href="/optimiseur"
              cta="Ouvrir Valeria"
              variant="slate"
            />

            <Card
              id="tutor"
              badge="Tutor"
              title="Système d’apprentissage"
              description="Un tutorat IA orienté progression : adaptation, accompagnement, consolidation et suivi."
              details="L’objectif n’est pas de remplacer l’enseignant, mais de renforcer l’apprentissage par étapes."
              href="/tutor"
              cta="Découvrir Tutor"
              variant="blue"
            />
          </div>
        </div>
      </section>

      {/* POSITIONNEMENT */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Positionnement"
          title="Une IA pédagogique utile, sobre et encadrée"
          text="EleveAI ne cherche pas à produire de la magie. Le laboratoire développe des outils sérieux, compréhensibles et pilotables, avec une place centrale laissée à l’humain."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Ce que fait EleveAI
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
              <li>• Étudier les usages pédagogiques de l’IA</li>
              <li>• Concevoir des outils concrets pour l’éducation</li>
              <li>• Structurer des prompts fiables et exploitables</li>
              <li>• Développer des parcours d’apprentissage assistés</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Ce que ne fait pas EleveAI
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
              <li>• Remplacer le jugement pédagogique</li>
              <li>• Promettre une IA parfaite ou automatique</li>
              <li>• Faire disparaître la vérification humaine</li>
              <li>• Réduire l’école à une simple génération de contenus</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DON */}
      <section
        id="don"
        className="scroll-mt-24 border-t border-slate-200 bg-slate-900 text-white"
      >
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-300">
            Soutenir le projet
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Faire un don au laboratoire
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            EleveAI est un projet indépendant. Votre soutien peut aider à
            développer de nouveaux outils, poursuivre les expérimentations et
            garder une approche pédagogique humaine, utile et responsable.
          </p>

          <div className="mt-8">
            <Link
              href="/don"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Faire un don →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}