// lib/canvas/patron-solide.ts
//
// LE DÉPLIAGE D'UN SOLIDE SE CALCULE (06/11/2026) : on donne les dimensions, jamais
// les points. Pavé droit, prisme droit à base triangulaire, cylindre, pyramide
// régulière. `defaut` fabrique un assemblage faux pour « lequel est un patron ? » :
// il reste calculé, donc ses faces gardent les bonnes proportions.

export type PointPatron = [number, number];

export type PiecePatron = { points: PointPatron[]; fond?: string; nom?: string };
export type DisquePatron = { x: number; y: number; r: number; fond?: string; nom?: string };
/** `centre` : le milieu de la pièce mesurée ; le texte se pose de l'autre côté. */
export type CotePatron = { a: PointPatron; b: PointPatron; texte: string; inconnue?: boolean; centre?: PointPatron };

export type PanneauPatron = {
  nom?: string;
  pieces: PiecePatron[];
  disques?: DisquePatron[];
  cotes?: CotePatron[];
};

const rect = (x: number, y: number, w: number, h: number, nom?: string): PiecePatron => ({
  points: [[x, y], [x + w, y], [x + w, y + h], [x, y + h]],
  ...(nom ? { nom } : {}),
});

/* ───────────────────────── pavé droit ───────────────────────── */

export type DefautPave = "deux_couvercles_meme_cote" | "couvercle_trop_large" | "face_manquante" | "bande_desordonnee";

/**
 * La bande des 4 faces latérales (largeur, longueur, largeur, longueur), un couvercle
 * au-dessus et un au-dessous. `haut` et `bas` : sur quelle face de longueur L (0 ou 1)
 * chaque couvercle s'accroche. Toute combinaison donne un vrai patron.
 */
export function patronPave(L: number, l: number, h: number, o: { haut?: 0 | 1; bas?: 0 | 1; defaut?: DefautPave; nom?: string } = {}): PanneauPatron {
  const haut = o.haut ?? 0;
  const bas = o.bas ?? 0;
  const xL = (k: 0 | 1) => (k === 0 ? l : 2 * l + L);
  const bande: PiecePatron[] =
    o.defaut === "bande_desordonnee"
      ? [rect(0, 0, l, h), rect(l, 0, l, h), rect(2 * l, 0, L, h), rect(2 * l + L, 0, L, h)]
      : [rect(0, 0, l, h), rect(l, 0, L, h), rect(l + L, 0, l, h), rect(2 * l + L, 0, L, h)];
  if (o.defaut === "face_manquante") bande.pop();
  const xHaut = o.defaut === "bande_desordonnee" ? 2 * l : xL(haut);
  const xBas = o.defaut === "bande_desordonnee" ? 2 * l : xL(bas);
  const largeur = o.defaut === "couvercle_trop_large" ? h : l;
  const pieces = [...bande, rect(xHaut, -largeur, L, largeur)];
  if (o.defaut === "deux_couvercles_meme_cote") pieces.push(rect(xL(haut === 0 ? 1 : 0), -l, L, l));
  else pieces.push(rect(xBas, h, L, largeur));
  return { nom: o.nom, pieces };
}

/* ───────────────────────── prisme droit à base triangulaire ───────────────────────── */

export type DefautPrisme = "triangle_faux" | "deux_triangles_meme_cote" | "rectangle_manquant" | "rectangle_trop_large";

/** Le sommet du triangle de base [(0,0), (b,0)], de côtés `g` à gauche et `d` à droite, au-dessus (y < 0). */
export function sommetTriangle(b: number, g: number, d: number): PointPatron {
  const x = (b * b + g * g - d * d) / (2 * b);
  const y = Math.sqrt(Math.max(g * g - x * x, 0));
  return [x, -y];
}

