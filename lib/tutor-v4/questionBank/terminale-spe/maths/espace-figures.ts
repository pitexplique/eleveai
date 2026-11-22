// lib/tutor-v4/questionBank/terminale-spe/maths/espace-figures.ts
//
// LES FIGURES DE LA GÉOMÉTRIE DANS L'ESPACE, TERMINALE SPÉ (22/11/2026).
//
// POURQUOI CE FICHIER. Mesure du 22/11/2026 : les trois banques de l'espace
// portaient 169 items et **4 figures**. Sur le seul chapitre du programme dont
// tout l'objet est de VOIR dans l'espace, l'élève lisait des triplets de
// nombres. Le canvas `repere3d` et son rendu existaient pourtant déjà
// (`lib/canvas/Repere3dCanvas.tsx`) et servaient en 4ᵉ.
//
// ⭐ CE QUE LE RENDU SAIT FAIRE, ET CE QU'IL NE SAIT PAS. Lu dans le composant,
// pas supposé :
//   - perspective cavalière : y fuyant à 30°, réduit de moitié ;
//   - des points (disque de 4 px + étiquette) et des segments, pointillés au
//     choix ; les axes x, y, z en option ;
//   - le cadrage est AUTOMATIQUE sur les points fournis (et sur les axes s'ils
//     sont affichés) : on n'a pas à calculer d'échelle ;
//   - ⛔ pas de flèche : un vecteur est un SEGMENT, c'est l'étiquette de son
//     extrémité qui le nomme ;
//   - ⛔ pas de surface teintée : un plan est un PARALLÉLOGRAMME TRACÉ, donc un
//     morceau de plan, jamais le plan entier ;
//   - ⛔ aucun réglage de la place des étiquettes : elles sont toutes posées en
//     haut à droite du point, à 7 px. Deux points dont les projections se
//     touchent auront donc deux étiquettes superposées. C'est la seule faute
//     que ni `verifier-latex` ni `apercu-canvas` n'attrapent (l'un lit le
//     LaTeX, l'autre mesure la taille des lettres et les débordements de
//     cadre, aucun ne mesure une collision). D'où `ecarterLesNoms` plus bas,
//     qui laisse muets les points trop proches, et le corrigé qui les nomme.
//
// ⛔ LE PIÈGE DE FOND : UNE FIGURE QUI RÉPOND À LA QUESTION. Dessiner deux
// vecteurs colinéaires les montre superposés : l'élève coche sans calculer, et
// la micro-compétence n'a pas travaillé. Règle tenue dans les trois banques :
//   - on dessine les DONNÉES (les points, le solide, la droite, le morceau de
//     plan) ;
//   - on ne dessine JAMAIS la réponse (le milieu cherché, le projeté cherché,
//     la position relative demandée, la colinéarité demandée) ;
//   - une question de pure définition (« quelle est la formule de la norme ? »)
//     ne reçoit pas de figure : un dessin décoratif est interdit.
// Le cadre n'ayant ni graduation ni quadrillage, un nombre ne se LIT jamais sur
// ces figures : elles montrent la configuration, elles ne la mesurent pas.

import type { CanvasFigure } from "@/lib/tutor-v4/types";

export type Triplet = readonly [number, number, number];

/** Les couleurs, et ce qu'elles veulent dire — les mêmes dans les trois banques.
 *  Un élève qui a vu une figure reconnaît les suivantes. */
const ARDOISE = "#0f172a"; // les données : points nommés, arêtes d'un solide
const ROUGE = "#dc2626"; // ce que la question regarde en premier
const BLEU = "#2563eb"; // le second objet, quand il y en a deux
const GRIS = "#94a3b8"; // les traits de construction (pointillés)

type Point = { x: number; y: number; z: number; label?: string; couleur?: string };
type Segment = { de: number; a: number; couleur?: string; pointille?: boolean };

/* =========================================================
   LA PETITE ALGÈBRE DONT LES FIGURES ONT BESOIN
   ========================================================= */

const soustraire = (a: Triplet, b: Triplet): Triplet => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const ajouter = (a: Triplet, b: Triplet): Triplet => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const fois = (k: number, a: Triplet): Triplet => [k * a[0], k * a[1], k * a[2]];
const scalaire = (a: Triplet, b: Triplet) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norme = (a: Triplet) => Math.sqrt(scalaire(a, a));
const vectoriel = (a: Triplet, b: Triplet): Triplet => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

