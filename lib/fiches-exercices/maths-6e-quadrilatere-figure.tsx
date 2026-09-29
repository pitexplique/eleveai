// ─── Fiche d'exercices : les quadrilatères (6e) — 20 exercices corrigés ───────
//
// Lot de 6e (30/09/2026), sur le modèle de la feuille étalon de 5e
// `maths-5e-relatif-nombre.tsx` et de sa voisine `maths-5e-parallelogramme.tsx`
// (dont `quad()` est repris, resserré sur la 6e).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-quadrilateres.tsx` (clé
// maths/6e/quadrilatere-figure) et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/quadrilateres.bank.ts` (lue seulement),
// notionId quadrilatere_figure : nommer un quadrilatère et son vocabulaire
// (côtés opposés, consécutifs, diagonales), reconnaître sa nature par ses
// CODAGES, distinguer carré, rectangle et losange, défis (périmètre, figure
// qu'on compte).
// ⛔ LIMITES DE LA 6e : carré, rectangle, losange, et « aucun des trois ». Le
// parallélogramme n'est pas ici : la banque ne l'emploie que dans la notion
// quadrilatere_propriete (feuille voisine). Pas de trapèze nommé, pas de
// propriété des diagonales (feuille voisine), pas de lettre inconnue.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni écran, ni porte, ni
// carreau de carrelage, ni cerf-volant, ni panneau routier ; ni ses questions
// (côté opposé à AB, « 4 côtés égaux sans angle droit, est-ce un carré ? »
// posé tel quel).
//
// PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases courtes, une idée par phrase,
// le mot de la classe. Les corrigés disent « je ».
//
// Les pièges nommés : les lettres écrites dans le désordre (1, 12), une
// diagonale prise pour un côté (2, 12), conclure « carré » sans côtés codés (3,
// 6), croire qu'un losange doit « pointer » vers le haut (4), un carré penché
// qui ne serait plus un carré (5), juger à l'œil (6), deux côtés au lieu de
// quatre dans un périmètre (8, 13), un carré qui ne serait pas un rectangle (7,
// 11, 19, 20), diviser par 2 au lieu de 4 (14), « 30 − 9 » pour la largeur
// (15), oublier les angles (16, 20), oublier le grand carré (19).
//
// Aucun fait réel à vérifier : la tablette, le terrain de 40 m sur 20 m, le
// potager, le cadre, le post-it sont des MODÈLES. La feuille A4 mesure
// 21 cm sur 29,7 cm : c'est la norme du format A4.
//
// ⭐ LES DESSINS : `quad()` dessine à l'échelle, VRAIES coordonnées (y vers le
// haut), codages de 6e : angles droits (petit carré rouge), côtés égaux
// (petits traits), angles en degrés, longueurs, diagonales, quadrillage.
// Étiquettes en 14-15, bornées au cadre. Le script MESURE chaque codage et
// simule la place des étiquettes. 13 dessins imprimés ; ceux qui redisent le
// corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-quadrilatere-figure.mjs`.
//
// Micro-compétences : quadrilatere_nommer_vocabulaire (1, 2, 12),
// quadrilatere_identifier_nature (3, 4, 5, 9, 10, 16, 17, 18),
// quadrilatere_distinguer (5, 6, 7, 9, 10, 11, 13, 16, 17, 18, 19, 20),
// quadrilatere_defi (8, 13, 14, 15, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { trace } from "@/lib/fiches-exercices/figures";

type P2 = [number, number];
type S = "A" | "B" | "C" | "D";
type Cote = "AB" | "BC" | "CD" | "DA";
type Ancre = "start" | "middle" | "end";

const ENCRE = "#0f172a";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const BLEU = "#0369a1";
const GRIS = "#64748b";

const W = 260, H = 200, MARGE = 36;
const SOMMETS: S[] = ["A", "B", "C", "D"];
const COTES: Cote[] = ["AB", "BC", "CD", "DA"];
const VOISINS: Record<S, [S, S]> = { A: ["D", "B"], B: ["A", "C"], C: ["B", "D"], D: ["C", "A"] };

