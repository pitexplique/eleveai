// app/AccueilClient.tsx
"use client";

import Link from "next/link";
import { useCallback } from "react";

const HEADER_OFFSET = 80;

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-black aspect-video shadow-sm">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="Démo Valeria / EleveAI"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function AccueilClient() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - HEADER_OFFSET;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }, []);

  const Chip = ({ label, onClick }: { label: string; onClick: () => void }) => (
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

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
      {children}
    </span>
  );

  const BigCard = ({
    title,
    subtitle,
    bullets,
    primaryHref,
    primaryLabel,
    secondaryHref,
    secondaryLabel,
  }: {
    title: string;
    subtitle: string;
    bullets: string[];
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  }) => (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-slate-500">{title}</p>
      <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
        {subtitle}
      </h3>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-0.5">✅</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col sm:flex-row gap-2">
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-500 transition"
        >
          {primaryLabel} →
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
        >
          {secondaryLabel} →
        </Link>
      </div>
    </div>
  );

  const Step = ({ n, title, desc }: { n: string; title: string; desc: string }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white font-extrabold">
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

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex flex-wrap justify-center gap-2">
              <Pill>Valeria • score /20 en temps réel</Pill>
              <Pill>IA encadrée • conformité • critères mesurables</Pill>
              <Pill>Éducation & Entreprise</Pill>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Une méthode simple :
              <br className="hidden sm:block" />
              clarifier → mesurer → améliorer.
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl mx-auto">
              <span className="font-semibold text-slate-900">EleveAI</span> aide les profs à générer des
              ressources pédagogiques robustes. <span className="font-semibold text-slate-900">Valeria</span>{" "}
              sert aussi aux entreprises (formation, procédures, qualité) en imposant des critères testables.
            </p>

            <div className="mt-6 flex flex-col items-center gap-1">
              <p className="text-sm font-extrabold text-slate-900">
                Frédéric Lacoste — Valeria Consulting
              </p>
              <p className="text-sm text-slate-700">
                Optimisation mesurable par itération contrôlée • La Réunion
              </p>
              <p className="text-xs text-slate-500">Contact : eleveai974@gmail.com</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/optimiseur"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white hover:bg-slate-800 transition"
              >
                Ouvrir Valeria (optimiseur) →
              </Link>

              <Link
                href="/espace-profs"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                EleveAI (ressources profs) →
              </Link>

              <button
                type="button"
                onClick={() => scrollTo("offres")}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                Voir les 2 offres
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Chip label="🎓 Éducation" onClick={() => scrollTo("education")} />
              <Chip label="🏭 Entreprise" onClick={() => scrollTo("entreprise")} />
              <Chip label="🎬 Démo" onClick={() => scrollTo("demo")} />
              <Chip label="🧠 Méthode" onClick={() => scrollTo("methode")} />
              <Chip label="✉️ Contact" onClick={() => scrollTo("contact")} />
            </div>
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" className="mx-auto max-w-6xl px-4 py-12 space-y-10 scroll-mt-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div id="education" className="scroll-mt-24">
            <BigCard
              title="ÉDUCATION — EleveAI"
              subtitle="Ressources prêtes à utiliser pour les profs (sans perdre la main)"
              bullets={[
                "Séances, évaluations, différenciation, corrigés.",
                "Cadre clair : neutralité, accessibilité, anti-triche & traces.",
                "Valeria sert de garde-fou : objectifs, structure, critères mesurables.",
              ]}
              primaryHref="/espace-profs"
              primaryLabel="Accéder à EleveAI (Profs)"
              secondaryHref="/optimiseur"
              secondaryLabel="Optimiser avec Valeria"
            />
          </div>

          <div id="entreprise" className="scroll-mt-24">
            <BigCard
              title="ENTREPRISE — Valeria Consulting"
              subtitle="Formation, procédures, qualité : des livrables auditables"
              bullets={[
                "Transformer des intentions en objectifs testables (KPI / critères).",
                "Générer checklists, supports de formation, procédures, évaluations internes.",
                "Méthode compatible amélioration continue : mesurer → corriger → stabiliser.",
              ]}
              primaryHref="/contact"
              primaryLabel="Demander un diagnostic"
              secondaryHref="/optimiseur"
              secondaryLabel="Tester Valeria (qualité)"
            />
          </div>
        </div>

        {/* DEMO + POUR QUI */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div id="demo" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-wider text-slate-500">Démo</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
              Valeria : score /20 → amélioration guidée
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Exemple : clarifier une demande, ajouter des critères mesurables, stabiliser la génération.
            </p>
            <div className="mt-4">
              <YouTubeEmbed videoId="ykRrez0CVN0" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-slate-500">Ce que tu vends vraiment</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
              Pas “de l’IA”. Une méthode.
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>✅ Un type clair : séance / évaluation / formation / procédure</li>
              <li>✅ Une trace attendue : ce qu’on obtient à la fin</li>
              <li>✅ Des critères mesurables : validation, barème, contrôle qualité</li>
              <li>✅ Une checklist : anti-flou, anti-dérive, anti-hallucination</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <Link
                href="/optimiseur"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-500 transition"
              >
                Lancer Valeria →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                Contact / mission →
              </Link>
            </div>
          </div>
        </div>

        {/* METHODE */}
        <div id="methode" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-500">Méthode</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
            4 étapes (public + privé)
          </h3>
          <p className="mt-2 text-sm text-slate-700 max-w-3xl">
            Même logique pour une classe de 4e ou une usine de fromage : une demande claire + des critères testables
            = une ressource stable et utilisable.
          </p>

          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            <Step n="1" title="Type" desc="Séance / évaluation / formation / procédure (un seul type)." />
            <Step n="2" title="Objectifs + trace" desc="Ce que l’on veut et ce que l’on obtient (livrable)." />
            <Step n="3" title="Critères mesurables" desc="Je valide si… (barème, seuil, checklist, KPI…)." />
            <Step n="4" title="Contraintes" desc="Durée, public, hétérogénéité, supports, outils, conformité." />
          </div>
        </div>

        {/* CONTACT */}
        <div id="contact" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-2xl font-extrabold text-slate-900">Contact</h3>
          <p className="mt-2 text-sm text-slate-700">
            Pour une mission entreprise (formation/qualité/procédures) ou un partenariat établissement :
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <a
              href="mailto:eleveai974@gmail.com"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800 transition"
            >
              Écrire à eleveai974@gmail.com →
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
            >
              Ouvrir la page contact →
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Positionnement : rigueur, conformité, critères mesurables. L’IA est l’outil — la méthode fait la valeur.
          </p>
        </div>
      </section>
    </main>
  );
}





