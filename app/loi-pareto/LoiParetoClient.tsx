"use client";

// « Le but qui sort de la moyenne » — la machine de l'article (rubrique
// « Un peu de maths »). Née d'une phrase de Mbappé : on renforce ses défauts,
// mais ce sont nos QUALITÉS qui nous différencient. Traduit en maths : combler
// ses défauts, c'est jouer la loi normale (on converge vers la moyenne) ;
// cultiver sa qualité rare, c'est basculer dans la QUEUE de la loi de Pareto —
// là où vivent les records (« meilleur buteur de la Coupe du monde » est, par
// définition, une valeur extrême). L'élève A LA MAIN : il pousse le curseur
// « énergie sur ma qualité », la queue s'épaissit, et les records surgissent —
// alors que la loi normale n'en produit jamais. Thème papier-cahier, comme
// toutes les machines nées d'un stylo.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const VERT = "#1f6b3a"; // l'encre — le terrain
const OR = "#c8962a"; // le record

// La loi normale de référence (buts par saison d'un joueur « complet ») :
// centrée, resserrée — personne ne s'échappe.
const MU = 2;
const SIGMA = 0.8;
const XMIN = 1; // tout le monde marque au moins ~1 but (seuil de la Pareto)
const RECORD = 6; // le seuil « record » : buts d'un très grand buteur

const ALPHA_MIN = 1.15; // curseur à fond « qualité » : queue très lourde
const ALPHA_MAX = 3.0; // curseur à fond « défauts » : presque pas de queue

const COULEURS_DEFIS: CouleursDefis = {
  fond: "#f4faf5",
  fondProfond: "#e7f3ea",
  bord: "#bfe0c8",
  accent: VERT,
  texte: "#22402c",
  sousTexte: "#5f8a6d",
  ok: "#1a7f37",
  rate: "#b3261e",
};

