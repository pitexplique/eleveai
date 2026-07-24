"use client";

// « La salle de sport dans ta main » — l'élève règle SON effort (puissance,
// durée, poids), la machine convertit sous ses yeux : l'énergie mécanique
// (E = P × t), les calories mécaniques, le rendement musculaire ~25 % (le
// corps dépense ~4× ce qu'il produit — le reste part en chaleur), puis les
// équivalents parlants et la récup' par l'ASSIETTE. Les maths sont AFFICHÉES,
// jamais cachées — la règle du journal. Jamais de morale, jamais de discours
// sur l'apparence : on parle énergie, watts, récupération.
//
// Chiffres pédagogiques (ordres de grandeur assumés « environ ») :
//   1 kcal = 4 184 J · une ampoule LED ~10 W · un carré de chocolat ~23 kcal
//   rendement musculaire ~25 % · rameur : 50 W (débutant) → 400 W (sprint)
//   protéines : œuf 6,5 g · verre de lait (250 ml) 8 g · 100 g de lentilles
//   cuites 9 g · 100 g de poisson 20 g · sportif ~1,2 à 1,6 g/kg/j
//   OMS : 60 min d'activité par jour pour les 11-17 ans
//   pont Takamaka : E = m·g·h, g = 9,81, chute de 500 m

import { useEffect, useState } from "react";
import Link from "next/link";
import DefisSimulateur, { type DefiSimulateur } from "@/components/simulateurs/DefisSimulateur";

const KCAL_EN_J = 4184; // 1 kcal = 4 184 J
const LED_W = 10; // une ampoule LED ~10 W
const CHOCOLAT_KCAL = 23; // un carré ~4,2 g ~23 kcal
const FACTEUR_RENDEMENT = 4; // rendement musculaire ~25 % → le corps dépense ~4×
const G = 9.81;
const CHUTE_TAKAMAKA_M = 500;
const PROT_OEUF_G = 6.5; // 1 œuf
const PROT_LAIT_G = 8; // un verre de 250 ml
const PROT_LENTILLES_G = 9; // 100 g cuites
const PROT_POISSON_G = 20; // 100 g
const PROT_SPORTIF_BAS = 1.2; // g/kg/j
const PROT_SPORTIF_HAUT = 1.6; // g/kg/j
const PROT_SEDENTAIRE = 0.8; // g/kg/j

// ── Les défis de la salle (règle du 18/07 : chaque simulateur a les siens) ───
// Les nombres diffèrent des curseurs : la réponse n'est pas à l'écran, mais
// l'élève peut régler la machine pour vérifier — la salle corrige elle-même.
const DEFIS: DefiSimulateur[] = [
  {
    id: "ampoules",
    question:
      "Tu tiens un effort de 120 W sur le rameur. Une ampoule LED consomme 10 W. Combien d'ampoules tu allumes pendant ton effort ?",
    reponse: 12,
    unite: "ampoules",
    indice: "Combien de fois 10 W dans 120 W ?",
    calcul: "120 ÷ 10 = 12 ampoules LED",
  },
  {
    id: "energie",
    question:
      "Tu rames à 200 W pendant 50 secondes. Quelle énergie mécanique tu produis ? (en joules)",
    reponse: 10000,
    unite: "J",
    indice: "Énergie = puissance × temps (des watts × des secondes = des joules).",
    calcul: "E = 200 × 50 = 10 000 J",
  },
  {
    id: "kcal",
    question:
      "Ton compteur affiche 20 920 J d'énergie mécanique. Combien de kcal mécaniques ? (1 kcal = 4 184 J)",
    reponse: 5,
    unite: "kcal",
    indice: "Divise les joules par 4 184.",
    calcul: "20 920 ÷ 4 184 = 5 kcal",
  },
  {
    id: "rendement",
    question:
      "Ton effort a produit 30 kcal mécaniques. Avec le rendement musculaire de 25 %, combien de kcal ton corps a-t-il réellement brûlées ?",
    reponse: 120,
    unite: "kcal",
    indice: "25 % = un quart : le corps dépense 4 fois ce qu'il produit.",
    calcul: "30 × 4 = 120 kcal réellement brûlées",
  },
  {
    id: "proteines",
    question:
      "Une sportive de 60 kg vise 1,2 g de protéines par kilo et par jour. Combien de grammes par jour ?",
    reponse: 72,
    unite: "g",
    indice: "1,2 g pour CHAQUE kilo : c'est une multiplication.",
    calcul: "60 × 1,2 = 72 g de protéines par jour",
  },
  {
    id: "puissance",
    question:
      "Au bout de 10 minutes, ton rameur affiche 120 000 J. Quelle était ta puissance moyenne ? (en W)",
    reponse: 200,
    unite: "W",
    indice: "P = E ÷ t — mais le temps doit être en secondes (10 min = 600 s).",
    calcul: "P = 120 000 ÷ 600 = 200 W",
  },
];

