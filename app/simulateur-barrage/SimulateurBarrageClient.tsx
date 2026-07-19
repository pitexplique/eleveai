"use client";

// « Le barrage dans ta main » — l'élève règle le débit turbiné, la centrale
// travaille sous ses yeux : l'eau captée tombe dans la conduite forcée
// (~500 m de chute), frappe la turbine, l'alternateur pousse le courant vers
// l'île — et l'eau RESSORT INTACTE vers la rivière. Les maths (puissance,
// proportionnalité) sont AFFICHÉES, jamais cachées — la règle du journal.
//
// Chiffres pédagogiques ARRONDIS (assumés « environ ») :
//   chute de Takamaka ~500 m (une des plus hautes de France)
//   puissance (kW) ≈ 8 × débit (m³/s) × chute (m)  [9,81 × ~80 % de rendement]
//   une famille ~10 kWh/jour (le même chiffre que l'usine à sucre)
//   1 m³ = 1 000 L = 5 baignoires de 200 L · une LED ~10 W
//   les deux centrales de Takamaka à fond ≈ 40 MW

import { useEffect, useState } from "react";
import Link from "next/link";
import DefisSimulateur, { type DefiSimulateur } from "@/components/simulateurs/DefisSimulateur";

const CHUTE_M = 500;
const COEF_PUISSANCE = 8; // kW par (m³/s × m de chute)
const KWH_FAMILLE_JOUR = 10;
const BAIGNOIRE_L = 200;
const LED_W = 10;

// ── Les défis du barrage (règle du 18/07 : chaque simulateur a les siens) ────
// Les nombres diffèrent du curseur : la réponse n'est pas à l'écran, mais
// l'élève peut régler le débit pour vérifier — le barrage corrige lui-même.
const DEFIS: DefiSimulateur[] = [
  {
    id: "puissance",
    question:
      "La rivière donne 5 m³ par seconde, la chute fait 500 m. Quelle puissance sort de la centrale ? (en kW)",
    reponse: 20000,
    unite: "kW",
    indice: "La formule du barrage : puissance = 8 × débit × chute.",
    calcul: "P = 8 × 5 × 500 = 20 000 kW (20 MW)",
  },
  {
    id: "familles",
    question:
      "Avec ces 20 000 kW pendant 24 h, et une famille qui utilise ~10 kWh par jour : combien de familles ont leur journée de courant ?",
    reponse: 48000,
    unite: "familles",
    indice: "D'abord les kWh de la journée (20 000 × 24), puis divise par 10.",
    calcul: "20 000 × 24 = 480 000 kWh · 480 000 ÷ 10 = 48 000 familles",
  },
  {
    id: "inverse",
    question:
      "Un quartier a besoin de 4 000 kW. Quel débit faut-il turbiner, avec la chute de 500 m ? (en m³/s)",
    reponse: 1,
    unite: "m³/s",
    indice: "Remonte la formule à l'envers : débit = puissance ÷ (8 × chute).",
    calcul: "Q = 4 000 ÷ (8 × 500) = 4 000 ÷ 4 000 = 1 m³/s",
  },
  {
    id: "baignoires",
    question:
      "2 m³ d'eau passent chaque seconde dans la conduite. Combien de baignoires de 200 L ça représente, chaque seconde ?",
    reponse: 10,
    unite: "baignoires",
    indice: "2 m³ = 2 000 L. Combien de fois 200 L dedans ?",
    calcul: "2 000 ÷ 200 = 10 baignoires — chaque seconde",
  },
];

const COULEURS_DEFIS = {
  fond: "#0f241a",
  fondProfond: "#081510",
  bord: "#1e3f2f",
  accent: "#f2d43b",
  texte: "#eef7f2",
  sousTexte: "#93bfa9",
  ok: "#7fb069",
  rate: "#e07a5f",
};

// Formatage français des grands nombres, sans décimales inutiles.
function fr(n: number, decimales = 0): string {
  return n.toLocaleString("fr-FR", {
    maximumFractionDigits: decimales,
    minimumFractionDigits: 0,
  });
}

