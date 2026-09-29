// ─── Fiche d'exercices : les fractions (6e) — 20 exercices corrigés ────────────
//
// Lot de 6e (30/09/2026), sur la forme de l'étalon `maths-5e-relatif-nombre.tsx`
// et de la feuille voisine `maths-5e-fraction-nombre.tsx` (mêmes aides de
// dessin, reprises telles quelles : `droiteRel`, `comparer`, `barres`, `table`).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-fractions.tsx` (même
// vocabulaire : numérateur en haut = parts prises, dénominateur en bas = parts
// du partage, « parts égales ») et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/fractions.bank.ts` (notion fraction_nombre).
// ⛔ LIMITES DE LA 6e, lues dans la banque : lire, écrire, représenter une
// fraction ; fractions DÉCIMALES (dixièmes, centièmes) et 1/2, 1/5 en décimal ;
// comparer à même dénominateur, à même numérateur, à 1, et en redécoupant
// quand un dénominateur est multiple de l'autre ; encadrer entre deux entiers
// et l'écriture « entier + fraction » ; fractions égales (2/8 = 1/4). Aucun
// calcul de fractions (c'est la feuille `fraction-calcul`), ni fraction d'une
// quantité (micro fraction_quantite, passée sous fraction_calcul le 22/08),
// ni nombre négatif, ni simplification systématique.
// ⛔ Aucun exemple de la fiche de cours n'est repris (le disque 3/4, le gâteau
// 5/6, la grille 3/4, 1/3 contre 1/5, 3/5 contre 4/5, 1/4 · 1/2 · 3/4 sur la
// droite, 7/4, 4/6, la pizza 3/8, 2/4 = 1/2, 2/3 contre 3/4, les 15 billes, les
// 12 biscuits), ni de la feuille de 5e (2/3 = 8/12, la famille de 3/8, 7 ÷ 4,
// 17/4, les tirs au but, le jardin, les fractions de l'heure, la fraction
// mystère en douzièmes).
//
// Les pièges nommés : les parts blanches mises en bas (1), le haut et le bas
// échangés (2), colorier le dénominateur (3), des parts inégales (4), des
// centièmes lus comme des dixièmes (5, 14, 15), oublier l'unité de 1,7 (6), un
// grand dénominateur pris pour une grande fraction (7, 15), « une fraction est
// toujours plus petite que 1 » (8, 15), ajouter au lieu de multiplier (9),
// comparer les numérateurs sans redécouper (10, 11, 16, 20), lire « 2 + 1/5 »
// comme un produit (12), compter les traits au lieu des sauts (13), rapporter
// une part à une autre part (19), « le plus de voix » pris pour « plus de la
// moitié » (17), la barre de fraction lue comme une virgule (18).
//
// Pas de fait réel : classes, gourdes, sentier, vitrail sont des MODÈLES.
//
// ⭐ LES DESSINS : des BARRES empilées (`barres`, reprise de la 5e), des barres
// coupées en parts inégales (`decoupes`, pour « sans parts égales, pas de
// fraction »), une GRILLE de carreaux (`grille` : tablette, vote, vitrail), la
// droite graduée de l'étalon (`droiteRel`), les deux barres du coach
// (`comparer`) et des tableaux (`table`). 13 dessins imprimés ; ceux qui
// redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je compte les parts »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-fraction-nombre.mjs`.
//
// Micro-compétences : fraction_lire_ecrire (1, 2, 17, 19),
// fraction_representer (3, 4, 13, 19), fraction_decimal (5, 6, 11, 14, 16, 17,
// 18, 20), fraction_comparer (7, 10, 11, 12, 15, 16, 17, 18, 19, 20),
// fraction_mixte (8, 12, 13, 18), fraction_defi (4, 9, 14, 15, 17, 19, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const JAUNE = "#eab308";
const NOIR = "#0f172a";
const VIDE = "#f1f5f9";
const COULEURS = [BLEU, ORANGE, VERT];

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** 1,5 : un nombre écrit comme au tableau (texte NU, pas de KaTeX en SVG). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(Math.round(v * 1e6) / 1e6)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Une droite graduée HORIZONTALE (celle de l'étalon) : une graduation tous les
 * `pas`, un nombre tous les `nombres`, des points nommés SOUS les nombres, et
 * des arcs fléchés (`sauts`). ⛔ Onze nombres écrits au plus.
 */
const droiteRel = (min: number, max: number, pas: number, points: Point[], opts: { sauts?: Saut[]; nombres?: number } = {}) => {
  const sauts = opts.sauts ?? [];
  const nombres = opts.nombres ?? pas;
  const W = 300;
  const marge = 24;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const hauteurs = sauts.map((_, i) => 22 + 17 * i);
  const Y = (hauteurs.length ? hauteurs[hauteurs.length - 1] : 0) + 26;
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ecritIci = (t: number) => Math.abs(t / nombres - Math.round(t / nombres)) < 1e-6;
  const fins: number[] = [];
  const rangs = new Map<number, number>();
  const lx = new Map<number, number>();
  [...points]
    // Une étiquette ne sort pas du dessin : au bord, elle rentre.
    .map((p, i) => {
      const demi = (p.label.length * 8.6) / 2 + 4;
      return { i, cx: Math.min(Math.max(x(p.value), demi), W - demi), demi };
    })
    .sort((a, b) => a.cx - b.cx)
    .forEach(({ i, cx, demi }) => {
      let r = 0;
      while (fins[r] !== undefined && cx - demi < fins[r]) r++;
      fins[r] = cx + demi;
      rangs.set(i, r);
      lx.set(i, cx);
    });
  const H = Y + 44 + 17 * Math.max(fins.length - 1, 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Droite graduée">
        <line x1={marge - 12} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 4} ${Y - 5} L ${W - marge + 12} ${Y} L ${W - marge + 4} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - (ecritIci(t) ? 6 : 4)} x2={x(t)} y2={Y + (ecritIci(t) ? 6 : 4)} stroke={NOIR} strokeWidth={ecritIci(t) ? 1.8 : 1.2} />
            {ecritIci(t) ? (
              <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
                {ecrit(t)}
              </text>
            ) : null}
          </g>
        ))}
        {sauts.map((s, i) => {
          const [x1, x2, h] = [x(s.de), x(s.vers), hauteurs[i]];
          const c = s.vers >= s.de ? VERT : ROUGE;
          const y0 = Y - 4;
          const [tx, ty] = [(x2 - x1) / 2, 2 * h];
          const L = Math.hypot(tx, ty) || 1;
          const [ux, uy] = [tx / L, ty / L];
          const barbe = (a: number) => `${(x2 - 8 * (ux * Math.cos(a) - uy * Math.sin(a))).toFixed(1)} ${(y0 - 8 * (ux * Math.sin(a) + uy * Math.cos(a))).toFixed(1)}`;
          return (
            <g key={i}>
              <path d={`M ${x1} ${y0} Q ${(x1 + x2) / 2} ${y0 - 2 * h} ${x2} ${y0}`} fill="none" stroke={c} strokeWidth={2.4} />
              <path d={`M ${barbe(0.45)} L ${x2} ${y0} L ${barbe(-0.45)}`} fill="none" stroke={c} strokeWidth={2.4} strokeLinejoin="round" />
              <text x={(x1 + x2) / 2} y={y0 - h - 4} textAnchor="middle" fontSize="14" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {s.label}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            {p.label ? (
              <text x={lx.get(i) ?? x(p.value)} y={Y + 42 + 17 * (rangs.get(i) ?? 0)} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). ⚠️ 3 colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/** Deux BARRES de fraction du coach l'une sous l'autre, même longueur : l'œil
 *  compare les surfaces coloriées (canvas `fraction`, modèle `compare`). */
const comparer = (a: [number, number], b: [number, number]) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
    <CanvasRenderer
      figure={
        {
          kind: "fraction",
          model: "compare",
          fractions: [
            { numerator: a[0], denominator: a[1] },
            { numerator: b[0], denominator: b[1] },
          ],
          size: { width: 320, height: 205 },
        } as never
      }
    />
  </div>
);

/**
 * Des BARRES EMPILÉES, toutes de la même longueur (le même tout), coupées en
 * `d` parts égales ; `parts` donne les parts coloriées, groupe par groupe
 * (bleu, puis orange, puis vert). Le nom à gauche : ⚠️ 10 signes au plus.
 */
const barres = (liste: { d: number; label: string; parts: number[] }[]) => {
  const [x0, L, h, pas] = [100, 190, 26, 38];
  const H = liste.length * pas + 6;
  const couleur = (k: number, parts: number[]) => {
    let fin = 0;
    for (let g = 0; g < parts.length; g++) {
      fin += parts[g];
      if (k < fin) return COULEURS[g];
    }
    return VIDE;
  };
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Barres de fractions">
        {liste.map((b, i) => {
          const y = 6 + i * pas;
          return (
            <g key={i}>
              <text x={x0 - 8} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
                {b.label}
              </text>
              {Array.from({ length: b.d }, (_, k) => (
                <rect key={k} x={x0 + (k * L) / b.d} y={y} width={L / b.d} height={h} fill={couleur(k, b.parts)} stroke={NOIR} strokeWidth={b.d > 16 ? 0.8 : 1.4} />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Des barres de même longueur coupées en morceaux de largeurs `largeurs`
 * (relatives) : les `colorie` premiers morceaux en bleu. Sert à montrer
 * qu'une barre coupée en parts INÉGALES ne dit aucune fraction.
 */
const decoupes = (liste: { label: string; largeurs: number[]; colorie: number }[]) => {
  const [x0, L, h, pas] = [40, 240, 26, 38];
  const H = liste.length * pas + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Barres découpées">
        {liste.map((b, i) => {
          const y = 6 + i * pas;
          const total = b.largeurs.reduce((s, w) => s + w, 0);
          const debut = (k: number) => b.largeurs.slice(0, k).reduce((s, w) => s + w, 0);
          return (
            <g key={i}>
              <text x={x0 - 10} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
                {b.label}
              </text>
              {b.largeurs.map((w, k) => (
                <rect key={k} x={x0 + (debut(k) * L) / total} y={y} width={(w * L) / total} height={h} fill={k < b.colorie ? BLEU : VIDE} stroke={NOIR} strokeWidth={1.4} />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UNE GRILLE de `lignes` × `colonnes` carreaux égaux, remplie dans l'ordre de
 * lecture par chaque groupe (`n` carreaux de sa couleur) ; les carreaux qui
 * restent sont clairs. La légende dessous (noms de 7 signes au plus), avec
 * `reste` pour nommer les carreaux clairs.
 */
const grille = (lignes: number, colonnes: number, groupes: { n: number; nom: string; color?: string }[], reste = "") => {
  const c = colonnes >= 10 ? 20 : 26;
  const x0 = (300 - colonnes * c) / 2;
  const coul = groupes.map((g, i) => g.color ?? COULEURS[i]);
  const couleur = (i: number) => {
    let fin = 0;
    for (let g = 0; g < groupes.length; g++) {
      fin += groupes[g].n;
      if (i < fin) return coul[g];
    }
    return VIDE;
  };
  const legende = [...groupes.map((g, i) => ({ color: coul[i], label: g.nom })), ...(reste ? [{ color: VIDE, label: reste }] : [])].filter((l) => l.label);
  const H = lignes * c + 8 + (legende.length ? 28 : 0);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Grille de carreaux égaux">
        {Array.from({ length: lignes * colonnes }, (_, i) => (
          <rect key={i} x={x0 + (i % colonnes) * c} y={4 + Math.floor(i / colonnes) * c} width={c} height={c} fill={couleur(i)} stroke="#475569" strokeWidth={1} />
        ))}
        {legende.map((l, k) => (
          <g key={l.label}>
            <rect x={14 + k * 72} y={H - 20} width={12} height={12} fill={l.color} stroke="#475569" strokeWidth={1} />
            <text x={30 + k * 72} y={H - 9} fontSize="14" fontWeight="700" fill={NOIR}>
              {l.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const exercicesFractionNombre6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "fraction-nombre",
  titre: "Les fractions",
  accroche:
    "Vingt exercices, du geste seul au problème : lire et écrire une fraction, la dessiner, passer d'une fraction décimale à un nombre à virgule, comparer et ranger, placer une fraction plus grande que 1 entre deux entiers. Des barres, une tablette de chocolat, des gourdes, une élection de délégué, un sentier de randonnée, un vitrail et une fraction qui se cache. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et les parts dessinées.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/fraction-nombre", titre: "Les fractions" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde d'abord le nombre du bas : il dit en combien de parts on coupe.",
      rappel: [
        "Une fraction, ce sont des parts d'un tout coupé en parts ÉGALES.",
        "En haut, le numérateur : les parts prises. En bas, le dénominateur : le nombre de parts du partage.",
        "Une fraction décimale a pour dénominateur $10$, $100$… : $\\dfrac{7}{10}$ se lit « sept dixièmes » et vaut $0{,}7$.",
      ],
      exercices: [
        {
          enonce: "Quelle fraction de chaque barre est coloriée en bleu ?\nÉcris-la en chiffres, puis en lettres.",
          figure: barres([
            { d: 3, label: "A", parts: [2] },
            { d: 7, label: "B", parts: [4] },
            { d: 10, label: "C", parts: [7] },
          ]),
          correction:
            "Je compte d'abord toutes les parts : c'est le dénominateur, en bas.\nPuis je compte les parts bleues : c'est le numérateur, en haut.\nBarre A : $3$ parts, $2$ bleues. $\\dfrac{2}{3}$ : deux tiers.\nBarre B : $7$ parts, $4$ bleues. $\\dfrac{4}{7}$ : quatre septièmes.\nBarre C : $10$ parts, $7$ bleues. $\\dfrac{7}{10}$ : sept dixièmes.\n⛔ Le piège : mettre en bas les parts BLANCHES. Pour A, on écrirait $\\dfrac{2}{1}$. En bas, je mets TOUTES les parts.\nRéponse : A : $\\dfrac{2}{3}$ ; B : $\\dfrac{4}{7}$ ; C : $\\dfrac{7}{10}$.",
          micros: ["fraction_lire_ecrire"],
        },
        {
          enonce: "Écris chaque fraction en chiffres.\na) cinq huitièmes\nb) neuf dixièmes\nc) un demi\nd) onze centièmes\ne) Écris en lettres : $\\dfrac{3}{7}$.",
          correction:
            "Le mot en « -ième » donne le dénominateur : il va EN BAS.\na) « huitièmes » : $8$ en bas. « cinq » : $5$ en haut. $\\dfrac{5}{8}$.\nb) « dixièmes » : $10$ en bas. $\\dfrac{9}{10}$.\nc) « un demi » : une part sur deux. $\\dfrac{1}{2}$.\nd) « centièmes » : $100$ en bas. $\\dfrac{11}{100}$.\ne) $\\dfrac{3}{7}$ se lit « trois septièmes ».\n⛔ Le piège : écrire $\\dfrac{8}{5}$ pour « cinq huitièmes ». Je lis d'abord le haut, puis le bas.\nRéponse : a) $\\dfrac{5}{8}$ ; b) $\\dfrac{9}{10}$ ; c) $\\dfrac{1}{2}$ ; d) $\\dfrac{11}{100}$ ; e) trois septièmes.",
          schema: ecranSeulement(
            table(["en lettres", "en haut", "en bas"], [
              ["cinq huitièmes", "5", "8"],
              ["neuf dixièmes", "9", "10"],
              ["un demi", "1", "2"],
              ["onze centièmes", "11", "100"],
            ]),
          ),
          micros: ["fraction_lire_ecrire"],
        },
        {
          enonce: "Une tablette de chocolat a $12$ carreaux égaux.\na) Combien de carreaux faut-il colorier pour représenter $\\dfrac{5}{12}$ de la tablette ?\nb) Et pour représenter $\\dfrac{7}{12}$ ?\nc) Au a), quelle fraction de la tablette reste blanche ?",
          correction:
            "Le dénominateur $12$ dit : la tablette est coupée en $12$ carreaux égaux. C'est bien le cas.\na) Le numérateur $5$ dit combien j'en prends : je colorie $5$ carreaux.\nb) Pour $\\dfrac{7}{12}$, je colorie $7$ carreaux.\nc) $12 - 5 = 7$ carreaux restent blancs : c'est $\\dfrac{7}{12}$ de la tablette.\n⛔ Le piège : colorier $12$ carreaux. Le nombre du haut dit combien je colorie ; celui du bas, combien il y a de carreaux en tout.\nRéponse : a) $5$ carreaux ; b) $7$ carreaux ; c) $\\dfrac{7}{12}$.",
          schema: grille(3, 4, [{ n: 5, nom: "5/12" }], "7/12"),
          micros: ["fraction_representer"],
        },
        {
          enonce: "Sur quelles barres la partie bleue représente-t-elle $\\dfrac{1}{4}$ de la barre ?",
          figure: decoupes([
            { label: "A", largeurs: [1, 1, 1, 1], colorie: 1 },
            { label: "B", largeurs: [1, 3, 2, 2], colorie: 1 },
            { label: "C", largeurs: [1, 1, 1], colorie: 1 },
            { label: "D", largeurs: [1, 1, 1, 1, 1, 1, 1, 1], colorie: 2 },
          ]),
          correction:
            "Pour lire $\\dfrac{1}{4}$, il faut $4$ parts ÉGALES, dont $1$ bleue.\nA : $4$ parts égales, $1$ bleue. Oui, c'est $\\dfrac{1}{4}$.\nB : $4$ parts, mais elles ne sont pas égales. La part bleue est plus petite qu'un quart. Non.\nC : $3$ parts égales, $1$ bleue. C'est $\\dfrac{1}{3}$. Non.\nD : $8$ parts égales, $2$ bleues : $\\dfrac{2}{8}$. La partie bleue a la même longueur que sur A : $\\dfrac{2}{8} = \\dfrac{1}{4}$. Oui.\n⛔ Le piège : dire oui pour B parce qu'il y a $4$ parts. Sans parts égales, pas de fraction.\nRéponse : les barres A et D.",
          micros: ["fraction_representer", "fraction_defi"],
        },
        {
          enonce: "Écris chaque fraction décimale sous la forme d'un nombre décimal.\na) $\\dfrac{7}{10}$\nb) $\\dfrac{23}{100}$\nc) $\\dfrac{4}{100}$\nd) $\\dfrac{15}{10}$",
          correction:
            "Le dénominateur dit le rang : $10$, ce sont des dixièmes ; $100$, des centièmes.\na) $7$ dixièmes : $\\dfrac{7}{10} = 0{,}7$.\nb) $23$ centièmes : $\\dfrac{23}{100} = 0{,}23$.\nc) $4$ centièmes : le $4$ va au rang des centièmes. $\\dfrac{4}{100} = 0{,}04$.\nd) $15$ dixièmes, c'est $10$ dixièmes (une unité) et $5$ dixièmes : $\\dfrac{15}{10} = 1{,}5$.\n⛔ Le piège du c) : écrire $0{,}4$. Ça, ce sont $4$ DIXIÈMES. Des centièmes s'écrivent avec deux chiffres après la virgule.\nRéponse : a) $0{,}7$ ; b) $0{,}23$ ; c) $0{,}04$ ; d) $1{,}5$.",
          schema: ecranSeulement(
            table(["fraction", "on lit", "nombre"], [
              ["7/10", "7 dixièmes", "0,7"],
              ["23/100", "23 centièmes", "0,23"],
              ["4/100", "4 centièmes", "0,04"],
              ["15/10", "15 dixièmes", "1,5"],
            ]),
          ),
          micros: ["fraction_decimal"],
        },
        {
          enonce: "Écris chaque nombre sous la forme d'une fraction décimale.\na) $0{,}3$\nb) $0{,}09$\nc) $1{,}7$\nd) $0{,}5$, puis trouve une fraction plus simple.",
          correction:
            "Je lis le nombre jusqu'à son dernier chiffre : dixièmes ou centièmes.\na) $0{,}3$ : trois dixièmes. $0{,}3 = \\dfrac{3}{10}$.\nb) $0{,}09$ : neuf centièmes. $0{,}09 = \\dfrac{9}{100}$.\nc) $1{,}7$ : une unité et $7$ dixièmes, soit $17$ dixièmes. $1{,}7 = \\dfrac{17}{10}$.\nd) $0{,}5$ : cinq dixièmes. $0{,}5 = \\dfrac{5}{10}$. Et $5$ dixièmes, c'est la moitié de l'unité : $\\dfrac{5}{10} = \\dfrac{1}{2}$.\n⛔ Le piège du c) : écrire $\\dfrac{7}{10}$ et oublier l'unité. $1{,}7$ est plus grand que $1$ : sa fraction aussi.\nRéponse : a) $\\dfrac{3}{10}$ ; b) $\\dfrac{9}{100}$ ; c) $\\dfrac{17}{10}$ ; d) $\\dfrac{5}{10} = \\dfrac{1}{2}$.",
          schema: ecranSeulement(
            droiteRel(0, 2, 0.1, [
              { value: 0.3, label: "3/10" },
              { value: 0.5, label: "5/10" },
              { value: 1.7, label: "17/10" },
            ], { nombres: 0.5 }),
          ),
          micros: ["fraction_decimal"],
        },
        {
          enonce: "Compare avec $<$, $>$ ou $=$.\na) $\\dfrac{4}{9}$ et $\\dfrac{7}{9}$\nb) $\\dfrac{3}{8}$ et $\\dfrac{3}{5}$\nc) $\\dfrac{11}{10}$ et $\\dfrac{9}{10}$\nd) $\\dfrac{2}{7}$ et $\\dfrac{2}{9}$",
          correction:
            "a) Même dénominateur : des neuvièmes. Le plus grand numérateur gagne. $\\dfrac{4}{9} < \\dfrac{7}{9}$.\nb) Même numérateur : $3$ parts de chaque côté. Mais un cinquième est plus gros qu'un huitième. $\\dfrac{3}{8} < \\dfrac{3}{5}$.\nc) Des dixièmes, et $11 > 9$. $\\dfrac{11}{10} > \\dfrac{9}{10}$.\nd) Même numérateur. Un septième est plus gros qu'un neuvième. $\\dfrac{2}{7} > \\dfrac{2}{9}$.\n⛔ Le piège du b) : croire que $\\dfrac{3}{8}$ est plus grand « parce que $8 > 5$ ». Plus je coupe, plus les parts sont PETITES.\nRéponse : a) $<$ ; b) $<$ ; c) $>$ ; d) $>$.",
          schema: comparer([3, 8], [3, 5]),
          micros: ["fraction_comparer"],
        },
        {
          enonce: "Pour chaque fraction, trouve les deux nombres entiers qui l'encadrent, puis écris-la sous la forme « entier + fraction ».\na) $\\dfrac{5}{3}$\nb) $\\dfrac{7}{3}$\nc) $\\dfrac{10}{3}$\nd) $\\dfrac{6}{3}$",
          correction:
            "Trois tiers font une unité : $\\dfrac{3}{3} = 1$. Je fais des paquets de $3$ tiers.\na) $5$ tiers, c'est $3$ tiers et $2$ tiers. $\\dfrac{5}{3} = 1 + \\dfrac{2}{3}$ : entre $1$ et $2$.\nb) $7$ tiers, c'est $6$ tiers et $1$ tiers. $\\dfrac{7}{3} = 2 + \\dfrac{1}{3}$ : entre $2$ et $3$.\nc) $10$ tiers, c'est $9$ tiers et $1$ tiers. $\\dfrac{10}{3} = 3 + \\dfrac{1}{3}$ : entre $3$ et $4$.\nd) $6$ tiers, ce sont deux paquets pile. $\\dfrac{6}{3} = 2$ : c'est un nombre entier.\n⛔ Le piège : croire qu'une fraction est toujours plus petite que $1$. Dès que le haut dépasse le bas, elle dépasse $1$.\nRéponse : a) entre $1$ et $2$, $1 + \\dfrac{2}{3}$ ; b) entre $2$ et $3$, $2 + \\dfrac{1}{3}$ ; c) entre $3$ et $4$, $3 + \\dfrac{1}{3}$ ; d) $\\dfrac{6}{3} = 2$.",
          schema: droiteRel(0, 4, 1 / 3, [
            { value: 5 / 3, label: "5/3" },
            { value: 6 / 3, label: "6/3" },
            { value: 7 / 3, label: "7/3" },
            { value: 10 / 3, label: "10/3" },
          ], { nombres: 1 }),
          micros: ["fraction_mixte"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je dessine les parts au brouillon avant de comparer.",
      rappel: [
        "Deux fractions sont égales quand je multiplie le haut ET le bas par le même nombre : $\\dfrac{1}{2} = \\dfrac{3}{6}$.",
        "Pour comparer, je veux des parts de même taille : je redécoupe, puis je compare les numérateurs.",
        "Quand le numérateur dépasse le dénominateur, la fraction dépasse $1$ : $\\dfrac{7}{5} = 1 + \\dfrac{2}{5}$.",
      ],
      exercices: [
        {
          enonce: "a) Complète : $\\dfrac{1}{3} = \\dfrac{2}{\\ldots} = \\dfrac{\\ldots}{9} = \\dfrac{4}{\\ldots}$\nb) Trouve une fraction égale à $\\dfrac{1}{3}$ avec le dénominateur $30$.\nc) $\\dfrac{5}{15}$ est-elle égale à $\\dfrac{1}{3}$ ?",
          correction:
            "Deux fractions sont égales quand je multiplie le haut ET le bas par le même nombre.\na) En haut, $1 \\times 2 = 2$ ; donc en bas, $3 \\times 2 = 6$ : $\\dfrac{2}{6}$.\nEn bas, $3 \\times 3 = 9$ ; donc en haut, $1 \\times 3 = 3$ : $\\dfrac{3}{9}$.\nEn haut, $1 \\times 4 = 4$ ; donc en bas, $3 \\times 4 = 12$ : $\\dfrac{4}{12}$.\nb) $3 \\times 10 = 30$ ; donc en haut, $1 \\times 10 = 10$ : $\\dfrac{10}{30}$.\nc) $1 \\times 5 = 5$ et $3 \\times 5 = 15$ : oui, $\\dfrac{5}{15} = \\dfrac{1}{3}$.\n⛔ Le piège : AJOUTER. En ajoutant $1$ en haut et en bas, on obtient $\\dfrac{2}{4}$ : c'est la moitié, pas le tiers.\nRéponse : a) $\\dfrac{1}{3} = \\dfrac{2}{6} = \\dfrac{3}{9} = \\dfrac{4}{12}$ ; b) $\\dfrac{10}{30}$ ; c) oui.",
          schema: ecranSeulement(
            barres([
              { d: 3, label: "1/3", parts: [1] },
              { d: 6, label: "2/6", parts: [2] },
              { d: 12, label: "4/12", parts: [4] },
            ]),
          ),
          micros: ["fraction_defi"],
        },
        {
          enonce: "Compare en redécoupant.\na) $\\dfrac{3}{5}$ et $\\dfrac{7}{10}$\nb) $\\dfrac{5}{8}$ et $\\dfrac{1}{2}$\nc) $\\dfrac{2}{3}$ et $\\dfrac{5}{6}$",
          correction:
            "Un dénominateur est le double de l'autre : je coupe chaque part en deux.\na) $\\dfrac{3}{5} = \\dfrac{3 \\times 2}{5 \\times 2} = \\dfrac{6}{10}$. Et $\\dfrac{6}{10} < \\dfrac{7}{10}$, donc $\\dfrac{3}{5} < \\dfrac{7}{10}$.\nb) Ici, $8 = 2 \\times 4$ : $\\dfrac{1}{2} = \\dfrac{1 \\times 4}{2 \\times 4} = \\dfrac{4}{8}$. Et $\\dfrac{5}{8} > \\dfrac{4}{8}$, donc $\\dfrac{5}{8} > \\dfrac{1}{2}$.\nc) $\\dfrac{2}{3} = \\dfrac{2 \\times 2}{3 \\times 2} = \\dfrac{4}{6}$. Et $\\dfrac{4}{6} < \\dfrac{5}{6}$, donc $\\dfrac{2}{3} < \\dfrac{5}{6}$.\n⛔ Le piège du b) : comparer $5$ et $1$, puis $8$ et $2$, chacun de son côté. Je compare les numérateurs seulement quand les parts ont la même taille.\nRéponse : a) $\\dfrac{3}{5} < \\dfrac{7}{10}$ ; b) $\\dfrac{5}{8} > \\dfrac{1}{2}$ ; c) $\\dfrac{2}{3} < \\dfrac{5}{6}$.",
          schema: barres([
            { d: 5, label: "3/5", parts: [3] },
            { d: 10, label: "6/10", parts: [6] },
            { d: 10, label: "7/10", parts: [7] },
          ]),
          micros: ["fraction_comparer"],
        },
        {
          enonce: "Range ces fractions dans l'ordre croissant.\n$\\dfrac{7}{10}$ ; $\\dfrac{1}{2}$ ; $\\dfrac{3}{10}$ ; $\\dfrac{9}{10}$ ; $\\dfrac{1}{5}$",
          correction:
            "Je passe tout en dixièmes, puis en décimal.\n$\\dfrac{1}{2} = \\dfrac{5}{10} = 0{,}5$ et $\\dfrac{1}{5} = \\dfrac{2}{10} = 0{,}2$.\n$\\dfrac{7}{10} = 0{,}7$ ; $\\dfrac{3}{10} = 0{,}3$ ; $\\dfrac{9}{10} = 0{,}9$.\nJe range : $0{,}2 < 0{,}3 < 0{,}5 < 0{,}7 < 0{,}9$.\n⛔ Le piège : mettre $\\dfrac{1}{2}$ et $\\dfrac{1}{5}$ au début parce que leur numérateur est $1$. Leurs parts sont plus grosses : il faut redécouper.\nRéponse : $\\dfrac{1}{5} < \\dfrac{3}{10} < \\dfrac{1}{2} < \\dfrac{7}{10} < \\dfrac{9}{10}$.",
          schema: ecranSeulement(
            droiteRel(0, 1, 0.1, [
              { value: 0.2, label: "1/5" },
              { value: 0.3, label: "3/10" },
              { value: 0.5, label: "1/2" },
              { value: 0.7, label: "7/10" },
              { value: 0.9, label: "9/10" },
            ], { nombres: 0.5 }),
          ),
          micros: ["fraction_comparer", "fraction_decimal"],
        },
        {
          enonce: "a) Complète : $\\dfrac{13}{5} = 2 + \\dfrac{\\ldots}{5}$.\nb) Entre quels nombres entiers se trouve $\\dfrac{13}{5}$ ?\nc) Range dans l'ordre croissant : $\\dfrac{13}{5}$ ; $2 + \\dfrac{1}{5}$ ; $3$ ; $\\dfrac{9}{5}$.",
          correction:
            "Cinq cinquièmes font une unité : $\\dfrac{5}{5} = 1$.\na) $13$ cinquièmes, c'est $10$ cinquièmes et $3$ cinquièmes. Or $\\dfrac{10}{5} = 2$. Donc $\\dfrac{13}{5} = 2 + \\dfrac{3}{5}$.\nb) $2 < \\dfrac{13}{5} < 3$.\nc) Je compte tout en cinquièmes. $2 + \\dfrac{1}{5}$, ce sont $10$ cinquièmes et $1$ : $11$ cinquièmes. Et $3$, ce sont $15$ cinquièmes.\nJe range les numérateurs : $9 < 11 < 13 < 15$.\n⛔ Le piège : lire $2 + \\dfrac{1}{5}$ comme « $2$ fois $\\dfrac{1}{5}$ ». Le « $+$ » veut dire : $2$ unités entières, PLUS un cinquième.\nRéponse : a) $3$ ; b) entre $2$ et $3$ ; c) $\\dfrac{9}{5} < 2 + \\dfrac{1}{5} < \\dfrac{13}{5} < 3$.",
          schema: droiteRel(1, 3, 0.2, [
            { value: 1.8, label: "9/5" },
            { value: 2.2, label: "2 + 1/5" },
            { value: 2.6, label: "13/5" },
          ], { nombres: 1 }),
          micros: ["fraction_mixte", "fraction_comparer"],
        },
        {
          enonce: "La droite est graduée en cinquièmes.\na) Lis l'abscisse des points A, B et C, en fraction.\nb) Lesquels sont plus grands que $1$ ?",
          figure: droiteRel(0, 2, 0.2, [
            { value: 0.6, label: "A" },
            { value: 1.4, label: "B" },
            { value: 1.8, label: "C" },
          ], { nombres: 1 }),
          correction:
            "Entre $0$ et $1$, je compte $5$ sauts égaux : chaque graduation vaut $\\dfrac{1}{5}$.\na) A est à $3$ sauts de $0$ : $\\dfrac{3}{5}$.\nB est à $7$ sauts de $0$ ($5$ jusqu'à $1$, puis $2$) : $\\dfrac{7}{5}$.\nC est à $9$ sauts de $0$ : $\\dfrac{9}{5}$.\nb) B et C sont après $1$ : leur numérateur dépasse $5$.\n⛔ Le piège : compter les TRAITS en partant de $0$ compris. Pour A, on trouverait $4$. Je compte les SAUTS d'une graduation à l'autre.\nRéponse : a) A : $\\dfrac{3}{5}$ ; B : $\\dfrac{7}{5}$ ; C : $\\dfrac{9}{5}$ ; b) B et C.",
          micros: ["fraction_representer", "fraction_mixte"],
        },
        {
          enonce: "Écris chaque nombre de trois façons : en fraction décimale, en nombre décimal et en lettres.\na) $\\dfrac{45}{100}$\nb) $0{,}8$\nc) $\\dfrac{3}{5}$\nd) $2{,}07$",
          correction:
            "a) $\\dfrac{45}{100} = 0{,}45$ : quarante-cinq centièmes.\nb) $0{,}8 = \\dfrac{8}{10}$ : huit dixièmes.\nc) $\\dfrac{3}{5}$ n'est pas une fraction décimale. Je redécoupe : $5 \\times 2 = 10$. Donc $\\dfrac{3}{5} = \\dfrac{6}{10} = 0{,}6$ : six dixièmes.\nd) $2{,}07 = \\dfrac{207}{100}$ : deux cent sept centièmes, soit $2$ unités et $7$ centièmes.\n⛔ Le piège du d) : écrire $\\dfrac{207}{10}$. Le $7$ est au rang des CENTIÈMES : il y a deux chiffres après la virgule.\nRéponse : a) $0{,}45$ ; b) $\\dfrac{8}{10}$ ; c) $\\dfrac{6}{10} = 0{,}6$ ; d) $\\dfrac{207}{100}$.",
          schema: ecranSeulement(
            table(["fraction", "décimal", "on lit"], [
              ["45/100", "0,45", "45 centièmes"],
              ["8/10", "0,8", "8 dixièmes"],
              ["6/10", "0,6", "6 dixièmes"],
              ["207/100", "2,07", "207 centièmes"],
            ]),
          ),
          micros: ["fraction_decimal", "fraction_defi"],
        },
        {
          enonce: "Trois élèves se trompent. Explique chaque erreur, puis corrige.\na) Tom : « $\\dfrac{1}{8}$ est plus grand que $\\dfrac{1}{6}$, car $8 > 6$. »\nb) Léa : « $0{,}7 = \\dfrac{7}{100}$. »\nc) Sam : « $\\dfrac{3}{2}$ est plus petit que $1$, car une fraction est toujours plus petite que $1$. »",
          correction:
            "a) Tom lit le dénominateur à l'envers. Couper en $8$ fait des parts plus PETITES que couper en $6$. Donc $\\dfrac{1}{8} < \\dfrac{1}{6}$.\nb) Dans $0{,}7$, le $7$ est au rang des dixièmes. Donc $0{,}7 = \\dfrac{7}{10}$. Et $\\dfrac{7}{100}$, c'est $0{,}07$.\nc) $\\dfrac{2}{2} = 1$, et $\\dfrac{3}{2}$ a une moitié de plus : $\\dfrac{3}{2} = 1 + \\dfrac{1}{2}$. Donc $\\dfrac{3}{2} > 1$.\n⛔ Le piège de Tom est le plus fréquent : un grand nombre en bas fait de PETITES parts.\n⭐ Une fraction dépasse $1$ dès que son numérateur dépasse son dénominateur.\nRéponse : a) $\\dfrac{1}{8} < \\dfrac{1}{6}$ ; b) $0{,}7 = \\dfrac{7}{10}$ ; c) $\\dfrac{3}{2} > 1$.",
          schema: ecranSeulement(comparer([1, 8], [1, 6])),
          micros: ["fraction_comparer", "fraction_defi"],
        },
        {
          enonce: "Trois gourdes de $1$ L sont en partie remplies. La gourde A est remplie aux $\\dfrac{7}{10}$, la gourde B à moitié, la gourde C aux $\\dfrac{3}{5}$.\na) Écris chaque remplissage en dixièmes de litre, puis en décimal.\nb) Range les gourdes de la plus remplie à la moins remplie.\nc) Quelle fraction de litre manque-t-il dans la gourde A pour qu'elle soit pleine ?",
          correction:
            "a) A : $\\dfrac{7}{10} = 0{,}7$ L.\nB : à moitié, $\\dfrac{1}{2} = \\dfrac{5}{10} = 0{,}5$ L.\nC : $\\dfrac{3}{5} = \\dfrac{6}{10} = 0{,}6$ L.\nb) $0{,}7 > 0{,}6 > 0{,}5$ : A, puis C, puis B.\nc) Pleine, c'est $\\dfrac{10}{10}$. Il manque $10 - 7 = 3$ dixièmes : $\\dfrac{3}{10}$ L, soit $0{,}3$ L.\n⛔ Le piège : comparer $7$, $1$ et $3$, les nombres du haut. Les parts n'ont pas la même taille : je passe d'abord tout en dixièmes.\nRéponse : a) $0{,}7$ L ; $0{,}5$ L ; $0{,}6$ L ; b) A, C, B ; c) $\\dfrac{3}{10}$ L.",
          schema: barres([
            { d: 10, label: "A 7/10", parts: [7] },
            { d: 10, label: "C 3/5", parts: [6] },
            { d: 10, label: "B 1/2", parts: [5] },
          ]),
          micros: ["fraction_decimal", "fraction_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. J'écris la part en fraction, puis je compare.",
      rappel: [
        "Une part d'un groupe s'écrit en fraction : « $12$ sur $25$ » s'écrit $\\dfrac{12}{25}$. En bas, TOUT le groupe.",
        "Pour comparer, je mets les fractions sur le même dénominateur, ou je les écris en décimal.",
        "Je réponds par une phrase, et je vérifie sur un dessin.",
      ],
      exercices: [
        {
          titre: "L'élection du délégué",
          enonce: "Dans une classe de $25$ élèves, tout le monde vote une fois. Inès a $12$ voix, Hugo $9$ voix et Lina $4$ voix.\na) Quelle fraction des voix chaque élève a-t-il ?\nb) Écris ces fractions en centièmes, puis en décimal.\nc) Inès a-t-elle plus de la moitié des voix ?\nd) Hugo et Lina ensemble ont-ils plus de voix qu'Inès ?",
          correction:
            "a) Le tout, ce sont les $25$ voix. Inès : $\\dfrac{12}{25}$ ; Hugo : $\\dfrac{9}{25}$ ; Lina : $\\dfrac{4}{25}$.\nb) $25 \\times 4 = 100$ : je multiplie le haut et le bas par $4$.\n$\\dfrac{12}{25} = \\dfrac{48}{100} = 0{,}48$ ; $\\dfrac{9}{25} = \\dfrac{36}{100} = 0{,}36$ ; $\\dfrac{4}{25} = \\dfrac{16}{100} = 0{,}16$.\nc) La moitié, c'est $0{,}5$. Or $0{,}48 < 0{,}5$ : non, il lui manque un peu.\nd) Ensemble : $9 + 4 = 13$ voix, contre $12$ pour Inès. Oui, un peu plus.\n⛔ Le piège du c) : dire oui parce qu'Inès a le plus de voix. Avoir le plus de voix ne veut pas dire en avoir plus de la moitié.\nRéponse : a) $\\dfrac{12}{25}$, $\\dfrac{9}{25}$, $\\dfrac{4}{25}$ ; b) $0{,}48$ ; $0{,}36$ ; $0{,}16$ ; c) non ; d) oui, $13$ voix contre $12$.",
          schema: grille(5, 5, [
            { n: 12, nom: "Inès" },
            { n: 9, nom: "Hugo" },
            { n: 4, nom: "Lina" },
          ]),
          micros: ["fraction_lire_ecrire", "fraction_decimal", "fraction_comparer", "fraction_defi"],
        },
        {
          titre: "La randonnée",
          enonce: "Un sentier de $3$ km a une borne tous les quarts de kilomètre. Le pont est à $\\dfrac{5}{4}$ km du départ, la cascade à $\\dfrac{9}{4}$ km et le refuge à $2{,}5$ km.\na) Écris $\\dfrac{9}{4}$ sous la forme « entier + fraction », puis en décimal.\nb) Écris $2{,}5$ km en quarts de kilomètre.\nc) Dans quel ordre rencontre-t-on les trois lieux ?\nd) Combien de quarts de kilomètre séparent la cascade du refuge ?",
          correction:
            "Quatre quarts font un kilomètre : $\\dfrac{4}{4} = 1$.\na) $9$ quarts, c'est $8$ quarts et $1$ quart. $\\dfrac{9}{4} = 2 + \\dfrac{1}{4}$. Un quart, c'est $0{,}25$ : $\\dfrac{9}{4} = 2{,}25$ km.\nb) $2{,}5$ km, c'est $2$ km et une moitié. $2$ km font $8$ quarts, une moitié fait $2$ quarts : $\\dfrac{10}{4}$ km.\nc) En quarts : le pont à $5$, la cascade à $9$, le refuge à $10$. Ordre : le pont, la cascade, puis le refuge.\nd) $10 - 9 = 1$ : un seul quart de kilomètre, soit $0{,}25$ km.\n⛔ Le piège du a) : écrire $\\dfrac{9}{4} = 9{,}4$. La barre de fraction n'est pas une virgule : $\\dfrac{9}{4}$, ce sont $9$ quarts.\nRéponse : a) $2 + \\dfrac{1}{4} = 2{,}25$ km ; b) $\\dfrac{10}{4}$ km ; c) le pont, la cascade, le refuge ; d) $1$ quart de kilomètre.",
          schema: droiteRel(0, 3, 0.25, [
            { value: 1.25, label: "pont" },
            { value: 2.25, label: "cascade" },
            { value: 2.5, label: "refuge" },
          ], { nombres: 1 }),
          micros: ["fraction_mixte", "fraction_decimal", "fraction_comparer"],
        },
        {
          titre: "Le vitrail",
          enonce: "Un vitrail a $24$ carreaux égaux : $8$ bleus, $6$ jaunes, et les autres blancs.\na) Combien de carreaux sont blancs ?\nb) Écris la fraction du vitrail occupée par chaque couleur.\nc) Trouve une fraction plus simple, égale à celle du bleu, puis à celle du jaune.\nd) Les carreaux blancs couvrent-ils plus ou moins de la moitié du vitrail ?",
          figure: grille(4, 6, [
            { n: 8, nom: "bleu" },
            { n: 6, nom: "jaune", color: JAUNE },
          ], "blanc"),
          correction:
            "a) $24 - 8 - 6 = 10$ carreaux blancs.\nb) Le tout, ce sont les $24$ carreaux. Bleu : $\\dfrac{8}{24}$ ; jaune : $\\dfrac{6}{24}$ ; blanc : $\\dfrac{10}{24}$.\nc) $\\dfrac{1}{3} = \\dfrac{1 \\times 8}{3 \\times 8} = \\dfrac{8}{24}$ : un carreau sur trois est bleu.\n$\\dfrac{1}{4} = \\dfrac{1 \\times 6}{4 \\times 6} = \\dfrac{6}{24}$ : un carreau sur quatre est jaune.\nd) La moitié de $24$, c'est $12$. Or $10 < 12$ : moins de la moitié.\n⛔ Le piège : écrire $\\dfrac{8}{6}$ pour le bleu, en comparant au jaune. Une fraction du vitrail se rapporte au TOUT : les $24$ carreaux.\nRéponse : a) $10$ ; b) $\\dfrac{8}{24}$, $\\dfrac{6}{24}$, $\\dfrac{10}{24}$ ; c) $\\dfrac{1}{3}$ et $\\dfrac{1}{4}$ ; d) moins de la moitié.",
          micros: ["fraction_lire_ecrire", "fraction_representer", "fraction_defi", "fraction_comparer"],
        },
        {
          titre: "Qui suis-je ?",
          enonce: "Je suis une fraction de dénominateur $10$.\nIndice 1 : je suis plus grande que $\\dfrac{1}{2}$.\nIndice 2 : je suis plus petite que $\\dfrac{9}{10}$.\nIndice 3 : mon numérateur est pair.\nIndice 4 : en décimal, mon chiffre des dixièmes est plus grand que $7$.\na) Écris $\\dfrac{1}{2}$ en dixièmes.\nb) Qui suis-je ?\nc) Écris-moi en décimal, puis avec le dénominateur $5$.",
          correction:
            "a) $\\dfrac{1}{2} = \\dfrac{5}{10}$.\nb) Indices 1 et 2 : mon numérateur est entre $5$ et $9$. Il vaut donc $6$, $7$ ou $8$.\nIndice 3 : il est pair, il reste $6$ ou $8$.\nIndice 4 : $\\dfrac{6}{10} = 0{,}6$ et $\\dfrac{8}{10} = 0{,}8$. Seul $8$ est plus grand que $7$. Je suis $\\dfrac{8}{10}$.\nc) $\\dfrac{8}{10} = 0{,}8$. Et en divisant le haut et le bas par $2$ : $\\dfrac{8}{10} = \\dfrac{4}{5}$.\n⛔ Le piège : chercher un numérateur entre $1$ et $9$, les numérateurs de $\\dfrac{1}{2}$ et de $\\dfrac{9}{10}$. Il faut d'abord des parts de même taille : des dixièmes.\nRéponse : b) $\\dfrac{8}{10}$ ; c) $0{,}8$ et $\\dfrac{4}{5}$.",
          schema: droiteRel(0, 1, 0.1, [
            { value: 0.5, label: "1/2" },
            { value: 0.8, label: "moi", color: VERT },
            { value: 0.9, label: "9/10" },
          ], { nombres: 0.5 }),
          micros: ["fraction_defi", "fraction_decimal", "fraction_comparer"],
        },
      ],
    },
  ],
};
