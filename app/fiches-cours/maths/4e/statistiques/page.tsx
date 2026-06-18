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
  Landmark,
  Lightbulb,
  Printer,
  Sparkles,
  Wrench,
} from "lucide-react";
import ModeClasse, { type ClasseSlide } from "@/components/fiches/ModeClasse";

const identite = [
  { label: "Prérequis", valeur: "Addition, division, ranger des nombres" },
  { label: "Indicateurs", valeur: "Moyenne, médiane, étendue" },
  { label: "Outil", valeur: "Calculatrice" },
];

const usages = [
  {
    titre: "La moyenne",
    detail: "Elle donne un « niveau général » : elle équilibre toutes les valeurs de la série.",
  },
  {
    titre: "La médiane",
    detail: "C'est la valeur centrale : elle partage la série en deux et résiste aux valeurs extrêmes.",
  },
  {
    titre: "L'étendue",
    detail: "Elle mesure la dispersion : l'écart entre la plus grande et la plus petite valeur.",
  },
];

const exemples = [
  {
    titre: "Calculer une moyenne",
    donnees: "Les notes d'un élève sont : 8, 12, 10, 14 et 16.",
    question: "Calculer la moyenne.",
    solution:
      "Moyenne = (8 + 12 + 10 + 14 + 16) ÷ 5 = 60 ÷ 5 = 12.",
  },
  {
    titre: "Médiane et étendue",
    donnees: "On range la série : 8, 10, 12, 14, 16.",
    question: "Donner la médiane et l'étendue.",
    solution:
      "Il y a 5 valeurs : la médiane est celle du milieu, soit 12. Étendue = 16 − 8 = 8.",
  },
];

const pieges = [
  "Oublier de ranger les valeurs dans l'ordre avant de chercher la médiane.",
  "Diviser par autre chose que le nombre de valeurs pour la moyenne.",
  "Confondre la moyenne (équilibre) et la médiane (valeur du milieu).",
];

const aRetenir = [
  "Moyenne = somme des valeurs ÷ nombre de valeurs.",
  "Médiane = valeur du milieu, après avoir rangé la série.",
  "Étendue = plus grande valeur − plus petite valeur.",
];

const entrainement = [
  {
    question: "Calcule la moyenne de 6, 9, 12 et 13.",
    correction: "(6 + 9 + 12 + 13) ÷ 4 = 40 ÷ 4 = 10.",
  },
  {
    question: "Donne la médiane de la série 3, 7, 8, 10, 15.",
    correction: "Il y a 5 valeurs rangées : la médiane est celle du milieu, soit 8.",
  },
  {
    question: "Quelle est l'étendue de la série 4, 9, 15, 7 ?",
    correction: "Plus grande valeur 15, plus petite 4 : étendue = 15 − 4 = 11.",
  },
  {
    question: "Pourquoi range-t-on les valeurs avant de chercher la médiane ?",
    correction:
      "La médiane est la valeur du milieu. Sans ranger la série, on ne peut pas savoir quelle valeur se trouve au centre.",
  },
];

const serie = [8, 12, 10, 14, 16];
const moyenne = 12;

const notions = [
  {
    titre: "La moyenne",
    texte:
      "On additionne toutes les valeurs, puis on divise par le nombre de valeurs.",
  },
  {
    titre: "La médiane",
    texte: "On range les valeurs dans l'ordre : la médiane est la valeur du milieu.",
  },
  {
    titre: "L'étendue",
    texte:
      "On calcule la différence entre la plus grande et la plus petite valeur.",
  },
];

const classeSlides: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Statistiques - 4e",
    section: {
      type: "objectif",
      phrase: "Résumer une série de données",
      sousPhrase: "On utilise trois indicateurs : moyenne, médiane, étendue.",
      encadre: {
        titre: "L'idée",
        texte: "Un seul nombre peut décrire toute une série.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Moyenne des notes, températures moyennes, sondages, scores au sport, données des entreprises pour décider.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Statistique » est lié au mot « État » : on comptait la population et les richesses. Les recensements existaient en Égypte et à Rome.",
      },
    },
  },
  {
    titre: "Les 3 indicateurs",
    badge: "Méthode",
    section: { type: "cartes", cartes: notions },
  },
  {
    titre: "La formule",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Moyenne = somme des valeurs ÷ nombre de valeurs",
      sousPhrase: "Médiane = valeur du milieu (série rangée). Étendue = max − min.",
      encadre: {
        titre: "Astuce",
        texte: "On range toujours la série avant de chercher la médiane.",
      },
    },
  },
  {
    titre: "À quoi sert chaque indicateur",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Calculer une moyenne",
    section: {
      type: "exemple",
      enonce: "Les notes d'un élève : 8, 12, 10, 14 et 16.",
      question: "Calculer la moyenne.",
      correction: "Moyenne = (8 + 12 + 10 + 14 + 16) ÷ 5 = 60 ÷ 5 = 12.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Médiane et étendue",
    section: {
      type: "exemple",
      enonce: "Série rangée : 8, 10, 12, 14, 16.",
      question: "Donner la médiane et l'étendue.",
      correction: "5 valeurs : médiane = 12 (milieu). Étendue = 16 − 8 = 8.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "Série : 3, 7, 8, 10, 15.",
      question: "Donne la médiane.",
      indice: "La médiane est la valeur du milieu (série rangée).",
      correction: "5 valeurs rangées : la médiane est celle du milieu, soit 8.",
    },
  },
];