const unit = (x: number, y: number): P2 => {
  const n = Math.hypot(x, y) || 1;
  return [x / n, y / n];
};
const milieu = (p: P2, q: P2): P2 => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const ancre = (dx: number): Ancre => (dx > 0.45 ? "start" : dx < -0.45 ? "end" : "middle");

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/**
 * ⭐ UN QUADRILATÈRE À L'ÉCHELLE, sommets A, B, C, D dans l'ordre (les lettres
 * affichées viennent de `noms`). Coordonnées VRAIES, y vers le haut.
 * `egaux` : des groupes de côtés — le groupe n° i reçoit i + 1 petits traits.
 * `droits` : les angles droits codés. `grille` : le quadrillage, un carreau par
 * unité. ⛔ Texte NU (« 7,5 cm », « 70° ») : SVG, pas de KaTeX.
 * ⭐ Le script de recalcul relit cet appel : l'écrire sur UNE ligne, en clair.
 */
const quad = (
  pts: Record<S, P2>,
  opts: {
    noms?: Partial<Record<S, string>>;
    cotes?: Partial<Record<Cote, string>>;
    trouveCotes?: Cote[];
    angles?: Partial<Record<S, string>>;
    droits?: S[];
    egaux?: Cote[][];
    diagonales?: boolean;
    grille?: boolean;
  } = {},
) => {
  const reels: P2[] = SOMMETS.map((k) => pts[k]);
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P = { A: px(pts.A), B: px(pts.B), C: px(pts.C), D: px(pts.D) };
  const G: P2 = [(P.A[0] + P.B[0] + P.C[0] + P.D[0]) / 4, (P.A[1] + P.B[1] + P.C[1] + P.D[1]) / 4];

  const etiquette = (x: number, y: number, t: string, couleur: string, taille: number, a: Ancre, key: string) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + ga), W - 4 - dr);
    const by = Math.min(Math.max(y, 10), H - 8);
    return (
      <text key={key} x={bx.toFixed(1)} y={by.toFixed(1)} textAnchor={a} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
        {t}
      </text>
    );
  };
  const equerre = (V: P2, p: P2, q: P2, key: string) => {
    const u1 = unit(p[0] - V[0], p[1] - V[1]);
    const u2 = unit(q[0] - V[0], q[1] - V[1]);
    const c = 10;
    return <path key={key} d={`M ${V[0] + u1[0] * c} ${V[1] + u1[1] * c} L ${V[0] + (u1[0] + u2[0]) * c} ${V[1] + (u1[1] + u2[1]) * c} L ${V[0] + u2[0] * c} ${V[1] + u2[1] * c}`} fill="none" stroke="#dc2626" strokeWidth={2.2} />;
  };
  /** `n` petits traits au milieu de [pq]. */
  const traits = (p: P2, q: P2, n: number, key: string) => {
    const M = milieu(p, q);
    const t = unit(q[0] - p[0], q[1] - p[1]);
    const nn: P2 = [-t[1], t[0]];
    return (
      <g key={key}>
        {Array.from({ length: n }, (_, i) => {
          const d = (i - (n - 1) / 2) * 4;
          const c: P2 = [M[0] + t[0] * d, M[1] + t[1] * d];
          return <line key={i} x1={c[0] - nn[0] * 6} y1={c[1] - nn[1] * 6} x2={c[0] + nn[0] * 6} y2={c[1] + nn[1] * 6} stroke={ENCRE} strokeWidth={2} />;
        })}
      </g>
    );
  };
  /** Le quadrillage : une ligne par unité entière, dans le cadre. */
  const lignesGrille = () => {
    const vx: number[] = [], vy: number[] = [];
    for (let v = Math.floor(x0) - 3; v <= Math.ceil(x1) + 3; v++) {
      const X = ox + (v - x0) * s;
      if (X >= 2 && X <= W - 2) vx.push(X);
    }
    for (let v = Math.floor(y0) - 3; v <= Math.ceil(y1) + 3; v++) {
      const Y = H - oy - (v - y0) * s;
      if (Y >= 2 && Y <= H - 2) vy.push(Y);
    }
    return (
      <g>
        {vx.map((X) => <line key={`gx${X}`} x1={X} y1={2} x2={X} y2={H - 2} stroke="#cbd5e1" strokeWidth={1} />)}
        {vy.map((Y) => <line key={`gy${Y}`} x1={2} y1={Y} x2={W - 2} y2={Y} stroke="#cbd5e1" strokeWidth={1} />)}
      </g>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Quadrilatère dessiné à l'échelle">
        {opts.grille ? lignesGrille() : null}
        <polygon points={SOMMETS.map((k) => P[k].join(",")).join(" ")} fill={opts.grille ? "none" : "#f8fafc"} stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
        {opts.diagonales ? (
          <g>
            <line x1={P.A[0]} y1={P.A[1]} x2={P.C[0]} y2={P.C[1]} stroke={GRIS} strokeWidth={1.6} />
            <line x1={P.B[0]} y1={P.B[1]} x2={P.D[0]} y2={P.D[1]} stroke={GRIS} strokeWidth={1.6} />
          </g>
        ) : null}
        {(Object.keys(opts.angles ?? {}) as S[]).map((k) => {
          const V = P[k];
          const [p, q] = VOISINS[k].map((v) => P[v]);
          const u1 = unit(p[0] - V[0], p[1] - V[1]);
          const u2 = unit(q[0] - V[0], q[1] - V[1]);
          const ouvert = (Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) * 180) / Math.PI;
          const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
          const r = 17;
          const loin = r + (ouvert < 35 ? 26 : ouvert < 60 ? 19 : 15);
          const a: P2 = [V[0] + u1[0] * r, V[1] + u1[1] * r];
          const b: P2 = [V[0] + u2[0] * r, V[1] + u2[1] * r];
          const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
          const d = `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
          return (
            <g key={`a${k}`}>
              <path d={d} fill="none" stroke={VIOLET} strokeWidth={1.8} />
              {etiquette(V[0] + bi[0] * loin, V[1] + bi[1] * loin, opts.angles?.[k] ?? "", VIOLET, 14, "middle", `la${k}`)}
            </g>
          );
        })}
        {(opts.droits ?? []).map((k) => equerre(P[k], P[VOISINS[k][0]], P[VOISINS[k][1]], `d${k}`))}
        {(opts.egaux ?? []).flatMap((groupe, i) => groupe.map((c) => traits(P[c[0] as S], P[c[1] as S], i + 1, `e${i}${c}`)))}
        {COTES.map((c) => {
          const t = opts.cotes?.[c];
          if (!t) return null;
          const [p, q] = [P[c[0] as S], P[c[1] as S]];
          const M = milieu(p, q);
          let n = unit(-(q[1] - p[1]), q[0] - p[0]);
          if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
          return etiquette(M[0] + n[0] * 14, M[1] + n[1] * 14, t, (opts.trouveCotes ?? []).includes(c) ? ORANGE : BLEU, 14, ancre(n[0]), `c${c}`);
        })}
        {SOMMETS.map((k) => {
          const V = P[k];
          const d = unit(V[0] - G[0], V[1] - G[1]);
          return (
            <g key={`s${k}`}>
              <circle cx={V[0]} cy={V[1]} r={3.5} fill={ENCRE} />
              {etiquette(V[0] + d[0] * 15, V[1] + d[1] * 15, opts.noms?.[k] ?? k, ENCRE, 15, ancre(d[0]), `n${k}`)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesQuadrilatereFigure6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "quadrilatere-figure",
  titre: "Les quadrilatères",
  accroche:
    "Vingt exercices pour nommer un quadrilatère et reconnaître un rectangle, un losange ou un carré. On lit les codages, pas l'allure du dessin. Une tablette de chocolat, une feuille qu'on plie, un terrain, un potager. Un rappel avant chaque niveau. Cherche d'abord, puis ouvre la correction : étape par étape, avec la figure et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/quadrilatere-figure", titre: "Les quadrilatères" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question à la fois. Je lis les lettres et les codages de la figure.",
      rappel: [
        "Un quadrilatère a 4 côtés, 4 sommets, 4 angles et 2 diagonales.",
        "On le nomme en tournant autour, sans sauter de sommet.",
        "Rectangle : 4 angles droits. Losange : 4 côtés égaux. Carré : les deux.",
      ],
      exercices: [
        {
          enonce: "Voici un quadrilatère.\na) Écris deux noms corrects pour lui.\nb) Le nom $RTSU$ est-il correct ? Pourquoi ?",
          figure: quad({ A: [0, 0], B: [5, 0.8], C: [4.2, 3.6], D: [0.6, 3] }, { noms: { A: "R", B: "S", C: "T", D: "U" } }),
          correction:
            "Je tourne autour de la figure, sans sauter de sommet.\na) Je pars de $R$ : $RSTU$.\nJe peux aussi partir de $S$ : $STUR$.\nOu tourner dans l'autre sens : $RUTS$.\nb) Dans $RTSU$, la lettre $R$ est suivie de $T$.\nMais $R$ et $T$ ne sont pas voisins.\n$[RT]$ est une diagonale, pas un côté.\n⛔ Le piège : écrire les lettres dans le désordre.\nRéponse : a) par exemple $RSTU$ et $STUR$ ; b) non.",
          micros: ["quadrilatere_nommer_vocabulaire"],
        },
        {
          enonce: "Observe le quadrilatère $EFGH$.\na) Nomme ses deux diagonales.\nb) Quel côté est opposé au côté $[EF]$ ?\nc) Quels côtés sont consécutifs à $[EF]$ ?",
          figure: quad({ A: [0, 0], B: [5.5, 0], C: [4.8, 3.4], D: [0.8, 3.2] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, diagonales: true }),
          correction:
            "a) Une diagonale relie deux sommets opposés.\n$E$ est opposé à $G$. $F$ est opposé à $H$.\nLes diagonales sont $[EG]$ et $[FH]$.\nb) Le côté opposé ne touche pas $[EF]$.\nC'est $[GH]$.\nc) Deux côtés consécutifs se touchent en un sommet.\n$[HE]$ touche $[EF]$ en $E$.\n$[FG]$ touche $[EF]$ en $F$.\n⛔ Le piège : prendre une diagonale pour un côté.\nRéponse : a) $[EG]$ et $[FH]$ ; b) $[GH]$ ; c) $[FG]$ et $[HE]$.",
          micros: ["quadrilatere_nommer_vocabulaire"],
        },
        {
          enonce: "Lis les codages du quadrilatère $ABCD$.\nQuelle est sa nature ?",
          figure: quad({ A: [0, 0], B: [6, 0], C: [6, 3.5], D: [0, 3.5] }, { droits: ["A", "B", "C", "D"] }),
          correction:
            "Je lis les codages, pas l'allure du dessin.\nUn petit carré rouge marque un angle droit.\nJe compte $4$ angles droits.\nUn quadrilatère avec $4$ angles droits est un rectangle.\n⚠️ Aucun côté n'est codé égal.\nJe ne peux donc pas dire « carré ».\nRéponse : $ABCD$ est un rectangle.",
          micros: ["quadrilatere_identifier_nature"],
        },
        {
          enonce: "Lis les codages du quadrilatère $PQRS$.\nQuelle est sa nature ?",
          figure: quad({ A: [0, 0], B: [4, 0], C: [6.294305, 3.276608], D: [2.294305, 3.276608] }, { noms: { A: "P", B: "Q", C: "R", D: "S" }, egaux: [["AB", "BC", "CD", "DA"]] }),
          correction:
            "Les petits traits marquent des côtés de même longueur.\nLes $4$ côtés portent le même trait.\nIls ont donc la même longueur.\nUn quadrilatère avec $4$ côtés égaux est un losange.\nAucun angle droit n'est codé : ce n'est pas un carré.\n⛔ Le piège : croire qu'un losange doit « pointer » vers le haut.\nUn losange peut être posé sur un côté.\nRéponse : $PQRS$ est un losange.",
          micros: ["quadrilatere_identifier_nature"],
        },
        {
          enonce: "Tom regarde cette figure penchée.\nIl dit : « Elle est penchée, donc c'est un losange. »\nQuelle est sa nature exacte ?",
          figure: quad({ A: [0, 0], B: [3.625231, 1.690473], C: [1.934758, 5.315704], D: [-1.690473, 3.625231] }, { droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] }),
          correction:
            "Je compte $4$ angles droits : c'est un rectangle.\nJe compte $4$ côtés égaux : c'est aussi un losange.\nLes deux à la fois : c'est un carré.\n⛔ Le piège : croire qu'un carré penché n'est plus un carré.\nTourner la feuille ne change ni les angles, ni les côtés.\nTom a raison sur un point : c'est bien un losange.\nMais le nom le plus précis est « carré ».\nRéponse : c'est un carré.",
          micros: ["quadrilatere_identifier_nature", "quadrilatere_distinguer"],
        },
        {
          enonce: "Ce quadrilatère $WXYZ$ a l'air d'un carré.\nQue peut-on affirmer avec ses codages ?",
          figure: quad({ A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4] }, { noms: { A: "W", B: "X", C: "Y", D: "Z" }, droits: ["A", "B", "C", "D"] }),
          correction:
            "Je ne conclus que sur ce qui est codé.\n$4$ angles droits sont codés : c'est un rectangle.\nAucun côté n'est codé égal à un autre.\nJe ne peux donc pas affirmer « carré ».\n⛔ Le piège : juger à l'œil. Un dessin peut tromper.\nRéponse : c'est un rectangle ; on ne peut pas dire plus.",
          micros: ["quadrilatere_distinguer"],
        },
        {
          enonce: "Un carré et un rectangle se ressemblent.\na) Quel point commun ont-ils ?\nb) Qu'est-ce qui les distingue ?",
          correction:
            "a) Les deux ont $4$ angles droits.\nb) Le carré a ses $4$ côtés égaux.\nLe rectangle a deux longueurs différentes : une longueur et une largeur.\n⭐ Un carré est donc un rectangle un peu spécial.\n⛔ Le piège : chercher la différence dans les angles. Ils sont tous droits.\nRéponse : a) $4$ angles droits ; b) les côtés.",
          schema: ecranSeulement(deux(quad({ A: [0, 0], B: [3, 0], C: [3, 3], D: [0, 3] }, { droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] }), quad({ A: [0, 0], B: [5, 0], C: [5, 2.5], D: [0, 2.5] }, { droits: ["A", "B", "C", "D"], egaux: [["AB", "CD"], ["BC", "DA"]] }))),
          micros: ["quadrilatere_distinguer"],
        },
        {
          enonce: "Un post-it est un carré de $7{,}5$ cm de côté.\nQuel est son périmètre ?",
          figure: ecranSeulement(quad({ A: [0, 0], B: [7.5, 0], C: [7.5, 7.5], D: [0, 7.5] }, { cotes: { AB: "7,5 cm" }, droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] })),
          correction:
            "Le périmètre, c'est le tour complet.\nUn carré a $4$ côtés égaux.\n$4 \\times 7{,}5 = 30$.\n⛔ Le piège : n'ajouter que deux côtés, soit $15$ cm.\nRéponse : $30$ cm.",
          micros: ["quadrilatere_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions. Je regarde les angles, puis les côtés, puis je conclus.",
      rappel: [
        "D'abord les angles : 4 angles droits, c'est un rectangle.",
        "Ensuite les côtés : 4 côtés égaux, c'est un losange.",
        "Les deux ensemble, c'est un carré. Il manque une information ? Je ne conclus pas.",
      ],
      exercices: [
        {
          enonce:
            "Voici quatre quadrilatères, décrits par leurs codages.\n$ABCD$ : $4$ angles droits, des côtés de $5$ cm et $3$ cm.\n$EFGH$ : $4$ côtés de $5$ cm, aucun angle droit.\n$IJKL$ : $4$ angles droits, $4$ côtés de $5$ cm.\n$MNPQ$ : des côtés de $3$, $4$, $5$ et $6$ cm.\nDonne la nature de chacun.",
          correction:
            "Pour chacun, je regarde les angles, puis les côtés.\n$ABCD$ : $4$ angles droits, mais deux longueurs. C'est un rectangle.\n$EFGH$ : $4$ côtés égaux, sans angle droit. C'est un losange.\n$IJKL$ : $4$ angles droits et $4$ côtés égaux. C'est un carré.\n$MNPQ$ : ses côtés sont tous différents. Aucun angle droit n'est donné.\nCe n'est ni un rectangle, ni un losange, ni un carré.\n⛔ Le piège : donner un nom à tout. Beaucoup de quadrilatères n'ont pas de nom spécial.\nRéponse : rectangle, losange, carré, aucun des trois.",
          schema: ecranSeulement(trace(["quadrilatère", "nature"], [["ABCD", "rectangle"], ["EFGH", "losange"], ["IJKL", "carré"], ["MNPQ", "aucun des trois"]])),
          micros: ["quadrilatere_identifier_nature", "quadrilatere_distinguer"],
        },
        {
          enonce: "Les sommets sont sur les nœuds du quadrillage.\nDonne la nature de chaque quadrilatère.\nJustifie en comptant les carreaux.",
          figure: deux(
            quad({ A: [0, 0], B: [5, 0], C: [5, 2], D: [0, 2] }, { grille: true }),
            quad({ A: [-2, 0], B: [0, -3], C: [2, 0], D: [0, 3] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, grille: true }),
          ),
          correction:
            "$ABCD$ : ses côtés suivent les lignes du quadrillage.\nLes lignes du quadrillage se coupent à angle droit.\n$ABCD$ a donc $4$ angles droits.\nSes côtés font $5$ carreaux et $2$ carreaux : ils ne sont pas tous égaux.\n$ABCD$ est un rectangle.\n$EFGH$ : pour chaque côté, je compte $2$ carreaux en largeur et $3$ en hauteur.\nChaque côté est la diagonale d'un même rectangle de $2$ sur $3$ carreaux.\nLes $4$ côtés sont donc égaux.\nÀ l'équerre, ses angles ne sont pas droits.\n$EFGH$ est un losange.\n⛔ Le piège : croire qu'un côté penché mesure $2$ ou $3$ carreaux. Je compare les « escaliers ».\nRéponse : $ABCD$ est un rectangle, $EFGH$ un losange.",
          micros: ["quadrilatere_identifier_nature", "quadrilatere_distinguer"],
        },
        {
          enonce: "Vrai ou faux ?\na) Un carré est aussi un rectangle.\nb) Un rectangle est toujours un carré.\nc) Un carré est aussi un losange.\nd) Un losange a toujours un angle droit.",
          correction:
            "a) Vrai. Un carré a $4$ angles droits. C'est ce qu'il faut pour un rectangle.\nb) Faux. Un rectangle peut avoir deux longueurs différentes.\nc) Vrai. Un carré a $4$ côtés égaux. C'est ce qu'il faut pour un losange.\nd) Faux. Un losange peut avoir des angles pointus et des angles ouverts.\n⛔ Le piège : croire qu'une figure n'a qu'un seul nom.\nLe carré a les deux codages : il est rectangle ET losange.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4] }, { droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] })),
          micros: ["quadrilatere_distinguer"],
        },
        {
          enonce: "Observe le quadrilatère $VWXY$.\na) $[VX]$ est-il un côté ou une diagonale ?\nb) Et $[WX]$ ?\nc) Quel sommet est opposé au sommet $W$ ?\nd) Le nom $VXWY$ est-il correct ?",
          figure: quad({ A: [0, 0], B: [5.2, 0.5], C: [5.8, 3.8], D: [1, 3.2] }, { noms: { A: "V", B: "W", C: "X", D: "Y" } }),
          correction:
            "Dans $VWXY$, deux lettres voisines forment un côté.\na) $V$ et $X$ ne sont pas voisins.\n$[VX]$ relie deux sommets opposés : c'est une diagonale.\nb) $W$ et $X$ sont voisins : $[WX]$ est un côté.\nc) Les voisins de $W$ sont $V$ et $X$.\nLe sommet opposé est l'autre : $Y$.\nd) Dans $VXWY$, $V$ est suivi de $X$.\nOr $[VX]$ est une diagonale : le nom est faux.\n⛔ Le piège : croire que toutes les lettres dans n'importe quel ordre vont.\nRéponse : a) une diagonale ; b) un côté ; c) $Y$ ; d) non.",
          micros: ["quadrilatere_nommer_vocabulaire"],
        },
        {
          enonce: "Un terrain de handball est un rectangle.\nIl mesure $40$ m de long et $20$ m de large.\na) Quel est son périmètre ?\nb) Est-ce un carré ? Pourquoi ?",
          figure: ecranSeulement(quad({ A: [0, 0], B: [40, 0], C: [40, 20], D: [0, 20] }, { cotes: { AB: "40 m", BC: "20 m" }, droits: ["A", "B", "C", "D"] })),
          correction:
            "a) Dans un rectangle, les côtés d'en face ont la même longueur.\nLe tour passe par deux longueurs et deux largeurs.\n$40 + 20 + 40 + 20 = 120$.\nb) Deux côtés qui se touchent mesurent $40$ m et $20$ m.\nIls ne sont pas égaux : ce n'est pas un carré.\n⛔ Le piège : faire $40 + 20 = 60$. C'est seulement la moitié du tour.\nRéponse : a) $120$ m ; b) non.",
          micros: ["quadrilatere_defi", "quadrilatere_distinguer"],
        },
        {
          enonce: "Un potager carré est entouré d'une clôture.\nLa clôture mesure $36$ m en tout.\nCombien mesure un côté du potager ?",
          correction:
            "La clôture fait le tour : c'est le périmètre.\nUn carré a $4$ côtés égaux.\nJe partage $36$ en $4$ parts égales.\n$36 \\div 4 = 9$.\nJe vérifie : $4 \\times 9 = 36$.\n⛔ Le piège : diviser par $2$. Il y a $4$ côtés, pas $2$.\nRéponse : $9$ m.",
          schema: quad({ A: [0, 0], B: [9, 0], C: [9, 9], D: [0, 9] }, { cotes: { AB: "9 m" }, trouveCotes: ["AB"], droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] }),
          micros: ["quadrilatere_defi"],
        },
        {
          enonce: "Un cadre photo est un rectangle.\nSon périmètre est de $30$ cm.\nSa longueur mesure $9$ cm.\nCombien mesure sa largeur ?",
          correction:
            "Le tour passe par deux longueurs et deux largeurs.\nUne longueur et une largeur font la moitié du tour.\n$30 \\div 2 = 15$.\nLa largeur vaut $15 - 9 = 6$.\nJe vérifie : $9 + 6 + 9 + 6 = 30$.\n⛔ Le piège : faire $30 - 9 = 21$. On oublie alors deux côtés.\nRéponse : $6$ cm.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [9, 0], C: [9, 6], D: [0, 6] }, { cotes: { AB: "9 cm", BC: "6 cm" }, trouveCotes: ["BC"], droits: ["A", "B", "C", "D"] })),
          micros: ["quadrilatere_defi"],
        },
        {
          enonce: "Léo observe cette figure.\nIl dit : « $4$ côtés égaux, donc c'est un carré. »\nA-t-il raison ?",
          figure: quad({ A: [0, 0], B: [4.5, 0], C: [6.039081, 4.228616], D: [1.539081, 4.228616] }, { angles: { A: "70°" }, egaux: [["AB", "BC", "CD", "DA"]] }),
          correction:
            "Les $4$ côtés sont codés égaux : c'est un losange.\nPour un carré, il faut aussi $4$ angles droits.\nIci, un angle mesure $70°$.\nUn angle droit mesure $90°$ : celui-ci n'est pas droit.\nCe n'est donc pas un carré.\n⛔ Le piège : oublier de regarder les angles.\nRéponse : non, c'est un losange.",
          micros: ["quadrilatere_distinguer", "quadrilatere_identifier_nature"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je fais un dessin au brouillon, puis je réponds par une phrase.",
      rappel: [
        "Rectangle : 4 angles droits. Losange : 4 côtés égaux. Carré : les deux.",
        "Un carré est aussi un rectangle et aussi un losange.",
        "Le périmètre est le tour complet de la figure.",
      ],
      exercices: [
        {
          titre: "La tablette de chocolat",
          enonce:
            "Une tablette de chocolat a $4$ rangées de $6$ carrés.\nChaque petit carré mesure $2$ cm de côté.\na) Quelle est la nature de la tablette ?\nb) Calcule sa longueur et sa largeur.\nc) Calcule son périmètre.\nd) Paul garde un morceau de $4$ rangées de $4$ carrés. Quelle est sa nature ?",
          figure: quad({ A: [0, 0], B: [6, 0], C: [6, 4], D: [0, 4] }, { grille: true, droits: ["A", "B", "C", "D"] }),
          correction:
            "a) La tablette a $4$ angles droits : c'est un rectangle.\nElle a $6$ carrés d'un côté et $4$ de l'autre.\nSes côtés ne sont pas égaux : ce n'est pas un carré.\nb) Longueur : $6 \\times 2 = 12$ cm.\nLargeur : $4 \\times 2 = 8$ cm.\nc) $12 + 8 + 12 + 8 = 40$ cm.\nd) Le morceau a $4$ carrés de chaque côté.\nSes côtés mesurent $4 \\times 2 = 8$ cm : ils sont égaux.\nIl a $4$ angles droits et $4$ côtés égaux : c'est un carré.\n⛔ Le piège : compter les carrés au lieu des centimètres.\nRéponse : a) un rectangle ; b) $12$ cm et $8$ cm ; c) $40$ cm ; d) un carré.",
          micros: ["quadrilatere_identifier_nature", "quadrilatere_distinguer", "quadrilatere_defi"],
        },
        {
          titre: "La feuille pliée",
          enonce:
            "Une feuille A4 mesure $21$ cm sur $29{,}7$ cm.\na) Est-ce un carré ? Pourquoi ?\nb) Je rabats le petit côté sur le grand côté. Je coupe la bande qui dépasse. J'obtiens un carré. Combien mesure son côté ?\nc) Quel est le périmètre de ce carré ?\nd) Quelle est la nature de la bande coupée ? Donne ses mesures.",
          correction:
            "a) La feuille a $4$ angles droits : c'est un rectangle.\nSes côtés mesurent $21$ cm et $29{,}7$ cm : ils sont différents.\nCe n'est pas un carré.\nb) Le petit côté se pose sur le grand côté.\nLe carré a donc pour côté le petit côté : $21$ cm.\nc) $4 \\times 21 = 84$ cm.\nd) La bande garde les angles droits de la feuille : c'est un rectangle.\nSa longueur est $21$ cm.\nSa largeur est ce qui dépasse : $29{,}7 - 21 = 8{,}7$ cm.\n⛔ Le piège : croire que la bande est un carré, parce qu'elle vient d'un pliage.\nRéponse : a) non ; b) $21$ cm ; c) $84$ cm ; d) un rectangle de $21$ cm sur $8{,}7$ cm.",
          schema: ecranSeulement(deux(quad({ A: [0, 0], B: [21, 0], C: [21, 21], D: [0, 21] }, { cotes: { AB: "21 cm" }, droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] }), quad({ A: [0, 0], B: [21, 0], C: [21, 8.7], D: [0, 8.7] }, { cotes: { AB: "21 cm", BC: "8,7 cm" }, trouveCotes: ["BC"], droits: ["A", "B", "C", "D"] }))),
          micros: ["quadrilatere_distinguer", "quadrilatere_identifier_nature", "quadrilatere_defi"],
        },
        {
          titre: "Compter les carrés",
          enonce:
            "Ce dessin est un grand carré, partagé en $4$ petits carrés.\na) Combien de carrés vois-tu en tout ?\nb) Combien de rectangles qui ne sont pas des carrés ?\nc) Combien de rectangles en tout ?",
          figure: quad({ A: [0, 0], B: [2, 0], C: [2, 2], D: [0, 2] }, { grille: true }),
          correction:
            "a) Je vois les $4$ petits carrés.\nLe grand carré compte aussi : $4 + 1 = 5$ carrés.\nb) Deux petits carrés côte à côte font un rectangle.\nJ'en trouve $2$ couchés : un en haut, un en bas.\nJ'en trouve $2$ debout : un à gauche, un à droite.\nCela fait $4$ rectangles qui ne sont pas des carrés.\nc) Un carré est aussi un rectangle.\nJe compte tout : $5 + 4 = 9$ rectangles.\n⛔ Le piège : oublier le grand carré.\n⚠️ Autre piège : oublier qu'un carré est aussi un rectangle.\nRéponse : a) $5$ ; b) $4$ ; c) $9$.",
          micros: ["quadrilatere_distinguer", "quadrilatere_defi"],
        },
        {
          titre: "Qui suis-je ?",
          enonce:
            "Trouve la nature de chaque quadrilatère mystère.\na) J'ai $4$ angles droits. Deux de mes côtés qui se touchent mesurent $6$ cm et $4$ cm.\nb) J'ai $4$ côtés de $5$ cm. Un de mes angles mesure $60°$.\nc) Je suis à la fois un rectangle et un losange.\nd) J'ai $4$ angles droits et mes $4$ côtés mesurent $3$ cm.",
          correction:
            "a) $4$ angles droits : je suis un rectangle.\nDeux côtés qui se touchent sont différents : je ne suis pas un carré.\nb) $4$ côtés égaux : je suis un losange.\nUn angle de $60°$ n'est pas droit : je ne suis pas un carré.\nc) Rectangle : $4$ angles droits. Losange : $4$ côtés égaux.\nLes deux à la fois : je suis un carré.\nd) $4$ angles droits et $4$ côtés égaux : je suis un carré.\n⛔ Le piège au a) : dire « carré » dès qu'on voit $4$ angles droits.\nRéponse : a) rectangle ; b) losange ; c) carré ; d) carré.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [5, 0], C: [7.5, 4.330127], D: [2.5, 4.330127] }, { cotes: { AB: "5 cm" }, angles: { A: "60°" }, egaux: [["AB", "BC", "CD", "DA"]] })),
          micros: ["quadrilatere_distinguer", "quadrilatere_defi"],
        },
      ],
    },
  ],
};
