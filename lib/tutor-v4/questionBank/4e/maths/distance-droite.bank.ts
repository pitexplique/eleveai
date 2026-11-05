// DISTANCE D'UN POINT À UNE DROITE, DE DEUX PARALLÈLES (05/11/2026).
//
// Maroc, Belgique, Sénégal, Côte d'Ivoire. Le BO de 6e (`knowledge/maths/6e/bo-objectifs.ts`)
// ne cite que la distance entre deux points et à un point ; le cycle 4 n'en parle pas, et
// le projeté orthogonal a quitté la 2de française : notion masquée, voir
// `lib/tutor-v4/micros-masquees.ts`.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. Figures calculées : le pied est vraiment le pied,
// les obliques ont vraiment leur longueur. Le correcteur le contrôle SUR la figure.

import { figureConstruction, point, type P } from "@/lib/canvas/construction";
import { cap, entre, expliquer, fabriqueGabarits, fr, mesure, melange, qcm, un, UNITES } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const tpl = fabriqueGabarits("4e", "distance_droite", ["distance", "droite", "perpendiculaire", "canvas"]);

const DEF_P = "la distance d’un point à une droite est la longueur du segment perpendiculaire qui les relie : c’est le plus court de tous les segments allant du point à la droite.";
const DEF_D = "la distance entre deux droites parallèles est la longueur d’un segment perpendiculaire aux deux : elle est la même partout.";

const phrase = (debuts: readonly string[], fins: readonly string[]) => `${un(debuts)} ${un(fins)}`;

/** Une distance h, et des écarts au pied qui donnent des obliques entières : [écart, oblique]. */
const FAMILLES: Record<number, [number, number][]> = {
  6: [[8, 10], [4.5, 7.5], [2.5, 6.5]],
  8: [[6, 10], [15, 17]],
  12: [[5, 13], [9, 15], [16, 20], [35, 37]],
  15: [[8, 17], [20, 25], [36, 39]],
  20: [[15, 25], [21, 29], [48, 52]],
  24: [[7, 25], [10, 26], [18, 30], [32, 40]],
};
const H_FAM = [6, 8, 12, 15, 20, 24];

const TRIPLETS: [number, number, number][] = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [7, 24, 25], [20, 21, 29]];

const POINTS = ["A", "B", "C", "E", "F", "L", "P", "R", "S", "W"];
const LIGNES: [string, string][] = [["(d)", "(d′)"], ["(d₁)", "(d₂)"], ["(Δ)", "(Δ′)"], ["(D)", "(D′)"]];
const UNE_LIGNE = ["(d)", "(Δ)", "(D)", "(d₁)"];

/** Tourne la figure : une droite n'est pas forcément horizontale. */
function tourner(pts: Record<string, P>, degres: number) {
  const c = Math.cos((degres * Math.PI) / 180);
  const s = Math.sin((degres * Math.PI) / 180);
  return Object.fromEntries(Object.entries(pts).map(([k, p]) => [k, point(p.x * c - p.y * s, p.x * s + p.y * c)]));
}

/**
 * Le point p, la droite, son pied h, des points sur la droite aux écarts donnés.
 * `droit` : on marque l'angle droit (sinon, c'est à l'élève de le trouver).
 */
function figPointDroite(o: { p: string; h: string; d: string; h0: number; obliques: { nom: string; x: number; texte?: string }[]; texteH?: string; droit?: boolean }) {
  const L = Math.max(o.h0, ...o.obliques.map((m) => Math.abs(m.x)), 1);
  const pts = tourner(
    {
      [o.p]: point(0, o.h0),
      [o.h]: point(0, 0),
      x1: point(-1.3 * L, 0),
      x2: point(1.3 * L, 0),
      x3: point(1.1 * L, 0),
      ...Object.fromEntries(o.obliques.map((m) => [m.nom, point(m.x, 0)])),
    },
    un([0, 0, -12, 10, 18]),
  );
  return figureConstruction(
    pts,
    {
      droites: [{ a: "x1", b: "x2" }],
      segments: [
        { a: "x3", b: "x2", couleur: "#2563eb", texte: o.d, sansTrait: true },
        // Avec des obliques, la couleur désignait la réponse : seul l'angle droit la montre.
        { a: o.p, b: o.h, couleur: o.obliques.length ? "#64748b" : "#dc2626", texte: o.texteH },
        ...o.obliques.map((m) => ({ a: o.p, b: m.nom, couleur: "#64748b", texte: m.texte })),
      ],
      angles: o.droit === false ? [] : [{ sommet: o.h, de: o.p, vers: "x2", droit: true }],
      description: `Un point, la droite ${o.d} et des segments du point à la droite`,
    },
    ["x1", "x2", "x3"],
  );
}

/** Deux parallèles, un segment perpendiculaire [a h], et un segment oblique [m n]. */
function figParalleles(o: { a: string; h: string; d1: string; d2: string; h0: number; n?: string; ecart?: number; texteH?: string; texteO?: string; droit?: boolean; b?: string; xb?: number }) {
  const e = o.ecart ?? 0;
  const L = Math.max(o.h0, Math.abs(e) + 1, Math.abs(o.xb ?? 0));
  const base: Record<string, P> = {
    [o.a]: point(0, o.h0),
    [o.h]: point(0, 0),
    x1: point(-1.3 * L, 0),
    x2: point(1.3 * L, 0),
    x3: point(1.1 * L, 0),
    y1: point(-1.3 * L, o.h0),
    y2: point(1.3 * L, o.h0),
    y3: point(1.1 * L, o.h0),
  };
  if (o.n) base[o.n] = point(e, 0);
  if (o.b) base[o.b] = point(o.xb ?? L * 0.7, o.h0);
  const pts = tourner(base, un([0, 0, -10, 8, 15]));
  return figureConstruction(
    pts,
    {
      droites: [{ a: "x1", b: "x2" }, { a: "y1", b: "y2" }],
      segments: [
        { a: "x3", b: "x2", couleur: "#2563eb", texte: o.d2, sansTrait: true },
        { a: "y3", b: "y2", couleur: "#2563eb", texte: o.d1, sansTrait: true },
        { a: o.a, b: o.h, couleur: o.n ? "#64748b" : "#dc2626", texte: o.texteH },
        ...(o.n ? [{ a: o.a, b: o.n, couleur: "#64748b", texte: o.texteO }] : []),
      ],
      angles: o.droit === false ? [] : [{ sommet: o.h, de: o.a, vers: "x2", droit: true }],
      description: `Deux droites parallèles ${o.d1} et ${o.d2}, et des segments de l’une à l’autre`,
    },
    ["x1", "x2", "x3", "y1", "y2", "y3"],
  );
}

