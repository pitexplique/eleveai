// COURBES ASSOCIÉES : f(x) + k, f(x + k), k f(x), -f(x), |f(x)| (05/11/2026). Hors programme français
// comme objet d'étude (registre `hors_france`). Lignes visées : Suisse gymnase 2.1c, Belgique S6 3.1.4d,
// Sénégal 1re AN 1, Côte d'Ivoire 1re C1-L3.
// Canvas `fonctionGraphique` : la courbe de référence (ligne brisée à sommets entiers) est tracée, les
// courbes proposées portent une lettre mélangée ; le texte ne donne que la formule, jamais la lettre.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, melange, nL, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "courbes_associees", "2de_");
const M1 = "courbe_translation";
const M2 = "courbe_dilatation_abs";

/* ───────────────── courbes ───────────────── */

type Pt = { x: number; y: number };
const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
/** Une ligne brisée de x = -3 à x = 3 : sommets entiers, ordonnées de -3 à 3, jamais alignés. */
function tirerF(opt: { fin?: number[]; deuxSignes?: boolean } = {}): Pt[] {
  for (;;) {
    const milieu = melange([-2, -1, 0, 1, 2]).slice(0, 3).sort((a, b) => a - b);
    const xs = [-3, ...milieu, 3];
    const ys = xs.map(() => entre(-3, 3));
    if (opt.fin) ys[4] = un(opt.fin);
    if (ys.some((y, i) => i > 0 && y === ys[i - 1])) continue;
    const pts = xs.map((x, i) => ({ x, y: ys[i] }));
    const pentes = new Set(pts.slice(1).map((p, i) => (p.y - pts[i].y) / (p.x - pts[i].x)));
    if (pentes.size < 3) continue;
    if (opt.deuxSignes && !(Math.min(...ys) < 0 && Math.max(...ys) > 0)) continue;
    return pts;
  }
}
const COUL = ["#2563eb", "#dc2626", "#059669", "#d97706"];
const REF = "#0f172a";
/** La lettre s'écrit en haut à droite de son point : sa boîte, en unités du repère (24 px par unité). */
const boiteLettre = (p: Pt) => ({ x1: p.x + 0.2, x2: p.x + 1.1, y1: p.y + 0.2, y2: p.y + 0.9 });
/** Distance d'un point à un segment. */
function distSeg(q: Pt, a: Pt, b: Pt) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy);
}
/**
 * Où poser une lettre : le sommet dont la boîte reste le plus loin de TOUTES les courbes, des nombres
 * des axes et des lettres déjà posées (⛔ 05/11/2026, captures à 375 px : le « B » et le « Cf » étaient
 * posés sur une autre courbe).
 */
function ouEtiqueter(pts: Pt[], pris: Pt[], toutes: Pt[][]): Pt {
  const note = (p: Pt) => {
    const b = boiteLettre(p);
    const coins = [{ x: b.x1, y: b.y1 }, { x: b.x2, y: b.y1 }, { x: b.x1, y: b.y2 }, { x: b.x2, y: b.y2 }, { x: (b.x1 + b.x2) / 2, y: (b.y1 + b.y2) / 2 }];
    let d = Infinity;
    for (const c of toutes) for (let i = 1; i < c.length; i++) for (const k of coins) d = Math.min(d, distSeg(k, c[i - 1], c[i]));
    const surAxe = b.y1 < 0 && b.y2 > -1;
    const surOrdonnees = b.x1 < 0 && b.x2 > -1;
    const pres = pris.some((q) => Math.abs(q.x - p.x) < 2 && Math.abs(q.y - p.y) < 1);
    return d - (surAxe ? 1 : 0) - (surOrdonnees ? 1 : 0) - (pres ? 2 : 0);
  };
  const p = [...pts].sort((u, v) => note(v) - note(u))[0];
  pris.push(p);
  return p;
}
function figure(f: Pt[], nomF: string, autres: { id: string; pts: Pt[] }[], cadre: { x: number; y: number } = { x: 7, y: 7 }): CanvasFigure {
  const pris: Pt[] = [];
  const toutes = [f, ...autres.map((a) => a.pts)];
  const reperes = autres.map((a) => ouEtiqueter(a.pts, pris, toutes));
  const repereF = ouEtiqueter(f, pris, toutes);
  return {
    kind: "fonctionGraphique",
    size: { width: 340, height: 340 },
    xmin: -cadre.x,
    xmax: cadre.x,
    ymin: -cadre.y,
    ymax: cadre.y,
    grille: true,
    courbes: [{ id: "f", type: "points", couleur: REF, points: f }, ...autres.map((a, i) => ({ id: a.id, type: "points", couleur: COUL[i], points: a.pts }))],
    points: [
      { x: repereF.x, y: repereF.y, label: `C${nomF}`, couleur: REF },
      ...autres.map((a, i) => ({ x: reperes[i].x, y: reperes[i].y, label: a.id, couleur: COUL[i] })),
    ],
  } as CanvasFigure;
}
const decale = (f: Pt[], dx: number, dy: number) => f.map((p) => ({ x: p.x + dx, y: p.y + dy }));

/* ───────────────── écritures ───────────────── */

const NOMS = [["f", "g"], ["f", "g"], ["f", "h"], ["u", "v"], ["h", "g"]];
const signe = (k: number) => (k < 0 ? `- ${-k}` : `+ ${k}`);
/** La formule « f(x + a) + b » : g(x) = f(x + a) + b. */
const formule = (n: string, a: number, b: number, v = "x") => `${n}(${v}${a ? ` ${signe(a)}` : ""})${b ? ` ${signe(b)}` : ""}`;
const lettre = () => un(["A", "B", "M", "P", "R"]);
const co = (a: number, b: number) => `$(${a}\\,;${b})$`;
const unites = (k: number) => `$${k}$ ${k === 1 ? "unité" : "unités"}`;
const SENS = (a: number, b: number) => (a ? `vers la ${a > 0 ? "gauche" : "droite"}` : `vers le ${b > 0 ? "haut" : "bas"}`);

