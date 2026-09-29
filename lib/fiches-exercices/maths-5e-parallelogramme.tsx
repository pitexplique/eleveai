// ─── Fiche d'exercices : le parallélogramme (5e) — 20 exercices corrigés ───────
//
// Lot de 5e (29/09/2026), sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-parallelogramme.tsx` et
// sur la banque `lib/tutor-v4/questionBank/5e/maths/parallelogrammes.bank.ts`
// (lue seulement), notionId parallelogramme : reconnaître (définition, et les
// diagonales qui se coupent en leur milieu), côtés et angles opposés égaux,
// angles consécutifs supplémentaires, diagonales et centre de symétrie,
// losange / rectangle / carré, construire, défis.
// ⛔ LIMITES DE LA 5e : l'AIRE du parallélogramme appartient à la notion
// aire_surface — elle n'est pas ici. Ni Pythagore (aucune longueur oblique
// calculée : un côté de losange se lit ou se donne), ni démonstration formelle
// de 4e. Pas d'équation : un angle se trouve par soustraction ou par partage.
// ⛔ Aucun exemple de la fiche de cours ni de la banque n'est repris (ni 70°,
// ni 55°, ni AO = 4 cm, ni BO = 3 cm, ni 9 × 5, ni AB = 6, BC = 4 et 60°), ni
// aucun de la feuille de 4e (`maths-4e-parallelogrammes.tsx`).
//
// Les pièges nommés : un trapèze pris pour un parallélogramme (1, 10), le
// demi-périmètre (2), l'angle opposé calculé comme un consécutif (3, 9), la
// diagonale entière au lieu de sa moitié (4, 13), l'image d'un côté prise sur
// le côté voisin (5), « diagonales perpendiculaires, donc carré » (6, 11),
// l'angle posé au mauvais sommet (7), D placé en suivant l'ordre A, B, C, D
// sans le centre (8), un losange « penché » pris pour un carré (12), des
// diagonales égales qui suffiraient (14), les deux diagonales qui doivent se
// couper en leur MILIEU (15, 16), un angle droit qui ne tiendrait pas quand on
// pousse (17), 6 losanges obtus autour d'un point (18), MM' cru égal à OM
// (19), les diagonales crues égales après la poussée (20).
//
// Aucun fait réel chiffré : le portail extensible, le pavage de losanges, le
// cadre qu'on pousse sont des MODÈLES.
//
// ⭐ LES DESSINS : `quad()` est le SVG local de la feuille de 4e, resserré sur
// la 5e : VRAIES coordonnées des quatre sommets (y vers le haut), côtés
// parallèles (chevrons), côtés égaux (traits), angles en degrés (l'angle
// TROUVÉ en orange), angles droits, diagonales, centre, moitiés de diagonales
// étiquetées ou codées, points nommés. Étiquettes en 14, bornées au cadre. Le
// script MESURE chaque angle, côté et moitié de diagonale étiquetés, contrôle
// chaque codage (parallèles, égaux, angles droits, diagonales perpendiculaires)
// et simule la place des étiquettes. 14 dessins imprimés ; ceux qui redisent le
// corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je repère »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-parallelogramme.mjs`.
//
// Micro-compétences : para_reconnaitre (1, 10, 14, 19), para_cotes_angles (2,
// 3, 7, 9, 12, 17, 18, 20), para_diagonales (4, 5, 8, 10, 11, 13, 16, 19, 20),
// para_particuliers (6, 11, 12, 13, 14, 15, 16, 17, 18, 20), para_construire
// (7, 8, 15, 16), para_defi (9, 14, 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type S = "A" | "B" | "C" | "D";
type Cote = "AB" | "BC" | "CD" | "DA";
type Demi = "OA" | "OB" | "OC" | "OD";
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
 * traits (ou chevrons). `demi` étiquette les moitiés de diagonales O→sommet,
 * `moities` les code (traits orange). `diagDroit` : l'angle droit au centre.
 * ⛔ Texte NU (« 6,5 cm », « 117° ») : SVG, pas de KaTeX.
 * ⭐ Le script de recalcul relit cet appel : l'écrire sur UNE ligne, en clair.
 */
