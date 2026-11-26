"use client";

// « Le lagon dans ta main » — l'élève règle la houle du large, la barrière
// de corail travaille sous ses yeux : la vague déferle sur la crête (la
// muraille vivante casse ~90 % de la hauteur), le lagon reste calme, la
// nurserie grandit à l'abri — et le poisson-perroquet fabrique le sable
// blanc de la plage. Les maths (hauteurs, pourcentages, durées) sont
// AFFICHÉES, jamais cachées.
//
// Chiffres pédagogiques ARRONDIS (assumés « environ ») :
//   houle du large : de 0,5 m (mer d'huile) à 10 m (mai 2007, la houle du
//   siècle) · le récif casse ~90 % de la hauteur → vague lagon ≈ houle × 0,1
//   un corail massif grandit ~1 cm/an · le récif de l'Ermitage ≈ 8 000 ans
//   un poisson-perroquet fabrique ~90 kg de sable blanc par an
//   la Réserve naturelle marine (2007) : 3 500 ha ≈ 4 900 terrains de foot
//   t = taille ÷ vitesse — la même formule que le cyclone et le volcan.
//
// L'ÉLÈVE AGIT (26/11) : la barrière est découpée en 10 morceaux cliquables
// (vue du ciel, sous la coupe). Un clic casse un morceau (corail blanchi, une
// brèche), un re-clic le répare. Chaque morceau = 10 % de la barrière.
//   part cassée de la hauteur = 90 % × (part intacte)
//   vague lagon = houle × (1 − 0,9 × part intacte)
// Barrière entière (état initial) : houle × 0,1 — les défis restent vrais.

import { useEffect, useState } from "react";
import Link from "next/link";
import { lienVideo } from "@/lib/videos/lienVideo";
import DefisSimulateur, { type DefiSimulateur } from "@/components/simulateurs/DefisSimulateur";

const TERRAIN_FOOT_M2 = 7140;
const RESERVE_HA = 3500;
const SABLE_PARROT_KG_AN = 90;
// 3 500 ha = 35 000 000 m² ÷ 7 140 ≈ 4 902 → arrondi pédagogique.
const TERRAINS_RESERVE = 4900;

// ── Les défis du lagon (règle du 18/07 : chaque simulateur a les siens) ──────
// Les nombres diffèrent du curseur : la réponse n'est pas à l'écran, mais
// l'élève peut régler la houle pour vérifier — le lagon corrige lui-même.
const DEFIS: DefiSimulateur[] = [
  {
    id: "houle",
    question:
      "La houle du large mesure 6 m. La barrière casse 90 % de la hauteur des vagues : quelle hauteur de vaguelette dans le lagon, en cm ?",
    reponse: 60,
    unite: "cm",
    tolerance: 1,
    indice: "Il ne reste que 10 % : 6 m × 0,1 — puis convertis en cm.",
    calcul: "6 × 0,1 = 0,60 m = 60 cm — la muraille a bu tout le reste",
  },
  {
    id: "sable",
    question:
      "Une école de 20 poissons-perroquets broute le récif. Chacun fabrique ~90 kg de sable par an : combien de kg en un an ?",
    reponse: 1800,
    unite: "kg",
    indice: "20 poissons × 90 kg chacun.",
    calcul: "20 × 90 = 1 800 kg ≈ 1,8 tonne de sable blanc — chaque année",
  },
  {
    id: "corail",
    question:
      "Un corail massif grandit d'environ 1 cm par an. Quel âge a une patate de corail de 3 m ?",
    reponse: 300,
    unite: "ans",
    indice: "3 m = 300 cm ; t = taille ÷ vitesse — la même formule que le cyclone et le volcan.",
    calcul: "t = 300 ÷ 1 = 300 ans — et un seul coup de palme peut tout casser",
  },
  {
    id: "reserve",
    question:
      "La réserve marine protège 3 500 hectares (1 ha = 10 000 m²). Combien de terrains de foot (7 140 m²) ? (arrondis)",
    reponse: 4900,
    unite: "terrains",
    tolerance: 60,
    indice: "3 500 ha = 35 000 000 m² ; divise par 7 140.",
    calcul: "35 000 000 ÷ 7 140 ≈ 4 900 terrains de foot protégés",
  },
];

