"use client";

// « La fromagerie dans ta main » — l'élève règle les litres de lait des
// Hauts, la fromagerie travaille sous ses yeux : pasteurisation, ferments,
// égouttage — le caillé d'un côté, le petit-lait de l'autre — et les pots
// tombent. Les maths (proportionnalité, pourcentages) sont AFFICHÉES,
// jamais cachées — la règle du journal.
//
// Chiffres pédagogiques ARRONDIS (assumés « environ ») :
//   une vache des Hauts ~20 L/jour · 1 L de lait ~1 kg
//   fromage FRAIS : caillé ~25 % / petit-lait ~75 % (4 L → 1 kg)
//   — contre ~10 L pour 1 kg de tomme affinée (l'épisode « Le lait »)
//   pot = 150 g · camion-citerne ~8 000 L
//   étiquette réelle (Open Food Facts, pour 100 g) : 184 kcal · 12 g de
//   protéines → un pot de 150 g = ×1,5 = 276 kcal · 18 g (≈ 3 œufs)

import { useEffect, useState } from "react";
import Link from "next/link";

const VACHE_L_JOUR = 20;
const PART_CAILLE = 0.25;
const PART_PETIT_LAIT = 0.75;
const POT_G = 150;
const CITERNE_L = 8000;
const KCAL_100G = 184;
const PROT_100G = 12;
const OEUF_PROT_G = 6;
const COLLEGE_ELEVES = 500;

// Formatage français des grands nombres, sans décimales inutiles.
function fr(n: number, decimales = 0): string {
  return n.toLocaleString("fr-FR", {
    maximumFractionDigits: decimales,
    minimumFractionDigits: 0,
  });
}

