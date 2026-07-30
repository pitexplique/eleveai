"use client";

// "Why are soap bubbles round?" — the English showcase of the French machine
// (/pourquoi-les-bulles-sont-rondes). Same simulator, English text. A fixed
// perimeter (the same loop of string), a shape we round off: each added side
// makes the enclosed area climb. A regular n-gon of perimeter P encloses
//     A(n) = P² / ( 4·n·tan(π/n) )   and its "score" q = 4πA/P² = π/(n·tan(π/n))
// climbs toward 1 without ever passing it: the CIRCLE is the champion (q = 1).
// That's the isoperimetric inequality 4πA ≤ P². The bubble "solves" it with no
// maths — surface tension minimises energy, hence surface: a circle in 2D, a
// sphere in 3D. The childhood question of Yilin Wang (IHÉS, 2024 Salem Prize).

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
  type LabelsDefis,
} from "@/components/simulateurs/DefisSimulateur";

const BULLE = "#0284c7"; // the accent — bubble blue
const FILM = "#38bdf8"; // the soap film
const CIBLE = "#f59e0b"; // the champion circle (the target)
const ENCRE = "#0c4a6e"; // deep text

const COULEURS_DEFIS: CouleursDefis = {
  fond: "#eff9ff",
  fondProfond: "#e0f2fe",
  bord: "#bae6fd",
  accent: BULLE,
  texte: ENCRE,
  sousTexte: "#4d7f97",
  ok: "#0f766e",
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

// The age 6 → 18 ramp: the SAME idea ("same string, the round one holds most"),
// a tool that grows — from a square's perimeter to the isoperimetric score. One
// numeric answer per card, checkable on the machine. (Ids kept identical to the
// French page so results stay comparable across languages.)
const DEFIS: DefiSimulateur[] = [
  {
    id: "bulle-cp-cote",
    question:
      "Age 6–7 — Your string is 12 cm long. You shape it into a perfect square. How long is each side?",
    reponse: 3,
    unite: "cm",
    indice: "A square has 4 equal sides: 12 ÷ 4.",
    calcul: "12 ÷ 4 = 3 cm per side: the string splits into 4 equal parts.",
    tolerance: 0.1,
  },
  {
    id: "bulle-ce2-aire-carre",
    question:
      "Age 8–9 — This square is 3 cm on each side. What is its area (the space inside)?",
    reponse: 9,
    unite: "cm²",
    indice: "Area of a square = side × side: 3 × 3.",
    calcul: "3 × 3 = 9 cm²: with 12 cm of string, the square encloses 9 cm².",
    tolerance: 0.1,
  },
  {
    id: "bulle-cm1-rectangle-plat",
    question:
      "Age 9–10 — Same 12 cm string, but flattened into a 1 cm by 5 cm rectangle. What is its area?",
    reponse: 5,
    unite: "cm²",
    indice: "Area of a rectangle = length × width: 5 × 1.",
    calcul: "5 × 1 = 5 cm². The flatter the shape, the less it holds: the square (9) already does better.",
    tolerance: 0.1,
  },
  {
    id: "bulle-cm2-ecart",
    question:
      "Age 10–11 — Same string: the square encloses 9 cm², the flat rectangle 5 cm². How much more does the square hold?",
    reponse: 4,
    unite: "cm²",
    indice: "A subtraction: 9 − 5.",
    calcul: "9 − 5 = 4 cm². Same length of string, yet the square holds 4 cm² more than the flat rectangle.",
    tolerance: 0.1,
  },
  {
    id: "bulle-6e-hexagone",
    question:
      "Age 11–12 — Set the machine to 6 sides (a hexagon). What area does the string enclose? (read the machine, to 0.1)",
    reponse: 10.4,
    unite: "cm²",
    indice: "Add sides: from 4 (square) to 6. The displayed area climbs.",
    calcul: "A regular hexagon with perimeter 12 encloses ≈ 10.4 cm²: more sides = rounder = more area.",
    tolerance: 0.2,
  },
  {
    id: "bulle-5e-rayon",
    question:
      "Age 12–13 — The circle with a 12 cm perimeter has radius r = 12 ÷ (2π). Give it to 0.1.",
    reponse: 1.9,
    unite: "cm",
    indice: "A circle's perimeter = 2πr, so r = perimeter ÷ (2π) = 12 ÷ 6.28.",
    calcul: "12 ÷ (2 × 3.14) = 12 ÷ 6.28 ≈ 1.9 cm: the radius of the circle with the same string as the square.",
    tolerance: 0.15,
  },
  {
    id: "bulle-4e-aire-max",
    question:
      "Age 13–14 — Blow the bubble all the way (the most sides). What area does the near-circle enclose? (to 0.1)",
    reponse: 11.4,
    unite: "cm²",
    indice: "It's the largest area possible: A = P² ÷ (4π) = 144 ÷ 12.57.",
    calcul: "A_max = 144 ÷ (4π) ≈ 11.5 cm²: no shape 12 cm around does better than the circle.",
    tolerance: 0.3,
  },
  {
    id: "bulle-2nde-note-carre",
    question:
      "Age 15 — Each shape gets a score q = 4πA ⁄ P². For the square (A = 9, P = 12), work out q to 0.01.",
    reponse: 0.79,
    unite: "",
    indice: "q = 4 × 3.1416 × 9 ÷ (12 × 12) = 4π × 9 ÷ 144.",
    calcul: "4π × 9 ÷ 144 = 36π ÷ 144 = π ÷ 4 ≈ 0.79: the square only reaches 0.79, not 1.",
    tolerance: 0.02,
  },
  {
    id: "bulle-1re-note-max",
    question:
      "Age 16–18 — The score q = 4πA ⁄ P² never goes above a certain value, reached only by the circle. What is that maximum score?",
    reponse: 1,
    unite: "",
    indice: "The equality 4πA = P² holds only for the circle: q is then…",
    calcul: "q_max = 1: that's the isoperimetric inequality 4πA ≤ P², with equality for the circle alone. The bubble 'aims' at that 1.",
    tolerance: 0.01,
  },
];

// --- The geometry -----------------------------------------------------------
const P = 12; // the perimeter (the string), FIXED
const N_MIN = 3;
const N_MAX = 40;
const N0 = 4; // start from the square: the most familiar shape (score 0.79)

const R_CERCLE = P / (2 * Math.PI);
const AIRE_CERCLE = (P * P) / (4 * Math.PI);

function forme(n: number) {
  const tan = Math.tan(Math.PI / n);
  const aire = (P * P) / (4 * n * tan);
  const note = Math.PI / (n * tan);
  const rayon = P / (2 * n * Math.sin(Math.PI / n));
  return { aire, note, rayon };
}

// --- The scene (px) ---------------------------------------------------------
const VBW = 340;
const VBH = 300;
const CX = 170;
const CY = 148;
const R_PX = 104;
const SCALE = R_PX / R_CERCLE;

export default function RoundBubblesClient() {
  const [sides, setSides] = useState(N0);
  const [modeClasse, setModeClasse] = useState(false);
  const blowRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      return !v;
    });
  };

  const stopBlow = () => {
    if (blowRef.current != null) {
      clearInterval(blowRef.current);
      blowRef.current = null;
    }
  };
  useEffect(() => () => stopBlow(), []);

  const reglerCotes = (val: number) => {
    stopBlow();
    setSides(val);
  };

  const soufflerLaBulle = () => {
    stopBlow();
    setSides(N_MIN);
    let n = N_MIN;
    blowRef.current = setInterval(() => {
      n += 1;
      if (n >= N_MAX) {
        setSides(N_MAX);
        stopBlow();
        return;
      }
      setSides(n);
    }, 55);
  };

  const { aire, note, rayon } = forme(sides);

  const polyR = rayon * SCALE;
  const sommets = Array.from({ length: sides }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
    return { x: CX + polyR * Math.cos(a), y: CY + polyR * Math.sin(a) };
  });
  const points = sommets.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const grand = modeClasse ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl";

  const verdict = (() => {
    if (note >= 0.995)
      return {
        texte: `Almost a circle: score ${note.toFixed(2)} ≈ 1.00. No shape 12 cm around encloses more — that's the isoperimetric inequality.`,
        couleur: "#0f766e",
      };
    if (note >= 0.9)
      return {
        texte: `Rounding off: the string encloses ${aire.toFixed(1)} cm², score ${note.toFixed(
          2,
        )}. Getting close to the champion.`,
        couleur: BULLE,
      };
    return {
      texte: `Still corners. The string encloses ${aire.toFixed(
        1,
      )} cm² — the circle would hold ${AIRE_CERCLE.toFixed(1)}. Add more sides.`,
      couleur: "#b45309",
    };
  })();

  return (
    <main
      className="min-h-screen pb-14"
      style={{
        backgroundColor: "#f0f9ff",
        backgroundImage:
          "linear-gradient(#d9eefb40 1px, transparent 1px), linear-gradient(90deg, #d9eefb40 1px, transparent 1px)",
        backgroundSize: "25px 25px",
        color: ENCRE,
      }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: FILM }}>
          A bit of maths · the teacher&apos;s corner
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: BULLE }}>
          Why are soap bubbles round?
        </h1>
        <p className="mt-1 text-lg font-black" style={{ color: "#0369a1" }}>
          Same string — which shape holds the most space?
        </p>
        <p className="mt-1 text-[13px]" style={{ color: "#4d7f97" }}>
          Soap is <b>lazy</b>: its skin contracts to have the <b>least surface possible</b>. In 2D, the champion
          shape is the <b>circle</b>; in 3D, the <b>sphere</b>. The question that mathematician{" "}
          <a
            href="https://www.youtube.com/watch?v=nAh4xLkmLNM"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:underline"
            style={{ color: "#c026d3" }}
          >
            Yilin Wang
          </a>{" "}
          asked as a child.{" "}
          <a
            href="https://youtu.be/h2t4Ce0ucfI"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:underline"
            style={{ color: "#c81e1e" }}
          >
            ▶ watch the video (2 min)
          </a>
        </p>

        {/* ── THE MACHINE: the string that rounds off + control + result ── */}
        <div className="mt-3 rounded border p-3 sm:p-4" style={{ borderColor: "#bae6fd", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: FILM }}>
              The same string (12 cm) — add sides, the area climbs
            </p>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: "#bae6fd", color: "#4d7f97" }}
            >
              {modeClasse ? "🖥️ classroom mode: ON" : "🖥️ classroom mode"}
            </button>
          </div>

          <svg
            viewBox={`0 0 ${VBW} ${VBH}`}
            className="mt-2 w-full"
            style={{ maxHeight: 340 }}
            role="img"
            aria-label={`A fixed-perimeter loop of string shaped into a ${sides}-sided polygon. It encloses ${aire.toFixed(
              1,
            )} square centimetres, its isoperimetric score is ${note.toFixed(
              2,
            )}. The dashed target circle encloses ${AIRE_CERCLE.toFixed(1)} square centimetres, score 1.`}
          >
            <defs>
              <radialGradient id="savon-en" cx="42%" cy="38%" r="72%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.28" />
              </radialGradient>
            </defs>

            {[
              { x: 36, y: 40, r: 9 },
              { x: 304, y: 54, r: 13 },
              { x: 22, y: 250, r: 7 },
              { x: 316, y: 232, r: 10 },
            ].map((b) => (
              <circle key={`${b.x}-${b.y}`} cx={b.x} cy={b.y} r={b.r} fill={FILM} opacity="0.12" />
            ))}

            <circle cx={CX} cy={CY} r={R_PX} fill="none" stroke={CIBLE} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.8" />
            <text x={CX} y={CY - R_PX - 8} fontSize={modeClasse ? 15 : 12} fontWeight={800} fill="#b45309" textAnchor="middle">
              the circle · score 1.00
            </text>

            <polygon points={points} fill="url(#savon-en)" stroke={FILM} strokeWidth="3" strokeLinejoin="round" />
            {sommets.map((p, i) => (
              <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="3.2" fill={BULLE} />
            ))}

            <text x={CX} y={CY - 6} fontSize={modeClasse ? 30 : 24} fontWeight={900} fill={BULLE} textAnchor="middle">
              {note.toFixed(2)}
            </text>
            <text x={CX} y={CY + 14} fontSize={modeClasse ? 14 : 11} fontWeight={700} fill="#4d7f97" textAnchor="middle">
              4πA ⁄ P²
            </text>
          </svg>

          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded border p-2 text-center" style={{ borderColor: "#bae6fd" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4d7f97" }}>Sides</p>
              <p className={`font-black ${grand}`} style={{ color: BULLE }}>{sides}</p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#bae6fd" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4d7f97" }}>Perimeter (fixed)</p>
              <p className={`font-black ${grand}`} style={{ color: "#0369a1" }}>
                12<span className="text-[11px] font-bold" style={{ color: "#7ba9bf" }}> cm</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#bae6fd", backgroundColor: "#f0fdf4" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4d7f97" }}>Area enclosed</p>
              <p className={`font-black ${grand}`} style={{ color: "#0f766e" }}>
                {aire.toFixed(1)}<span className="text-[11px] font-bold" style={{ color: "#7ba9bf" }}> cm²</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#bae6fd", backgroundColor: "#fffbeb" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4d7f97" }}>Score 4πA ⁄ P²</p>
              <p className={`font-black ${grand}`} style={{ color: "#b45309" }}>{note.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-2">
            <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#e0f2fe" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(note * 100).toFixed(1)}%`, backgroundColor: CIBLE }}
              />
            </div>
            <p className="mt-1 text-right text-[10.5px] font-semibold" style={{ color: "#4d7f97" }}>
              0 ——— the circle = 1.00 (the maximum)
            </p>
          </div>

          <p className="mt-2 text-center text-[13.5px] font-bold" style={{ color: verdict.couleur }}>
            {verdict.texte}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 border-t pt-3" style={{ borderColor: "#dbeefb" }}>
            <label htmlFor="sides" className="flex flex-1 items-center gap-3 text-sm font-black" style={{ color: BULLE }}>
              Number of sides
              <input
                id="sides"
                type="range"
                min={N_MIN}
                max={N_MAX}
                step={1}
                value={sides}
                onChange={(e) => reglerCotes(parseInt(e.target.value, 10))}
                className="h-2 flex-1 cursor-pointer"
                style={{ accentColor: BULLE }}
              />
              <span className="w-8 text-right font-mono">{sides}</span>
            </label>
            <button
              type="button"
              onClick={soufflerLaBulle}
              className="rounded px-4 py-2 text-sm font-black text-white hover:brightness-110"
              style={{ backgroundColor: BULLE }}
            >
              🫧 Blow the bubble
            </button>
            <button
              type="button"
              onClick={() => reglerCotes(N0)}
              className="rounded border px-3 py-2 text-sm font-bold hover:brightness-95"
              style={{ borderColor: "#bae6fd", backgroundColor: "#eff9ff", color: BULLE }}
            >
              ↺ The square
            </button>
          </div>

          <p className="mt-2 rounded border px-3 py-2 text-[12.5px]" style={{ borderColor: "#dbeefb", backgroundColor: "#f5fbff", color: "#3f6f83" }}>
            <span className="font-mono font-bold" style={{ color: BULLE }}>4πA ≤ P²</span> — for a given perimeter
            P, the area A never beats the circle&apos;s. The <b>score</b> 4πA/P² is <b>1</b> for the circle alone,
            and less for everything else. The bubble &quot;aims&quot; at that 1 without any maths.
          </p>
        </div>

        {/* ── YILIN WANG'S CHILDHOOD QUESTION ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#f0d3fb", backgroundColor: "#fdf4ff", color: "#701a75" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: "#c026d3" }}>
            Yilin Wang&apos;s childhood question
          </p>
          <p className="mt-2">
            <b>Yilin Wang</b> is a mathematician (Institut des Hautes Études Scientifiques, <b>2024 Salem Prize</b>).
            In an interview, she tells how, <b>as a child</b>, she would ask her parents:{" "}
            <i>&quot;why are soap bubbles round?&quot;</i> A very simple question — and the doorway to a big
            mathematical idea.
          </p>
          <p className="mt-2">
            She adds that her <b>mother</b>, top of her physics class and now an architect, showed her early on that{" "}
            <b>gender makes no difference</b> in science. A child&apos;s question, a calling: exactly the spirit of{" "}
            <i>A bit of maths</i>.
          </p>
          <a
            href="https://www.youtube.com/watch?v=nAh4xLkmLNM"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-black hover:underline"
            style={{ color: "#c026d3" }}
          >
            ▶ Watch the interview (CIRM, in French)
          </a>
        </div>

        {/* ── LAZY SOAP (2D → 3D) ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#bae6fd", backgroundColor: "#eff9ff", color: ENCRE }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: FILM }}>
            Soap is lazy — from the string to the real bubble
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="sm:flex-1">
              <p>
                A bubble&apos;s skin is <b>stretched</b>: like an elastic band, it pulls from every side and tries to
                shrink. Less surface = less energy. In 2D (our string), the shape that encloses a given area with the{" "}
                <b>least outline</b> is the <b>circle</b>. In 3D, the real bubble encloses a <b>fixed volume of
                air</b> with the <b>least skin</b>: that&apos;s the <b>sphere</b>.
              </p>
              <p className="mt-2 rounded border border-dashed px-3 py-2 font-mono text-[13px]" style={{ borderColor: FILM + "88", color: BULLE }}>
                fixed volume → least surface → sphere
              </p>
            </div>
            <svg viewBox="0 0 120 120" className="mx-auto w-28 shrink-0" role="img" aria-label="A spherical bubble whose skin contracts toward the centre">
              <circle cx="60" cy="62" r="42" fill="#bae6fd" opacity="0.4" stroke={FILM} strokeWidth="2.5" />
              <ellipse cx="47" cy="46" rx="13" ry="8" fill="#ffffff" opacity="0.75" transform="rotate(-30 47 46)" />
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const a = (deg * Math.PI) / 180;
                return (
                  <line
                    key={deg}
                    x1={(60 + 42 * Math.cos(a)).toFixed(2)}
                    y1={(62 + 42 * Math.sin(a)).toFixed(2)}
                    x2={(60 + 30 * Math.cos(a)).toFixed(2)}
                    y2={(62 + 30 * Math.sin(a)).toFixed(2)}
                    stroke={BULLE}
                    strokeWidth="2"
                    markerEnd="url(#fleche-en)"
                  />
                );
              })}
              <defs>
                <marker id="fleche-en" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6 Z" fill={BULLE} />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* ── WHY THE ROUND ONE ALWAYS WINS ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#bae6fd", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: FILM }}>
            Why the round one always wins — the isoperimetric score
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              📐 <b>A score for each shape.</b> We compute <b>q = 4πA/P²</b>: it is <b>1</b> for the circle,
              <b> 0.91</b> for the hexagon, <b>0.79</b> for the square, and collapses for flat shapes.
            </li>
            <li>
              🔵 <b>More sides, better score.</b> As you round the string off (triangle → square → hexagon → …), the
              score climbs toward 1, but only <i>reaches</i> it in the limit: the circle.
            </li>
            <li>
              🫧 <b>The bubble &quot;cheats&quot;… with physics.</b> It computes nothing: its surface tension pushes
              it straight to the shape with the highest score. The maths result, done by nature.
            </li>
          </ul>
          <p className="mt-2 text-[12.5px]" style={{ color: "#4d7f97" }}>
            The same idea explains dewdrops, lead shot cooled as it falls, and why a drop of oil in water balls up.
          </p>
        </div>

        {/* ── THE CHALLENGES ── */}
        <DefisSimulateur
          titre="The bubble challenges — from age 6 to 18"
          coupDePouce="Hint: set the number of sides and read the area; blow the bubble and read the score — the machine checks for you."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
          labels={LABELS_DEFIS}
          masquerPont
        />

        {/* ── THE BRIDGES ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/h2t4Ce0ucfI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: "#c81e1e" }}
          >
            ▶ Watch in English (2 min) — why bubbles are round
          </a>
          <Link
            href="/pourquoi-les-bulles-sont-rondes"
            className="text-[13px] font-bold hover:underline"
            style={{ color: BULLE }}
          >
            🌐 Lire en français →
          </Link>
          <Link
            href="/en/simulators/kakeya-needle"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#bae6fd", backgroundColor: "#eff9ff", color: ENCRE }}
          >
            🪡 The Kakeya needle — turning a needle with no room
          </Link>
        </div>

        {/* ── HONESTY ── */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#bae6fd", color: "#4d7f97" }}>
          Teaching machine: we compare <i>regular polygons</i> at a fixed perimeter; their area{" "}
          <span className="font-mono">A(n) = P²/(4n·tan(π/n))</span> tends to the circle&apos;s{" "}
          <span className="font-mono">P²/(4π)</span> as the number of sides grows. The <b>isoperimetric
          inequality</b> (the circle maximises area for a given perimeter; the sphere minimises surface for a given
          volume) is a <i>theorem</i>; the bubble &quot;solves&quot; it through physics — its surface tension
          minimises energy, hence surface. Yilin Wang&apos;s childhood anecdote is reported from her interview
          (linked): to be checked for exact wording.
        </p>
      </div>
    </main>
  );
}
