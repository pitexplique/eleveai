"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Landmark,
  Lightbulb,
  PencilLine,
  Printer,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import ModeClasse, { type ClasseSlide } from "@/components/fiches/ModeClasse";

// Données d'une fiche IA (tout en chaînes → sérialisable : les pages peuvent
// rester des composants serveur). Le gabarit visuel et les slides du mode classe
// sont gérés ici, une seule fois, pour toutes les fiches IA.
export type FicheIaData = {
  domaineId: "1" | "2" | "3";
  domaineLabel: string; // "Fondements" / "Usages" / "Enjeux"
  competence: string; // "1.1"
  titre: string;
  intro: string;
  identite: { label: string; valeur: string }[];
  aQuoiCaSert: string;
  leSavaisTu: string;
  notions: { titre: string; texte: string }[]; // 3
  pointsCles: {
    titre: string;
    lignes: { cle: string; detail: string }[];
    callout?: string;
  };
  exemples: { titre: string; donnees: string; question: string; solution: string }[];
  pieges: string[];
  aRetenir: string[];
  entrainement: { question: string; correction: string }[];
};

// Styles statiques (Tailwind purge les classes construites dynamiquement).
const notionStyles = [
  { Icon: BookOpen, card: "border-indigo-200 bg-indigo-50", icon: "text-indigo-500" },
  { Icon: Lightbulb, card: "border-violet-200 bg-violet-50", icon: "text-violet-500" },
  { Icon: ShieldCheck, card: "border-emerald-200 bg-emerald-50", icon: "text-emerald-500" },
];

function buildSlides(f: FicheIaData): ClasseSlide[] {
  const slides: ClasseSlide[] = [
    {
      titre: "Objectif du cours",
      badge: f.titre,
      section: {
        type: "objectif",
        phrase: f.notions[0]?.titre ?? f.titre,
        sousPhrase: f.intro,
        encadre: { titre: "À garder en tête", texte: f.aRetenir[0] ?? "" },
      },
    },
    {
      titre: "À quoi ça sert ?",
      badge: "Utilité & repère",
      section: {
        type: "duo",
        gauche: { variante: "info", titre: "Au quotidien", contenu: f.aQuoiCaSert },
        droite: { variante: "histoire", titre: "Le savais-tu ?", contenu: f.leSavaisTu },
      },
    },
    {
      titre: "Les 3 réflexes",
      badge: "Méthode",
      section: { type: "cartes", cartes: f.notions },
    },
    {
      titre: f.pointsCles.titre,
      badge: "L'essentiel",
      section: { type: "etapes", etapes: f.pointsCles.lignes.map((l) => `${l.cle} : ${l.detail}`) },
    },
  ];

  if (f.exemples[0]) {
    slides.push({
      titre: "Exemple",
      badge: f.exemples[0].titre,
      section: {
        type: "exemple",
        enonce: f.exemples[0].donnees,
        question: f.exemples[0].question,
        correction: f.exemples[0].solution,
      },
    });
  }

  slides.push({
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {f.pieges.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {f.aRetenir.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        ),
      },
    },
  });

  if (f.entrainement[0]) {
    slides.push({
      titre: "À toi de jouer",
      badge: "Exercice flash",
      section: {
        type: "exercice",
        enonce: f.entrainement[0].question,
        question: "Réfléchis, puis vérifie.",
        correction: f.entrainement[0].correction,
      },
    });
  }

  return slides;
}