// ── Le schéma VIVANT de la fromagerie (SVG animé — un schéma, pas une scène) ──
// Tout bouge : le lait goutte, le camion descend des Hauts, la flamme de la
// pasteurisation vacille, les ferments bullent, le petit-lait s'égoutte, les
// pots défilent vers le froid. La cadence suit les litres : plus le lait
// arrive, plus la fromagerie s'active.
function FromagerieAnimee({ litres }: { litres: number }) {
  // De 3,6 s (4 L, au ralenti) à 0,9 s (40 000 L, pleine cadence).
  const cadence =
    (3.6 - (Math.min(litres, 40000) / 40000) * 2.7).toFixed(2) + "s";

  return (
    <div className="mt-3 overflow-x-auto rounded border border-[#1f3a47] bg-[#07131a]">
      <style>{`
        @keyframes from-flux { to { stroke-dashoffset: -28; } }
        @keyframes from-tourner { to { transform: rotate(360deg); } }
        @keyframes from-monter { 0% { transform: translateY(0); opacity: .9; } 100% { transform: translateY(-24px); opacity: 0; } }
        @keyframes from-goutter { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 100% { transform: translateY(26px); opacity: 0; } }
        @keyframes from-flamme { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.35); } }
        @keyframes from-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @keyframes from-descendre { 0% { transform: translate(0,0); opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(96px, 44px); opacity: 0; } }
        @keyframes from-defiler { 0% { transform: translateX(0); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { transform: translateX(110px); opacity: 0; } }
        .f-flux { stroke-dasharray: 10 18; animation: from-flux var(--cadence) linear infinite; }
        .f-roue { animation: from-tourner calc(var(--cadence) * 1.4) linear infinite; transform-origin: center; transform-box: fill-box; }
        .f-bulle { animation: from-monter calc(var(--cadence) * 1.6) ease-out infinite; }
        .f-goutte { animation: from-goutter calc(var(--cadence) * 1.4) ease-in infinite; }
        .f-flamme { animation: from-flamme calc(var(--cadence) * 0.8) ease-in-out infinite; transform-origin: center bottom; transform-box: fill-box; }
        .f-flocon { animation: from-pulse var(--cadence) ease-in-out infinite; }
        .f-camion { animation: from-descendre calc(var(--cadence) * 2) linear infinite; }
        .f-pot { animation: from-defiler calc(var(--cadence) * 1.6) linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .f-flux, .f-roue, .f-bulle, .f-goutte, .f-flamme, .f-flocon, .f-camion, .f-pot { animation-duration: 12s; }
        }
      `}</style>
      <svg
        viewBox="0 0 820 330"
        style={{ ["--cadence" as string]: cadence }}
        className="mx-auto block min-w-[640px] max-w-[900px]"
        aria-label="Schéma animé de la fromagerie : le lait trait dans les Hauts descend en camion, il est pasteurisé, ensemencé de ferments, égoutté — le caillé part en pots vers le froid, le petit-lait vers les cochons"
      >
        {/* LES HAUTS : la vache et la traite (en haut à gauche) */}
        <text x="40" y="26" fill="#7fb069" fontSize="12" fontWeight="700" fontFamily="monospace">LES HAUTS · LA TRAITE (1 600 m)</text>
        {/* La colline */}
        <path d="M20,120 C90,74 190,66 260,96 L260,130 L20,130 Z" fill="#12291c" />
        {/* La vache (schématique) : corps, tête, taches, pattes */}
        <g>
          <rect x="70" y="58" width="64" height="34" rx="14" fill="#eef4ee" />
          <circle cx="140" cy="66" r="13" fill="#eef4ee" />
          <circle cx="145" cy="62" r="2.2" fill="#07131a" />
          <path d="M132,54 L128,44 M148,54 L152,44" stroke="#eef4ee" strokeWidth="3" strokeLinecap="round" />
          <circle cx="90" cy="68" r="7" fill="#243b47" />
          <circle cx="112" cy="82" r="5" fill="#243b47" />
          <path d="M78,92 L78,106 M96,92 L96,106 M116,92 L116,106 M130,92 L130,106" stroke="#eef4ee" strokeWidth="4" strokeLinecap="round" />
        </g>
        {/* Les gouttes de lait vers le bidon */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={104 + i * 8} cy={100} r={3.2} fill="#eef4ee" className="f-goutte" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.4})` }} />
        ))}
        <path d="M92,128 L124,128 L120,152 L96,152 Z" fill="#0f2028" stroke="#8fb8c9" strokeWidth="2.5" />
        <text x="108" y="168" fill="#8fb8c9" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">LE BIDON</text>
        {/* La route qui descend vers Saint-Pierre + le camion-citerne */}
        <path d="M170,140 L330,214" stroke="#1f3a47" strokeWidth="8" strokeLinecap="round" />
        <g className="f-camion">
          <g transform="rotate(24 210 142)">
            <rect x="184" y="128" width="40" height="18" rx="5" fill="#eef4ee" />
            <rect x="224" y="132" width="16" height="14" rx="3" fill="#7fc4e8" />
            <circle cx="194" cy="150" r="6" fill="#243b47" stroke="#8fb8c9" strokeWidth="2" />
            <circle cx="228" cy="150" r="6" fill="#243b47" stroke="#8fb8c9" strokeWidth="2" />
          </g>
        </g>
        <text x="196" y="200" fill="#8fb8c9" fontSize="11" fontWeight="700" fontFamily="monospace" transform="rotate(24 196 200)">LA DESCENTE</text>
        {/* SAINT-PIERRE : la laiterie */}
        <text x="356" y="150" fill="#7fc4e8" fontSize="12" fontWeight="700" fontFamily="monospace">SAINT-PIERRE · LA FROMAGERIE</text>
        {/* Cuve de pasteurisation : flamme douce + 75 °C */}
        <rect x="350" y="170" width="86" height="72" rx="10" fill="#0f2028" stroke="#e07a5f" strokeWidth="3" />
        <path d="M384,236 C377,224 382,215 392,207 C390,219 400,219 398,229 C396,236 390,241 384,236 Z" fill="#e07a5f" className="f-flamme" />
        <text x="393" y="192" fill="#e07a5f" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="monospace">75 °C</text>
        <text x="393" y="258" fill="#e07a5f" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">PASTEURISATION</text>
        {/* Tuyau vers la cuve des ferments */}
        <path d="M436,200 C470,196 480,196 508,200" fill="none" stroke="#1f3a47" strokeWidth="10" />
        <path d="M436,200 C470,196 480,196 508,200" fill="none" stroke="#eef4ee" strokeWidth="4" className="f-flux" />
        {/* Cuve des ferments : bulles qui montent */}
        <rect x="508" y="168" width="86" height="74" rx="10" fill="#0f2028" stroke="#e8c94f" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={528 + i * 24} cy={226} r={4} fill="#e8c94f" className="f-bulle" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.4})` }} />
        ))}
        <text x="551" y="258" fill="#e8c94f" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">LES FERMENTS</text>
        {/* L'égouttoir : le caillé reste, le petit-lait goutte */}
        <path d="M594,196 C620,188 632,186 656,190" fill="none" stroke="#1f3a47" strokeWidth="10" />
        <path d="M594,196 C620,188 632,186 656,190" fill="none" stroke="#e8c94f" strokeWidth="4" className="f-flux" />
        <path d="M656,176 L740,176 L728,214 L668,214 Z" fill="#0f2028" stroke="#eef4ee" strokeWidth="3" />
        <text x="698" y="200" fill="#eef4ee" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">LE CAILLÉ</text>
        {/* Le petit-lait qui goutte vers le seau */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={684 + i * 14} cy={220} r={3.4} fill="#d8b46a" className="f-goutte" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.35})` }} />
        ))}
        <rect x="672" y="252" width="52" height="30" rx="5" fill="#0f2028" stroke="#d8b46a" strokeWidth="2.5" />
        <text x="698" y="272" fill="#d8b46a" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">PETIT-LAIT</text>
        <text x="698" y="300" fill="#d8b46a" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">→ les cochons péi</text>
        {/* Le tapis des pots, vers le froid */}
        <path d="M666,150 C600,120 500,104 420,102" fill="none" stroke="#1f3a47" strokeWidth="10" />
        <path d="M666,150 C600,120 500,104 420,102" fill="none" stroke="#eef4ee" strokeWidth="4" className="f-flux" />
        <line x1="280" y1="96" x2="420" y2="96" stroke="#1f3a47" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <g key={i} className="f-pot" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.5})` }}>
            <rect x={286 + i * 34} y={78} width={22} height={16} rx={4} fill="#eef4ee" />
            <rect x={284 + i * 34} y={74} width={26} height={6} rx={3} fill="#7fc4e8" />
          </g>
        ))}
        <text x="352" y="120" fill="#eef4ee" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">LES POTS (150 g)</text>
        {/* Le frigo : flocon qui pulse */}
        <rect x="220" y="58" width="54" height="60" rx="8" fill="#0f2028" stroke="#7fc4e8" strokeWidth="3" />
        <g className="f-flocon">
          <path d="M247,72 L247,104 M231,88 L263,88 M236,77 L258,99 M258,77 L236,99" stroke="#7fc4e8" strokeWidth="3" strokeLinecap="round" />
        </g>
        <text x="247" y="134" fill="#7fc4e8" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">4 °C</text>
      </svg>
    </div>
  );
}

