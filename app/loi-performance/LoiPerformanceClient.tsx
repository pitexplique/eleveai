"use client";

// « La loi de la performance » — la machine née du dessin de Frédéric (un soir
// de juillet : la plage, la famille, le sport, et une interview de Kylian
// Mbappé — « on a des défauts et des qualités ; il faut améliorer ses défauts,
// mais SURTOUT ses qualités, c'est ce qui nous différencie »). Le dessin : un
// ADN à gauche → des variables X (tes traits) → des COEFFICIENTS que tu règles
// → un réseau de neurones → la performance. C'est, mot pour mot, un neurone :
// une somme pondérée Σ aᵢxᵢ. L'élève A LA MAIN sur les coefficients : il
// répartit son énergie et voit ce que devient sa performance. La leçon de
// Mbappé, en équation : pour sortir du lot, pèse ta qualité rare.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const VERT = "#1f6b3a";
const OR = "#c8962a";

// Les traits du joueur (les variables X du dessin, sorties de l'ADN). La valeur
// x = ce que rapporte CHAQUE point d'énergie investi sur ce trait.
const TRAITS = [
  { id: "vitesse", nom: "La vitesse", note: "ta qualité rare", x: 9, defaut: false },
  { id: "tir", nom: "Le tir", note: "un point fort", x: 6, defaut: false },
  { id: "passes", nom: "Les passes", note: "correct", x: 4, defaut: false },
  { id: "defense", nom: "La défense", note: "à travailler", x: 3, defaut: true },
  { id: "tete", nom: "Le jeu de tête", note: "ton défaut", x: 2, defaut: true },
];
const BUDGET = 10; // les points d'énergie à répartir (la somme des coefficients)
const PERF_MAX = BUDGET * TRAITS[0].x; // tout sur la qualité rare = 90

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

// La rampe CP → Terminale : la MÊME question (« sur quoi mettre son énergie ? »),
// un outil qui grandit — de l'addition à la programmation linéaire. Réponse
// numérique unique par carte, id stable.
const DEFIS: DefiSimulateur[] = [
  {
    id: "perf-cp-produit",
    question:
      "CP · CE1 — Tu mets 2 points d'énergie sur la vitesse. Chaque point rapporte 9 de performance. Combien de performance cela fait-il ?",
    reponse: 18,
    unite: "",
    indice: "C'est une multiplication : 2 × 9.",
    calcul: "2 × 9 = 18 de performance.",
    tolerance: 0.5,
  },
  {
    id: "perf-cm1-ecart",
    question:
      "CE2 · CM1 — Tout ton budget (10 points) sur le jeu de tête (vaut 2) donne 20 de performance. Tout sur la vitesse (vaut 9) donne 90. Combien de performance EN PLUS avec la vitesse ?",
    reponse: 70,
    unite: "",
    indice: "Soustrais : 90 − 20.",
    calcul: "90 − 20 = 70 de plus. C'est pour ça qu'on pèse sa qualité, pas son défaut.",
    tolerance: 0.5,
  },
  {
    id: "perf-cm2-somme",
    question:
      "CM2 — Tu mets 6 points sur la vitesse (9) et 4 points sur le tir (6). Quelle est ta performance totale ?",
    reponse: 78,
    unite: "",
    indice: "Calcule 6 × 9, puis 4 × 6, puis additionne.",
    calcul: "6 × 9 + 4 × 6 = 54 + 24 = 78 — une somme pondérée, exactement ce que fait un neurone.",
    tolerance: 0.5,
  },
  {
    id: "perf-6e-pourcent",
    question:
      "6ᵉ · 5ᵉ — La performance maximale est 90. Ton réglage atteint 45. Quel POURCENTAGE du maximum atteins-tu ?",
    reponse: 50,
    unite: "%",
    indice: "Calcule 45 ÷ 90, puis convertis en pourcentage.",
    calcul: "45 ÷ 90 = 0,5 = 50 % du maximum.",
    tolerance: 0.5,
  },
  {
    id: "perf-4e-marginal",
    question:
      "4ᵉ · 3ᵉ — Tu déplaces 1 point d'énergie du jeu de tête (vaut 2) vers la vitesse (vaut 9). Combien de performance gagnes-tu ?",
    reponse: 7,
    unite: "",
    indice: "Tu perds 2 et tu gagnes 9 : fais 9 − 2.",
    calcul: "9 − 2 = 7 gagnés par point déplacé. La pente la plus raide est sur ta qualité.",
    tolerance: 0.5,
  },
  {
    id: "perf-2nde-neurone",
    question:
      "2ⁿᵈᵉ — Un neurone calcule Σ aᵢ xᵢ. Avec les coefficients a = (1, 0, 0, 0, 3) et les traits x = (9, 6, 4, 3, 2), combien vaut la performance ?",
    reponse: 15,
    unite: "",
    indice: "1 × 9 + 0 + 0 + 0 + 3 × 2.",
    calcul: "1×9 + 3×2 = 9 + 6 = 15 — le produit scalaire des coefficients et des traits.",
    tolerance: 0.5,
  },
  {
    id: "perf-1re-argmax",
    question:
      "1ʳᵉ — Pour maximiser Σ aᵢ xᵢ avec 10 points d'énergie et AUCUNE limite par trait, on met tout sur le plus grand xᵢ. Quelle performance maximale obtient-on ?",
    reponse: 90,
    unite: "",
    indice: "10 points × la plus grande valeur de trait (9).",
    calcul: "10 × 9 = 90 : la solution d'un problème linéaire est toujours dans un coin — tout sur argmax xᵢ.",
    tolerance: 0.5,
  },
  {
    id: "perf-term-plafond",
    question:
      "Terminale — Nouvelle règle : au plus 4 points par trait. On garnit alors les 3 meilleurs (9, 6, 4) : 4 sur la vitesse, 4 sur le tir, 2 sur les passes. Quelle performance ?",
    reponse: 68,
    unite: "",
    indice: "4 × 9 + 4 × 6 + 2 × 4.",
    calcul: "4×9 + 4×6 + 2×4 = 36 + 24 + 8 = 68 : sous contrainte, on remplit les meilleurs traits d'abord (programmation linéaire).",
    tolerance: 0.5,
  },
];

