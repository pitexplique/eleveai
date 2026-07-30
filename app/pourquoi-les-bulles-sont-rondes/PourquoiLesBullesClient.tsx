"use client";

// « Pourquoi les bulles sont rondes » — machine « dans ta main » (rubrique
// « Un peu de maths »). La MÊME ficelle (périmètre fixe P), une forme qu'on
// arrondit : à chaque côté ajouté, l'aire enfermée grimpe. Un polygone régulier
// de n côtés et de périmètre P enferme
//     A(n) = P² / ( 4·n·tan(π/n) )     et sa « note »  q(n) = 4πA/P² = π/(n·tan(π/n))
// La note monte vers 1 sans jamais le dépasser : le CERCLE est le champion
// (q = 1 pile). C'est l'inégalité isopérimétrique 4πA ≤ P². La bulle de savon
// « résout » ce problème sans calcul : sa peau se contracte pour avoir le moins
// de surface possible (tension de surface = énergie minimale) → en 2D un cercle,
// en 3D (la vraie bulle) une sphère.
//
// La question d'enfance de Yilin Wang (mathématicienne, IHÉS, prix Salem 2024).
//
// Contrainte (Frédéric) : IMAGE (la ficelle qui s'arrondit) + RÉGLAGE (le nombre
// de côtés) + RÉSULTAT (aire + note) tiennent sur un SEUL écran ; le reste dessous.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const BULLE = "#0284c7"; // l'accent — le bleu de la bulle
const FILM = "#38bdf8"; // le film de savon
const CIBLE = "#f59e0b"; // le cercle champion (la cible)
const ENCRE = "#0c4a6e"; // le texte profond

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

// La rampe CP → Terminale : la MÊME idée (« à ficelle égale, le rond enferme le
// plus »), un outil qui grandit — du périmètre d'un carré au quotient
// isopérimétrique. Réponse numérique unique, vérifiable en réglant la machine.
const DEFIS: DefiSimulateur[] = [
  {
    id: "bulle-cp-cote",
    question:
      "CP · CE1 — Ta ficelle mesure 12 cm. Tu en fais un carré parfait. Combien mesure chaque côté ?",
    reponse: 3,
    unite: "cm",
    indice: "Un carré a 4 côtés égaux : 12 ÷ 4.",
    calcul: "12 ÷ 4 = 3 cm par côté : la ficelle se partage en 4 parts égales.",
    tolerance: 0.1,
  },
  {
    id: "bulle-ce2-aire-carre",
    question:
      "CE2 · CM1 — Ce carré fait 3 cm de côté. Quelle est son aire (la place à l'intérieur) ?",
    reponse: 9,
    unite: "cm²",
    indice: "Aire d'un carré = côté × côté : 3 × 3.",
    calcul: "3 × 3 = 9 cm² : avec 12 cm de ficelle, le carré enferme 9 cm².",
    tolerance: 0.1,
  },
  {
    id: "bulle-cm1-rectangle-plat",
    question:
      "CM1 · CM2 — Même ficelle de 12 cm, mais aplatie en rectangle de 1 cm sur 5 cm. Quelle est son aire ?",
    reponse: 5,
    unite: "cm²",
    indice: "Aire d'un rectangle = longueur × largeur : 5 × 1.",
    calcul: "5 × 1 = 5 cm². Plus la forme est plate, moins elle enferme : le carré (9) fait déjà mieux.",
    tolerance: 0.1,
  },
  {
    id: "bulle-cm2-ecart",
    question:
      "CM2 · 6ᵉ — Avec la même ficelle : le carré enferme 9 cm², le rectangle plat 5 cm². Combien d'aire le carré gagne-t-il ?",
    reponse: 4,
    unite: "cm²",
    indice: "Une soustraction : 9 − 5.",
    calcul: "9 − 5 = 4 cm². Même tour de taille, et pourtant le carré tient 4 cm² de plus que le rectangle plat.",
    tolerance: 0.1,
  },
  {
    id: "bulle-6e-hexagone",
    question:
      "6ᵉ · 5ᵉ — Règle la machine sur 6 côtés (un hexagone). Quelle aire la ficelle enferme-t-elle ? (lis la machine, à 0,1 près)",
    reponse: 10.4,
    unite: "cm²",
    indice: "Ajoute des côtés : de 4 (carré) à 6. L'aire affichée monte.",
    calcul: "L'hexagone régulier de périmètre 12 enferme ≈ 10,4 cm² : plus de côtés = plus arrondi = plus d'aire.",
    tolerance: 0.2,
  },
  {
    id: "bulle-5e-rayon",
    question:
      "5ᵉ · 4ᵉ — Le cercle qui a 12 cm de tour a un rayon r = 12 ÷ (2π). Donne-le à 0,1 près.",
    reponse: 1.9,
    unite: "cm",
    indice: "Le périmètre d'un cercle = 2πr, donc r = périmètre ÷ (2π) = 12 ÷ 6,28.",
    calcul: "12 ÷ (2 × 3,14) = 12 ÷ 6,28 ≈ 1,9 cm : le rayon du cercle de même ficelle que le carré.",
    tolerance: 0.15,
  },
  {
    id: "bulle-4e-aire-max",
    question:
      "4ᵉ · 3ᵉ — Souffle la bulle à fond (le plus de côtés). Quelle aire le presque-cercle enferme-t-il ? (à 0,1 près)",
    reponse: 11.4,
    unite: "cm²",
    indice: "C'est l'aire la plus grande possible : A = P² ÷ (4π) = 144 ÷ 12,57.",
    calcul: "A_max = 144 ÷ (4π) ≈ 11,5 cm² : aucune forme de 12 cm de tour ne fait mieux que le cercle.",
    tolerance: 0.3,
  },
  {
    id: "bulle-2nde-note-carre",
    question:
      "2ⁿᵈᵉ — La « note » d'une forme vaut q = 4πA ⁄ P². Pour le carré (A = 9, P = 12), calcule q à 0,01 près.",
    reponse: 0.79,
    unite: "",
    indice: "q = 4 × 3,1416 × 9 ÷ (12 × 12) = 4π × 9 ÷ 144.",
    calcul: "4π × 9 ÷ 144 = 36π ÷ 144 = π ÷ 4 ≈ 0,79 : le carré n'atteint que 0,79, pas 1.",
    tolerance: 0.02,
  },
  {
    id: "bulle-1re-note-max",
    question:
      "1ʳᵉ · Terminale — La note q = 4πA ⁄ P² ne dépasse jamais une certaine valeur, atteinte par le seul cercle. Quelle est cette note maximale ?",
    reponse: 1,
    unite: "",
    indice: "L'égalité 4πA = P² a lieu uniquement pour le cercle : q vaut alors…",
    calcul: "q_max = 1 : c'est l'inégalité isopérimétrique 4πA ≤ P², avec égalité pour le cercle seul. La bulle « vise » ce 1.",
    tolerance: 0.01,
  },
];

