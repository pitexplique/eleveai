"use client";

import Link from "next/link";
import { useCallback } from "react";

const HEADER_OFFSET = 80;

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-black aspect-video">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="Vidéo EleveAI – Démonstration"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

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

  const Step = ({
    n,
    title,
    desc,
  }: {
    n: string;
    title: string;
    desc: string;
  }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold">
          {n}
        </div>
        <div>
          <p className="text-sm font-extrabold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-700 leading-relaxed">{desc}</p>
        </div>
      </div>
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
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              IA pédagogique encadrée • BO / Éduscol • anti-triche & traces
            </p>

            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Clarifiez votre séance avec Valeria.
              <br className="hidden sm:block" />
              Générez une ressource exploitable.
            </h1>

            <h2 className="mt-4 text-lg sm:text-xl font-semibold text-blue-600">
              EleveAI aide les enseignants à structurer leurs objectifs avant de générer (toutes matières).
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed">
              Vous partez d’une idée (cours, séance, évaluation). Valeria vous aide à préciser objectifs,
              trace attendue et critères de réussite. Ensuite, EleveAI génère une ressource claire, cohérente
              et prête à utiliser.
            </p>

            {/* CTA inscription + valeria */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white hover:bg-blue-500 transition"
              >
                Créer mon compte →
              </Link>

              <Link
                href="/optimiseur"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                Clarifier ma séance (Valeria) →
              </Link>

              <button
                type="button"
                onClick={() => scrollTo("methode")}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                Voir la méthode (2 min)
              </button>
            </div>

            {/* Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Chip label="👩‍🏫 Profs" onClick={() => scrollTo("profs")} />
              <Chip label="🎒 Élèves" onClick={() => scrollTo("eleves")} />
              <Chip label="👨‍👩‍👧 Parents" onClick={() => scrollTo("parents")} />
              <Chip label="🏫 École" onClick={() => scrollTo("ecole")} />
            </div>

            <p className="mt-4 text-xs text-slate-600">
              Objectifs → trace attendue → critères de réussite → différenciation :
              l’IA structure, l’enseignant décide.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="mx-auto max-w-6xl px-4 py-12 space-y-10">
        {/* Bloc Valeria (indicateur) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-[52%] space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                Valeria — indicateur de clarté pédagogique
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Un score /20 pour vérifier la solidité de votre demande
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed">
                La note n’est pas une performance. C’est un indicateur : plus votre demande est claire,
                structurée et testable, plus la ressource générée sera stable et exploitable.
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>✅ Objectifs explicites (capacités visées)</li>
                <li>✅ Trace attendue (ce que vous récupérez)</li>
                <li>✅ Critères observables (comment valider)</li>
                <li>✅ Contraintes (durée, DYS, différenciation, supports)</li>
                <li>✅ Conformité (neutralité, BO/Éduscol si pertinent)</li>
              </ul>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <Link
                  href="/optimiseur"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800 transition"
                >
                  Clarifier ma séance avec Valeria →
                </Link>

                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
                >
                  Générer une ressource (Profs) →
                </Link>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Inscription d’abord. Les fonctionnalités premium/paiement arrivent ensuite, une fois la base de données opérationnelle.
              </p>
            </div>

            <div className="w-full lg:w-[48%] space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-extrabold text-slate-900">Démo (rapide)</p>
                <p className="mt-1 text-sm text-slate-700">
                  Exemple : clarification d’une demande + génération d’une ressource plus stable.
                </p>
                <div className="mt-3">
                  <YouTubeEmbed videoId="ykRrez0CVN0" />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">Pour qui ?</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>👩‍🏫 Enseignants : séance, évaluation, différenciation, corrigés</li>
                  <li>🎒 Élèves : cadre clair (apprendre sans tricher) - Gratuit</li>
                  <li>👨‍👩‍👧 Parents : accompagnement non stigmatisant</li>
                  <li>🏫 Établissements : cadre commun et rassurant</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Méthode */}
        <div id="methode" className="scroll-mt-24">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">
              Méthode universelle (toutes matières)
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              4 questions simples pour rendre une séance “vraiment claire”
            </h3>

            <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-3xl">
              La plupart des demandes restent vagues. En clarifiant capacités, trace, critères et contraintes,
              vous obtenez une ressource plus stable, plus cohérente et plus exploitable.
            </p>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              <Step
                n="1"
                title="Capacités visées"
                desc="À la fin, l’élève est capable de… (2–4 objectifs concrets)."
              />
              <Step
                n="2"
                title="Trace attendue"
                desc="Ce que vous récupérez : exercice, texte, tableau, schéma, oral, etc."
              />
              <Step
                n="3"
                title="Critères de réussite"
                desc="Je valide si… (observable / mesurable)."
              />
              <Step
                n="4"
                title="Contraintes"
                desc="Durée, hétérogénéité, DYS, supports, groupe/individuel, numérique ou non."
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <Link
                href="/optimiseur"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-500 transition"
              >
                Clarifier Optimiser avec Valeria →
              </Link>

              <Link
                href="/espace-profs"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                Ou Générer votre prompt(Espace Profs) →
              </Link>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              L’IA structure la demande. L’enseignant conserve la décision pédagogique.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200" />

        {/* Cartes espaces */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div id="profs" className="scroll-mt-24">
            <Card
              title="PROFESSEURS"
              punchline="Des ressources plus claires, plus vite"
              line1="Clarifiez vos objectifs, vos critères et votre trace attendue."
              line2="Puis générez cours, séances, évaluations, différenciation et corrigés."
              ctaHref="/espace-profs"
              ctaLabel="Accéder à l’espace Professeurs"
            />
          </div>

          <div id="eleves" className="scroll-mt-24">
            <Card
              title="ÉLÈVES"
              punchline="Un cadre clair pour apprendre sans tricher"
              line1="Comprendre, corriger, améliorer : avec des traces et une méthode."
              line2="L’IA aide — mais l’élève garde le raisonnement."
              ctaHref="/espace-eleves"
              ctaLabel="Accéder à l’espace Élèves"
            />
          </div>

          <div id="parents" className="scroll-mt-24">
            <Card
              title="PARENTS"
              punchline="Un suivi rassurant et concret 💛"
              line1="Décrivez le niveau, les difficultés, les objectifs et le rythme."
              line2="EleveAI propose des pistes claires, adaptées et non stigmatisantes."
              ctaHref="/espace-parents"
              ctaLabel="Accéder à l’espace Parents"
            />
          </div>

          <div id="ecole" className="scroll-mt-24">
            <Card
              title="ÉCOLE / ÉTABLISSEMENT"
              punchline="Un cadre commun, rassurant"
              line1="Espaces dédiés : administration, vie scolaire, AESH, personnels."
              line2="Usage cohérent de l’IA : neutralité, traces, exigences, repères."
              ctaHref="/espace-ecoles"
              ctaLabel="Accéder à l’espace Écoles"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-extrabold text-slate-900">Objectif</p>
          <p className="mt-2 text-sm text-slate-700">
            Clarifier → mesurer (score indicateur) → ajuster → générer une ressource exploitable.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Inscription d’abord. Paiement ensuite, lorsque la base de données et les fonctions premium seront opérationnelles.
          </p>
        </div>
      </section>
    </main>
  );
}