export default function StatistiquesQuatriemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f2fbf9] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-xl font-black text-teal-500 shadow-sm">
          moyenne
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-amber-500 shadow-sm">
          %
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-xl font-black text-emerald-500 shadow-sm">
          médiane
        </div>
        <div className="absolute bottom-60 right-16 rotate-6 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-pink-500 shadow-sm">
          📊
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
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Fiches de cours
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>Maths</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>4e</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Les statistiques</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <ModeClasse sousTitre="Statistiques - 4e" slides={classeSlides} />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400"
            >
              <Download className="h-4 w-4" />
              Télécharger en PDF
            </button>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="border-b border-slate-200 pb-6">
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-teal-600">
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
              <span className="rounded-full bg-teal-100 px-3 py-1 text-teal-700">
                4e
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              Les statistiques
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Les statistiques servent à résumer une série de données avec des
              indicateurs : la moyenne, la médiane et l&apos;étendue.
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
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Wrench className="h-5 w-5 text-teal-500 print:hidden" />
                  À quoi ça sert ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Les statistiques permettent de comprendre des résultats et de
                  comparer : la moyenne des notes de la classe, les températures
                  moyennes, les sondages, les scores au sport, ou encore les
                  données utilisées par les entreprises pour décider.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Landmark className="h-5 w-5 text-amber-500 print:hidden" />
                  Le savais-tu ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Le mot « statistique » est lié au mot « État » : au départ, on
                  comptait la population et les richesses d&apos;un pays. Les
                  premiers recensements existaient déjà dans l&apos;Égypte ancienne
                  et à Rome, il y a plus de 2000 ans.
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
              <BookOpen className="h-5 w-5 text-teal-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                1. La moyenne
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On additionne toutes les valeurs, puis on divise par le nombre de
                valeurs.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Lightbulb className="h-5 w-5 text-amber-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. La médiane
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On range les valeurs dans l&apos;ordre : la médiane est la valeur
                du milieu.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. L&apos;étendue
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On calcule la différence entre la plus grande et la plus petite
                valeur.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-teal-600">
                  La moyenne
                </p>
                <p className="mt-4 text-xl font-black text-slate-900 print:text-lg">
                  Moyenne = somme ÷ nombre de valeurs
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  Exemple : (8 + 12 + 10 + 14 + 16) ÷ 5 = 12.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="mb-3 text-sm font-bold text-slate-600">
                  Série 8, 12, 10, 14, 16 — moyenne = 12 :
                </p>
                <svg
                  viewBox="0 0 330 170"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Diagramme en barres de la série avec la moyenne"
                >
                  <line x1="20" y1="150" x2="320" y2="150" stroke="#cbd5e1" strokeWidth="2" />
                  {serie.map((v, i) => (
                    <g key={i}>
                      <rect
                        x={34 + i * 58}
                        y={150 - v * 7}
                        width={40}
                        height={v * 7}
                        rx={4}
                        fill="#14b8a6"
                      />
                      <text
                        x={54 + i * 58}
                        y={150 - v * 7 - 6}
                        fill="#0f172a"
                        fontSize="13"
                        fontWeight="800"
                        textAnchor="middle"
                      >
                        {v}
                      </text>
                    </g>
                  ))}
                  <line
                    x1="20"
                    y1={150 - moyenne * 7}
                    x2="320"
                    y2={150 - moyenne * 7}
                    stroke="#0f766e"
                    strokeWidth="2.5"
                    strokeDasharray="6 5"
                  />
                  <text x="320" y={150 - moyenne * 7 - 6} fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="end">
                    moyenne 12
                  </text>
                </svg>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              Quel indicateur choisir ?
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
                  <p className="mt-3 rounded-xl border border-teal-100 bg-teal-50 p-3 text-sm leading-6 text-teal-800 print:text-xs">
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
              <Calculator className="h-6 w-6 text-teal-500 print:hidden" />
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
                    <summary className="cursor-pointer text-sm font-bold text-teal-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-teal-100 bg-teal-50 p-3 text-sm leading-6 text-teal-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <Link
              href="/coach-ia/maths?classe=4e"
              className="screen-only mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400"
            >
              <Sparkles className="h-4 w-4" />
              M&apos;entraîner avec le Coach IA
            </Link>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Les statistiques - 4e</span>
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