const DEF_T = "la courbe de $x \\mapsto f(x) + k$ est celle de $f$ translatée de $k$ unités verticalement ; la courbe de $x \\mapsto f(x + k)$ est celle de $f$ translatée de $k$ unités vers la gauche : $g(x - k) = f(x)$.";
const DEF_D = "la courbe de $k f$ a les mêmes abscisses que celle de $f$ et ses ordonnées multipliées par $k$ ; celle de $-f$ est sa symétrique par rapport à l'axe des abscisses ; celle de $|f|$ garde ce qui est au-dessus de cet axe et renvoie au-dessus, par symétrie, ce qui est dessous.";

/* ───── k f(x), -f(x), |f(x)| ───── */

type Tr = { t: (n: string) => string; v: (y: number) => number };
const fK = (k: number): Tr => ({ t: (n) => `${k === -1 ? "-" : k}${n}(x)`, v: (y) => k * y });
const DEMI: Tr = { t: (n) => `\\dfrac{1}{2}${n}(x)`, v: (y) => y / 2 };
const ABS: Tr = { t: (n) => `\\left|${n}(x)\\right|`, v: (y) => Math.abs(y) };
const tiresD = () => un([fK(2), fK(3), fK(-1), fK(-2), DEMI, ABS, fK(-1), ABS]);

/* ───────────────── situations ───────────────── */

type Evo = { qui: string; objet: string; tU: string; vU: string; autre: string };
const EVOS: Evo[] = [
  { qui: "Un drone suit un parcours programmé.", objet: "son altitude", tU: "minutes", vU: "m", autre: "Un second drone suit le même parcours" },
  { qui: "Un port note la marée.", objet: "la hauteur d'eau", tU: "heures", vU: "m", autre: "Dans un port voisin, la marée suit la même courbe" },
  { qui: "Une serre est surveillée.", objet: "la température", tU: "heures", vU: "degrés", autre: "Dans une seconde serre, la température suit la même courbe" },
  { qui: "Une coureuse porte un capteur.", objet: "son pouls", tU: "minutes", vU: "battements par minute", autre: "Son coéquipier, sur le même parcours, a un pouls qui suit la même courbe" },
  { qui: "Un ascenseur dessert une tour.", objet: "son altitude", tU: "secondes", vU: "m", autre: "Un second ascenseur fait le même trajet" },
  { qui: "Une usine suit sa production.", objet: "le nombre de pièces produites par heure", tU: "heures", vU: "pièces par heure", autre: "Une seconde chaîne suit la même courbe" },
  { qui: "Une ingénieure du son règle un concert.", objet: "le volume sonore", tU: "minutes", vU: "décibels", autre: "Dans la salle voisine, le volume suit la même courbe" },
  { qui: "Un train roule sur une ligne.", objet: "sa vitesse", tU: "minutes", vU: "km/h", autre: "Le train suivant roule selon la même courbe" },
  { qui: "Une biologiste suit une culture.", objet: "la taille de la culture", tU: "jours", vU: "mm", autre: "Une seconde culture suit la même courbe" },
  { qui: "Une station météo mesure le vent.", objet: "la vitesse du vent", tU: "heures", vU: "km/h", autre: "Dans la vallée voisine, le vent suit la même courbe" },
];

type Sit = { s: (a: number, b: number) => string; genre: "fois" | "oppose" | "ecart" };
const SITS: Sit[] = [
  { genre: "fois", s: (a, b) => `Un micro envoie un signal : $f(t)$ est sa tension à l'instant $t$, et $f(${a}) = ${b}$. Un amplificateur multiplie ce signal par K : on note $g(t)$ la tension de sortie.` },
  { genre: "fois", s: (a, b) => `$f(x)$ est la quantité de farine, en kg, d'une recette pour le jour $x$, et $f(${a}) = ${b}$. Une boulangerie multiplie toutes les quantités par K : on note $g(x)$ la nouvelle quantité.` },
  { genre: "fois", s: (a, b) => `$f(x)$ est la hauteur d'un point d'un dessin, à l'abscisse $x$, et $f(${a}) = ${b}$. Une graphiste étire le dessin en multipliant toutes les hauteurs par K : on note $g(x)$ la nouvelle hauteur.` },
  { genre: "fois", s: (a, b) => `$f(t)$ est le déplacement d'un capteur sismique, en mm, à l'instant $t$, et $f(${a}) = ${b}$. Le sismographe trace ce déplacement multiplié par K : on note $g(t)$ le tracé.` },
  { genre: "fois", s: (a, b) => `$f(x)$ est la dose d'un soin, en mL, pour le jour $x$, et $f(${a}) = ${b}$. Une vétérinaire multiplie cette dose par K pour un grand animal : on note $g(x)$ la nouvelle dose.` },
  { genre: "oppose", s: (a, b) => `$f(t)$ est l'altitude d'une plongeuse, en m, à l'instant $t$ (négative sous l'eau), et $f(${a}) = ${b}$. Sa profondeur $g(t)$ est l'opposé de son altitude.` },
  { genre: "oppose", s: (a, b) => `$f(t)$ est la température d'un congélateur par rapport à zéro, et $f(${a}) = ${b}$. Un thermomètre mal branché affiche $g(t)$, l'opposé de cette valeur.` },
  { genre: "oppose", s: (a, b) => `$f(x)$ est l'altitude d'un point d'un sous-marin à l'abscisse $x$, et $f(${a}) = ${b}$. La carte marine indique $g(x)$, l'opposé de cette altitude.` },
  { genre: "oppose", s: (a, b) => `$f(t)$ est la vitesse d'un robot sur un rail, à l'instant $t$, et $f(${a}) = ${b}$. Un second robot va toujours en sens contraire : sa vitesse $g(t)$ est l'opposé de celle du premier.` },
  { genre: "ecart", s: (a, b) => `$f(t)$ est l'écart à l'heure d'un bus, en minutes, au point $t$ (négatif s'il est en retard), et $f(${a}) = ${b}$. La compagnie retient $g(t)$, la valeur absolue de cet écart.` },
  { genre: "ecart", s: (a, b) => `$f(x)$ est l'erreur d'une machine, en mm, sur la pièce $x$ (positive ou négative), et $f(${a}) = ${b}$. Le contrôle retient $g(x)$, la valeur absolue de cette erreur.` },
  { genre: "ecart", s: (a, b) => `$f(t)$ est l'écart entre la température d'un four et sa consigne, à l'instant $t$, et $f(${a}) = ${b}$. Le technicien regarde $g(t)$, la valeur absolue de cet écart.` },
  { genre: "ecart", s: (a, b) => `$f(x)$ est la position d'une archère par rapport au centre de la cible, sur la flèche $x$, et $f(${a}) = ${b}$. L'entraîneur note $g(x)$, la distance au centre : la valeur absolue de cette position.` },
];

