// app/accueil/page.tsx (ou app/page.tsx selon ton routing)
// ✅ Ajout chip "🛡️ Gouvernance IA"
// ✅ Ajout section "GOUVERNANCE IA" + CTA vers /iso-42001
// ✅ Mentions ISO "safe" : "inspirée ISO/IEC 42001 (démarche progressive, non certifiée)"
// ✅ Ajout liens ISO depuis Valeria + Entreprise

"use client";

import Link from "next/link";
import { useCallback } from "react";
import Image from "next/image";

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
    badge,
  }: {
    title: string;
    punchline: string;
    line1: string;
    line2: string;
    ctaHref: string;
    ctaLabel: string;
    badge?: string;
  }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wider text-slate-500">{title}</p>

        {badge ? (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            {badge}
          </span>
        ) : null}
      </div>

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

  const SectionHeader = ({
    id,
    label,
    subtitle,
  }: {
    id?: string;
    label: string;
    subtitle?: string;
  }) => (
    <div id={id} className="scroll-mt-24 flex items-center gap-3 pt-2">
      <div className="h-px flex-1 bg-slate-200" />
      <div className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
          {label}
        </p>
        {subtitle ? (
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_40%,rgba(59,130,246,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              EleveAI — Prompts pédagogiques prêts à l’emploi
            </h1>

            <h2 className="mt-4 text-lg sm:text-xl font-semibold text-blue-600">
              IA encadrée • BO / Éduscol • traces • différenciation
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">Vous gardez la main.</span>{" "}
              L’IA structure, vous décidez : consigne claire, étapes, critères,
              adaptations, et traces pour travailler proprement en classe.
            </p>

            {/* Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Chip label="👩‍🏫 Profs" onClick={() => scrollTo("profs")} />
              <Chip label="🎒 Élèves" onClick={() => scrollTo("eleves")} />
              <Chip label="👨‍👩‍👧 Parents" onClick={() => scrollTo("parents")} />
              <Chip label="🏫 Établissement" onClick={() => scrollTo("etablissement")} />
              <Chip label="⭐ Valeria" onClick={() => scrollTo("valeria")} />
              <Chip label="🛡️ Gouvernance IA" onClick={() => scrollTo("gouvernance")} />
              <Chip label="🏢 Entreprise" onClick={() => scrollTo("entreprise")} />
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              {/* Valeria /20 : noir (premium) */}
              <Link
                href="/optimiseur"
                className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white
                          hover:bg-slate-800 transition sm:w-auto"
              >
                Valeria : score & optimisation (/20) →
              </Link>

              {/* Éducation : bleu */}
              <Link
                href="/espace-profs"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white
                          hover:bg-blue-500 transition sm:w-auto"
              >
                Générateur de prompts pédagogiques →
              </Link>

              {/* Entreprise : orange */}
              <Link
                href="/valeria"
                className="inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white
                          hover:bg-orange-500 transition sm:w-auto"
              >
                Offre entreprise →
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-600">
              Sorties calibrées : consigne → étapes → critères → différenciation → traces.
            </p>

            <p className="mt-6 text-xs text-slate-500">
              ✅ Cadre anti-triche (traces) · ✅ Cadre établissement · ✅ L’IA propose, l’humain valide
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
        {/* 1) Valeria / Notation IA (pont) */}
        <div
          id="valeria"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Image
              src="/notationgpt.png"
              alt="Indicateur de structuration des prompts"
              width={420}
              height={240}
              className="rounded-xl border border-slate-200"
              priority
            />

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                Valeria — Optimisation mesurable de prompts
              </div>

              <p className="text-lg font-semibold">
                Indicateur actuel :
                <span className="ml-2 text-emerald-600">19,5 / 20</span>
                <span className="ml-2 text-xs text-slate-500">(évaluation multi-critères)</span>
              </p>

              <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                Valeria améliore un prompt par itérations contrôlées : clarté,
                structure, conformité, différenciation, et robustesse (sorties plus stables et exploitables).
              </p>

              {/* Gouvernance IA (safe) */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 leading-relaxed">
                <p className="font-semibold mb-1">
                  Gouvernance IA (inspirée ISO/IEC 42001)
                </p>
                <p>
                  Supervision humaine, indicateurs, traçabilité et amélioration continue :
                  Valeria est conçu comme un système piloté, pas comme une “boîte magique”.
                </p>
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <Link
                    href="/iso-42001"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition"
                  >
                    Lire notre philosophie ISO →
                  </Link>
                  <Link
                    href="/optimiseur"
                    className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition"
                  >
                    Tester Valeria (/20) →
                  </Link>
                </div>
                <p className="mt-2 text-xs text-emerald-800/80">
                  Démarche progressive, non certifiée à ce stade.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed">
                <p className="font-semibold text-slate-900 mb-2">
                  Que signifie réellement “19,5 / 20” ?
                </p>
                <p>
                  Ce n’est pas une “performance” : c’est un{" "}
                  <span className="font-semibold">indice de reproductibilité pédagogique</span>.
                  À ce niveau, un prompt donne des sorties plus constantes : objectif explicite,
                  consignes univoques, progression, critères, différenciation, et traces.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  L’IA structure la demande. L’enseignant conserve la décision pédagogique.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  href="/optimiseur"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
                >
                  Ouvrir Valeria (score /20) →
                </Link>

                <Link
                  href="/valeria"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition"
                >
                  Valeria Consulting (Entreprise) →
                </Link>
              </div>

              <p className="text-xs text-slate-500 italic leading-relaxed">
                Approche inspirée d’une culture de modélisation issue de l’ingénierie statistique industrielle. — Frédéric Lacoste.
              </p>
            </div>
          </div>
        </div>

        {/* ÉDUCATION */}
        <SectionHeader label="ÉDUCATION" subtitle="Profs • Élèves • Parents • Établissements" />

        <div className="grid gap-6 lg:grid-cols-2">
          <div id="profs" className="scroll-mt-24">
            <Card
              title="PROFESSEURS"
              punchline="Des prompts pédagogiques solides"
              line1="Construisez des séances, évaluations, corrigés et différenciations — vite, propre, et conforme."
              line2="Gain de temps, sans perte de maîtrise : vous adaptez, l’IA structure."
              ctaHref="/espace-profs"
              ctaLabel="Accéder à l’espace Professeurs"
              badge="BO / Éduscol"
            />
          </div>

          <div id="eleves" className="scroll-mt-24">
            <Card
              title="ÉLÈVES"
              punchline="Un coach IA… sans tricher"
              line1="Comprendre, corriger, améliorer : pas de magie, une méthode."
              line2="Traces obligatoires + explication personnelle = progression réelle."
              ctaHref="/espace-eleves"
              ctaLabel="Accéder à l’espace Élèves"
              badge="Traces & méthode"
            />
          </div>

          <div id="parents" className="scroll-mt-24">
            <Card
              title="PARENTS"
              punchline="Comprendre et accompagner"
              line1="Expliquez la situation de votre enfant (niveau, difficultés, objectifs)."
              line2="Aides concrètes : organisation, confiance, mémorisation, besoins spécifiques."
              ctaHref="/espace-parents"
              ctaLabel="Accéder à l’espace Parents"
              badge="Clair & rassurant"
            />
          </div>

          <div id="etablissement" className="scroll-mt-24">
            <Card
              title="ÉTABLISSEMENT"
              punchline="Un cadre commun, rassurant"
              line1="Accès par codes, rôles (élève/prof/vie scolaire/administration), et usage cohérent."
              line2="Un socle partagé : ressources, repères, bonnes pratiques, et suivi des usages."
              ctaHref="/espace-ecoles"
              ctaLabel="Accéder à l’espace Établissement"
              badge="Codes & rôles"
            />
          </div>
        </div>

        {/* GOUVERNANCE IA */}
        <SectionHeader
          id="gouvernance"
          label="GOUVERNANCE IA"
          subtitle="Supervision humaine • Indicateurs • Traçabilité • Amélioration continue"
        />

        <div className="relative rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-[4px] bg-emerald-600" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-2">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-emerald-900">
                  Inspirée ISO/IEC 42001
                </span>
                <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-slate-700">
                  Démarche progressive
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">
                L’IA propose, l’humain valide
              </h3>

              <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
                Valeria applique des principes de pilotage d’un système IA :
                supervision humaine, indicateurs, traçabilité et amélioration continue.
                Objectif : des sorties fiables, exploitables, et pédagogiquement contrôlées.
              </p>

              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
                <li>• Validation finale humaine</li>
                <li>• Indicateurs (/20 + breakdown)</li>
                <li>• Historique des itérations</li>
                <li>• Procédures d’arrêt / anti-dérive</li>
              </ul>

              <p className="mt-3 text-xs text-slate-500">
                Mention “ISO” = inspiration de gouvernance, pas une revendication de certification.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row md:flex-col md:items-stretch">
              <Link
                href="/iso-42001"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition"
              >
                Page ISO / Gouvernance →
              </Link>
              <Link
                href="/optimiseur"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition"
              >
                Tester Valeria →
              </Link>
            </div>
          </div>
        </div>

        {/* ENTREPRISE */}
        <SectionHeader
          id="entreprise"
          label="ENTREPRISE"
          subtitle="Gouvernance IA • Indicateurs • ISO/IEC 42001"
        />

        <div className="relative rounded-2xl border border-orange-200 bg-orange-50/40 p-6 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-[4px] bg-orange-500" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-2">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-orange-700">
                  Valeria Consulting
                </p>

                <span className="rounded-full border border-orange-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-orange-800">
                  ISO/IEC 42001
                </span>

                <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-slate-700">
                  Gouvernance IA
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">
                Audit IA & indicateurs — gouvernance mesurable
              </h3>

              <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
                Pour les PME et organismes de formation : cadrer l’usage IA, mesurer la
                performance, réduire les risques (biais, dérives, décisions non traçables)
                et mettre en place une amélioration continue.
              </p>

              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
                <li>• Cartographie des usages IA</li>
                <li>• KPI (robustesse, erreur, dérive)</li>
                <li>• Procédures & validation humaine</li>
                <li>• Feuille de route 30 / 60 / 90 jours</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row md:flex-col md:items-stretch">
              <Link
                href="/valeria"
                className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition"
              >
                Découvrir l’offre entreprise →
              </Link>

              <Link
                href="/iso-42001"
                className="inline-flex items-center justify-center rounded-lg border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-orange-900 hover:bg-orange-50 transition"
              >
                Notre philosophie ISO →
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500 pl-2">
            ⚠️ Positionnement : gouvernance IA mesurable (supervision humaine + traçabilité).
          </p>
        </div>
      </section>
    </main>
  );
}
