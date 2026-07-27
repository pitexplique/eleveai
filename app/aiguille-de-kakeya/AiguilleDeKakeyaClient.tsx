"use client";

// « L'aiguille de Hong Wang » — l'article-machine du journal (rubrique « Un peu
// de maths »), publié pour la médaille Fields 2026. Le problème de l'aiguille
// (Kakeya, 1917) : faire faire DEMI-TOUR à une aiguille en balayant le moins de
// surface possible. Trois méthodes, et l'aire se divise par 2 à chaque ruse :
// π/2 (autour du bout) → π/4 (autour du centre) → π/8 (le deltoïde)… et
// Besicovitch a montré qu'on peut approcher 0. Hong Wang (avec Joshua Zahl,
// 2025) a fermé la version 3D — d'où la médaille, remise le 23/07/2026.
//
// Contrainte (Frédéric) : IMAGE (l'aiguille) + RÉGLAGE (la méthode) + RÉSULTAT
// (l'aire balayée) tiennent sur UN SEUL écran. Le reste (le théorème, SON
// tableau décodé — projection, ombre F, tiroirs F′ ⊆ F —, ses mots, les défis)
// se déroule dessous.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const ENCRE = "#1f3a67"; // l'encre bleue — le papier de son tableau
const OR = "#c8962a"; // les repères (convention du journal)
const ROUGE = "#c2352b"; // l'aiguille
const PEINT = "#f3c9c2"; // la surface déjà balayée
const SOUS = "#5f7396"; // légendes
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

// La rampe CP → Terminale : la MÊME question (« combien de place pour un
// demi-tour ? »), un outil qui grandit — de l'addition à la limite d'une suite
// géométrique. Réponse numérique unique par carte, id stable.
const DEFIS: DefiSimulateur[] = [
  {
    id: "kakeya-cp-diametre",
    question:
      "CP · CE1 — L'aiguille mesure 1 mètre. Quand elle tourne autour de son bout, elle dessine un cercle large de DEUX aiguilles mises bout à bout. Ce cercle est large de combien de mètres ?",
    reponse: 2,
    unite: "m",
    indice: "Une aiguille, puis encore une aiguille : 1 + 1.",
    calcul: "1 + 1 = 2 m — c'est le diamètre du cercle.",
  },
  {
    id: "kakeya-ce2-demitour",
    question:
      "CE2 · CM1 — Un tour complet, c'est 360 degrés. Un DEMI-tour, comme celui de l'aiguille, c'est combien de degrés ?",
    reponse: 180,
    unite: "°",
    indice: "La moitié de 360 : calcule 360 ÷ 2.",
    calcul: "360 ÷ 2 = 180° — le demi-tour que fait l'aiguille dans la machine.",
  },
  {
    id: "kakeya-cm2-moitie",
    question:
      "CM2 — Autour du bout, l'aiguille balaye une aire de 1,57. Autour du centre, elle balaye MOITIÉ moins. Quelle aire ?",
    reponse: 0.785,
    unite: "",
    indice: "Calcule 1,57 ÷ 2.",
    calcul: "1,57 ÷ 2 ≈ 0,79 — chaque ruse divise l'aire par 2.",
    tolerance: 0.02,
  },
  {
    id: "kakeya-6e-pourcent",
    question:
      "6ᵉ · 5ᵉ — Du disque (aire 0,79) au deltoïde (aire 0,39), l'aire balayée baisse d'environ quel POURCENTAGE ?",
    reponse: 50,
    unite: "%",
    indice: "0,39, c'est à peu près la moitié de 0,79.",
    calcul: "0,39 ÷ 0,79 ≈ 0,5 : il reste la moitié — une baisse d'environ 50 %.",
    tolerance: 2,
  },
  {
    id: "kakeya-4e-aire",
    question:
      "4ᵉ · 3ᵉ — L'aiguille de 1 m tourne autour de son centre : elle balaye un disque de rayon 0,5 m. Aire d'un disque : π × r². Calcule cette aire (arrondie au centième).",
    reponse: 0.79,
    unite: "m²",
    indice: "π × 0,5² = π × 0,25.",
    calcul: "π × 0,25 ≈ 0,785 ≈ 0,79 m² — le π/4 affiché par la machine.",
    tolerance: 0.01,
  },
  {
    id: "kakeya-2nde-tiroirs",
    question:
      "2ⁿᵈᵉ — Le principe des tiroirs de son tableau : 18 ombres tombent dans 5 boîtes. La boîte la plus pleine contient AU MOINS combien d'ombres ?",
    reponse: 4,
    unite: "ombres",
    indice: "18 ÷ 5 = 3,6 — et on arrondit vers le haut. Pourquoi ?",
    calcul:
      "Si chaque boîte avait au plus 3 ombres, on en aurait au plus 5 × 3 = 15. Or il y en a 18 : une boîte en contient au moins 4. C'est le « pigeonhole » qui choisit F′ ⊆ F.",
  },
  {
    id: "kakeya-1re-ruses",
    question:
      "1ʳᵉ — À chaque ruse, l'aire est divisée par 2 en partant de 1,57. Combien de ruses pour passer SOUS 0,01 ?",
    reponse: 8,
    unite: "ruses",
    indice: "1,57 ; 0,785 ; 0,39… une suite géométrique de raison ½ — compte les étapes.",
    calcul: "1,57 ÷ 2⁷ ≈ 0,012 (pas encore) ; 1,57 ÷ 2⁸ ≈ 0,006 < 0,01 → 8 ruses.",
  },
  {
    id: "kakeya-term-limite",
    question:
      "Terminale — L'aire après n ruses vaut 1,57 × (½)ⁿ. Quelle est la limite de cette suite quand n tend vers +∞ ?",
    reponse: 0,
    unite: "",
    indice: "Que devient (½)ⁿ quand n grandit sans fin ?",
    calcul:
      "(½)ⁿ → 0, donc l'aire → 0 : on peut faire demi-tour dans une surface aussi petite qu'on veut (Besicovitch, 1928). Et pourtant — Hong Wang et Joshua Zahl, 2025 — en 3D, l'ensemble reste forcément de dimension 3.",
    tolerance: 0.1,
  },
];

