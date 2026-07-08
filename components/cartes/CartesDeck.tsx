"use client";

// Deck imprimable « Cartes défis » — cartes 20×5 cm, 4 questions multi-matières
// au recto + une rubrique 🤸 sport, réponses au verso. Générique (paramétré par
// niveau + banque de cartes) → réutilisable (1re avec Keep Cool, 6e sans, etc.).
// Recto/verso : 1 colonne, 5 cartes/page ; retournement sur le BORD LONG →
// la carte-réponse i tombe derrière la carte-question i (même ordre, pas d'inversion).

import { Fragment } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, Scissors, Sparkles, Dumbbell } from "lucide-react";
import type { CarteDefi } from "@/app/cartes-vacances/vers-la-premiere/data";

type MatMeta = { emoji: string; label: string; ring: string; text: string; soft: string };
const MAT: Record<string, MatMeta> = {
  maths: { emoji: "📐", label: "Maths", ring: "border-violet-300", text: "text-violet-700", soft: "bg-violet-50" },
  francais: { emoji: "✍️", label: "Français", ring: "border-sky-300", text: "text-sky-700", soft: "bg-sky-50" },
  anglais: { emoji: "🇬🇧", label: "Anglais", ring: "border-blue-300", text: "text-blue-700", soft: "bg-blue-50" },
  histoire: { emoji: "📜", label: "Histoire", ring: "border-amber-300", text: "text-amber-800", soft: "bg-amber-50" },
  geo: { emoji: "🗺️", label: "Géo", ring: "border-teal-300", text: "text-teal-700", soft: "bg-teal-50" },
  sciences: { emoji: "🔬", label: "Sciences", ring: "border-emerald-300", text: "text-emerald-700", soft: "bg-emerald-50" },
  sport: { emoji: "💪", label: "Sport", ring: "border-orange-300", text: "text-orange-700", soft: "bg-orange-50" },
  nutrition: { emoji: "🥗", label: "Nutrition", ring: "border-lime-300", text: "text-lime-700", soft: "bg-lime-50" },
};
const MAT_DEFAUT: MatMeta = { emoji: "⭐", label: "", ring: "border-slate-300", text: "text-slate-700", soft: "bg-slate-50" };

/* -------------------------------------------------------------------------- */
/*  Recto : 4 questions (2×2) + rubrique sport                                 */
/* -------------------------------------------------------------------------- */

