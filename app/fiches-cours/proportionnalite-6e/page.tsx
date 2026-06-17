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
} from "lucide-react";

const identite = [
  { label: "Prerequis", valeur: "Multiplication, division" },
  { label: "Methode cle", valeur: "Passage par l'unite" },
  { label: "Astuce", valeur: "Toujours x le meme nombre" },
];

const exemples = [
  {
    titre: "Prix de cahiers",
    donnees: "3 cahiers coutent 6 euros.",
    question: "Combien coutent 5 cahiers ?",
    solution: "1 cahier coute 2 euros, donc 5 cahiers coutent 5 x 2 = 10 euros.",
  },
  {
    titre: "Recette",
    donnees: "Pour 4 personnes, il faut 200 g de riz.",
    question: "Combien faut-il de riz pour 6 personnes ?",
    solution:
      "1 personne correspond a 50 g, donc 6 personnes correspondent a 6 x 50 = 300 g.",
  },
];

const pieges = [
  "Croire qu'ajouter le meme nombre suffit : c'est multiplier, pas additionner.",
  "Oublier de revenir a l'unite avant de multiplier.",
  "Melanger les deux lignes du tableau (quantite et prix).",
];

const aRetenir = [
  "Proportionnel signifie : on multiplie toujours par le meme nombre.",
  "Le passage a l'unite est la methode la plus simple en 6e.",
  "Une addition identique ne prouve pas une proportionnalite.",
];

const entrainement = [
  "2 stylos coutent 4 euros. Combien coutent 7 stylos ?",
  "5 tickets coutent 15 euros. Combien coutent 3 tickets ?",
  "Pour 10 crepes, il faut 250 g de farine. Combien faut-il pour 20 crepes ?",
  "Un cycliste parcourt 12 km en 30 min a vitesse reguliere. Quelle distance parcourt-il en 1 h ?",
];