const quad = (
  pts: Record<S, P2>,
  opts: {
    noms?: Partial<Record<S, string>>;
    cotes?: Partial<Record<Cote, string>>;
    trouveCotes?: Cote[];
    angles?: Partial<Record<S, string>>;
    trouve?: S[];
    droits?: S[];
    egaux?: Cote[][];
    paralleles?: Cote[][];
    diagonales?: boolean;
    centre?: string;
    demi?: Partial<Record<Demi, string>>;
    trouveDemi?: Demi[];
    moities?: Demi[][];
    diagDroit?: boolean;
    points?: { en: P2; nom: string; vers?: "haut" | "bas" | "gauche" | "droite" }[];
  } = {},
) => {
  const reels: P2[] = [...SOMMETS.map((k) => pts[k]), ...(opts.points ?? []).map((p) => p.en)];
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P = { A: px(pts.A), B: px(pts.B), C: px(pts.C), D: px(pts.D) };
  const G: P2 = [(P.A[0] + P.B[0] + P.C[0] + P.D[0]) / 4, (P.A[1] + P.B[1] + P.C[1] + P.D[1]) / 4];
  const avecDiag = !!(opts.diagonales || opts.centre || opts.demi || opts.moities || opts.diagDroit);
  const O = croisement(P.A, P.C, P.B, P.D);
  const trouve = new Set(opts.trouve ?? []);

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
  const traits = (p: P2, q: P2, n: number, couleur: string, key: string) => {
    const M = milieu(p, q);
    const t = unit(q[0] - p[0], q[1] - p[1]);
    const nn: P2 = [-t[1], t[0]];
    return (
      <g key={key}>
        {Array.from({ length: n }, (_, i) => {
          const d = (i - (n - 1) / 2) * 4;
          const c: P2 = [M[0] + t[0] * d, M[1] + t[1] * d];
          return <line key={i} x1={c[0] - nn[0] * 6} y1={c[1] - nn[1] * 6} x2={c[0] + nn[0] * 6} y2={c[1] + nn[1] * 6} stroke={couleur} strokeWidth={2} />;
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

  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Quadrilatère dessiné à l'échelle">
        <polygon points={SOMMETS.map((k) => P[k].join(",")).join(" ")} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
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
          const t = trouve.has(k);
          const a: P2 = [V[0] + u1[0] * r, V[1] + u1[1] * r];
          const b: P2 = [V[0] + u2[0] * r, V[1] + u2[1] * r];
          const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
          const d = `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
          return (
            <g key={`a${k}`}>
              {(opts.droits ?? []).includes(k) ? null : (
                <g>
                  {t ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${d.slice(2)} Z`} fill={ORANGE} fillOpacity={0.3} /> : null}
                  <path d={d} fill="none" stroke={t ? ORANGE : VIOLET} strokeWidth={t ? 2.4 : 1.6} />
                </g>
              )}
              {etiquette(V[0] + bi[0] * loin, V[1] + bi[1] * loin, opts.angles?.[k] ?? "", t ? ORANGE : VIOLET, 14, "middle", `la${k}`)}
            </g>
          );
        })}
        {(opts.droits ?? []).map((k) => equerre(P[k], P[VOISINS[k][0]], P[VOISINS[k][1]], `d${k}`))}
        {opts.diagDroit ? equerre(O, P.A, P.B, "dO") : null}
        {(opts.egaux ?? []).flatMap((groupe, i) => groupe.map((c) => traits(P[c[0] as S], P[c[1] as S], i + 1, ENCRE, `e${i}${c}`)))}
        {(opts.paralleles ?? []).flatMap((groupe, i) => groupe.map((c) => chevrons(P[c[0] as S], P[c[1] as S], i + 1, `p${i}${c}`)))}
        {(opts.moities ?? []).flatMap((groupe, i) => groupe.map((dm) => traits(O, P[dm[1] as S], i + 1, ORANGE, `m${i}${dm}`)))}
        {COTES.map((c) => {
          const t = opts.cotes?.[c];
          if (!t) return null;
          const [p, q] = [P[c[0] as S], P[c[1] as S]];
          const M = milieu(p, q);
          let n = unit(-(q[1] - p[1]), q[0] - p[0]);
          if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
          return etiquette(M[0] + n[0] * 14, M[1] + n[1] * 14, t, (opts.trouveCotes ?? []).includes(c) ? ORANGE : BLEU, 14, ancre(n[0]), `c${c}`);
        })}
        {(Object.keys(opts.demi ?? {}) as Demi[]).map((dm) => {
          const k = dm[1] as S;
          const V = P[k];
          const M = milieu(O, V);
          const t = unit(V[0] - O[0], V[1] - O[1]);
          let n: P2 = [-t[1], t[0]];
          const [p, q] = VOISINS[k].map((v) => unit(P[v][0] - O[0], P[v][1] - O[1]));
          const w = p[0] * t[0] + p[1] * t[1] <= q[0] * t[0] + q[1] * t[1] ? p : q;
          if (n[0] * w[0] + n[1] * w[1] < 0) n = [-n[0], -n[1]];
          return etiquette(M[0] + n[0] * 11, M[1] + n[1] * 11, opts.demi?.[dm] ?? "", (opts.trouveDemi ?? []).includes(dm) ? ORANGE : BLEU, 14, ancre(n[0]), `dm${dm}`);
        })}
        {(opts.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a]: [number, number, Ancre] =
            p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : [0, 15, "middle"];
          return (
            <g key={`pt${i}`}>
              <circle cx={x} cy={y} r={3} fill={ORANGE} />
              {etiquette(x + dx, y + dy, p.nom, ORANGE, 15, a, `ptn${i}`)}
            </g>
          );
        })}
        {avecDiag ? <circle cx={O[0]} cy={O[1]} r={3} fill={ENCRE} /> : null}
        {opts.centre ? etiquette(O[0] + 9, O[1] - 11, opts.centre, ENCRE, 15, "start", "centre") : null}
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