/**
 * ⛔ PAS D'ARRONDI — ET C'EST UNE CORRECTION, PAS UN CHOIX D'ÉCRITURE.
 * Une première version arrondissait à deux décimales les points calculés (les
 * coins d'un morceau de plan tombent sur des coordonnées irrationnelles, et des
 * nombres à quinze chiffres alourdissent le JSON). Mesure du 22/11/2026 : sur
 * treize items dont l'énoncé porte une équation de plan, seuls DEUX coins sur
 * quatre vérifiaient encore cette équation. L'arrondi sortait les coins du
 * plan — un dessin faux, d'autant plus traître qu'il reste parfaitement
 * crédible à l'œil. On garde donc les coordonnées exactes : rien ne les lit,
 * et le vérificateur peut alors contrôler que la figure dit bien la même chose
 * que l'énoncé.
 */
const net = (a: Triplet): Triplet => a;

/** Le vecteur de base le moins aligné avec `n` : de quoi fabriquer, par produit
 *  vectoriel, un vecteur du plan sans jamais tomber sur le vecteur nul. */
function baseTransverse(n: Triplet): Triplet {
  const [a, b, c] = [Math.abs(n[0]), Math.abs(n[1]), Math.abs(n[2])];
  if (a <= b && a <= c) return [1, 0, 0];
  if (b <= c) return [0, 1, 0];
  return [0, 0, 1];
}

const projeter = (x: number, y: number, z: number): [number, number] => [
  x + 0.5 * y * Math.cos(Math.PI / 6),
  z + 0.5 * y * Math.sin(Math.PI / 6),
];

/**
 * ⛔ LA FAUTE QUE RIEN D'AUTRE N'ATTRAPE : DEUX NOMS L'UN SUR L'AUTRE.
 * Le rendu pose chaque étiquette à 7 px en haut à droite de son point, sans
 * réglage possible. Deux points dont les PROJECTIONS cavalières se touchent
 * donnent donc deux noms empilés, illisibles — et aucun vérificateur du dépôt
 * ne le voit. On mesure donc ici la distance des projections et on laisse le
 * point le plus tardif MUET plutôt que d'écrire une bouillie : l'énoncé et le
 * corrigé, eux, nomment toujours les points.
 *
 * Le seuil est en unités de projection ramenées à la plus grande étendue de la
 * figure : 0,12 revient à peu près à la largeur d'une étiquette de deux lettres
 * dans un dessin de 320 px.
 */
function ecarterLesNoms(points: Point[], axes: boolean): Point[] {
  const proj = points.map((p) => projeter(p.x, p.y, p.z));
  // ⚠️ LES TROIS NOMS D'AXES COMPTENT AUSSI. Le rendu écrit « x », « y » et
  // « z » au bout des axes, et un coin de plan tombé près d'un bout d'axe
  // donnait « y » collé à « P » — trouvé par le vérificateur, pas à la lecture.
  const ancres = axes ? bordsDesAxes(points).map((t) => projeter(t[0], t[1], t[2])) : [];
  const tous = [...proj, ...ancres];
  const xs = tous.map((p) => p[0]);
  const ys = tous.map((p) => p[1]);
  const etendue = Math.max(
    0.001,
    Math.max(...xs) - Math.min(...xs),
    Math.max(...ys) - Math.min(...ys),
  );
  const seuil = 0.12 * etendue;
  const gardes: [number, number][] = [...ancres];
  return points.map((p, i) => {
    if (!p.label) return p;
    const trop = gardes.some(
      ([gx, gy]) => Math.hypot(proj[i][0] - gx, proj[i][1] - gy) < seuil,
    );
    if (trop) return { ...p, label: undefined };
    gardes.push(proj[i]);
    return p;
  });
}

/** Les trois bouts d'axes, calculés comme le rendu les calcule : la plus grande
 *  coordonnée en valeur absolue, arrondie au-dessus, plus un. */
function bordsDesAxes(points: Point[]): Triplet[] {
  const m = Math.max(
    1,
    ...points.flatMap((p) => [Math.abs(p.x), Math.abs(p.y), Math.abs(p.z)]),
  );
  const L = Math.ceil(m) + 1;
  return [
    [L, 0, 0],
    [0, L, 0],
    [0, 0, L],
  ];
}

