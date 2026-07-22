"use client";

// « Plus j'avance, plus ma vitesse augmente » — la machine de l'article
// exponentiel (rubrique « Un peu de maths »). L'élève A LA MAIN sur DEUX
// faces en miroir :
//   • LA MONTÉE (e^x) — sa vitesse est proportionnelle à sa hauteur : plus il
//     avance, plus il accélère. Le message : le plat du début n'est pas
//     l'échec, c'est l'élan qui se charge.
//   • LA DESCENTE (e^(-x)) — ce qu'on ne recharge pas s'efface (la courbe de
//     l'oubli). Bouton « je révise » : chaque rappel relance la courbe ET la
//     fait redescendre moins vite. Oublier n'est pas un échec, c'est une loi.
// Même patte que la cloche et les epsilons : papier-cahier, né d'un stylo.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const ENCRE = "#2b4a9b";
const OR = "#b97e12";
const VERT = "#1a7f37";

// La montée
const TA = 3; // la « distance parcourue » (unités d'avancement)
const GA_MIN = 0.4;
const GA_MAX = 1.3;
// La descente / l'oubli
const TB = 12; // en jours
const TAU0 = 2.2; // solidité de départ (demi-vie ≈ 1,5 j) — un souvenir frais
const FACTEUR_REVISION = 1.9; // chaque révision consolide : la demi-vie s'allonge
const LN2 = Math.log(2);

const COULEURS_DEFIS: CouleursDefis = {
  fond: "#fdf9ef",
  fondProfond: "#f6edd8",
  bord: "#e3d3a8",
  accent: OR,
  texte: "#3a3325",
  sousTexte: "#8a7a55",
  ok: "#1a7f37",
  rate: "#b3261e",
};

const DEFIS: DefiSimulateur[] = [
  {
    id: "expo-regle-70",
    question:
      "LA MONTÉE. Un truc grandit de 10 % à chaque étape. En combien d'étapes double-t-il, à peu près ? (règle des 70 : 70 ÷ le pourcentage)",
    reponse: 7,
    unite: "étapes",
    indice: "70 ÷ 10 = ?  C'est la « règle des 70 » pour toute croissance qui se nourrit d'elle-même.",
    calcul: "70 ÷ 10 = 7 étapes pour doubler. À +10 % par étape, on double en ~7 coups.",
    tolerance: 0.6,
  },
  {
    id: "expo-demivie-6j",
    question:
      "LA DESCENTE. Un souvenir perd la MOITIÉ de sa force tous les 3 jours. Après 6 jours (sans réviser), quelle fraction reste-t-il ? (en %)",
    reponse: 25,
    unite: "%",
    indice: "6 jours = deux demi-vies. Chaque demi-vie coupe en deux : 100 → 50 → …",
    calcul: "100 % → (3 j) 50 % → (6 j) 25 %. Deux demi-vies, deux moitiés.",
    tolerance: 1.5,
  },
  {
    id: "expo-trois-demivies",
    question:
      "Toujours la descente : après TROIS demi-vies, combien reste-t-il de la force de départ ? (en %)",
    reponse: 12.5,
    unite: "%",
    indice: "100 → 50 → 25 → …  On coupe encore en deux.",
    calcul: "100 % → 50 % → 25 % → 12,5 %. Jamais tout à fait zéro : c'est ça, l'exponentielle.",
    tolerance: 1,
  },
  {
    id: "expo-carbone14",
    question:
      "Le carbone 14 perd sa moitié tous les 5 700 ans (sa demi-vie). Un vieil os n'en contient plus que le QUART. Combien de demi-vies se sont écoulées ?",
    reponse: 2,
    unite: "demi-vies",
    indice: "Le quart = la moitié de la moitié. Combien de coupes en deux ?",
    calcul: "Entier → 1/2 → 1/4 : deux demi-vies, soit environ 11 400 ans. C'est la datation au carbone 14.",
    tolerance: 0.4,
  },
  {
    id: "expo-cari-newton",
    question:
      "Un cari sort de la marmite à 90 °C, la cuisine est à 30 °C. L'ÉCART (60 °C) fond de moitié toutes les 15 min (loi de Newton). Quelle température fait le cari après 30 min ?",
    reponse: 45,
    unite: "°C",
    indice: "L'écart se coupe en deux : 60 → 30 → 15. La température = 30 °C (la pièce) + l'écart qui reste.",
    calcul: "Écart 60 → (15 min) 30 → (30 min) 15. Cari = 30 + 15 = 45 °C. C'est l'écart qui décroît en exponentielle, pas la température.",
    tolerance: 1,
  },
];

