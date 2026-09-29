// ─── Fiche d'exercices : les fractions (5e) — 20 exercices corrigés ───────────
//
// Feuille du lot de 5e (29/09/2026), sur la forme de l'étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-fractions.tsx` et sur la
// partie fraction_nombre de la banque
// `lib/tutor-v4/questionBank/5e/maths/fractions.bank.ts` : fractions égales,
// simplifier, nombre rationnel et ses écritures (quotient, décimal, entier),
// comparer, opposé d'un rationnel, défis.
// ⛔ LIMITES DE LA 5e, lues dans la banque : on ne COMPARE que des fractions
// POSITIVES (même dénominateur, même numérateur, redécoupage, comparaison à 1
// ou à 1/2) ; les négatifs n'apparaissent que pour l'OPPOSÉ et pour dire qu'un
// rationnel peut être négatif — aucun rangement de fractions négatives. Aucun
// calcul de fractions (c'est `maths-5e-fraction-calcul.tsx`), ni inverse ni
// division (4e). « Somme d'une fraction et de son opposé = 0 » est dans la
// banque, on le dit une fois (ex. 7).
// ⛔ Aucun exemple de la fiche de cours n'est repris (1/2 = 2/4 = 3/6, 6/8,
// 1/2 contre 3/4, l'opposé de 3/5 ou de 4/9, 0,75 = 3/4 = 6/8, 9/12, 2/3
// contre 3/5, 4/12, 8/12), ni de la banque (3/5 = 6/10, 15/20, 12/18, 24/36,
// 3/8 > 1/2, 1/5 ; 1/3 ; 1/2, les letchis), ni de la feuille de 4e
// (`maths-4e-fractions-nombres.tsx` : 30/42, 13/39, 9/20, 0,125, 2,4, 11/13,
// 4/9 contre 4/7, 45/105, le biathlon, le vélo…).
//
// Les pièges nommés : ajouter au lieu de multiplier (1, 2, 11), s'arrêter
// avant la forme la plus simple (3), le numérateur et le dénominateur échangés
// dans un quotient (4), des centièmes lus comme des dixièmes (5), un grand
// dénominateur pris pour une grande fraction (6, 18), l'opposé confondu avec
// la fraction retournée (7, 13), ranger d'après les numérateurs (10, 20), deux
// fractions aux nombres différents crues différentes (9), des nombres d'élèves
// comparés au lieu des parts (12, 17), « le plus petit dénominateur a le plus »
// à numérateurs différents (14), partager la somme en deux (15), la barre de
// fraction lue comme une virgule (16), les minutes lues comme des centièmes
// d'heure (19).
//
// Pas de fait réel : tout (classes, tablettes, tirs, jardin, film) est un
// MODÈLE ; une heure compte 60 minutes.
//
// ⭐ LES DESSINS : les BARRES de fraction du coach (`comparer`, deux barres
// l'une sous l'autre), des barres empilées nommées (`barres`, SVG local, pour
// comparer trois fractions d'un coup), la droite graduée de l'étalon
// (`droiteRel`) pour les quotients, l'opposé et le rangement, le DISQUE du
// coach en douze parts (`disque`, un cadran d'horloge), un jardin en parcelles
// (`parcelles`) et des tableaux (`table`).
// 14 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je redécoupe »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-fraction-nombre.mjs`.
//
// Micro-compétences : fraction_egale (1, 2, 9, 12, 14, 15, 17, 19, 20),
// fraction_simplifier (3, 5, 9, 12, 17, 18, 19, 20), fraction_rationnel (4, 5,
// 8, 16, 19), fraction_comparer (6, 8, 10, 11, 12, 14, 16, 17, 18, 20),
// fraction_oppose (7, 13, 20), fraction_defi (2, 11, 15, 18, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** −1 000, 4,5 : un nombre écrit comme au tableau (texte NU, pas de KaTeX en SVG). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(v)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Une droite graduée HORIZONTALE (celle de l'étalon) : une graduation tous les
 * `pas`, un nombre tous les `nombres`, des points nommés SOUS les nombres
 * (« 3/4 »), et des arcs fléchés (`sauts`). ⛔ Onze nombres écrits au plus.
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
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
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

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/** Deux BARRES de fraction du coach l'une sous l'autre, même longueur : l'œil
 *  compare les surfaces coloriées. ⚠️ 205 de haut : l'étiquette de la seconde
 *  barre est posée à y = 190 (canvas `fraction`, modèle `compare`). */
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

/** Le DISQUE du coach coupé en `d` parts, `n` coloriées depuis midi, dans le
 *  sens des aiguilles : en douze parts, c'est un cadran d'horloge (5 min par part). */
const disque = (n: number, d: number, legende: string) => (
  <div className="mx-auto w-full max-w-[14rem] print:max-w-[10rem]">
    <CanvasRenderer figure={{ kind: "fraction", model: "circle", fraction: { numerator: n, denominator: d, label: legende }, size: { width: 240, height: 200 } } as never} />
  </div>
);

/**
 * Des BARRES EMPILÉES, toutes de la même longueur (le même tout), `n` parts
 * coloriées sur `d`, et leur nom à gauche. Pour comparer trois fractions d'un
 * coup, ce que le canvas `compare` du coach (deux barres) ne fait pas.
 */
