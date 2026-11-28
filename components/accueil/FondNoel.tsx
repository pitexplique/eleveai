"use client";
// LE FOND DE NOËL DE L'ACCUEIL (27/11/2026) : une nuit étoilée derrière le titre et le nuage.
// Frédéric, 27/11 : « il faut un fond d'écran sur la page d'accueil […] avec un
// Père Noël, imagine des choses mathématiques avec les Pères Noël qui arrivent
// en traîneau. » Puis, devant la 1re maquette (un grand traîneau sur une parabole) :
// « Essaye avec un fond d'écran de nuit étoilé, avec le Père Noël qui arrive, mais
// qui prend pas tout l'espace, des bouts de guirlande » → un PETIT traîneau dans
// une bande de ciel au-dessus du titre (il ne passe plus jamais derrière un texte).
//
// Les maths, en clin d'œil : rennes numérotés 1, 2, 4, 8 (chacun double le
// précédent), flocons de Koch, guirlandes en chaînette (y = ch x), sapin en
// triangle de Pascal, cadeaux en cube et en pavé. Noël en été à La Réunion :
// un flamboyant en fleur et une barquette de letchis, sur la colline de droite.
//
// ⏰ Affiché du 27 novembre (« affiche-le de suite ») au 6 janvier (lib/noel/saison.ts, décidé côté serveur :
//    l'accueil est régénéré toutes les heures, donc aucun éclair au chargement).
//    Avant : /accueil?noel=1 ; pour le cacher pendant la saison : ?noel=0.
// 🎨 Le titre passe en blanc et le haut de page gagne une bande de ciel par CSS
//    (`section:has(.noel-fond)`) : ça suit le fond, qu'il vienne du serveur ou de ?noel=1.
// ⛔ Pas de bannière rouge. Rien de cliquable (pointer-events-none, aria-hidden).
// ⛔ Léger : du SVG dessiné ici, aucune image ; seules transform et opacity s'animent ;
//    tout s'arrête si l'utilisateur a choisi « réduire les animations ».

import { useEffect, useState } from "react";

// ─── Un hasard fixe (le même au serveur et au navigateur).
function hasard(graine: number) {
  let s = graine;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

// ─── Le flocon de Koch : un triangle, chaque côté remplacé 3 fois par « _/\_ ».
function pointsKoch(iterations: number, r: number): [number, number][] {
  let pts: [number, number][] = [0, 1, 2].map((k) => {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / 3;
    return [r * Math.cos(a), r * Math.sin(a)];
  });
  for (let n = 0; n < iterations; n++) {
    const suivant: [number, number][] = [];
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + 1) % pts.length];
      const dx = (x2 - x1) / 3;
      const dy = (y2 - y1) / 3;
      const a: [number, number] = [x1 + dx, y1 + dy];
      const b: [number, number] = [x1 + 2 * dx, y1 + 2 * dy];
      // La pointe : le tiers du milieu tourné de 60° vers l'extérieur.
      const c: [number, number] = [
        a[0] + dx * Math.cos(-Math.PI / 3) - dy * Math.sin(-Math.PI / 3),
        a[1] + dx * Math.sin(-Math.PI / 3) + dy * Math.cos(-Math.PI / 3),
      ];
      suivant.push([x1, y1], a, c, b);
    }
    pts = suivant;
  }
  return pts;
}
const KOCH = "M" + pointsKoch(3, 50).map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + "Z";