// ── Les défis de la fromagerie (rappel actif) ─────────────────────────────────
// Les nombres des questions sont DIFFÉRENTS du curseur : la réponse n'est pas
// affichée à l'écran... mais l'élève peut la vérifier en réglant la machine —
// la machine devient l'outil de correction (l'effet « c'est moi qui vérifie »).
const DEFIS: {
  id: string;
  question: string;
  reponse: number;
  unite: string;
  indice: string;
  calcul: string;
}[] = [
  {
    id: "caille",
    question:
      "Un éleveur descend 1 200 L de lait. Combien de kilos de caillé la fromagerie va-t-elle en tirer ?",
    reponse: 300,
    unite: "kg",
    indice: "25 %, c'est le quart. Le quart de 1 200...",
    calcul: "caillé = 1 200 L × 25 % = 1 200 × 0,25 = 300 kg",
  },
  {
    id: "pots",
    question: "Avec ces 300 kg de caillé, combien de pots de 150 g ?",
    reponse: 2000,
    unite: "pots",
    indice: "Passe tout en grammes : 300 kg = 300 000 g.",
    calcul: "300 kg = 300 000 g · 300 000 ÷ 150 = 2 000 pots",
  },
  {
    id: "inverse",
    question:
      "Les collèges commandent 1 000 pots pour la semaine. Combien de litres de lait faut-il traire ?",
    reponse: 600,
    unite: "L",
    indice:
      "Remonte la machine à l'envers : d'abord le caillé nécessaire, puis le lait (le caillé n'est que 25 % du lait).",
    calcul:
      "1 000 pots × 150 g = 150 kg de caillé · lait = 150 ÷ 0,25 = 600 L",
  },
  {
    id: "etiquette",
    question:
      "La cantine rêve d'un mini-pot de 50 g. D'après l'étiquette, combien de kcal dedans ?",
    reponse: 92,
    unite: "kcal",
    indice: "50 g, c'est la moitié de 100 g.",
    calcul: "l'étiquette dit 184 kcal pour 100 g · 184 ÷ 2 = 92 kcal",
  },
];

