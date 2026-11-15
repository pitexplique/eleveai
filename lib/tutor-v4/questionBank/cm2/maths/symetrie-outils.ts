// OUTILS DES GABARITS « SYMÉTRIE » CM2 (15/11/2026).
//
// Jumeau du CM1 (`cm1/maths/symetrie-outils.ts`, 14/11) : on en reprend la
// géométrie sur quadrillage (placements depuis l'axe, figures sans symétrie,
// pièges « glissé », « compté du bord », « mauvais sens », axe oblique).
// ⭐ Ce que le CM2 ajoute :
//  - ses propres SITUATIONS (d'autres objets, d'autres métiers que le CM1) ;
//  - les FIGURES USUELLES et leurs axes (carré 4, rectangle 2, losange 2,
//    triangle équilatéral 3, triangle isocèle 1, trapèze isocèle 1,
//    parallélogramme 0, cercle : une infinité, hexagone régulier 6), dessinées
//    avec le canvas `construction` (axes en pointillés verts) ;
//  - les propriétés : le segment qui joint un point à son symétrique est
//    PERPENDICULAIRE à l'axe, et l'axe le coupe en son MILIEU.
// ⛔ Tout se dit en carreaux comptés depuis l'axe : aucun repère chiffré.

import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import { polygoneRegulier, point, type P } from "@/lib/canvas/construction";
import { cap, entre, melange, un } from "../../cm1/maths/trous-outils";
import {
  MEME, OPPOSE, VERDICT, VERDICT_OBLIQUE, aire, boite, bouge, cadre, candidat, candidatOblique, car, cle, dessin,
  figureAsym, norm, placer, placerOblique, refD, refH, refV,
  type Axe, type Cote, type Oblique, type Placement, type Pt, type Verdict, type VerdictOblique,
} from "../../cm1/maths/symetrie-outils";

export {
  MEME, OPPOSE, VERDICT, VERDICT_OBLIQUE, aire, boite, bouge, cadre, candidat, candidatOblique, car, cle, dessin,
  figureAsym, norm, placer, placerOblique, refD, refH, refV, cap, entre, melange, un,
};
export type { Axe, Cote, Oblique, Placement, Pt, Verdict, VerdictOblique };

/* ═════════════════ situations du CM2 ═════════════════ */

const NOMS_F = ["Manon", "Elsa", "Nour", "Alice", "Lana", "Mila", "Anaïs", "Yasmine", "Camille", "Louise", "Ambre", "Salomé", "Kenza", "Iris"];
const NOMS_M = ["Adam", "Nathan", "Ilyes", "Gabriel", "Liam", "Rayan", "Mathis", "Léon", "Arthur", "Sami", "Timéo", "Maël", "Ethan", "Wassim"];

type Sit = { o: string; m: readonly [string, string] | null };
const S = (o: string, m: readonly [string, string] | null = null): Sit => ({ o, m });

// ⛔ La Réunion : 1 situation sur 26 (le motif du tressage de vacoa), moins de 4 %.
export const SITUATIONS: readonly Sit[] = [
  S("le logo de la radio du collège", ["graphiste", "graphiste"]),
  S("le motif du papier peint", ["décoratrice", "décorateur"]),
  S("la grille du portail", ["ferronnière", "ferronnier"]),
  S("le vitrail de la chapelle", ["verrière", "verrier"]),
  S("le plan du rond-point", ["urbaniste", "urbaniste"]),
  S("la façade de l'immeuble", ["architecte", "architecte"]),
  S("le motif du pull", ["tricoteuse", "tricoteur"]),
  S("le dessin de la nappe", ["styliste", "styliste"]),
  S("le carrelage de la salle de bains", ["carreleuse", "carreleur"]),
  S("le blason de l'équipe de basket"),
  S("le masque du spectacle de fin d'année"),
  S("l'aile du modèle réduit", ["ingénieure", "ingénieur"]),
  S("le parterre de fleurs", ["paysagiste", "paysagiste"]),
  S("le gâteau d'anniversaire", ["pâtissière", "pâtissier"]),
  S("le badge du club d'échecs"),
  S("le motif du tatouage éphémère"),
  S("le pochoir de la fresque du préau", ["peintre", "peintre"]),
  S("l'icône de l'application", ["développeuse", "développeur"]),
  S("le patron de la robe", ["couturière", "couturier"]),
  S("le motif de la mosaïque", ["mosaïste", "mosaïste"]),
  S("le plan de la cabane", ["menuisière", "menuisier"]),
  S("la couverture du livre", ["illustratrice", "illustrateur"]),
  S("la carte de vœux"),
  S("le motif du tressage de vacoa", ["vannière", "vannier"]),
  S("le décor du stand de la kermesse"),
  S("la médaille du tournoi", ["bijoutière", "bijoutier"]),
];

