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
  History,
  Lightbulb,
  Printer,
  Ruler,
  Sparkles,
} from "lucide-react";

const identite = [
  { label: "Prérequis", valeur: "Triangle rectangle, carrés, racine carrée" },
  { label: "Formule clé", valeur: "hypoténuse² = côté² + côté²" },
  { label: "Outil", valeur: "Calculatrice (touche racine carrée)" },
];

const usages = [
  {
    titre: "Calculer l'hypoténuse",
    detail: "On connaît les deux côtés de l'angle droit : hypoténuse = racine carrée de (côté² + côté²).",
  },
  {
    titre: "Calculer un côté",
    detail: "On connaît l'hypoténuse et un côté : côté = racine carrée de (hypoténuse² − autre côté²).",
  },
  {
    titre: "Vérifier l'angle droit",
    detail: "Réciproque : si le carré du plus grand côté égale la somme des carrés des deux autres, le triangle est rectangle.",
  },
];

const exemples = [
  {
    titre: "Calculer l'hypoténuse",
    donnees: "Le triangle ABC est rectangle en A, avec AB = 3 cm et AC = 4 cm.",
    question: "Calculer BC.",
    solution:
      "BC est l'hypoténuse. BC² = AB² + AC² = 3² + 4² = 9 + 16 = 25, donc BC = racine carrée de 25 = 5 cm.",
  },
  {
    titre: "Calculer un côté",
    donnees: "Le triangle ABC est rectangle en A, avec BC = 13 cm et AB = 5 cm.",
    question: "Calculer AC.",
    solution:
      "AC² = BC² − AB² = 13² − 5² = 169 − 25 = 144, donc AC = racine carrée de 144 = 12 cm.",
  },
];

const pieges = [
  "Confondre l'hypoténuse (face à l'angle droit) avec un autre côté.",
  "Oublier de prendre la racine carrée quand on cherche une longueur.",
  "Additionner les longueurs au lieu d'additionner leurs carrés.",
];

const aRetenir = [
  "Pythagore s'utilise uniquement dans un triangle rectangle.",
  "hypoténuse² = somme des carrés des deux côtés de l'angle droit.",
  "La réciproque sert à prouver qu'un triangle est rectangle.",
];

const entrainement = [
  {
    question:
      "Le triangle ABC est rectangle en A, avec AB = 6 cm et AC = 8 cm. Calcule BC.",
    correction: "BC² = 6² + 8² = 36 + 64 = 100, donc BC = racine carrée de 100 = 10 cm.",
  },
  {
    question:
      "Le triangle ABC est rectangle en A, avec BC = 17 cm et AB = 8 cm. Calcule AC.",
    correction: "AC² = 17² − 8² = 289 − 64 = 225, donc AC = racine carrée de 225 = 15 cm.",
  },
  {
    question:
      "Un triangle a pour côtés 5 cm, 12 cm et 13 cm. Est-il rectangle ?",
    correction:
      "13² = 169 et 5² + 12² = 25 + 144 = 169. Les deux sont égaux, donc le triangle est rectangle (réciproque de Pythagore).",
  },
  {
    question:
      "Explique pourquoi il faut un angle droit pour utiliser le théorème de Pythagore.",
    correction:
      "L'égalité hypoténuse² = côté² + côté² n'est vraie que dans un triangle rectangle. Sans angle droit, elle ne s'applique pas.",
  },
];

export default function PythagoreQuatriemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f5f8ff] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-sky-500 shadow-sm">
          a² + b²
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-amber-500 shadow-sm">
          90°
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-emerald-500 shadow-sm">
          √
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
            <span className="text-slate-900">Théorème de Pythagore</span>
          </nav>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
          >
            <Download className="h-4 w-4" />
            Télécharger en PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="border-b border-slate-200 pb-6">
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-sky-600">
                <Sparkles className="h-5 w-5" />
                eleveai.fr
              </span>
              <span className="text-sm font-bold italic text-slate-500">
                La liberté d&apos;apprendre
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-normal">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700">
                Maths
              </span>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">
                4e
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              Le théorème de Pythagore
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Dans un triangle rectangle, le théorème de Pythagore relie les
              longueurs des trois côtés. Il sert à calculer une longueur
              manquante ou à vérifier qu&apos;un triangle est rectangle.
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

          <section className="py-6 print:py-4">
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Ruler className="h-5 w-5 text-sky-500 print:hidden" />
                  À quoi ça sert ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Pythagore sert à calculer des distances et à vérifier des
                  angles droits : maçons et charpentiers s&apos;en servent pour des
                  murs bien droits, on calcule la longueur d&apos;une diagonale,
                  d&apos;une rampe ou d&apos;un toit, et il est utilisé en navigation
                  et en informatique.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <History className="h-5 w-5 text-amber-500 print:hidden" />
                  Le savais-tu ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Le théorème porte le nom de Pythagore, savant grec du VIᵉ siècle
                  avant J.-C. Mais les Babyloniens et les Égyptiens connaissaient
                  déjà des triangles comme 3-4-5, plus de mille ans avant lui,
                  pour tracer des angles droits.
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <BookOpen className="h-5 w-5 text-sky-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                1. Repérer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On trouve l&apos;angle droit, puis l&apos;hypoténuse : c&apos;est
                le côté opposé à l&apos;angle droit, le plus grand.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Lightbulb className="h-5 w-5 text-amber-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. Écrire
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On applique l&apos;égalité : hypoténuse² = côté² + côté² (les
                deux côtés de l&apos;angle droit).
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. Calculer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On remplace, on calcule les carrés, puis on prend la racine
                carrée pour trouver la longueur cherchée.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-sky-600">
                  Triangle rectangle en A
                </p>
                <p className="mt-4 text-2xl font-black text-slate-900 print:text-xl">
                  BC² = AB² + AC²
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  BC est l&apos;hypoténuse (face à l&apos;angle droit).
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <svg
                  viewBox="0 0 320 190"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Triangle rectangle en A avec les deux côtés et l'hypoténuse"
                >
                  <path
                    d="M45 150 L270 150 L45 40 Z"
                    fill="rgba(14,165,233,0.12)"
                    stroke="#0ea5e9"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M45 127 L68 127 L68 150"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                  />
                  <text x="150" y="172" fill="#334155" fontSize="16" fontWeight="800" textAnchor="middle">
                    côté
                  </text>
                  <text x="40" y="98" fill="#334155" fontSize="16" fontWeight="800" textAnchor="end">
                    côté
                  </text>
                  <text x="172" y="88" fill="#334155" fontSize="16" fontWeight="800" textAnchor="middle">
                    hypoténuse
                  </text>
                  <text x="38" y="36" fill="#0f172a" fontSize="14" fontWeight="700" textAnchor="end">
                    C
                  </text>
                  <text x="38" y="167" fill="#0f172a" fontSize="14" fontWeight="700" textAnchor="end">
                    A
                  </text>
                  <text x="278" y="167" fill="#0f172a" fontSize="14" fontWeight="700">
                    B
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
                  <p className="mt-3 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-800 print:text-xs">
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
              <Calculator className="h-6 w-6 text-sky-500 print:hidden" />
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
                    <summary className="cursor-pointer text-sm font-bold text-sky-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <Link
              href="/coach-ia/maths?classe=4e"
              className="screen-only mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
            >
              <Sparkles className="h-4 w-4" />
              M&apos;entraîner avec le Coach IA
            </Link>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Théorème de Pythagore - 4e</span>
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