// ── Le schéma VIVANT du barrage (SVG animé — un schéma, pas une scène) ───────
// Tout bouge : l'eau file dans la conduite le long de la falaise, la turbine
// vire, l'alternateur pulse, le courant grimpe aux pylônes, l'ampoule bat —
// et l'eau rendue repart vers la rivière. La cadence suit le débit.
function BarrageAnime({ debit }: { debit: number }) {
  // De 3,6 s (0,5 m³/s, au ralenti) à 0,9 s (10 m³/s, pleine eau).
  const cadence = (3.6 - (Math.min(debit, 10) / 10) * 2.7).toFixed(2) + "s";

  return (
    <div className="mt-3 overflow-x-auto rounded border border-[#1e3f2f] bg-[#081510]">
      <style>{`
        @keyframes bar-flux { to { stroke-dashoffset: -28; } }
        @keyframes bar-tourner { to { transform: rotate(360deg); } }
        @keyframes bar-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @keyframes bar-goutter { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 100% { transform: translateY(24px); opacity: 0; } }
        .b-flux { stroke-dasharray: 10 18; animation: bar-flux var(--cadence) linear infinite; }
        .b-flux-lent { stroke-dasharray: 8 14; animation: bar-flux calc(var(--cadence) * 1.6) linear infinite; }
        .b-roue { animation: bar-tourner calc(var(--cadence) * 1.2) linear infinite; transform-origin: center; transform-box: fill-box; }
        .b-ampoule { animation: bar-pulse var(--cadence) ease-in-out infinite; }
        .b-goutte { animation: bar-goutter calc(var(--cadence) * 1.4) ease-in infinite; }
        @media (prefers-reduced-motion: reduce) {
          .b-flux, .b-flux-lent, .b-roue, .b-ampoule, .b-goutte { animation-duration: 12s; }
        }
      `}</style>
      <svg
        viewBox="0 0 820 330"
        style={{ ["--cadence" as string]: cadence }}
        className="mx-auto block min-w-[640px] max-w-[900px]"
        aria-label="Schéma animé du barrage : l'eau captée dans les hauts tombe dans la conduite forcée, fait tourner la turbine et l'alternateur, le courant part vers l'île — et l'eau ressort vers la rivière"
      >
        {/* Les hauts : la forêt de Bébour et la prise d'eau */}
        <text x="30" y="26" fill="#7fb069" fontSize="12" fontWeight="700" fontFamily="monospace">LES HAUTS · LA PRISE D&apos;EAU (forêt de Bébour)</text>
        <path d="M20,90 C90,50 190,44 280,70 L280,110 L20,110 Z" fill="#12291c" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${50 + i * 55},70 L${62 + i * 55},44 L${74 + i * 55},70 Z`} fill="#1e4a2f" />
        ))}
        {/* La retenue d'eau */}
        <rect x="180" y="74" width="96" height="22" rx="4" fill="#134c5c" />
        <path d="M184,80 C210,76 250,76 272,80" fill="none" stroke="#5bc8dd" strokeWidth="2.5" className="b-flux-lent" />
        <text x="228" y="118" fill="#5bc8dd" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">LA RETENUE</text>
        {/* La falaise + la conduite forcée qui plonge (~500 m) */}
        <path d="M276,96 C360,120 420,190 470,250" fill="none" stroke="#0e2a20" strokeWidth="14" />
        <path d="M276,96 C360,120 420,190 470,250" fill="none" stroke="#5bc8dd" strokeWidth="6" className="b-flux" />
        {/* La vanne (le robinet géant), posée à l'entrée de la conduite */}
        <rect x="295" y="99" width="10" height="20" rx="2" fill="#f2d43b" transform="rotate(38 300 109)" />
        <text x="310" y="180" fill="#5bc8dd" fontSize="11" fontWeight="700" fontFamily="monospace" transform="rotate(38 310 180)">LA CONDUITE FORCÉE · ~500 m</text>
        {/* La centrale */}
        <rect x="452" y="238" width="150" height="70" rx="8" fill="#0f241a" stroke="#93bfa9" strokeWidth="3" />
        <text x="527" y="326" fill="#93bfa9" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">LA CENTRALE DE TAKAMAKA</text>
        {/* La turbine Pelton : la roue à augets qui vire */}
        <circle cx="497" cy="273" r="24" fill="#081510" stroke="#5bc8dd" strokeWidth="3" />
        <g className="b-roue">
          <path d="M497,251 L497,295 M475,273 L519,273 M482,258 L512,288 M512,258 L482,288" stroke="#5bc8dd" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        <text x="497" y="240" fill="#5bc8dd" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">TURBINE</text>
        {/* L'alternateur */}
        <circle cx="560" cy="273" r="18" fill="#081510" stroke="#f2d43b" strokeWidth="3" />
        <g className="b-roue"><path d="M560,259 L560,287 M546,273 L574,273" stroke="#f2d43b" strokeWidth="3" /></g>
        <text x="560" y="240" fill="#f2d43b" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">ALTERNATEUR</text>
        {/* Le courant : fil vers les pylônes + ampoule */}
        <path d="M602,262 C660,230 700,190 740,150" fill="none" stroke="#f2d43b" strokeWidth="2.5" strokeDasharray="4 5" className="b-flux" />
        <path d="M700,196 L700,230 M688,206 L712,206 M690,218 L710,218" stroke="#93bfa9" strokeWidth="2.5" />
        <path d="M756,120 L756,146 M744,128 L768,128 M746,138 L766,138" stroke="#93bfa9" strokeWidth="2.5" />
        <circle cx="756" cy="100" r="14" fill="#f2d43b" className="b-ampoule" />
        <text x="756" y="76" fill="#f2d43b" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">L&apos;ÎLE S&apos;ALLUME</text>
        {/* L'eau rendue : elle ressort vers la rivière (rien ne se perd) */}
        <path d="M452,290 C400,300 340,304 260,304" fill="none" stroke="#134c5c" strokeWidth="10" />
        <path d="M452,290 C400,300 340,304 260,304" fill="none" stroke="#5bc8dd" strokeWidth="4" className="b-flux-lent" />
        {[0, 1].map((i) => (
          <circle key={i} cx={330 + i * 60} cy={296} r={3} fill="#5bc8dd" className="b-goutte" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.5})` }} />
        ))}
        <text x="250" y="292" fill="#5bc8dd" fontSize="10" fontWeight="700" textAnchor="end" fontFamily="monospace">L&apos;EAU REND À LA RIVIÈRE →</text>
        <text x="250" y="316" fill="#93bfa9" fontSize="9.5" fontWeight="700" textAnchor="end" fontFamily="monospace">(intacte — rien ne se perd)</text>
        {/* Les pastilles A → H — la grammaire des schémas de manuel (idée de
            Frédéric, 19/07, d'après une coupe légendée) : on apprend aussi à
            LIRE un schéma. La légende complète est sous le dessin. */}
        {([
          ["A", 166, 85],
          ["B", 440, 226],
          ["C", 470, 300],
          ["D", 590, 298],
          ["E", 322, 96],
          ["F", 400, 165],
          ["G", 672, 168],
          ["H", 300, 282],
        ] as const).map(([lettre, x, y]) => (
          <g key={lettre}>
            <circle cx={x} cy={y} r="9" fill="#f2d43b" />
            <text x={x} y={y + 3.5} fill="#081510" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">{lettre}</text>
          </g>
        ))}
      </svg>
      {/* Le vocabulaire du schéma, de A à H — replié pour garder la page courte. */}
      <details className="border-t border-[#1e3f2f] px-3 py-2">
        <summary className="cursor-pointer text-[11.5px] font-bold text-[#93bfa9] hover:text-[#eef7f2]">
          🔤 Les mots du barrage, de A à H ▾
        </summary>
        <div className="mt-2 grid gap-x-5 gap-y-1.5 pb-1 text-[12px] leading-5 text-[#c9dfd2] sm:grid-cols-2">
          {[
            ["A", "Le réservoir (la retenue) : l'eau captée attend là."],
            ["B", "La centrale : le bâtiment des machines."],
            ["C", "La turbine : la roue que l'eau fait tourner."],
            ["D", "Le générateur (ici, l'alternateur) : la rotation devient du courant."],
            ["E", "La vanne : le robinet géant — ouvert, l'eau descend."],
            ["F", "La conduite forcée : le tuyau de la chute (~500 m)."],
            ["G", "Les lignes à haute tension : le courant part vers les villes."],
            ["H", "La rivière : l'eau rendue, intacte."],
          ].map(([lettre, texte]) => (
            <p key={lettre}>
              <span className="mr-1.5 inline-block w-5 rounded-sm bg-[#f2d43b] text-center font-mono text-[11px] font-black text-[#081510]">
                {lettre}
              </span>
              {texte}
            </p>
          ))}
        </div>
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
  pct: number; // largeur de la barre, en % du flux
  couleur: string;
}) {
  return (
    <div className="rounded border border-[#1e3f2f] bg-[#0f241a] px-3 py-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#93bfa9]">
          {nom}
        </p>
        <p className="font-mono text-sm font-bold tabular-nums text-[#eef7f2]">
          {fr(quantite, quantite < 10 ? 1 : 0)} <span className="text-[11px] font-normal text-[#93bfa9]">{unite}</span>
        </p>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#081510]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: Math.max(2, Math.min(100, pct)) + "%", backgroundColor: couleur }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-5 text-[#c9dfd2]">{explication}</p>
    </div>
  );
}

