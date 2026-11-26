"use client";

// « Le barrage dans ta main » — l'élève CLIQUE sur la montagne pour placer
// la prise d'eau (en haut) puis la centrale (en bas) : la conduite forcée se
// dessine, l'eau y tombe, frappe la turbine, l'alternateur pousse le courant
// vers l'île — et l'eau RESSORT INTACTE vers la rivière. Il règle aussi le
// débit turbiné. Les maths (chute, puissance, proportionnalité) sont
// AFFICHÉES, jamais cachées — la règle du journal.
//
// Chiffres pédagogiques ARRONDIS (assumés « environ ») :
//   chute de Takamaka ~500 m (une des plus hautes de France) : c'est l'état
//   de départ (prise à 530 m, centrale à 30 m) ; la montagne monte à 550 m
//   puissance (kW) ≈ 8 × débit (m³/s) × chute (m)  [9,81 × ~80 % de rendement]
//   une famille ~10 kWh/jour (le même chiffre que l'usine à sucre)
//   1 m³ = 1 000 L = 5 baignoires de 200 L · une LED ~10 W
//   les deux centrales de Takamaka à fond ≈ 40 MW

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { lienVideo } from "@/lib/videos/lienVideo";
import DefisSimulateur, { type DefiSimulateur } from "@/components/simulateurs/DefisSimulateur";

const CHUTE_TAKAMAKA_M = 500;
const COEF_PUISSANCE = 8; // kW par (m³/s × m de chute)
// La barre pleine = 10 m³/s sous 500 m (les deux centrales à fond, 40 MW).
const KW_A_FOND = COEF_PUISSANCE * 10 * CHUTE_TAKAMAKA_M;
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

// ── La montagne : altitude ↔ dessin (26/11 : l'élève CLIQUE pour placer) ────
// Le profil : un plateau en haut (550 m, la forêt de Bébour), une falaise,
// puis le fond de la vallée (0 m). La hauteur de chute = altitude de la prise
// d'eau − altitude de la centrale, lue sur la graduation à gauche.
const ALT_MAX = 550; // m — chute maximale possible ≈ 550 m (Takamaka ~500 m)
const X_HAUT = 130; // fin du plateau
const X_BAS = 600; // pied de la falaise
const Y_HAUT = 70; // y du dessin pour 550 m
const Y_BAS = 280; // y du dessin pour 0 m
const X_MIN_CLIC = 110;
const X_MAX_CLIC = 610;

