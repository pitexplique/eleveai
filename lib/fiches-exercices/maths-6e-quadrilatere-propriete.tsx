// ─── Fiche d'exercices : propriétés des quadrilatères (6e) — 20 exercices corrigés ─
//
// Lot de 6e (30/09/2026), sur le modèle de la feuille étalon de 5e
// `maths-5e-relatif-nombre.tsx` et de sa voisine `maths-5e-parallelogramme.tsx`
// (dont `quad()` est repris, resserré sur la 6e).
//
// Pas de fiche de cours pour cette notion (aucune clé maths/6e/
// quadrilatere-propriete au registre des fiches) : `fichesCours: []`. Même
// vocabulaire que la fiche `lib/fiches/maths-6e-quadrilateres.tsx`.
// Alignée sur la banque `lib/tutor-v4/questionBank/6e/maths/quadrilateres.bank.ts`
// (lue seulement), notionId quadrilatere_propriete : lire les propriétés
// (côtés opposés égaux et parallèles, diagonales), faire le lien entre
// propriétés et nature, conclure (ou ne pas conclure), compléter ou construire,
// défis (inclusions : un carré est un rectangle ET un losange).
// ⛔ LIMITES DE LA 6e, lues dans la banque : le PARALLÉLOGRAMME n'y apparaît
// que comme un nom — « deux paires de côtés parallèles », dont rectangle,
// losange et carré sont des cas particuliers (ex. 5, 15). Aucune de ses
// propriétés de 5e (diagonales qui se coupent en leur milieu, angles opposés,
// centre de symétrie). Diagonales : rectangle = même longueur, losange =
// perpendiculaires, carré = les deux (propriétés DIRECTES seulement : jamais
// « diagonales égales, donc rectangle »). Constructions à la règle, à
// l'équerre et au compas.
// ⛔ Aucun exemple de la fiche de cours de 6e ni de la feuille sœur
// `maths-6e-quadrilatere-figure.tsx` n'est repris.
//
// PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases courtes, une idée par phrase,
// le mot de la classe. Les corrigés disent « je ».
//
// Les pièges nommés : les 4 côtés d'un rectangle crus égaux (1), des côtés
// « penchés » crus plus courts (2), chercher un calcul au lieu d'une propriété
// (3), la perpendicularité réservée au carré (4), « rectangle » quand « carré »
// est plus précis (5), conclure sans l'information des angles (6, 15), placer
// un sommet à l'œil (7, 12, 14), l'équerre oubliée (8), ajouter ce que la
// figure a déjà (9), mélanger les deux propriétés des diagonales (10), deux
// côtés opposés égaux crus suffisants (13), un carré « sur la pointe » cru
// seulement losange (18), une figure qui changerait de nature en s'aplatissant
// (19), un sommet oublié à sa place (20).
//
// Aucun fait réel à vérifier : le terrain, le foulard, les pailles, le jardin
// partagé sont des MODÈLES.
//
// ⭐ LES DESSINS : `quad()` de la feuille voisine, avec en plus les chevrons
// (côtés parallèles), l'angle droit au croisement des diagonales, un sommet
// caché (`ouvert` : le quadrilatère à compléter) et un cadre gris (`cadre` :
// le foulard). Un diagramme de Venn range les natures. Le script MESURE chaque
// codage et simule la place des étiquettes. 14 dessins imprimés ; ceux qui
// redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-quadrilatere-propriete.mjs`.
//
// Micro-compétences : quadrilatere_lire_propriete (1, 2, 3, 4, 10, 17, 18,
// 20), quadrilatere_lien_propriete (5, 15, 16, 19), quadrilatere_conclusion
// (6, 9, 13, 15, 17, 18, 19), quadrilatere_completer_construire (7, 8, 9, 11,
// 12, 14, 20), quadrilatere_propriete_defi (10, 13, 16, 17, 18, 19). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { venn } from "@/lib/fiches-exercices/figures";

type P2 = [number, number];
type S = "A" | "B" | "C" | "D";
type Cote = "AB" | "BC" | "CD" | "DA";
type Ancre = "start" | "middle" | "end";