function Flocon({ taille }: { taille: number }) {
  return (
    <svg viewBox="-55 -55 110 110" width={taille} height={taille} aria-hidden="true">
      <path d={KOCH} fill="#e0f2fe" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

// Les flocons qui tombent : position (% de largeur), taille, durée, retard.
const CHUTE: [number, number, number, number][] = [
  [3, 20, 30, -4], [9, 13, 36, -18], [92, 18, 32, -2], [97, 13, 38, -21],
  [15, 11, 40, -27], [84, 12, 34, -9], [50, 10, 44, -15], [70, 10, 39, -31],
];

function Chute() {
  return (
    <>
      {CHUTE.map(([x, t, dur, delai], i) => (
        <span
          key={i}
          className={`noel-chute absolute top-0 ${i >= 4 ? "hidden sm:block" : ""}`}
          style={{ left: `${x}%`, animationDuration: `${dur}s`, animationDelay: `${delai}s`, opacity: 0.85, ["--noel-y" as string]: `${140 + ((i * 337) % 1000)}px` }}
        >
          <Flocon taille={t} />
        </span>
      ))}
    </>
  );
}

// ─── Le ciel : des étoiles, dont quelques-unes scintillent, et l'étoile du berger.
const ETOILES = (() => {
  const h = hasard(974);
  return Array.from({ length: 70 }, (_, i) => ({ x: h() * 1600, y: 20 + h() * 1250, r: 0.8 + h() * 1.8, s: i % 5 === 0 }));
})();

function Etoile({ x, y, r }: { x: number; y: number; r: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return <polygon points={pts} fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />;
}

function Ciel() {
  return (
    <svg viewBox="0 0 1600 1300" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {ETOILES.map((e, i) => (
        <circle key={i} cx={e.x.toFixed(0)} cy={e.y.toFixed(0)} r={e.r.toFixed(1)} fill="#fefce8" className={e.s ? "noel-scintille" : undefined} style={e.s ? { animationDelay: `${-(i % 7) * 0.6}s` } : undefined} opacity={e.s ? undefined : 0.75} />
      ))}
      <g className="noel-scintille"><Etoile x={1430} y={210} r={13} /></g>
    </svg>
  );
}

// ─── Le traîneau, petit : quatre rennes numérotés 1, 2, 4, 8.
function Renne({ x, n }: { x: number; n: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M-4 -26 l-6 -12 M-10 -38 l-6 2 M-10 -38 l0 -6 M2 -26 l4 -12 M6 -38 l6 0 M6 -38 l-2 -6" stroke="#d6a76b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="-2" cy="-20" rx="7" ry="6" fill="#b7793e" />
      <circle cx="4" cy="-20" r="2.6" fill={n === 1 ? "#f87171" : "#3b2410"} />
      <ellipse cx="-20" cy="-8" rx="17" ry="9" fill="#b7793e" />
      <path d="M-8 -12 L-3 -16" stroke="#b7793e" strokeWidth="7" strokeLinecap="round" />
      <path d="M-32 0 l-5 12 M-26 0 l3 12 M-14 0 l-4 12 M-8 -2 l5 12" stroke="#8a5a2b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-20" cy="-8" r="8" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
      <text x="-20" y="-4.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#78350f" fontFamily="system-ui, sans-serif">{n}</text>
    </g>
  );
}

function Traineau() {
  return (
    <g>
      <path d="M-58 -26 L46 -14 M-58 -24 L96 -14 M-58 -22 L146 -14 M-58 -20 L196 -14" stroke="#fbbf24" strokeWidth="1.2" fill="none" opacity="0.8" />
      <Renne x={210} n={1} />
      <Renne x={160} n={2} />
      <Renne x={110} n={4} />
      <Renne x={60} n={8} />
      {/* Le Père Noël */}
      <circle cx="-74" cy="-40" r="9" fill="#fcd9b6" />
      <path d="M-84 -42 Q-74 -62 -62 -48 L-66 -44 Z" fill="#dc2626" />
      <circle cx="-60" cy="-48" r="3.5" fill="#ffffff" />
      <path d="M-83 -38 Q-74 -24 -65 -38 Z" fill="#ffffff" />
      <rect x="-86" y="-32" width="24" height="18" rx="6" fill="#dc2626" />
      {/* Les cadeaux : un cube et un pavé */}
      <rect x="-118" y="-38" width="16" height="16" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
      <path d="M-118 -38 l6 -6 h16 l-6 6 Z M-102 -38 l6 -6 v16 l-6 6 Z" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="-104" y="-30" width="22" height="10" fill="#a78bfa" stroke="#6d28d9" strokeWidth="1.5" />
      {/* La luge */}
      <path d="M-122 -22 H-50 Q-40 -22 -42 -34 L-36 -36 Q-30 -10 -56 -10 H-114 Q-124 -10 -122 -22 Z" fill="#0d9488" stroke="#99f6e4" strokeWidth="1.5" />
      <path d="M-126 -2 H-44 Q-28 -2 -26 -14" stroke="#fbbf24" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M-110 -10 V-2 M-60 -10 V-2" stroke="#fbbf24" strokeWidth="3" />
    </g>
  );
}

/** La bande de ciel au-dessus du titre : le traîneau la traverse en 24 s, puis 12 s de ciel vide. */
function BandeTraineau({ bouge }: { bouge: boolean }) {
  const VOL = "M -260 82 Q 400 30 800 62 T 1860 44";
  return (
    <svg viewBox="0 0 1600 110" preserveAspectRatio="xMidYMid slice" className="absolute inset-x-0 top-0 h-[64px] w-full sm:h-[96px]" aria-hidden="true">
      {bouge ? (
        <g opacity="0">
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.66;0.66;1" dur="36s" repeatCount="indefinite" />
          <animateMotion dur="36s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.66;1" calcMode="linear" path={VOL} />
          <g transform="scale(0.62)"><Traineau /></g>
        </g>
      ) : (
        <g transform="translate(1180 70) scale(0.62)">
          <Traineau />
        </g>
      )}
    </svg>
  );
}

// ─── Des bouts de guirlande dans les coins : une chaînette (y = ch x) et des ampoules.
const COULEURS_AMPOULES = ["#fbbf24", "#38bdf8", "#f472b6", "#4ade80", "#fbbf24", "#a78bfa"];

function BoutDeGuirlande({ cote }: { cote: "gauche" | "droite" }) {
  const L = 260;
  const fleche = 34;
  const pt = (u: number) => [L * (u + 1) / 2, 8 + fleche * (1 - (Math.cosh(1.6 * u) - 1) / (Math.cosh(1.6) - 1))];
  const d = "M" + Array.from({ length: 21 }, (_, i) => pt(-1 + i / 10)).map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L");
  const ampoules = [-0.75, -0.45, -0.15, 0.15, 0.45, 0.75].map((u) => pt(u));
  return (
    <svg viewBox="0 0 260 70" className={`absolute top-0 h-[32px] w-[118px] sm:h-[70px] sm:w-[260px] ${cote === "gauche" ? "left-0" : "right-0 -scale-x-100"}`} aria-hidden="true">
      <path d={d} fill="none" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
      {ampoules.map(([x, y], i) => (
        <g key={i} className="noel-scintille" style={{ animationDelay: `${-i * 0.5}s` }}>
          <rect x={x - 2.5} y={y} width="5" height="5" fill="#99f6e4" />
          <ellipse cx={x} cy={y + 11} rx="5" ry="7.5" fill={COULEURS_AMPOULES[i]} />
        </g>
      ))}
    </svg>
  );
}

// ─── Les collines de nuit (mêmes coordonnées que CollinesAccueil, 1600 × 260), sous la neige.
function SapinDePascal() {
  const lignes = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]];
  return (
    <g>
      <rect x="62" y="150" width="16" height="22" fill="#78350f" />
      <path d="M70 18 L140 152 H0 Z" fill="#15803d" stroke="#bbf7d0" strokeWidth="2" strokeLinejoin="round" />
      {lignes.map((l, r) =>
        l.map((n, k) => (
          <text key={`${r}-${k}`} x={70 + (k - (l.length - 1) / 2) * 20} y={52 + r * 19} textAnchor="middle" fontSize={n >= 10 ? 10 : 13} fontWeight="900" fill="#fde68a" fontFamily="system-ui, sans-serif">
            {n}
          </text>
        )),
      )}
      <Etoile x={70} y={14} r={14} />
    </g>
  );
}

function Cadeaux() {
  return (
    <g>
      <rect x="0" y="20" width="34" height="34" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1.5" />
      <path d="M0 20 l12 -12 h34 l-12 12 Z" fill="#bae6fd" stroke="#e0f2fe" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M34 20 l12 -12 v34 l-12 12 Z" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M17 20 V54 M6 14 h34" stroke="#fbbf24" strokeWidth="4" />
      <rect x="50" y="32" width="52" height="22" fill="#a78bfa" stroke="#ede9fe" strokeWidth="1.5" />
      <path d="M50 32 l9 -9 h52 l-9 9 Z" fill="#ddd6fe" stroke="#ede9fe" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M102 32 l9 -9 v22 l-9 9 Z" fill="#7c3aed" stroke="#ede9fe" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M76 32 V54" stroke="#fbbf24" strokeWidth="4" />
    </g>
  );
}

function Flamboyant() {
  return (
    <g>
      <path d="M60 140 C 58 110, 62 90, 60 70 M60 92 L36 74 M60 86 L86 70" stroke="#5b3a1e" strokeWidth="7" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="60" rx="62" ry="24" fill="#166534" />
      {[[12, 56], [30, 44], [52, 40], [74, 42], [96, 48], [110, 60], [22, 68], [46, 58], [70, 60], [92, 68]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#fb923c" />
      ))}
      <g transform="translate(-60 120)">
        <path d="M0 0 h44 l-6 16 h-32 Z" fill="#d6a76b" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
        {[[8, -2], [18, -4], [28, -3], [38, -1], [13, -9], [24, -11], [33, -8]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5.5" fill="#e11d48" stroke="#fecdd3" strokeWidth="1" />
        ))}
      </g>
    </g>
  );
}