export type Perso = { nom: string; txt: string };
export function perso(s?: Sit): Perso {
  const f = Math.random() < 0.5;
  const nom = un(f ? NOMS_F : NOMS_M);
  const m = s?.m ? (f ? s.m[0] : s.m[1]) : "";
  return { nom, txt: m && Math.random() < 0.7 ? `${nom}, ${m},` : nom };
}

/** Qui dessine quoi : ~130 ouvertures. */
export function ouverture(): string {
  const s = un(SITUATIONS);
  const p = perso(s);
  return un([
    `${p.txt} dessine ${s.o} sur quadrillage.`,
    `Pour ${s.o}, ${p.txt} trace une figure sur quadrillage.`,
    `${p.txt} termine ${s.o}, sur une feuille quadrillée.`,
    `${p.txt} prépare ${s.o} sur du papier quadrillé.`,
    `${cap(s.o)} : ${p.nom} ${/^(la |l')/.test(s.o) ? "la" : "le"} dessine sur quadrillage.`,
  ]);
}

export const defiDebut = () => {
  const s = un(SITUATIONS);
  const p = perso(s);
  return un([
    `Défi ! ${p.txt} dessine ${s.o} sur quadrillage.`,
    `Défi : ${p.txt} prépare ${s.o}.`,
    `${p.txt} relève un défi pour ${s.o}.`,
    `Problème : ${p.txt} doit finir ${s.o}.`,
  ]);
};

/** Où l'on voit une figure usuelle. */
export const LIEUX = [
  "sur l'affiche du club",
  "sur le cahier de géométrie",
  "sur un panneau de signalisation",
  "sur la couverture d'un carnet",
  "sur le tableau de la classe",
  "sur un tapis de gym",
  "sur la vitrine d'une boutique",
  "sur le sol du gymnase",
  "sur un sac en tissu",
];

/* ═════════════════ figures usuelles (canvas construction) ═════════════════ */

export type Usuelle = {
  nom: string;
  fem: boolean;
  /** Nombre d'axes ; -1 = une infinité (le cercle). */
  n: number;
  /** Sommets, en coordonnées de maths (y vers le haut). Vide pour le cercle. */
  pts: P[];
  /** Les vrais axes, chacun par deux points. */
  axes: [P, P][];
  /** Des lignes qui coupent la figure en deux sans être des axes. */
  faux: [P, P][];
  /** La phrase qui justifie le nombre d'axes. */
  pourquoi: string;
};

const O = point(0, 0);
const lig = (a: P, b: P): [P, P] => [a, b];
const mil = (a: P, b: P) => point((a.x + b.x) / 2, (a.y + b.y) / 2);