/** La bande de 3 rectangles (a, b, c) × h ; un triangle au-dessus et un au-dessous du rectangle du milieu. */
export function patronPrisme(a0: number, b0: number, c0: number, h: number, o: { defaut?: DefautPrisme; nom?: string } = {}): PanneauPatron {
  // Le plus long côté au milieu : les triangles restent au-dessus de leur rectangle.
  const tri = [a0, b0, c0];
  const iMax = tri.indexOf(Math.max(...tri));
  const [a, b, c] = [tri[(iMax + 2) % 3], tri[iMax], tri[(iMax + 1) % 3]];
  const largeurC = o.defaut === "rectangle_trop_large" ? c + Math.max(1, a * 0.6) : c;
  const pieces: PiecePatron[] = [rect(0, 0, a, h), rect(a, 0, b, h)];
  if (o.defaut !== "rectangle_manquant") pieces.push(rect(a + b, 0, largeurC, h));
  // Un côté faux : le triangle ne se referme plus sur les rectangles voisins.
  const [g, d] = o.defaut === "triangle_faux" ? [a + b * 0.45, c + b * 0.45] : [a, c];
  const [sx, sy] = sommetTriangle(b, g, d);
  pieces.push({ points: [[a, 0], [a + b, 0], [a + sx, sy]] });
  if (o.defaut === "deux_triangles_meme_cote") {
    // Le même triangle, posé sur le 3e rectangle : au pliage, les deux couvrent le même côté.
    const [tx, ty] = sommetTriangle(c, b, a);
    pieces.push({ points: [[a + b, 0], [a + b + c, 0], [a + b + tx, ty]] });
  } else pieces.push({ points: [[a, h], [a + b, h], [a + sx, h - sy]] });
  return { nom: o.nom, pieces };
}

/* ───────────────────────── cylindre ───────────────────────── */

export type DefautCylindre = "rectangle_diametre" | "rectangle_demi_perimetre" | "disques_meme_cote" | "disque_trop_grand" | "disque_manquant";

/** Le rectangle (périmètre du disque) × hauteur, un disque tangent de chaque côté. `decalage` : place le long du bord, de 0 à 1. */
export function patronCylindre(r: number, h: number, o: { defaut?: DefautCylindre; nom?: string; decalageHaut?: number; decalageBas?: number } = {}): PanneauPatron {
  const L = o.defaut === "rectangle_diametre" ? 2 * r : o.defaut === "rectangle_demi_perimetre" ? Math.PI * r : 2 * Math.PI * r;
  const R = o.defaut === "disque_trop_grand" ? 1.7 * r : r;
  const place = (t = 0.5) => (L <= 2 * R ? L / 2 : R + t * (L - 2 * R));
  const disques: DisquePatron[] = [{ x: place(o.decalageHaut), y: -R, r: R }];
  if (o.defaut === "disques_meme_cote") disques[0].x = R, disques.push({ x: Math.max(L - R, 3 * R), y: -R, r: R });
  else if (o.defaut !== "disque_manquant") disques.push({ x: place(o.decalageBas), y: h + R, r: R });
  return { nom: o.nom, pieces: [rect(0, 0, L, h)], disques };
}

/* ───────────────────────── pyramide régulière ───────────────────────── */

export type DefautPyramide = "triangles_trop_courts" | "triangle_manquant" | "triangle_de_trop" | "base_fausse";

/** La base régulière à `n` côtés de longueur `c`, un triangle isocèle (arête `s`) sur chaque côté, tournés vers l'extérieur. */
export function patronPyramide(n: number, c: number, s: number, o: { defaut?: DefautPyramide; nom?: string } = {}): PanneauPatron {
  const nBase = o.defaut === "base_fausse" ? n + 1 : n;
  const R = c / (2 * Math.sin(Math.PI / nBase));
  const depart = Math.PI / 2 + Math.PI / nBase;
  const base: PointPatron[] = Array.from({ length: nBase }, (_, i) => {
    const t = depart + (2 * Math.PI * i) / nBase;
    return [R * Math.cos(t), R * Math.sin(t)];
  });
  const apotheme = c / (2 * Math.tan(Math.PI / nBase));
  const hauteur = o.defaut === "triangles_trop_courts" ? Math.max(apotheme * 0.55, c * 0.2) : Math.sqrt(Math.max(s * s - (c * c) / 4, 0));
  const triangles: PiecePatron[] = base.map((p, i) => {
    const q = base[(i + 1) % nBase];
    const mx = (p[0] + q[0]) / 2;
    const my = (p[1] + q[1]) / 2;
    const norme = Math.hypot(mx, my);
    return { points: [p, q, [mx + (mx / norme) * hauteur, my + (my / norme) * hauteur]] };
  });
  let gardes = triangles;
  if (o.defaut === "triangle_manquant") gardes = triangles.slice(0, -1);
  if (o.defaut === "base_fausse") gardes = triangles.slice(0, n);
  return { nom: o.nom, pieces: [{ points: base }, ...gardes] };
}

/** Le côté `k` d'une pièce, comme extrémités d'une cote. */
export const cotePiece = (p: PiecePatron, k: number, texte: string, inconnue = false): CotePatron => ({
  a: p.points[k],
  b: p.points[(k + 1) % p.points.length],
  texte,
  centre: [p.points.reduce((s, q) => s + q[0], 0) / p.points.length, p.points.reduce((s, q) => s + q[1], 0) / p.points.length],
  ...(inconnue ? { inconnue } : {}),
});