// La rampe CP → Terminale : la MÊME question (« pourquoi le record est-il si
// loin de la moyenne ? »), un outil qui grandit avec l'élève. Une réponse
// numérique par carte, id stable (ces défis compteront à terme dans l'éval).
const DEFIS: DefiSimulateur[] = [
  {
    id: "pareto-cp-somme",
    question:
      "CP · CE1 — Une équipe marque : Léa 1 but, Tom 2, Sam 1, et Maël 9. Combien de buts l'équipe a-t-elle marqués en tout ?",
    reponse: 13,
    unite: "buts",
    indice: "Additionne les quatre nombres : 1 + 2 + 1 + 9.",
    calcul: "1 + 2 + 1 + 9 = 13 buts — et un seul joueur en a marqué 9 !",
    tolerance: 0.5,
  },
  {
    id: "pareto-cm1-ecart",
    question:
      "CE2 · CM1 — Le meilleur buteur a marqué 9 buts, le deuxième 2 buts. Combien de buts le meilleur a-t-il marqués DE PLUS que le deuxième ?",
    reponse: 7,
    unite: "buts",
    indice: "C'est une soustraction : 9 − 2.",
    calcul: "9 − 2 = 7 buts d'écart — le meilleur est très loin devant.",
    tolerance: 0.5,
  },
  {
    id: "pareto-cm2-moyenne",
    question:
      "CM2 — 100 joueurs marquent 200 buts en tout. Les 10 meilleurs en marquent 110 à eux seuls. Combien de buts, EN MOYENNE, pour chacun des 90 autres joueurs ?",
    reponse: 1,
    unite: "but",
    indice: "Les 90 autres se partagent 200 − 110 = 90 buts. Puis 90 ÷ 90.",
    calcul: "200 − 110 = 90 buts pour 90 joueurs → 90 ÷ 90 = 1 but chacun (contre 11 pour les 10 meilleurs).",
    tolerance: 0.2,
  },
  {
    id: "pareto-6e-pourcent",
    question:
      "6ᵉ · 5ᵉ — Sur 200 buts marqués, 160 viennent des 20 meilleurs joueurs (sur 100). Quel POURCENTAGE des buts vient de ces 20 joueurs ?",
    reponse: 80,
    unite: "%",
    indice: "Calcule 160 ÷ 200, puis convertis en pourcentage.",
    calcul: "160 ÷ 200 = 0,80 = 80 % — le fameux « 80/20 » de Pareto.",
    tolerance: 0.5,
  },
  {
    id: "pareto-4e-mediane",
    question:
      "4ᵉ · 3ᵉ — Pousse le curseur vers « qualité ». La machine affiche une MOYENNE d'environ 6 buts mais une MÉDIANE d'environ 2 buts. De combien la moyenne dépasse-t-elle la médiane ?",
    reponse: 4,
    unite: "buts",
    indice: "Lis les deux nombres sur la machine, puis soustrais : moyenne − médiane.",
    calcul: "6 − 2 = 4 : le buteur d'exception tire la MOYENNE vers le haut, pas la médiane. C'est la signature d'une queue lourde.",
    tolerance: 0.8,
  },
  {
    id: "pareto-2nde-fluctuation",
    question:
      "2ⁿᵈᵉ — Lance plusieurs saisons sur la machine « le tirage ». Le RECORD change énormément d'une saison à l'autre, mais la médiane bouge à peine. Sur la machine, la médiane vaut environ combien de buts ?",
    reponse: 2,
    unite: "buts",
    indice: "La médiane est le nombre affiché à côté de « moitié des joueurs en dessous ».",
    calcul: "≈ 2 buts : la médiane est stable (le « joueur du milieu »), le record est erratique — il vit dans la queue.",
    tolerance: 0.8,
  },
  {
    id: "pareto-1re-proba",
    question:
      "1ʳᵉ spé — Loi de Pareto, seuil x₀ = 1 but, exposant α = 2. La proportion de joueurs qui dépassent 5 buts vaut (1/5)^α. Combien cela fait-il, en POUR CENT ?",
    reponse: 4,
    unite: "%",
    indice: "(1/5)² = 1/25. Convertis 1/25 en pourcentage.",
    calcul: "(1/5)² = 1/25 = 0,04 = 4 % — P(X > x) = (x₀/x)^α, la loi de puissance.",
    tolerance: 0.6,
  },
  {
    id: "pareto-term-exposant",
    question:
      "Terminale — Sur papier log-log, la loi de Pareto devient une DROITE de pente −α. Quand on multiplie les buts par 10, la proportion de joueurs est divisée par 1000. Combien vaut α ?",
    reponse: 3,
    unite: "",
    indice: "On cherche α tel que 10^α = 1000.",
    calcul: "10^α = 1000 = 10³ donc α = 3 : la pente de la droite log-log EST l'exposant de rareté.",
    tolerance: 0.2,
  },
];

const fmt = (x: number) => {
  if (!Number.isFinite(x)) return "∞";
  if (Math.abs(x - Math.round(x)) < 0.05) return Math.round(x).toLocaleString("fr-FR");
  return x.toFixed(1).replace(".", ",");
};

