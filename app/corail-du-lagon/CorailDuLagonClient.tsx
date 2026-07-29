"use client";

// « Le corail du lagon » — machine « dans ta main » (rubrique « Un peu de maths »).
// Un sous-marin tourne autour d'un corail et le FILME. Chaque image est une
// PROJECTION (le corail 3D → une largeur 2D à l'écran) : vu de côté on voit toute
// sa longueur, vu « bout par bout » il paraît minuscule. La largeur filmée vaut
//     w(φ) = 2·√( A²·sin²(θ−φ) + B²·cos²(θ−φ) )
// (A = demi-longueur, B = demi-largeur, θ = orientation du corail, φ = angle de
// vue du sous-marin). Une SEULE image est ambiguë (court-de-face = long-de-biais) ;
// mais en tournant tout autour, la PLUS GRANDE largeur filmée = la vraie longueur,
// la PLUS PETITE = la vraie largeur. C'est le geste « projeter dans toutes les
// directions » au cœur de la preuve de la conjecture de Kakeya par Hong Wang
// (démontrée en 2025). Il faut une RÉFÉRENCE D'ÉCHELLE (le laser du sous-marin)
// pour passer des pixels aux centimètres — sinon une projection reste ambiguë.
//
// Contrainte (Frédéric) : IMAGE (le lagon vu du ciel) + RÉGLAGE (l'angle de vue)
// + RÉSULTAT (les mesures) tiennent sur un SEUL écran ; le reste se déroule dessous.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const LAGON = "#0e7490"; // l'encre — l'eau profonde
const CORAIL = "#f4694a"; // le corail
const CYAN = "#0891b2"; // les repères, la caméra
const SOUS = "#334155"; // le sous-marin

const COULEURS_DEFIS: CouleursDefis = {
  fond: "#eefbfd",
  fondProfond: "#dff4f8",
  bord: "#b6e3ec",
  accent: LAGON,
  texte: "#134e5a",
  sousTexte: "#4a8a99",
  ok: "#0f766e",
  rate: "#b3261e",
};