const COULEURS_DEFIS = {
  fond: "#1c1930",
  fondProfond: "#12101d",
  bord: "#2f2a4d",
  accent: "#ffd23f",
  texte: "#f1effa",
  sousTexte: "#a49fc9",
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

// « 90 s » → « 1 min 30 s » : la durée qui se lit.
function dureeTxt(secondes: number): string {
  if (secondes < 60) return `${secondes} s`;
  const min = Math.floor(secondes / 60);
  const reste = secondes % 60;
  return reste === 0 ? `${min} min` : `${min} min ${reste} s`;
}

// ── Le schéma VIVANT de la salle (SVG animé — un schéma, pas une scène) ──────
// Tout bouge : la silhouette rame, le volant vire, la chaleur monte (les ~75 %
// que le muscle ne convertit pas), les watts filent le long du fil et les
// ampoules battent. La cadence suit la puissance réglée.
function SalleAnimee({ puissance }: { puissance: number }) {
  // De 2,6 s (50 W, tranquille) à 0,7 s (400 W, sprint d'athlète).
  const cadence = (2.6 - ((Math.min(puissance, 400) - 50) / 350) * 1.9).toFixed(2) + "s";
  const ampoules = Math.round(puissance / LED_W);
  const nbAllumees = Math.max(1, Math.min(8, Math.round(puissance / 50)));

  return (
    <div className="mt-3 overflow-x-auto rounded border border-[#2f2a4d] bg-[#12101d]">
      <style>{`
        @keyframes nrg-ramer { from { transform: translateX(0); } to { transform: translateX(38px); } }
        @keyframes nrg-tirer { from { transform: translate(121px, 224px) scaleX(1); } to { transform: translate(121px, 224px) scaleX(1.5); } }
        @keyframes nrg-tourner { to { transform: rotate(360deg); } }
        @keyframes nrg-flux { to { stroke-dashoffset: -28; } }
        @keyframes nrg-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        .e-corps { animation: nrg-ramer var(--cadence) ease-in-out infinite alternate; }
        .e-corde { animation: nrg-tirer var(--cadence) ease-in-out infinite alternate; }
        .e-roue { animation: nrg-tourner calc(var(--cadence) * 1.2) linear infinite; transform-origin: center; transform-box: fill-box; }
        .e-flux { stroke-dasharray: 10 18; animation: nrg-flux var(--cadence) linear infinite; }
        .e-ampoule { animation: nrg-pulse var(--cadence) ease-in-out infinite; }
        .e-chaleur { animation: nrg-pulse calc(var(--cadence) * 1.4) ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .e-corps, .e-corde, .e-roue, .e-flux, .e-ampoule, .e-chaleur { animation-duration: 12s; }
        }
      `}</style>
      <svg
        viewBox="0 0 820 340"
        style={{ ["--cadence" as string]: cadence }}
        className="mx-auto block min-w-[640px] max-w-[900px]"
        aria-label="Schéma animé de la salle : la silhouette rame, le volant tourne, une partie de l'énergie part en chaleur — et la puissance de l'effort allume des ampoules LED"
      >
        {/* La salle : toi et la machine */}
        <text x="30" y="26" fill="#ff6b6b" fontSize="12" fontWeight="700" fontFamily="monospace">LA SALLE · TES MUSCLES POUSSENT LA MACHINE</text>

        {/* La chaleur : les ~75 % que le muscle ne convertit pas en mouvement */}
        <text x="278" y="112" fill="#ff9d5c" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">LA CHALEUR (~75 %)</text>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${252 + i * 26},168 q6,-10 0,-20 q-6,-10 0,-20`}
            fill="none"
            stroke="#ff9d5c"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="e-chaleur"
            style={{ animationDelay: `calc(var(--cadence) * ${i * 0.3})` }}
          />
        ))}

        {/* Le rail du rameur */}
        <line x1="120" y1="262" x2="330" y2="262" stroke="#4a4477" strokeWidth="5" strokeLinecap="round" />

        {/* Le volant d'inertie : la roue que ton effort fait virer */}
        <circle cx="95" cy="232" r="26" fill="#12101d" stroke="#ffd23f" strokeWidth="3" />
        <g className="e-roue">
          <path d="M95,210 L95,254 M73,232 L117,232 M80,217 L110,247 M110,217 L80,247" stroke="#ffd23f" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        <text x="95" y="290" fill="#ffd23f" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">LE VOLANT</text>

        {/* La corde : elle s'étire quand la silhouette tire (même cadence) */}
        <g className="e-corde">
          <line x1="0" y1="0" x2="76" y2="0" stroke="#a49fc9" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* La silhouette : toi — elle va et vient au rythme de ta puissance */}
        <g className="e-corps">
          <rect x="206" y="250" width="34" height="8" rx="3" fill="#4a4477" />
          <path d="M223,250 L243,204" fill="none" stroke="#ff6b6b" strokeWidth="5" strokeLinecap="round" />
          <circle cx="248" cy="192" r="10" fill="#ff6b6b" />
          <path d="M240,208 L199,224" fill="none" stroke="#ff6b6b" strokeWidth="5" strokeLinecap="round" />
          <path d="M223,250 L189,226 L159,254" fill="none" stroke="#ff6b6b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="193" y="216" width="7" height="16" rx="2" fill="#a49fc9" />
        </g>
        <text x="228" y="290" fill="#ff6b6b" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">TOI · {fr(puissance)} W</text>

        {/* Les watts filent : le fil de l'énergie mécanique */}
        <path d="M95,258 C180,306 330,312 450,296 C540,284 592,220 610,156" fill="none" stroke="#ffd23f" strokeWidth="2.5" strokeDasharray="4 5" className="e-flux" />
        <text x="430" y="330" fill="#ffd23f" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">TES WATTS FILENT →</text>

        {/* Les ampoules LED : la puissance de ton effort, en lumière */}
        <text x="612" y="44" fill="#ffd23f" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="monospace">CE QUE TON EFFORT ALLUME</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const cx = 465 + i * 42;
          const allumee = i < nbAllumees;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={100}
                r={13}
                fill={allumee ? "#ffd23f" : "#1c1930"}
                stroke={allumee ? "#ffd23f" : "#4a4477"}
                strokeWidth="2"
                className={allumee ? "e-ampoule" : undefined}
                style={allumee ? { animationDelay: `calc(var(--cadence) * ${i * 0.12})` } : undefined}
              />
              <path d={`M${cx - 5},117 h10 M${cx - 4},123 h8`} stroke="#a49fc9" strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        })}
        <text x="612" y="152" fill="#a49fc9" fontSize="10.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">≈ {fr(ampoules)} AMPOULES LED · 10 W CHACUNE</text>
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
  pct: number; // largeur de la barre, en % du flux
  couleur: string;
}) {
  return (
    <div className="rounded border border-[#2f2a4d] bg-[#1c1930] px-3 py-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#a49fc9]">
          {nom}
        </p>
        <p className="font-mono text-sm font-bold tabular-nums text-[#f1effa]">
          {fr(quantite, quantite < 100 ? 1 : 0)} <span className="text-[11px] font-normal text-[#a49fc9]">{unite}</span>
        </p>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#12101d]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: Math.max(2, Math.min(100, pct)) + "%", backgroundColor: couleur }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-5 text-[#d6d2ea]">{explication}</p>
    </div>
  );
}

