// lib/tutor-v4/questionBank/cm1/maths/aires.bank.ts
//
// L'AIRE au CM1 : cinq micro-compétences, chacune avec sa vidéo paysage et son
// short (manim/scripts/cm1/aire_<micro>.py, voix dans manim/voix/cm1-aire-*.json).
//
// ⭐ 14/11/2026 — RÉÉCRITE EN GÉNÉRATEURS. Avant : 12 à 26 squelettes par micro,
// 10 à 17 répétitions sur 20 à une même étoile, 0 à 56 % de dessins. Chaque
// gabarit tire maintenant une SITUATION de la vie (carreleur, maraîchère,
// créatrice de jeux vidéo, couturière, pizzaiolo, architecte, zoo, ferme…)
// × une TOURNURE × des nombres, et pose presque toujours sa FIGURE sur
// quadrillage (`figure_libre`) : le rectangle partagé en carreaux, la figure
// composée, le mur et sa fenêtre.
//
// LA MÉTHODE ET LES MOTS SONT CEUX DES VIDÉOS :
//   - comprendre : l'aire, c'est « la place que prend une surface, tout
//     l'intérieur » ; on la mesure en comptant les carreaux qui la couvrent ;
//     le périmètre, c'est le tour. Le plus long n'a pas toujours la plus grande aire.
//   - unité : on compare avec la MÊME unité (la case) ; deux formes différentes
//     peuvent avoir la même aire ; une grande case, c'est 4 petites cases.
//   - carré et rectangle : « le nombre de rangées fois le nombre de cases dans
//     une rangée » ; le carré, « le côté fois le côté » ; on multiplie, on
//     n'ajoute pas.
//   - composer : on DÉCOUPE en rectangles, on calcule chaque partie, on ajoute ;
//     chaque carreau compte une seule fois.
//   - défi : le grand rectangle moins le trou (le mur moins la fenêtre), les pots
//     de peinture, le même tour mais pas la même aire.
//
// ⛔ CM1 = ZÉRO CLAVIER : uniquement des QCM (aucune question `open`).
// ⛔ L'unité partout : « 12 carreaux », « 12 cases », « 12 m² », « 12 cm² ».
// ⛔ Les leurres sont de vraies erreurs d'élève : compter le tour, ajouter au
//    lieu de multiplier, oublier une partie, oublier d'enlever le trou…
// ⚠️ `figure_libre` numérote ses cases [ligne, colonne] à partir de 0 ;
//    `perimeterPath` trace en rouge un chemin de nœuds (trait de découpe, bord).

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { FigureLibreCanvasData, QuadrilatereCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, etapes, fr, melange, qcm, un } from "./trous-outils";

type Gen = TutorGeneratedQuestionV4;

/* ───────────────────────── Outils ───────────────────────── */

/** « 1 carreau », « 12 carreaux ». */
const nb = (v: number, p1: string, p: string) => `${fr(v)} ${v >= 2 ? p : p1}`;
const rg = (h: number) => (h >= 2 ? `${h} rangées` : "1 rangée");

/** QCM de nombres avec leur unité : leurres distincts en valeur, complétés par des voisins. */
function qcmU(juste: number, faux: number[], p1: string, p: string) {
  const vals: number[] = [];
  for (const v of melange(faux)) if (Number.isInteger(v) && v > 0 && v !== juste && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++)
    for (const v of [juste + k, juste - k]) if (v > 0 && v !== juste && !vals.includes(v) && vals.length < 3) vals.push(v);
  return qcm(nb(juste, p1, p), vals.slice(0, 3).map((v) => nb(v, p1, p)));
}

type Personne = { n: string; il: "il" | "elle" };
const PERSONNES: Personne[] = [
  { n: "Nina", il: "elle" }, { n: "Téo", il: "il" }, { n: "Zoé", il: "elle" }, { n: "Ravi", il: "il" },
  { n: "Lou", il: "elle" }, { n: "Malo", il: "il" }, { n: "Sacha", il: "il" }, { n: "Jade", il: "elle" },
  { n: "Naïa", il: "elle" }, { n: "Tom", il: "il" }, { n: "Lina", il: "elle" }, { n: "Yanis", il: "il" },
  { n: "Maya", il: "elle" }, { n: "Noé", il: "il" }, { n: "Chloé", il: "elle" }, { n: "Mathis", il: "il" },
  { n: "Awa", il: "elle" }, { n: "Léo", il: "il" }, { n: "Emma", il: "elle" }, { n: "Karim", il: "il" },
];
/** « de Nina », « d'Awa ». */
const deN = (n: string) => (/^[AEIOUÉÈ]/.test(n) ? `d'${n}` : `de ${n}`);
const deuxPersonnes = (): [Personne, Personne] => {
  const a = un(PERSONNES);
  return [a, un(PERSONNES.filter((x) => x.n !== a.n))];
};

/* ───────────────────────── Le quadrillage ───────────────────────── */

type Case = [number, number];
type Noeud = [number, number];
const cle = ([r, c]: Case) => `${r},${c}`;

function rect(h: number, w: number, r0 = 0, c0 = 0): Case[] {
  const out: Case[] = [];
  for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) out.push([r0 + r, c0 + c]);
  return out;
}
/** Le tour, en côtés de carreau. */
function contour(cases: Case[]): number {
  const s = new Set(cases.map(cle));
  let n = 0;
  for (const [r, c] of cases) for (const v of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]] as Case[]) if (!s.has(cle(v))) n++;
  return n;
}
const sans = (cases: Case[], retirer: Case[]) => {
  const s = new Set(retirer.map(cle));
  return cases.filter((k) => !s.has(cle(k)));
};
const unir = (...gs: Case[][]) => {
  const vus = new Set<string>();
  const out: Case[] = [];
  for (const g of gs) for (const k of g) if (!vus.has(cle(k))) (vus.add(cle(k)), out.push(k));
  return out;
};
function normaliser(cases: Case[]): Case[] {
  const r0 = Math.min(...cases.map((k) => k[0]));
  const c0 = Math.min(...cases.map((k) => k[1]));
  return cases.map(([r, c]) => [r - r0, c - c0] as Case);
}
const largeurCases = (cases: Case[]) => Math.max(...cases.map((k) => k[1])) + 1;
const hauteurCases = (cases: Case[]) => Math.max(...cases.map((k) => k[0])) + 1;
const cadre = (h: number, w: number, r0 = 0, c0 = 0): Noeud[] => [[r0, c0], [r0, c0 + w], [r0 + h, c0 + w], [r0 + h, c0], [r0, c0]];

/** Une figure d'un seul tenant : coin retiré, bosse, creux ou L. */
function polyomino(maxW = 6, maxH = 4, minW = 3): Case[] {
  const w = entre(minW, maxW);
  const h = entre(2, maxH);
  let cases = rect(h, w, 1, 0);
  const v = un(["coin", "bosse", "creux", "L", "bosse", "rien"]);
  if (v === "coin") cases = sans(cases, [un<Case>([[1, w - 1], [1, 0], [h, 0], [h, w - 1]])]);
  if (v === "creux") cases = sans(cases, [[1, entre(1, w - 2)]]);
  if (v === "bosse") {
    const k = entre(1, w - 1);
    const d = entre(0, w - k);
    for (let c = d; c < d + k; c++) cases.push([0, c]);
  }
  if (v === "L") {
    const kw = entre(1, w - 2);
    for (let r = 1; r < h; r++) for (let c = w - kw; c < w; c++) cases = sans(cases, [[r, c]]);
  }
  return normaliser(cases);
}

/** Des rangées alignées à gauche : « première rangée : 5, deuxième : 5, troisième : 3 ». */
const rangees = (l: number[]): Case[] => l.flatMap((w, r) => rect(1, w, r, 0));

/** Deux rectangles collés : l'un en haut (ou à gauche), l'autre en bas (ou à droite). */
type Deux = { cells: Case[]; a: { h: number; w: number }; b: { h: number; w: number }; posA: string; posB: string; coupe: Noeud[]; bbox: { h: number; w: number } };
function deuxRect(o: { carreB?: boolean } = {}): Deux {
  if (Math.random() < 0.6) {
    const w1 = entre(4, 7);
    const h1 = entre(1, 3);
    const w2 = o.carreB ? entre(2, Math.min(4, w1 - 1)) : entre(2, w1 - 1);
    const h2 = o.carreB ? w2 : entre(2, 4);
    const off = un([0, w1 - w2, Math.floor((w1 - w2) / 2)]);
    return {
      cells: [...rect(h1, w1), ...rect(h2, w2, h1, off)],
      a: { h: h1, w: w1 }, b: { h: h2, w: w2 }, posA: "en haut", posB: "en bas",
      coupe: [[h1, off], [h1, off + w2]], bbox: { h: h1 + h2, w: w1 },
    };
  }
  const h1 = entre(3, 5);
  const w1 = entre(2, 3);
  const h2 = o.carreB ? entre(2, h1 - 1) : entre(1, h1 - 1);
  const w2 = o.carreB ? h2 : entre(2, 5);
  const off = un([0, h1 - h2]);
  return {
    cells: [...rect(h1, w1), ...rect(h2, w2, off, w1)],
    a: { h: h1, w: w1 }, b: { h: h2, w: w2 }, posA: "à gauche", posB: "à droite",
    coupe: [[off, w1], [off + h2, w1]], bbox: { h: h1, w: w1 + w2 },
  };
}

/** Une ou plusieurs figures sur le même quadrillage, de gauche à droite.
 *  `chemin` (nœuds relatifs à la PREMIÈRE figure) se trace en rouge. */
function grille(groupes: Case[][], o: { chemin?: Noeud[]; uns?: boolean } = {}): FigureLibreCanvasData {
  const tout: Case[] = [];
  let dec = 1;
  const debut: number[] = [];
  for (const g of groupes) {
    debut.push(dec);
    for (const [r, c] of g) tout.push([r + 1, c + dec]);
    const largeurChemin = debut.length === 1 && o.chemin ? Math.max(...o.chemin.map((p) => p[1])) : 0;
    dec += Math.max(largeurCases(g), largeurChemin) + 2;
  }
  const chemin = o.chemin?.map(([r, c]) => [r + 1, c + debut[0]] as Noeud);
  let rows = Math.max(...tout.map((k) => k[0])) + 2;
  if (chemin) rows = Math.max(rows, Math.max(...chemin.map((p) => p[0])) + 1);
  const cols = dec - 1;
  const cellSize = Math.max(14, Math.min(30, Math.floor(320 / cols), Math.floor(260 / rows)));
  return {
    kind: "figure_libre",
    size: { cellSize, padding: 8 },
    grid: { rows, cols, filledCells: tout },
    display: { showGrid: true, showFilled: true, showCellLabels: !!o.uns, showPerimeter: !!chemin },
    ...(chemin ? { perimeterPath: chemin } : {}),
  };
}

/** Un rectangle coté (longueurs écrites), à l'échelle. */
function rectangleCote(L: number, l: number, u: string): QuadrilatereCanvasData {
  const s = Math.min(200 / L, 120 / l);
  const x0 = 150 - (L * s) / 2;
  const y0 = 120 - (l * s) / 2;
  return {
    kind: "quadrilatere",
    points: { A: { x: x0, y: y0 }, B: { x: x0 + L * s, y: y0 }, C: { x: x0 + L * s, y: y0 + l * s }, D: { x: x0, y: y0 + l * s } },
    display: { showPoints: false, showLabels: false, showSides: true },
    sideLabels: { AB: `${L} ${u}`, BC: `${l} ${u}` },
    marks: { rightAnglesAt: ["A", "B", "C", "D"] },
  };
}

/* ───────────────────────── Les situations ───────────────────────── */

