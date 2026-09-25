// ─── Fiche d'exercices : le parallélogramme (4e) — 20 exercices corrigés ──────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-parallelogramme.tsx` et sur
// les sept micros du coach de 4e (notionId quadrilatere_parallelogramme). L'angle
// de la 4e, comme le BO (« une définition et une propriété caractéristique ») :
// le parallélogramme devient un objet qu'on DÉMONTRE — par les côtés opposés, par
// les longueurs, par les diagonales —, puis ses cas particuliers (rectangle,
// losange, carré) et son aire, base × hauteur.
// ⛔ Hors notion : Pythagore et le cosinus (autres notions de 4e), la symétrie
// centrale et les vecteurs. Aucune longueur n'est calculée par Pythagore : les
// diagonales du terrain de baseball sont DONNÉES par le règlement.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni AB = 7 et BC = 5, ni
// l'angle de 65°, ni base 12, oblique 8, hauteur 6, ni base 15, oblique 10,
// hauteur 8, ni le quadrillage 6 × 4, ni la diagonale du charpentier, ni le
// portail en croisillons), ni celui de la feuille de géométrie de seconde (7 cm,
// 4 cm et 60°).
//
// Les pièges nommés : juger à l'œil un quadrilatère penché (1), le demi-périmètre
// (2), l'angle opposé calculé comme un angle consécutif (3), les quatre moitiés de
// diagonales crues égales (4), le côté oblique pris pour la hauteur (5), croire
// qu'il faut vérifier les quatre côtés ou les quatre angles (6), un seul milieu
// pour deux diagonales (7), des côtés égaux consécutifs pris pour opposés — le
// cerf-volant (8), 3x + 2x = 360 (9), la diagonale entière au lieu de sa moitié
// (10), « carré » sans diagonales perpendiculaires (11), une hauteur associée à la
// mauvaise base (12), les diagonales du losange multipliées sans diviser par 2
// (13, 20), la propriété écrite à l'envers pour démontrer (14), des côtés
// consécutifs égalés (15), la condition « en leur milieu » oubliée (16), les
// angles crus fixes dans un parallélogramme articulé (17), la dernière place qui
// déborde (18), « un losange ne peut pas être un carré » (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - lampe d'architecte : l'Anglepoise, brevet déposé par George Carwardine en
//   1932, tient sa tête par des parallélogrammes articulés — ex. 17. Les
//   longueurs 32 cm et 10 cm et les angles sont IMAGINÉS ;
// - places de stationnement : une place standard mesure environ 2,5 m sur 5 m
//   (ordre de grandeur des guides de conception, norme NF P 91-100) — ex. 18.
//   La place en épi (2,9 m, 6 m, 5,2 m, avancée de 3 m) est IMAGINÉE à cet
//   ordre de grandeur ; le script vérifie que ses mesures se tiennent ;
// - baseball : 90 pieds (27,43 m) entre deux bases, 127 pieds 3 3/8 pouces
//   (38,80 m) du marbre à la deuxième base, 60 pieds 6 pouces (18,44 m) du marbre
//   à la plaque du lanceur (Official Baseball Rules, MLB, règle 2.01 et son
//   schéma) — ex. 19 ; conversions refaites par le script (1 pied = 0,3048 m) ;
// - drapeau du Brésil : 20 modules sur 14, sommets du losange à 1,7 module du
//   bord (loi n° 5.700 du 1er septembre 1971, annexe) ; avec un module de 0,1 m,
//   2 m sur 1,4 m et 0,17 m — ex. 20.
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// autres feuilles.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés sont
// dessinés. `quad()` est un SVG local — `figures.tsx` n'a pas de quadrilatère —
// qui prend les VRAIES coordonnées des quatre sommets (y vers le haut) et code
// ce que la notion demande : côtés parallèles (chevrons), côtés égaux (traits),
// angles en degrés (l'angle TROUVÉ en orange), angles droits, diagonales et leur
// point de croisement, moitiés de diagonales codées, hauteurs (pied calculé,
// prolongement du côté en pointillés quand le pied tombe dehors), et un cadre
// derrière (le drapeau).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-parallelogrammes-4e.mjs`
// — le script relit chaque `quad(…)`, reconnaît la NATURE de la figure dessinée
// (milieux des diagonales, longueurs, perpendicularité), mesure ses angles, ses
// côtés, ses hauteurs, et vérifie que chaque étiquette tient dans le cadre.
//
// Micro-compétences : quadrilatere_parallelogramme_reconnaitre (1, 6, 8, 13, 16),
// quadrilatere_parallelogramme_propriete (2, 3, 9, 10, 14, 15, 17),
// quadrilatere_parallelogramme_diagonale (4, 7, 10, 11, 13, 16, 19, 20),
// quadrilatere_parallelogramme_montrer (7, 8, 11, 14, 17, 19),
// quadrilatere_parallelogramme_aire (5, 12, 13, 18, 20),
// quadrilatere_parallelogramme_probleme (17, 18, 19, 20),
// quadrilatere_parallelogramme_defi (12, 16, 17, 18, 20). 7/7.

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
/** Le pied de la perpendiculaire menée de v à la droite (pq), et sa position t sur [pq]. */
const pied = (v: P2, p: P2, q: P2): { F: P2; t: number } => {
  const d: P2 = [q[0] - p[0], q[1] - p[1]];
  const t = ((v[0] - p[0]) * d[0] + (v[1] - p[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]);
  return { F: [p[0] + t * d[0], p[1] + t * d[1]], t };
};

/**
 * ⭐ UN QUADRILATÈRE À L'ÉCHELLE, sommets A, B, C, D dans l'ordre (les lettres
 * affichées viennent de `noms`). Coordonnées VRAIES, y vers le haut.
 * `marge` : la marge à gauche et à droite, en pixels (36 par défaut), à élargir
 * quand une étiquette longue est posée sur un côté presque vertical.
 * `egaux` et `paralleles` : des groupes de côtés — le groupe n° i reçoit i + 1
 * traits (ou chevrons). `demi` étiquette les moitiés de diagonales O→sommet,
 * `moities` les code (traits orange). `hauteurs` : le pied est CALCULÉ ; s'il
 * tombe hors du côté, le côté est prolongé en pointillés.
 * ⛔ Texte NU (« 6 cm », « 118° ») : SVG, pas de KaTeX.
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
    hauteurs?: { de: S; sur: Cote; label?: string }[];
    points?: { en: P2; nom: string; vers?: "haut" | "bas" | "gauche" | "droite" | "basdroite" }[];
    cadre?: P2[];
    marge?: number;
  } = {},
) => {
  const bouts = (c: Cote): [S, S] => [c[0] as S, c[1] as S];
  const hs = (opts.hauteurs ?? []).map((h) => {
    const [p, q] = bouts(h.sur);
    return { ...h, ...pied(pts[h.de], pts[p], pts[q]) };
  });
  const reels: P2[] = [...SOMMETS.map((k) => pts[k]), ...(opts.cadre ?? []), ...(opts.points ?? []).map((p) => p.en), ...hs.map((h) => h.F)];
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * (opts.marge ?? MARGE)) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P = { A: px(pts.A), B: px(pts.B), C: px(pts.C), D: px(pts.D) };
  const G: P2 = [(P.A[0] + P.B[0] + P.C[0] + P.D[0]) / 4, (P.A[1] + P.B[1] + P.C[1] + P.D[1]) / 4];
  const avecDiag = !!(opts.diagonales || opts.centre || opts.demi || opts.moities || opts.diagDroit);
  const O = croisement(P.A, P.C, P.B, P.D);
  const trouve = new Set(opts.trouve ?? []);

  const etiquette = (x: number, y: number, t: string, couleur: string, taille: number, a: Ancre, key: string) => (
    <text key={key} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor={a} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
      {t}
    </text>
  );
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
  /** `n` chevrons au milieu de [pq], tous tournés dans le même sens (vers la droite). */
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
        {opts.cadre ? <polygon points={opts.cadre.map((p) => px(p).join(",")).join(" ")} fill="#dcfce7" stroke={VERT} strokeWidth={2} /> : null}
        <polygon points={SOMMETS.map((k) => P[k].join(",")).join(" ")} fill={opts.cadre ? "#fef9c3" : "#f8fafc"} stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
        {avecDiag ? (
          <g>
            <line x1={P.A[0]} y1={P.A[1]} x2={P.C[0]} y2={P.C[1]} stroke={GRIS} strokeWidth={1.6} />
            <line x1={P.B[0]} y1={P.B[1]} x2={P.D[0]} y2={P.D[1]} stroke={GRIS} strokeWidth={1.6} />
          </g>
        ) : null}
        {hs.map((h, i) => {
          const V = P[h.de];
          const F = px(h.F);
          const [p, q] = bouts(h.sur).map((k) => P[k]);
          const proche = h.t < 0 ? p : h.t > 1 ? q : null;
          const loin = h.t > 0.5 ? p : q;
          return (
            <g key={`h${i}`}>
              {proche ? <line x1={proche[0]} y1={proche[1]} x2={F[0]} y2={F[1]} stroke={GRIS} strokeWidth={1.6} strokeDasharray="4 4" /> : null}
              <line x1={V[0]} y1={V[1]} x2={F[0]} y2={F[1]} stroke={ORANGE} strokeWidth={2} strokeDasharray="5 4" />
              {equerre(F, V, loin, `hq${i}`)}
            </g>
          );
        })}
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
          return etiquette(M[0] + n[0] * 11, M[1] + n[1] * 11, opts.demi?.[dm] ?? "", (opts.trouveDemi ?? []).includes(dm) ? ORANGE : BLEU, 13, ancre(n[0]), `dm${dm}`);
        })}
        {hs.map((h, i) => {
          if (!h.label) return null;
          const V = P[h.de];
          const F = px(h.F);
          const M = milieu(V, F);
          const [p, q] = bouts(h.sur).map((k) => P[k]);
          const t = unit(q[0] - p[0], q[1] - p[1]);
          const sg = (G[0] - M[0]) * t[0] + (G[1] - M[1]) * t[1] >= 0 ? 1 : -1;
          return etiquette(M[0] + t[0] * sg * 8, M[1] + t[1] * sg * 8, h.label, ORANGE, 13, ancre(t[0] * sg), `hl${i}`);
        })}
        {(opts.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a]: [number, number, Ancre] =
            p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : p.vers === "basdroite" ? [9, 11, "start"] : [0, 15, "middle"];
          return (
            <g key={`pt${i}`}>
              <circle cx={x} cy={y} r={3} fill={ORANGE} />
              {etiquette(x + dx, y + dy, p.nom, ORANGE, 14, a, `ptn${i}`)}
            </g>
          );
        })}
        {avecDiag ? <circle cx={O[0]} cy={O[1]} r={3} fill={ENCRE} /> : null}
        {opts.centre ? etiquette(O[0] + 9, O[1] - 9, opts.centre, ENCRE, 14, "start", "centre") : null}
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

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);
/** Trois dessins : un par ligne sur téléphone, deux par ligne à partir de `sm`, trois sur papier. */
const trois = (a: ReactNode, b: ReactNode, c: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-3">
    {a}
    {b}
    {c}
  </div>
);

