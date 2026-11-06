// COMPOSÉES DE TRANSFORMATIONS, SIMILITUDES (06/11/2026). Hors programme français de 2de (registre
// `hors_france`). Lignes visées : Suisse 11h MSN 31-i, Sénégal 3e AG 7, 2nde AG 9, 1re GE 4, Côte
// d'Ivoire 1re C3-L4. `4e/sym_transformation_defi` ne compose que de même centre ou de même axe : ici,
// centres différents, axes parallèles, perpendiculaires, sécants, homothétie et translation ou
// rotation. La similitude en écriture complexe est traitée ailleurs (Terminale).

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl as explBrut, fabrique, fr, melange, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "composees_transformations", "2de_");
const S = "composee_symetries";
const H = "composee_homotheties";

const NB = " ";
/** Dans une explication : « 5 + (−1) », jamais « 5 + -1 ». */
const expl = (a: string, b: string, c: string, d: string) =>
  explBrut(a, b, c, d).replace(/([+×÷−-] )-(\d+(?:,\d+)?)/g, "$1(−$2)").replace(/(^|[\s(|])-(\d)/g, "$1−$2");
const qu = (s: string) => s.replace(/ \?/g, `${NB}?`).replace(/ :/g, `${NB}:`);
const mo = (x: number | string) => String(typeof x === "number" ? fr(x) : x).replace(/-/g, "−");
const pt = (n: string, x: number, y: number) => `${n}(${mo(x)}${NB};${NB}${mo(y)})`;
const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
const CENTRES = [["I", "J"], ["A", "B"], ["O", "P"], ["K", "L"], ["E", "F"], ["C", "D"]];
const AXES = [["(d)", "(d')"], ["(d)", "(d')"], ["(a)", "(b)"], ["(f)", "(g)"], ["(m)", "(n)"]];
const POINTS = ["M", "N", "Q", "R", "T"];
const COORD: [string, 0 | 1][] = [["l'abscisse", 0], ["l'ordonnée", 1]];
const DEF_C = "composer deux symétries centrales de centres I puis J donne la translation de vecteur 2IJ.";
const DEF_P = "composer deux symétries d'axes parallèles donne une translation, de longueur le double de la distance entre les axes, perpendiculaire aux axes.";
const DEF_S = "composer deux symétries d'axes sécants donne une rotation autour du point d'intersection, d'angle le double de l'angle des axes ; si les axes sont perpendiculaires, c'est une symétrie centrale.";
const DEF_H = "composer deux homothéties de même centre, de rapports k et k', donne l'homothétie de même centre et de rapport k × k'.";
const DEF_R = "une homothétie et une rotation de même centre O, de rapport k > 0 et d'angle θ, se composent en une similitude : OM'' = k × OM et l'angle MOM'' vaut θ.";

/* ───────────────── natures ───────────────── */

const TRANS = "Une translation";
const IDENT = "L'identité : chaque point revient à sa place";
const CENT = "Une symétrie centrale";
const ROT = "Une rotation d'angle non plat";
const AXI = "Une symétrie axiale";
type Cas = { t: () => string; j: string; c: string };
const CAS: Cas[] = [
  { t: () => { const [a, b] = un(CENTRES); return `d'abord la symétrie de centre ${a}, puis la symétrie de centre ${b}, avec ${a} et ${b} distincts`; }, j: TRANS, c: DEF_C },
  { t: () => { const [a] = un(CENTRES); return `deux fois de suite la symétrie de centre ${a}`; }, j: IDENT, c: "Le point revient à sa place au second passage." },
  { t: () => { const [a, b] = un(AXES); return `d'abord la symétrie d'axe ${a}, puis celle d'axe ${b}, deux droites parallèles et distinctes`; }, j: TRANS, c: DEF_P },
  { t: () => { const [a] = un(AXES); return `deux fois de suite la symétrie d'axe ${a}`; }, j: IDENT, c: "Le point revient à sa place au second passage." },
  { t: () => { const [a, b] = un(AXES); return `d'abord la symétrie d'axe ${a}, puis celle d'axe ${b}, deux droites perpendiculaires`; }, j: CENT, c: DEF_S },
  { t: () => { const [a, b] = un(AXES); return `d'abord la symétrie d'axe ${a}, puis celle d'axe ${b}, deux droites sécantes qui font un angle de ${un([20, 30, 40, 50, 60, 70])}°`; }, j: ROT, c: DEF_S },
  { t: () => "d'abord une translation, puis une autre translation", j: TRANS, c: "Les vecteurs s'ajoutent : on obtient la translation de vecteur somme." },
];

/* ───────────────── expressions ───────────────── */

/** « 2x − 3 », écrit proprement. */
function affine(c: number, v: string, d: number) {
  const a = c === 1 ? v : c === -1 ? `-${v}` : `${String(c).replace(".", "{,}")}${v}`;
  if (c === 0) return String(d).replace(".", "{,}");
  if (d === 0) return a;
  return `${a} ${d < 0 ? "-" : "+"} ${String(Math.abs(d)).replace(".", "{,}")}`;
}
const formule = (cx: number, dx: number, cy: number, dy: number) => `$x'' = ${affine(cx, "x", dx)}$ et $y'' = ${affine(cy, "y", dy)}$`;

/* ───────────────── figure ───────────────── */

function figureCentres(a: string, b: string, A: number[], B: number[], M: number[], m: string): CanvasFigure {
  const M1 = [2 * A[0] - M[0], 2 * A[1] - M[1]];
  const M2 = [2 * B[0] - M1[0], 2 * B[1] - M1[1]];
  return {
    kind: "construction",
    points: [
      { id: a, x: A[0], y: A[1], couleur: "#2563eb" }, { id: b, x: B[0], y: B[1], couleur: "#2563eb" },
      { id: m, x: M[0], y: M[1] }, { id: `${m}'`, x: M1[0], y: M1[1] }, { id: `${m}''`, x: M2[0], y: M2[1] },
    ],
    segments: [{ a: m, b: `${m}'`, pointille: true, couleur: "#64748b" }, { a: `${m}'`, b: `${m}''`, pointille: true, couleur: "#64748b" }],
    description: "Deux centres, un point, puis ses deux images successives.",
  } as CanvasFigure;
}
function figureAxes(alpha: number, nom: string, m: string, [d1, d2]: string[]): CanvasFigure {
  const rad = (x: number) => (x * Math.PI) / 180;
  const r2 = (x: number) => Math.round(x * 100) / 100;
  const pol = (r: number, t: number) => ({ x: r2(r * Math.cos(rad(t))), y: r2(r * Math.sin(rad(t))) });
  const dep = un([-15, 0, 10]);
  return {
    kind: "construction",
    points: [
      { id: nom, x: 0, y: 0 },
      { id: "u_1", ...pol(5, dep), cache: true }, { id: "v_1", ...pol(5, dep + alpha), cache: true },
      { id: "u_0", ...pol(-5, dep), cache: true }, { id: "v_0", ...pol(-5, dep + alpha), cache: true },
      { id: m, ...pol(3.5, dep - un([18, 25])) },
    ],
    droites: [{ a: "u_0", b: "u_1", couleur: "#2563eb" }, { a: "v_0", b: "v_1", couleur: "#dc2626" }],
    segments: [
      { a: nom, b: "u_1", texte: d1, sansTrait: true, couleur: "#2563eb" },
      { a: nom, b: "v_1", texte: d2, sansTrait: true, couleur: "#dc2626" },
    ],
    angles: [{ sommet: nom, de: "u_1", vers: "v_1", texte: `${alpha}°`, rayon: 26, rayonTexte: 16 }],
    description: "Deux droites sécantes qui font un angle donné, et un point.",
  } as CanvasFigure;
}

/* ───────────────── contextes ───────────────── */

const MIROIRS_S = [
  "Dans un kaléidoscope, deux miroirs plans", "Dans une cabine d'essayage, deux miroirs", "Chez un opticien, deux miroirs de test", "Dans la vitrine d'une bijoutière, deux miroirs",
  "Sur le plateau d'un magicien, deux miroirs", "Dans un laboratoire de physique, deux miroirs", "Dans une œuvre d'art en verre, deux panneaux réfléchissants", "Dans le décor d'un clip, deux miroirs",
  "Dans une salle de sciences, deux miroirs",
];
const MIROIRS_P = [
  "Dans une salle de danse, deux grands miroirs", "Dans un ascenseur, deux miroirs", "Chez un coiffeur, deux miroirs", "Dans un restaurant, deux parois de verre réfléchissantes",
  "Dans un labyrinthe de fête foraine, deux miroirs", "Dans un studio de télévision, deux miroirs", "Dans un laser de laboratoire, deux miroirs", "Dans une salle de sport, deux miroirs",
  "Dans le hall d'un hôtel de Saint-Denis, à La Réunion, deux miroirs",
];
const FRISES = [
  "Une créatrice de tissu", "Un fabricant de papier peint", "Une carreleuse", "Un potier", "Une brodeuse", "Un graphiste de jeu vidéo", "Une céramiste", "Un ferronnier", "Une architecte d'intérieur", "Un tisserand",
];
const ZOOMS = [
  "Une photocopieuse agrandit un plan", "Un microscope grossit une cellule", "Une graphiste modifie une image", "Un projecteur de cinéma affiche une image", "Une architecte met à l'échelle un dessin",
  "Une biologiste observe un insecte", "Un maquettiste adapte un gabarit", "Une cartographe retravaille une carte du Piton de la Fournaise", "Un imprimeur prépare une affiche", "Une astronome traite une photo de la Lune",
  "Un designer ajuste un logo", "Une tablette affiche un schéma de moteur",
];
const SIMILAIRES = [
  "Une graphiste fait tourner puis agrandit un logo triangulaire", "Un géomètre reporte une parcelle triangulaire", "Une couturière adapte un patron triangulaire", "Un maquettiste réduit la voile d'un bateau",
  "Une architecte retourne puis agrandit un pignon", "Un ingénieur reporte une équerre de renfort", "Une enseignante projette un triangle au tableau", "Un vitrailliste reproduit une pièce de verre",
  "Une designer retourne et agrandit une étiquette", "Une créatrice de jeux redimensionne une tuile",
];

/* ───────────────── symétries ───────────────── */

export const composeesTransformationsBank: TutorBankItemV4[] = [
  tpl(S, 1, 1, "Fais le trajet d'un point : où arrive-t-il après les deux symétries ?", () => {
    const c = un(CAS);
    const q = un(["Quelle transformation obtient-on ?", "Quelle est la transformation composée ?", "Par quelle unique transformation peut-on remplacer ces deux-là ?", "Quel est le résultat de ces deux transformations ?", "Quelle transformation unique fait le même effet ?", "Comment s'appelle la transformation obtenue ?"]);
    return qcm(qu(`On applique ${c.t()}.\n\n${q}`), c.j, [TRANS, IDENT, CENT, ROT, AXI], expl(c.c, "suis le trajet d'un point à travers les deux transformations.", c.c, `Réponse : ${c.j.toLowerCase()}.`));
  }),
  tpl(S, 2, 1, "L'ordre compte : le vecteur va du premier centre vers le second.", () => {
    const [a, b] = melange(un(CENTRES));
    const m = un(POINTS);
    // Le point n'est jamais aligné avec les centres : sinon toute la figure tient sur une droite.
    let A = [0, 0];
    let B = [0, 0];
    let M = [0, 0];
    do {
      A = [nz(-2, 2), nz(-1, 1)];
      B = [A[0] + un([2, 3, -2, -3]), A[1] + un([1, -1, 2])];
      M = [A[0] + un([-3, 3, 4]), A[1] + un([2, -2, 3])];
    } while (Math.abs((B[0] - A[0]) * (M[1] - A[1]) - (B[1] - A[1]) * (M[0] - A[0])) < 5 || Math.hypot(M[0] - B[0], M[1] - B[1]) < 2);
    const v = (x: string, y: string, k = "") => `$${k}\\overrightarrow{${x}${y}}$`;
    const q = un(["Quel est le vecteur de la translation obtenue ?", "Quelle translation obtient-on : de quel vecteur ?", "De quel vecteur le point arrive-t-il décalé ?", "Quel vecteur relie le point de départ au point d'arrivée ?"]);
    return qcm(qu(`On applique d'abord la symétrie de centre ${a}, puis celle de centre ${b}. La figure suit le point ${m}.\n\n${q}`), v(a, b, "2"), [v(b, a, "2"), v(a, b), v(b, a)], expl(DEF_C, `${m}${m}'' = ${m}${m}' + ${m}'${m}'' en vecteurs : chaque morceau vaut le double de ce qui sépare le point du centre.`, `On trouve 2 fois le vecteur allant de ${a} à ${b}.`, `La translation est de vecteur 2${a}${b}.`), figureCentres(a, b, A, B, M, m));
  }),
  tpl(S, 3, 1, "Les vecteurs s'ajoutent, coordonnée par coordonnée.", () => {
    const [p, q0, r, s] = [nz(-9, 9), nz(-9, 9), nz(-9, 9), nz(-9, 9)];
    const [nx, i] = un(COORD);
    const [u, v] = un([["u", "v"], ["u", "w"], ["v", "w"]]);
    const t = `On applique d'abord la translation de vecteur ${pt(u, p, q0)}, puis celle de vecteur ${pt(v, r, s)}.`;
    if (Math.random() < 0.5) {
      const q = un([`Quelle est ${nx} du vecteur de la translation obtenue ?`, `Que vaut ${nx} du vecteur de la composée ?`]);
      const w = i === 0 ? p + r : q0 + s;
      return court(qu(`${t}\n\n${q}`), w, expl("deux translations se composent en la translation de vecteur somme.", "ajoute les coordonnées.", `On trouve ${w}.`, `La réponse est ${w}.`));
    }
    const m = un(POINTS);
    const [x, y] = [entre(-9, 9), entre(-9, 9)];
    const q = un([`Quelle est ${nx} de son image finale ?`, `Que vaut ${nx} du point d'arrivée ?`]);
    const w = i === 0 ? x + p + r : y + q0 + s;
    return court(qu(`${t} Le point de départ est ${pt(m, x, y)}.\n\n${q}`), w, expl("deux translations se composent en la translation de vecteur somme.", "ajoute les deux vecteurs au point de départ.", `On trouve ${w}.`, `La réponse est ${w}.`));
  }),
  tpl(S, 4, 1, "L'angle de la rotation est le double de l'angle des axes.", () => {
    const [a, b] = un(AXES);
    const al = un([10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80]);
    const base = `deux symétries d'axes ${a} puis ${b}, sécants en un point`;
    if (Math.random() < 0.6) {
      const q = un(["Quel est l'angle de la rotation obtenue, en degrés ?", "De combien de degrés tourne un point au total ?", "Quel angle de rotation obtient-on, en degrés ?"]);
      return court(qu(`On compose ${base}. Les axes font un angle de ${al}°.\n\n${q}`), 2 * al, expl(DEF_S, "double l'angle des axes.", `2 × ${al} = ${2 * al}.`, `La rotation est d'angle ${2 * al}°.`));
    }
    const q = un(["Quel angle font les axes, en degrés ?", "Quel est l'angle entre les deux axes, en degrés ?", "Combien de degrés séparent les deux axes ?"]);
    return court(qu(`On compose ${base}. On obtient une rotation d'angle ${2 * al}°.\n\n${q}`), al, expl(DEF_S, "prends la moitié de l'angle de la rotation.", `${2 * al} ÷ 2 = ${al}.`, `Les axes font un angle de ${al}°.`));
  }),
  tpl(S, 5, 1, "La longueur de la translation est le double de la distance entre les centres ou les axes.", () => {
    const u = un(["cm", "cm", "m", "dm"]);
    const v = entre(2, 20);
    const axes = Math.random() < 0.5;
    const [a, b] = axes ? un(AXES) : un(CENTRES);
    const fig = axes ? `deux symétries d'axes parallèles ${a} et ${b}` : `les symétries de centres ${a} et ${b}`;
    const dist = axes ? `Les axes sont distants de` : `La distance ${a}${b} vaut`;
    if (Math.random() < 0.6) {
      const q = un(["Quelle est la longueur de la translation obtenue ?", "De quelle longueur un point se déplace-t-il au total ?", "Quelle distance sépare un point de son image finale ?"]);
      return court(qu(`On compose ${fig}. ${dist} ${v}${NB}${u}.\n\n${q}`), 2 * v, expl(axes ? DEF_P : DEF_C, "double la distance.", `2 × ${v} = ${2 * v}.`, `La translation a pour longueur ${2 * v} ${u}.`));
    }
    const q = axes ? un(["Quelle distance sépare les axes ?", "De combien les deux axes sont-ils distants ?"]) : un([`Combien vaut la distance ${a}${b} ?`, `Quelle distance sépare ${a} et ${b} ?`]);
    return court(qu(`On compose ${fig}. On obtient une translation de longueur ${2 * v}${NB}${u}.\n\n${q}`), v, expl(axes ? DEF_P : DEF_C, "prends la moitié de la longueur.", `${2 * v} ÷ 2 = ${v}.`, `La distance vaut ${v} ${u}.`));
  }),

  /* ★2 */
  tpl(S, 6, 2, "Calcule la première image, puis l'image de cette image.", () => {
    const [a, b] = melange(un(CENTRES));
    const m = un(POINTS);
    const [xa, ya, xb, yb, x, y] = [entre(-6, 6), entre(-6, 6), entre(-6, 6), entre(-6, 6), entre(-9, 9), entre(-9, 9)];
    if (xa === xb && ya === yb) return court(qu(`On applique d'abord la symétrie de centre ${pt(a, xa, ya)}, puis la même symétrie. Le point de départ est ${pt(m, x, y)}.\n\nQuelle est l'abscisse du point d'arrivée ?`), x, expl("deux fois la même symétrie ramènent le point.", "le point revient.", `On retrouve ${x}.`, `La réponse est ${x}.`));
    const [nx, i] = un(COORD);
    const r = i === 0 ? x + 2 * (xb - xa) : y + 2 * (yb - ya);
    const q = un([`Quelle est ${nx} de son image finale ?`, `Que vaut ${nx} du point d'arrivée ?`, `Calcule ${nx} de l'image finale de ${m}.`]);
    return court(qu(`On applique d'abord la symétrie de centre ${pt(a, xa, ya)}, puis celle de centre ${pt(b, xb, yb)}. Le point de départ est ${pt(m, x, y)}.\n\n${q}`), r, expl(DEF_C, "ajoute deux fois le vecteur allant du premier centre au second.", `On trouve ${r}.`, `La réponse est ${r}.`));
  }),
  tpl(S, 7, 2, "L'image de x par la symétrie d'axe x = a est 2a − x.", () => {
    const vert = Math.random() < 0.5;
    const l = vert ? "x" : "y";
    const a = entre(-6, 6);
    const b = a + un([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
    const m = un(POINTS);
    const [x, y] = [entre(-9, 9), entre(-9, 9)];
    const eq = (v: number) => `${l}${NB}=${NB}${mo(v)}`;
    const t = `On applique d'abord la symétrie d'axe ${eq(a)}, puis celle d'axe ${eq(b)}.`;
    const nom = vert ? "l'abscisse" : "l'ordonnée";
    if (Math.random() < 0.6) {
      const r = (vert ? x : y) + 2 * (b - a);
      const q = un([`Quelle est ${nom} de son image finale ?`, `Que vaut ${nom} du point d'arrivée ?`]);
      return court(qu(`${t} Le point de départ est ${pt(m, x, y)}.\n\n${q}`), r, expl(DEF_P, "les axes sont parallèles : c'est une translation.", `${vert ? x : y} + 2 × (${b - a}) = ${r}.`, `La réponse est ${r}.`));
    }
    const r = 2 * (b - a);
    const q = un([`Quelle est ${nom} du vecteur de la translation obtenue ?`, `Que vaut ${nom} du vecteur de cette translation ?`]);
    return court(qu(`${t}\n\n${q}`), r, expl(DEF_P, "le vecteur est perpendiculaire aux axes, et vaut le double de leur écart.", `2 × (${b} − (${a})) = ${r}.`, `La réponse est ${r}.`));
  }),
  tpl(S, 8, 2, "Axes perpendiculaires : une symétrie centrale de centre leur point d'intersection.", () => {
    const [a, b] = [entre(-6, 6), entre(-6, 6)];
    const m = un(POINTS);
    const [x, y] = [entre(-9, 9), entre(-9, 9)];
    const [e1, e2] = melange([`x${NB}=${NB}${mo(a)}`, `y${NB}=${NB}${mo(b)}`]);
    const [nx, i] = un(COORD);
    const t = `On applique d'abord la symétrie d'axe ${e1}, puis celle d'axe ${e2}.`;
    if (Math.random() < 0.65) {
      const r = i === 0 ? 2 * a - x : 2 * b - y;
      const q = un([`Quelle est ${nx} de son image finale ?`, `Que vaut ${nx} du point d'arrivée ?`]);
      return court(qu(`${t} Le point de départ est ${pt(m, x, y)}.\n\n${q}`), r, expl(DEF_S, "les axes sont perpendiculaires : symétrie centrale.", `On trouve ${r}.`, `La réponse est ${r}.`));
    }
    const q = un([`Quelle est ${nx} du centre de la symétrie obtenue ?`, `Que vaut ${nx} du centre de cette symétrie centrale ?`]);
    return court(qu(`${t}\n\n${q}`), i === 0 ? a : b, expl(DEF_S, "le centre est le point d'intersection des axes.", `Ce point est (${a} ; ${b}).`, `La réponse est ${i === 0 ? a : b}.`));
  }),
  tpl(S, 9, 2, "Double l'angle marqué entre les axes.", () => {
    const al = un([25, 30, 35, 40, 45, 50, 55, 60]);
    const [o, m] = un([["O", "M"], ["O", "N"], ["K", "P"], ["I", "M"], ["S", "R"]]);
    const noms = un(AXES);
    const q = un([`Quelle est la mesure de l'angle entre ${o}${m} et ${o}${m}'', en degrés ?`, `De combien de degrés le point ${m} a-t-il tourné autour de ${o} ?`, `Quel est l'angle de la rotation de centre ${o} obtenue, en degrés ?`]);
    return court(qu(`Sur la figure, on applique d'abord la symétrie d'axe ${noms[0]}, puis celle d'axe ${noms[1]}. Le point ${m} a pour image finale ${m}''.\n\n${q}`), 2 * al, expl(DEF_S, "lis l'angle des axes sur la figure et double-le.", `2 × ${al} = ${2 * al}.`, `L'angle vaut ${2 * al}°.`), figureAxes(al, o, m, noms));
  }),

  /* ★3 */
  tpl(S, 10, 3, "Une réflexion dans un miroir est une symétrie : deux réflexions se composent.", () => {
    const k = entre(0, 2);
    if (k === 0) {
      const al = un([20, 30, 36, 40, 45, 60, 72]);
      const q = un(["De quel angle l'image obtenue après les deux réflexions a-t-elle tourné, en degrés ?", "Quel est l'angle de la rotation qui donne cette seconde image, en degrés ?", "De combien de degrés la seconde image a-t-elle pivoté autour de l'arête des miroirs ?"]);
      return court(qu(`${un(MIROIRS_S)} se touchent le long d'une arête et font un angle de ${al}°. Un objet s'y reflète deux fois de suite, dans un miroir puis dans l'autre.\n\n${q}`), 2 * al, expl(DEF_S, "chaque miroir agit comme une symétrie : les axes sont sécants.", `2 × ${al} = ${2 * al}.`, `L'image a tourné de ${2 * al}°.`));
    }
    if (k === 1) {
      const d = un([2, 3, 4, 5, 6, 8, 12]);
      const q = un(["De combien de mètres l'image obtenue après les deux réflexions est-elle décalée par rapport à l'objet ?", "Quelle distance sépare l'objet de cette seconde image, en m ?", "De quelle longueur cette seconde image est-elle translatée, en m ?"]);
      return court(qu(`${un(MIROIRS_P)}, parallèles, sont distants de ${d}${NB}m. Un objet s'y reflète deux fois de suite, dans un miroir puis dans l'autre.\n\n${q}`), 2 * d, expl(DEF_P, "chaque miroir agit comme une symétrie : les axes sont parallèles.", `2 × ${d} = ${2 * d}.`, `L'image est décalée de ${2 * d} m.`));
    }
    const d = un([3, 4, 5, 6, 7, 8, 9, 12, 15]);
    const q = un(["Tous les combien de centimètres le motif de départ revient-il à l'identique ?", "Quelle est la longueur du décalage qui reproduit le motif de départ, en cm ?", "Quel est le pas de la frise, en cm ?"]);
    return court(qu(`${un(FRISES)} dessine une frise : un motif et ses reflets par rapport à deux droites parallèles voisines, distantes de ${d}${NB}cm, puis ainsi de suite.\n\n${q}`), 2 * d, expl(DEF_P, "deux reflets de suite font une translation.", `2 × ${d} = ${2 * d}.`, `Le motif revient tous les ${2 * d} cm.`));
  }),
  tpl(S, 11, 3, "Écris la première image, remplace dans la seconde, puis simplifie.", () => {
    const [a, b] = melange(un(CENTRES));
    const k = entre(0, 1);
    const [p, q0] = [nz(-5, 5), nz(-5, 5)];
    // Des centres d'abscisses et d'ordonnées différentes : aucune proposition ne se confond avec une autre.
    const r = p + un([-3, -2, -1, 1, 2, 3]);
    const s = q0 + un([-3, -2, -1, 1, 2, 3]);
    let t: string;
    let j: string;
    let f: string[];
    if (k === 0) {
      const [dx, dy] = [2 * (r - p), 2 * (s - q0)];
      t = `On applique d'abord la symétrie de centre ${pt(a, p, q0)}, puis celle de centre ${pt(b, r, s)}.`;
      j = formule(1, dx, 1, dy);
      f = [formule(1, -dx, 1, -dy), formule(-1, dx, -1, dy), formule(1, dx / 2 || 1, 1, dy / 2 || 1), formule(-1, 2 * p + 2 * r, -1, 2 * q0 + 2 * s)];
    } else {
      t = `On applique d'abord la symétrie d'axe x${NB}=${NB}${mo(p)}, puis celle d'axe y${NB}=${NB}${mo(q0)}.`;
      j = formule(-1, 2 * p, -1, 2 * q0);
      f = [formule(1, 2 * p, 1, 2 * q0), formule(-1, p, -1, q0), formule(-1, -2 * p, -1, -2 * q0), formule(1, -2 * p, -1, 2 * q0)];
    }
    const q = un(["Quelle est l'expression du point image (x'' ; y'') en fonction de (x ; y) ?", "Quelles formules donnent l'image finale (x'' ; y'') d'un point (x ; y) ?", "Laquelle de ces expressions analytiques est celle de la composée ?", "Quelle est l'expression analytique de la transformation obtenue ?"]);
    return qcm(qu(`${t}\n\n${q}`), j, f, expl("l'image de (x ; y) par la symétrie de centre (a ; b) est (2a − x ; 2b − y) ; par la symétrie d'axe x = a, c'est (2a − x ; y).", "enchaîne les deux expressions.", "On remplace la première dans la seconde.", `On obtient ${j}.`));
  }),
  tpl(S, 12, 3, "Le vecteur vaut le double du vecteur entre les centres : le second centre est à mi-chemin du vecteur.", () => {
    const [a, b] = melange(un(CENTRES));
    const [xa, ya] = [entre(-6, 6), entre(-6, 6)];
    const [p, q0] = [2 * nz(-5, 5), 2 * nz(-5, 5)];
    const [nx, i] = un(COORD);
    const q = un([`Quelle est ${nx} du point ${b} ?`, `Que vaut ${nx} de ${b} ?`, `Calcule ${nx} du second centre ${b}.`]);
    const r = i === 0 ? xa + p / 2 : ya + q0 / 2;
    return court(qu(`On veut obtenir la translation de vecteur ${pt("u", p, q0)} en appliquant d'abord la symétrie de centre ${pt(a, xa, ya)}, puis celle de centre ${b}.\n\n${q}`), r, expl(DEF_C, `le vecteur u vaut 2${a}${b}, donc ${a}${b} vaut sa moitié.`, `On ajoute la moitié de u à ${a}.`, `La réponse est ${r}.`));
  }),
  tpl(S, 13, 3, "Applique les deux symétries l'une après l'autre : l'ordre change le résultat.", () => {
    const AX = [
      { n: "l'axe des abscisses", f: (x: number, y: number): [number, number] => [x, -y] },
      { n: "l'axe des ordonnées", f: (x: number, y: number): [number, number] => [-x, y] },
    ];
    const DG = [
      { n: `la droite d'équation y${NB}=${NB}x`, f: (x: number, y: number): [number, number] => [y, x] },
      { n: `la droite d'équation y${NB}=${NB}−x`, f: (x: number, y: number): [number, number] => [-y, -x] },
    ];
    const [e1, e2] = melange([un(AX), un(DG)]);
    const m = un(POINTS);
    const [x, y] = [nz(-9, 9), nz(-9, 9)];
    const [x1, y1] = e1.f(x, y);
    const [x2, y2] = e2.f(x1, y1);
    const [nx, i] = un(COORD);
    const q = un([`Quelle est ${nx} de son image finale ?`, `Que vaut ${nx} du point d'arrivée ?`, `Calcule ${nx} de l'image finale de ${m}.`]);
    return court(qu(`On applique d'abord la symétrie par rapport à ${e1.n}, puis celle par rapport à ${e2.n}. Le point de départ est ${pt(m, x, y)}.\n\n${q}`), i === 0 ? x2 : y2, expl(DEF_S, "les axes font un angle de 45° : c'est une rotation de 90° autour de l'origine.", `Première image (${x1} ; ${y1}), image finale (${x2} ; ${y2}).`, `La réponse est ${i === 0 ? x2 : y2}.`));
  }),

  /* ───────────────── homothéties ───────────────── */

  tpl(H, 1, 1, "Les rapports se multiplient.", () => {
    const [a, b] = [un([2, 3, 4, -2, -3, 0.5, 1.5, -0.5, 5]), un([2, 3, -2, 0.5, 1.5, -1, 4, 0.25])];
    const c = un(["O", "I", "A", "K", "S"]);
    const q = un(["Quel est le rapport de l'homothétie obtenue ?", "Quel rapport obtient-on pour la composée ?", "Que vaut le rapport de la transformation obtenue ?", "Par quelle homothétie remplacer ces deux-là : de quel rapport ?"]);
    return court(qu(`On applique d'abord l'homothétie de centre ${c} et de rapport ${mo(a)}, puis celle de même centre et de rapport ${mo(b)}.\n\n${q}`), a * b, expl(DEF_H, "multiplie les deux rapports.", `${fr(a)} × ${fr(b)} = ${fr(a * b)}.`, `Le rapport est ${fr(a * b)}.`));
  }),
  tpl(H, 2, 1, "Regarde le produit des rapports : vaut-il 1, ou −1 ?", () => {
    const [a, b] = un([[2, 0.5], [4, 0.25], [-2, -0.5], [0.5, 2], [-1, -1], [2, -0.5], [-4, 0.25], [-1, 1], [3, 2], [2, 2], [-2, 3], [0.5, 0.5], [-3, 2], [1.5, 2]]);
    const c = un(["O", "I", "A", "K", "S"]);
    const p = a * b;
    const IDH = "L'identité : chaque point reste à sa place";
    const SYM = `La symétrie de centre ${c}`;
    const hom = (r: number) => `L'homothétie de centre ${c} et de rapport ${mo(r)}`;
    const j = p === 1 ? IDH : p === -1 ? SYM : hom(p);
    const q = un(["Quelle transformation obtient-on ?", "Quel est le résultat de ces deux homothéties ?", "Quelle transformation unique fait le même effet ?", "Par quelle transformation peut-on les remplacer ?"]);
    return qcm(qu(`On applique l'homothétie de centre ${c} et de rapport ${mo(a)}, puis celle de même centre et de rapport ${mo(b)}.\n\n${q}`), j, [IDH, SYM, hom(a + b === 0 ? 2 : a + b), hom(-p), hom(a === b ? a + 1 : a)], expl(DEF_H, "multiplie les rapports ; un rapport 1 laisse tout en place, un rapport −1 est une symétrie centrale.", `${fr(a)} × ${fr(b)} = ${fr(p)}.`, `Réponse : ${j.toLowerCase()}.`));
  }),
  tpl(H, 3, 1, "Les longueurs sont multipliées par la valeur absolue du rapport.", () => {
    const [p, r, s] = un([["A", "B", "O"], ["E", "F", "I"], ["M", "N", "K"], ["R", "T", "S"]]);
    const [a, b] = [un([2, 3, -2, 0.5, 1.5, 4, -3]), un([2, -2, 0.5, 1.5, 3, -0.5])];
    const u = un(["cm", "cm", "mm", "m", "dm"]);
    const L = 4 * entre(1, 9);
    const q = un([`Quelle est la longueur ${p}''${r}'' ?`, `Combien mesure ${p}''${r}'' ?`, `Que vaut ${p}''${r}'' ?`]);
    const v = L * Math.abs(a * b);
    return court(qu(`Le segment [${p}${r}] mesure ${L}${NB}${u}. On lui applique l'homothétie de centre ${s} et de rapport ${mo(a)}, puis celle de centre ${s} et de rapport ${mo(b)}. Son image finale est [${p}''${r}''].\n\n${q}`), v, expl(DEF_H, "multiplie les rapports, puis prends la valeur absolue pour une longueur.", `${L} × |${fr(a * b)}| = ${fr(v)}.`, `${p}''${r}'' = ${fr(v)} ${u}.`));
  }),
  tpl(H, 4, 1, "Le produit des deux rapports est connu : divise.", () => {
    const a = un([2, 4, -2, 0.5, 5, -4, 0.25, 10]);
    const b = un([2, 3, -2, 0.5, 1.5, -3, 4, 6, 8]);
    const c = un(["O", "I", "A", "K", "S"]);
    const q = un(["Quel est le rapport de la seconde homothétie ?", "Que vaut le second rapport ?", "Par quel rapport a-t-on complété ?"]);
    return court(qu(`Une première homothétie de centre ${c} a pour rapport ${mo(a)}. Suivie d'une seconde de même centre, elle donne une homothétie de rapport ${mo(a * b)}.\n\n${q}`), b, expl(DEF_H, "le produit des rapports est donné : divise par le rapport connu.", `${fr(a * b)} ÷ ${fr(a)} = ${fr(b)}.`, `Le second rapport est ${fr(b)}.`));
  }),

  /* ★2 */
  tpl(H, 5, 2, "Une transformation après l'autre : l'ordre compte.", () => {
    const m = un(POINTS);
    const c = un(["I", "O", "A", "K"]);
    const [a, b, x, y, p, q0] = [entre(-5, 5), entre(-5, 5), entre(-8, 8), entre(-8, 8), nz(-6, 6), nz(-6, 6)];
    const k = un([2, 3, -1, -2, 0.5, -3]);
    const pair = k === 0.5;
    const [X, Y] = pair ? [a + 2 * entre(-4, 4), b + 2 * entre(-4, 4)] : [x, y];
    const h = (u: number, v: number): [number, number] => [a + k * (u - a), b + k * (v - b)];
    const hAv = Math.random() < 0.5;
    const pp = pair && !hAv ? 2 * p : p;
    const qq = pair && !hAv ? 2 * q0 : q0;
    const [xf, yf] = hAv ? ((v) => [v[0] + pp, v[1] + qq])(h(X, Y)) : h(X + pp, Y + qq);
    const [nx, i] = un(COORD);
    const hom = `l'homothétie de centre ${pt(c, a, b)} et de rapport ${mo(k)}`;
    const tr = `la translation de vecteur ${pt("u", pp, qq)}`;
    const q = un([`Quelle est ${nx} de son image finale ?`, `Que vaut ${nx} du point d'arrivée ?`, `Calcule ${nx} de l'image finale de ${m}.`]);
    return court(qu(`On applique d'abord ${hAv ? hom : tr}, puis ${hAv ? tr : hom}. Le point de départ est ${pt(m, X, Y)}.\n\n${q}`), i === 0 ? xf : yf, expl("l'image de M par l'homothétie de centre I et de rapport k vérifie IM' = k IM en vecteurs.", "calcule la première image, puis la seconde.", `L'image finale est (${fr(xf)} ; ${fr(yf)}).`, `La réponse est ${fr(i === 0 ? xf : yf)}.`));
  }),
  tpl(H, 6, 2, "Une homothétie et une translation gardent le rapport ; deux homothéties multiplient les rapports.", () => {
    const k = un([2, -2, 0.5, 4, 5, -4]);
    const [a, b] = un([["I", "J"], ["O", "P"], ["A", "B"], ["K", "L"]]);
    const cas = entre(0, 3);
    const TR = "Une translation";
    const hom = (r: number) => `Une homothétie de rapport ${mo(r)}`;
    const rot = "Une rotation";
    const sym = "Une symétrie axiale";
    let t: string;
    let j: string;
    if (cas === 0) { t = `l'homothétie de centre ${a} et de rapport ${mo(k)}, puis une translation de vecteur non nul`; j = hom(k); }
    else if (cas === 1) { t = `une translation de vecteur non nul, puis l'homothétie de centre ${a} et de rapport ${mo(k)}`; j = hom(k); }
    else if (cas === 2) { t = `l'homothétie de centre ${a} et de rapport ${mo(k)}, puis celle de centre ${b}, distinct de ${a}, et de rapport ${mo(1 / k)}`; j = TR; }
    else { t = `l'homothétie de centre ${a} et de rapport ${mo(k)}, puis celle de centre ${b}, distinct de ${a}, et de rapport ${mo(k)}`; j = hom(k * k); }
    const q = un(["Quelle transformation obtient-on ?", "Quelle est la nature de la composée ?", "Quelle transformation unique fait le même effet ?", "Par quoi peut-on remplacer ces deux transformations ?"]);
    return qcm(qu(`On applique ${t}.\n\n${q}`), j, [TR, hom(k), hom(k * k), hom(2 * k), rot, sym], expl("le rapport d'une composée est le produit des rapports ; un produit égal à 1 donne une translation, sinon une homothétie.", "multiplie les rapports (une translation compte pour 1).", cas < 2 ? `Le rapport reste ${fr(k)}.` : cas === 2 ? `${fr(k)} × ${fr(1 / k)} = 1.` : `${fr(k)} × ${fr(k)} = ${fr(k * k)}.`, `Réponse : ${j.toLowerCase()}.`));
  }),
  tpl(H, 7, 2, "La distance au centre est multipliée par le rapport, l'angle reste celui de la rotation.", () => {
    const [o, m] = un([["O", "M"], ["O", "N"], ["I", "P"], ["K", "R"], ["A", "T"]]);
    const k = un([2, 3, 4, 1.5, 0.5, 2.5]);
    const th = un([30, 40, 45, 60, 70, 90, 120]);
    const L = 4 * entre(1, 6);
    const u = un(["cm", "cm", "mm", "dm"]);
    const av = Math.random() < 0.5;
    const hom = `l'homothétie de centre ${o} et de rapport ${mo(k)}`;
    const rot = `la rotation de centre ${o} et d'angle ${th}°`;
    const t = `On applique ${av ? hom : rot}, puis ${av ? rot : hom}, au point ${m}, tel que ${o}${m}${NB}=${NB}${L}${NB}${u}. Son image finale est ${m}''.`;
    const rad = (th * Math.PI) / 180;
    const fig = {
      kind: "construction",
      points: [{ id: o, x: 0, y: 0 }, { id: m, x: 3, y: 0 }, { id: `${m}''`, x: Math.round(3 * k * Math.cos(rad) * 100) / 100, y: Math.round(3 * k * Math.sin(rad) * 100) / 100 }],
      segments: [{ a: o, b: m }, { a: o, b: `${m}''`, couleur: "#2563eb" }],
      description: "Le centre, le point et son image finale.",
    } as CanvasFigure;
    if (Math.random() < 0.6) {
      const q = un([`Combien mesure ${o}${m}'' ?`, `Quelle est la longueur ${o}${m}'' ?`, `Que vaut ${o}${m}'' ?`]);
      return court(qu(`${t}\n\n${q}`), L * k, expl(DEF_R, "la rotation conserve les distances, l'homothétie les multiplie.", `${L} × ${fr(k)} = ${fr(L * k)}.`, `${o}${m}'' = ${fr(L * k)} ${u}.`), fig);
    }
    const q = un([`Que vaut l'angle entre ${o}${m} et ${o}${m}'', en degrés ?`, `Quel angle sépare ${o}${m} et ${o}${m}'', en degrés ?`]);
    return court(qu(`${t}\n\n${q}`), th, expl(DEF_R, "un rapport positif ne change pas la direction de la demi-droite.", `L'angle reste ${th}°.`, `L'angle vaut ${th}°.`), fig);
  }),
  tpl(H, 8, 2, "Les longueurs sont multipliées par k, les aires par k².", () => {
    const k = un([2, 3, 4, 1.5, 0.5, 2.5, -2, -3]);
    const k2 = un([2, 3, 0.5, -2]);
    const u = un(["cm", "cm", "m", "dm"]);
    const A = 4 * entre(1, 9);
    const f = un(["Un triangle", "Un carré", "Un disque", "Un rectangle", "Un hexagone", "Un parallélogramme"]);
    if (Math.random() < 0.5) {
      const q = un(["Quelle est l'aire de la figure image ?", "Combien vaut l'aire de l'image ?", "Que vaut l'aire de la figure obtenue ?"]);
      const c = un(["O", "I", "K"]);
      return court(qu(`${f} a une aire de ${A}${NB}${u}². On lui applique l'homothétie de centre ${c} et de rapport ${mo(k)}, puis celle de même centre et de rapport ${mo(k2)}.\n\n${q}`), A * (k * k2) ** 2, expl(DEF_H, "le rapport de la composée est le produit ; une aire est multipliée par son carré.", `${A} × ${fr(k * k2)}² = ${fr(A * (k * k2) ** 2)}.`, `L'aire est ${fr(A * (k * k2) ** 2)} ${u}².`));
    }
    const ka = Math.abs(k);
    const th = un([30, 45, 60, 90, 120, 150]);
    const q = un(["Quelle est l'aire de la figure image ?", "Combien vaut l'aire de l'image ?", "Que vaut l'aire de la figure obtenue ?"]);
    const c = un(["O", "I", "K"]);
    return court(qu(`${f} a une aire de ${A}${NB}${u}². On lui applique l'homothétie de centre ${c} et de rapport ${mo(ka)}, puis la rotation de centre ${c} et d'angle ${th}°.\n\n${q}`), A * ka * ka, expl(DEF_R, "la rotation conserve les aires, l'homothétie les multiplie par k².", `${A} × ${fr(ka)}² = ${fr(A * ka * ka)}.`, `L'aire est ${fr(A * ka * ka)} ${u}².`));
  }),

  /* ★3 */
  tpl(H, 9, 3, "Le centre de la composée est le point que les deux transformations laissent à sa place.", () => {
    const c = un(["I", "O", "A", "K"]);
    const [a, b] = [entre(-6, 6), entre(-6, 6)];
    const k = un([2, 3, -1, -2, 0.5, 5]);
    const n = 1 - k;
    const [p, q0] = [n * nz(-4, 4), n * nz(-4, 4)];
    const xo = a + p / n;
    const yo = b + q0 / n;
    const [nx, i] = un(COORD);
    const q = un([`Quelle est ${nx} du centre de l'homothétie obtenue ?`, `Que vaut ${nx} du point invariant ?`, `Calcule ${nx} du point qui ne bouge pas.`]);
    return court(qu(`On applique l'homothétie de centre ${pt(c, a, b)} et de rapport ${mo(k)}, puis la translation de vecteur ${pt("u", p, q0)}. La composée est une homothétie de même rapport.\n\n${q}`), i === 0 ? xo : yo, expl("la composée a un seul point invariant : son centre.", `résous x = ${a} + ${fr(k)}(x − ${a}) + ${fr(p)}, et de même pour y.`, `(1 − k)(x − ${a}) = ${fr(p)}.`, `Le centre est (${fr(xo)} ; ${fr(yo)}).`));
  }),
  tpl(H, 10, 3, "Pars de IM' = k IM en vecteurs, coordonnée par coordonnée.", () => {
    const c = un(["I", "O", "A", "K"]);
    const [a, b] = [nz(-5, 5), nz(-5, 5)];
    const [k1, k2] = un([[2, 3], [-2, 3], [2, 2], [3, -1], [-2, -2], [4, 0.5], [2, 1.5], [-3, 2]]);
    const K = k1 * k2;
    const dx = a * (1 - K);
    const dy = b * (1 - K);
    const j = formule(K, dx, K, dy);
    const f = [formule(K, a, K, b), formule(k1 + k2, a * (1 - k1 - k2), k1 + k2, b * (1 - k1 - k2)), formule(K, -dx, K, -dy), formule(-K, dx, -K, dy)];
    const q = un(["Quelle est l'expression de l'image finale (x'' ; y'') d'un point (x ; y) ?", "Quelles formules donnent l'image finale (x'' ; y'') d'un point (x ; y) ?", "Quelle est l'expression analytique de la composée ?"]);
    return qcm(qu(`On applique l'homothétie de centre ${pt(c, a, b)} et de rapport ${mo(k1)}, puis celle de même centre et de rapport ${mo(k2)}.\n\n${q}`), j, f, expl("l'homothétie de centre (a ; b) et de rapport k a pour expression x' = a + k(x − a), y' = b + k(y − b).", "le rapport de la composée est le produit.", `k = ${fr(K)}, donc x'' = ${a} + ${fr(K)}(x − ${a}).`, `On obtient ${j}.`));
  }),
  tpl(H, 11, 3, "Une rotation de 90° autour de l'origine envoie (x ; y) sur (−y ; x) dans le sens direct.", () => {
    const m = un(POINTS);
    const [x, y] = [nz(-8, 8), nz(-8, 8)];
    const k = un([2, 3, -2, 4, 5, -3]);
    const [rx, ry, nom] = un<[number, number, string]>([[-y, x, "d'angle 90° dans le sens direct"], [y, -x, "d'angle 90° dans le sens indirect"], [-x, -y, "d'angle 180°"]]);
    const [nx, i] = un(COORD);
    const q = un([`Quelle est ${nx} de son image finale ?`, `Que vaut ${nx} du point d'arrivée ?`, `Calcule ${nx} de l'image finale de ${m}.`]);
    const av = Math.random() < 0.5;
    const rot = `la rotation de centre O ${nom}`;
    const hom = `l'homothétie de centre O et de rapport ${mo(k)}`;
    return court(qu(`Dans un repère d'origine O, on applique ${av ? rot : hom}, puis ${av ? hom : rot}. Le point de départ est ${pt(m, x, y)}.\n\n${q}`), k * (i === 0 ? rx : ry), expl(DEF_R, "de même centre, ces deux transformations donnent le même résultat dans les deux ordres.", `Après la rotation : (${rx} ; ${ry}) ; on multiplie par ${k}.`, `La réponse est ${k * (i === 0 ? rx : ry)}.`));
  }),
  tpl(H, 12, 3, "Deux coefficients d'affilée : ils se multiplient.", () => {
    const [a, b] = un([[1.5, 2], [2, 0.5], [0.5, 3], [2.5, 2], [4, 0.75], [1.25, 4], [10, 0.5], [0.8, 5], [3, 1.5]]);
    const L = 4 * entre(1, 12);
    const u = un(["mm", "cm"]);
    const q = un(["Quelle est sa longueur à la fin, dans la même unité ?", "Combien mesure-t-il à la fin, dans la même unité ?", "Quelle longueur obtient-on après les deux opérations, dans la même unité ?"]);
    return court(qu(`${un(ZOOMS)}. Un détail mesure ${L}${NB}${u}. L'image est multipliée par un coefficient ${fr(a)}, puis par un coefficient ${fr(b)}, toujours avec le même centre.\n\n${q}`), L * a * b, expl(DEF_H, "multiplie les coefficients.", `${L} × ${fr(a)} × ${fr(b)} = ${fr(L * a * b)}.`, `Le détail mesure ${fr(L * a * b)} ${u}.`));
  }),
  tpl(H, 13, 3, "Une similitude multiplie toutes les longueurs par le même rapport, et conserve les angles.", () => {
    const [p, r, t] = un([["A", "B", "C"], ["E", "F", "G"], ["M", "N", "P"], ["R", "S", "T"]]);
    const k = un([1.5, 2, 3, 0.5, 2.5, 0.75]);
    const ab = 4 * entre(1, 8);
    const bc = 4 * entre(1, 8);
    const ctx = un(SIMILAIRES);
    const debut = `${ctx} : une homothétie, suivie d'une isométrie. Le triangle ${p}${r}${t} devient ${p}'${r}'${t}'.`;
    const k0 = entre(0, 2);
    if (k0 === 0) {
      const q = un([`Combien mesure ${r}'${t}' ?`, `Quelle est la longueur ${r}'${t}' ?`, `Que vaut ${r}'${t}' ?`]);
      return court(qu(`${debut} On a ${p}${r}${NB}=${NB}${ab}${NB}cm, ${p}'${r}'${NB}=${NB}${fr(ab * k)}${NB}cm et ${r}${t}${NB}=${NB}${bc}${NB}cm.\n\n${q}`), bc * k, expl("une similitude multiplie toutes les longueurs par son rapport.", "calcule le rapport sur le côté connu.", `Rapport ${fr(k)} ; ${bc} × ${fr(k)} = ${fr(bc * k)}.`, `${r}'${t}' = ${fr(bc * k)} cm.`));
    }
    if (k0 === 1) {
      const q = un(["Quel est le rapport de cette similitude ?", "Que vaut le rapport de la similitude ?", "Par combien les longueurs sont-elles multipliées ?"]);
      return court(qu(`${debut} On a ${p}${r}${NB}=${NB}${ab}${NB}cm et ${p}'${r}'${NB}=${NB}${fr(ab * k)}${NB}cm.\n\n${q}`), k, expl("le rapport est le quotient d'une longueur image par la longueur de départ.", "divise.", `${fr(ab * k)} ÷ ${ab} = ${fr(k)}.`, `Le rapport est ${fr(k)}.`));
    }
    const an = un([25, 35, 40, 50, 65, 70, 80]);
    const q = un([`Que vaut l'angle en ${p}' du triangle image, en degrés ?`, `Quelle est la mesure de l'angle en ${p}', en degrés ?`]);
    return court(qu(`${debut} Le rapport vaut ${fr(k)}, et l'angle en ${p} mesure ${an}°.\n\n${q}`), an, expl("une similitude conserve les angles.", "le rapport ne change pas les angles.", `L'angle reste ${an}°.`, `L'angle mesure ${an}°.`));
  }),
];
