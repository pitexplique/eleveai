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
  { label: "Prérequis", valeur: "Multiples, tables de multiplication" },
  { label: "Formule clé", valeur: "a/d + b/d = (a + b)/d" },
  { label: "Astuce", valeur: "Même dénominateur d'abord" },
];

const usages = [
  {
    titre: "Additionner",
    detail: "Au même dénominateur, on additionne les numérateurs et on garde le dénominateur.",
  },
  {
    titre: "Soustraire",
    detail: "Même principe : au même dénominateur, on soustrait les numérateurs.",
  },
  {
    titre: "Simplifier",
    detail: "À la fin, on simplifie la fraction obtenue si c'est possible.",
  },
];

const exemples = [
  {
    titre: "Même dénominateur",
    donnees: "On calcule 1/4 + 2/4.",
    question: "Quel est le résultat ?",
    solution:
      "Les dénominateurs sont déjà égaux : on additionne les numérateurs. 1/4 + 2/4 = 3/4.",
  },
  {
    titre: "Dénominateurs différents",
    donnees: "On calcule 1/2 + 1/3.",
    question: "Quel est le résultat ?",
    solution:
      "On met au même dénominateur (6) : 1/2 = 3/6 et 1/3 = 2/6. Donc 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
  },
];

const pieges = [
  "Additionner les dénominateurs entre eux : on ne le fait jamais.",
  "Oublier de mettre au même dénominateur avant d'additionner.",
  "Oublier de simplifier le résultat à la fin.",
];

const aRetenir = [
  "Au même dénominateur : a/d + b/d = (a + b)/d.",
  "Dénominateurs différents : on les rend égaux d'abord.",
  "On n'additionne jamais les dénominateurs entre eux.",
];

const entrainement = [
  {
    question: "Calcule 2/7 + 3/7.",
    correction: "Même dénominateur : 2/7 + 3/7 = 5/7.",
  },
  {
    question: "Calcule 1/2 + 1/4.",
    correction: "1/2 = 2/4, donc 1/2 + 1/4 = 2/4 + 1/4 = 3/4.",
  },
  {
    question: "Calcule 2/3 + 1/6.",
    correction: "2/3 = 4/6, donc 2/3 + 1/6 = 4/6 + 1/6 = 5/6.",
  },
  {
    question: "Pourquoi ne peut-on pas additionner 1/2 et 1/3 directement ?",
    correction:
      "Parce que les parts ne sont pas de la même taille. Il faut d'abord les mettre au même dénominateur (sur 6) : 3/6 + 2/6 = 5/6.",
  },
];

const bars = [
  { label: "1/2", filled: 3 },
  { label: "1/3", filled: 2 },
  { label: "5/6", filled: 5 },
];

const notions = [
  {
    titre: "Même dénominateur",
    texte:
      "On cherche un dénominateur commun, souvent un multiple commun aux deux dénominateurs.",
  },
  {
    titre: "Transformer",
    texte:
      "On réécrit chaque fraction avec ce dénominateur commun (en multipliant en haut et en bas).",
  },
  {
    titre: "Additionner",
    texte:
      "On additionne les numérateurs, on garde le dénominateur, puis on simplifie si possible.",
  },
];

const classeSlides: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions - 5e",
    section: {
      type: "objectif",
      phrase: "Additionner deux fractions",
      sousPhrase:
        "On les met au même dénominateur, puis on additionne les numérateurs.",
      encadre: {
        titre: "L'idée",
        texte: "On ne peut additionner que des parts de même taille.",
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
          "Partager (parts de pizza), cuisiner (1/2 litre, 1/4 de tablette), mesurer le temps (un quart d'heure), les rythmes en musique.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Il y a 4000 ans, les Égyptiens utilisaient surtout des fractions « unitaires » (1/2, 1/3, 1/4). La barre de fraction vient des savants arabes et indiens.",
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
      phrase: "a/d + b/d = (a + b)/d",
      sousPhrase:
        "Au même dénominateur, on additionne les numérateurs et on garde le dénominateur.",
      encadre: {
        titre: "Interdit",
        texte: "On n'additionne jamais les dénominateurs entre eux.",
      },
    },
  },
  {
    titre: "Selon le calcul",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Même dénominateur",
    section: {
      type: "exemple",
      enonce: "On calcule 1/4 + 2/4.",
      question: "Quel est le résultat ?",
      correction: "Dénominateurs déjà égaux : 1/4 + 2/4 = 3/4.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Dénominateurs différents",
    section: {
      type: "exemple",
      enonce: "On calcule 1/2 + 1/3.",
      question: "Quel est le résultat ?",
      correction: "Au même dénominateur (6) : 3/6 + 2/6 = 5/6.",
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
      enonce: "Calcule 2/3 + 1/6.",
      indice: "Mets d'abord 2/3 au dénominateur 6.",
      correction: "2/3 = 4/6, donc 4/6 + 1/6 = 5/6.",
    },
  },
];

export default function FractionsAdditionCinquiemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fff5f8] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-rose-500 shadow-sm">
          a/d
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-amber-500 shadow-sm">
          +
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-emerald-500 shadow-sm">
          = 5/6
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
            <span>5e</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Additionner des fractions</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <ModeClasse sousTitre="Fractions - 5e" slides={classeSlides} />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400"
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
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-rose-600">
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
              <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-700">
                5e
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              Additionner des fractions
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Pour additionner deux fractions, il faut d&apos;abord les mettre au
              même dénominateur, puis additionner les numérateurs.
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
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Wrench className="h-5 w-5 text-rose-500 print:hidden" />
                  À quoi ça sert ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Les fractions servent à partager (parts de pizza ou de
                  gâteau), à cuisiner (1/2 litre, 1/4 de tablette), à mesurer des
                  durées (un quart d&apos;heure), et même en musique pour les
                  rythmes (la noire, la croche...).
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Landmark className="h-5 w-5 text-amber-500 print:hidden" />
                  Le savais-tu ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Les fractions sont très anciennes : les Égyptiens, il y a près
                  de 4000 ans, utilisaient surtout des fractions « unitaires »
                  comme 1/2, 1/3 ou 1/4. La barre de fraction nous vient des
                  mathématiciens arabes et indiens du Moyen Âge.
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <BookOpen className="h-5 w-5 text-rose-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                1. Même dénominateur
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On cherche un dénominateur commun, souvent un multiple commun aux
                deux dénominateurs.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Lightbulb className="h-5 w-5 text-amber-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. Transformer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On réécrit chaque fraction avec ce dénominateur commun (en
                multipliant en haut et en bas).
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. Additionner
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On additionne les numérateurs, on garde le dénominateur, puis on
                simplifie si possible.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-rose-600">
                  Au même dénominateur
                </p>
                <p className="mt-4 text-2xl font-black text-slate-900 print:text-xl">
                  a/d + b/d = (a + b)/d
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  Exemple : 1/2 + 1/3 = 3/6 + 2/6 = 5/6.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="mb-3 text-sm font-bold text-slate-600">
                  1/2 + 1/3 ramenés sur 6 :
                </p>
                <svg
                  viewBox="0 0 320 170"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Barres de fractions montrant 1/2 plus 1/3 égale 5/6"
                >
                  {bars.map((bar, row) => (
                    <g key={bar.label}>
                      <text
                        x="52"
                        y={43 + row * 50}
                        fill="#0f172a"
                        fontSize="16"
                        fontWeight="800"
                        textAnchor="end"
                      >
                        {bar.label}
                      </text>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <rect
                          key={i}
                          x={72 + i * 36}
                          y={20 + row * 50}
                          width={36}
                          height={30}
                          fill={i < bar.filled ? "#fb7185" : "#ffffff"}
                          stroke="#cbd5e1"
                          strokeWidth={1.5}
                        />
                      ))}
                    </g>
                  ))}
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
                  <p className="mt-3 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm leading-6 text-rose-800 print:text-xs">
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
              <Calculator className="h-6 w-6 text-rose-500 print:hidden" />
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
                    <summary className="cursor-pointer text-sm font-bold text-rose-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm leading-6 text-rose-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <Link
              href="/coach-ia/maths?classe=5e"
              className="screen-only mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400"
            >
              <Sparkles className="h-4 w-4" />
              M&apos;entraîner avec le Coach IA
            </Link>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Additionner des fractions - 5e</span>
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
