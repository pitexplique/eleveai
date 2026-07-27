"use client";

// « La dimension du volcan » — l'article-machine du journal (rubrique « Un peu
// de maths »), le pont entre l'aiguille de Hong Wang (médaille Fields 2026) et
// le Piton de la Fournaise. Son théorème ne parle pas d'aire mais de DIMENSION —
// et la dimension, ça se MESURE : on pose une grille sur le profil du rempart,
// on compte les carrés que la crête traverse, on affine, et le multiplicateur
// donne d (box-counting). Ligne lisse : ×2 à chaque affinement → d = 1. Le
// rempart : ×~2,4 → d ≈ 1,25. Les comptes affichés sont RÉELLEMENT calculés
// sur le dessin (pas des chiffres décoratifs).
//
// Contrainte (Frédéric) : IMAGE (le profil + la grille) + RÉGLAGE (la taille
// des carreaux) + RÉSULTAT (N, le multiplicateur, d) sur UN SEUL écran.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const LAVE = "#d2431f"; // les carrés traversés, l'action
const BASALTE = "#3b2f2a"; // l'encre — le profil
const OR = "#c8962a"; // les repères (convention du journal)
const SOUS = "#8a7565";
const BORD = "#e2d5c9";
const TEXTE = "#3b2f2a";

const COULEURS_DEFIS: CouleursDefis = {
  fond: "#faf5ef",
  fondProfond: "#f3ebe2",
  bord: "#e0d0c0",
  accent: BASALTE,
  texte: TEXTE,
  sousTexte: SOUS,
  ok: "#1a7f37",
  rate: "#b3261e",
};

// La rampe CP → Terminale : la MÊME question (« combien de carrés en plus quand
// on affine ? »), un outil qui grandit — de la multiplication au logarithme.
const DEFIS: DefiSimulateur[] = [
  {
    id: "dimvol-cp-carres",
    question:
      "CP · CE1 — Sur la grosse grille, la ligne traverse 6 carrés. Avec des carreaux deux fois plus petits, elle en traverse deux fois plus. Combien ?",
    reponse: 12,
    unite: "carrés",
    indice: "Deux fois 6 : calcule 2 × 6.",
    calcul: "6 × 2 = 12 — sur une ligne lisse, des carreaux 2 fois plus petits, c'est 2 fois plus de carrés.",
  },
  {
    id: "dimvol-ce2-deuxfois",
    question:
      "CE2 · CM1 — Une ligne lisse traverse 8 carrés. On affine la grille DEUX fois de suite (le nombre double à chaque fois). Combien de carrés à la fin ?",
    reponse: 32,
    unite: "carrés",
    indice: "8 × 2 = 16, puis encore × 2.",
    calcul: "8 × 2 × 2 = 32 carrés.",
  },
  {
    id: "dimvol-cm2-rempart",
    question:
      "CM2 — Le rempart traverse 10 carrés. On affine la grille : sur lui, le nombre est multiplié par 2,4 (et pas par 2 !). Combien de carrés ?",
    reponse: 24,
    unite: "carrés",
    indice: "Calcule 10 × 2,4.",
    calcul: "10 × 2,4 = 24 — le rempart en traverse PLUS qu'une ligne lisse : il gigote à toutes les échelles.",
  },
  {
    id: "dimvol-6e-quotient",
    question:
      "6ᵉ · 5ᵉ — Sur la grille fine, le rempart traverse 60 carrés là où une ligne lisse en traverse 25. Combien de fois plus ?",
    reponse: 2.4,
    unite: "fois",
    indice: "Un quotient : 60 ÷ 25.",
    calcul: "60 ÷ 25 = 2,4 fois plus — c'est ce multiplicateur qui mesure la rugosité.",
    tolerance: 0.05,
  },
  {
    id: "dimvol-4e-puissance",
    question:
      "4ᵉ · 3ᵉ — Ligne lisse : chaque affinement multiplie le nombre de carrés par 2. Après 3 affinements, il est multiplié par 2³. Combien ?",
    reponse: 8,
    unite: "",
    indice: "2 × 2 × 2.",
    calcul: "2³ = 8 — les puissances comptent les affinements.",
  },
  {
    id: "dimvol-2nde-puissance",
    question:
      "2ⁿᵈᵉ — Le rempart : chaque affinement multiplie le nombre de carrés par 2,4. Après 2 affinements, il est multiplié par 2,4². Combien ?",
    reponse: 5.76,
    unite: "",
    indice: "2,4 × 2,4.",
    calcul: "2,4² = 5,76 — presque 6 fois plus de carrés en deux affinements.",
    tolerance: 0.05,
  },
  {
    id: "dimvol-1re-suite",
    question:
      "1ʳᵉ — Suite géométrique : N₀ = 10 carrés, raison 2,4. Combien vaut N₃ (après 3 affinements) ?",
    reponse: 138.24,
    unite: "carrés",
    indice: "10 × 2,4 × 2,4 × 2,4.",
    calcul: "10 × 2,4³ = 138,24 ≈ 138 — le comptage de carrés est une suite géométrique.",
    tolerance: 0.5,
  },
  {
    id: "dimvol-term-log",
    question:
      "Terminale — La dimension du rempart : d = ln(2,4) ÷ ln(2). Calcule d (arrondi au centième).",
    reponse: 1.26,
    unite: "",
    indice: "ln(2,4) ≈ 0,875 et ln(2) ≈ 0,693.",
    calcul:
      "d = ln(2,4)/ln(2) ≈ 0,875/0,693 ≈ 1,26 : entre la ligne (1) et la surface (2). C'est cette idée de dimension que Hong Wang a tranchée en 3D — ses ensembles d'aiguilles sont forcément de dimension 3.",
    tolerance: 0.01,
  },
];