/**
 * OÙ POSER LE NOM D'UN PLAN. Le rendu ne sait écrire du texte que sur un point,
 * donc le nom d'un morceau de plan se pose sur un de ses quatre coins. Les
 * quatre ne valent pas : un coin tombé près d'un bout d'axe ou près d'un point
 * déjà nommé donne deux étiquettes empilées (et `ecarterLesNoms` fait alors
 * disparaître le nom du plan, ce qui est pire que de le déplacer). On choisit
 * donc le coin le plus seul.
 */
function coinLePlusLibre(coins: readonly Triplet[], ancres: readonly Triplet[]): number {
  const pc = coins.map((c) => projeter(c[0], c[1], c[2]));
  const pa = ancres.map((a) => projeter(a[0], a[1], a[2]));
  let meilleur = 0;
  let meilleureDistance = -1;
  pc.forEach((p, i) => {
    const d = pa.length ? Math.min(...pa.map((q) => Math.hypot(p[0] - q[0], p[1] - q[1]))) : 1;
    if (d > meilleureDistance) {
      meilleureDistance = d;
      meilleur = i;
    }
  });
  return meilleur;
}

/**
 * LA TAILLE DU DESSIN, ET POURQUOI ELLE N'EST PAS CELLE PAR DÉFAUT.
 * `Repere3dCanvas` dessine dans un `viewBox` de 320 × 280 quand on ne dit
 * rien. Or ce `viewBox` est RAMENÉ à la largeur du bloc : dans le coach, sur un
 * téléphone, le dessin dispose d'environ 280 px (la carte de question, moins
 * son `p-3`, moins le `p-3` du canvas). Un `viewBox` de 320 y est donc divisé
 * par 0,8, et les étiquettes de 13 px arrivent à 10,4 px — sous le seuil de
 * 11 px retenu dans le dépôt. Un `viewBox` de 280 ne se réduit presque plus :
 * les mêmes lettres arrivent à 11,9 px. La figure n'est pas « plus petite »,
 * elle est à la bonne échelle pour le bloc où elle va.
 * Mesuré par `scripts/verifier-figures-espace-terminale.mjs`.
 */
const TAILLE = { width: 280, height: 250 };

/** Assemble la figure, après avoir écarté les noms qui se chevauchent. */
function figure(titre: string | undefined, points: Point[], segments: Segment[], axes: boolean): CanvasFigure {
  return {
    kind: "repere3d",
    ...(titre ? { titre } : {}),
    afficherAxes: axes,
    points: ecarterLesNoms(points, axes),
    segments,
    size: TAILLE,
  };
}

/* =========================================================
   LES VECTEURS
   ========================================================= */

/**
 * UN VECTEUR POSÉ À L'ORIGINE, ET SES TROIS COORDONNÉES EN ESCALIER.
 * Le segment rouge va de $O$ au point d'extrémité ; les trois pointillés gris
 * montrent le chemin « x, puis y, puis z » qui mène au même endroit. C'est la
 * figure de la NORME : l'élève voit les trois arêtes dont on va faire la somme
 * des carrés, sans qu'aucune longueur ne soit lisible (le cadre n'a pas de
 * graduation).
 */
export function figureVecteur(nom: string, u: Triplet, titre?: string): CanvasFigure {
  const [x, y, z] = u;
  const points: Point[] = [
    { x: 0, y: 0, z: 0, label: "O", couleur: ARDOISE },
    { x, y, z, label: nom, couleur: ROUGE },
    { x, y: 0, z: 0, couleur: GRIS },
    { x, y, z: 0, couleur: GRIS },
  ];
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: ROUGE },
    { de: 0, a: 2, couleur: GRIS, pointille: true },
    { de: 2, a: 3, couleur: GRIS, pointille: true },
    { de: 3, a: 1, couleur: GRIS, pointille: true },
  ];
  return figure(titre, points, segments, true);
}

/**
 * DEUX VECTEURS PARTANT DU MÊME POINT — la figure du produit scalaire et de
 * l'angle.
 * ⚠️ À NE PAS UTILISER quand la question EST « sont-ils colinéaires ? » : deux
 * vecteurs colinéaires se dessinent superposés, et la réponse se voit sans
 * calcul. Pour l'orthogonalité, en revanche, la perspective cavalière déforme
 * les angles : un angle droit n'y est pas droit, rien ne se lit — et c'est une
 * leçon en soi.
 */