// ── La machine : géométrie ────────────────────────────────────────────────────
const VBW = 1000;
const VBH = 300;
const NL = 170; // longueur de l'aiguille (px) = 1 « aiguille »
const STEPS = 160; // positions dessinées pour un demi-tour

type Mode = "bout" | "centre" | "deltoide";

const MODES: { id: Mode; nom: string; formule: string; aire: string }[] = [
  { id: "bout", nom: "1 · Autour du bout", formule: "π/2", aire: "1,57" },
  { id: "centre", nom: "2 · Autour du centre", formule: "π/4", aire: "0,79" },
  { id: "deltoide", nom: "3 · La ruse du deltoïde", formule: "π/8", aire: "0,39" },
];

// Le deltoïde : Q(s) = r·(2cos s + cos 2s, 2sin s − sin 2s). L'aiguille est la
// corde tangente, de longueur constante 4r — ses bouts glissent sur la courbe
// pendant qu'elle tourne de 180°. Ici 4r = NL, centré en (cx, cy).
const DELT = { cx: 500, cy: 150, r: NL / 4 };
function deltPoint(s: number): [number, number] {
  return [
    DELT.cx + DELT.r * (2 * Math.cos(s) + Math.cos(2 * s)),
    DELT.cy + DELT.r * (2 * Math.sin(s) - Math.sin(2 * s)),
  ];
}
// L'aiguille au « temps » t ∈ [0, 2π] : ses deux bouts sur la courbe.
function aiguilleDeltoide(t: number): [[number, number], [number, number]] {
  return [deltPoint(-t / 2), deltPoint(-t / 2 + Math.PI)];
}
function aiguilleBout(a: number): [[number, number], [number, number]] {
  // pivot : le bout gauche ; l'autre bout monte de 0 à 180°
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
// Rotation nette de l'aiguille (0 → 180°), quel que soit le chemin.
function degres(mode: Mode, t: number) {
  return Math.round((t / T_MAX[mode]) * 180);
}

// Les contours en pointillé : la zone que chaque méthode va peindre.
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

// ── « L'ombre et les tiroirs » : le tableau de son interview, version jouable ─
// E : les points. π̃ : on les projette (dans la direction que TU règles) sur la
// droite L en bas. F : leurs ombres. F′ : la boîte la plus pleine — le tiroir
// que le « pigeonhole » choisit. Deux alignements sont cachés dans E : cinq
// points à +20°, quatre points à −25° — seule la bonne projection les démasque.
const AXE_Y = 290;
const BOITE_X0 = 57;
const BOITE_W = 63;
const NB_BOITES = 14;
const POINTS_E: [number, number][] = [
  // cinq points alignés (ils se rassemblent à +20°)
  [476.3, 60], [492.7, 105], [509, 150], [525.4, 195], [541.8, 240],
  // quatre points alignés (ils se rassemblent à −25°)
  [342.6, 70], [316.9, 125], [291.3, 180], [265.6, 235],
  // le reste du nuage
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
        aria-label={`Un nuage de 18 points E est projeté sur la droite L selon un angle réglable (${angle}°). Les ombres F tombent dans des boîtes ; la boîte la plus pleine, F prime, contient ${max} ombres.`}
      >
        {/* les boîtes (les tiroirs) et leur remplissage */}
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
        {/* la droite L (l'écran qui reçoit les ombres) */}
        <line x1={40} y1={AXE_Y} x2={955} y2={AXE_Y} stroke={ENCRE} strokeWidth="2" />
        <text x={962} y={AXE_Y + 5} fontSize="17" fontWeight={800} fill={ENCRE}>L</text>
        {/* les rayons de projection, puis les points et leurs ombres */}
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
        {/* les étiquettes de son tableau */}
        <text x={40} y={30} fontSize="15" fontWeight={800} fill={ENCRE}>E — les points</text>
        <text x={40} y={AXE_Y + 40} fontSize="13" fill={SOUS}>F = les ombres sur L, rangées en boîtes</text>
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
          Angle de projection
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
          Boîte la plus pleine : {max} ombre{max > 1 ? "s" : ""}
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
          {cinqTrouve ? "✅ Trouvé : 5 ombres dans une boîte — 5 points étaient alignés !" : "🔎 Défi : mets 5 ombres dans la MÊME boîte"}
        </span>
        <span
          className="rounded border px-2.5 py-1"
          style={{
            borderColor: quatreTrouve ? "#1a7f37" : BORD,
            color: quatreTrouve ? "#1a7f37" : SOUS,
            backgroundColor: quatreTrouve ? "#eaf6ee" : "#f4f7fc",
          }}
        >
          {quatreTrouve ? "✅ Trouvé : l'alignement caché des angles négatifs !" : "🔎 Défi bonus : un autre alignement se cache côté angles négatifs"}
        </span>
      </div>
    </div>
  );
}

