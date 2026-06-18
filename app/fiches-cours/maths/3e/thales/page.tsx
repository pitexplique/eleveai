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
  { label: "Prérequis", valeur: "Droites parallèles, produit en croix" },
  { label: "Formule clé", valeur: "AM / AB = AN / AC = MN / BC" },
  { label: "Outil", valeur: "Calculatrice, règle" },
];

const usages = [
  {
    titre: "Calculer une longueur",
    detail: "On écrit les rapports égaux, puis on utilise le produit en croix pour trouver la longueur manquante.",
  },
  {
    titre: "Vérifier le parallélisme",
    detail: "Réciproque : si les rapports sont égaux (et les points dans le même ordre), les droites sont parallèles.",
  },
  {
    titre: "Agrandir ou réduire",
    detail: "Thalès traduit un agrandissement : toutes les longueurs sont multipliées par le même rapport.",
  },
];

const exemples = [
  {
    titre: "Calculer une longueur",
    donnees: "(MN) est parallèle à (BC). AM = 2 cm, AB = 8 cm et AC = 12 cm.",
    question: "Calculer AN.",
    solution:
      "D'après Thalès : AM / AB = AN / AC, donc AN = AC × AM / AB = 12 × 2 / 8 = 3 cm.",
  },
  {
    titre: "Calculer le grand côté",
    donnees: "(MN) est parallèle à (BC). AM = 3 cm, AB = 9 cm et MN = 4 cm.",
    question: "Calculer BC.",
    solution:
      "AM / AB = MN / BC, donc BC = MN × AB / AM = 4 × 9 / 3 = 12 cm.",
  },
];

const pieges = [
  "Écrire les longueurs dans le désordre : il faut respecter l'ordre des sommets (A, puis B, puis C).",
  "Appliquer Thalès alors que les droites ne sont pas parallèles.",
  "Oublier que A est le sommet commun aux deux droites sécantes.",
];

const aRetenir = [
  "Thalès donne des rapports égaux quand deux parallèles coupent deux sécantes.",
  "On trouve la longueur manquante par produit en croix.",
  "La réciproque sert à prouver que deux droites sont parallèles.",
];

const entrainement = [
  {
    question:
      "(MN) est parallèle à (BC). AM = 2 cm, AB = 8 cm, AC = 12 cm. Calcule AN.",
    correction: "AM / AB = AN / AC, donc AN = 12 × 2 / 8 = 3 cm.",
  },
  {
    question:
      "(MN) est parallèle à (BC). AM = 4 cm, AB = 10 cm, MN = 6 cm. Calcule BC.",
    correction: "AM / AB = MN / BC, donc BC = 6 × 10 / 4 = 15 cm.",
  },
  {
    question:
      "Dans un triangle, M est sur [AB] et N sur [AC] avec AM / AB = 2/5 et AN / AC = 2/5. Que peut-on en déduire ?",
    correction:
      "Les deux rapports sont égaux et les points sont dans le même ordre : d'après la réciproque de Thalès, (MN) est parallèle à (BC).",
  },
  {
    question:
      "Pourquoi faut-il que les droites soient parallèles pour appliquer le théorème de Thalès ?",
    correction:
      "Le théorème ne donne des rapports égaux que si les droites sont parallèles. Sans ce parallélisme, l'égalité des rapports est fausse.",
  },
];

const notions = [
  {
    titre: "Repérer",
    texte:
      "On vérifie la configuration : deux droites sécantes en A et deux droites parallèles.",
  },
  {
    titre: "Écrire",
    texte:
      "On écrit l'égalité des rapports en respectant l'ordre des sommets : AM / AB = AN / AC = MN / BC.",
  },
  {
    titre: "Calculer",
    texte:
      "On garde les deux rapports utiles, puis on calcule la longueur manquante par produit en croix.",
  },
];

const classeSlides: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Thalès - 3e",
    section: {
      type: "objectif",
      phrase: "Calculer une longueur avec le théorème de Thalès",
      sousPhrase:
        "Deux parallèles coupant deux sécantes donnent des rapports de longueurs égaux.",
      encadre: {
        titre: "L'idée",
        texte: "Des triangles emboîtés ont des côtés proportionnels.",
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
          "Mesurer la hauteur d'un arbre par son ombre, la largeur d'une rivière, les agrandissements et réductions (plans, maquettes, échelles).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Thalès de Milet (vers 600 av. J.-C.) aurait mesuré la hauteur de la grande pyramide en comparant son ombre à celle d'un bâton.",
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
      phrase: "AM / AB = AN / AC = MN / BC",
      sousPhrase: "A est le sommet commun aux deux droites sécantes.",
      encadre: {
        titre: "Condition",
        texte: "(MN) doit être parallèle à (BC).",
      },
    },
  },
  {
    titre: "Selon l'inconnue",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Calculer une longueur",
    section: {
      type: "exemple",
      enonce: "(MN) // (BC). AM = 2 cm, AB = 8 cm, AC = 12 cm.",
      question: "Calculer AN.",
      correction: "AM / AB = AN / AC, donc AN = 12 x 2 / 8 = 3 cm.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Calculer le grand côté",
    section: {
      type: "exemple",
      enonce: "(MN) // (BC). AM = 3 cm, AB = 9 cm, MN = 4 cm.",
      question: "Calculer BC.",
      correction: "AM / AB = MN / BC, donc BC = 4 x 9 / 3 = 12 cm.",
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
      enonce: "(MN) // (BC). AM = 4 cm, AB = 10 cm, MN = 6 cm.",
      question: "Calcule BC.",
      indice: "AM / AB = MN / BC, puis produit en croix.",
      correction: "BC = 6 x 10 / 4 = 15 cm.",
    },
  },
];