export function figureDeuxVecteurs(
  nomU: string,
  u: Triplet,
  nomV: string,
  v: Triplet,
  titre?: string,
): CanvasFigure {
  const points: Point[] = [
    { x: 0, y: 0, z: 0, label: "O", couleur: ARDOISE },
    { x: u[0], y: u[1], z: u[2], label: nomU, couleur: ROUGE },
    { x: v[0], y: v[1], z: v[2], label: nomV, couleur: BLEU },
  ];
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: ROUGE },
    { de: 0, a: 2, couleur: BLEU },
  ];
  return figure(titre, points, segments, true);
}

/* =========================================================
   LES POINTS
   ========================================================= */

/**
 * DEUX POINTS ET LE SEGMENT QUI LES JOINT, avec l'escalier qui montre d'où
 * sortent les coordonnées de $\overrightarrow{AB}$ : on avance en $x$, puis en
 * $y$, puis en $z$. La figure de la distance $AB$ et du vecteur $AB$.
 * ⛔ On ne dessine PAS le milieu, même quand c'est lui qu'on cherche.
 */
export function figureDeuxPoints(
  nomA: string,
  a: Triplet,
  nomB: string,
  b: Triplet,
  options: { titre?: string; escalier?: boolean; axes?: boolean } = {},
): CanvasFigure {
  const escalier = options.escalier !== false;
  const points: Point[] = [
    { x: a[0], y: a[1], z: a[2], label: nomA, couleur: ARDOISE },
    { x: b[0], y: b[1], z: b[2], label: nomB, couleur: ROUGE },
  ];
  const segments: Segment[] = [{ de: 0, a: 1, couleur: ROUGE }];
  if (escalier) {
    points.push(
      { x: b[0], y: a[1], z: a[2], couleur: GRIS },
      { x: b[0], y: b[1], z: a[2], couleur: GRIS },
    );
    segments.push(
      { de: 0, a: 2, couleur: GRIS, pointille: true },
      { de: 2, a: 3, couleur: GRIS, pointille: true },
      { de: 3, a: 1, couleur: GRIS, pointille: true },
    );
  }
  return figure(options.titre, points, segments, options.axes !== false);
}

/** TROIS POINTS ET LEUR TRIANGLE — la figure du « triangle rectangle en A ? »
 *  et du produit scalaire $\overrightarrow{AB}\cdot\overrightarrow{AC}$.
 *  Le sommet regardé est rouge, les deux côtés qui en partent aussi. */
export function figureTriangle(
  noms: readonly [string, string, string],
  sommets: readonly [Triplet, Triplet, Triplet],
  titre?: string,
): CanvasFigure {
  const points: Point[] = sommets.map((s, i) => ({
    x: s[0],
    y: s[1],
    z: s[2],
    label: noms[i],
    couleur: i === 0 ? ROUGE : ARDOISE,
  }));
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: ROUGE },
    { de: 0, a: 2, couleur: ROUGE },
    { de: 1, a: 2, couleur: ARDOISE },
  ];
  return figure(titre, points, segments, true);
}

/* =========================================================
   LES SOLIDES
   ========================================================= */

const SOMMETS_CUBE: Record<string, Triplet> = {
  A: [0, 0, 0], B: [1, 0, 0], C: [1, 1, 0], D: [0, 1, 0],
  E: [0, 0, 1], F: [1, 0, 1], G: [1, 1, 1], H: [0, 1, 1],
};
const ORDRE_CUBE = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
const ARETES_CUBE: [string, string][] = [
  ["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"],
  ["E", "F"], ["F", "G"], ["G", "H"], ["H", "E"],
  ["A", "E"], ["B", "F"], ["C", "G"], ["D", "H"],
];

/**
 * LE CUBE $ABCDEFGH$ DE CÔTÉ 1, dans le repère $(A\,;\overrightarrow{AB},
 * \overrightarrow{AD}, \overrightarrow{AE})$ — la convention des manuels, donc
 * celle des feuilles d'exercices de terminale du dépôt.
 * `rouges` : les sommets que la question regarde. `traits` : les segments à
 * tracer en plus des douze arêtes (une diagonale de face, une grande
 * diagonale), en rouge.
 * ⚠️ Les arêtes cachées ne sont PAS pointillées : la convention de la
 * perspective cavalière voudrait $[AD]$, $[AE]$ et $[AB]$ en pointillé si l'on
 * regarde le cube « de devant », mais ici $A$ est l'origine du repère et c'est
 * le sommet dont on part — le pointiller le ferait disparaître sous les axes.
 */
