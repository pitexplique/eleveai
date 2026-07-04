"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, Scissors, Sparkles } from "lucide-react";
import { motsMaths6e } from "@/lib/dico/maths/6e";
import type { FamilleDico, MotDico } from "@/lib/dico/types";

/* URL encodée dans le QR (traçe les inscriptions venues du jeu de cartes). */
const SIGNUP_URL = "https://eleveai.fr/auth/signin?from=cartes";

/* Les 4 « couleurs » du jeu de 32 cartes : une famille du Dico = une couleur. */
type FamilleJeu = {
  key: FamilleDico;
  suit: string; // symbole de couleur (♦ ♠ ♣ ♥)
  suitLabel: string;
  emoji: string;
  label: string;
  ring: string; // bord de carte
  chipBg: string;
  chipText: string;
  suitColor: string;
};

const FAMILLES: FamilleJeu[] = [
  {
    key: "nombres-calcul",
    suit: "♦",
    suitLabel: "Carreau",
    emoji: "🔢",
    label: "Nombres & calcul",
    ring: "border-sky-300",
    chipBg: "bg-sky-50",
    chipText: "text-sky-700",
    suitColor: "text-sky-500",
  },
  {
    key: "geometrie",
    suit: "♠",
    suitLabel: "Pique",
    emoji: "📐",
    label: "Géométrie",
    ring: "border-violet-300",
    chipBg: "bg-violet-50",
    chipText: "text-violet-700",
    suitColor: "text-violet-600",
  },
  {
    key: "grandeurs-mesures",
    suit: "♣",
    suitLabel: "Trèfle",
    emoji: "📏",
    label: "Grandeurs & mesures",
    ring: "border-emerald-300",
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-700",
    suitColor: "text-emerald-600",
  },
  {
    key: "donnees-proba",
    suit: "♥",
    suitLabel: "Cœur",
    emoji: "📊",
    label: "Données & graphiques",
    ring: "border-rose-300",
    chipBg: "bg-rose-50",
    chipText: "text-rose-700",
    suitColor: "text-rose-500",
  },
];

/* 8 cartes par famille = 32 cartes. On pioche dans le Dico existant. */
function cartesDe(fam: FamilleJeu): MotDico[] {
  return motsMaths6e.filter((m) => m.famille === fam.key).slice(0, 8);
}

/* -------------------------------------------------------------------------- */
/*  Une carte à jouer                                                         */
/* -------------------------------------------------------------------------- */

function Carte({ mot, fam, index }: { mot: MotDico; fam: FamilleJeu; index: number }) {
  return (
    <article
      className={`carte flex flex-col justify-between rounded-2xl border-2 ${fam.ring} bg-white p-4 print:rounded-none`}
    >
      {/* Coin haut : n° + couleur à gauche, emoji famille à droite */}
      <div className="flex items-start justify-between">
        <span className={`text-lg font-black leading-none ${fam.suitColor}`}>
          {fam.suit} <span className="text-slate-400">{index + 1}/8</span>
        </span>
        <span className="text-lg leading-none" aria-hidden>
          {fam.emoji}
        </span>
      </div>

      {/* Cœur de la carte : la question */}
      <div className="my-2 flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Qui suis-je&nbsp;?
        </p>
        <p className="mt-2 text-[15px] font-bold leading-snug text-slate-800 print:text-[13px]">
          {mot.definition}
        </p>
      </div>

      {/* Réponse imprimée à l'envers, en bas : on retourne la carte pour vérifier */}
      <div className="mt-2 border-t border-dashed border-slate-200 pt-1.5">
        <p className="rotate-180 text-center text-[11px] font-black text-slate-400">
          réponse&nbsp;: {mot.mot}
        </p>
      </div>
    </article>
  );
}