export const exercicesParallelogramme5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "parallelogramme",
  titre: "Le parallélogramme",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître un parallélogramme, trouver un côté ou un angle, une moitié de diagonale, l'image d'un sommet par le centre de symétrie, reconnaître le losange, le rectangle et le carré, et construire. Un portail extensible, un pavage de losanges, un cadre qu'on pousse. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec la figure dessinée à l'échelle, codée, et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/parallelogramme", titre: "Le parallélogramme" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une propriété par exercice. Je lis d'abord le codage : chevrons, petits traits, angles droits.",
      rappel: [
        "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.",
        "Ses côtés opposés ont la même longueur, ses angles opposés la même mesure, et deux angles consécutifs font $180°$.",
        "Ses diagonales se coupent en leur milieu : ce point est son centre de symétrie.",
        "Losange : quatre côtés égaux. Rectangle : quatre angles droits. Carré : les deux à la fois.",
      ],
      exercices: [
        {
          enonce: "Observe le codage des deux quadrilatères. Lequel est un parallélogramme ? Comment s'appelle l'autre ?",
          figure: deux(
            quad({ A: [0, 0], B: [5, 0], C: [6.5, 3], D: [1.5, 3] }, { paralleles: [["AB", "CD"], ["BC", "DA"]] }),
            quad({ A: [0, 0], B: [6, 0], C: [4.5, 3], D: [1, 3] }, { noms: { A: "M", B: "N", C: "P", D: "Q" }, paralleles: [["AB", "CD"]] }),
          ),
          correction:
            "Les chevrons codent des côtés parallèles : même nombre de chevrons, côtés parallèles.\nDans $ABCD$ : $[AB]$ et $[CD]$ portent un chevron, $[BC]$ et $[DA]$ en portent deux. Les côtés opposés sont parallèles deux à deux : $ABCD$ est un parallélogramme.\nDans $MNPQ$ : seuls $[MN]$ et $[PQ]$ sont parallèles. $[NP]$ et $[QM]$ ne le sont pas. Une seule paire de côtés parallèles : c'est un trapèze.\n⛔ Le piège : dire « parallélogramme » dès qu'on voit deux côtés parallèles. Il en faut DEUX paires.\nRéponse : $ABCD$ est un parallélogramme ; $MNPQ$ est un trapèze.",
          micros: ["para_reconnaitre"],
        },
        {
          enonce: "$EFGH$ est un parallélogramme. Donne les longueurs $GH$ et $HE$, puis calcule son périmètre.",
          figure: quad({ A: [0, 0], B: [6.5, 0], C: [8.0456, 3.4715], D: [1.5456, 3.4715] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, cotes: { AB: "6,5 cm", BC: "3,8 cm" } }),
          correction:
            "Dans un parallélogramme, les côtés opposés ont la même longueur.\n$[GH]$ est opposé à $[EF]$ : $GH = EF = 6{,}5$ cm.\n$[HE]$ est opposé à $[FG]$ : $HE = FG = 3{,}8$ cm.\nLe périmètre est le tour complet : $6{,}5 + 3{,}8 + 6{,}5 + 3{,}8 = 20{,}6$ cm.\n⛔ Le piège : s'arrêter à $6{,}5 + 3{,}8 = 10{,}3$ cm. Ce n'est que la moitié du tour.\nRéponse : $GH = 6{,}5$ cm, $HE = 3{,}8$ cm, et le périmètre vaut $20{,}6$ cm.",
          micros: ["para_cotes_angles"],
        },
        {
          enonce: "$KLMN$ est un parallélogramme et $\\widehat{K} = 63°$. Calcule les trois autres angles.",
          correction:
            "L'angle opposé à $\\widehat{K}$ est $\\widehat{M}$ : deux angles opposés sont égaux, donc $\\widehat{M} = 63°$.\n$\\widehat{L}$ est consécutif à $\\widehat{K}$ : deux angles consécutifs font $180°$. $\\widehat{L} = 180° - 63° = 117°$.\n$\\widehat{N}$ est opposé à $\\widehat{L}$ : $\\widehat{N} = 117°$.\nJe contrôle : $63 + 117 + 63 + 117 = 360$.\n⛔ Le piège : calculer $180 - 63$ pour l'angle OPPOSÉ. L'angle opposé est égal ; c'est le consécutif qui complète à $180°$.\nRéponse : $\\widehat{L} = 117°$, $\\widehat{M} = 63°$, $\\widehat{N} = 117°$.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [5, 0], C: [6.362, 2.673], D: [1.362, 2.673] }, { noms: { A: "K", B: "L", C: "M", D: "N" }, angles: { A: "63°", B: "117°", C: "63°", D: "117°" }, trouve: ["B", "C", "D"] })),
          micros: ["para_cotes_angles"],
        },
        {
          enonce: "Les diagonales du parallélogramme $RSTU$ se coupent en $I$. On sait que $RI = 2{,}7$ cm et $SU = 7{,}4$ cm.\nCalcule $IT$, $RT$ et $IS$.",
          figure: quad({ A: [-2.5372, -0.9235], B: [1.85, -3.2043], C: [2.5372, 0.9235], D: [-1.85, 3.2043] }, { noms: { A: "R", B: "S", C: "T", D: "U" }, centre: "I", demi: { OA: "2,7 cm" } }),
          correction:
            "Les diagonales d'un parallélogramme se coupent en leur MILIEU : $I$ est le milieu de $[RT]$ et le milieu de $[SU]$.\n$IT = RI = 2{,}7$ cm.\n$RT = 2 \\times 2{,}7 = 5{,}4$ cm.\n$I$ partage $[SU]$ en deux moitiés : $IS = 7{,}4 \\div 2 = 3{,}7$ cm.\n⛔ Le piège : croire que les deux diagonales ont la même longueur, et écrire $IS = 2{,}7$ cm. Chaque diagonale est coupée en deux moitiés égales, mais les deux diagonales sont différentes.\nRéponse : $IT = 2{,}7$ cm, $RT = 5{,}4$ cm et $IS = 3{,}7$ cm.",
          micros: ["para_diagonales"],
        },
        {
          enonce: "$ABCD$ est un parallélogramme de centre $O$. On utilise la symétrie de centre $O$.\na) Quelle est l'image du point $A$ ? Du point $B$ ?\nb) Quelle est l'image du côté $[AB]$ ?\nc) Quelle est l'image de l'angle $\\widehat{ABC}$ ?",
          figure: quad({ A: [0, 0], B: [5.5, 0], C: [7, 3.2], D: [1.5, 3.2] }, { centre: "O", diagonales: true }),
          correction:
            "$O$ est le milieu des deux diagonales : c'est le centre de symétrie du parallélogramme.\na) $O$ est le milieu de $[AC]$ : l'image de $A$ est $C$. $O$ est le milieu de $[BD]$ : l'image de $B$ est $D$.\nb) Les bouts $A$ et $B$ vont en $C$ et $D$ : l'image de $[AB]$ est le côté opposé $[CD]$.\nc) $A$, $B$, $C$ vont en $C$, $D$, $A$ : l'image de $\\widehat{ABC}$ est $\\widehat{CDA}$. C'est pour cela que les angles opposés sont égaux.\n⛔ Le piège au b) : répondre $[BC]$, le côté voisin. Le demi-tour envoie chaque côté sur le côté d'EN FACE.\nRéponse : a) $C$ et $D$ ; b) $[CD]$ ; c) $\\widehat{CDA}$.",
          micros: ["para_diagonales"],
        },
        {
          enonce: "Donne le nom le plus précis de chaque parallélogramme.\na) Il a un angle droit.\nb) Il a deux côtés consécutifs de même longueur.\nc) Ses diagonales sont perpendiculaires.\nd) Ses diagonales ont la même longueur et sont perpendiculaires.",
          correction:
            "a) Un angle droit : son consécutif fait $180 - 90 = 90$ degrés, et les angles opposés sont égaux. Les quatre angles sont droits : c'est un rectangle.\nb) Deux côtés consécutifs égaux : avec les côtés opposés égaux, les quatre côtés sont égaux. C'est un losange.\nc) Des diagonales perpendiculaires : c'est un losange.\nd) Des diagonales de même longueur : rectangle ; perpendiculaires : losange. Les deux à la fois : c'est un carré.\n⛔ Le piège au c) : répondre « carré ». Des diagonales perpendiculaires suffisent pour un losange ; pour un carré, il faut en plus qu'elles aient la même longueur.\nRéponse : a) rectangle ; b) losange ; c) losange ; d) carré.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [4, 0], C: [6.5712, 3.0642], D: [2.5712, 3.0642] }, { egaux: [["AB", "BC", "CD", "DA"]], diagDroit: true })),
          micros: ["para_particuliers"],
        },
        {
          enonce: "Construis le parallélogramme $ABCD$ tel que $AB = 5$ cm, $AD = 3{,}5$ cm et $\\widehat{DAB} = 48°$. Écris les étapes.",
          correction:
            "Je trace $[AB]$ de $5$ cm.\nEn $A$, je trace au rapporteur l'angle de $48°$ à partir de $[AB]$, et je place $D$ sur ce côté, à $3{,}5$ cm de $A$.\nIl manque $C$. Les côtés opposés sont égaux : $C$ est à $3{,}5$ cm de $B$ et à $5$ cm de $D$. Je trace ces deux arcs au compas : $C$ est à leur croisement.\nJe trace $[BC]$ et $[CD]$.\n⭐ Contrôle : $[DC]$ doit être parallèle à $[AB]$, et l'angle en $C$ doit mesurer $48°$ lui aussi.\n⛔ Le piège : tracer l'angle de $48°$ en $B$. L'énoncé dit $\\widehat{DAB}$ : le sommet est la lettre du milieu, $A$.",
          schema: quad({ A: [0, 0], B: [5, 0], C: [7.342, 2.601], D: [2.342, 2.601] }, { cotes: { AB: "5 cm", DA: "3,5 cm" }, angles: { A: "48°" }, paralleles: [["AB", "CD"], ["BC", "DA"]] }),
          micros: ["para_construire", "para_cotes_angles"],
        },
        {
          enonce: "Sur un quadrillage, on place $A(1\\,;\\,1)$, $B(6\\,;\\,2)$ et $C(8\\,;\\,5)$. Trouve les coordonnées du point $D$ tel que $ABCD$ soit un parallélogramme.",
          correction:
            "Dans le parallélogramme $ABCD$, $[AC]$ et $[BD]$ sont les diagonales : elles ont le même milieu $O$.\nLe milieu de $[AC]$ : de $A$ à $C$, $7$ à droite et $4$ en haut ; la moitié, $3{,}5$ et $2$. Donc $O(4{,}5\\,;\\,3)$.\n$D$ est l'image de $B$ par la symétrie de centre $O$ : de $B$ à $O$, $1{,}5$ à gauche et $1$ en haut. Encore une fois depuis $O$ : $D(3\\,;\\,4)$.\n⭐ Contrôle : de $A$ à $B$, $5$ à droite et $1$ en haut ; de $D$ à $C$, aussi $5$ à droite et $1$ en haut. $[AB]$ et $[DC]$ sont parallèles et de même longueur.\n⛔ Le piège : placer $D$ au hasard « pour fermer la figure », ou le mettre en face de $C$ au lieu d'en face de $B$. L'ordre des lettres dit que $[BD]$ est une diagonale.\nRéponse : $D(3\\,;\\,4)$.",
          schema: ecranSeulement(quad({ A: [1, 1], B: [6, 2], C: [8, 5], D: [3, 4] }, { centre: "O", diagonales: true, paralleles: [["AB", "CD"], ["BC", "DA"]] })),
          micros: ["para_construire", "para_diagonales"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je code la figure au brouillon, je cite la propriété, puis je calcule.",
      rappel: [
        "Pour prouver qu'un quadrilatère est un parallélogramme : ses côtés opposés sont parallèles deux à deux, OU ses diagonales se coupent en leur milieu.",
        "Parallélogramme + diagonales de même longueur : rectangle. Parallélogramme + diagonales perpendiculaires : losange.",
        "Un losange a ses diagonales perpendiculaires ; un rectangle a ses diagonales de même longueur ; un carré a les deux.",
      ],
      exercices: [
        {
          enonce: "Dans le parallélogramme $ABCD$, on sait que $\\widehat{A} + \\widehat{C} = 152°$.\nCalcule les quatre angles.",
          correction:
            "$\\widehat{A}$ et $\\widehat{C}$ sont opposés : ils sont égaux. Je partage $152$ en deux : $152 \\div 2 = 76$. Donc $\\widehat{A} = \\widehat{C} = 76°$.\n$\\widehat{B}$ est consécutif à $\\widehat{A}$ : $\\widehat{B} = 180° - 76° = 104°$. Et $\\widehat{D}$, opposé à $\\widehat{B}$, mesure aussi $104°$.\nJe contrôle : $76 + 104 + 76 + 104 = 360$.\n⛔ Le piège : faire $180 - 152 = 28$, comme si $\\widehat{A}$ et $\\widehat{C}$ étaient consécutifs. Ils sont opposés : ils se partagent la somme en deux parts égales.\nRéponse : $\\widehat{A} = \\widehat{C} = 76°$ et $\\widehat{B} = \\widehat{D} = 104°$.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [5, 0], C: [5.7258, 2.9109], D: [0.7258, 2.9109] }, { angles: { A: "76°", B: "104°", C: "76°", D: "104°" }, trouve: ["A", "B", "C", "D"] })),
          micros: ["para_cotes_angles", "para_defi"],
        },
        {
          enonce:
            "Ces quadrilatères sont-ils des parallélogrammes ? Justifie.\na) $ABCD$ : ses diagonales se coupent en $O$, avec $OA = OC = 3$ cm, $OB = 5$ cm et $OD = 4$ cm.\nb) $EFGH$ : $(EF)$ est parallèle à $(GH)$, et $(FG)$ est parallèle à $(HE)$.\nc) $IJKL$ : ses diagonales $[IK]$ et $[JL]$ ont le même milieu.\nd) $MNPQ$ : $(MN)$ est parallèle à $(PQ)$, avec $MN = 4$ cm et $PQ = 6$ cm.",
          correction:
            "a) $O$ est le milieu de $[AC]$ ($OA = OC$), mais pas de $[BD]$ ($OB \\neq OD$). Les diagonales ne se coupent pas en leur milieu : ce n'est pas un parallélogramme.\nb) Les côtés opposés sont parallèles deux à deux : c'est la définition. Oui.\nc) Des diagonales qui ont le même milieu : oui, c'est un parallélogramme.\nd) Une seule paire de côtés parallèles, et en plus de longueurs différentes : c'est un trapèze, pas un parallélogramme.\n⛔ Le piège au a) : se contenter de $OA = OC$. Il faut que $O$ soit le milieu des DEUX diagonales.\nRéponse : a) non ; b) oui ; c) oui ; d) non.",
          schema: ecranSeulement(quad({ A: [-3, 0], B: [0, -5], C: [3, 0], D: [0, 4] }, { demi: { OA: "3 cm", OB: "5 cm", OC: "3 cm", OD: "4 cm" } })),
          micros: ["para_reconnaitre", "para_diagonales"],
        },
        {
          enonce:
            "$ABCD$ est un parallélogramme de centre $O$. Donne sa nature dans chaque cas.\na) $AC = BD = 8$ cm.\nb) $AB = BC$.\nc) $\\widehat{A} = 90°$ et $AB = BC$.\nd) $(AC)$ est perpendiculaire à $(BD)$, et $AC = 8$ cm, $BD = 5$ cm.",
          correction:
            "a) Diagonales de même longueur : c'est un rectangle.\nb) Deux côtés consécutifs égaux : les quatre côtés sont égaux, c'est un losange.\nc) Un angle droit fait un rectangle ; deux côtés consécutifs égaux font un losange. Les deux : c'est un carré.\nd) Diagonales perpendiculaires : c'est un losange. Elles n'ont pas la même longueur ($8 \\neq 5$) : ce n'est pas un carré.\n⛔ Le piège au d) : voir l'angle droit au centre et conclure « carré ». L'angle droit est entre les DIAGONALES, pas entre deux côtés.\nRéponse : a) rectangle ; b) losange ; c) carré ; d) losange.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [6, 0], C: [6, 3.5], D: [0, 3.5] }, { droits: ["A", "B", "C", "D"], diagonales: true, moities: [["OA", "OB", "OC", "OD"]] })),
          micros: ["para_particuliers", "para_diagonales"],
        },
        {
          enonce: "$ABCD$ est un losange de côté $4{,}5$ cm, et $\\widehat{A} = 124°$.\na) Calcule son périmètre.\nb) Calcule les trois autres angles.\nc) Quel angle font ses diagonales ?",
          figure: quad({ A: [0, 0], B: [4.5, 0], C: [1.9836, 3.7307], D: [-2.5164, 3.7307] }, { cotes: { AB: "4,5 cm" }, angles: { A: "124°", B: "?" }, trouve: ["B"], egaux: [["AB", "BC", "CD", "DA"]] }),
          correction:
            "a) Un losange a quatre côtés égaux : $4 \\times 4{,}5 = 18$ cm.\nb) Un losange est un parallélogramme. $\\widehat{C}$ est opposé à $\\widehat{A}$ : $124°$.\n$\\widehat{B}$ est consécutif à $\\widehat{A}$ : $180° - 124° = 56°$. $\\widehat{D}$, opposé à $\\widehat{B}$ : $56°$.\nc) Les diagonales d'un losange sont perpendiculaires : elles font un angle droit, $90°$.\n⛔ Le piège : croire qu'un losange a quatre angles égaux, comme un carré. Seuls les angles opposés sont égaux.\nRéponse : a) $18$ cm ; b) $\\widehat{B} = \\widehat{D} = 56°$ et $\\widehat{C} = 124°$ ; c) $90°$.",
          micros: ["para_particuliers", "para_cotes_angles"],
        },
        {
          enonce: "$EFGH$ est un rectangle de centre $O$, et sa diagonale $[EG]$ mesure $9{,}6$ cm.\na) Combien mesure $[FH]$ ?\nb) Calcule $OE$ et $OF$.\nc) Quelle est la nature du triangle $OEF$ ?",
          figure: quad({ A: [0, 0], B: [7.68, 0], C: [7.68, 5.76], D: [0, 5.76] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, droits: ["A", "B", "C", "D"], centre: "O", diagonales: true }),
          correction:
            "a) Les diagonales d'un rectangle ont la même longueur : $FH = EG = 9{,}6$ cm.\nb) Un rectangle est un parallélogramme : ses diagonales se coupent en leur milieu. $OE = 9{,}6 \\div 2 = 4{,}8$ cm, et de même $OF = 9{,}6 \\div 2 = 4{,}8$ cm.\nc) $OE = OF$ : le triangle $OEF$ a deux côtés égaux, il est isocèle en $O$.\n⭐ Les quatre moitiés de diagonales mesurent toutes $4{,}8$ cm : les quatre sommets sont sur un cercle de centre $O$.\n⛔ Le piège au b) : donner $OE = 9{,}6$ cm. $O$ est au MILIEU de la diagonale.\nRéponse : a) $9{,}6$ cm ; b) $OE = OF = 4{,}8$ cm ; c) isocèle en $O$.",
          micros: ["para_particuliers", "para_diagonales"],
        },
        {
          enonce: "Lina affirme : « Mon quadrilatère $ABCD$ a des diagonales de même longueur, donc c'est un rectangle. » Voici son quadrilatère.\na) Est-ce un parallélogramme ?\nb) Lina a-t-elle raison ? Que manque-t-il à son raisonnement ?",
          figure: quad({ A: [0, 0], B: [6, 0], C: [4.5, 3], D: [1.5, 3] }, { diagonales: true, paralleles: [["AB", "CD"]] }),
          correction:
            "a) Seuls $[AB]$ et $[CD]$ sont parallèles, et ils n'ont pas la même longueur. Ses diagonales ne se coupent pas en leur milieu : ce n'est pas un parallélogramme, c'est un trapèze.\nb) Lina a tort. La propriété dit : un PARALLÉLOGRAMME dont les diagonales ont la même longueur est un rectangle. Son quadrilatère n'est pas un parallélogramme : la propriété ne s'applique pas.\nIl lui manque de vérifier d'abord que les diagonales se coupent en leur milieu.\n⛔ Le piège : oublier la première moitié de la propriété. Des diagonales égales ne suffisent pas : ce trapèze en est la preuve.\nRéponse : a) non ; b) non, il faut d'abord que ce soit un parallélogramme.",
          micros: ["para_particuliers", "para_reconnaitre", "para_defi"],
        },
        {
          enonce: "Construis un losange $ABCD$ dont les diagonales mesurent $AC = 7$ cm et $BD = 4$ cm. Écris les étapes.",
          correction:
            "Dans un losange, les diagonales se coupent en leur milieu, à angle droit.\nJe trace $[AC]$ de $7$ cm et je place son milieu $O$, à $3{,}5$ cm de $A$.\nPar $O$, je trace la perpendiculaire à $[AC]$ à l'équerre.\nSur cette perpendiculaire, je place $B$ et $D$ de part et d'autre de $O$, à $4 \\div 2 = 2$ cm chacun.\nJe relie $A$, $B$, $C$, $D$.\n⛔ Le piège : placer $B$ à $2$ cm de $O$ et $D$ à $4$ cm, ou tracer $[BD]$ en partant de $O$. Les deux diagonales doivent se couper en leur MILIEU.",
          schema: quad({ A: [-3.5, 0], B: [0, -2], C: [3.5, 0], D: [0, 2] }, { centre: "O", diagDroit: true, moities: [["OA", "OC"], ["OB", "OD"]], egaux: [["AB", "BC", "CD", "DA"]] }),
          micros: ["para_construire", "para_particuliers"],
        },
        {
          enonce:
            "Suis ce programme de construction.\n1. Trace un segment $[AC]$ de $6$ cm et place son milieu $O$.\n2. Trace un segment $[BD]$ de $6$ cm, de milieu $O$, qui fait un angle de $50°$ avec $[AC]$.\n3. Trace le quadrilatère $ABCD$.\nQuelle est sa nature ? Justifie.",
          correction:
            "Les diagonales $[AC]$ et $[BD]$ ont le même milieu $O$ : $ABCD$ est un parallélogramme.\nElles ont en plus la même longueur, $6$ cm : c'est un rectangle.\nElles ne sont pas perpendiculaires (elles font $50°$) : ce n'est pas un losange, donc pas un carré.\n⭐ Contrôle à l'équerre : les quatre angles de $ABCD$ sont droits.\n⛔ Le piège : conclure « losange » parce que les diagonales ont la même longueur. Même longueur : rectangle ; perpendiculaires : losange.\nRéponse : $ABCD$ est un rectangle.",
          schema: ecranSeulement(quad({ A: [-3, 0], B: [-1.9284, -2.2981], C: [3, 0], D: [1.9284, 2.2981] }, { centre: "O", droits: ["A", "B", "C", "D"], moities: [["OA", "OB", "OC", "OD"]] })),
          micros: ["para_construire", "para_particuliers", "para_diagonales"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je code la figure, je cite chaque propriété, puis je réponds par une phrase.",
      rappel: [
        "Je repère d'abord la nature de la figure : parallélogramme, losange, rectangle ou carré.",
        "Côtés opposés égaux, angles opposés égaux, angles consécutifs à $180°$, diagonales qui se coupent en leur milieu.",
        "Le centre du parallélogramme est son centre de symétrie : il envoie chaque sommet sur le sommet opposé.",
      ],
      exercices: [
        {
          titre: "Le portail extensible",
          enonce:
            "Un portail extensible est fait de barres articulées. Chaque case est un quadrilatère dont les quatre côtés mesurent $15$ cm. Les mesures sont des modèles.\na) Quelle est la nature d'une case ?\nb) Portail à moitié ouvert, un angle d'une case mesure $64°$. Calcule les trois autres.\nc) Quel angle font les deux diagonales d'une case ?\nd) Peut-on ouvrir le portail pour que chaque case devienne un carré ? Que vaut alors chaque angle ?",
          correction:
            "a) Quatre côtés égaux : chaque case est un losange.\nb) Un losange est un parallélogramme. L'angle opposé mesure aussi $64°$ ; les deux angles consécutifs mesurent $180° - 64° = 116°$.\nc) Les diagonales d'un losange sont perpendiculaires : elles font $90°$, quelle que soit l'ouverture.\nd) Oui : quand le portail s'ouvre, les angles changent mais les côtés restent de $15$ cm. Au moment où un angle vaut $90°$, les quatre sont droits : la case est un losange avec un angle droit, c'est un carré.\n⛔ Le piège au b) : croire que les angles restent fixes, comme les longueurs. Les barres gardent leur longueur, mais tournent autour des articulations.\nRéponse : a) un losange ; b) $64°$, $116°$ et $116°$ ; c) $90°$ ; d) oui, avec quatre angles de $90°$.",
          schema: ecranSeulement(quad({ A: [0, 0], B: [3, 0], C: [4.3151, 2.6964], D: [1.3151, 2.6964] }, { angles: { A: "64°", B: "116°", C: "64°", D: "116°" }, trouve: ["B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] })),
          micros: ["para_particuliers", "para_cotes_angles", "para_defi"],
        },
        {
          titre: "Le pavage de losanges",
          enonce:
            "On pave un sol avec des losanges tous identiques, de côté $3$ cm, dont un angle mesure $60°$. Les mesures sont des modèles.\na) Calcule les autres angles d'un losange.\nb) Autour d'un point du pavage, on met des coins obtus. Combien de losanges faut-il pour faire le tour ?\nc) Et avec des coins aigus ?\nd) Montre que la petite diagonale $[BD]$ mesure $3$ cm.",
          figure: quad({ A: [0, 0], B: [3, 0], C: [4.5, 2.5981], D: [1.5, 2.5981] }, { cotes: { AB: "3 cm" }, angles: { A: "60°", B: "?" }, trouve: ["B"], egaux: [["AB", "BC", "CD", "DA"]] }),
          correction:
            "a) L'angle opposé à celui de $60°$ mesure $60°$ ; les deux autres mesurent $180° - 60° = 120°$.\nb) Un tour complet fait $360°$ : $360 \\div 120 = 3$. Il faut $3$ losanges, par leurs coins obtus.\nc) $360 \\div 60 = 6$ : il faut $6$ losanges, par leurs coins aigus. Ils forment une étoile.\nd) Dans le triangle $ABD$, $AB = AD = 3$ cm : il est isocèle en $A$. Ses deux autres angles se partagent $180 - 60 = 120$ degrés : $120 \\div 2 = 60$ chacun. Trois angles de $60°$ : le triangle est équilatéral, donc $BD = 3$ cm.\n⛔ Le piège au b) : diviser $360$ par $60$ par réflexe. Les coins obtus mesurent $120°$ : il en faut deux fois moins.\nRéponse : a) $60°$, $120°$ et $120°$ ; b) $3$ ; c) $6$ ; d) $BD = 3$ cm.",
          micros: ["para_particuliers", "para_cotes_angles", "para_defi"],
        },
        {
          titre: "Le segment qui passe par le centre",
          enonce:
            "$ABCD$ est un parallélogramme de centre $O$, avec $AB = 6$ cm. Le point $M$ est sur $[AB]$, avec $AM = 4$ cm. La droite $(MO)$ recoupe $[CD]$ en $M'$. On mesure $OM = 1{,}75$ cm.\na) Quelle est l'image du côté $[AB]$ par la symétrie de centre $O$ ?\nb) Explique pourquoi $M'$ est l'image de $M$.\nc) Calcule $MM'$.\nd) Calcule $CM'$.",
          figure: quad({ A: [0, 0], B: [6, 0], C: [8, 3.5], D: [2, 3.5] }, { cotes: { AB: "6 cm" }, centre: "O", diagonales: true, points: [{ en: [4, 0], nom: "M", vers: "bas" }, { en: [4, 3.5], nom: "M'", vers: "haut" }] }),
          correction:
            "a) $A$ a pour image $C$ et $B$ a pour image $D$ : l'image de $[AB]$ est $[CD]$.\nb) L'image de $M$ est sur l'image de $[AB]$, donc sur $[CD]$. Elle est aussi sur la droite $(MO)$, puisque $O$ est le milieu du segment qui relie $M$ à son image. Le seul point commun à $[CD]$ et à $(MO)$ est $M'$ : c'est l'image de $M$.\nc) $O$ est le milieu de $[MM']$ : $MM' = 2 \\times 1{,}75 = 3{,}5$ cm.\nd) La symétrie conserve les longueurs : $CM'$ est l'image de $AM$. Donc $CM' = AM = 4$ cm.\n⛔ Le piège au c) : répondre $MM' = 1{,}75$ cm. $OM$ n'est que la moitié du segment.\nRéponse : a) $[CD]$ ; b) voir ci-dessus ; c) $MM' = 3{,}5$ cm ; d) $CM' = 4$ cm.",
          micros: ["para_diagonales", "para_reconnaitre", "para_defi"],
        },
        {
          titre: "Le cadre qu'on pousse",
          enonce:
            "Un cadre rectangulaire en bois mesure $40$ cm sur $30$ cm. Ses coins sont mal collés : on le pousse, et il se penche. Les mesures sont des modèles.\na) Le cadre penché est-il toujours un parallélogramme ? Un rectangle ?\nb) Son périmètre a-t-il changé ?\nc) Un angle du cadre penché mesure $72°$. Calcule les trois autres.\nd) Avant la poussée, les diagonales avaient la même longueur. Est-ce encore le cas ?",
          figure: deux(
            quad({ A: [0, 0], B: [40, 0], C: [40, 30], D: [0, 30] }, { cotes: { AB: "40 cm", DA: "30 cm" }, droits: ["A", "B", "C", "D"] }),
            quad({ A: [0, 0], B: [40, 0], C: [49.2705, 28.5317], D: [9.2705, 28.5317] }, { cotes: { AB: "40 cm", DA: "30 cm" }, angles: { A: "72°" } }),
          ),
          correction:
            "a) Les baguettes gardent leur longueur : les côtés opposés restent égaux, $40$ cm et $30$ cm. Un quadrilatère dont les côtés opposés sont égaux deux à deux (sans être croisé) est un parallélogramme. Mais ses angles ne sont plus droits : ce n'est plus un rectangle.\nb) Non : $40 + 30 + 40 + 30 = 140$ cm, avant comme après.\nc) L'angle opposé mesure $72°$ ; les deux autres mesurent $180° - 72° = 108°$.\nd) Non. Si ses diagonales avaient encore la même longueur, ce parallélogramme serait un rectangle. Or il ne l'est plus : ses diagonales sont devenues différentes, l'une plus longue, l'autre plus courte.\n⛔ Le piège au b) : croire qu'une figure qui se penche « rétrécit ». Les côtés n'ont pas bougé, donc le tour non plus.\nRéponse : a) un parallélogramme, mais plus un rectangle ; b) non, $140$ cm ; c) $72°$, $108°$ et $108°$ ; d) non.",
          micros: ["para_cotes_angles", "para_particuliers", "para_diagonales", "para_defi"],
        },
      ],
    },
  ],
};