// ── Les deux profils (déterministes — mêmes points à chaque rendu) ────────────
// Générateur pseudo-aléatoire à graine fixe : le rempart est « déchiqueté »
// par déplacement du milieu (midpoint displacement), amplitude en 2^(−0,6·k).
// Graine 271828 (les décimales de e) : paramètres CALIBRÉS PAR LA MESURE pour
// d ≈ 1,25 sur les échelles de la machine (carreaux de 15 à 120), ratios
// d'affinement ≈ 2,3-2,5, zéro écrêtage aux bords du cadre.
function lcg(graine: number) {
  let s = graine >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function genRempart(): [number, number][] {
  const alea = lcg(271828);
  let pts: [number, number][] = [
    [20, 190], [240, 110], [420, 170], [610, 90], [800, 175], [980, 185],
  ];
  for (let k = 0; k < 6; k++) {
    const amp = 110 * Math.pow(2, -0.6 * k);
    const suiv: [number, number][] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[i + 1];
      suiv.push([x1, y1]);
      const ym = (y1 + y2) / 2 + (alea() * 2 - 1) * amp;
      suiv.push([(x1 + x2) / 2, Math.min(290, Math.max(10, ym))]);
    }
    suiv.push(pts[pts.length - 1]);
    pts = suiv;
  }
  return pts;
}

function genLisse(): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 48; i++) {
    const x = 20 + (960 * i) / 48;
    pts.push([x, 226 - 90 * Math.sin((Math.PI * i) / 48)]);
  }
  return pts;
}

type ModeProfil = "lisse" | "rempart";
const PROFILS: Record<ModeProfil, [number, number][]> = {
  lisse: genLisse(),
  rempart: genRempart(),
};