const ENCRE = "#0f172a";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const BLEU = "#0369a1";
const VERT = "#16a34a";
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
/** Le point de croisement des droites (AC) et (BD). */
const croisement = (a: P2, c: P2, b: P2, d: P2): P2 => {
  const r: P2 = [c[0] - a[0], c[1] - a[1]], s: P2 = [d[0] - b[0], d[1] - b[1]];
  const den = r[0] * s[1] - r[1] * s[0] || 1;
  const t = ((b[0] - a[0]) * s[1] - (b[1] - a[1]) * s[0]) / den;
  return [a[0] + t * r[0], a[1] + t * r[1]];
};

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
 * `egaux` et `paralleles` : des groupes de côtés — le groupe n° i reçoit i + 1
 * traits (ou chevrons). `diagDroit` : l'angle droit au croisement des
 * diagonales. `ouvert` : le sommet D est caché (le quadrilatère à compléter).
 * `cadre` : un quadrilatère gris en pointillés autour (le foulard).
 * `grille` : le quadrillage, un carreau par unité.
 * ⛔ Texte NU (« 7 cm », « 50° ») : SVG, pas de KaTeX.
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
    paralleles?: Cote[][];
    diagonales?: boolean;
    centre?: string;
    diagDroit?: boolean;
    grille?: boolean;
    ouvert?: boolean;
    cadre?: P2[];
  } = {},
) => {
  const cadre = opts.cadre ?? [];
  const reels: P2[] = [...SOMMETS.map((k) => pts[k]), ...cadre];
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P = { A: px(pts.A), B: px(pts.B), C: px(pts.C), D: px(pts.D) };
  const G: P2 = [(P.A[0] + P.B[0] + P.C[0] + P.D[0]) / 4, (P.A[1] + P.B[1] + P.C[1] + P.D[1]) / 4];
  const avecDiag = !!(opts.diagonales || opts.centre || opts.diagDroit);
  const O = croisement(P.A, P.C, P.B, P.D);
  const visibles: S[] = opts.ouvert ? ["A", "B", "C"] : SOMMETS;

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
  /** `n` chevrons au milieu de [pq], tous tournés dans le même sens. */
  const chevrons = (p: P2, q: P2, n: number, key: string) => {
    const M = milieu(p, q);
    let t = unit(q[0] - p[0], q[1] - p[1]);
    if (t[0] < -1e-9 || (Math.abs(t[0]) < 1e-9 && t[1] < 0)) t = [-t[0], -t[1]];
    const nn: P2 = [-t[1], t[0]];
    return (
      <g key={key}>
        {Array.from({ length: n }, (_, i) => {
          const d = (i - (n - 1) / 2) * 5 + 3;
          const c: P2 = [M[0] + t[0] * d, M[1] + t[1] * d];
          const a: P2 = [c[0] - t[0] * 6 + nn[0] * 5, c[1] - t[1] * 6 + nn[1] * 5];
          const b: P2 = [c[0] - t[0] * 6 - nn[0] * 5, c[1] - t[1] * 6 - nn[1] * 5];
          return <polyline key={i} points={`${a.join(",")} ${c.join(",")} ${b.join(",")}`} fill="none" stroke={VERT} strokeWidth={2.2} />;
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
        {cadre.length ? <polygon points={cadre.map((p) => px(p).join(",")).join(" ")} fill="none" stroke={GRIS} strokeWidth={2} strokeDasharray="6 4" /> : null}
        {opts.ouvert ? (
          <polyline points={visibles.map((k) => P[k].join(",")).join(" ")} fill="none" stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
        ) : (
          <polygon points={SOMMETS.map((k) => P[k].join(",")).join(" ")} fill={opts.grille || cadre.length ? "none" : "#f8fafc"} stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
        )}
        {avecDiag ? (
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
        {opts.diagDroit ? equerre(O, P.A, P.B, "dO") : null}
        {(opts.egaux ?? []).flatMap((groupe, i) => groupe.map((c) => traits(P[c[0] as S], P[c[1] as S], i + 1, `e${i}${c}`)))}
        {(opts.paralleles ?? []).flatMap((groupe, i) => groupe.map((c) => chevrons(P[c[0] as S], P[c[1] as S], i + 1, `p${i}${c}`)))}
        {COTES.map((c) => {
          const t = opts.cotes?.[c];
          if (!t) return null;
          const [p, q] = [P[c[0] as S], P[c[1] as S]];
          const M = milieu(p, q);
          let n = unit(-(q[1] - p[1]), q[0] - p[0]);
          if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
          return etiquette(M[0] + n[0] * 14, M[1] + n[1] * 14, t, (opts.trouveCotes ?? []).includes(c) ? ORANGE : BLEU, 14, ancre(n[0]), `c${c}`);
        })}
        {avecDiag ? <circle cx={O[0]} cy={O[1]} r={3} fill={ENCRE} /> : null}
        {opts.centre ? etiquette(O[0] + 9, O[1] - 11, opts.centre, ENCRE, 15, "start", "centre") : null}
        {visibles.map((k) => {
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

export const exercicesQuadrilaterePropriete6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "quadrilatere-propriete",
  titre: "Propriétés des quadrilatères",
  accroche:
    "Vingt exercices sur les propriétés du rectangle, du losange et du carré. Lire les côtés et les diagonales, conclure (ou pas), compléter une figure sur quadrillage, construire à l'équerre et au compas. Un terrain, un foulard, des pailles, un jardin. Un rappel avant chaque niveau. Cherche d'abord, puis ouvre la correction : étape par étape, avec la figure et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une propriété par exercice. Je lis la figure et je cite la propriété.",
      rappel: [
        "Rectangle : 4 angles droits. Ses côtés opposés sont égaux et parallèles.",
        "Losange : 4 côtés égaux. Ses côtés opposés sont parallèles.",
        "Diagonales : même longueur dans un rectangle, perpendiculaires dans un losange.",
        "Le carré a toutes ces propriétés à la fois.",
      ],
      exercices: [
        {
          enonce: "$ABCD$ est un rectangle.\na) Combien mesurent $[CD]$ et $[DA]$ ?\nb) Combien a-t-il de paires de côtés parallèles ?",
          figure: quad({ A: [0, 0], B: [7, 0], C: [7, 4], D: [0, 4] }, { cotes: { AB: "7 cm", BC: "4 cm" }, droits: ["A", "B", "C", "D"] }),
          correction:
            "a) Dans un rectangle, les côtés opposés ont la même longueur.\n$[CD]$ est opposé à $[AB]$ : $CD = 7$ cm.\n$[DA]$ est opposé à $[BC]$ : $DA = 4$ cm.\nb) Les côtés opposés d'un rectangle sont parallèles.\n$[AB]$ va avec $[CD]$. $[BC]$ va avec $[DA]$.\nCela fait $2$ paires.\n⛔ Le piège : croire que les $4$ côtés d'un rectangle sont égaux.\nRéponse : a) $CD = 7$ cm et $DA = 4$ cm ; b) $2$ paires.",
          micros: ["quadrilatere_lire_propriete"],
        },
        {
          enonce: "$EFGH$ est un losange. Le côté $[EF]$ mesure $6$ cm.\na) Combien mesurent ses trois autres côtés ?\nb) Calcule son périmètre.",
          figure: ecranSeulement(quad({ A: [0, 0], B: [6, 0], C: [8.53571, 5.437847], D: [2.53571, 5.437847] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, cotes: { AB: "6 cm" }, egaux: [["AB", "BC", "CD", "DA"]] })),
          correction:
            "a) Un losange a $4$ côtés de même longueur.\nLes trois autres côtés mesurent aussi $6$ cm.\nb) Le périmètre est le tour complet.\n$4 \\times 6 = 24$.\n⛔ Le piège : croire que les côtés « penchés » sont plus courts.\nRéponse : a) $6$ cm chacun ; b) $24$ cm.",
          micros: ["quadrilatere_lire_propriete"],
        },
        {
          enonce: "$RSTU$ est un rectangle.\nSa diagonale $[RT]$ mesure $10$ cm.\nCombien mesure l'autre diagonale ?",
          figure: quad({ A: [0, 0], B: [8, 0], C: [8, 6], D: [0, 6] }, { noms: { A: "R", B: "S", C: "T", D: "U" }, droits: ["A", "B", "C", "D"], diagonales: true }),
          correction:
            "Les deux diagonales sont $[RT]$ et $[SU]$.\nDans un rectangle, les diagonales ont la même longueur.\nDonc $SU = 10$ cm.\n⭐ Je peux vérifier avec le compas sur la figure.\n⛔ Le piège : chercher un calcul. Il suffit de connaître la propriété.\nRéponse : $SU = 10$ cm.",
          micros: ["quadrilatere_lire_propriete"],
        },
        {
          enonce: "Les diagonales de ce losange se coupent en $O$.\nQuel angle font-elles entre elles ?\nVérifie avec ton équerre.",
          figure: quad({ A: [-4, 0], B: [0, -2.5], C: [4, 0], D: [0, 2.5] }, { egaux: [["AB", "BC", "CD", "DA"]], centre: "O" }),
          correction:
            "Dans un losange, les diagonales sont perpendiculaires.\nElles se coupent donc à angle droit.\nL'angle vaut $90°$.\n⛔ Le piège : croire que c'est vrai seulement pour un carré.\nRéponse : $90°$, un angle droit.",
          schema: ecranSeulement(quad({ A: [-4, 0], B: [0, -2.5], C: [4, 0], D: [0, 2.5] }, { egaux: [["AB", "BC", "CD", "DA"]], centre: "O", diagDroit: true })),
          micros: ["quadrilatere_lire_propriete"],
        },
        {
          enonce: "Donne la nature de chaque quadrilatère.\na) Il a $4$ angles droits.\nb) Il a $4$ côtés égaux.\nc) Il a $4$ angles droits et $4$ côtés égaux.\nd) Ses côtés opposés sont parallèles, deux à deux.",
          correction:
            "a) $4$ angles droits : c'est un rectangle.\nb) $4$ côtés égaux : c'est un losange.\nc) Les deux à la fois : c'est un carré.\nd) Deux paires de côtés parallèles : c'est un parallélogramme.\n⭐ Rectangle, losange et carré sont des parallélogrammes particuliers.\n⛔ Le piège au c) : répondre « rectangle ». C'est vrai, mais « carré » est plus précis.\nRéponse : a) rectangle ; b) losange ; c) carré ; d) parallélogramme.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [5, 0], C: [6.5, 3], D: [1.5, 3] }, { paralleles: [["AB", "CD"], ["BC", "DA"]] })),
          micros: ["quadrilatere_lien_propriete"],
        },
        {
          enonce: "Un quadrilatère a $4$ côtés égaux.\nPeut-on être sûr que c'est un carré ?\nObserve les deux figures.",
          figure: deux(
            quad({ A: [0, 0], B: [4, 0], C: [6, 3.464102], D: [2, 3.464102] }, { egaux: [["AB", "BC", "CD", "DA"]] }),
            quad({ A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4] }, { egaux: [["AB", "BC", "CD", "DA"]], droits: ["A", "B", "C", "D"] }),
          ),
          correction:
            "Les deux figures ont $4$ côtés égaux.\nLa première n'a pas d'angle droit : c'est un losange.\nLa seconde a $4$ angles droits : c'est un carré.\nAvec $4$ côtés égaux seulement, je ne sais pas laquelle c'est.\nIl manque une information sur les angles.\nRéponse : non. On peut seulement dire que c'est un losange.",
          micros: ["quadrilatere_conclusion"],
        },
        {
          enonce: "On veut un carré $ABCD$.\nOn a déjà placé $A$, $B$ et $C$ sur le quadrillage.\nOù placer le point $D$ ?",
          figure: quad({ A: [0, 0], B: [3, 0], C: [3, 3], D: [0, 3] }, { grille: true, ouvert: true, droits: ["B"], egaux: [["AB", "BC"]] }),
          correction:
            "$[AB]$ et $[BC]$ mesurent $3$ carreaux. L'angle en $B$ est droit.\nDans un carré, $[DA]$ est parallèle à $[BC]$ et de même longueur.\nJe pars de $A$ et je monte de $3$ carreaux : c'est $D$.\nJe vérifie : $[CD]$ fait bien $3$ carreaux.\n⛔ Le piège : placer $D$ à l'œil, sans compter les carreaux.\nRéponse : $D$ est $3$ carreaux au-dessus de $A$.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [3, 0], C: [3, 3], D: [0, 3] }, { grille: true, droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] })),
          micros: ["quadrilatere_completer_construire"],
        },
        {
          enonce: "Construis un carré $ABCD$ de côté $4$ cm.\nÉcris les étapes, avec les instruments.",
          correction:
            "Je trace $[AB]$ de $4$ cm à la règle.\nEn $B$, je trace un angle droit avec l'équerre.\nJe place $C$ sur ce trait, à $4$ cm de $B$.\nEn $A$, je trace un angle droit, du même côté.\nJe place $D$ à $4$ cm de $A$.\nJe relie $C$ et $D$.\n⭐ Contrôle : $[CD]$ mesure $4$ cm.\n⛔ Le piège : tracer les angles droits à l'œil, sans équerre.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4] }, { cotes: { AB: "4 cm" }, droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] })),
          micros: ["quadrilatere_completer_construire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je cite chaque propriété avant de conclure.",
      rappel: [
        "Pour conclure « carré », il faut les angles droits ET les côtés égaux.",
        "Une information manque ? Je ne conclus pas au hasard.",
        "Pour construire : la règle mesure, l'équerre fait les angles droits, le compas reporte les longueurs.",
      ],
      exercices: [
        {
          enonce: "a) Que faut-il ajouter à un rectangle pour être sûr que c'est un carré ?\nb) Que faut-il ajouter à un losange pour être sûr que c'est un carré ?",
          figure: ecranSeulement(deux(quad({ A: [0, 0], B: [5, 0], C: [5, 3], D: [0, 3] }, { droits: ["A", "B", "C", "D"] }), quad({ A: [0, 0], B: [4, 0], C: [6.571150, 3.064178], D: [2.571150, 3.064178] }, { egaux: [["AB", "BC", "CD", "DA"]] }))),
          correction:
            "Un carré a $4$ angles droits ET $4$ côtés égaux.\na) Le rectangle a déjà ses $4$ angles droits.\nIl lui manque les $4$ côtés égaux.\nSes côtés opposés sont déjà égaux.\nIl suffit donc que deux côtés qui se touchent soient égaux.\nb) Le losange a déjà ses $4$ côtés égaux.\nIl lui manque les $4$ angles droits.\n⛔ Le piège : ajouter ce que la figure a déjà.\nRéponse : a) des côtés égaux ; b) des angles droits.",
          micros: ["quadrilatere_completer_construire", "quadrilatere_conclusion"],
        },
        {
          enonce: "Vrai ou faux ?\na) Les diagonales d'un carré ont la même longueur.\nb) Les diagonales d'un losange ont toujours la même longueur.\nc) Les diagonales d'un rectangle sont toujours perpendiculaires.\nd) Les diagonales d'un carré sont perpendiculaires.",
          correction:
            "a) Vrai. Un carré est un rectangle : ses diagonales ont la même longueur.\nb) Faux. Sur la figure, une diagonale du losange est plus longue que l'autre.\nc) Faux. Sur la figure, les diagonales du rectangle ne font pas un angle droit.\nd) Vrai. Un carré est un losange : ses diagonales sont perpendiculaires.\n⛔ Le piège : mélanger les deux propriétés.\nRectangle : même longueur. Losange : perpendiculaires. Carré : les deux.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai.",
          schema: ecranSeulement(deux(quad({ A: [0, 0], B: [6, 0], C: [6, 3], D: [0, 3] }, { droits: ["A", "B", "C", "D"], diagonales: true }), quad({ A: [-3.5, 0], B: [0, -2], C: [3.5, 0], D: [0, 2] }, { egaux: [["AB", "BC", "CD", "DA"]], diagDroit: true }))),
          micros: ["quadrilatere_lire_propriete", "quadrilatere_propriete_defi"],
        },
        {
          enonce: "Construis un rectangle $EFGH$ de $6$ cm sur $3{,}5$ cm.\nÉcris les étapes, puis calcule son périmètre.",
          correction:
            "Je trace $[EF]$ de $6$ cm.\nEn $E$ et en $F$, je trace deux angles droits à l'équerre.\nJe place $H$ à $3{,}5$ cm de $E$.\nJe place $G$ à $3{,}5$ cm de $F$, du même côté.\nJe relie $G$ et $H$.\n⭐ Contrôle : $[GH]$ mesure bien $6$ cm.\nPérimètre : $6 + 3{,}5 + 6 + 3{,}5 = 19$ cm.\n⛔ Le piège : placer $G$ et $H$ de part et d'autre de $[EF]$.\nRéponse : le périmètre vaut $19$ cm.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [6, 0], C: [6, 3.5], D: [0, 3.5] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, cotes: { AB: "6 cm", BC: "3,5 cm" }, droits: ["A", "B", "C", "D"] })),
          micros: ["quadrilatere_completer_construire"],
        },
        {
          enonce: "Construis un losange $ABCD$ de côté $4$ cm.\nTu choisis l'angle en $A$.\nÉcris les étapes.",
          correction:
            "Je trace $[AB]$ de $4$ cm.\nEn $A$, je trace un autre côté de $4$ cm, un peu penché : c'est $[AD]$.\nIl manque le point $C$.\n$C$ est à $4$ cm de $B$ et à $4$ cm de $D$.\nJ'ouvre le compas à $4$ cm. Je trace un arc autour de $B$.\nJe trace un autre arc autour de $D$.\n$C$ est là où les deux arcs se croisent.\nJe relie $B$, $C$ et $D$.\n⛔ Le piège : placer $C$ à l'œil. Le compas garde les $4$ côtés égaux.",
          schema: quad({ A: [0, 0], B: [4, 0], C: [6.571150, 3.064178], D: [2.571150, 3.064178] }, { cotes: { AB: "4 cm" }, angles: { A: "50°" }, egaux: [["AB", "BC", "CD", "DA"]] }),
          micros: ["quadrilatere_completer_construire"],
        },
        {
          enonce: "Les deux quadrilatères ont $4$ angles droits.\nOn connaît deux côtés de chacun.\nLequel est sûrement un carré ?",
          figure: deux(
            quad({ A: [0, 0], B: [5, 0], C: [5, 5], D: [0, 5] }, { noms: { A: "I", B: "J", C: "K", D: "L" }, cotes: { AB: "5 cm", BC: "5 cm" }, droits: ["A", "B", "C", "D"] }),
            quad({ A: [0, 0], B: [5, 0], C: [5, 4], D: [0, 4] }, { noms: { A: "M", B: "N", C: "P", D: "Q" }, cotes: { AB: "5 cm", CD: "5 cm" }, droits: ["A", "B", "C", "D"] }),
          ),
          correction:
            "Les deux ont $4$ angles droits : ce sont des rectangles.\nDans $IJKL$, $[IJ]$ et $[JK]$ se touchent en $J$.\nIls mesurent tous les deux $5$ cm.\nLes côtés opposés d'un rectangle sont égaux : les $4$ côtés font $5$ cm.\n$IJKL$ est donc un carré.\nDans $MNPQ$, $[MN]$ et $[PQ]$ ne se touchent pas : ils sont opposés.\nDans tout rectangle, ils sont égaux. Cela n'apprend rien de plus.\nPour $MNPQ$, on ne peut pas dire « carré ».\n⛔ Le piège : voir deux fois « $5$ cm » et conclure « carré » dans les deux cas.\nRéponse : seul $IJKL$ est sûrement un carré.",
          micros: ["quadrilatere_conclusion", "quadrilatere_propriete_defi"],
        },
        {
          enonce: "On veut un losange $ABCD$.\nOn a déjà placé $A$, $B$ et $C$ sur le quadrillage.\nOù placer le point $D$ ?",
          figure: quad({ A: [-3, 0], B: [0, -2], C: [3, 0], D: [0, 2] }, { grille: true, ouvert: true, egaux: [["AB", "BC"]] }),
          correction:
            "De $A$ à $B$ : $3$ carreaux à droite, $2$ vers le bas.\nDe $B$ à $C$ : $3$ carreaux à droite, $2$ vers le haut.\nChaque côté est la diagonale d'un rectangle de $3$ sur $2$ carreaux.\nPour $[CD]$, je fais $3$ carreaux à gauche et $2$ vers le haut.\nPuis pour $[DA]$ : $3$ à gauche et $2$ vers le bas. Je retombe sur $A$.\nLes $4$ côtés sont égaux : $ABCD$ est bien un losange.\n⛔ Le piège : placer $D$ pour faire un carré bien droit.\nRéponse : $D$ est $3$ carreaux à gauche de $C$ et $2$ carreaux plus haut.",
          schema: ecranSeulement(quad({ A: [-3, 0], B: [0, -2], C: [3, 0], D: [0, 2] }, { grille: true, egaux: [["AB", "BC", "CD", "DA"]] })),
          micros: ["quadrilatere_completer_construire"],
        },
        {
          enonce: "Observe les codages de $KLMN$.\na) Combien de paires de côtés parallèles sont codées ?\nb) Quelle est la nature de $KLMN$ ?\nc) Peut-on dire que c'est un rectangle ?",
          figure: quad({ A: [0, 0], B: [5.5, 0], C: [7, 3.2], D: [1.5, 3.2] }, { noms: { A: "K", B: "L", C: "M", D: "N" }, paralleles: [["AB", "CD"], ["BC", "DA"]] }),
          correction:
            "a) Les petites flèches vertes marquent des côtés parallèles.\n$[KL]$ et $[MN]$ en ont une. $[LM]$ et $[NK]$ en ont deux.\nCela fait $2$ paires.\nb) Deux paires de côtés parallèles : c'est un parallélogramme.\nc) Aucun angle droit n'est codé.\nJe ne peux donc pas dire que c'est un rectangle.\n⛔ Le piège : conclure « rectangle » dès qu'on voit des côtés parallèles.\nRéponse : a) $2$ paires ; b) un parallélogramme ; c) non.",
          micros: ["quadrilatere_lien_propriete", "quadrilatere_conclusion"],
        },
        {
          enonce:
            "Dans ce diagramme, un cercle contient les rectangles, l'autre les losanges.\n$ABCD$ est un rectangle de $8$ cm sur $2$ cm.\n$IJKL$ est un carré.\n$EFGH$ est un losange sans angle droit.\n$MNPQ$ a des côtés de $2$, $3$, $4$ et $5$ cm.\na) Pourquoi $IJKL$ est-il dans les deux cercles ?\nb) Pourquoi $ABCD$ n'est-il pas dans le cercle des losanges ?\nc) Pourquoi $MNPQ$ est-il en dehors des deux cercles ?",
          figure: venn({ aSeul: ["ABCD"], commun: ["IJKL"], bSeul: ["EFGH"], dehors: ["MNPQ"] }, { a: "rectangle", b: "losange", e: "quadrilatères" }),
          correction:
            "a) $IJKL$ est un carré. Il a $4$ angles droits : c'est un rectangle.\nIl a aussi $4$ côtés égaux : c'est un losange.\nIl va donc dans les deux cercles, au milieu.\nb) $ABCD$ a des côtés de $8$ cm et de $2$ cm.\nSes $4$ côtés ne sont pas égaux : ce n'est pas un losange.\nc) Les côtés de $MNPQ$ sont tous différents : ce n'est pas un losange.\nSes côtés opposés ne sont pas égaux : ce n'est pas un rectangle.\n⛔ Le piège : ranger le carré dans un seul cercle.\nRéponse : le carré est à la fois rectangle et losange.",
          micros: ["quadrilatere_propriete_defi", "quadrilatere_lien_propriete"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je fais un dessin au brouillon et je cite les propriétés.",
      rappel: [
        "Côtés opposés égaux et parallèles, pour le rectangle comme pour le losange.",
        "Rectangle : diagonales de même longueur. Losange : diagonales perpendiculaires.",
        "Un carré est à la fois un rectangle et un losange.",
      ],
      exercices: [
        {
          titre: "Le terrain de sport",
          enonce:
            "Un jardinier trace un terrain de sport rectangulaire.\nIl mesure $100$ m sur $60$ m.\na) Quel est son périmètre ?\nb) Il trace la ligne du milieu, parallèle aux petits côtés. Quelle est la nature de chaque moitié ? Donne ses mesures.\nc) Il mesure les deux diagonales : $115$ m et $118$ m. Son terrain est-il un vrai rectangle ?",
          figure: ecranSeulement(quad({ A: [0, 0], B: [100, 0], C: [100, 60], D: [0, 60] }, { cotes: { AB: "100 m", BC: "60 m" }, droits: ["A", "B", "C", "D"], diagonales: true })),
          correction:
            "a) Les côtés opposés d'un rectangle sont égaux.\n$100 + 60 + 100 + 60 = 320$ m.\nb) La ligne du milieu coupe la longueur en deux : $100 \\div 2 = 50$ m.\nChaque moitié garde les angles droits : c'est un rectangle.\nIl mesure $50$ m sur $60$ m.\nc) Dans un rectangle, les deux diagonales ont la même longueur.\nIci, $115$ m et $118$ m sont différents.\nLe terrain n'est donc pas un vrai rectangle.\n⛔ Le piège au b) : croire que chaque moitié est un carré.\nRéponse : a) $320$ m ; b) un rectangle de $50$ m sur $60$ m ; c) non.",
          micros: ["quadrilatere_lire_propriete", "quadrilatere_conclusion", "quadrilatere_propriete_defi"],
        },
        {
          titre: "Le foulard",
          enonce:
            "Un foulard carré mesure $80$ cm de côté. Sur le dessin, un carreau vaut $20$ cm.\nOn marque le milieu de chaque bord : $M$, $N$, $P$ et $Q$.\nOn coud un galon qui relie ces quatre points.\na) Combien de carreaux mesure un bord du foulard ?\nb) Compare les quatre côtés de $MNPQ$.\nc) Vérifie ses angles à l'équerre. Quelle est la nature de $MNPQ$ ?",
          figure: quad({ A: [2, 0], B: [4, 2], C: [2, 4], D: [0, 2] }, { noms: { A: "M", B: "N", C: "P", D: "Q" }, grille: true, cadre: [[0, 0], [4, 0], [4, 4], [0, 4]] }),
          correction:
            "a) $80 \\div 20 = 4$ carreaux.\nb) Chaque côté de $MNPQ$ traverse un carré de $2$ carreaux sur $2$.\nC'est chaque fois la diagonale d'un même carré.\nLes $4$ côtés sont donc égaux : $MNPQ$ est un losange.\nc) À l'équerre, les $4$ angles sont droits.\nUn losange avec $4$ angles droits est un carré.\n⛔ Le piège : croire qu'un carré posé sur la pointe est seulement un losange.\nRéponse : a) $4$ carreaux ; b) ils sont égaux ; c) un carré.",
          schema: ecranSeulement(quad({ A: [2, 0], B: [4, 2], C: [2, 4], D: [0, 2] }, { noms: { A: "M", B: "N", C: "P", D: "Q" }, grille: true, cadre: [[0, 0], [4, 0], [4, 4], [0, 4]], droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] })),
          micros: ["quadrilatere_propriete_defi", "quadrilatere_conclusion", "quadrilatere_lire_propriete"],
        },
        {
          titre: "Les pailles",
          enonce:
            "Léna relie $4$ pailles de $12$ cm avec des trombones. Son quadrilatère peut se déformer.\na) Quelle est sa nature ? Quel est son périmètre ?\nb) Elle l'écrase un peu. Est-ce toujours la même nature ?\nc) Peut-elle obtenir un carré ? Comment ?\nd) Peut-elle obtenir un rectangle qui n'est pas un carré ?",
          figure: ecranSeulement(deux(quad({ A: [0, 0], B: [12, 0], C: [19.713451, 9.192533], D: [7.713451, 9.192533] }, { cotes: { AB: "12 cm" }, egaux: [["AB", "BC", "CD", "DA"]] }), quad({ A: [0, 0], B: [12, 0], C: [12, 12], D: [0, 12] }, { cotes: { AB: "12 cm" }, egaux: [["AB", "BC", "CD", "DA"]], droits: ["A", "B", "C", "D"] }))),
          correction:
            "a) $4$ côtés de $12$ cm : c'est un losange.\n$4 \\times 12 = 48$ cm.\nb) Les pailles gardent leur longueur.\nLes $4$ côtés restent égaux : c'est toujours un losange.\nc) Oui. Elle le redresse jusqu'à ce que ses angles soient droits.\nAvec $4$ côtés égaux et $4$ angles droits, c'est un carré.\nd) Non. Ses côtés restent tous égaux.\nUn rectangle avec $4$ côtés égaux est forcément un carré.\n⛔ Le piège : croire que la figure change de nature quand elle s'aplatit.\nRéponse : a) un losange, $48$ cm ; b) oui ; c) oui, avec des angles droits ; d) non.",
          micros: ["quadrilatere_lien_propriete", "quadrilatere_conclusion", "quadrilatere_propriete_defi"],
        },
        {
          titre: "Le jardin partagé",
          enonce:
            "Un jardin partagé est clôturé par des piquets. Un carreau vaut $1$ m.\nOn a planté les piquets $A$, $B$ et $C$.\na) Où planter $D$ pour que le jardin soit un rectangle ?\nb) Quelle longueur de grillage faut-il pour faire le tour ?\nc) On veut plutôt un jardin carré. On garde $A$ et $B$. Où placer $C$ et $D$ ?",
          figure: quad({ A: [0, 0], B: [6, 0], C: [6, 4], D: [0, 4] }, { grille: true, ouvert: true, droits: ["B"] }),
          correction:
            "a) $[AB]$ fait $6$ carreaux. $[BC]$ fait $4$ carreaux.\nL'angle en $B$ est droit.\nDans un rectangle, $[DA]$ est parallèle à $[BC]$ et de même longueur.\nJe monte de $4$ carreaux au-dessus de $A$ : c'est $D$.\nb) $6 + 4 + 6 + 4 = 20$ m.\nc) Un carré a $4$ côtés égaux : chaque côté fait $6$ m, comme $[AB]$.\nJe place $C$ à $6$ carreaux au-dessus de $B$.\nJe place $D$ à $6$ carreaux au-dessus de $A$.\n⛔ Le piège au c) : laisser $C$ à sa place. $[BC]$ ne ferait que $4$ m.\nRéponse : a) $4$ carreaux au-dessus de $A$ ; b) $20$ m ; c) $6$ carreaux au-dessus de $B$ et de $A$.",
          schema: ecranSeulement(deux(quad({ A: [0, 0], B: [6, 0], C: [6, 4], D: [0, 4] }, { grille: true, droits: ["A", "B", "C", "D"] }), quad({ A: [0, 0], B: [6, 0], C: [6, 6], D: [0, 6] }, { grille: true, droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] }))),
          micros: ["quadrilatere_completer_construire", "quadrilatere_lire_propriete"],
        },
      ],
    },
  ],
};