/** Ce qu'on COUVRE de pièces carrées. `le` / `de` : l'objet ; `p1` / `p` : la pièce. */
type Couvrir = { metier: string; fait: string; le: string; de: string; p: string; p1: string; f?: boolean; pp: string; m2?: boolean };
const COUVRIR: Couvrir[] = [
  { metier: "Le carreleur", fait: "couvre le sol d'une cuisine avec des carreaux", le: "le sol", de: "du sol", p: "carreaux", p1: "carreau", pp: "posé", m2: true },
  { metier: "La maraîchère", fait: "plante des salades dans une parcelle, une salade par case", le: "la parcelle", de: "de la parcelle", p: "cases", p1: "case", f: true, pp: "planté", m2: true },
  { metier: "La créatrice de jeux vidéo", fait: "dessine une île avec des cases sur la carte de son jeu", le: "l'île", de: "de l'île", p: "cases", p1: "case", f: true, pp: "dessiné" },
  { metier: "La couturière", fait: "coud un patchwork avec des carrés de tissu", le: "le patchwork", de: "du patchwork", p: "carrés de tissu", p1: "carré de tissu", pp: "cousu" },
  { metier: "Le maçon", fait: "pave une allée avec des pavés carrés", le: "l'allée", de: "de l'allée", p: "pavés", p1: "pavé", pp: "posé" },
  { metier: "Le jardinier du stade", fait: "pose des plaques de gazon sur un terrain", le: "le terrain", de: "du terrain", p: "plaques", p1: "plaque", f: true, pp: "posé", m2: true },
  { metier: "La chocolatière", fait: "moule une tablette de chocolat en carrés", le: "la tablette", de: "de la tablette", p: "carrés", p1: "carré", pp: "moulé" },
  { metier: "L'architecte", fait: "dessine le plan d'une chambre sur un quadrillage", le: "la chambre", de: "de la chambre", p: "carreaux", p1: "carreau", pp: "dessiné", m2: true },
  { metier: "Le joueur", fait: "construit une base avec des blocs dans un jeu vidéo", le: "la base", de: "de la base", p: "blocs", p1: "bloc", pp: "posé" },
  { metier: "La maîtresse", fait: "couvre un panneau de la classe avec des post-it", le: "le panneau", de: "du panneau", p: "post-it", p1: "post-it", pp: "collé" },
  { metier: "L'artiste", fait: "fait une mosaïque avec des petits carreaux", le: "la mosaïque", de: "de la mosaïque", p: "carreaux", p1: "carreau", pp: "collé" },
  { metier: "Le pizzaiolo", fait: "coupe une grande pizza rectangulaire en parts carrées", le: "la pizza", de: "de la pizza", p: "parts", p1: "part", f: true, pp: "coupé" },
  { metier: "La coach de gym", fait: "couvre le sol de la salle avec des tapis carrés", le: "le sol de la salle", de: "du sol de la salle", p: "tapis", p1: "tapis", pp: "posé", m2: true },
  { metier: "L'ingénieure", fait: "pose des panneaux solaires carrés sur un toit plat", le: "la zone de panneaux", de: "de la zone de panneaux", p: "panneaux", p1: "panneau", pp: "posé", m2: true },
  { metier: "Le fermier", fait: "partage un champ en parcelles carrées", le: "le champ", de: "du champ", p: "parcelles", p1: "parcelle", f: true, pp: "semé" },
  { metier: "La pâtissière", fait: "découpe un gâteau rectangulaire en parts carrées", le: "le gâteau", de: "du gâteau", p: "parts", p1: "part", f: true, pp: "découpé" },
  { metier: "L'élève", fait: "colorie une figure sur son cahier quadrillé", le: "la figure", de: "de la figure", p: "carreaux", p1: "carreau", pp: "colorié" },
  { metier: "Le décorateur", fait: "pose des dalles de moquette dans un salon", le: "le salon", de: "du salon", p: "dalles", p1: "dalle", f: true, pp: "posé", m2: true },
  { metier: "La gardienne du zoo", fait: "pose des dalles dans l'enclos des tortues", le: "l'enclos", de: "de l'enclos", p: "dalles", p1: "dalle", f: true, pp: "posé", m2: true },
  { metier: "Le constructeur", fait: "assemble une plaque avec des briques de jeu carrées", le: "la plaque", de: "de la plaque", p: "briques", p1: "brique", f: true, pp: "posé" },
  { metier: "La peintre", fait: "peint une fresque sur un mur quadrillé", le: "la fresque", de: "de la fresque", p: "carreaux", p1: "carreau", pp: "peint" },
  { metier: "Le cuisinier", fait: "couvre le fond d'un plat avec des feuilles de lasagne carrées", le: "le fond du plat", de: "du fond du plat", p: "feuilles", p1: "feuille", f: true, pp: "posé" },
  { metier: "L'éleveuse", fait: "couvre le sol du poulailler avec des dalles", le: "le sol du poulailler", de: "du sol du poulailler", p: "dalles", p1: "dalle", f: true, pp: "posé", m2: true },
  { metier: "Le photographe", fait: "colle des photos carrées sur un panneau d'exposition", le: "le panneau", de: "du panneau", p: "photos", p1: "photo", f: true, pp: "collé" },
  // Un contexte sur 25 à La Réunion (≈ 4 %).
  { metier: "Le planteur", fait: "partage son champ de cannes, à La Réunion, en parcelles carrées", le: "le champ de cannes", de: "du champ de cannes", p: "parcelles", p1: "parcelle", f: true, pp: "planté" },
];
const qui = (c: { metier: string }) => (Math.random() < 0.5 ? c.metier : un(PERSONNES).n);
const lePiece = (c: Couvrir) => `${c.f ? "la" : "le"} ${c.p1}`;
/** L'unité de la réponse : la pièce, ou le m² quand une pièce fait 1 m². */
function uniteDe(c: Couvrir, m2Possible = true) {
  if (m2Possible && c.m2 && Math.random() < 0.5) return { p1: "m²", p: "m²", phrase: ` Chaque ${c.p1} fait 1 m².` };
  return { p1: c.p1, p: c.p, phrase: "" };
}

/** Les plans où l'on compare des ZONES (micro unité). */
const LIEUX: { lieu: (n: string) => string; zones: string[] }[] = [
  { lieu: (n) => `la carte du jeu vidéo ${deN(n)}`, zones: ["l'île du volcan", "l'île des palmiers", "le lac", "la forêt", "la plage", "la grotte", "le château", "le désert"] },
  { lieu: () => "le plan du zoo", zones: ["l'enclos des lions", "l'enclos des zèbres", "le bassin des otaries", "l'enclos des girafes", "la volière"] },
  { lieu: () => "le plan du jardin de l'école", zones: ["le carré de fraises", "le carré de tomates", "la mare", "la pelouse", "le coin des fleurs"] },
  { lieu: () => "le plan de la ferme", zones: ["le pré des vaches", "l'enclos des moutons", "le poulailler", "le potager", "la mare aux canards"] },
  { lieu: () => "le plan du parc", zones: ["l'aire de jeux", "le bassin", "la pelouse", "le parking", "le kiosque"] },
  { lieu: (n) => `le plan de la maison ${deN(n)}`, zones: ["la cuisine", "le salon", "la chambre", "le garage", "la salle de bain"] },
  { lieu: () => "le plan du quartier", zones: ["le stade", "l'école", "le marché", "la piscine", "la bibliothèque"] },
  { lieu: () => "le plan du camping", zones: ["l'aire des tentes", "la piscine", "le terrain de pétanque", "le coin barbecue"] },
  { lieu: (n) => `la carte au trésor ${deN(n)}`, zones: ["l'île aux perroquets", "la baie des pirates", "la grotte du trésor", "le marais"] },
  { lieu: () => "le plan du gymnase", zones: ["le terrain de basket", "le tatami", "le mur d'escalade", "le coin des cerceaux"] },
  { lieu: () => "le plan du centre commercial", zones: ["le magasin de jouets", "la librairie", "la boulangerie", "le cinéma"] },
  { lieu: (n) => `le dessin ${deN(n)}`, zones: ["le bateau", "la maison", "la fusée", "le robot", "le dragon"] },
];
/** « du lac », « de la forêt », « de l'île ». */
const deZ = (z: string) => (z.startsWith("le ") ? `du ${z.slice(3)}` : z.startsWith("les ") ? `des ${z.slice(4)}` : `de ${z}`);
function zones(k: number) {
  const L = un(LIEUX);
  return { lieu: L.lieu(un(PERSONNES).n), z: melange([...L.zones]).slice(0, k) };
}

/** Des objets qu'on compare entre deux personnes. */
const OBJETS = ["le jardin", "le potager", "le tapis", "l'enclos", "la terrasse", "le champ", "le bac à sable", "la cour", "le patchwork", "la pelouse", "le carré de fleurs", "la piscine", "le dessin", "la parcelle"];

/** Les chantiers avec un TROU (micro défi). */
type Chantier = { metier: string; il: "il" | "elle"; action: string; le: string; trou: string; troule: string; q: string; unProd: string; prod1: string; prods: string };
const CHANTIERS: Chantier[] = [
  { metier: "La peintre", il: "elle", action: "peindre un mur", le: "le mur", trou: "une fenêtre", troule: "la fenêtre", q: "Quelle surface faut-il peindre ?", unProd: "Un pot de peinture", prod1: "pot", prods: "pots" },
  { metier: "Le paysagiste", il: "il", action: "poser du gazon dans un jardin", le: "le jardin", trou: "un bassin", troule: "le bassin", q: "Quelle surface de gazon faut-il ?", unProd: "Un rouleau de gazon", prod1: "rouleau", prods: "rouleaux" },
  { metier: "Le carreleur", il: "il", action: "carreler le sol d'une salle de bain", le: "le sol", trou: "une baignoire", troule: "la baignoire", q: "Quelle surface faut-il carreler ?", unProd: "Un paquet de carreaux", prod1: "paquet", prods: "paquets" },
  { metier: "La décoratrice", il: "elle", action: "poser de la moquette dans un salon", le: "le salon", trou: "une cheminée", troule: "la cheminée", q: "Quelle surface de moquette faut-il ?", unProd: "Un rouleau de moquette", prod1: "rouleau", prods: "rouleaux" },
  { metier: "Le jardinier", il: "il", action: "semer du gazon dans une cour", le: "la cour", trou: "un bac à sable", troule: "le bac à sable", q: "Quelle surface faut-il semer ?", unProd: "Un sac de graines", prod1: "sac", prods: "sacs" },
  { metier: "Le peintre", il: "il", action: "peindre une façade", le: "la façade", trou: "une porte", troule: "la porte", q: "Quelle surface faut-il peindre ?", unProd: "Un pot de peinture", prod1: "pot", prods: "pots" },
  { metier: "Le menuisier", il: "il", action: "vernir le parquet d'une chambre", le: "le parquet", trou: "un placard fixé au sol", troule: "le placard", q: "Quelle surface faut-il vernir ?", unProd: "Un pot de vernis", prod1: "pot", prods: "pots" },
  { metier: "La tapissière", il: "elle", action: "coller du papier peint sur un mur", le: "le mur", trou: "une porte", troule: "la porte", q: "Quelle surface faut-il tapisser ?", unProd: "Un rouleau de papier peint", prod1: "rouleau", prods: "rouleaux" },
  { metier: "Le maçon", il: "il", action: "couler une dalle de béton dans une cour", le: "la cour", trou: "un carré de terre pour un arbre", troule: "le carré de l'arbre", q: "Quelle surface de béton faut-il ?", unProd: "Un sac de ciment", prod1: "sac", prods: "sacs" },
  { metier: "La fermière", il: "elle", action: "pailler le sol d'une étable", le: "le sol de l'étable", trou: "un abreuvoir", troule: "l'abreuvoir", q: "Quelle surface faut-il pailler ?", unProd: "Une botte de paille", prod1: "botte", prods: "bottes" },
  { metier: "Le gardien du gymnase", il: "il", action: "vernir le sol du gymnase", le: "le sol", trou: "une estrade", troule: "l'estrade", q: "Quelle surface faut-il vernir ?", unProd: "Un bidon de vernis", prod1: "bidon", prods: "bidons" },
  { metier: "Le peintre", il: "il", action: "peindre le sol d'un garage", le: "le sol du garage", trou: "un établi", troule: "l'établi", q: "Quelle surface faut-il peindre ?", unProd: "Un pot de peinture", prod1: "pot", prods: "pots" },
  { metier: "La jardinière", il: "elle", action: "pailler un potager", le: "le potager", trou: "une cabane", troule: "la cabane", q: "Quelle surface faut-il pailler ?", unProd: "Un sac de paille", prod1: "sac", prods: "sacs" },
  { metier: "L'ingénieure", il: "elle", action: "couvrir un toit plat de panneaux solaires", le: "le toit", trou: "une cheminée", troule: "la cheminée", q: "Quelle surface peut-on couvrir ?", unProd: "Un lot de panneaux", prod1: "lot", prods: "lots" },
];
function chantier() {
  const c = un(CHANTIERS);
  if (Math.random() < 0.5) return { ...c, qui: c.metier, il: c.il };
  const p = un(PERSONNES);
  return { ...c, qui: p.n, il: p.il };
}

/** Un mur de r × c avec un trou rectangulaire t1 × t2 à l'intérieur (ou posé en bas, comme une porte). */
function murTrou() {
  const r = entre(3, 5);
  const c = entre(4, 8);
  const th = entre(1, Math.min(2, r - 1));
  const tw = entre(1, Math.min(3, c - 2));
  const r0 = r - th >= 2 && Math.random() < 0.6 ? entre(1, r - th - 1) : r - th;
  const c0 = entre(1, c - tw - 1);
  const trou = rect(th, tw, r0, c0);
  return { r, c, th, tw, t: th * tw, total: r * c, aire: r * c - th * tw, cells: sans(rect(r, c), trou) };
}

/* ───────────────────────── Les fabricants ───────────────────────── */