/** Φ(z) — fonction de répartition de la loi normale centrée réduite (Abramowitz-Stegun). */
function phiCumul(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804 * Math.exp(-(z * z) / 2);
  const p =
    d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

export default function LoiParetoClient() {
  // Le curseur : 0 = toute l'énergie sur mes défauts (je deviens complet-moyen),
  // 100 = toute l'énergie sur ma qualité rare (la queue s'épaissit).
  const [q, setQ] = useState(70);
  const [modeClasse, setModeClasse] = useState(false);
  const [tirage, setTirage] = useState<{
    records: number;
    meilleur: number;
    mediane: number;
    moyenne: number;
    balles: { x: number; record: boolean }[];
  } | null>(null);

  useEffect(() => {
    setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      return !v;
    });
  };

  // α : plus le curseur va vers « qualité », plus α est petit, plus la queue
  // est lourde. C'est le paradoxe : moins d'exposant = plus de records.
  const alpha = ALPHA_MAX - (q / 100) * (ALPHA_MAX - ALPHA_MIN);

  // Les vérités théoriques (calculées, pas tirées — la page rend juste au chargement).
  const pRecordPareto = Math.pow(XMIN / RECORD, alpha); // P(X > 6) sous Pareto
  const pRecordNormale = 1 - phiCumul((RECORD - MU) / SIGMA); // P(X > 6) sous normale
  const medianePareto = XMIN * Math.pow(2, 1 / alpha);
  const moyennePareto = alpha > 1 ? (alpha * XMIN) / (alpha - 1) : Infinity;

  // LA MACHINE — les deux lois superposées, avec le seuil « record ».
  const machine = useMemo(() => {
    const X0 = 0;
    const X1 = 12; // buts en abscisse
    const xs = (x: number) => 40 + ((x - X0) / (X1 - X0)) * 940;
    // densités
    const fNorm = (x: number) =>
      Math.exp(-((x - MU) ** 2) / (2 * SIGMA * SIGMA)) / (SIGMA * Math.sqrt(2 * Math.PI));
    const fPar = (x: number) =>
      x < XMIN ? 0 : (alpha * Math.pow(XMIN, alpha)) / Math.pow(x, alpha + 1);
    // Échelle calée sur le sommet de la cloche : la pointe de Pareto près de
    // l'origine sort VOLONTAIREMENT du cadre (les joueurs médiocres s'y
    // entassent), ce qui laisse la queue se soulever et devenir lisible.
    const maxY = fNorm(MU) * 1.15;
    const ys = (v: number) => 300 - (Math.min(v, maxY) / maxY) * 265;
    const courbe = (f: (x: number) => number) =>
      Array.from({ length: 241 }, (_, i) => {
        const x = X0 + ((X1 - X0) * i) / 240;
        return `${i === 0 ? "M" : "L"} ${xs(x).toFixed(1)} ${ys(f(x)).toFixed(1)}`;
      }).join(" ");
    // l'aire de la queue de Pareto au-delà du record (là où naissent les buteurs)
    let queue = `M ${xs(RECORD).toFixed(1)} 300`;
    for (let i = 0; i <= 60; i++) {
      const x = RECORD + ((X1 - RECORD) * i) / 60;
      queue += ` L ${xs(x).toFixed(1)} ${ys(fPar(x)).toFixed(1)}`;
    }
    queue += ` L ${xs(X1).toFixed(1)} 300 Z`;
    return {
      xs,
      normale: courbe(fNorm),
      pareto: courbe(fPar),
      queue,
      grads: [0, 2, 4, 6, 8, 10, 12],
    };
  }, [alpha]);

  const lecture = useMemo(() => {
    const n = pRecordPareto * 100;
    if (q < 25)
      return "Curseur sur « défauts » : la queue est plate, presque personne ne dépasse le record. Un monde de joueurs complets… et interchangeables.";
    if (q < 60)
      return "La queue commence à se soulever : quelques joueurs s'échappent au-dessus du record.";
    if (n < 12)
      return "La queue s'épaissit : les records deviennent possibles — et un buteur d'exception apparaît.";
    return "Queue très lourde : les records pleuvent, et un joueur écrase tous les autres. C'est le monde des Mbappé.";
  }, [q, pRecordPareto]);

  // LE TIRAGE — 100 joueurs échantillonnés sous chaque loi (client-only, sur
  // clic : Math.random ne doit pas tourner au rendu, sinon l'hydratation casse).
  const lancerTirage = () => {
    const N = 100;
    const PLAFOND = 20; // un record de saison spectaculaire mais crédible
    const parButs: number[] = [];
    const balles: { x: number; record: boolean }[] = [];
    for (let i = 0; i < N; i++) {
      const u = Math.random() || 1e-9;
      // Pareto par inversion, plafonné : la queue peut cracher des valeurs
      // gigantesques (records irréalistes de 400 buts) — on borne à un exploit
      // de saison, l'idée « le record vit dans la queue » reste entière.
      const b = Math.min(XMIN / Math.pow(u, 1 / alpha), PLAFOND);
      parButs.push(b);
      balles.push({ x: b, record: b > RECORD });
    }
    parButs.sort((a, b) => a - b);
    const records = parButs.filter((b) => b > RECORD).length;
    const meilleur = parButs[parButs.length - 1];
    const mediane = parButs[Math.floor(N / 2)];
    const moyenne = parButs.reduce((s, b) => s + b, 0) / N;
    setTirage({ records, meilleur, mediane, moyenne, balles });
  };

  const grand = modeClasse ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl";

  return (
    <main
      className="min-h-screen pb-14"
      style={{
        backgroundColor: "#fbfdf9",
        backgroundImage:
          "linear-gradient(#cfe8d430 1px, transparent 1px), linear-gradient(90deg, #cfe8d430 1px, transparent 1px)",
        backgroundSize: "25px 25px",
        color: "#22402c",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: OR }}>
          Un peu de maths · La rubrique du prof
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: VERT }}>
          Le but qui sort de la moyenne
        </h1>
        <p className="mt-3 text-[15px] leading-7">
          Mbappé le répète&nbsp;: <b>on renforce ses défauts, mais ce sont nos qualités qui
          nous différencient</b>. Traduit en maths, c&apos;est une vérité profonde. Combler
          tous ses petits défauts, c&apos;est additionner plein de petits progrès&nbsp;: on
          converge vers la <b>moyenne</b> — c&apos;est la <b>loi normale</b>, la cloche du
          joueur complet. Mais un record — <b>« meilleur buteur de la Coupe du monde »</b> —
          n&apos;est jamais une moyenne&nbsp;: c&apos;est une <b>valeur extrême</b>. Et les
          valeurs extrêmes ne sortent pas d&apos;une cloche&nbsp;: elles sortent de la{" "}
          <b>queue lourde</b> d&apos;une <b>loi de Pareto</b>. Cultiver sa qualité rare,
          c&apos;est basculer dans cette queue. Pousse le curseur, et regarde les records
          apparaître.
        </p>

        {/* LE CURSEUR */}
        <div className="mt-6 rounded border p-4" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="qualite" className="text-sm font-black" style={{ color: VERT }}>
              Où mets-tu ton énergie ?
            </label>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: "#cfe6d5", color: "#5f8a6d" }}
            >
              {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
            </button>
          </div>
          <input
            id="qualite"
            type="range"
            min={0}
            max={100}
            step={1}
            value={q}
            onChange={(e) => setQ(parseInt(e.target.value, 10))}
            className="mt-3 w-full accent-[#c8962a]"
          />
          <div className="mt-1 flex justify-between text-[11px]" style={{ color: "#7ba088" }}>
            <span>0 — tout sur mes défauts</span>
            <span>50</span>
            <span>100 — tout sur ma qualité rare</span>
          </div>
          <p className={`mt-3 font-black ${grand}`} style={{ color: VERT }}>
            {Math.round(pRecordPareto * 100)} records{" "}
            <span className="text-base font-bold" style={{ color: "#5f8a6d" }}>
              pour 100 joueurs
            </span>{" "}
            <span style={{ color: OR }}>· exposant α = {fmt(alpha)}</span>
          </p>
          <p className="mt-1 text-[14px] font-semibold" style={{ color: "#3f6650" }}>
            {lecture}
          </p>
          <p className="mt-2 text-[13px]" style={{ color: "#5f8a6d" }}>
            La même saison sous la <b>loi normale</b> (le joueur complet) donnerait{" "}
            <b style={{ color: VERT }}>{(pRecordNormale * 100).toFixed(4).replace(".", ",")} record</b> pour
            100 joueurs — autant dire <b>jamais</b>. La cloche ne fabrique pas de Mbappé.
          </p>
        </div>

        {/* LA MACHINE — les deux lois, et la queue des records */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            La cloche (normale) et la queue (Pareto) — buts par saison
          </p>
          <svg
            viewBox="0 0 1000 340"
            className="mt-3 w-full"
            role="img"
            aria-label={`La loi normale (cloche verte, centrée sur 2 buts) et la loi de Pareto (courbe dorée à queue lourde). Le seuil « record » est fixé à 6 buts ; sous Pareto, environ ${Math.round(pRecordPareto * 100)} joueurs sur 100 le dépassent, contre quasiment aucun sous la loi normale.`}
          >
            {/* l'aire de la queue au-delà du record */}
            <path d={machine.queue} fill={OR} opacity="0.16" />
            {/* le seuil record */}
            <line x1={machine.xs(RECORD)} y1="35" x2={machine.xs(RECORD)} y2="300" stroke={OR} strokeWidth="2" strokeDasharray="5 5" />
            <text x={machine.xs(RECORD)} y="28" textAnchor="middle" fontSize={modeClasse ? 17 : 13} fontWeight={900} fill={OR}>
              ⚽ record ({RECORD} buts)
            </text>
            {/* la cloche — la loi normale */}
            <path d={machine.normale} fill="none" stroke={VERT} strokeWidth="3.5" strokeLinecap="round" />
            {/* la queue — la loi de Pareto */}
            <path d={machine.pareto} fill="none" stroke={OR} strokeWidth="3.5" strokeLinecap="round" />
            {/* l'axe */}
            <line x1="30" y1="300" x2="990" y2="300" stroke="#8bb097" strokeWidth="1.5" />
            {machine.grads.map((k) => (
              <g key={k}>
                <line x1={machine.xs(k)} y1="300" x2={machine.xs(k)} y2="307" stroke="#8bb097" strokeWidth="1.5" />
                <text x={machine.xs(k)} y="326" textAnchor="middle" fontSize={modeClasse ? 18 : 14} fontWeight={600} fill="#8bb097">
                  {k}
                </text>
              </g>
            ))}
          </svg>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] font-semibold">
            <span style={{ color: VERT }}>— la cloche — la loi normale (joueur complet)</span>
            <span style={{ color: OR }}>— la queue — la loi de Pareto (les records)</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded border p-2.5 text-center" style={{ borderColor: "#cfe6d5" }}>
              <p className="text-[11px] font-bold" style={{ color: "#5f8a6d" }}>médiane (le joueur du milieu)</p>
              <p className="font-black" style={{ color: VERT }}>{fmt(medianePareto)} buts</p>
            </div>
            <div className="rounded border p-2.5 text-center" style={{ borderColor: "#cfe6d5" }}>
              <p className="text-[11px] font-bold" style={{ color: "#5f8a6d" }}>moyenne (tirée par les stars)</p>
              <p className="font-black" style={{ color: OR }}>{fmt(moyennePareto)} buts</p>
            </div>
            <div className="col-span-2 rounded border p-2.5 text-center sm:col-span-1" style={{ borderColor: "#cfe6d5" }}>
              <p className="text-[11px] font-bold" style={{ color: "#5f8a6d" }}>moyenne − médiane</p>
              <p className="font-black" style={{ color: VERT }}>
                {Number.isFinite(moyennePareto) ? `+${fmt(moyennePareto - medianePareto)}` : "∞"}
              </p>
            </div>
          </div>
          <p className="mt-2 text-[12.5px]" style={{ color: "#5f8a6d" }}>
            <b>La moitié des joueurs</b> est <b>en dessous de la médiane</b> ({fmt(medianePareto)} buts) —
            mais la <b>moyenne</b> ({fmt(moyennePareto)} buts) est bien plus haute&nbsp;: c&apos;est le
            buteur d&apos;exception qui la tire seul vers le haut. Moyenne ≠ médiane, la signature
            d&apos;une queue lourde.
          </p>
        </div>

        {/* LE TIRAGE — une saison de 100 joueurs, pour de vrai */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
              Le tirage — une saison de 100 joueurs
            </p>
            <button
              type="button"
              onClick={lancerTirage}
              className="rounded px-3 py-1.5 text-[12px] font-black text-white hover:brightness-110"
              style={{ backgroundColor: OR }}
            >
              ⚽ Jouer une saison
            </button>
          </div>
          {!tirage ? (
            <p className="mt-3 text-[14px] leading-7" style={{ color: "#3f6650" }}>
              Clique sur <b>« Jouer une saison »</b>&nbsp;: 100 joueurs, chacun tiré au sort dans
              la loi de Pareto réglée par ton curseur. Relance plusieurs fois&nbsp;: la{" "}
              <b>médiane</b> (le joueur du milieu) bouge à peine, mais le <b>record</b> saute
              partout — parce qu&apos;il vit dans la queue.
            </p>
          ) : (
            <>
              <svg viewBox="0 0 1000 140" className="mt-3 w-full" role="img" aria-label={`Saison tirée : ${tirage.records} joueurs sur 100 dépassent le record, le meilleur en a marqué ${fmt(tirage.meilleur)}`}>
                <line x1={40 + (RECORD / 20) * 940} y1="10" x2={40 + (RECORD / 20) * 940} y2="110" stroke={OR} strokeWidth="2" strokeDasharray="5 5" />
                {tirage.balles.map((b, i) => (
                  <circle
                    key={i}
                    cx={40 + (b.x / 20) * 940}
                    cy={100 - (i % 9) * 9}
                    r={b.record ? 6 : 4}
                    fill={b.record ? OR : "#cfe6d5"}
                    stroke={b.record ? "#8a6410" : "#8bb097"}
                    strokeWidth="1"
                  />
                ))}
                <line x1="30" y1="112" x2="990" y2="112" stroke="#8bb097" strokeWidth="1.5" />
                {[0, 4, 8, 12, 16, 20].map((k) => (
                  <text key={k} x={40 + (k / 20) * 940} y="130" textAnchor="middle" fontSize="12" fill="#8bb097">
                    {k}
                  </text>
                ))}
              </svg>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded border p-2.5 text-center" style={{ borderColor: "#cfe6d5" }}>
                  <p className="text-[11px] font-bold" style={{ color: "#5f8a6d" }}>records (&gt; {RECORD})</p>
                  <p className="text-xl font-black" style={{ color: OR }}>{tirage.records}</p>
                </div>
                <div className="rounded border p-2.5 text-center" style={{ borderColor: "#cfe6d5" }}>
                  <p className="text-[11px] font-bold" style={{ color: "#5f8a6d" }}>meilleur buteur</p>
                  <p className="text-xl font-black" style={{ color: OR }}>{fmt(tirage.meilleur)}</p>
                </div>
                <div className="rounded border p-2.5 text-center" style={{ borderColor: "#cfe6d5" }}>
                  <p className="text-[11px] font-bold" style={{ color: "#5f8a6d" }}>médiane</p>
                  <p className="text-xl font-black" style={{ color: VERT }}>{fmt(tirage.mediane)}</p>
                </div>
                <div className="rounded border p-2.5 text-center" style={{ borderColor: "#cfe6d5" }}>
                  <p className="text-[11px] font-bold" style={{ color: "#5f8a6d" }}>moyenne</p>
                  <p className="text-xl font-black" style={{ color: VERT }}>{fmt(tirage.moyenne)}</p>
                </div>
              </div>
              <p className="mt-2 text-[12.5px]" style={{ color: "#5f8a6d" }}>
                Relance&nbsp;: la <b>médiane</b> reste plantée autour de {fmt(medianePareto)} buts, le{" "}
                <b>record</b> change du tout au tout. La régularité est dans le centre, l&apos;exploit
                est dans la queue.
              </p>
            </>
          )}
        </div>

        {/* LES MATHS */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#bfe0c8", backgroundColor: "#f4faf5", color: "#22402c" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Les maths de la machine — cloche contre queue lourde
          </p>
          <p className="mt-2">
            La <b>loi normale</b> vaut e^(−(x − μ)² / 2σ²) / (σ√(2π))&nbsp;: ses queues s&apos;écrasent
            de façon <b>exponentielle</b>. Passé μ + 4σ, il n&apos;y a plus rien — c&apos;est pour ça
            qu&apos;aucun record n&apos;en sort. C&apos;est aussi ce que dit le <b>théorème central
            limite</b>&nbsp;: additionne beaucoup de petits hasards (combler ses défauts un par un) et
            tu tombes sur la cloche, donc sur la moyenne.
          </p>
          <p className="mt-2">
            La <b>loi de Pareto</b>, elle, décroît en <b>puissance</b>&nbsp;: P(X &gt; x) = (x₀ / x)^α.
            Sa queue reste épaisse très loin — assez pour héberger des valeurs extrêmes. Son exposant{" "}
            <b>α</b> mesure la rareté&nbsp;: petit α = queue lourde = beaucoup de records&nbsp;; grand α =
            queue fine = tout le monde se ressemble. Et sur du papier <b>log-log</b>, cette loi devient
            une <b>droite de pente −α</b> — le défi de Terminale.
          </p>
          <p className="mt-2">
            C&apos;est exactement le message de Mbappé, en équations&nbsp;: <b>la moyenne récompense
            le complet, la queue récompense le rare</b>. Un epsilon de talent hors-norme, poussé,
            t&apos;envoie dans la queue — le lien direct avec{" "}
            <Link href="/simulateur-epsilon" className="underline underline-offset-2" style={{ color: VERT }}>
              la machine des epsilons
            </Link>
            .
          </p>
        </div>

        {/* À QUOI ÇA SERT ? — la queue lourde est partout */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            À quoi ça sert ? — la queue lourde est partout
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              ⚽ <b>Pour toi.</b> Tu ne deviens pas remarquable en étant moyen partout, mais en
              poussant la chose où tu es <b>rare</b>. La moyenne, c&apos;est le peloton&nbsp;; ta
              qualité travaillée, c&apos;est la queue — là où on te remarque.
            </li>
            <li>
              🌋 <b>Les séismes et le volcan.</b> À la Fournaise, beaucoup de micro-secousses, très
              peu de grosses éruptions — mais ce sont elles qui comptent. C&apos;est une loi de
              puissance, pas une cloche&nbsp;: on ne peut pas « faire la moyenne » d&apos;un risque
              extrême.
            </li>
            <li>
              🌀 <b>Les cyclones.</b> Des dizaines de dépressions ordinaires, et de loin en loin un
              cyclone hors-norme (le record de pluie du monde est chez nous, à Foc-Foc). L&apos;exception
              vit dans la queue.
            </li>
            <li>
              📚 <b>Les mots, les villes, les vidéos.</b> Quelques mots ultra-fréquents, une nuée de
              mots rares (loi de Zipf)&nbsp;; quelques vidéos vues des millions de fois, des millions
              vues trois fois. Le « 80/20 » de Pareto gouverne le web.
            </li>
          </ul>
        </div>

        {/* UN PEU D'HISTOIRE */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Un peu d&apos;histoire — de la terre aux records
          </p>
          <p className="mt-2">
            <b>Vilfredo Pareto</b> (1896), économiste italien, remarque que <b>20 % des propriétaires</b>
            {" "}possèdent <b>80 % des terres</b> d&apos;Italie — et que la même forme revient partout&nbsp;:
            la loi de puissance était née. Un siècle plus tard, <b>Benoît Mandelbrot</b> montre que les
            cours de la Bourse, les crues du Nil et bien des phénomènes naturels ont ces <b>queues
            lourdes</b> que la cloche de Gauss ignore&nbsp;: sous-estimer la queue, c&apos;est ne jamais
            voir venir l&apos;extrême. Le records sportif, l&apos;exploit, le génie&nbsp;: autant de
            points que la moyenne n&apos;explique pas.
          </p>
        </div>

        {/* LES DÉFIS — la rampe CP → Terminale */}
        <DefisSimulateur
          titre="Les défis du buteur — du CP à la Terminale"
          coupDePouce="Coup de pouce : règle le curseur, lis la médiane et la moyenne sur la machine — elles vérifient pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* LES PONTS */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/loi-normale"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: VERT }}
          >
            🔔 L&apos;autre loi — la cloche qui ramène à la moyenne
          </Link>
          <Link
            href="/simulateur-epsilon"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#bfe0c8", backgroundColor: "#f4faf5", color: "#22402c" }}
          >
            ⚡ Active un epsilon — le talent qui engendre l&apos;infini
          </Link>
        </div>

        {/* L'HONNÊTETÉ */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#cfe6d5", color: "#5f8a6d" }}>
          Machine pédagogique&nbsp;: les « buts » et le seuil « record » sont des ordres de grandeur
          choisis pour rendre l&apos;idée visible, pas des statistiques réelles de la Coupe du monde.
          La phrase attribuée à Mbappé est reformulée. La loi normale se croise au lycée, la loi de
          Pareto et les lois de puissance se découvrent en études supérieures — mais l&apos;idée «&nbsp;le
          record vit dans la queue&nbsp;» se regarde dès qu&apos;on sait compter des buteurs.
        </p>
      </div>
    </main>
  );
}