function carre(): Usuelle {
  const c = un([1, 1.2, 1.4]);
  const pts = [point(-c, -c), point(c, -c), point(c, c), point(-c, c)];
  return {
    nom: "un carré", fem: false, n: 4, pts,
    axes: [lig(point(0, -c), point(0, c)), lig(point(-c, 0), point(c, 0)), lig(pts[0], pts[2]), lig(pts[1], pts[3])],
    faux: [lig(point(-c, -c), point(c, 0)), lig(point(-c / 2, -c), point(-c / 2, c))],
    pourquoi: "2 axes passent par les milieux des côtés opposés et 2 axes sont ses diagonales",
  };
}
function rectangle(): Usuelle {
  const L = un([1.8, 2, 2.4]), l = un([0.8, 1, 1.2]);
  const pts = [point(-L, -l), point(L, -l), point(L, l), point(-L, l)];
  return {
    nom: "un rectangle", fem: false, n: 2, pts,
    axes: [lig(point(0, -l), point(0, l)), lig(point(-L, 0), point(L, 0))],
    faux: [lig(pts[0], pts[2]), lig(pts[1], pts[3]), lig(point(-L / 2, -l), point(-L / 2, l))],
    pourquoi: "2 axes passent par les milieux des côtés opposés ; ses diagonales ne sont PAS des axes",
  };
}
function losange(): Usuelle {
  const a = un([1.8, 2]), b = un([1, 1.2]);
  const pts = [point(0, -b), point(a, 0), point(0, b), point(-a, 0)];
  return {
    nom: "un losange", fem: false, n: 2, pts,
    axes: [lig(pts[0], pts[2]), lig(pts[1], pts[3])],
    faux: [lig(mil(pts[0], pts[1]), mil(pts[2], pts[3])), lig(mil(pts[1], pts[2]), mil(pts[3], pts[0]))],
    pourquoi: "ses 2 axes sont ses diagonales ; les droites qui passent par les milieux de ses côtés n'en sont pas",
  };
}
function equilateral(): Usuelle {
  const pts = polygoneRegulier(3, 1.5, 90);
  return {
    nom: "un triangle équilatéral", fem: false, n: 3, pts,
    axes: pts.map((s, i) => lig(s, mil(pts[(i + 1) % 3], pts[(i + 2) % 3]))),
    faux: [lig(point(-1.5, 0), point(1.5, 0)), lig(pts[0], point(0.6, -0.75))],
    pourquoi: "chacun de ses 3 axes part d'un sommet et passe par le milieu du côté opposé",
  };
}
function isocele(): Usuelle {
  const pts = [point(-1.2, -1), point(1.2, -1), point(0, 1.8)];
  return {
    nom: "un triangle isocèle", fem: false, n: 1, pts,
    axes: [lig(pts[2], point(0, -1))],
    faux: [lig(pts[0], mil(pts[1], pts[2])), lig(point(-1.2, 0.2), point(1.2, 0.2))],
    pourquoi: "son seul axe part du sommet principal et passe par le milieu de la base",
  };
}
function trapeze(): Usuelle {
  const pts = [point(-2, -1), point(2, -1), point(1, 1), point(-1, 1)];
  return {
    nom: "un trapèze isocèle", fem: false, n: 1, pts,
    axes: [lig(point(0, -1), point(0, 1))],
    faux: [lig(point(-2, 0), point(2, 0)), lig(pts[0], pts[2])],
    pourquoi: "son seul axe passe par les milieux de ses deux bases",
  };
}
function parallelogramme(): Usuelle {
  const pts = [point(-2, -1), point(1, -1), point(2, 1), point(-1, 1)];
  return {
    nom: "un parallélogramme", fem: false, n: 0, pts,
    axes: [],
    faux: [lig(point(-0.5, -1), point(0.5, 1)), lig(point(-2, 0), point(2, 0)), lig(pts[0], pts[2])],
    pourquoi: "il n'a aucun axe : aucun pliage ne le superpose à lui-même (il se retourne par un demi-tour, pas par un pliage)",
  };
}
function cercle(): Usuelle {
  const d = un([0, 30, 60, 90, 120, 150]);
  const r = 1.4;
  const a = point(r * Math.cos((d * Math.PI) / 180), r * Math.sin((d * Math.PI) / 180));
  return {
    nom: "un cercle", fem: false, n: -1, pts: [],
    axes: [lig(a, point(-a.x, -a.y))],
    faux: [lig(point(-1.4, 0.6), point(1.4, 0.6)), lig(point(0.6, -1.4), point(0.6, 1.4))],
    pourquoi: "toute droite qui passe par son centre est un axe : il en a une infinité",
  };
}
function hexagone(): Usuelle {
  const pts = polygoneRegulier(6, 1.5, 0);
  return {
    nom: "un hexagone régulier", fem: false, n: 6, pts,
    axes: [0, 1, 2].map((i) => lig(pts[i], pts[i + 3])),
    faux: [lig(point(-1.5, 0.5), point(1.5, 0.5))],
    pourquoi: "3 axes relient deux sommets opposés et 3 axes passent par les milieux de deux côtés opposés",
  };
}