const gab =
  (microId: string) =>
  (id: string, difficulty: DifficultyLevel, hint: string, generate: () => Gen): TutorBankItemV4 =>
    ({
      kind: "template",
      id: id.startsWith("cm1_") ? id : `cm1_${microId}_tpl_${id}`,
      niveau: "cm1",
      matiere: "maths",
      notionId: "aire",
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["cm1", "aire", microId, "template"],
      generate,
    }) as TutorBankItemV4;

/* ════════════════════════ AIRE_COMPRENDRE (ceinture jaune) ════════════════════════
   Vidéo : Mathis le carreleur couvre le sol, rangée par rangée (5 + 5 + 5 = 15) ;
   la plinthe fait le tour (périmètre), le carrelage couvre l'intérieur (aire) ;
   « pour peindre un mur, que cherche-t-on ? » ; la bande de 6 contre le carré
   de 9 ; défi : 5, 5 puis 3 carreaux → 13. */

const ACTIONS_AIRE = [
  { g: "peindre un mur", q: "de peinture" },
  { g: "carreler le sol de la cuisine", q: "de carreaux" },
  { g: "semer du gazon dans un jardin", q: "de graines" },
  { g: "couvrir un livre avec du papier", q: "de papier" },
  { g: "poser une nappe sur toute la table", q: "de tissu" },
  { g: "mettre de la moquette dans une chambre", q: "de moquette" },
  { g: "coller du papier peint sur un mur", q: "de papier peint" },
  { g: "vernir le dessus d'une table", q: "de vernis" },
  { g: "étaler du glaçage sur le dessus d'un gâteau", q: "de glaçage" },
  { g: "poser des panneaux solaires sur un toit", q: "de panneaux" },
  { g: "couvrir une pizza de sauce tomate", q: "de sauce" },
  { g: "recouvrir le sol d'une salle de gym avec des tapis", q: "de tapis" },
  { g: "colorier tout l'intérieur d'une figure", q: "de couleur" },
  { g: "pailler le sol d'une étable", q: "de paille" },
];
const ACTIONS_TOUR = [
  { g: "poser une clôture autour d'un jardin", f: "clôture" },
  { g: "coller un ruban autour d'une carte", f: "ruban" },
  { g: "poser une plinthe tout autour de la cuisine", f: "plinthe" },
  { g: "coudre de la dentelle autour d'un napperon", f: "dentelle" },
  { g: "accrocher une guirlande autour d'une fenêtre", f: "guirlande" },
  { g: "mettre un cadre autour d'un tableau", f: "baguette" },
  { g: "tendre une corde autour d'un ring", f: "corde" },
  { g: "poser une bordure autour d'un massif de fleurs", f: "bordure" },
  { g: "dessiner une frise autour d'une page", f: "frise" },
  { g: "poser du grillage autour d'un enclos à poules", f: "grillage" },
  { g: "coller du scotch de couleur sur le bord d'une affiche", f: "scotch" },
  { g: "coudre un galon autour d'un coussin", f: "galon" },
];

const comprendre = gab("aire_comprendre");

const aireComprendre: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_aire_comprendre_fixed_001_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L'aire d'une surface, c'est…",
    format: "qcm",
    choices: ["la place qu'elle prend, tout l'intérieur", "son tour", "la longueur de son bord", "son poids"],
    expected: ["la place qu'elle prend, tout l'intérieur"],
    comparator: "mcq_exact",
    hint: "L'aire parle de l'intérieur, le périmètre du tour.",
    explanation: "L'aire, c'est la place que prend une surface : tout l'intérieur. Le tour, c'est le périmètre.",
    tags: ["cm1", "aire", "aire_comprendre", "definition", "qcm"],
  },

  // ★1 — Aire ou périmètre ? (« pour peindre un mur, que cherche-t-on ? »)
  comprendre("cm1_aire_comprendre_tpl_001_surface_ou_contour", 1, "Ce qui couvre l'intérieur, c'est l'aire. Ce qui fait le tour, c'est le périmètre.", () => {
    const estAire = Math.random() < 0.5;
    const p = un(PERSONNES).n;
    const a = estAire ? un(ACTIONS_AIRE) : un(ACTIONS_TOUR);
    const tournures = [
      `Pour ${a.g}, que cherche-t-on ?`,
      `${p} veut ${a.g}. Que doit-on connaître ?`,
      `${cap(a.g)} : cherche-t-on l'aire ou le périmètre ?`,
      `On veut ${a.g}. Quelle grandeur faut-il connaître ?`,
      estAire ? `Pour savoir combien ${(a as { q: string }).q} il faut pour ${a.g}, que cherche-t-on ?` : `Pour savoir quelle longueur de ${(a as { f: string }).f} il faut pour ${a.g}, que cherche-t-on ?`,
    ];
    const juste = estAire ? "l'aire" : "le périmètre";
    const h = entre(2, 4);
    const w = entre(3, 6);
    return {
      text: un(tournures),
      ...qcm(juste, ["l'aire", "le périmètre", "la hauteur", "la masse"]),
      explanation: estAire
        ? "On couvre tout l'intérieur : c'est l'aire. Le dessin : l'aire, c'est le bleu ; le tour rouge, c'est le périmètre."
        : "On fait le tour : c'est le périmètre. Le dessin : le tour rouge, c'est le périmètre ; le bleu, c'est l'aire.",
      canvas: grille([rect(h, w)], { chemin: cadre(h, w) }),
    };
  }),

  // ★1 — Compter les carreaux qui couvrent la surface.
  comprendre("cm1_aire_comprendre_tpl_101_compter_couvrir", 1, "Compte les carreaux qui couvrent l'intérieur, un par un.", () => {
    const c = un(COUVRIR);
    const cells = Math.random() < 0.6 ? rect(entre(2, 3), entre(2, 5)) : polyomino(5, 3);
    const aire = cells.length;
    const Q = [
      `Quelle est l'aire ${c.de} ?`,
      `Combien de ${c.p} couvrent ${c.le} ?`,
      `Quelle est l'aire ${c.de}, en ${c.p} ?`,
      `Compte les ${c.p} : quelle est l'aire ${c.de} ?`,
      `Quelle place prend ${c.le}, en ${c.p} ?`,
    ];
    return {
      text: `${qui(c)} ${c.fait}. ${un(Q)}`,
      ...qcmU(aire, [contour(cells), aire + 1, aire - 1, aire + 2], c.p1, c.p),
      explanation: etapes("l'aire, c'est la place que prend la surface : on compte tout ce qui la couvre, pas le bord.", `on compte les ${c.p} un par un : ${aire}.`, `l'aire ${c.de} est de ${nb(aire, c.p1, c.p)}.`),
      canvas: grille([cells]),
    };
  }),

  // ★1 — Ce que mesure l'aire, dans une situation.
  comprendre("cm1_aire_comprendre_tpl_102_ce_que_mesure", 1, "L'aire, c'est tout l'intérieur, pas le bord.", () => {
    const c = un(COUVRIR);
    const juste = `la place que prend ${c.le}, tout l'intérieur`;
    const Q = [`L'aire ${c.de}, c'est…`, `Que mesure l'aire ${c.de} ?`, `Que veut dire « l'aire ${c.de} » ?`, `Que mesure-t-on avec l'aire ${c.de} ?`];
    const h = entre(2, 3);
    const w = entre(3, 5);
    return {
      text: `${qui(c)} ${c.fait}. ${un(Q)}`,
      ...qcm(juste, [`le tour ${c.de}`, `la longueur du bord ${c.de}`, `le poids ${c.de}`, `la hauteur ${c.de}`]),
      explanation: `L'aire, c'est la place que prend une surface : tout l'intérieur. Le tour ${c.de}, c'est son périmètre.`,
      canvas: grille([rect(h, w)]),
    };
  }),

  // ★2 — Le plus long n'a pas toujours la plus grande aire : comparer deux surfaces.
  comprendre("cm1_aire_comprendre_tpl_006_plus_grande_surface", 2, "Compte les carreaux de chaque figure : la plus longue n'est pas forcément la plus grande.", () => {
    const [A, B] = deuxPersonnes();
    const obj = un(OBJETS);
    let fa: Case[];
    let fb: Case[];
    if (Math.random() < 0.6) {
      const n = entre(5, 9);
      const comp = un([[2, 3], [3, 3], [2, 4], [3, 4], [2, 5]].filter(([x, y]) => x * y !== n && Math.max(x, y) < n));
      const bande = rect(1, n);
      const bloc = rect(comp[0], comp[1]);
      [fa, fb] = Math.random() < 0.5 ? [bande, bloc] : [bloc, bande];
    } else {
      fa = polyomino(5, 3);
      fb = polyomino(5, 3);
    }
    const petite = Math.random() < 0.25;
    const sa = fa.length;
    const sb = fb.length;
    const juste = sa === sb ? "les deux ont la même aire" : (sa > sb) !== petite ? A.n : B.n;
    const Q = petite
      ? [`Qui a ${obj} avec la plus petite aire ?`, `Compte les carreaux. Qui a ${obj} avec la plus petite aire ?`]
      : [`Qui a ${obj} avec la plus grande aire ?`, `Compte les carreaux. Qui a ${obj} avec la plus grande aire ?`, `Qui a ${obj} qui prend le plus de place ?`, `Qui a ${obj} qui couvre le plus de carreaux ?`];
    return {
      text: `À gauche, ${obj} ${deN(A.n)}. À droite, ${obj} ${deN(B.n)}. ${un(Q)}`,
      ...qcm(juste, [A.n, B.n, "les deux ont la même aire"]),
      explanation: etapes("on compte les carreaux de chaque figure ; la plus longue n'a pas toujours la plus grande aire.", `${A.n} : ${sa} carreaux ; ${B.n} : ${sb} carreaux.`, sa === sb ? "les deux ont la même aire." : `${juste} a ${obj} avec la ${petite ? "plus petite" : "plus grande"} aire.`),
      canvas: grille([fa, fb]),
    };
  }),

  // ★2 — Rangée par rangée (le défi de la vidéo : 5, 5, puis 3).
  comprendre("cm1_aire_comprendre_tpl_103_rangee_par_rangee", 2, "Ajoute les carreaux de chaque rangée.", () => {
    const c = un(COUVRIR);
    const n = entre(2, 4);
    const base = entre(3, 6);
    const l = Array.from({ length: n }, (_, i) => (i === n - 1 ? entre(2, base - 1) : Math.random() < 0.75 ? base : entre(2, base)));
    const aire = l.reduce((a, b) => a + b, 0);
    const ORD = ["Première", "Deuxième", "Troisième", "Quatrième"];
    const rangs = l.map((v, i) => `${ORD[i]} rangée : ${nb(v, c.p1, c.p)}.`).join(" ");
    const Q = [`Quelle est l'aire ${c.de} ?`, `Quelle est l'aire ${c.de}, en ${c.p} ?`, `Combien de ${c.p} couvrent ${c.le} ?`, `Quelle place prend ${c.le} ?`];
    return {
      text: `${qui(c)} ${c.fait}. ${rangs} ${un(Q)}`,
      ...qcmU(aire, [l[0] * n, aire - l[n - 1], aire + 1, contour(rangees(l))], c.p1, c.p),
      explanation: etapes("on compte tous les carreaux, rangée par rangée, puis on ajoute.", `${l.join(" + ")} = ${aire}.`, `l'aire ${c.de} est de ${nb(aire, c.p1, c.p)}.`),
      canvas: grille([rangees(l)]),
    };
  }),

  // ★2 — Une figure moins simple : couvrir sans trou, compter chaque carreau une fois.
  comprendre("cm1_aire_comprendre_tpl_007_meme_aire_intro", 2, "Compte chaque carreau une seule fois, sans oublier ceux des bords.", () => {
    const c = un(COUVRIR);
    const cells = polyomino(6, 4, 4);
    const aire = cells.length;
    const Q = [
      `Combien de ${c.p} faut-il pour couvrir ${c.le} sans trou ?`,
      `Quelle est l'aire ${c.de} ?`,
      `Sans trou et sans superposer, combien de ${c.p} couvrent ${c.le} ?`,
      `Quelle place prend ${c.le}, en ${c.p} ?`,
    ];
    return {
      text: `${qui(c)} ${c.fait}. ${un(Q)}`,
      ...qcmU(aire, [contour(cells), aire - 1, aire + 1, hauteurCases(cells) * largeurCases(cells)], c.p1, c.p),
      explanation: etapes("l'aire, c'est tout l'intérieur : on compte chaque carreau une seule fois.", `on compte : ${aire} ${c.p}.`, `l'aire ${c.de} est de ${nb(aire, c.p1, c.p)}.`),
      canvas: grille([cells]),
    };
  }),

  // ★3 — Le tour ou l'intérieur ? Deux nombres, choisir celui de l'aire.
  comprendre("cm1_aire_comprendre_tpl_005_confusion_perimetre", 3, "Le tour, c'est le périmètre. Ce qui couvre l'intérieur, c'est l'aire.", () => {
    const c = un(COUVRIR);
    let h = entre(2, 4);
    let w = entre(h + 1, 7);
    for (let e = 0; e < 10 && 2 * (h + w) === h * w; e++) (h = entre(2, 4)), (w = entre(h + 1, 7));
    if (2 * (h + w) === h * w) (h = 2), (w = 5);
    const aire = h * w;
    const tour = 2 * (h + w);
    const deb = Math.random() < 0.5
      ? `${cap(c.le)} a ${rg(h)} de ${nb(w, c.p1, c.p)}. Son tour mesure ${tour} côtés de ${c.p1}.`
      : `Le tour ${c.de} mesure ${tour} côtés de ${c.p1}, et ${c.le} a ${rg(h)} de ${nb(w, c.p1, c.p)}.`;
    const Q = [`Combien de ${c.p} faut-il pour couvrir ${c.le} ?`, `Quelle est l'aire ${c.de} ?`, `Combien de ${c.p} couvrent tout l'intérieur ?`];
    return {
      text: `${qui(c)} ${c.fait}. ${deb} ${un(Q)}`,
      ...qcmU(aire, [tour, h + w, aire + w, tour + aire], c.p1, c.p),
      explanation: etapes("le tour, c'est le périmètre ; pour couvrir l'intérieur, on cherche l'aire.", `${rg(h)} de ${w} : ${Array(h).fill(w).join(" + ")} = ${aire}.`, `il faut ${nb(aire, c.p1, c.p)} ; ${tour}, c'est le tour.`),
      canvas: grille([rect(h, w)]),
    };
  }),

  // ★3 — « La bande est plus longue, donc elle a la plus grande aire » : vrai ou faux ?
  comprendre("cm1_aire_comprendre_tpl_104_bande_ou_carre", 3, "Ne te fie pas à la longueur : compte les carreaux.", () => {
    const p = un(PERSONNES);
    const n = entre(5, 9);
    const [x, y] = un([[2, 2], [2, 3], [3, 3], [2, 4], [3, 4], [2, 5]].filter(([a, b]) => Math.max(a, b) < n));
    const bloc = x * y;
    const nom = x === y ? "le carré" : "le rectangle";
    const objs = un(["tapis", "tablettes de chocolat", "parcelles", "patchworks", "dessins", "terrasses", "pelouses", "plaques de gazon"]);
    const dit = `${p.n} compare deux ${objs} : une longue bande de ${n} carreaux et ${nom} de ${rg(x)} de ${y} carreaux. ${cap(p.il)} dit : « La bande est plus longue, donc elle a la plus grande aire. »`;
    const Q = ["Est-ce vrai ?", `${cap(p.il)} a raison ?`, "Qu'en penses-tu ?"];
    let juste: string;
    if (bloc > n) juste = `Non : ${nom} couvre ${bloc} carreaux, la bande ${n}`;
    else if (bloc < n) juste = `Oui : la bande couvre ${n} carreaux, ${nom} ${bloc}`;
    else juste = `Non : les deux couvrent ${n} carreaux`;
    return {
      text: `${dit} ${un(Q)}`,
      ...qcm(juste, [
        `Non : ${nom} couvre ${bloc} carreaux, la bande ${n}`,
        `Oui : la bande couvre ${n} carreaux, ${nom} ${bloc}`,
        `Non : les deux couvrent ${n} carreaux`,
        "Oui : le plus long a toujours la plus grande aire",
      ]),
      explanation: etapes("on compte les carreaux de chaque figure : le plus long n'a pas toujours la plus grande aire.", `la bande : ${n} carreaux ; ${nom} : ${x} × ${y} = ${bloc} carreaux.`, juste + "."),
      canvas: grille([rect(1, n), rect(x, y)]),
    };
  }),

  // ★3 — Couvrir sans trou : combien manque-t-il ?
  comprendre("cm1_aire_comprendre_tpl_004_reunion_surface", 3, "Compte tous les carreaux qu'il faudrait, puis enlève ceux déjà posés.", () => {
    const c = un(COUVRIR);
    const h = entre(3, 4);
    const w = entre(4, 7);
    const total = h * w;
    const pose = entre(Math.max(2, w - 1), total - 3);
    const cells = Array.from({ length: pose }, (_, i) => [Math.floor(i / w), i % w] as Case);
    const manque = total - pose;
    const Q = [`Combien de ${c.p} manque-t-il pour tout couvrir ?`, `Combien de ${c.p} reste-t-il à poser ?`, `Combien de ${c.p} faut-il encore ?`];
    return {
      text: `${qui(c)} ${c.fait}. Le trait rouge fait le tour ${c.de}, le bleu est déjà couvert. ${un(Q)}`,
      ...qcmU(manque, [pose, total, manque + w, contour(rect(h, w))], c.p1, c.p),
      explanation: etapes("l'aire se couvre sans trou : on compte tout l'intérieur, puis on enlève ce qui est fait.", `tout ${c.le} : ${h} × ${w} = ${total} ; déjà couverts : ${pose} ; ${total} − ${pose} = ${manque}.`, `il manque ${nb(manque, c.p1, c.p)}.`),
      canvas: grille([cells], { chemin: cadre(h, w) }),
    };
  }),
];