export default function SimulateurEnergieClient() {
  // Ton effort : la puissance (50 W débutant → 400 W sprint d'athlète),
  // la durée (10 s → 10 min) et ton poids (il ne sert qu'à la récup').
  const [puissance, setPuissance] = useState(150);
  const [duree, setDuree] = useState(120);
  const [poids, setPoids] = useState(50);

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

  // La chaîne de l'énergie, pas à pas.
  const energieJ = puissance * duree; // E = P × t
  const kcalMeca = energieJ / KCAL_EN_J;
  const kcalBrulees = kcalMeca * FACTEUR_RENDEMENT; // rendement ~25 % → ×4
  // Une décimale sous 100, pour que les calculs affichés restent cohérents
  // (4,3 × 4 = 17,2 — jamais « 4,3 × 4 = 17 »). Et l'opération affichée porte
  // « ≈ » : le produit des nombres ARRONDIS ne retombe pas sur le résultat
  // exact (3,6 × 4 = 14,4 alors que le calcul précis donne 14,3) — dans un
  // journal de maths, on n'écrit jamais une égalité fausse.
  const kcalMecaTxt = fr(kcalMeca, kcalMeca < 100 ? 1 : 0);
  const kcalBruleesTxt = fr(kcalBrulees, kcalBrulees < 100 ? 1 : 0);
  const ampoules = Math.round(puissance / LED_W);
  const carres = kcalBrulees / CHOCOLAT_KCAL;
  const litresTakamaka = energieJ / (G * CHUTE_TAKAMAKA_M); // E = m·g·h → m
  const omsKcal = ((puissance * 3600) / KCAL_EN_J) * FACTEUR_RENDEMENT; // 60 min à ta puissance

  // La récup' : les protéines de l'assiette, selon TON poids.
  const protBas = poids * PROT_SPORTIF_BAS;
  const protHaut = poids * PROT_SPORTIF_HAUT;
  const protSedentaire = poids * PROT_SEDENTAIRE;
  const oeufs = protBas / PROT_OEUF_G;
  const verresLait = protBas / PROT_LAIT_G;
  const lentillesG = (protBas / PROT_LENTILLES_G) * 100;
  const poissonG = (protBas / PROT_POISSON_G) * 100;

  return (
    <div className="min-h-screen bg-[#12101d] text-[#f1effa]">
      {/* Manchette de la salle */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#2f2a4d] px-5 pb-2.5 pt-3.5">
        {/* Le nom, tranché avec Frédéric (24/07) : pas « la salle de sport dans
            ta main » (la famille s'appelle déjà « les machines dans ta main »)
            mais LE MESSAGE — le pendant humain du barrage de Takamaka : là-bas
            c'est l'eau qui tombe et l'île s'allume, ici ce sont tes jambes. */}
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.28em]">
          La centrale, c&apos;est <span className="text-[#ffd23f]">toi</span>
        </h1>
        <span className="font-serif text-sm italic text-[#a49fc9]">
          la salle de sport dans ta main
        </span>
        <button
          type="button"
          onClick={basculerModeClasse}
          aria-pressed={modeClasse}
          className={`ml-auto rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider transition ${
            modeClasse
              ? "border-[#ffd23f] bg-[#ffd23f] text-[#12101d]"
              : "border-[#ffd23f]/40 bg-transparent text-[#ffd23f] hover:bg-[#ffd23f]/15"
          }`}
        >
          🖥️ MODE CLASSE {modeClasse ? "✓" : ""}
        </button>
        <span className="rounded-sm bg-[#ffd23f] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#12101d]">
          SAINT-PIERRE
        </span>
      </header>

      <main
        className="mx-auto max-w-5xl px-4 py-5 sm:px-6"
        style={modeClasse ? ({ zoom: 1.35 } as React.CSSProperties) : undefined}
      >
        {/* Les commandes : ton effort, à toi */}
        <div className="rounded border border-[#2f2a4d] bg-[#1c1930] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#a49fc9]">
              🚣 Ta puissance — ce que tes muscles poussent
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-[#ffd23f]">
              {fr(puissance)} <span className="text-sm font-normal text-[#a49fc9]">W</span>
            </p>
          </div>
          <input
            type="range"
            min={50}
            max={400}
            step={10}
            value={puissance}
            onChange={(e) => setPuissance(+e.target.value)}
            className="mt-3 w-full accent-[#ffd23f]"
            aria-label="Puissance de ton effort, en watts"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#a49fc9]/70">
            <span>50 — débutant tranquille</span>
            <span>400 — athlète en sprint</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-5 text-[#d6d2ea]">
            Repère : sur un rameur, tenir <b className="text-[#f1effa]">250 W</b>, c&apos;est
            déjà un très bon effort. Et un watt, c&apos;est un joule donné{" "}
            <b className="text-[#f1effa]">chaque seconde</b>.
          </p>

          <div className="mt-3 border-t border-[#2f2a4d] pt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#a49fc9]">
                ⏱️ Ta durée d&apos;effort
              </p>
              <p className="font-mono text-2xl font-bold tabular-nums text-[#ff6b6b]">
                {dureeTxt(duree)}
              </p>
            </div>
            <input
              type="range"
              min={10}
              max={600}
              step={10}
              value={duree}
              onChange={(e) => setDuree(+e.target.value)}
              className="mt-3 w-full accent-[#ff6b6b]"
              aria-label="Durée de ton effort, en secondes"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#a49fc9]/70">
              <span>10 s — un sprint éclair</span>
              <span>10 min — une vraie séance</span>
            </div>
          </div>

          <div className="mt-3 border-t border-[#2f2a4d] pt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#a49fc9]">
                🧍 Ton poids — juste pour la récup&apos;
              </p>
              <p className="font-mono text-2xl font-bold tabular-nums text-[#7fb069]">
                {fr(poids)} <span className="text-sm font-normal text-[#a49fc9]">kg</span>
              </p>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              step={1}
              value={poids}
              onChange={(e) => setPoids(+e.target.value)}
              className="mt-3 w-full accent-[#7fb069]"
              aria-label="Ton poids, en kilogrammes — il sert à calculer la récupération"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#a49fc9]/70">
              <span>30 kg</span>
              <span>100 kg</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-5 text-[#d6d2ea]">
              Il ne change rien à ton énergie ici — il sert{" "}
              <b className="text-[#f1effa]">uniquement</b> à calculer les protéines de la
              récup&apos;, en bas de page.
            </p>
          </div>
        </div>

        {/* LE SCHÉMA VIVANT — la salle animée, qui accélère avec la puissance. */}
        <SalleAnimee puissance={puissance} />

        {/* La chaîne de l'énergie */}
        <div className="mt-3 space-y-3">
          <Etape
            nom="1 · L'effort — tes muscles poussent"
            explication={`Puissance = énergie ÷ temps. Tenir ${fr(puissance)} W pendant ${dureeTxt(duree)}, c'est donner ${fr(puissance)} joules à la machine chaque seconde — comme une centrale règle sa production.`}
            quantite={puissance}
            unite="W tenus"
            pct={(puissance / 400) * 100}
            couleur="#ff6b6b"
          />
          <Etape
            nom="2 · L'énergie mécanique — ce que la machine reçoit"
            explication={`E = P × t = ${fr(puissance)} × ${fr(duree)} = ${fr(energieJ)} joules. En calories mécaniques : ${fr(energieJ)} ÷ 4 184 = ${kcalMecaTxt} kcal.`}
            quantite={energieJ}
            unite="J produits"
            pct={(energieJ / 240000) * 100}
            couleur="#ffd23f"
          />
          <Etape
            nom="3 · Le moteur musculaire — rendement ~25 %"
            explication={`Tes muscles convertissent environ un quart de l'énergie dépensée en mouvement — le reste part en chaleur (c'est pour ça que tu as chaud). Le corps brûle donc ~4 fois les calories mécaniques : ${kcalMecaTxt} × 4 ≈ ${kcalBruleesTxt} kcal.`}
            quantite={kcalBrulees}
            unite="kcal réellement brûlées"
            pct={(energieJ / 240000) * 100}
            couleur="#ff9d5c"
          />
          <Etape
            nom="4 · La récup' — l'assiette répare le muscle"
            explication={`Après l'effort, le muscle se reconstruit avec les protéines de l'assiette : pour un sportif, environ 1,2 à 1,6 g par kilo et par jour. Le détail — œufs, lait, lentilles, poisson — est en bas de page.`}
            quantite={Math.round(protBas)}
            unite="g de protéines / jour (au moins)"
            pct={poids}
            couleur="#7fb069"
          />
        </div>

        {/* Les sorties de ta séance */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded border-2 border-[#ffd23f] bg-[#1c1930] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">⚡ Énergie mécanique</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ffd23f]">{fr(energieJ)} J</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              soit {kcalMecaTxt} kcal mécaniques (1 kcal = 4 184 J)
            </p>
          </div>
          <div className="rounded border-2 border-[#ff9d5c] bg-[#1c1930] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">🔥 Réellement brûlées</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ff9d5c]">{kcalBruleesTxt} kcal</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              ×4, à cause du rendement musculaire de ~25 % — le reste a chauffé
            </p>
          </div>
        </div>

        {/* Les équivalents parlants */}
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded border-2 border-[#ffd23f] bg-[#1c1930] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">💡 Pendant ton effort</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ffd23f]">{fr(ampoules)} ampoules</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              des LED de 10 W, allumées en continu tant que tu tiens {fr(puissance)} W
            </p>
          </div>
          <div className="rounded border-2 border-[#ff6b6b] bg-[#1c1930] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">🍫 En chocolat</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ff6b6b]">
              {fr(carres, carres < 10 ? 1 : 0)} {carres >= 2 ? "carrés" : "carré"}
            </p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              {kcalBruleesTxt} kcal brûlées ÷ 23 kcal le carré (~4,2 g)
            </p>
          </div>
          <div className="rounded border-2 border-[#7fb069] bg-[#1c1930] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">💧 Comme à Takamaka</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#7fb069]">
              {fr(litresTakamaka, litresTakamaka < 10 ? 1 : 0)} L
            </p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              d&apos;eau que ton énergie hisserait en haut de la chute de 500 m (E = m × g × h)
            </p>
          </div>
        </div>

        {/* Les maths de la salle, affichées */}
        <div className="mt-4 rounded border border-dashed border-[#ffd23f]/40 bg-[#1c1930] px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-[#ffd23f]">
          E = {fr(puissance)} W × {fr(duree)} s = <b>{fr(energieJ)} J</b>
          <span className="text-[#a49fc9]"> · </span>
          (à l&apos;envers : P = E ÷ t = {fr(energieJ)} ÷ {fr(duree)} = {fr(puissance)} W)
          <span className="text-[#a49fc9]"> · </span>
          kcal méca = {fr(energieJ)} ÷ 4 184 = <b>{kcalMecaTxt}</b>
          <span className="text-[#a49fc9]"> · </span>
          brûlées = {kcalMecaTxt} × 4 ≈ <b>{kcalBruleesTxt} kcal</b>
          <span className="text-[#a49fc9]"> · </span>
          eau de Takamaka = {fr(energieJ)} ÷ (9,81 × 500) = <b>{fr(litresTakamaka, litresTakamaka < 10 ? 1 : 0)} L</b>
        </div>

        {/* L'encart des 11-17 ans : la centrale s'entretient en tournant */}
        <div className="mt-4 rounded border-2 border-[#ff6b6b] bg-[#1c1930] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff6b6b]">
            🫀 Le mot aux 11-17 ans — ta centrale aime tourner
          </p>
          <p className="mt-2 text-[13px] leading-6 text-[#d6d2ea]">
            L&apos;OMS recommande <b className="text-[#f1effa]">60 minutes d&apos;activité physique
            par jour</b> aux 11-17 ans — et dans le monde, <b className="text-[#f1effa]">plus de
            8 ados sur 10</b> n&apos;atteignent pas ce seuil. Pas par paresse : personne ne leur
            a montré la centrale. Si tu tenais ta puissance réglée ({fr(puissance)} W) pendant
            ces 60 minutes, tu brûlerais <b className="text-[#ffd23f]">{fr(omsKcal)} kcal</b> —
            et pas besoin d&apos;un rameur : marcher vite, danser, nager, jouer au foot,
            tout fait tourner la machine.
          </p>
        </div>

        {/* LA RÉCUP' — l'assiette qui répare le muscle */}
        <div className="mt-4 rounded border-2 border-[#7fb069] bg-[#1c1930] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#7fb069]">
              🍽️ La récup&apos; — l&apos;assiette répare le muscle
            </p>
            <p className="font-mono text-sm font-bold tabular-nums text-[#7fb069]">
              {fr(protBas)} à {fr(protHaut)} g <span className="text-[11px] font-normal text-[#a49fc9]">de protéines / jour</span>
            </p>
          </div>
          <p className="mt-2 text-[13px] leading-6 text-[#d6d2ea]">
            L&apos;effort abîme un peu le muscle — c&apos;est normal, c&apos;est comme ça
            qu&apos;il se renforce. Pour le réparer, il lui faut des{" "}
            <b className="text-[#f1effa]">protéines</b> : un sportif en vise environ{" "}
            <b className="text-[#f1effa]">1,2 à 1,6 g par kilo et par jour</b> — pour tes{" "}
            {fr(poids)} kg, entre <b className="text-[#7fb069]">{fr(protBas)}</b> et{" "}
            <b className="text-[#7fb069]">{fr(protHaut)} g</b> (une personne sédentaire :
            ~0,8 g/kg, soit {fr(protSedentaire)} g). Et tout est déjà dans l&apos;assiette.
          </p>
          <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#a49fc9]">
            Si tu ne comptais que sur UN aliment (personne ne fait ça — on additionne) :
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded border border-[#2f2a4d] bg-[#12101d] p-3 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">🥚 Œufs</p>
              <p className="mt-1 font-mono text-xl font-bold tabular-nums text-[#f1effa]">≈ {fr(oeufs)}</p>
              <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">à 6,5 g de protéines l&apos;œuf</p>
            </div>
            <div className="rounded border border-[#2f2a4d] bg-[#12101d] p-3 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">🥛 Verres de lait</p>
              <p className="mt-1 font-mono text-xl font-bold tabular-nums text-[#f1effa]">≈ {fr(verresLait, verresLait < 10 ? 1 : 0)}</p>
              <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">à 8 g le verre de 250 ml</p>
            </div>
            <div className="rounded border border-[#2f2a4d] bg-[#12101d] p-3 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">🍲 Lentilles cuites</p>
              <p className="mt-1 font-mono text-xl font-bold tabular-nums text-[#f1effa]">≈ {fr(lentillesG)} g</p>
              <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">à 9 g de protéines les 100 g</p>
            </div>
            <div className="rounded border border-[#2f2a4d] bg-[#12101d] p-3 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">🐟 Poisson</p>
              <p className="mt-1 font-mono text-xl font-bold tabular-nums text-[#f1effa]">≈ {fr(poissonG)} g</p>
              <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">à 20 g de protéines les 100 g</p>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-5 text-[#d6d2ea]">
            (Les nombres ci-dessus couvrent le bas de ta fourchette, {fr(protBas)} g.) En vrai,
            on mélange : 2 œufs (13 g) + un verre de lait (8 g) + 200 g de lentilles (18 g) +
            100 g de poisson (20 g) = <b className="text-[#7fb069]">59 g</b> — une addition,
            pas une corvée.
          </p>
        </div>

        {/* LES DÉFIS — à toi de calculer, la salle vérifie */}
        <DefisSimulateur
          titre="Les défis de la salle"
          coupDePouce="Coup de pouce : règle les curseurs du défi — la machine vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* Le pont vers la machine jumelle et le défi du jour */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/simulateur-barrage"
            className="inline-flex items-center gap-2 rounded bg-[#ffd23f] px-4 py-2 text-sm font-bold text-[#12101d] hover:brightness-110"
          >
            💧 Le barrage dans ta main — la même énergie, côté rivière
          </Link>
          <Link
            href="/defis-du-jour"
            className="inline-flex items-center gap-2 rounded border border-[#2f2a4d] bg-[#1c1930] px-4 py-2 text-sm font-bold text-[#f1effa] hover:brightness-125"
          >
            🎯 Le défi du jour
          </Link>
        </div>
      </main>

      {/* Le garde-fou d'honnêteté */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#2f2a4d] px-5 py-2.5 text-[11.5px] text-[#a49fc9]">
        <span>
          Chiffres pédagogiques arrondis — les vrais chiffres varient d&apos;une personne à
          l&apos;autre, et le rendement musculaire de ~25 % est un ordre de grandeur, pas une
          mesure. Ici on parle d&apos;énergie et de récupération, jamais d&apos;apparence :
          une centrale s&apos;entretient, elle ne se juge pas. Né d&apos;une rencontre avec le
          coach principal d&apos;une salle de sport de Saint-Pierre.
        </span>
        <span className="ml-auto font-mono">
          Un jeu du <b className="font-bold text-[#ffd23f]">Journal d&apos;EleveAI</b> 🦎
        </span>
      </footer>
    </div>
  );
}