const barres = (liste: { n: number; d: number; label: string }[]) => {
  const [x0, L, h, pas] = [100, 190, 26, 38];
  const H = liste.length * pas + 6;
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
                <rect key={k} x={x0 + (k * L) / b.d} y={y} width={L / b.d} height={h} fill={k < b.n ? BLEU : "#f1f5f9"} stroke={NOIR} strokeWidth={b.d > 16 ? 0.8 : 1.4} />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UN JARDIN EN PARCELLES : `lignes` × `colonnes` parcelles, remplies dans
 * l'ordre de lecture par chaque groupe (`n` parcelles de sa couleur) ; celles
 * qui restent sont la prairie, en vert pâle. La légende dessous.
 */
const parcelles = (lignes: number, colonnes: number, groupes: { n: number; color: string; label: string }[]) => {
  const c = 26;
  const x0 = (300 - colonnes * c) / 2;
  const couleur = (i: number) => {
    let fin = 0;
    for (const g of groupes) {
      fin += g.n;
      if (i < fin) return g.color;
    }
    return "#dcfce7";
  };
  const legende = [...groupes.map((g) => ({ color: g.color, label: g.label })), { color: "#dcfce7", label: "prairie" }];
  const H = lignes * c + 34;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Jardin partagé en parcelles">
        {Array.from({ length: lignes * colonnes }, (_, i) => (
          <rect key={i} x={x0 + (i % colonnes) * c} y={4 + Math.floor(i / colonnes) * c} width={c} height={c} fill={couleur(i)} stroke="#475569" strokeWidth={1} />
        ))}
        {legende.map((l, k) => (
          <g key={l.label}>
            <rect x={14 + k * 72} y={H - 22} width={12} height={12} fill={l.color} stroke="#475569" strokeWidth={1} />
            <text x={30 + k * 72} y={H - 11} fontSize="13" fontWeight="700" fill={NOIR}>
              {l.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const exercicesFractionNombre5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "fraction-nombre",
  titre: "Les fractions",
  accroche:
    "Vingt exercices, du geste seul au problème : fabriquer des fractions égales, simplifier jusqu'au bout, écrire un quotient en fraction et en décimal, comparer et ranger, trouver l'opposé d'une fraction. Des classes qui votent, des tablettes de chocolat, des tirs au but, un jardin partagé, les fractions de l'heure et une fraction mystère. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et les parts dessinées.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/fraction-nombre", titre: "Les fractions" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je regarde le dénominateur avant tout : il dit la taille des parts.",
      rappel: [
        "Deux fractions sont égales quand on passe de l'une à l'autre en multipliant (ou en divisant) le haut ET le bas par le même nombre.",
        "Simplifier, c'est diviser le haut et le bas par un même diviseur, jusqu'à ne plus pouvoir.",
        "Une fraction est un quotient : $\\dfrac{a}{b} = a \\div b$. Elle peut s'écrire en décimal, et un nombre décimal peut s'écrire en fraction.",
        "L'opposé d'une fraction : même distance à zéro, de l'autre côté. Je change seulement le signe.",
      ],
      exercices: [
        {
          enonce: "Complète pour que les deux fractions soient égales.\na) $\\dfrac{2}{3} = \\dfrac{\\ldots}{12}$\nb) $\\dfrac{5}{7} = \\dfrac{20}{\\ldots}$\nc) $\\dfrac{18}{24} = \\dfrac{\\ldots}{4}$\nd) $\\dfrac{7}{\\ldots} = \\dfrac{21}{30}$",
          correction:
            "Deux fractions sont égales quand on passe de l'une à l'autre en multipliant (ou en divisant) le haut ET le bas par le même nombre.\na) Pour passer de $3$ à $12$, je multiplie par $4$. Je multiplie aussi le haut : $2 \\times 4 = 8$. Donc $\\dfrac{2}{3} = \\dfrac{8}{12}$.\nb) De $5$ à $20$ : je multiplie par $4$. En bas aussi : $7 \\times 4 = 28$. Donc $\\dfrac{5}{7} = \\dfrac{20}{28}$.\nc) De $24$ à $4$ : je divise par $6$. En haut aussi : $18 \\div 6 = 3$. Donc $\\dfrac{18}{24} = \\dfrac{3}{4}$.\nd) De $21$ à $7$ : je divise par $3$. En bas aussi : $30 \\div 3 = 10$. Donc $\\dfrac{7}{10} = \\dfrac{21}{30}$.\n⛔ Le piège : AJOUTER le même nombre en haut et en bas. $\\dfrac{2 + 9}{3 + 9} = \\dfrac{11}{12}$ n'est pas égal à $\\dfrac{2}{3}$ : sur le dessin, on verrait tout de suite la différence.\nRéponse : a) $8$ ; b) $28$ ; c) $3$ ; d) $10$.",
          schema: comparer([2, 3], [8, 12]),
          micros: ["fraction_egale"],
        },
        {
          enonce: "Parmi ces fractions, lesquelles sont égales à $\\dfrac{3}{8}$ ?\n$\\dfrac{6}{16}$ ; $\\dfrac{4}{9}$ ; $\\dfrac{9}{24}$ ; $\\dfrac{12}{30}$ ; $\\dfrac{15}{40}$",
          correction:
            "Pour chaque fraction, je cherche par quel nombre on a multiplié le haut et le bas de $\\dfrac{3}{8}$ : il doit être le MÊME.\n$\\dfrac{6}{16}$ : $3 \\times 2 = 6$ et $8 \\times 2 = 16$. Égale.\n$\\dfrac{4}{9}$ : pour passer de $3$ à $4$, aucune multiplication par un entier ne marche. On a ajouté $1$ en haut et en bas : pas égale.\n$\\dfrac{9}{24}$ : $3 \\times 3 = 9$ et $8 \\times 3 = 24$. Égale.\n$\\dfrac{12}{30}$ : $3 \\times 4 = 12$, mais $8 \\times 4 = 32$, pas $30$. Pas égale : elle vaut $\\dfrac{2}{5}$.\n$\\dfrac{15}{40}$ : $3 \\times 5 = 15$ et $8 \\times 5 = 40$. Égale.\n⛔ Le piège : garder $\\dfrac{12}{30}$ parce que $12$ est dans la table de $3$. Le haut ET le bas doivent être multipliés par le même nombre.\nRéponse : $\\dfrac{6}{16}$, $\\dfrac{9}{24}$ et $\\dfrac{15}{40}$.",
          schema: ecranSeulement(comparer([3, 8], [6, 16])),
          micros: ["fraction_egale", "fraction_defi"],
        },
        {
          enonce: "Simplifie chaque fraction jusqu'à sa forme la plus simple.\na) $\\dfrac{14}{21}$\nb) $\\dfrac{25}{40}$\nc) $\\dfrac{36}{48}$\nd) $\\dfrac{42}{70}$",
          correction:
            "Simplifier, c'est diviser le haut et le bas par un même diviseur. Je cherche le plus grand possible, puis je vérifie qu'on ne peut plus continuer.\na) $14$ et $21$ sont dans la table de $7$ : $\\dfrac{14}{21} = \\dfrac{14 \\div 7}{21 \\div 7} = \\dfrac{2}{3}$.\nb) $25$ et $40$ se terminent par $5$ et par $0$ : je divise par $5$. $\\dfrac{25}{40} = \\dfrac{5}{8}$.\nc) $36$ et $48$ sont dans la table de $12$ : $\\dfrac{36}{48} = \\dfrac{3}{4}$. En deux fois, c'est aussi bien : $\\dfrac{36}{48} = \\dfrac{18}{24} = \\dfrac{3}{4}$.\nd) $42$ et $70$ sont dans la table de $14$ : $\\dfrac{42}{70} = \\dfrac{3}{5}$.\n⛔ Le piège : s'arrêter trop tôt. $\\dfrac{18}{24}$ est bien égale à $\\dfrac{36}{48}$, mais elle se simplifie encore, par $6$.\nRéponse : a) $\\dfrac{2}{3}$ ; b) $\\dfrac{5}{8}$ ; c) $\\dfrac{3}{4}$ ; d) $\\dfrac{3}{5}$.",
          schema: comparer([14, 21], [2, 3]),
          micros: ["fraction_simplifier"],
        },
        {
          enonce: "Écris chaque quotient sous la forme d'une fraction, puis donne son écriture décimale.\na) $7 \\div 4$\nb) $2 \\div 5$\nc) $13 \\div 10$\nd) $11 \\div 20$",
          correction:
            "Une fraction est un quotient : $\\dfrac{a}{b} = a \\div b$. Le nombre qu'on divise va EN HAUT.\na) $7 \\div 4 = \\dfrac{7}{4}$. Je pose la division : $7 \\div 4 = 1{,}75$.\nb) $2 \\div 5 = \\dfrac{2}{5}$. Avec des dixièmes : $\\dfrac{2}{5} = \\dfrac{4}{10} = 0{,}4$.\nc) $13 \\div 10 = \\dfrac{13}{10} = 1{,}3$ : treize dixièmes.\nd) $11 \\div 20 = \\dfrac{11}{20}$. Avec des centièmes : $\\dfrac{11}{20} = \\dfrac{55}{100} = 0{,}55$.\n⛔ Le piège : écrire $\\dfrac{4}{7}$ pour $7 \\div 4$. Le numérateur est le nombre qu'on divise.\n⭐ $\\dfrac{7}{4}$ et $\\dfrac{13}{10}$ sont plus grands que $1$ : leur numérateur dépasse leur dénominateur.\nRéponse : a) $\\dfrac{7}{4} = 1{,}75$ ; b) $\\dfrac{2}{5} = 0{,}4$ ; c) $\\dfrac{13}{10} = 1{,}3$ ; d) $\\dfrac{11}{20} = 0{,}55$.",
          schema: droiteRel(0, 2, 0.1, [
            { value: 0.4, label: "2/5" },
            { value: 0.55, label: "11/20" },
            { value: 1.3, label: "13/10" },
            { value: 1.75, label: "7/4" },
          ], { nombres: 0.5 }),
          micros: ["fraction_rationnel"],
        },
        {
          enonce: "Écris chaque nombre sous la forme d'une fraction, la plus simple possible.\na) $0{,}3$\nb) $1{,}2$\nc) $0{,}08$\nd) $-0{,}5$\ne) $7$",
          correction:
            "Un nombre décimal se lit en dixièmes, en centièmes… : c'est une fraction de dénominateur $10$, $100$…\na) $0{,}3$ : trois dixièmes, $\\dfrac{3}{10}$. Elle ne se simplifie pas.\nb) $1{,}2$ : douze dixièmes, $\\dfrac{12}{10}$. Je simplifie par $2$ : $\\dfrac{12}{10} = \\dfrac{6}{5}$.\nc) $0{,}08$ : huit centièmes, $\\dfrac{8}{100}$. Je simplifie par $4$ : $\\dfrac{8}{100} = \\dfrac{2}{25}$.\nd) $-0{,}5$ est l'opposé de $0{,}5$, et $0{,}5 = \\dfrac{5}{10} = \\dfrac{1}{2}$. Donc $-0{,}5 = -\\dfrac{1}{2}$.\ne) $7 = \\dfrac{7}{1}$ : un entier est aussi une fraction.\n⭐ Tous ces nombres s'écrivent comme quotient de deux entiers : ce sont des nombres rationnels, positifs ou négatifs.\n⛔ Le piège du c) : écrire $\\dfrac{8}{10}$. Le $8$ est au rang des CENTIÈMES : $0{,}08 = \\dfrac{8}{100}$.\nRéponse : a) $\\dfrac{3}{10}$ ; b) $\\dfrac{6}{5}$ ; c) $\\dfrac{2}{25}$ ; d) $-\\dfrac{1}{2}$ ; e) $\\dfrac{7}{1}$.",
          schema: ecranSeulement(
            table(["nombre", "fraction", "plus simple"], [
              ["0,3", "3/10", "3/10"],
              ["1,2", "12/10", "6/5"],
              ["0,08", "8/100", "2/25"],
              ["−0,5", "−5/10", "−1/2"],
              ["7", "7/1", "7/1"],
            ]),
          ),
          micros: ["fraction_rationnel", "fraction_simplifier"],
        },
        {
          enonce: "Compare avec $<$, $>$ ou $=$.\na) $\\dfrac{5}{9}$ et $\\dfrac{7}{9}$\nb) $\\dfrac{4}{7}$ et $\\dfrac{4}{11}$\nc) $\\dfrac{3}{4}$ et $\\dfrac{11}{12}$\nd) $\\dfrac{9}{8}$ et $1$",
          correction:
            "a) Même dénominateur : des neuvièmes. Le plus grand numérateur gagne : $\\dfrac{5}{9} < \\dfrac{7}{9}$.\nb) Même numérateur : $4$ parts dans les deux cas. Mais un septième est plus gros qu'un onzième : plus on partage, plus les parts sont petites. $\\dfrac{4}{7} > \\dfrac{4}{11}$.\nc) $12$ est un multiple de $4$ : je redécoupe. $\\dfrac{3}{4} = \\dfrac{9}{12}$, et $\\dfrac{9}{12} < \\dfrac{11}{12}$. Donc $\\dfrac{3}{4} < \\dfrac{11}{12}$.\nd) $1 = \\dfrac{8}{8}$, et $\\dfrac{9}{8} > \\dfrac{8}{8}$ : $\\dfrac{9}{8} > 1$. Le numérateur dépasse le dénominateur.\n⛔ Le piège du b) : croire que $\\dfrac{4}{11}$ est plus grand « parce que $11 > 7$ ». Un grand dénominateur fait de PETITES parts.\nRéponse : a) $<$ ; b) $>$ ; c) $<$ ; d) $>$.",
          schema: comparer([9, 12], [11, 12]),
          micros: ["fraction_comparer"],
        },
        {
          enonce: "Donne l'opposé de chaque nombre, puis place les nombres et leurs opposés sur une droite graduée en quarts.\na) $\\dfrac{3}{4}$\nb) $-\\dfrac{5}{4}$\nc) $\\dfrac{1}{2}$",
          correction:
            "L'opposé d'un nombre est de l'autre côté de zéro, à la même distance. Je change seulement le signe.\na) L'opposé de $\\dfrac{3}{4}$ est $-\\dfrac{3}{4}$.\nb) L'opposé de $-\\dfrac{5}{4}$ est $\\dfrac{5}{4}$.\nc) L'opposé de $\\dfrac{1}{2}$ est $-\\dfrac{1}{2}$. Sur une droite graduée en quarts, $\\dfrac{1}{2}$ est à deux graduations de zéro, car $\\dfrac{1}{2} = \\dfrac{2}{4}$.\nPour placer : chaque unité est coupée en $4$. $\\dfrac{3}{4}$ est à $3$ graduations à droite de zéro, $-\\dfrac{3}{4}$ à $3$ graduations à gauche.\n⛔ Le piège : retourner la fraction et écrire $\\dfrac{4}{3}$. L'opposé ne touche qu'au SIGNE ; le numérateur et le dénominateur ne bougent pas.\n⭐ Un nombre et son opposé ont une somme nulle : ils sont à la même distance de zéro, de part et d'autre.\nRéponse : a) $-\\dfrac{3}{4}$ ; b) $\\dfrac{5}{4}$ ; c) $-\\dfrac{1}{2}$.",
          schema: droiteRel(-1.5, 1.5, 0.25, [
            { value: -1.25, label: "−5/4", color: ROUGE },
            { value: -0.75, label: "−3/4", color: ROUGE },
            { value: -0.5, label: "−1/2", color: ROUGE },
            { value: 0.5, label: "1/2" },
            { value: 0.75, label: "3/4" },
            { value: 1.25, label: "5/4" },
          ], { nombres: 0.5 }),
          micros: ["fraction_oppose"],
        },
        {
          enonce: "Sans calculer, dis si chaque fraction est plus petite que $1$, égale à $1$ ou plus grande que $1$.\n$\\dfrac{7}{5}$ ; $\\dfrac{3}{4}$ ; $\\dfrac{12}{12}$ ; $\\dfrac{9}{10}$ ; $\\dfrac{11}{10}$",
          correction:
            "Le dénominateur dit en combien de parts on coupe l'unité ; le numérateur, combien on en prend. Je compare les deux.\n$\\dfrac{7}{5}$ : $7$ parts, alors que $5$ font l'unité. Plus grande que $1$.\n$\\dfrac{3}{4}$ : $3$ parts sur les $4$ de l'unité. Plus petite que $1$.\n$\\dfrac{12}{12}$ : toutes les parts. Égale à $1$.\n$\\dfrac{9}{10}$ : il manque une part. Plus petite que $1$.\n$\\dfrac{11}{10}$ : une part de plus que l'unité. Plus grande que $1$.\n⭐ Numérateur plus petit que le dénominateur : plus petite que $1$. Numérateur plus grand : plus grande que $1$.\nRéponse : plus petites que $1$ : $\\dfrac{3}{4}$ et $\\dfrac{9}{10}$ ; égale à $1$ : $\\dfrac{12}{12}$ ; plus grandes que $1$ : $\\dfrac{7}{5}$ et $\\dfrac{11}{10}$.",
          schema: ecranSeulement(
            droiteRel(0, 1.5, 0.1, [
              { value: 0.75, label: "3/4" },
              { value: 0.9, label: "9/10" },
              { value: 1, label: "12/12", color: VERT },
              { value: 1.1, label: "11/10", color: ORANGE },
              { value: 1.4, label: "7/5", color: ORANGE },
            ], { nombres: 0.5 }),
          ),
          micros: ["fraction_comparer", "fraction_rationnel"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je mets au même dénominateur avant de comparer, et je simplifie mes réponses.",
      rappel: [
        "Pour comparer deux fractions, je les écris avec le MÊME dénominateur : un multiple commun des deux.",
        "À dénominateurs égaux, le plus grand numérateur gagne. À numérateurs égaux, le plus PETIT dénominateur gagne.",
        "Deux fractions sont égales quand elles ont la même forme simplifiée.",
      ],
      exercices: [
        {
          enonce: "a) Simplifie $\\dfrac{18}{45}$ et $\\dfrac{28}{70}$ jusqu'à leur forme la plus simple.\nb) Que remarques-tu ?\nc) Écris une fraction égale aux deux, de dénominateur $100$. Quelle est son écriture décimale ?",
          correction:
            "a) $18$ et $45$ sont dans la table de $9$ : $\\dfrac{18}{45} = \\dfrac{18 \\div 9}{45 \\div 9} = \\dfrac{2}{5}$.\n$28$ et $70$ sont dans la table de $14$ : $\\dfrac{28}{70} = \\dfrac{28 \\div 14}{70 \\div 14} = \\dfrac{2}{5}$. En deux fois, c'est aussi bien : $\\dfrac{28}{70} = \\dfrac{14}{35} = \\dfrac{2}{5}$.\nb) Les deux fractions ont la même forme simplifiée : elles sont égales, $\\dfrac{18}{45} = \\dfrac{28}{70}$. Ce sont deux écritures du même nombre.\nc) Pour passer de $5$ à $100$, je multiplie par $20$ : $\\dfrac{2}{5} = \\dfrac{2 \\times 20}{5 \\times 20} = \\dfrac{40}{100}$. Et $\\dfrac{40}{100} = 0{,}4$.\n⛔ Le piège : conclure que $\\dfrac{18}{45}$ et $\\dfrac{28}{70}$ sont différentes parce que leurs nombres n'ont rien à voir. Seule la forme simplifiée permet de décider.\nRéponse : a) $\\dfrac{2}{5}$ et $\\dfrac{2}{5}$ ; b) elles sont égales ; c) $\\dfrac{40}{100} = 0{,}4$.",
          schema: table(["fraction", "je divise par", "plus simple"], [
            ["18/45", "9", "2/5"],
            ["28/70", "14", "2/5"],
            ["40/100", "20", "2/5"],
          ]),
          micros: ["fraction_simplifier", "fraction_egale"],
        },
        {
          enonce: "Range ces fractions dans l'ordre croissant.\n$\\dfrac{5}{8}$ ; $\\dfrac{1}{2}$ ; $\\dfrac{3}{4}$ ; $\\dfrac{9}{16}$ ; $\\dfrac{11}{16}$",
          correction:
            "Pour comparer, je redécoupe tout en parts de même taille. $16$ est un multiple de $2$, de $4$ et de $8$ : je passe en seizièmes.\n$\\dfrac{5}{8} = \\dfrac{10}{16}$ ; $\\dfrac{1}{2} = \\dfrac{8}{16}$ ; $\\dfrac{3}{4} = \\dfrac{12}{16}$.\nJe range les numérateurs : $8 < 9 < 10 < 11 < 12$.\n⛔ Le piège : ranger d'après les numérateurs écrits, $1 < 3 < 5 < 9 < 11$, et mettre $\\dfrac{3}{4}$ en deuxième. Les parts n'ont pas la même taille : il faut d'abord redécouper.\nRéponse : $\\dfrac{1}{2} < \\dfrac{9}{16} < \\dfrac{5}{8} < \\dfrac{11}{16} < \\dfrac{3}{4}$.",
          schema: droiteRel(0.5, 0.75, 0.0625, [
            { value: 0.5, label: "1/2" },
            { value: 0.5625, label: "9/16" },
            { value: 0.625, label: "5/8" },
            { value: 0.6875, label: "11/16" },
            { value: 0.75, label: "3/4" },
          ], { nombres: 0.25 }),
          micros: ["fraction_comparer"],
        },
        {
          enonce: "Deux élèves se trompent. Explique chaque erreur, puis corrige.\na) Léo : « $\\dfrac{5}{12}$ est plus grand que $\\dfrac{1}{2}$, car $5 > 1$. »\nb) Zoé : « $\\dfrac{2}{3} = \\dfrac{3}{4}$, car on ajoute $1$ en haut et en bas. »",
          correction:
            "a) Léo compare les numérateurs sans regarder la taille des parts. Je redécoupe $\\dfrac{1}{2}$ en douzièmes : $\\dfrac{1}{2} = \\dfrac{6}{12}$. Or $\\dfrac{5}{12} < \\dfrac{6}{12}$ : $\\dfrac{5}{12}$ est plus PETIT que $\\dfrac{1}{2}$.\nb) Ajouter le même nombre en haut et en bas ne donne pas une fraction égale : il faut MULTIPLIER. En douzièmes : $\\dfrac{2}{3} = \\dfrac{8}{12}$ et $\\dfrac{3}{4} = \\dfrac{9}{12}$. Elles sont différentes, et $\\dfrac{2}{3} < \\dfrac{3}{4}$.\n⭐ Pour savoir si une fraction dépasse $\\dfrac{1}{2}$, je compare son numérateur à la moitié de son dénominateur : la moitié de $12$ est $6$, et $5 < 6$.\nRéponse : a) $\\dfrac{5}{12} < \\dfrac{1}{2}$ ; b) $\\dfrac{2}{3} < \\dfrac{3}{4}$, elles ne sont pas égales.",
          schema: ecranSeulement(comparer([5, 12], [6, 12])),
          micros: ["fraction_comparer", "fraction_defi"],
        },
        {
          enonce:
            "Trois classes de 5e ont voté pour la sortie de fin d'année. En 5e A, $18$ élèves sur $24$ veulent aller au musée des sciences ; en 5e B, $20$ sur $30$ ; en 5e C, $21$ sur $28$.\na) Pour chaque classe, écris la fraction des élèves qui veulent aller au musée, puis simplifie-la.\nb) Deux classes ont exactement la même proportion : lesquelles ?\nc) Dans quelle classe le musée a-t-il le moins de succès, en proportion ?",
          correction:
            "a) 5e A : $\\dfrac{18}{24}$. Je divise par $6$ : $\\dfrac{18}{24} = \\dfrac{3}{4}$.\n5e B : $\\dfrac{20}{30}$. Je divise par $10$ : $\\dfrac{20}{30} = \\dfrac{2}{3}$.\n5e C : $\\dfrac{21}{28}$. Je divise par $7$ : $\\dfrac{21}{28} = \\dfrac{3}{4}$.\nb) La 5e A et la 5e C ont la même fraction simplifiée, $\\dfrac{3}{4}$ : même proportion, alors que leurs nombres d'élèves sont différents.\nc) Je compare $\\dfrac{2}{3}$ et $\\dfrac{3}{4}$ en douzièmes : $\\dfrac{2}{3} = \\dfrac{8}{12}$ et $\\dfrac{3}{4} = \\dfrac{9}{12}$. Donc $\\dfrac{2}{3} < \\dfrac{3}{4}$ : c'est en 5e B que le musée a le moins de succès.\n⛔ Le piège : répondre la 5e A, parce que $18$ est le plus petit nombre de votants. On compare des PARTS de classe : la 5e B a plus de votants pour le musée ($20$), mais dans une classe plus grande.\nRéponse : a) $\\dfrac{3}{4}$, $\\dfrac{2}{3}$, $\\dfrac{3}{4}$ ; b) la 5e A et la 5e C ; c) la 5e B.",
          schema: table(["classe", "fraction", "simplifiée"], [
            ["5e A", "18/24", "3/4"],
            ["5e B", "20/30", "2/3"],
            ["5e C", "21/28", "3/4"],
          ]),
          micros: ["fraction_simplifier", "fraction_egale", "fraction_comparer"],
        },
        {
          enonce: "a) Donne l'opposé de $-\\dfrac{7}{10}$, de $\\dfrac{13}{4}$ et de $-\\dfrac{6}{6}$.\nb) Écris $-\\dfrac{7}{10}$ et son opposé en écriture décimale, puis place-les sur une droite graduée.\nc) Vrai ou faux : « l'opposé d'une fraction est toujours négatif » ?",
          correction:
            "a) Je change seulement le signe. L'opposé de $-\\dfrac{7}{10}$ est $\\dfrac{7}{10}$. L'opposé de $\\dfrac{13}{4}$ est $-\\dfrac{13}{4}$. Et $-\\dfrac{6}{6} = -1$ : son opposé est $1$.\nb) $\\dfrac{7}{10} = 0{,}7$, donc $-\\dfrac{7}{10} = -0{,}7$. Sur la droite, ils sont de part et d'autre de zéro, chacun à $7$ dixièmes de zéro.\nc) Faux : l'opposé de $-\\dfrac{7}{10}$ est $\\dfrac{7}{10}$, qui est positif.\n⛔ Le piège : prendre $\\dfrac{10}{7}$ pour l'opposé de $\\dfrac{7}{10}$. Retourner une fraction, ce n'est pas prendre son opposé.\nRéponse : a) $\\dfrac{7}{10}$ ; $-\\dfrac{13}{4}$ ; $1$ ; b) $-0{,}7$ et $0{,}7$ ; c) faux.",
          schema: ecranSeulement(
            droiteRel(-1, 1, 0.1, [
              { value: -0.7, label: "−7/10", color: ROUGE },
              { value: 0.7, label: "7/10" },
            ], { nombres: 0.5, sauts: [{ de: 0, vers: -0.7, label: "0,7" }, { de: 0, vers: 0.7, label: "0,7" }] }),
          ),
          micros: ["fraction_oppose"],
        },
        {
          enonce:
            "Une tablette de chocolat a $24$ carreaux. Inès en mange $\\dfrac{1}{3}$, Hugo $\\dfrac{3}{8}$ et Sam $\\dfrac{5}{12}$, chacun sur sa propre tablette.\na) Écris chaque fraction avec le dénominateur $24$.\nb) Combien de carreaux chacun a-t-il mangés ?\nc) Range les trois enfants, de celui qui a mangé le moins à celui qui a mangé le plus.",
          correction:
            "a) $24$ est un multiple de $3$, de $8$ et de $12$ : je passe en vingt-quatrièmes.\n$\\dfrac{1}{3} = \\dfrac{1 \\times 8}{3 \\times 8} = \\dfrac{8}{24}$ ; $\\dfrac{3}{8} = \\dfrac{3 \\times 3}{8 \\times 3} = \\dfrac{9}{24}$ ; $\\dfrac{5}{12} = \\dfrac{5 \\times 2}{12 \\times 2} = \\dfrac{10}{24}$.\nb) Un carreau, c'est $\\dfrac{1}{24}$ de la tablette : Inès a mangé $8$ carreaux, Hugo $9$, Sam $10$.\nc) $8 < 9 < 10$ : Inès, puis Hugo, puis Sam.\n⛔ Le piège : croire qu'Inès a mangé le plus parce que son dénominateur est le plus petit. Ce n'est vrai qu'à numérateurs égaux ; ici, ils sont différents.\nRéponse : a) $\\dfrac{8}{24}$, $\\dfrac{9}{24}$, $\\dfrac{10}{24}$ ; b) $8$, $9$ et $10$ carreaux ; c) Inès, Hugo, Sam.",
          schema: barres([
            { n: 8, d: 24, label: "Inès 1/3" },
            { n: 9, d: 24, label: "Hugo 3/8" },
            { n: 10, d: 24, label: "Sam 5/12" },
          ]),
          micros: ["fraction_egale", "fraction_comparer"],
        },
        {
          enonce: "Je suis une fraction égale à $\\dfrac{3}{5}$. La somme de mon numérateur et de mon dénominateur vaut $40$. Qui suis-je ?",
          correction:
            "Les fractions égales à $\\dfrac{3}{5}$ s'obtiennent en multipliant $3$ et $5$ par le même nombre : $\\dfrac{6}{10}$, $\\dfrac{9}{15}$, $\\dfrac{12}{20}$, $\\dfrac{15}{25}$…\nJ'additionne le haut et le bas à chaque fois : $3 + 5 = 8$ ; $6 + 10 = 16$ ; $9 + 15 = 24$ ; $12 + 20 = 32$ ; $15 + 25 = 40$.\nLa somme augmente de $8$ à chaque fois : on arrive à $40$ au cinquième essai, avec $\\dfrac{15}{25}$.\nContrôle : $\\dfrac{15}{25} = \\dfrac{15 \\div 5}{25 \\div 5} = \\dfrac{3}{5}$.\n⛔ Le piège : partager $40$ en deux et proposer $\\dfrac{20}{20}$. Cette fraction vaut $1$, pas $\\dfrac{3}{5}$.\nRéponse : je suis $\\dfrac{15}{25}$.",
          schema: ecranSeulement(
            table(["fraction", "haut + bas"], [
              ["3/5", "8"],
              ["6/10", "16"],
              ["9/15", "24"],
              ["12/20", "32"],
              ["15/25", "40"],
            ]),
          ),
          micros: ["fraction_egale", "fraction_defi"],
        },
        {
          enonce: "On s'intéresse au nombre $\\dfrac{17}{4}$.\na) Écris-le comme une division, puis donne son écriture décimale.\nb) Entre quels nombres entiers consécutifs se trouve-t-il ?\nc) Complète : $\\dfrac{17}{4} = 4 + \\dfrac{\\ldots}{4}$.\nd) Place-le sur une droite graduée en quarts.",
          correction:
            "a) $\\dfrac{17}{4} = 17 \\div 4$. Je pose la division : $4 \\times 4 = 16$, il reste $1$, et $1 \\div 4 = 0{,}25$. Donc $\\dfrac{17}{4} = 4{,}25$.\nb) $4 < 4{,}25 < 5$ : il est entre $4$ et $5$.\nc) $4 = \\dfrac{16}{4}$, et il reste $\\dfrac{1}{4}$ : $\\dfrac{17}{4} = 4 + \\dfrac{1}{4}$.\nd) Chaque unité est coupée en $4$. Je compte $17$ quarts depuis zéro : $4$ unités entières ($16$ quarts), puis encore $1$ quart.\n⛔ Le piège : lire $\\dfrac{17}{4}$ comme « $17$ virgule $4$ ». La barre de fraction est une division, pas une virgule.\nRéponse : a) $17 \\div 4 = 4{,}25$ ; b) entre $4$ et $5$ ; c) $\\dfrac{1}{4}$.",
          schema: droiteRel(3, 6, 0.25, [{ value: 4.25, label: "17/4" }], { nombres: 1, sauts: [{ de: 4, vers: 4.25, label: "1/4" }] }),
          micros: ["fraction_rationnel", "fraction_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. J'écris la part en fraction, je la simplifie, puis je compare.",
      rappel: [
        "Une proportion, c'est la part sur le tout : « $18$ sur $24$ » s'écrit $\\dfrac{18}{24}$.",
        "Pour comparer, je choisis un dénominateur commun, puis je compare les numérateurs.",
        "Une fraction a plusieurs écritures : je choisis celle qui répond le mieux à la question.",
      ],
      exercices: [
        {
          titre: "Les tirs au but",
          enonce:
            "À l'entraînement de handball, Emma réussit $7$ tirs sur $10$, Lou $11$ tirs sur $16$ et Nina $3$ tirs sur $4$ (chiffres d'un modèle).\na) Écris la fraction des tirs réussis par chaque joueuse.\nb) Compare Emma et Nina en écrivant leurs fractions avec le dénominateur $20$.\nc) Compare Emma et Lou avec le dénominateur $80$.\nd) Range les trois joueuses, de la plus adroite à la moins adroite.\ne) Lou tire encore $4$ fois et marque les $4$ tirs. A-t-elle rattrapé Nina ?",
          correction:
            "a) Emma : $\\dfrac{7}{10}$ ; Lou : $\\dfrac{11}{16}$ ; Nina : $\\dfrac{3}{4}$.\nb) $\\dfrac{7}{10} = \\dfrac{14}{20}$ et $\\dfrac{3}{4} = \\dfrac{15}{20}$. Donc $\\dfrac{7}{10} < \\dfrac{3}{4}$ : Nina est plus adroite qu'Emma.\nc) $\\dfrac{7}{10} = \\dfrac{56}{80}$ et $\\dfrac{11}{16} = \\dfrac{55}{80}$. Donc $\\dfrac{11}{16} < \\dfrac{7}{10}$ : Emma est un peu plus adroite que Lou.\nd) Nina, puis Emma, puis Lou.\ne) Lou a maintenant tiré $16 + 4 = 20$ fois et marqué $11 + 4 = 15$ tirs : $\\dfrac{15}{20}$. Je simplifie par $5$ : $\\dfrac{15}{20} = \\dfrac{3}{4}$. Elle a rattrapé Nina, exactement.\n⛔ Le piège : dire que Lou est la meilleure parce qu'elle a marqué $11$ buts, le plus grand nombre. On compare des PARTS de tirs réussis, pas des nombres de buts.\nRéponse : d) Nina, Emma, Lou ; e) oui : $\\dfrac{15}{20} = \\dfrac{3}{4}$.",
          schema: barres([
            { n: 3, d: 4, label: "Nina 3/4" },
            { n: 7, d: 10, label: "Emma 7/10" },
            { n: 11, d: 16, label: "Lou 11/16" },
          ]),
          micros: ["fraction_comparer", "fraction_egale", "fraction_simplifier"],
        },
        {
          titre: "Le jardin partagé",
          enonce:
            "Un jardin partagé est découpé en $60$ parcelles identiques. La famille Martin en cultive $12$, la famille Diallo $15$ et l'école $20$. Le reste est une prairie fleurie.\na) Écris la part du jardin de chacun sous forme de fraction simplifiée.\nb) Qui cultive la plus grande part ? Justifie en comparant les fractions.\nc) Combien de parcelles la prairie occupe-t-elle ? Quelle fraction du jardin est-ce ? Peut-on la simplifier ?",
          correction:
            "a) Martin : $\\dfrac{12}{60}$, je divise par $12$ : $\\dfrac{12}{60} = \\dfrac{1}{5}$. Diallo : $\\dfrac{15}{60}$, je divise par $15$ : $\\dfrac{15}{60} = \\dfrac{1}{4}$. L'école : $\\dfrac{20}{60}$, je divise par $20$ : $\\dfrac{20}{60} = \\dfrac{1}{3}$.\nb) Les trois fractions ont le même numérateur, $1$. Un tiers est plus gros qu'un quart, lui-même plus gros qu'un cinquième : $\\dfrac{1}{5} < \\dfrac{1}{4} < \\dfrac{1}{3}$. C'est l'école qui cultive la plus grande part. Contrôle en parcelles : $12 < 15 < 20$.\nc) $12 + 15 + 20 = 47$ parcelles sont cultivées, donc la prairie en occupe $60 - 47 = 13$. C'est $\\dfrac{13}{60}$ du jardin.\nLes diviseurs de $13$ sont $1$ et $13$, et $60$ n'est pas dans la table de $13$ : $\\dfrac{13}{60}$ ne se simplifie pas.\n⛔ Le piège du b) : croire que $\\dfrac{1}{5}$ est la plus grande part parce que $5$ est le plus grand nombre. À numérateurs égaux, plus le dénominateur est grand, plus la part est petite.\nRéponse : a) $\\dfrac{1}{5}$, $\\dfrac{1}{4}$, $\\dfrac{1}{3}$ ; b) l'école ; c) $13$ parcelles, $\\dfrac{13}{60}$, qui ne se simplifie pas.",
          schema: parcelles(6, 10, [
            { n: 12, color: BLEU, label: "Martin" },
            { n: 15, color: ORANGE, label: "Diallo" },
            { n: 20, color: VERT, label: "école" },
          ]),
          micros: ["fraction_simplifier", "fraction_comparer", "fraction_defi"],
        },
        {
          titre: "Les fractions de l'heure",
          enonce:
            "Une heure compte $60$ minutes.\na) Quelle fraction de l'heure représentent $20$ minutes ? Simplifie-la.\nb) Même question pour $45$ minutes.\nc) Un film dure $90$ minutes. Écris sa durée en heures sous forme de fraction simplifiée, puis en écriture décimale.\nd) Léna affirme : « $1{,}3$ h, c'est $1$ h $30$ min. » A-t-elle raison ?",
          correction:
            "a) $20$ minutes sur $60$ : $\\dfrac{20}{60}$. Je divise par $20$ : $\\dfrac{20}{60} = \\dfrac{1}{3}$. Vingt minutes, c'est un tiers d'heure.\nb) $\\dfrac{45}{60}$. Je divise par $15$ : $\\dfrac{45}{60} = \\dfrac{3}{4}$. Trois quarts d'heure, comme sur le cadran.\nc) $\\dfrac{90}{60}$. Je divise par $30$ : $\\dfrac{90}{60} = \\dfrac{3}{2}$. Et $3 \\div 2 = 1{,}5$ : le film dure $1{,}5$ h.\nd) Non. $1{,}3$ h, c'est $1$ h et $3$ dixièmes d'heure. Un dixième d'heure, c'est $60 \\div 10 = 6$ minutes, donc trois dixièmes font $18$ minutes : $1{,}3$ h, c'est $1$ h $18$ min. Et $1$ h $30$ min, c'est $1{,}5$ h, la durée du film.\n⛔ Le piège : lire les chiffres après la virgule comme des minutes. Une heure a $60$ minutes, pas $100$.\nRéponse : a) $\\dfrac{1}{3}$ ; b) $\\dfrac{3}{4}$ ; c) $\\dfrac{3}{2}$ h, soit $1{,}5$ h ; d) non, $1{,}3$ h, c'est $1$ h $18$ min.",
          schema: disque(9, 12, "45 min = 3/4 h"),
          micros: ["fraction_simplifier", "fraction_rationnel", "fraction_egale"],
        },
        {
          titre: "La fraction mystère",
          enonce:
            "Je suis une fraction de dénominateur $12$.\nIndice 1 : je suis plus grande que $\\dfrac{1}{2}$.\nIndice 2 : je suis plus petite que $\\dfrac{5}{6}$.\nIndice 3 : mon numérateur est impair.\nIndice 4 : on peut me simplifier.\na) Écris $\\dfrac{1}{2}$ et $\\dfrac{5}{6}$ avec le dénominateur $12$.\nb) Qui suis-je ?\nc) Écris-moi sous ma forme la plus simple.\nd) Quel est mon opposé ?",
          correction:
            "a) $\\dfrac{1}{2} = \\dfrac{6}{12}$ et $\\dfrac{5}{6} = \\dfrac{10}{12}$.\nb) En douzièmes, je suis entre $\\dfrac{6}{12}$ et $\\dfrac{10}{12}$, sans être l'une ni l'autre : mon numérateur est $7$, $8$ ou $9$.\nIndice 3 : il est impair, il reste $7$ ou $9$.\nIndice 4 : $\\dfrac{7}{12}$ ne se simplifie pas, car $12$ n'est pas dans la table de $7$. $\\dfrac{9}{12}$ se simplifie par $3$. Je suis $\\dfrac{9}{12}$.\nc) $\\dfrac{9}{12} = \\dfrac{9 \\div 3}{12 \\div 3} = \\dfrac{3}{4}$.\nd) Mon opposé est $-\\dfrac{9}{12}$, c'est-à-dire $-\\dfrac{3}{4}$.\n⛔ Le piège : chercher un numérateur entre $1$ et $5$, les numérateurs de $\\dfrac{1}{2}$ et de $\\dfrac{5}{6}$. Les parts n'ont pas la même taille : il faut d'abord le même dénominateur.\nRéponse : b) $\\dfrac{9}{12}$ ; c) $\\dfrac{3}{4}$ ; d) $-\\dfrac{3}{4}$.",
          schema: barres([
            { n: 6, d: 12, label: "1/2" },
            { n: 9, d: 12, label: "moi : 9/12" },
            { n: 10, d: 12, label: "5/6" },
          ]),
          micros: ["fraction_defi", "fraction_comparer", "fraction_simplifier", "fraction_oppose", "fraction_egale"],
        },
      ],
    },
  ],
};