export default function ThalesTroisiemePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f5f6ff] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-xl font-black text-indigo-500 shadow-sm">
          AM / AB
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-amber-500 shadow-sm">
          //
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-emerald-500 shadow-sm">
          △
        </div>
        <div className="absolute bottom-60 right-16 rotate-6 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-pink-500 shadow-sm">
          ✕
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
            <span>3e</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Théorème de Thalès</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <ModeClasse sousTitre="Thalès - 3e" slides={classeSlides} />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
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
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-indigo-600">
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
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">
                3e
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              Le théorème de Thalès
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Quand deux droites parallèles coupent deux droites sécantes, le
              théorème de Thalès donne des rapports de longueurs égaux. Il sert
              à calculer une longueur ou à prouver un parallélisme.
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
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Wrench className="h-5 w-5 text-indigo-500 print:hidden" />
                  À quoi ça sert ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Thalès permet de mesurer des hauteurs ou des distances
                  impossibles à atteindre : la hauteur d&apos;un arbre ou d&apos;un
                  immeuble grâce à son ombre, la largeur d&apos;une rivière... Il
                  est aussi à la base des agrandissements et réductions (plans,
                  maquettes, échelles).
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Landmark className="h-5 w-5 text-amber-500 print:hidden" />
                  Le savais-tu ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Thalès de Milet (vers 600 avant J.-C.) était un savant grec,
                  considéré comme l&apos;un des « sept sages » de la Grèce. La
                  légende raconte qu&apos;il a mesuré la hauteur de la grande
                  pyramide d&apos;Égypte en comparant son ombre à celle d&apos;un
                  bâton.
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
              <BookOpen className="h-5 w-5 text-indigo-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                1. Repérer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On vérifie la configuration : deux droites sécantes en A et deux
                droites parallèles.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Lightbulb className="h-5 w-5 text-amber-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. Écrire
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On écrit l&apos;égalité des rapports en respectant l&apos;ordre des
                sommets : AM / AB = AN / AC = MN / BC.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. Calculer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                On garde les deux rapports utiles, puis on calcule la longueur
                manquante par produit en croix.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-indigo-600">
                  Si (MN) est parallèle à (BC)
                </p>
                <p className="mt-4 text-xl font-black text-slate-900 print:text-lg">
                  AM / AB = AN / AC = MN / BC
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  A est le sommet commun aux deux droites.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <svg
                  viewBox="0 0 320 200"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Triangle ABC avec la droite (MN) parallèle à (BC)"
                >
                  <path d="M160 28 L40 168" stroke="#94a3b8" strokeWidth="4" fill="none" />
                  <path d="M160 28 L280 168" stroke="#94a3b8" strokeWidth="4" fill="none" />
                  <path d="M40 168 L280 168" stroke="#6366f1" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M106 89 L214 89" stroke="#6366f1" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M157 84 l6 9" stroke="#6366f1" strokeWidth="3" fill="none" />
                  <path d="M157 163 l6 9" stroke="#6366f1" strokeWidth="3" fill="none" />
                  <text x="160" y="20" fill="#0f172a" fontSize="15" fontWeight="800" textAnchor="middle">A</text>
                  <text x="30" y="182" fill="#0f172a" fontSize="15" fontWeight="800" textAnchor="middle">B</text>
                  <text x="290" y="182" fill="#0f172a" fontSize="15" fontWeight="800" textAnchor="middle">C</text>
                  <text x="92" y="86" fill="#4338ca" fontSize="15" fontWeight="800" textAnchor="end">M</text>
                  <text x="226" y="86" fill="#4338ca" fontSize="15" fontWeight="800">N</text>
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
                  <p className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-800 print:text-xs">
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
              <Calculator className="h-6 w-6 text-indigo-500 print:hidden" />
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
                    <summary className="cursor-pointer text-sm font-bold text-indigo-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <Link
              href="/coach-ia/maths?classe=3e"
              className="screen-only mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              <Sparkles className="h-4 w-4" />
              M&apos;entraîner avec le Coach IA
            </Link>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Théorème de Thalès - 3e</span>
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