export default function FicheCoursIa({ fiche }: { fiche: FicheIaData }) {
  const slides = buildSlides(fiche);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f5f6ff] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-indigo-500 shadow-sm">
          IA
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-violet-500 shadow-sm">
          {fiche.competence}
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-sky-500 shadow-sm">
          ?
        </div>
        <div className="absolute bottom-60 right-16 rotate-6 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-emerald-500 shadow-sm">
          ✓
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
            <Link href="/fiches-cours/ia" className="transition hover:text-slate-700">
              IA
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>{fiche.domaineLabel}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">{fiche.titre}</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <ModeClasse sousTitre={fiche.titre} slides={slides} />
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
              <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-700">IA</span>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">
                Domaine {fiche.domaineId} · {fiche.domaineLabel}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              {fiche.titre}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              {fiche.intro}
            </p>
            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-3 print:grid-cols-3 print:p-3">
              {fiche.identite.map((item) => (
                <div key={item.label}>
                  <span className="block text-xs font-black uppercase text-slate-500">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-black text-slate-900">{item.valeur}</span>
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
                  {fiche.aQuoiCaSert}
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Landmark className="h-5 w-5 text-amber-500 print:hidden" />
                  Le savais-tu ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  {fiche.leSavaisTu}
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            {fiche.notions.slice(0, 3).map((notion, i) => {
              const s = notionStyles[i] ?? notionStyles[0];
              const Icon = s.Icon;
              return (
                <div key={notion.titre} className={`rounded-2xl border ${s.card} p-4`}>
                  <Icon className={`h-5 w-5 ${s.icon} print:hidden`} />
                  <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                    {i + 1}. {notion.titre}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">{notion.texte}</p>
                </div>
              );
            })}
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">{fiche.pointsCles.titre}</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <tbody className="divide-y divide-slate-200">
                  {fiche.pointsCles.lignes.map((l) => (
                    <tr key={l.cle}>
                      <th className="w-44 bg-slate-50 px-4 py-3 font-black text-indigo-700">{l.cle}</th>
                      <td className="px-4 py-3 text-slate-600">{l.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {fiche.pointsCles.callout ? (
              <p className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-800 print:text-xs">
                {fiche.pointsCles.callout}
              </p>
            ) : null}
          </section>

          {fiche.exemples.length > 0 ? (
            <section className="border-t border-slate-200 py-6 print:py-4">
              <h2 className="text-2xl font-black text-slate-900 print:text-xl">Exemples</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
                {fiche.exemples.map((exemple) => (
                  <div key={exemple.titre} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="font-black text-slate-900">{exemple.titre}</h3>
                    <p className="mt-2 text-sm text-slate-600 print:text-xs">{exemple.donnees}</p>
                    <p className="mt-1 text-sm font-bold text-slate-900 print:text-xs">{exemple.question}</p>
                    <p className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-800 print:text-xs">
                      {exemple.solution}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="border-t border-slate-200 py-6 print:py-4">
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <AlertTriangle className="h-5 w-5 text-amber-500 print:hidden" />
                  Pièges à éviter
                </h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                  {fiche.pieges.map((piege) => (
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
                  {fiche.aRetenir.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-6 print:pt-4">
            <h2 className="flex items-center gap-2 text-2xl font-black text-slate-900 print:text-xl">
              <PencilLine className="h-6 w-6 text-indigo-500 print:hidden" />
              Je m&apos;entraîne
            </h2>
            <ol className="mt-4 grid gap-4 text-sm leading-6 text-slate-700 print:gap-2 print:text-xs">
              {fiche.entrainement.map((item, index) => (
                <li key={item.question} className="rounded-2xl border border-slate-200 bg-white p-4">
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

            <div className="screen-only mt-6 flex flex-wrap gap-2">
              <Link
                href="/coach-ia/ia"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
              >
                <Sparkles className="h-4 w-4" />
                M&apos;entraîner avec le Coach IA
              </Link>
              <Link
                href="/eval-pix-ia"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-3 text-sm font-black text-indigo-700 shadow-sm transition hover:bg-indigo-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                Me tester · éval Pix IA
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-3 text-sm font-black text-indigo-700 shadow-sm transition hover:bg-indigo-50"
              >
                <Download className="h-4 w-4" />
                Télécharger en PDF
              </button>
            </div>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>{fiche.titre}</span>
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

          .fiche-correction > *:not(summary) {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}
