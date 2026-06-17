"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calculator,
  CheckCircle2,
  Download,
  Lightbulb,
  Printer,
  Sparkles,
} from "lucide-react";

const identite = [
  { label: "Prerequis", valeur: "Triangle rectangle, hypotenuse" },
  { label: "Formule cle", valeur: "cos = adjacent / hypotenuse" },
  { label: "Outil", valeur: "Calculatrice en mode degre" },
];

const usages = [
  {
    titre: "Trouver le cote adjacent",
    detail: "On connait l'angle et l'hypotenuse : adjacent = hypotenuse x cos(angle).",
  },
  {
    titre: "Trouver l'hypotenuse",
    detail: "On connait l'angle et le cote adjacent : hypotenuse = adjacent / cos(angle).",
  },
  {
    titre: "Trouver l'angle",
    detail: "On connait les deux cotes : angle = cos puissance -1 de (adjacent / hypotenuse).",
  },
];

const exemples = [
  {
    titre: "Calculer un cote adjacent",
    donnees: "Dans le triangle ABC rectangle en A, BC = 10 cm et l'angle B vaut 60 degres.",
    question: "Calculer AB.",
    solution:
      "AB est le cote adjacent a l'angle B et BC est l'hypotenuse. cos(60) = AB / BC, donc AB = 10 x cos(60) = 10 x 0,5 = 5 cm.",
  },
  {
    titre: "Calculer l'hypotenuse",
    donnees: "Dans un triangle rectangle, le cote adjacent a un angle de 40 degres mesure 7 cm.",
    question: "Calculer l'hypotenuse au dixieme pres.",
    solution:
      "cos(40) = adjacent / hypotenuse, donc hypotenuse = 7 / cos(40), soit environ 7 / 0,766 = 9,1 cm.",
  },
];

const pieges = [
  "Confondre le cote adjacent et le cote oppose a l'angle.",
  "Laisser la calculatrice en radians au lieu des degres.",
  "Diviser quand il faut multiplier, ou l'inverse, selon l'inconnue.",
];

const aRetenir = [
  "cos(angle) = adjacent / hypotenuse : on retient CAH.",
  "L'hypotenuse est toujours le cote oppose a l'angle droit.",
  "Le cosinus d'un angle aigu est toujours compris entre 0 et 1.",
];

const entrainement = [
  {
    question:
      "Dans un triangle rectangle, l'hypotenuse mesure 12 cm et un angle mesure 30 degres. Calcule le cote adjacent.",
    correction: "adjacent = 12 x cos(30) = 12 x 0,866 = environ 10,4 cm.",
  },
  {
    question:
      "Dans un triangle rectangle, le cote adjacent mesure 8 cm et l'angle mesure 50 degres. Calcule l'hypotenuse.",
    correction: "hypotenuse = 8 / cos(50) = 8 / 0,643 = environ 12,4 cm.",
  },
  {
    question:
      "Dans le triangle RST rectangle en S, RT = 15 cm et l'angle R vaut 42 degres. Calcule RS.",
    correction:
      "RS est l'adjacent a l'angle R et RT l'hypotenuse, donc RS = 15 x cos(42) = environ 11,1 cm.",
  },
  {
    question:
      "Explique pourquoi il faut d'abord reperer l'hypotenuse avant d'utiliser le cosinus.",
    correction:
      "Le cosinus est le rapport adjacent / hypotenuse. Sans reperer l'hypotenuse (le cote oppose a l'angle droit), on ne peut pas ecrire le bon rapport.",
  },
];

