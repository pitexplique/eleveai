// MÉDIANES, BISSECTRICES, CERCLE INSCRIT, ORTHOCENTRE (05/11/2026).
//
// Micros partagées par le Maroc, la Suisse, la Belgique, le Québec, le Sénégal et la
// Côte d'Ivoire : médianes, centre de gravité et cercle inscrit ne sont pas au
// programme français (`docs/bo-maths-cycle4-recopie.md` ne garde que « hauteurs et
// médiatrices », et `triangle_droites` couvre déjà la hauteur). Notion masquée en
// France : voir `lib/tutor-v4/micros-masquees.ts`.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. Figures calculées par lib/canvas/construction.ts.

import { centreCirconscrit, centreGravite, centreInscrit, dist, figureConstruction, milieu, orthocentre, piedBissectrice, piedPerpendiculaire, point, rayonInscrit, surCercle, triangleAigu, triangleParAngles, type P, type Triangle } from "@/lib/canvas/construction";
import { ang, cap, enDegres, entre, expliquer, fabriqueGabarits, fr, melange, mesure, nomsLibres, nomsTriangle, qcm, un, UNITES } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const tpl = fabriqueGabarits("4e", "triangle_points_remarquables", ["triangle", "points_remarquables", "canvas"]);

const TRIPLETS_PYTHAGORE: [number, number, number][] = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [10, 24, 26]];

const DEF_MEDIANE = "une médiane d’un triangle est le segment qui relie un sommet au milieu du côté opposé.";
const DEF_GRAVITE = "les trois médianes d’un triangle se coupent en un même point, le centre de gravité, situé aux deux tiers de chaque médiane en partant du sommet.";
const DEF_BISSECTRICE = "la bissectrice d’un angle le partage en deux angles égaux ; chacun de ses points est à la même distance des deux côtés de l’angle.";
const DEF_INSCRIT = "les trois bissectrices d’un triangle se coupent au centre du cercle inscrit, à la même distance des trois côtés ; cette distance est le rayon du cercle.";
const DEF_ORTHO = "une hauteur part d’un sommet et est perpendiculaire à la droite qui porte le côté opposé ; les trois hauteurs se coupent en un point, l’orthocentre.";

/** Le triangle nommé : [a, b, c] et ses sommets. */
function tirage(t: Triangle = triangleAigu()) {
  const [a, b, c] = nomsTriangle();
  const pts: Record<string, P> = { [a]: t.A, [b]: t.B, [c]: t.C };
  return { a, b, c, t, pts };
}
const contour = (a: string, b: string, c: string) => ({ sommets: [a, b, c] });

/** Le triangle, le milieu de [b c] codé ; la médiane se trace seulement si on le demande. */
function figMilieu(a: string, b: string, c: string, m: string, t: Triangle, tracer: boolean, texte?: string) {
  return figureConstruction(
    { [a]: t.A, [b]: t.B, [c]: t.C, [m]: milieu(t.B, t.C) },
    {
      polygones: [contour(a, b, c)],
      segments: [
        { a: b, b: m, code: 1 },
        { a: m, b: c, code: 1 },
        ...(tracer ? [{ a, b: m, couleur: "#2563eb", epais: true, texte }] : []),
      ],
      description: "Un triangle et le milieu d’un de ses côtés",
    },
  );
}

/** Les trois médianes et leur point de rencontre. */
function figMedianes(a: string, b: string, c: string, t: Triangle, g: string | null, ma: string, mb: string, mc: string) {
  const G = centreGravite(t);
  return figureConstruction(
    { [a]: t.A, [b]: t.B, [c]: t.C, [ma]: milieu(t.B, t.C), [mb]: milieu(t.A, t.C), [mc]: milieu(t.A, t.B), ...(g ? { [g]: G } : {}) },
    {
      polygones: [contour(a, b, c)],
      segments: [
        { a: b, b: ma, code: 1 }, { a: ma, b: c, code: 1 },
        { a: a, b: mb, code: 2 }, { a: mb, b: c, code: 2 },
        { a: a, b: mc, code: 3 }, { a: mc, b: b, code: 3 },
        { a, b: ma, couleur: "#2563eb" }, { a: b, b: mb, couleur: "#2563eb" }, { a: c, b: mc, couleur: "#2563eb" },
      ],
      description: "Un triangle et ses trois médianes",
    },
  );
}

/** L'angle de sommet s, sa bissectrice, un point m et ses distances aux côtés. */
function figEquidistance(s: string, b: string, c: string, m: string, p: string, q: string, total: number, texteP?: string, texteQ?: string) {
  const rot = entre(-15, 15);
  const S = point(0, 0);
  const B = surCercle(S, 6, rot);
  const C = surCercle(S, 6, rot + total);
  const M = surCercle(S, 3.8, rot + total / 2);
  const P_ = piedPerpendiculaire(M, S, B);
  const Q_ = piedPerpendiculaire(M, S, C);
  return figureConstruction(
    { [s]: S, [b]: B, [c]: C, [m]: M, [p]: P_, [q]: Q_ },
    {
      segments: [
        { a: s, b },
        { a: s, b: c },
        { a: s, b: m, couleur: "#2563eb", epais: true },
        { a: m, b: p, pointille: true, couleur: "#dc2626", texte: texteP },
        { a: m, b: q, pointille: true, couleur: "#dc2626", texte: texteQ },
      ],
      angles: [
        { sommet: s, de: b, vers: m, code: 1, rayon: 30, couleur: "#2563eb" },
        { sommet: s, de: m, vers: c, code: 1, rayon: 30, couleur: "#2563eb" },
        { sommet: p, de: s, vers: m, droit: true },
        { sommet: q, de: s, vers: m, droit: true },
      ],
      description: "Un angle, sa bissectrice et les distances d’un point aux deux côtés",
    },
  );
}

/** La bissectrice issue d'un sommet, dans un triangle. */
function figBissectriceTriangle(a: string, b: string, c: string, d: string, t: Triangle) {
  return figureConstruction(
    { [a]: t.A, [b]: t.B, [c]: t.C, [d]: piedBissectrice(t.A, t.B, t.C) },
    {
      polygones: [contour(a, b, c)],
      segments: [{ a, b: d, couleur: "#2563eb", epais: true }],
      angles: [
        { sommet: a, de: b, vers: d, code: 1, couleur: "#2563eb" },
        { sommet: a, de: d, vers: c, code: 1, couleur: "#2563eb" },
      ],
      description: "Un triangle et la bissectrice issue d’un sommet",
    },
  );
}

/** Le cercle inscrit, ses trois points de contact ; les bissectrices en option. */
function figInscrit(a: string, b: string, c: string, i: string, t: Triangle, feux: string[], bissectrices = false, avecCercle = true) {
  const I = centreInscrit(t);
  const [p, q, r] = feux;
  return figureConstruction(
    {
      [a]: t.A, [b]: t.B, [c]: t.C, [i]: I,
      [p]: piedPerpendiculaire(I, t.A, t.B),
      [q]: piedPerpendiculaire(I, t.B, t.C),
      [r]: piedPerpendiculaire(I, t.C, t.A),
    },
    {
      polygones: [contour(a, b, c)],
      cercles: avecCercle ? [{ centre: i, rayon: rayonInscrit(t), couleur: "#059669" }] : [],
      segments: [
        { a: i, b: p, pointille: true, couleur: "#dc2626" },
        { a: i, b: q, pointille: true, couleur: "#dc2626" },
        { a: i, b: r, pointille: true, couleur: "#dc2626" },
        ...(bissectrices ? [{ a, b: i, couleur: "#2563eb" }, { a: b, b: i, couleur: "#2563eb" }, { a: c, b: i, couleur: "#2563eb" }] : []),
      ],
      angles: [
        { sommet: p, de: a, vers: i, droit: true },
        { sommet: q, de: b, vers: i, droit: true },
        { sommet: r, de: c, vers: i, droit: true },
      ],
      description: "Un triangle et son cercle inscrit",
    },
  );
}

/** Le triangle, ses hauteurs (toutes, ou celles demandées) et leur marque d'angle droit. */
function figHauteurs(a: string, b: string, c: string, t: Triangle, feux: string[], combien: 1 | 2 | 3, h?: string) {
  const [d, e, f] = feux;
  const pts: Record<string, P> = {
    [a]: t.A, [b]: t.B, [c]: t.C,
    [d]: piedPerpendiculaire(t.A, t.B, t.C),
    ...(combien >= 2 ? { [e]: piedPerpendiculaire(t.B, t.A, t.C) } : {}),
    ...(combien >= 3 ? { [f]: piedPerpendiculaire(t.C, t.A, t.B) } : {}),
    ...(h ? { [h]: orthocentre(t) } : {}),
  };
  return figureConstruction(pts, {
    polygones: [contour(a, b, c)],
    segments: [
      { a, b: d, couleur: "#2563eb" },
      ...(combien >= 2 ? [{ a: b, b: e, couleur: "#2563eb" }] : []),
      ...(combien >= 3 ? [{ a: c, b: f, couleur: "#2563eb" }] : []),
    ],
    angles: [
      { sommet: d, de: b, vers: a, droit: true },
      ...(combien >= 2 ? [{ sommet: e, de: a, vers: b, droit: true }] : []),
      ...(combien >= 3 ? [{ sommet: f, de: a, vers: c, droit: true }] : []),
    ],
    description: "Un triangle et ses hauteurs",
  });
}

/* ───────────────────────── objets des énoncés à partir de ★3 ───────────────────────── */

const SURFACES = [
  { o: "Un terrain triangulaire", u: "m²", min: 60, max: 400 },
  { o: "Une voile triangulaire", u: "m²", min: 8, max: 40 },
  { o: "Un fanion triangulaire", u: "dm²", min: 6, max: 30 },
  { o: "Une parcelle de vigne triangulaire", u: "m²", min: 200, max: 900 },
  { o: "Un morceau de tissu triangulaire", u: "dm²", min: 10, max: 60 },
  { o: "Une plaque de verre triangulaire", u: "dm²", min: 12, max: 48 },
  { o: "Un carré de potager triangulaire", u: "m²", min: 10, max: 50 },
  { o: "Une feuille de bristol triangulaire", u: "cm²", min: 100, max: 300 },
  { o: "Un champ triangulaire", u: "m²", min: 500, max: 1500 },
  { o: "Un vitrail triangulaire", u: "dm²", min: 10, max: 40 },
] as const;

const PLAQUES = [
  { o: "une plaque de carton", s: "tient en équilibre sur la pointe d’un crayon" },
  { o: "une enseigne de boutique", s: "est suspendue par un seul fil" },
  { o: "une pièce de mobile", s: "pend à un fil sans pencher" },
  { o: "un plateau en bois", s: "repose sur un seul pied" },
  { o: "une plaque de métal", s: "est soulevée par un seul crochet" },
  { o: "un panneau de signalisation", s: "est accroché en un seul point" },
  { o: "un cerf-volant plat", s: "est attaché par une seule ficelle" },
  { o: "une tuile décorative", s: "tient sur la pointe d’un clou" },
];