export const exercicesParallelogrammes4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "quadrilatere-parallelogramme",
  titre: "Le parallélogramme : propriétés, rectangle, losange, carré",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître un parallélogramme, trouver un côté, un angle, une moitié de diagonale, calculer une aire avec la bonne hauteur, puis démontrer qu'un quadrilatère en est un — et reconnaître le rectangle, le losange et le carré. Une lampe d'architecte, un parking en épi, un terrain de baseball, le drapeau du Brésil. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec la figure dessinée à l'échelle, codée, et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/quadrilatere-parallelogramme", titre: "Le parallélogramme" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une propriété par exercice. Je repère d'abord quels côtés, quels angles sont opposés.",
      rappel: [
        "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.",
        "Dans un parallélogramme : les côtés opposés ont la même longueur, les angles opposés sont égaux, et deux angles consécutifs font $180°$ ensemble.",
        "Ses diagonales se coupent en leur milieu. Son aire vaut base × hauteur, la hauteur étant perpendiculaire à la base.",
        "Un parallélogramme avec un angle droit est un rectangle ; avec deux côtés consécutifs égaux, un losange ; avec les deux, un carré.",
      ],
      exercices: [
        {
          enonce:
            "Dans chaque cas, les droites citées sont parallèles, et ce sont les seules. Le quadrilatère est-il un parallélogramme ?\na) $KLMN$ : $(KL) \\parallel (MN)$ et $(LM) \\parallel (NK)$.\nb) $PQRS$ : $(PQ) \\parallel (RS)$, mais les droites $(QR)$ et $(SP)$ se coupent.",
          correction:
            "Je cherche DEUX couples de côtés opposés parallèles : c'est la définition.\na) $[KL]$ et $[MN]$ sont opposés, $[LM]$ et $[NK]$ aussi. Deux couples de côtés opposés parallèles : $KLMN$ est un parallélogramme.\nb) Un seul couple de côtés parallèles, $(PQ)$ et $(RS)$. L'autre couple se coupe : $PQRS$ n'est pas un parallélogramme, c'est un trapèze.\n⛔ Le piège : juger à l'œil. Un trapèze aussi peut être penché ; ce qui compte, ce sont les deux couples de parallèles.\nRéponse : a) oui ; b) non, c'est un trapèze.",
          schema: deux(
            quad({ A: [0, 0], B: [5, 0], C: [6.5, 3], D: [1.5, 3] }, { noms: { A: "K", B: "L", C: "M", D: "N" }, paralleles: [["AB", "CD"], ["BC", "DA"]] }),
            quad({ A: [0, 0], B: [6, 0], C: [4.5, 3], D: [1, 3] }, { noms: { A: "P", B: "Q", C: "R", D: "S" }, paralleles: [["AB", "CD"]] }),
          ),
          micros: ["quadrilatere_parallelogramme_reconnaitre"],
        },
        {
          enonce: "$EFGH$ est un parallélogramme avec $EF = 9$ cm et $FG = 4{,}5$ cm.\na) Donner $GH$ et $HE$.\nb) Calculer son périmètre.",
          correction:
            "a) Dans un parallélogramme, les côtés opposés ont la même longueur.\n$[GH]$ est opposé à $[EF]$ : $GH = EF = 9$ cm.\n$[HE]$ est opposé à $[FG]$ : $HE = FG = 4{,}5$ cm.\nb) Le périmètre, c'est le tour complet : les quatre côtés.\n$2 \\times (9 + 4{,}5) = 2 \\times 13{,}5 = 27$.\n⛔ Le piège : s'arrêter à $9 + 4{,}5$. Ce n'est que la moitié du tour : deux côtés sur quatre.\nRéponse : $GH = 9$ cm, $HE = 4{,}5$ cm, et le périmètre vaut $27$ cm.",
          schema: quad({ A: [0, 0], B: [9, 0], C: [11.7, 3.6], D: [2.7, 3.6] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, cotes: { AB: "9 cm", BC: "4,5 cm", CD: "9 cm", DA: "4,5 cm" }, trouveCotes: ["CD", "DA"], egaux: [["AB", "CD"], ["BC", "DA"]], marge: 64 }),
          micros: ["quadrilatere_parallelogramme_propriete"],
        },
        {
          enonce: "$RSTU$ est un parallélogramme et $\\widehat{R} = 118°$.\nCalculer $\\widehat{S}$, $\\widehat{T}$ et $\\widehat{U}$.",
          correction:
            "Je repère d'abord qui est en face de qui : $R$ et $T$ sont opposés, $S$ et $U$ aussi.\nLes angles opposés sont égaux : $\\widehat{T} = \\widehat{R} = 118°$.\n$R$ et $S$ se suivent : deux angles consécutifs font $180°$ ensemble. $\\widehat{S} = 180° - 118° = 62°$.\n$\\widehat{U}$ est opposé à $\\widehat{S}$ : $\\widehat{U} = 62°$.\nJe vérifie : $118 + 62 + 118 + 62 = 360$, la somme des angles d'un quadrilatère.\n⛔ Le piège : écrire $\\widehat{T} = 180° - 118°$. $T$ est en face de $R$, pas à côté : il lui est égal.\nRéponse : $\\widehat{S} = \\widehat{U} = 62°$ et $\\widehat{T} = 118°$.",
          schema: quad({ A: [0, 0], B: [6, 0], C: [4.122, 3.532], D: [-1.878, 3.532] }, { noms: { A: "R", B: "S", C: "T", D: "U" }, angles: { A: "118°", B: "62°", C: "118°", D: "62°" }, trouve: ["B", "C", "D"] }),
          micros: ["quadrilatere_parallelogramme_propriete"],
        },
        {
          enonce: "$ABCD$ est un parallélogramme. Ses diagonales se coupent en $O$. On sait que $AC = 11$ cm et $BD = 7$ cm.\nCalculer $OA$, $OC$, $OB$ et $OD$.",
          correction:
            "Les diagonales d'un parallélogramme se coupent en leur milieu : $O$ est le milieu de $[AC]$ ET le milieu de $[BD]$.\n$O$ milieu de $[AC]$ : $OA = OC = 11 \\div 2 = 5{,}5$ cm.\n$O$ milieu de $[BD]$ : $OB = OD = 7 \\div 2 = 3{,}5$ cm.\n⛔ Le piège : croire que les quatre morceaux sont égaux. $O$ coupe CHAQUE diagonale en deux moitiés égales, mais les deux diagonales n'ont pas la même longueur.\nRéponse : $OA = OC = 5{,}5$ cm et $OB = OD = 3{,}5$ cm.",
          schema: quad({ A: [-5.5, 0], B: [1.75, -3.031], C: [5.5, 0], D: [-1.75, 3.031] }, { centre: "O", demi: { OA: "5,5 cm", OB: "3,5 cm" }, trouveDemi: ["OA", "OB"], moities: [["OA", "OC"], ["OB", "OD"]] }),
          micros: ["quadrilatere_parallelogramme_diagonale"],
        },
        {
          enonce: "Un parallélogramme $ABCD$ a pour base $AB = 10$ cm. Le côté $[AD]$ mesure $6$ cm, et la hauteur issue de $D$ sur $(AB)$ mesure $5$ cm.\nCalculer son aire.",
          correction:
            "L'aire d'un parallélogramme vaut base × hauteur, avec une hauteur PERPENDICULAIRE à la base.\nLa base est $[AB]$, $10$ cm. Sa hauteur est le segment pointillé qui tombe de $D$ à angle droit sur $(AB)$ : $5$ cm.\nAire $= 10 \\times 5 = 50$ cm².\nLe côté $[AD]$, $6$ cm, est penché : il ne sert pas pour l'aire.\n⛔ Le piège : calculer $10 \\times 6 = 60$ cm². Le côté oblique est plus long que la hauteur ; on obtient l'aire d'un rectangle de côtés $10$ et $6$, trop grande.\nRéponse : l'aire vaut $50$ cm².",
          schema: quad({ A: [0, 0], B: [10, 0], C: [13.317, 5], D: [3.317, 5] }, { cotes: { AB: "10 cm", DA: "6 cm" }, hauteurs: [{ de: "D", sur: "AB", label: "5 cm" }] }),
          micros: ["quadrilatere_parallelogramme_aire"],
        },
        {
          enonce:
            "Donner la nature la plus précise de chaque parallélogramme.\na) $ABCD$ est un parallélogramme et $\\widehat{A} = 90°$.\nb) $EFGH$ est un parallélogramme et $EF = FG$.\nc) $IJKL$ est un parallélogramme, $IJ = JK$ et $\\widehat{J} = 90°$.",
          correction:
            "a) Un parallélogramme qui a UN angle droit est un rectangle. Un seul suffit : l'angle opposé vaut aussi $90°$, et les deux autres $180° - 90° = 90°$.\nb) $[EF]$ et $[FG]$ se suivent : ce sont deux côtés CONSÉCUTIFS égaux. Un parallélogramme qui a deux côtés consécutifs égaux est un losange : ses quatre côtés sont égaux.\nc) Deux côtés consécutifs égaux : c'est un losange. Un angle droit : c'est aussi un rectangle. Les deux à la fois : c'est un carré.\n⛔ Le piège : croire qu'il faut vérifier les quatre angles ou les quatre côtés. Dans un parallélogramme, les côtés opposés sont déjà égaux et les angles se déduisent : une seule information suffit.\nRéponse : a) rectangle ; b) losange ; c) carré.",
          schema: trois(
            quad({ A: [0, 0], B: [5, 0], C: [5, 3], D: [0, 3] }, { droits: ["A", "B", "C", "D"], egaux: [["AB", "CD"], ["BC", "DA"]] }),
            quad({ A: [0, 0], B: [4, 0], C: [6, 3.464], D: [2, 3.464] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, egaux: [["AB", "BC", "CD", "DA"]] }),
            quad({ A: [0, 0], B: [3, 1], C: [2, 4], D: [-1, 3] }, { noms: { A: "I", B: "J", C: "K", D: "L" }, droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]] }),
          ),
          micros: ["quadrilatere_parallelogramme_reconnaitre"],
        },
        {
          enonce: "Les diagonales $[MP]$ et $[NQ]$ du quadrilatère $MNPQ$ se coupent en $I$. On mesure $IM = IP = 4{,}2$ cm, $IN = 3$ cm et $IQ = 3{,}5$ cm.\n$MNPQ$ est-il un parallélogramme ?",
          correction:
            "Pour que ce soit un parallélogramme par les diagonales, il faut que $I$ soit le milieu des DEUX diagonales.\n$IM = IP = 4{,}2$ cm : $I$ est bien le milieu de $[MP]$.\n$IN = 3$ cm mais $IQ = 3{,}5$ cm : $I$ n'est pas le milieu de $[NQ]$.\nOr, dans un parallélogramme, les diagonales se coupent en leur milieu. Ici ce n'est pas le cas : $MNPQ$ n'est pas un parallélogramme.\n⛔ Le piège : s'arrêter à la première diagonale. Un seul milieu ne suffit pas ; il faut le MÊME milieu pour les deux.\nRéponse : non, $MNPQ$ n'est pas un parallélogramme.",
          schema: quad({ A: [-4.2, 0], B: [1.026, -2.819], C: [4.2, 0], D: [-1.197, 3.289] }, { noms: { A: "M", B: "N", C: "P", D: "Q" }, centre: "I", demi: { OA: "4,2 cm", OB: "3 cm", OC: "4,2 cm", OD: "3,5 cm" }, trouveDemi: ["OB", "OD"], moities: [["OA", "OC"]] }),
          micros: ["quadrilatere_parallelogramme_diagonale", "quadrilatere_parallelogramme_montrer"],
        },
        {
          enonce:
            "a) $ABCD$ est un quadrilatère non croisé avec $AB = CD = 6$ cm et $BC = DA = 3{,}5$ cm. Est-ce un parallélogramme ?\nb) $EFGH$ est un quadrilatère non croisé avec $EF = FG = 5$ cm et $GH = HE = 3$ cm. Est-ce un parallélogramme ?",
          correction:
            "Un quadrilatère non croisé dont les côtés OPPOSÉS ont la même longueur deux à deux est un parallélogramme.\na) $[AB]$ et $[CD]$ sont opposés, et $AB = CD$. $[BC]$ et $[DA]$ sont opposés, et $BC = DA$. Les côtés opposés sont égaux deux à deux : $ABCD$ est un parallélogramme.\nb) $[EF]$ et $[FG]$ se suivent : ils ne sont pas opposés. Les côtés opposés sont $[EF]$ et $[GH]$ : $5$ cm et $3$ cm, différents. $EFGH$ n'est pas un parallélogramme : il a la forme d'un cerf-volant.\n⛔ Le piège au b) : voir « deux longueurs égales, deux fois » et conclure trop vite. Il faut que les côtés égaux soient EN FACE l'un de l'autre.\nRéponse : a) oui ; b) non.",
          schema: deux(
            quad({ A: [0, 0], B: [6, 0], C: [8.25, 2.681], D: [2.25, 2.681] }, { cotes: { AB: "6 cm", BC: "3,5 cm" }, egaux: [["AB", "CD"], ["BC", "DA"]], marge: 64 }),
            quad({ A: [4.386, 2.4], B: [0, 0], C: [4.386, -2.4], D: [6.186, 0] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, cotes: { AB: "5 cm", CD: "3 cm" }, egaux: [["AB", "BC"], ["CD", "DA"]] }),
          ),
          micros: ["quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en contrôle. Je code la figure, je choisis la propriété, puis je rédige.",
      rappel: [
        "Pour MONTRER qu'un quadrilatère est un parallélogramme, un seul chemin suffit : côtés opposés parallèles deux à deux ; côtés opposés de même longueur deux à deux (s'il n'est pas croisé) ; diagonales qui ont le même milieu.",
        "Je rédige en trois temps : « Je sais que… Or, si…, alors… Donc… ».",
        "Rectangle : diagonales de même longueur. Losange : diagonales perpendiculaires. Carré : les deux.",
        "Un parallélogramme a deux hauteurs : chaque hauteur va avec SA base, et base × hauteur donne la même aire.",
      ],
      exercices: [
        {
          enonce: "Dans le parallélogramme $ABCD$, $\\widehat{A}$ mesure $3x$ degrés et $\\widehat{B}$ mesure $2x$ degrés.\na) Écrire une équation et trouver $x$.\nb) En déduire les quatre angles.",
          correction:
            "a) $A$ et $B$ sont deux sommets consécutifs : dans un parallélogramme, leurs angles font $180°$ ensemble.\n$3x + 2x = 180$, soit $5x = 180$, donc $x = 180 \\div 5 = 36$.\nb) $\\widehat{A} = 3 \\times 36 = 108°$ et $\\widehat{B} = 2 \\times 36 = 72°$.\nLes angles opposés sont égaux : $\\widehat{C} = \\widehat{A} = 108°$ et $\\widehat{D} = \\widehat{B} = 72°$.\nJe vérifie : $108 + 72 + 108 + 72 = 360$.\n⛔ Le piège : écrire $3x + 2x = 360$. Ce sont les QUATRE angles qui font $360°$ ; deux angles consécutifs font $180°$.\nRéponse : $x = 36$ ; $\\widehat{A} = \\widehat{C} = 108°$ et $\\widehat{B} = \\widehat{D} = 72°$.",
          schema: quad({ A: [0, 0], B: [6, 0], C: [4.764, 3.804], D: [-1.236, 3.804] }, { angles: { A: "108°", B: "72°", C: "108°", D: "72°" }, trouve: ["A", "B", "C", "D"] }),
          micros: ["quadrilatere_parallelogramme_propriete"],
        },
        {
          enonce: "$ABCD$ est un parallélogramme de centre $O$ avec $AB = 9$ cm, $BC = 7$ cm, $AC = 14$ cm et $BD = 8$ cm.\na) Calculer $OA$ et $OB$.\nb) Calculer le périmètre du triangle $OAB$, puis celui du triangle $OBC$.",
          correction:
            "a) Le centre $O$ est le point où les diagonales se coupent, et elles se coupent en leur milieu.\n$OA = 14 \\div 2 = 7$ cm et $OB = 8 \\div 2 = 4$ cm.\nb) Triangle $OAB$ : $OA + OB + AB = 7 + 4 + 9 = 20$ cm.\nTriangle $OBC$ : $OC = OA = 7$ cm, donc $OB + OC + BC = 4 + 7 + 7 = 18$ cm.\n⛔ Le piège : prendre la diagonale entière, $AC = 14$ cm, au lieu de sa moitié. Le triangle $OAB$ ne va que jusqu'au centre.\nRéponse : $OA = 7$ cm, $OB = 4$ cm ; périmètres $20$ cm et $18$ cm.",
          schema: quad({ A: [0, 0], B: [9, 0], C: [12.667, 5.963], D: [3.667, 5.963] }, { cotes: { AB: "9 cm", BC: "7 cm" }, centre: "O", demi: { OA: "7 cm", OB: "4 cm" }, trouveDemi: ["OA", "OB"], moities: [["OA", "OC"], ["OB", "OD"]] }),
          micros: ["quadrilatere_parallelogramme_diagonale", "quadrilatere_parallelogramme_propriete"],
        },
        {
          enonce: "Deux segments $[EG]$ et $[FH]$ mesurent chacun $10$ cm et ont le même milieu $O$. Ils ne sont pas sur la même droite.\na) Montrer que $EFGH$ est un parallélogramme.\nb) Quelle est sa nature exacte ?",
          correction:
            "a) Je sais que les diagonales $[EG]$ et $[FH]$ de $EFGH$ ont le même milieu $O$.\nOr, si les diagonales d'un quadrilatère ont le même milieu, alors c'est un parallélogramme.\nDonc $EFGH$ est un parallélogramme.\nb) En plus, ses diagonales ont la même longueur : $EG = FH = 10$ cm.\nOr, un parallélogramme dont les diagonales ont la même longueur est un rectangle.\nDonc $EFGH$ est un rectangle : ses quatre angles sont droits.\n⛔ Le piège : répondre « carré ». Pour un carré, il faudrait AUSSI des diagonales perpendiculaires ; rien ne le dit ici.\nRéponse : $EFGH$ est un parallélogramme, et même un rectangle.",
          schema: quad({ A: [-5, 0], B: [3.214, -3.83], C: [5, 0], D: [-3.214, 3.83] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, centre: "O", demi: { OA: "5 cm", OB: "5 cm" }, moities: [["OA", "OB", "OC", "OD"]], droits: ["A", "B", "C", "D"] }),
          micros: ["quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_diagonale"],
        },
        {
          enonce: "Le parallélogramme $ABCD$ a pour côtés $AB = 10$ cm et $AD = 5$ cm. La hauteur issue de $D$ sur $(AB)$ mesure $4$ cm.\na) Calculer son aire.\nb) Calculer la hauteur issue de $B$ sur la droite $(AD)$.",
          correction:
            "a) Je prends $[AB]$ pour base, avec sa hauteur : aire $= 10 \\times 4 = 40$ cm².\nb) Je prends maintenant $[AD]$ pour base. La hauteur $h$ qui lui correspond part de $B$, perpendiculaire à $(AD)$ : elle tombe en dehors du côté $[AD]$, sur son prolongement.\nL'aire ne change pas : $5 \\times h = 40$, donc $h = 40 \\div 5 = 8$ cm.\n⛔ Le piège : associer la base $AD$ avec la hauteur de $4$ cm. Chaque hauteur va avec SA base, celle à laquelle elle est perpendiculaire.\nRéponse : l'aire vaut $40$ cm² ; la hauteur issue de $B$ mesure $8$ cm.",
          schema: deux(
            quad({ A: [0, 0], B: [10, 0], C: [13, 4], D: [3, 4] }, { cotes: { AB: "10 cm", DA: "5 cm" }, hauteurs: [{ de: "D", sur: "AB", label: "4 cm" }] }),
            quad({ A: [0, 0], B: [10, 0], C: [13, 4], D: [3, 4] }, { cotes: { AB: "10 cm", DA: "5 cm" }, hauteurs: [{ de: "B", sur: "DA", label: "8 cm" }] }),
          ),
          micros: ["quadrilatere_parallelogramme_aire", "quadrilatere_parallelogramme_defi"],
        },
        {
          enonce:
            "$KLMN$ est un losange de centre $O$, de côté $5$ cm, avec $KM = 8$ cm et $LN = 6$ cm.\na) Calculer $OK$ et $OL$.\nb) Que vaut l'angle $\\widehat{KOL}$ ?\nc) Calculer l'aire du triangle $KOL$, puis celle du losange.\nd) En déduire la hauteur du losange relative au côté $[KL]$.",
          correction:
            "a) Un losange est un parallélogramme : ses diagonales se coupent en leur milieu. $OK = 8 \\div 2 = 4$ cm et $OL = 6 \\div 2 = 3$ cm.\nb) Les diagonales d'un losange sont perpendiculaires : $\\widehat{KOL} = 90°$.\nc) Le triangle $KOL$ est rectangle en $O$ : aire $= \\dfrac{4 \\times 3}{2} = 6$ cm².\nLes deux diagonales découpent le losange en quatre triangles rectangles pareils : $4 \\times 6 = 24$ cm².\nd) Le losange est aussi un parallélogramme : aire $=$ base × hauteur. Avec la base $KL = 5$ cm : $5 \\times h = 24$, donc $h = 24 \\div 5 = 4{,}8$ cm.\n⛔ Le piège au c) : multiplier les deux diagonales, $8 \\times 6 = 48$ cm². C'est l'aire du rectangle qui entoure le losange : le double.\nRéponse : $OK = 4$ cm, $OL = 3$ cm ; $\\widehat{KOL} = 90°$ ; aire $24$ cm² ; hauteur $4{,}8$ cm.",
          schema: deux(
            quad({ A: [-4, 0], B: [0, -3], C: [4, 0], D: [0, 3] }, { noms: { A: "K", B: "L", C: "M", D: "N" }, cotes: { AB: "5 cm" }, centre: "O", demi: { OA: "4 cm", OB: "3 cm" }, trouveDemi: ["OA", "OB"], diagDroit: true }),
            quad({ A: [-4, 0], B: [0, -3], C: [4, 0], D: [0, 3] }, { noms: { A: "K", B: "L", C: "M", D: "N" }, cotes: { AB: "5 cm" }, egaux: [["AB", "BC", "CD", "DA"]], hauteurs: [{ de: "D", sur: "AB", label: "4,8 cm" }] }),
          ),
          micros: ["quadrilatere_parallelogramme_diagonale", "quadrilatere_parallelogramme_aire", "quadrilatere_parallelogramme_reconnaitre"],
        },
        {
          enonce:
            "On place trois points non alignés $A$, $B$, $C$, avec $BC = 5$ cm. $I$ est le milieu de $[AC]$, et on construit $D$ pour que $I$ soit aussi le milieu de $[BD]$.\na) Montrer que $ABCD$ est un parallélogramme, en trois temps.\nb) En déduire la longueur $AD$ et la position des droites $(AD)$ et $(BC)$.",
          correction:
            "a) Je sais que $I$ est le milieu de $[AC]$ et le milieu de $[BD]$ : les diagonales de $ABCD$ ont le même milieu.\nOr, si les diagonales d'un quadrilatère ont le même milieu, alors c'est un parallélogramme.\nDonc $ABCD$ est un parallélogramme.\nb) Dans un parallélogramme, les côtés opposés sont parallèles et de même longueur. $[AD]$ est opposé à $[BC]$ : $(AD) \\parallel (BC)$ et $AD = BC = 5$ cm.\n⛔ Le piège : écrire la propriété à l'envers, « dans un parallélogramme, les diagonales ont le même milieu ». C'est vrai, mais ça part de ce qu'on veut prouver. Pour MONTRER, je pars des diagonales et j'arrive au parallélogramme.\nRéponse : $ABCD$ est un parallélogramme ; $AD = 5$ cm et $(AD) \\parallel (BC)$.",
          schema: quad({ A: [0, 0], B: [5, -2], C: [8, 2], D: [3, 4] }, { cotes: { BC: "5 cm", DA: "5 cm" }, trouveCotes: ["DA"], centre: "I", moities: [["OA", "OC"], ["OB", "OD"]], paralleles: [["BC", "DA"]] }),
          micros: ["quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_propriete"],
        },
        {
          enonce: "Dans le parallélogramme $ABCD$, en centimètres : $AB = 2x + 1$, $CD = 3x - 4$ et $BC = x + 2$.\na) Trouver $x$.\nb) Calculer le périmètre de $ABCD$.",
          correction:
            "a) $[AB]$ et $[CD]$ sont opposés : ils ont la même longueur.\n$2x + 1 = 3x - 4$. J'enlève $2x$ des deux côtés : $1 = x - 4$. J'ajoute $4$ : $x = 5$.\nJe vérifie : $2 \\times 5 + 1 = 11$ et $3 \\times 5 - 4 = 11$.\nb) $AB = 11$ cm et $BC = 5 + 2 = 7$ cm.\nPérimètre : $2 \\times (11 + 7) = 2 \\times 18 = 36$ cm.\n⛔ Le piège : écrire $2x + 1 = x + 2$. $[AB]$ et $[BC]$ se suivent, ils ne sont pas opposés : rien ne dit qu'ils sont égaux.\nRéponse : $x = 5$ ; le périmètre vaut $36$ cm.",
          schema: quad({ A: [0, 0], B: [11, 0], C: [13.394, 6.578], D: [2.394, 6.578] }, { cotes: { AB: "2x + 1", BC: "x + 2", CD: "3x − 4" }, egaux: [["AB", "CD"]], marge: 64 }),
          micros: ["quadrilatere_parallelogramme_propriete"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier par une propriété ou par un contre-exemple.\na) Un rectangle est un parallélogramme.\nb) Les diagonales d'un losange ont toujours la même longueur.\nc) Un quadrilatère dont les diagonales sont perpendiculaires est un losange.\nd) Un carré est un losange.",
          correction:
            "a) Vrai. Un rectangle a ses côtés opposés parallèles deux à deux : c'est un parallélogramme, avec quatre angles droits en plus.\nb) Faux. Contre-exemple : le losange $EFGH$ dessiné a des diagonales de $7$ cm et $4$ cm. Des diagonales de même longueur, c'est le rectangle.\nc) Faux. Contre-exemple : dans le cerf-volant $PQRS$ dessiné, les diagonales sont perpendiculaires, mais elles ne se coupent pas en leur milieu ($OP = 2$ cm et $OR = 5$ cm). Ce n'est même pas un parallélogramme.\nd) Vrai. Un carré a quatre côtés égaux : c'est un losange, avec des angles droits en plus.\n⛔ Le piège au c) : oublier la première condition. Pour un losange, il faut des diagonales perpendiculaires QUI SE COUPENT EN LEUR MILIEU.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai.",
          schema: deux(
            quad({ A: [-3.5, 0], B: [0, -2], C: [3.5, 0], D: [0, 2] }, { noms: { A: "E", B: "F", C: "G", D: "H" }, demi: { OA: "3,5 cm", OB: "2 cm" }, diagDroit: true, egaux: [["AB", "BC", "CD", "DA"]] }),
            quad({ A: [-2, 0], B: [0, -2.5], C: [5, 0], D: [0, 2.5] }, { noms: { A: "P", B: "Q", C: "R", D: "S" }, centre: "O", demi: { OA: "2 cm", OC: "5 cm" }, trouveDemi: ["OA", "OC"], diagDroit: true, moities: [["OB", "OD"]] }),
          ),
          micros: ["quadrilatere_parallelogramme_reconnaitre", "quadrilatere_parallelogramme_diagonale", "quadrilatere_parallelogramme_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je dessine, je code ce que je sais, je choisis la propriété, puis je réponds par une phrase.",
      rappel: [
        "Côtés opposés égaux deux à deux (quadrilatère non croisé), ou diagonales de même milieu : c'est un parallélogramme. Il garde ses côtés opposés parallèles, même s'il se déforme.",
        "Losange : quatre côtés égaux, diagonales perpendiculaires qui se coupent en leur milieu. Carré : un losange avec un angle droit ; ses diagonales ont aussi la même longueur.",
        "Aire d'un parallélogramme : base × hauteur. Un losange occupe la moitié du rectangle construit sur ses diagonales.",
      ],
      exercices: [
        {
          titre: "La lampe d'architecte",
          enonce:
            "Le bras de nombreuses lampes d'architecte, comme l'Anglepoise dont le brevet est déposé en 1932, tient grâce à des parallélogrammes articulés. Sur le schéma, le petit côté $[AD]$, de $10$ cm, est fixé au pied et reste vertical. Les tiges $[AB]$ et $[DC]$ mesurent $32$ cm, et $[BC]$ mesure $10$ cm : c'est lui qui porte la tête de la lampe.\na) Pourquoi $ABCD$ est-il un parallélogramme, quelle que soit la position du bras ?\nb) Dans la position du schéma, $\\widehat{DAB} = 65°$. Calculer les trois autres angles.\nc) On lève le bras : $\\widehat{DAB} = 50°$. Le côté $[BC]$ est-il toujours vertical ? Pourquoi est-ce utile pour la lampe ?",
          correction:
            "a) Les tiges ne changent pas de longueur quand le bras bouge : $AB = DC = 32$ cm et $BC = AD = 10$ cm. Les côtés opposés sont égaux deux à deux, et le quadrilatère n'est pas croisé : $ABCD$ est un parallélogramme, dans toutes les positions.\nb) Les angles opposés sont égaux : $\\widehat{BCD} = \\widehat{DAB} = 65°$.\n$A$ et $B$ se suivent : $\\widehat{ABC} = 180° - 65° = 115°$, et $\\widehat{CDA} = 115°$ aussi.\nc) $ABCD$ reste un parallélogramme, donc $(BC) \\parallel (AD)$. Comme $[AD]$ est vertical, $[BC]$ l'est aussi, quel que soit l'angle.\nLa tête de la lampe, fixée sur $[BC]$, garde donc la même orientation : elle monte et descend sans basculer.\n⛔ Le piège : croire que les angles restent les mêmes quand on lève le bras. Les angles changent ($50°$ et $130°$), mais les longueurs et le parallélisme restent.\nRéponse : a) côtés opposés égaux ; b) $115°$, $65°$ et $115°$ ; c) oui, $[BC]$ reste parallèle à $[AD]$, donc vertical.",
          schema: deux(
            quad({ A: [0, 0], B: [29.002, 13.524], C: [29.002, 23.524], D: [0, 10] }, { cotes: { AB: "32 cm", DA: "10 cm" }, angles: { A: "65°", B: "115°", C: "65°", D: "115°" }, trouve: ["B", "C", "D"], paralleles: [["BC", "DA"]], marge: 64 }),
            quad({ A: [0, 0], B: [24.513, 20.569], C: [24.513, 30.569], D: [0, 10] }, { cotes: { AB: "32 cm", DA: "10 cm" }, angles: { A: "50°", B: "130°" }, trouve: ["B"], paralleles: [["BC", "DA"]], marge: 64 }),
          ),
          micros: ["quadrilatere_parallelogramme_probleme", "quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_propriete", "quadrilatere_parallelogramme_defi"],
        },
        {
          titre: "Les places en épi",
          enonce:
            "Sur un parking « en épi », chaque place est un parallélogramme. Le long du trottoir, une place occupe $2{,}9$ m ; les lignes peintes, penchées, mesurent $6$ m ; la place s'avance de $5{,}2$ m perpendiculairement au trottoir.\na) Calculer l'aire d'une place.\nb) Une voiture a besoin d'au moins $2{,}5$ m de large, mesurés perpendiculairement aux lignes peintes. En prenant une ligne peinte comme base, calculer cette largeur. La place convient-elle ?\nc) Chaque ligne peinte, de son pied à son bout, avance de $3$ m le long du trottoir. Combien de places peut-on peindre au plus sur une bande de $60$ m ?",
          correction:
            "a) Je prends pour base le côté le long du trottoir, $2{,}9$ m. Sa hauteur est la distance perpendiculaire au trottoir, $5{,}2$ m, et pas la ligne penchée de $6$ m.\nAire $= 2{,}9 \\times 5{,}2 = 15{,}08$ m².\nb) La même aire, avec une autre base : la ligne peinte, $6$ m. La hauteur qui lui correspond est justement la largeur $\\ell$ de la place.\n$6 \\times \\ell = 15{,}08$, donc $\\ell = 15{,}08 \\div 6 \\approx 2{,}51$ m.\n$2{,}51 > 2{,}5$ : la place convient, de justesse.\nc) $n$ places côte à côte occupent $n \\times 2{,}9$ m le long du trottoir, et la dernière ligne avance encore de $3$ m : il faut $n \\times 2{,}9 + 3 \\le 60$.\n$60 - 3 = 57$ et $57 \\div 2{,}9 \\approx 19{,}7$ : au plus $19$ places.\n⛔ Le piège au c) : faire $60 \\div 2{,}9 \\approx 20{,}7$ et répondre $20$. La dernière ligne penchée sortirait de la bande.\nRéponse : $15{,}08$ m² ; une largeur de $2{,}51$ m, la place convient ; $19$ places au plus.",
          schema: quad({ A: [0, 0], B: [2.9, 0], C: [5.893, 5.2], D: [2.993, 5.2] }, { cotes: { AB: "2,9 m", DA: "6 m" }, hauteurs: [{ de: "D", sur: "AB", label: "5,2 m" }, { de: "B", sur: "DA", label: "2,51 m" }] }),
          micros: ["quadrilatere_parallelogramme_probleme", "quadrilatere_parallelogramme_aire", "quadrilatere_parallelogramme_defi"],
        },
        {
          titre: "Le losange du baseball",
          enonce:
            "Au baseball, les quatre bases forment ce qu'on appelle le « losange ». Le règlement officiel impose $27{,}43$ m entre deux bases qui se suivent, un angle droit au marbre $A$, et $38{,}80$ m du marbre $A$ à la deuxième base $C$. Les bases sont $A$, $B$, $C$, $D$ dans l'ordre.\na) Montrer que $ABCD$ est un carré.\nb) Quelle est la distance de la première base $B$ à la troisième base $D$ ? Où est le centre $O$ du terrain, et à quelle distance du marbre ?\nc) Le lanceur se tient sur le monticule $L$, sur $[AC]$, à $18{,}44$ m du marbre. Est-il au centre du carré ?",
          correction:
            "a) Les quatre côtés mesurent $27{,}43$ m : les côtés opposés sont égaux deux à deux, et $ABCD$ n'est pas croisé. C'est un parallélogramme.\nDeux côtés consécutifs sont égaux : c'est un losange.\nIl a en plus un angle droit en $A$ : un losange qui a un angle droit est un carré.\nb) Les diagonales d'un carré ont la même longueur : $BD = AC = 38{,}80$ m.\nElles se coupent en leur milieu $O$ : $AO = 38{,}80 \\div 2 = 19{,}40$ m.\nc) $L$ est à $18{,}44$ m du marbre, et le centre à $19{,}40$ m : $19{,}40 - 18{,}44 = 0{,}96$ m.\nLe lanceur n'est pas au centre : il est $0{,}96$ m plus près du marbre.\n⛔ Le piège : croire qu'un « losange » ne peut pas être un carré. Le carré EST un losange, avec des angles droits en plus : le nom du baseball n'a rien de faux.\nRéponse : $ABCD$ est un carré ; $BD = 38{,}80$ m et $AO = 19{,}40$ m ; le lanceur est à $0{,}96$ m du centre.",
          schema: quad({ A: [0, 0], B: [19.396, 19.396], C: [0, 38.792], D: [-19.396, 19.396] }, { cotes: { AB: "27,43 m" }, droits: ["A", "B", "C", "D"], egaux: [["AB", "BC", "CD", "DA"]], centre: "O", demi: { OC: "19,40 m" }, trouveDemi: ["OC"], points: [{ en: [0, 18.44], nom: "L", vers: "basdroite" }] }),
          micros: ["quadrilatere_parallelogramme_probleme", "quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_diagonale"],
        },
        {
          titre: "Le losange du drapeau brésilien",
          enonce:
            "Le drapeau du Brésil est un rectangle vert de $2$ m sur $1{,}4$ m. Le losange jaune $KLMN$ a ses quatre sommets sur les axes de symétrie du drapeau, chacun à $0{,}17$ m du bord le plus proche.\na) Calculer les longueurs des diagonales $[KM]$ et $[LN]$.\nb) Expliquer pourquoi $KLMN$ est bien un losange. Est-ce un carré ?\nc) Calculer l'aire du losange.\nd) Quel pourcentage du drapeau le losange couvre-t-il, à l'unité près ?",
          correction:
            "a) $[KM]$ est horizontale : $KM = 2 - 0{,}17 - 0{,}17 = 1{,}66$ m.\n$[LN]$ est verticale : $LN = 1{,}4 - 0{,}17 - 0{,}17 = 1{,}06$ m.\nb) Les deux diagonales sont portées par les axes du drapeau : elles se coupent au centre $O$ du drapeau, qui est le milieu de chacune ($OK = OM = 0{,}83$ m, $OL = ON = 0{,}53$ m). Même milieu : $KLMN$ est un parallélogramme.\nSes diagonales sont en plus perpendiculaires, comme les deux axes : c'est un losange.\nCe n'est pas un carré : ses diagonales n'ont pas la même longueur, $1{,}66$ m et $1{,}06$ m.\nc) Je trace le rectangle construit sur les diagonales, $1{,}66$ m sur $1{,}06$ m. Les diagonales le coupent en huit triangles rectangles pareils ; le losange en contient quatre : la moitié.\nAire $= \\dfrac{1{,}66 \\times 1{,}06}{2} = \\dfrac{1{,}7596}{2} = 0{,}8798$ m².\nd) Le drapeau mesure $2 \\times 1{,}4 = 2{,}8$ m². $0{,}8798 \\div 2{,}8 \\approx 0{,}314$, soit environ $31$ %.\n⛔ Le piège au c) : multiplier les diagonales sans diviser par $2$. On trouverait $1{,}7596$ m², l'aire du rectangle autour, et un losange qui couvrirait $63$ % du drapeau : à l'œil, c'est faux.\nRéponse : $KM = 1{,}66$ m et $LN = 1{,}06$ m ; un losange, pas un carré ; aire $\\approx 0{,}88$ m², environ $31$ % du drapeau.",
          schema: quad({ A: [0.17, 0.7], B: [1, 0.17], C: [1.83, 0.7], D: [1, 1.23] }, { noms: { A: "K", B: "L", C: "M", D: "N" }, cadre: [[0, 0], [2, 0], [2, 1.4], [0, 1.4]], centre: "O", demi: { OC: "0,83 m", OB: "0,53 m" }, diagDroit: true }),
          micros: ["quadrilatere_parallelogramme_probleme", "quadrilatere_parallelogramme_aire", "quadrilatere_parallelogramme_diagonale", "quadrilatere_parallelogramme_defi"],
        },
      ],
    },
  ],
};