function altExacte(x: number): number {
  if (x <= X_HAUT) return ALT_MAX;
  if (x >= X_BAS) return 0;
  const t = (x - X_HAUT) / (X_BAS - X_HAUT);
  return ALT_MAX * (1 - (3 * t * t - 2 * t * t * t));
}
// L'altitude affichée : arrondie à 10 m (pour pouvoir viser 500 m pile).
function altitude(x: number): number {
  return Math.round(altExacte(x) / 10) * 10;
}
function yDeAlt(a: number): number {
  return Y_BAS - (a / ALT_MAX) * (Y_BAS - Y_HAUT);
}
function yTerrain(x: number): number {
  return yDeAlt(altExacte(x));
}
function xDeAlt(a: number): number {
  let lo = X_HAUT;
  let hi = X_BAS;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (altExacte(mid) > a) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
// La configuration de Takamaka : prise à 530 m, centrale à 30 m → 500 m de chute.
const X_PRISE_TAKAMAKA = xDeAlt(530);
const X_CENTRALE_TAKAMAKA = xDeAlt(30);

const CRETE = (() => {
  const pts: string[] = [];
  for (let x = 70; x <= 820; x += 10) pts.push(`${x},${yTerrain(x).toFixed(1)}`);
  return "M" + pts.join(" L");
})();
const CHEMIN_TERRAIN = `${CRETE} L820,330 L70,330 Z`;

// Un chemin qui suit la pente de xa à xb, décalé verticalement.
function cheminSurPente(xa: number, xb: number, decalage: number): string {
  const pas = xb >= xa ? 6 : -6;
  const pts: string[] = [];
  for (let x = xa; pas > 0 ? x < xb : x > xb; x += pas) {
    pts.push(`${x.toFixed(1)},${(yTerrain(x) + decalage).toFixed(1)}`);
  }
  pts.push(`${xb.toFixed(1)},${(yTerrain(xb) + decalage).toFixed(1)}`);
  return "M" + pts.join(" L");
}

type EtatMontagne = "prise" | "centrale" | "remonte" | "plat" | "ok";

// ── Le schéma VIVANT du barrage (SVG animé — un schéma, pas une scène) ───────
// L'élève clique sur la montagne : d'abord la prise d'eau, puis la centrale.
// La conduite forcée se dessine entre les deux et l'eau y file ; la turbine
// vire, l'alternateur pulse, le courant grimpe aux pylônes, l'ampoule bat —
// et l'eau rendue repart vers la rivière. La cadence suit le débit.
function BarrageAnime({
  debit,
  xPrise,
  xCentrale,
  etat,
  chute,
  ping,
  onClic,
}: {
  debit: number;
  xPrise: number | null;
  xCentrale: number | null;
  etat: EtatMontagne;
  chute: number;
  ping: { x: number; y: number; n: number } | null;
  onClic: (x: number) => void;
}) {
  // De 3,6 s (0,5 m³/s, au ralenti) à 0,9 s (10 m³/s, pleine eau).
  const cadence = (3.6 - (Math.min(debit, 10) / 10) * 2.7).toFixed(2) + "s";
  const marche = etat === "ok";

  const svgRef = useRef<SVGSVGElement>(null);
  // On place le point au RELÂCHER, si le doigt n'a presque pas bougé : un
  // glissé pour faire défiler le dessin (téléphone) ne pose rien.
  const depart = useRef<{ x: number; y: number; id: number } | null>(null);
  const relacher = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = depart.current;
    depart.current = null;
    if (!d || d.id !== e.pointerId) return;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 12) return;
    const svg = svgRef.current;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    onClic(pt.x);
  };

  const yP = xPrise !== null ? yTerrain(xPrise) : 0;
  const yC = xCentrale !== null ? yTerrain(xCentrale) : 0;
  const altP = xPrise !== null ? altitude(xPrise) : 0;
  const altC = xCentrale !== null ? altitude(xCentrale) : 0;

  return (
    <div className="mt-3 overflow-x-auto rounded border border-[#1e3f2f] bg-[#081510]">
      <style>{`
        @keyframes bar-flux { to { stroke-dashoffset: -28; } }
        @keyframes bar-tourner { to { transform: rotate(360deg); } }
        @keyframes bar-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @keyframes bar-goutter { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 100% { transform: translateY(24px); opacity: 0; } }
        @keyframes bar-ping { 0% { transform: scale(.6); opacity: 1; } 100% { transform: scale(3.4); opacity: 0; } }
        .b-flux { stroke-dasharray: 10 18; animation: bar-flux var(--cadence) linear infinite; }
        .b-flux-lent { stroke-dasharray: 8 14; animation: bar-flux calc(var(--cadence) * 1.6) linear infinite; }
        .b-roue { animation: bar-tourner calc(var(--cadence) * 1.2) linear infinite; transform-origin: center; transform-box: fill-box; }
        .b-ampoule { animation: bar-pulse var(--cadence) ease-in-out infinite; }
        .b-goutte { animation: bar-goutter calc(var(--cadence) * 1.4) ease-in infinite; }
        .b-ping { animation: bar-ping .7s ease-out forwards; transform-origin: center; transform-box: fill-box; pointer-events: none; }
        @media (prefers-reduced-motion: reduce) {
          .b-flux, .b-flux-lent, .b-roue, .b-ampoule, .b-goutte { animation-duration: 12s; }
        }
      `}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 820 330"
        style={{ ["--cadence" as string]: cadence, cursor: "pointer", touchAction: "manipulation" }}
        className="mx-auto block min-w-[640px] max-w-[900px] select-none"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          depart.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
        }}
        onPointerUp={relacher}
        onPointerCancel={() => {
          depart.current = null;
        }}
        aria-label="Schéma du barrage : clique sur la montagne pour placer la prise d'eau en haut, puis la centrale en bas. La conduite forcée relie les deux, l'eau fait tourner la turbine et l'alternateur, le courant part vers l'île — et l'eau ressort vers la rivière"
      >
        {/* La montagne : le plateau des hauts, la falaise, la vallée */}
        <path d={CHEMIN_TERRAIN} fill="#12291c" />
        <path d={CRETE} fill="none" stroke="#1e4a2f" strokeWidth="3" />
        <text x="30" y="26" fill="#7fb069" fontSize="12" fontWeight="700" fontFamily="monospace">LES HAUTS · LA FORÊT DE BÉBOUR</text>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${72 + i * 19},70 L${80 + i * 19},50 L${88 + i * 19},70 Z`} fill="#1e4a2f" />
        ))}

        {/* La graduation d'altitude (m), à gauche */}
        <text x="40" y="50" fill="#93bfa9" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">ALTITUDE</text>
        <line x1="62" y1={Y_HAUT - 6} x2="62" y2={Y_BAS} stroke="#93bfa9" strokeWidth="2" />
        {[0, 100, 200, 300, 400, 500].map((a) => (
          <g key={a}>
            <line x1="56" y1={yDeAlt(a)} x2="68" y2={yDeAlt(a)} stroke="#93bfa9" strokeWidth="2" />
            <text x="53" y={yDeAlt(a) + 3.5} fill="#93bfa9" fontSize="10" textAnchor="end" fontFamily="monospace">{a} m</text>
          </g>
        ))}

        {/* La rivière, au fond de la vallée */}
        <path d="M380,302 L820,302" fill="none" stroke="#134c5c" strokeWidth="10" />
        <path d="M380,302 L820,302" fill="none" stroke="#5bc8dd" strokeWidth="4" className="b-flux-lent" />
        <text x="816" y="324" fill="#5bc8dd" fontSize="10" fontWeight="700" textAnchor="end" fontFamily="monospace">LA RIVIÈRE · l&apos;eau rendue, intacte</text>

        {/* Les lignes d'altitude des deux points + la chute sur la graduation */}
        {xPrise !== null && (
          <line x1="62" y1={yP} x2={xPrise} y2={yP} stroke="#7fb069" strokeWidth="1.5" strokeDasharray="4 4" />
        )}
        {xCentrale !== null && (
          <line x1="62" y1={yC} x2={xCentrale} y2={yC} stroke="#eef7f2" strokeWidth="1.5" strokeDasharray="4 4" />
        )}
        {marche && (
          <g>
            <line x1="62" y1={yP} x2="62" y2={yC} stroke="#5bc8dd" strokeWidth="6" strokeLinecap="round" />
            <text x="70" y={(yP + yC) / 2 - 4} fill="#5bc8dd" fontSize="12" fontWeight="800" fontFamily="monospace">↕ chute</text>
            <text x="70" y={(yP + yC) / 2 + 12} fill="#5bc8dd" fontSize="13" fontWeight="800" fontFamily="monospace">{fr(chute)} m</text>
          </g>
        )}

        {/* La conduite forcée : elle suit la pente, de la prise à la centrale */}
        {xPrise !== null && xCentrale !== null && marche && (
          <g>
            <path d={`${cheminSurPente(xPrise, xCentrale, -5)} L${(xCentrale + 4).toFixed(1)},${(yC - 22).toFixed(1)}`} fill="none" stroke="#0e2a20" strokeWidth="12" strokeLinejoin="round" />
            <path d={`${cheminSurPente(xPrise, xCentrale, -5)} L${(xCentrale + 4).toFixed(1)},${(yC - 22).toFixed(1)}`} fill="none" stroke="#5bc8dd" strokeWidth="5" strokeLinejoin="round" className="b-flux" />
          </g>
        )}
        {xPrise !== null && xCentrale !== null && !marche && (
          <line x1={xPrise} y1={yP - 5} x2={xCentrale} y2={yC - 5} stroke="#e07a5f" strokeWidth="3" strokeDasharray="6 6" />
        )}

        {/* L'eau rendue : de la centrale vers la rivière (rien ne se perd) */}
        {xCentrale !== null && marche && (
          <g>
            <path
              d={`${cheminSurPente(xCentrale + 40, Math.max(xCentrale + 40, X_BAS), -1)} L${(Math.max(xCentrale + 40, X_BAS) + 20).toFixed(1)},302`}
              fill="none"
              stroke="#5bc8dd"
              strokeWidth="3"
              className="b-flux-lent"
            />
            {[0, 1].map((i) => (
              <circle key={i} cx={xCentrale + 30 + i * 22} cy={yC + 4} r={3} fill="#5bc8dd" className="b-goutte" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.5})` }} />
            ))}
          </g>
        )}

        {/* La prise d'eau : la retenue + la vanne (le robinet géant) */}
        {xPrise !== null && (
          <g>
            <rect x={xPrise - 44} y={yP - 14} width="42" height="14" rx="3" fill="#134c5c" />
            <path d={`M${xPrise - 40},${yP - 10} L${xPrise - 6},${yP - 10}`} fill="none" stroke="#5bc8dd" strokeWidth="2.5" className="b-flux-lent" />
            <rect x={xPrise - 4} y={yP - 18} width="8" height="18" rx="2" fill="#f2d43b" />
            <circle cx={xPrise} cy={yP} r="11" fill="none" stroke="#7fb069" strokeWidth="3" />
            <text x={xPrise + 14} y={yP - 18} fill="#7fb069" fontSize="11.5" fontWeight="800" fontFamily="monospace">PRISE D&apos;EAU · {fr(altP)} m</text>
          </g>
        )}

        {/* La centrale : la turbine Pelton + l'alternateur */}
        {xCentrale !== null && (
          <g>
            <rect x={xCentrale - 4} y={yC - 48} width="92" height="50" rx="7" fill="#0f241a" stroke={marche ? "#93bfa9" : "#e07a5f"} strokeWidth="3" />
            <circle cx={xCentrale + 18} cy={yC - 22} r="14" fill="#081510" stroke="#5bc8dd" strokeWidth="3" />
            <g className={marche ? "b-roue" : undefined}>
              <path d={`M${xCentrale + 18},${yC - 35} L${xCentrale + 18},${yC - 9} M${xCentrale + 5},${yC - 22} L${xCentrale + 31},${yC - 22} M${xCentrale + 9},${yC - 31} L${xCentrale + 27},${yC - 13} M${xCentrale + 27},${yC - 31} L${xCentrale + 9},${yC - 13}`} stroke="#5bc8dd" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx={xCentrale + 60} cy={yC - 22} r="11" fill="#081510" stroke="#f2d43b" strokeWidth="3" />
            <g className={marche ? "b-roue" : undefined}>
              <path d={`M${xCentrale + 60},${yC - 31} L${xCentrale + 60},${yC - 13} M${xCentrale + 51},${yC - 22} L${xCentrale + 69},${yC - 22}`} stroke="#f2d43b" strokeWidth="3" />
            </g>
            <text x={xCentrale + 42} y={yC - 62} fill={marche ? "#eef7f2" : "#e07a5f"} fontSize="11.5" fontWeight="800" textAnchor="middle" fontFamily="monospace">CENTRALE · {fr(altC)} m</text>
            {/* Le courant : fil vers les pylônes */}
            {marche && (
              <path
                d={`M${xCentrale + 88},${yC - 30} Q${((xCentrale + 88 + 724) / 2).toFixed(1)},${(Math.min(yC - 30, 200) - 24).toFixed(1)} 724,200 L776,128`}
                fill="none"
                stroke="#f2d43b"
                strokeWidth="2.5"
                strokeDasharray="4 5"
                className="b-flux"
              />
            )}
          </g>
        )}

        {/* Les pylônes + l'ampoule de l'île (éteinte si la centrale ne tourne pas) */}
        <path d="M724,200 L724,280 M712,212 L736,212 M714,226 L734,226" stroke="#93bfa9" strokeWidth="2.5" />
        <path d="M776,128 L776,170 M764,138 L788,138 M766,150 L786,150" stroke="#93bfa9" strokeWidth="2.5" />
        <circle cx="776" cy="108" r="14" fill="#f2d43b" className={marche ? "b-ampoule" : undefined} opacity={marche ? undefined : 0.15} />
        <text x="770" y="84" fill="#f2d43b" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">L&apos;ÎLE S&apos;ALLUME</text>

        {/* Les pastilles A → H — la grammaire des schémas de manuel (idée de
            Frédéric, 19/07, d'après une coupe légendée) : on apprend aussi à
            LIRE un schéma. Elles suivent les points placés par l'élève. */}
        {(
          [
            xPrise !== null ? ["A", xPrise - 23, yP - 26] : null,
            xCentrale !== null ? ["B", xCentrale + 88, yC - 48] : null,
            xCentrale !== null ? ["C", xCentrale + 18, yC - 44] : null,
            xCentrale !== null ? ["D", xCentrale + 60, yC - 44] : null,
            xPrise !== null ? ["E", xPrise + 4, yP + 18] : null,
            xPrise !== null && xCentrale !== null && marche
              ? ["F", (xPrise + xCentrale) / 2 + 14, yTerrain((xPrise + xCentrale) / 2) - 16]
              : null,
            ["G", 742, 236],
            ["H", 640, 302],
          ].filter(Boolean) as [string, number, number][]
        ).map(([lettre, x, y]) => (
          <g key={lettre} style={{ pointerEvents: "none" }}>
            <circle cx={x} cy={y} r="9" fill="#f2d43b" />
            <text x={x} y={y + 3.5} fill="#081510" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">{lettre}</text>
          </g>
        ))}

        {/* Le petit « plouf » là où l'élève vient de cliquer */}
        {ping && <circle key={ping.n} cx={ping.x} cy={ping.y} r="10" fill="none" stroke="#f2d43b" strokeWidth="3" className="b-ping" />}
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
            ["F", "La conduite forcée : le tuyau de la chute (à Takamaka, ~500 m)."],
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

  // LA MONTAGNE : les deux points que l'élève place en cliquant. Au départ,
  // la configuration de Takamaka (500 m de chute) — les défis restent vrais.
  const [xPrise, setXPrise] = useState<number | null>(X_PRISE_TAKAMAKA);
  const [xCentrale, setXCentrale] = useState<number | null>(X_CENTRALE_TAKAMAKA);
  const [ping, setPing] = useState<{ x: number; y: number; n: number } | null>(null);

  const clicMontagne = (xBrut: number) => {
    const x = Math.max(X_MIN_CLIC, Math.min(X_MAX_CLIC, xBrut));
    if (xPrise === null) setXPrise(x);
    else if (xCentrale === null) setXCentrale(x);
    else if (Math.abs(x - xPrise) <= Math.abs(x - xCentrale)) setXPrise(x);
    else setXCentrale(x);
    setPing((p) => ({ x, y: yTerrain(x), n: (p?.n ?? 0) + 1 }));
  };
  const recommencer = () => {
    setXPrise(null);
    setXCentrale(null);
    setPing(null);
  };
  const remettreTakamaka = () => {
    setXPrise(X_PRISE_TAKAMAKA);
    setXCentrale(X_CENTRALE_TAKAMAKA);
    setPing(null);
  };

  const altPrise = xPrise !== null ? altitude(xPrise) : null;
  const altCentrale = xCentrale !== null ? altitude(xCentrale) : null;
  const etat: EtatMontagne =
    altPrise === null
      ? "prise"
      : altCentrale === null
        ? "centrale"
        : altCentrale > altPrise
          ? "remonte"
          : altCentrale === altPrise
            ? "plat"
            : "ok";
  const chute = etat === "ok" && altPrise !== null && altCentrale !== null ? altPrise - altCentrale : 0;

  const consigne =
    etat === "prise"
      ? "👆 Clique sur la montagne pour placer la PRISE D'EAU (en haut)."
      : etat === "centrale"
        ? "👆 Clique plus bas pour placer la CENTRALE."
        : etat === "remonte"
          ? "⚠️ L'eau ne remonte pas toute seule ! Mets la centrale PLUS BAS que la prise d'eau."
          : etat === "plat"
            ? "⚠️ Pas de chute, pas de courant ! Mets la centrale PLUS BAS que la prise d'eau."
            : "👆 Clique près d'un point pour le déplacer. Plus la chute est haute, plus il y a de courant.";

  const kw = COEF_PUISSANCE * debit * chute;
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

        {/* LE SCHÉMA VIVANT — l'élève y place la prise et la centrale ; il
            accélère avec le débit. La consigne + les boutons au-dessus. */}
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded border border-[#1e3f2f] bg-[#0f241a] px-3 py-2">
          <p
            className={`min-w-0 flex-1 text-[14px] font-bold leading-5 ${
              etat === "remonte" || etat === "plat" ? "text-[#e07a5f]" : "text-[#eef7f2]"
            }`}
            aria-live="polite"
          >
            {consigne}
          </p>
          <button
            type="button"
            onClick={recommencer}
            className="rounded-sm border border-[#5bc8dd]/50 px-3 py-1.5 font-mono text-[12px] font-bold text-[#5bc8dd] hover:bg-[#5bc8dd]/15"
          >
            ↺ Recommencer
          </button>
          <button
            type="button"
            onClick={remettreTakamaka}
            className="rounded-sm border border-[#7fb069]/50 px-3 py-1.5 font-mono text-[12px] font-bold text-[#7fb069] hover:bg-[#7fb069]/15"
          >
            🏔️ Takamaka (500 m)
          </button>
        </div>

        <BarrageAnime
          debit={debit}
          xPrise={xPrise}
          xCentrale={xCentrale}
          etat={etat}
          chute={chute}
          ping={ping}
          onClic={clicMontagne}
        />

        {/* La ligne de calcul, sous le dessin : c'est elle que le prof projette */}
        <div className="mt-2 rounded border-2 border-[#5bc8dd]/60 bg-[#0f241a] px-3 py-2.5 font-mono text-[14px] font-bold leading-6 text-[#eef7f2]">
          <p>
            chute ={" "}
            {altPrise !== null ? `${fr(altPrise)} m` : "?"} − {altCentrale !== null ? `${fr(altCentrale)} m` : "?"}
            {" = "}
            <span className={etat === "ok" ? "text-[#5bc8dd]" : "text-[#e07a5f]"}>
              {etat === "ok"
                ? `${fr(chute)} m`
                : etat === "remonte" && altPrise !== null && altCentrale !== null
                  ? `${fr(altPrise - altCentrale)} m → impossible`
                  : etat === "plat"
                    ? "0 m"
                    : "?"}
            </span>
          </p>
          <p className="text-[#f2d43b]">
            puissance = 8 × {fr(debit, 1)} m³/s × {fr(chute)} m = {fr(kw)} kW
          </p>
        </div>

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
            nom={`2 · La conduite forcée — ${fr(chute)} m de chute`}
            explication="L'eau plonge dans un tuyau géant le long de la falaise. À Takamaka, la chute fait ~500 m, une des plus hautes de France. Plus c'est haut, plus l'eau arrive vite et fort — c'est l'énergie de la hauteur."
            quantite={debit}
            unite="m³/s en chute"
            pct={etat === "ok" ? 100 : 0}
            couleur="#5bc8dd"
          />
          <Etape
            nom="3 · La turbine — les jets frappent la roue"
            explication="En bas, l'eau sort en jets puissants qui frappent les augets de la turbine : la roue s'emballe. L'énergie de la hauteur devient de la rotation."
            quantite={kw}
            unite="kW mécaniques"
            pct={(kw / KW_A_FOND) * 100}
            couleur="#5bc8dd"
          />
          <Etape
            nom="4 · L'alternateur — la rotation devient du courant"
            explication="La turbine entraîne l'alternateur (une bobine géante qui tourne dans des aimants) : le courant file vers les pylônes et descend vers les villes. L'eau de Bébour allume Saint-Denis."
            quantite={kw}
            unite="kW envoyés sur l'île"
            pct={(kw / KW_A_FOND) * 100}
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
          puissance = 8 × {fr(debit, 1)} m³/s × {fr(chute)} m = <b>{fr(kw)} kW</b>
          <span className="text-[#93bfa9]"> · </span>
          familles = {fr(kw)} × 24 ÷ 10 = <b>{fr(familles)}</b>
          <span className="text-[#93bfa9]"> · </span>
          baignoires/s = {fr(debit, 1)} × 1 000 ÷ 200 = <b>{fr(baignoires)}</b>
        </div>

        {/* LES DÉFIS — à toi de calculer, le barrage vérifie */}
        <DefisSimulateur
          titre="Les défis du barrage"
          coupDePouce="Coup de pouce : clique « Takamaka (500 m) », règle le débit du défi — le barrage vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
          coachHref="/coach/serie?classe=4e&matiere=maths&notion=grandeur_composee&display=simple"
          coachLabel="Entraîne-toi sur le coach (débit et puissance, 4e)"
        />

        {/* Le pont vers l'épisode et le défi */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={lienVideo("https://youtu.be/bxbqIllTbYQ")}
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