// La rampe CP → Terminale : la MÊME idée (« mesurer sans toucher, en tournant
// autour »), un outil qui grandit — du plus-grand-nombre au sinus. Réponse
// numérique unique par carte, nombres DIFFÉRENTS du curseur (la machine vérifie).
const DEFIS: DefiSimulateur[] = [
  {
    id: "corail-cp-maxphoto",
    question:
      "CP · CE1 — Le sous-marin filme le même corail sous deux angles : une photo montre 30 cm de large, l'autre 42 cm. La vraie longueur, c'est la plus GRANDE. Écris-la.",
    reponse: 42,
    unite: "cm",
    indice: "La vraie longueur = la plus grande largeur filmée. Compare 30 et 42.",
    calcul: "42 > 30 : la vraie longueur est 42 cm — la photo la plus large montre le corail « en entier ».",
    tolerance: 0.5,
  },
  {
    id: "corail-ce2-moitie",
    question:
      "CE2 · CM1 — Vu bien de côté, un corail montre 50 cm. Vu de biais, sa photo n'en montre que la moitié. Combien de cm sur la photo de biais ?",
    reponse: 25,
    unite: "cm",
    indice: "La moitié de 50 : 50 ÷ 2.",
    calcul: "50 ÷ 2 = 25 cm : de biais, on « rate » une partie de la longueur.",
    tolerance: 0.5,
  },
  {
    id: "corail-cm2-manque",
    question:
      "CM2 — Sur une photo le corail fait 36 cm ; en vrai il fait 48 cm. Combien de cm « manquent » sur la photo à cause de l'angle ?",
    reponse: 12,
    unite: "cm",
    indice: "Une soustraction : 48 − 36.",
    calcul: "48 − 36 = 12 cm de longueur cachés par l'angle de vue.",
    tolerance: 0.5,
  },
  {
    id: "corail-6e-max",
    question:
      "6ᵉ · 5ᵉ — En tournant autour, tu relèves ces largeurs : 24, 39, 31, 45, 28 cm. Quelle est ta mesure de la LONGUEUR du corail ?",
    reponse: 45,
    unite: "cm",
    indice: "La longueur = la plus grande largeur relevée.",
    calcul: "Le maximum de {24 ; 39 ; 31 ; 45 ; 28} est 45 cm : c'est la longueur mesurée.",
    tolerance: 0.5,
  },
  {
    id: "corail-6e-min",
    question:
      "6ᵉ · 5ᵉ — Mêmes relevés : 24, 39, 31, 45, 28 cm. Cette fois, donne la LARGEUR du corail (la plus petite).",
    reponse: 24,
    unite: "cm",
    indice: "La largeur = la plus petite largeur relevée.",
    calcul: "Le minimum est 24 cm : vu « bout par bout », le corail montre sa largeur, pas sa longueur.",
    tolerance: 0.5,
  },
  {
    id: "corail-4e-echelle",
    question:
      "4ᵉ · 3ᵉ — Grâce au laser, 9 cm à l'écran représentent un corail de 45 cm. Combien de cm réels vaut 1 cm d'écran ?",
    reponse: 5,
    unite: "cm réels",
    indice: "L'échelle = réel ÷ écran : 45 ÷ 9.",
    calcul: "45 ÷ 9 = 5 : 1 cm à l'écran = 5 cm de vrai corail. Sans cette échelle, impossible de mesurer.",
    tolerance: 0.2,
  },
  {
    id: "corail-2nde-sinus",
    question:
      "2ⁿᵈᵉ — De biais, la largeur filmée = longueur × sin(angle). Longueur 60 cm, sin(angle) = 0,5. Quelle largeur la caméra filme-t-elle ?",
    reponse: 30,
    unite: "cm",
    indice: "Multiplie : 60 × 0,5.",
    calcul: "60 × 0,5 = 30 cm. Le sinus mesure « de combien on voit le corail de travers ».",
    tolerance: 0.5,
  },
  {
    id: "corail-1re-max",
    question:
      "1ʳᵉ — La largeur filmée vaut w = L × |sin(θ − φ)|. Elle est MAXIMALE quand |sin| = 1. Pour L = 40 cm, quelle est cette largeur maximale ?",
    reponse: 40,
    unite: "cm",
    indice: "Quand |sin| = 1, w = L × 1.",
    calcul: "w_max = 40 × 1 = 40 cm = L : la plus grande « ombre » redonne exactement la longueur. C'est le geste de Hong Wang.",
    tolerance: 0.5,
  },
  {
    id: "corail-term-zero",
    question:
      "Terminale — w(φ) = L·|sin(θ − φ)| s'annule quand φ = θ (on regarde le corail pile dans son axe). Vu ainsi, que vaut la largeur filmée d'un corail de 55 cm de long ?",
    reponse: 0,
    unite: "cm",
    indice: "|sin(0)| = 0, donc w = 55 × 0.",
    calcul: "w = 55 × 0 = 0 : pile dans l'axe, un corail-segment « disparaît ». Voilà pourquoi UNE seule photo est ambiguë : il faut tourner autour.",
    tolerance: 0.5,
  },
];

// --- La géométrie ------------------------------------------------------------
const SCALE = 5; // px par cm (la « référence d'échelle » du sous-marin)
const VBW = 1000;
const VBH = 500;
const CX = 500;
const CY = 250;
const RORB = 196; // rayon de l'orbite du sous-marin (px)
const SENSOR = 150; // demi-longueur du capteur affiché (px)

// La largeur filmée (projection) d'un corail-ellipse (demi-axes A, B ; orientation
// θ) vu sous l'angle φ. En cm. Max = 2A = longueur ; min = 2B = largeur.
function largeurFilmee(L: number, W: number, thetaDeg: number, phiDeg: number) {
  const A = L / 2;
  const B = W / 2;
  const d = ((thetaDeg - phiDeg) * Math.PI) / 180;
  return 2 * Math.sqrt(A * A * Math.sin(d) ** 2 + B * B * Math.cos(d) ** 2);
}