// Le comptage de carrés (box-counting) : on échantillonne finement la ligne et
// on note chaque case de la grille visitée.
const TAILLES = [120, 60, 30, 15]; // côté des carreaux, divisé par 2 à chaque cran
function compterCases(pts: [number, number][], s: number): Set<string> {
  const cases = new Set<string>();
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / (s / 5)));
    for (let k = 0; k <= n; k++) {
      const x = x1 + ((x2 - x1) * k) / n;
      const y = y1 + ((y2 - y1) * k) / n;
      cases.add(`${Math.floor(x / s)},${Math.floor(y / s)}`);
    }
  }
  return cases;
}
// Tout est précalculé une fois : CASES[mode][niveau] → Set des cases traversées.
const CASES: Record<ModeProfil, Set<string>[]> = {
  lisse: TAILLES.map((s) => compterCases(PROFILS.lisse, s)),
  rempart: TAILLES.map((s) => compterCases(PROFILS.rempart, s)),
};

// La dimension mesurée : pente de ln N en fonction de ln(1/s) (régression sur
// les niveaux déjà visités).
function dimensionMesuree(mode: ModeProfil, visites: number[]): number | null {
  if (visites.length < 2) return null;
  const xs = visites.map((i) => Math.log(1 / TAILLES[i]));
  const ys = visites.map((i) => Math.log(CASES[mode][i].size));
  const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
  const my = ys.reduce((a, b) => a + b, 0) / ys.length;
  let num = 0;
  let den = 0;
  for (let i = 0; i < xs.length; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) * (xs[i] - mx);
  }
  return den === 0 ? null : num / den;
}

