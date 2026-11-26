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
import { lienVideo } from "@/lib/videos/lienVideo";
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
    <div className="mt-2 overflow-x-auto rounded border border-[#2f2a4d] bg-[#12101d]">
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
        className="mx-auto block h-[235px] min-w-[620px] max-w-[820px]"
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

// ── LA MAISON À ALIMENTER (26/11 : « il faut que les élèves cliquent ») ─────
// L'élève clique sur les appareils pour les allumer : la puissance demandée
// s'additionne sous ses yeux, et on la compare à SA puissance sur le rameur.
// Puis : combien de temps pédaler pour fournir l'énergie de X minutes
// d'appareils ? temps = énergie ÷ ta puissance. La bouilloire (2 000 W) montre
// qu'un humain seul n'y arrive pas : l'effet « waouh ».
const APPAREILS = [
  { id: "led", nom: "Ampoule LED", watts: 10 },
  { id: "chargeur", nom: "Chargeur", watts: 5 },
  { id: "ventilo", nom: "Ventilateur", watts: 40 },
  { id: "tele", nom: "Télé", watts: 100 },
  { id: "console", nom: "Console", watts: 150 },
  { id: "bouilloire", nom: "Bouilloire", watts: 2000 },
] as const;
type IdAppareil = (typeof APPAREILS)[number]["id"];

const CASE_L = 130; // largeur d'une case d'appareil (unités SVG)
const CASE_H = 200; // hauteur d'une case
const DUREES_MIN = [1, 10, 60]; // « pendant combien de temps ? »

// Une durée longue qui se lit : « 2 h 21 min », « 7 min 20 s ».
// `exacte` dit si l'écriture est égale à la valeur (sinon on affiche « ≈ »).
function dureeLongue(secondes: number): { txt: string; exacte: boolean } {
  const s = Math.round(secondes);
  let exacte = Number.isInteger(secondes);
  if (secondes < 59.5) return { txt: `${fr(secondes, secondes < 10 ? 1 : 0)} s`, exacte };
  if (s < 3600) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return { txt: r === 0 ? `${m} min` : `${m} min ${r} s`, exacte };
  }
  let h = Math.floor(s / 3600);
  let m = Math.round((s % 3600) / 60);
  if (s % 60 !== 0) exacte = false;
  if (m === 60) {
    h += 1;
    m = 0;
  }
  return { txt: m === 0 ? `${h} h` : `${h} h ${m} min`, exacte };
}