export function figureCube(
  options: { rouges?: readonly string[]; traits?: readonly [string, string][]; titre?: string } = {},
): CanvasFigure {
  const rouges = new Set(options.rouges ?? []);
  const indice = (nom: string) => ORDRE_CUBE.indexOf(nom as (typeof ORDRE_CUBE)[number]);
  const points: Point[] = ORDRE_CUBE.map((nom) => ({
    x: SOMMETS_CUBE[nom][0],
    y: SOMMETS_CUBE[nom][1],
    z: SOMMETS_CUBE[nom][2],
    label: nom,
    couleur: rouges.has(nom) ? ROUGE : ARDOISE,
  }));
  const segments: Segment[] = ARETES_CUBE.map(([p, q]) => ({
    de: indice(p),
    a: indice(q),
    couleur: ARDOISE,
  }));
  for (const [p, q] of options.traits ?? []) {
    segments.push({ de: indice(p), a: indice(q), couleur: ROUGE });
  }
  return figure(options.titre ?? "Cube ABCDEFGH (côté 1)", points, segments, false);
}

/** UN TÉTRAÈDRE : quatre points, six arêtes. Le premier sommet est rouge
 *  (c'est de lui qu'on part : sommet du volume, origine des vecteurs). */
export function figureTetraedre(
  noms: readonly [string, string, string, string],
  sommets: readonly [Triplet, Triplet, Triplet, Triplet],
  titre?: string,
): CanvasFigure {
  const points: Point[] = sommets.map((s, i) => ({
    x: s[0],
    y: s[1],
    z: s[2],
    label: noms[i],
    couleur: i === 0 ? ROUGE : ARDOISE,
  }));
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: ROUGE }, { de: 0, a: 2, couleur: ROUGE }, { de: 0, a: 3, couleur: ROUGE },
    { de: 1, a: 2, couleur: ARDOISE }, { de: 2, a: 3, couleur: ARDOISE }, { de: 1, a: 3, couleur: ARDOISE },
  ];
  return figure(titre, points, segments, true);
}

/* =========================================================
   LES DROITES ET LES PLANS
   ========================================================= */

/**
 * UNE DROITE DONNÉE PAR UN POINT ET UN VECTEUR DIRECTEUR.
 * On trace le morceau de droite pour $t$ de `tMin` à `tMax` : une droite ne se
 * dessine jamais en entier, et montrer un morceau fini est exactement ce que
 * fait la représentation paramétrique — on avance de $t$ fois le vecteur.
 * `marques` nomme des points particuliers (le point de base, un $t$ donné).
 * ⛔ Ne pas marquer le point que la question demande de trouver.
 */
export function figureDroite(
  a: Triplet,
  u: Triplet,
  options: {
    titre?: string;
    tMin?: number;
    tMax?: number;
    marques?: readonly { t: number; label: string; rouge?: boolean }[];
  } = {},
): CanvasFigure {
  const tMin = options.tMin ?? -1;
  const tMax = options.tMax ?? 2;
  const debut = net(ajouter(a, fois(tMin, u)));
  const fin = net(ajouter(a, fois(tMax, u)));
  const points: Point[] = [
    { x: debut[0], y: debut[1], z: debut[2], couleur: BLEU },
    { x: fin[0], y: fin[1], z: fin[2], couleur: BLEU },
  ];
  const segments: Segment[] = [{ de: 0, a: 1, couleur: BLEU }];
  for (const m of options.marques ?? []) {
    const p = net(ajouter(a, fois(m.t, u)));
    points.push({ x: p[0], y: p[1], z: p[2], label: m.label, couleur: m.rouge ? ROUGE : ARDOISE });
  }
  return figure(options.titre, points, segments, true);
}

/** Les quatre coins d'un morceau carré du plan $ax+by+cz+d=0$, centré sur
 *  `centre` (projeté orthogonalement sur le plan s'il n'y est pas). */
