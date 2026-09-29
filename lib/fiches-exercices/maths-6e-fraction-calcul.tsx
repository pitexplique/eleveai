// ─── Fiche d'exercices : calculer avec les fractions (6e) — 20 exercices ──────
//
// Lot de 6e (30/09/2026), sur la forme de l'étalon `maths-5e-relatif-nombre.tsx`
// et de la feuille voisine `maths-5e-fraction-nombre.tsx` (aides de dessin
// reprises : `droiteRel`, `barres`, `table`, `grille`). ⚠️ PAS sur
// `maths-5e-fraction-calcul.tsx`, ancienne feuille à peu de dessins.
//
// Pas de fiche de cours de 6e pour cette notion : `fichesCours: []`.
// Alignée sur la banque `lib/tutor-v4/questionBank/6e/maths/fractions-calcul.bank.ts`,
// qui cite le BO de 6e (2025) mot pour mot :
//   · la fraction d'une quantité, comme OPÉRATEUR (2/5 de 60 = 2 × 12) ;
//   · additionner et soustraire à MÊME dénominateur, ou à dénominateurs
//     MULTIPLES l'un de l'autre ; et « dans des cas simples » quelconques
//     (5/4 + 2/3) — ici un seul exercice (12), avec le dénominateur commun donné ;
//   · le produit d'une fraction par un ENTIER, et sa commutativité (7).
// ⛔ Rien d'autre : ni produit de deux fractions, ni division, ni nombre
// négatif, ni lettre. Les résultats sont simplifiés quand c'est facile (par 2,
// 3, 4), jamais par une méthode de PGCD.
// ⛔ Aucun exemple de la banque n'est repris (2/5 de 60, 3/4 de 20, 1/5 + 2/5,
// 3/7 + 2/7, 1/2 + 1/4, 2/3 + 1/6, 3/4 − 1/8, 5/4 + 2/3, 7/2 − 3/5, 3 × 2/5,
// 4 × 3/7, le gâteau de Mia, les letchis, la classe de 30), ni de la fiche de
// cours `fraction-nombre` (les 3/4 de 12, les 15 billes, les 12 biscuits).
//
// Les pièges nommés : multiplier par le dénominateur au lieu de diviser (1, 19),
// s'arrêter après la division (2), ajouter les dénominateurs (3, 10, 17),
// soustraire les dénominateurs (4), multiplier aussi le bas (5, 7, 10, 14, 20),
// additionner sans redécouper (6, 9, 12), prendre une fraction du RESTE au lieu
// du tout (11, 18), oublier que le tout vaut 9/9 (15), « multiplier agrandit
// toujours » (13), oublier de convertir l'unité (8), confondre « atteindre » et
// « dépasser » (16).
//
// Pas de fait réel : tartes, classes, jardin, crêpes, grenouille, randonnée,
// argent de poche, arrosage sont des MODÈLES.
//
// ⭐ LES DESSINS : des BARRES empilées dont les parts se colorient groupe par
// groupe (`barres` : bleu + orange pour une somme, parts barrées en rouge pour
// une différence), la BARRE DE PARTAGE d'une quantité (`partage` : le total en
// haut, la valeur d'une part dans chaque case), une GRILLE de carreaux
// (`grille`), la droite graduée de l'étalon avec ses bonds (`droiteRel`) et un
// tableau (`table`). 13 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je redécoupe »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-fraction-calcul.mjs`.
//
// ⚠️ LA MICRO `fraction_quantite` (« Prendre une fraction d'un nombre »)
// appartient à cette notion depuis le 22/08, mais son entrée de `microSkills.ts`
// porte un commentaire entre `{` et `id:` : le contrôle commun des micros ne la
// voit pas, et la citer ferait échouer « aucune micro d'une autre notion ». Les
// exercices de fraction d'une quantité (1, 2, 8, 11, 15, 18, 19) sont donc
// étiquetés `fraction_multiplier_entier` — le BO écrit lui-même 2/5 de 60 =
// 2/5 × 60. À trancher par Frédéric (déplacer le commentaire suffirait).
//
// Micro-compétences : fraction_additionner (3, 4, 6, 9, 10, 12, 15, 17, 18,
// 19), fraction_multiplier_entier (1, 2, 5, 7, 8, 10, 11, 13, 14, 15, 16, 18,
// 19, 20), fraction_calcul_defi (9, 11, 12, 13, 15, 17, 18, 19, 20). 3/3 (+
// fraction_quantite, voir ci-dessus).

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";
const VIDE = "#f1f5f9";
const BARRE = "#fee2e2";
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

/**
 * Des BARRES EMPILÉES, toutes de la même longueur (le même tout), coupées en
 * `d` parts égales ; `parts` donne les parts coloriées, groupe par groupe
 * (bleu, puis orange, puis vert) : une SOMME se voit bout à bout. `retire` :
 * les dernières parts coloriées sont barrées en rouge (une DIFFÉRENCE).
 * Le nom à gauche : ⚠️ 10 signes au plus.
 */