/* ════════════════════════ AIRE_UNITE (ceinture jaune) ════════════════════════
   Vidéo : Awa, créatrice de jeux vidéo ; l'île du volcan (12 cases) contre l'île
   des palmiers (10) ; deux maisons de formes différentes, 8 cases chacune ; le
   lac 9, la forêt 11, la plage 7 ; le château en grandes cases (4 = 16 petites)
   contre le jardin (9 petites) ; défi : la grotte, 2 grandes cases, contre la
   rivière, 7 petites. « On compare avec la même unité. » */

const unite = gab("aire_unite");

const aireUnite: TutorBankItemV4[] = [
  // ★1 — Mesurer avec une unité : la case.
  unite("cm1_aire_unite_tpl_001_compter_cases_simples", 1, "Chaque case compte pour 1 : compte-les toutes.", () => {
    const { lieu, z } = zones(1);
    const cells = polyomino(5, 3);
    const aire = cells.length;
    const Q = [
      `Avec la case comme unité, quelle est l'aire ${deZ(z[0])} ?`,
      `L'unité est la case. Quelle est l'aire ${deZ(z[0])} ?`,
      `On mesure avec une unité, la case. Combien de cases couvre ${z[0]} ?`,
      `Quelle est l'aire ${deZ(z[0])}, en cases ?`,
    ];
    return {
      text: `Sur ${lieu}, voici ${z[0]}. ${un(Q)}`,
      ...qcmU(aire, [contour(cells), aire + 1, aire - 1, aire + 2], "case", "cases"),
      explanation: etapes("on prend une unité, la case, et on compte combien de cases couvre la zone.", `on compte : ${aire} cases.`, `l'aire ${deZ(z[0])} est de ${aire} cases.`),
      canvas: grille([cells]),
    };
  }),

  // ★1 — Deux zones : on compte les cases de chacune (l'île du volcan, l'île des palmiers).
  unite("cm1_aire_unite_tpl_002_qcm_compter_cases", 1, "Compte les cases de chaque zone, puis compare les deux nombres.", () => {
    const { lieu, z } = zones(2);
    let a = polyomino(5, 3);
    let b = polyomino(5, 3);
    for (let k = 0; k < 10 && a.length === b.length && Math.random() < 0.8; k++) b = polyomino(5, 3);
    if (Math.random() < 0.5) [a, b] = [b, a];
    const petite = Math.random() < 0.3;
    const juste = a.length === b.length ? "les deux ont la même aire" : (a.length > b.length) !== petite ? z[0] : z[1];
    const Q = petite
      ? ["Quelle zone a la plus petite aire ?", "Compte les cases : quelle zone est la plus petite ?"]
      : ["Quelle zone a la plus grande aire ?", "Quelle zone couvre le plus de cases ?", "Compte les cases : quelle zone est la plus grande ?"];
    return {
      text: `Sur ${lieu}, à gauche : ${z[0]}. À droite : ${z[1]}. ${un(Q)}`,
      ...qcm(juste, [z[0], z[1], "les deux ont la même aire"]),
      explanation: etapes("pour comparer, on prend une unité, la case, et on compte les cases de chaque zone.", `${z[0]} : ${a.length} cases ; ${z[1]} : ${b.length} cases.`, a.length === b.length ? "les deux ont la même aire." : `${juste} a la ${petite ? "plus petite" : "plus grande"} aire.`),
      canvas: grille([a, b]),
    };
  }),

  // ★2 — Trois zones (le lac 9, la forêt 11, la plage 7).
  unite("cm1_aire_unite_tpl_003_comparer_deux_aires", 2, "Compare les nombres de cases : ils sont tous mesurés avec la même unité.", () => {
    const { lieu, z } = zones(3);
    let f = [polyomino(4, 3), polyomino(4, 3), polyomino(4, 3)];
    for (let k = 0; k < 20 && new Set(f.map((x) => x.length)).size < 3; k++) f = [polyomino(4, 3), polyomino(4, 3), polyomino(4, 3)];
    const avecDessin = Math.random() < 0.55 && new Set(f.map((x) => x.length)).size === 3;
    const v = avecDessin ? f.map((x) => x.length) : melange([entre(5, 8), entre(9, 11), entre(12, 15)]);
    const petite = Math.random() < 0.35;
    const cible = petite ? Math.min(...v) : Math.max(...v);
    const juste = z[v.indexOf(cible)];
    const Q = petite ? ["Quelle zone a la plus petite aire ?", "Quelle zone prend le moins de place ?"] : ["Quelle zone a la plus grande aire ?", "Quelle zone prend le plus de place ?", "Quelle zone couvre le plus de cases ?"];
    const deb = avecDessin
      ? `Sur ${lieu}, à gauche : ${z[0]}. Au milieu : ${z[1]}. À droite : ${z[2]}.`
      : `Sur ${lieu}, ${z[0]} couvre ${v[0]} cases, ${z[1]} ${v[1]} cases et ${z[2]} ${v[2]} cases.`;
    return {
      text: `${deb} ${un(Q)}`,
      ...qcm(juste, z),
      explanation: etapes("même unité, la case : le plus grand nombre de cases donne la plus grande aire.", z.map((x, i) => `${x} : ${v[i]} cases`).join(" ; ") + ".", `${juste} a la ${petite ? "plus petite" : "plus grande"} aire.`),
      ...(avecDessin ? { canvas: grille(f) } : {}),
    };
  }),

  // ★2 — Deux formes différentes peuvent avoir la même aire.
  unite("cm1_aire_unite_tpl_004_meme_aire_formes_differentes", 2, "Ne regarde pas la forme : compte les cases.", () => {
    const { lieu, z } = zones(2);
    const n = un([6, 8, 9, 10, 12]);
    const formesDe = (k: number): Case[][] => {
      const out: Case[][] = [];
      for (let h = 1; h <= k; h++) if (k % h === 0 && k / h <= 7 && h <= k / h) out.push(rect(h, k / h));
      out.push(rangees([Math.ceil(k / 2) + 1, Math.floor(k / 2) - 1]));
      return out;
    };
    const fs = melange(formesDe(n));
    const a = fs[0];
    const egal = Math.random() < 0.6;
    const b = egal ? fs[1] : un(formesDe(n + un([-2, -1, 1, 2])));
    const juste = a.length === b.length ? "elles ont la même aire" : a.length > b.length ? `${z[0]} a la plus grande aire` : `${z[1]} a la plus grande aire`;
    return {
      text: `Sur ${lieu}, à gauche : ${z[0]}. À droite : ${z[1]}. Les deux zones n'ont pas la même forme. ${un(["Que peut-on dire de leurs aires ?", "Compare leurs aires.", "Que dire de leurs aires ?"])}`,
      ...qcm(juste, ["elles ont la même aire", `${z[0]} a la plus grande aire`, `${z[1]} a la plus grande aire`, "on ne peut pas savoir"]),
      explanation: etapes("on compte les cases, avec la même unité ; deux formes différentes peuvent avoir la même aire.", `${z[0]} : ${a.length} cases ; ${z[1]} : ${b.length} cases.`, juste + "."),
      canvas: grille([a, b]),
    };
  }),

  // ★2 — Changer d'unité : une grande case, c'est 4 petites cases.
  unite("cm1_aire_unite_tpl_101_grandes_en_petites", 2, "Une grande case, c'est 4 petites cases : compte 4 par grande case.", () => {
    const { lieu, z } = zones(1);
    const g = entre(2, 6);
    const Q = [`Combien de petites cases couvre ${z[0]} ?`, `Quelle est l'aire ${deZ(z[0])}, en petites cases ?`, `En petites cases, quelle est l'aire ${deZ(z[0])} ?`];
    return {
      text: `Sur ${lieu}, ${z[0]} couvre ${g} grandes cases. Une grande case, c'est 4 petites cases. ${un(Q)}`,
      ...qcmU(4 * g, [g + 4, g, 2 * g, 4 * g + 4], "petite case", "petites cases"),
      explanation: etapes("on met tout dans la même unité : une grande case, c'est 4 petites cases.", `${g} grandes cases : ${Array(g).fill(4).join(" + ")} = ${4 * g} petites cases.`, `${z[0]} couvre ${4 * g} petites cases.`),
      canvas: grille([rect(2, 2)], { uns: true }),
    };
  }),

  // ★2 — La même aire, une autre forme : quel rectangle choisir ?
  unite("cm1_aire_unite_tpl_005_figure_libre_meme_aire", 2, "Compte les cases de la figure, puis cherche le rectangle qui en a autant.", () => {
    const { lieu, z } = zones(2);
    const PAIRES: Record<number, [number, number][]> = { 6: [[2, 3]], 8: [[2, 4]], 9: [[3, 3]], 10: [[2, 5]], 12: [[2, 6], [3, 4]], 14: [[2, 7]], 15: [[3, 5]], 16: [[4, 4], [2, 8]] };
    let cells = polyomino(5, 4);
    for (let k = 0; k < 40 && !PAIRES[cells.length]; k++) cells = polyomino(5, 4);
    if (!PAIRES[cells.length]) cells = rangees([5, 3]);
    const n = cells.length;
    const [a, b] = un(PAIRES[n]);
    const ecr = ([x, y]: [number, number]) => `${rg(x)} de ${y} cases`;
    const faux = ([[a, b + 1], [a + 1, b], [a, b - 1], [a + 1, b - 1], [a - 1, b + 1]] as [number, number][]).filter(([x, y]) => x >= 1 && y >= 2 && x * y !== n);
    const p = un(PERSONNES);
    return {
      text: `Sur ${lieu}, voici ${z[0]}. ${p.n} veut dessiner ${z[1]} en rectangle, avec la même aire que ${z[0]}. ${un(["Quel rectangle choisir ?", `Quel rectangle ${p.il} doit-${p.il} dessiner ?`, "Quel rectangle a la même aire ?"])}`,
      ...qcm(ecr([a, b]), faux.map(ecr)),
      explanation: etapes("on compte les cases de la figure, puis on cherche un rectangle qui a autant de cases.", `la figure : ${n} cases ; ${rg(a)} de ${b} : ${a} × ${b} = ${n}.`, `${ecr([a, b])} : même aire, autre forme.`),
      canvas: grille([cells]),
    };
  }),

  // ★3 — Le piège des unités : grandes cases contre petites cases.
  unite("cm1_aire_unite_tpl_006_choisir_unite_adaptee", 3, "Mets tout en petites cases avant de comparer.", () => {
    const { lieu, z } = zones(2);
    const g = entre(2, 4);
    const s = Math.random() < 0.15 ? 4 * g : un([4 * g - 3, 4 * g - 2, 4 * g - 1, 4 * g + 1, 4 * g + 2].filter((x) => x > g));
    const juste = s === 4 * g ? "les deux ont la même aire" : 4 * g > s ? z[0] : z[1];
    const Q = ["Quelle zone a la plus grande aire ?", "Laquelle des deux zones est la plus grande ?", "Quelle zone prend le plus de place ?"];
    return {
      text: `Sur ${lieu}, ${z[0]} couvre ${g} grandes cases, ${z[1]} couvre ${s} petites cases. Une grande case, c'est 4 petites cases. ${un(Q)}`,
      ...qcm(juste, [z[0], z[1], "les deux ont la même aire"]),
      explanation: etapes("on compare avec la même unité : on met tout en petites cases.", `${z[0]} : ${g} × 4 = ${4 * g} petites cases ; ${z[1]} : ${s} petites cases.`, s === 4 * g ? "les deux ont la même aire." : `${juste} a la plus grande aire.`),
      canvas: grille([rect(2, 2)], { uns: true }),
    };
  }),

  // ★3 — « 9, c'est plus que 4 » : vrai ou faux, quand les cases ne sont pas pareilles ?
  unite("cm1_aire_unite_tpl_102_meme_unite_vrai_faux", 3, "Deux nombres ne se comparent que s'ils sont dans la même unité.", () => {
    const { lieu, z } = zones(2);
    const p = un(PERSONNES);
    const g = entre(2, 4);
    const s = un([4 * g - 2, 4 * g - 1, 4 * g + 1, 4 * g + 2, 4 * g - 3].filter((x) => x > g + 1));
    const vrai = s > 4 * g;
    const juste = vrai ? `Oui : ${z[0]} ne fait que ${4 * g} petites cases` : `Non : ${z[0]} fait ${4 * g} petites cases`;
    return {
      text: `Sur ${lieu}, ${z[0]} couvre ${g} grandes cases et ${z[1]} ${s} petites cases. Une grande case, c'est 4 petites. ${p.n} dit : « ${cap(z[1])} a la plus grande aire, car ${s}, c'est plus que ${g}. » ${un(["A-t-on raison de dire ça ?", "Est-ce vrai ?", `${cap(p.il)} a raison ?`])}`,
      ...qcm(juste, [`Oui : ${z[0]} ne fait que ${4 * g} petites cases`, `Non : ${z[0]} fait ${4 * g} petites cases`, `Oui : ${s}, c'est plus que ${g}`, "On ne peut pas comparer"]),
      explanation: etapes("les cases ne sont pas pareilles : on change d'abord d'unité.", `${g} grandes cases = ${g} × 4 = ${4 * g} petites cases, contre ${s}.`, juste + "."),
      canvas: grille([rect(2, 2)], { uns: true }),
    };
  }),

  // ★3 — Ranger trois zones de la plus petite à la plus grande.
  unite("cm1_aire_unite_tpl_007_reunion_surface_carree", 3, "Compte les cases de chaque zone, puis range les nombres.", () => {
    const { lieu, z } = zones(3);
    let f = [polyomino(4, 3), polyomino(4, 3), polyomino(4, 3)];
    for (let k = 0; k < 40 && new Set(f.map((x) => x.length)).size < 3; k++) f = [polyomino(4, 3), polyomino(4, 3), polyomino(4, 3)];
    if (new Set(f.map((x) => x.length)).size < 3) f = melange([rect(2, 3), rect(2, 4), rangees([4, 4, 1])]);
    const ordre = [0, 1, 2].sort((i, j) => f[i].length - f[j].length);
    const ecr = (o: number[]) => o.map((i) => z[i]).join(", puis ");
    const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
    return {
      text: `Sur ${lieu}, à gauche : ${z[0]}. Au milieu : ${z[1]}. À droite : ${z[2]}. ${un(["Range-les de la plus petite à la plus grande aire.", "Quel est l'ordre, de la plus petite aire à la plus grande ?", "Du plus petit au plus grand, quel est l'ordre des aires ?"])}`,
      ...qcm(ecr(ordre), perms.map(ecr)),
      explanation: etapes("même unité, la case : on compte les cases de chaque zone, puis on range.", f.map((x, i) => `${z[i]} : ${x.length} cases`).join(" ; ") + ".", `${ecr(ordre)}.`),
      canvas: grille(f),
    };
  }),
];

