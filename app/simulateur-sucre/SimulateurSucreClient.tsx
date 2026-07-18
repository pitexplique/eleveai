"use client";

// « L'usine dans ta main » — l'élève règle le tonnage de canne, l'usine
// travaille sous ses yeux : les flux se répartissent (jus/bagasse), chaque
// étape affiche sa quantité, et les trois sorties tombent — le sucre, la
// mélasse, l'électricité. Les maths (proportionnalité, pourcentages) sont
// AFFICHÉES, jamais cachées — la règle du journal.
//
// Chiffres pédagogiques ARRONDIS (assumés « environ ») :
//   canne : ~10 kg/m² de champ (≈100 t/ha) · jus ~70 % / bagasse ~30 %
//   sucre ~10 % du poids de canne · mélasse ~3 %
//   électricité ~100 kWh par tonne de canne (cogénération bagasse)
//   une famille ~10 kWh/jour · un morceau de sucre ~6 g
//   terrain de foot : 7 140 m² (105 × 68 — le même que le défi du jour)

import { useEffect, useState } from "react";
import Link from "next/link";
import DefisSimulateur, { type DefiSimulateur } from "@/components/simulateurs/DefisSimulateur";

const RENDEMENT_CHAMP = 10; // kg de canne par m²
const PART_JUS = 0.7;
const PART_BAGASSE = 0.3;
const PART_SUCRE = 0.1;
const PART_MELASSE = 0.03;
const KWH_PAR_TONNE = 100;
const KWH_FAMILLE_JOUR = 10;
const MORCEAU_G = 6;
const TERRAIN_FOOT_M2 = 7140;

// ── Les défis de l'usine (règle du 18/07 : chaque simulateur a les siens) ────
// Les nombres diffèrent du curseur : la réponse n'est pas à l'écran, mais
// l'élève peut régler le tonnage pour vérifier — l'usine corrige elle-même.
const DEFIS: DefiSimulateur[] = [
  {
    id: "sucre",
    question:
      "1 000 tonnes de canne entrent à l'usine aujourd'hui. Combien de tonnes de sucre roux vont en sortir ?",
    reponse: 100,
    unite: "t",
    indice: "Le sucre, c'est environ 10 % du poids de la canne.",
    calcul: "sucre = 1 000 t × 10 % = 100 t",
  },
  {
    id: "familles",
    question:
      "Ces mêmes 1 000 t donnent de l'électricité : 100 kWh par tonne. Une famille utilise ~10 kWh par jour. Combien de familles ont leur journée de courant ?",
    reponse: 10000,
    unite: "familles",
    indice: "D'abord les kWh (1 000 × 100), puis divise par 10.",
    calcul: "1 000 × 100 = 100 000 kWh · 100 000 ÷ 10 = 10 000 familles",
  },
  {
    id: "inverse",
    question:
      "La coopérative commande 3 t de sucre pour ses confitures. Combien de tonnes de canne faut-il broyer ?",
    reponse: 30,
    unite: "t de canne",
    indice: "Remonte l'usine à l'envers : le sucre n'est que 10 % de la canne.",
    calcul: "canne = 3 ÷ 10 % = 3 ÷ 0,10 = 30 t — un cachalot pile",
  },
  {
    id: "champ",
    question:
      "Un planteur a un champ de 5 000 m², à ~10 kg de canne par m². Combien de TONNES de canne à la coupe ?",
    reponse: 50,
    unite: "t",
    indice: "5 000 × 10 te donne des kilos — pense à passer en tonnes.",
    calcul: "5 000 × 10 = 50 000 kg = 50 t",
  },
];

const COULEURS_DEFIS = {
  fond: "#241708",
  fondProfond: "#160d04",
  bord: "#3a2a14",
  accent: "#f2a93b",
  texte: "#f6ead6",
  sousTexte: "#c9a86c",
  ok: "#7fb069",
  rate: "#e07a3f",
};

// Formatage français des grands nombres, sans décimales inutiles.
function fr(n: number, decimales = 0): string {
  return n.toLocaleString("fr-FR", {
    maximumFractionDigits: decimales,
    minimumFractionDigits: 0,
  });
}