const fmt = (x: number) => {
  if (x >= 100 || Math.abs(x - Math.round(x)) < 0.005)
    return Math.round(x).toLocaleString("fr-FR");
  return x.toFixed(x >= 10 ? 1 : 2).replace(".", ",");
};

export default function ExponentielleClient() {
  const [modeClasse, setModeClasse] = useState(false);
  useEffect(() => {
    setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      return !v;
    });
  };
  const grand = modeClasse ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl";

  // ── LA MONTÉE ─────────────────────────────────────────────────────────────
  const [g, setG] = useState(0.85); // l'élan (la pente au départ)
  const [tA, setTA] = useState(1.5); // où j'en suis
  const [filmA, setFilmA] = useState(false);

  useEffect(() => {
    if (!filmA) return;
    const id = setInterval(
      () => setTA((v) => Math.min(v + TA / 90, TA)),
      50,
    );
    return () => clearInterval(id);
  }, [filmA]);
  useEffect(() => {
    if (filmA && tA >= TA) setFilmA(false);
  }, [filmA, tA]);
  const basculerFilmA = () => {
    if (filmA) return setFilmA(false);
    if (tA >= TA) setTA(0);
    setFilmA(true);
  };

  const montee = useMemo(() => {
    const maxH = Math.exp(g * TA) * 1.06; // un peu de marge en haut
    const xs = (t: number) => 40 + (t / TA) * 940;
    const ys = (h: number) => 410 - (h / maxH) * 380;
    const courbe = Array.from({ length: 121 }, (_, i) => {
      const t = (TA * i) / 120;
      return `${i === 0 ? "M" : "L"} ${xs(t).toFixed(1)} ${ys(Math.exp(g * t)).toFixed(1)}`;
    }).join(" ");
    const hA = Math.exp(g * tA); // hauteur au point (h(0) = 1)
    const px = xs(tA);
    const py = ys(hA);
    // La tangente : sa pente = g·h (la vitesse). On la trace « en vrai » pour
    // qu'on VOIE qu'elle se redresse à mesure que la hauteur monte.
    const tan = (t: number) => hA + g * hA * (t - tA);
    const tL = Math.max(0, tA - 0.55);
    const tR = Math.min(TA, tA + 0.55);
    return {
      xs,
      ys,
      courbe,
      px,
      py,
      tanX1: xs(tL),
      tanY1: ys(tan(tL)),
      tanX2: xs(tR),
      tanY2: ys(tan(tR)),
      ratio: hA, // vitesse ici ÷ vitesse au départ = h(tA)/h(0) = hA
    };
  }, [g, tA]);

  // ── LA DESCENTE / L'OUBLI ─────────────────────────────────────────────────
  const [tB, setTB] = useState(3);
  const [revisions, setRevisions] = useState<number[]>([0]); // appris à t = 0

  const reviser = () => {
    setRevisions((r) => {
      const dernier = r[r.length - 1];
      if (tB <= dernier + 0.15) return r; // déjà révisé ici
      return [...r, tB];
    });
  };
  const rejouer = () => setRevisions([0]);

  const descente = useMemo(() => {
    const xs = (t: number) => 40 + (t / TB) * 940;
    const ys = (r: number) => 210 - r * 175;
    // τ du segment n° i (entre la révision i et la suivante) : chaque révision
    // consolide → la demi-vie s'allonge (τ ← τ·FACTEUR).
    const tau = (i: number) => TAU0 * Math.pow(FACTEUR_REVISION, i);

    // La courbe « je révise » : dents de scie, chaque révision relance à 100 %.
    let sciePath = "";
    for (let i = 0; i < revisions.length; i++) {
      const t0 = revisions[i];
      const t1 = i + 1 < revisions.length ? revisions[i + 1] : TB;
      const ti = tau(i);
      const N = 40;
      for (let s = 0; s <= N; s++) {
        const t = t0 + ((t1 - t0) * s) / N;
        const r = Math.exp(-(t - t0) / ti);
        sciePath += `${sciePath === "" ? "M" : "L"} ${xs(t).toFixed(1)} ${ys(r).toFixed(1)} `;
      }
    }
    // La courbe « sans jamais réviser » (fantôme, pour comparer).
    const fantome = Array.from({ length: 81 }, (_, i) => {
      const t = (TB * i) / 80;
      return `${i === 0 ? "M" : "L"} ${xs(t).toFixed(1)} ${ys(Math.exp(-t / TAU0)).toFixed(1)}`;
    }).join(" ");

    // Rétention au curseur tB, sur le segment courant.
    let idx = 0;
    for (let i = 0; i < revisions.length; i++) if (tB >= revisions[i]) idx = i;
    const retNow = Math.exp(-(tB - revisions[idx]) / tau(idx));
    const retFantome = Math.exp(-tB / TAU0);
    const demiVieNow = tau(idx) * LN2; // combien de jours pour en perdre la moitié, ICI
    const demiVie0 = TAU0 * LN2;

    // marqueurs de révision (les traits verticaux)
    const marks = revisions.map((t) => ({ t, x: xs(t) }));

    return {
      xs,
      ys,
      sciePath: sciePath.trim(),
      fantome,
      retNow,
      retFantome,
      demiVieNow,
      demiVie0,
      marks,
      nbRev: revisions.length - 1, // le premier n'est pas une révision, c'est l'apprentissage
    };
  }, [revisions, tB]);

  return (
    <main
      className="min-h-screen pb-14"
      style={{
        backgroundColor: "#fcfcf7",
        backgroundImage:
          "linear-gradient(#cfe0f230 1px, transparent 1px), linear-gradient(90deg, #cfe0f230 1px, transparent 1px)",
        backgroundSize: "25px 25px",
        color: "#26324a",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: OR }}>
          Un peu de maths · La rubrique du prof
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: ENCRE }}>
          Plus j&apos;avance, plus ma vitesse augmente
        </h1>
        <p className="mt-3 text-[15px] leading-7">
          Tout est parti d&apos;un dessin au stylo sur une feuille à carreaux : deux
          courbes en <b>miroir</b> autour d&apos;un axe. L&apos;intuition derrière : il
          existe une courbe dont la <b>pente est égale à sa propre hauteur</b> —{" "}
          <b>f&apos;&nbsp;=&nbsp;f</b>. Autrement dit, <b style={{ color: VERT }}>ta vitesse est
          proportionnelle à ce que tu as déjà parcouru</b>. Au début, ça paraît plat, on
          dirait que rien ne bouge&nbsp;: c&apos;est faux — ta vitesse, elle, n&apos;a jamais
          cessé de grandir. Et la même loi, dans l&apos;autre sens, décrit ce qui{" "}
          <b style={{ color: OR }}>s&apos;efface quand on ne le recharge pas</b> — la courbe de
          l&apos;oubli. Deux visages d&apos;une seule règle. Ni l&apos;un ni l&apos;autre n&apos;est
          tombé du ciel.
        </p>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={basculerModeClasse}
            className="rounded border px-2 py-0.5 text-[11px] font-bold"
            style={{ borderColor: "#d5ddf0", color: "#6b7794" }}
          >
            {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
          </button>
        </div>

        {/* ══ LA MONTÉE — ma vitesse grandit avec ma hauteur ═══════════════════ */}
        <div className="mt-4 rounded border p-4" style={{ borderColor: "#cfe6d5", backgroundColor: "#f6fbf7" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: VERT }}>
            🌱 La montée — plus j&apos;avance, plus j&apos;accélère
          </p>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="ou" className="text-sm font-black" style={{ color: ENCRE }}>
              où j&apos;en suis sur le chemin
            </label>
            <button
              type="button"
              onClick={basculerFilmA}
              className="rounded px-2.5 py-1 text-[12px] font-black text-white hover:brightness-110"
              style={{ backgroundColor: VERT }}
            >
              {filmA ? "⏸ pause" : "▶ avancer"}
            </button>
          </div>
          <input
            id="ou"
            type="range"
            min={0}
            max={TA}
            step={0.05}
            value={tA}
            onChange={(e) => {
              setFilmA(false);
              setTA(parseFloat(e.target.value));
            }}
            className="mt-3 w-full accent-[#1a7f37]"
          />
          <div className="mt-1 flex justify-between text-[11px]" style={{ color: "#8a93ab" }}>
            <span>le tout début</span>
            <span>à mi-chemin</span>
            <span>plus loin</span>
          </div>

          <p className={`mt-3 font-black ${grand}`} style={{ color: ENCRE }}>
            ici, tu montes{" "}
            <span style={{ color: VERT }}>{fmt(montee.ratio)}× plus vite</span> qu&apos;au départ
          </p>
          <p className="mt-1 text-[14px] font-semibold" style={{ color: "#4a5570" }}>
            Ta vitesse n&apos;est pas fixe : elle vaut toujours ta hauteur du moment. Plus tu
            sais, plus vite tu apprends la suite — le chemin se creuse tout seul.
          </p>

          <svg
            viewBox="0 0 1000 460"
            className="mt-3 w-full"
            role="img"
            aria-label={`Courbe exponentielle de la montée : au point où j'en suis, la vitesse vaut ${fmt(montee.ratio)} fois celle du départ`}
          >
            <line x1="30" y1="410" x2="990" y2="410" stroke="#8a93ab" strokeWidth="1.5" />
            <line x1="40" y1="30" x2="40" y2="410" stroke="#8a93ab" strokeWidth="1.5" />
            {/* la courbe qui s'envole */}
            <path d={montee.courbe} fill="none" stroke={VERT} strokeWidth="3.5" strokeLinecap="round" />
            {/* le rappel de hauteur (pointillé vers l'axe) */}
            <line
              x1="40"
              y1={montee.py}
              x2={montee.px}
              y2={montee.py}
              stroke="#8a93ab"
              strokeWidth="1.5"
              strokeDasharray="5 6"
            />
            {/* LA TANGENTE = la vitesse : elle se redresse à mesure que ça monte */}
            <line
              x1={montee.tanX1}
              y1={montee.tanY1}
              x2={montee.tanX2}
              y2={montee.tanY2}
              stroke={OR}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* le point « où j'en suis » */}
            <circle cx={montee.px} cy={montee.py} r="8" fill={ENCRE} />
            <text
              x={Math.min(montee.px + 14, 900)}
              y={Math.max(montee.py - 12, 26)}
              fontSize={modeClasse ? 22 : 17}
              fontWeight={800}
              fill={OR}
            >
              pente = vitesse
            </text>
          </svg>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] font-semibold">
            <span style={{ color: VERT }}>— la courbe (ce que tu maîtrises)</span>
            <span style={{ color: OR }}>— la tangente (ta vitesse à l&apos;instant)</span>
          </div>

          <div className="mt-3 border-t pt-3" style={{ borderColor: "#dcebe0" }}>
            <label htmlFor="elan" className="text-[13px] font-black" style={{ color: ENCRE }}>
              l&apos;élan — ta pente au tout début
            </label>
            <input
              id="elan"
              type="range"
              min={GA_MIN}
              max={GA_MAX}
              step={0.05}
              value={g}
              onChange={(e) => setG(parseFloat(e.target.value))}
              className="mt-2 w-full accent-[#2b4a9b]"
            />
            <p className="mt-1 text-[12px]" style={{ color: "#8a93ab" }}>
              Même un petit élan finit par tout emporter : c&apos;est le sens de la courbe.
              Le début modeste ne dit RIEN de là où elle mène.
            </p>
          </div>
        </div>

        {/* ══ LA DESCENTE — ce que je ne recharge pas s'efface ════════════════ */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#e3d3a8", backgroundColor: "#fdf9ef" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            🍂 La descente — la courbe de l&apos;oubli (et comment la relancer)
          </p>
          <p className="mt-2 text-[14px] leading-7" style={{ color: "#3a3325" }}>
            La même loi, retournée : ce que tu apprends s&apos;efface toujours de la même{" "}
            <b>fraction</b> — moitié, puis moitié de la moitié… jamais tout à fait zéro.{" "}
            <b>Oublier n&apos;est pas un échec, c&apos;est une loi.</b> Mais chaque{" "}
            <b>révision</b> relance la courbe à fond — et, à chaque fois, elle redescend{" "}
            <b>moins vite</b>. Règle le jour, puis clique «&nbsp;✏️ je révise&nbsp;».
          </p>

          <label htmlFor="jour" className="mt-4 block text-sm font-black" style={{ color: ENCRE }}>
            le jour où j&apos;en suis
          </label>
          <input
            id="jour"
            type="range"
            min={0}
            max={TB}
            step={0.25}
            value={tB}
            onChange={(e) => setTB(parseFloat(e.target.value))}
            className="mt-2 w-full accent-[#b97e12]"
          />
          <div className="mt-1 flex justify-between text-[11px]" style={{ color: "#8a93ab" }}>
            <span>jour 0 — j&apos;apprends</span>
            <span>jour 6</span>
            <span>jour 12</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={reviser}
              className="rounded px-3 py-1.5 text-[13px] font-black text-white hover:brightness-110"
              style={{ backgroundColor: OR }}
            >
              ✏️ je révise (au jour {fmt(tB)})
            </button>
            <button
              type="button"
              onClick={rejouer}
              className="rounded border px-2.5 py-1 text-[12px] font-bold"
              style={{ borderColor: "#e3d3a8", color: "#8a7a55" }}
            >
              ↺ recommencer
            </button>
          </div>

          <p className={`mt-3 font-black ${grand}`} style={{ color: ENCRE }}>
            il te reste <span style={{ color: OR }}>{fmt(descente.retNow * 100)} %</span>
          </p>
          <p className="mt-1 text-[14px] font-semibold" style={{ color: "#6b5c3a" }}>
            {descente.nbRev === 0 ? (
              <>
                Sans réviser, la moitié part en <b>{fmt(descente.demiVie0)} jours</b>. Clique
                « je révise » et regarde la courbe repartir vers le haut.
              </>
            ) : (
              <>
                Après <b>{descente.nbRev}</b> révision{descente.nbRev > 1 ? "s" : ""}, il te
                faut maintenant <b>{fmt(descente.demiVieNow)} jours</b> pour en oublier la
                moitié — contre {fmt(descente.demiVie0)} au départ. Sans réviser, tu ne serais
                qu&apos;à <b>{fmt(descente.retFantome * 100)} %</b>.
              </>
            )}
          </p>

          <svg
            viewBox="0 0 1000 240"
            className="mt-3 w-full"
            role="img"
            aria-label={`Courbe de l'oubli : avec ${descente.nbRev} révisions il reste ${fmt(descente.retNow * 100)} % au jour ${fmt(tB)}, contre ${fmt(descente.retFantome * 100)} % sans réviser`}
          >
            <line x1="30" y1="210" x2="990" y2="210" stroke="#8a93ab" strokeWidth="1.5" />
            {/* la courbe fantôme : si on ne révise jamais */}
            <path d={descente.fantome} fill="none" stroke="#c9b98f" strokeWidth="2" strokeDasharray="6 7" />
            {/* les traits de révision */}
            {descente.marks.map((m, i) => (
              <line
                key={i}
                x1={m.x}
                y1="35"
                x2={m.x}
                y2="210"
                stroke={i === 0 ? "#8a93ab" : VERT}
                strokeWidth={i === 0 ? 1.2 : 1.6}
                strokeDasharray={i === 0 ? "3 5" : "0"}
                opacity={i === 0 ? 0.6 : 0.5}
              />
            ))}
            {/* la vraie courbe : les dents de scie de la révision espacée */}
            <path d={descente.sciePath} fill="none" stroke={OR} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* le curseur du jour courant */}
            <line x1={descente.xs(tB)} y1="20" x2={descente.xs(tB)} y2="210" stroke={ENCRE} strokeWidth="1.5" />
            <circle cx={descente.xs(tB)} cy={descente.ys(descente.retNow)} r="6" fill={ENCRE} />
            {[0, 3, 6, 9, 12].map((j) => (
              <g key={j}>
                <line x1={descente.xs(j)} y1="210" x2={descente.xs(j)} y2="217" stroke="#8a93ab" strokeWidth="1.5" />
                <text x={descente.xs(j)} y="234" textAnchor="middle" fontSize={modeClasse ? 18 : 14} fontWeight={600} fill="#8a93ab">
                  j{j}
                </text>
              </g>
            ))}
          </svg>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] font-semibold">
            <span style={{ color: OR }}>— avec tes révisions</span>
            <span style={{ color: "#a08a5a" }}>--- si tu ne révises jamais</span>
            <span style={{ color: VERT }}>| une révision</span>
          </div>

          <div className="mt-3 rounded border p-3 text-[13px] leading-6" style={{ borderColor: "#e3d3a8", backgroundColor: "#f6edd8", color: "#3a3325" }}>
            <b style={{ color: OR }}>Le secret de l&apos;espacement.</b> Chaque rappel ne fait pas
            que remonter la courbe : il l&apos;aplatit. Réviser <b>juste avant d&apos;oublier</b> — à
            des intervalles de plus en plus larges — c&apos;est le moyen le plus économique de
            garder pour de bon. Tu ne luttes pas contre ta mémoire, tu apprends son rythme.
          </div>
        </div>

        {/* LES MATHS */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#e3d3a8", backgroundColor: "#fdf9ef", color: "#3a3325" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Les maths de la machine — la fonction qui est sa propre vitesse
          </p>
          <p className="mt-2">
            Une seule idée commande tout : <b>f&apos;&nbsp;=&nbsp;k·f</b>. La vitesse à laquelle
            quelque chose change est <b>proportionnelle à ce qu&apos;il y a déjà</b>. Si k&nbsp;&gt;&nbsp;0,
            plus il y en a, plus ça monte vite → l&apos;emballement, <b>e^(kt)</b>. Si k&nbsp;&lt;&nbsp;0,
            moins il en reste, moins ça descend vite → l&apos;effacement, <b>e^(−kt)</b>. Les deux
            courbes sont <b>l&apos;image l&apos;une de l&apos;autre</b> dans un miroir : c&apos;est la même
            loi, changée de signe.
          </p>
          <p className="mt-2">
            Côté descente, ce «&nbsp;toujours la même fraction&nbsp;» donne une{" "}
            <b>demi-vie</b> constante : le temps pour tomber à la moitié ne dépend pas d&apos;où on
            part. 100&nbsp;% → 50&nbsp;% → 25&nbsp;% → 12,5&nbsp;%… on s&apos;approche de zéro sans
            jamais l&apos;atteindre. C&apos;est vrai pour un noyau radioactif, un cari qui refroidit
            (loi de Newton) ou un souvenir qu&apos;on ne rafraîchit pas (la courbe de l&apos;oubli
            d&apos;Ebbinghaus). Le nombre qui gouverne tout ça, <b>e ≈ 2,718</b>, est
            exactement celui dont la courbe est, en chaque point, sa propre pente.
          </p>
        </div>

        {/* À QUOI ÇA SERT ? — l'ancrage réel : les notes, l'apprentissage, le 974 */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            À quoi ça sert ? — dans ta vie, et dans tes révisions
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              🎓 <b>Pour tes révisions.</b> Ce que tu apprends aujourd&apos;hui, tu en auras
              oublié la moitié dans quelques jours — <b>c&apos;est mathématique, pas
              personnel</b>. La parade n&apos;est pas de travailler plus longtemps d&apos;un coup,
              mais de <b>revoir un peu, plusieurs fois, en espaçant</b>. Chaque passage
              aplatit la courbe. Un mauvais jour n&apos;efface pas tout : il suffit de recharger.
            </li>
            <li>
              📈 <b>Pour ne pas lâcher au début.</b> Beaucoup abandonnent dans la partie{" "}
              <b>plate</b> de la montée, en croyant qu&apos;elle sera toujours plate. Or ce qui
              compte, ce n&apos;est pas où tu es, c&apos;est ta <b>pente</b> — et elle grimpe. Le
              décollage n&apos;est pas un miracle : c&apos;est tout le plat d&apos;avant qui te propulse.
            </li>
            <li>
              🦠 <b>Une épidémie.</b> Chaque personne en contamine d&apos;autres, qui en
              contaminent d&apos;autres : la même montée qui s&apos;emballe (le R₀). C&apos;est le cousin
              direct de la{" "}
              <Link href="/simulateur-epsilon" className="underline underline-offset-2">
                machine des epsilons
              </Link>{" "}
              — un petit départ, un infini au bout.
            </li>
            <li>
              🌋 <b>La lave de la Fournaise.</b> Une coulée fraîche refroidit vite quand
              elle est brûlante, puis de plus en plus lentement — l&apos;écart avec l&apos;air
              extérieur fond de moitié, encore et encore. Le même refroidissement que ton{" "}
              <b>cari</b> sur la table (le défi 5).
            </li>
            <li>
              ☢️ <b>Dater le passé.</b> Le carbone 14 d&apos;un vieux bois ou d&apos;un os
              disparaît par demi-vies régulières&nbsp;: en comptant ce qu&apos;il en reste, on
              lit l&apos;âge d&apos;un objet vieux de milliers d&apos;années. Une décroissance
              exponentielle transformée en horloge.
            </li>
          </ul>
        </div>

        {/* UN PEU D'HISTOIRE */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Un peu d&apos;histoire — le nombre qui se dérive lui-même
          </p>
          <p className="mt-2">
            <b>Leonhard Euler</b> (XVIIIᵉ) donne son nom au nombre <b>e ≈ 2,718</b> : la
            base de la seule courbe qui est, partout, sa propre pente. <b>Isaac Newton</b>,
            lui, remarque qu&apos;un corps chaud se refroidit d&apos;autant plus vite qu&apos;il est
            loin de la température ambiante — sa fameuse loi du refroidissement, une
            exponentielle qui descend.
          </p>
          <p className="mt-2">
            En 1885, le psychologue <b>Hermann Ebbinghaus</b> fait une chose folle : il
            apprend des listes de syllabes sans queue ni tête et mesure, sur{" "}
            <b>lui-même</b>, à quelle vitesse il les oublie. Il en tire la première{" "}
            <b>courbe de l&apos;oubli</b> — exponentielle, elle aussi — et découvre que{" "}
            <b>revoir à intervalles espacés</b> la relève chaque fois un peu plus haut.
            C&apos;est très exactement la machine du dessus : la science des révisions, née
            d&apos;un homme qui s&apos;est pris pour son propre cobaye.
          </p>
        </div>

        {/* LES DÉFIS */}
        <DefisSimulateur
          titre="Les défis de l'exponentielle"
          coupDePouce="Coup de pouce : sur la montée, lis le « ×… plus vite » ; sur la descente, chaque demi-vie coupe en deux."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* LES PONTS */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/simulateur-epsilon"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: ENCRE }}
          >
            ⚡ La montée qui s&apos;emballe — active un epsilon
          </Link>
          <Link
            href="/loi-normale"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#e3d3a8", backgroundColor: "#fdf9ef", color: "#3a3325" }}
          >
            🔔 L&apos;autre courbe née d&apos;un stylo — la cloche
          </Link>
        </div>

        {/* L'HONNÊTETÉ */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#d5ddf0", color: "#8a93ab" }}>
          Machine pédagogique : les durées et la vitesse d&apos;oubli sont illustratives (la
          vraie courbe d&apos;Ebbinghaus dépend de chacun et de ce qu&apos;on apprend). L&apos;idée,
          elle, est solide — croissance et décroissance suivent la même loi{" "}
          <b>f&apos;&nbsp;=&nbsp;k·f</b>, et l&apos;espacement des rappels aplatit l&apos;oubli. Née
          d&apos;un dessin au stylo sur une feuille à carreaux, comme{" "}
          <Link href="/loi-normale" className="underline underline-offset-2">
            la courbe en cloche
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