// ── La page ───────────────────────────────────────────────────────────────────
export default function AiguilleDeKakeyaClient() {
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

  // Le demi-tour, dessiné pas à pas : à chaque tick on ajoute quelques positions
  // de l'aiguille à la traînée — l'union des positions EST la surface balayée.
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
    if (enCours) return { texte: `L'aiguille tourne… ${deg}° / 180°`, couleur: SOUS };
    if (!fini)
      return {
        texte: "Choisis une méthode, puis « Tourner ! » — le but : faire demi-tour en balayant le MOINS de surface possible.",
        couleur: "#3d5074",
      };
    if (mode === "bout")
      return { texte: `Demi-tour réussi — aire balayée : ${infoMode.aire} (${infoMode.formule}). Un demi-disque entier… on peut faire mieux.`, couleur: "#1a7f37" };
    if (mode === "centre")
      return { texte: `Demi-tour réussi — aire balayée : ${infoMode.aire} (${infoMode.formule}). Deux fois moins qu'autour du bout !`, couleur: "#1a7f37" };
    return {
      texte: `Demi-tour réussi — aire balayée : ${infoMode.aire} (${infoMode.formule}). Encore divisée par 2. Et les mathématiciens savent continuer…`,
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
          Un peu de maths · La rubrique du prof
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: ENCRE }}>
          L&apos;aiguille de Hong Wang
        </h1>
        <p className="mt-1 text-lg font-black" style={{ color: OR }}>
          Médaille Fields 2026 — le demi-tour le plus économe du monde
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[12px] font-bold">
          <span className="rounded-full border px-2.5 py-1" style={{ borderColor: OR + "66", backgroundColor: "#fdf6e8", color: "#8a6516" }}>
            🏅 3ᵉ femme de l&apos;histoire à recevoir la médaille Fields
          </span>
          <span className="rounded-full border px-2.5 py-1" style={{ borderColor: BORD, backgroundColor: "#f4f7fc", color: ENCRE }}>
            虹 «&nbsp;Hong&nbsp;», son prénom, veut dire «&nbsp;arc-en-ciel&nbsp;»
          </span>
        </p>
        <p className="mt-1 text-[13px]" style={{ color: SOUS }}>
          Fais faire demi-tour à une aiguille en balayant le moins de place possible — le problème né en
          1917, dont elle vient de fermer la grande conjecture en 3D.{" "}
          <a
            href="https://www.youtube.com/watch?v=LYzeUAWwinQ"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:underline"
            style={{ color: "#c81e1e" }}
          >
            ▶ voir l&apos;interview (1 min)
          </a>
        </p>

        {/* ── LA MACHINE : image + réglage + résultat, sur un seul écran ── */}
        <div className="mt-3 rounded border p-3 sm:p-4" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
              Le problème de l&apos;aiguille — trois méthodes, l&apos;aire divisée par 2 à chaque ruse
            </p>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: BORD, color: SOUS }}
            >
              {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
            </button>
          </div>

          {/* L'IMAGE : la zone à peindre, la surface balayée, l'aiguille */}
          <svg
            viewBox={`0 0 ${VBW} ${VBH}`}
            className="mt-2 w-full"
            role="img"
            aria-label={`L'aiguille fait demi-tour (${deg}° sur 180°) selon la méthode « ${infoMode.nom} » ; la surface déjà balayée est peinte en rouge clair. Aire totale de cette méthode : ${infoMode.aire}, soit ${infoMode.formule}.`}
          >
            <path d={CONTOURS[mode]} fill="none" stroke={ENCRE} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.45" />
            {trail !== "" && (
              <path d={trail} fill="none" stroke={PEINT} strokeWidth="8" strokeLinecap="round" />
            )}
            <line x1={ax} y1={ay} x2={bx} y2={by} stroke={ROUGE} strokeWidth="5" strokeLinecap="round" />
            <circle cx={ax} cy={ay} r="4" fill={ROUGE} />
            <circle cx={bx} cy={by} r="4" fill={ROUGE} />
            <text x={20} y={VBH - 14} fontSize={modeClasse ? 17 : 13} fill="#8ba0c4">
              1 aiguille = 1 unité — les aires sont en « aiguilles² »
            </text>
          </svg>

          {/* LE RÉSULTAT : les compteurs */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>Rotation</p>
              <p className={`font-black ${grand}`} style={{ color: ENCRE }}>
                {deg}
                <span className="text-[11px] font-bold" style={{ color: "#8ba0c4" }}> / 180°</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>Aire balayée</p>
              <p className={`font-black ${grand}`} style={{ color: fini ? ROUGE : "#8ba0c4" }}>
                {fini ? infoMode.aire : "…"}
                {fini && <span className="text-[11px] font-bold" style={{ color: "#8ba0c4" }}> ({infoMode.formule})</span>}
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>Le record des maths</p>
              <p className={`font-black ${grand}`} style={{ color: ENCRE }}>
                ≈ 0
                <span className="text-[11px] font-bold" style={{ color: "#8ba0c4" }}> (Besicovitch)</span>
              </p>
            </div>
          </div>

          <p className="mt-2 text-center text-[13.5px] font-bold" style={{ color: verdict.couleur }}>
            {verdict.texte}
          </p>

          {/* LE RÉGLAGE : la méthode + le départ */}
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
              {enCours ? "Ça tourne…" : fini ? "Retourner !" : "Tourner !"}
            </button>
          </div>

          <p className="mt-2 rounded border px-3 py-2 text-[12.5px]" style={{ borderColor: "#e2e9f4", backgroundColor: "#f7f9fd", color: "#3d5074" }}>
            <span className="font-mono font-bold" style={{ color: ENCRE }}>aire du disque = π · r²</span>{" "}
            — autour du centre, le rayon vaut ½ aiguille : π × 0,25 ≈ 0,79. Le deltoïde à trois pointes fait
            encore moitié moins (π/8). Chaque ruse divise l&apos;aire par 2 : <b>jusqu&apos;où peut-on descendre&nbsp;?</b>
          </p>
        </div>

        {/* ── JUSQU'OÙ PEUT-ON DESCENDRE ? LE THÉORÈME ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#c5d4ea", backgroundColor: "#f4f7fc", color: TEXTE }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Jusqu&apos;où peut-on descendre ? — un siècle de suspense
          </p>
          <p className="mt-2">
            En 1917, le mathématicien japonais Sōichi Kakeya pose la question du demi-tour le plus économe.
            En 1928, Abram Besicovitch stupéfie tout le monde&nbsp;: <b>il n&apos;y a pas de plancher</b>. Avec
            assez de ruses (des allers-retours en zigzag de plus en plus fins), on peut faire demi-tour dans
            une surface plus petite que n&apos;importe quel seuil — 0,01, 0,000&nbsp;001, aussi près de zéro
            qu&apos;on veut.
          </p>
          <p className="mt-2">
            Restait la vraie énigme, en trois dimensions&nbsp;: un ensemble qui contient une aiguille{" "}
            <b>dans toutes les directions</b> peut-il être une «&nbsp;poussière&nbsp;», un objet fantôme presque
            sans épaisseur&nbsp;? La <b>dimension</b> mesure à quel point un objet remplit l&apos;espace&nbsp;:
            une ligne vit en dimension 1, une feuille en dimension 2, et certains objets fractals se glissent
            entre les deux. En 2025, <b>Hong Wang et Joshua Zahl</b> ferment la question, ouverte depuis un
            siècle&nbsp;: non — un tel ensemble a beau pouvoir être de volume minuscule, il est{" "}
            <b>forcément de dimension 3</b>. Une preuve de plus de cent pages, saluée comme l&apos;un des grands
            résultats du siècle. Le 23 juillet 2026, à l&apos;ouverture du congrès international ICM de
            Philadelphie, Hong Wang a reçu la <b>médaille Fields</b> — la plus haute distinction des
            mathématiques, remise tous les quatre ans à des mathématiciens de moins de 40 ans.
          </p>
        </div>

        {/* ── SON TABLEAU, DÉCODÉ ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Son tableau, décodé — projeter, puis ranger dans des tiroirs
          </p>
          <p className="mt-2">
            Dans l&apos;interview, on aperçoit une feuille de son travail&nbsp;: un nuage de points, une droite,
            et trois lignes de notation. Voici ce qu&apos;elles disent — c&apos;est le geste favori de ses
            preuves&nbsp;:
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>
              <span className="font-mono font-bold" style={{ color: ENCRE }}>L = π̃(T)</span> — π̃, c&apos;est une{" "}
              <b>projection</b>&nbsp;: on écrase la figure dans une direction, comme une ombre au sol. La droite
              L est l&apos;ombre d&apos;un tube T (une aiguille épaissie).
            </li>
            <li>
              <span className="font-mono font-bold" style={{ color: ENCRE }}>F = π̃(π̃⁻¹(L) ∩ E)</span> — on prend
              tout ce qui se projette sur L, on garde les points de E qui y vivent, et on regarde leurs{" "}
              <b>ombres</b>&nbsp;: c&apos;est F.
            </li>
            <li>
              <span className="font-mono font-bold" style={{ color: ENCRE }}>pigeonhole to choose F′ ⊆ F</span> —
              le <b>principe des tiroirs</b>&nbsp;: si beaucoup d&apos;ombres se répartissent dans peu de boîtes,
              une boîte en contient forcément beaucoup. On choisit ce tiroir bien rempli&nbsp;: F′, un{" "}
              <b>morceau de F</b> (F′ ⊆ F, «&nbsp;F′ inclus dans F&nbsp;»), plus petit mais plus riche — et la
              preuve continue avec lui.
            </li>
          </ul>
          <p className="mt-2">
            Essaie toi-même&nbsp;: règle la direction de projection et regarde les ombres se ranger dans les
            boîtes. Quand beaucoup d&apos;ombres tombent dans la même boîte, ce n&apos;est pas un hasard —{" "}
            <b>la projection vient de démasquer une structure cachée</b> (des points alignés). C&apos;est
            exactement pour ça que les mathématiciens projettent.
          </p>
          <OmbresEtTiroirs />
        </div>

        {/* ── CE QU'ELLE A DIT ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#c5d4ea", backgroundColor: "#f4f7fc", color: TEXTE }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Ce qu&apos;elle a dit — trois messages pour les élèves
          </p>
          <ul className="mt-2 space-y-2.5">
            <li>
              🎓 <b>Merci aux profs.</b> Formée à l&apos;université de Pékin, puis en France — à l&apos;École
              polytechnique et à Orsay —, elle a tenu, au moment de recevoir sa médaille, à rendre{" "}
              <b>hommage à ses professeurs français</b>. Derrière chaque médaille, il y a des profs — et
              derrière chaque élève aussi.
            </li>
            <li>
              ⚖️ <b>Femmes, hommes&nbsp;: aucune différence.</b> Elle est la <b>troisième femme</b> médaillée
              Fields en 90 ans (après Maryam Mirzakhani en 2014 et Maryna Viazovska en 2022), et la première
              mathématicienne chinoise. Dans l&apos;interview, elle dit <b>ne faire aucune différence entre les
              femmes et les hommes</b> en mathématiques&nbsp;: les problèmes sont difficiles pour tout le monde,
              et le travail est le même pour tout le monde.
            </li>
            <li>
              ⏳ <b>Le temps long.</b> Elle parle de «&nbsp;problèmes difficiles&nbsp;» qui l&apos;ont occupée{" "}
              <b>pendant des années</b>. Personne ne «&nbsp;voit&nbsp;» la solution du premier coup — pas même
              une médaille Fields. Chercher longtemps n&apos;est pas un signe de faiblesse&nbsp;: c&apos;est le
            métier même des mathématiques.
            </li>
          </ul>
          <p className="mt-3 text-[12.5px]" style={{ color: SOUS }}>
            Hong Wang (王虹), 35 ans, née à Guilin, entrée à l&apos;université de Pékin à 16 ans, est
            professeure permanente à l&apos;IHÉS (Bures-sur-Yvette, près de Paris) et professeure à
            l&apos;université de New York (institut Courant).{" "}
            <a
              href="https://www.youtube.com/watch?v=LYzeUAWwinQ"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black hover:underline"
              style={{ color: "#c81e1e" }}
            >
              ▶ l&apos;interview (CGTN Français, 1 min)
            </a>
          </p>
        </div>

        {/* ── LES DÉFIS ── */}
        <DefisSimulateur
          titre="Les défis de l'aiguille — du CP à la Terminale"
          coupDePouce="Coup de pouce : les trois aires de la machine (1,57 · 0,79 · 0,39) sont la clé de presque tous les défis."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* ── LES PONTS ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://www.youtube.com/watch?v=LYzeUAWwinQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: "#c81e1e" }}
          >
            ▶ L&apos;interview (1 min) — l&apos;hommage à ses profs
          </a>
          <Link
            href="/simulateur-epsilon"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: ROUGE }}
          >
            ⚡ La machine des epsilons — des petits riens aux infinis
          </Link>
          <Link
            href="/exponentielle"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#c5d4ea", backgroundColor: "#f4f7fc", color: TEXTE }}
          >
            📈 Plus j&apos;avance, plus ma vitesse augmente
          </Link>
        </div>

        {/* ── L'HONNÊTETÉ ── */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: BORD, color: SOUS }}>
          Machine pédagogique&nbsp;: la surface «&nbsp;peinte&nbsp;» est l&apos;union de 160 positions de
          l&apos;aiguille — une approximation visuelle — mais les aires affichées (π/2, π/4, π/8) sont les
          valeurs exactes des figures balayées. «&nbsp;On peut approcher 0&nbsp;» est le théorème de Besicovitch
          (1928)&nbsp;; la résolution en 3D est de Hong Wang et Joshua Zahl (2025). Les propos rapportés
          viennent de son interview à CGTN Français (juillet 2026)&nbsp;; le tableau décodé est celui qu&apos;on
          aperçoit dans son interview, et la lecture pas à pas — projection, ombre, tiroirs —
          est la nôtre&nbsp;: fidèle à l&apos;esprit de ses preuves, sans prétendre reconstituer la page exacte.
        </p>
      </div>
    </main>
  );
}