export default function ProportionnaliteSixiemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(125,211,252,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.24),transparent_32%),linear-gradient(225deg,rgba(251,191,36,0.18),transparent_28%),linear-gradient(315deg,rgba(56,189,248,0.18),transparent_34%)]" />
        <div className="absolute left-0 top-24 h-24 w-full -rotate-3 bg-cyan-300/10" />
        <div className="absolute bottom-24 right-0 h-28 w-full rotate-2 bg-emerald-300/10" />
        <div className="absolute left-8 top-40 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-3xl font-black text-cyan-100/40 shadow-lg shadow-slate-950/20">
          x2
        </div>
        <div className="absolute right-10 top-52 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-3xl font-black text-amber-100/45 shadow-lg shadow-slate-950/20">
          %
        </div>
        <div className="absolute bottom-44 left-12 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-2xl font-black text-emerald-100/45 shadow-lg shadow-slate-950/20">
          1 {">"} 4
        </div>
        <div className="absolute bottom-60 right-16 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-2xl font-black text-pink-100/40 shadow-lg shadow-slate-950/20">
          =
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
            className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-300"
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
              <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-emerald-200 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                6e
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                Fiche de cours
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                Grandeurs
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-white sm:text-5xl print:text-3xl print:text-slate-950">
              La proportionnalite
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 print:text-sm print:text-slate-700">
              Une situation est proportionnelle quand on passe d&apos;une
              grandeur a l&apos;autre en multipliant toujours par le meme
              nombre.
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
                1. Reconnaitre
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                Si on double une quantite, l&apos;autre double aussi. Si on
                triple, l&apos;autre triple aussi.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 print:border-slate-300 print:bg-white">
              <Lightbulb className="h-5 w-5 text-emerald-200 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-white print:mt-0 print:text-base print:text-slate-950">
                2. Revenir a l&apos;unite
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                On cherche la valeur pour 1, puis on multiplie par la quantite
                demandee.
              </p>
            </div>
            <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 print:border-slate-300 print:bg-white">
              <CheckCircle2 className="h-5 w-5 text-amber-200 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-white print:mt-0 print:text-base print:text-slate-950">
                3. Verifier
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
                On verifie que le meme multiplicateur fonctionne dans tout le
                tableau.
              </p>
            </div>
          </div>

          <section className="border-t border-white/10 py-6 print:border-slate-300 print:py-4">
            <h2 className="text-2xl font-black text-white print:text-xl print:text-slate-950">
              La methode
            </h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-white/10 print:border-slate-300">
              <table className="w-full border-collapse text-left text-sm">
                <tbody className="divide-y divide-white/10 print:divide-slate-300">
                  <tr>
                    <th className="w-44 bg-white/5 px-4 py-3 font-black text-slate-100 print:bg-slate-100 print:text-slate-950">
                      Etape 1
                    </th>
                    <td className="px-4 py-3 text-slate-300 print:text-slate-700">
                      Lire les deux grandeurs : nombre d&apos;objets, prix, masse,
                      distance, duree...
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-white/5 px-4 py-3 font-black text-slate-100 print:bg-slate-100 print:text-slate-950">
                      Etape 2
                    </th>
                    <td className="px-4 py-3 text-slate-300 print:text-slate-700">
                      Trouver le prix, la masse ou la distance pour 1 unite.
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-white/5 px-4 py-3 font-black text-slate-100 print:bg-slate-100 print:text-slate-950">
                      Etape 3
                    </th>
                    <td className="px-4 py-3 text-slate-300 print:text-slate-700">
                      Multiplier cette valeur par la quantite demandee.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-t border-white/10 py-6 print:border-slate-300 print:py-4">
            <h2 className="text-2xl font-black text-white print:text-xl print:text-slate-950">
              Le tableau de proportionnalite
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300 print:text-xs print:text-slate-700">
              On passe d&apos;une ligne a l&apos;autre en multipliant par le meme
              nombre : ici le coefficient est 2 (1 cahier = 2 euros).
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border border-white/10 print:border-slate-300">
              <table className="w-full border-collapse text-center text-sm">
                <tbody className="divide-y divide-white/10 print:divide-slate-300">
                  <tr>
                    <th className="w-40 bg-white/5 px-4 py-3 text-left font-black text-slate-100 print:bg-slate-100 print:text-slate-950">
                      Nombre de cahiers
                    </th>
                    <td className="px-4 py-3 text-slate-300 print:text-slate-700">1</td>
                    <td className="px-4 py-3 text-slate-300 print:text-slate-700">3</td>
                    <td className="px-4 py-3 text-slate-300 print:text-slate-700">5</td>
                  </tr>
                  <tr>
                    <th className="bg-white/5 px-4 py-3 text-left font-black text-slate-100 print:bg-slate-100 print:text-slate-950">
                      Prix (euros)
                    </th>
                    <td className="px-4 py-3 font-bold text-emerald-200 print:text-slate-900">2</td>
                    <td className="px-4 py-3 font-bold text-emerald-200 print:text-slate-900">6</td>
                    <td className="px-4 py-3 font-bold text-emerald-200 print:text-slate-900">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm font-bold text-emerald-200 print:text-slate-700">
              Coefficient de proportionnalite : x 2 (cahiers vers prix).
            </p>
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
                  <p className="mt-3 rounded-md bg-emerald-300/10 p-3 text-sm leading-6 text-emerald-100 print:border print:border-slate-300 print:bg-white print:text-xs print:text-slate-700">
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
              <Calculator className="h-6 w-6 text-emerald-200 print:hidden" />
              Je m&apos;entraine
            </h2>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-300 print:gap-2 print:text-xs print:text-slate-700">
              {entrainement.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate-400 print:mt-6 print:border-slate-300 print:text-slate-600">
            <span>EleveAI - Fiche de cours</span>
            <span>Proportionnalite - 6e</span>
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
        }
      `}</style>
    </main>
  );
}
