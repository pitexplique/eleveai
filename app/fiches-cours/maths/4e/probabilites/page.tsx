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
  { label: "Prérequis", valeur: "Fractions, dénombrer des cas" },
  { label: "Formule clé", valeur: "p = favorables / possibles" },
  { label: "Échelle", valeur: "Toujours entre 0 et 1" },
];

const usages = [
  {
    titre: "Équiprobabilité",
    detail: "Quand toutes les issues ont la même chance (dé équilibré, pièce), il suffit de compter les cas.",
  },
  {
    titre: "Événement contraire",
    detail: "La probabilité de l'événement contraire vaut 1 − p.",
  },
  {
    titre: "Comparer",
    detail: "Entre deux événements, le plus probable est celui dont la probabilité est la plus grande.",
  },
];

const exemples = [
  {
    titre: "Obtenir un nombre précis",
    donnees: "On lance un dé équilibré à 6 faces.",
    question: "Quelle est la probabilité d'obtenir un 4 ?",
    solution:
      "Il y a 6 issues possibles et 1 seule favorable (le 4). p = 1/6.",
  },
  {
    titre: "Obtenir un nombre pair",
    donnees: "On lance le même dé à 6 faces.",
    question: "Quelle est la probabilité d'obtenir un nombre pair ?",
    solution:
      "Les favorables sont 2, 4 et 6 : 3 cas sur 6. p = 3/6 = 1/2.",
  },
];

const pieges = [
  "Oublier de compter toutes les issues possibles.",
  "Donner une probabilité plus grande que 1 : c'est impossible.",
  "Confondre le nombre de cas favorables et la probabilité.",
];

const aRetenir = [
  "p = nombre de cas favorables ÷ nombre de cas possibles.",
  "Une probabilité est toujours comprise entre 0 et 1.",
  "Équiprobable : toutes les issues ont la même chance.",
];

const entrainement = [
  {
    question: "On lance un dé équilibré. Quelle est la probabilité d'obtenir 5 ?",
    correction: "1 cas favorable sur 6 possibles : p = 1/6.",
  },
  {
    question:
      "Un sac contient 3 billes rouges et 2 bleues. Quelle est la probabilité de tirer une rouge ?",
    correction: "3 cas favorables sur 5 possibles : p = 3/5.",
  },
  {
    question:
      "Avec un dé, quelle est la probabilité d'obtenir un nombre strictement supérieur à 4 ?",
    correction: "Favorables : 5 et 6, soit 2 cas sur 6. p = 2/6 = 1/3.",
  },
  {
    question: "Une probabilité peut-elle valoir 1,5 ? Pourquoi ?",
    correction:
      "Non. Une probabilité est toujours comprise entre 0 (impossible) et 1 (certain).",
  },
];

const notions = [
  {
    titre: "Cas possibles",
    texte: "On compte toutes les issues possibles de l'expérience.",
  },
  {
    titre: "Cas favorables",
    texte: "On compte les issues qui réalisent l'événement cherché.",
  },
  {
    titre: "Calculer",
    texte: "On divise : p = favorables ÷ possibles, puis on simplifie.",
  },
];

const classeSlides: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Probabilités - 4e",
    section: {
      type: "objectif",
      phrase: "Mesurer la chance qu'un événement se produise",
      sousPhrase:
        "Une probabilité est comprise entre 0 (impossible) et 1 (certain).",
      encadre: {
        titre: "L'idée",
        texte: "On compte les cas favorables parmi tous les cas possibles.",
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
          "Jeux de hasard (dés, cartes, loto), météo (« 70 % de pluie »), assurances, sport, médecine pour évaluer des risques.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La théorie des probabilités est née au XVIIe siècle d'une correspondance entre Blaise Pascal et Pierre de Fermat sur les jeux de dés.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: { type: "cartes", cartes: notions },
  },
  {
    titre: "La formule",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "p = favorables / possibles",
      sousPhrase: "Une probabilité est toujours comprise entre 0 et 1.",
      encadre: {
        titre: "Équiprobable",
        texte: "Quand chaque issue a la même chance, il suffit de compter.",
      },
    },
  },
  {
    titre: "3 réflexes utiles",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Obtenir un nombre précis",
    section: {
      type: "exemple",
      enonce: "On lance un dé équilibré à 6 faces.",
      question: "Probabilité d'obtenir un 4 ?",
      correction: "6 issues possibles, 1 seule favorable (le 4). p = 1/6.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Obtenir un nombre pair",
    section: {
      type: "exemple",
      enonce: "On lance le même dé à 6 faces.",
      question: "Probabilité d'un nombre pair ?",
      correction: "Favorables : 2, 4 et 6, soit 3 cas sur 6. p = 3/6 = 1/2.",
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
      enonce: "Un sac contient 3 billes rouges et 2 bleues.",
      question: "Probabilité de tirer une rouge ?",
      indice: "p = cas favorables / cas possibles.",
      correction: "3 cas favorables sur 5 possibles : p = 3/5.",
    },
  },
];

