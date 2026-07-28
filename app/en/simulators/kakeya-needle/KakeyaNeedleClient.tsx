"use client";

// "The Kakeya needle" (Hong Wang, 2026 Fields Medal) — English showcase page.
// English twin of app/aiguille-de-kakeya/AiguilleDeKakeyaClient.tsx: the SAME
// machine (geometry, canvas, maths untouched), with English text and English
// decimals (period, not comma). The Kakeya problem (1917): turn a needle a full
// HALF-TURN while sweeping the least area. Three methods, area halved each time:
// π/2 (around the tip) → π/4 (around the center) → π/8 (the deltoid)… and
// Besicovitch showed you can approach 0. Hong Wang (with Joshua Zahl, 2025)
// closed the 3D version — hence the medal, awarded on 23 July 2026.
//
// Constraint (Frédéric): IMAGE (the needle) + SETTING (the method) + RESULT
// (the swept area) fit on ONE screen. The rest (the theorem, her blackboard
// decoded, her words, the challenges) unrolls below.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
  type LabelsDefis,
} from "@/components/simulateurs/DefisSimulateur";

const ENCRE = "#1f3a67"; // the blue ink — the paper of her blackboard
const OR = "#c8962a"; // the markers (the journal's convention)
const ROUGE = "#c2352b"; // the needle
const PEINT = "#f3c9c2"; // the area already swept
const SOUS = "#5f7396"; // captions
const BORD = "#ccd9ec";
const TEXTE = "#243a5e";

const COULEURS_DEFIS: CouleursDefis = {
  fond: "#f4f7fc",
  fondProfond: "#e8eef8",
  bord: "#c5d4ea",
  accent: ENCRE,
  texte: TEXTE,
  sousTexte: SOUS,
  ok: "#1a7f37",
  rate: "#b3261e",
};

// The English labels for the challenge cards (the French component defaults to FR).
const LABELS_DEFIS: Partial<LabelsDefis> = {
  defi: "Challenge",
  placeholder: "Your answer",
  ariaReponse: "Answer to challenge",
  ariaEn: "in",
  verifier: "Check",
  bon: "That's it.",
  rate: "Not yet — hint:",
  voirCalcul: "See the working",
};