// « 1 200 », « 1200 », « 2 000,0 »... → nombre. Tolérance ±0,5 (arrondis).
function lireReponse(brut: string): number | null {
  const n = parseFloat(brut.replace(/[\s  ]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function DefiCard({
  numero,
  defi,
}: {
  numero: number;
  defi: (typeof DEFIS)[number];
}) {
  const [saisie, setSaisie] = useState("");
  const [statut, setStatut] = useState<"attente" | "bon" | "rate">("attente");

  const verifier = () => {
    const n = lireReponse(saisie);
    if (n === null) return;
    setStatut(Math.abs(n - defi.reponse) <= 0.5 ? "bon" : "rate");
  };

  return (
    <div className="rounded border border-[#1f3a47] bg-[#0f2028] px-3 py-2.5">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#e8c94f]">
        Défi {numero}
      </p>
      <p className="mt-1 text-[13px] leading-5 text-[#f0f7f4]">{defi.question}</p>
      <form
        className="mt-2 flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          verifier();
        }}
      >
        <input
          type="text"
          inputMode="decimal"
          value={saisie}
          onChange={(e) => {
            setSaisie(e.target.value);
            setStatut("attente");
          }}
          placeholder="Ta réponse"
          aria-label={`Réponse au défi ${numero}, en ${defi.unite}`}
          className="w-32 rounded border border-[#1f3a47] bg-[#07131a] px-2.5 py-1.5 font-mono text-sm text-[#f0f7f4] outline-none placeholder:text-[#8fb8c9]/50 focus:border-[#e8c94f]"
        />
        <span className="font-mono text-[11px] text-[#8fb8c9]">{defi.unite}</span>
        <button
          type="submit"
          className="rounded bg-[#e8c94f] px-3 py-1.5 text-[12px] font-bold text-[#07131a] hover:brightness-110"
        >
          Vérifier
        </button>
      </form>
      {statut === "bon" && (
        <p className="mt-2 text-[12.5px] font-semibold leading-5 text-[#7fb069]">
          ✅ C&apos;est ça. {defi.calcul}
        </p>
      )}
      {statut === "rate" && (
        <p className="mt-2 text-[12.5px] leading-5 text-[#e07a5f]">
          Pas encore — indice : {defi.indice}
        </p>
      )}
      <details className="mt-1.5">
        <summary className="cursor-pointer text-[11.5px] font-semibold text-[#8fb8c9] hover:text-[#f0f7f4]">
          Voir le calcul
        </summary>
        <p className="mt-1 rounded border border-dashed border-[#e8c94f]/40 px-2.5 py-1.5 font-mono text-[12px] leading-relaxed text-[#e8c94f]">
          {defi.calcul}
        </p>
      </details>
    </div>
  );
}

function Etape({
  nom,
  explication,
  quantite,
  unite,
  pct,
  couleur,
}: {
  nom: string;
  explication: string;
  quantite: number;
  unite: string;
  pct: number; // largeur de la barre, en % des litres du jour
  couleur: string;
}) {
  return (
    <div className="rounded border border-[#1f3a47] bg-[#0f2028] px-3 py-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8fb8c9]">
          {nom}
        </p>
        <p className="font-mono text-sm font-bold tabular-nums text-[#f0f7f4]">
          {fr(quantite, quantite < 10 ? 1 : 0)} <span className="text-[11px] font-normal text-[#8fb8c9]">{unite}</span>
        </p>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#07131a]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: Math.max(2, Math.min(100, pct)) + "%", backgroundColor: couleur }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-5 text-[#c3d8d2]">{explication}</p>
    </div>
  );
}

export default function SimulateurFromageClient() {
  // Les litres du jour : du pichet de la famille (4 L) à une journée de
  // collecte de l'île (40 000 L).
  const [litres, setLitres] = useState(400);

  // MODE CLASSE (vidéoprojecteur) : tout grossit — mémorisé, partagé avec les
  // simulateurs cyclone et sucre (même clé localStorage).
  const [modeClasse, setModeClasse] = useState(false);
  useEffect(() => {
    try {
      setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
    } catch {}
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      try {
        localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      } catch {}
      return !v;
    });
  };

  const cailleKg = litres * PART_CAILLE; // 1 L ~ 1 kg (assumé « environ »)
  const petitLait = litres * PART_PETIT_LAIT;
  const pots = (cailleKg * 1000) / POT_G;
  const vaches = litres / VACHE_L_JOUR;
  const citernes = litres / CITERNE_L;
  const protKg = (pots * ((PROT_100G * POT_G) / 100)) / 1000;
  const colleges = pots / COLLEGE_ELEVES;
  const kcalPot = (KCAL_100G * POT_G) / 100; // 276
  const protPot = (PROT_100G * POT_G) / 100; // 18
  const oeufs = protPot / OEUF_PROT_G; // 3

  return (
    <div className="min-h-screen bg-[#07131a] text-[#f0f7f4]">
      {/* Manchette de la fromagerie */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#1f3a47] px-5 pb-2.5 pt-3.5">
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.28em]">
          La fromagerie dans ta <span className="text-[#7fc4e8]">main</span>
        </h1>
        <span className="font-serif text-sm italic text-[#8fb8c9]">
          Du pré des Hauts au pot de 150 g
        </span>
        <button
          type="button"
          onClick={basculerModeClasse}
          aria-pressed={modeClasse}
          className={`ml-auto rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider transition ${
            modeClasse
              ? "border-[#7fc4e8] bg-[#7fc4e8] text-[#07131a]"
              : "border-[#7fc4e8]/40 bg-transparent text-[#7fc4e8] hover:bg-[#7fc4e8]/15"
          }`}
        >
          🖥️ MODE CLASSE {modeClasse ? "✓" : ""}
        </button>
        <span className="rounded-sm bg-[#7fc4e8] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#07131a]">
          LE LAIT DES HAUTS
        </span>
      </header>

      <main
        className="mx-auto max-w-5xl px-4 py-5 sm:px-6"
        style={modeClasse ? ({ zoom: 1.35 } as React.CSSProperties) : undefined}
      >
        {/* La commande : les litres du jour */}
        <div className="rounded border border-[#1f3a47] bg-[#0f2028] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8fb8c9]">
              🥛 Le lait qui descend aujourd&apos;hui
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-[#7fc4e8]">
              {fr(litres)} <span className="text-sm font-normal text-[#8fb8c9]">litres</span>
            </p>
          </div>
          <input
            type="range"
            min={4}
            max={40000}
            step={4}
            value={litres}
            onChange={(e) => setLitres(+e.target.value)}
            className="mt-3 w-full accent-[#7fc4e8]"
            aria-label="Litres de lait du jour"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#8fb8c9]/70">
            <span>4 L — le pichet de la famille</span>
            <span>40 000 L — une journée de collecte de l&apos;île</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-5 text-[#c3d8d2]">
            Soit la traite du jour de{" "}
            <b className="text-[#f0f7f4]">{fr(vaches, vaches < 10 ? 1 : 0)} vaches</b> des Hauts
            (~20 L par vache et par jour)
            {citernes >= 1 ? (
              <>
                {" "}— <b className="text-[#f0f7f4]">{fr(citernes, citernes < 10 ? 1 : 0)} camions-citernes</b> (8 000 L
                chacun) descendent de la Plaine des Cafres.
              </>
            ) : (
              <> — un seul camion de collecte suffit pour la descente.</>
            )}
          </p>
        </div>

        {/* LE SCHÉMA VIVANT — la fromagerie animée, qui accélère avec les litres. */}
        <FromagerieAnimee litres={litres} />

        {/* Avant la séparation : pasteurisation puis ferments */}
        <div className="mt-3 space-y-3">
          <Etape
            nom="1 · La collecte — le lait descend des Hauts"
            explication="Trait le matin à la Plaine des Cafres (1 600 m), le lait descend à la fromagerie de Saint-Pierre dans des camions réfrigérés. Il faut faire vite : le lait cru est fragile."
            quantite={litres}
            unite="L de lait"
            pct={100}
            couleur="#7fb069"
          />
          <Etape
            nom="2 · La pasteurisation — la chauffe éclair"
            explication="Le lait est chauffé à ~75 °C quelques secondes, puis refroidi aussitôt : les microbes indésirables sont éliminés, le lait garde son goût."
            quantite={litres}
            unite="L pasteurisés"
            pct={100}
            couleur="#e07a5f"
          />
          <Etape
            nom="3 · Les ferments — le lait caille"
            explication="On ensemence avec des ferments lactiques (des bactéries amies). Elles transforment le sucre du lait en acide lactique : en quelques heures, le lait épaissit — il caille."
            quantite={litres}
            unite="L ensemencés"
            pct={100}
            couleur="#e8c94f"
          />
        </div>

        {/* Les deux lignes : caillé (les pots) / petit-lait (la deuxième vie) */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#eef4ee]">
              ↓ la ligne du caillé (~25 %)
            </p>
            <Etape
              nom="4 · L'égouttage — le caillé"
              explication="On égoutte : le caillé reste, l'eau s'en va. Pour un fromage FRAIS, 4 L de lait donnent ~1 kg — une tomme affinée en demanderait ~10 L (regarde l'épisode)."
              quantite={cailleKg}
              unite="kg de caillé"
              pct={PART_CAILLE * 100}
              couleur="#eef4ee"
            />
            <Etape
              nom="5 · La mise en pots — direction le froid"
              explication="Le caillé lissé, une pointe de sel, et chaque pot reçoit ses 150 g. Ensuite la chaîne du froid ne lâche plus : 4 °C du tapis jusqu'au magasin."
              quantite={pots}
              unite="pots de 150 g"
              pct={PART_CAILLE * 100}
              couleur="#7fc4e8"
            />
          </div>
          <div className="space-y-3">
            <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b46a]">
              ↓ la ligne du petit-lait (~75 %)
            </p>
            <Etape
              nom="4 bis · Le petit-lait (lactosérum)"
              explication="75 % du lait ressort en petit-lait au moment de l'égouttage. Ce n'est pas un déchet — c'est encore plein de bonnes choses."
              quantite={petitLait}
              unite="L"
              pct={PART_PETIT_LAIT * 100}
              couleur="#d8b46a"
            />
            <Etape
              nom="5 bis · Sa deuxième vie"
              explication="Le petit-lait nourrit les cochons des élevages péi, et l'industrie en tire des boissons et les protéines en poudre des sportifs. Rien ne se perd."
              quantite={petitLait}
              unite="L valorisés"
              pct={PART_PETIT_LAIT * 100}
              couleur="#d8b46a"
            />
          </div>
        </div>

        {/* Les sorties du jour */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded border-2 border-[#7fc4e8] bg-[#0f2028] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fb8c9]">🥛 Pots de fromage frais</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#7fc4e8]">{fr(pots, pots < 10 ? 1 : 0)}</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#c3d8d2]">
              le goûter de {fr(pots)} élèves
              {colleges >= 1 && <> — ≈ {fr(colleges, colleges < 10 ? 1 : 0)} collèges entiers</>}
            </p>
          </div>
          <div className="rounded border-2 border-[#7fb069] bg-[#0f2028] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fb8c9]">💪 Protéines</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#7fb069]">{fr(protKg, protKg < 10 ? 1 : 0)} kg</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#c3d8d2]">
              un pot = {fr(protPot)} g de protéines, autant que {fr(oeufs)} œufs
            </p>
          </div>
          <div className="rounded border-2 border-[#d8b46a] bg-[#0f2028] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fb8c9]">🐷 Petit-lait</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#d8b46a]">{fr(petitLait, petitLait < 10 ? 1 : 0)} L</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#c3d8d2]">
              vers les cochons péi et les boissons — rien ne se perd
            </p>
          </div>
        </div>

        {/* Les maths de la fromagerie, affichées */}
        <div className="mt-4 rounded border border-dashed border-[#7fc4e8]/40 bg-[#0f2028] px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-[#7fc4e8]">
          caillé = {fr(litres)} L × 25 % = <b>{fr(cailleKg, cailleKg < 10 ? 1 : 0)} kg</b>
          <span className="text-[#8fb8c9]"> · </span>
          pots = {fr(cailleKg, cailleKg < 10 ? 1 : 0)} kg ÷ 150 g = <b>{fr(pots, pots < 10 ? 1 : 0)}</b>
          <span className="text-[#8fb8c9]"> · </span>
          vaches = {fr(litres)} ÷ 20 = <b>{fr(vaches, vaches < 10 ? 1 : 0)}</b>
        </div>

        {/* LA VRAIE ÉTIQUETTE — lire et convertir (proportionnalité ×1,5) */}
        <div className="mt-4 rounded border border-[#1f3a47] bg-[#0f2028] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8fb8c9]">
            🔎 Lis la vraie étiquette d&apos;un ti fromage frais péi
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded border border-[#eef4ee]/30 bg-[#07131a] p-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#eef4ee]">
                Valeurs pour 100 g
              </p>
              <table className="mt-2 w-full font-mono text-[12px] text-[#c3d8d2]">
                <tbody>
                  {[
                    ["Énergie", "184 kcal"],
                    ["Matières grasses", "14 g"],
                    ["— dont saturées", "10 g"],
                    ["Sucres", "2,5 g"],
                    ["Protéines", "12 g"],
                    ["Sel", "0,7 g"],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-[#1f3a47] last:border-0">
                      <td className="py-1">{k}</td>
                      <td className="py-1 text-right font-bold tabular-nums text-[#f0f7f4]">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-[11px] leading-4 text-[#8fb8c9]">
                Ingrédients : lait entier, lait écrémé, sel, protéines de lait,
                ferments lactiques. Nutri-score C.
              </p>
            </div>
            <div className="flex flex-col justify-center rounded border border-[#7fc4e8]/30 bg-[#07131a] p-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#7fc4e8]">
                Et pour TON pot de 150 g ?
              </p>
              <p className="mt-2 text-[12.5px] leading-6 text-[#c3d8d2]">
                L&apos;étiquette parle pour <b className="text-[#f0f7f4]">100 g</b>, ton pot en fait{" "}
                <b className="text-[#f0f7f4]">150 g</b> : tout est à multiplier par{" "}
                <b className="text-[#7fc4e8]">1,5</b>.
              </p>
              <div className="mt-2 rounded border border-dashed border-[#7fc4e8]/40 px-3 py-2 font-mono text-[12.5px] leading-relaxed text-[#7fc4e8]">
                énergie = 184 × 1,5 = <b>{fr(kcalPot)} kcal</b>
                <br />
                protéines = 12 × 1,5 = <b>{fr(protPot)} g</b>
              </div>
              <p className="mt-2 text-[11.5px] leading-5 text-[#8fb8c9]">
                C&apos;est ça, la proportionnalité : la même règle que les cuves
                de la fromagerie — juste en plus petit.
              </p>
            </div>
          </div>
        </div>

        {/* LES DÉFIS — à toi de calculer, la machine vérifie */}
        <div className="mt-4 rounded border border-[#1f3a47] bg-[#0f2028] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#e8c94f]">
              🎯 Les défis de la fromagerie
            </p>
            <p className="text-[11.5px] text-[#8fb8c9]">
              Coup de pouce : règle le curseur sur les litres du défi — la
              machine vérifie pour toi.
            </p>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {DEFIS.map((d, i) => (
              <DefiCard key={d.id} numero={i + 1} defi={d} />
            ))}
          </div>
        </div>

        {/* Le pont vers l'épisode et le défi */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/UjblKadInPw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#7fc4e8] px-4 py-2 text-sm font-bold text-[#07131a] hover:brightness-110"
          >
            ▶ L&apos;épisode « Le lait de la Plaine des Cafres »
          </a>
          <Link
            href="/defis-du-jour"
            className="inline-flex items-center gap-2 rounded border border-[#1f3a47] bg-[#0f2028] px-4 py-2 text-sm font-bold text-[#f0f7f4] hover:brightness-125"
          >
            🎯 Le défi du jour
          </Link>
        </div>
      </main>

      {/* Le garde-fou d'honnêteté */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#1f3a47] px-5 py-2.5 text-[11.5px] text-[#8fb8c9]">
        <span>
          Chiffres pédagogiques arrondis — inspiré d&apos;un ti fromage frais
          péi fabriqué à Saint-Pierre avec le lait des Hauts. Étiquette :
          données Open Food Facts (licence ODbL). Derrière ces flux, il y a
          les éleveurs de la Plaine des Cafres.
        </span>
        <span className="ml-auto font-mono">
          Un jeu du <b className="font-bold text-[#7fc4e8]">Journal d&apos;EleveAI</b> 🦎
        </span>
      </footer>
    </div>
  );
}