// Corail de départ FIXE (rendu déterministe — pas de Math.random au 1er rendu).
const L0 = 42;
const W0 = 18;
const THETA0 = 35;
const PHI0 = 25;
const W_INIT = largeurFilmee(L0, W0, THETA0, PHI0);

export default function CorailDuLagonClient() {
  const [L, setL] = useState(L0);
  const [W, setW] = useState(W0);
  const [theta, setTheta] = useState(THETA0);
  const [phi, setPhi] = useState(PHI0);
  const [maxSeen, setMaxSeen] = useState(W_INIT);
  const [minSeen, setMinSeen] = useState(W_INIT);
  const [swept, setSwept] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [modeClasse, setModeClasse] = useState(false);

  const coral = useRef({ L: L0, W: W0, theta: THETA0 });
  const sweepRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      return !v;
    });
  };

  const stopSweep = () => {
    if (sweepRef.current != null) {
      clearInterval(sweepRef.current);
      sweepRef.current = null;
    }
  };
  useEffect(() => () => stopSweep(), []);

  const noter = (angle: number) => {
    const w = largeurFilmee(coral.current.L, coral.current.W, coral.current.theta, angle);
    setMaxSeen((m) => Math.max(m, w));
    setMinSeen((m) => Math.min(m, w));
  };

  const reglerAngle = (val: number) => {
    stopSweep();
    setPhi(val);
    noter(val);
  };

  // Le tour complet : le sous-marin fait 360° et la machine garde la plus grande
  // et la plus petite largeur filmée. C'est LA mesure.
  const faireLeTour = () => {
    stopSweep();
    let a = 0;
    setPhi(0);
    noter(0);
    sweepRef.current = setInterval(() => {
      a += 4;
      if (a > 360) {
        stopSweep();
        setSwept(true);
        return;
      }
      const ang = a % 360;
      setPhi(ang);
      noter(ang);
    }, 18);
  };

  // Un nouveau corail, taille cachée : à l'élève de la retrouver en tournant.
  const nouveauCorail = () => {
    stopSweep();
    const nL = Math.round(30 + Math.random() * 30); // 30–60 cm
    const nW = Math.round(12 + Math.random() * (nL * 0.55 - 12)); // 12 cm .. ~55 % de L
    const nT = Math.round(Math.random() * 179);
    coral.current = { L: nL, W: nW, theta: nT };
    setL(nL);
    setW(nW);
    setTheta(nT);
    setPhi(20);
    const w0 = largeurFilmee(nL, nW, nT, 20);
    setMaxSeen(w0);
    setMinSeen(w0);
    setSwept(false);
    setRevealed(false);
  };

  // --- Points de la scène ----------------------------------------------------
  const sigma = (phi * Math.PI) / 180;
  const sub = { x: CX + RORB * Math.cos(sigma), y: CY + RORB * Math.sin(sigma) };
  // direction de visée (sous-marin → corail) et perpendiculaire (l'axe « image »)
  const d = { x: -Math.cos(sigma), y: -Math.sin(sigma) };
  const p = { x: -d.y, y: d.x };
  const wNow = largeurFilmee(L, W, theta, phi);
  const half = (wNow * SCALE) / 2;
  // silhouette du corail (bords projetés) et leur image sur le capteur
  const E1 = { x: CX + half * p.x, y: CY + half * p.y };
  const E2 = { x: CX - half * p.x, y: CY - half * p.y };
  const B1 = { x: sub.x + half * p.x, y: sub.y + half * p.y };
  const B2 = { x: sub.x - half * p.x, y: sub.y - half * p.y };
  const S1 = { x: sub.x + SENSOR * p.x, y: sub.y + SENSOR * p.y };
  const S2 = { x: sub.x - SENSOR * p.x, y: sub.y - SENSOR * p.y };
  const subAngle = (Math.atan2(sub.y - CY, sub.x - CX) * 180) / Math.PI;

  const grand = modeClasse ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl";
  const fLabel = modeClasse ? 17 : 13;

  const verdict = (() => {
    if (!swept)
      return {
        texte:
          "Tourne autour du corail (curseur ou « Faire le tour ») : la plus GRANDE largeur filmée révèle sa longueur, la plus PETITE sa largeur.",
        couleur: "#4a8a99",
      };
    if (!revealed)
      return {
        texte: `Tour complet ✓ — ta mesure : longueur ≈ ${Math.round(maxSeen)} cm, largeur ≈ ${Math.round(
          minSeen,
        )} cm. Révèle la vraie taille pour vérifier.`,
        couleur: LAGON,
      };
    const okL = Math.abs(Math.round(maxSeen) - L) <= 2;
    const okW = Math.abs(Math.round(minSeen) - W) <= 2;
    return {
      texte:
        okL && okW
          ? `Vraie taille : ${L} × ${W} cm — ta mesure tombe juste ✓ Une seule photo ne l'aurait jamais dit.`
          : `Vraie taille : ${L} × ${W} cm. Refais un tour complet pour affiner ta mesure.`,
      couleur: okL && okW ? "#0f766e" : "#b3261e",
    };
  })();

  return (
    <main
      className="min-h-screen pb-14"
      style={{
        backgroundColor: "#f0fbfd",
        backgroundImage:
          "linear-gradient(#c9ecf340 1px, transparent 1px), linear-gradient(90deg, #c9ecf340 1px, transparent 1px)",
        backgroundSize: "25px 25px",
        color: "#134e5a",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: CYAN }}>
          Un peu de maths · La rubrique du prof
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: LAGON }}>
          Le corail du lagon
        </h1>
        <p className="mt-1 text-lg font-black" style={{ color: CORAIL }}>
          Un sous-marin le mesure sans le toucher — en tournant autour
        </p>
        <p className="mt-1 text-[13px]" style={{ color: "#4a8a99" }}>
          Chaque image est une <b>projection</b>. Une seule ne suffit pas — mais en filmant sous tous les
          angles, la plus grande « ombre » donne la vraie taille. C&apos;est le geste de{" "}
          <Link href="/aiguille-de-kakeya" className="font-black hover:underline" style={{ color: CORAIL }}>
            Hong Wang (conjecture de Kakeya)
          </Link>
          .{" "}
          <a
            href="https://youtu.be/Ax6irc6WFh0"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:underline"
            style={{ color: "#c81e1e" }}
          >
            🌍 Watch the video (English, 2 min)
          </a>
        </p>

        {/* ── LA MACHINE : image + réglage + résultat, sur un seul écran ── */}
        <div className="mt-3 rounded border p-3 sm:p-4" style={{ borderColor: "#b6e3ec", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: CYAN }}>
              Le lagon vu du ciel — le sous-marin filme, tu lis la largeur
            </p>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: "#b6e3ec", color: "#4a8a99" }}
            >
              {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
            </button>
          </div>

          {/* L'IMAGE : lagon, corail, sous-marin, rayons de projection, capteur */}
          <svg
            viewBox={`0 0 ${VBW} ${VBH}`}
            className="mt-2 w-full"
            role="img"
            aria-label={`Vue du ciel d'un corail dans le lagon. Le sous-marin est à l'angle de vue ${Math.round(
              phi,
            )} degrés et filme une largeur de ${Math.round(wNow)} centimètres. Plus grande largeur vue : ${Math.round(
              maxSeen,
            )} centimètres.`}
          >
            <defs>
              <radialGradient id="eau" cx="50%" cy="45%" r="70%">
                <stop offset="0%" stopColor="#e0f7fb" />
                <stop offset="100%" stopColor="#c3ecf3" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width={VBW} height={VBH} fill="url(#eau)" />

            {/* l'orbite du sous-marin */}
            <circle cx={CX} cy={CY} r={RORB} fill="none" stroke={CYAN} strokeWidth="1.5" strokeDasharray="3 7" opacity="0.5" />

            {/* les rayons de projection : les bords du corail → le capteur */}
            <line x1={E1.x} y1={E1.y} x2={B1.x} y2={B1.y} stroke={CORAIL} strokeWidth="1.5" strokeDasharray="2 5" opacity="0.7" />
            <line x1={E2.x} y1={E2.y} x2={B2.x} y2={B2.y} stroke={CORAIL} strokeWidth="1.5" strokeDasharray="2 5" opacity="0.7" />

            {/* l'axe de visée sous-marin → corail */}
            <line x1={sub.x} y1={sub.y} x2={CX} y2={CY} stroke={SOUS} strokeWidth="1.2" strokeDasharray="5 5" opacity="0.55" />

            {/* le corail (ellipse orientée) + quelques polypes + l'axe vrai si révélé */}
            <g transform={`rotate(${theta} ${CX} ${CY})`}>
              <ellipse cx={CX} cy={CY} rx={(L / 2) * SCALE} ry={(W / 2) * SCALE} fill={CORAIL} opacity="0.85" />
              <ellipse cx={CX} cy={CY} rx={(L / 2) * SCALE} ry={(W / 2) * SCALE} fill="none" stroke="#c2410c" strokeWidth="1.5" />
              {[-0.55, -0.2, 0.2, 0.55].map((f) => (
                <circle key={f} cx={CX + f * (L / 2) * SCALE} cy={CY} r="3.2" fill="#fff" opacity="0.55" />
              ))}
              {revealed && (
                <>
                  <line x1={CX - (L / 2) * SCALE} y1={CY} x2={CX + (L / 2) * SCALE} y2={CY} stroke="#7c2d12" strokeWidth="2" />
                  <line x1={CX} y1={CY - (W / 2) * SCALE} x2={CX} y2={CY + (W / 2) * SCALE} stroke="#7c2d12" strokeWidth="2" strokeDasharray="3 3" />
                </>
              )}
            </g>

            {/* le capteur du sous-marin (l'« image ») + la barre = largeur filmée */}
            <line x1={S1.x} y1={S1.y} x2={S2.x} y2={S2.y} stroke={CYAN} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            <line x1={B1.x} y1={B1.y} x2={B2.x} y2={B2.y} stroke={CYAN} strokeWidth="6" strokeLinecap="round" />

            {/* le sous-marin */}
            <g transform={`translate(${sub.x} ${sub.y}) rotate(${subAngle})`}>
              <ellipse cx="0" cy="0" rx="20" ry="11" fill={SOUS} />
              <circle cx="6" cy="0" r="4.5" fill="#fde047" />
              <rect x="-4" y="-16" width="8" height="8" rx="2" fill={SOUS} />
              <path d="M -20 0 L -30 -7 L -30 7 Z" fill={SOUS} />
            </g>

            {/* la lecture de la largeur filmée, près du capteur */}
            <text
              x={sub.x + 26 * p.x}
              y={sub.y + 26 * p.y}
              fontSize={modeClasse ? 20 : 15}
              fontWeight={800}
              fill={LAGON}
              textAnchor="middle"
            >
              {Math.round(wNow)} cm
            </text>

            {/* la barre d'échelle (le laser) */}
            <g>
              <line x1="30" y1={VBH - 24} x2={30 + 20 * SCALE} y2={VBH - 24} stroke={LAGON} strokeWidth="3" />
              <line x1="30" y1={VBH - 28} x2="30" y2={VBH - 20} stroke={LAGON} strokeWidth="3" />
              <line x1={30 + 20 * SCALE} y1={VBH - 28} x2={30 + 20 * SCALE} y2={VBH - 20} stroke={LAGON} strokeWidth="3" />
              <text x={30 + 10 * SCALE} y={VBH - 32} fontSize={fLabel} fontWeight={700} fill={LAGON} textAnchor="middle">
                20 cm (laser)
              </text>
            </g>
          </svg>

          {/* LE RÉSULTAT : les compteurs */}
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded border p-2 text-center" style={{ borderColor: "#b6e3ec" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4a8a99" }}>Angle de vue</p>
              <p className={`font-black ${grand}`} style={{ color: LAGON }}>
                {Math.round(phi)}<span className="text-[11px] font-bold" style={{ color: "#7fb3c0" }}> °</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#b6e3ec" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4a8a99" }}>Largeur filmée</p>
              <p className={`font-black ${grand}`} style={{ color: CYAN }}>
                {Math.round(wNow)}<span className="text-[11px] font-bold" style={{ color: "#7fb3c0" }}> cm</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#b6e3ec", backgroundColor: "#f0fdf4" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4a8a99" }}>Longueur (max)</p>
              <p className={`font-black ${grand}`} style={{ color: "#0f766e" }}>
                {Math.round(maxSeen)}<span className="text-[11px] font-bold" style={{ color: "#7fb3c0" }}> cm</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#b6e3ec", backgroundColor: "#fff7ed" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4a8a99" }}>Largeur (min)</p>
              <p className={`font-black ${grand}`} style={{ color: "#c2410c" }}>
                {Math.round(minSeen)}<span className="text-[11px] font-bold" style={{ color: "#7fb3c0" }}> cm</span>
              </p>
            </div>
          </div>

          <p className="mt-2 text-center text-[13.5px] font-bold" style={{ color: verdict.couleur }}>
            {verdict.texte}
          </p>

          {/* LE RÉGLAGE : l'angle de vue + les actions */}
          <div className="mt-2 flex flex-wrap items-center gap-3 border-t pt-3" style={{ borderColor: "#d4eef3" }}>
            <label htmlFor="angle" className="flex flex-1 items-center gap-3 text-sm font-black" style={{ color: LAGON }}>
              Angle de vue
              <input
                id="angle"
                type="range"
                min={0}
                max={359}
                step={1}
                value={phi}
                onChange={(e) => reglerAngle(parseInt(e.target.value, 10))}
                className="h-2 flex-1 cursor-pointer"
                style={{ accentColor: CORAIL }}
              />
              <span className="w-10 text-right font-mono">{Math.round(phi)}°</span>
            </label>
            <button
              type="button"
              onClick={faireLeTour}
              className="rounded px-4 py-2 text-sm font-black text-white hover:brightness-110"
              style={{ backgroundColor: LAGON }}
            >
              🔦 Faire le tour
            </button>
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              className="rounded border px-3 py-2 text-sm font-bold hover:brightness-95"
              style={{ borderColor: "#b6e3ec", backgroundColor: "#eefbfd", color: LAGON }}
            >
              {revealed ? "🙈 Cacher" : "👁️ Révéler"}
            </button>
            <button
              type="button"
              onClick={nouveauCorail}
              className="rounded border px-3 py-2 text-sm font-bold hover:brightness-95"
              style={{ borderColor: "#f4c9b8", backgroundColor: "#fff7ed", color: "#c2410c" }}
            >
              🪸 Nouveau corail
            </button>
          </div>

          <p className="mt-2 rounded border px-3 py-2 text-[12.5px]" style={{ borderColor: "#d4eef3", backgroundColor: "#f5fdff", color: "#3f7683" }}>
            <span className="font-mono font-bold" style={{ color: LAGON }}>w(φ) = 2·√( A²·sin²(θ−φ) + B²·cos²(θ−φ) )</span>{" "}
            — la <b>largeur filmée</b> selon l&apos;angle. Son <b>maximum</b> = la longueur (2A), son{" "}
            <b>minimum</b> = la largeur (2B). Le laser du sous-marin donne l&apos;<b>échelle</b> (des pixels aux
            centimètres), sans quoi une projection reste ambiguë.
          </p>
        </div>

        {/* ── CE QUE DIT HONG WANG ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#b6e3ec", backgroundColor: "#eefbfd", color: "#134e5a" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: CYAN }}>
            Ce que dit Hong Wang — voir sous toutes les directions
          </p>
          <p className="mt-2">
            Une photo, c&apos;est une <b>projection</b> : le corail en 3D devient une simple largeur à l&apos;écran.
            Le problème&nbsp;: cette largeur <b>dépend de l&apos;angle</b>. Un corail <i>court vu de côté</i> et un
            corail <i>long vu presque dans son axe</i> donnent la <b>même</b> image — une seule photo est{" "}
            <b>ambiguë</b>.
          </p>
          <p className="mt-2 rounded border border-dashed px-3 py-2 font-mono text-[13px]" style={{ borderColor: CYAN + "66", color: LAGON }}>
            la vraie longueur = la plus grande largeur vue, sur toutes les directions
          </p>
          <p className="mt-2">
            La sortie&nbsp;: <b>regarder sous toutes les directions</b>. En tournant tout autour, la caméra finit
            par voir le corail <b>en entier</b> (de profil)&nbsp;: cette <b>plus grande</b> largeur est sa longueur ;
            la <b>plus petite</b> (vue bout par bout) est sa largeur. Ce geste — <b>projeter dans toutes les
            directions puis recoller</b> — est exactement celui au cœur de la preuve de la{" "}
            <b>conjecture de Kakeya</b>, démontrée en 2025 par <b>Hong Wang</b> et Joshua Zahl. La conjecture est{" "}
            <b>fermée</b> ; l&apos;idée, elle, tient dans un lagon.
          </p>
        </div>

        {/* ── POURQUOI UNE SEULE PHOTO NE SUFFIT PAS ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#b6e3ec", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: CYAN }}>
            Pourquoi une seule photo ne suffit pas — et pourquoi le laser est indispensable
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              🌀 <b>L&apos;ambiguïté.</b> Vu dans son axe (φ = θ), un corail-segment « disparaît » (w = 0) ; vu de
              travers, il s&apos;étale. Un seul cliché ne permet pas de démêler <i>longueur</i> et <i>angle</i>.
            </li>
            <li>
              🔦 <b>Le tour complet.</b> Plusieurs directions lèvent l&apos;ambiguïté&nbsp;: c&apos;est de la{" "}
              <b>tomographie</b>. Le maximum donne la longueur, le minimum la largeur — deux mesures pour le prix
              d&apos;un tour.
            </li>
            <li>
              📏 <b>La référence d&apos;échelle.</b> L&apos;image donne des <i>pixels</i>, pas des <i>centimètres</i>.
              Le <b>laser</b> du sous-marin (une longueur connue dans le cadre) convertit l&apos;un en l&apos;autre —
              sans lui, on ne mesure rien.
            </li>
          </ul>
          <p className="mt-2 text-[12.5px]" style={{ color: "#4a8a99" }}>
            La même idée sert au recensement des coraux et des oursins du lagon (science citoyenne), à
            l&apos;imagerie médicale (le scanner tourne autour du corps) et à la vision par ordinateur.
          </p>
        </div>

        {/* ── LES DÉFIS ── */}
        <DefisSimulateur
          titre="Les défis du lagon — du CP à la Terminale"
          coupDePouce="Coup de pouce : règle l'angle et lis la largeur filmée ; fais le tour et lis la plus grande largeur — la machine vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* ── LES PONTS ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/Ax6irc6WFh0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: "#c81e1e" }}
          >
            🌍 Watch the video (2 min, English)
          </a>
          <Link
            href="/aiguille-de-kakeya"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: CORAIL }}
          >
            🪡 L&apos;aiguille de Kakeya — l&apos;idée de Hong Wang en jeu
          </Link>
          <Link
            href="/diagonale-des-fous"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#b6e3ec", backgroundColor: "#eefbfd", color: "#134e5a" }}
          >
            🏃 La Diagonale des Fous — doser sa course
          </Link>
        </div>

        {/* ── L'HONNÊTETÉ ── */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#b6e3ec", color: "#4a8a99" }}>
          Machine pédagogique&nbsp;: le corail est modélisé par une ellipse et la caméra par une projection
          orthographique (pas de perspective), pour que la largeur filmée soit exactement w(φ). Un vrai
          recensement de coraux combine plusieurs vues <i>et</i> une référence d&apos;échelle, exactement pour la
          raison montrée ici — une seule projection est ambiguë. Le lien avec la conjecture de Kakeya (démontrée
          en 2025 par Hong Wang et Joshua Zahl) est une image&nbsp;: «&nbsp;regarder dans toutes les directions&nbsp;»
          ; la preuve, elle, est un théorème de mathématiques.
        </p>
      </div>
    </main>
  );
}