// The age 6 → 18 ramp: the SAME question ("how much room for a half-turn?"), a
// tool that grows — from addition to the limit of a geometric sequence. One
// numeric answer per card, stable id. (Ids kept identical to the French page so
// results stay comparable across languages.)
const DEFIS: DefiSimulateur[] = [
  {
    id: "kakeya-cp-diametre",
    question:
      "Ages 6–7 — The needle is 1 metre long. When it spins around its tip, it draws a circle as wide as TWO needles laid end to end. How many metres wide is that circle?",
    reponse: 2,
    unite: "m",
    indice: "One needle, then one more needle: 1 + 1.",
    calcul: "1 + 1 = 2 m — that's the diameter of the circle.",
  },
  {
    id: "kakeya-ce2-demitour",
    question:
      "Ages 8–9 — A full turn is 360 degrees. A HALF-turn, like the needle's, is how many degrees?",
    reponse: 180,
    unite: "°",
    indice: "Half of 360: work out 360 ÷ 2.",
    calcul: "360 ÷ 2 = 180° — the half-turn the needle makes in the machine.",
  },
  {
    id: "kakeya-cm2-moitie",
    question:
      "Age 10 — Around the tip, the needle sweeps an area of 1.57. Around the center, it sweeps HALF as much. What area?",
    reponse: 0.785,
    unite: "",
    indice: "Work out 1.57 ÷ 2.",
    calcul: "1.57 ÷ 2 ≈ 0.79 — each trick halves the area.",
    tolerance: 0.02,
  },
  {
    id: "kakeya-6e-pourcent",
    question:
      "Ages 11–12 — From the disc (area 0.79) to the deltoid (area 0.39), the swept area drops by roughly what PERCENTAGE?",
    reponse: 50,
    unite: "%",
    indice: "0.39 is about half of 0.79.",
    calcul: "0.39 ÷ 0.79 ≈ 0.5: half is left — a drop of about 50%.",
    tolerance: 2,
  },
  {
    id: "kakeya-4e-aire",
    question:
      "Ages 13–14 — The 1 m needle spins around its center: it sweeps a disc of radius 0.5 m. Area of a disc: π × r². Work out this area (rounded to two decimals).",
    reponse: 0.79,
    unite: "m²",
    indice: "π × 0.5² = π × 0.25.",
    calcul: "π × 0.25 ≈ 0.785 ≈ 0.79 m² — the π/4 shown by the machine.",
    tolerance: 0.01,
  },
  {
    id: "kakeya-2nde-tiroirs",
    question:
      "Age 15 — The pigeonhole principle from her blackboard: 18 shadows fall into 5 boxes. The fullest box holds AT LEAST how many shadows?",
    reponse: 4,
    unite: "shadows",
    indice: "18 ÷ 5 = 3.6 — and round up. Why?",
    calcul:
      "If every box held at most 3 shadows, there would be at most 5 × 3 = 15. But there are 18: one box holds at least 4. That's the pigeonhole that picks F′ ⊆ F.",
  },
  {
    id: "kakeya-1re-ruses",
    question:
      "Age 16 — With each trick, the area is halved starting from 1.57. How many tricks to drop BELOW 0.01?",
    reponse: 8,
    unite: "tricks",
    indice: "1.57; 0.785; 0.39… a geometric sequence with ratio ½ — count the steps.",
    calcul: "1.57 ÷ 2⁷ ≈ 0.012 (not yet); 1.57 ÷ 2⁸ ≈ 0.006 < 0.01 → 8 tricks.",
  },
  {
    id: "kakeya-term-limite",
    question:
      "Ages 17–18 — After n tricks the area is 1.57 × (½)ⁿ. What is the limit of this sequence as n tends to +∞?",
    reponse: 0,
    unite: "",
    indice: "What happens to (½)ⁿ as n grows without end?",
    calcul:
      "(½)ⁿ → 0, so the area → 0: you can turn around in an area as small as you like (Besicovitch, 1928). And yet — Hong Wang and Joshua Zahl, 2025 — in 3D the set must still have dimension 3.",
    tolerance: 0.1,
  },
];

// ── The machine: geometry ─────────────────────────────────────────────────────
const VBW = 1000;
const VBH = 300;
const NL = 170; // needle length (px) = 1 "needle"
const STEPS = 160; // positions drawn for one half-turn

type Mode = "bout" | "centre" | "deltoide";

const MODES: { id: Mode; nom: string; formule: string; aire: string }[] = [
  { id: "bout", nom: "1 · Around the tip", formule: "π/2", aire: "1.57" },
  { id: "centre", nom: "2 · Around the center", formule: "π/4", aire: "0.79" },
  { id: "deltoide", nom: "3 · The deltoid trick", formule: "π/8", aire: "0.39" },
];

// The deltoid: Q(s) = r·(2cos s + cos 2s, 2sin s − sin 2s). The needle is the
// tangent chord, of constant length 4r — its ends slide along the curve as it
// turns 180°. Here 4r = NL, centered at (cx, cy).
const DELT = { cx: 500, cy: 150, r: NL / 4 };
function deltPoint(s: number): [number, number] {
  return [
    DELT.cx + DELT.r * (2 * Math.cos(s) + Math.cos(2 * s)),
    DELT.cy + DELT.r * (2 * Math.sin(s) - Math.sin(2 * s)),
  ];
}
// The needle at "time" t ∈ [0, 2π]: its two ends on the curve.
function aiguilleDeltoide(t: number): [[number, number], [number, number]] {
  return [deltPoint(-t / 2), deltPoint(-t / 2 + Math.PI)];
}
function aiguilleBout(a: number): [[number, number], [number, number]] {
  // pivot: the left end; the other end rises from 0 to 180°
  const px = 415;
  const py = 235;
  return [
    [px, py],
    [px + NL * Math.cos(a), py - NL * Math.sin(a)],
  ];
}
function aiguilleCentre(a: number): [[number, number], [number, number]] {
  const cx = 500;
  const cy = 150;
  const dx = (NL / 2) * Math.cos(a);
  const dy = (NL / 2) * Math.sin(a);
  return [
    [cx - dx, cy + dy],
    [cx + dx, cy - dy],
  ];
}
function aiguilleAt(mode: Mode, t: number): [[number, number], [number, number]] {
  if (mode === "bout") return aiguilleBout(t);
  if (mode === "centre") return aiguilleCentre(t);
  return aiguilleDeltoide(t);
}
const T_MAX: Record<Mode, number> = { bout: Math.PI, centre: Math.PI, deltoide: 2 * Math.PI };
// Net rotation of the needle (0 → 180°), whatever the path.
function degres(mode: Mode, t: number) {
  return Math.round((t / T_MAX[mode]) * 180);
}