function CollinesDeNuit() {
  return (
    <svg viewBox="0 0 1600 260" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-[150px] w-full sm:h-[200px]" aria-hidden="true">
      <path d="M0 120 C 200 60, 380 70, 560 115 S 900 150, 1080 95 S 1420 50, 1600 105 L1600 260 L0 260 Z" fill="#173a5c" />
      <path d="M0 150 C 150 110, 330 120, 520 190 C 560 205, 600 230, 640 260 L0 260 Z" fill="#14532d" />
      <path d="M1600 140 C 1450 105, 1260 125, 1080 200 C 1040 215, 1000 240, 960 260 L1600 260 Z" fill="#14532d" />
      {/* La neige sur les crêtes */}
      <path d="M0 150 C 150 110, 330 120, 520 190 L508 196 C 330 134, 150 124, 0 164 Z" fill="#f8fafc" />
      <path d="M1600 140 C 1450 105, 1260 125, 1080 200 L1094 204 C 1262 138, 1450 119, 1600 154 Z" fill="#f8fafc" />
      <path d="M0 200 C 120 170, 260 180, 400 260 L0 260 Z" fill="#166534" />
      <path d="M1600 195 C 1480 170, 1340 185, 1220 260 L1600 260 Z" fill="#166534" />
      <g transform="translate(40 4)"><SapinDePascal /></g>
      <g transform="translate(200 76)"><Cadeaux /></g>
      <g transform="translate(1400 18)"><Flamboyant /></g>
    </svg>
  );
}