// --- La géométrie ------------------------------------------------------------
const P = 12; // le périmètre (la ficelle), FIXE
const N_MIN = 3;
const N_MAX = 40;
const N0 = 4; // on part du carré : la forme la plus familière (note 0,79)

// Le cercle limite : rayon P/(2π), aire P²/(4π), note = 1.
const R_CERCLE = P / (2 * Math.PI);
const AIRE_CERCLE = (P * P) / (4 * Math.PI);

// Un polygone régulier de n côtés et de périmètre P : aire, note (quotient
// isopérimétrique) et rayon circonscrit (en unités). Rayon > R_CERCLE, → R_CERCLE.
function forme(n: number) {
  const tan = Math.tan(Math.PI / n);
  const aire = (P * P) / (4 * n * tan);
  const note = Math.PI / (n * tan);
  const rayon = P / (2 * n * Math.sin(Math.PI / n));
  return { aire, note, rayon };
}

// --- La scène (px) -----------------------------------------------------------
const VBW = 340;
const VBH = 300;
const CX = 170;
const CY = 148;
const R_PX = 104; // rayon du cercle-cible à l'écran
const SCALE = R_PX / R_CERCLE; // px par unité

export default function PourquoiLesBullesClient() {
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

  // « Souffler la bulle » : on ajoute des côtés jusqu'à ce que la forme
  // devienne (presque) un cercle — l'aire grimpe sous les yeux.
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

  // La silhouette du polygone (rayon circonscrit → px), sommet en haut.
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
        texte: `Presque un cercle : note ${note.toFixed(2).replace(".", ",")} ≈ 1,00. Aucune forme de 12 cm de tour n'enferme plus — c'est l'inégalité isopérimétrique.`,
        couleur: "#0f766e",
      };
    if (note >= 0.9)
      return {
        texte: `Ça s'arrondit : la ficelle enferme ${aire.toFixed(1).replace(".", ",")} cm², note ${note
          .toFixed(2)
          .replace(".", ",")}. On approche du champion.`,
        couleur: BULLE,
      };
    return {
      texte: `Encore des coins. La ficelle enferme ${aire
        .toFixed(1)
        .replace(".", ",")} cm² — le cercle, lui, en tiendrait ${AIRE_CERCLE.toFixed(1).replace(
        ".",
        ",",
      )}. Ajoute des côtés.`,
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
          Un peu de maths · La rubrique du prof
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: BULLE }}>
          Pourquoi les bulles de savon sont-elles rondes&nbsp;?
        </h1>
        <p className="mt-1 text-lg font-black" style={{ color: "#0369a1" }}>
          À ficelle égale, quelle forme enferme le plus de place&nbsp;?
        </p>
        <p className="mt-1 text-[13px]" style={{ color: "#4d7f97" }}>
          Le savon est <b>paresseux</b>&nbsp;: sa peau se contracte pour avoir le <b>moins de surface possible</b>. En 2D, la
          forme championne est le <b>cercle</b>&nbsp;; en 3D, la <b>sphère</b>. La question qu&apos;une mathématicienne,{" "}
          <a
            href="https://www.youtube.com/watch?v=nAh4xLkmLNM"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:underline"
            style={{ color: "#c026d3" }}
          >
            Yilin Wang
          </a>
          , se posait enfant.{" "}
          <a
            href="https://youtu.be/LglNQebtdGs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:underline"
            style={{ color: "#c81e1e" }}
          >
            ▶ voir la vidéo (2 min)
          </a>
        </p>

        {/* ── LA MACHINE : la ficelle qui s'arrondit + réglage + résultat ── */}
        <div className="mt-3 rounded border p-3 sm:p-4" style={{ borderColor: "#bae6fd", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: FILM }}>
              La même ficelle (12 cm) — ajoute des côtés, l&apos;aire grimpe
            </p>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: "#bae6fd", color: "#4d7f97" }}
            >
              {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
            </button>
          </div>

          {/* L'IMAGE : le cercle-cible (champion) + le polygone qui s'arrondit */}
          <svg
            viewBox={`0 0 ${VBW} ${VBH}`}
            className="mt-2 w-full"
            style={{ maxHeight: 340 }}
            role="img"
            aria-label={`Une ficelle de périmètre fixe formée en polygone à ${sides} côtés. Elle enferme ${aire.toFixed(
              1,
            )} centimètres carrés, sa note isopérimétrique est ${note.toFixed(
              2,
            )}. Le cercle cible, en pointillés, enferme ${AIRE_CERCLE.toFixed(1)} centimètres carrés, note 1.`}
          >
            <defs>
              <radialGradient id="savon" cx="42%" cy="38%" r="72%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.28" />
              </radialGradient>
            </defs>

            {/* quelques bulles flottantes, pour le décor */}
            {[
              { x: 36, y: 40, r: 9 },
              { x: 304, y: 54, r: 13 },
              { x: 22, y: 250, r: 7 },
              { x: 316, y: 232, r: 10 },
            ].map((b) => (
              <circle key={`${b.x}-${b.y}`} cx={b.x} cy={b.y} r={b.r} fill={FILM} opacity="0.12" />
            ))}

            {/* le cercle-cible : le champion (note 1,00) */}
            <circle cx={CX} cy={CY} r={R_PX} fill="none" stroke={CIBLE} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.8" />
            <text x={CX} y={CY - R_PX - 8} fontSize={modeClasse ? 15 : 12} fontWeight={800} fill="#b45309" textAnchor="middle">
              le cercle · note 1,00
            </text>

            {/* la ficelle : polygone régulier de périmètre fixe */}
            <polygon points={points} fill="url(#savon)" stroke={FILM} strokeWidth="3" strokeLinejoin="round" />
            {sommets.map((p, i) => (
              <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="3.2" fill={BULLE} />
            ))}

            {/* la note affichée au centre */}
            <text x={CX} y={CY - 6} fontSize={modeClasse ? 30 : 24} fontWeight={900} fill={BULLE} textAnchor="middle">
              {note.toFixed(2).replace(".", ",")}
            </text>
            <text x={CX} y={CY + 14} fontSize={modeClasse ? 14 : 11} fontWeight={700} fill="#4d7f97" textAnchor="middle">
              4πA ⁄ P²
            </text>
          </svg>

          {/* LE RÉSULTAT : les compteurs */}
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded border p-2 text-center" style={{ borderColor: "#bae6fd" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4d7f97" }}>Côtés</p>
              <p className={`font-black ${grand}`} style={{ color: BULLE }}>{sides}</p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#bae6fd" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4d7f97" }}>Périmètre (fixe)</p>
              <p className={`font-black ${grand}`} style={{ color: "#0369a1" }}>
                12<span className="text-[11px] font-bold" style={{ color: "#7ba9bf" }}> cm</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#bae6fd", backgroundColor: "#f0fdf4" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4d7f97" }}>Aire enfermée</p>
              <p className={`font-black ${grand}`} style={{ color: "#0f766e" }}>
                {aire.toFixed(1).replace(".", ",")}<span className="text-[11px] font-bold" style={{ color: "#7ba9bf" }}> cm²</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#bae6fd", backgroundColor: "#fffbeb" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#4d7f97" }}>Note 4πA ⁄ P²</p>
              <p className={`font-black ${grand}`} style={{ color: "#b45309" }}>{note.toFixed(2).replace(".", ",")}</p>
            </div>
          </div>

          {/* la jauge de la note : se remplit vers 1 (le cercle) */}
          <div className="mt-2">
            <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#e0f2fe" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(note * 100).toFixed(1)}%`, backgroundColor: CIBLE }}
              />
            </div>
            <p className="mt-1 text-right text-[10.5px] font-semibold" style={{ color: "#4d7f97" }}>
              0 ——— le cercle = 1,00 (le maximum)
            </p>
          </div>

          <p className="mt-2 text-center text-[13.5px] font-bold" style={{ color: verdict.couleur }}>
            {verdict.texte}
          </p>

          {/* LE RÉGLAGE : le nombre de côtés + les actions */}
          <div className="mt-2 flex flex-wrap items-center gap-3 border-t pt-3" style={{ borderColor: "#dbeefb" }}>
            <label htmlFor="cotes" className="flex flex-1 items-center gap-3 text-sm font-black" style={{ color: BULLE }}>
              Nombre de côtés
              <input
                id="cotes"
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
              🫧 Souffler la bulle
            </button>
            <button
              type="button"
              onClick={() => reglerCotes(N0)}
              className="rounded border px-3 py-2 text-sm font-bold hover:brightness-95"
              style={{ borderColor: "#bae6fd", backgroundColor: "#eff9ff", color: BULLE }}
            >
              ↺ Le carré
            </button>
          </div>

          <p className="mt-2 rounded border px-3 py-2 text-[12.5px]" style={{ borderColor: "#dbeefb", backgroundColor: "#f5fbff", color: "#3f6f83" }}>
            <span className="font-mono font-bold" style={{ color: BULLE }}>4πA ≤ P²</span> — à périmètre P donné,
            l&apos;aire A ne dépasse jamais celle du cercle. La <b>note</b> 4πA/P² vaut <b>1</b> pour le seul cercle,
            et moins pour tout le reste. La bulle, elle, « vise » ce 1 sans calculer.
          </p>
        </div>

        {/* ── CE QUE RACONTE YILIN WANG ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#f0d3fb", backgroundColor: "#fdf4ff", color: "#701a75" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: "#c026d3" }}>
            La question d&apos;enfance de Yilin Wang
          </p>
          <p className="mt-2">
            <b>Yilin Wang</b> est mathématicienne (Institut des Hautes Études Scientifiques, <b>prix Salem 2024</b>).
            Dans une interview, elle raconte que, <b>enfant</b>, elle demandait à ses parents&nbsp;:{" "}
            <i>«&nbsp;pourquoi les bulles de savon sont-elles rondes&nbsp;?&nbsp;»</i> Une question toute simple — et la
            porte d&apos;entrée d&apos;une grande idée mathématique.
          </p>
          <p className="mt-2">
            Elle ajoute que sa <b>mère</b>, première de sa promotion en physique et devenue architecte, lui a montré très
            tôt que <b>le genre n&apos;a aucune importance</b> en sciences. Une question d&apos;enfant, une vocation&nbsp;: c&apos;est
            exactement l&apos;esprit d&apos;<i>Un peu de maths</i>.
          </p>
          <a
            href="https://www.youtube.com/watch?v=nAh4xLkmLNM"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-black hover:underline"
            style={{ color: "#c026d3" }}
          >
            ▶ Voir l&apos;interview (CIRM)
          </a>
        </div>

        {/* ── LE SAVON PARESSEUX (2D → 3D) ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#bae6fd", backgroundColor: "#eff9ff", color: ENCRE }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: FILM }}>
            Le savon est paresseux — de la ficelle à la vraie bulle
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="sm:flex-1">
              <p>
                La peau d&apos;une bulle est <b>tendue</b>&nbsp;: comme un élastique, elle tire de partout et cherche à se
                réduire. Moins de surface = moins d&apos;énergie. En 2D (notre ficelle), la forme qui enferme une aire
                donnée avec le <b>moins de contour</b> est le <b>cercle</b>. En 3D, la vraie bulle enferme un <b>volume
                d&apos;air fixe</b> avec le <b>moins de peau</b>&nbsp;: c&apos;est la <b>sphère</b>.
              </p>
              <p className="mt-2 rounded border border-dashed px-3 py-2 font-mono text-[13px]" style={{ borderColor: FILM + "88", color: BULLE }}>
                volume fixe → surface minimale → sphère
              </p>
            </div>
            <svg viewBox="0 0 120 120" className="mx-auto w-28 shrink-0" role="img" aria-label="Une bulle sphérique dont la peau se contracte vers le centre">
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
                    markerEnd="url(#fleche)"
                  />
                );
              })}
              <defs>
                <marker id="fleche" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6 Z" fill={BULLE} />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* ── POURQUOI LE ROND GAGNE ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#bae6fd", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: FILM }}>
            Pourquoi le rond gagne toujours — la note isopérimétrique
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              📐 <b>Une note pour chaque forme.</b> On calcule <b>q = 4πA/P²</b>&nbsp;: elle vaut <b>1</b> pour le cercle,
              <b> 0,91</b> pour l&apos;hexagone, <b>0,79</b> pour le carré, et s&apos;écroule pour les formes plates.
            </li>
            <li>
              🔵 <b>Plus de côtés, meilleure note.</b> En arrondissant la ficelle (triangle → carré → hexagone → …), la
              note grimpe vers 1, mais ne l&apos;<i>atteint</i> qu&apos;à la limite&nbsp;: le cercle.
            </li>
            <li>
              🫧 <b>La bulle triche… en physique.</b> Elle ne calcule rien&nbsp;: sa tension de surface la pousse
              directement vers la forme de note maximale. Le résultat des maths, obtenu par la nature.
            </li>
          </ul>
          <p className="mt-2 text-[12.5px]" style={{ color: "#4d7f97" }}>
            La même idée explique les gouttes de rosée, les billes de plomb refroidies en tombant, et pourquoi une
            goutte d&apos;huile dans l&apos;eau se met en boule.
          </p>
        </div>

        {/* ── LES DÉFIS ── */}
        <DefisSimulateur
          titre="Les défis de la bulle — du CP à la Terminale"
          coupDePouce="Coup de pouce : règle le nombre de côtés et lis l'aire ; souffle la bulle et lis la note — la machine vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* ── LES PONTS ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/LglNQebtdGs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: "#c81e1e" }}
          >
            ▶ Regarder la vidéo (2 min) — pourquoi les bulles sont rondes
          </a>
          <a
            href="https://youtu.be/h2t4Ce0ucfI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-bold hover:underline"
            style={{ color: BULLE }}
          >
            🌍 Watch in English →
          </a>
          <Link
            href="/aiguille-de-kakeya"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: BULLE }}
          >
            🪡 L&apos;aiguille de Kakeya — retourner une aiguille sans place
          </Link>
          <Link
            href="/corail-du-lagon"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#bae6fd", backgroundColor: "#eff9ff", color: ENCRE }}
          >
            🪸 Le corail du lagon — mesurer sans toucher
          </Link>
        </div>

        {/* ── L'HONNÊTETÉ ── */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#bae6fd", color: "#4d7f97" }}>
          Machine pédagogique&nbsp;: on compare des <i>polygones réguliers</i> à périmètre fixe ; leur aire{" "}
          <span className="font-mono">A(n) = P²/(4n·tan(π/n))</span> tend vers celle du cercle{" "}
          <span className="font-mono">P²/(4π)</span> quand le nombre de côtés augmente. L&apos;<b>inégalité
          isopérimétrique</b> (le cercle maximise l&apos;aire à périmètre donné ; la sphère minimise la surface à volume
          donné) est un <i>théorème</i>&nbsp;; la bulle, elle, le « résout » par la physique — sa tension de surface
          minimise l&apos;énergie, donc la surface. L&apos;anecdote d&apos;enfance de Yilin Wang est rapportée d&apos;après son
          interview (source liée)&nbsp;: à vérifier au montage pour la formulation exacte.
        </p>
      </div>
    </main>
  );
}