// ── Le schéma VIVANT de l'usine (SVG animé — un schéma, pas une scène) ────────
// Tout bouge : les moulins tournent, le jus coule, la flamme vacille, la
// vapeur monte, la turbine vire, les cristaux tombent, l'ampoule pulse.
// La cadence suit le tonnage : plus la canne arrive, plus l'usine s'active.
function UsineAnimee({ tonnes }: { tonnes: number }) {
  // De 3,6 s (30 t, au ralenti) à 0,9 s (8 000 t, pleine cadence).
  const cadence = (3.6 - (Math.min(tonnes, 8000) / 8000) * 2.7).toFixed(2) + "s";

  return (
    <div className="mt-3 overflow-x-auto rounded border border-[#3a2a14] bg-[#1b1006]">
      <style>{`
        @keyframes usine-flux { to { stroke-dashoffset: -28; } }
        @keyframes usine-tourner { to { transform: rotate(360deg); } }
        @keyframes usine-monter { 0% { transform: translateY(0); opacity: .9; } 100% { transform: translateY(-26px); opacity: 0; } }
        @keyframes usine-tomber { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 100% { transform: translateY(30px); opacity: 0; } }
        @keyframes usine-flamme { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.35); } }
        @keyframes usine-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @keyframes usine-canne { 0% { transform: translateX(0); opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(74px); opacity: 0; } }
        .u-flux { stroke-dasharray: 10 18; animation: usine-flux var(--cadence) linear infinite; }
        .u-roue { animation: usine-tourner calc(var(--cadence) * 2) linear infinite; transform-origin: center; transform-box: fill-box; }
        .u-roue-inverse { animation: usine-tourner calc(var(--cadence) * 2) linear infinite reverse; transform-origin: center; transform-box: fill-box; }
        .u-vapeur { animation: usine-monter calc(var(--cadence) * 1.6) ease-out infinite; }
        .u-cristal { animation: usine-tomber calc(var(--cadence) * 1.4) ease-in infinite; }
        .u-flamme { animation: usine-flamme calc(var(--cadence) * 0.8) ease-in-out infinite; transform-origin: center bottom; transform-box: fill-box; }
        .u-ampoule { animation: usine-pulse var(--cadence) ease-in-out infinite; }
        .u-canne { animation: usine-canne calc(var(--cadence) * 1.5) linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .u-flux, .u-roue, .u-roue-inverse, .u-vapeur, .u-cristal, .u-flamme, .u-ampoule, .u-canne { animation-duration: 12s; }
        }
      `}</style>
      <svg
        viewBox="0 0 820 330"
        style={{ ["--cadence" as string]: cadence }}
        className="mx-auto block min-w-[640px] max-w-[900px]"
        aria-label="Schéma animé de l'usine : la canne broyée devient jus puis sucre d'un côté, bagasse puis électricité de l'autre"
      >
        {/* La canne qui entre (tiges qui défilent vers les moulins) */}
        <text x="70" y="48" fill="#7fb069" fontSize="12" fontWeight="700" fontFamily="monospace">LA CANNE</text>
        {[0, 1, 2].map((i) => (
          <g key={i} className="u-canne" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.5})` }}>
            <rect x={60 + i * 24} y={62} width={20} height={6} rx={3} fill="#7fb069" />
          </g>
        ))}
        {/* Les moulins : deux rouleaux qui tournent en sens inverse */}
        <g>
          <circle cx="220" cy="58" r="22" fill="#241708" stroke="#c9a86c" strokeWidth="3" />
          <g className="u-roue"><path d="M220,40 L220,76 M202,58 L238,58" stroke="#c9a86c" strokeWidth="3" /></g>
          <circle cx="220" cy="104" r="22" fill="#241708" stroke="#c9a86c" strokeWidth="3" />
          <g className="u-roue-inverse"><path d="M220,86 L220,122 M202,104 L238,104" stroke="#c9a86c" strokeWidth="3" /></g>
          <text x="220" y="145" fill="#c9a86c" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">LES MOULINS</text>
        </g>
        {/* Tuyau du JUS (vers la gauche, en bas) */}
        <path d="M240,90 C330,110 330,150 300,190 C280,215 210,225 160,225" fill="none" stroke="#2a3d20" strokeWidth="10" />
        <path d="M240,90 C330,110 330,150 300,190 C280,215 210,225 160,225" fill="none" stroke="#7fb069" strokeWidth="4" className="u-flux" />
        {/* Cuve d'évaporation : bulles qui montent */}
        <rect x="80" y="200" width="90" height="60" rx="8" fill="#241708" stroke="#d9a441" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={100 + i * 25} cy={245} r={4} fill="#d9a441" className="u-vapeur" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.4})` }} />
        ))}
        <text x="125" y="278" fill="#d9a441" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">ÉVAPORATION</text>
        {/* Cristaux qui tombent vers le sac de sucre */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={198 + i * 12} y={252} width={5} height={5} fill="#f2a93b" className="u-cristal" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.3})` }} />
        ))}
        <path d="M190,290 L260,290 L252,320 L198,320 Z" fill="#241708" stroke="#f2a93b" strokeWidth="3" />
        <text x="225" y="311" fill="#f2a93b" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="monospace">SUCRE</text>
        {/* Tuyau BAGASSE (vers la droite) */}
        <path d="M244,66 C360,40 430,60 480,86" fill="none" stroke="#3d2413" strokeWidth="10" />
        <path d="M244,66 C360,40 430,60 480,86" fill="none" stroke="#e07a3f" strokeWidth="4" className="u-flux" />
        <text x="370" y="36" fill="#e07a3f" fontSize="11" fontWeight="700" fontFamily="monospace">LA BAGASSE</text>
        {/* Chaudière : flamme qui vacille */}
        <rect x="470" y="86" width="100" height="80" rx="8" fill="#241708" stroke="#e07a3f" strokeWidth="3" />
        <path d="M510,152 C502,138 508,128 520,118 C518,132 530,132 528,144 C526,152 518,158 510,152 Z" fill="#e07a3f" className="u-flamme" />
        <text x="520" y="182" fill="#e07a3f" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">CHAUDIÈRE</text>
        {/* Vapeur qui monte de la chaudière */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={540 + i * 14} cy={80} r={5} fill="#f6ead6" opacity={0.7} className="u-vapeur" style={{ animationDelay: `calc(var(--cadence) * ${i * 0.5})` }} />
        ))}
        {/* Turbine : la spirale qui vire */}
        <circle cx="650" cy="120" r="30" fill="#241708" stroke="#f2d43b" strokeWidth="3" />
        <g className="u-roue">
          <path d="M650,96 C662,104 662,116 650,120 C638,124 638,136 650,144 M626,120 C634,108 646,108 650,120 C654,132 666,132 674,120" fill="none" stroke="#f2d43b" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        <text x="650" y="168" fill="#f2d43b" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">TURBINE</text>
        {/* Fil électrique + ampoule qui pulse */}
        <path d="M680,110 L740,92" stroke="#f2d43b" strokeWidth="2.5" strokeDasharray="4 5" className="u-flux" />
        <circle cx="756" cy="84" r="14" fill="#f2d43b" className="u-ampoule" />
        <rect x="750" y="98" width="12" height="8" rx="2" fill="#c9a86c" />
        <text x="756" y="126" fill="#f2d43b" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">LUMIÈRE</text>
        {/* La mélasse : goutte qui tombe vers le fût */}
        <path d="M160,240 C120,255 100,270 96,284" fill="none" stroke="#8a5a3b" strokeWidth="6" />
        <circle cx="96" cy="292" r="4" fill="#8a5a3b" className="u-cristal" />
        <rect x="78" y="300" width="36" height="24" rx="4" fill="#241708" stroke="#8a5a3b" strokeWidth="2.5" />
        <text x="96" y="316" fill="#d8a06a" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="monospace">MÉLASSE</text>
      </svg>
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
  pct: number; // largeur de la barre, en % du tonnage de canne
  couleur: string;
}) {
  return (
    <div className="rounded border border-[#3a2a14] bg-[#241708] px-3 py-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#c9a86c]">
          {nom}
        </p>
        <p className="font-mono text-sm font-bold tabular-nums text-[#f6ead6]">
          {fr(quantite, quantite < 10 ? 1 : 0)} <span className="text-[11px] font-normal text-[#c9a86c]">{unite}</span>
        </p>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#160d04]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: Math.max(2, Math.min(100, pct)) + "%", backgroundColor: couleur }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-5 text-[#d8c4a0]">{explication}</p>
    </div>
  );
}

export default function SimulateurSucreClient() {
  // Le tonnage du jour : d'un cachalot de canne (30 t) à une pleine journée
  // d'usine (8 000 t).
  const [tonnes, setTonnes] = useState(300);

  // MODE CLASSE (vidéoprojecteur) : tout grossit — mémorisé, partagé avec le
  // simulateur cyclone (même clé localStorage).
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

  const jus = tonnes * PART_JUS;
  const bagasse = tonnes * PART_BAGASSE;
  const sucre = tonnes * PART_SUCRE;
  const melasse = tonnes * PART_MELASSE;
  const kwh = tonnes * KWH_PAR_TONNE;
  const familles = kwh / KWH_FAMILLE_JOUR;
  const morceaux = (sucre * 1_000_000) / MORCEAU_G;
  const champM2 = (tonnes * 1000) / RENDEMENT_CHAMP;
  const terrains = champM2 / TERRAIN_FOOT_M2;
  const camions = tonnes / 30;

  return (
    <div className="min-h-screen bg-[#160d04] text-[#f6ead6]">
      {/* Manchette de l'usine */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#3a2a14] px-5 pb-2.5 pt-3.5">
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.28em]">
          L&apos;usine dans ta <span className="text-[#f2a93b]">main</span>
        </h1>
        <span className="font-serif text-sm italic text-[#c9a86c]">
          Du champ au sucre — et à la lumière
        </span>
        <button
          type="button"
          onClick={basculerModeClasse}
          aria-pressed={modeClasse}
          className={`ml-auto rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider transition ${
            modeClasse
              ? "border-[#f2a93b] bg-[#f2a93b] text-[#160d04]"
              : "border-[#f2a93b]/40 bg-transparent text-[#f2a93b] hover:bg-[#f2a93b]/15"
          }`}
        >
          🖥️ MODE CLASSE {modeClasse ? "✓" : ""}
        </button>
        <span className="rounded-sm bg-[#f2a93b] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#160d04]">
          CAMPAGNE SUCRIÈRE
        </span>
      </header>

      <main
        className="mx-auto max-w-5xl px-4 py-5 sm:px-6"
        style={modeClasse ? ({ zoom: 1.35 } as React.CSSProperties) : undefined}
      >
        {/* La commande : le tonnage du jour */}
        <div className="rounded border border-[#3a2a14] bg-[#241708] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#c9a86c]">
              🚛 La canne qui arrive aujourd&apos;hui
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-[#f2a93b]">
              {fr(tonnes)} <span className="text-sm font-normal text-[#c9a86c]">tonnes</span>
            </p>
          </div>
          <input
            type="range"
            min={30}
            max={8000}
            step={10}
            value={tonnes}
            onChange={(e) => setTonnes(+e.target.value)}
            className="mt-3 w-full accent-[#f2a93b]"
            aria-label="Tonnage de canne du jour, en tonnes"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#c9a86c]/70">
            <span>30 t — un cachalot de canne</span>
            <span>8 000 t — une pleine journée d&apos;usine</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-5 text-[#d8c4a0]">
            Soit <b className="text-[#f6ead6]">{fr(camions, camions < 10 ? 1 : 0)} camions</b> venus
            des champs — un champ d&apos;environ{" "}
            <b className="text-[#f6ead6]">{fr(champM2)} m²</b>
            {terrains >= 1 && (
              <> ({fr(terrains, terrains < 10 ? 1 : 0)} terrains de foot)</>
            )}
            , à ~10 kg de canne par m².
          </p>
        </div>

        {/* LE SCHÉMA VIVANT — l'usine animée, qui accélère avec le tonnage. */}
        <UsineAnimee tonnes={tonnes} />

        {/* Le broyage : la canne se sépare en deux flux */}
        <div className="mt-3">
          <Etape
            nom="1 · Le broyage — les moulins pressent la canne"
            explication="La canne passe dans les moulins. Tout se sépare en deux : le jus sucré d'un côté, les fibres de l'autre. Rien ne se perd."
            quantite={tonnes}
            unite="t de canne"
            pct={100}
            couleur="#7fb069"
          />
        </div>

        {/* Les deux lignes : jus (sucre) / bagasse (électricité) */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#7fb069]">
              ↓ la ligne du jus (~70 %)
            </p>
            <Etape
              nom="2 · Le jus (vesou)"
              explication="70 % du poids de la canne : un jus vert et sucré, nettoyé à la chaux puis filtré."
              quantite={jus}
              unite="t"
              pct={PART_JUS * 100}
              couleur="#7fb069"
            />
            <Etape
              nom="3 · L'évaporation — l'eau s'en va"
              explication="On chauffe : l'eau s'évapore, le jus devient un sirop épais et doré."
              quantite={jus * 0.25}
              unite="t de sirop"
              pct={PART_JUS * 25}
              couleur="#d9a441"
            />
            <Etape
              nom="4 · La cristallisation + le turbinage"
              explication="Le sirop cuit jusqu'aux cristaux, puis une essoreuse géante sépare le sucre roux... de la mélasse, qui part vers la distillerie (le rhum)."
              quantite={sucre}
              unite="t de sucre roux"
              pct={PART_SUCRE * 100}
              couleur="#f2a93b"
            />
          </div>
          <div className="space-y-3">
            <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#e07a3f]">
              ↓ la ligne de la bagasse (~30 %)
            </p>
            <Etape
              nom="2 bis · La bagasse — les fibres"
              explication="30 % du poids : les fibres broyées et sèches. Ce n'est pas un déchet — c'est un combustible."
              quantite={bagasse}
              unite="t"
              pct={PART_BAGASSE * 100}
              couleur="#e07a3f"
            />
            <Etape
              nom="3 bis · La chaudière — la vapeur"
              explication="La bagasse brûle, l'eau bout, la vapeur file sous pression vers la turbine."
              quantite={bagasse}
              unite="t brûlées"
              pct={PART_BAGASSE * 100}
              couleur="#e07a3f"
            />
            <Etape
              nom="4 bis · La turbine — l'électricité"
              explication="La vapeur fait tourner la turbine : l'usine s'alimente elle-même ET envoie le reste sur le réseau de l'île. La canne fait de la lumière."
              quantite={kwh}
              unite="kWh"
              pct={PART_BAGASSE * 100}
              couleur="#f2d43b"
            />
          </div>
        </div>

        {/* Les sorties du jour */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded border-2 border-[#f2a93b] bg-[#241708] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#c9a86c]">🍬 Sucre roux</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#f2a93b]">{fr(sucre, sucre < 10 ? 1 : 0)} t</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d8c4a0]">
              ≈ {fr(morceaux)} morceaux de sucre (6 g pièce)
            </p>
          </div>
          <div className="rounded border-2 border-[#f2d43b] bg-[#241708] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#c9a86c]">💡 Électricité</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#f2d43b]">{fr(kwh)} kWh</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d8c4a0]">
              ≈ une journée de courant pour {fr(familles)} familles
            </p>
          </div>
          <div className="rounded border-2 border-[#8a5a3b] bg-[#241708] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#c9a86c]">🥃 Mélasse</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#d8a06a]">{fr(melasse, melasse < 10 ? 1 : 0)} t</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d8c4a0]">
              direction la distillerie — c&apos;est elle qui devient le rhum
            </p>
          </div>
        </div>

        {/* Les maths de l'usine, affichées */}
        <div className="mt-4 rounded border border-dashed border-[#f2a93b]/40 bg-[#241708] px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-[#f2a93b]">
          sucre = {fr(tonnes)} t × 10 % = <b>{fr(sucre, sucre < 10 ? 1 : 0)} t</b>
          <span className="text-[#c9a86c]"> · </span>
          électricité = {fr(tonnes)} t × 100 kWh/t = <b>{fr(kwh)} kWh</b>
          <span className="text-[#c9a86c]"> · </span>
          familles = {fr(kwh)} ÷ 10 = <b>{fr(familles)}</b>
        </div>

        {/* LES DÉFIS — à toi de calculer, l'usine vérifie */}
        <DefisSimulateur
          titre="Les défis de l'usine"
          coupDePouce="Coup de pouce : règle le tonnage du défi — l'usine vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* Le pont vers l'épisode et le défi */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/hH2N0Cvx-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#f2a93b] px-4 py-2 text-sm font-bold text-[#160d04] hover:brightness-110"
          >
            ▶ L&apos;épisode « La canne à sucre » (4 min)
          </a>
          <Link
            href="/defis-du-jour"
            className="inline-flex items-center gap-2 rounded border border-[#3a2a14] bg-[#241708] px-4 py-2 text-sm font-bold text-[#f6ead6] hover:brightness-125"
          >
            🎯 Le défi du jour
          </Link>
        </div>
      </main>

      {/* Le garde-fou d'honnêteté */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#3a2a14] px-5 py-2.5 text-[11.5px] text-[#c9a86c]">
        <span>
          Chiffres pédagogiques arrondis — inspiré du fonctionnement d&apos;une
          sucrerie réunionnaise comme celle du Gol. Derrière ces flux, il y a
          une filière de ~18 000 personnes.
        </span>
        <span className="ml-auto font-mono">
          Un jeu du <b className="font-bold text-[#f2a93b]">Journal d&apos;EleveAI</b> 🦎
        </span>
      </footer>
    </div>
  );
}
