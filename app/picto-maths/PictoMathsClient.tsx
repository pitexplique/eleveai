"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, Sparkles, MapPin } from "lucide-react";
import { LIVRET, PICTOS, type Cell, type Picto } from "./data";

const SIGNUP_URL = "https://eleveai.fr/auth/signin?from=picto";
const TI_MARGO = "/cahier-vacances/ti-margo.png";

/* -------------------------------------------------------------------------- */
/*  Illustration : composition d'icônes + valeurs (façon ardoise)             */
/* -------------------------------------------------------------------------- */

function Icones({ e, n = 1, cap }: { e: string; n?: number; cap?: string }) {
  const affichees = Math.min(n, 6);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-0.5">
        {Array.from({ length: affichees }).map((_, i) => (
          <span key={i} className="text-3xl leading-none print:text-2xl" aria-hidden>
            {e}
          </span>
        ))}
        {n > affichees && <span className="text-2xl font-black text-slate-400">…</span>}
      </div>
      {cap && <span className="text-center text-xs font-black text-slate-600">{cap}</span>}
    </div>
  );
}

function Cellule({ c }: { c: Cell }) {
  if (c.t === "ic") return <Icones e={c.e} n={c.n} cap={c.cap} />;
  if (c.t === "val")
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="rounded-xl border-2 border-cyan-300 bg-cyan-50 px-3 py-1.5 text-base font-black text-cyan-800 print:text-sm">
          {c.v}
        </span>
        {c.cap && <span className="text-xs font-black text-slate-600">{c.cap}</span>}
      </div>
    );
  if (c.t === "qm")
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 text-2xl font-black text-amber-600">
          ?
        </span>
        {c.cap && <span className="text-xs font-black text-slate-600">{c.cap}</span>}
      </div>
    );
  // op
  return <span className="px-0.5 text-2xl font-black text-slate-400 print:text-xl">{c.v}</span>;
}