function coinsDuPlan(plan: readonly [number, number, number, number], centre: Triplet, demi: number) {
  const n: Triplet = [plan[0], plan[1], plan[2]];
  const n2 = scalaire(n, n);
  // Le projeté orthogonal du centre demandé sur le plan : c'est là qu'on pose
  // le morceau, pour qu'il soit sous les yeux et pas à l'autre bout du cadre.
  const ecart = (scalaire(n, centre) + plan[3]) / n2;
  const centreSurPlan = soustraire(centre, fois(ecart, n));
  const u1brut = vectoriel(n, baseTransverse(n));
  const u1 = fois(demi / norme(u1brut), u1brut);
  const u2brut = vectoriel(n, u1);
  const u2 = fois(demi / norme(u2brut), u2brut);
  return [
    net(ajouter(ajouter(centreSurPlan, u1), u2)),
    net(ajouter(soustraire(centreSurPlan, u1), u2)),
    net(soustraire(soustraire(centreSurPlan, u1), u2)),
    net(soustraire(ajouter(centreSurPlan, u1), u2)),
  ] as const;
}

/**
 * UN MORCEAU DE PLAN, et ce qu'on veut montrer avec lui.
 * ⛔ Le rendu ne teinte pas les surfaces : ce parallélogramme tracé EST le
 * plan, et il faut que le corrigé dise « le quadrilatère dessiné est un
 * morceau du plan », sans quoi l'élève y voit une plaque posée dans l'espace.
 * `point` marque un point (par exemple celui dont on étudie l'appartenance) et
 * `normale` trace, depuis le centre du morceau, le vecteur normal — jamais
 * quand c'est lui que la question demande.
 */
export function figurePlan(
  plan: readonly [number, number, number, number],
  options: {
    titre?: string;
    nom?: string;
    point?: { en: Triplet; label: string };
    normale?: boolean;
    demi?: number;
  } = {},
): CanvasFigure {
  const centre: Triplet = options.point ? options.point.en : [0, 0, 0];
  const demi = options.demi ?? Math.max(1.5, 0.8 * Math.max(1, norme(centre)));
  const coins = coinsDuPlan(plan, centre, demi);
  const points: Point[] = coins.map((c) => ({ x: c[0], y: c[1], z: c[2], couleur: BLEU }));
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: BLEU }, { de: 1, a: 2, couleur: BLEU },
    { de: 2, a: 3, couleur: BLEU }, { de: 3, a: 0, couleur: BLEU },
  ];
  if (options.point) {
    points.push({
      x: options.point.en[0], y: options.point.en[1], z: options.point.en[2],
      label: options.point.label, couleur: ROUGE,
    });
  }
  // Le nom du plan se pose sur un coin : c'est le seul endroit où le rendu sait
  // écrire du texte. On prend le coin le plus loin des bouts d'axes et du point
  // marqué.
  if (options.nom) {
    const ancres: Triplet[] = [
      ...bordsDesAxes(points),
      ...(options.point ? [options.point.en] : []),
    ];
    const i = coinLePlusLibre(coins, ancres);
    points[i] = { ...points[i], label: options.nom };
  }
  if (options.normale) {
    const n: Triplet = [plan[0], plan[1], plan[2]];
    const milieu = net(fois(0.25, coins.reduce((s, c) => ajouter(s, c), [0, 0, 0] as Triplet)));
    const bout = net(ajouter(milieu, fois(demi / norme(n), n)));
    points.push(
      { x: milieu[0], y: milieu[1], z: milieu[2], couleur: ROUGE },
      { x: bout[0], y: bout[1], z: bout[2], label: "n", couleur: ROUGE },
    );
    segments.push({ de: points.length - 2, a: points.length - 1, couleur: ROUGE });
  }
  return figure(options.titre, points, segments, true);
}

/**
 * UNE DROITE ET UN MORCEAU DE PLAN — la figure des positions relatives.
 * Le morceau de plan est posé là où la droite le rencontre (ou, si la droite
 * lui est parallèle, en face du point de base de la droite), sinon le dessin
 * montre deux objets qui n'ont rien à voir l'un avec l'autre.
 * ⛔ Le point d'intersection n'est PAS marqué : c'est souvent lui qu'on
 * cherche. On montre que les deux objets se croisent, pas où.
 */