function CarteRecto({ carte, niveau }: { carte: CarteDefi; niveau: string }) {
  return (
    <article className="carte-defi flex flex-col overflow-hidden rounded-xl border-2 border-slate-300 bg-white p-2 print:rounded-none">
      <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-wide text-slate-400">
        <span className="text-violet-600">Cartes défis · {niveau}</span>
        <span className="rounded border border-slate-400 px-1.5 py-0.5 tabular-nums text-slate-500">{carte.ref}</span>
      </div>

      {/* 4 questions ENCADRÉES avec picto */}
      <div className="mt-1 grid flex-1 grid-cols-4 gap-1.5">
        {carte.questions.map((q, i) => {
          const m = MAT[q.matiere] ?? MAT_DEFAUT;
          return (
            <div key={i} className={`flex flex-col rounded-md border ${m.ring} ${m.soft} p-1.5`}>
              <span className={`flex items-center gap-1 text-[8px] font-black uppercase tracking-wide ${m.text}`}>
                <span className="text-xs leading-none" aria-hidden>{m.emoji}</span>
                {m.label}
              </span>
              <p className="mt-0.5 text-[9px] font-bold leading-tight text-slate-800">{q.q}</p>
            </div>
          );
        })}
      </div>

      {/* Sport du jour (défi-corps) */}
      <div className="mt-1.5 flex items-center justify-between gap-2 rounded-md bg-orange-100 px-2 py-1">
        <p className="flex items-center gap-1.5 text-[9px] font-black text-orange-800">
          <Dumbbell className="h-3.5 w-3.5 shrink-0 text-orange-600" />
          <span className="uppercase tracking-wide">Sport du jour :</span> {carte.bouge}
        </p>
        <span className="shrink-0 text-[7px] font-black uppercase tracking-wide text-slate-400">eleveai.fr</span>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Verso : les 4 réponses                                                     */
/* -------------------------------------------------------------------------- */

function CarteVerso({ carte }: { carte: CarteDefi }) {
  return (
    <article className="carte-defi flex flex-col overflow-hidden rounded-xl border-2 border-slate-800 bg-white p-2.5 print:rounded-none">
      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wide text-slate-500">
        <span>✅ Réponses</span>
        <span className="rounded border-2 border-slate-800 px-1.5 py-0.5 tabular-nums text-slate-900">{carte.ref}</span>
      </div>
      <div className="mt-1 grid flex-1 grid-cols-4 gap-1.5">
        {carte.questions.map((q, i) => {
          const m = MAT[q.matiere] ?? MAT_DEFAUT;
          return (
            <div key={i} className="flex flex-col rounded-md border border-slate-200 bg-slate-50 p-1.5">
              <span className={`flex items-center gap-1 text-[8px] font-black uppercase tracking-wide ${m.text}`}>
                <span className="text-xs leading-none" aria-hidden>{m.emoji}</span>
                {m.label}
              </span>
              <p className="mt-0.5 text-[9px] font-bold leading-tight text-slate-900">{q.r}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-1 text-center text-[7px] font-black uppercase tracking-wide text-slate-300">
        eleveai.fr · une autre façon d&apos;apprendre
      </p>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

function PageRecto({ cartes, niveau, titre }: { cartes: CarteDefi[]; niveau: string; titre: string }) {
  return (
    <section className="carte-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:p-3 print:shadow-none">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-black text-slate-900">🃏 {titre}</h2>
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
          <Scissors className="h-3.5 w-3.5" />
          Découpe le long des bords
        </span>
      </header>
      <div className="cartes-col mt-4 grid gap-2 print:mt-3">
        {cartes.map((c) => (
          <CarteRecto key={c.ref} carte={c} niveau={niveau} />
        ))}
      </div>
    </section>
  );
}

function PageVerso({ cartes }: { cartes: CarteDefi[] }) {
  return (
    <section className="carte-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:p-3 print:shadow-none">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-black text-slate-900">🔁 Réponses (au dos)</h2>
        <span className="text-[11px] font-bold text-slate-400">Recto-verso : retourner sur le bord long</span>
      </header>
      <div className="cartes-col mt-4 grid gap-2 print:mt-3">
        {cartes.map((c) => (
          <CarteVerso key={c.ref} carte={c} />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export default function CartesDeck({
  niveau,
  cartes,
  signupFrom = "cartes",
  partenaire,
  retourHref = "/cahier-vacances",
}: {
  niveau: string; // ex "Vers la 1re"
  cartes: CarteDefi[];
  signupFrom?: string; // tag de tracking du QR (ex "keepcool")
  partenaire?: string; // ex "Keep Cool" (co-branding optionnel)
  retourHref?: string;
}) {
  const signupUrl = `https://eleveai.fr/auth/signin?from=${signupFrom}`;
  const matieres = [...new Set(cartes.flatMap((c) => c.questions.map((q) => q.matiere)))];
  const departs: number[] = [];
  for (let i = 0; i < cartes.length; i += 5) departs.push(i);

  return (
    <main className="relative isolate min-h-screen bg-[#f8f6ff] text-slate-800">
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href={retourHref}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400"
          >
            <Download className="h-4 w-4" />
            Imprimer / PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        {/* Couverture */}
        <section className="carte-page couverture-page flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 via-white to-orange-50 p-8 text-center shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-700">
            <Sparkles className="h-4 w-4" />
            Cartes défis · {niveau}
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
            Le corps <span className="text-orange-500">&amp;</span> l&apos;esprit
          </h1>
          <p className="mt-2 max-w-md text-base font-bold text-slate-500">
            {cartes.length} cartes à imprimer, découper et défier : 4 questions par carte
            + un défi sport 🤸. Réponses au dos.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {matieres.map((mt) => {
              const m = MAT[mt] ?? MAT_DEFAUT;
              return (
                <span key={mt} className={`inline-flex items-center gap-1 rounded-full ${m.soft} px-2.5 py-1 text-xs font-black ${m.text}`}>
                  <span className="text-sm leading-none">{m.emoji}</span>
                  {m.label}
                </span>
              );
            })}
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-black text-orange-700">
              <span className="text-sm leading-none">🤸</span>
              Sport
            </span>
          </div>
          {partenaire && (
            <p className="mt-4 text-sm font-black text-slate-600">
              En partenariat avec <span className="text-orange-600">{partenaire}</span> 💪
            </p>
          )}
          <div className="mt-5 flex flex-col items-center gap-2">
            <QRCodeSVG value={signupUrl} size={84} />
            <p className="text-sm font-black text-teal-700">eleveai.fr</p>
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
              Scanne pour continuer gratuitement
            </p>
          </div>
        </section>

        {/* Recto puis verso, par paquets de 5 */}
        {departs.map((depart, idx) => {
          const page = cartes.slice(depart, depart + 5);
          return (
            <Fragment key={depart}>
              <PageRecto cartes={page} niveau={niveau} titre={`À découper · paquet ${idx + 1}/${departs.length}`} />
              <PageVerso cartes={page} />
            </Fragment>
          );
        })}
      </article>

      <style jsx global>{`
        @media screen {
          .cartes-col .carte-defi {
            min-height: 116px;
          }
        }
        @media print {
          @page {
            size: A4;
            margin: 8mm;
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
          }
          .carte-page {
            break-after: page;
            page-break-after: always;
          }
          .carte-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          .couverture-page {
            min-height: 262mm;
            padding: 12mm !important;
          }
          /* 5 cartes 20×5 cm sur la hauteur utile A4 (~281 mm) */
          .cartes-col {
            grid-template-rows: repeat(5, 1fr);
            height: 281mm;
          }
          .carte-defi {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}