export default function SimulateurBarrageClient() {
  // Le débit turbiné : d'un gros ruisseau (0,5 m³/s) à la rivière bien
  // nourrie par les pluies (10 m³/s — les deux Takamaka à fond).
  const [debit, setDebit] = useState(3);

  // MODE CLASSE (vidéoprojecteur) : tout grossit — mémorisé, partagé avec
  // les autres machines (même clé localStorage).
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

  const kw = COEF_PUISSANCE * debit * CHUTE_M;
  const mw = kw / 1000;
  const familles = (kw * 24) / KWH_FAMILLE_JOUR;
  const baignoires = (debit * 1000) / BAIGNOIRE_L;
  const leds = (kw * 1000) / LED_W;

  return (
    <div className="min-h-screen bg-[#081510] text-[#eef7f2]">
      {/* Manchette du barrage */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#1e3f2f] px-5 pb-2.5 pt-3.5">
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.28em]">
          Le barrage dans ta <span className="text-[#5bc8dd]">main</span>
        </h1>
        <span className="font-serif text-sm italic text-[#93bfa9]">
          Takamaka — l&apos;eau de l&apos;île fait la lumière
        </span>
        <button
          type="button"
          onClick={basculerModeClasse}
          aria-pressed={modeClasse}
          className={`ml-auto rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider transition ${
            modeClasse
              ? "border-[#5bc8dd] bg-[#5bc8dd] text-[#081510]"
              : "border-[#5bc8dd]/40 bg-transparent text-[#5bc8dd] hover:bg-[#5bc8dd]/15"
          }`}
        >
          🖥️ MODE CLASSE {modeClasse ? "✓" : ""}
        </button>
        <span className="rounded-sm bg-[#5bc8dd] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#081510]">
          RIVIÈRE DES MARSOUINS
        </span>
      </header>

      <main
        className="mx-auto max-w-5xl px-4 py-5 sm:px-6"
        style={modeClasse ? ({ zoom: 1.35 } as React.CSSProperties) : undefined}
      >
        {/* La commande : le débit turbiné */}
        <div className="rounded border border-[#1e3f2f] bg-[#0f241a] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#93bfa9]">
              💧 L&apos;eau que la rivière donne aujourd&apos;hui
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-[#5bc8dd]">
              {fr(debit, 1)} <span className="text-sm font-normal text-[#93bfa9]">m³/s</span>
            </p>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={debit}
            onChange={(e) => setDebit(+e.target.value)}
            className="mt-3 w-full accent-[#5bc8dd]"
            aria-label="Débit turbiné, en mètres cubes par seconde"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#93bfa9]/70">
            <span>0,5 — un gros ruisseau</span>
            <span>10 — la rivière bien nourrie (les deux centrales à fond)</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-5 text-[#c9dfd2]">
            Soit <b className="text-[#eef7f2]">{fr(baignoires)} baignoires de 200 L</b> qui
            passent dans la conduite <b className="text-[#eef7f2]">chaque seconde</b> — et
            chaque goutte ressortira intacte vers la rivière.
          </p>
        </div>

        {/* LE SCHÉMA VIVANT — le barrage animé, qui accélère avec le débit. */}
        <BarrageAnime debit={debit} />

        {/* La chaîne de l'énergie */}
        <div className="mt-3 space-y-3">
          <Etape
            nom="1 · La prise d'eau — dans les hauts de Saint-Benoît"
            explication="La rivière des Marsouins descend de la forêt de Bébour, une des plus arrosées de France. Une partie de son eau est captée dans la retenue — le reste continue son chemin."
            quantite={debit}
            unite="m³/s captés"
            pct={100}
            couleur="#7fb069"
          />
          <Etape
            nom="2 · La conduite forcée — 500 m de chute"
            explication="L'eau plonge dans un tuyau géant le long de la falaise : ~500 m de dénivelé, une des plus hautes chutes de France. Plus c'est haut, plus l'eau arrive vite et fort — c'est l'énergie de la hauteur."
            quantite={debit}
            unite="m³/s en chute"
            pct={100}
            couleur="#5bc8dd"
          />
          <Etape
            nom="3 · La turbine — les jets frappent la roue"
            explication="En bas, l'eau sort en jets puissants qui frappent les augets de la turbine : la roue s'emballe. L'énergie de la hauteur devient de la rotation."
            quantite={kw}
            unite="kW mécaniques"
            pct={(debit / 10) * 100}
            couleur="#5bc8dd"
          />
          <Etape
            nom="4 · L'alternateur — la rotation devient du courant"
            explication="La turbine entraîne l'alternateur (une bobine géante qui tourne dans des aimants) : le courant file vers les pylônes et descend vers les villes. L'eau de Bébour allume Saint-Denis."
            quantite={kw}
            unite="kW envoyés sur l'île"
            pct={(debit / 10) * 100}
            couleur="#f2d43b"
          />
        </div>

        {/* Les sorties du jour */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded border-2 border-[#f2d43b] bg-[#0f241a] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#93bfa9]">⚡ Puissance</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#f2d43b]">{fr(mw, mw < 10 ? 1 : 0)} MW</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#c9dfd2]">
              {fr(kw)} kW — de quoi allumer {fr(leds)} ampoules LED
            </p>
          </div>
          <div className="rounded border-2 border-[#7fb069] bg-[#0f241a] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#93bfa9]">🏠 Familles</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#7fb069]">{fr(familles)}</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#c9dfd2]">
              une journée de courant chacune (10 kWh) si la rivière tient 24 h
            </p>
          </div>
          <div className="rounded border-2 border-[#5bc8dd] bg-[#0f241a] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#93bfa9]">💧 L&apos;eau rendue</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#5bc8dd]">100 %</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#c9dfd2]">
              l&apos;eau turbinée retourne à la rivière — on emprunte sa chute, pas sa vie
            </p>
          </div>
        </div>

        {/* Les maths du barrage, affichées */}
        <div className="mt-4 rounded border border-dashed border-[#f2d43b]/40 bg-[#0f241a] px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-[#f2d43b]">
          puissance = 8 × {fr(debit, 1)} m³/s × 500 m = <b>{fr(kw)} kW</b>
          <span className="text-[#93bfa9]"> · </span>
          familles = {fr(kw)} × 24 ÷ 10 = <b>{fr(familles)}</b>
          <span className="text-[#93bfa9]"> · </span>
          baignoires/s = {fr(debit, 1)} × 1 000 ÷ 200 = <b>{fr(baignoires)}</b>
        </div>

        {/* LES DÉFIS — à toi de calculer, le barrage vérifie */}
        <DefisSimulateur
          titre="Les défis du barrage"
          coupDePouce="Coup de pouce : règle le débit du défi — le barrage vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* Le pont vers l'épisode et le défi */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/bxbqIllTbYQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#5bc8dd] px-4 py-2 text-sm font-bold text-[#081510] hover:brightness-110"
          >
            ▶ L&apos;épisode « L&apos;eau de La Réunion »
          </a>
          <Link
            href="/defis-du-jour"
            className="inline-flex items-center gap-2 rounded border border-[#1e3f2f] bg-[#0f241a] px-4 py-2 text-sm font-bold text-[#eef7f2] hover:brightness-125"
          >
            🎯 Le défi du jour
          </Link>
        </div>
      </main>

      {/* Le garde-fou d'honnêteté */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#1e3f2f] px-5 py-2.5 text-[11.5px] text-[#93bfa9]">
        <span>
          Chiffres pédagogiques arrondis — inspiré des centrales
          hydroélectriques de Takamaka, sur la rivière des Marsouins
          (Saint-Benoît) : une chute parmi les plus hautes de France.
          L&apos;eau turbinée est rendue à la rivière. ⚠️ Les gorges de
          Takamaka sont un site dangereux : on les admire depuis le belvédère.
        </span>
        <span className="ml-auto font-mono">
          Un jeu du <b className="font-bold text-[#5bc8dd]">Journal d&apos;EleveAI</b> 🦎
        </span>
      </footer>
    </div>
  );
}
