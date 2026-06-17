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
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const identite = [
  { label: "Prérequis", valeur: "Fractions, multiplication, division" },
  { label: "Formule clé", valeur: "p % de N = N × p / 100" },
  { label: "Outil", valeur: "Calculatrice" },
];

const usages = [
  {
    titre: "Calculer un pourcentage",
    detail: "p % d'un nombre N se calcule ainsi : N × p / 100.",
  },
  {
    titre: "Les cas faciles",
    detail: "50 % = la moitié, 25 % = le quart, 10 % = diviser par 10.",
  },
  {
    titre: "Réduction ou hausse",
    detail: "Une réduction de p % enlève une part du prix : on calcule la part, puis on soustrait.",
  },
];

const exemples = [
  {
    titre: "Calculer une part",
    donnees: "Une classe compte 25 élèves et 40 % sont demi-pensionnaires.",
    question: "Combien d'élèves sont demi-pensionnaires ?",
    solution:
      "40 % de 25 = 25 × 40 / 100 = 10. Il y a donc 10 demi-pensionnaires.",
  },
  {
    titre: "Une réduction",
    donnees: "Un article coûte 40 euros avec 10 % de réduction.",
    question: "Quel est le montant de la réduction, puis le prix payé ?",
    solution:
      "Réduction = 40 × 10 / 100 = 4 euros. Prix payé = 40 − 4 = 36 euros.",
  },
];

const pieges = [
  "Oublier de diviser par 100 : un pourcentage, c'est toujours sur 100.",
  "Confondre le montant de la réduction et le prix final.",
  "Oublier la référence : un pourcentage est toujours « de quelque chose ».",
];

const aRetenir = [
  "p % = p / 100.",
  "p % d'un nombre N = N × p / 100.",
  "50 % = moitié, 25 % = quart, 10 % = diviser par 10.",
];

const conversion = [
  { pct: "10 %", val: "8" },
  { pct: "25 %", val: "20" },
  { pct: "50 %", val: "40" },
  { pct: "100 %", val: "80" },
];

const entrainement = [
  {
    question: "Calcule 30 % de 200.",
    correction: "30 % de 200 = 200 × 30 / 100 = 60.",
  },
  {
    question:
      "Un jean coûte 60 euros avec 20 % de réduction. Quel est le montant de la réduction ?",
    correction: "60 × 20 / 100 = 12 euros de réduction.",
  },
  {
    question:
      "Dans un collège de 500 élèves, 12 % font de l'allemand. Combien d'élèves est-ce ?",
    correction: "500 × 12 / 100 = 60 élèves.",
  },
  {
    question: "Explique pourquoi 25 % correspond au quart d'un nombre.",
    correction:
      "25 / 100 = 1 / 4. Prendre 25 % d'un nombre revient donc à le diviser par 4.",
  },
];

export default function PourcentagesCinquiemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f8f6ff] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-3xl font-black text-violet-500 shadow-sm">
          %
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-xl font-black text-amber-500 shadow-sm">
          / 100
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-emerald-500 shadow-sm">
          ½
        </div>
        <div className="absolute bottom-60 right-16 rotate-6 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-pink-500 shadow-sm">
          -30%
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
            <span>5e</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Les pourcentages</span>
          </nav>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400"
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
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-violet-600">
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
              <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-700">
                5e
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              Les pourcentages
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Un pourcentage exprime une proportion sur 100. Il sert à calculer
              une part d&apos;un nombre, une réduction ou une augmentation.
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
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <ShoppingBag className="h-5 w-5 text-violet-500 print:hidden" />
                  À quoi ça sert ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Les pourcentages sont partout dans la vie : les soldes
                  (−30 %), la batterie du téléphone (80 %), les résultats de
                  sondages, les taux d&apos;intérêt, les réductions, ou encore le
                  pourcentage de matières grasses sur les étiquettes.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <History className="h-5 w-5 text-amber-500 print:hidden" />
                  Le savais-tu ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Le mot vient du latin « per centum », qui veut dire « pour
                  cent ». Les marchands italiens de la Renaissance l&apos;utilisaient
                  déjà pour les intérêts et les taxes. Le symbole % est apparu
                  petit à petit vers le XVIIᵉ siècle.
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
              <BookOpen className="h-5 w-5 text-violet-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                1. Comprendre
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                p % signifie « p sur 100 ». Par exemple 20 % = 20 / 100 = 0,2.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Lightbulb className="h-5 w-5 text-amber-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. Calculer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                Pour prendre p % d&apos;un nombre N, on calcule N × p / 100.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. Vérifier
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On vérifie avec un cas facile : 50 % = la moitié, 25 % = le
                quart, 10 % = diviser par 10.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-violet-600">
                  Prendre un pourcentage
                </p>
                <p className="mt-4 text-2xl font-black text-slate-900 print:text-xl">
                  p % de N = N × p / 100
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  On divise par 100, puis on multiplie par le nombre.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="mb-3 text-sm font-bold text-slate-600">
                  Quelques pourcentages de 80 :
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full border-collapse text-center text-sm">
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <th className="bg-slate-50 px-3 py-2 text-left font-black text-slate-900">
                          Pourcentage
                        </th>
                        {conversion.map((c) => (
                          <td key={c.pct} className="px-3 py-2 text-slate-600">
                            {c.pct}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th className="bg-slate-50 px-3 py-2 text-left font-black text-slate-900">
                          de 80
                        </th>
                        {conversion.map((c) => (
                          <td
                            key={c.pct}
                            className="px-3 py-2 font-bold text-violet-600"
                          >
                            {c.val}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                  <p className="mt-3 rounded-xl border border-violet-100 bg-violet-50 p-3 text-sm leading-6 text-violet-800 print:text-xs">
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
              <Calculator className="h-6 w-6 text-violet-500 print:hidden" />
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
                    <summary className="cursor-pointer text-sm font-bold text-violet-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-violet-100 bg-violet-50 p-3 text-sm leading-6 text-violet-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <Link
              href="/coach-ia/maths?classe=5e"
              className="screen-only mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400"
            >
              <Sparkles className="h-4 w-4" />
              M&apos;entraîner avec le Coach IA
            </Link>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Les pourcentages - 5e</span>
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