export function figureDroiteEtPlan(
  a: Triplet,
  u: Triplet,
  plan: readonly [number, number, number, number],
  options: { titre?: string; tMin?: number; tMax?: number; nomDroite?: string; nomPlan?: string } = {},
): CanvasFigure {
  const n: Triplet = [plan[0], plan[1], plan[2]];
  const pente = scalaire(n, u);
  // Où poser le morceau de plan : au point de percée si elle existe.
  let centre: Triplet = a;
  let tMin = options.tMin ?? -1;
  let tMax = options.tMax ?? 2;
  if (Math.abs(pente) > 1e-9) {
    const t = -(scalaire(n, a) + plan[3]) / pente;
    centre = ajouter(a, fois(t, u));
    // On allonge la droite de part et d'autre de la percée, pour qu'on la voie
    // vraiment traverser.
    tMin = Math.min(tMin, t - 1);
    tMax = Math.max(tMax, t + 1);
  }
  const demi = Math.max(1.5, 0.9 * norme(soustraire(ajouter(a, fois(tMax, u)), centre)));
  const coins = coinsDuPlan(plan, centre, demi);
  const debut = net(ajouter(a, fois(tMin, u)));
  const fin = net(ajouter(a, fois(tMax, u)));
  const points: Point[] = [
    ...coins.map((c) => ({ x: c[0], y: c[1], z: c[2], couleur: BLEU })),
    { x: debut[0], y: debut[1], z: debut[2], couleur: ROUGE },
    { x: fin[0], y: fin[1], z: fin[2], label: options.nomDroite, couleur: ROUGE },
  ];
  if (options.nomPlan) {
    const i = coinLePlusLibre(coins, [...bordsDesAxes(points), fin]);
    points[i] = { ...points[i], label: options.nomPlan };
  }
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: BLEU }, { de: 1, a: 2, couleur: BLEU },
    { de: 2, a: 3, couleur: BLEU }, { de: 3, a: 0, couleur: BLEU },
    { de: 4, a: 5, couleur: ROUGE },
  ];
  return figure(options.titre, points, segments, true);
}

/**
 * DEUX MORCEAUX DE PLAN — sécants ou parallèles.
 * ⛔ La droite d'intersection n'est pas tracée : c'est la réponse de presque
 * toutes les questions qui méritent cette figure.
 */
export function figureDeuxPlans(
  plan1: readonly [number, number, number, number],
  plan2: readonly [number, number, number, number],
  options: { titre?: string; noms?: readonly [string, string]; demi?: number } = {},
): CanvasFigure {
  const demi = options.demi ?? 2;
  const coins1 = coinsDuPlan(plan1, [0, 0, 0], demi);
  const coins2 = coinsDuPlan(plan2, [0, 0, 0], demi);
  const points: Point[] = [
    ...coins1.map((c) => ({ x: c[0], y: c[1], z: c[2], couleur: BLEU })),
    ...coins2.map((c) => ({ x: c[0], y: c[1], z: c[2], couleur: ROUGE })),
  ];
  if (options.noms) {
    const axes = bordsDesAxes(points);
    const i1 = coinLePlusLibre(coins1, [...axes, ...coins2]);
    points[i1] = { ...points[i1], label: options.noms[0] };
    const i2 = coinLePlusLibre(coins2, [...axes, ...coins1, coins1[i1]]);
    points[4 + i2] = { ...points[4 + i2], label: options.noms[1] };
  }
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: BLEU }, { de: 1, a: 2, couleur: BLEU },
    { de: 2, a: 3, couleur: BLEU }, { de: 3, a: 0, couleur: BLEU },
    { de: 4, a: 5, couleur: ROUGE }, { de: 5, a: 6, couleur: ROUGE },
    { de: 6, a: 7, couleur: ROUGE }, { de: 7, a: 4, couleur: ROUGE },
  ];
  return figure(options.titre, points, segments, true);
}

/**
 * DEUX DROITES — parallèles, sécantes, ou non coplanaires.
 * ⛔ On ne marque pas leur point commun : c'est la question.
 * ⚠️ En perspective cavalière, deux droites non coplanaires SEMBLENT se
 * couper : le dessin ne tranche donc jamais la position relative, il montre la
 * configuration. Le corrigé doit le dire, sinon la figure mentirait.
 */