function Illustration({ scene }: { scene: Cell[][] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {scene.map((row, i) => (
        <div key={i} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {row.map((c, j) => (
            <Cellule key={j} c={c} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* Un carré partagé en 6 carrés : un bloc 2×2 + cinq carrés unité (L).
   Sert d'exemple visuel au défi « partage d'un carré en n carrés ». */
function DiagrammeCarres() {
  const U = 34; // taille d'un carré unité (px)
  const units = [
    [2, 0], [2, 1], [2, 2], // colonne de droite
    [0, 2], [1, 2], // bas gauche
  ];
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 102 102" className="h-44 w-44" role="img" aria-label="Un jardin carré partagé en 6 parcelles carrées">
        {/* grande parcelle 2×2 */}
        <rect x={0} y={0} width={2 * U} height={2 * U} className="fill-emerald-100 stroke-emerald-700" strokeWidth={2} />
        {/* cinq parcelles unité */}
        {units.map(([x, y], i) => (
          <rect
            key={i}
            x={x * U}
            y={y * U}
            width={U}
            height={U}
            className="fill-amber-100 stroke-amber-600"
            strokeWidth={2}
          />
        ))}
        {/* contour du jardin */}
        <rect x={1} y={1} width={100} height={100} className="fill-none stroke-slate-800" strokeWidth={2.5} />
      </svg>
      <span className="text-xs font-black text-slate-600">Exemple : 6 parcelles carrées</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Une page-défi (une par picto)                                             */
/* -------------------------------------------------------------------------- */

function PagePicto({ p, index, total }: { p: Picto; index: number; total: number }) {
  return (
    <section className="picto-page mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:shadow-none">
      {/* Bandeau thème */}
      <header className="flex items-center justify-between gap-3 bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-3 text-white">
        <span className="inline-flex items-center gap-2 text-sm font-black">
          <span className="text-xl leading-none">{p.emoji}</span>
          {p.theme}
        </span>
        <span className="rounded-full border border-white/40 px-2 py-0.5 text-[11px] font-black tabular-nums">
          {p.ref}
        </span>
      </header>

      <div className="flex flex-col gap-5 px-6 py-6 print:py-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-700">
          <MapPin className="h-3.5 w-3.5" />
          {p.lieu}
        </p>

        {/* La grande question */}
        <h2 className="text-center text-2xl font-black leading-tight text-slate-900 sm:text-3xl print:text-2xl">
          {p.question}
        </h2>

        {/* Ardoise : l'illustration */}
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/60 px-4 py-7 print:py-6">
          {p.enonce && (
            <p className="mb-5 text-center text-sm font-bold text-slate-600 print:text-xs">{p.enonce}</p>
          )}
          {p.diagram === "carres" ? <DiagrammeCarres /> : <Illustration scene={p.scene} />}
        </div>

        {/* Pistes + place pour chercher */}
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/60 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-amber-700">💡 Un coup de pouce</p>
            <p className="mt-1 text-sm font-semibold leading-snug text-slate-700 print:text-xs">{p.piste}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start">
            <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-black text-cyan-700">
              {p.niveau}
            </span>
            <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-black text-teal-700">
              {p.notion}
            </span>
          </div>
        </div>

        {/* Zone de recherche (ardoise effaçable / brouillon) */}
        <div className="rounded-2xl border-2 border-dashed border-slate-200 px-4 py-6 text-center print:py-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
            Mon ardoise — je cherche ici
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-slate-400">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TI_MARGO} alt="" className="h-4 w-4 object-contain opacity-70" />
            {LIVRET.titre} · {LIVRET.domaine}
          </span>
          <span className="text-[11px] font-black tabular-nums text-slate-400">
            Défi {index + 1} / {total} · eleveai.fr
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page corrigés (regroupés à la fin)                                        */
/* -------------------------------------------------------------------------- */

function PageCorriges() {
  return (
    <section className="picto-page mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:p-6 print:shadow-none">
      <header className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
        <span className="text-2xl">✅</span>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Les corrigés</h2>
          <p className="text-sm font-semibold text-slate-500">À regarder après avoir cherché !</p>
        </div>
      </header>
      <ol className="space-y-3">
        {PICTOS.map((p) => (
          <li key={p.ref} className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
            <p className="flex flex-wrap items-center gap-2 text-sm font-black text-slate-800">
              <span className="rounded border border-slate-300 px-1.5 py-0.5 text-[11px] tabular-nums text-slate-500">
                {p.ref}
              </span>
              <span>{p.emoji}</span>
              {p.question}
            </p>
            <p className="mt-1.5 text-sm leading-6 text-slate-700 print:text-xs">{p.reponse}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Livret complet                                                            */
/* -------------------------------------------------------------------------- */

export default function PictoMathsClient() {
  return (
    <main className="relative isolate min-h-screen bg-[#f2fbfd] text-slate-800">
      {/* Barre écran */}
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/maths-974"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Maths Réel · 974
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-500"
          >
            <Download className="h-4 w-4" />
            Imprimer / PDF
          </button>
        </div>
      </div>

      {/* CTA aimant (écran) */}
      <div className="screen-only mx-auto max-w-4xl px-5 pt-5 sm:px-8">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-cyan-300 bg-gradient-to-r from-cyan-50 to-teal-50 p-4 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm font-black text-slate-900 sm:text-base">
            🦎 Ces défis plaisent&nbsp;? Le <span className="text-cyan-700">coach IA</span> continue en
            ligne — <span className="text-cyan-700">gratuit</span>, à ton rythme et sans jugement.
          </p>
          <Link
            href="/explorer?from=picto"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-500 hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Commencer gratuitement →
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        {/* Couverture */}
        <section className="picto-page couverture-page flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-8 text-center shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <span className="text-6xl">🌋</span>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
            <Sparkles className="h-4 w-4" />
            Défis à imprimer · gratuit
          </p>
          <h1 className="mt-3 text-6xl font-black tracking-tight text-slate-900 print:text-5xl">
            {LIVRET.titre}
            <span className="ml-2 rounded-2xl bg-amber-300 px-3 text-slate-900">{LIVRET.domaine}</span>
          </h1>
          <p className="mt-3 max-w-md text-base font-bold text-slate-500">{LIVRET.baseline}</p>
          <p className="mt-4 max-w-lg text-sm font-semibold leading-6 text-slate-600">{LIVRET.intro}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-black text-cyan-700">
              {PICTOS.length} défis
            </span>
            <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-black text-teal-700">
              CM2 → 3ᵉ
            </span>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700">
              1 image · 1 question
            </span>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TI_MARGO} alt="Ti Margo" className="h-16 w-16 object-contain" />
            <QRCodeSVG value={SIGNUP_URL} size={84} />
            <p className="text-sm font-black text-cyan-700">eleveai.fr</p>
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
              une autre façon d&apos;apprendre
            </p>
          </div>
        </section>

        {/* Les défis, un par page */}
        {PICTOS.map((p, i) => (
          <PagePicto key={p.ref} p={p} index={i} total={PICTOS.length} />
        ))}

        {/* Corrigés */}
        <PageCorriges />
      </article>

      <style jsx global>{`
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
          .picto-page {
            break-after: page;
            page-break-after: always;
            break-inside: avoid;
          }
          .picto-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          .couverture-page {
            min-height: 262mm;
            padding: 12mm !important;
          }
        }
      `}</style>
    </main>
  );
}
