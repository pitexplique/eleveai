"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Download,
  Lightbulb,
  Printer,
  Sparkles,
} from "lucide-react";

const identite = [
  { label: "Prérequis", valeur: "Triangle rectangle, hypoténuse" },
  { label: "Formule clé", valeur: "cos = adjacent / hypoténuse" },
  { label: "Outil", valeur: "Calculatrice en mode degré" },
];

const usages = [
  {
    titre: "Trouver le côté adjacent",
    detail: "On connaît l'angle et l'hypoténuse : adjacent = hypoténuse x cos(angle).",
  },
  {
    titre: "Trouver l'hypoténuse",
    detail: "On connaît l'angle et le côté adjacent : hypoténuse = adjacent / cos(angle).",
  },
  {
    titre: "Trouver l'angle",
    detail: "On connaît les deux côtés : angle = cos⁻¹ de (adjacent / hypoténuse).",
  },
];

const exemples = [
  {
    titre: "Calculer un côté adjacent",
    donnees: "Dans le triangle ABC rectangle en A, BC = 10 cm et l'angle B vaut 60 degrés.",
    question: "Calculer AB.",
    solution:
      "AB est le côté adjacent à l'angle B et BC est l'hypoténuse. cos(60) = AB / BC, donc AB = 10 x cos(60) = 10 x 0,5 = 5 cm.",
  },
  {
    titre: "Calculer l'hypoténuse",
    donnees: "Dans un triangle rectangle, le côté adjacent à un angle de 40 degrés mesure 7 cm.",
    question: "Calculer l'hypoténuse au dixième près.",
    solution:
      "cos(40) = adjacent / hypoténuse, donc hypoténuse = 7 / cos(40), soit environ 7 / 0,766 = 9,1 cm.",
  },
];

const pieges = [
  "Confondre le côté adjacent et le côté opposé à l'angle.",
  "Laisser la calculatrice en radians au lieu des degrés.",
  "Diviser quand il faut multiplier, ou l'inverse, selon l'inconnue.",
];

const aRetenir = [
  "cos(angle) = adjacent / hypoténuse : on retient CAH.",
  "L'hypoténuse est toujours le côté opposé à l'angle droit.",
  "Le cosinus d'un angle aigu est toujours compris entre 0 et 1.",
];

const entrainement = [
  {
    question:
      "Dans un triangle rectangle, l'hypoténuse mesure 12 cm et un angle mesure 30 degrés. Calcule le côté adjacent.",
    correction: "adjacent = 12 x cos(30) = 12 x 0,866 = environ 10,4 cm.",
  },
  {
    question:
      "Dans un triangle rectangle, le côté adjacent mesure 8 cm et l'angle mesure 50 degrés. Calcule l'hypoténuse.",
    correction: "hypoténuse = 8 / cos(50) = 8 / 0,643 = environ 12,4 cm.",
  },
  {
    question:
      "Dans le triangle RST rectangle en S, RT = 15 cm et l'angle R vaut 42 degrés. Calcule RS.",
    correction:
      "RS est l'adjacent à l'angle R et RT l'hypoténuse, donc RS = 15 x cos(42) = environ 11,1 cm.",
  },
  {
    question:
      "Explique pourquoi il faut d'abord repérer l'hypoténuse avant d'utiliser le cosinus.",
    correction:
      "Le cosinus est le rapport adjacent / hypoténuse. Sans repérer l'hypoténuse (le côté opposé à l'angle droit), on ne peut pas écrire le bon rapport.",
  },
];