/** Deux droites et un point placé entre elles, à distance donnée de chacune. */
function figEntre(p: string, d1: string, d2: string, h1: number, h2: number) {
  const L = h1 + h2;
  const pts = tourner(
    { [p]: point(0, h2), a: point(0, L), b: point(0, 0), x1: point(-L, 0), x2: point(L, 0), x3: point(0.8 * L, 0), y1: point(-L, L), y2: point(L, L), y3: point(0.8 * L, L) },
    un([0, 0, -10, 8]),
  );
  return figureConstruction(
    pts,
    {
      droites: [{ a: "x1", b: "x2" }, { a: "y1", b: "y2" }],
      segments: [{ a: "x3", b: "x2", couleur: "#2563eb", texte: d2, sansTrait: true }, { a: "y3", b: "y2", couleur: "#2563eb", texte: d1, sansTrait: true }, { a: "a", b: "b", couleur: "#dc2626" }],
      angles: [{ sommet: "b", de: "a", vers: "x2", droit: true }],
      description: "Un point entre deux droites parallèles",
    },
    ["a", "b", "x1", "x2", "x3", "y1", "y2", "y3"],
  );
}

/** « à la route », « au sentier » ; « de la route », « du sentier » ; « d’une maison ». */
const aL = (x: string) => x.replace(/^le /, "au ").replace(/^(la |l’)/, "à $1");
const deL = (x: string) => x.replace(/^le /, "du ").replace(/^(la |l’)/, "de $1").replace(/^(un|une) /, "d’$1 ");
const bas = (x: string) => x.charAt(0).toLowerCase() + x.slice(1);
/** « le phare », « la maison » : on reparle de ce qu'on vient de nommer. */
const defini = (x: string) => x.replace(/^Une /, "la ").replace(/^Un /, "le ");

const noms = () => {
  const m = melange(POINTS);
  return { p: m[0], h: un(["H", "K", "J"].filter((x) => x !== m[0])), m: m[1], n: m[2] };
};

/* Le point, la droite : situations du ★3. La distance est toujours la plus courte. */
const CHEMINS: { o: string; dr: string; u: string; k: number; bref: string }[] = [
  { o: "Une maison", dr: "la route", u: "m", k: 5, bref: "une allée" },
  { o: "Un nageur", dr: "la plage", u: "m", k: 5, bref: "un trajet" },
  { o: "Un randonneur", dr: "le sentier", u: "m", k: 10, bref: "un raccourci" },
  { o: "Une pompière", dr: "la rivière", u: "m", k: 10, bref: "un tuyau" },
  { o: "Un voilier", dr: "la côte", u: "m", k: 50, bref: "un trajet" },
  { o: "Un lampadaire", dr: "le trottoir", u: "cm", k: 5, bref: "un câble" },
  { o: "Une ferme", dr: "la ligne électrique", u: "m", k: 10, bref: "un raccordement" },
  { o: "Une joueuse de foot", dr: "la ligne de touche", u: "m", k: 1, bref: "un sprint" },
  { o: "Un puits", dr: "le canal", u: "m", k: 5, bref: "un tuyau" },
  { o: "Un phare", dr: "le rivage", u: "m", k: 20, bref: "un chemin" },
  { o: "Une tortue marine", dr: "le récif de Saint-Leu", u: "m", k: 5, bref: "un trajet" },
  { o: "Une cycliste", dr: "la piste cyclable", u: "m", k: 2, bref: "un passage" },
];

const AIRES_T: { o: string; dr: string; u: string; k: number }[] = [
  { o: "Une parcelle triangulaire", dr: "la route", u: "m", k: 5 },
  { o: "Une voile triangulaire", dr: "la bôme", u: "dm", k: 1 },
  { o: "Un pré triangulaire", dr: "le chemin", u: "m", k: 10 },
  { o: "Une tuile triangulaire", dr: "la gouttière", u: "cm", k: 1 },
  { o: "Un fanion triangulaire", dr: "la hampe", u: "cm", k: 2 },
  { o: "Un jardin triangulaire", dr: "la clôture", u: "m", k: 2 },
  { o: "Une enseigne triangulaire", dr: "le mur", u: "cm", k: 5 },
  { o: "Un terrain de pétanque triangulaire", dr: "l’allée", u: "m", k: 1 },
  { o: "Une bâche triangulaire", dr: "le mât", u: "dm", k: 2 },
  { o: "Un massif triangulaire", dr: "le mur", u: "m", k: 1 },
];

const BANDES: { o: string; u: string; h: [number, number]; q: string; oblique: string }[] = [
  { o: "Les deux rives de ce canal", u: "m", h: [6, 40], q: "Quelle est la largeur du canal ?", oblique: "une passerelle en biais" },
  { o: "Les deux rails de cette voie de tram", u: "mm", h: [800, 1500], q: "Quel est l’écartement des rails ?", oblique: "une traverse posée en biais" },
  { o: "Les deux trottoirs de cette avenue", u: "m", h: [8, 30], q: "Quelle est la largeur de l’avenue ?", oblique: "un passage piéton en biais" },
  { o: "Les deux lignes de ce couloir de piste", u: "cm", h: [100, 130], q: "Quelle est la largeur du couloir ?", oblique: "une trace en biais" },
  { o: "Les deux berges de cette rivière", u: "m", h: [10, 60], q: "Quelle est la largeur de la rivière ?", oblique: "un bac en biais" },
  { o: "Les deux bords de cette route", u: "m", h: [5, 14], q: "Quelle est la largeur de la route ?", oblique: "une trace de pneu en biais" },
  { o: "Les deux lignes de ce terrain de tennis", u: "m", h: [8, 11], q: "Quelle est la largeur du terrain ?", oblique: "une course en biais" },
  { o: "Les deux murs de ce couloir", u: "cm", h: [90, 200], q: "Quelle est la largeur du couloir ?", oblique: "une planche en biais" },
  { o: "Les deux bords de cette étagère", u: "cm", h: [20, 50], q: "Quelle est la profondeur de l’étagère ?", oblique: "une équerre en biais" },
  { o: "Les deux bords de cette bande de tissu", u: "cm", h: [10, 60], q: "Quelle est la largeur de la bande ?", oblique: "une coupe en biais" },
  { o: "Les deux rives de ce détroit", u: "km", h: [5, 40], q: "Quelle est la largeur du détroit ?", oblique: "une traversée en biais" },
];

const REGULIERS: { o: string; f: string; u: string; e: [number, number]; n: [number, number]; pl: string }[] = [
  { o: "Une portée de musique", f: "lignes", u: "mm", e: [2, 4], n: [5, 5], pl: "de la première ligne à la dernière" },
  { o: "Une échelle", f: "barreaux", u: "cm", e: [25, 35], n: [6, 14], pl: "du premier barreau au dernier" },
  { o: "Une page de cahier", f: "lignes", u: "mm", e: [6, 10], n: [12, 30], pl: "de la première ligne à la dernière" },
  { o: "Un store", f: "lamelles", u: "cm", e: [3, 8], n: [12, 30], pl: "de la première lamelle à la dernière" },
  { o: "Une vigne", f: "rangs", u: "m", e: [1, 3], n: [8, 30], pl: "du premier rang au dernier" },
  { o: "Une bibliothèque", f: "étagères", u: "cm", e: [25, 40], n: [4, 8], pl: "de la première étagère à la dernière" },
  { o: "Une piscine", f: "lignes d’eau", u: "m", e: [2, 3], n: [5, 9], pl: "de la première ligne d’eau à la dernière" },
  { o: "Un champ de maïs", f: "rangs", u: "cm", e: [60, 90], n: [6, 20], pl: "du premier rang au dernier" },
  { o: "Un potager", f: "sillons", u: "cm", e: [30, 60], n: [5, 15], pl: "du premier sillon au dernier" },
  { o: "Une guitare", f: "cordes", u: "mm", e: [7, 10], n: [6, 6], pl: "de la première corde à la dernière" },
  { o: "Un escalier", f: "marches", u: "cm", e: [16, 20], n: [8, 16], pl: "de la première marche à la dernière, en hauteur" },
];