export default function LoiPerformanceClient() {
  const [coeffs, setCoeffs] = useState<number[]>([2, 2, 2, 2, 2]);
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

  const total = coeffs.reduce((s, c) => s + c, 0);
  const reste = BUDGET - total;
  const performance = coeffs.reduce((s, c, i) => s + c * TRAITS[i].x, 0);

  const regler = (i: number, delta: number) => {
    setCoeffs((cs) => {
      const next = [...cs];
      const v = next[i] + delta;
      if (v < 0) return cs;
      if (delta > 0 && reste <= 0) return cs;
      next[i] = v;
      return next;
    });
  };

  const preset = (mode: "etale" | "qualite") => {
    if (mode === "etale") setCoeffs([2, 2, 2, 2, 2]);
    else setCoeffs([BUDGET, 0, 0, 0, 0]); // tout sur la vitesse
  };

  // La position des nœuds pour le petit réseau (entrées → neurone → sortie).
  const viz = useMemo(() => {
    const ys = [58, 118, 178, 238, 298];
    return {
      entrees: TRAITS.map((t, i) => ({ x: 120, y: ys[i], epaisseur: 1 + coeffs[i] * 1.4 })),
      neurone: { x: 400, y: 178 },
      sortie: { x: 620, y: 178 },
    };
  }, [coeffs]);

  const grand = modeClasse ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl";
  const lecture =
    performance >= 80
      ? "Tu as tout misé sur ta qualité rare : ta performance explose. C'est le choix de Mbappé."
      : performance >= 60
        ? "Tu concentres sur tes points forts : la performance grimpe vite."
        : total < BUDGET
          ? `Il te reste ${reste} point(s) d'énergie à placer.`
          : "Énergie étalée sur tout : tu deviens un joueur complet… mais moyen. Personne ne se souvient d'un joueur moyen.";

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
          Faut-il améliorer ses défauts ou ses qualités ?
        </h1>
        <p className="mt-2 text-lg font-black" style={{ color: OR }}>
          La loi de la performance
        </p>

        <p className="mt-3 text-[15px] leading-7">
          Un soir de juillet, à la plage avec ma famille, après le sport, je tombe sur une
          interview de <b>Kylian Mbappé</b> : «&nbsp;on a des défauts et des qualités&nbsp;;
          il faut améliorer ses défauts, mais <b>surtout</b> ses qualités, car c&apos;est ce
          qui nous différencie&nbsp;». J&apos;ai attrapé un stylo et dessiné ça sur une feuille
          à carreaux : ton <b>ADN</b> te donne des <b>traits</b> (des variables x), tu poses
          des <b>coefficients</b> dessus, un <b>réseau de neurones</b> les combine, et il en
          sort… ta <b>performance</b>. C&apos;est, mot pour mot, un <b>neurone</b> : une somme
          pondérée <b>Σ aᵢxᵢ</b>. Et les coefficients, c&apos;est <b>toi</b> qui les règles.
        </p>

        {/* LE DESSIN D'ORIGINE */}
        <figure className="mt-5 overflow-hidden rounded border" style={{ borderColor: "#cfe6d5", backgroundColor: "#fcfcf7" }}>
          <Image
            src="/images/adn-reseau-coeur.svg"
            alt="Le dessin d'origine : l'ADN donne des variables x, des coefficients, un réseau de neurones, et la performance en sortie"
            width={800}
            height={480}
            className="h-auto w-full"
            unoptimized
          />
          <figcaption className="px-3 py-2 text-[12px] font-semibold" style={{ color: "#5f8a6d" }}>
            Le dessin d&apos;origine, retracé : l&apos;ADN → les traits x → les coefficients →
            le réseau → la performance.
          </figcaption>
        </figure>

        {/* LA MACHINE — règle tes coefficients */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
              Règle tes coefficients — {BUDGET} points d&apos;énergie à placer
            </p>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: "#cfe6d5", color: "#5f8a6d" }}
            >
              {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {TRAITS.map((t, i) => (
              <div key={t.id} className="flex items-center gap-3 rounded border p-2.5" style={{ borderColor: "#e2efe6" }}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black" style={{ color: VERT }}>
                    {t.nom}{" "}
                    <span className="text-[12px] font-semibold" style={{ color: t.defaut ? "#b3261e" : OR }}>
                      · {t.note} (rend {t.x}/pt)
                    </span>
                  </p>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#e7f3ea" }}>
                    <div className="h-full rounded-full" style={{ width: `${(coeffs[i] / BUDGET) * 100}%`, backgroundColor: t.defaut ? "#b3261e" : OR }} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => regler(i, -1)}
                    aria-label={`Enlever un point à ${t.nom}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-lg font-black"
                    style={{ borderColor: "#cfe6d5", color: VERT }}
                  >
                    −
                  </button>
                  <span className={`w-6 text-center font-black ${modeClasse ? "text-2xl" : "text-lg"}`} style={{ color: VERT }}>
                    {coeffs[i]}
                  </span>
                  <button
                    type="button"
                    onClick={() => regler(i, +1)}
                    aria-label={`Ajouter un point à ${t.nom}`}
                    disabled={reste <= 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-black text-white disabled:opacity-30"
                    style={{ backgroundColor: OR }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[13px] font-bold" style={{ color: reste === 0 ? VERT : "#b3261e" }}>
              Énergie placée : {total}/{BUDGET}
              {reste > 0 ? ` — il reste ${reste}` : " — tout est placé"}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => preset("etale")} className="rounded border px-2.5 py-1 text-[12px] font-bold" style={{ borderColor: "#cfe6d5", color: "#5f8a6d" }}>
                Tout étaler
              </button>
              <button type="button" onClick={() => preset("qualite")} className="rounded px-2.5 py-1 text-[12px] font-black text-white" style={{ backgroundColor: VERT }}>
                Tout sur ma qualité
              </button>
            </div>
          </div>

          <p className={`mt-3 font-black ${grand}`} style={{ color: VERT }}>
            performance = {performance}{" "}
            <span className="text-base font-bold" style={{ color: "#5f8a6d" }}>
              / {PERF_MAX} max
            </span>
          </p>
          <div className="mt-2 h-4 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#e7f3ea" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(performance / PERF_MAX) * 100}%`, backgroundColor: OR }} />
          </div>
          <p className="mt-2 text-[14px] font-semibold" style={{ color: "#3f6650" }}>
            {lecture}
          </p>
        </div>

        {/* LE NEURONE — le réseau qui calcule la somme pondérée */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Le neurone — il fait la somme pondérée Σ aᵢxᵢ
          </p>
          <svg viewBox="0 0 700 356" className="mt-3 w-full" role="img" aria-label={`Réseau : cinq traits reliés à un neurone par des coefficients (plus le trait est doté, plus le trait est épais), le neurone sort la performance ${performance}`}>
            {/* les liaisons entrées → neurone : épaisseur = coefficient */}
            {viz.entrees.map((e, i) => (
              <line
                key={i}
                x1={e.x + 14}
                y1={e.y}
                x2={viz.neurone.x - 26}
                y2={viz.neurone.y}
                stroke={coeffs[i] === 0 ? "#d6e6db" : TRAITS[i].defaut ? "#c58" : OR}
                strokeOpacity={coeffs[i] === 0 ? 0.5 : 0.85}
                strokeWidth={e.epaisseur}
                strokeLinecap="round"
              />
            ))}
            {/* la liaison neurone → sortie */}
            <line x1={viz.neurone.x + 26} y1={viz.neurone.y} x2={viz.sortie.x - 24} y2={viz.sortie.y} stroke={VERT} strokeWidth="3" strokeLinecap="round" />
            {/* les nœuds d'entrée (les traits) */}
            {viz.entrees.map((e, i) => (
              <g key={i}>
                <circle cx={e.x} cy={e.y} r="14" fill="#fff" stroke={TRAITS[i].defaut ? "#b3261e" : OR} strokeWidth="2.5" />
                <text x={e.x - 22} y={e.y + 5} textAnchor="end" fontSize={modeClasse ? 16 : 13} fontWeight={700} fill={VERT}>
                  {TRAITS[i].nom}
                </text>
                <text x={e.x} y={e.y + 5} textAnchor="middle" fontSize="12" fontWeight={900} fill={VERT}>
                  {coeffs[i]}
                </text>
              </g>
            ))}
            {/* le neurone */}
            <circle cx={viz.neurone.x} cy={viz.neurone.y} r="26" fill="#fdf6e6" stroke={OR} strokeWidth="3" />
            <text x={viz.neurone.x} y={viz.neurone.y + 6} textAnchor="middle" fontSize="18" fontWeight={900} fill={OR}>
              Σ
            </text>
            {/* la sortie */}
            <circle cx={viz.sortie.x} cy={viz.sortie.y} r="30" fill={VERT} />
            <text x={viz.sortie.x} y={viz.sortie.y - 2} textAnchor="middle" fontSize={modeClasse ? 22 : 19} fontWeight={900} fill="#fff">
              {performance}
            </text>
            <text x={viz.sortie.x} y={viz.sortie.y + 15} textAnchor="middle" fontSize="10" fontWeight={700} fill="#cfe6d5">
              perf.
            </text>
          </svg>
          <p className="mt-1 text-[12.5px]" style={{ color: "#5f8a6d" }}>
            Chaque trait entre avec son coefficient : plus le trait est <b>épais</b>, plus tu y
            as mis d&apos;énergie. Le neurone additionne tout — <b>Σ aᵢxᵢ</b> — et sort ta
            performance. Régler ses coefficients, c&apos;est apprendre.
          </p>
        </div>

        {/* LA RÉPONSE À LA QUESTION DU TITRE */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#bfe0c8", backgroundColor: "#f4faf5", color: "#22402c" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Alors, défauts ou qualités ?
          </p>
          <p className="mt-2">
            En maths, la réponse est nette : dans une somme pondérée, chaque point d&apos;énergie
            rapporte <b>la valeur du trait</b>. Un point sur ta qualité rare (9) rapporte{" "}
            <b>4,5 fois plus</b> qu&apos;un point sur ton défaut (2). Pour <b>te différencier</b>,
            il faut donc <b>peser ta qualité</b> — c&apos;est exactement ce que dit Mbappé.
          </p>
          <p className="mt-2">
            Mais attention à la nuance de sa phrase : il dit d&apos;améliorer ses défauts{" "}
            <b>aussi</b>. Un défaut laissé à zéro peut casser l&apos;équipe (un attaquant qui ne
            défend jamais). En vrai, on garde un <b>plancher</b> sur ses défauts — le défi de
            Terminale, avec un plafond par trait, le montre — mais l&apos;énergie <b>en plus</b>{" "}
            va sur la qualité. La moyenne, c&apos;est le peloton ; ta qualité travaillée, c&apos;est
            ce qui reste dans les mémoires.
          </p>
        </div>

        {/* LES DÉFIS */}
        <DefisSimulateur
          titre="Les défis de la performance — du CP à la Terminale"
          coupDePouce="Coup de pouce : règle tes coefficients sur la machine, le neurone calcule la somme pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* LES PONTS */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/loi-pareto"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: VERT }}
          >
            ⚽ Et tous les joueurs ensemble ? — la loi de Pareto
          </Link>
          <Link
            href="/simulateur-epsilon"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#bfe0c8", backgroundColor: "#f4faf5", color: "#22402c" }}
          >
            ⚡ Le frère de ce dessin — l&apos;epsilon qui engendre l&apos;infini
          </Link>
        </div>

        {/* L'HONNÊTETÉ */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#cfe6d5", color: "#5f8a6d" }}>
          Machine pédagogique : les traits et leurs valeurs sont un exemple pour rendre l&apos;idée
          visible, pas une vraie évaluation de joueur. La phrase de Mbappé est reformulée. Un vrai
          neurone ajoute encore un biais et une fonction d&apos;activation — mais le cœur, la somme
          pondérée Σ aᵢxᵢ, c&apos;est bien ce dessin, né un soir de juillet sur une feuille à
          carreaux.
        </p>
      </div>
    </main>
  );
}
