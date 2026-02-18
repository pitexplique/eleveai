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
            {/* ✅ Public + Privé */}
            <p className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              IA encadrée • Éducation & Formation • Secteur public & privé • conformité & critères mesurables
            </p>

            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Clarifiez. Structurez. Optimisez.
              <br className="hidden sm:block" />
              Valeria transforme une idée en ressource exploitable.
            </h1>

            <h2 className="mt-4 text-lg sm:text-xl font-semibold text-blue-600">
              EleveAI aide à formuler des objectifs testables, puis à générer des ressources robustes
              — école, formation, entreprise.
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed">
              Vous partez d’une demande (séance, évaluation, séquence, formation interne, procédure).
              Valeria clarifie le type, les objectifs, la trace attendue et les critères de réussite.
              Ensuite, EleveAI génère une ressource claire, cohérente et prête à utiliser.
            </p>

            {/* ✅ Signature premium */}
            <div className="mt-6 flex flex-col items-center gap-1">
              <p className="text-sm font-extrabold text-slate-900">
                Frédéric Lacoste — Consultant IA
              </p>
              <p className="text-sm text-slate-700">
                Optimisation mesurable des pratiques pédagogiques par itération contrôlée
              </p>
            </div>

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
                Clarifier / Optimiser (Valeria) →
              </Link>

              <button
                type="button"
                onClick={() => scrollTo("methode")}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                Voir la méthode (2 min)
              </button>
            </div>

            {/* ✅ Flow “test” ultra clair */}
            <div className="mt-6 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
              <p className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Test rapide (2 étapes)
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                  <p className="font-extrabold text-slate-900">1) Générer</p>
                  <p>Créer une ressource (éducation/formation) dans Espace Profs.</p>
                  <Link
                    href="/espace-profs"
                    className="mt-2 inline-block text-blue-600 font-semibold"
                  >
                    Ouvrir Espace Profs →
                  </Link>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                  <p className="font-extrabold text-slate-900">2) Optimiser</p>
                  <p>Coller dans Valéria pour clarifier le type et viser 20/20.</p>
                  <Link
                    href="/optimiseur"
                    className="mt-2 inline-block text-blue-600 font-semibold"
                  >
                    Ouvrir Valéria →
                  </Link>
                </div>
              </div>
              <button
                type="button"
                onClick={() => scrollTo("demo")}
                className="mt-3 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white hover:bg-slate-800 transition"
              >
                Voir la démo vidéo →
              </button>
            </div>

            {/* Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Chip label="👩‍🏫 Profs" onClick={() => scrollTo("profs")} />
              <Chip label="🎒 Élèves" onClick={() => scrollTo("eleves")} />
              <Chip label="👨‍👩‍👧 Parents" onClick={() => scrollTo("parents")} />
              <Chip label="🏫 École" onClick={() => scrollTo("ecole")} />
              <Chip label="🏭 Entreprises" onClick={() => scrollTo("entreprises")} />
            </div>

            <p className="mt-4 text-xs text-slate-600">
              Objectifs → trace attendue → critères mesurables → contraintes :
              l’IA structure, vous décidez.
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
                Valeria — indicateur de clarté & robustesse
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Un score /20 pour vérifier la solidité de votre demande
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed">
                La note n’est pas une performance. C’est un indicateur : plus votre demande est claire,
                structurée et testable, plus la ressource générée sera stable et exploitable
                (éducation comme formation/entreprise).
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>✅ Type clair (séance / évaluation / séquence / formation / procédure)</li>
                <li>✅ Objectifs explicites (capacités visées)</li>
                <li>✅ Trace attendue (ce que vous récupérez)</li>
                <li>✅ Critères mesurables (comment valider)</li>
                <li>✅ Contraintes (durée, public, DYS, supports)</li>
                <li>✅ Conformité (neutralité, BO/Éduscol si pertinent)</li>
              </ul>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <Link
                  href="/optimiseur"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800 transition"
                >
                  Clarifier avec Valeria →
                </Link>

                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
                >
                  Générer une ressource →
                </Link>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Inscription d’abord. Premium/paiement ensuite, quand la base et les fonctions seront stabilisées.
              </p>
            </div>

            <div id="demo" className="w-full lg:w-[48%] space-y-4 scroll-mt-24">
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
                  <li>🎒 Élèves : cadre clair (apprendre sans tricher) — Gratuit</li>
                  <li>👨‍👩‍👧 Parents : accompagnement non stigmatisant</li>
                  <li>🏫 Établissements : cadre commun et rassurant</li>
                  <li>🏭 Entreprises : supports de formation, procédures, critères qualité</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Méthode */}
        <div id="methode" className="scroll-mt-24">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">
              Méthode universelle (éducation & formation)
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              4 questions simples pour rendre une demande “vraiment claire”
            </h3>

            <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-3xl">
              En clarifiant type, objectifs, trace, critères et contraintes,
              vous obtenez une ressource plus stable, plus cohérente et plus exploitable.
            </p>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              <Step n="1" title="Type" desc="Séance, évaluation, séquence, formation, procédure…" />
              <Step n="2" title="Objectifs + trace" desc="À la fin, on obtient quoi ? (production attendue)." />
              <Step n="3" title="Critères mesurables" desc="Je valide si… (observable / mesurable)." />
              <Step n="4" title="Contraintes" desc="Durée, public, hétérogénéité, DYS, supports, outils." />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <Link
                href="/optimiseur"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-500 transition"
              >
                Clarifier / Optimiser avec Valeria →
              </Link>

              <Link
                href="/espace-profs"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                Générer une ressource (Espace Profs) →
              </Link>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              L’IA structure la demande. Vous conservez la décision (pédagogique ou opérationnelle).
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
              line1="Clarifiez objectifs, critères et trace attendue."
              line2="Générez cours, séances, évaluations, différenciation et corrigés."
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

          {/* ✅ NOUVEAU : Entreprises */}
          <div id="entreprises" className="scroll-mt-24 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                ENTREPRISES & ORGANISMES
              </p>

              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900">
                Formation, procédures, qualité : des critères mesurables
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-700">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-extrabold text-slate-900">🎯 Objectifs</p>
                  <p className="mt-1">Transformer des intentions en objectifs testables.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-extrabold text-slate-900">📌 Critères</p>
                  <p className="mt-1">Définir des critères mesurables (validation, audit, qualité).</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-extrabold text-slate-900">⚙️ Itérations</p>
                  <p className="mt-1">Amélioration continue : score indicateur + ajustements.</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                EleveAI peut servir aux responsables formation, qualité, RH : supports structurés,
                procédures claires, évaluations internes et checklists.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-500 transition"
                >
                  Demander un diagnostic →
                </Link>
                <Link
                  href="/optimiseur"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
                >
                  Tester Valeria (qualité/formation) →
                </Link>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Positionnement : rigueur, conformité, critères mesurables. L’IA est un outil, la méthode est la valeur.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-extrabold text-slate-900">Objectif</p>
          <p className="mt-2 text-sm text-slate-700">
            Clarifier → mesurer (score indicateur) → ajuster → optimiser.
            Éducation, formation, entreprise : même méthode, même exigence.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Inscription d’abord. Paiement ensuite, lorsque la base de données et les fonctions premium seront opérationnelles.
          </p>
        </div>
      </section>
    </main>
  );
}