const barres = (liste: { d: number; label: string; parts: number[]; retire?: number }[]) => {
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
          const colories = b.parts.reduce((s, n) => s + n, 0);
          const barree = (k: number) => (b.retire ?? 0) > 0 && k >= colories - (b.retire ?? 0) && k < colories;
          return (
            <g key={i}>
              <text x={x0 - 8} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
                {b.label}
              </text>
              {Array.from({ length: b.d }, (_, k) => {
                const [cx, w] = [x0 + (k * L) / b.d, L / b.d];
                return barree(k) ? (
                  <g key={k}>
                    <rect x={cx} y={y} width={w} height={h} fill={BARRE} stroke={ROUGE} strokeWidth={1.4} strokeDasharray="4 3" />
                    <line x1={cx + 3} y1={y + 3} x2={cx + w - 3} y2={y + h - 3} stroke={ROUGE} strokeWidth={1.6} />
                  </g>
                ) : (
                  <rect key={k} x={cx} y={y} width={w} height={h} fill={couleur(k, b.parts)} stroke={NOIR} strokeWidth={b.d > 16 ? 0.8 : 1.4} />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * LA BARRE DE PARTAGE d'une quantité : le total en haut, la barre coupée en
 * `d` cases égales, la valeur d'UNE part écrite dans chaque case ; les cases
 * prises se colorient groupe par groupe (`groupes`). `noms` : la légende
 * (un nom par groupe, puis le nom du reste). ⚠️ Le script vérifie que la
 * valeur tient dans sa case (8,6 par signe).
 */
const partage = (total: string, d: number, valeur: string, groupes: number[], noms: string[] = []) => {
  const [x0, L, y, h] = [20, 260, 30, 34];
  const w = L / d;
  const couleur = (k: number) => {
    let fin = 0;
    for (let g = 0; g < groupes.length; g++) {
      fin += groupes[g];
      if (k < fin) return COULEURS[g];
    }
    return VIDE;
  };
  const legende = noms.map((nom, i) => ({ nom, color: i < groupes.length ? COULEURS[i] : VIDE }));
  const H = y + h + 12 + (legende.length ? 26 : 0);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Une quantité de ${total} partagée en ${d} parts de ${valeur}`}>
        <text x={150} y={16} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
          {`total : ${total}`}
        </text>
        <path d={`M ${x0} 28 V 22 H ${x0 + L} V 28`} fill="none" stroke="#475569" strokeWidth={1.5} />
        {Array.from({ length: d }, (_, k) => {
          const c = couleur(k);
          return (
            <g key={k}>
              <rect x={x0 + k * w} y={y} width={w} height={h} fill={c} stroke={NOIR} strokeWidth={1.4} />
              <text x={x0 + k * w + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={c === VIDE ? NOIR : "#fff"}>
                {valeur}
              </text>
            </g>
          );
        })}
        {legende.map((l, k) => (
          <g key={l.nom}>
            <rect x={14 + k * 90} y={H - 20} width={12} height={12} fill={l.color} stroke="#475569" strokeWidth={1} />
            <text x={30 + k * 90} y={H - 9} fontSize="14" fontWeight="700" fill={NOIR}>
              {l.nom}
            </text>
          </g>
        ))}
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

export const exercicesFractionCalcul6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "fraction-calcul",
  titre: "Calculer avec les fractions",
  accroche:
    "Vingt exercices, du geste seul au problème : prendre une fraction d'une quantité, additionner et soustraire des fractions de même dénominateur, redécouper quand un dénominateur est multiple de l'autre, multiplier une fraction par un nombre entier. Des tartes, une classe qui vient à vélo, un jardin, des crêpes, une grenouille qui saute, une randonnée, de l'argent de poche et une plante à arroser. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et les parts dessinées.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/fraction-calcul", titre: "Calculer avec les fractions" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde d'abord la taille des parts, puis je compte.",
      rappel: [
        "Les $\\dfrac{2}{3}$ de $30$ : je coupe $30$ en $3$ parts ($30 \\div 3 = 10$), puis j'en prends $2$ ($2 \\times 10 = 20$).",
        "Même dénominateur : j'ajoute ou je retire les numérateurs. Le dénominateur ne change pas.",
        "Fraction fois entier : je multiplie le numérateur. $2 \\times \\dfrac{3}{7} = \\dfrac{6}{7}$.",
      ],
      exercices: [
        {
          enonce: "Calcule.\na) $\\dfrac{1}{4}$ de $28$\nb) $\\dfrac{1}{3}$ de $27$\nc) $\\dfrac{1}{5}$ de $45$\nd) $\\dfrac{1}{10}$ de $70$",
          correction:
            "Prendre $\\dfrac{1}{4}$, c'est couper en $4$ parts égales. Puis j'en garde une.\na) $28 \\div 4 = 7$.\nb) $27 \\div 3 = 9$.\nc) $45 \\div 5 = 9$.\nd) $70 \\div 10 = 7$.\n⛔ Le piège : multiplier par le dénominateur. $28 \\times 4 = 112$, c'est bien plus que $28$ ! Une part d'un tout est plus petite que le tout.\nRéponse : a) $7$ ; b) $9$ ; c) $9$ ; d) $7$.",
          schema: ecranSeulement(partage("28", 4, "7", [1])),
          micros: ["fraction_multiplier_entier"],
        },
        {
          enonce: "Calcule.\na) $\\dfrac{2}{3}$ de $18$\nb) $\\dfrac{3}{5}$ de $40$\nc) $\\dfrac{5}{6}$ de $24$\nd) $\\dfrac{3}{10}$ de $50$",
          correction:
            "Je cherche d'abord UNE part : je divise par le nombre du bas. Puis j'en prends autant que le nombre du haut.\na) $18 \\div 3 = 6$, puis $2 \\times 6 = 12$.\nb) $40 \\div 5 = 8$, puis $3 \\times 8 = 24$.\nc) $24 \\div 6 = 4$, puis $5 \\times 4 = 20$.\nd) $50 \\div 10 = 5$, puis $3 \\times 5 = 15$.\n⛔ Le piège : s'arrêter après la division. $40 \\div 5 = 8$, c'est UN cinquième. Il en faut trois.\nRéponse : a) $12$ ; b) $24$ ; c) $20$ ; d) $15$.",
          schema: partage("40", 5, "8", [3]),
          micros: ["fraction_multiplier_entier"],
        },
        {
          enonce: "Calcule.\na) $\\dfrac{2}{7} + \\dfrac{3}{7}$\nb) $\\dfrac{4}{9} + \\dfrac{4}{9}$\nc) $\\dfrac{1}{10} + \\dfrac{6}{10}$\nd) $\\dfrac{5}{8} + \\dfrac{3}{8}$",
          correction:
            "Les parts ont la même taille : j'ajoute seulement le nombre de parts.\na) $2$ septièmes et $3$ septièmes : $\\dfrac{2}{7} + \\dfrac{3}{7} = \\dfrac{5}{7}$.\nb) $\\dfrac{4}{9} + \\dfrac{4}{9} = \\dfrac{8}{9}$.\nc) $\\dfrac{1}{10} + \\dfrac{6}{10} = \\dfrac{7}{10}$.\nd) $\\dfrac{5}{8} + \\dfrac{3}{8} = \\dfrac{8}{8} = 1$ : la barre est pleine.\n⛔ Le piège : ajouter aussi les dénominateurs et écrire $\\dfrac{5}{14}$. Des septièmes plus des septièmes donnent des septièmes.\nRéponse : a) $\\dfrac{5}{7}$ ; b) $\\dfrac{8}{9}$ ; c) $\\dfrac{7}{10}$ ; d) $1$.",
          schema: ecranSeulement(
            barres([
              { d: 7, label: "2/7 + 3/7", parts: [2, 3] },
              { d: 8, label: "5/8 + 3/8", parts: [5, 3] },
            ]),
          ),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule.\na) $\\dfrac{7}{9} - \\dfrac{2}{9}$\nb) $\\dfrac{9}{10} - \\dfrac{4}{10}$\nc) $\\dfrac{6}{5} - \\dfrac{2}{5}$\nd) $1 - \\dfrac{3}{8}$",
          correction:
            "Même dénominateur : je retire des parts de même taille.\na) $\\dfrac{7}{9} - \\dfrac{2}{9} = \\dfrac{5}{9}$.\nb) $\\dfrac{9}{10} - \\dfrac{4}{10} = \\dfrac{5}{10}$. C'est la moitié : $\\dfrac{5}{10} = \\dfrac{1}{2}$.\nc) $\\dfrac{6}{5} - \\dfrac{2}{5} = \\dfrac{4}{5}$.\nd) $1$, ce sont $8$ huitièmes : $1 - \\dfrac{3}{8} = \\dfrac{8}{8} - \\dfrac{3}{8} = \\dfrac{5}{8}$.\n⛔ Le piège : soustraire aussi les dénominateurs. $10 - 10 = 0$ : une fraction ne peut pas avoir $0$ en bas.\nRéponse : a) $\\dfrac{5}{9}$ ; b) $\\dfrac{5}{10} = \\dfrac{1}{2}$ ; c) $\\dfrac{4}{5}$ ; d) $\\dfrac{5}{8}$.",
          schema: barres([
            { d: 10, label: "b)", parts: [9], retire: 4 },
            { d: 8, label: "d)", parts: [8], retire: 3 },
          ]),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule.\na) $4 \\times \\dfrac{2}{9}$\nb) $3 \\times \\dfrac{3}{10}$\nc) $\\dfrac{2}{11} \\times 5$\nd) $7 \\times \\dfrac{1}{7}$",
          correction:
            "Multiplier par $4$, c'est ajouter $4$ fois la même fraction. Je multiplie le numérateur. Le dénominateur ne change pas.\na) $4 \\times \\dfrac{2}{9} = \\dfrac{4 \\times 2}{9} = \\dfrac{8}{9}$.\nb) $3 \\times \\dfrac{3}{10} = \\dfrac{9}{10}$.\nc) $\\dfrac{2}{11} \\times 5 = \\dfrac{10}{11}$. L'ordre ne change rien.\nd) $7 \\times \\dfrac{1}{7} = \\dfrac{7}{7} = 1$.\n⛔ Le piège : multiplier aussi le bas. On trouverait $\\dfrac{8}{36}$, qui est égal à $\\dfrac{2}{9}$ : on n'aurait rien multiplié !\nRéponse : a) $\\dfrac{8}{9}$ ; b) $\\dfrac{9}{10}$ ; c) $\\dfrac{10}{11}$ ; d) $1$.",
          schema: ecranSeulement(
            droiteRel(0, 1, 1 / 9, [{ value: 8 / 9, label: "8/9" }], {
              nombres: 1,
              sauts: [
                { de: 0, vers: 2 / 9, label: "2/9" },
                { de: 2 / 9, vers: 4 / 9, label: "2/9" },
                { de: 4 / 9, vers: 6 / 9, label: "2/9" },
                { de: 6 / 9, vers: 8 / 9, label: "2/9" },
              ],
            }),
          ),
          micros: ["fraction_multiplier_entier"],
        },
        {
          enonce: "Calcule. Écris d'abord les deux fractions avec le même dénominateur.\na) $\\dfrac{1}{3} + \\dfrac{1}{6}$\nb) $\\dfrac{3}{8} + \\dfrac{1}{4}$\nc) $\\dfrac{9}{10} - \\dfrac{3}{5}$\nd) $\\dfrac{1}{2} + \\dfrac{3}{8}$",
          correction:
            "Un dénominateur est un multiple de l'autre. Je redécoupe les plus grosses parts.\na) $\\dfrac{1}{3} = \\dfrac{2}{6}$. Donc $\\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6}$. C'est la moitié : $\\dfrac{3}{6} = \\dfrac{1}{2}$.\nb) $\\dfrac{1}{4} = \\dfrac{2}{8}$. Donc $\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}$.\nc) $\\dfrac{3}{5} = \\dfrac{6}{10}$. Donc $\\dfrac{9}{10} - \\dfrac{6}{10} = \\dfrac{3}{10}$.\nd) $\\dfrac{1}{2} = \\dfrac{4}{8}$. Donc $\\dfrac{4}{8} + \\dfrac{3}{8} = \\dfrac{7}{8}$.\n⛔ Le piège : ajouter tout de suite les huitièmes et les quarts. Ce ne sont pas des parts de même taille.\nRéponse : a) $\\dfrac{1}{2}$ ; b) $\\dfrac{5}{8}$ ; c) $\\dfrac{3}{10}$ ; d) $\\dfrac{7}{8}$.",
          schema: barres([
            { d: 4, label: "1/4", parts: [1] },
            { d: 8, label: "2/8", parts: [2] },
            { d: 8, label: "3/8 + 2/8", parts: [3, 2] },
          ]),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "a) Calcule $6 \\times \\dfrac{2}{5}$, puis $\\dfrac{2}{5} \\times 6$. Que remarques-tu ?\nb) Ce résultat est-il plus grand que $1$ ? Écris-le sous la forme « entier + fraction ».\nc) Calcule $4 \\times \\dfrac{5}{12}$, puis simplifie le résultat.",
          correction:
            "a) $6 \\times \\dfrac{2}{5} = \\dfrac{6 \\times 2}{5} = \\dfrac{12}{5}$. Et $\\dfrac{2}{5} \\times 6 = \\dfrac{12}{5}$ aussi.\nLes deux produits sont égaux : l'ordre ne compte pas.\nb) Le haut dépasse le bas : c'est plus grand que $1$.\n$10$ cinquièmes font $2$ unités. Il reste $2$ cinquièmes : $\\dfrac{12}{5} = 2 + \\dfrac{2}{5}$.\nc) $4 \\times \\dfrac{5}{12} = \\dfrac{20}{12}$. Je divise le haut et le bas par $4$ : $\\dfrac{20}{12} = \\dfrac{5}{3}$.\n⛔ Le piège : multiplier aussi le bas par $6$, et écrire $\\dfrac{12}{30}$.\nRéponse : a) $\\dfrac{12}{5}$ dans les deux cas ; b) oui, $2 + \\dfrac{2}{5}$ ; c) $\\dfrac{5}{3}$.",
          schema: barres([
            { d: 5, label: "1", parts: [5] },
            { d: 5, label: "1", parts: [5] },
            { d: 5, label: "2/5", parts: [2] },
          ]),
          micros: ["fraction_multiplier_entier"],
        },
        {
          enonce: "Complète.\na) $\\dfrac{2}{5}$ de $1$ km $= \\ldots$ m\nb) $\\dfrac{3}{10}$ de $1$ kg $= \\ldots$ g\nc) $\\dfrac{1}{4}$ de $1$ L $= \\ldots$ cL\nd) $\\dfrac{3}{4}$ de $1$ m $= \\ldots$ cm",
          correction:
            "Je convertis d'abord l'unité en un nombre facile à couper.\na) $1$ km $= 1\\,000$ m. $1\\,000 \\div 5 = 200$, puis $2 \\times 200 = 400$ m.\nb) $1$ kg $= 1\\,000$ g. $1\\,000 \\div 10 = 100$, puis $3 \\times 100 = 300$ g.\nc) $1$ L $= 100$ cL. $100 \\div 4 = 25$ cL.\nd) $1$ m $= 100$ cm. $100 \\div 4 = 25$, puis $3 \\times 25 = 75$ cm.\n⛔ Le piège : chercher les $\\dfrac{2}{5}$ de $1$ tout court. Il faut d'abord écrire $1$ km en mètres.\nRéponse : a) $400$ m ; b) $300$ g ; c) $25$ cL ; d) $75$ cm.",
          schema: partage("1 000 m", 5, "200 m", [2]),
          micros: ["fraction_multiplier_entier"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je dessine les parts, puis je calcule.",
      rappel: [
        "Pour ajouter des fractions, il faut des parts de même taille : le même dénominateur.",
        "Sinon, je redécoupe : $\\dfrac{1}{2} = \\dfrac{3}{6}$ et $\\dfrac{1}{3} = \\dfrac{2}{6}$.",
        "Le tout, c'est $1$ : $1 = \\dfrac{4}{4} = \\dfrac{10}{10}$…",
      ],
      exercices: [
        {
          enonce: "Une tarte est coupée en $8$ parts égales. Paul mange $\\dfrac{1}{4}$ de la tarte. Zoé mange $\\dfrac{3}{8}$ de la tarte.\na) Écris $\\dfrac{1}{4}$ en huitièmes.\nb) Quelle fraction de la tarte ont-ils mangée à deux ?\nc) Quelle fraction reste-t-il ?",
          correction:
            "a) Un quart, ce sont $2$ parts sur $8$ : $\\dfrac{1}{4} = \\dfrac{2}{8}$.\nb) $\\dfrac{2}{8} + \\dfrac{3}{8} = \\dfrac{5}{8}$.\nc) La tarte entière, c'est $\\dfrac{8}{8}$. Donc $\\dfrac{8}{8} - \\dfrac{5}{8} = \\dfrac{3}{8}$.\n⛔ Le piège : ajouter $\\dfrac{1}{4}$ et $\\dfrac{3}{8}$ sans redécouper. Des quarts et des huitièmes n'ont pas la même taille.\nRéponse : a) $\\dfrac{2}{8}$ ; b) $\\dfrac{5}{8}$ ; c) $\\dfrac{3}{8}$.",
          schema: barres([
            { d: 4, label: "Paul 1/4", parts: [1] },
            { d: 8, label: "Paul 2/8", parts: [2] },
            { d: 8, label: "+ Zoé 3/8", parts: [2, 3] },
          ]),
          micros: ["fraction_additionner", "fraction_calcul_defi"],
        },
        {
          enonce: "Deux élèves se trompent. Explique l'erreur, puis corrige.\na) Noé : « $\\dfrac{2}{5} + \\dfrac{1}{5} = \\dfrac{3}{10}$. »\nb) Maé : « $3 \\times \\dfrac{2}{7} = \\dfrac{6}{21}$. »",
          correction:
            "a) Noé ajoute aussi les dénominateurs. Des cinquièmes plus des cinquièmes, ce sont des cinquièmes : $\\dfrac{2}{5} + \\dfrac{1}{5} = \\dfrac{3}{5}$.\n⭐ Contrôle : $\\dfrac{3}{10}$ est plus petit que $\\dfrac{2}{5} = \\dfrac{4}{10}$. Une somme ne peut pas être plus petite qu'un de ses morceaux.\nb) Maé multiplie aussi le bas. Or $\\dfrac{6}{21} = \\dfrac{2}{7}$ : elle n'a rien multiplié ! Le bon calcul : $3 \\times \\dfrac{2}{7} = \\dfrac{6}{7}$.\n⛔ Le piège : toucher au dénominateur. En ajoutant, ou en multipliant par un entier, les parts gardent leur taille.\nRéponse : a) $\\dfrac{3}{5}$ ; b) $\\dfrac{6}{7}$.",
          schema: ecranSeulement(
            barres([
              { d: 5, label: "2/5 + 1/5", parts: [2, 1] },
              { d: 10, label: "3/10", parts: [3] },
            ]),
          ),
          micros: ["fraction_additionner", "fraction_multiplier_entier"],
        },
        {
          enonce: "Une classe compte $28$ élèves. Les $\\dfrac{3}{7}$ viennent à vélo. Le quart vient en bus. Les autres viennent à pied.\na) Combien d'élèves viennent à vélo ?\nb) Combien viennent en bus ?\nc) Combien viennent à pied ?",
          correction:
            "a) $28 \\div 7 = 4$ : un septième de la classe, c'est $4$ élèves. Puis $3 \\times 4 = 12$ élèves à vélo.\nb) Le quart : $28 \\div 4 = 7$ élèves en bus.\nc) $12 + 7 = 19$ élèves viennent à vélo ou en bus. Donc $28 - 19 = 9$ élèves à pied.\n⛔ Le piège : prendre le quart des élèves qui restent après le vélo. « Le quart » parle de TOUTE la classe : $28$ élèves.\nRéponse : a) $12$ élèves ; b) $7$ élèves ; c) $9$ élèves.",
          schema: grille(4, 7, [
            { n: 12, nom: "vélo" },
            { n: 7, nom: "bus" },
          ], "à pied"),
          micros: ["fraction_multiplier_entier", "fraction_calcul_defi"],
        },
        {
          enonce: "Calcule. Les dénominateurs ne sont pas multiples l'un de l'autre : j'utilise le dénominateur donné.\na) $\\dfrac{1}{2} + \\dfrac{1}{3}$, en sixièmes\nb) $\\dfrac{3}{4} - \\dfrac{2}{3}$, en douzièmes\nc) $\\dfrac{2}{5} + \\dfrac{1}{2}$, en dixièmes",
          correction:
            "a) $\\dfrac{1}{2} = \\dfrac{3}{6}$ et $\\dfrac{1}{3} = \\dfrac{2}{6}$. Donc $\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$.\nb) $\\dfrac{3}{4} = \\dfrac{9}{12}$ et $\\dfrac{2}{3} = \\dfrac{8}{12}$. Donc $\\dfrac{9}{12} - \\dfrac{8}{12} = \\dfrac{1}{12}$.\nc) $\\dfrac{2}{5} = \\dfrac{4}{10}$ et $\\dfrac{1}{2} = \\dfrac{5}{10}$. Donc $\\dfrac{4}{10} + \\dfrac{5}{10} = \\dfrac{9}{10}$.\n⛔ Le piège du a) : écrire $\\dfrac{2}{5}$. Or $\\dfrac{2}{5}$ est plus petit que $\\dfrac{1}{2}$ : impossible pour une somme.\nRéponse : a) $\\dfrac{5}{6}$ ; b) $\\dfrac{1}{12}$ ; c) $\\dfrac{9}{10}$.",
          schema: ecranSeulement(
            barres([
              { d: 2, label: "1/2", parts: [1] },
              { d: 3, label: "1/3", parts: [1] },
              { d: 6, label: "3/6 + 2/6", parts: [3, 2] },
            ]),
          ),
          micros: ["fraction_additionner", "fraction_calcul_defi"],
        },
        {
          enonce: "a) Sans calculer : $5 \\times \\dfrac{3}{4}$ est-il plus grand ou plus petit que $5$ ?\nb) Calcule-le, puis écris-le sous la forme « entier + fraction ».\nc) Et $4 \\times \\dfrac{7}{6}$ : plus grand ou plus petit que $4$ ?",
          correction:
            "a) $\\dfrac{3}{4}$ est plus petit que $1$. Donc $5 \\times \\dfrac{3}{4}$ est plus petit que $5 \\times 1 = 5$.\nb) $5 \\times \\dfrac{3}{4} = \\dfrac{15}{4}$. Or $12$ quarts font $3$ unités : $\\dfrac{15}{4} = 3 + \\dfrac{3}{4}$. C'est bien moins que $5$.\nc) $\\dfrac{7}{6}$ est plus grand que $1$. Donc le produit est plus grand que $4$.\nJe vérifie : $4 \\times \\dfrac{7}{6} = \\dfrac{28}{6}$. Et $24$ sixièmes font $4$ : $\\dfrac{28}{6} = 4 + \\dfrac{4}{6}$.\n⛔ Le piège : croire qu'une multiplication agrandit toujours. Multiplier par une fraction plus petite que $1$ donne un résultat plus PETIT.\nRéponse : a) plus petit ; b) $\\dfrac{15}{4} = 3 + \\dfrac{3}{4}$ ; c) plus grand, $\\dfrac{28}{6} = 4 + \\dfrac{4}{6}$.",
          schema: droiteRel(0, 5, 0.25, [{ value: 3.75, label: "15/4" }], { nombres: 1 }),
          micros: ["fraction_multiplier_entier", "fraction_calcul_defi"],
        },
        {
          enonce: "Pour une pâte à crêpes, il faut $\\dfrac{3}{4}$ L de lait. Léo fait $3$ fois la recette.\na) Quelle quantité de lait lui faut-il, en fraction de litre ?\nb) Écris ce résultat sous la forme « entier + fraction », puis en décimal.\nc) Léo a une bouteille de $2$ L. Est-ce assez ?",
          correction:
            "a) $3 \\times \\dfrac{3}{4} = \\dfrac{9}{4}$ L.\nb) $8$ quarts font $2$ L : $\\dfrac{9}{4} = 2 + \\dfrac{1}{4}$.\nUn quart de litre, c'est $0{,}25$ L. Donc $\\dfrac{9}{4}$ L, c'est $2{,}25$ L.\nc) $2{,}25 > 2$ : non, il manque $\\dfrac{1}{4}$ L.\n⛔ Le piège : multiplier aussi le bas, et trouver $\\dfrac{9}{12}$. Trois recettes demandent PLUS de lait qu'une seule.\nRéponse : a) $\\dfrac{9}{4}$ L ; b) $2 + \\dfrac{1}{4}$, soit $2{,}25$ L ; c) non, il manque $\\dfrac{1}{4}$ L.",
          schema: ecranSeulement(
            barres([
              { d: 4, label: "recette 1", parts: [3] },
              { d: 4, label: "recette 2", parts: [3] },
              { d: 4, label: "recette 3", parts: [3] },
            ]),
          ),
          micros: ["fraction_multiplier_entier"],
        },
        {
          enonce: "Un jardin a une aire de $720$ m². Le potager occupe $\\dfrac{2}{9}$ du jardin. Le verger occupe $\\dfrac{4}{9}$ du jardin. Le reste est une pelouse.\na) Quelle fraction du jardin occupent le potager et le verger ensemble ?\nb) Quelle fraction du jardin occupe la pelouse ?\nc) Calcule l'aire de chaque partie.",
          correction:
            "a) $\\dfrac{2}{9} + \\dfrac{4}{9} = \\dfrac{6}{9}$.\nb) Le jardin entier, c'est $\\dfrac{9}{9}$. La pelouse : $\\dfrac{9}{9} - \\dfrac{6}{9} = \\dfrac{3}{9}$. C'est aussi $\\dfrac{1}{3}$.\nc) Un neuvième du jardin : $720 \\div 9 = 80$ m².\nPotager : $2 \\times 80 = 160$ m². Verger : $4 \\times 80 = 320$ m². Pelouse : $3 \\times 80 = 240$ m².\n⭐ Contrôle : $160 + 320 + 240 = 720$ m².\n⛔ Le piège : oublier que le jardin entier vaut $\\dfrac{9}{9}$, et répondre $\\dfrac{3}{6}$ pour la pelouse.\nRéponse : a) $\\dfrac{6}{9}$ ; b) $\\dfrac{3}{9}$ ; c) $160$ m², $320$ m² et $240$ m².",
          schema: partage("720 m²", 9, "80", [2, 4], ["potager", "verger", "pelouse"]),
          micros: ["fraction_additionner", "fraction_multiplier_entier", "fraction_calcul_defi"],
        },
        {
          enonce: "Une grenouille fait des bonds de $\\dfrac{3}{5}$ de mètre, tous pareils. Elle part de $0$.\na) Où est-elle après $4$ bonds ? Donne une fraction.\nb) Écris ce nombre sous la forme « entier + fraction », puis en décimal.\nc) Combien de bonds lui faut-il pour dépasser $3$ m ?",
          correction:
            "a) $4 \\times \\dfrac{3}{5} = \\dfrac{12}{5}$ m.\nb) $10$ cinquièmes font $2$ : $\\dfrac{12}{5} = 2 + \\dfrac{2}{5}$.\nEt $\\dfrac{2}{5} = \\dfrac{4}{10} = 0{,}4$. Donc $\\dfrac{12}{5}$ m, c'est $2{,}4$ m.\nc) $3$ m, ce sont $15$ cinquièmes. Chaque bond fait $3$ cinquièmes.\nAprès $5$ bonds : $5 \\times \\dfrac{3}{5} = \\dfrac{15}{5} = 3$ m pile.\nIl faut donc $6$ bonds pour DÉPASSER $3$ m.\n⛔ Le piège du c) : répondre $5$ bonds. Avec $5$ bonds, elle est pile à $3$ m : elle ne l'a pas dépassé.\nRéponse : a) $\\dfrac{12}{5}$ m ; b) $2 + \\dfrac{2}{5} = 2{,}4$ m ; c) $6$ bonds.",
          schema: droiteRel(0, 3, 0.2, [{ value: 2.4, label: "12/5" }], {
            nombres: 1,
            sauts: [
              { de: 0, vers: 0.6, label: "3/5" },
              { de: 0.6, vers: 1.2, label: "3/5" },
              { de: 1.2, vers: 1.8, label: "3/5" },
              { de: 1.8, vers: 2.4, label: "3/5" },
            ],
          }),
          micros: ["fraction_multiplier_entier"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je dessine les parts, puis je calcule.",
      rappel: [
        "Je lis la question : on cherche une FRACTION, ou une QUANTITÉ ?",
        "Pour une quantité : je divise par le nombre du bas, puis je multiplie par celui du haut.",
        "Toutes les parts d'un tout font $1$. Le reste, c'est $1$ moins les parts.",
      ],
      exercices: [
        {
          titre: "Le goûter",
          enonce: "Une pizza est coupée en $12$ parts égales. Nina mange $\\dfrac{1}{3}$ de la pizza, Oscar $\\dfrac{1}{6}$ et Lucas $\\dfrac{1}{4}$.\na) Écris chaque fraction en douzièmes.\nb) Quelle fraction de la pizza ont-ils mangée à trois ?\nc) Quelle fraction reste-t-il ?\nd) Combien de parts reste-t-il ?",
          correction:
            "a) $12$ est un multiple de $3$, de $6$ et de $4$.\n$\\dfrac{1}{3} = \\dfrac{4}{12}$ ; $\\dfrac{1}{6} = \\dfrac{2}{12}$ ; $\\dfrac{1}{4} = \\dfrac{3}{12}$.\nb) $\\dfrac{4}{12} + \\dfrac{2}{12} + \\dfrac{3}{12} = \\dfrac{9}{12}$. C'est aussi $\\dfrac{3}{4}$.\nc) $\\dfrac{12}{12} - \\dfrac{9}{12} = \\dfrac{3}{12}$, soit $\\dfrac{1}{4}$ de la pizza.\nd) $\\dfrac{3}{12}$, ce sont $3$ parts sur $12$ : il reste $3$ parts.\n⛔ Le piège : ajouter en haut et en bas, et trouver $\\dfrac{3}{13}$. Les parts doivent d'abord avoir la même taille : des douzièmes.\nRéponse : a) $\\dfrac{4}{12}$, $\\dfrac{2}{12}$, $\\dfrac{3}{12}$ ; b) $\\dfrac{9}{12}$ ; c) $\\dfrac{3}{12}$ ; d) $3$ parts.",
          schema: grille(2, 6, [
            { n: 4, nom: "Nina" },
            { n: 2, nom: "Oscar" },
            { n: 3, nom: "Lucas" },
          ], "reste"),
          micros: ["fraction_additionner", "fraction_calcul_defi"],
        },
        {
          titre: "La randonnée en trois jours",
          enonce: "Une randonnée fait $18$ km. Le premier jour, on parcourt $\\dfrac{1}{3}$ du trajet. Le deuxième jour, on parcourt $\\dfrac{4}{9}$ du trajet. Le troisième jour, on finit.\na) Quelle fraction du trajet reste-t-il pour le troisième jour ?\nb) Combien de kilomètres parcourt-on chaque jour ?\nc) Vérifie : la somme fait-elle $18$ km ?",
          correction:
            "a) $\\dfrac{1}{3} = \\dfrac{3}{9}$. Les deux premiers jours : $\\dfrac{3}{9} + \\dfrac{4}{9} = \\dfrac{7}{9}$.\nIl reste $\\dfrac{9}{9} - \\dfrac{7}{9} = \\dfrac{2}{9}$ du trajet.\nb) Un neuvième du trajet : $18 \\div 9 = 2$ km.\nJour 1 : $3 \\times 2 = 6$ km. Jour 2 : $4 \\times 2 = 8$ km. Jour 3 : $2 \\times 2 = 4$ km.\nc) $6 + 8 + 4 = 18$ km. C'est juste.\n⛔ Le piège : calculer le jour 2 sur ce qui reste après le jour 1. Les $\\dfrac{4}{9}$ parlent du trajet ENTIER.\nRéponse : a) $\\dfrac{2}{9}$ ; b) $6$ km, $8$ km et $4$ km ; c) oui.",
          schema: partage("18 km", 9, "2", [3, 4], ["jour 1", "jour 2", "jour 3"]),
          micros: ["fraction_additionner", "fraction_multiplier_entier", "fraction_calcul_defi"],
        },
        {
          titre: "L'argent de poche",
          enonce: "Sofia a $60$ €. Elle dépense les $\\dfrac{2}{5}$ pour un livre. Elle dépense le quart pour une place de cinéma.\na) Combien coûte le livre ? Et la place ?\nb) Combien d'euros lui reste-t-il ?\nc) Quelle fraction de son argent lui reste-t-il ?",
          correction:
            "a) Livre : $60 \\div 5 = 12$, puis $2 \\times 12 = 24$ €.\nPlace : $60 \\div 4 = 15$ €.\nb) Elle dépense $24 + 15 = 39$ €. Il lui reste $60 - 39 = 21$ €.\nc) $21$ € sur $60$ € : $\\dfrac{21}{60}$. Je divise le haut et le bas par $3$ : $\\dfrac{21}{60} = \\dfrac{7}{20}$.\n⭐ Sur le dessin, les $60$ € sont coupés en $20$ carreaux de $3$ €. Il reste $7$ carreaux.\n⭐ Autre chemin : $\\dfrac{2}{5} = \\dfrac{8}{20}$ et $\\dfrac{1}{4} = \\dfrac{5}{20}$. Elle dépense $\\dfrac{13}{20}$, il reste $\\dfrac{7}{20}$.\n⛔ Le piège du a) : diviser $60$ par $2$, le nombre du haut. Je divise par le nombre du BAS.\nRéponse : a) $24$ € et $15$ € ; b) $21$ € ; c) $\\dfrac{21}{60} = \\dfrac{7}{20}$.",
          schema: grille(4, 5, [
            { n: 8, nom: "livre" },
            { n: 5, nom: "ciné" },
          ], "reste"),
          micros: ["fraction_multiplier_entier", "fraction_additionner", "fraction_calcul_defi"],
        },
        {
          titre: "L'arrosage",
          enonce: "Chaque jour, on verse $\\dfrac{3}{10}$ L d'eau à une plante.\na) Quelle quantité d'eau reçoit-elle en $7$ jours ? Donne une fraction, puis un décimal.\nb) Est-ce plus ou moins que $2$ L ?\nc) Un arrosoir contient $5$ L. Pendant combien de jours entiers peut-on arroser la plante ?",
          correction:
            "a) $7 \\times \\dfrac{3}{10} = \\dfrac{21}{10}$ L, soit $2{,}1$ L.\nb) $2{,}1 > 2$ : un peu plus que $2$ L.\nc) $5$ L, ce sont $50$ dixièmes de litre. Chaque jour prend $3$ dixièmes.\n$16$ jours : $16 \\times \\dfrac{3}{10} = \\dfrac{48}{10} = 4{,}8$ L. Ça passe.\n$17$ jours : $17 \\times \\dfrac{3}{10} = \\dfrac{51}{10} = 5{,}1$ L. C'est trop.\nOn peut arroser pendant $16$ jours entiers.\n⛔ Le piège du a) : écrire $\\dfrac{21}{70}$. Sept jours donnent PLUS d'eau qu'un seul jour.\nRéponse : a) $\\dfrac{21}{10}$ L, soit $2{,}1$ L ; b) plus ; c) $16$ jours.",
          schema: ecranSeulement(
            table(["jours", "eau (L)", "en décimal"], [
              ["1", "3/10", "0,3"],
              ["7", "21/10", "2,1"],
              ["16", "48/10", "4,8"],
              ["17", "51/10", "5,1"],
            ]),
          ),
          micros: ["fraction_multiplier_entier", "fraction_calcul_defi"],
        },
      ],
    },
  ],
};