/* Une page A4 = une couleur = 8 cartes en 2 × 4 */
function PageFamille({ fam }: { fam: FamilleJeu }) {
  const cartes = cartesDe(fam);
  return (
    <section className="carte-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:p-3 print:shadow-none">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-black ${fam.suitColor}`}>{fam.suit}</span>
          <h2 className="text-lg font-black text-slate-900">
            {fam.emoji} {fam.label}
          </h2>
          <span className={`rounded-full ${fam.chipBg} px-2.5 py-0.5 text-xs font-black ${fam.chipText}`}>
            {fam.suitLabel}
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
          <Scissors className="h-3.5 w-3.5" />
          Découpe le long des bords
        </span>
      </header>

      <div className="carte-grid mt-4 grid grid-cols-2 gap-3 print:mt-3 print:gap-2">
        {cartes.map((mot, i) => (
          <Carte key={mot.id} mot={mot} fam={fam} index={i} />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page complète (garde + 4 familles)                                        */
/* -------------------------------------------------------------------------- */

export default function CartesSurTableClient() {
  return (
    <main className="relative isolate min-h-screen bg-[#f8f6ff] text-slate-800">
      {/* Barre d'actions (écran uniquement) */}
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/dico/maths/6e"
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
        {/* ================= PAGE DE GARDE ================= */}
        <section className="carte-page garde-page overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="text-sm font-black text-violet-600">eleveai.fr</span>
              <span className="text-slate-300">—</span>
              Plusieurs portes pour apprendre
            </span>
            <span className="hidden font-bold text-violet-600 sm:inline">
              eleveai.fr/cartes-sur-table/vers-la-6e
            </span>
          </div>

          <div className="mt-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              <Sparkles className="h-4 w-4" />
              Le jeu des 32 cartes · Maths 6ᵉ
            </p>
            <h1 className="mt-4 text-6xl font-black tracking-tight text-slate-900 print:text-5xl">
              Cartes sur table
            </h1>
            <p className="mt-3 text-lg font-bold text-slate-500">
              Qui suis-je&nbsp;? — 32 cartes pour réviser les maths en jouant
            </p>
            <p className="mt-1 text-4xl tracking-widest">
              <span className="text-sky-500">♦</span> <span className="text-violet-600">♠</span>{" "}
              <span className="text-emerald-600">♣</span> <span className="text-rose-500">♥</span>
            </p>
          </div>

          {/* Règle du jeu */}
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-6">
            <h2 className="text-center text-lg font-black text-violet-800">La règle du jeu</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>
                <span className="font-black text-violet-700">1. On lit une carte.</span> Un joueur (ou
                un parent) lit à voix haute la définition&nbsp;: «&nbsp;Qui suis-je&nbsp;?&nbsp;»
              </li>
              <li>
                <span className="font-black text-violet-700">2. On répond.</span> Le premier qui trouve
                le mot juste gagne la carte. Tout seul&nbsp;? On répond, puis on{" "}
                <span className="font-bold">retourne la carte</span> pour vérifier (la réponse est
                écrite à l&apos;envers en bas).
              </li>
              <li>
                <span className="font-black text-violet-700">3. On collectionne les familles.</span> 4
                couleurs de 8 cartes&nbsp;: rassemble une couleur complète et marque un bonus&nbsp;!
              </li>
            </ol>
          </div>

          {/* Les 4 familles + QR */}
          <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="grid grid-cols-2 gap-3">
              {FAMILLES.map((f) => (
                <div
                  key={f.key}
                  className={`flex items-center gap-2 rounded-xl border ${f.ring} ${f.chipBg} px-3 py-2`}
                >
                  <span className={`text-xl font-black ${f.suitColor}`}>{f.suit}</span>
                  <span className={`text-sm font-black ${f.chipText}`}>
                    {f.emoji} {f.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4">
              <QRCodeSVG value={SIGNUP_URL} size={92} />
              <p className="max-w-[9rem] text-center text-[11px] font-bold leading-4 text-slate-500">
                Prolonge le jeu en ligne sur eleveai.fr
              </p>
            </div>
          </div>
        </section>

        {/* ================= 4 PAGES DE CARTES ================= */}
        {FAMILLES.map((fam) => (
          <PageFamille key={fam.key} fam={fam} />
        ))}
      </article>

      {/* Styles d'impression : chaque section = une page A4 */}
      <style jsx global>{`
        @media screen {
          .carte-grid .carte {
            min-height: 190px;
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

          /* Une section = une page imprimée */
          .carte-page {
            break-after: page;
            page-break-after: always;
          }
          .carte-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }

          .garde-page {
            padding: 6mm !important;
          }

          /* Grille de cartes : remplit la hauteur de la page A4 */
          .carte-grid {
            grid-template-rows: repeat(4, 1fr);
            height: 262mm;
          }
          .carte-grid .carte {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}
