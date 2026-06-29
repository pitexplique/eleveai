"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Download,
  GraduationCap,
  HandHeart,
  Heart,
  Lightbulb,
  Monitor,
  Pencil,
  Printer,
  RefreshCw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import type { CahierParentsConfig, CahierParentsData, JourParent } from "./parents-types";

/* Couleurs + libellé par domaine. */
const DOMAINES: Record<
  JourParent["domaine"],
  { label: string; chip: string; card: string; head: string }
> = {
  maths: {
    label: "Maths",
    chip: "bg-indigo-100 text-indigo-700",
    card: "border-indigo-200 bg-indigo-50/60",
    head: "text-indigo-700",
  },
  francais: {
    label: "Français",
    chip: "bg-rose-100 text-rose-700",
    card: "border-rose-200 bg-rose-50/60",
    head: "text-rose-700",
  },
  methode: {
    label: "Méthode",
    chip: "bg-emerald-100 text-emerald-700",
    card: "border-emerald-200 bg-emerald-50/60",
    head: "text-emerald-700",
  },
};

function PageEntete({ slug }: { slug: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-slate-400">
      <span className="flex items-center gap-1.5">
        <span className="font-black text-teal-600">EleveAI</span>
        <span className="text-slate-300">—</span>
        Le cahier des parents
      </span>
      <span className="hidden sm:inline">eleveai.fr/cahier-vacances/{slug}</span>
    </div>
  );
}