/* ───────────────── banque ───────────────── */

export const courbesAssocieesBank: TutorBankItemV4[] = [
  /* ─────────────── courbe_translation ─────────────── */
  tpl(M1, 1, 1, "Un + hors de la parenthèse monte ; un + dans la parenthèse fait aller à gauche.", () => {
    const [f, g] = un(NOMS);
    const k = entre(1, 5);
    const { a, b } = un([{ a: 0, b: k }, { a: 0, b: -k }, { a: k, b: 0 }, { a: -k, b: 0 }]);
    const tr = (s: string) => `Une translation de ${unites(k)} ${s}`;
    return qcm(
      `On pose $${g}(x) = ${formule(f, a, b)}$. ${un([`Comment passe-t-on de la courbe de $${f}$ à celle de $${g}$ ?`, `Quelle transformation envoie la courbe de $${f}$ sur celle de $${g}$ ?`, `Comment la courbe de $${g}$ se déduit-elle de celle de $${f}$ ?`, `Quel décalage subit la courbe de $${f}$ pour donner celle de $${g}$ ?`, `Dans quel sens la courbe de $${f}$ est-elle décalée pour donner celle de $${g}$ ?`, `Quelle translation transforme la courbe de $${f}$ en celle de $${g}$ ?`, `Que fait-on subir à la courbe de $${f}$ pour obtenir celle de $${g}$ ?`, `Quelle phrase décrit le passage de la courbe de $${f}$ à celle de $${g}$ ?`])}`,
      tr(SENS(a, b)),
      [tr("vers le haut"), tr("vers le bas"), tr("vers la droite"), tr("vers la gauche")],
      expl(DEF_T, a ? "le nombre est dans la parenthèse : le décalage est horizontal, et de sens contraire à son signe." : "le nombre est hors de la parenthèse : le décalage est vertical, dans le sens de son signe.", `$${g}(x) = ${formule(f, a, b)}$.`, `${tr(SENS(a, b)).toLowerCase()}.`),
    );
  }),
  tpl(M1, 2, 1, "Hors de la parenthèse : on ajoute à l'ordonnée, l'abscisse ne bouge pas.", () => {
    const [f, g] = un(NOMS);
    const A = lettre();
    const x0 = nz(-5, 5);
    const y0 = nz(-5, 5);
    const k = nz(-5, 5);
    return qcm(
      `La courbe de $${f}$ passe par $${A}(${x0}\\,;${y0})$. On pose $${g}(x) = ${formule(f, 0, k)}$. ${un([`Par quel point passe alors la courbe de $${g}$ ?`, `Quel point est sur la courbe de $${g}$ ?`, `Où $${A}$ arrive-t-il sur la courbe de $${g}$ ?`, `Quelle est l'image de $${A}$ sur la courbe de $${g}$ ?`, `Quel point de la courbe de $${g}$ correspond à $${A}$ ?`, `Parmi ces points, lequel appartient à la courbe de $${g}$ ?`])}`,
      co(x0, y0 + k),
      [co(x0, y0 - k), co(x0 + k, y0), co(x0 - k, y0), co(y0, x0 + k), co(x0 + k, y0 + k)],
      expl(DEF_T, "même abscisse ; on ajoute le nombre à l'ordonnée.", `$${g}(${x0}) = ${f}(${x0}) ${signe(k)} = ${y0 + k}$.`, `la courbe passe par $(${x0}\\,;${y0 + k})$.`),
    );
  }),
  tpl(M1, 3, 1, "Remplace x par la valeur donnée, puis utilise ce que tu sais de f.", () => {
    const [f, g] = un(NOMS);
    const x0 = nz(-6, 6);
    const y0 = nz(-9, 9);
    const k = nz(-6, 6);
    return court(
      `${un(["On sait que", "On donne", "Soit une fonction telle que", "On connaît"])} $${f}(${x0}) = ${y0}$. ${un(["On pose", "Soit", "On définit"])} $${g}(x) = ${formule(f, 0, k)}$. ${un([`Que vaut $${g}(${x0})$ ?`, `Calcule $${g}(${x0})$.`, `Quelle est l'image de $${x0}$ par $${g}$ ?`, `Donne $${g}(${x0})$.`, `Quelle est la valeur de $${g}(${x0})$ ?`, `Déduis-en $${g}(${x0})$.`])}`,
      y0 + k,
      expl(DEF_T, "on remplace $x$ par la valeur donnée.", `$${g}(${x0}) = ${f}(${x0}) ${signe(k)} = ${y0} ${signe(k)} = ${y0 + k}$.`, `$${g}(${x0}) = ${y0 + k}$.`),
    );
  }),
  tpl(M1, 4, 2, "Cherche d'abord si le décalage est horizontal ou vertical, puis son sens.", () => {
    const [nf, ng] = un(NOMS);
    const f = tirerF();
    const k = entre(2, 3);
    const cas = melange([{ a: k, b: 0 }, { a: -k, b: 0 }, { a: 0, b: k }, { a: 0, b: -k }]);
    const L = ["A", "B", "C", "D"];
    const juste = entre(0, 3);
    const c = cas[juste];
    return qcm(
      `On a tracé la courbe de $${nf}$ (notée C${nf}) et quatre autres courbes. On pose $${ng}(x) = ${formule(nf, c.a, c.b)}$. ${un([`Laquelle est la courbe de $${ng}$ ?`, `Quelle lettre porte la courbe de $${ng}$ ?`, `Repère la courbe de $${ng}$.`, `Quelle courbe représente $${ng}$ ?`, `Parmi les quatre courbes, laquelle représente $${ng}$ ?`, `Laquelle de ces courbes convient pour $${ng}$ ?`])}`,
      `La courbe ${L[juste]}`,
      L.filter((_, i) => i !== juste).map((l) => `La courbe ${l}`),
      expl(DEF_T, c.a ? "le nombre est dans la parenthèse : décalage horizontal, de sens contraire à son signe." : "le nombre est hors de la parenthèse : décalage vertical.", `la courbe de $${nf}$ est décalée de $${k}$ unités ${SENS(c.a, c.b)}.`, `c'est la courbe ${L[juste]}.`),
      figure(f, nf, cas.map((x, i) => ({ id: L[i], pts: decale(f, -x.a, x.b) }))),
    );
  }),
  tpl(M1, 5, 2, "Dans la parenthèse, le signe trompe : f(x + 3) va à gauche.", () => {
    const [f, g] = un(NOMS);
    const A = lettre();
    const x0 = nz(-5, 5);
    const y0 = nz(-5, 5);
    const k = nz(-5, 5);
    return qcm(
      `La courbe de $${f}$ passe par $${A}(${x0}\\,;${y0})$. On pose $${g}(x) = ${formule(f, k, 0)}$. ${un([`Par quel point passe alors la courbe de $${g}$ ?`, `Quel point est sur la courbe de $${g}$ ?`, `Où $${A}$ arrive-t-il sur la courbe de $${g}$ ?`, `Quelle est l'image de $${A}$ sur la courbe de $${g}$ ?`, `Quel point de la courbe de $${g}$ correspond à $${A}$ ?`, `Parmi ces points, lequel appartient à la courbe de $${g}$ ?`])}`,
      co(x0 - k, y0),
      [co(x0 + k, y0), co(x0, y0 + k), co(x0, y0 - k), co(y0, x0 - k), co(x0 - k, y0 + k)],
      expl(DEF_T, "on cherche $x$ tel que ce qui est dans la parenthèse vaille l'abscisse connue.", `$x ${signe(k)} = ${x0}$ donne $x = ${x0 - k}$ : $${g}(${x0 - k}) = ${f}(${x0}) = ${y0}$.`, `la courbe passe par $(${x0 - k}\\,;${y0})$.`),
    );
  }),
  tpl(M1, 6, 2, "Calcule d'abord ce qui est dans la parenthèse.", () => {
    const [f, g] = un(NOMS);
    const x0 = nz(-6, 6);
    const y0 = nz(-9, 9);
    const k = nz(-6, 6);
    const genre = entre(0, 1);
    const q = genre
      ? un([`Que vaut $${g}(${x0 - k})$ ?`, `Calcule $${g}(${x0 - k})$.`, `Quelle est l'image de $${x0 - k}$ par $${g}$ ?`, `Donne $${g}(${x0 - k})$.`, `Quelle est la valeur de $${g}(${x0 - k})$ ?`, `Déduis-en $${g}(${x0 - k})$.`])
      : un([`Pour quelle valeur de $x$ est-on sûr que $${g}(x) = ${y0}$ ?`, `Quel nombre a $${y0}$ pour image par $${g}$, grâce à cette égalité ?`, `Quelle abscisse donne, sur la courbe de $${g}$, le point correspondant à celui de $${f}$ ?`, `Sur la courbe de $${g}$, à quelle abscisse se trouve le point d'ordonnée $${y0}$ qui vient de $${f}$ ?`]);
    return court(
      `${un(["On sait que", "On donne", "On connaît"])} $${f}(${x0}) = ${y0}$. ${un(["On pose", "Soit", "On définit"])} $${g}(x) = ${formule(f, k, 0)}$. ${q}`,
      genre ? y0 : x0 - k,
      expl(DEF_T, "on cherche ce qui donne l'abscisse connue dans la parenthèse.", `$${x0 - k} ${signe(k)} = ${x0}$, donc $${g}(${x0 - k}) = ${f}(${x0}) = ${y0}$.`, genre ? `la valeur est $${y0}$.` : `$x = ${x0 - k}$.`),
    );
  }),
  tpl(M1, 7, 2, "Mesure le décalage entre les deux courbes, puis traduis-le dans la formule.", () => {
    const [nf, ng] = un(NOMS);
    const f = tirerF();
    const k = entre(2, 3);
    const c = un([{ a: k, b: 0 }, { a: -k, b: 0 }, { a: 0, b: k }, { a: 0, b: -k }]);
    const F = (a: number, b: number) => `$${ng}(x) = ${formule(nf, a, b)}$`;
    return qcm(
      `Sur la figure, C${nf} est la courbe de $${nf}$ et la courbe A celle de $${ng}$. ${un([`Quelle formule définit $${ng}$ ?`, `Comment s'écrit $${ng}(x)$ à partir de $${nf}$ ?`, `Quelle expression de $${ng}(x)$ convient ?`, `Choisis l'écriture de $${ng}(x)$.`, `Traduis ce décalage : que vaut $${ng}(x)$ ?`])}`,
      F(c.a, c.b),
      [F(k, 0), F(-k, 0), F(0, k), F(0, -k)],
      expl(DEF_T, "on mesure le décalage d'un sommet entre les deux courbes.", `les sommets sont décalés de $${k}$ unités ${SENS(c.a, c.b)}.`, `$${ng}(x) = ${formule(nf, c.a, c.b)}$.`),
      figure(f, nf, [{ id: "A", pts: decale(f, -c.a, c.b) }]),
    );
  }),
  tpl(M1, 8, 3, "Sépare les deux décalages : l'horizontal dans la parenthèse (signe contraire), le vertical dehors.", () => {
    const [nf, ng] = un(NOMS);
    const f = tirerF();
    const a = nz(-3, 3);
    const b = nz(-3, 3);
    // Sans « g(x) = » : à 375 px, la proposition laissait son dernier nombre seul à la ligne.
    const F = (p: number, r: number) => `$${formule(nf, p, r)}$`;
    return qcm(
      `Sur la figure, C${nf} est la courbe de $${nf}$ et la courbe A celle de $${ng}$. ${un([`Quelle formule définit $${ng}$ ?`, `Comment s'écrit $${ng}(x)$ à partir de $${nf}$ ?`, `Quelle expression de $${ng}(x)$ convient ?`, `Choisis l'écriture de $${ng}(x)$.`, `La courbe a bougé dans les deux sens : que vaut $${ng}(x)$ ?`, `Quelle écriture de $${ng}(x)$ traduit ce double décalage ?`])}`,
      F(a, b),
      [F(-a, b), F(a, -b), F(-a, -b), F(b, a), F(-b, -a)],
      expl(DEF_T, "on suit un sommet : son décalage horizontal et son décalage vertical.", `décalage de $${Math.abs(a)}$ ${SENS(a, 0)} et de $${Math.abs(b)}$ ${SENS(0, b)}.`, `$${ng}(x) = ${formule(nf, a, b)}$.`),
      figure(f, nf, [{ id: "A", pts: decale(f, -a, b) }]),
    );
  }),
  tpl(M1, 9, 3, "Le sommet de la courbe de référence est à l'origine : suis-le dans le décalage.", () => {
    const a = nz(-6, 6);
    const b = nz(-6, 6);
    const ref = un([{ f: "x^2", g: (s: string) => `(x ${s})^2`, n: "parabole" }, { f: "\\left|x\\right|", g: (s: string) => `\\left|x ${s}\\right|`, n: "courbe en V" }]);
    const n = un(["g", "h", "k"]);
    return qcm(
      `La ${ref.n} d'équation $y = ${ref.f}$ a son sommet à l'origine. On pose $${n}(x) = ${ref.g(signe(-a))} ${signe(b)}$. ${un([`Quelles sont les coordonnées du sommet de la courbe de $${n}$ ?`, `Où se trouve le sommet de la courbe de $${n}$ ?`, `Quel est le sommet de la courbe de $${n}$ ?`, `En quel point la courbe de $${n}$ atteint-elle son minimum ?`, `Quel est le point le plus bas de la courbe de $${n}$ ?`, `Quel point devient l'image de l'origine ?`])}`,
      co(a, b),
      [co(-a, b), co(a, -b), co(-a, -b), co(b, a), co(-b, -a)],
      expl(DEF_T, "le nombre dans la parenthèse décale horizontalement, à l'opposé de son signe ; l'autre décale verticalement.", `la parenthèse s'annule pour $x = ${a}$ ; il reste $${b}$.`, `le sommet est $(${a}\\,;${b})$.`),
    );
  }),
  tpl(M1, 10, 3, "Vers la droite : on retire dans la parenthèse. Vers le haut : on ajoute dehors.", () => {
    const a = entre(2, 6);
    const b = entre(2, 6);
    const da = un([1, -1]);
    const db = un([1, -1]);
    const ref = un([{ f: "x^2", g: (s: string) => `(x ${s})^2` }, { f: "\\left|x\\right|", g: (s: string) => `\\left|x ${s}\\right|` }]);
    const n = un(["g", "h"]);
    const F = (p: number, r: number) => `$${n}(x) = ${ref.g(signe(p))} ${signe(r)}$`;
    return qcm(
      `On décale la courbe de $f(x) = ${ref.f}$ de ${unites(a)} vers la ${da > 0 ? "droite" : "gauche"} et de ${unites(b)} vers le ${db > 0 ? "haut" : "bas"}. ${un([`Quelle fonction $${n}$ obtient-on ?`, `Quelle formule définit la nouvelle fonction $${n}$ ?`, `Comment s'écrit $${n}(x)$ ?`, `Quelle expression de $${n}(x)$ correspond à la nouvelle courbe ?`, `Choisis l'écriture de $${n}(x)$.`, `Quelle est la fonction $${n}$ de cette nouvelle courbe ?`])}`,
      F(-da * a, db * b),
      [F(da * a, db * b), F(-da * a, -db * b), F(da * a, -db * b), F(-db * b, da * a), F(db * b, -da * a)],
      expl(DEF_T, "le décalage horizontal va dans la parenthèse, de signe contraire ; le vertical va dehors.", `droite ou gauche : $x ${signe(-da * a)}$ ; haut ou bas : $${signe(db * b)}$.`, `${F(-da * a, db * b)}.`),
    );
  }),
  tpl(M1, 11, 3, "Plus tard : la même valeur arrive pour un t plus grand, donc on retire dans la parenthèse.", () => {
    const c = un(EVOS);
    const k = entre(2, 9);
    const cas = un([
      { a: -k, b: 0, s: `mais ${k} ${c.tU} plus tard` },
      { a: k, b: 0, s: `mais ${k} ${c.tU} plus tôt` },
      { a: 0, b: k, s: `avec ${k} ${c.vU} de plus` },
      { a: 0, b: -k, s: `avec ${k} ${c.vU} de moins` },
    ]);
    const F = (a: number, b: number) => `$g(t) = ${formule("f", a, b, "t")}$`;
    return qcm(
      `${c.qui} On note $f(t)$ ${c.objet} à l'instant $t$, en ${c.tU}. ${c.autre}, ${cas.s}. ${un(["Quelle formule donne $g(t)$, sa valeur à l'instant $t$ ?", "Si $g(t)$ est sa valeur à l'instant $t$, que vaut $g(t)$ ?", "On note $g(t)$ sa valeur à l'instant $t$. Quelle formule convient ?", "Quelle expression de $g(t)$, sa valeur à l'instant $t$, est juste ?"])}`,
      F(cas.a, cas.b),
      [F(k, 0), F(-k, 0), F(0, k), F(0, -k)],
      expl(DEF_T, "un retard ou une avance agit dans la parenthèse ; un écart de valeur agit dehors.", `${cas.s} : $g(t) = ${formule("f", cas.a, cas.b, "t")}$.`, `${F(cas.a, cas.b)}.`),
    );
  }),

  /* ─────────────── courbe_dilatation_abs ─────────────── */
  tpl(M2, 1, 1, "Regarde ce qui arrive aux ordonnées : multipliées, opposées, ou rendues positives.", () => {
    const [f, g] = un(NOMS);
    const SX = `La symétrique de la courbe de $${f}$ par rapport à l'axe des abscisses`;
    const SY = `La symétrique de la courbe de $${f}$ par rapport à l'axe des ordonnées`;
    const ORD = (k: string) => `La courbe de $${f}$ dont les ordonnées sont multipliées par $${k}$`;
    const ABSC = (k: string) => `La courbe de $${f}$ dont les abscisses sont multipliées par $${k}$`;
    const TR = (k: string) => `La courbe de $${f}$ translatée de $${k}$ unités vers le haut`;
    const REPLI = `La courbe de $${f}$ où ce qui est sous l'axe des abscisses passe au-dessus par symétrie`;
    const EFF = `La courbe de $${f}$ où ce qui est sous l'axe des abscisses est effacé`;
    const c = un([
      { e: `-${f}(x)`, j: SX, x: [SY, EFF, TR("1"), ORD("2")] },
      { e: `\\left|${f}(x)\\right|`, j: REPLI, x: [EFF, SX, SY, TR("1")] },
      { e: `2${f}(x)`, j: ORD("2"), x: [ABSC("2"), TR("2"), SX, REPLI] },
      { e: `3${f}(x)`, j: ORD("3"), x: [ABSC("3"), TR("3"), SY, EFF] },
      { e: `\\dfrac{1}{2}${f}(x)`, j: ORD("\\dfrac{1}{2}"), x: [ABSC("\\dfrac{1}{2}"), TR("2"), SX, REPLI] },
    ]);
    return qcm(
      `On pose $${g}(x) = ${c.e}$. ${un([`Comment obtient-on la courbe de $${g}$ ?`, `Quelle est la courbe de $${g}$ ?`, `Comment la courbe de $${g}$ se déduit-elle de celle de $${f}$ ?`, `Quelle phrase décrit la courbe de $${g}$ ?`, `Que devient la courbe de $${f}$ pour donner celle de $${g}$ ?`, `Quelle transformation donne la courbe de $${g}$ à partir de celle de $${f}$ ?`, `À quoi ressemble la courbe de $${g}$ ?`])}`,
      c.j,
      c.x,
      expl(DEF_D, "l'opération s'applique au résultat $f(x)$ : seules les ordonnées changent.", `$${g}(x) = ${c.e}$.`, `${c.j.charAt(0).toLowerCase()}${c.j.slice(1)}.`),
    );
  }),
  tpl(M2, 2, 1, "L'abscisse ne change pas ; applique l'opération à l'ordonnée.", () => {
    const [f, g] = un(NOMS);
    const A = lettre();
    const x0 = nz(-5, 5);
    const y0 = 2 * nz(-4, 4);
    const t = tiresD();
    const r = t.v(y0);
    return qcm(
      `La courbe de $${f}$ passe par $${A}(${x0}\\,;${y0})$. On pose $${g}(x) = ${t.t(f)}$. ${un([`Par quel point passe alors la courbe de $${g}$ ?`, `Quel point est sur la courbe de $${g}$ ?`, `Où $${A}$ arrive-t-il sur la courbe de $${g}$ ?`, `Quel point de la courbe de $${g}$ correspond à $${A}$ ?`, `Parmi ces points, lequel appartient à la courbe de $${g}$ ?`, `Quelle est l'image de $${A}$ sur la courbe de $${g}$ ?`])}`,
      co(x0, r),
      [co(r, y0), co(x0, r + 1), co(x0, -r), co(-x0, y0), co(x0, y0 + 2), co(x0 * 2, y0), co(x0, r - 1)].filter((c) => c !== co(x0, r)),
      expl(DEF_D, "même abscisse ; l'opération s'applique à l'ordonnée.", `$${g}(${x0}) = ${t.t(f).replace("(x)", `(${x0})`)} = ${r}$.`, `la courbe passe par $(${x0}\\,;${r})$.`),
    );
  }),
  tpl(M2, 3, 1, "Remplace x, puis applique l'opération à la valeur de f.", () => {
    const [f, g] = un(NOMS);
    const x0 = nz(-6, 6);
    const y0 = 2 * nz(-5, 5);
    const t = tiresD();
    const r = t.v(y0);
    return court(
      `${un(["On sait que", "On donne", "Soit une fonction telle que", "On connaît"])} $${f}(${x0}) = ${y0}$. ${un(["On pose", "Soit", "On définit"])} $${g}(x) = ${t.t(f)}$. ${un([`Que vaut $${g}(${x0})$ ?`, `Calcule $${g}(${x0})$.`, `Quelle est l'image de $${x0}$ par $${g}$ ?`, `Donne $${g}(${x0})$.`, `Quelle est la valeur de $${g}(${x0})$ ?`, `Déduis-en $${g}(${x0})$.`])}`,
      r,
      expl(DEF_D, "on remplace $x$, puis on applique l'opération.", `$${g}(${x0}) = ${t.t(f).replace("(x)", `(${x0})`)} = ${r}$.`, `$${g}(${x0}) = ${r}$.`),
    );
  }),
  tpl(M2, 4, 2, "Compare les ordonnées d'un même sommet, puis regarde les passages sous l'axe.", () => {
    const [nf, ng] = un(NOMS);
    const f = tirerF({ fin: [2, 3], deuxSignes: true });
    const cas = melange([fK(2), fK(-1), DEMI, ABS]);
    const L = ["A", "B", "C", "D"];
    const juste = entre(0, 3);
    return qcm(
      `On a tracé la courbe de $${nf}$ (notée C${nf}) et quatre autres courbes. On pose $${ng}(x) = ${cas[juste].t(nf)}$. ${un([`Laquelle est la courbe de $${ng}$ ?`, `Quelle lettre porte la courbe de $${ng}$ ?`, `Repère la courbe de $${ng}$.`, `Quelle courbe représente $${ng}$ ?`, `Parmi les quatre courbes, laquelle représente $${ng}$ ?`, `Laquelle de ces courbes convient pour $${ng}$ ?`])}`,
      `La courbe ${L[juste]}`,
      L.filter((_, i) => i !== juste).map((l) => `La courbe ${l}`),
      expl(DEF_D, "on suit un sommet : son abscisse ne bouge pas, on calcule sa nouvelle ordonnée.", `pour le sommet d'abscisse $${f[4].x}$ : $${nf}(${f[4].x}) = ${f[4].y}$, et $${ng}(${f[4].x}) = ${nL(cas[juste].v(f[4].y))}$.`, `c'est la courbe ${L[juste]}.`),
      figure(f, nf, cas.map((t, i) => ({ id: L[i], pts: f.map((p) => ({ x: p.x, y: t.v(p.y) })) })), { x: 4, y: 7 }),
    );
  }),
  tpl(M2, 5, 2, "Lis deux sommets : que devient leur ordonnée ?", () => {
    const [nf, ng] = un(NOMS);
    const f = tirerF({ fin: [2, 3], deuxSignes: true });
    const tous = [fK(2), fK(3), fK(-1), fK(-2), DEMI, ABS];
    const t = un([fK(2), fK(-1), fK(-2), DEMI, ABS]);
    const F = (x: Tr) => `$${ng}(x) = ${x.t(nf)}$`;
    return qcm(
      `Sur la figure, C${nf} est la courbe de $${nf}$ et la courbe A celle de $${ng}$. ${un([`Quelle formule définit $${ng}$ ?`, `Comment s'écrit $${ng}(x)$ à partir de $${nf}$ ?`, `Quelle expression de $${ng}(x)$ convient ?`, `Choisis l'écriture de $${ng}(x)$.`, `Que vaut $${ng}(x)$ d'après la figure ?`])}`,
      F(t),
      tous.map(F),
      expl(DEF_D, "on compare l'ordonnée de chaque sommet sur les deux courbes.", `au sommet d'abscisse $${f[4].x}$ : $${f[4].y}$ devient $${nL(t.v(f[4].y))}$.`, `$${ng}(x) = ${t.t(nf)}$.`),
      figure(f, nf, [{ id: "A", pts: f.map((p) => ({ x: p.x, y: t.v(p.y) })) }], { x: 4, y: 7 }),
    );
  }),
  tpl(M2, 6, 2, "Multiplier par un nombre positif garde le maximum en haut ; l'opposé échange maximum et minimum.", () => {
    const [f, g] = un(NOMS);
    const M = entre(1, 7);
    const m = nz(-7, M - 1);
    const a = entre(-6, -1);
    const b = entre(1, 6);
    const t = un([fK(2), fK(3), fK(-1), ABS]);
    const k = t === ABS ? "maximum" : un(["maximum", "minimum"]);
    const vs = [t.v(M), t.v(m)];
    const r = k === "maximum" ? Math.max(...vs) : Math.min(...vs);
    return court(
      `Sur $[${a}\\,;${b}]$, la fonction $${f}$ a pour maximum $${M}$ et pour minimum $${m}$. On pose $${g}(x) = ${t.t(f)}$. ${un([`Quel est le ${k} de $${g}$ sur cet intervalle ?`, `Que vaut le ${k} de $${g}$ sur cet intervalle ?`, `Donne le ${k} de $${g}$ sur cet intervalle.`, `Sur cet intervalle, combien vaut le ${k} de $${g}$ ?`, `Déduis-en le ${k} de $${g}$ sur cet intervalle.`, `Détermine le ${k} de $${g}$ sur cet intervalle.`])}`,
      r,
      expl(DEF_D, "on applique l'opération au maximum et au minimum de $f$, puis on compare.", `ils deviennent $${t.v(M)}$ et $${t.v(m)}$.`, `le ${k} de $${g}$ est $${r}$.`),
    );
  }),
  tpl(M2, 7, 3, "La valeur absolue est nulle là où ce qu'elle contient s'annule.", () => {
    const g = un(["g", "h", "k"]);
    const a = un([2, 3, 4, 5, -2, -3]);
    const r = nz(-6, 6);
    const b = -a * r;
    const e = `\\left|${a}x ${signe(b)}\\right|`;
    const x0 = r + nz(-3, 3);
    const genre = entre(0, 1);
    const q = genre
      ? un([`Que vaut $${g}(${x0})$ ?`, `Calcule $${g}(${x0})$.`, `Quelle est l'image de $${x0}$ par $${g}$ ?`, `Donne la valeur de $${g}(${x0})$.`, `Combien vaut $${g}(${x0})$ ?`])
      : un([`En quelle abscisse la courbe de $${g}$ touche-t-elle l'axe des abscisses ?`, `Pour quelle valeur de $x$ la courbe de $${g}$ touche-t-elle l'axe des abscisses ?`, `Quelle est l'abscisse de la pointe de cette courbe, là où $${g}$ s'annule ?`, `Pour quelle valeur de $x$ la fonction $${g}$ s'annule-t-elle ?`, `Où se situe le point le plus bas de la courbe de $${g}$ (donne son abscisse) ?`]);
    const v = genre ? Math.abs(a * x0 + b) : r;
    return court(
      `On pose $${g}(x) = ${e}$. ${q}`,
      v,
      expl(DEF_D, genre ? "on calcule ce qui est dans la valeur absolue, puis on prend sa valeur positive." : "on résout : ce qui est dans la valeur absolue vaut $0$.", genre ? `$\\left|${a} \\times ${x0 < 0 ? `(${x0})` : x0} ${signe(b)}\\right| = ${v}$.` : `$${a}x ${signe(b)} = 0$ donne $x = ${r}$.`, `la réponse est $${v}$.`),
    );
  }),
  tpl(M2, 8, 3, "Un multiplicateur négatif échange le maximum et le minimum.", () => {
    const [f, g] = un(NOMS);
    const M = 2 * entre(1, 4);
    const m = 2 * nz(-4, M / 2 - 1);
    const a = entre(-6, -1);
    const b = entre(1, 6);
    const t = un([fK(-2), fK(-3), DEMI, ABS, fK(-1)]);
    const k = t === ABS ? "maximum" : un(["maximum", "minimum"]);
    const vs = [t.v(M), t.v(m)];
    const r = k === "maximum" ? Math.max(...vs) : Math.min(...vs);
    return court(
      `${un([`Sur $[${a}\\,;${b}]$, la fonction $${f}$ varie entre son minimum $${m}$ et son maximum $${M}$.`, `On étudie $${f}$ sur $[${a}\\,;${b}]$ : son minimum est $${m}$, son maximum est $${M}$.`, `La fonction $${f}$, sur $[${a}\\,;${b}]$, a pour minimum $${m}$ et pour maximum $${M}$.`])} On pose $${g}(x) = ${t.t(f)}$. ${un([`Quel est le ${k} de $${g}$ sur cet intervalle ?`, `Que vaut le ${k} de $${g}$ sur cet intervalle ?`, `Donne le ${k} de $${g}$ sur cet intervalle.`, `Déduis-en le ${k} de $${g}$ sur cet intervalle.`])}`,
      r,
      expl(DEF_D, "on applique l'opération au maximum et au minimum de $f$, puis on compare les deux résultats.", `ils deviennent $${t.v(M)}$ et $${t.v(m)}$.`, `le ${k} de $${g}$ est $${r}$.`),
    );
  }),
  tpl(M2, 9, 3, "Traduis la situation : on multiplie, on prend l'opposé, ou la valeur absolue ?", () => {
    const c = un(SITS);
    const a = entre(1, 9);
    const b = c.genre === "fois" ? entre(2, 9) : c.genre === "oppose" ? -entre(2, 30) : -entre(2, 12) * un([1, 1, 1, -1]);
    const K = entre(2, 5);
    const r = c.genre === "fois" ? K * b : c.genre === "oppose" ? -b : Math.abs(b);
    const lettreG = c.s(a, b).includes("$g(t)$") ? "t" : "x";
    return court(
      `${c.s(a, b).replace("par K", `par ${K}`)} ${un([`Que vaut $g(${a})$ ?`, `Calcule $g(${a})$.`, `Quelle est la valeur de $g(${a})$ ?`, `Déduis-en $g(${a})$.`, `Donne $g(${a})$.`])}`,
      r,
      expl(DEF_D, "on écrit $g$ en fonction de $f$, puis on remplace.", `$g(${lettreG}) = ${c.genre === "fois" ? `${K}f(${lettreG})` : c.genre === "oppose" ? `-f(${lettreG})` : `\\left|f(${lettreG})\\right|`}$, donc $g(${a}) = ${r}$.`, `$g(${a}) = ${r}$.`),
    );
  }),
  tpl(M2, 10, 3, "Replie d'abord ce qui est sous l'axe, puis compte les croisements avec l'horizontale.", () => {
    const [nf, ng] = un(NOMS);
    const f = tirerF({ deuxSignes: true });
    const k = un([0.5, 1.5, 2.5]);
    let n = 0;
    for (let i = 1; i < f.length; i++) {
      for (const c of [k, -k]) {
        const [p, r] = [f[i - 1].y, f[i].y];
        if ((p - c) * (r - c) < 0) n++;
      }
    }
    return court(
      `Sur la figure, C${nf} est la courbe de $${nf}$, tracée sur $[-3\\,;3]$. On pose $${ng}(x) = \\left|${nf}(x)\\right|$. ${un([`Combien de solutions l'équation $${ng}(x) = ${nL(k)}$ a-t-elle sur $[-3\\,;3]$ ?`, `Sur $[-3\\,;3]$, combien de fois $${ng}$ prend-elle la valeur $${nL(k)}$ ?`, `Quel est le nombre de solutions de $${ng}(x) = ${nL(k)}$ sur $[-3\\,;3]$ ?`, `Combien de nombres de $[-3\\,;3]$ ont pour image $${nL(k)}$ par $${ng}$ ?`, `En combien de points la courbe de $${ng}$ coupe-t-elle la droite d'équation $y = ${nL(k)}$ ?`])}`,
      n,
      expl(DEF_D, `$\\left|${nf}(x)\\right| = ${nL(k)}$ revient à $${nf}(x) = ${nL(k)}$ ou $${nf}(x) = -${nL(k)}$ : on compte les croisements de la courbe avec ces deux horizontales.`, `on compte les segments de la courbe qui traversent ces deux droites.`, `il y a $${n}$ solutions.`),
      figure(f, nf, [], { x: 4, y: 4 }),
    );
  }),
];