// Le dessin d'un appareil, dans sa case (0 → 130 × 0 → 200), allumé ou non.
function DessinAppareil({ id, allume }: { id: IdAppareil; allume: boolean }) {
  const trait = allume ? "#ffd23f" : "#6b6596";
  const sombre = "#12101d";
  switch (id) {
    case "led":
      return (
        <g>
          {allume &&
            [0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1={65 + Math.cos((a * Math.PI) / 180) * 33}
                y1={70 + Math.sin((a * Math.PI) / 180) * 33}
                x2={65 + Math.cos((a * Math.PI) / 180) * 42}
                y2={70 + Math.sin((a * Math.PI) / 180) * 42}
                stroke="#ffd23f"
                strokeWidth="3"
                strokeLinecap="round"
                className="e-rayon"
              />
            ))}
          <circle cx="65" cy="70" r="25" fill={allume ? "#ffd23f" : "#1c1930"} stroke={trait} strokeWidth="3" />
          <rect x="53" y="96" width="24" height="9" rx="2" fill="#a49fc9" />
          <rect x="56" y="107" width="18" height="7" rx="2" fill="#6b6596" />
        </g>
      );
    case "chargeur":
      return (
        <g>
          <path d="M60,112 C60,128 92,128 98,118" fill="none" stroke="#a49fc9" strokeWidth="3" strokeLinecap="round" />
          <rect x="92" y="104" width="16" height="16" rx="3" fill="#a49fc9" />
          <rect x="38" y="38" width="44" height="76" rx="7" fill={sombre} stroke={trait} strokeWidth="3" />
          <rect x="43" y="46" width="34" height="58" rx="3" fill={allume ? "#7fb069" : "#1c1930"} />
          <path d="M63,58 L54,76 L62,76 L57,92 L68,71 L60,71 Z" fill={allume ? "#12101d" : "#4a4477"} />
        </g>
      );
    case "ventilo":
      return (
        <g>
          <line x1="65" y1="98" x2="65" y2="124" stroke="#a49fc9" strokeWidth="5" strokeLinecap="round" />
          <rect x="44" y="122" width="42" height="7" rx="3" fill="#a49fc9" />
          <circle cx="65" cy="66" r="33" fill={sombre} stroke={trait} strokeWidth="3" />
          <g className={allume ? "e-helice" : undefined}>
            <circle cx="65" cy="66" r="29" fill="none" />
            {[0, 120, 240].map((a) => (
              <ellipse
                key={a}
                cx="65"
                cy="50"
                rx="8"
                ry="15"
                fill={allume ? "#4cc9f0" : "#4a4477"}
                transform={`rotate(${a} 65 66)`}
              />
            ))}
          </g>
          <circle cx="65" cy="66" r="5" fill={trait} />
        </g>
      );
    case "tele":
      return (
        <g>
          <path d="M55,100 L48,120 M75,100 L82,120" stroke="#a49fc9" strokeWidth="4" strokeLinecap="round" />
          <line x1="40" y1="121" x2="90" y2="121" stroke="#a49fc9" strokeWidth="4" strokeLinecap="round" />
          <rect x="18" y="38" width="94" height="62" rx="5" fill={sombre} stroke={trait} strokeWidth="3" />
          <rect x="24" y="44" width="82" height="50" rx="2" fill={allume ? "#4cc9f0" : "#1c1930"} />
          {allume && (
            <g>
              <circle cx="88" cy="56" r="7" fill="#ffd23f" />
              <path d="M24,94 L50,64 L66,80 L78,70 L106,94 Z" fill="#7fb069" />
            </g>
          )}
        </g>
      );
    case "console":
      return (
        <g>
          <path d="M65,52 C65,40 80,40 80,30" fill="none" stroke="#a49fc9" strokeWidth="3" strokeLinecap="round" />
          <rect x="22" y="56" width="86" height="42" rx="21" fill={sombre} stroke={trait} strokeWidth="3" />
          <path d="M38,77 h16 M46,69 v16" stroke={allume ? "#f1effa" : "#4a4477"} strokeWidth="5" strokeLinecap="round" />
          <circle cx="84" cy="70" r="5" fill={allume ? "#ff6b6b" : "#4a4477"} />
          <circle cx="94" cy="80" r="5" fill={allume ? "#7fb069" : "#4a4477"} />
          <circle cx="76" cy="84" r="5" fill={allume ? "#4cc9f0" : "#4a4477"} />
          <circle cx="65" cy="64" r="3" fill={allume ? "#ffd23f" : "#4a4477"} />
        </g>
      );
    case "bouilloire":
      return (
        <g>
          {allume &&
            [0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${24 + i * 9},46 q6,-8 0,-16 q-6,-8 0,-16`}
                fill="none"
                stroke="#f1effa"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="e-vapeur"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          <path d="M44,70 L26,56" stroke={trait} strokeWidth="6" strokeLinecap="round" />
          <path d="M86,62 Q108,72 90,104" fill="none" stroke={trait} strokeWidth="6" strokeLinecap="round" />
          <path d="M40,118 L46,56 Q65,44 84,56 L90,118 Z" fill={allume ? "#ff6b6b" : sombre} stroke={trait} strokeWidth="3" strokeLinejoin="round" />
          <rect x="32" y="118" width="66" height="8" rx="3" fill="#a49fc9" />
          <circle cx="65" cy="100" r="4" fill={allume ? "#ffd23f" : "#4a4477"} />
        </g>
      );
  }
}

function MaisonCliquable({
  puissance,
  setPuissance,
}: {
  puissance: number;
  setPuissance: (p: number) => void;
}) {
  const [allumes, setAllumes] = useState<boolean[]>(() => APPAREILS.map(() => false));
  const [minutes, setMinutes] = useState(10);
  const [etincelle, setEtincelle] = useState<{ x: number; y: number; n: number } | null>(null);
  // 6 cases sur une ligne à l'ordinateur, 3 × 2 sur téléphone (lisible au doigt).
  const [colonnes, setColonnes] = useState(6);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const maj = () => setColonnes(mq.matches ? 3 : 6);
    maj();
    mq.addEventListener("change", maj);
    return () => mq.removeEventListener("change", maj);
  }, []);
  const lignes = Math.ceil(APPAREILS.length / colonnes);
  const largeur = colonnes * CASE_L;
  const hauteur = lignes * CASE_H;

  const basculer = (i: number) =>
    setAllumes((a) => a.map((v, j) => (j === i ? !v : v)));

  const surClic = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    const col = Math.floor(pt.x / CASE_L);
    const ligne = Math.floor(pt.y / CASE_H);
    if (col < 0 || col >= colonnes || ligne < 0) return;
    const i = ligne * colonnes + col;
    if (i >= APPAREILS.length) return;
    basculer(i);
    setEtincelle((p) => ({ x: pt.x, y: pt.y, n: (p?.n ?? 0) + 1 }));
  };

  const recommencer = () => {
    setAllumes(APPAREILS.map(() => false));
    setMinutes(10);
    setEtincelle(null);
  };

  const allumesListe = APPAREILS.filter((_, i) => allumes[i]);
  const demande = allumesListe.reduce((s, a) => s + a.watts, 0);
  const suffit = demande > 0 && demande <= puissance;
  const bouilloire = allumes[APPAREILS.findIndex((a) => a.id === "bouilloire")];
  const personnes = Math.ceil(demande / puissance);

  // L'énergie des appareils, puis le temps de rameur : t = E ÷ P.
  const tAppareils = minutes * 60; // en secondes
  const energie = demande * tAppareils; // J
  const tPedaler = energie / puissance; // s
  const tPedalerTxt = dureeLongue(tPedaler);
  const sommeTxt =
    allumesListe.length === 0
      ? "0 W"
      : allumesListe.length === 1
        ? `${fr(demande)} W`
        : `${allumesListe.map((a) => `${fr(a.watts)} W`).join(" + ")} = ${fr(demande)} W`;
  const echelle = Math.max(demande, puissance, 1);

  return (
    <div className="mt-2 rounded border-2 border-[#ffd23f] bg-[#1c1930] p-3">
      <style>{`
        @keyframes nrg-helice { to { transform: rotate(360deg); } }
        @keyframes nrg-clic { from { transform: scale(.3); opacity: 1; } to { transform: scale(2.2); opacity: 0; } }
        @keyframes nrg-allume { from { transform: scale(.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes nrg-battre { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
        .e-rayon { animation: nrg-battre 1.2s ease-in-out infinite; }
        .e-vapeur { animation: nrg-battre 1.4s ease-in-out infinite; }
        .e-helice { animation: nrg-helice .6s linear infinite; transform-origin: center; transform-box: fill-box; }
        .e-clic { animation: nrg-clic .5s ease-out forwards; transform-origin: center; transform-box: fill-box; pointer-events: none; }
        .e-halo { animation: nrg-allume .35s ease-out; transform-origin: center; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .e-helice, .e-rayon, .e-vapeur { animation-duration: 6s; }
          .e-halo { animation: none; }
          .e-clic { animation-duration: .01s; }
        }
      `}</style>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffd23f]">
          🏠 Ton effort peut-il alimenter la maison ?
        </p>
        <button
          type="button"
          onClick={recommencer}
          className="rounded border border-[#ffd23f]/50 px-3 py-1.5 font-mono text-xs font-bold text-[#ffd23f] hover:bg-[#ffd23f]/15"
        >
          ↺ Recommencer
        </button>
      </div>
      <p className="mt-1 text-[14px] font-bold leading-5 text-[#f1effa]">
        👆 Clique sur les appareils pour les allumer ou les éteindre.
      </p>

      <svg
        viewBox={`0 0 ${largeur} ${hauteur}`}
        onPointerDown={surClic}
        className="mx-auto mt-2 block w-full max-w-[820px] cursor-pointer select-none"
        style={{ touchAction: "manipulation" }}
        aria-label="Les appareils de la maison : clique sur un appareil pour l'allumer ou l'éteindre"
      >
        {APPAREILS.map((a, i) => {
          const x = (i % colonnes) * CASE_L;
          const y = Math.floor(i / colonnes) * CASE_H;
          const on = allumes[i];
          return (
            <g
              key={a.id}
              transform={`translate(${x} ${y})`}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${a.nom}, ${fr(a.watts)} W, ${on ? "allumé" : "éteint"}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  basculer(i);
                }
              }}
            >
              <rect
                x="5"
                y="5"
                width={CASE_L - 10}
                height={CASE_H - 10}
                rx="12"
                fill={on ? "#2a2444" : "#12101d"}
                stroke={on ? "#ffd23f" : "#2f2a4d"}
                strokeWidth={on ? 3 : 2}
              />
              {on && <circle key="halo" cx="65" cy="78" r="52" fill="#ffd23f" opacity="0.14" className="e-halo" />}
              <DessinAppareil id={a.id} allume={on} />
              <text x="65" y="156" fill="#f1effa" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="monospace">
                {a.nom}
              </text>
              <text x="65" y="179" fill={on ? "#ffd23f" : "#a49fc9"} fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="monospace">
                {fr(a.watts)} W {on ? "· ON" : ""}
              </text>
            </g>
          );
        })}
        {etincelle && (
          <circle
            key={etincelle.n}
            cx={etincelle.x}
            cy={etincelle.y}
            r="16"
            fill="none"
            stroke="#ffd23f"
            strokeWidth="4"
            className="e-clic"
          />
        )}
      </svg>

      {/* La ligne de calcul : ce que la maison demande */}
      <div className="mt-2 rounded border border-dashed border-[#ffd23f]/40 bg-[#12101d] px-3 py-2 font-mono text-[13px] leading-6 text-[#ffd23f]">
        Puissance demandée : <b>{sommeTxt}</b>
        {allumesListe.length === 0 && (
          <span className="text-[#a49fc9]"> (rien n&apos;est allumé)</span>
        )}
      </div>

      {/* Toi contre la maison : les deux barres */}
      <div className="mt-2 grid gap-1.5">
        <div className="flex items-center gap-2">
          <span className="w-[92px] shrink-0 font-mono text-[11px] font-bold text-[#ff6b6b]">TOI</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#12101d]">
            <div className="h-full rounded-full bg-[#ff6b6b] transition-all duration-500" style={{ width: (puissance / echelle) * 100 + "%" }} />
          </div>
          <span className="w-[72px] shrink-0 text-right font-mono text-[12px] font-bold tabular-nums text-[#f1effa]">{fr(puissance)} W</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-[92px] shrink-0 font-mono text-[11px] font-bold text-[#ffd23f]">LA MAISON</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#12101d]">
            <div className="h-full rounded-full bg-[#ffd23f] transition-all duration-500" style={{ width: Math.max(demande > 0 ? 1 : 0, (demande / echelle) * 100) + "%" }} />
          </div>
          <span className="w-[72px] shrink-0 text-right font-mono text-[12px] font-bold tabular-nums text-[#f1effa]">{fr(demande)} W</span>
        </div>
      </div>

      {/* Ta puissance : réglable aussi d'un clic (même réglage que le curseur du haut) */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[12.5px] text-[#d6d2ea]">
        <span>Ta puissance sur le rameur :</span>
        {[100, 150, 200].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPuissance(p)}
            aria-pressed={puissance === p}
            className={`min-h-[32px] rounded border px-2.5 font-mono text-xs font-bold ${
              puissance === p
                ? "border-[#ff6b6b] bg-[#ff6b6b] text-[#12101d]"
                : "border-[#ff6b6b]/50 text-[#ff6b6b] hover:bg-[#ff6b6b]/15"
            }`}
          >
            {p} W
          </button>
        ))}
        <span className="text-[#a49fc9]">(ou le curseur en haut)</span>
      </div>

      {/* Le verdict */}
      {demande > 0 && (
        <p
          className={`mt-2 rounded px-3 py-2 text-[15px] font-bold leading-6 ${
            suffit ? "bg-[#7fb069]/20 text-[#b6e09f]" : "bg-[#e07a5f]/20 text-[#ffb59f]"
          }`}
        >
          {suffit
            ? `✅ Oui ! Tes ${fr(puissance)} W suffisent pour ${fr(demande)} W (il reste ${fr(puissance - demande)} W).`
            : `❌ Non : la maison demande ${fr(demande)} W, tu produis ${fr(puissance)} W. Il manque ${fr(demande - puissance)} W.`}
        </p>
      )}

      {/* Combien de temps ramer ? temps = énergie ÷ ta puissance */}
      {demande > 0 && (
        <div className="mt-2 rounded border border-[#2f2a4d] bg-[#12101d] p-2.5">
          <div className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-[#d6d2ea]">
            <span>Ces appareils restent allumés pendant :</span>
            {DUREES_MIN.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMinutes(m)}
                aria-pressed={minutes === m}
                className={`min-h-[32px] rounded border px-2.5 font-mono text-xs font-bold ${
                  minutes === m
                    ? "border-[#ffd23f] bg-[#ffd23f] text-[#12101d]"
                    : "border-[#ffd23f]/50 text-[#ffd23f] hover:bg-[#ffd23f]/15"
                }`}
              >
                {m === 60 ? "1 h" : `${m} min`}
              </button>
            ))}
          </div>
          <p className="mt-2 font-mono text-[13px] leading-6 text-[#ffd23f]">
            Énergie = puissance × temps = {fr(demande)} W × {fr(tAppareils)} s = <b>{fr(energie)} J</b>
            <br />
            Temps à ramer = énergie ÷ ta puissance = {fr(energie)} ÷ {fr(puissance)}{" "}
            {Number.isInteger(tPedaler) ? "=" : "≈"}{" "}
            {tPedaler < 60 ? (
              <b>{tPedalerTxt.txt}</b>
            ) : (
              <>
                {fr(tPedaler)} s {tPedalerTxt.exacte ? "=" : "≈"} <b>{tPedalerTxt.txt}</b>
              </>
            )}
          </p>
          <p className="mt-1 text-[13px] leading-5 text-[#f1effa]">
            Pour {minutes === 60 ? "1 heure" : `${minutes} min`} de ces appareils, tu dois ramer{" "}
            <b className="text-[#ffd23f]">{tPedalerTxt.exacte ? "" : "environ "}{tPedalerTxt.txt}</b> à {fr(puissance)} W
            <span className="text-[#a49fc9]"> (sans compter les pertes de la machine).</span>
          </p>
        </div>
      )}

      {/* L'effet waouh : la bouilloire */}
      {bouilloire && (
        <div className="mt-2 rounded border-2 border-[#ff6b6b] bg-[#ff6b6b]/10 p-3">
          <p className="text-[16px] font-black leading-6 text-[#ff6b6b]">
            🤯 Waouh : la bouilloire demande 2 000 W à elle seule !
          </p>
          <p className="mt-1 text-[13.5px] leading-5 text-[#f1effa]">
            Pour {fr(demande)} W, il faudrait{" "}
            <b className="text-[#ffd23f]">{fr(personnes)} personnes comme toi</b> qui rament
            en même temps (
            {Number.isInteger(demande / puissance)
              ? `${fr(demande)} ÷ ${fr(puissance)} = ${fr(demande / puissance)}`
              : `${fr(demande)} ÷ ${fr(puissance)} ≈ ${fr(demande / puissance, 1)}, on arrondit au-dessus`}
            ). Même un champion du Tour de France ne tient pas 400 W très
            longtemps : un humain seul ne peut pas faire bouillir l&apos;eau à la vitesse d&apos;une
            bouilloire.
          </p>
        </div>
      )}
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
    <div className="rounded border border-[#2f2a4d] bg-[#1c1930] px-3 py-1.5">
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
      <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">{explication}</p>
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
        className="mx-auto max-w-6xl px-4 py-3 sm:px-5"
        style={modeClasse ? ({ zoom: 1.12 } as React.CSSProperties) : undefined}
      >
        {/* Les commandes : ton effort, à toi */}
        <div className="grid gap-3 rounded border border-[#2f2a4d] bg-[#1c1930] p-3 lg:grid-cols-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">
                Puissance
              </p>
              <p className="font-mono text-xl font-bold tabular-nums text-[#ffd23f]">
                {fr(puissance)} <span className="text-xs font-normal text-[#a49fc9]">W</span>
              </p>
            </div>
            <input
              type="range"
              min={50}
              max={400}
              step={10}
              value={puissance}
              onChange={(e) => setPuissance(+e.target.value)}
              className="mt-2 w-full accent-[#ffd23f]"
              aria-label="Puissance de ton effort, en watts"
            />
            <div className="mt-1 flex justify-between font-mono text-[9.5px] text-[#a49fc9]/70">
              <span>50 W</span>
              <span>400 W</span>
            </div>
            <p className="mt-1.5 text-[11.5px] leading-4 text-[#d6d2ea]">
              Rep&egrave;re : <b className="text-[#f1effa]">250 W</b> sur un rameur, c&apos;est déjà un très bon effort.
            </p>
          </div>

          <div className="min-w-0 border-t border-[#2f2a4d] pt-3 lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">
                Durée
              </p>
              <p className="font-mono text-xl font-bold tabular-nums text-[#ff6b6b]">
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
              className="mt-2 w-full accent-[#ff6b6b]"
              aria-label="Durée de ton effort, en secondes"
            />
            <div className="mt-1 flex justify-between font-mono text-[9.5px] text-[#a49fc9]/70">
              <span>10 s</span>
              <span>10 min</span>
            </div>
            <p className="mt-1.5 text-[11.5px] leading-4 text-[#d6d2ea]">
              Énergie = puissance &times; temps : des watts tenus pendant des secondes.
            </p>
          </div>

          <div className="min-w-0 border-t border-[#2f2a4d] pt-3 lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">
                Poids
              </p>
              <p className="font-mono text-xl font-bold tabular-nums text-[#7fb069]">
                {fr(poids)} <span className="text-xs font-normal text-[#a49fc9]">kg</span>
              </p>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              step={1}
              value={poids}
              onChange={(e) => setPoids(+e.target.value)}
              className="mt-2 w-full accent-[#7fb069]"
              aria-label="Ton poids, en kilogrammes - il sert à calculer la récupération"
            />
            <div className="mt-1 flex justify-between font-mono text-[9.5px] text-[#a49fc9]/70">
              <span>30 kg</span>
              <span>100 kg</span>
            </div>
            <p className="mt-1.5 text-[11.5px] leading-4 text-[#d6d2ea]">
              Sert uniquement à calculer la récup&apos; et les protéines.
            </p>
          </div>
        </div>

        {/* LE SCHÉMA VIVANT — la salle animée, qui accélère avec la puissance. */}
        <SalleAnimee puissance={puissance} />

        {/* LA MAISON À ALIMENTER — l'élève clique sur les appareils (26/11). */}
        <MaisonCliquable puissance={puissance} setPuissance={setPuissance} />

        {/* La chaîne de l'énergie */}
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
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
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded border-2 border-[#ffd23f] bg-[#1c1930] p-2.5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">⚡ Énergie mécanique</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ffd23f]">{fr(energieJ)} J</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              soit {kcalMecaTxt} kcal mécaniques (1 kcal = 4 184 J)
            </p>
          </div>
          <div className="rounded border-2 border-[#ff9d5c] bg-[#1c1930] p-2.5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">🔥 Réellement brûlées</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ff9d5c]">{kcalBruleesTxt} kcal</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              ×4, à cause du rendement musculaire de ~25 % — le reste a chauffé
            </p>
          </div>
        </div>

        {/* Les équivalents parlants */}
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <div className="rounded border-2 border-[#ffd23f] bg-[#1c1930] p-2.5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">💡 Pendant ton effort</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ffd23f]">{fr(ampoules)} ampoules</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              des LED de 10 W, allumées en continu tant que tu tiens {fr(puissance)} W
            </p>
          </div>
          <div className="rounded border-2 border-[#ff6b6b] bg-[#1c1930] p-2.5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a49fc9]">🍫 En chocolat</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ff6b6b]">
              {fr(carres, carres < 10 ? 1 : 0)} {carres >= 2 ? "carrés" : "carré"}
            </p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#d6d2ea]">
              {kcalBruleesTxt} kcal brûlées ÷ 23 kcal le carré (~4,2 g)
            </p>
          </div>
          <div className="rounded border-2 border-[#7fb069] bg-[#1c1930] p-2.5 text-center">
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
        <div className="mt-3 rounded border border-dashed border-[#ffd23f]/40 bg-[#1c1930] px-3 py-2 font-mono text-[11.5px] leading-5 text-[#ffd23f]">
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
        <div className="mt-3 rounded border-2 border-[#ff6b6b] bg-[#1c1930] p-3">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff6b6b]">
            🫀 Le mot aux 11-17 ans — ta centrale aime tourner
          </p>
          <p className="mt-1.5 text-[12.5px] leading-5 text-[#d6d2ea]">
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
        <div className="mt-3 rounded border-2 border-[#7fb069] bg-[#1c1930] p-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#7fb069]">
              🍽️ La récup&apos; — l&apos;assiette répare le muscle
            </p>
            <p className="font-mono text-sm font-bold tabular-nums text-[#7fb069]">
              {fr(protBas)} à {fr(protHaut)} g <span className="text-[11px] font-normal text-[#a49fc9]">de protéines / jour</span>
            </p>
          </div>
          <p className="mt-1.5 text-[12.5px] leading-5 text-[#d6d2ea]">
            L&apos;effort abîme un peu le muscle — c&apos;est normal, c&apos;est comme ça
            qu&apos;il se renforce. Pour le réparer, il lui faut des{" "}
            <b className="text-[#f1effa]">protéines</b> : un sportif en vise environ{" "}
            <b className="text-[#f1effa]">1,2 à 1,6 g par kilo et par jour</b> — pour tes{" "}
            {fr(poids)} kg, entre <b className="text-[#7fb069]">{fr(protBas)}</b> et{" "}
            <b className="text-[#7fb069]">{fr(protHaut)} g</b> (une personne sédentaire :
            ~0,8 g/kg, soit {fr(protSedentaire)} g). Et tout est déjà dans l&apos;assiette.
          </p>
          <p className="mt-2 text-[10.5px] font-black uppercase tracking-[0.14em] text-[#a49fc9]">
            Si tu ne comptais que sur UN aliment (personne ne fait ça — on additionne) :
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* LE FILM — la même histoire en 69 s, muette (publiée le 24/07). La
            vignette vient de YouTube : aucune image à héberger. */}
        <a
          href={lienVideo("https://youtube.com/shorts/XdBT05f9_F0")}
          className="group mt-3 flex items-center gap-3 rounded border-2 border-[#ffd23f] bg-[#1c1930] p-2.5 transition hover:brightness-125"
        >
          <span className="relative block w-[92px] shrink-0 overflow-hidden rounded">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.ytimg.com/vi/XdBT05f9_F0/hqdefault.jpg"
              alt="Le film : 1 minute à fond = même pas un carré de chocolat"
              loading="lazy"
              className="block h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/90 text-xs text-white transition group-hover:scale-110">
                ▶
              </span>
            </span>
          </span>
          <span className="block">
            <span className="block text-[11px] font-black uppercase tracking-[0.18em] text-[#ffd23f]">
              🎬 Le film — 69 secondes, sans son
            </span>
            <span className="mt-1 block font-bold leading-snug text-[#f1effa]">
              1 minute à fond = même pas un carré de chocolat
            </span>
            <span className="mt-1 block text-[13px] leading-5 text-[#a49fc9]">
              Le même calcul, animé de bout en bout : les watts, les joules, le
              carré coupé, et l&apos;assiette qui répare.
            </span>
          </span>
        </a>

        {/* LES DÉFIS — à toi de calculer, la salle vérifie */}
        <DefisSimulateur
          titre="Les défis de la salle"
          coupDePouce="Coup de pouce : règle les curseurs du défi — la machine vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
          coachHref="/coach/serie?classe=4e&matiere=maths&notion=grandeur_composee&display=simple"
          coachLabel="Entraîne-toi sur le coach (grandeurs composées, 4e)"
        />

        {/* Le pont vers la machine jumelle et le défi du jour */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
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