export default function CahierParents({
  data,
  config,
}: {
  data: CahierParentsData;
  config: CahierParentsConfig;
}) {
  const { jours, semaines } = data;
  const avecExos = jours.filter((j) => j.exercices && j.exercices.length > 0);

  return (
    <main className="relative isolate min-h-screen bg-[#f8fafc] text-slate-800">
      {/* Barre d'actions (écran) */}
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/cahier-vacances"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-500"
          >
            <Download className="h-4 w-4" />
            Télécharger en PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        {/* ================= PAGE DE GARDE ================= */}
        <section className="cahier-page garde-page overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <PageEntete slug={config.slug} />

          <div className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-teal-700">
              <GraduationCap className="h-4 w-4" />
              Le cahier des parents
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-900 print:text-4xl">
              {config.titre}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
              {config.sousTitre}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">
                🌺 100&nbsp;% Réunion
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                ✅ Conforme aux programmes
              </span>
            </div>
            <p className="mt-2 text-sm font-bold italic text-slate-500">
              Conçu à La Réunion par un professeur, pour les familles.
            </p>
            <p className="mt-1 text-base font-black text-teal-600">
              « Nou la fé&nbsp;! » 🌺
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-lg font-black text-white shadow-lg shadow-teal-600/30">
              <Sparkles className="h-5 w-5" />
              {config.mission}
            </div>
          </div>

          {/* Le programme en 3 semaines */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {semaines.map((s) => (
              <div
                key={s.numero}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-black uppercase tracking-wide text-teal-600">
                  Semaine {s.numero}
                </p>
                <p className="mt-1 text-base font-black text-slate-900">{s.titre}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{s.intro}</p>
              </div>
            ))}
          </div>

          {/* Mode d'emploi + solidaire */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
              <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
                <BookOpen className="h-5 w-5 text-teal-600" />
                Comment l&apos;utiliser
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Une page par jour, 10 minutes. Vous (re)découvrez la méthode que
                votre enfant apprend, vous l&apos;essayez, et vous repartez avec
                des façons concrètes de l&apos;aider — sans faire à sa place.
              </p>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
              <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
                <Heart className="h-4 w-4 text-orange-500" />
                Un cahier solidaire
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Gratuit : en l&apos;utilisant, vous participez à offrir
                l&apos;accès à EleveAI à un enfant qui n&apos;en a pas les
                moyens. Merci&nbsp;!
              </p>
            </div>
          </div>

          <p className="mt-7 text-center text-base font-black italic text-teal-700">
            Vous n&apos;avez pas besoin d&apos;avoir tout retenu pour bien
            accompagner. Juste de comprendre comment ça s&apos;apprend
            aujourd&apos;hui.
          </p>
        </section>

        {/* ================= PAGES JOURS ================= */}
        {semaines.map((sem) =>
          jours
            .filter((j) => j.semaine === sem.numero)
            .map((jour) => {
              const d = DOMAINES[jour.domaine];
              return (
                <section
                  key={jour.numero}
                  className="cahier-page jour-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-4 print:shadow-none"
                >
                  <PageEntete slug={config.slug} />

                  <header className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide">
                      <span className="rounded-md bg-slate-700 px-3 py-1 text-white">
                        Jour {jour.numero}
                      </span>
                      <span className={`rounded-md px-3 py-1 ${d.chip}`}>
                        {d.label}
                      </span>
                    </div>
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-500">
                      Niveau : {jour.niveau}
                    </span>
                  </header>

                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                    {jour.theme}
                  </h2>

                  {/* Ce que votre enfant apprend */}
                  <div className={`mt-4 rounded-2xl border p-4 ${d.card}`}>
                    <h3 className={`flex items-center gap-2 text-base font-black ${d.head}`}>
                      <GraduationCap className="h-5 w-5" />
                      Ce que votre enfant apprend
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {jour.methode.intro}
                    </p>
                    {jour.methode.etapes && (
                      <ol className="mt-2 grid gap-1 text-sm leading-6 text-slate-700">
                        {jour.methode.etapes.map((e, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="font-black text-slate-400">
                              {i + 1}.
                            </span>
                            <span>{e}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>

                  {/* Ce qui a changé */}
                  {jour.aChange && (
                    <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <h3 className="flex items-center gap-2 text-base font-black text-amber-700">
                        <RefreshCw className="h-4 w-4" />
                        Ce qui a changé depuis votre époque
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {jour.aChange}
                      </p>
                    </div>
                  )}

                  {/* À vous d'essayer */}
                  {jour.exercices && jour.exercices.length > 0 && (
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <h3 className="flex items-center gap-2 text-base font-black text-slate-800">
                        <Pencil className="h-5 w-5 text-teal-600" />
                        À vous d&apos;essayer
                      </h3>
                      <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
                        {jour.exercices.map((ex, i) => (
                          <li key={i}>
                            <span className="font-bold text-slate-500">
                              {i + 1}.
                            </span>{" "}
                            {ex.q}
                            <span className="ml-2 inline-block w-24 border-b border-dashed border-slate-300 align-middle" />
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-xs italic text-slate-400">
                        Corrigés à la fin du cahier.
                      </p>
                    </div>
                  )}

                  {/* Comment l'aider */}
                  <div className="mt-3 rounded-2xl border border-teal-200 bg-teal-50/60 p-4">
                    <h3 className="flex items-center gap-2 text-base font-black text-teal-700">
                      <HandHeart className="h-5 w-5" />
                      Comment l&apos;aider
                    </h3>
                    <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-slate-700">
                      {jour.aider.map((a, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-teal-500">›</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mot d'école + geste numérique */}
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4">
                      <h3 className="flex items-center gap-2 text-sm font-black text-violet-700">
                        <BookOpen className="h-4 w-4" />
                        Le mot d&apos;école
                      </h3>
                      <p className="mt-1 text-sm">
                        <span className="font-black text-violet-800">
                          {jour.mot.mot}
                        </span>
                      </p>
                      <p className="text-sm leading-6 text-slate-700">
                        {jour.mot.definition}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4">
                      <h3 className="flex items-center gap-2 text-sm font-black text-sky-700">
                        <Monitor className="h-4 w-4" />
                        Le geste numérique
                      </h3>
                      <p className="mt-1 text-sm font-bold text-sky-800">
                        {jour.geste.titre}
                      </p>
                      <p className="text-sm leading-6 text-slate-700">
                        {jour.geste.texte}
                      </p>
                    </div>
                  </div>

                  {/* Le piège à éviter */}
                  <div className="mt-3 rounded-2xl border border-rose-200 bg-rose-50/60 p-4">
                    <h3 className="flex items-center gap-2 text-sm font-black text-rose-700">
                      <TriangleAlert className="h-4 w-4" />
                      Le piège à éviter — {jour.piege.titre}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {jour.piege.texte}
                    </p>
                  </div>

                  <footer className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-3 text-sm font-bold text-teal-700">
                    <Lightbulb className="h-4 w-4" />
                    Accompagner, ce n&apos;est pas tout savoir : c&apos;est donner
                    confiance.
                  </footer>
                </section>
              );
            })
        )}

        {/* ================= CORRIGÉS ================= */}
        <section className="cahier-page corriges-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-4 print:shadow-none">
          <PageEntete slug={config.slug} />
          <header className="mt-3 border-b border-slate-200 pb-4">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-700">
              Corrigés
            </span>
            <h2 className="mt-3 flex items-center gap-2 text-2xl font-black text-slate-900">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 print:hidden" />
              Les réponses du « À vous d&apos;essayer »
            </h2>
          </header>

          <div className="mt-4 grid gap-3">
            {avecExos.map((jour) => (
              <details
                key={jour.numero}
                className="fiche-correction rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <summary className="cursor-pointer text-sm font-black text-slate-900">
                  Jour {jour.numero} — {jour.theme}
                </summary>
                <ul className="mt-3 grid gap-1.5 text-sm leading-6 text-slate-700">
                  {jour.exercices!.map((ex, i) => (
                    <li key={i}>
                      <span className="font-bold text-slate-500">{i + 1}.</span>{" "}
                      {ex.q} <span className="font-black text-emerald-700">→ {ex.r}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <div className="screen-only mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-center">
            <p className="text-sm font-bold text-slate-700">
              Envie d&apos;un coach qui accompagne votre enfant pas à pas, sans
              lui donner la réponse&nbsp;?
            </p>
            <Link
              href="/"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-500"
            >
              <Sparkles className="h-4 w-4" />
              Découvrir EleveAI
            </Link>
          </div>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500">
            <span>eleveai.fr · Le cahier des parents</span>
            <span>{config.titre}</span>
          </footer>
        </section>
      </article>

      {/* Bouton imprimer flottant */}
      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-xl shadow-slate-300/50 transition hover:bg-slate-100"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </button>
      </div>

      <style jsx global>{`
        .remerciements-bar {
          display: none !important;
        }
        @media print {
          @page {
            size: A4;
            /* haut · droite · bas · gauche — marge gauche élargie pour la
               reliure (perforation / agrafage / spirale) sans rogner le contenu. */
            margin: 7mm 7mm 7mm 16mm;
          }
          .jour-page {
            padding: 0 !important;
            font-size: 11.5px;
            line-height: 1.35;
          }
          .jour-page header {
            margin-top: 4px !important;
            padding-bottom: 4px !important;
          }
          .jour-page .rounded-2xl {
            padding: 7px !important;
          }
          .jour-page .mt-4,
          .jour-page .mt-3 {
            margin-top: 6px !important;
          }
          .jour-page h2 {
            font-size: 17px !important;
          }
          .jour-page h3 {
            font-size: 12.5px !important;
          }
          .jour-page .text-sm {
            font-size: 11px !important;
          }
          .jour-page .leading-6 {
            line-height: 1.3 !important;
          }
          html,
          body {
            background: white !important;
            color: #0f172a !important;
          }
          body > header,
          body > footer,
          .screen-only {
            display: none !important;
          }
          main {
            min-height: auto !important;
            background: white !important;
          }
          .cahier-page {
            break-after: page;
            page-break-after: always;
          }
          .cahier-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          .garde-page {
            padding: 7mm !important;
          }
          .corriges-page {
            break-before: page;
            page-break-before: always;
            padding: 0 !important;
          }
          .fiche-correction > summary {
            list-style: none;
            font-weight: 800;
            color: #0f172a !important;
          }
          .fiche-correction > *:not(summary) {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}