const CSS = `
section:has(> .noel-fond) .accueil-haut { padding-top: 4.25rem; }
@media (min-width: 640px) { section:has(> .noel-fond) .accueil-haut { padding-top: 6.25rem; } }
section:has(> .noel-fond) .accueil-titre { color: #ffffff; text-shadow: 0 2px 10px rgba(2, 6, 23, .55); }
section:has(> .noel-fond) .accueil-titre-2 { color: #fcd34d; }
section:has(> .noel-fond) [class~="bg-sky-100/80"] { background-color: rgba(240, 249, 255, .96); }
@keyframes noel-chute { from { transform: translate3d(0,-40px,0) rotate(0deg); } to { transform: translate3d(24px,1500px,0) rotate(200deg); } }
@keyframes noel-scintille { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
.noel-chute { animation: noel-chute linear infinite; will-change: transform; }
.noel-scintille { animation: noel-scintille 3.4s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .noel-chute { animation: none; transform: translate3d(0,var(--noel-y,160px),0); }
  .noel-scintille { animation: none; }
}
`;

export default function FondNoel({ actif }: { actif: boolean }) {
  const [visible, setVisible] = useState(actif);
  const [bouge, setBouge] = useState(true);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("noel");
    if (p === "0") setVisible(false);
    else if (p === "1") setVisible(true);
    setBouge(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!visible) return null;
  return (
    <div className="noel-fond pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0b1633] via-[#13284f] to-[#1c3d6b]" aria-hidden="true">
      <style>{CSS}</style>
      <Ciel />
      <CollinesDeNuit />
      <BoutDeGuirlande cote="gauche" />
      <BoutDeGuirlande cote="droite" />
      <BandeTraineau bouge={bouge} />
      <Chute />
    </div>
  );
}
