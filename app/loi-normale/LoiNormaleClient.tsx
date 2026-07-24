"use client";

// « La courbe en cloche n'est pas tombée du ciel » — la machine de l'article.
// L'élève A LA MAIN : il règle n (le nombre de pile-ou-face), la machine
// dessine l'escalier de la binomiale — les coefficients du triangle de
// Pascal — et la courbe de Gauss par-dessus. Plus n grandit, plus l'escalier
// épouse la cloche : c'est le théorème de De Moivre-Laplace (1733), et c'est
// l'intuition du dessin d'origine (courbe dentelée → « n → ∞ » → courbe
// lisse). Thème papier-cahier, comme toutes les machines nées d'un stylo.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const ENCRE = "#2b4a9b";
const OR = "#b97e12";

const N_MIN = 2;
const N_MAX = 150;

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

// Les nombres des défis sont DIFFÉRENTS des réglages par défaut : l'élève
// règle la machine pour vérifier (la machine = l'outil de correction).
const DEFIS: DefiSimulateur[] = [
  {
    id: "normale-c4-central",
    question:
      "Règle n = 4 (et p = 0,5). Quel est le coefficient CENTRAL de la ligne 4 du triangle de Pascal — celui de « 2 piles sur 4 lancers » ?",
    reponse: 6,
    unite: "(coefficient)",
    indice: "Écris la ligne 4 : 1, 4, _, 4, 1 — ou lis le triangle sous la machine.",
    calcul: "Ligne 4 : 1, 4, 6, 4, 1 — le coefficient central vaut 6.",
    tolerance: 0.4,
  },
  {
    id: "normale-somme-l10",
    question:
      "Règle n = 10. Quelle est la SOMME des 11 coefficients de la ligne 10 du triangle ?",
    reponse: 1024,
    unite: "",
    indice: "La somme d'une ligne double à chaque étage : 2, 4, 8, 16…",
    calcul: "2¹⁰ = 1 024 — chaque lancer double le nombre de chemins.",
    tolerance: 1,
  },
  {
    id: "normale-sigma-100",
    question:
      "Règle n = 100 et p = 0,5. Combien vaut l'écart-type σ de la cloche ?",
    reponse: 5,
    unite: "",
    indice: "σ = √(n × p × (1 − p)) — ou lis-le directement sur la machine.",
    calcul: "σ = √(100 × 0,5 × 0,5) = √25 = 5",
    tolerance: 0.3,
  },
  {
    id: "normale-95pc-haut",
    question:
      "Toujours n = 100, p = 0,5 : environ 95 % des résultats tombent entre μ − 2σ et μ + 2σ. Quelle est la borne HAUTE de cette fourchette ?",
    reponse: 60,
    unite: "piles",
    indice: "μ = 50 et σ = 5 : compte deux écarts-types au-dessus du centre.",
    calcul: "μ + 2σ = 50 + 2 × 5 = 60",
    tolerance: 0.6,
  },
  {
    id: "normale-sondage-400",
    question:
      "Un sondage interroge 400 personnes au hasard. À combien de points près connaît-on le vrai score de TOUTE la population (marge à 95 %) ? Règle la machine « sondage » pour vérifier.",
    reponse: 5,
    unite: "points",
    indice: "La marge à 95 % vaut environ 1/√n — et √400 = 20.",
    calcul: "Marge ≈ 1/√400 = 1/20 = 0,05 = 5 points.",
    tolerance: 0.6,
  },
];

const fmt = (x: number) => {
  if (x >= 100 || Math.abs(x - Math.round(x)) < 0.005)
    return Math.round(x).toLocaleString("fr-FR");
  return x.toFixed(x >= 10 ? 1 : 2).replace(".", ",");
};

/** log(k!) cumulées, pour calculer C(n,k)·pᵏqⁿ⁻ᵏ sans déborder (n = 150 OK). */
function logFactorielles(n: number): number[] {
  const lf = new Array<number>(n + 1).fill(0);
  for (let i = 2; i <= n; i++) lf[i] = lf[i - 1] + Math.log(i);
  return lf;
}