/* ════════════════════════ AIRE_CARRE_RECTANGLE (ceinture verte) ════════════════════════
   Vidéo : Lina, maraîchère ; 4 rangées de 6 cases d'un mètre carré : 6 + 6 + 6 + 6,
   puis « 4 fois 6 » = 24 m² ; le carré d'herbes de 5 de côté : 25 m² ; le piège :
   on n'ajoute pas 4 + 6, on ne fait pas le tour ; défi : 6 rangées de 8, déjà
   20 plantées → 28 m² à planter. */

const carreRect = gab("aire_carre_rectangle");

const aireCarreRectangle: TutorBankItemV4[] = [
  // ★1 — Rangées × cases d'une rangée, nombres donnés.
  carreRect("cm1_aire_carre_rectangle_tpl_101_rangees_donnees", 1, "Le nombre de rangées fois le nombre de cases dans une rangée.", () => {
    const c = un(COUVRIR);
    const u = uniteDe(c);
    const r = entre(2, 4);
    const k = entre(r + 1, 6);
    const aire = r * k;
    const Q = [`Quelle est l'aire ${c.de} ?`, `Quelle est son aire ?`, `Combien de ${u.p} en tout ?`, `Quelle est l'aire ${c.de}, en ${u.p} ?`];
    return {
      text: `${qui(c)} ${c.fait}. ${cap(c.le)} a ${r} rangées de ${nb(k, c.p1, c.p)}.${u.phrase} ${un(Q)}`,
      ...qcmU(aire, [r + k, 2 * (r + k), aire - k, aire + k], u.p1, u.p),
      explanation: etapes("le nombre de rangées fois le nombre de cases dans une rangée.", `${r} rangées de ${k} : ${r} × ${k} = ${aire}.`, `l'aire ${c.de} est de ${nb(aire, u.p1, u.p)}.`),
      canvas: grille([rect(r, k)]),
    };
  }),

  // ★1 — Le carré : le côté fois le côté.
  carreRect("cm1_aire_carre_rectangle_tpl_102_carre_donne", 1, "Pour un carré : le côté fois le côté.", () => {
    const c = un(COUVRIR);
    const u = uniteDe(c);
    const k = entre(2, 5);
    const Q = [`Quelle est l'aire ${c.de} ?`, `Quelle est son aire ?`, `Combien de ${u.p} en tout ?`];
    return {
      text: `${qui(c)} ${c.fait}. ${cap(c.le)} est un carré de ${nb(k, c.p1, c.p)} de côté.${u.phrase} ${un(Q)}`,
      ...qcmU(k * k, [4 * k, 2 * k, k * k + k, k * k - k], u.p1, u.p),
      explanation: etapes("pour un carré : le côté fois le côté.", `${k} rangées de ${k} : ${k} × ${k} = ${k * k}.`, `l'aire ${c.de} est de ${nb(k * k, u.p1, u.p)}.`),
      canvas: grille([rect(k, k)]),
    };
  }),

  // ★2 — Lire les rangées sur le dessin, puis multiplier.
  carreRect("cm1_aire_carre_rectangle_tpl_001_rectangle_rangees_colonnes", 2, "Compte les rangées, puis les cases d'une rangée, et multiplie.", () => {
    const c = un(COUVRIR);
    const u = uniteDe(c);
    const r = entre(3, 6);
    const k = entre(3, 8);
    const aire = r * k;
    const Q = [`Quelle est l'aire ${c.de} ?`, `Combien de ${u.p} faut-il en tout ?`, `Sans compter un par un, quelle est l'aire ${c.de} ?`, `Quelle est l'aire ${c.de}, en ${u.p} ?`];
    return {
      text: `${qui(c)} ${c.fait}.${u.phrase} ${un(Q)}`,
      ...qcmU(aire, [r + k, 2 * (r + k), aire - k, aire + r], u.p1, u.p),
      explanation: etapes("le nombre de rangées fois le nombre de cases dans une rangée.", `${r} rangées de ${k} : ${r} × ${k} = ${aire}.`, `l'aire ${c.de} est de ${nb(aire, u.p1, u.p)}.`),
      canvas: grille([rect(r, k)]),
    };
  }),

  // ★2 — Quel calcul donne l'aire ? (multiplier, pas ajouter)
  carreRect("cm1_aire_carre_rectangle_tpl_002_rectangle_qcm_raccourci", 2, "Pour l'aire, on multiplie : on n'ajoute pas.", () => {
    const c = un(COUVRIR);
    const r = entre(2, 6);
    const k = entre(3, 9);
    const Q = [`Quel calcul donne l'aire ${c.de} ?`, `Quel calcul donne le nombre de ${c.p} ?`, "Quel calcul est le plus rapide pour trouver l'aire ?"];
    return {
      text: `${cap(c.le)} a ${r} rangées de ${nb(k, c.p1, c.p)}. ${un(Q)}`,
      ...qcm(`${r} × ${k}`, [`${r} + ${k}`, `${r} + ${k} + ${r} + ${k}`, `${r} × ${k} + ${k}`, `${k} − ${r}`]),
      explanation: etapes("le nombre de rangées fois le nombre de cases dans une rangée.", `${r} rangées de ${k} : ${r} × ${k} = ${r * k}. ${r} + ${k} + ${r} + ${k}, c'est le tour.`, `on calcule ${r} × ${k}.`),
      canvas: grille([rect(r, k)]),
    };
  }),

  // ★2 — Le carré sur le dessin.
  carreRect("cm1_aire_carre_rectangle_tpl_003_carre_rangees_colonnes", 2, "Un carré : autant de rangées que de cases dans une rangée.", () => {
    const c = un(COUVRIR);
    const u = uniteDe(c);
    const k = entre(3, 8);
    const Q = [`Quelle est l'aire ${c.de} ?`, `${cap(c.le)} est un carré. Quelle est son aire ?`, `Combien de ${u.p} couvre ce carré ?`];
    return {
      text: `${qui(c)} ${c.fait}.${u.phrase} ${un(Q)}`,
      ...qcmU(k * k, [4 * k, 2 * k, k * k - k, k * (k + 1)], u.p1, u.p),
      explanation: etapes("pour un carré : le côté fois le côté.", `${k} × ${k} = ${k * k}.`, `l'aire ${c.de} est de ${nb(k * k, u.p1, u.p)}.`),
      canvas: grille([rect(k, k)]),
    };
  }),

  // ★3 — Le rectangle mesuré en cm ou en m, partagé en carrés de 1.
  carreRect("cm1_aire_carre_rectangle_tpl_005_rectangle_cm2_doux", 3, "Partage en carrés de 1 : la longueur donne les cases d'une rangée, la largeur les rangées.", () => {
    const enCm = Math.random() < 0.55;
    const o = enCm
      ? un(["une carte postale", "une photo", "une étiquette", "un écran de tablette", "un set de table", "une page de carnet", "un post-it géant", "un dessin", "une serviette", "une couverture de livre"])
      : un(["une terrasse", "une chambre", "un potager", "une piscine", "un bac à sable", "une scène de théâtre", "une cour", "un tapis de judo", "un enclos à lapins", "un garage"]);
    const u = enCm ? "cm" : "m";
    const L = entre(4, 9);
    const l = entre(2, L - 1);
    const p = un(PERSONNES).n;
    const deb = un([
      `${p} trace ${o} : un rectangle de ${L} ${u} sur ${l} ${u}.`,
      `${cap(o)} est un rectangle de ${L} ${u} de long et ${l} ${u} de large.`,
      `${p} mesure ${o} : ${L} ${u} de long, ${l} ${u} de large.`,
    ]);
    const Q = [`On trace dedans des carrés de 1 ${u} de côté. Quelle est son aire ?`, `Avec des carrés de 1 ${u}², quelle est son aire ?`, `Combien de carrés de 1 ${u}² faut-il pour tout couvrir ?`];
    return {
      text: `${deb} ${un(Q)}`,
      ...qcmU(L * l, [L + l, 2 * (L + l), L * l - l, L * (l + 1)], `${u}²`, `${u}²`),
      explanation: etapes(`on partage en carrés de 1 ${u}² : ${l} rangées de ${L} carrés.`, `${l} × ${L} = ${L * l}.`, `l'aire est de ${L * l} ${u}².`),
      canvas: rectangleCote(L, l, u),
    };
  }),

  // ★3 — Le piège : ajouter, faire le tour, une rangée de trop.
  carreRect("cm1_aire_carre_rectangle_tpl_007_erreur_perimetre_rectangle", 3, "Calcule toi-même rangées × cases, puis compare.", () => {
    const c = un(COUVRIR);
    const p = un(PERSONNES);
    let r = 0;
    let k = 0;
    let X = 0;
    let err = "";
    for (let essai = 0; essai < 20; essai++) {
      r = entre(3, 6);
      k = entre(r + 1, 8);
      err = un(["ajout", "tour", "rangee", "juste"]);
      X = err === "ajout" ? r + k : err === "tour" ? 2 * (r + k) : err === "rangee" ? (r + 1) * k : r * k;
      if (err === "juste" || X !== r * k) break;
    }
    const DIAG: Record<string, string> = {
      ajout: `${cap(p.il)} a ajouté ${r} + ${k} au lieu de multiplier`,
      tour: `${cap(p.il)} a calculé le tour, pas l'aire`,
      rangee: `${cap(p.il)} a compté une rangée de trop`,
      juste: `${cap(p.il)} a raison : ${r} × ${k} = ${r * k}`,
    };
    return {
      text: `${p.n} ${c.fait}. ${cap(c.le)} a ${r} rangées de ${nb(k, c.p1, c.p)}. ${cap(p.il)} trouve une aire de ${nb(X, c.p1, c.p)}. ${un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Vérifie : que dis-tu ?"])}`,
      ...qcm(DIAG[err], Object.values(DIAG)),
      explanation: etapes("pour l'aire, on multiplie : rangées × cases d'une rangée. On n'ajoute pas, on ne fait pas le tour.", `${r} × ${k} = ${r * k}.`, DIAG[err] + "."),
      canvas: grille([rect(r, k)]),
    };
  }),

  // ★3 — Le problème de la vie : beaucoup de rangées.
  carreRect("cm1_aire_carre_rectangle_tpl_008_erreur_addition", 3, "Rangées × cases d'une rangée.", () => {
    const c = un(COUVRIR);
    const u = uniteDe(c);
    const r = entre(4, 9);
    const k = entre(5, 9);
    const aire = r * k;
    const deb = un([
      `${qui(c)} ${c.fait} : ${r} rangées, et ${nb(k, c.p1, c.p)} dans chaque rangée.`,
      `${qui(c)} ${c.fait}. Il y a ${r} rangées. Chaque rangée compte ${nb(k, c.p1, c.p)}.`,
      `${qui(c)} ${c.fait}. ${cap(c.le)} compte ${r} rangées de ${nb(k, c.p1, c.p)}.`,
    ]);
    const Q = [`Quelle est l'aire ${c.de} ?`, `Combien de ${u.p} en tout ?`, `Quelle est l'aire ${c.de}, en ${u.p} ?`];
    return {
      text: `${deb}${u.phrase} ${un(Q)}`,
      ...qcmU(aire, [r + k, 2 * (r + k), aire - k, aire + k, aire + 10], u.p1, u.p),
      explanation: etapes("le nombre de rangées fois le nombre de cases dans une rangée.", `${r} × ${k} = ${aire}.`, `l'aire ${c.de} est de ${nb(aire, u.p1, u.p)}.`),
      canvas: grille([rect(r, k)]),
    };
  }),

  // ★4 — Le défi de la vidéo : combien en reste-t-il ?
  carreRect("cm1_aire_carre_rectangle_tpl_011_open_corriger_erreur", 4, "D'abord l'aire de tout le rectangle, puis enlève ce qui est fait.", () => {
    const c = un(COUVRIR);
    const u = uniteDe(c);
    const r = entre(3, 6);
    const k = entre(5, 8);
    const total = r * k;
    const fait = entre(k, total - k);
    const cells = Array.from({ length: fait }, (_, i) => [Math.floor(i / k), i % k] as Case);
    const p = un(PERSONNES);
    const Q = [`Combien de ${u.p} reste-t-il ?`, `Combien de ${u.p} lui reste-t-il à faire ?`, `Quelle aire reste-t-il à couvrir ?`];
    return {
      text: `${p.n} ${c.fait}. ${cap(c.le)} a ${r} rangées de ${nb(k, c.p1, c.p)}.${u.phrase} ${cap(p.il)} en a déjà ${c.pp} ${fait}. ${un(Q)}`,
      ...qcmU(total - fait, [total, total + fait, total - fait - k, total - fait + k], u.p1, u.p),
      explanation: etapes("d'abord l'aire de tout le rectangle, ensuite on enlève ce qui est fait.", `${r} × ${k} = ${total} ; ${total} − ${fait} = ${total - fait}.`, `il reste ${nb(total - fait, u.p1, u.p)}.`),
      canvas: grille([cells], { chemin: cadre(r, k) }),
    };
  }),

  // ★4 — Le carré contre le rectangle : de combien ?
  carreRect("cm1_aire_carre_rectangle_tpl_009_reunion_potager_quadrillage", 4, "Calcule les deux aires, puis fais la différence.", () => {
    const [A, B] = deuxPersonnes();
    const obj = un(OBJETS);
    let k = 0;
    let r = 0;
    let w = 0;
    for (let essai = 0; essai < 30; essai++) {
      k = entre(3, 6);
      r = entre(2, 5);
      w = entre(r + 1, 9);
      if (r * w !== k * k && Math.abs(r * w - k * k) <= 12) break;
    }
    const d = Math.abs(k * k - r * w);
    return {
      text: `${cap(obj)} ${deN(A.n)} est un carré de ${k} carreaux de côté. ${cap(obj)} ${deN(B.n)} a ${r} rangées de ${w} carreaux. ${un(["De combien de carreaux les deux aires diffèrent-elles ?", "Combien de carreaux d'écart y a-t-il entre les deux aires ?", "Quelle est la différence entre les deux aires ?"])}`,
      ...qcmU(d, [k * k, r * w, Math.abs(4 * k - 2 * (r + w)) || d + 2, d + k], "carreau", "carreaux"),
      explanation: etapes("on calcule chaque aire : le carré, côté × côté ; le rectangle, rangées × cases d'une rangée.", `${A.n} : ${k} × ${k} = ${k * k} ; ${B.n} : ${r} × ${w} = ${r * w} ; écart : ${d}.`, `la différence est de ${nb(d, "carreau", "carreaux")}.`),
      canvas: grille([rect(k, k), rect(r, w)]),
    };
  }),

  // ★4 — Retrouver les cases d'une rangée à partir de l'aire.
  carreRect("cm1_aire_carre_rectangle_tpl_010_open_expliquer_rectangle", 4, "Aire = rangées × cases d'une rangée : cherche le nombre qui manque.", () => {
    const c = un(COUVRIR);
    const r = entre(2, 6);
    const k = entre(3, 9);
    const A = r * k;
    const Q = [`Combien de ${c.p} y a-t-il dans chaque rangée ?`, `Combien de ${c.p} dans une rangée ?`, `Combien de ${c.p} compte chaque rangée ?`];
    return {
      text: `${qui(c)} ${c.fait}. ${cap(c.le)} est un rectangle de ${nb(A, c.p1, c.p)}, en ${r} rangées. ${un(Q)}`,
      ...qcmU(k, [A - r, A + r, r, k + 1, k - 1], c.p1, c.p),
      explanation: etapes("aire = rangées × cases d'une rangée : on cherche le nombre qui manque.", `${r} × ? = ${A} ; ${A} ÷ ${r} = ${k}.`, `chaque rangée compte ${nb(k, c.p1, c.p)}.`),
      canvas: grille([rect(r, 1)], { chemin: cadre(r, k) }),
    };
  }),
];