export default function CosinusQuatriemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f5f8ff] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-3xl font-black text-cyan-500 shadow-sm">
          cos
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-amber-500 shadow-sm">
          90°
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-xl font-black text-emerald-500 shadow-sm">
          adj / hyp
        </div>
        <div className="absolute bottom-60 right-16 rotate-6 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-pink-500 shadow-sm">
          △
        </div>
      </div>

      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <nav
            aria-label="Fil d'ariane"
            className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-bold text-slate-500"
          >
            <Link
              href="/fiches-cours"
              className="inline-flex items-center gap-1.5 text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Fiches de cours
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>Maths</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>4e</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Cosinus</span>
          </nav>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
          >
            <Download className="h-4 w-4" />
            Télécharger en PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-normal">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700">
                Maths
              </span>
              <span className="rounded-full bg-pink-100 px-3 py-1 text-pink-700">
                4e
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Trigonométrie
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              Le cosinus
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Dans un triangle rectangle, le cosinus d&apos;un angle aigu relie
              le côté adjacent à cet angle et l&apos;hypoténuse. Il sert à
              calculer une longueur ou un angle.
            </p>
            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-3 print:grid-cols-3 print:p-3">
              {identite.map((item) => (
                <div key={item.label}>
                  <span className="block text-xs font-black uppercase text-slate-500">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-black text-slate-900">
                    {item.valeur}
                  </span>
                </div>
              ))}
            </div>
          </header>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
              <BookOpen className="h-5 w-5 text-cyan-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                1. Repérer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On trouve l&apos;angle droit, puis l&apos;hypoténuse : c&apos;est
                le plus grand côté, opposé à l&apos;angle droit.
              </p>
            </div>
            <div className="rounded-2xl border border-pink-200 bg-pink-50 p-4">
              <Lightbulb className="h-5 w-5 text-pink-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. Choisir
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                Par rapport à l&apos;angle choisi, on identifie le côté
                adjacent, puis on écrit cos(angle) = adjacent / hypoténuse.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. Calculer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On isole l&apos;inconnue, puis on calcule à la calculatrice en
                vérifiant le mode degré.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-cyan-600">
                  Dans un triangle rectangle
                </p>
                <p className="mt-4 text-2xl font-black text-slate-900 print:text-xl">
                  cos(angle) = adjacent / hypoténuse
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  Moyen mnémotechnique : CAH (Cosinus = Adjacent / Hypoténuse).
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <svg
                  viewBox="0 0 320 190"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Triangle rectangle avec angle, côté adjacent et hypoténuse"
                >
                  <path
                    d="M45 145 L270 145 L45 35 Z"
                    fill="rgba(14,165,233,0.12)"
                    stroke="#0ea5e9"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M45 122 L68 122 L68 145"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                  />
                  <path
                    d="M225 145 A45 45 0 0 0 237 114"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="5"
                  />
                  <text x="151" y="166" fill="#334155" fontSize="17" fontWeight="800" textAnchor="middle">
                    adjacent
                  </text>
                  <text x="168" y="84" fill="#334155" fontSize="17" fontWeight="800" textAnchor="middle">
                    hypoténuse
                  </text>
                  <text x="244" y="118" fill="#db2777" fontSize="18" fontWeight="900">
                    angle
                  </text>
                </svg>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              Selon ce que l&apos;on cherche
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3 print:grid-cols-3 print:gap-3">
              {usages.map((usage) => (
                <div
                  key={usage.titre}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <h3 className="font-black text-slate-900">{usage.titre}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                    {usage.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              Exemples corrigés
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              {exemples.map((exemple) => (
                <div
                  key={exemple.titre}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-black text-slate-900">{exemple.titre}</h3>
                  <p className="mt-2 text-sm text-slate-600 print:text-xs">
                    {exemple.donnees}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900 print:text-xs">
                    {exemple.question}
                  </p>
                  <p className="mt-3 rounded-xl border border-cyan-100 bg-cyan-50 p-3 text-sm leading-6 text-cyan-800 print:text-xs">
                    {exemple.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <AlertTriangle className="h-5 w-5 text-amber-500 print:hidden" />
                  Pièges à éviter
                </h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                  {pieges.map((piege) => (
                    <li key={piege}>{piege}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
                  À retenir
                </h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                  {aRetenir.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-6 print:pt-4">
            <h2 className="flex items-center gap-2 text-2xl font-black text-slate-900 print:text-xl">
              <Calculator className="h-6 w-6 text-cyan-500 print:hidden" />
              Je m&apos;entraîne
            </h2>
            <ol className="mt-4 grid gap-4 text-sm leading-6 text-slate-700 print:gap-2 print:text-xs">
              {entrainement.map((item, index) => (
                <li
                  key={item.question}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-bold text-slate-900">
                    {index + 1}. {item.question}
                  </p>
                  <details className="fiche-correction mt-2">
                    <summary className="cursor-pointer text-sm font-bold text-cyan-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-cyan-100 bg-cyan-50 p-3 text-sm leading-6 text-cyan-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <Link
              href="/coach-ia/maths?classe=4e"
              className="screen-only mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
            >
              <Sparkles className="h-4 w-4" />
              M&apos;entraîner avec le Coach IA
            </Link>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Cosinus - 4e</span>
          </footer>
        </section>
      </article>

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
            margin: 12mm;
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
            color: #0f172a !important;
          }

          .fiche-correction > summary {
            list-style: none;
            font-weight: 700;
            color: #475569 !important;
          }

          .fiche-correction > *:not(summary) {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}