// The dashed outlines: the zone each method is going to paint.
const CONTOURS: Record<Mode, string> = {
  bout: `M 415 235 L ${415 + NL} 235 A ${NL} ${NL} 0 0 0 ${415 - NL} 235 L 415 235`,
  centre: (() => {
    const r = NL / 2;
    return `M ${500 - r} 150 A ${r} ${r} 0 1 0 ${500 + r} 150 A ${r} ${r} 0 1 0 ${500 - r} 150`;
  })(),
  deltoide: (() => {
    let d = "";
    for (let i = 0; i <= 90; i++) {
      const [x, y] = deltPoint((i / 90) * 2 * Math.PI);
      d += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d + "Z";
  })(),
};

// ── "The shadow and the boxes": her interview blackboard, made playable ───────
// E: the points. π̃: we project them (in the direction YOU set) onto the line L
// at the bottom. F: their shadows. F′: the fullest box — the drawer the
// "pigeonhole" picks. Two alignments are hidden in E: five points at +20°, four
// points at −25° — only the right projection reveals them.
const AXE_Y = 290;
const BOITE_X0 = 57;
const BOITE_W = 63;
const NB_BOITES = 14;
const POINTS_E: [number, number][] = [
  // five aligned points (they gather at +20°)
  [476.3, 60], [492.7, 105], [509, 150], [525.4, 195], [541.8, 240],
  // four aligned points (they gather at −25°)
  [342.6, 70], [316.9, 125], [291.3, 180], [265.6, 235],
  // the rest of the cloud
  [100, 80], [160, 220], [700, 90], [760, 200], [840, 120],
  [640, 250], [120, 140], [880, 240], [390, 260],
];

function OmbresEtTiroirs() {
  const [angle, setAngle] = useState(0);
  const [cinqTrouve, setCinqTrouve] = useState(false);
  const [quatreTrouve, setQuatreTrouve] = useState(false);

  const { ombres, compte, meilleure, max } = useMemo(() => {
    const tan = Math.tan((angle * Math.PI) / 180);
    const ombres = POINTS_E.map(([x, y]) => {
      const xp = Math.min(939, Math.max(61, x + tan * (AXE_Y - y)));
      const boite = Math.min(NB_BOITES - 1, Math.max(0, Math.floor((xp - BOITE_X0) / BOITE_W)));
      return { xp, boite };
    });
    const compte = Array.from({ length: NB_BOITES }, () => 0);
    for (const o of ombres) compte[o.boite]++;
    let meilleure = 0;
    for (let i = 1; i < NB_BOITES; i++) if (compte[i] > compte[meilleure]) meilleure = i;
    return { ombres, compte, meilleure, max: compte[meilleure] };
  }, [angle]);

  useEffect(() => {
    if (max >= 5) setCinqTrouve(true);
    if (angle < -10 && max >= 4) setQuatreTrouve(true);
  }, [angle, max]);

  return (
    <div className="mt-3 rounded border p-3" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
      <svg
        viewBox="0 0 1000 345"
        className="w-full"
        role="img"
        aria-label={`A cloud of 18 points E is projected onto the line L at an adjustable angle (${angle}°). The shadows F fall into boxes; the fullest box, F prime, holds ${max} shadows.`}
      >
        {/* the boxes (the drawers) and how full they are */}
        {compte.map((n, i) => {
          const x = BOITE_X0 + i * BOITE_W;
          const pleine = i === meilleure && n > 0;
          return (
            <g key={i}>
              {pleine && <rect x={x} y={60} width={BOITE_W} height={AXE_Y - 60} fill={OR} opacity="0.12" />}
              <rect
                x={x + 3}
                y={AXE_Y + 6}
                width={BOITE_W - 6}
                height={Math.max(2, n * 8)}
                fill={pleine ? ROUGE : "#b9c7e2"}
                rx="2"
              />
              <line x1={x} y1={AXE_Y - 4} x2={x} y2={AXE_Y + 4} stroke="#8ba0c4" strokeWidth="1" />
            </g>
          );
        })}
        {/* the line L (the screen that catches the shadows) */}
        <line x1={40} y1={AXE_Y} x2={955} y2={AXE_Y} stroke={ENCRE} strokeWidth="2" />
        <text x={962} y={AXE_Y + 5} fontSize="17" fontWeight={800} fill={ENCRE}>L</text>
        {/* the projection rays, then the points and their shadows */}
        {ombres.map((o, i) => {
          const [x, y] = POINTS_E[i];
          const fort = o.boite === meilleure;
          return (
            <g key={i}>
              <line
                x1={x} y1={y} x2={o.xp} y2={AXE_Y}
                stroke={fort ? ROUGE : "#b9c7e2"}
                strokeWidth={fort ? 1.8 : 1}
                opacity={fort ? 0.9 : 0.45}
              />
              <circle cx={x} cy={y} r="4.5" fill={fort ? ROUGE : ENCRE} />
              <circle cx={o.xp} cy={AXE_Y} r="3.5" fill={fort ? ROUGE : "#8ba0c4"} />
            </g>
          );
        })}
        {/* the labels from her blackboard */}
        <text x={40} y={30} fontSize="15" fontWeight={800} fill={ENCRE}>E — the points</text>
        <text x={40} y={AXE_Y + 40} fontSize="13" fill={SOUS}>F = the shadows on L, sorted into boxes</text>
        <text
          x={BOITE_X0 + meilleure * BOITE_W + BOITE_W / 2}
          y={52}
          textAnchor="middle"
          fontSize="15"
          fontWeight={800}
          fill={ROUGE}
        >
          F′
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-3 border-t pt-3" style={{ borderColor: "#e2e9f4" }}>
        <label htmlFor="angle-projection" className="flex flex-1 items-center gap-3 text-sm font-black" style={{ color: ENCRE }}>
          Projection angle
          <input
            id="angle-projection"
            type="range"
            min={-45}
            max={45}
            step={1}
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value, 10))}
            className="h-2 flex-1 cursor-pointer"
            style={{ accentColor: ROUGE }}
          />
          <span className="w-10 text-right font-mono">{angle}°</span>
        </label>
        <p className="text-[13px] font-bold" style={{ color: max >= 5 ? "#1a7f37" : TEXTE }}>
          Fullest box: {max} shadow{max > 1 ? "s" : ""}
        </p>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-[12px] font-semibold">
        <span
          className="rounded border px-2.5 py-1"
          style={{
            borderColor: cinqTrouve ? "#1a7f37" : BORD,
            color: cinqTrouve ? "#1a7f37" : SOUS,
            backgroundColor: cinqTrouve ? "#eaf6ee" : "#f4f7fc",
          }}
        >
          {cinqTrouve ? "✅ Found: 5 shadows in one box — 5 points were aligned!" : "🔎 Challenge: get 5 shadows into the SAME box"}
        </span>
        <span
          className="rounded border px-2.5 py-1"
          style={{
            borderColor: quatreTrouve ? "#1a7f37" : BORD,
            color: quatreTrouve ? "#1a7f37" : SOUS,
            backgroundColor: quatreTrouve ? "#eaf6ee" : "#f4f7fc",
          }}
        >
          {quatreTrouve ? "✅ Found: the hidden alignment on the negative angles!" : "🔎 Bonus challenge: another alignment hides on the negative-angle side"}
        </span>
      </div>
    </div>
  );
}