export default function ProbabilitesQuatriemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fdf4fb] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-fuchsia-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-fuchsia-500 shadow-sm">
          1/6
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-amber-500 shadow-sm">
          🎲
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-xl font-black text-emerald-500 shadow-sm">
          0 → 1
        </div>
        <div className="absolute bottom-60 right-16 rotate-6 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-pink-500 shadow-sm">
          ½
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
            <span className="text-slate-900">Les probabilités</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <ModeClasse sousTitre="Probabilités - 4e" slides={classeSlides} />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-fuchsia-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-fuchsia-500/30 transition hover:bg-fuchsia-400"
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
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-fuchsia-600">
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
              <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-fuchsia-700">
                4e
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              Les probabilités
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Une probabilité mesure la chance qu&apos;un événement se produise.
              Elle est comprise entre 0 (impossible) et 1 (certain).
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
              <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Wrench className="h-5 w-5 text-fuchsia-500 print:hidden" />
                  À quoi ça sert ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Les probabilités sont partout : jeux de hasard (dés, cartes,
                  loto), prévisions météo (« 70 % de pluie »), assurances, sport
                  (chances de gagner), et même en médecine pour évaluer des
                  risques.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Landmark className="h-5 w-5 text-amber-500 print:hidden" />
                  Le savais-tu ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  La théorie des probabilités est née au XVIIᵉ siècle d&apos;une
                  correspondance entre deux mathématiciens français, Blaise
                  Pascal et Pierre de Fermat, qui cherchaient à résoudre des
                  problèmes de jeux de dés.
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-4">
              <BookOpen className="h-5 w-5 text-fuchsia-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                1. Cas possibles
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On compte toutes les issues possibles de l&apos;expérience.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Lightbulb className="h-5 w-5 text-amber-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. Cas favorables
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On compte les issues qui réalisent l&apos;événement cherché.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. Calculer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On divise : p = favorables ÷ possibles, puis on simplifie.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-fuchsia-600">
                  Pour un événement
                </p>
                <p className="mt-4 text-xl font-black text-slate-900 print:text-lg">
                  p = cas favorables / cas possibles
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  Exemple : un 4 au dé → 1 favorable sur 6 = 1/6.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="mb-3 text-sm font-bold text-slate-600">
                  Une probabilité va de 0 à 1 :
                </p>
                <svg
                  viewBox="0 0 320 120"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Échelle de probabilité de 0 (impossible) à 1 (certain)"
                >
                  <line x1="30" y1="50" x2="300" y2="50" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" />
                  <line x1="30" y1="40" x2="30" y2="60" stroke="#0f172a" strokeWidth="2.5" />
                  <line x1="165" y1="40" x2="165" y2="60" stroke="#0f172a" strokeWidth="2.5" />
                  <line x1="300" y1="40" x2="300" y2="60" stroke="#0f172a" strokeWidth="2.5" />
                  <circle cx="75" cy="50" r="6" fill="#a21caf" />
                  <text x="75" y="34" fill="#a21caf" fontSize="13" fontWeight="800" textAnchor="middle">1/6</text>
                  <text x="30" y="80" fill="#0f172a" fontSize="14" fontWeight="800" textAnchor="middle">0</text>
                  <text x="165" y="80" fill="#0f172a" fontSize="14" fontWeight="800" textAnchor="middle">1/2</text>
                  <text x="300" y="80" fill="#0f172a" fontSize="14" fontWeight="800" textAnchor="middle">1</text>
                  <text x="14" y="100" fill="#64748b" fontSize="12" fontWeight="700" textAnchor="start">impossible</text>
                  <text x="308" y="100" fill="#64748b" fontSize="12" fontWeight="700" textAnchor="end">certain</text>
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
                  <p className="mt-3 rounded-xl border border-fuchsia-100 bg-fuchsia-50 p-3 text-sm leading-6 text-fuchsia-800 print:text-xs">
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
              <Calculator className="h-6 w-6 text-fuchsia-500 print:hidden" />
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
                    <summary className="cursor-pointer text-sm font-bold text-fuchsia-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-fuchsia-100 bg-fuchsia-50 p-3 text-sm leading-6 text-fuchsia-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <div className="screen-only mt-6 flex flex-wrap gap-2">
              <Link
                href="/coach-ia/maths?classe=4e"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-fuchsia-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-fuchsia-500/30 transition hover:bg-fuchsia-400"
              >
                <Sparkles className="h-4 w-4" />
                M&apos;entraîner avec le Coach IA
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-200 bg-white px-5 py-3 text-sm font-black text-fuchsia-700 shadow-sm transition hover:bg-fuchsia-50"
              >
                <Download className="h-4 w-4" />
                Télécharger en PDF
              </button>
            </div>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Les probabilités - 4e</span>
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