/* ════════════════════════ AIRE_COMPOSER (ceinture verte) ════════════════════════
   Vidéo : Yanis, architecte ; l'appartement en L découpé en deux rectangles
   (en haut 2 × 6 = 12, en bas 3 × 2 = 6, 12 + 6 = 18 m²), puis autrement (10 + 8) ;
   « 8 et 5 carreaux » → 13 ; les parties ne se chevauchent pas ; un rectangle
   2 × 4 et un carré de 2 → 12 ; défi : la terrasse en T, 1 × 7 + 4 × 3 = 19. */

const PLANS = [
  { metier: "L'architecte", fait: "dessine le plan d'un appartement", le: "l'appartement", de: "de l'appartement", m2: true },
  { metier: "Le carreleur", fait: "carrelle une terrasse", le: "la terrasse", de: "de la terrasse", m2: true },
  { metier: "La paysagiste", fait: "dessine une pelouse", le: "la pelouse", de: "de la pelouse", m2: true },
  { metier: "Le maçon", fait: "coule la dalle d'un garage", le: "la dalle", de: "de la dalle", m2: true },
  { metier: "La décoratrice", fait: "pose de la moquette dans un salon", le: "le salon", de: "du salon", m2: true },
  { metier: "Le jardinier", fait: "prépare un potager", le: "le potager", de: "du potager", m2: true },
  { metier: "La directrice", fait: "fait repeindre le sol de la cour", le: "la cour", de: "de la cour", m2: true },
  { metier: "Le menuisier", fait: "pose le parquet d'une salle", le: "la salle", de: "de la salle", m2: true },
  { metier: "La gardienne du zoo", fait: "dessine l'enclos des tortues", le: "l'enclos", de: "de l'enclos", m2: true },
  { metier: "Le créateur de jeux vidéo", fait: "dessine un château sur un quadrillage", le: "le château", de: "du château", m2: false },
  { metier: "L'élève", fait: "colorie une figure sur son cahier", le: "la figure", de: "de la figure", m2: false },
  { metier: "La couturière", fait: "coud un patchwork", le: "le patchwork", de: "du patchwork", m2: false },
  { metier: "Le fermier", fait: "dessine le plan de son champ", le: "le champ", de: "du champ", m2: true },
  { metier: "La chocolatière", fait: "moule un chocolat géant", le: "le chocolat", de: "du chocolat", m2: false },
  { metier: "L'ingénieure", fait: "couvre un toit de panneaux solaires", le: "le toit", de: "du toit", m2: true },
  { metier: "Le gardien du musée", fait: "dessine le plan d'une salle d'exposition", le: "la salle", de: "de la salle", m2: true },
  { metier: "La cheffe de camping", fait: "dessine l'aire des tentes", le: "l'aire des tentes", de: "de l'aire des tentes", m2: true },
  { metier: "Le pâtissier", fait: "découpe un gâteau en carrés", le: "le gâteau", de: "du gâteau", m2: false },
];
function plan() {
  const pl = un(PLANS);
  const m2 = pl.m2 && Math.random() < 0.7;
  return { ...pl, qui: qui(pl), p1: m2 ? "m²" : "carreau", p: m2 ? "m²" : "carreaux", phrase: m2 ? " Chaque carreau fait 1 m²." : "" };
}