export const USUELLES: Record<string, () => Usuelle> = {
  carre, rectangle, losange, equilateral, isocele, trapeze, parallelogramme, cercle, hexagone,
};
export const NOMS_USUELLES = Object.keys(USUELLES);

export const nbAxes = (n: number) => (n < 0 ? "une infinité d'axes" : n === 0 ? "aucun axe" : n === 1 ? "1 axe" : `${n} axes`);

/** Le dessin d'une figure usuelle, avec en option des lignes vertes en pointillés. */
export function dessinUsuelle(u: Usuelle, lignes: [P, P][] = []): ConstructionCanvasData {
  const points: ConstructionCanvasData["points"] = u.pts.map((p, i) => ({ id: `S${i}`, x: p.x, y: p.y, cache: true }));
  const droites: NonNullable<ConstructionCanvasData["droites"]> = [];
  lignes.forEach(([a, b], i) => {
    points.push({ id: `L${i}a`, x: a.x, y: a.y, cache: true }, { id: `L${i}b`, x: b.x, y: b.y, cache: true });
    droites.push({ a: `L${i}a`, b: `L${i}b`, couleur: "#16a34a", pointille: true });
  });
  const cadreC = u.n < 0 ? [point(-1.9, -1.9), point(1.9, 1.9)] : [];
  cadreC.forEach((p, i) => points.push({ id: `K${i}`, x: p.x, y: p.y, cache: true }));
  return {
    kind: "construction",
    points: u.n < 0 ? [{ id: "O", x: O.x, y: O.y, cache: true }, ...points] : points,
    ...(u.n < 0
      ? { cercles: [{ centre: "O", rayon: 1.4, fond: "rgba(37, 99, 235, 0.15)", couleur: "#2563eb" }] }
      : { polygones: [{ sommets: u.pts.map((_, i) => `S${i}`), fond: "rgba(37, 99, 235, 0.15)", contour: "#2563eb" }] }),
    ...(droites.length ? { droites } : {}),
    largeur: 300,
    hauteurMax: 240,
  };
}

/* ═════════════════ un point seul ═════════════════ */

/** Un point seul à `d` carreaux d'un axe vertical ou horizontal. */
export function unPoint(d: number) {
  const vertical = Math.random() < 0.5;
  const m = entre(1, 2);
  const A = d + m;
  const autre = entre(1, 4);
  const avant = Math.random() < 0.5;
  if (vertical) {
    const p = { x: avant ? A - d : A + d, y: autre };
    return { p, img: { x: 2 * A - p.x, y: p.y }, axe: { type: "vertical", x: A } as Axe, cols: 2 * A, rows: 6, cote: (avant ? "gauche" : "droite") as Cote };
  }
  const p = { x: autre, y: avant ? A - d : A + d };
  return { p, img: { x: p.x, y: 2 * A - p.y }, axe: { type: "horizontal", y: A } as Axe, cols: 6, rows: 2 * A, cote: (avant ? "haut" : "bas") as Cote };
}

/** Un point au-dessus de la diagonale (axe oblique), à `d` diagonales de carreau de l'axe. */
export function unPointOblique(d: number) {
  // Le point (a + d, a - d) : son symétrique (a - d, a + d) ; le milieu (a, a) est sur l'axe.
  const a = entre(d + 1, d + 2);
  const p = { x: a + d, y: a - d };
  const img = refD(p);
  const n = Math.max(p.x, img.y) + 2;
  return { p, img, n };
}