// ── The page ──────────────────────────────────────────────────────────────────
export default function KakeyaNeedleClient() {
  const [mode, setMode] = useState<Mode>("bout");
  const [enCours, setEnCours] = useState(false);
  const [t, setT] = useState(0);
  const [faits, setFaits] = useState<Mode[]>([]);
  const [trail, setTrail] = useState("");
  const [modeClasse, setModeClasse] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tRef = useRef(0);
  const trailRef = useRef("");

  useEffect(() => {
    setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      return !v;
    });
  };

  const stop = () => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  useEffect(() => () => stop(), []);

  const reset = (m: Mode) => {
    stop();
    setEnCours(false);
    setMode(m);
    tRef.current = 0;
    trailRef.current = "";
    setT(0);
    setTrail("");
  };

  // The half-turn, drawn step by step: on each tick we add a few needle
  // positions to the trail — the union of the positions IS the swept area.
  const tourner = () => {
    stop();
    tRef.current = 0;
    trailRef.current = "";
    setEnCours(true);
    const tmax = T_MAX[mode];
    const dt = tmax / STEPS;
    timerRef.current = setInterval(() => {
      for (let i = 0; i < 2 && tRef.current < tmax; i++) {
        tRef.current = Math.min(tmax, tRef.current + dt);
        const [[ax, ay], [bx, by]] = aiguilleAt(mode, tRef.current);
        trailRef.current += `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)} `;
      }
      setT(tRef.current);
      setTrail(trailRef.current);
      if (tRef.current >= tmax) {
        stop();
        setEnCours(false);
        setFaits((f) => (f.includes(mode) ? f : [...f, mode]));
      }
    }, 30);
  };

  const deg = degres(mode, t);
  const fini = !enCours && t >= T_MAX[mode];
  const infoMode = MODES.find((m) => m.id === mode)!;
  const [[ax, ay], [bx, by]] = aiguilleAt(mode, t);

  const verdict = (() => {
    if (enCours) return { texte: `The needle is turning… ${deg}° / 180°`, couleur: SOUS };
    if (!fini)
      return {
        texte: "Pick a method, then \"Turn!\" — the goal: make a half-turn while sweeping the LEAST area possible.",
        couleur: "#3d5074",
      };
    if (mode === "bout")
      return { texte: `Half-turn done — swept area: ${infoMode.aire} (${infoMode.formule}). A whole half-disc… we can do better.`, couleur: "#1a7f37" };
    if (mode === "centre")
      return { texte: `Half-turn done — swept area: ${infoMode.aire} (${infoMode.formule}). Half as much as around the tip!`, couleur: "#1a7f37" };
    return {
      texte: `Half-turn done — swept area: ${infoMode.aire} (${infoMode.formule}). Halved again. And mathematicians know how to keep going…`,
      couleur: "#1a7f37",
    };
  })();

  const grand = modeClasse ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl";

  return (
    <main
      className="min-h-screen pb-14"
      style={{
        backgroundColor: "#fbfcfe",
        backgroundImage:
          "linear-gradient(#ccd8ee30 1px, transparent 1px), linear-gradient(90deg, #ccd8ee30 1px, transparent 1px)",
        backgroundSize: "25px 25px",
        color: TEXTE,
      }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: OR }}>
          A little maths · The teacher's column
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: ENCRE }}>
          The Kakeya needle
        </h1>
        <p className="mt-1 text-lg font-black" style={{ color: OR }}>
          Hong Wang, 2026 Fields Medal — the world&apos;s most economical U-turn
        </p>
        <p className="text-[12.5px]" style={{ color: SOUS }}>
          A problem posed by Sōichi Kakeya in 1917 — whose great conjecture Hong Wang has just closed.
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[12px] font-bold">
          <span className="rounded-full border px-2.5 py-1" style={{ borderColor: OR + "66", backgroundColor: "#fdf6e8", color: "#8a6516" }}>
            🏅 3rd woman in history to receive the Fields Medal
          </span>
          <span className="rounded-full border px-2.5 py-1" style={{ borderColor: BORD, backgroundColor: "#f4f7fc", color: ENCRE }}>
            虹 «&nbsp;Hong&nbsp;», her given name, means «&nbsp;rainbow&nbsp;»
          </span>
        </p>
        <p className="mt-1 text-[13px]" style={{ color: SOUS }}>
          Turn a needle a full half-turn while sweeping the smallest possible area — the problem born in
          1917, whose great conjecture she has just closed in 3D.{" "}
          <a
            href="https://www.youtube.com/watch?v=LYzeUAWwinQ"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:underline"
            style={{ color: "#c81e1e" }}
          >
            ▶ watch the interview (1 min)
          </a>
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href="https://youtu.be/3Xb55Tl_S-Y"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-black text-white hover:brightness-110"
            style={{ backgroundColor: "#c81e1e" }}
          >
            ▶ Watch the video — the needle, the theorem and the volcano (2 min)
          </a>
          <Link
            href="/aiguille-de-kakeya"
            className="text-[13px] font-bold hover:underline"
            style={{ color: ENCRE }}
          >
            🌐 Lire en français →
          </Link>
        </div>

        {/* ── THE MACHINE: image + setting + result, on one screen ── */}
        <div className="mt-3 rounded border p-3 sm:p-4" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
              The needle problem — three methods, the area halved with each trick
            </p>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: BORD, color: SOUS }}
            >
              {modeClasse ? "🖥️ classroom mode: ON" : "🖥️ classroom mode"}
            </button>
          </div>

          {/* THE IMAGE: the zone to paint, the swept area, the needle */}
          <svg
            viewBox={`0 0 ${VBW} ${VBH}`}
            className="mt-2 w-full"
            role="img"
            aria-label={`The needle makes a half-turn (${deg}° out of 180°) using the "${infoMode.nom}" method; the area already swept is painted light red. Total area for this method: ${infoMode.aire}, i.e. ${infoMode.formule}.`}
          >
            <path d={CONTOURS[mode]} fill="none" stroke={ENCRE} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.45" />
            {trail !== "" && (
              <path d={trail} fill="none" stroke={PEINT} strokeWidth="8" strokeLinecap="round" />
            )}
            <line x1={ax} y1={ay} x2={bx} y2={by} stroke={ROUGE} strokeWidth="5" strokeLinecap="round" />
            <circle cx={ax} cy={ay} r="4" fill={ROUGE} />
            <circle cx={bx} cy={by} r="4" fill={ROUGE} />
            <text x={20} y={VBH - 14} fontSize={modeClasse ? 17 : 13} fill="#8ba0c4">
              1 needle = 1 unit — areas are in «&nbsp;needles²&nbsp;»
            </text>
          </svg>

          {/* THE RESULT: the counters */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>Rotation</p>
              <p className={`font-black ${grand}`} style={{ color: ENCRE }}>
                {deg}
                <span className="text-[11px] font-bold" style={{ color: "#8ba0c4" }}> / 180°</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>Swept area</p>
              <p className={`font-black ${grand}`} style={{ color: fini ? ROUGE : "#8ba0c4" }}>
                {fini ? infoMode.aire : "…"}
                {fini && <span className="text-[11px] font-bold" style={{ color: "#8ba0c4" }}> ({infoMode.formule})</span>}
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>The maths record</p>
              <p className={`font-black ${grand}`} style={{ color: ENCRE }}>
                ≈ 0
                <span className="text-[11px] font-bold" style={{ color: "#8ba0c4" }}> (Besicovitch)</span>
              </p>
            </div>
          </div>

          <p className="mt-2 text-center text-[13.5px] font-bold" style={{ color: verdict.couleur }}>
            {verdict.texte}
          </p>

          {/* THE SETTING: the method + the start */}
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t pt-3" style={{ borderColor: "#e2e9f4" }}>
            {MODES.map((m) => {
              const actif = mode === m.id;
              const dejaFait = faits.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => reset(m.id)}
                  className="rounded border px-3 py-1.5 text-[12px] font-bold"
                  style={{
                    borderColor: actif ? ENCRE : BORD,
                    backgroundColor: actif ? ENCRE : "#f4f7fc",
                    color: actif ? "#f4f7fc" : TEXTE,
                  }}
                >
                  {m.nom} — {m.formule} ≈ {m.aire} {dejaFait ? "✓" : ""}
                </button>
              );
            })}
            <button
              type="button"
              onClick={tourner}
              disabled={enCours}
              className="ml-auto rounded px-5 py-2 text-sm font-black text-white hover:brightness-110 disabled:opacity-60"
              style={{ backgroundColor: ROUGE }}
            >
              {enCours ? "Turning…" : fini ? "Turn back!" : "Turn!"}
            </button>
          </div>

          <p className="mt-2 rounded border px-3 py-2 text-[12.5px]" style={{ borderColor: "#e2e9f4", backgroundColor: "#f7f9fd", color: "#3d5074" }}>
            <span className="font-mono font-bold" style={{ color: ENCRE }}>area of a disc = π · r²</span>{" "}
            — around the center, the radius is ½ a needle: π × 0.25 ≈ 0.79. The three-cusped deltoid halves
            it again (π/8). Each trick divides the area by 2: <b>how far down can we go?</b>
          </p>
        </div>

        {/* ── HOW FAR DOWN CAN WE GO? THE THEOREM ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#c5d4ea", backgroundColor: "#f4f7fc", color: TEXTE }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            How far down can we go? — a century of suspense
          </p>
          <p className="mt-2">
            In 1917, the Japanese mathematician Sōichi Kakeya asked the question of the most economical
            half-turn. In 1928, Abram Besicovitch stunned everyone&nbsp;: <b>there is no floor</b>. With
            enough tricks (finer and finer zigzag back-and-forths), you can turn around in an area smaller
            than any threshold — 0.01, 0.000&nbsp;001, as close to zero as you like.
          </p>
          <p className="mt-2">
            The real riddle remained, in three dimensions&nbsp;: can a set that contains a needle{" "}
            <b>in every direction</b> be a «&nbsp;dust&nbsp;», a ghostly object with almost no thickness&nbsp;?
            The <b>dimension</b> measures how much an object fills space&nbsp;: a line lives in dimension 1,
            a sheet in dimension 2, and some fractal objects slip in between. In 2025, <b>Hong Wang and
            Joshua Zahl</b> closed the question, open for a century&nbsp;: no — such a set may well have tiny
            volume, yet it is <b>necessarily of dimension 3</b>. A proof over a hundred pages long, hailed as
            one of the great results of the century. On 23 July 2026, at the opening of the International
            Congress of Mathematicians (ICM) in Philadelphia, Hong Wang received the <b>Fields Medal</b> —
            mathematics&apos; highest honour, awarded every four years to mathematicians under 40.
          </p>
        </div>

        {/* ── THE CENTRAL QUESTION (Frédéric, 27/07) ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            The central question — can you turn around without being seen?
          </p>
          <p className="mt-2">
            <b>Almost.</b> What melts toward 0 is the <b>trace</b> — the surface repainted by the needle&apos;s
            passage. With enough tricks, the half-turn repaints less than a stamp, less than a speck of
            dust&nbsp;: it becomes almost invisible… to area.
          </p>
          <p className="mt-2">
            <b>But never entirely.</b> The area approaches 0 without ever reaching it — and the finer the
            trace, the more wildly the motion zigzags. Discretion is paid for in contortions.
          </p>
          <p className="mt-2">
            <b>And that&apos;s where she comes in.</b> Even «&nbsp;invisible to area&nbsp;», the object does
            not disappear&nbsp;: its dimension stays full — that is Hong Wang&apos;s theorem. <b>You can hide
            from area. Not from dimension.</b> What you don&apos;t see from one angle is revealed when you
            change your point of view.
          </p>
        </div>

        {/* ── HER BLACKBOARD, DECODED ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Her blackboard, decoded — project, then sort into boxes
          </p>
          <p className="mt-2">
            In the interview, you can glimpse a sheet of her work&nbsp;: a cloud of points, a line, and three
            lines of notation. Here is what they say — it&apos;s the favourite move of her proofs&nbsp;:
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>
              <span className="font-mono font-bold" style={{ color: ENCRE }}>L = π̃(T)</span> — π̃ is a{" "}
              <b>projection</b>&nbsp;: you flatten the figure in one direction, like a shadow on the ground.
              The line L is the shadow of a tube T (a thickened needle).
            </li>
            <li>
              <span className="font-mono font-bold" style={{ color: ENCRE }}>F = π̃(π̃⁻¹(L) ∩ E)</span> — you take
              everything that projects onto L, keep the points of E that live there, and look at their{" "}
              <b>shadows</b>&nbsp;: that&apos;s F.
            </li>
            <li>
              <span className="font-mono font-bold" style={{ color: ENCRE }}>pigeonhole to choose F′ ⊆ F</span> —
              the <b>pigeonhole principle</b>&nbsp;: if many shadows spread across few boxes, one box must hold
              a lot. You pick that well-filled drawer&nbsp;: F′, a <b>piece of F</b> (F′ ⊆ F, «&nbsp;F′ included
              in F&nbsp;»), smaller but richer — and the proof carries on with it.
            </li>
          </ul>
          <p className="mt-2">
            Try it yourself&nbsp;: set the projection direction and watch the shadows sort into the boxes.
            When many shadows fall into the same box, it&apos;s no accident —{" "}
            <b>the projection has just unmasked a hidden structure</b> (aligned points). That is exactly why
            mathematicians project.
          </p>
          <OmbresEtTiroirs />
        </div>

        {/* ── WHAT SHE SAID ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#c5d4ea", backgroundColor: "#f4f7fc", color: TEXTE }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            What she said — three messages for students
          </p>
          <ul className="mt-2 space-y-2.5">
            <li>
              🎓 <b>Thank you to the teachers.</b> Trained at Peking University, then in France — at the École
              polytechnique and Orsay —, she made a point, on receiving her medal, of paying{" "}
              <b>tribute to her French teachers</b>. Behind every medal there are teachers — and behind every
              student too.
            </li>
            <li>
              ⚖️ <b>Women, men: no difference.</b> She is the <b>third woman</b> to win the Fields Medal in
              90 years (after Maryam Mirzakhani in 2014 and Maryna Viazovska in 2022), and the first Chinese
              female mathematician. In the interview she is clear&nbsp;: for her, <b>there is no difference
              between women and men</b> in mathematics. The variables that really move a proof forward are
              elsewhere&nbsp;: the work, the time, and the teachers you had — the difference of gender is an
              epsilon.
            </li>
            <li>
              ⏳ <b>The long game.</b> She speaks of «&nbsp;hard problems&nbsp;» that kept her busy{" "}
              <b>for years</b>. Nobody «&nbsp;sees&nbsp;» the solution at first glance — not even a Fields
              medallist. Searching for a long time is not a sign of weakness&nbsp;: it is the very craft of
              mathematics.
            </li>
          </ul>
          <p className="mt-3 text-[12.5px]" style={{ color: SOUS }}>
            Hong Wang (王虹), 35, born in Guilin, entered Peking University at 16, is a permanent professor at
            the IHÉS (Bures-sur-Yvette, near Paris) and a professor at New York University (Courant
            Institute).{" "}
            <a
              href="https://www.youtube.com/watch?v=LYzeUAWwinQ"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black hover:underline"
              style={{ color: "#c81e1e" }}
            >
              ▶ the interview (CGTN Français, 1 min, in French)
            </a>
          </p>
        </div>

        {/* ── THE CHALLENGES ── */}
        <DefisSimulateur
          titre="The needle challenges — from age 6 to 18"
          coupDePouce="Hint: the machine's three areas (1.57 · 0.79 · 0.39) are the key to almost every challenge."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
          labels={LABELS_DEFIS}
          masquerPont
        />

        {/* ── THE BRIDGES ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/3Xb55Tl_S-Y"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: "#c81e1e" }}
          >
            ▶ Watch in English (2 min) — the needle, the theorem and the volcano
          </a>
          <Link
            href="/aiguille-de-kakeya"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#c5d4ea", backgroundColor: "#f4f7fc", color: TEXTE }}
          >
            🌐 Lire cette page en français →
          </Link>
        </div>

        {/* ── HONESTY ── */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: BORD, color: SOUS }}>
          Teaching machine&nbsp;: the «&nbsp;painted&nbsp;» surface is the union of 160 needle positions — a
          visual approximation — but the areas shown (π/2, π/4, π/8) are the exact values of the swept
          figures. «&nbsp;You can approach 0&nbsp;» is Besicovitch&apos;s theorem (1928)&nbsp;; the 3D
          resolution is due to Hong Wang and Joshua Zahl (2025). The quoted remarks come from her interview
          with CGTN Français (July 2026)&nbsp;; the decoded blackboard is the one glimpsed in her interview,
          and the step-by-step reading — projection, shadow, boxes — is ours&nbsp;: faithful to the spirit of
          her proofs, without claiming to reconstruct the exact page.
        </p>
      </div>
    </main>
  );
}