const composer = gab("aire_composer");

const aireComposer: TutorBankItemV4[] = [
  // ★2 — Deux parties dont on connaît l'aire : on ajoute (8 et 5 → 13).
  composer("cm1_aire_composer_tpl_003_addition_deux_parties", 2, "Ajoute les aires des deux parties.", () => {
    const P = plan();
    const d = deuxRect();
    const a = d.a.h * d.a.w;
    const b = d.b.h * d.b.w;
    const deb = un([
      `${cap(P.le)} se compose de deux rectangles : l'un de ${nb(a, "carreau", "carreaux")}, l'autre de ${nb(b, "carreau", "carreaux")}.`,
      `On découpe ${P.le} en deux rectangles : ${nb(a, "carreau", "carreaux")} ${d.posA}, ${nb(b, "carreau", "carreaux")} ${d.posB}.`,
      `Le trait rouge découpe ${P.le} en deux parties : ${a} carreaux et ${b} carreaux.`,
    ]);
    return {
      text: `${P.qui} ${P.fait}. ${deb}${P.phrase} ${un([`Quelle est l'aire ${P.de} ?`, "Quelle est son aire ?", `Quelle est l'aire totale ${P.de} ?`])}`,
      ...qcmU(a + b, [a * b, Math.abs(a - b), a + b + 1, a + b - 1], P.p1, P.p),
      explanation: etapes("on ajoute les aires des deux parties.", `${a} + ${b} = ${a + b}.`, `l'aire ${P.de} est de ${nb(a + b, P.p1, P.p)}.`),
      canvas: grille([d.cells], { chemin: d.coupe }),
    };
  }),

  // ★2 — Compter une figure composée sur le quadrillage.
  composer("cm1_aire_composer_tpl_001_compter_figure_composee", 2, "Découpe la figure en rectangles, ou compte chaque carreau une seule fois.", () => {
    const P = plan();
    const d = deuxRect();
    const aire = d.cells.length;
    const Q = [`Quelle est l'aire ${P.de} ?`, `Quelle est l'aire ${P.de}, en ${P.p} ?`, `Combien de ${P.p} couvre ${P.le} ?`, `Découpe et calcule : quelle est l'aire ${P.de} ?`];
    return {
      text: `${P.qui} ${P.fait}.${P.phrase} ${un(Q)}`,
      ...qcmU(aire, [contour(d.cells), d.bbox.h * d.bbox.w, d.a.h * d.a.w, aire + 1], P.p1, P.p),
      explanation: etapes("on découpe en deux rectangles, on calcule chaque partie, puis on ajoute.", `${d.posA} : ${d.a.h} × ${d.a.w} = ${d.a.h * d.a.w} ; ${d.posB} : ${d.b.h} × ${d.b.w} = ${d.b.h * d.b.w} ; total ${aire}.`, `l'aire ${P.de} est de ${nb(aire, P.p1, P.p)}.`),
      canvas: grille([d.cells]),
    };
  }),

  // ★3 — Les deux parties décrites en rangées (en haut 2 × 6, en bas 3 × 2).
  composer("cm1_aire_composer_tpl_004_deux_rectangles", 3, "Calcule l'aire de chaque partie, puis ajoute.", () => {
    const P = plan();
    const d = deuxRect();
    const a = d.a.h * d.a.w;
    const b = d.b.h * d.b.w;
    const desc = `${cap(d.posA)}, ${rg(d.a.h)} de ${d.a.w} carreaux. ${cap(d.posB)}, ${rg(d.b.h)} de ${d.b.w} carreaux.`;
    return {
      text: `${P.qui} ${P.fait}. ${un(["On découpe la figure en deux rectangles.", "Le trait rouge découpe la figure en deux rectangles.", "On la partage en deux rectangles."])} ${desc}${P.phrase} ${un([`Quelle est l'aire ${P.de} ?`, "Quelle est son aire ?", `Combien de ${P.p} en tout ?`])}`,
      ...qcmU(a + b, [d.bbox.h * d.bbox.w, a, b, d.a.h + d.a.w + d.b.h + d.b.w, a + b + d.b.w], P.p1, P.p),
      explanation: etapes("on calcule l'aire de chaque partie, puis on ajoute les deux aires.", `${d.a.h} × ${d.a.w} = ${a} ; ${d.b.h} × ${d.b.w} = ${b} ; ${a} + ${b} = ${a + b}.`, `l'aire ${P.de} est de ${nb(a + b, P.p1, P.p)}.`),
      canvas: grille([d.cells], { chemin: d.coupe }),
    };
  }),

  // ★3 — Un rectangle et un carré (2 × 4 et un carré de 2 → 12).
  composer("cm1_aire_composer_tpl_006_assembler_deux_figures", 3, "Le rectangle : rangées × cases. Le carré : côté × côté. Puis ajoute.", () => {
    const P = plan();
    const d = deuxRect({ carreB: true });
    const a = d.a.h * d.a.w;
    const k = d.b.w;
    return {
      text: `${P.qui} ${P.fait}. ${cap(P.le)} se compose d'un rectangle de ${rg(d.a.h)} de ${d.a.w} carreaux et d'un carré de ${k} carreaux de côté.${P.phrase} ${un([`Quelle est l'aire ${P.de} ?`, "Quelle est son aire ?", `Combien de ${P.p} en tout ?`])}`,
      ...qcmU(a + k * k, [a + 2 * k, a + 4 * k, a, d.a.h + d.a.w + k, a * k], P.p1, P.p),
      explanation: etapes("le rectangle : rangées × cases d'une rangée ; le carré : côté × côté ; puis on ajoute.", `${d.a.h} × ${d.a.w} = ${a} ; ${k} × ${k} = ${k * k} ; ${a} + ${k * k} = ${a + k * k}.`, `l'aire ${P.de} est de ${nb(a + k * k, P.p1, P.p)}.`),
      canvas: grille([d.cells], { chemin: d.coupe }),
    };
  }),

  // ★3 — Quel découpage donne l'aire ?
  composer("cm1_aire_composer_tpl_005_figure_l_par_decoupage", 3, "Découpe en deux rectangles qui ne se chevauchent pas.", () => {
    const P = plan();
    const d = deuxRect();
    const { a, b } = d;
    const juste = `${a.h} × ${a.w} + ${b.h} × ${b.w}`;
    const vertical = d.posA === "en haut";
    const chevauche = vertical ? `${a.h} × ${a.w} + ${a.h + b.h} × ${b.w}` : `${a.h} × ${a.w} + ${b.h} × ${a.w + b.w}`;
    return {
      text: `${P.qui} ${P.fait}. ${un([`Quel calcul donne l'aire ${P.de} ?`, `On découpe ${P.le} en deux rectangles. Quel calcul donne son aire ?`, "Quel découpage donne la bonne aire ?"])}`,
      ...qcm(juste, [chevauche, `${a.h} + ${a.w} + ${b.h} + ${b.w}`, `${d.bbox.h} × ${d.bbox.w}`, `${a.h} × ${a.w} × ${b.h} × ${b.w}`]),
      explanation: etapes("on découpe en deux rectangles qui ne se chevauchent pas, on calcule chaque partie, puis on ajoute.", `${d.posA} : ${a.h} × ${a.w} = ${a.h * a.w} ; ${d.posB} : ${b.h} × ${b.w} = ${b.h * b.w}.`, `${juste} = ${a.h * a.w + b.h * b.w}.`),
      canvas: grille([d.cells]),
    };
  }),

  // ★4 — Un rectangle avec un trou ou une encoche : on enlève.
  composer("cm1_aire_composer_tpl_008_trou_dans_rectangle", 4, "Calcule le grand rectangle, puis enlève les carreaux vides.", () => {
    const P = plan();
    const m = murTrou();
    return {
      text: `${P.qui} ${P.fait}. ${cap(P.le)} est un rectangle de ${m.r} rangées de ${m.c} carreaux, sans les carreaux blancs.${P.phrase} ${un([`Quelle est l'aire ${P.de} ?`, "Quelle est l'aire de la partie bleue ?", `Combien de ${P.p} en tout ?`])}`,
      ...qcmU(m.aire, [m.total, m.total + m.t, m.t, m.aire - 1], P.p1, P.p),
      explanation: etapes("on calcule le grand rectangle, puis on enlève les carreaux vides.", `${m.r} × ${m.c} = ${m.total} ; ${m.th} × ${m.tw} = ${m.t} ; ${m.total} − ${m.t} = ${m.aire}.`, `l'aire ${P.de} est de ${nb(m.aire, P.p1, P.p)}.`),
      canvas: grille([m.cells]),
    };
  }),

  // ★4 — Trois parties (l'escalier) : calculer chaque partie, ajouter.
  composer("cm1_aire_composer_tpl_009_reunion_parcelles", 4, "Trois rectangles : calcule chacun, puis ajoute les trois aires.", () => {
    const P = plan();
    const w1 = entre(2, 3);
    const w2 = w1 + entre(1, 2);
    const w3 = w2 + entre(1, 2);
    const h = [entre(1, 2), entre(1, 2), entre(1, 3)];
    const droite = Math.random() < 0.4;
    const ws = [w1, w2, w3];
    const cells: Case[] = [];
    let r0 = 0;
    ws.forEach((w, i) => {
      cells.push(...rect(h[i], w, r0, droite ? w3 - w : 0));
      r0 += h[i];
    });
    const parts = ws.map((w, i) => h[i] * w);
    const aire = parts.reduce((x, y) => x + y, 0);
    const POS = ["En haut", "Au milieu", "En bas"];
    const desc = ws.map((w, i) => `${POS[i]}, ${rg(h[i])} de ${w}.`).join(" ");
    return {
      text: `${P.qui} ${P.fait}, en escalier. ${desc}${P.phrase} ${un([`Quelle est l'aire ${P.de} ?`, "Quelle est son aire ?", `Combien de ${P.p} en tout ?`])}`,
      ...qcmU(aire, [(h[0] + h[1] + h[2]) * w3, parts[1] + parts[2], aire + w1, w1 + w2 + w3 + h[0] + h[1] + h[2]], P.p1, P.p),
      explanation: etapes("on découpe en trois rectangles, on calcule chaque partie, puis on ajoute.", `${ws.map((w, i) => `${h[i]} × ${w} = ${parts[i]}`).join(" ; ")} ; ${parts.join(" + ")} = ${aire}.`, `l'aire ${P.de} est de ${nb(aire, P.p1, P.p)}.`),
      canvas: grille([cells]),
    };
  }),

  // ★4 — Le piège : les parties se chevauchent, un coin compté deux fois.
  composer("cm1_aire_composer_tpl_007_erreur_perimetre_figure_composee", 4, "Chaque carreau compte une seule fois : enlève le coin compté deux fois.", () => {
    const P = plan();
    const p = un(PERSONNES);
    const H = entre(3, 5);
    const a = entre(1, 2);
    const b = entre(1, 2);
    const W = entre(a + 2, 7);
    const cells = unir(rect(H, a), rect(b, W, H - b, 0));
    const X = H * a + b * W;
    const vraie = X - a * b;
    return {
      text: `${p.n} ${P.fait}. ${cap(p.il)} compte la partie de gauche, ${H} rangées de ${a}, puis la partie du bas, ${rg(b)} de ${W}. ${cap(p.il)} trouve ${X} carreaux. ${un(["Quelle est la vraie aire ?", "Mais le coin est compté deux fois ! Quelle est la vraie aire ?", "Vérifie : quelle est la bonne aire ?"])}`,
      ...qcmU(vraie, [X, X + a * b, H * a, b * W], "carreau", "carreaux"),
      explanation: etapes("les parties ne doivent pas se chevaucher : chaque carreau compte une seule fois.", `${H} × ${a} = ${H * a} ; ${b} × ${W} = ${b * W} ; le coin de ${a * b} carreaux est compté deux fois : ${X} − ${a * b} = ${vraie}.`, `l'aire est de ${nb(vraie, "carreau", "carreaux")}.`),
      canvas: grille([cells]),
    };
  }),
];

/* ════════════════════════ AIRE_DEFI (ceinture bleue) ════════════════════════
   Vidéo : Chloé, peintre ; le mur de 3 × 8 = 24 moins la fenêtre 2 × 2 = 4 → 20 m² ;
   un pot couvre 10 m² → 2 pots ; mur 4 × 5 moins une porte de 2 → 18 ; même tour
   (la bande de 5, le carré de 3) mais pas même aire ; le carré de 4 contre 2 × 7 ;
   défi : la salle en L, 3 × 6 + 2 × 3 = 24 m² → 3 pots. */