const COULEURS_DEFIS = {
  fond: "#062b33",
  fondProfond: "#03181e",
  bord: "#0f4a58",
  accent: "#5bc8dd",
  texte: "#ecfbfa",
  sousTexte: "#8fc6cf",
  ok: "#7fb069",
  rate: "#f2d43b",
};

const NB_MORCEAUX = 10;
const COULEURS_CORAIL = ["#ff7a6b", "#f2a65a", "#c77dba"];

// La risée du lagon : une vague d'amplitude a (en pixels), de x = 330 à 690.
function cheminVagueLagon(a: number): string {
  let d = `M330,120 Q345,${(120 - a).toFixed(1)} 360,120`;
  for (let x = 390; x <= 690; x += 30) d += ` T${x},120`;
  return d;
}

// Formatage français des grands nombres, sans décimales inutiles.
function fr(n: number, decimales = 0): string {
  return n.toLocaleString("fr-FR", {
    maximumFractionDigits: decimales,
    minimumFractionDigits: 0,
  });
}

// ── Le schéma VIVANT du lagon (SVG animé — une coupe, pas une scène) ─────────
// Tout bouge : la houle roule au large (son amplitude suit le curseur),
// l'écume explose sur la crête, le lagon ondule à peine, les poissons nagent.
// Pastilles A→H : la grammaire des coupes de manuel (on apprend aussi à LIRE
// un schéma). De gauche à droite : le large → la pente externe → la crête →
// le platier → le lagon (patates, poissons) → la plage. Dessous : la barrière
// vue du ciel, en 10 morceaux que l'élève casse ou répare.
function LagonAnime({
  houle,
  casses,
  onBasculer,
  onRecommencer,
}: {
  houle: number;
  casses: boolean[];
  onBasculer: (i: number) => void;
  onRecommencer: () => void;
}) {
  // De 3,8 s (0,5 m, mer d'huile) à 1,2 s (10 m, la houle du siècle).
  const cadence = (3.8 - (Math.min(houle, 10) / 10) * 2.6).toFixed(2) + "s";
  // L'amplitude des vagues du large, en pixels du schéma.
  const amp = 4 + houle * 2.4;

  // Les maths de la barrière (en entiers pour éviter les 0,0999…).
  const intacts = casses.filter((c) => !c).length;
  const nbCasses = NB_MORCEAUX - intacts;
  const pctIntact = intacts * 10; // chaque morceau = 10 %
  const pctCasse = 9 * intacts; // 90 % × part intacte, en %
  const facteurPct = 100 - pctCasse; // ce qui reste de la hauteur, en %
  const vagueCm = houle * facteurPct; // houle (m) × 100 × facteurPct / 100
  const vagueM = vagueCm / 100;
  // La vague du lagon, à la même échelle que la houle du large (plafonnée
  // pour ne pas cogner le titre du lagon).
  const ampLagon = Math.min(22, vagueM * 2.4);

  return (
    <div className="mt-3 overflow-x-auto rounded border border-[#0f4a58] bg-[#03181e]">
      {/* La consigne — courte, pour les élèves qui lisent mal. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-[#0f4a58] px-3 py-2">
        <p className="text-[13.5px] font-bold leading-5 text-[#ecfbfa]">
          👆 Clique sur un morceau de la barrière pour le casser. Re-clique pour le réparer.
        </p>
        <span className="font-mono text-[12.5px] font-bold tabular-nums text-[#5bc8dd]">
          {intacts}/10 intacts = {pctIntact} %
        </span>
        <button
          type="button"
          onClick={onRecommencer}
          className="ml-auto rounded-sm border border-[#5bc8dd]/40 px-2.5 py-1 font-mono text-[11.5px] font-bold text-[#5bc8dd] hover:bg-[#5bc8dd]/15"
        >
          ↺ Recommencer
        </button>
      </div>
      <style>{`
        @keyframes lag-crac { 0% { transform: scale(1.3); } 60% { transform: scale(0.92); } 100% { transform: scale(1); } }
        .l-crac { animation: lag-crac .45s ease-out; transform-box: fill-box; transform-origin: center; }
        .l-morceau:hover .l-survol, .l-morceau:focus-visible .l-survol { stroke: #f2d43b; }
        .l-morceau:focus { outline: none; }
        @keyframes lag-flux { to { stroke-dashoffset: -28; } }
        @keyframes lag-ecume { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(var(--vx), -36px); opacity: 0; } }
        @keyframes lag-nage { 0%,100% { transform: translateX(0); } 50% { transform: translateX(28px); } }
        @keyframes lag-scintille { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        .l-houle { stroke-dasharray: 14 10; animation: lag-flux var(--cadence) linear infinite; }
        .l-ride { stroke-dasharray: 4 20; animation: lag-flux calc(var(--cadence) * 3) linear infinite; }
        .l-ecume { animation: lag-ecume var(--cadence) ease-out infinite; }
        .l-poisson { animation: lag-nage calc(var(--cadence) * 5) ease-in-out infinite; }
        .l-corail { animation: lag-scintille calc(var(--cadence) * 2.5) ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .l-houle, .l-ride, .l-ecume, .l-poisson, .l-corail { animation-duration: 12s; }
          .l-crac { animation: none; }
        }
      `}</style>
      <svg
        viewBox="0 0 820 414"
        style={{ ["--cadence" as string]: cadence, touchAction: "manipulation" }}
        className="mx-auto block min-w-[640px] max-w-[900px]"
        aria-label="Coupe animée du lagon : la houle du large déferle sur la crête du récif, le lagon reste calme derrière la barrière de corail, jusqu'à la plage de sable blanc. En dessous, la barrière vue du ciel, en 10 morceaux à casser ou réparer."
      >
        {/* L'eau : le large (sombre, profond) puis le lagon (turquoise, ~1,2 m) */}
        <rect x="20" y="120" width="290" height="190" fill="#0a3345" />
        <rect x="310" y="120" width="390" height="190" fill="#0e5666" />
        {/* Le fond : la pente externe qui monte du large, la crête, le platier,
            le fond du lagon — la muraille construite par les polypes. */}
        <path
          d="M20,310 L20,274 L235,264 C268,252 286,175 297,122 L313,120 L320,133 L385,134 L402,150 L660,150 L660,310 Z"
          fill="#123f4a"
          stroke="#0f4a58"
          strokeWidth="2"
        />
        {/* La plage : le sable de corail, gagné sur la droite */}
        <path d="M645,150 L690,121 L770,92 L800,86 L800,310 L645,310 Z" fill="#f2e3c1" />
        <path d="M690,121 L770,92 L800,86" fill="none" stroke="#d9c396" strokeWidth="2.5" />

        {/* A · Le large : la houle roule (amplitude = le curseur) */}
        <path
          d={`M25,114 Q55,${114 - amp} 85,114 T145,114 T205,114 T265,114`}
          fill="none"
          stroke="#5bc8dd"
          strokeWidth="4"
          className="l-houle"
        />
        <path
          d={`M25,${104 - amp * 0.4} Q55,${104 - amp * 1.3} 85,${104 - amp * 0.4} T145,${104 - amp * 0.4} T205,${104 - amp * 0.4} T265,${104 - amp * 0.4}`}
          fill="none"
          stroke="#5bc8dd"
          strokeWidth="2"
          opacity="0.45"
          className="l-houle"
        />
        <text x="70" y="150" fill="#8fc6cf" fontSize="10" fontWeight="700" fontFamily="monospace">LE LARGE</text>
        <text x="70" y="163" fill="#8fc6cf" fontSize="9.5" fontFamily="monospace">la houle prend son élan</text>

        {/* B · La pente externe (le jardin de corail) */}
        <path d="M262,246 l-5,-14 m5,14 l6,-13 m-6,13 l0,-17" stroke="#ff7a6b" strokeWidth="3" strokeLinecap="round" className="l-corail" />
        <path d="M282,206 l-5,-12 m5,12 l6,-11" stroke="#f2a65a" strokeWidth="3" strokeLinecap="round" className="l-corail" />
        <text x="120" y="248" fill="#8fc6cf" fontSize="9.5" fontFamily="monospace">~8 000 ans de travail</text>
        <text x="120" y="260" fill="#8fc6cf" fontSize="9.5" fontFamily="monospace">des polypes</text>

        {/* C · La crête : la vague déferle — l'écume explose */}
        {/* La crête en coupe : 10 petits blocs qui suivent la vue du ciel
            (corail vivant ou blanchi, cassé). */}
        {casses.map((casse, i) => (
          <rect
            key={i}
            x={296 + i * 10.5}
            y={casse ? 124 : 115}
            width={9}
            height={casse ? 4 : 8}
            rx={1.5}
            fill={casse ? "#e9e4d8" : COULEURS_CORAIL[i % 3]}
            opacity={casse ? 0.7 : 1}
            pointerEvents="none"
          />
        ))}
        {[-8, -2, 4, 10].map((dx, i) => (
          <circle
            key={i}
            cx={303 + dx}
            cy={116}
            r={(2.6 + houle * 0.16) * (0.4 + 0.6 * (intacts / NB_MORCEAUX))}
            fill="#f4fbfc"
            className="l-ecume"
            style={{ ["--vx" as string]: `${dx * 1.7}px`, animationDelay: `calc(var(--cadence) * ${i * 0.22})` }}
          />
        ))}
        <text x="303" y="88" fill="#f4fbfc" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">ÇA DÉFERLE</text>
        <text x="303" y="100" fill="#8fc6cf" fontSize="9.5" textAnchor="middle" fontFamily="monospace">−{pctCasse} % de hauteur</text>

        {/* D · Le platier, à fleur d'eau */}
        <text x="352" y="176" fill="#8fc6cf" fontSize="9.5" textAnchor="middle" fontFamily="monospace">le platier</text>

        {/* E · Le lagon : l'eau calme — une risée à peine… tant que la
            barrière tient. Chaque brèche fait grossir la vague. */}
        <path
          d={cheminVagueLagon(ampLagon)}
          fill="none"
          stroke="#8fe0ee"
          strokeWidth="2.5"
          className={ampLagon < 2 ? "l-ride" : "l-houle"}
        />
        <text
          x="500"
          y="82"
          fill={nbCasses > 0 ? "#f2d43b" : "#5bc8dd"}
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {nbCasses > 0 ? "LE LAGON · LES VAGUES ENTRENT !" : "LE LAGON · L’EAU CALME (~1,2 m)"}
        </text>

        {/* F · Les patates de corail (les immeubles des poissons) */}
        <ellipse cx="452" cy="146" rx="11" ry="7" fill="#ff7a6b" className="l-corail" />
        <ellipse cx="521" cy="147" rx="9" ry="6" fill="#c77dba" className="l-corail" />
        <ellipse cx="586" cy="147" rx="10" ry="6.5" fill="#f2a65a" className="l-corail" />

        {/* G · La nurserie : les poissons nagent à l'abri */}
        <g className="l-poisson">
          <text x="470" y="138" fontSize="14" aria-hidden>🐠</text>
        </g>
        <g className="l-poisson" style={{ animationDelay: "calc(var(--cadence) * 1.8)" }}>
          <text x="540" y="132" fontSize="11" aria-hidden>🐟</text>
        </g>

        {/* H · La plage de sable blanc */}
        <text x="745" y="75" fill="#f2e3c1" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">LA PLAGE</text>
        <text x="352" y="300" fill="#8fc6cf" fontSize="9.5" fontFamily="monospace">la muraille, à ~500 m de la plage</text>

        {/* Les pastilles A → H (la grammaire des coupes de manuel) */}
        {([
          ["A", 70, 92],
          ["B", 258, 222],
          ["C", 303, 62],
          ["D", 352, 155],
          ["E", 620, 95],
          ["F", 452, 172],
          ["G", 505, 125],
          ["H", 742, 110],
        ] as const).map(([lettre, x, y]) => (
          <g key={lettre}>
            <circle cx={x} cy={y} r="9" fill="#f2d43b" />
            <text x={x} y={y + 3.5} fill="#03181e" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">{lettre}</text>
          </g>
        ))}

        {/* LA BARRIÈRE VUE DU CIEL — 10 morceaux cliquables (70 × 64 unités,
            ≈ 55 × 50 px à 375 px de large : assez gros pour un doigt). */}
        <text x="410" y="332" fill="#ecfbfa" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">
          LA BARRIÈRE VUE DU CIEL · 10 morceaux · chacun = 10 %
        </text>
        <rect x="50" y="340" width="720" height="14" fill="#0a3345" />
        <rect x="50" y="354" width="720" height="36" fill="#0e5666" />
        <rect x="50" y="390" width="720" height="16" fill="#1a7a88" />
        <text x="56" y="350" fill="#8fc6cf" fontSize="8.5" fontFamily="monospace">↓ LE LARGE</text>
        <text x="56" y="402" fill="#ecfbfa" fontSize="8.5" fontFamily="monospace">LE LAGON</text>
        {casses.map((casse, i) => {
          const x = 60 + i * 70;
          const couleur = COULEURS_CORAIL[i % 3];
          return (
            <g
              key={i}
              role="button"
              tabIndex={0}
              aria-pressed={casse}
              aria-label={`Morceau ${i + 1} de la barrière : ${casse ? "cassé, clique pour le réparer" : "intact, clique pour le casser"}`}
              className="l-morceau"
              style={{ cursor: "pointer" }}
              onClick={() => onBasculer(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onBasculer(i);
                }
              }}
            >
              {/* La zone de clic : tout le morceau, même la brèche vide */}
              <rect x={x - 3} y={338} width={70} height={66} fill="transparent" />
              <g key={casse ? "casse" : "intact"} className="l-crac">
                {casse ? (
                  <>
                    {/* Corail blanchi, effondré : une brèche où l'eau passe */}
                    <rect x={x + 4} y={374} width={56} height={15} rx={3} fill="#e9e4d8" opacity={0.85} />
                    <path
                      d={`M${x + 8},378 l8,6 l7,-5 l9,6 l8,-6 l10,5`}
                      fill="none"
                      stroke="#7d7466"
                      strokeWidth="1.6"
                    />
                    <text x={x + 32} y={368} fill="#f2d43b" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">
                      ≋ brèche
                    </text>
                  </>
                ) : (
                  <>
                    {/* Corail vivant : un bloc et ses branches */}
                    <path
                      d={`M${x + 14},356 l-4,-10 M${x + 14},356 l5,-9 M${x + 34},356 l0,-11 M${x + 34},356 l-5,-7 M${x + 52},356 l4,-9`}
                      stroke={couleur}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <rect x={x} y={354} width={64} height={36} rx={6} fill={couleur} />
                    <text x={x + 32} y={377} fill="#03181e" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="monospace">
                      {i + 1}
                    </text>
                  </>
                )}
              </g>
              <rect
                x={x - 1}
                y={341}
                width={66}
                height={62}
                rx={7}
                fill="none"
                stroke="transparent"
                strokeWidth="2"
                className="l-survol"
              />
            </g>
          );
        })}
      </svg>

      {/* La ligne de calcul — celle que le prof projette. */}
      <div className="border-t border-[#0f4a58] px-3 py-2 font-mono text-[13px] leading-6 text-[#5bc8dd]">
        {intacts} {intacts > 1 ? "morceaux" : "morceau"} sur 10 = {pctIntact} % intact → la barrière casse 90 % × {pctIntact} % ={" "}
        <b className="text-[#ecfbfa]">{pctCasse} %</b> de la hauteur → {fr(houle, 1)} m × {fr(facteurPct / 100, 2)} ={" "}
        <b className="text-[#ecfbfa]">{fr(vagueM, 3)} m</b> = {fr(vagueCm, 1)} cm
      </div>
      {/* Le message de tact : ici on casse pour comprendre, jamais en vrai. */}
      <p
        className={`px-3 pb-2 text-[12.5px] leading-5 ${nbCasses > 0 ? "font-bold text-[#f2d43b]" : "text-[#8fc6cf]"}`}
      >
        🤿 Ici, c&apos;est un jeu. Dans le vrai lagon, on ne marche JAMAIS sur le corail : un morceau cassé met des
        dizaines d&apos;années à repousser (~1 cm par an).
      </p>
      {/* Le vocabulaire du schéma, de A à H — replié pour garder la page courte. */}
      <details className="border-t border-[#0f4a58] px-3 py-2">
        <summary className="cursor-pointer text-[11.5px] font-bold text-[#8fc6cf] hover:text-[#ecfbfa]">
          🔤 Les mots du lagon, de A à H ▾
        </summary>
        <div className="mt-2 grid gap-x-5 gap-y-1.5 pb-1 text-[12px] leading-5 text-[#cfe9ec] sm:grid-cols-2">
          {[
            ["A", "Le large : l'océan ouvert, là où la houle prend son élan."],
            ["B", "La pente externe : le flanc du récif, le jardin de corail le plus riche."],
            ["C", "La crête : le sommet de la muraille, où la vague déferle — la ligne blanche vue du ciel."],
            ["D", "Le platier : le plateau de corail, sous quelques centimètres d'eau."],
            ["E", "Le lagon : l'eau calme entre le récif et la plage (~1,2 m à l'Ermitage)."],
            ["F", "Les patates de corail : des colonies de polypes — ~1 cm par an."],
            ["G", "La nurserie : les bébés poissons grandissent à l'abri de la muraille."],
            ["H", "La plage : du sable de corail — fabriqué (aussi) par les poissons-perroquets."],
          ].map(([lettre, texte]) => (
            <p key={lettre}>
              <span className="mr-1.5 inline-block w-5 rounded-sm bg-[#f2d43b] text-center font-mono text-[11px] font-black text-[#03181e]">
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
    <div className="rounded border border-[#0f4a58] bg-[#062b33] px-3 py-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8fc6cf]">
          {nom}
        </p>
        <p className="font-mono text-sm font-bold tabular-nums text-[#ecfbfa]">
          {fr(quantite, Number.isInteger(quantite) ? 0 : 1)} <span className="text-[11px] font-normal text-[#8fc6cf]">{unite}</span>
        </p>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#03181e]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: Math.max(2, Math.min(100, pct)) + "%", backgroundColor: couleur }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-5 text-[#cfe9ec]">{explication}</p>
    </div>
  );
}

export default function SimulateurLagonClient() {
  // La houle du large : de la mer d'huile (0,5 m) à la houle du siècle
  // (10 m, mai 2007).
  const [houle, setHoule] = useState(2);

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

  // La barrière, en 10 morceaux : false = intact (état initial : tout
  // intact, donc les défis « houle × 0,1 » restent vrais).
  const [casses, setCasses] = useState<boolean[]>(() => Array(NB_MORCEAUX).fill(false));
  const basculerMorceau = (i: number) =>
    setCasses((c) => c.map((v, j) => (j === i ? !v : v)));
  const recommencer = () => {
    setCasses(Array(NB_MORCEAUX).fill(false));
    setHoule(2);
  };

  // La barrière casse 90 % × (part intacte) de la hauteur :
  // vague lagon = houle × (1 − 0,9 × part intacte). En entiers (%) pour
  // éviter les 0,0999… : barrière entière → houle × 0,1.
  const intacts = casses.filter((c) => !c).length;
  const nbCasses = NB_MORCEAUX - intacts;
  const pctCasse = 9 * intacts;
  const facteurPct = 100 - pctCasse;
  const vagueLagonCm = houle * facteurPct;
  const vagueLagonM = vagueLagonCm / 100;

  return (
    <div className="min-h-screen bg-[#03181e] text-[#ecfbfa]">
      {/* Manchette du lagon */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#0f4a58] px-5 pb-2.5 pt-3.5">
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.28em]">
          Le lagon dans ta <span className="text-[#5bc8dd]">main</span>
        </h1>
        <span className="font-serif text-sm italic text-[#8fc6cf]">
          L&apos;Ermitage — la muraille vivante qui fabrique la plage
        </span>
        <button
          type="button"
          onClick={basculerModeClasse}
          aria-pressed={modeClasse}
          className={`ml-auto rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider transition ${
            modeClasse
              ? "border-[#5bc8dd] bg-[#5bc8dd] text-[#03181e]"
              : "border-[#5bc8dd]/40 bg-transparent text-[#5bc8dd] hover:bg-[#5bc8dd]/15"
          }`}
        >
          🖥️ MODE CLASSE {modeClasse ? "✓" : ""}
        </button>
        <span className="rounded-sm bg-[#5bc8dd] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#03181e]">
          RÉSERVE MARINE · L&apos;ERMITAGE
        </span>
      </header>

      <main
        className="mx-auto max-w-5xl px-4 py-5 sm:px-6"
        style={modeClasse ? ({ zoom: 1.35 } as React.CSSProperties) : undefined}
      >
        {/* La commande : la houle du large */}
        <div className="rounded border border-[#0f4a58] bg-[#062b33] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8fc6cf]">
              🌊 La houle qui frappe le récif aujourd&apos;hui
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-[#5bc8dd]">
              {fr(houle, 1)} <span className="text-sm font-normal text-[#8fc6cf]">m</span>
            </p>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={houle}
            onChange={(e) => setHoule(+e.target.value)}
            className="mt-3 w-full accent-[#5bc8dd]"
            aria-label="Hauteur de la houle du large, en mètres"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#8fc6cf]/70">
            <span>0,5 — mer d&apos;huile</span>
            <span>10 — mai 2007, la houle du siècle</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-5 text-[#cfe9ec]">
            Sur la crête, la vague de <b className="text-[#ecfbfa]">{fr(houle, 1)} m</b> déferle
            et perd <b className="text-[#ecfbfa]">{nbCasses === 0 ? "~90 %" : `${pctCasse} %`} de sa hauteur</b>
            {nbCasses > 0 ? ` (barrière intacte à ${intacts * 10} %)` : ""} — dans le lagon, il
            reste une vague de <b className="text-[#ecfbfa]">{fr(vagueLagonCm, 1)} cm</b>.
          </p>
        </div>

        {/* LE SCHÉMA VIVANT — la coupe du lagon, qui suit la houle ET la
            barrière que l'élève casse ou répare. */}
        <LagonAnime
          houle={houle}
          casses={casses}
          onBasculer={basculerMorceau}
          onRecommencer={recommencer}
        />

        {/* La chaîne du lagon */}
        <div className="mt-3 space-y-3">
          <Etape
            nom="1 · Le large — la houle arrive"
            explication="L'océan Indien pousse ses vagues contre l'île. En haute mer, rien ne les arrête : la houle porte une énergie énorme — et elle vise la plage."
            quantite={houle}
            unite="m de houle"
            pct={(houle / 10) * 100}
            couleur="#2e7ea6"
          />
          <Etape
            nom="2 · La barrière de corail — la muraille vivante"
            explication={
              "Construite par des milliards de polypes en ~8 000 ans, elle monte jusqu'à la surface. La vague trébuche dessus et déferle : ~90 % de la hauteur des vagues est cassée là, sur la crête — la ligne blanche qu'on voit du ciel." +
              (nbCasses > 0
                ? ` Avec ${nbCasses} ${nbCasses > 1 ? "morceaux cassés" : "morceau cassé"}, elle ne casse plus que 90 % × ${intacts * 10} % = ${pctCasse} %.`
                : "")
            }
            quantite={pctCasse}
            unite="% de la hauteur cassée"
            pct={pctCasse}
            couleur="#ff7a6b"
          />
          <Etape
            nom="3 · Le lagon — l'eau calme, la nurserie"
            explication={
              "Derrière la muraille, ~1,2 m d'eau tranquille. Les bébés poissons y grandissent à l'abri, protégés aussi par la Réserve naturelle marine (3 500 ha depuis 2007)." +
              (nbCasses > 0 ? " Mais par les brèches, la houle entre : la nurserie n'est plus à l'abri." : "")
            }
            quantite={vagueLagonCm}
            unite="cm de vague"
            pct={(vagueLagonM / 10) * 100}
            couleur="#5bc8dd"
          />
          <Etape
            nom="4 · La plage — le sable des poissons-perroquets"
            explication="Le poisson-perroquet croque le corail mort et rejette ~90 kg de sable blanc par an. La plage de l'Ermitage est fabriquée par les poissons — et protégée par le récif."
            quantite={SABLE_PARROT_KG_AN}
            unite="kg de sable/an et par poisson"
            pct={100}
            couleur="#f2d43b"
          />
        </div>

        {/* Les sorties du jour */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded border-2 border-[#5bc8dd] bg-[#062b33] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fc6cf]">🌊 Dans le lagon</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#5bc8dd]">{fr(vagueLagonCm, 1)} cm</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#cfe9ec]">
              de vague quand le large frappe à {fr(houle, 1)} m —{" "}
              {nbCasses > 0 ? "les brèches laissent passer la houle" : "la muraille a bu le reste"}
            </p>
          </div>
          <div className="rounded border-2 border-[#7fb069] bg-[#062b33] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fc6cf]">🐟 La nurserie</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#7fb069]">{fr(RESERVE_HA)} ha</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#cfe9ec]">
              de réserve marine depuis 2007 — ≈ {fr(TERRAINS_RESERVE)} terrains de foot protégés
            </p>
          </div>
          <div className="rounded border-2 border-[#f2d43b] bg-[#062b33] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fc6cf]">🐠 L&apos;usine à sable</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#f2d43b]">{fr(SABLE_PARROT_KG_AN)} kg</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#cfe9ec]">
              de sable blanc par poisson-perroquet et par an — la plage sort (aussi) de leur ventre
            </p>
          </div>
        </div>

        {/* Les maths du lagon, affichées */}
        <div className="mt-4 rounded border border-dashed border-[#5bc8dd]/40 bg-[#062b33] px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-[#5bc8dd]">
          vague lagon = {fr(houle, 1)} m × (1 − 0,9 × {fr(intacts / NB_MORCEAUX, 1)}) = {fr(houle, 1)} m ×{" "}
          {fr(facteurPct / 100, 2)} = <b>{fr(vagueLagonCm, 1)} cm</b>
          <span className="text-[#8fc6cf]"> · </span>
          réserve : 35 000 000 ÷ 7 140 ≈ <b>4 900 terrains</b>
          <span className="text-[#8fc6cf]"> · </span>
          l&apos;âge du corail : t = taille ÷ vitesse
        </div>

        {/* LES DÉFIS — à toi de calculer, le lagon vérifie */}
        <DefisSimulateur
          titre="Les défis du lagon"
          coupDePouce="Coup de pouce : garde la barrière entière (10 morceaux), règle la houle du défi — le lagon vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
          coachHref="/coach/serie?classe=4e&matiere=maths&notion=prop_pourcentages&display=simple"
          coachLabel="Entraîne-toi sur le coach (pourcentages, 4e)"
        />

        {/* Le pont vers l'épisode et le défi */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={lienVideo("https://youtu.be/3bPBjYsRciA")}
            className="inline-flex items-center gap-2 rounded bg-[#5bc8dd] px-4 py-2 text-sm font-bold text-[#03181e] hover:brightness-110"
          >
            ▶ L&apos;épisode « Les requins » — le gardien du récif
          </a>
          <Link
            href="/defis-du-jour"
            className="inline-flex items-center gap-2 rounded border border-[#0f4a58] bg-[#062b33] px-4 py-2 text-sm font-bold text-[#ecfbfa] hover:brightness-125"
          >
            🎯 Le défi du jour
          </Link>
        </div>
      </main>

      {/* Le garde-fou d'honnêteté — et de protection du récif. */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#0f4a58] px-5 py-2.5 text-[11.5px] text-[#8fc6cf]">
        <span>
          Chiffres pédagogiques arrondis — le récif de l&apos;Ermitage a
          ~8 000 ans, la Réserve naturelle marine veille depuis 2007.
          🤿 Dans le lagon : on ne marche JAMAIS sur le corail, on ne touche
          rien, on n&apos;emporte rien — une patate cassée d&apos;un coup de
          palme, c&apos;est des dizaines d&apos;années perdues.
        </span>
        <span className="ml-auto font-mono">
          Un jeu du <b className="font-bold text-[#5bc8dd]">Journal d&apos;EleveAI</b> 🦎
        </span>
      </footer>
    </div>
  );
}