/** La ligne n de la binomiale : P(X = k) pour k = 0…n. */
function binomiale(n: number, p: number): number[] {
  const lf = logFactorielles(n);
  const lp = Math.log(p);
  const lq = Math.log(1 - p);
  return Array.from({ length: n + 1 }, (_, k) =>
    Math.exp(lf[n] - lf[k] - lf[n - k] + k * lp + (n - k) * lq),
  );
}

/** La ligne n du triangle de Pascal, exacte (affichée jusqu'à n = 10). */
function lignePascal(n: number): number[] {
  const ligne = [1];
  for (let k = 1; k <= n; k++)
    ligne.push(Math.round((ligne[k - 1] * (n - k + 1)) / k));
  return ligne;
}

export default function LoiNormaleClient() {
  const [n, setN] = useState(4);
  const [p, setP] = useState(0.5);
  const [film, setFilm] = useState(false);
  const [taille, setTaille] = useState(1000);
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

  // « ▶ Faire grandir n » — le film du théorème : n monte tout seul jusqu'au bout.
  useEffect(() => {
    if (!film) return;
    const id = setInterval(() => setN((v) => Math.min(v + 1, N_MAX)), 80);
    return () => clearInterval(id);
  }, [film]);
  useEffect(() => {
    if (film && n >= N_MAX) setFilm(false);
  }, [film, n]);
  const basculerFilm = () => {
    if (film) {
      setFilm(false);
      return;
    }
    if (n >= N_MAX) setN(N_MIN);
    setFilm(true);
  };

  const mu = n * p;
  const sigma = Math.sqrt(n * p * (1 - p));

  const machine = useMemo(() => {
    const probs = binomiale(n, p);
    // Fenêtre μ ± 4σ : sans elle, dès n = 100 la cloche serait un pic invisible.
    const x0 = Math.max(-0.5, mu - 4 * sigma - 0.5);
    const x1 = Math.min(n + 0.5, mu + 4 * sigma + 0.5);
    const kMin = Math.max(0, Math.ceil(x0 - 0.5));
    const kMax = Math.min(n, Math.floor(x1 + 0.5));
    const phi = (x: number) =>
      Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma)) /
      (sigma * Math.sqrt(2 * Math.PI));
    const sommet = phi(mu);
    let maxP = 0;
    let ecart = 0;
    for (let k = kMin; k <= kMax; k++) {
      maxP = Math.max(maxP, probs[k]);
      ecart = Math.max(ecart, Math.abs(probs[k] - phi(k)));
    }
    const maxY = Math.max(maxP, sommet) * 1.08;
    const xs = (x: number) => 40 + ((x - x0) / (x1 - x0)) * 940;
    const ys = (v: number) => 410 - (v / maxY) * 380;

    const barres = [];
    for (let k = kMin; k <= kMax; k++) {
      const g = xs(k - 0.5);
      const d = xs(k + 0.5);
      barres.push({ k, x: g + 0.5, w: Math.max(d - g - 1, 0.5), y: ys(probs[k]) });
    }
    // L'escalier — le contour dentelé du dessin d'origine.
    let escalier = `M ${xs(kMin - 0.5).toFixed(1)} 410`;
    for (let k = kMin; k <= kMax; k++)
      escalier += ` V ${ys(probs[k]).toFixed(1)} H ${xs(k + 0.5).toFixed(1)}`;
    escalier += " V 410";
    // La cloche, échantillonnée en 120 points.
    const cloche = Array.from({ length: 121 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / 120;
      return `${i === 0 ? "M" : "L"} ${xs(x).toFixed(1)} ${ys(phi(x)).toFixed(1)}`;
    }).join(" ");
    // Quelques graduations : μ et ± 1σ, ± 2σ (dédoublonnées, dans la fenêtre).
    const grads = [...new Set(
      [mu - 2 * sigma, mu - sigma, mu, mu + sigma, mu + 2 * sigma]
        .map(Math.round)
        .filter((k) => k >= kMin && k <= kMax),
    )];
    return { barres, escalier, cloche, grads, xs, ecartPc: (ecart / sommet) * 100 };
  }, [n, p, mu, sigma]);

  const lecture = useMemo(() => {
    const e = machine.ecartPc;
    if (e > 5) return "n est petit : l'escalier est encore tout dentelé — comme sur le dessin.";
    if (e > 2) return "L'escalier commence à épouser la cloche…";
    if (e > 0.8) return "Il faut plisser les yeux pour voir les marches.";
    return "Escalier et cloche sont quasiment confondus : c'est le théorème.";
  }, [machine.ecartPc]);

  // Les fameux coefficients : la ligne exacte jusqu'à n = 10, l'ordre de
  // grandeur du coefficient central au-delà (C(100, 50) ≈ 10²⁹ !).
  const pascal = useMemo(() => {
    if (n <= 10) return { ligne: lignePascal(n), central: null };
    const lf = logFactorielles(n);
    const k = Math.floor(n / 2);
    const log10 = (lf[n] - lf[k] - lf[n - k]) / Math.LN10;
    const exp = Math.floor(log10);
    const mantisse = Math.pow(10, log10 - exp);
    return { ligne: null, central: { k, mantisse, exp } };
  }, [n]);

  // LA MACHINE « SONDAGE » — le vrai pouvoir : de l'échantillon à la population.
  // On interroge `taille` personnes au hasard ; la moyenne de l'échantillon est
  // elle-même en cloche autour de la vraie valeur, avec une largeur qui rétrécit
  // en 1/√n. Marge à 95 % (pour p̂ = 0,5, le cas le plus prudent) ≈ 1/√n.
  const sondage = useMemo(() => {
    const marge = 100 / Math.sqrt(taille); // en points, ≈ 2σ (95 %) à p̂ = 0,5
    const sigmaPts = 50 / Math.sqrt(taille); // σ de l'estimation, en points
    const xs = (pct: number) => 40 + (pct / 100) * 920;
    const phi = (pct: number) => Math.exp(-((pct - 50) ** 2) / (2 * sigmaPts * sigmaPts));
    const cloche = Array.from({ length: 121 }, (_, i) => {
      const pct = (100 * i) / 120;
      return `${i === 0 ? "M" : "L"} ${xs(pct).toFixed(1)} ${(210 - phi(pct) * 175).toFixed(1)}`;
    }).join(" ");
    return {
      marge,
      cloche,
      xs,
      bas: Math.max(0, 50 - marge),
      haut: Math.min(100, 50 + marge),
    };
  }, [taille]);

  const grand = modeClasse ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl";

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
          La courbe en cloche n&apos;est pas tombée du ciel
        </h1>
        <p className="mt-3 text-[15px] leading-7">
          Tout est parti d&apos;un dessin au stylo sur une feuille à carreaux : une courbe{" "}
          <b>dentelée</b>, une flèche <b>« n → ∞ »</b>, une courbe <b>lisse</b>. L&apos;intuition
          derrière : la loi normale n&apos;est pas un décret — c&apos;est la <b>limite</b> d&apos;une
          loi à <b>coefficients</b>. Lance une pièce n fois : les chances de chaque score
          sont dictées par les coefficients du <b>triangle de Pascal</b>. Fais grandir n,
          et regarde l&apos;escalier devenir cloche. Au bout du chemin, son vrai pouvoir :
          connaître une population <b>entière</b> en n&apos;en mesurant qu&apos;un{" "}
          <b>échantillon</b> — et apprendre à ne jamais te juger sur une seule note.
        </p>

        {/* LES CURSEURS */}
        <div className="mt-6 rounded border p-4" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="lancers" className="text-sm font-black" style={{ color: ENCRE }}>
              n — le nombre de lancers de pièce
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={basculerFilm}
                className="rounded px-2.5 py-1 text-[12px] font-black text-white hover:brightness-110"
                style={{ backgroundColor: OR }}
              >
                {film ? "⏸ pause" : "▶ faire grandir n"}
              </button>
              <button
                type="button"
                onClick={basculerModeClasse}
                className="rounded border px-2 py-0.5 text-[11px] font-bold"
                style={{ borderColor: "#d5ddf0", color: "#6b7794" }}
              >
                {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
              </button>
            </div>
          </div>
          <input
            id="lancers"
            type="range"
            min={N_MIN}
            max={N_MAX}
            step={1}
            value={n}
            onChange={(e) => {
              setFilm(false);
              setN(parseInt(e.target.value, 10));
            }}
            className="mt-3 w-full accent-[#b97e12]"
          />
          <div className="mt-1 flex justify-between text-[11px]" style={{ color: "#8a93ab" }}>
            <span>2 — deux lancers</span>
            <span>30 — une classe de lancers</span>
            <span>150 — la cloche</span>
          </div>
          <p className={`mt-3 font-black ${grand}`} style={{ color: ENCRE }}>
            n = {n}{" "}
            <span style={{ color: OR }}>
              → écart escalier ↔ cloche : {fmt(machine.ecartPc)} %
            </span>
          </p>
          <p className="mt-1 text-[14px] font-semibold" style={{ color: "#4a5570" }}>
            {lecture}
          </p>

          <div className="mt-3 border-t pt-3" style={{ borderColor: "#e8ecf6" }}>
            <label htmlFor="piece" className="text-[13px] font-black" style={{ color: ENCRE }}>
              p — la pièce est-elle équilibrée ? (p = probabilité de pile)
            </label>
            <input
              id="piece"
              type="range"
              min={0.1}
              max={0.9}
              step={0.05}
              value={p}
              onChange={(e) => setP(parseFloat(e.target.value))}
              className="mt-2 w-full accent-[#2b4a9b]"
            />
            <p className="mt-1 text-[12px]" style={{ color: "#8a93ab" }}>
              p = {p.toFixed(2).replace(".", ",")} — même avec une pièce truquée, la
              cloche revient quand n grandit : c&apos;est la force du théorème.
            </p>
          </div>
        </div>

        {/* LA MACHINE — l'escalier de la binomiale sous la cloche de Gauss */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            L&apos;escalier (binomiale) sous la cloche (normale)
          </p>
          <svg
            viewBox="0 0 1000 460"
            className="mt-3 w-full"
            role="img"
            aria-label={`Pour n = ${n} lancers : l'histogramme de la loi binomiale (escalier doré) et la courbe de la loi normale (encre bleue) — écart maximal ${fmt(machine.ecartPc)} % du sommet`}
          >
            {/* les barres : une par score k, hauteur = probabilité C(n,k)pᵏqⁿ⁻ᵏ */}
            {machine.barres.map((b) => (
              <rect
                key={b.k}
                x={b.x}
                y={b.y}
                width={b.w}
                height={410 - b.y}
                fill="#e8a013"
                opacity={0.32}
              />
            ))}
            {/* le contour dentelé — la première courbe du dessin */}
            <path d={machine.escalier} fill="none" stroke={OR} strokeWidth="2.5" strokeLinejoin="round" />
            {/* la cloche — la seconde courbe du dessin */}
            <path d={machine.cloche} fill="none" stroke={ENCRE} strokeWidth="3.5" strokeLinecap="round" />
            {/* l'axe et ses graduations (μ et ± σ, ± 2σ) */}
            <line x1="30" y1="410" x2="990" y2="410" stroke="#8a93ab" strokeWidth="1.5" />
            {machine.grads.map((k) => (
              <g key={k}>
                <line x1={machine.xs(k)} y1="410" x2={machine.xs(k)} y2="417" stroke="#8a93ab" strokeWidth="1.5" />
                <text
                  x={machine.xs(k)}
                  y="438"
                  textAnchor="middle"
                  fontSize={modeClasse ? 20 : 15}
                  fontWeight={k === Math.round(mu) ? 900 : 600}
                  fill={k === Math.round(mu) ? ENCRE : "#8a93ab"}
                >
                  {k}
                </text>
              </g>
            ))}
          </svg>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] font-semibold">
            <span style={{ color: OR }}>▉ l&apos;escalier — la binomiale, coefficients de Pascal</span>
            <span style={{ color: ENCRE }}>— la cloche — la loi normale</span>
            <span style={{ color: "#8a93ab" }}>
              centre μ = {fmt(mu)} · largeur σ = {fmt(sigma)}
            </span>
          </div>
        </div>

        {/* LES FAMEUX COEFFICIENTS — la ligne n du triangle de Pascal */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Les fameux coefficients — la ligne n du triangle de Pascal
          </p>
          {pascal.ligne ? (
            <>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {pascal.ligne.map((c, k) => (
                  <span
                    key={k}
                    className={`rounded border px-2 py-0.5 font-black ${modeClasse ? "text-xl" : "text-sm"}`}
                    style={{
                      borderColor: "#e3d3a8",
                      backgroundColor: k === Math.round(n / 2) ? "#e8a01322" : "#fdf9ef",
                      color: "#3a3325",
                    }}
                  >
                    {c.toLocaleString("fr-FR")}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[12.5px]" style={{ color: "#8a93ab" }}>
                C(n, k) compte les <b>chemins</b> : combien de façons d&apos;obtenir k piles
                en {n} lancers. Beaucoup de chemins passent par le milieu, très peu par
                les bords — voilà la bosse.
              </p>
            </>
          ) : (
            <p className="mt-3 text-[14px] leading-6" style={{ color: "#3a3325" }}>
              La ligne {n} ne tient plus à l&apos;écran : son coefficient central vaut{" "}
              <b style={{ color: ENCRE }}>
                C({n}, {pascal.central!.k}) ≈ {pascal.central!.mantisse.toFixed(1).replace(".", ",")} × 10
                <sup>{pascal.central!.exp}</sup>
              </b>
              . Des nombres gigantesques… qui, une fois divisés par 2ⁿ, dessinent
              sagement la cloche.
            </p>
          )}
        </div>

        {/* LES MATHS */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#e3d3a8", backgroundColor: "#fdf9ef", color: "#3a3325" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Les maths de la machine — le théorème de De Moivre-Laplace
          </p>
          <p className="mt-2">
            La binomiale donne P(X = k) = <b>C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ</b>. Quand n
            grandit, ce produit de coefficients se rapproche de{" "}
            <b>
              e^(−(k − μ)² / 2σ²) / (σ√(2π))
            </b>{" "}
            avec μ = np et σ = √(np(1 − p)) — l&apos;équation exacte de la loi normale.
            L&apos;intuition du dessin est donc un théorème : <b>la cloche est la limite
            d&apos;une loi à coefficients</b>.
          </p>
          <p className="mt-2">
            Et ce n&apos;est pas réservé au pile ou face : le <b>théorème central limite</b>{" "}
            dit que toute somme de nombreux petits hasards indépendants finit en cloche.
            Tailles dans une classe, erreurs de mesure, moyennes d&apos;échantillons… c&apos;est
            pour ça qu&apos;on l&apos;a appelée « normale ». Et c&apos;est de là que vient son{" "}
            <b>vrai pouvoir</b> : la moyenne d&apos;un <b>échantillon</b> est elle-même en cloche,
            centrée sur la vraie valeur de la <b>population</b>, avec une largeur qui rétrécit
            en <b>σ/√n</b>. C&apos;est ce qui permet de connaître un pays entier en n&apos;en
            mesurant qu&apos;un petit bout — la machine juste en dessous.
          </p>
        </div>

        {/* DE L'ÉCHANTILLON À LA POPULATION — la machine « sondage » (le √n) */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            De l&apos;échantillon à la population — le sondage
          </p>
          <p className="mt-2 text-[14px] leading-7">
            Le vrai pouvoir de la cloche est là : <b>de l&apos;individu vers
            l&apos;humanité, de l&apos;échantillon vers la population</b>. Tu ne peux pas
            interroger les <b>860 000</b> Réunionnais. Tu en interroges <b>n au hasard</b> — et la cloche
            te dit à quel point ton estimation vaut pour l&apos;île <b>entière</b>. Une cuillère
            de rougail bien touillée goûte toute la marmite&nbsp;: c&apos;est le même principe.
          </p>

          <label htmlFor="taille" className="mt-4 block text-sm font-black" style={{ color: ENCRE }}>
            Combien de personnes tu interroges (au hasard) ?
          </label>
          <input
            id="taille"
            type="range"
            min={25}
            max={5000}
            step={25}
            value={taille}
            onChange={(e) => setTaille(parseInt(e.target.value, 10))}
            className="mt-2 w-full accent-[#b97e12]"
          />
          <div className="mt-1 flex justify-between text-[11px]" style={{ color: "#8a93ab" }}>
            <span>25 — trop peu</span>
            <span>1 000 — un vrai sondage</span>
            <span>5 000 — très précis</span>
          </div>
          <p className={`mt-3 font-black ${grand}`} style={{ color: ENCRE }}>
            n = {taille}{" "}
            <span style={{ color: OR }}>→ le vrai score est à ± {fmt(sondage.marge)} points</span>
          </p>
          <p className="mt-1 text-[14px] font-semibold" style={{ color: "#4a5570" }}>
            Ton échantillon dit « 50 % » ? Alors, dans TOUTE la population, le vrai chiffre
            est entre <b>{fmt(sondage.bas)} %</b> et <b>{fmt(sondage.haut)} %</b> (19 fois sur 20).
          </p>

          <svg
            viewBox="0 0 1000 240"
            className="mt-3 w-full"
            role="img"
            aria-label={`Pour un échantillon de ${taille} personnes, la fourchette du vrai score de la population va de ${fmt(sondage.bas)} % à ${fmt(sondage.haut)} % — la cloche de l'estimation`}
          >
            {/* la fourchette : là où se cache le vrai score de la population */}
            <rect
              x={sondage.xs(sondage.bas)}
              y="20"
              width={Math.max(sondage.xs(sondage.haut) - sondage.xs(sondage.bas), 2)}
              height="190"
              fill="#e8a013"
              opacity="0.14"
            />
            {/* la cloche de l'estimation — elle rétrécit quand n grandit */}
            <path d={sondage.cloche} fill="none" stroke={ENCRE} strokeWidth="3.5" strokeLinecap="round" />
            {/* l'axe 0 → 100 % */}
            <line x1="30" y1="210" x2="990" y2="210" stroke="#8a93ab" strokeWidth="1.5" />
            {[0, 25, 50, 75, 100].map((t) => (
              <g key={t}>
                <line x1={sondage.xs(t)} y1="210" x2={sondage.xs(t)} y2="217" stroke="#8a93ab" strokeWidth="1.5" />
                <text
                  x={sondage.xs(t)}
                  y="234"
                  textAnchor="middle"
                  fontSize={modeClasse ? 18 : 14}
                  fontWeight={t === 50 ? 900 : 600}
                  fill={t === 50 ? ENCRE : "#8a93ab"}
                >
                  {t} %
                </text>
              </g>
            ))}
          </svg>

          <div className="mt-3 rounded border p-3 text-[13px] leading-6" style={{ borderColor: "#e3d3a8", backgroundColor: "#fdf9ef", color: "#3a3325" }}>
            <b style={{ color: OR }}>La règle du √n.</b> La marge (à 95 %) vaut environ{" "}
            <b>1/√n</b>. Pour la diviser par 2, il faut <b>4 fois</b> plus de monde&nbsp;: c&apos;est
            pour ça qu&apos;un vrai sondage interroge ~1 000 personnes (± 3 points) et pas 100
            (± 10) — mais que passer de 1 000 à 2 000 ne gagne presque rien.
          </div>
        </div>

        {/* À QUOI ÇA SERT ? — l'ancrage 974, comme sur les fiches. Deux directions :
            de l'échantillon à la population (le sondage), et… pour soi-même. */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            À quoi ça sert ? — de l&apos;individu vers l&apos;humanité
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              🎓 <b>Pour toi-même.</b> Tes notes fluctuent autour de TA moyenne, avec TA
              régularité σ. Une note isolée dans ta fourchette μ ± 2σ, ce n&apos;est pas un
              progrès ni une chute — c&apos;est du bruit. Le vrai progrès, c&apos;est quand toute
              ta cloche se déplace. La loi normale t&apos;apprend à ne jamais te juger sur
              une seule note.
            </li>
            <li>
              💊 <b>Les médicaments que tu prends.</b> Un traitement est testé sur
              quelques milliers de patients, jamais sur tout le monde. C&apos;est la cloche
              de l&apos;échantillon qui permet d&apos;affirmer « efficace pour la population » —
              chaque boîte de ta pharmacie est passée par ce raisonnement.
            </li>
            <li>
              🏭 <b>L&apos;usine sucrière.</b> Au Gol ou à Bois-Rouge, on ne pèse pas TOUS
              les paquets de sucre : on en pèse quelques-uns par heure, et la cloche dit
              si toute la production est bien réglée. Goûter la marmite à la cuillère.
            </li>
            <li>
              🌋 <b>L&apos;observatoire du volcan.</b> À la Fournaise, chaque capteur GPS a
              une petite erreur de mesure, en plus ou en moins — une cloche, comme chez
              Gauss. C&apos;est en la connaissant qu&apos;on distingue un gonflement RÉEL du
              volcan du simple bruit des instruments. Exactement comme ta note : signal
              ou bruit ?
            </li>
            <li>
              📏 <b>Le carnet de santé.</b> Les courbes de croissance sont bâties sur la
              cloche d&apos;un échantillon d&apos;enfants mesurés — et te situent, toi, dans la
              population entière : « dans la fourchette » = μ ± 2σ, le défi 4.
            </li>
          </ul>
        </div>

        {/* UN PEU D'HISTOIRE */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Un peu d&apos;histoire — trois siècles autour d&apos;une courbe
          </p>
          <p className="mt-2">
            <b>Abraham de Moivre</b> (1733), mathématicien français réfugié à Londres,
            calcule pour les joueurs : les coefficients binomiaux deviennent monstrueux
            (tu as vu C(100, 50) ≈ 10²⁹ sur la machine), alors il cherche une formule
            approchée — et trouve la cloche. <b>Pierre-Simon de Laplace</b> (1812)
            généralise le résultat à toutes les pièces, même truquées : c&apos;est le
            théorème de la machine. <b>Carl Friedrich Gauss</b> (1809) retrouve la même
            courbe par une tout autre porte — les erreurs de mesure des astronomes — et
            elle prendra son nom.
          </p>
          <p className="mt-2">
            Au XIXᵉ siècle, <b>Adolphe Quetelet</b> la découvre dans les mesures
            humaines (tailles, tours de poitrine des soldats) et invente « l&apos;homme
            moyen » ; <b>Francis Galton</b> construit sa fameuse <b>planche à
            clous</b> — des billes qui tombent à pile ou face sur des rangées de clous
            et s&apos;empilent… en cloche : notre machine, en bois. Clin d&apos;œil final :
            l&apos;Allemagne a imprimé la courbe et son équation sur le billet de
            10 marks, à côté du portrait de Gauss. Une courbe née d&apos;une table de jeu,
            finie sur un billet de banque.
          </p>
        </div>

        {/* LES DÉFIS */}
        <DefisSimulateur
          titre="Les défis de la cloche"
          coupDePouce="Coup de pouce : règle n et p sur la machine — μ, σ et le triangle vérifient pour toi."
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
            ⚡ L&apos;autre machine née d&apos;un dessin — active un epsilon
          </Link>
          {/* Le pont vers le coach est désormais porté par DefisSimulateur
              (bloc des défis, au-dessus) — commun à toutes les machines. */}
        </div>

        {/* L'HONNÊTETÉ */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#d5ddf0", color: "#8a93ab" }}>
          Machine pédagogique : le théorème demande n grand et p fixé — en pratique
          l&apos;approximation est déjà bonne dès que np(1 − p) dépasse quelques unités.
          La loi binomiale se travaille en première, la loi normale se croise au lycée
          et après — mais l&apos;idée se regarde dès qu&apos;on sait compter des chemins.
          Née d&apos;un dessin au stylo sur une feuille à carreaux, comme{" "}
          <Link href="/simulateur-epsilon" className="underline underline-offset-2">
            la machine des epsilons
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