const defi = gab("aire_defi");

const aireDefi: TutorBankItemV4[] = [
  // ★3 — Le mur moins la fenêtre.
  defi("cm1_aire_defi_tpl_005_figure_avec_trou", 3, "Tout le mur d'abord, puis enlève la fenêtre.", () => {
    const C = chantier();
    const m = murTrou();
    const donne = Math.random() < 0.7;
    const deb = donne
      ? `${cap(C.le)} a ${m.r} rangées de ${m.c} carreaux. ${cap(C.trou)} couvre ${nb(m.t, "carreau", "carreaux")} : on ne couvre pas ${C.troule}.`
      : `Sur le dessin, ${C.le} est en bleu ; les carreaux blancs, c'est ${C.troule}.`;
    return {
      text: `${C.qui} doit ${C.action}. ${deb} Chaque carreau fait 1 m². ${C.q}`,
      ...qcmU(m.aire, [m.total, m.total + m.t, m.t, m.aire - 1], "m²", "m²"),
      explanation: etapes(`on calcule tout ${C.le}, puis on enlève ${C.troule}.`, `${m.r} × ${m.c} = ${m.total} ; ${m.total} − ${m.t} = ${m.aire}.`, `il faut ${m.aire} m².`),
      canvas: grille([m.cells]),
    };
  }),

  // ★3 — Le carré contre le rectangle (le carré de 4, le voisin à 2 × 7).
  defi("cm1_aire_defi_tpl_002_comparer_rectangle_carre", 3, "Calcule les deux aires : le plus long tour ne donne pas la plus grande aire.", () => {
    const [A, B] = deuxPersonnes();
    const obj = un(OBJETS);
    let k = 0;
    let r = 0;
    let w = 0;
    for (let essai = 0; essai < 40; essai++) {
      k = entre(3, 5);
      r = entre(1, k - 1);
      w = entre(k + 1, 9);
      if (Math.abs(r * w - k * k) <= 4) break;
    }
    const sa = k * k;
    const sb = r * w;
    const juste = sa === sb ? "les deux ont la même aire" : sa > sb ? A.n : B.n;
    return {
      text: `${cap(obj)} ${deN(A.n)} est un carré de ${k} carreaux de côté. ${cap(obj)} ${deN(B.n)} a ${rg(r)} de ${w} carreaux. ${un([`Qui a ${obj} avec la plus grande aire ?`, `Qui a ${obj} qui prend le plus de place ?`, `Qui a ${obj} qui couvre le plus de carreaux ?`])}`,
      ...qcm(juste, [A.n, B.n, "les deux ont la même aire"]),
      explanation: etapes("le carré : côté × côté ; le rectangle : rangées × cases d'une rangée.", `${A.n} : ${k} × ${k} = ${sa} ; ${B.n} : ${r} × ${w} = ${sb}.`, sa === sb ? "les deux ont la même aire." : `${juste} a ${obj} avec la plus grande aire, même si le tour n'est pas le plus long.`),
      canvas: grille([rect(k, k), rect(r, w)]),
    };
  }),

  // ★3 — Même tour, pas la même aire.
  defi("cm1_aire_defi_tpl_004_figure_libre_piege_perimetre", 3, "Le même tour ne veut pas dire la même aire : compte ce qui est dedans.", () => {
    const [A, B] = deuxPersonnes();
    const obj = un(["enclos", "potager", "tapis", "jardin", "champ", "bac à sable", "patchwork", "parc à poneys", "terrain de jeu", "poulailler"]);
    const s = entre(6, 8);
    const hs = melange(Array.from({ length: Math.floor(s / 2) }, (_, i) => i + 1)).slice(0, 2);
    const [h1, h2] = hs;
    const a1 = h1 * (s - h1);
    const a2 = h2 * (s - h2);
    const grand = a1 > a2 ? A.n : B.n;
    const petit = a1 > a2 ? B.n : A.n;
    const ontIls = Math.random() < 0.5;
    const text = `Le ${obj} ${deN(A.n)} (à gauche) et celui ${deN(B.n)} (à droite) ont le même tour : ${2 * s} côtés de carreau. ${ontIls ? "Ont-ils la même aire ?" : un([`Qui a le ${obj} avec la plus grande aire ?`, `Qui a le ${obj} qui prend le plus de place ?`])}`;
    const choix = ontIls
      ? qcm(`Non : celui ${deN(grand)} est plus grand`, [`Oui : ils ont le même tour`, `Non : celui ${deN(petit)} est plus grand`, "On ne peut pas savoir"])
      : qcm(grand, [grand, petit, "les deux ont la même aire"]);
    return {
      text,
      ...choix,
      explanation: etapes("le tour et l'aire, ce n'est pas pareil : pour l'aire, on compte ce qui est dedans.", `${A.n} : ${h1} × ${s - h1} = ${a1} carreaux ; ${B.n} : ${h2} × ${s - h2} = ${a2} carreaux.`, `même tour, mais ${grand} a la plus grande aire.`),
      canvas: grille([rect(h1, s - h1), rect(h2, s - h2)]),
    };
  }),

  // ★4 — Combien de pots ? (mur avec fenêtre, ou salle en L)
  defi("cm1_aire_defi_tpl_006_aire_assemblee", 4, "D'abord l'aire, ensuite les pots : s'il en manque un peu, il faut un pot de plus.", () => {
    const C = chantier();
    const parPot = un([4, 5, 6, 10, 10]);
    let aire = 0;
    let calc = "";
    let deb = "";
    let canvas: FigureLibreCanvasData = grille([rect(1, 1)]);
    for (let essai = 0; essai < 30; essai++) {
      if (Math.random() < 0.5) {
        const m = murTrou();
        aire = m.aire;
        calc = `${m.r} × ${m.c} = ${m.total} ; ${m.total} − ${m.t} = ${m.aire}`;
        deb = `${cap(C.le)} a ${m.r} rangées de ${m.c} carreaux, et ${C.trou} couvre ${nb(m.t, "carreau", "carreaux")}.`;
        canvas = grille([m.cells]);
      } else {
        const d = deuxRect();
        const a = d.a.h * d.a.w;
        const b = d.b.h * d.b.w;
        aire = a + b;
        calc = `${d.a.h} × ${d.a.w} = ${a} ; ${d.b.h} × ${d.b.w} = ${b} ; ${a} + ${b} = ${aire}`;
        deb = `${cap(C.le)} est en forme de L : une partie de ${rg(d.a.h)} de ${d.a.w} carreaux, et une autre de ${rg(d.b.h)} de ${d.b.w}.`;
        canvas = grille([d.cells], { chemin: d.coupe });
      }
      if (aire > parPot && (aire % parPot !== 0 || Math.random() < 0.2)) break;
    }
    const pots = Math.ceil(aire / parPot);
    return {
      text: `${C.qui} doit ${C.action}. ${deb} Chaque carreau fait 1 m². ${C.unProd} couvre ${parPot} m². ${un([`Combien de ${C.prods} faut-il acheter ?`, `Combien de ${C.prods} faut-il au moins ?`, `Combien de ${C.prods} prévoir ?`])}`,
      ...qcmU(pots, [Math.floor(aire / parPot), pots + 1, pots + 2, pots - 1], C.prod1, C.prods),
      explanation: etapes(`d'abord l'aire, ensuite les ${C.prods} ; on vérifie que la réponse a du sens.`, `${calc} m² ; ${pots - 1} ${pots - 1 >= 2 ? C.prods : C.prod1} couvrent ${(pots - 1) * parPot} m², ${pots} en couvrent ${pots * parPot}.`, `il faut ${nb(pots, C.prod1, C.prods)}.`),
      canvas,
    };
  }),

  // ★4 — Trouver l'erreur : oublier la fenêtre, l'ajouter, calculer le tour.
  defi("cm1_aire_defi_tpl_007_erreur_unite", 4, "Refais le calcul : tout le mur, moins le trou.", () => {
    const C = chantier();
    let m = murTrou();
    for (let k = 0; k < 10 && 2 * (m.r + m.c) === m.aire; k++) m = murTrou();
    const err = un(["oubli", "ajout", "tour", "juste"]);
    const X = err === "oubli" ? m.total : err === "ajout" ? m.total + m.t : err === "tour" ? 2 * (m.r + m.c) : m.aire;
    const il = cap(C.il);
    const DIAG: Record<string, string> = {
      oubli: `${il} a oublié d'enlever ${C.troule}`,
      ajout: `${il} a ajouté ${C.troule} au lieu de l'enlever`,
      tour: `${il} a calculé le tour, pas l'aire`,
      juste: `${il} a raison`,
    };
    return {
      text: `${C.qui} doit ${C.action}. ${cap(C.le)} a ${m.r} rangées de ${m.c} carreaux de 1 m², et ${C.trou} couvre ${nb(m.t, "carreau", "carreaux")}. ${il} trouve ${X} m². ${un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Vérifie : que dis-tu ?"])}`,
      ...qcm(DIAG[err], Object.values(DIAG)),
      explanation: etapes("tout le grand rectangle, puis on enlève le trou ; le tour, ce n'est pas l'aire.", `${m.r} × ${m.c} = ${m.total} ; ${m.total} − ${m.t} = ${m.aire} m².`, DIAG[err] + "."),
      canvas: grille([m.cells]),
    };
  }),

  // ★4 — Ce qui reste, puis combien de sacs.
  defi("cm1_aire_defi_tpl_003_potager_reunion", 4, "L'aire totale, moins ce qui est fait, puis les sacs.", () => {
    const C = chantier();
    const r = entre(3, 5);
    const k = entre(5, 8);
    const total = r * k;
    const parPot = un([4, 5, 6]);
    let fait = entre(k, total - k);
    for (let e = 0; e < 20 && ((total - fait) % parPot === 0 || total - fait <= parPot); e++) fait = entre(k, total - k);
    const reste = total - fait;
    const pots = Math.ceil(reste / parPot);
    const cells = Array.from({ length: fait }, (_, i) => [Math.floor(i / k), i % k] as Case);
    return {
      text: `${C.qui} doit ${C.action}. ${cap(C.le)} a ${r} rangées de ${k} carreaux de 1 m². ${fait} m² sont déjà faits. ${C.unProd} couvre ${parPot} m². ${un([`Combien de ${C.prods} faut-il pour finir ?`, `Combien de ${C.prods} faut-il encore ?`, `Combien de ${C.prods} acheter pour le reste ?`])}`,
      ...qcmU(pots, [Math.ceil(total / parPot), Math.floor(reste / parPot), pots + 1, pots - 1], C.prod1, C.prods),
      explanation: etapes("d'abord l'aire qui reste, ensuite les sacs.", `${r} × ${k} = ${total} ; ${total} − ${fait} = ${reste} m² ; ${pots} × ${parPot} = ${pots * parPot}, assez pour ${reste}.`, `il faut ${nb(pots, C.prod1, C.prods)}.`),
      canvas: grille([cells], { chemin: cadre(r, k) }),
    };
  }),

  // ★4 — Deux salles, laquelle demande le plus ?
  defi("cm1_aire_defi_tpl_001_meme_aire_formes_differentes", 4, "Calcule l'aire de chaque salle : découpe l'une, enlève le trou de l'autre.", () => {
    const C = chantier();
    const [A, B] = deuxPersonnes();
    let m = murTrou();
    let d = deuxRect();
    for (let e = 0; e < 20 && Math.abs(m.aire - d.cells.length) > 4; e++) (m = murTrou()), (d = deuxRect());
    const sa = m.aire;
    const sb = d.cells.length;
    const juste = sa === sb ? "les deux autant" : sa > sb ? A.n : B.n;
    return {
      text: `${A.n} et ${B.n} doivent chacun ${C.action}. À gauche, ${C.le} ${deN(A.n)}, avec ${C.trou} en blanc. À droite, ${C.le} ${deN(B.n)}, en forme de L. Chaque carreau fait 1 m². ${un(["Qui a la plus grande surface à couvrir ?", "Qui a le plus de travail ?", "Qui doit couvrir le plus de m² ?"])}`,
      ...qcm(juste, [A.n, B.n, "les deux autant"]),
      explanation: etapes("à gauche, le grand rectangle moins le trou ; à droite, on découpe en deux rectangles.", `${A.n} : ${m.r} × ${m.c} − ${m.t} = ${sa} m² ; ${B.n} : ${d.a.h} × ${d.a.w} + ${d.b.h} × ${d.b.w} = ${sb} m².`, sa === sb ? "les deux ont autant à couvrir." : `${juste} a la plus grande surface.`),
      canvas: grille([m.cells, d.cells]),
    };
  }),
];

export const airesBank: TutorBankItemV4[] = [...aireComprendre, ...aireUnite, ...aireCarreRectangle, ...aireComposer, ...aireDefi];