const CROISEMENTS = [
  { lignes: "Deux routes", lieu: "une fontaine", suit: "Un chemin", u: "m", min: 30, max: 300 },
  { lignes: "Deux murs", lieu: "un lampadaire", suit: "Une allée", u: "m", min: 2, max: 12 },
  { lignes: "Deux rivières", lieu: "un puits", suit: "Un sentier", u: "m", min: 40, max: 400 },
  { lignes: "Deux lignes d’un terrain de sport", lieu: "un plot", suit: "Une ligne peinte", u: "m", min: 2, max: 20 },
  { lignes: "Deux bords d’un champ", lieu: "un arbre", suit: "Une haie", u: "m", min: 10, max: 90 },
  { lignes: "Deux quais", lieu: "une bouée", suit: "Un chenal", u: "m", min: 20, max: 150 },
  { lignes: "Deux pistes cyclables", lieu: "un banc", suit: "Une allée", u: "m", min: 5, max: 60 },
  { lignes: "Deux voies ferrées", lieu: "un poste de contrôle", suit: "Une clôture", u: "m", min: 15, max: 120 },
];

const LIEUX_TROIS = [
  { z: "Un jardin triangulaire", bords: "ses trois allées", coins: "ses trois coins", q: "une fontaine" },
  { z: "Une place triangulaire", bords: "ses trois rues", coins: "ses trois angles", q: "une statue" },
  { z: "Un parc triangulaire", bords: "ses trois clôtures", coins: "ses trois portails d’angle", q: "un kiosque" },
  { z: "Une cour triangulaire", bords: "ses trois murs", coins: "ses trois coins", q: "un lampadaire" },
  { z: "Un îlot triangulaire", bords: "ses trois rives", coins: "ses trois pointes", q: "un phare" },
  { z: "Une prairie triangulaire", bords: "ses trois haies", coins: "ses trois coins", q: "un abreuvoir" },
];

const TOITS = [
  { o: "La façade triangulaire d’un toit", pied: "un poteau vertical", base: "le plancher" },
  { o: "Une voile triangulaire", pied: "une couture", base: "la bordure du bas" },
  { o: "Un pignon de maison", pied: "une poutre", base: "le mur horizontal" },
  { o: "Une tente vue de face", pied: "un mât", base: "le sol" },
  { o: "Un panneau triangulaire", pied: "un renfort", base: "le bord du bas" },
  { o: "Le fronton d’un temple", pied: "une colonne décorative", base: "la corniche" },
  { o: "Un pont à haubans vu de profil", pied: "le pylône", base: "le tablier" },
];

/* ───────────────────────── les gabarits ───────────────────────── */