const PARALLELOGRAMMES: { o: string; u: string; k: number; dr: string }[] = [
  { o: "Une parcelle en parallélogramme", u: "m", k: 5, dr: "entre la route et le chemin qui la bordent" },
  { o: "Un carreau en parallélogramme", u: "cm", k: 1, dr: "entre ses deux longs côtés" },
  { o: "Un parking en parallélogramme", u: "m", k: 2, dr: "entre ses deux longs côtés" },
  { o: "Une plaque de métal en parallélogramme", u: "cm", k: 2, dr: "entre ses deux longs côtés" },
  { o: "Un pré en parallélogramme", u: "m", k: 10, dr: "entre les deux haies parallèles" },
  { o: "Une tapisserie en parallélogramme", u: "dm", k: 1, dr: "entre ses deux longs côtés" },
  { o: "Un champ en parallélogramme", u: "m", k: 10, dr: "entre les deux fossés parallèles" },
  { o: "Un pavé en parallélogramme", u: "cm", k: 1, dr: "entre ses deux longs côtés" },
  { o: "Une terrasse en parallélogramme", u: "dm", k: 2, dr: "entre ses deux longs côtés" },
];

export const distanceDroiteBank = [
  /* ===== DISTANCE D'UN POINT À UNE DROITE ===== */

  tpl("distance_point_droite", 1, 1, "La distance se mesure sur le segment perpendiculaire à la droite.", () => {
    const u = un(UNITES);
    const { p, h, m } = noms();
    const d = un(UNE_LIGNE);
    const h0 = un(H_FAM);
    const [x, o] = un(FAMILLES[h0]);
    const text = phrase(
      [
        `${h} est le pied de la perpendiculaire à ${d} passant par ${p}. On a ${p}${h} = ${h0} ${u} et ${p}${m} = ${fr(o)} ${u}, avec ${m} sur ${d}.`,
        `Le point ${p} n’est pas sur ${d}. ${h} et ${m} sont sur ${d}, et (${p}${h}) est perpendiculaire à ${d}. On a ${p}${h} = ${h0} ${u} et ${p}${m} = ${fr(o)} ${u}.`,
        `${h} et ${m} sont deux points de ${d}, avec (${p}${h}) perpendiculaire à ${d}. On mesure ${p}${m} = ${fr(o)} ${u} et ${p}${h} = ${h0} ${u}.`,
        `Sur la figure, ${p}${m} = ${fr(o)} ${u} et ${p}${h} = ${h0} ${u}, et l’angle droit est en ${h}.`,
      ],
      [`Quelle est la distance de ${p} à ${d} ?`, `Donne la distance du point ${p} à ${d}.`, `À quelle distance de ${d} se trouve ${p} ?`, `Que vaut la distance de ${p} à la droite ${d} ?`],
    );
    return { text, format: "short", expected: mesure(h0, u), comparator: "number_equal", canvas: figPointDroite({ p, h, d, h0, obliques: [{ nom: m, x }] }), explanation: expliquer(DEF_P, `[${p}${h}] est perpendiculaire à ${d}, pas [${p}${m}].`, `${p}${h} = ${h0}.`, `la distance vaut ${h0} ${u}.`) };
  }),

  tpl("distance_point_droite", 2, 1, "Cherche l’angle droit sur la figure.", () => {
    const { p, h, m, n } = noms();
    const d = un(UNE_LIGNE);
    const h0 = 3;
    const x1 = entre(2, 4);
    const x2 = -entre(2, 4);
    const text = phrase(
      [`Regarde la figure.`, `Voici le point ${p} et la droite ${d}.`, `${h}, ${m} et ${n} sont sur ${d}.`, `Sur cette figure, trois segments relient ${p} à ${d}.`, `Le point ${p} n’est pas sur ${d}.`],
      [`Quel segment donne la distance de ${p} à ${d} ?`, `Quelle longueur faut-il mesurer pour avoir la distance de ${p} à ${d} ?`, `Lequel de ces segments mesure la distance de ${p} à ${d} ?`, `Sur quel segment lit-on la distance de ${p} à ${d} ?`],
    );
    const juste = `[${p}${h}]`;
    return { text, format: "qcm", choices: qcm(juste, [`[${p}${m}]`, `[${p}${n}]`, `[${h}${m}]`]), expected: [juste], comparator: "mcq_exact", canvas: figPointDroite({ p, h, d, h0, obliques: [{ nom: m, x: x1 }, { nom: n, x: x2 }] }), explanation: expliquer(DEF_P, "on cherche le segment qui fait un angle droit avec la droite.", `[${p}${h}] est perpendiculaire à ${d}.`, `c’est [${p}${h}].`) };
  }),

  tpl("distance_point_droite", 3, 1, "La distance, c’est la plus courte : le segment perpendiculaire.", () => {
    const p = un(POINTS);
    const d = un(UNE_LIGNE);
    const h = un(["H", "K", "J"].filter((x) => x !== p));
    const text = un([
      `Qu’appelle-t-on la distance du point ${p} à la droite ${d} ?`,
      `La distance de ${p} à ${d}, qu’est-ce que c’est ?`,
      `Que mesure la distance d’un point ${p} à une droite ${d} ?`,
      `Comment définit-on la distance de ${p} à ${d} ?`,
      `On parle de la distance de ${p} à ${d}. De quelle longueur s’agit-il ?`,
      `Quelle phrase définit la distance de ${p} à ${d} ?`,
    ]);
    const juste = "La longueur du segment perpendiculaire à la droite, issu du point";
    return { text, format: "qcm", choices: qcm(juste, ["La longueur de n’importe quel segment allant du point à la droite", "La plus grande longueur entre le point et la droite", "La longueur de la droite"]), expected: [juste], comparator: "mcq_exact", canvas: figPointDroite({ p, h, d, h0: 3, obliques: [] }), explanation: expliquer(DEF_P, "de tous les segments, le perpendiculaire est le plus court.", "c’est lui qui mesure l’écart.", "c’est la longueur du segment perpendiculaire.") };
  }),

  tpl("distance_point_droite", 4, 1, "Le plus court des segments est le perpendiculaire.", () => {
    const u = un(UNITES);
    const { p, m, n } = noms();
    const h = un(["T", "U", "V"]);
    const d = un(UNE_LIGNE);
    const h0 = un([12, 15, 20, 24]);
    const fam = melange(FAMILLES[h0]);
    const ordre = melange([
      { nom: h, l: h0, x: 0 },
      { nom: m, l: fam[0][1], x: fam[0][0] },
      { nom: n, l: fam[1][1], x: -fam[1][0] },
    ]);
    const donnees = ordre.map((o) => `${p}${o.nom} = ${fr(o.l)} ${u}`).join(", ");
    const text = phrase(
      [`${h}, ${m} et ${n} sont trois points de ${d}, et ${p} n’est pas sur ${d} : ${donnees}.`, `Depuis ${p}, on trace trois segments jusqu’à ${d} : ${donnees}.`, `Trois segments relient ${p} à la droite ${d} : ${donnees}.`, `On relie ${p} à trois points de ${d} : ${donnees}.`],
      [`L’un d’eux est perpendiculaire à ${d}. Lequel ?`, `Lequel est perpendiculaire à ${d} ?`, `Quel segment est perpendiculaire à ${d} ?`, `Lequel donne la distance de ${p} à ${d} ?`],
    );
    const juste = `[${p}${h}]`;
    return { text, format: "qcm", choices: qcm(juste, [`[${p}${m}]`, `[${p}${n}]`, `Aucun des trois`]), expected: [juste], comparator: "mcq_exact", canvas: figPointDroite({ p, h, d, h0, obliques: [{ nom: m, x: fam[0][0] }, { nom: n, x: -fam[1][0] }], droit: false }), explanation: expliquer(DEF_P, "le segment perpendiculaire est le plus court de tous.", `${h0} est la plus petite des trois longueurs.`, `c’est [${p}${h}].`) };
  }),

  tpl("distance_point_droite", 5, 2, "Pythagore dans le triangle rectangle en H : la distance est un côté de l’angle droit.", () => {
    const u = un(UNITES);
    const { p, h, m } = noms();
    const d = un(UNE_LIGNE);
    const [x, h0, o] = un(TRIPLETS);
    const text = phrase(
      [
        `${h} est le pied de la perpendiculaire à ${d} passant par ${p}, et ${m} est sur ${d}. On a ${p}${m} = ${o} ${u} et ${h}${m} = ${x} ${u}.`,
        `La perpendiculaire à ${d} passant par ${p} coupe ${d} en ${h}. ${m} est un autre point de ${d}, avec ${p}${m} = ${o} ${u} et ${h}${m} = ${x} ${u}.`,
        `${h} et ${m} sont sur ${d}, et (${p}${h}) est perpendiculaire à ${d}. On connaît ${p}${m} = ${o} ${u} et ${h}${m} = ${x} ${u}.`,
      ],
      [`Calcule la distance de ${p} à ${d}.`, `Quelle est la distance de ${p} à ${d} ?`, `Trouve la distance du point ${p} à ${d}.`, `Que vaut la distance de ${p} à ${d} ?`, `À quelle distance de ${d} se trouve ${p} ?`],
    );
    return { text, format: "short", expected: mesure(h0, u), comparator: "number_equal", canvas: figPointDroite({ p, h, d, h0, obliques: [{ nom: m, x, texte: `${o} ${u}` }] }), explanation: expliquer(DEF_P, `le triangle ${p}${h}${m} est rectangle en ${h} : Pythagore.`, `${p}${h}² = ${o}² − ${x}² = ${o * o} − ${x * x} = ${h0 * h0}.`, `la distance vaut ${h0} ${u}.`) };
  }),

  tpl("distance_point_droite", 6, 2, "Tout point de la droite est au moins à cette distance du point.", () => {
    const u = un(UNITES);
    const { p, m } = noms();
    const d = un(UNE_LIGNE);
    const h0 = entre(5, 30);
    const v = entre(1, 9);
    const juste = `${h0 + v} ${u}`;
    const text = phrase(
      [`La distance de ${p} à ${d} vaut ${h0} ${u}, et ${m} est un point de ${d}.`, `Le point ${p} est à ${h0} ${u} de ${d}. Le point ${m} est sur ${d}.`, `${m} est un point de ${d}, et ${p} se trouve à ${h0} ${u} de cette droite.`, `Le point ${p} est à une distance de ${h0} ${u} de ${d}, et ${m} appartient à ${d}.`],
      [`Quelle longueur est possible pour ${p}${m} ?`, `Laquelle de ces valeurs peut être ${p}${m} ?`, `Que peut mesurer ${p}${m} ?`, `Choisis la seule longueur possible pour ${p}${m}.`],
    );
    const faux = [1, 2, 3, 4].map((k) => `${h0 - k} ${u}`);
    return { text, format: "qcm", choices: qcm(juste, faux), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_P, "aucun segment de la droite au point n’est plus court que la distance.", `${p}${m} ≥ ${h0}.`, `seule ${juste} convient.`) };
  }),

  tpl("distance_point_droite", 7, 2, "La hauteur d’un triangle est une distance : du sommet au côté opposé.", () => {
    const u = un(UNITES);
    const [A, B, C] = melange(["M", "N", "P"]);
    const h = "H";
    const [x, h0, o] = un(TRIPLETS);
    const text = phrase(
      [
        `Dans le triangle ${A}${B}${C}, [${A}${h}] est la hauteur issue de ${A}. On a ${A}${h} = ${h0} ${u} et ${A}${B} = ${o} ${u}.`,
        `${A}${B}${C} est un triangle, et ${h} est le pied de la hauteur issue de ${A} : ${A}${B} = ${o} ${u} et ${A}${h} = ${h0} ${u}.`,
        `Le triangle ${A}${B}${C} a pour hauteur [${A}${h}], avec ${A}${h} = ${h0} ${u} et ${A}${B} = ${o} ${u}.`,
      ],
      [`Quelle est la distance de ${A} à (${B}${C}) ?`, `À quelle distance de (${B}${C}) se trouve ${A} ?`, `Donne la distance du point ${A} à la droite (${B}${C}).`, `Que vaut la distance de ${A} à (${B}${C}) ?`],
    );
    const pts = tourner({ [A]: point(0, h0), [h]: point(0, 0), [B]: point(x, 0), [C]: point(-entre(2, 6) - x / 3, 0) }, un([0, 0, 8, -8]));
    const canvas = figureConstruction(pts, { polygones: [{ sommets: [A, B, C] }], segments: [{ a: A, b: h, couleur: "#dc2626", pointille: true }, { a: A, b: B, texte: `${o} ${u}` }], angles: [{ sommet: h, de: A, vers: B, droit: true }], description: `Le triangle ${A}${B}${C} et sa hauteur issue de ${A}` });
    return { text, format: "short", expected: mesure(h0, u), comparator: "number_equal", canvas, explanation: expliquer(DEF_P, `la hauteur [${A}${h}] est perpendiculaire à (${B}${C}).`, `${A}${h} = ${h0}.`, `la distance vaut ${h0} ${u}.`) };
  }),

  tpl("distance_point_droite", 8, 2, "Dans un rectangle, les côtés voisins sont perpendiculaires.", () => {
    const u = un(UNITES);
    const L = entre(6, 30);
    const l = entre(3, L - 1);
    const cas = un([
      { pt: "C", dr: "(AB)", v: l },
      { pt: "D", dr: "(AB)", v: l },
      { pt: "A", dr: "(CD)", v: l },
      { pt: "B", dr: "(CD)", v: l },
      { pt: "A", dr: "(BC)", v: L },
      { pt: "D", dr: "(BC)", v: L },
      { pt: "B", dr: "(AD)", v: L },
      { pt: "C", dr: "(AD)", v: L },
    ]);
    const text = phrase(
      [`ABCD est un rectangle, avec AB = ${L} ${u} et BC = ${l} ${u}.`, `Le rectangle ABCD a pour longueur AB = ${L} ${u} et pour largeur BC = ${l} ${u}.`, `Dans le rectangle ABCD, AB = ${L} ${u} et BC = ${l} ${u}.`, `On trace un rectangle ABCD tel que AB = ${L} ${u} et BC = ${l} ${u}.`],
      [`Quelle est la distance de ${cas.pt} à ${cas.dr} ?`, `À quelle distance de ${cas.dr} se trouve ${cas.pt} ?`, `Donne la distance du point ${cas.pt} à ${cas.dr}.`, `Que vaut la distance de ${cas.pt} à ${cas.dr} ?`],
    );
    const canvas = figureConstruction({ A: point(0, 0), B: point(L, 0), C: point(L, l), D: point(0, l) }, { polygones: [{ sommets: ["A", "B", "C", "D"] }], segments: [{ a: "A", b: "B", texte: `${L} ${u}` }, { a: "B", b: "C", texte: `${l} ${u}` }], angles: [{ sommet: "A", de: "B", vers: "D", droit: true }, { sommet: "B", de: "A", vers: "C", droit: true }, { sommet: "C", de: "B", vers: "D", droit: true }, { sommet: "D", de: "A", vers: "C", droit: true }], description: "Le rectangle ABCD" });
    return { text, format: "short", expected: mesure(cas.v, u), comparator: "number_equal", canvas, explanation: expliquer(DEF_P, `depuis ${cas.pt}, on suit le côté perpendiculaire à ${cas.dr}.`, `ce côté mesure ${cas.v}.`, `la distance vaut ${cas.v} ${u}.`) };
  }),

  tpl("distance_point_droite", 9, 3, "Le chemin le plus court est perpendiculaire : c’est lui, la distance.", () => {
    const o = un(CHEMINS);
    const h0 = un([6, 8, 12, 15, 20, 24]);
    const [, ob] = un(FAMILLES[h0]);
    const d = h0 * o.k;
    const b = ob * o.k;
    const lui = bas(o.o);
    const text = phrase(
      [
        `${o.o} est à ${fr(d)} ${o.u} ${deL(o.dr)} en suivant la perpendiculaire, et à ${fr(b)} ${o.u} par ${o.bref} en biais.`,
        `Entre ${lui} et ${o.dr}, on mesure ${fr(b)} ${o.u} en biais et ${fr(d)} ${o.u} perpendiculairement.`,
        `On mesure ${fr(d)} ${o.u} depuis ${lui}, perpendiculairement ${aL(o.dr)}, et ${fr(b)} ${o.u} par ${o.bref} en biais.`,
      ],
      [`Quelle est la distance entre ${defini(o.o)} et ${o.dr} ?`, `À quelle distance ${deL(o.dr)} se trouve ${defini(o.o)} ?`, `Quelle est la vraie distance ${deL(defini(o.o))} ${aL(o.dr)} ?`],
    );
    return { text, format: "short", expected: mesure(d, o.u), comparator: "number_equal", canvas: figPointDroite({ p: "P", h: "H", d: "(d)", h0, obliques: [{ nom: "M", x: Math.sqrt(ob * ob - h0 * h0) }] }), explanation: expliquer(DEF_P, "le chemin perpendiculaire est le plus court.", `${fr(d)} ${o.u} < ${fr(b)} ${o.u}.`, `la distance est de ${fr(d)} ${o.u}.`) };
  }),

  tpl("distance_point_droite", 10, 3, "Le trajet en biais, le pied et le point forment un triangle rectangle : Pythagore.", () => {
    const o = un(CHEMINS);
    const [x, h0, ob] = un(TRIPLETS);
    const k = o.k;
    const text = phrase(
      [
        `${o.o} se trouve à ${fr(ob * k)} ${o.u} d’un point ${deL(o.dr)}. Ce point est à ${fr(x * k)} ${o.u} du pied de la perpendiculaire.`,
        `En ligne droite, ${bas(o.o)} est à ${fr(ob * k)} ${o.u} d’un repère sur ${o.dr}. Ce repère est à ${fr(x * k)} ${o.u} du pied de la perpendiculaire.`,
        `${o.bref.charAt(0).toUpperCase() + o.bref.slice(1)} en biais de ${fr(ob * k)} ${o.u} part ${deL(bas(o.o))} vers ${o.dr}, et arrive à ${fr(x * k)} ${o.u} du pied de la perpendiculaire.`,
      ],
      [`Calcule la distance ${deL(defini(o.o))} ${aL(o.dr)}.`, `Quelle est la distance ${deL(defini(o.o))} ${aL(o.dr)} ?`, `Quelle est la plus courte distance ${deL(defini(o.o))} ${aL(o.dr)} ?`],
    );
    return { text, format: "short", expected: mesure(h0 * k, o.u), comparator: "number_equal", canvas: figPointDroite({ p: "P", h: "H", d: "(d)", h0, obliques: [{ nom: "M", x, texte: `${fr(ob * k)} ${o.u}` }] }), explanation: expliquer(DEF_P, "on applique Pythagore dans le triangle rectangle.", `${fr(ob * k)}² − ${fr(x * k)}² = ${fr(h0 * k * h0 * k)}.`, `la distance est de ${fr(h0 * k)} ${o.u}.`) };
  }),

  tpl("distance_point_droite", 11, 3, "Aire du triangle = base × hauteur ÷ 2, et la hauteur est la distance cherchée.", () => {
    const u = un(UNITES);
    const b = 2 * entre(2, 15);
    const h0 = entre(2, 20);
    const a = (b * h0) / 2;
    const [A, B, C] = melange(["R", "S", "T"]);
    const text = phrase(
      [`Le triangle ${A}${B}${C} a une aire de ${a} ${u}², et ${B}${C} = ${b} ${u}.`, `L’aire du triangle ${A}${B}${C} vaut ${a} ${u}². On sait que ${B}${C} = ${b} ${u}.`, `Un triangle ${A}${B}${C} a pour aire ${a} ${u}², avec ${B}${C} = ${b} ${u}.`, `${A}${B}${C} est un triangle d’aire ${a} ${u}², et son côté [${B}${C}] mesure ${b} ${u}.`],
      [`Quelle est la distance de ${A} à (${B}${C}) ?`, `À quelle distance de (${B}${C}) se trouve ${A} ?`, `Calcule la distance de ${A} à (${B}${C}).`, `Trouve la distance du point ${A} à la droite (${B}${C}).`],
    );
    const pts = { [A]: point(b * 0.3, h0), [B]: point(0, 0), [C]: point(b, 0), H: point(b * 0.3, 0) };
    const canvas = figureConstruction(pts, { polygones: [{ sommets: [A, B, C] }], segments: [{ a: A, b: "H", couleur: "#dc2626", pointille: true }, { a: B, b: C, texte: `${b} ${u}` }], angles: [{ sommet: "H", de: A, vers: C, droit: true }], description: `Le triangle ${A}${B}${C}, sa hauteur issue de ${A}` });
    return { text, format: "short", expected: mesure(h0, u), comparator: "number_equal", canvas, explanation: expliquer(DEF_P, "la distance est la hauteur : on remonte la formule de l’aire.", `${a} × 2 ÷ ${b} = ${h0}.`, `la distance vaut ${h0} ${u}.`) };
  }),

  tpl("distance_point_droite", 12, 3, "La surface, un côté : la hauteur sur ce côté est la distance cherchée.", () => {
    const o = un(AIRES_T);
    const b = 2 * entre(4, 20) * o.k;
    const h0 = entre(3, 24) * o.k;
    const a = (b * h0) / 2;
    const bordant = un([`le long ${deL(o.dr)}`, `contre ${o.dr}`, `qui longe ${o.dr}`]);
    const text = phrase(
      [`${o.o} a une aire de ${fr(a)} ${o.u}², avec un côté de ${b} ${o.u} ${bordant}.`, `${o.o} couvre ${fr(a)} ${o.u}². Son côté ${bordant} mesure ${b} ${o.u}.`, `${o.o} a un côté de ${b} ${o.u} ${bordant}, pour une aire de ${fr(a)} ${o.u}².`],
      [`À quelle distance ${deL(o.dr)} se trouve le sommet opposé ?`, `Quelle est la distance du sommet opposé ${aL(o.dr)} ?`, `Calcule la distance entre ${o.dr} et le sommet opposé.`],
    );
    const canvas = figureConstruction({ A: point(b * 0.35, h0), B: point(0, 0), C: point(b, 0), H: point(b * 0.35, 0) }, { polygones: [{ sommets: ["A", "B", "C"] }], segments: [{ a: "A", b: "H", couleur: "#dc2626", pointille: true }, { a: "B", b: "C", texte: `${b} ${o.u}` }], angles: [{ sommet: "H", de: "A", vers: "C", droit: true }], description: "Un triangle, un côté et la hauteur sur ce côté" }, ["A", "B", "C", "H"]);
    return { text, format: "short", expected: mesure(h0, o.u), comparator: "number_equal", canvas, explanation: expliquer(DEF_P, "la distance cherchée est la hauteur du triangle.", `${fr(a)} × 2 ÷ ${b} = ${h0}.`, `la distance est de ${h0} ${o.u}.`) };
  }),

  /* ===== DISTANCE DE DEUX PARALLÈLES ===== */

  tpl("distance_paralleles", 1, 1, "La distance se mesure sur un segment perpendiculaire aux deux droites.", () => {
    const u = un(UNITES);
    const { p: a, h, n } = noms();
    const [d1, d2] = un(LIGNES);
    const h0 = un(H_FAM);
    const [x, o] = un(FAMILLES[h0]);
    const text = phrase(
      [
        `${d1} et ${d2} sont parallèles. ${a} est sur ${d1} ; ${h} et ${n} sont sur ${d2}, et (${a}${h}) est perpendiculaire à ${d2}. On a ${a}${h} = ${h0} ${u} et ${a}${n} = ${fr(o)} ${u}.`,
        `Les droites ${d1} et ${d2} sont parallèles. [${a}${h}] leur est perpendiculaire et mesure ${h0} ${u} ; [${a}${n}] est oblique et mesure ${fr(o)} ${u}.`,
        `Deux droites parallèles ${d1} et ${d2}. Le segment [${a}${h}], perpendiculaire aux deux, mesure ${h0} ${u}. Le segment [${a}${n}], en biais, mesure ${fr(o)} ${u}.`,
        `Sur la figure, ${d1} et ${d2} sont parallèles, ${a}${n} = ${fr(o)} ${u} et ${a}${h} = ${h0} ${u}, avec l’angle droit en ${h}.`,
      ],
      [`Quelle est la distance entre ${d1} et ${d2} ?`, `Donne la distance entre ces deux droites.`, `Quelle distance sépare ${d1} et ${d2} ?`, `Que vaut la distance entre les deux parallèles ?`],
    );
    return { text, format: "short", expected: mesure(h0, u), comparator: "number_equal", canvas: figParalleles({ a, h, d1, d2, h0, n, ecart: x }), explanation: expliquer(DEF_D, `[${a}${h}] est perpendiculaire aux deux droites, pas [${a}${n}].`, `${a}${h} = ${h0}.`, `la distance vaut ${h0} ${u}.`) };
  }),

  tpl("distance_paralleles", 2, 1, "Cherche le segment qui fait un angle droit avec les deux droites.", () => {
    const { p: a, h, n } = noms();
    const [d1, d2] = un(LIGNES);
    const text = phrase(
      [`Regarde la figure : ${d1} et ${d2} sont parallèles.`, `Voici deux droites parallèles, ${d1} et ${d2}.`, `${d1} et ${d2} sont parallèles, ${a} est sur ${d1}.`, `Sur cette figure, deux segments relient ${d1} à ${d2}.`],
      [`Quel segment donne la distance entre elles ?`, `Sur quel segment lit-on la distance entre ces droites ?`, `Quelle longueur faut-il mesurer pour avoir leur distance ?`, `Lequel de ces segments mesure la distance entre les deux droites ?`],
    );
    const juste = `[${a}${h}]`;
    return { text, format: "qcm", choices: qcm(juste, [`[${a}${n}]`, `[${h}${n}]`]), expected: [juste], comparator: "mcq_exact", canvas: figParalleles({ a, h, d1, d2, h0: 3, n, ecart: un([2, 3, 4, -2, -3]) }), explanation: expliquer(DEF_D, "on cherche l’angle droit.", `[${a}${h}] est perpendiculaire à ${d2}.`, `c’est [${a}${h}].`) };
  }),

  tpl("distance_paralleles", 3, 1, "Deux parallèles gardent le même écart partout.", () => {
    const u = un(UNITES);
    const [d1, d2] = un(LIGNES);
    const [a, b] = melange(POINTS);
    const h0 = entre(2, 40);
    const text = phrase(
      [
        `${d1} et ${d2} sont parallèles. ${a} et ${b} sont sur ${d1}. La distance de ${a} à ${d2} vaut ${h0} ${u}.`,
        `Les droites ${d1} et ${d2} sont parallèles, et le point ${a} de ${d1} est à ${h0} ${u} de ${d2}. ${b} est un autre point de ${d1}.`,
        `Deux parallèles ${d1} et ${d2}. ${a} est sur ${d1}, à ${h0} ${u} de ${d2}. ${b} est aussi sur ${d1}.`,
        `${a} et ${b} sont deux points de ${d1}, parallèle à ${d2}. Le point ${a} est à ${h0} ${u} de ${d2}.`,
      ],
      [`Quelle est la distance de ${b} à ${d2} ?`, `À quelle distance de ${d2} se trouve ${b} ?`, `Donne la distance du point ${b} à ${d2}.`, `Que vaut la distance de ${b} à ${d2} ?`],
    );
    return { text, format: "short", expected: mesure(h0, u), comparator: "number_equal", canvas: figParalleles({ a, h: "H", d1, d2, h0: 3, b, texteH: `${h0} ${u}`, xb: 2.2 }), explanation: expliquer(DEF_D, "tous les points d’une parallèle sont à la même distance de l’autre.", `même écart : ${h0}.`, `${b} est à ${h0} ${u} de ${d2}.`) };
  }),

  tpl("distance_paralleles", 4, 1, "La distance de deux parallèles est celle d’un segment perpendiculaire aux deux.", () => {
    const [d1, d2] = un(LIGNES);
    const text = un([
      `Qu’appelle-t-on la distance entre deux droites parallèles ${d1} et ${d2} ?`,
      `La distance entre ${d1} et ${d2}, parallèles, qu’est-ce que c’est ?`,
      `Que mesure la distance entre deux parallèles ${d1} et ${d2} ?`,
      `Comment définit-on la distance entre ${d1} et ${d2}, parallèles ?`,
      `${d1} et ${d2} sont parallèles. De quelle longueur parle-t-on quand on dit « leur distance » ?`,
      `Quelle phrase définit la distance entre les parallèles ${d1} et ${d2} ?`,
      `${d1} et ${d2} sont parallèles. Que faut-il mesurer pour connaître leur distance ?`,
    ]);
    const juste = "La longueur d’un segment perpendiculaire aux deux droites";
    return { text, format: "qcm", choices: qcm(juste, ["La longueur de n’importe quel segment qui les relie", "La longueur du plus grand segment qui les relie", "La longueur d’une des deux droites"]), expected: [juste], comparator: "mcq_exact", canvas: figParalleles({ a: "A", h: "H", d1, d2, h0: 3 }), explanation: expliquer(DEF_D, "le segment perpendiculaire est le plus court.", "il a la même longueur partout.", "c’est la longueur d’un segment perpendiculaire aux deux droites.") };
  }),

  tpl("distance_paralleles", 5, 2, "Le point est entre les droites : on additionne les deux distances.", () => {
    const u = un(UNITES);
    const [d1, d2] = un(LIGNES);
    const p = un(POINTS);
    const a = entre(2, 20);
    const b = entre(2, 20);
    const text = phrase(
      [
        `${d1} et ${d2} sont parallèles. Le point ${p}, entre les deux, est à ${a} ${u} de ${d1} et à ${b} ${u} de ${d2}.`,
        `Entre deux parallèles ${d1} et ${d2}, le point ${p} est à ${a} ${u} de ${d1} et à ${b} ${u} de ${d2}.`,
        `${p} est situé entre ${d1} et ${d2}, parallèles : ${a} ${u} de ${d1}, ${b} ${u} de ${d2}.`,
        `Les droites ${d1} et ${d2} sont parallèles. ${p} est entre elles, à ${a} ${u} de ${d1} et ${b} ${u} de ${d2}.`,
      ],
      [`Quelle est la distance entre ${d1} et ${d2} ?`, `Quelle distance sépare les deux droites ?`, `Calcule la distance entre ces parallèles.`, `Que vaut la distance entre ${d1} et ${d2} ?`],
    );
    return { text, format: "short", expected: mesure(a + b, u), comparator: "number_equal", canvas: figEntre(p, d1, d2, a, b), explanation: expliquer(DEF_D, "le segment perpendiculaire passe par le point : on ajoute.", `${a} + ${b} = ${a + b}.`, `la distance vaut ${a + b} ${u}.`) };
  }),

  tpl("distance_paralleles", 6, 2, "À égale distance des deux droites : la moitié de leur distance.", () => {
    const u = un(UNITES);
    const [d1, d2] = un(LIGNES);
    const p = un(POINTS);
    const D = entre(3, 40);
    const text = phrase(
      [
        `La distance entre les parallèles ${d1} et ${d2} vaut ${D} ${u}. Le point ${p} est à égale distance des deux.`,
        `${d1} et ${d2} sont parallèles, à ${D} ${u} l’une de l’autre. ${p} est à la même distance de chacune.`,
        `Deux parallèles ${d1} et ${d2} sont distantes de ${D} ${u}. Le point ${p} est à égale distance de ces droites.`,
        `Le point ${p} est à égale distance de ${d1} et de ${d2}, parallèles et distantes de ${D} ${u}.`,
      ],
      [`Quelle est la distance de ${p} à ${d1} ?`, `À quelle distance de ${d1} se trouve ${p} ?`, `Calcule la distance de ${p} à ${d1}.`, `Que vaut la distance de ${p} à ${d1} ?`],
    );
    return { text, format: "short", expected: mesure(D / 2, u), comparator: "number_equal", canvas: figEntre(p, d1, d2, D / 2, D / 2), explanation: expliquer(DEF_D, "le point est au milieu du segment perpendiculaire.", `${D} ÷ 2 = ${fr(D / 2)}.`, `${p} est à ${fr(D / 2)} ${u} de ${d1}.`) };
  }),

  tpl("distance_paralleles", 7, 2, "Pythagore : le segment oblique est l’hypoténuse.", () => {
    const u = un(UNITES);
    const { p: a, h, n } = noms();
    const [d1, d2] = un(LIGNES);
    const [x, h0, o] = un(TRIPLETS);
    const text = phrase(
      [
        `${d1} et ${d2} sont parallèles. ${a} est sur ${d1} ; ${h} et ${n} sont sur ${d2}, avec (${a}${h}) perpendiculaire à ${d2}. On a ${a}${n} = ${o} ${u} et ${h}${n} = ${x} ${u}.`,
        `Les parallèles ${d1} et ${d2} sont reliées par [${a}${h}], perpendiculaire, et par [${a}${n}], oblique. ${a}${n} = ${o} ${u} et ${h}${n} = ${x} ${u}.`,
        `Sur la figure, ${d1} et ${d2} sont parallèles, l’angle droit est en ${h}, ${a}${n} = ${o} ${u} et ${h}${n} = ${x} ${u}.`,
      ],
      [`Calcule la distance entre ${d1} et ${d2}.`, `Quelle est la distance entre ces deux droites ?`, `Trouve la distance entre ${d1} et ${d2}.`, `Que vaut la distance entre les deux parallèles ?`, `Quelle distance sépare ${d1} et ${d2} ?`],
    );
    return { text, format: "short", expected: mesure(h0, u), comparator: "number_equal", canvas: figParalleles({ a, h, d1, d2, h0, n, ecart: x, texteO: `${o} ${u}` }), explanation: expliquer(DEF_D, `le triangle ${a}${h}${n} est rectangle en ${h}.`, `${a}${h}² = ${o}² − ${x}² = ${h0 * h0}.`, `la distance vaut ${h0} ${u}.`) };
  }),

  tpl("distance_paralleles", 8, 2, "Dans un parallélogramme, la hauteur est la distance entre deux côtés opposés.", () => {
    const u = un(UNITES);
    const [x, h0, o] = un(TRIPLETS);
    const L = entre(x + 3, x + 20);
    const text = phrase(
      [
        `ABCD est un parallélogramme, [DH] est sa hauteur sur (AB). AB = ${L} ${u}, AD = ${o} ${u} et DH = ${h0} ${u}.`,
        `Dans le parallélogramme ABCD, H est le pied de la hauteur issue de D : AD = ${o} ${u}, DH = ${h0} ${u}, AB = ${L} ${u}.`,
        `Le parallélogramme ABCD a pour côtés AB = ${L} ${u} et AD = ${o} ${u}. Sa hauteur [DH] sur (AB) mesure DH = ${h0} ${u}.`,
      ],
      ["Quelle est la distance entre (AB) et (CD) ?", "Quelle distance sépare (AB) et (CD) ?", "Que vaut la distance entre les droites (AB) et (CD) ?", "Donne la distance entre (AB) et (CD).", "À quelle distance de (AB) se trouve (CD) ?"],
    );
    const pts = { A: point(0, 0), B: point(L, 0), C: point(L + x, h0), D: point(x, h0), H: point(x, 0) };
    const canvas = figureConstruction(pts, { polygones: [{ sommets: ["A", "B", "C", "D"] }], segments: [{ a: "D", b: "H", couleur: "#dc2626", pointille: true }], angles: [{ sommet: "H", de: "D", vers: "B", droit: true }], description: "Le parallélogramme ABCD et sa hauteur [DH]" });
    return { text, format: "short", expected: mesure(h0, u), comparator: "number_equal", canvas, explanation: expliquer(DEF_D, "[DH] est perpendiculaire à (AB), donc à (CD).", `DH = ${h0}.`, `la distance vaut ${h0} ${u}.`) };
  }),

  tpl("distance_paralleles", 9, 3, "Ce qui compte, c’est le segment perpendiculaire aux deux bords.", () => {
    const o = un(BANDES);
    const h = entre(o.h[0], o.h[1]);
    const biais = Math.round(h * (1.15 + Math.random() * 0.5));
    const text = phrase(
      [
        `${o.o} sont parallèles. Le segment perpendiculaire aux deux mesure ${fr(h)} ${o.u}, et ${o.oblique} mesure ${fr(biais)} ${o.u}.`,
        `${o.o} sont parallèles. On mesure ${fr(biais)} ${o.u} sur ${o.oblique}, et ${fr(h)} ${o.u} perpendiculairement.`,
        `Sur ${o.oblique}, on lit ${fr(biais)} ${o.u}. Perpendiculairement à ces bords parallèles, on lit ${fr(h)} ${o.u}. ${o.o} ne se rapprochent jamais.`,
      ],
      [o.q],
    );
    return { text, format: "short", expected: mesure(h, o.u), comparator: "number_equal", canvas: figParalleles({ a: "A", h: "H", d1: "(d)", d2: "(d′)", h0: 3, n: "N", ecart: 2 }), explanation: expliquer(DEF_D, "la largeur se mesure perpendiculairement aux bords.", `${fr(h)} ${o.u} < ${fr(biais)} ${o.u}.`, `elle vaut ${fr(h)} ${o.u}.`) };
  }),

  tpl("distance_paralleles", 10, 3, "Attention : n lignes font n − 1 intervalles.", () => {
    const o = un(REGULIERS);
    const e = entre(o.e[0], o.e[1]);
    const n = entre(o.n[0], o.n[1]);
    const D = e * (n - 1);
    const fem = /lignes|lamelles|étagères|cordes|marches/.test(o.f) ? "e" : "";
    const text = phrase(
      [`${o.o} compte ${n} ${o.f} parallèles, espacé${fem}s de ${e} ${o.u}.`, `${o.o} a ${n} ${o.f} parallèles, avec ${e} ${o.u} entre deux voisin${fem}s.`, `Dans ${bas(o.o)}, on compte ${n} ${o.f} parallèles, et ${e} ${o.u} d’écart entre deux voisin${fem}s.`],
      [`Quelle distance y a-t-il ${o.pl} ?`, `Calcule la distance ${o.pl}.`, `Que vaut la distance ${o.pl} ?`],
    );
    return { text, format: "short", expected: mesure(D, o.u), comparator: "number_equal", explanation: expliquer(DEF_D, `${n} ${o.f} font ${n - 1} intervalles.`, `${n - 1} × ${e} = ${fr(D)}.`, `la distance est de ${fr(D)} ${o.u}.`) };
  }),

  tpl("distance_paralleles", 11, 3, "Aire du parallélogramme = base × hauteur : on remonte.", () => {
    const u = un(UNITES);
    const b = entre(4, 25);
    const h = entre(2, 20);
    const a = b * h;
    const x = Math.max(1, Math.round(h / 2));
    const text = phrase(
      [`Un parallélogramme a une aire de ${a} ${u}², et sa base [AB] mesure ${b} ${u}.`, `L’aire du parallélogramme ABCD vaut ${a} ${u}², et AB = ${b} ${u}.`, `ABCD est un parallélogramme d’aire ${a} ${u}², avec AB = ${b} ${u}.`, `Le parallélogramme ABCD a pour aire ${a} ${u}² et pour côté AB = ${b} ${u}.`],
      ["Quelle est la distance entre (AB) et (CD) ?", "Calcule la distance entre (AB) et (CD).", "Quelle distance sépare (AB) et (CD) ?", "Trouve la distance entre les droites (AB) et (CD)."],
    );
    const canvas = figureConstruction({ A: point(0, 0), B: point(b, 0), C: point(b + x, h), D: point(x, h), H: point(x, 0) }, { polygones: [{ sommets: ["A", "B", "C", "D"] }], segments: [{ a: "D", b: "H", couleur: "#dc2626", pointille: true }, { a: "A", b: "B", texte: `${b} ${u}` }], angles: [{ sommet: "H", de: "D", vers: "B", droit: true }], description: "Le parallélogramme ABCD et sa hauteur" });
    return { text, format: "short", expected: mesure(h, u), comparator: "number_equal", canvas, explanation: expliquer(DEF_D, "la distance est la hauteur du parallélogramme.", `${a} ÷ ${b} = ${h}.`, `la distance vaut ${h} ${u}.`) };
  }),

  tpl("distance_paralleles", 12, 3, "La surface et le long côté : la hauteur est la distance cherchée.", () => {
    const o = un(PARALLELOGRAMMES);
    const b = entre(6, 30) * o.k;
    const h = entre(2, 16) * o.k;
    const a = b * h;
    const dr = cap(o.dr);
    const text = phrase(
      [`${o.o} a une aire de ${fr(a)} ${o.u}², et son long côté mesure ${b} ${o.u}.`, `${o.o} couvre ${fr(a)} ${o.u}². Son long côté fait ${b} ${o.u}.`, `${o.o} a un long côté de ${b} ${o.u} pour une aire de ${fr(a)} ${o.u}².`],
      [`Quelle est la distance ${o.dr} ?`, `${dr} : quelle est la distance ?`, `Calcule la distance ${o.dr}.`],
    );
    const canvas = figureConstruction({ A: point(0, 0), B: point(b, 0), C: point(b + h * 0.4, h), D: point(h * 0.4, h), H: point(h * 0.4, 0) }, { polygones: [{ sommets: ["A", "B", "C", "D"] }], segments: [{ a: "D", b: "H", couleur: "#dc2626", pointille: true }, { a: "A", b: "B", texte: `${b} ${o.u}` }], angles: [{ sommet: "H", de: "D", vers: "B", droit: true }], description: "Un parallélogramme, son long côté et sa hauteur" }, ["A", "B", "C", "D", "H"]);
    return { text, format: "short", expected: mesure(h, o.u), comparator: "number_equal", canvas, explanation: expliquer(DEF_D, "base × hauteur = aire ; la hauteur est la distance.", `${fr(a)} ÷ ${b} = ${h}.`, `la distance est de ${h} ${o.u}.`) };
  }),
];