export default function CosinusQuatriemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(125,211,252,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.24),transparent_32%),linear-gradient(225deg,rgba(244,114,182,0.16),transparent_28%),linear-gradient(315deg,rgba(16,185,129,0.18),transparent_34%)]" />
        <div className="absolute left-0 top-24 h-24 w-full -rotate-3 bg-blue-300/10" />
        <div className="absolute bottom-24 right-0 h-28 w-full rotate-2 bg-pink-300/10" />
        <div className="absolute left-8 top-40 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-3xl font-black text-cyan-100/40 shadow-lg shadow-slate-950/20">
          cos
        </div>
        <div className="absolute right-10 top-52 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-3xl font-black text-amber-100/45 shadow-lg shadow-slate-950/20">
          90 deg
        </div>
        <div className="absolute bottom-44 left-12 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-2xl font-black text-emerald-100/45 shadow-lg shadow-slate-950/20">
          adj / hyp
        </div>
        <div className="absolute bottom-60 right-16 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-2xl font-black text-pink-100/40 shadow-lg shadow-slate-950/20">
          triangle
        </div>
      </div>

      <div className="screen-only border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/fiches-cours"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Fiches de cours
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/40 transition hover:bg-cyan-200"
          >
            <Download className="h-4 w-4" />
            Telecharger en PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <section className="rounded-lg border border-white/15 bg-slate-950/72 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-md sm:p-8 print:border-0 print:bg-white print:p-0 print:shadow-none">
          <header className="border-b border-slate-200/20 pb-6 print:border-slate-300">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-normal print:text-slate-700">
              <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-cyan-200 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                Maths
              </span>
              <span className="rounded-full bg-pink-300/15 px-3 py-1 text-pink-200 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                4e
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                Fiche de cours
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                Trigonometrie
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-white sm:text-5xl print:text-3xl print:text-slate-950">
              Le cosinus
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 print:text-sm print:text-slate-700">
              Dans un triangle rectangle, le cosinus d&apos;un angle aigu relie
              le cote adjacent a cet angle et l&apos;hypotenuse. Il sert a
              calculer une longueur ou un angle.
            </p>
            <div className="mt-5 grid gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm sm:grid-cols-3 print:grid-cols-3 print:border-slate-300 print:bg-white print:p-3">
              {identite.map((item) => (
                <div key={item.label}>
                  <span className="block text-xs font-black uppercase text-slate-400 print:text-slate-600">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-black text-white print:text-slate-950">
                    {item.valeur}
                  </span>
                </div>
              ))}
            </div>
          </header>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 print:border-slate-300 print:bg-white">
              <BookOpen className="h-5 w-5 text-cyan-200 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-white print:mt-0 print:text-base print:text-slate-950">
                1. Reperer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                On trouve l&apos;angle droit, puis l&apos;hypotenuse : c&apos;est
                le plus grand cote, oppose a l&apos;angle droit.
              </p>
            </div>
            <div className="rounded-lg border border-pink-300/20 bg-pink-300/10 p-4 print:border-slate-300 print:bg-white">
              <Lightbulb className="h-5 w-5 text-pink-200 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-white print:mt-0 print:text-base print:text-slate-950">
                2. Choisir
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                Par rapport a l&apos;angle choisi, on identifie le cote
                adjacent, puis on ecrit cos(angle) = adjacent / hypotenuse.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 print:border-slate-300 print:bg-white">
              <CheckCircle2 className="h-5 w-5 text-emerald-200 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-white print:mt-0 print:text-base print:text-slate-950">
                3. Calculer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                On isole l&apos;inconnue, puis on calcule a la calculatrice en
                verifiant le mode degre.
              </p>
            </div>
          </div>

          <section className="border-t border-white/10 py-6 print:border-slate-300 print:py-4">
            <h2 className="text-2xl font-black text-white print:text-xl print:text-slate-950">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-center print:border-slate-300 print:bg-white">
                <p className="text-sm font-bold uppercase text-cyan-200 print:text-slate-600">
                  Dans un triangle rectangle
                </p>
                <p className="mt-4 text-2xl font-black text-white print:text-xl print:text-slate-950">
                  cos(angle) = adjacent / hypotenuse
                </p>
                <p className="mt-4 text-sm font-bold text-slate-300 print:text-slate-700">
                  Moyen mnemotechnique : CAH (Cosinus = Adjacent / Hypotenuse).
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 print:border-slate-300 print:bg-white">
                <svg
                  viewBox="0 0 320 190"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Triangle rectangle avec angle, cote adjacent et hypotenuse"
                >
                  <path
                    d="M45 145 L270 145 L45 35 Z"
                    fill="rgba(14,165,233,0.12)"
                    stroke="#7dd3fc"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M45 122 L68 122 L68 145"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="4"
                  />
                  <path
                    d="M225 145 A45 45 0 0 0 237 114"
                    fill="none"
                    stroke="#f472b6"
                    strokeWidth="5"
                  />
                  <text x="151" y="166" fill="#e0f2fe" fontSize="17" fontWeight="800" textAnchor="middle">
                    adjacent
                  </text>
                  <text x="172" y="84" fill="#e0f2fe" fontSize="17" fontWeight="800" textAnchor="middle">
                    hypotenuse
                  </text>
                  <text x="244" y="118" fill="#fbcfe8" fontSize="18" fontWeight="900">
                    angle
                  </text>
                </svg>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 py-6 print:border-slate-300 print:py-4">
            <h2 className="text-2xl font-black text-white print:text-xl print:text-slate-950">
              Selon ce que l&apos;on cherche
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3 print:grid-cols-3 print:gap-3">
              {usages.map((usage) => (
                <div
                  key={usage.titre}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4 print:border-slate-300 print:bg-white"
                >
                  <h3 className="font-black text-white print:text-slate-950">
                    {usage.titre}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                    {usage.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 py-6 print:border-slate-300 print:py-4">
            <h2 className="text-2xl font-black text-white print:text-xl print:text-slate-950">
              Exemples corriges
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              {exemples.map((exemple) => (
                <div
                  key={exemple.titre}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4 print:border-slate-300 print:bg-white"
                >
                  <h3 className="font-black text-white print:text-slate-950">
                    {exemple.titre}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 print:text-xs print:text-slate-700">
                    {exemple.donnees}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-100 print:text-xs print:text-slate-900">
                    {exemple.question}
                  </p>
                  <p className="mt-3 rounded-md bg-cyan-300/10 p-3 text-sm leading-6 text-cyan-100 print:border print:border-slate-300 print:bg-white print:text-xs print:text-slate-700">
                    {exemple.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 py-6 print:border-slate-300 print:py-4">
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 print:border-slate-300 print:bg-white">
                <h2 className="flex items-center gap-2 text-lg font-black text-white print:text-base print:text-slate-950">
                  <AlertTriangle className="h-5 w-5 text-amber-200 print:hidden" />
                  Pieges a eviter
                </h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                  {pieges.map((piege) => (
                    <li key={piege}>{piege}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 print:border-slate-300 print:bg-white">
                <h2 className="flex items-center gap-2 text-lg font-black text-white print:text-base print:text-slate-950">
                  <CheckCircle2 className="h-5 w-5 text-emerald-200 print:hidden" />
                  A retenir
                </h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                  {aRetenir.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 pt-6 print:border-slate-300 print:pt-4">
            <h2 className="flex items-center gap-2 text-2xl font-black text-white print:text-xl print:text-slate-950">
              <Calculator className="h-6 w-6 text-cyan-200 print:hidden" />
              Je m&apos;entraine
            </h2>
            <ol className="mt-4 grid gap-4 text-sm leading-6 text-slate-300 print:gap-2 print:text-xs print:text-slate-700">
              {entrainement.map((item, index) => (
                <li
                  key={item.question}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4 print:border-slate-300 print:bg-white"
                >
                  <p className="font-bold text-slate-100 print:text-slate-900">
                    {index + 1}. {item.question}
                  </p>
                  <details className="fiche-correction mt-2">
                    <summary className="cursor-pointer text-sm font-bold text-cyan-200 print:text-slate-700">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-md bg-cyan-300/10 p-3 text-sm leading-6 text-cyan-100 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <Link
              href="/coach-ia/maths?classe=4e"
              className="screen-only mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/40 transition hover:bg-cyan-200"
            >
              <Sparkles className="h-4 w-4" />
              M&apos;entrainer avec le Coach IA
            </Link>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate-400 print:mt-6 print:border-slate-300 print:text-slate-600">
            <span>EleveAI - Fiche de cours</span>
            <span>Cosinus - 4e</span>
          </footer>
        </section>
      </article>

      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900 px-4 py-3 text-sm font-black text-white shadow-2xl transition hover:bg-slate-800"
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
            color: #020617 !important;
          }

          body > header,
          body > footer,
          .screen-only {
            display: none !important;
          }

          main {
            min-height: auto !important;
            background: white !important;
            color: #020617 !important;
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