export const pointsRemarquablesBank = [
  /* ===== MÉDIANE ===== */

  tpl("mediane_triangle", 1, 1, "Une médiane part d’un sommet et rejoint le milieu du côté opposé.", () => {
    const { a, b, c, t } = tirage();
    const [m] = nomsLibres([a, b, c], 1);
    const text = un([
      `Dans le triangle ${a}${b}${c}, ${m} est le milieu de [${b}${c}]. Quelle est la médiane issue de ${a} ?`,
      `${m} est le milieu de [${b}${c}] dans le triangle ${a}${b}${c}. Quel segment est la médiane issue de ${a} ?`,
      `Voici un triangle ${a}${b}${c}, avec ${m} au milieu de [${b}${c}]. Choisis la médiane issue de ${a}.`,
      `Le triangle ${a}${b}${c} a son côté [${b}${c}] coupé en deux en ${m}. Quelle est la médiane issue de ${a} ?`,
      `Quelle est la médiane issue de ${a} du triangle ${a}${b}${c}, sachant que ${m} est le milieu de [${b}${c}] ?`,
      `Triangle ${a}${b}${c}, ${m} milieu de [${b}${c}] : quel segment est la médiane partant de ${a} ?`,
    ]);
    const juste = `[${a}${m}]`;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`[${a}${b}]`, `[${a}${c}]`, `[${b}${m}]`, `[${m}${c}]`]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figMilieu(a, b, c, m, t, false),
      explanation: expliquer(DEF_MEDIANE, `elle part du sommet ${a} et rejoint le milieu ${m} de [${b}${c}].`, `le segment est [${a}${m}].`, `la médiane issue de ${a} est [${a}${m}].`),
    };
  }),

  tpl("mediane_triangle", 2, 1, "Le côté opposé à un sommet est celui qui ne contient pas ce sommet.", () => {
    const { a, b, c } = tirage();
    const text = un([
      `Dans le triangle ${a}${b}${c}, par quel point passe la médiane issue de ${a} ?`,
      `La médiane issue de ${a} du triangle ${a}${b}${c} passe par quel point ?`,
      `Triangle ${a}${b}${c} : où arrive la médiane partie de ${a} ?`,
      `On trace la médiane issue de ${a} dans le triangle ${a}${b}${c}. Où arrive-t-elle ?`,
      `Quel point appartient à la médiane issue de ${a} du triangle ${a}${b}${c} ?`,
      `Où faut-il arriver pour tracer la médiane issue de ${a} dans le triangle ${a}${b}${c} ?`,
    ]);
    const juste = `le milieu de [${b}${c}]`;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`le milieu de [${a}${b}]`, `le milieu de [${a}${c}]`, `le sommet ${b}`, `le sommet ${c}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expliquer(DEF_MEDIANE, `le côté opposé à ${a} est [${b}${c}].`, `la médiane rejoint le milieu de [${b}${c}].`, `elle passe par le milieu de [${b}${c}].`),
    };
  }),

  tpl("mediane_triangle", 3, 2, "Le pied d’une médiane coupe le côté en deux longueurs égales.", () => {
    const { a, b, c, t } = tirage();
    const [m] = nomsLibres([a, b, c], 1);
    const u = un(UNITES);
    const L = 2 * entre(3, 30);
    const text = un([
      `Dans le triangle ${a}${b}${c}, [${a}${m}] est la médiane issue de ${a}, et ${b}${c} = ${L} ${u}. Combien mesure ${b}${m} ?`,
      `[${a}${m}] est une médiane du triangle ${a}${b}${c}. Sachant que ${b}${c} = ${L} ${u}, calcule ${b}${m}.`,
      `${b}${c} = ${L} ${u} et [${a}${m}] est la médiane issue de ${a} dans le triangle ${a}${b}${c}. Donne ${b}${m}.`,
      `Le côté [${b}${c}] du triangle ${a}${b}${c} mesure ${L} ${u}. [${a}${m}] est une médiane. Que vaut ${b}${m} ?`,
      `Triangle ${a}${b}${c}, médiane [${a}${m}], ${b}${c} = ${L} ${u}. Quelle est la longueur ${b}${m} ?`,
      `Calcule ${b}${m}, sachant que [${a}${m}] est une médiane du triangle ${a}${b}${c} et que ${b}${c} = ${L} ${u}.`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(L / 2, u),
      comparator: "number_equal",
      canvas: figMilieu(a, b, c, m, t, true),
      explanation: expliquer(DEF_MEDIANE, `${m} est le milieu de [${b}${c}], donc ${b}${m} est la moitié de ${b}${c}.`, `${L} ÷ 2 = ${L / 2}.`, `${b}${m} = ${L / 2} ${u}.`),
    };
  }),

  tpl("mediane_triangle", 4, 2, "Si le pied coupe le côté en deux, le côté entier est le double.", () => {
    const { a, b, c, t } = tirage();
    const [m] = nomsLibres([a, b, c], 1);
    const u = un(UNITES);
    const l = entre(3, 30);
    const text = un([
      `Dans le triangle ${a}${b}${c}, [${a}${m}] est la médiane issue de ${a}, et ${b}${m} = ${l} ${u}. Combien mesure ${b}${c} ?`,
      `[${a}${m}] est une médiane du triangle ${a}${b}${c}. Sachant que ${b}${m} = ${l} ${u}, calcule ${b}${c}.`,
      `${b}${m} = ${l} ${u} et [${a}${m}] est la médiane issue de ${a} dans le triangle ${a}${b}${c}. Donne ${b}${c}.`,
      `Triangle ${a}${b}${c}, médiane [${a}${m}], ${b}${m} = ${l} ${u}. Quelle est la longueur ${b}${c} ?`,
      `La moitié du côté [${b}${c}] mesure ${b}${m} = ${l} ${u}, avec [${a}${m}] médiane du triangle ${a}${b}${c}. Que vaut ${b}${c} ?`,
      `Calcule ${b}${c}, sachant que [${a}${m}] est une médiane du triangle ${a}${b}${c} et que ${b}${m} = ${l} ${u}.`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(2 * l, u),
      comparator: "number_equal",
      canvas: figMilieu(a, b, c, m, t, true),
      explanation: expliquer(DEF_MEDIANE, `${m} est le milieu de [${b}${c}], donc ${b}${c} est le double de ${b}${m}.`, `${l} × 2 = ${2 * l}.`, `${b}${c} = ${2 * l} ${u}.`),
    };
  }),

  tpl("mediane_triangle", 5, 2, "Regarde le codage : médiane = milieu ; hauteur = angle droit ; bissectrice = deux angles égaux.", () => {
    const { a, b, c, t } = tirage();
    const [m, d, e] = nomsLibres([a, b, c], 3);
    const M = milieu(t.B, t.C);
    const D = piedPerpendiculaire(t.B, t.A, t.C);
    const E = piedBissectrice(t.C, t.A, t.B);
    const juste = `[${a}${m}]`;
    return {
      text: un([
        `Sur la figure, quel segment est une médiane du triangle ${a}${b}${c} ?`,
        `Observe les codages. Lequel de ces segments est une médiane du triangle ${a}${b}${c} ?`,
        `Dans le triangle ${a}${b}${c} tracé ici, lequel de ces segments est une médiane ?`,
        `Voici trois segments dans le triangle ${a}${b}${c}. Lequel est une médiane ?`,
        `Le triangle ${a}${b}${c} porte trois segments codés. Choisis la médiane.`,
      ]),
      format: "qcm",
      choices: melange([juste, `[${b}${d}]`, `[${c}${e}]`]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureConstruction(
        { [a]: t.A, [b]: t.B, [c]: t.C, [m]: M, [d]: D, [e]: E },
        {
          polygones: [contour(a, b, c)],
          segments: [
            { a: b, b: m, code: 1 }, { a: m, b: c, code: 1 },
            { a, b: m, couleur: "#2563eb" }, { a: b, b: d, couleur: "#059669" }, { a: c, b: e, couleur: "#c2410c" },
          ],
          angles: [
            { sommet: d, de: a, vers: b, droit: true },
            { sommet: c, de: a, vers: e, code: 1, couleur: "#c2410c", rayon: 20 },
            { sommet: c, de: e, vers: b, code: 1, couleur: "#c2410c", rayon: 20 },
          ],
          description: "Un triangle et trois segments codés",
        },
      ),
      explanation: expliquer(DEF_MEDIANE, `seul [${a}${m}] arrive au milieu d’un côté : ${m} coupe [${b}${c}] en deux longueurs codées égales.`, `[${b}${d}] est une hauteur (angle droit), [${c}${e}] une bissectrice (angles égaux).`, `la médiane est [${a}${m}].`),
    };
  }),

  tpl("mediane_triangle", 6, 3, "Les deux morceaux ont la même base et la même hauteur, donc la même aire.", () => {
    const O = un(SURFACES);
    const A = 2 * entre(Math.ceil(O.min / 2), Math.floor(O.max / 2));
    const fem = O.o.startsWith("Une");
    const text = un([
      `${O.o} a une aire de ${A} ${O.u}. On ${fem ? "la" : "le"} partage le long d’une médiane. Quelle est l’aire de chaque morceau ?`,
      `${O.o} mesure ${A} ${O.u}. Une médiane ${fem ? "la" : "le"} sépare en deux. Quelle aire a chaque partie ?`,
      `On coupe ${O.o.charAt(0).toLowerCase() + O.o.slice(1)} de ${A} ${O.u} suivant une médiane. Combien mesure chaque morceau ?`,
      `${O.o} de ${A} ${O.u} est ${fem ? "partagée" : "partagé"} par une de ses médianes. Quelle est l’aire de chaque moitié ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(A / 2, O.u),
      comparator: "number_equal",
      explanation: expliquer("une médiane partage un triangle en deux triangles de même aire : même base (le côté est coupé en deux), même hauteur.", "on divise l’aire par 2.", `${A} ÷ 2 = ${A / 2}.`, `chaque morceau mesure ${A / 2} ${O.u}.`),
    };
  }),

  tpl("mediane_triangle", 7, 3, "Une médiane partage le triangle en deux triangles de même aire.", () => {
    const { a, b, c, t } = tirage();
    const [m] = nomsLibres([a, b, c], 1);
    const u = un(["cm", "dm", "m", "mm"]);
    const A = 2 * entre(6, 90);
    const text = un([
      `Dans le triangle ${a}${b}${c}, d’aire ${A} ${u}², [${a}${m}] est une médiane. Quelle est l’aire du triangle ${a}${b}${m} ?`,
      `Le triangle ${a}${b}${c} a une aire de ${A} ${u}². [${a}${m}] est la médiane issue de ${a}. Calcule l’aire du triangle ${a}${m}${c}.`,
      `[${a}${m}] est une médiane du triangle ${a}${b}${c}, dont l’aire vaut ${A} ${u}². Que vaut l’aire du triangle ${a}${b}${m} ?`,
      `Aire du triangle ${a}${b}${c} : ${A} ${u}². Médiane : [${a}${m}]. Donne l’aire du triangle ${a}${m}${c}.`,
      `On trace la médiane [${a}${m}] dans un triangle ${a}${b}${c} de ${A} ${u}². Quelle aire a le triangle ${a}${b}${m} ?`,
      `Quelle est l’aire du triangle ${a}${m}${c}, si [${a}${m}] est une médiane du triangle ${a}${b}${c} de ${A} ${u}² ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(A / 2, `${u}²`),
      comparator: "number_equal",
      canvas: figMilieu(a, b, c, m, t, true),
      explanation: expliquer("une médiane partage un triangle en deux triangles de même aire.", `les deux triangles ont des bases égales (${m} est le milieu de [${b}${c}]) et la même hauteur issue de ${a}.`, `${A} ÷ 2 = ${A / 2}.`, `l’aire cherchée est ${A / 2} ${u}².`),
    };
  }),

  tpl("mediane_triangle", 8, 4, "Dans un triangle rectangle, la médiane issue de l’angle droit vaut la moitié de l’hypoténuse.", () => {
    const [a, b, c] = nomsTriangle();
    const [m] = nomsLibres([a, b, c], 1);
    const u = un(UNITES);
    const H = 2 * entre(4, 40);
    const B = entre(30, 60);
    const t = triangleParAngles(90, B, 90 - B);
    const text = un([
      `Le triangle ${a}${b}${c} est rectangle en ${a}, et ${b}${c} = ${H} ${u}. [${a}${m}] est la médiane issue de ${a}. Combien mesure ${a}${m} ?`,
      `${a}${b}${c} est rectangle en ${a}, d’hypoténuse ${b}${c} = ${H} ${u}. Calcule la longueur de la médiane [${a}${m}].`,
      `Dans le triangle ${a}${b}${c} rectangle en ${a}, ${m} est le milieu de [${b}${c}] et ${b}${c} = ${H} ${u}. Que vaut ${a}${m} ?`,
      `Hypoténuse ${b}${c} = ${H} ${u}, angle droit en ${a}, ${m} milieu de [${b}${c}]. Donne ${a}${m} dans ce triangle ${a}${b}${c}.`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(H / 2, u),
      comparator: "number_equal",
      canvas: { ...figMilieu(a, b, c, m, t, true), angles: [{ sommet: a, de: b, vers: c, droit: true }] },
      explanation: expliquer("dans un triangle rectangle, le milieu de l’hypoténuse est le centre du cercle circonscrit : il est à la même distance des trois sommets.", `${a}${m} = ${b}${m} = ${m}${c}, soit la moitié de ${b}${c}.`, `${H} ÷ 2 = ${H / 2}.`, `${a}${m} = ${H / 2} ${u}.`),
    };
  }),

  tpl("mediane_triangle", 9, 4, "Pythagore donne l’hypoténuse ; la médiane issue de l’angle droit en vaut la moitié.", () => {
    const [a, b, c] = nomsTriangle();
    const [m] = nomsLibres([a, b, c], 1);
    const u = un(UNITES);
    const [x, y, z] = un(TRIPLETS_PYTHAGORE);
    const B = (Math.atan2(y, x) * 180) / Math.PI;
    const t = triangleParAngles(90, B, 90 - B);
    const text = un([
      `Le triangle ${a}${b}${c} est rectangle en ${a}, avec ${a}${b} = ${x} ${u} et ${a}${c} = ${y} ${u}. ${m} est le milieu de [${b}${c}]. Combien mesure ${a}${m} ?`,
      `${a}${b}${c} est rectangle en ${a} : ${a}${b} = ${x} ${u}, ${a}${c} = ${y} ${u}. Calcule la médiane [${a}${m}].`,
      `Angle droit en ${a}, ${a}${b} = ${x} ${u}, ${a}${c} = ${y} ${u}. Quelle est la longueur de la médiane [${a}${m}] de ce triangle ${a}${b}${c} ?`,
      `Dans le triangle ${a}${b}${c} rectangle en ${a}, ${a}${b} = ${x} ${u} et ${a}${c} = ${y} ${u}. Que vaut ${a}${m}, si ${m} est le milieu de l’hypoténuse ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(z / 2, u),
      comparator: "number_equal",
      canvas: { ...figMilieu(a, b, c, m, t, true), angles: [{ sommet: a, de: b, vers: c, droit: true }] },
      explanation: expliquer("la médiane issue de l’angle droit vaut la moitié de l’hypoténuse.", "on calcule l’hypoténuse avec Pythagore, puis on la divise par 2.", `${x}² + ${y}² = ${x * x + y * y} = ${z}², donc ${b}${c} = ${z} ; puis ${z} ÷ 2 = ${fr(z / 2)}.`, `${a}${m} = ${fr(z / 2)} ${u}.`),
    };
  }),

  /* ===== CENTRE DE GRAVITÉ ===== */

  tpl("centre_gravite", 1, 1, "Les médianes se coupent au centre de gravité.", () => {
    const { a, b, c, t } = tirage();
    const [ma, mb, mc] = nomsLibres([a, b, c], 3);
    const text = un([
      `Dans le triangle ${a}${b}${c}, les trois médianes se coupent en G. Comment s’appelle G ?`,
      `Les médianes du triangle ${a}${b}${c} se rencontrent en G. Quel est le nom de G ?`,
      `G est le point commun aux trois médianes du triangle ${a}${b}${c}. Comment l’appelle-t-on ?`,
      `On trace les médianes du triangle ${a}${b}${c} : elles passent toutes par G. Que représente G ?`,
      `Quel nom porte le point G où se croisent les médianes du triangle ${a}${b}${c} ?`,
      `Triangle ${a}${b}${c} : ses trois médianes concourent en G. Comment se nomme ce point ?`,
    ]);
    const juste = "le centre de gravité";
    return {
      text,
      format: "qcm",
      choices: qcm(juste, ["l’orthocentre", "le centre du cercle inscrit", "le centre du cercle circonscrit"]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figMedianes(a, b, c, t, "G", ma, mb, mc),
      explanation: expliquer(DEF_GRAVITE, "les médianes se coupent au centre de gravité ; les hauteurs à l’orthocentre, les bissectrices au centre du cercle inscrit, les médiatrices au centre du cercle circonscrit.", "G est sur les trois médianes.", "G est le centre de gravité."),
    };
  }),

  tpl("centre_gravite", 2, 1, "En partant du sommet, on parcourt les deux tiers de la médiane.", () => {
    const { a, b, c } = tirage();
    const [m] = nomsLibres([a, b, c], 1);
    const text = un([
      `G est le centre de gravité du triangle ${a}${b}${c} et [${a}${m}] une médiane. Où se trouve G sur [${a}${m}] ?`,
      `Où est placé le centre de gravité G du triangle ${a}${b}${c} sur la médiane [${a}${m}] ?`,
      `[${a}${m}] est une médiane du triangle ${a}${b}${c}. À quel endroit de ce segment est son centre de gravité G ?`,
      `Sur la médiane [${a}${m}] du triangle ${a}${b}${c}, où place-t-on le centre de gravité G ?`,
      `Triangle ${a}${b}${c}, médiane [${a}${m}], centre de gravité G : quelle est la position de G sur [${a}${m}] ?`,
      `Choisis la position exacte de G, centre de gravité du triangle ${a}${b}${c}, sur la médiane [${a}${m}].`,
    ]);
    const juste = `aux deux tiers en partant de ${a}`;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`au milieu de [${a}${m}]`, `au tiers en partant de ${a}`, `aux trois quarts en partant de ${a}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expliquer(DEF_GRAVITE, "la position se compte depuis le sommet, pas depuis le côté.", `G partage [${a}${m}] en une part de deux tiers côté ${a}, et un tiers côté ${m}.`, `G est aux deux tiers de [${a}${m}] en partant de ${a}.`),
    };
  }),

  tpl("centre_gravite", 3, 2, "Du sommet au centre de gravité : les deux tiers de la médiane.", () => {
    const { a, b, c, t } = tirage();
    const [m, mb, mc] = nomsLibres([a, b, c], 3);
    const u = un(UNITES);
    const L = 3 * entre(2, 25);
    const text = un([
      `G est le centre de gravité du triangle ${a}${b}${c}. La médiane [${a}${m}] mesure ${L} ${u}. Combien mesure ${a}G ?`,
      `Dans le triangle ${a}${b}${c}, de centre de gravité G, ${a}${m} = ${L} ${u}, où [${a}${m}] est une médiane. Calcule ${a}G.`,
      `[${a}${m}] est une médiane de ${L} ${u} du triangle ${a}${b}${c}. G est son centre de gravité. Que vaut ${a}G ?`,
      `La médiane [${a}${m}] mesure ${L} ${u}. G est le centre de gravité du triangle ${a}${b}${c}. Donne ${a}G.`,
      `Triangle ${a}${b}${c}, centre de gravité G, médiane ${a}${m} = ${L} ${u}. Quelle est la longueur ${a}G ?`,
      `Quelle distance sépare ${a} de G, centre de gravité du triangle ${a}${b}${c}, si la médiane [${a}${m}] mesure ${L} ${u} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure((2 * L) / 3, u),
      comparator: "number_equal",
      canvas: figMedianes(a, b, c, t, "G", m, mb, mc),
      explanation: expliquer(DEF_GRAVITE, "on prend les deux tiers de la médiane.", `${L} ÷ 3 = ${L / 3}, puis ${L / 3} × 2 = ${(2 * L) / 3}.`, `${a}G = ${(2 * L) / 3} ${u}.`),
    };
  }),

  tpl("centre_gravite", 4, 2, "Du centre de gravité au milieu du côté : le tiers de la médiane.", () => {
    const { a, b, c, t } = tirage();
    const [m, mb, mc] = nomsLibres([a, b, c], 3);
    const u = un(UNITES);
    const L = 3 * entre(2, 25);
    const text = un([
      `G est le centre de gravité du triangle ${a}${b}${c}. La médiane [${a}${m}] mesure ${L} ${u}. Combien mesure G${m} ?`,
      `Dans le triangle ${a}${b}${c}, de centre de gravité G, la médiane [${a}${m}] mesure ${L} ${u}. Calcule G${m}.`,
      `[${a}${m}] est une médiane de ${L} ${u} du triangle ${a}${b}${c}. G est son centre de gravité. Que vaut G${m} ?`,
      `La médiane [${a}${m}] mesure ${L} ${u}. G est le centre de gravité du triangle ${a}${b}${c}. Donne G${m}.`,
      `Triangle ${a}${b}${c}, centre de gravité G, médiane ${a}${m} = ${L} ${u}. Quelle est la longueur G${m} ?`,
      `Quelle distance sépare G de ${m}, si G est le centre de gravité du triangle ${a}${b}${c} et si la médiane [${a}${m}] mesure ${L} ${u} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(L / 3, u),
      comparator: "number_equal",
      canvas: figMedianes(a, b, c, t, "G", m, mb, mc),
      explanation: expliquer(DEF_GRAVITE, `il reste un tiers de la médiane entre G et ${m}.`, `${L} ÷ 3 = ${L / 3}.`, `G${m} = ${L / 3} ${u}.`),
    };
  }),

  tpl("centre_gravite", 5, 3, "Si les deux tiers valent cette longueur, le tiers en vaut la moitié, et la médiane trois tiers.", () => {
    const { a, b, c, t } = tirage();
    const [m, mb, mc] = nomsLibres([a, b, c], 3);
    const u = un(UNITES);
    const x = entre(2, 25);
    const text = un([
      `G est le centre de gravité du triangle ${a}${b}${c}, et ${a}G = ${2 * x} ${u}. Combien mesure la médiane [${a}${m}] ?`,
      `Dans le triangle ${a}${b}${c}, ${a}G = ${2 * x} ${u} où G est le centre de gravité. Calcule la longueur de la médiane [${a}${m}].`,
      `Le centre de gravité G du triangle ${a}${b}${c} est à ${2 * x} ${u} du sommet ${a}. Que mesure la médiane [${a}${m}] ?`,
      `${a}G = ${2 * x} ${u}, G centre de gravité du triangle ${a}${b}${c}. Donne ${a}${m}, où [${a}${m}] est une médiane.`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(3 * x, u),
      comparator: "number_equal",
      canvas: figMedianes(a, b, c, t, "G", m, mb, mc),
      explanation: expliquer(DEF_GRAVITE, `${a}G représente deux tiers de la médiane : un tiers vaut donc ${a}G ÷ 2.`, `${2 * x} ÷ 2 = ${x}, puis ${x} × 3 = ${3 * x}.`, `la médiane mesure ${3 * x} ${u}.`),
    };
  }),

  tpl("centre_gravite", 6, 3, "Le point d’équilibre d’une plaque triangulaire est son centre de gravité.", () => {
    const P_ = un(PLAQUES);
    const u = un(["cm", "dm"]);
    const L = 3 * entre(4, 20);
    const debut = `${cap(P_.o)} en forme de triangle ${P_.s}, en son centre de gravité G.`;
    const fin = un([
      `Une médiane de ce triangle mesure ${L} ${u}. À quelle distance du sommet de cette médiane se trouve G ?`,
      `L’une de ses médianes fait ${L} ${u}. Quelle distance sépare G du sommet d’où part cette médiane ?`,
      `Sa médiane la plus longue mesure ${L} ${u}. À combien du sommet de cette médiane est le point G ?`,
    ]);
    return {
      text: `${debut} ${fin}`,
      format: "short",
      expected: mesure((2 * L) / 3, u),
      comparator: "number_equal",
      explanation: expliquer(DEF_GRAVITE, "le point d’équilibre est aux deux tiers de la médiane en partant du sommet.", `${L} ÷ 3 × 2 = ${(2 * L) / 3}.`, `G est à ${(2 * L) / 3} ${u} du sommet.`),
    };
  }),

  tpl("centre_gravite", 7, 4, "Les coordonnées du centre de gravité sont les moyennes de celles des sommets.", () => {
    const [a, b, c] = nomsTriangle();
    let x: number[] = [];
    let y: number[] = [];
    do {
      x = [entre(0, 12), entre(0, 12), entre(0, 12)];
      y = [entre(0, 12), entre(0, 12), entre(0, 12)];
    } while ((x[0] + x[1] + x[2]) % 3 || (y[0] + y[1] + y[2]) % 3 || Math.abs((x[1] - x[0]) * (y[2] - y[0]) - (x[2] - x[0]) * (y[1] - y[0])) < 12);
    const gx = (x[0] + x[1] + x[2]) / 3;
    const gy = (y[0] + y[1] + y[2]) / 3;
    const juste = `(${gx} ; ${gy})`;
    const text = un([
      `Dans un repère : ${a}(${x[0]} ; ${y[0]}), ${b}(${x[1]} ; ${y[1]}), ${c}(${x[2]} ; ${y[2]}). Quelles sont les coordonnées du centre de gravité du triangle ${a}${b}${c} ?`,
      `On donne ${a}(${x[0]} ; ${y[0]}), ${b}(${x[1]} ; ${y[1]}) et ${c}(${x[2]} ; ${y[2]}). Où est le centre de gravité du triangle ${a}${b}${c} ?`,
      `Le triangle ${a}${b}${c} a pour sommets ${a}(${x[0]} ; ${y[0]}), ${b}(${x[1]} ; ${y[1]}), ${c}(${x[2]} ; ${y[2]}). Choisis les coordonnées de son centre de gravité.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`(${gx + 1} ; ${gy})`, `(${gx} ; ${gy + 1})`, `(${gy} ; ${gx})`, `(${gx + 2} ; ${gy + 1})`, `(${gx + 1} ; ${gy + 2})`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expliquer(DEF_GRAVITE, "chaque coordonnée de G est la moyenne des trois coordonnées des sommets.", `(${x[0]} + ${x[1]} + ${x[2]}) ÷ 3 = ${gx} et (${y[0]} + ${y[1]} + ${y[2]}) ÷ 3 = ${gy}.`, `G${juste}.`),
    };
  }),

  tpl("centre_gravite", 8, 4, "La médiane issue de l’angle droit vaut la moitié de l’hypoténuse ; G est aux deux tiers.", () => {
    const [a, b, c] = nomsTriangle();
    const [m, mb, mc] = nomsLibres([a, b, c], 3);
    const u = un(UNITES);
    const H = 6 * entre(1, 12);
    const B = entre(30, 60);
    const t = triangleParAngles(90, B, 90 - B);
    const text = un([
      `Le triangle ${a}${b}${c} est rectangle en ${a}, avec ${b}${c} = ${H} ${u}. G est son centre de gravité. Combien mesure ${a}G ?`,
      `${a}${b}${c} est rectangle en ${a}, d’hypoténuse ${H} ${u}. Calcule la distance de ${a} à son centre de gravité G.`,
      `Hypoténuse ${b}${c} = ${H} ${u}, angle droit en ${a}. Quelle est la distance ${a}G, si G est le centre de gravité du triangle ${a}${b}${c} ?`,
      `Dans le triangle ${a}${b}${c} rectangle en ${a}, ${b}${c} = ${H} ${u}. Donne ${a}G, où G est le centre de gravité.`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(H / 3, u),
      comparator: "number_equal",
      canvas: { ...figMedianes(a, b, c, t, "G", m, mb, mc), angles: [{ sommet: a, de: b, vers: c, droit: true }] },
      explanation: expliquer(DEF_GRAVITE, `la médiane issue de ${a} vaut la moitié de l’hypoténuse, et G est aux deux tiers de cette médiane.`, `${H} ÷ 2 = ${H / 2}, puis ${H / 2} ÷ 3 × 2 = ${H / 3}.`, `${a}G = ${H / 3} ${u}.`),
    };
  }),

  tpl("centre_gravite", 9, 4, "G partage la médiane en deux parts : le côté du sommet est le double de l’autre.", () => {
    const { a, b, c, t } = tirage();
    const [m, mb, mc] = nomsLibres([a, b, c], 3);
    const u = un(UNITES);
    const x = entre(2, 25);
    const veutSommet = Math.random() < 0.5;
    const text = veutSommet
      ? un([
          `G est le centre de gravité du triangle ${a}${b}${c}, [${a}${m}] une médiane, et G${m} = ${x} ${u}. Combien mesure ${a}G ?`,
          `Sur la médiane [${a}${m}] du triangle ${a}${b}${c}, de centre de gravité G, on lit G${m} = ${x} ${u}. Calcule ${a}G.`,
          `G${m} = ${x} ${u}, avec G centre de gravité du triangle ${a}${b}${c} et [${a}${m}] une médiane. Que vaut ${a}G ?`,
        ])
      : un([
          `G est le centre de gravité du triangle ${a}${b}${c}, [${a}${m}] une médiane, et G${m} = ${x} ${u}. Combien mesure ${a}${m} ?`,
          `Sur la médiane [${a}${m}] du triangle ${a}${b}${c}, de centre de gravité G, on lit G${m} = ${x} ${u}. Calcule ${a}${m}.`,
          `G${m} = ${x} ${u}, avec G centre de gravité du triangle ${a}${b}${c} et [${a}${m}] une médiane. Que vaut ${a}${m} ?`,
        ]);
    const rep = veutSommet ? 2 * x : 3 * x;
    return {
      text,
      format: "short",
      expected: mesure(rep, u),
      comparator: "number_equal",
      canvas: figMedianes(a, b, c, t, "G", m, mb, mc),
      explanation: expliquer(DEF_GRAVITE, `G${m} est le tiers de la médiane, ${a}G ses deux tiers.`, veutSommet ? `${x} × 2 = ${rep}.` : `${x} × 3 = ${rep}.`, `la longueur cherchée est ${rep} ${u}.`),
    };
  }),

  /* ===== BISSECTRICE ET ÉQUIDISTANCE ===== */

  tpl("bissectrice_equidistance", 1, 1, "Un point de la bissectrice est à la même distance des deux côtés.", () => {
    const [s, b, c] = nomsTriangle();
    const [m, p, q] = nomsLibres([s, b, c], 3);
    const u = un(UNITES);
    const d = entre(2, 40);
    const text = un([
      `${m} est sur la bissectrice de l’angle ${ang(b, s, c)}. La distance de ${m} à (${s}${b}) est ${d} ${u}. Quelle est la distance de ${m} à (${s}${c}) ?`,
      `La distance de ${m} à la droite (${s}${b}) vaut ${d} ${u}, et ${m} appartient à la bissectrice de ${ang(b, s, c)}. Donne sa distance à (${s}${c}).`,
      `Sur la bissectrice de ${ang(b, s, c)}, un point ${m} est à ${d} ${u} de (${s}${b}). À quelle distance est-il de (${s}${c}) ?`,
      `${m} est à ${d} ${u} de la droite (${s}${b}). Il est sur la bissectrice de ${ang(b, s, c)}. Combien vaut sa distance à (${s}${c}) ?`,
      `Bissectrice de ${ang(b, s, c)}, point ${m}, distance à (${s}${b}) : ${d} ${u}. Quelle est sa distance à (${s}${c}) ?`,
      `Calcule la distance de ${m} à (${s}${c}), sachant que ${m} est sur la bissectrice de ${ang(b, s, c)} et à ${d} ${u} de (${s}${b}).`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(d, u),
      comparator: "number_equal",
      canvas: figEquidistance(s, b, c, m, p, q, entre(50, 110), `${d} ${u}`),
      explanation: expliquer(DEF_BISSECTRICE, "les deux distances sont égales.", `distance à (${s}${c}) = distance à (${s}${b}) = ${d}.`, `la distance est ${d} ${u}.`),
    };
  }),

  tpl("bissectrice_equidistance", 2, 1, "La bissectrice coupe l’angle en deux angles égaux.", () => {
    const [a, b, c] = nomsTriangle();
    const [d] = nomsLibres([a, b, c], 1);
    const total = 2 * entre(14, 70);
    const text = un([
      `[${a}${d}) est la bissectrice de l’angle ${ang(b, a, c)}, qui mesure ${total}°. Combien mesure ${ang(b, a, d)} ?`,
      `L’angle ${ang(b, a, c)} mesure ${total}°, et [${a}${d}) est sa bissectrice. Calcule ${ang(b, a, d)}.`,
      `${ang(b, a, c)} = ${total}° et [${a}${d}) partage cet angle en deux. Que vaut ${ang(d, a, c)} ?`,
      `Bissectrice [${a}${d}) de ${ang(b, a, c)} = ${total}° : quelle est la mesure de ${ang(b, a, d)} ?`,
      `On trace la bissectrice [${a}${d}) d’un angle ${ang(b, a, c)} de ${total}°. Quelle est la mesure de ${ang(d, a, c)} ?`,
      `Donne la mesure de ${ang(b, a, d)}, si [${a}${d}) est la bissectrice de ${ang(b, a, c)} et que cet angle fait ${total}°.`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(total / 2),
      comparator: "number_equal",
      explanation: expliquer(DEF_BISSECTRICE, "on divise l’angle par 2.", `${total} ÷ 2 = ${total / 2}.`, `chaque angle mesure ${total / 2}°.`),
    };
  }),

  tpl("bissectrice_equidistance", 3, 2, "Chaque moitié vaut la moitié de l’angle : l’angle entier est le double.", () => {
    const [a, b, c] = nomsTriangle();
    const [d] = nomsLibres([a, b, c], 1);
    const moitie = entre(14, 70);
    const text = un([
      `[${a}${d}) est la bissectrice de l’angle ${ang(b, a, c)}, et ${ang(b, a, d)} = ${moitie}°. Combien mesure ${ang(b, a, c)} ?`,
      `${ang(b, a, d)} mesure ${moitie}°, et [${a}${d}) est la bissectrice de ${ang(b, a, c)}. Calcule ${ang(b, a, c)}.`,
      `Bissectrice [${a}${d}) de ${ang(b, a, c)}, avec ${ang(b, a, d)} = ${moitie}° : que vaut ${ang(b, a, c)} ?`,
      `On sait que ${ang(b, a, d)} = ${moitie}°, où [${a}${d}) partage ${ang(b, a, c)} en deux. Donne ${ang(b, a, c)}.`,
      `Quelle est la mesure de ${ang(b, a, c)}, si sa bissectrice [${a}${d}) donne ${ang(b, a, d)} = ${moitie}° ?`,
      `La moitié d’un angle ${ang(b, a, c)} mesure ${ang(b, a, d)} = ${moitie}°, avec [${a}${d}) bissectrice. Combien fait l’angle entier ?`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(2 * moitie),
      comparator: "number_equal",
      explanation: expliquer(DEF_BISSECTRICE, "on double la moitié.", `${moitie} × 2 = ${2 * moitie}.`, `${ang(b, a, c)} mesure ${2 * moitie}°.`),
    };
  }),

  tpl("bissectrice_equidistance", 4, 2, "À égale distance des deux côtés : le point est sur la bissectrice. Sinon, non.", () => {
    const [s, b, c] = nomsTriangle();
    const [m] = nomsLibres([s, b, c], 1);
    const u = un(UNITES);
    const d = entre(2, 30);
    const egale = Math.random() < 0.5;
    const e = egale ? d : d + entre(1, 6);
    const dedans = un(["à l’intérieur de", "dans"]);
    const text = un([
      `${m} est ${dedans} l’angle ${ang(b, s, c)}. Il est à ${d} ${u} de (${s}${b}) et à ${e} ${u} de (${s}${c}). Que peut-on dire de ${m} ?`,
      `Le point ${m}, ${dedans} l’angle ${ang(b, s, c)}, est à ${d} ${u} de (${s}${b}) et à ${e} ${u} de (${s}${c}). Que conclure ?`,
      `Distance de ${m} à (${s}${b}) : ${d} ${u}. Distance de ${m} à (${s}${c}) : ${e} ${u}. ${m} est ${dedans} ${ang(b, s, c)}. Choisis la bonne conclusion.`,
    ]);
    const juste = egale ? `${m} est sur la bissectrice de ${ang(b, s, c)}` : `${m} n’est pas sur la bissectrice de ${ang(b, s, c)}`;
    const autre = egale ? `${m} n’est pas sur la bissectrice de ${ang(b, s, c)}` : `${m} est sur la bissectrice de ${ang(b, s, c)}`;
    return {
      text,
      format: "qcm",
      choices: melange([juste, autre, `${m} est le milieu de [${b}${c}]`, `${m} est sur la droite (${s}${b})`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expliquer(DEF_BISSECTRICE, "un point à l’intérieur de l’angle est sur la bissectrice exactement quand ses deux distances aux côtés sont égales.", `${d} et ${e} sont ${egale ? "égales" : "différentes"}.`, `${juste}.`),
    };
  }),

  tpl("bissectrice_equidistance", 5, 3, "La bissectrice est faite des points à égale distance des deux côtés.", () => {
    const C = un(CROISEMENTS);
    const d = entre(C.min, C.max);
    const fem = C.lieu.startsWith("une ");
    const il = fem ? "elle" : "il";
    const text = un([
      `${C.lignes} se croisent. ${C.suit} suit la bissectrice de l’angle qu’elles forment, et ${C.lieu} s’y trouve, à ${d} ${C.u} de l’une d’elles. À quelle distance est-${il} de l’autre ?`,
      `${C.lignes} se rejoignent en un point. ${C.suit} partage leur angle en deux. ${cap(C.lieu)}, le long de cette bissectrice, est à ${d} ${C.u} de la première. Quelle est sa distance à la seconde ?`,
      `${C.lignes} forment un angle. ${cap(C.lieu)} est ${fem ? "placée" : "placé"} sur sa bissectrice, à ${d} ${C.u} de la première. Quelle distance ${fem ? "la" : "le"} sépare de la seconde ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(d, C.u),
      comparator: "number_equal",
      explanation: expliquer(DEF_BISSECTRICE, "les deux distances sont égales.", `${d} = ${d}.`, `la distance est ${d} ${C.u}.`),
    };
  }),

  tpl("bissectrice_equidistance", 6, 3, "Commence par l’angle au sommet : 180° moins les deux autres. Puis coupe-le en deux.", () => {
    const [a, b, c] = nomsTriangle();
    const [d] = nomsLibres([a, b, c], 1);
    const A = 2 * entre(16, 44);
    const B = entre(35, 180 - A - 35);
    const C = 180 - A - B;
    const t = triangleParAngles(A, B, C);
    const text = un([
      `Dans le triangle ${a}${b}${c}, ${ang(a, b, c)} = ${B}° et ${ang(a, c, b)} = ${C}°. [${a}${d}] est la bissectrice issue de ${a}. Combien mesure ${ang(b, a, d)} ?`,
      `Le triangle ${a}${b}${c} a pour angles ${ang(a, b, c)} = ${B}° et ${ang(a, c, b)} = ${C}°. La bissectrice de ${ang(b, a, c)} coupe [${b}${c}] en ${d}. Calcule ${ang(b, a, d)}.`,
      `${ang(a, b, c)} = ${B}°, ${ang(a, c, b)} = ${C}° dans le triangle ${a}${b}${c}. On trace la bissectrice [${a}${d}]. Que vaut ${ang(d, a, c)} ?`,
      `Triangle ${a}${b}${c}, ${ang(a, b, c)} = ${B}°, ${ang(a, c, b)} = ${C}°, bissectrice [${a}${d}]. Quelle est la mesure de ${ang(d, a, c)} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(A / 2),
      comparator: "number_equal",
      canvas: figBissectriceTriangle(a, b, c, d, t),
      explanation: expliquer(DEF_BISSECTRICE, "la somme des angles d’un triangle donne l’angle au sommet, puis on le divise par 2.", `180 − ${B} − ${C} = ${A}, puis ${A} ÷ 2 = ${A / 2}.`, `l’angle cherché mesure ${A / 2}°.`),
    };
  }),

  tpl("bissectrice_equidistance", 7, 4, "Dans le triangle formé par la bissectrice, la somme des angles fait encore 180°.", () => {
    const [a, b, c] = nomsTriangle();
    const [d] = nomsLibres([a, b, c], 1);
    const A = 2 * entre(16, 44);
    const B = entre(35, 180 - A - 35);
    const C = 180 - A - B;
    const t = triangleParAngles(A, B, C);
    const juste = 180 - B - A / 2;
    const text = un([
      `Dans le triangle ${a}${b}${c}, ${ang(a, b, c)} = ${B}° et ${ang(a, c, b)} = ${C}°. La bissectrice de ${ang(b, a, c)} coupe [${b}${c}] en ${d}. Combien mesure ${ang(a, d, b)} ?`,
      `${ang(a, b, c)} = ${B}°, ${ang(a, c, b)} = ${C}°. [${a}${d}] est la bissectrice issue de ${a} dans le triangle ${a}${b}${c}, avec ${d} sur [${b}${c}]. Calcule ${ang(a, d, b)}.`,
      `Le triangle ${a}${b}${c} a pour angles ${ang(a, b, c)} = ${B}° et ${ang(a, c, b)} = ${C}°. ${d} est le pied de la bissectrice issue de ${a}. Que vaut ${ang(a, d, b)} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(juste),
      comparator: "number_equal",
      canvas: figBissectriceTriangle(a, b, c, d, t),
      explanation: expliquer(DEF_BISSECTRICE, `on calcule ${ang(b, a, d)}, puis on utilise la somme des angles du triangle ${a}${b}${d}.`, `180 − ${B} − ${C} = ${A} ; ${A} ÷ 2 = ${A / 2} ; 180 − ${B} − ${A / 2} = ${juste}.`, `${ang(a, d, b)} mesure ${juste}°.`),
    };
  }),

  tpl("bissectrice_equidistance", 8, 4, "Le pied de la bissectrice est à la même distance des deux côtés : deux triangles, deux hauteurs égales.", () => {
    const [a, b, c] = nomsTriangle();
    const [d] = nomsLibres([a, b, c], 1);
    const u = un(["cm", "dm", "m"]);
    const x = entre(5, 20);
    const y = entre(5, 20);
    const h = entre(2, 4) * 2;
    const A = ((x + y) * h) / 2;
    const text = un([
      `Dans le triangle ${a}${b}${c}, ${a}${b} = ${x} ${u} et ${a}${c} = ${y} ${u}. ${d} est le pied de la bissectrice issue de ${a}, à ${h} ${u} de (${a}${b}). Quelle est l’aire du triangle ${a}${b}${c} ?`,
      `${a}${b} = ${x} ${u}, ${a}${c} = ${y} ${u}. La bissectrice issue de ${a} coupe [${b}${c}] en ${d}, qui est à ${h} ${u} de (${a}${b}). Calcule l’aire du triangle ${a}${b}${c}.`,
      `Triangle ${a}${b}${c} : ${a}${b} = ${x} ${u}, ${a}${c} = ${y} ${u}, ${d} sur [${b}${c}] et sur la bissectrice de ${ang(b, a, c)}. Sa distance à (${a}${b}) vaut ${h} ${u}. Donne l’aire de ${a}${b}${c}.`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(A, `${u}²`),
      comparator: "number_equal",
      explanation: expliquer(DEF_BISSECTRICE, `${d} est à ${h} ${u} de chacun des côtés : on ajoute les aires de ${a}${b}${d} et ${a}${c}${d}.`, `${x} × ${h} ÷ 2 + ${y} × ${h} ÷ 2 = ${fr((x * h) / 2)} + ${fr((y * h) / 2)} = ${fr(A)}.`, `l’aire est ${fr(A)} ${u}².`),
    };
  }),

  /* ===== CERCLE INSCRIT ===== */

  tpl("cercle_inscrit", 1, 1, "Le centre du cercle inscrit est à la même distance des côtés : pense aux bissectrices.", () => {
    const { a, b, c, t } = tirage();
    const feux = nomsLibres([a, b, c, "I"], 3);
    const text = un([
      `Le centre du cercle inscrit dans le triangle ${a}${b}${c} est le point de rencontre de quelles droites ?`,
      `Quelles droites du triangle ${a}${b}${c} se coupent au centre de son cercle inscrit ?`,
      `Pour trouver le centre du cercle inscrit du triangle ${a}${b}${c}, quelles droites trace-t-on ?`,
      `I est le centre du cercle inscrit du triangle ${a}${b}${c}. Par quelles droites passe-t-il ?`,
      `Quelles droites faut-il tracer pour placer le centre du cercle inscrit du triangle ${a}${b}${c} ?`,
      `Triangle ${a}${b}${c} : son cercle inscrit a pour centre l’intersection de quelles droites ?`,
    ]);
    const juste = "ses bissectrices";
    return {
      text,
      format: "qcm",
      choices: qcm(juste, ["ses médiatrices", "ses médianes", "ses hauteurs"]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figInscrit(a, b, c, "I", t, feux),
      explanation: expliquer(DEF_INSCRIT, "le centre doit être à égale distance des trois côtés, ce qui est le propre des bissectrices.", "médiatrices : cercle circonscrit ; médianes : centre de gravité ; hauteurs : orthocentre.", "ce sont les bissectrices."),
    };
  }),

  tpl("cercle_inscrit", 2, 1, "Le centre du cercle inscrit est à la même distance des trois côtés.", () => {
    const { a, b, c, t } = tirage();
    const feux = nomsLibres([a, b, c, "I"], 3);
    const u = un(UNITES);
    const d = entre(2, 30);
    const text = un([
      `I est le centre du cercle inscrit du triangle ${a}${b}${c}. La distance de I à (${a}${b}) est ${d} ${u}. Quelle est la distance de I à (${b}${c}) ?`,
      `Dans le triangle ${a}${b}${c}, I est le centre du cercle inscrit, à ${d} ${u} de (${a}${b}). Donne sa distance à (${a}${c}).`,
      `Le centre I du cercle inscrit du triangle ${a}${b}${c} est à ${d} ${u} de (${b}${c}). À quelle distance est-il de (${a}${b}) ?`,
      `Cercle inscrit de centre I dans le triangle ${a}${b}${c}. Distance de I à (${a}${c}) : ${d} ${u}. Que vaut sa distance à (${b}${c}) ?`,
      `Quelle est la distance de I à (${a}${c}), si I est le centre du cercle inscrit du triangle ${a}${b}${c} et s’il est à ${d} ${u} de (${a}${b}) ?`,
      `Triangle ${a}${b}${c}, centre du cercle inscrit I, distance à (${b}${c}) : ${d} ${u}. Quelle distance sépare I de (${a}${c}) ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(d, u),
      comparator: "number_equal",
      canvas: figInscrit(a, b, c, "I", t, feux),
      explanation: expliquer(DEF_INSCRIT, "les trois distances sont égales.", `elles valent toutes ${d}.`, `la distance est ${d} ${u}.`),
    };
  }),

  tpl("cercle_inscrit", 3, 2, "Le rayon du cercle inscrit est la distance du centre aux côtés ; le diamètre en est le double.", () => {
    const { a, b, c, t } = tirage();
    const feux = nomsLibres([a, b, c, "I"], 3);
    const u = un(UNITES);
    const r = entre(2, 25);
    const text = un([
      `Le cercle inscrit dans le triangle ${a}${b}${c}, de centre I, a un diamètre de ${2 * r} ${u}. Quelle est la distance de I à (${a}${b}) ?`,
      `Dans le triangle ${a}${b}${c}, le cercle inscrit de centre I a pour diamètre ${2 * r} ${u}. Calcule la distance de I à (${b}${c}).`,
      `Diamètre du cercle inscrit du triangle ${a}${b}${c} : ${2 * r} ${u}. À quelle distance son centre I est-il de (${a}${c}) ?`,
      `I est le centre du cercle inscrit du triangle ${a}${b}${c}, de diamètre ${2 * r} ${u}. Donne la distance de I à (${a}${b}).`,
      `Le triangle ${a}${b}${c} contient un cercle inscrit de centre I et de ${2 * r} ${u} de diamètre. Que vaut la distance de I à (${b}${c}) ?`,
      `Quelle distance sépare I de (${a}${c}), si le cercle inscrit de centre I du triangle ${a}${b}${c} a un diamètre de ${2 * r} ${u} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(r, u),
      comparator: "number_equal",
      canvas: figInscrit(a, b, c, "I", t, feux),
      explanation: expliquer(DEF_INSCRIT, "la distance de I à un côté est le rayon, moitié du diamètre.", `${2 * r} ÷ 2 = ${r}.`, `la distance est ${r} ${u}.`),
    };
  }),

  tpl("cercle_inscrit", 4, 2, "Le centre est sur la bissectrice : l’angle au sommet est coupé en deux.", () => {
    const { a, b, c, t } = tirage();
    const feux = nomsLibres([a, b, c, "I"], 3);
    const A = 2 * entre(16, 60);
    const text = un([
      `I est le centre du cercle inscrit du triangle ${a}${b}${c}, et ${ang(b, a, c)} = ${A}°. Combien mesure ${ang(b, a, "I")} ?`,
      `Dans le triangle ${a}${b}${c}, ${ang(b, a, c)} = ${A}°. Le centre du cercle inscrit est I. Calcule ${ang("I", a, c)}.`,
      `${ang(b, a, c)} mesure ${A}°, et I est le centre du cercle inscrit du triangle ${a}${b}${c}. Que vaut ${ang(b, a, "I")} ?`,
      `Triangle ${a}${b}${c}, ${ang(b, a, c)} = ${A}°, centre du cercle inscrit I. Donne ${ang("I", a, c)}.`,
      `Quelle est la mesure de ${ang(b, a, "I")}, si I est le centre du cercle inscrit de ${a}${b}${c} et ${ang(b, a, c)} = ${A}° ?`,
      `Le cercle inscrit du triangle ${a}${b}${c} a pour centre I. On sait que ${ang(b, a, c)} = ${A}°. Quelle est la mesure de ${ang("I", a, c)} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(A / 2),
      comparator: "number_equal",
      canvas: figInscrit(a, b, c, "I", t, feux, true, false),
      explanation: expliquer(DEF_INSCRIT, `[${a}I) est la bissectrice de ${ang(b, a, c)}.`, `${A} ÷ 2 = ${A / 2}.`, `l’angle mesure ${A / 2}°.`),
    };
  }),

  tpl("cercle_inscrit", 5, 3, "À égale distance des COINS : médiatrices. À égale distance des BORDS : bissectrices.", () => {
    const L = un(LIEUX_TROIS);
    const parBords = Math.random() < 0.5;
    const cible = parBords ? L.bords : L.coins;
    const fem = L.q.startsWith("une ");
    const zone = L.z.charAt(0).toLowerCase() + L.z.slice(1);
    const text = un([
      `${L.z} doit recevoir ${L.q}, ${fem ? "placée" : "placé"} à la même distance de ${cible}. Quelles droites faut-il tracer pour trouver cet endroit ?`,
      `Dans ${zone}, on veut installer ${L.q} à égale distance de ${cible}. Quelles droites tracer sur le plan ?`,
      `${L.z} est dessiné${L.z.startsWith("Une") ? "e" : ""} sur un plan. Pour y poser ${L.q} à la même distance de ${cible}, quelles droites tracer ?`,
    ]);
    const juste = parBords ? "les bissectrices du triangle" : "les médiatrices du triangle";
    return {
      text,
      format: "qcm",
      choices: qcm(juste, parBords ? ["les médiatrices du triangle", "les médianes du triangle", "les hauteurs du triangle"] : ["les bissectrices du triangle", "les médianes du triangle", "les hauteurs du triangle"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expliquer(
        parBords ? DEF_INSCRIT : "un point à égale distance des trois sommets est le centre du cercle circonscrit, à l’intersection des médiatrices.",
        parBords ? "ici, on se mesure aux bords : ce sont les côtés du triangle." : "ici, on se mesure aux coins : ce sont les sommets du triangle.",
        parBords ? "distance aux côtés → bissectrices." : "distance aux sommets → médiatrices.",
        `il faut tracer ${juste}.`,
      ),
    };
  }),

  tpl("cercle_inscrit", 6, 3, "Aire du triangle = périmètre × rayon du cercle inscrit ÷ 2.", () => {
    const r = entre(1, 6);
    const p = 2 * entre(6 * r, 12 * r);
    const O = un(SURFACES.filter((s) => s.u !== "cm²"));
    const u = O.u.replace("²", "");
    const text = un([
      `${O.o} a un périmètre de ${p} ${u}. Le plus grand cercle qu’on peut y tracer a un rayon de ${r} ${u}. Quelle est son aire ?`,
      `${O.o} mesure ${p} ${u} de périmètre, et son cercle inscrit a pour rayon ${r} ${u}. Calcule l’aire de cette surface.`,
      `${O.o}, de périmètre ${p} ${u}, contient un cercle inscrit de rayon ${r} ${u}. Combien mesure son aire ?`,
    ]);
    const A = (p * r) / 2;
    return {
      text,
      format: "short",
      expected: mesure(A, O.u),
      comparator: "number_equal",
      explanation: expliquer(DEF_INSCRIT, "trois triangles de sommet I, de hauteur r, recouvrent le grand triangle : l’aire vaut périmètre × r ÷ 2.", `${p} × ${r} ÷ 2 = ${A}.`, `l’aire est ${A} ${O.u}.`),
    };
  }),

  tpl("cercle_inscrit", 7, 4, "Aire d’un triangle rectangle, puis rayon = 2 × aire ÷ périmètre.", () => {
    const [a, b, c] = nomsTriangle();
    const u = un(UNITES);
    const [x, y, z] = un(TRIPLETS_PYTHAGORE);
    const A = (x * y) / 2;
    const p = x + y + z;
    const text = un([
      `Le triangle ${a}${b}${c} est rectangle en ${a}, avec ${a}${b} = ${x} ${u}, ${a}${c} = ${y} ${u} et ${b}${c} = ${z} ${u}. Quel est le rayon de son cercle inscrit ?`,
      `${a}${b}${c} est rectangle en ${a} : ${a}${b} = ${x} ${u}, ${a}${c} = ${y} ${u}, ${b}${c} = ${z} ${u}. Calcule le rayon du cercle inscrit.`,
      `Angle droit en ${a}, ${a}${b} = ${x} ${u}, ${a}${c} = ${y} ${u}, ${b}${c} = ${z} ${u}. Donne le rayon du cercle inscrit de ce triangle ${a}${b}${c}.`,
    ]);
    const r = (2 * A) / p;
    return {
      text,
      format: "short",
      expected: mesure(r, u),
      comparator: "number_equal",
      explanation: expliquer(DEF_INSCRIT, "aire = périmètre × r ÷ 2, donc r = 2 × aire ÷ périmètre.", `aire : ${x} × ${y} ÷ 2 = ${fr(A)} ; périmètre : ${p} ; r = 2 × ${fr(A)} ÷ ${p} = ${fr(r)}.`, `le rayon est ${fr(r)} ${u}.`),
    };
  }),

  tpl("cercle_inscrit", 8, 4, "Dans le triangle formé par I et deux sommets, chaque angle est une moitié d’angle du grand triangle.", () => {
    const [a, b, c] = nomsTriangle();
    const B = 2 * entre(20, 42);
    const C = 2 * entre(20, Math.min(42, Math.floor((150 - B) / 2)));
    const A = 180 - B - C;
    const t = triangleParAngles(A, B, C);
    const juste = 180 - B / 2 - C / 2;
    const feux = nomsLibres([a, b, c, "I"], 3);
    const text = un([
      `Dans le triangle ${a}${b}${c}, ${ang(a, b, c)} = ${B}° et ${ang(a, c, b)} = ${C}°. I est le centre du cercle inscrit. Combien mesure ${ang(b, "I", c)} ?`,
      `I est le centre du cercle inscrit du triangle ${a}${b}${c}, où ${ang(a, b, c)} = ${B}° et ${ang(a, c, b)} = ${C}°. Calcule ${ang(b, "I", c)}.`,
      `${ang(a, b, c)} = ${B}°, ${ang(a, c, b)} = ${C}°, et I centre du cercle inscrit de ${a}${b}${c}. Que vaut ${ang(b, "I", c)} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(juste),
      comparator: "number_equal",
      canvas: figInscrit(a, b, c, "I", t, feux, true, false),
      explanation: expliquer(DEF_INSCRIT, `[${b}I) et [${c}I) sont des bissectrices : on divise ${B}° et ${C}° par 2, puis on utilise la somme des angles du triangle ${b}I${c}.`, `180 − ${B / 2} − ${C / 2} = ${juste}.`, `${ang(b, "I", c)} mesure ${juste}°.`),
    };
  }),

  tpl("cercle_inscrit", 9, 4, "Aire = périmètre × rayon ÷ 2 : on la retourne pour trouver le rayon.", () => {
    const u = un(["cm", "dm", "m", "mm"]);
    const r = entre(2, 8);
    const p = 2 * entre(6 * r, 12 * r);
    const A = (p * r) / 2;
    const text = un([
      `Un triangle a une aire de ${A} ${u}² et un périmètre de ${p} ${u}. Quel est le rayon de son cercle inscrit ?`,
      `Aire : ${A} ${u}². Périmètre : ${p} ${u}. Calcule le rayon du cercle inscrit de ce triangle.`,
      `Le cercle inscrit d’un triangle d’aire ${A} ${u}² et de périmètre ${p} ${u} a quel rayon ?`,
      `Donne le rayon du cercle inscrit d’un triangle : son aire vaut ${A} ${u}² et son périmètre ${p} ${u}.`,
      `Dans un triangle de ${A} ${u}² et de ${p} ${u} de périmètre, combien mesure le rayon du cercle inscrit ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(r, u),
      comparator: "number_equal",
      explanation: expliquer(DEF_INSCRIT, "aire = périmètre × r ÷ 2, donc r = 2 × aire ÷ périmètre.", `2 × ${A} ÷ ${p} = ${r}.`, `le rayon est ${r} ${u}.`),
    };
  }),

  /* ===== ORTHOCENTRE ===== */

  tpl("orthocentre", 1, 1, "Les hauteurs se coupent à l’orthocentre.", () => {
    const { a, b, c, t } = tirage();
    const feux = nomsLibres([a, b, c, "H"], 3);
    const text = un([
      `Dans le triangle ${a}${b}${c}, les trois hauteurs se coupent en H. Comment s’appelle H ?`,
      `Les hauteurs du triangle ${a}${b}${c} se rencontrent en H. Quel est le nom de H ?`,
      `H est le point commun aux trois hauteurs du triangle ${a}${b}${c}. Comment l’appelle-t-on ?`,
      `On trace les hauteurs du triangle ${a}${b}${c} : elles passent toutes par H. Que représente H ?`,
      `Quel nom porte le point H où se croisent les hauteurs du triangle ${a}${b}${c} ?`,
      `Triangle ${a}${b}${c} : ses trois hauteurs concourent en H. Comment se nomme ce point ?`,
    ]);
    const juste = "l’orthocentre";
    return {
      text,
      format: "qcm",
      choices: qcm(juste, ["le centre de gravité", "le centre du cercle inscrit", "le centre du cercle circonscrit"]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figHauteurs(a, b, c, t, feux, 3, "H"),
      explanation: expliquer(DEF_ORTHO, "les hauteurs ont chacune un angle droit avec un côté.", "elles se rencontrent toutes en H.", "H est l’orthocentre."),
    };
  }),

  tpl("orthocentre", 2, 1, "La hauteur issue d’un sommet est perpendiculaire au côté qui ne contient pas ce sommet.", () => {
    const { a, b, c, t } = tirage();
    const text = un([
      `Dans le triangle ${a}${b}${c}, la hauteur issue de ${a} est perpendiculaire à quelle droite ?`,
      `À quelle droite la hauteur issue de ${a} du triangle ${a}${b}${c} est-elle perpendiculaire ?`,
      `On trace la hauteur partant de ${a} dans le triangle ${a}${b}${c}. Quelle droite coupe-t-elle à angle droit ?`,
      `Triangle ${a}${b}${c} : la hauteur issue de ${a} forme un angle droit avec quelle droite ?`,
      `Quelle droite est perpendiculaire à la hauteur issue de ${a} du triangle ${a}${b}${c} ?`,
      `Pour tracer la hauteur issue de ${a} dans le triangle ${a}${b}${c}, à quelle droite doit-elle être perpendiculaire ?`,
    ]);
    const juste = `(${b}${c})`;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`(${a}${b})`, `(${a}${c})`, `la médiane issue de ${a}`]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureConstruction({ [a]: t.A, [b]: t.B, [c]: t.C }, { polygones: [contour(a, b, c)], description: "Un triangle" }),
      explanation: expliquer(DEF_ORTHO, `le côté opposé à ${a} est porté par (${b}${c}).`, `la hauteur issue de ${a} coupe (${b}${c}) à angle droit.`, `elle est perpendiculaire à (${b}${c}).`),
    };
  }),

  tpl("orthocentre", 3, 2, "Dans un triangle rectangle, les deux côtés de l’angle droit sont déjà deux hauteurs.", () => {
    const [a, b, c] = nomsTriangle();
    const B = entre(30, 60);
    const t = triangleParAngles(90, B, 90 - B);
    const text = un([
      `Le triangle ${a}${b}${c} est rectangle en ${a}. Où se trouve son orthocentre ?`,
      `${a}${b}${c} est rectangle en ${a}. Où est le point de rencontre de ses hauteurs ?`,
      `Où se coupent les hauteurs du triangle ${a}${b}${c}, rectangle en ${a} ?`,
      `Dans un triangle ${a}${b}${c} rectangle en ${a}, où place-t-on l’orthocentre ?`,
      `Angle droit en ${a} dans le triangle ${a}${b}${c}. Quelle est la position de l’orthocentre ?`,
      `Choisis la position de l’orthocentre du triangle ${a}${b}${c}, rectangle en ${a}.`,
    ]);
    const juste = `au sommet ${a}`;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`au milieu de [${b}${c}]`, `au sommet ${b}`, "à l’extérieur du triangle"]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureConstruction({ [a]: t.A, [b]: t.B, [c]: t.C }, { polygones: [contour(a, b, c)], angles: [{ sommet: a, de: b, vers: c, droit: true }], description: "Un triangle rectangle" }),
      explanation: expliquer(DEF_ORTHO, `(${a}${b}) et (${a}${c}) sont perpendiculaires : chacune est une hauteur, et elles se coupent en ${a}.`, `la hauteur issue de ${b} est (${b}${a}), celle issue de ${c} est (${c}${a}).`, `l’orthocentre est ${a}.`),
    };
  }),

  tpl("orthocentre", 4, 2, "Suis les deux hauteurs tracées : l’orthocentre est leur point commun.", () => {
    let t = triangleAigu();
    // Les trois points marqués doivent se lire séparément.
    while (dist(orthocentre(t), centreCirconscrit(t)) < 0.6) t = triangleAigu();
    const { a, b, c } = tirage(t);
    const [d, e, f, x, y, z] = nomsLibres([a, b, c], 6);
    const noms = melange([x, y, z]);
    const juste = noms[0];
    return {
      text: un([
        `Sur la figure, deux hauteurs du triangle ${a}${b}${c} sont tracées. Quel point est l’orthocentre ?`,
        `Voici deux hauteurs du triangle ${a}${b}${c}. Lequel de ces points est son orthocentre ?`,
        `Le triangle ${a}${b}${c} porte deux hauteurs. Choisis son orthocentre parmi les points marqués.`,
        `Regarde les deux hauteurs tracées dans le triangle ${a}${b}${c}. Où est l’orthocentre ?`,
        `Observe les angles droits du triangle ${a}${b}${c}. Quel point marqué est l’orthocentre ?`,
      ]),
      format: "qcm",
      choices: melange(noms),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: (() => {
        const base = figHauteurs(a, b, c, t, [d, e, f], 2);
        return { ...base, points: [...base.points, { id: noms[0], ...orthocentre(t), couleur: "#7c3aed" }, { id: noms[1], ...centreGravite(t), couleur: "#7c3aed" }, { id: noms[2], ...centreCirconscrit(t), couleur: "#7c3aed" }] };
      })(),
      explanation: expliquer(DEF_ORTHO, "deux hauteurs suffisent : la troisième passe par le même point.", `les hauteurs tracées se croisent en ${juste}.`, `l’orthocentre est ${juste}.`),
    };
  }),

  tpl("orthocentre", 5, 3, "La hauteur crée un triangle rectangle : ses deux angles aigus font 90° à eux deux.", () => {
    const [a, b, c] = nomsTriangle();
    const [d] = nomsLibres([a, b, c], 1);
    const B = entre(25, 75);
    const C = entre(35, 70);
    const A = 180 - B - C;
    const t = triangleParAngles(A, B, C);
    const text = un([
      `Dans le triangle ${a}${b}${c}, ${d} est le pied de la hauteur issue de ${a}, et ${ang(a, b, c)} = ${B}°. Combien mesure ${ang(b, a, d)} ?`,
      `[${a}${d}] est une hauteur du triangle ${a}${b}${c}, avec ${ang(a, b, c)} = ${B}°. Calcule ${ang(b, a, d)}.`,
      `${ang(a, b, c)} mesure ${B}°, et ${d} est le pied de la hauteur issue de ${a} sur (${b}${c}). Que vaut ${ang(b, a, d)} ?`,
      `Triangle ${a}${b}${c}, hauteur [${a}${d}], ${ang(a, b, c)} = ${B}°. Donne ${ang(b, a, d)}.`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(90 - B),
      comparator: "number_equal",
      canvas: figHauteurs(a, b, c, t, [d, "", ""], 1),
      explanation: expliquer(DEF_ORTHO, `le triangle ${a}${b}${d} est rectangle en ${d} : ses angles aigus font 90° à eux deux.`, `90 − ${B} = ${90 - B}.`, `${ang(b, a, d)} mesure ${90 - B}°.`),
    };
  }),

  tpl("orthocentre", 6, 3, "La hauteur coupe la base à angle droit : un triangle rectangle apparaît.", () => {
    const T = un(TOITS);
    const B = entre(20, 65);
    const text = un([
      `${T.o} est un triangle. ${cap(T.pied)} part du sommet et tombe perpendiculairement sur ${T.base}. Le bord gauche fait un angle de ${B}° avec ${T.base}. Quel angle fait ${T.pied} avec ce bord ?`,
      `${T.o} a la forme d’un triangle dont ${T.pied} est une hauteur. L’angle entre le bord gauche et ${T.base} mesure ${B}°. Combien mesure l’angle entre ${T.pied} et le bord gauche ?`,
      `Dans ${T.o.charAt(0).toLowerCase() + T.o.slice(1)}, ${T.pied} joue le rôle de hauteur sur ${T.base}. Le bord gauche et ${T.base} font ${B}°. Calcule l’angle entre ${T.pied} et le bord gauche.`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(90 - B),
      comparator: "number_equal",
      explanation: expliquer(DEF_ORTHO, "le bord, la hauteur et la base forment un triangle rectangle : ses angles aigus font 90° à eux deux.", `90 − ${B} = ${90 - B}.`, `l’angle mesure ${90 - B}°.`),
    };
  }),

  tpl("orthocentre", 7, 3, "Les trois hauteurs passent par l’orthocentre : la droite qui joint le dernier sommet à H en est une.", () => {
    const { a, b, c, t } = tirage();
    const [d, e, f] = nomsLibres([a, b, c, "H"], 3);
    const text = un([
      `Dans le triangle ${a}${b}${c}, les hauteurs issues de ${a} et de ${b} se coupent en H. Que peut-on dire de (${c}H) ?`,
      `H est le point d’intersection des hauteurs issues de ${a} et de ${b} du triangle ${a}${b}${c}. Choisis ce qui est vrai pour (${c}H).`,
      `On a tracé deux hauteurs du triangle ${a}${b}${c}, celles issues de ${a} et de ${b} : elles se croisent en H. Quelle est la position de (${c}H) ?`,
      `Deux hauteurs du triangle ${a}${b}${c} se coupent en H, celles de ${a} et de ${b}. Que sait-on sur la droite (${c}H) ?`,
    ]);
    const juste = `(${c}H) est perpendiculaire à (${a}${b})`;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`(${c}H) est parallèle à (${a}${b})`, `(${c}H) passe par le milieu de [${a}${b}]`, `(${c}H) est perpendiculaire à (${b}${c})`]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: { ...figHauteurs(a, b, c, t, [d, e, f], 2), points: [...figHauteurs(a, b, c, t, [d, e, f], 2).points, { id: "H", ...orthocentre(t) }] },
      explanation: expliquer(DEF_ORTHO, "les trois hauteurs passent par un même point : (" + c + "H) est donc la troisième.", `la hauteur issue de ${c} est perpendiculaire à (${a}${b}).`, `${juste}.`),
    };
  }),

  tpl("orthocentre", 8, 4, "Dans le quadrilatère de sommets A, un pied, H, un autre pied, deux angles sont droits.", () => {
    const [a, b, c] = nomsTriangle();
    const A = entre(35, 80);
    const B = entre(Math.max(45, 91 - A), Math.min(85, 180 - A - 45));
    const C = 180 - A - B;
    const t = triangleParAngles(A, B, C);
    const [d, e, f] = nomsLibres([a, b, c, "H"], 3);
    const text = un([
      `Le triangle ${a}${b}${c} a ses trois angles aigus, et ${ang(b, a, c)} = ${A}°. H est son orthocentre. Combien mesure ${ang(b, "H", c)} ?`,
      `H est l’orthocentre du triangle ${a}${b}${c}, dont les angles sont aigus. On sait que ${ang(b, a, c)} = ${A}°. Calcule ${ang(b, "H", c)}.`,
      `${ang(b, a, c)} = ${A}°, H orthocentre du triangle aux angles aigus ${a}${b}${c}. Que vaut ${ang(b, "H", c)} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(180 - A),
      comparator: "number_equal",
      canvas: { ...figHauteurs(a, b, c, t, [d, e, f], 2), points: [...figHauteurs(a, b, c, t, [d, e, f], 2).points, { id: "H", ...orthocentre(t) }] },
      explanation: expliquer(DEF_ORTHO, `dans le quadrilatère formé par ${a}, H et les pieds des hauteurs issues de ${b} et de ${c}, deux angles sont droits ; la somme de ses angles fait 360°.`, `360 − 90 − 90 − ${A} = ${180 - A}, et ${ang(b, "H", c)} lui est opposé par le sommet.`, `${ang(b, "H", c)} mesure ${180 - A}°.`),
    };
  }),

  tpl("orthocentre", 9, 4, "L’aire se calcule avec n’importe quel côté et sa hauteur : c’est la même aire.", () => {
    const [a, b, c] = nomsTriangle();
    const u = un(UNITES);
    const A2 = un([60, 72, 84, 90, 96, 120, 144, 180]);
    const diviseurs = [4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20].filter((x) => A2 % x === 0);
    const x = un(diviseurs);
    let y = un(diviseurs);
    while (y === x) y = un(diviseurs);
    const hx = A2 / x;
    const hy = A2 / y;
    const text = un([
      `Dans le triangle ${a}${b}${c}, ${b}${c} = ${x} ${u} et la hauteur issue de ${a} mesure ${hx} ${u}. On sait aussi que ${a}${c} = ${y} ${u}. Combien mesure la hauteur issue de ${b} ?`,
      `${b}${c} = ${x} ${u}, hauteur issue de ${a} : ${hx} ${u}, et ${a}${c} = ${y} ${u}. Calcule la hauteur issue de ${b} dans le triangle ${a}${b}${c}.`,
      `Le triangle ${a}${b}${c} a un côté ${b}${c} = ${x} ${u}, de hauteur relative ${hx} ${u}. Son côté ${a}${c} mesure ${y} ${u}. Que vaut la hauteur relative à ce côté ?`,
    ]);
    return {
      text,
      format: "short",
      expected: mesure(hy, u),
      comparator: "number_equal",
      explanation: expliquer("l’aire d’un triangle vaut côté × hauteur relative ÷ 2, quel que soit le côté choisi.", `on calcule l’aire avec ${b}${c}, puis on écrit la même aire avec ${a}${c}.`, `${x} × ${hx} = ${A2}, puis ${A2} ÷ ${y} = ${hy}.`, `la hauteur issue de ${b} mesure ${hy} ${u}.`),
    };
  }),
];
