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
  { label: "Prérequis", valeur: "Multiplication, division" },
  { label: "Méthode clé", valeur: "Passage par l'unité" },
  { label: "Astuce", valeur: "Toujours x le même nombre" },
];

const exemples = [
  {
    titre: "Prix de cahiers",
    donnees: "3 cahiers coûtent 6 euros.",
    question: "Combien coûtent 5 cahiers ?",
    solution: "1 cahier coûte 2 euros, donc 5 cahiers coûtent 5 x 2 = 10 euros.",
  },
  {
    titre: "Recette",
    donnees: "Pour 4 personnes, il faut 200 g de riz.",
    question: "Combien faut-il de riz pour 6 personnes ?",
    solution:
      "1 personne correspond à 50 g, donc 6 personnes correspondent à 6 x 50 = 300 g.",
  },
];

const pieges = [
  "Croire qu'ajouter le même nombre suffit : c'est multiplier, pas additionner.",
  "Oublier de revenir à l'unité avant de multiplier.",
  "Mélanger les deux lignes du tableau (quantité et prix).",
];

const aRetenir = [
  "Proportionnel signifie : on multiplie toujours par le même nombre.",
  "Le passage à l'unité est la méthode la plus simple en 6e.",
  "Une addition identique ne prouve pas une proportionnalité.",
];

const methode = [
  {
    etape: "Étape 1",
    detail: "Lire les deux grandeurs : nombre d'objets, prix, masse, distance, durée...",
  },
  {
    etape: "Étape 2",
    detail: "Trouver le prix, la masse ou la distance pour 1 unité.",
  },
  {
    etape: "Étape 3",
    detail: "Multiplier cette valeur par la quantité demandée.",
  },
];

const entrainement = [
  {
    question: "2 stylos coûtent 4 euros. Combien coûtent 7 stylos ?",
    correction: "1 stylo coûte 4 / 2 = 2 euros, donc 7 stylos coûtent 7 x 2 = 14 euros.",
  },
  {
    question: "5 tickets coûtent 15 euros. Combien coûtent 3 tickets ?",
    correction: "1 ticket coûte 15 / 5 = 3 euros, donc 3 tickets coûtent 3 x 3 = 9 euros.",
  },
  {
    question: "Pour 10 crêpes, il faut 250 g de farine. Combien faut-il pour 20 crêpes ?",
    correction: "20 crêpes, c'est 2 x 10 crêpes, donc il faut 2 x 250 = 500 g de farine.",
  },
  {
    question:
      "Un cycliste parcourt 12 km en 30 min à vitesse régulière. Quelle distance parcourt-il en 1 h ?",
    correction: "1 h = 2 x 30 min, donc il parcourt 2 x 12 = 24 km.",
  },
];

export default function ProportionnaliteSixiemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f4fbf6] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-3xl font-black text-emerald-500 shadow-sm">
          x2
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-amber-500 shadow-sm">
          %
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-xl font-black text-cyan-500 shadow-sm">
          1 → 4
        </div>
        <div className="absolute bottom-60 right-16 rotate-6 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-pink-500 shadow-sm">
          =
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
            <span>6e</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Proportionnalité</span>
          </nav>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
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
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                6e
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Grandeurs
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              La proportionnalité
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Une situation est proportionnelle quand on passe d&apos;une
              grandeur à l&apos;autre en multipliant toujours par le même
              nombre.
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
                1. Reconnaître
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                Si on double une quantité, l&apos;autre double aussi. Si on
                triple, l&apos;autre triple aussi.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <Lightbulb className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. Revenir à l&apos;unité
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On cherche la valeur pour 1, puis on multiplie par la quantité
                demandée.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-amber-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. Vérifier
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On vérifie que le même multiplicateur fonctionne dans tout le
                tableau.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La méthode
            </h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <tbody className="divide-y divide-slate-200">
                  {methode.map((m) => (
                    <tr key={m.etape}>
                      <th className="w-44 bg-slate-50 px-4 py-3 font-black text-slate-900">
                        {m.etape}
                      </th>
                      <td className="px-4 py-3 text-slate-600">{m.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              Le tableau de proportionnalité
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
              On passe d&apos;une ligne à l&apos;autre en multipliant par le même
              nombre : ici le coefficient est 2 (1 cahier = 2 euros).
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-center text-sm">
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <th className="w-40 bg-slate-50 px-4 py-3 text-left font-black text-slate-900">
                      Nombre de cahiers
                    </th>
                    <td className="px-4 py-3 text-slate-600">1</td>
                    <td className="px-4 py-3 text-slate-600">3</td>
                    <td className="px-4 py-3 text-slate-600">5</td>
                  </tr>
                  <tr>
                    <th className="bg-slate-50 px-4 py-3 text-left font-black text-slate-900">
                      Prix (euros)
                    </th>
                    <td className="px-4 py-3 font-bold text-emerald-600">2</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">6</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm font-bold text-emerald-600">
              Coefficient de proportionnalité : x 2 (cahiers vers prix).
            </p>
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
                  <p className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm leading-6 text-emerald-800 print:text-xs">
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
              <Calculator className="h-6 w-6 text-emerald-500 print:hidden" />
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
                    <summary className="cursor-pointer text-sm font-bold text-emerald-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm leading-6 text-emerald-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <Link
              href="/coach-ia/maths?classe=6e"
              className="screen-only mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
            >
              <Sparkles className="h-4 w-4" />
              M&apos;entraîner avec le Coach IA
            </Link>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Proportionnalité - 6e</span>
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