function cheminProfil(pts: [number, number][], ferme: boolean): string {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) d += ` L ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
  if (ferme) d += ` L 980 300 L 20 300 Z`;
  return d;
}
const CHEMINS: Record<ModeProfil, { ligne: string; fond: string }> = {
  lisse: { ligne: cheminProfil(PROFILS.lisse, false), fond: cheminProfil(PROFILS.lisse, true) },
  rempart: { ligne: cheminProfil(PROFILS.rempart, false), fond: cheminProfil(PROFILS.rempart, true) },
};

const NOMS_NIVEAUX = ["très gros", "gros", "moyens", "petits"];

export default function DimensionDuVolcanClient() {
  const [mode, setMode] = useState<ModeProfil>("rempart");
  const [niveau, setNiveau] = useState(0);
  const [visites, setVisites] = useState<Record<ModeProfil, number[]>>({ lisse: [], rempart: [] });
  const [enMesure, setEnMesure] = useState(false);
  const [modeClasse, setModeClasse] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const visiter = (m: ModeProfil, i: number) => {
    setNiveau(i);
    setVisites((v) => (v[m].includes(i) ? v : { ...v, [m]: [...v[m], i].sort((a, b) => a - b) }));
  };

  const choisirNiveau = (i: number) => {
    stop();
    setEnMesure(false);
    visiter(mode, i);
  };

  const choisirMode = (m: ModeProfil) => {
    stop();
    setEnMesure(false);
    setMode(m);
    setNiveau(0);
  };

  // « Mesurer ! » : la machine parcourt les 4 grilles toute seule, du plus gros
  // carreau au plus petit, et remplit le carnet de mesures.
  const mesurer = () => {
    stop();
    setEnMesure(true);
    let i = 0;
    visiter(mode, 0);
    timerRef.current = setInterval(() => {
      i++;
      if (i >= TAILLES.length) {
        stop();
        setEnMesure(false);
        return;
      }
      visiter(mode, i);
    }, 900);
  };

  const s = TAILLES[niveau];
  const cases = CASES[mode][niveau];
  const N = cases.size;
  const vus = visites[mode];
  const d = dimensionMesuree(mode, vus);

  // Le multiplicateur : N de ce niveau ÷ N du niveau (plus gros) précédent visité.
  const multiplicateur = useMemo(() => {
    if (niveau === 0 || !vus.includes(niveau - 1) || !vus.includes(niveau)) return null;
    return CASES[mode][niveau].size / CASES[mode][niveau - 1].size;
  }, [mode, niveau, vus]);

  const dLisse = dimensionMesuree("lisse", visites.lisse);
  const dRempart = dimensionMesuree("rempart", visites.rempart);

  const verdict = (() => {
    if (enMesure) return { texte: `La machine mesure… carreaux de ${s} : ${N} carrés traversés.`, couleur: SOUS };
    if (vus.length === 0)
      return { texte: "Choisis la taille des carreaux et compte — puis affine : le nombre de carrés grandit-il vite ou doucement ?", couleur: "#5d4c40" };
    if (vus.length === 1)
      return { texte: "Maintenant, des carreaux plus petits : par combien le nombre de carrés est-il multiplié ?", couleur: "#5d4c40" };
    if (mode === "lisse")
      return {
        texte: `Ligne lisse : ×2 environ à chaque affinement → dimension mesurée d ≈ ${d!.toFixed(2)}. Une ligne lisse est de dimension 1.`,
        couleur: "#1a7f37",
      };
    return {
      texte: `Le rempart : plus que ×2 à chaque affinement → dimension mesurée d ≈ ${d!.toFixed(2)}. Plus que 1 : la rugosité se mesure !`,
      couleur: "#1a7f37",
    };
  })();

  const grand = modeClasse ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl";
  const lignesGrille = useMemo(() => {
    const xs: number[] = [];
    for (let x = 0; x <= 1000; x += s) xs.push(x);
    const ys: number[] = [];
    for (let y = 0; y <= 300; y += s) ys.push(y);
    return { xs, ys };
  }, [s]);

  return (
    <main
      className="min-h-screen pb-14"
      style={{
        backgroundColor: "#fdfaf7",
        backgroundImage:
          "linear-gradient(#e2cfc040 1px, transparent 1px), linear-gradient(90deg, #e2cfc040 1px, transparent 1px)",
        backgroundSize: "25px 25px",
        color: TEXTE,
      }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: OR }}>
          Un peu de maths · La rubrique du prof
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: BASALTE }}>
          La dimension du volcan
        </h1>
        <p className="mt-1 text-lg font-black" style={{ color: OR }}>
          De l&apos;aiguille de Hong Wang aux remparts de la Fournaise
        </p>
        <p className="mt-1 text-[13px]" style={{ color: SOUS }}>
          La rugosité d&apos;un rempart n&apos;est pas qu&apos;une impression : c&apos;est un nombre, et il se
          mesure en comptant des carrés.
        </p>

        {/* ── LE PONT : l'aiguille de la médaille Fields ── */}
        <div className="mt-3 rounded border p-3 sm:p-4" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            D&apos;où vient l&apos;idée — l&apos;aiguille de la médaille Fields 2026
          </p>
          <div className="mt-2 items-center gap-4 sm:flex">
            <Image
              src="/images/aiguille-de-kakeya.svg"
              alt="L'aiguille de Kakeya glisse et tourne dans le deltoïde à trois pointes : le demi-tour qui balaye une aire de π/8 seulement."
              width={800}
              height={450}
              unoptimized
              className="h-auto w-full rounded border sm:w-80"
              style={{ borderColor: BORD }}
            />
            <div className="mt-3 text-[13.5px] leading-6 sm:mt-0">
              <ol className="list-none space-y-1.5">
                <li>
                  <b>1.</b> Sur la page de l&apos;aiguille, l&apos;aire balayée <b>fond</b>&nbsp;: 1,57 → 0,79
                  → 0,39 → … presque 0.
                </li>
                <li>
                  <b>2.</b> Donc l&apos;aire peut <b>mentir</b>&nbsp;: un objet peut contenir une aiguille
                  dans toutes les directions en n&apos;occupant presque aucune place.
                </li>
                <li>
                  <b>3.</b> Pour dire qu&apos;un objet reste «&nbsp;épais&nbsp;» quand l&apos;aire ne dit plus
                  rien, il faut un instrument plus fin&nbsp;: la <b>dimension</b>. C&apos;est elle que{" "}
                  <b>Hong Wang</b> a domptée — en 3D, forcément 3. Sa médaille Fields 2026.
                </li>
                <li>
                  <b>4.</b> Et cet instrument, tu vas le <b>fabriquer toi-même</b> juste en dessous, en
                  comptant des carrés sur le rempart. ⤵
                </li>
              </ol>
              <p className="mt-2">
                <Link href="/aiguille-de-kakeya" className="font-black hover:underline" style={{ color: LAVE }}>
                  🪡 (re)voir la machine de l&apos;aiguille →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ── LA MACHINE : image + réglage + résultat, sur un seul écran ── */}
        <div className="mt-4 rounded border p-3 sm:p-4" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
              Compte les carrés — la grille se pose sur le profil
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

          {/* L'IMAGE : le profil, la grille, les carrés traversés */}
          <svg
            viewBox="0 0 1000 300"
            className="mt-2 w-full"
            role="img"
            aria-label={`Le profil « ${mode === "lisse" ? "ligne lisse" : "rempart de la Fournaise"} » sous une grille de carreaux de ${s} : la ligne traverse ${N} carrés.`}
          >
            {/* les carrés traversés */}
            {[...cases].map((c) => {
              const [i, j] = c.split(",").map(Number);
              return <rect key={c} x={i * s} y={j * s} width={s} height={s} fill={LAVE} opacity="0.22" />;
            })}
            {/* la grille */}
            <g stroke="#cbb6a4" strokeWidth="1">
              {lignesGrille.xs.map((x) => (
                <line key={`x${x}`} x1={x} y1={0} x2={x} y2={300} />
              ))}
              {lignesGrille.ys.map((y) => (
                <line key={`y${y}`} x1={0} y1={y} x2={1000} y2={y} />
              ))}
            </g>
            {/* le profil */}
            <path d={CHEMINS[mode].fond} fill={BASALTE} opacity="0.08" />
            <path d={CHEMINS[mode].ligne} fill="none" stroke={BASALTE} strokeWidth="2.5" strokeLinejoin="round" />
          </svg>

          {/* LE RÉSULTAT : les compteurs */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>Carreaux ({NOMS_NIVEAUX[niveau]})</p>
              <p className={`font-black ${grand}`} style={{ color: BASALTE }}>
                {s}
                <span className="text-[11px] font-bold" style={{ color: "#b9997f" }}> de côté</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>Carrés traversés</p>
              <p className={`font-black ${grand}`} style={{ color: LAVE }}>
                {N}
                {multiplicateur != null && (
                  <span className="text-[11px] font-bold" style={{ color: "#b9997f" }}>
                    {" "}(×{multiplicateur.toFixed(1)})
                  </span>
                )}
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: BORD }}>
              <p className="text-[10.5px] font-bold" style={{ color: SOUS }}>Dimension mesurée</p>
              <p className={`font-black ${grand}`} style={{ color: d != null ? "#1a7f37" : "#b9997f" }}>
                {d != null ? `≈ ${d.toFixed(2)}` : "—"}
              </p>
            </div>
          </div>

          {/* le carnet de mesures */}
          <div className="mt-2 flex flex-wrap gap-1.5 text-[11.5px] font-semibold">
            {TAILLES.map((taille, i) => {
              const fait = vus.includes(i);
              return (
                <span
                  key={taille}
                  className="rounded border px-2 py-0.5 font-mono"
                  style={{
                    borderColor: fait ? "#cbb6a4" : "#eee2d6",
                    color: fait ? BASALTE : "#c9b6a5",
                    backgroundColor: fait ? "#faf5ef" : "transparent",
                  }}
                >
                  {taille} → {fait ? `${CASES[mode][i].size} carrés` : "?"}
                </span>
              );
            })}
            {dLisse != null && dRempart != null && (
              <span className="rounded border px-2 py-0.5" style={{ borderColor: "#bfe0c8", color: "#1a7f37", backgroundColor: "#f4faf5" }}>
                lisse ≈ {dLisse.toFixed(2)} · rempart ≈ {dRempart.toFixed(2)} — la rugosité, en un nombre ✓
              </span>
            )}
          </div>

          <p className="mt-2 text-center text-[13.5px] font-bold" style={{ color: verdict.couleur }}>
            {verdict.texte}
          </p>

          {/* LE RÉGLAGE : le profil + la taille des carreaux + la mesure auto */}
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t pt-3" style={{ borderColor: "#efe4d8" }}>
            <button
              type="button"
              onClick={() => choisirMode("lisse")}
              className="rounded border px-3 py-1.5 text-[12px] font-bold"
              style={{
                borderColor: mode === "lisse" ? BASALTE : BORD,
                backgroundColor: mode === "lisse" ? BASALTE : "#faf5ef",
                color: mode === "lisse" ? "#faf5ef" : TEXTE,
              }}
            >
              〰️ Ligne lisse
            </button>
            <button
              type="button"
              onClick={() => choisirMode("rempart")}
              className="rounded border px-3 py-1.5 text-[12px] font-bold"
              style={{
                borderColor: mode === "rempart" ? BASALTE : BORD,
                backgroundColor: mode === "rempart" ? BASALTE : "#faf5ef",
                color: mode === "rempart" ? "#faf5ef" : TEXTE,
              }}
            >
              🌋 Le rempart de la Fournaise
            </button>
            <span className="mx-1 text-[11px] font-bold" style={{ color: SOUS }}>carreaux :</span>
            {TAILLES.map((taille, i) => (
              <button
                key={taille}
                type="button"
                onClick={() => choisirNiveau(i)}
                className="rounded border px-2.5 py-1.5 font-mono text-[12px] font-bold"
                style={{
                  borderColor: niveau === i ? LAVE : BORD,
                  backgroundColor: niveau === i ? LAVE : "#faf5ef",
                  color: niveau === i ? "#fff" : TEXTE,
                }}
              >
                {taille}
              </button>
            ))}
            <button
              type="button"
              onClick={mesurer}
              disabled={enMesure}
              className="ml-auto rounded px-5 py-2 text-sm font-black text-white hover:brightness-110 disabled:opacity-60"
              style={{ backgroundColor: LAVE }}
            >
              {enMesure ? "Mesure…" : "Mesurer !"}
            </button>
          </div>

          <p className="mt-2 rounded border px-3 py-2 text-[12.5px]" style={{ borderColor: "#efe4d8", backgroundColor: "#fbf7f2", color: "#5d4c40" }}>
            <span className="font-mono font-bold" style={{ color: BASALTE }}>d = ln(multiplicateur) ÷ ln(2)</span>{" "}
            — la ligne lisse : ln 2 ÷ ln 2 = <b>1</b>. Le rempart : ln 2,4 ÷ ln 2 ≈ <b>1,26</b>. C&apos;est la
            dimension «&nbsp;par comptage de boîtes&nbsp;» (Minkowski) — la même idée de dimension que dans le
            théorème de Hong Wang.
          </p>
        </div>

        {/* ── CE QUE DIT LE NOMBRE d ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#e0d0c0", backgroundColor: "#faf5ef", color: TEXTE }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Ce que dit le nombre d — une règle graduée pour la rugosité
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>
              <b>d = 1</b> — une ligne lisse : quand on regarde de plus près, rien de nouveau n&apos;apparaît.
            </li>
            <li>
              <b>1 &lt; d &lt; 2</b> — une courbe qui gigote <i>à toutes les échelles</i> : chaque zoom révèle
              de nouveaux détails. La côte de Grande-Bretagne mesurée par Lewis Fry Richardson, puis reprise par
              Benoît Mandelbrot (1967), donne d ≈ 1,25 — nos côtes et remparts découpés sont du même ordre.
            </li>
            <li>
              <b>d = 2</b> — la courbe remplit carrément une surface ; et pour les <i>reliefs</i> en 3D, la
              dimension vit entre 2 (plaine lisse) et 3 (montagne infiniment rugueuse).
            </li>
          </ul>
          <p className="mt-2">
            Le théorème de <b>Hong Wang et Joshua Zahl</b> (2025) vit exactement sur cette règle graduée&nbsp;:
            un ensemble de l&apos;espace qui contient une aiguille dans toutes les directions peut être de
            volume minuscule, mais sa dimension ne descend jamais sous <b>3</b>. Pas de fantôme poussiéreux —
            c&apos;est ce résultat que la médaille Fields 2026 récompense.
          </p>
        </div>

        {/* ── LE MÊME VOLCAN, TROIS GESTES ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: BORD, backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Le même volcan, trois gestes de mathématicienne
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              🗺️ <b>Projeter (π̃).</b> Une carte topographique, c&apos;est l&apos;ombre du relief écrasé sur le
              plan — et les courbes de niveau relient les points qui se projettent à la même altitude.
              Exactement le <span className="font-mono">L = π̃(T)</span> de son tableau.
            </li>
            <li>
              📦 <b>Ranger dans des tiroirs (F′ ⊆ F).</b> L&apos;observatoire du Piton de la Fournaise (OVPF)
              capte des essaims de micro-séismes : on les range par zone et par heure, et le tiroir le plus
              plein trahit le magma qui monte. Choisir la boîte la plus riche, c&apos;est le
              «&nbsp;pigeonhole&nbsp;» de sa feuille.
            </li>
            <li>
              📏 <b>Mesurer une dimension.</b> La machine ci-dessus : compter des carrés à plusieurs échelles,
              et lire la rugosité dans le multiplicateur. C&apos;est la notion au cœur de sa médaille.
            </li>
          </ul>
        </div>

        {/* ── LES DÉFIS ── */}
        <DefisSimulateur
          titre="Les défis de la dimension — du CP à la Terminale"
          coupDePouce="Coup de pouce : la machine te donne les multiplicateurs — ligne lisse ≈ ×2, rempart ≈ ×2,4 à chaque affinement."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* ── LES PONTS ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/aiguille-de-kakeya"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: LAVE }}
          >
            🪡 L&apos;aiguille de Hong Wang — la machine de la médaille Fields
          </Link>
          <Link
            href="/simulateur-volcan"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: BASALTE }}
          >
            🌋 Le volcan de la Fournaise — règle la lave
          </Link>
          <Link
            href="/diagonale-des-fous"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#e0d0c0", backgroundColor: "#faf5ef", color: TEXTE }}
          >
            🏃 La Diagonale des Fous — l&apos;autre profil de l&apos;île
          </Link>
        </div>

        {/* ── L'HONNÊTETÉ ── */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: BORD, color: SOUS }}>
          Machine pédagogique&nbsp;: le profil du rempart est un dessin stylisé, calibré pour une dimension
          d&apos;environ 1,25 — pas un relevé topographique de la Fournaise (les mesures réelles de côtes et de
          reliefs découpés donnent des valeurs de cet ordre, 1,1 à 1,3). Le comptage de carrés est la version
          simplifiée de la dimension de Minkowski&nbsp;; les comptes et la dimension affichés sont réellement
          calculés sur le dessin. L&apos;histoire des tiroirs de l&apos;OVPF illustre le principe de
          localisation, pas leur algorithme exact. Et le théorème de Hong Wang porte sur les ensembles de
          Kakeya en 3D, pas sur les volcans — c&apos;est la même <i>notion</i> de dimension, pas le même
          théorème.
        </p>
      </div>
    </main>
  );
}