export function figureDeuxDroites(
  a1: Triplet,
  u1: Triplet,
  a2: Triplet,
  u2: Triplet,
  options: { titre?: string; noms?: readonly [string, string]; t?: number } = {},
): CanvasFigure {
  const t = options.t ?? 2;
  const d1 = net(soustraire(a1, fois(t, u1)));
  const f1 = net(ajouter(a1, fois(t, u1)));
  const d2 = net(soustraire(a2, fois(t, u2)));
  const f2 = net(ajouter(a2, fois(t, u2)));
  const points: Point[] = [
    { x: d1[0], y: d1[1], z: d1[2], couleur: ROUGE },
    { x: f1[0], y: f1[1], z: f1[2], label: options.noms?.[0], couleur: ROUGE },
    { x: d2[0], y: d2[1], z: d2[2], couleur: BLEU },
    { x: f2[0], y: f2[1], z: f2[2], label: options.noms?.[1], couleur: BLEU },
  ];
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: ROUGE },
    { de: 2, a: 3, couleur: BLEU },
  ];
  return figure(options.titre, points, segments, true);
}

/**
 * UN POINT ET UN MORCEAU DE PLAN, avec la perpendiculaire amorcée — la figure
 * de la DISTANCE d'un point à un plan et du PROJETÉ orthogonal.
 * ⛔ Le pied $H$ n'est jamais marqué ni nommé : dans ces questions, c'est lui
 * ou sa distance que l'on cherche. On trace le trait pointillé depuis $M$ dans
 * la direction de la normale, et on arrête à mi-chemin : l'élève voit par où
 * ça descend, pas où ça tombe.
 */
export function figurePointEtPlan(
  m: Triplet,
  plan: readonly [number, number, number, number],
  options: { titre?: string; nomPoint?: string; nomPlan?: string } = {},
): CanvasFigure {
  const n: Triplet = [plan[0], plan[1], plan[2]];
  const ecart = (scalaire(n, m) + plan[3]) / scalaire(n, n);
  const demi = Math.max(1.5, 1.2 * Math.abs(ecart) * norme(n));
  const coins = coinsDuPlan(plan, m, demi);
  const amorce = net(soustraire(m, fois(0.45 * ecart, n)));
  const points: Point[] = [
    ...coins.map((c) => ({ x: c[0], y: c[1], z: c[2], couleur: BLEU })),
    { x: m[0], y: m[1], z: m[2], label: options.nomPoint ?? "M", couleur: ROUGE },
    { x: amorce[0], y: amorce[1], z: amorce[2], couleur: GRIS },
  ];
  if (options.nomPlan) {
    const i = coinLePlusLibre(coins, [...bordsDesAxes(points), m]);
    points[i] = { ...points[i], label: options.nomPlan };
  }
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: BLEU }, { de: 1, a: 2, couleur: BLEU },
    { de: 2, a: 3, couleur: BLEU }, { de: 3, a: 0, couleur: BLEU },
    { de: 4, a: 5, couleur: GRIS, pointille: true },
  ];
  return figure(options.titre, points, segments, true);
}

/**
 * UN POINT ET UNE DROITE, avec la perpendiculaire amorcée — même principe pour
 * la distance d'un point à une droite et le projeté sur une droite.
 */
export function figurePointEtDroite(
  m: Triplet,
  a: Triplet,
  u: Triplet,
  options: { titre?: string; nomPoint?: string; nomDroite?: string } = {},
): CanvasFigure {
  // Le paramètre du pied de la perpendiculaire : on s'en sert UNIQUEMENT pour
  // cadrer le morceau de droite autour de lui et amorcer le trait, jamais pour
  // marquer le pied.
  const tPied = scalaire(soustraire(m, a), u) / scalaire(u, u);
  const pied = ajouter(a, fois(tPied, u));
  const amorce = net(ajouter(m, fois(0.45, soustraire(pied, m))));
  const debut = net(ajouter(a, fois(tPied - 1.5, u)));
  const fin = net(ajouter(a, fois(tPied + 1.5, u)));
  const points: Point[] = [
    { x: debut[0], y: debut[1], z: debut[2], couleur: BLEU },
    { x: fin[0], y: fin[1], z: fin[2], label: options.nomDroite, couleur: BLEU },
    { x: m[0], y: m[1], z: m[2], label: options.nomPoint ?? "M", couleur: ROUGE },
    { x: amorce[0], y: amorce[1], z: amorce[2], couleur: GRIS },
  ];
  const segments: Segment[] = [
    { de: 0, a: 1, couleur: BLEU },
    { de: 2, a: 3, couleur: GRIS, pointille: true },
  ];
  return figure(options.titre, points, segments, true);
}
