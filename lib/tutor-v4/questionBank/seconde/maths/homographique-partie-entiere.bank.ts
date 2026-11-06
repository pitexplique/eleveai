// FONCTIONS HOMOGRAPHIQUES ET PARTIE ENTIÈRE (06/11/2026). Hors programme français (registre `hors_france`).
// Lignes visées : Maroc TC IV-4, Sénégal 2nde AN 4 et AN 2, Côte d'Ivoire 2nde C1-L6 et 1re C1-L7.
// Canvas `fonctionGraphique` : chaque branche ou palier est une courbe à part (aucun trait vertical trompeur),
// avec un point plein pour la borne incluse et un point creux (`ouvert`) pour la borne exclue.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, nL, phrase, qcm, un } from "../../lycee-commun";
import { aff, BLEU, fracL, interL, nz, repere, versMoins, versPlus, type Pt } from "./themes-3-pays-ecritures";

const tpl = fabrique("seconde", "homographique_partie_entiere", "2de_");
const MH = "fct_homographique";
const ME = "fct_partie_entiere";

/* ───────────────── homographiques ───────────────── */

const pm = (n: number) => (n < 0 ? `(${n})` : String(n));
const NOMS = ["f", "f", "g", "h"];
type H = { a: number; b: number; c: number; d: number; al: number; be: number; k: number };
/** (ax + b)/(cx + d) = β + k/(c (x − α)), α et β entiers ; c vaut 1 ou 2. */
function tirerH(cs: number[] = [1, 1, 2], plage = 4): H {
  for (;;) {
    const c = un(cs);
    const al = nz(-plage, plage);
    const be = nz(-plage, plage);
    const a = be * c;
    const d = -al * c;
    const b = entre(-9, 9);
    if (!b || !d) continue;
    const det = a * d - b * c;
    if (!det) continue;
    return { a, b, c, d, al, be, k: -det / c };
  }
}
/** Pour un dessin : les deux branches sont bien visibles dans le cadre. */
function tirerHFig(): H {
  for (;;) {
    const c = un([1, 1, 2]);
    const al = nz(-3, 3);
    const be = nz(-3, 3);
    const K = nz(-6, 6) * c;
    const b = K - be * al * c;
    if (!b || Math.abs(b) > 30) continue;
    return { a: be * c, b, c, d: -al * c, al, be, k: K };
  }
}
const fracH = (h: H) => `\\dfrac{${aff(h.a, h.b)}}{${aff(h.c, h.d)}}`;
const valH = (h: H, x: number) => (h.a * x + h.b) / (h.c * x + h.d);
const posee = (n: string, h: H) => `$${n}(x) = ${fracH(h)}$`;
const INTRO_H = ["Soit la fonction définie par :", "On considère la fonction :", "On donne la fonction homographique :", "Voici une fonction homographique :", "On étudie la fonction :", "Une fonction homographique est donnée par :"];
const presente = (n: string, h: H) => `${un(INTRO_H)}\n\n${posee(n, h)}`;

const DEF_I = "une fraction n'existe pas quand son dénominateur est nul : la valeur qui annule $cx + d$ est interdite.";
const DEF_A = "la courbe de $x \\mapsto \\dfrac{ax + b}{cx + d}$ (avec $c \\neq 0$ et $ad - bc \\neq 0$) est une hyperbole. Elle a pour asymptotes la droite verticale $x = -\\dfrac{d}{c}$ et la droite horizontale $y = \\dfrac{a}{c}$ ; leur point de rencontre est son centre de symétrie.";
const DEF_V = "sur chacun des deux intervalles, une fonction homographique garde le même sens de variation : croissante si $ad - bc > 0$, décroissante si $ad - bc < 0$.";

/** Les deux branches, découpées au bord du cadre : aucune ligne ne traverse l'asymptote. */
function branches(h: H) {
  const gauche: Pt[] = [];
  const droite: Pt[] = [];
  for (let i = -70; i <= 70; i++) {
    const x = i / 10;
    if (Math.abs(x - h.al) < 1e-9) continue;
    const y = valH(h, x);
    if (Math.abs(y) > 7) continue;
    (x < h.al ? gauche : droite).push({ x, y: Math.round(y * 1000) / 1000 });
  }
  // Le pas de 0,1 s'arrêtait loin du bord (la courbe semblait finir à y = −3) :
  // on prolonge chaque branche jusqu'à y = ±7, par dichotomie vers l'asymptote.
  const bout = (x0: number): Pt => {
    let dedans = x0;
    let dehors = h.al;
    for (let k = 0; k < 40; k++) {
      const m = (dedans + dehors) / 2;
      if (Math.abs(valH(h, m)) <= 7) dedans = m;
      else dehors = m;
    }
    return { x: Math.round(dedans * 10000) / 10000, y: Math.round(valH(h, dedans) * 1000) / 1000 };
  };
  const fin = gauche[gauche.length - 1];
  if (fin) {
    for (let k = 1; k < 8; k++) {
      const x = fin.x + ((bout(fin.x).x - fin.x) * k) / 8;
      gauche.push({ x, y: Math.round(valH(h, x) * 1000) / 1000 });
    }
    gauche.push(bout(fin.x));
  }
  const debut = droite[0];
  if (debut) {
    const plus: Pt[] = [bout(debut.x)];
    for (let k = 7; k > 0; k--) {
      const x = debut.x + ((plus[0].x - debut.x) * k) / 8;
      plus.push({ x, y: Math.round(valH(h, x) * 1000) / 1000 });
    }
    droite.unshift(...plus);
  }
  return [gauche, droite].filter((b) => b.length > 1);
}
const figureH = (h: H, asym = false) => repere(branches(h), asym ? { verticale: h.al, horizontale: h.be } : {});

/* Situations qui saturent : la grandeur se rapproche d'une valeur limite. */
type Sat = { d: string; n: string; v: string; g: string; u: string };
const SATS: Sat[] = [
  { d: "Dans un lac, le nombre de milliers de poissons, $t$ années après un alevinage, suit", n: "N", v: "t", g: "ce nombre de milliers de poissons", u: "milliers" },
  { d: "Une enzyme agit dans un tube : sa vitesse de réaction, pour une concentration $x$ du produit, suit", n: "V", v: "x", g: "cette vitesse", u: "unités" },
  { d: "Une antenne télescopique se déploie : sa longueur, en m, après $t$ secondes, suit", n: "L", v: "t", g: "cette longueur", u: "m" },
  { d: "Un élève apprend une langue : le nombre de centaines de mots retenus après $t$ semaines suit", n: "M", v: "t", g: "ce nombre de centaines de mots", u: "centaines" },
  { d: "Une plante de serre grandit : sa hauteur, en dm, après $t$ semaines, suit", n: "H", v: "t", g: "cette hauteur", u: "dm" },
  { d: "Une chaîne de production démarre : son rendement, en pièces par minute, après $t$ jours, suit", n: "R", v: "t", g: "ce rendement", u: "pièces par minute" },
  { d: "Un sportif reprend l'entraînement : sa distance de course, en km, après $t$ semaines, suit", n: "D", v: "t", g: "cette distance", u: "km" },
  { d: "Une rumeur circule sur un réseau : le nombre de milliers de partages après $t$ jours suit", n: "P", v: "t", g: "ce nombre de milliers de partages", u: "milliers" },
  { d: "Un médicament agit : son effet, sur une échelle de points, pour une dose $x$, suit", n: "E", v: "x", g: "cet effet", u: "points" },
  { d: "Une nouvelle application séduit : le nombre de centaines d'abonnés après $t$ jours suit", n: "A", v: "t", g: "ce nombre de centaines d'abonnés", u: "centaines" },
];
function tirerSat() {
  for (;;) {
    const a = entre(2, 12);
    const d = entre(1, 6);
    const b = entre(0, a * d - 1);
    const S = un(SATS);
    return { S, a, b, d, F: `\\dfrac{${aff(a, b, S.v)}}{${aff(1, d, S.v)}}` };
  }
}

/* ───────────────── partie entière ───────────────── */

const E_NOT = "$E(x)$";
const DEF_E = "la partie entière $E(x)$ d'un réel $x$ est le plus grand entier inférieur ou égal à $x$ : $E(x) = n$ équivaut à $n \\leq x < n + 1$.";
/** Une décimale non entière, négative ou positive, au dixième. */
const decim = (m = 9) => {
  for (;;) {
    const v = entre(-m * 10, m * 10) / 10;
    if (!Number.isInteger(v)) return v;
  }
};
const Q_E = ["Calcule", "Que vaut", "Donne la valeur de", "Quelle est la valeur de", "Détermine", "Combien vaut"];
const fin = (q: string) => (/^(Que|Quelle|Combien)/.test(q) ? " ?" : ".");
/** Une courbe de paliers : `f` donne la valeur, chaque palier [p ; p + largeur[ fermé à gauche. */
function figureE(val: (x: number) => number, largeur: number, xmin = -4, xmax = 4, ymin = -6, ymax = 6): CanvasFigure {
  const traits: Pt[][] = [];
  const points: { x: number; y: number; ouvert?: boolean; couleur?: string }[] = [];
  for (let p = xmin; p < xmax - 1e-9; p += largeur) {
    const y = val(p);
    if (y < ymin || y > ymax) continue;
    const q = p + largeur;
    traits.push([{ x: p, y }, { x: q, y }]);
    points.push({ x: p, y, couleur: BLEU }, { x: q, y, ouvert: true, couleur: BLEU });
  }
  return repere(traits, { xmin, xmax, ymin, ymax, points });
}
const NBX = (k: number) => `\\dfrac{x}{${k}}`;
type Gr = { t: string; v: (x: number) => number; larg: number };
const GRAPHES: Gr[] = [
  { t: "E(x)", v: (x) => Math.floor(x + 1e-9), larg: 1 },
  { t: "E(x) + 1", v: (x) => Math.floor(x + 1e-9) + 1, larg: 1 },
  { t: "E(x) - 1", v: (x) => Math.floor(x + 1e-9) - 1, larg: 1 },
  { t: "2E(x)", v: (x) => 2 * Math.floor(x + 1e-9), larg: 1 },
  { t: "E(2x)", v: (x) => Math.floor(2 * x + 1e-9), larg: 0.5 },
  { t: `E\\left(${NBX(2)}\\right)`, v: (x) => Math.floor(x / 2 + 1e-9), larg: 2 },
  { t: "-E(x)", v: (x) => -Math.floor(x + 1e-9), larg: 1 },
];
type Boite = { d: (N: number, k: number) => string; q: string };
const BOITES: Boite[] = [
  { d: (N, k) => `Une coopérative range ${N} œufs par boîtes de ${k}.`, q: "boîtes pleines" },
  { d: (N, k) => `Une brasserie artisanale met ${N} bouteilles en caisses de ${k}.`, q: "caisses pleines" },
  { d: (N, k) => `Une entraîneuse répartit ${N} joueuses en équipes de ${k}.`, q: "équipes complètes" },
  { d: (N, k) => `Une bibliothécaire place ${N} livres sur des étagères de ${k}.`, q: "étagères pleines" },
  { d: (N, k) => `Un maraîcher repique ${N} plants en rangées de ${k}.`, q: "rangées complètes" },
  { d: (N, k) => `Une laborantine répartit ${N} échantillons dans des portoirs de ${k}.`, q: "portoirs pleins" },
  { d: (N, k) => `Un chef de chœur groupe ${N} choristes en pupitres de ${k}.`, q: "pupitres complets" },
  { d: (N, k) => `Une couturière découpe ${N} cm de ruban en morceaux de ${k} cm.`, q: "morceaux entiers" },
  { d: (N, k) => `Une imprimerie assemble ${N} feuilles en cahiers de ${k}.`, q: "cahiers complets" },
  { d: (N, k) => `Un apiculteur remplit des pots de ${k} g avec ${N} g de miel de letchis.`, q: "pots pleins" },
  { d: (N, k) => `Une informaticienne copie ${N} Go sur des disques de ${k} Go.`, q: "disques pleins" },
];
const AGES = [
  "Un test médical note l'âge d'un patient en années révolues.",
  "Un club de sport inscrit ses membres selon leur âge en années révolues.",
  "Un vétérinaire enregistre l'âge d'un cheval en années révolues.",
  "Un formulaire demande l'âge en années révolues.",
];

export const homographiquePartieEntiereBank: TutorBankItemV4[] = [
  /* ═════════════════ fct_homographique ═════════════════ */
  tpl(MH, 1, 1, "Cherche la valeur qui annule le dénominateur.", () => {
    const n = un(NOMS);
    const h = tirerH();
    return court(
      `${presente(n, h)}\n\n${un(["Quelle valeur de $x$ est interdite ?", "Pour quelle valeur de $x$ n'est-elle pas définie ?", "Quelle est sa valeur interdite ?", "Quel nombre n'a pas d'image ?", "Quelle valeur annule le dénominateur ?", "Quel nombre faut-il exclure de son ensemble de définition ?"])}`,
      h.al,
      expl(DEF_I, "on résout : dénominateur égal à $0$.", `$${aff(h.c, h.d)} = 0$ donne $x = ${h.al}$.`, `la valeur interdite est $${h.al}$.`),
    );
  }),
  tpl(MH, 2, 1, "L'ensemble de définition contient tous les réels, sauf celui qui annule le dénominateur.", () => {
    const n = un(NOMS);
    const h = tirerH();
    const sauf = (v: string | number) => `$\\mathbb{R} \\setminus \\left\\{${v}\\right\\}$`;
    return qcm(
      `${presente(n, h)}\n\n${un(["Quel est son ensemble de définition ?", "Sur quel ensemble est-elle définie ?", "Où est-elle définie ?", "Quel ensemble de définition convient ?", "Quel est l'ensemble des réels qui ont une image ?"])}`,
      sauf(h.al),
      [sauf(-h.al), sauf(fracL(-h.b, h.a)), sauf(fracL(h.b, h.c)), sauf(h.be), "$\\mathbb{R}$", sauf(0)].filter((x) => x !== sauf(h.al)),
      expl(DEF_I, "on cherche la valeur qui annule le dénominateur.", `$${aff(h.c, h.d)} = 0$ donne $x = ${h.al}$.`, `l'ensemble est ${sauf(h.al)}.`),
    );
  }),
  tpl(MH, 3, 1, "Remplace x par le nombre donné, en haut et en bas.", () => {
    for (;;) {
      const n = un(NOMS);
      const h = tirerH();
      const x = entre(-6, 6);
      if (x === h.al) continue;
      const v = valH(h, x);
      if (!v || !Number.isInteger(v * 2)) continue;
      return court(
        `${presente(n, h)}\n\n${un([`Calcule $${n}(${x})$.`, `Quelle est l'image de $${x}$ ?`, `Que vaut $${n}(${x})$ ?`, `Donne la valeur de $${n}(${x})$.`, `Combien vaut $${n}$ en $${x}$ ?`, `Quelle valeur prend $${n}$ pour $x = ${x}$ ?`])}`,
        v,
        expl("l'image de $x$ se calcule en remplaçant $x$ dans la formule.", "on calcule le haut, puis le bas.", `$\\dfrac{${h.a} \\times ${pm(x)} + ${pm(h.b)}}{${h.c} \\times ${pm(x)} + ${pm(h.d)}} = \\dfrac{${h.a * x + h.b}}{${h.c * x + h.d}}$.`, `l'image vaut $${nL(v)}$.`),
      );
    }
  }),
  tpl(MH, 4, 2, "Verticale à la valeur interdite ; horizontale au quotient a ÷ c des coefficients de x.", () => {
    const n = un(NOMS);
    const h = tirerH();
    const as = (x: number, y: number) => `$x = ${x}$ et $y = ${y}$`;
    return qcm(
      `${presente(n, h)}\n\n${un(["Quelles sont les asymptotes de sa courbe ?", "Quelles droites sont asymptotes à sa courbe ?", "Sa courbe est une hyperbole : quelles sont ses asymptotes ?", "Quelles asymptotes verticale et horizontale a-t-elle ?", "Quelles droites sa courbe approche-t-elle sans les toucher ?"])}`,
      as(h.al, h.be),
      [as(h.be, h.al), as(-h.al, h.be), as(h.al, -h.be), as(-h.al, -h.be)].filter((x) => x !== as(h.al, h.be)),
      expl(DEF_A, "on annule le dénominateur, puis on divise les coefficients de $x$.", `$x = ${h.al}$ et $y = ${h.a} \\div ${pm(h.c)} = ${h.be}$.`, `${as(h.al, h.be)}.`),
    );
  }),
  tpl(MH, 5, 2, "Le centre est le point de rencontre des deux asymptotes.", () => {
    const n = un(NOMS);
    const h = tirerH();
    const P = (x: number, y: number) => `$(${x}\\,;${y})$`;
    return qcm(
      `${presente(n, h)}\n\n${un(["Quel est le centre de symétrie de sa courbe ?", "Quel point est centre de symétrie de son hyperbole ?", "Autour de quel point sa courbe est-elle symétrique ?", "Quelles sont les coordonnées du centre de symétrie de sa courbe ?", "Où se croisent ses deux asymptotes ?"])}`,
      P(h.al, h.be),
      [P(h.be, h.al), P(-h.al, h.be), P(h.al, -h.be), P(-h.al, -h.be), P(0, 0)].filter((x) => x !== P(h.al, h.be)),
      expl(DEF_A, "on trouve les deux asymptotes, puis leur point de rencontre.", `$x = ${h.al}$ et $y = ${h.be}$.`, `le centre est ${P(h.al, h.be)}.`),
    );
  }),
  tpl(MH, 6, 2, "Les pointillés sont les asymptotes : lis où ils coupent les axes.", () => {
    const h = tirerHFig();
    const G = un(["verticale", "horizontale", "centre"]);
    const fig = figureH(h, true);
    const intro = un(["Voici la courbe d'une fonction homographique, avec ses asymptotes en pointillés.", "Le dessin montre une hyperbole et ses deux asymptotes, en pointillés.", "Cette courbe est celle d'une fonction homographique ; ses asymptotes sont en pointillés.", "Sur ce repère, une hyperbole est tracée avec ses asymptotes en pointillés."]);
    if (G === "centre") {
      const P = (x: number, y: number) => `$(${x}\\,;${y})$`;
      return qcm(
        `${intro} ${un(["Quel est le centre de symétrie de la courbe ?", "Quelles sont les coordonnées de son centre de symétrie ?", "Quel point est son centre de symétrie ?"])}`,
        P(h.al, h.be),
        [P(h.be, h.al), P(-h.al, h.be), P(h.al, -h.be), P(-h.al, -h.be)].filter((x) => x !== P(h.al, h.be)),
        expl(DEF_A, "on lit le point de rencontre des deux pointillés.", `Verticale en $x = ${h.al}$, horizontale en $y = ${h.be}$.`, `le centre est ${P(h.al, h.be)}.`),
        fig,
      );
    }
    const v = G === "verticale" ? h.al : h.be;
    return court(
      `${intro} ${G === "verticale" ? un(["Quelle est la valeur interdite de cette fonction ?", "Quelle abscisse n'a pas d'image ?", "Pour quel $x$ l'asymptote verticale est-elle tracée ?"]) : un(["Quelle est l'équation $y = k$ de l'asymptote horizontale : que vaut $k$ ?", "Vers quelle valeur la fonction se rapproche-t-elle quand $x$ devient très grand ?", "Quelle valeur $k$ la fonction ne prend-elle jamais, d'après l'asymptote horizontale ?"])}`,
      v,
      expl(DEF_A, "on lit le pointillé demandé.", `Le pointillé ${G} est en $${v}$.`, `la réponse est $${v}$.`),
      fig,
    );
  }),
  tpl(MH, 7, 3, "Fais la division : ax + b = a(x + d) + (b − ad).", () => {
    for (;;) {
      const a = nz(-5, 5);
      const d = nz(-6, 6);
      const b = entre(-12, 12);
      const k = b - a * d;
      if (!k || !b) continue;
      const n = un(NOMS);
      const veutK = un([true, false]);
      return court(
        `${un(INTRO_H)}\n\n$${n}(x) = \\dfrac{${aff(a, b)}}{${aff(1, d)}}$\n\n${un(["On peut l'écrire", "Elle s'écrit aussi", "On la met sous la forme", "On la réécrit"])} $${n}(x) = p + \\dfrac{k}{${aff(1, d)}}$. ${veutK ? un(["Que vaut $k$ ?", "Quelle est la valeur de $k$ ?", "Combien vaut $k$ ?", "Détermine $k$."]) : un(["Que vaut $p$ ?", "Quelle est la valeur de $p$ ?", "Combien vaut $p$ ?", "Détermine $p$."])}`,
        veutK ? k : a,
        expl(DEF_A, `on écrit $${aff(a, b)} = ${a === 1 ? "" : a === -1 ? "-" : a}(${aff(1, d)}) + ${pm(k)}$.`, `$${n}(x) = ${a} + \\dfrac{${k}}{${aff(1, d)}}$.`, `$p = ${a}$ et $k = ${k}$.`),
      );
    }
  }),
  tpl(MH, 8, 3, "Repère la valeur interdite et la valeur limite sur la courbe, puis teste un point.", () => {
    const h = tirerHFig();
    const fig = figureH(h);
    const j = `$x \\mapsto \\nobreak ${fracH(h)}$`;
    const t = (g: H) => `$x \\mapsto \\nobreak ${fracH(g)}$`;
    const avecD = (al: number, be: number, b: number): H => {
      const a = be * h.c;
      const d = -al * h.c;
      return { ...h, a, b, d, al, be };
    };
    const c1 = avecD(-h.al, h.be, h.b);
    const c2 = avecD(h.al, -h.be, h.b);
    const c3 = avecD(h.be, h.al, h.b);
    const c4 = { ...h, b: h.a * h.d / h.c - (h.b - (h.a * h.d) / h.c) };
    const c5 = avecD(h.al, h.be, 2 * h.k - h.be * h.al * h.c);
    const c6 = avecD(-h.al, -h.be, h.b);
    const faux = [c3, c1, c2, c4, c5, c6].filter((g) => Number.isInteger(g.a) && Number.isInteger(g.b) && g.d !== 0 && g.a * g.d - g.b * g.c !== 0).map(t);
    return qcm(
      `${un(["Voici la courbe d'une fonction homographique.", "Le dessin montre une hyperbole.", "Cette courbe représente une fonction homographique.", "Sur ce repère, on a tracé une hyperbole."])} ${un(["Quelle fonction a cette courbe ?", "Laquelle de ces fonctions est représentée ?", "Quelle formule correspond à ce dessin ?", "À quelle fonction appartient cette courbe ?"])}`,
      j,
      faux,
      expl(DEF_A, "on repère l'asymptote verticale et l'asymptote horizontale, puis on vérifie un point.", `Valeur interdite $${h.al}$, valeur limite $${h.be}$.`, `c'est ${j}.`),
      fig,
    );
  }),
  tpl(MH, 9, 3, "Calcule ad − bc : positif, croissante ; négatif, décroissante.", () => {
    const n = un(NOMS);
    const h = tirerH();
    const crois = h.a * h.d - h.b * h.c > 0;
    const I = (m: string) => `${m} sur $${versMoins(h.al, false)}$ et sur $${versPlus(h.al, false)}$`;
    const j = I(crois ? "Croissante" : "Décroissante");
    return qcm(
      `${presente(n, h)}\n\n${un(["Quel est son sens de variation ?", "Comment varie-t-elle ?", "Quelles sont ses variations ?", "Que peut-on dire de ses variations ?", "Calcule $ad - bc$ : comment varie-t-elle ?"])}`,
      j,
      [I(crois ? "Décroissante" : "Croissante"), `Croissante sur $\\mathbb{R}$`, `Décroissante sur $\\mathbb{R}$`, `Croissante sur $]{-}\\infty\\,;${h.al}[$, décroissante ensuite`, `Décroissante sur $]{-}\\infty\\,;${h.al}[$, croissante ensuite`],
      expl(DEF_V, "on calcule $ad - bc$.", `$${h.a} \\times ${pm(h.d)} - ${pm(h.b)} \\times ${pm(h.c)} = ${h.a * h.d - h.b * h.c}$.`, `${j.charAt(0).toLowerCase()}${j.slice(1)}.`),
    );
  }),
  tpl(MH, 10, 3, "Quand la variable devient très grande, seul compte le quotient des coefficients.", () => {
    const { S, a, b, d, F } = tirerSat();
    return court(
      `${S.d}\n\n$${S.n}(${S.v}) = ${F}$\n\n${un([`De quelle valeur ${S.g} se rapproche-t-il quand $${S.v}$ devient très grand ?`, `Quelle valeur limite ${S.g} approche-t-il à long terme ?`, `Vers quel nombre tend ${S.g} quand $${S.v}$ devient très grand ?`])}`.replace(/(cette \w+) se rapproche-t-il/, "$1 se rapproche-t-elle").replace(/(cette \w+) approche-t-il/, "$1 approche-t-elle"),
      a,
      expl(DEF_A, "l'asymptote horizontale donne la valeur limite.", `$y = ${a} \\div 1 = ${a}$ (en ${S.u}) ; le dénominateur vaut $${aff(1, d, S.v)}$, le numérateur $${aff(a, b, S.v)}$.`, `la valeur limite est $${a}$.`),
    );
  }),
  tpl(MH, 11, 3, "Produit en croix : a x + b = k (c x + d), puis isole x.", () => {
    for (;;) {
      const h = tirerH();
      const n = un(NOMS);
      const x0 = nz(-6, 6);
      if (x0 === h.al) continue;
      const v = valH(h, x0);
      if (!Number.isInteger(v) || v === h.be) continue;
      return court(
        `${presente(n, h)}\n\n${un([`Quel nombre a pour image $${v}$ ?`, `Résous $${n}(x) = ${v}$.`, `Quel est l'antécédent de $${v}$ ?`, `Pour quel $x$ a-t-on $${n}(x) = ${v}$ ?`, `Quelle valeur de $x$ donne $${v}$ ?`])}`,
        x0,
        expl("pour $x$ différent de la valeur interdite, $\\dfrac{A}{B} = k$ équivaut à $A = kB$.", "on écrit le produit en croix, puis on isole $x$.", `$${aff(h.a, h.b)} = ${pm(v)} \\times (${aff(h.c, h.d)})$.`, `$x = ${x0}$.`),
      );
    }
  }),

  /* ═════════════════ fct_partie_entiere ═════════════════ */
  tpl(ME, 1, 1, "Cherche le plus grand entier qui ne dépasse pas ce nombre ; pour un négatif, on descend.", () => {
    const v = decim();
    const q = un(Q_E);
    return court(
      `${un(["", `On note ${E_NOT} la partie entière de $x$. `, `${E_NOT} désigne la partie entière de $x$. `, "Avec $E$ la partie entière. "])}${q} $E(${nL(v)})$${fin(q)}`,
      Math.floor(v),
      expl(DEF_E, "on place le nombre entre deux entiers consécutifs et on garde celui de gauche.", `$${Math.floor(v)} \\leq ${nL(v)} < ${Math.floor(v) + 1}$.`, `$E(${nL(v)}) = ${Math.floor(v)}$.`),
    );
  }),
  tpl(ME, 2, 1, "Encadre le nombre par deux entiers consécutifs.", () => {
    const g = un(["racine", "pi", "fraction", "entier"]);
    let s: string;
    let v: number;
    if (g === "racine") {
      const n = un([2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 17, 20, 26, 30, 35, 40, 50, 65, 80, 90]);
      const moins = un([false, false, true]);
      s = `${moins ? "-" : ""}\\sqrt{${n}}`;
      v = (moins ? -1 : 1) * Math.sqrt(n);
    } else if (g === "pi") {
      const k = entre(1, 5);
      const moins = un([false, true]);
      s = `${moins ? "-" : ""}${k === 1 ? "" : k}\\pi`;
      v = (moins ? -1 : 1) * k * Math.PI;
    } else if (g === "fraction") {
      const q = un([2, 3, 4, 5, 6, 7]);
      let p = entre(-30, 30);
      if (!(p % q)) p += 1;
      s = `${p < 0 ? "-" : ""}\\dfrac{${Math.abs(p)}}{${q}}`;
      v = p / q;
    } else {
      const k = nz(-9, 9);
      s = String(k);
      v = k;
    }
    const q = un(Q_E);
    return court(`${q} $E\\left(${s}\\right)$${fin(q)}`, Math.floor(v + 1e-12), expl(DEF_E, "on encadre par deux entiers consécutifs.", `$${Math.floor(v + 1e-12)} \\leq ${s} < ${Math.floor(v + 1e-12) + 1}$.`, `la partie entière vaut $${Math.floor(v + 1e-12)}$.`));
  }),
  tpl(ME, 3, 1, "E(x) = n signifie que x va de n inclus à n + 1 exclu.", () => {
    const n = nz(-9, 9);
    const J = `$${interL(n, n + 1, true, false)}$`;
    return qcm(
      `${phrase(["On sait que", "Un nombre $x$ vérifie", "Pour un réel $x$, on a", "On donne"], [`$E(x) = ${n}$.`])} ${un(["À quel intervalle $x$ appartient-il ?", "Où se trouve $x$ ?", "Quelles valeurs $x$ peut-il prendre ?", "Quel intervalle décrit toutes les valeurs de $x$ ?", "Quel ensemble contient exactement les valeurs possibles de $x$ ?"])}`,
      J,
      [`$${interL(n, n + 1, false, true)}$`, `$${interL(n, n + 1)}$`, `$${interL(n - 1, n, true, false)}$`, `$${interL(n - 1, n + 1, false, false)}$`, `$${interL(n, n + 1, false, false)}$`],
      expl(DEF_E, "on applique la définition.", `$${n} \\leq x < ${n + 1}$.`, `$x$ appartient à ${J}.`),
    );
  }),
  tpl(ME, 4, 2, "Sur la courbe, le point plein indique la valeur prise ; le point creux n'en fait pas partie.", () => {
    const G = un(GRAPHES.filter((g) => g.larg === 1 && g.t !== "E(x) - 1"));
    const x = un([entre(-3, 3), entre(-3, 3), entre(-30, 35) / 10]);
    const v = G.v(x);
    return court(
      `${un(["La courbe ci-dessous est faite de paliers.", "Voici une fonction en escalier.", "Cette courbe en escalier représente une fonction $f$.", "Le dessin montre les paliers d'une fonction $f$."])} ${un([`Lis $f(${nL(x)})$.`, `Que vaut $f(${nL(x)})$ ?`, `Quelle est l'image de $${nL(x)}$ ?`, `Quelle valeur prend $f$ en $${nL(x)}$ ?`])}`,
      v,
      expl(DEF_E, "on cherche le palier au-dessus de cette abscisse ; le point plein est inclus, le point creux non.", `En $x = ${nL(x)}$, le palier est à la hauteur $${v}$.`, `$f(${nL(x)}) = ${v}$.`),
      figureE(G.v, 1),
    );
  }),
  tpl(ME, 5, 2, "Calcule chaque partie entière, puis fais l'opération.", () => {
    for (;;) {
      const a = decim(7);
      const b = decim(7);
      const g = un(["somme", "difference", "de_somme", "entiers"]);
      const fa = Math.floor(a);
      const fb = Math.floor(b);
      const s = Math.round((a + b) * 10) / 10;
      if (g === "de_somme" && Number.isInteger(s)) continue;
      const q = un(Q_E);
      const pmL = (v: number) => nL(v);
      const [t, v] =
        g === "somme" ? [`E(${pmL(a)}) + E(${pmL(b)})`, fa + fb] : g === "difference" ? [`E(${pmL(a)}) - E(${pmL(b)})`, fa - fb] : g === "de_somme" ? [`E(${pmL(a)} + ${b < 0 ? `(${pmL(b)})` : pmL(b)})`, Math.floor(s)] : [`E(${pmL(a)}) + ${Math.abs(fb) + 1}`, fa + Math.abs(fb) + 1];
      return court(`${q} $${t}$${fin(q)}`, v as number, expl(DEF_E, "on applique la définition à chaque nombre.", `$E(${pmL(a)}) = ${fa}$ et $E(${pmL(b)}) = ${fb}$.`, `le résultat est $${v}$.`));
    }
  }),
  tpl(ME, 6, 2, "Écris n ≤ expression < n + 1, puis isole x.", () => {
    const k = un([2, 2, 3, 4, 5]);
    const n = nz(-9, 9);
    const dec = un([true, false]);
    const a = entre(1, 6) * (un([1, -1]) as number);
    const J = dec ? `$${interL(n + a, n + 1 + a, true, false)}$` : `$${interL(fracL(n, k), fracL(n + 1, k), true, false)}$`;
    const f = dec ? `E(${aff(1, -a)})` : `E(${k}x)`;
    const faux = dec
      ? [`$${interL(n - a, n + 1 - a, true, false)}$`, `$${interL(n + a, n + 1 + a, false, true)}$`, `$${interL(n + a, n + 1 + a)}$`, `$${interL(n, n + 1, true, false)}$`]
      : [`$${interL(k * n, k * (n + 1), true, false)}$`, `$${interL(fracL(n, k), fracL(n, k) === "0" ? 1 : fracL(n + k, k), true, false)}$`, `$${interL(fracL(n, k), fracL(n + 1, k), false, true)}$`, `$${interL(n, n + 1, true, false)}$`];
    return qcm(
      `${un(["Résous l'équation", "On veut résoudre l'équation", "Soit l'équation", "On étudie l'équation", "On cherche tous les $x$ tels que"])} $${f} = ${n}$. ${un(["Quel ensemble de solutions obtient-on ?", "Quelles sont ses solutions ?", "Quel intervalle convient ?", "Quel est l'ensemble $S$ ?"])}`,
      J,
      faux.filter((x) => x !== J),
      expl(DEF_E, "on écrit la double inégalité, puis on isole $x$.", dec ? `$${n} \\leq ${aff(1, -a)} < ${n + 1}$.` : `$${n} \\leq ${k}x < ${n + 1}$.`, `$S = $ ${J}.`),
    );
  }),
  tpl(ME, 7, 3, "Regarde la largeur des paliers et leur hauteur à l'origine.", () => {
    const G = un(GRAPHES);
    return qcm(
      `${un(["Cette courbe en escalier représente une fonction $g$.", "Voici la courbe en paliers d'une fonction $g$.", "Le dessin montre une fonction $g$ construite avec la partie entière."])} ${un(["Quelle est sa formule ?", "Quelle expression convient ?", "Laquelle de ces fonctions est tracée ?", "À quelle formule correspond ce dessin ?"])}`,
      `$g(x) = ${G.t}$`,
      GRAPHES.filter((g) => g.t !== G.t).map((g) => `$g(x) = ${g.t}$`),
      expl(DEF_E, "on lit la largeur d'un palier (1, 2 ou un demi), puis sa hauteur.", `Des paliers de largeur $${nL(G.larg)}$, de hauteur $${G.v(0)}$ à l'origine.`, `$g(x) = ${G.t}$.`),
      figureE(G.v, G.larg),
    );
  }),
  tpl(ME, 8, 3, "Le nombre de groupes complets est la partie entière du quotient.", () => {
    const B = un(BOITES);
    const k = un([6, 8, 12, 15, 20, 24, 25, 30]);
    const N = k * entre(3, 30) + entre(1, k - 1);
    const v = Math.floor(N / k);
    return court(
      `${B.d(N, k)} ${un([`Combien obtient-on de ${B.q} ?`, `Quel est le nombre de ${B.q}, c'est-à-dire la partie entière du quotient ?`, `Calcule la partie entière de $\\dfrac{${N}}{${k}}$ : combien de ${B.q} ?`, `Avec la partie entière, combien compte-t-on de ${B.q} ?`])}`,
      v,
      expl(DEF_E, "le quotient n'est pas entier : on garde sa partie entière.", `$${N} \\div ${k} = ${fr(Math.round((N / k) * 100) / 100)}$ environ.`, `il y a $${v}$ ${B.q}.`),
    );
  }),
  tpl(ME, 9, 3, "x − E(x) est la partie décimale : toujours entre 0 inclus et 1 exclu.", () => {
    const v = decim();
    const r = Math.round((v - Math.floor(v)) * 10) / 10;
    const G = un(AGES);
    const age = un([true, false]);
    if (age) {
      const a = entre(20, 800) / 10;
      const x = Number.isInteger(a) ? a + 0.5 : a;
      return court(`${G} Pour $x = ${nL(x)}$ années vécues, ${un(["quel âge retient-on ?", "quel âge est enregistré ?", "quel nombre $E(x)$ note-t-on ?"])}`, Math.floor(x), expl(DEF_E, "les années révolues sont les années entièrement terminées : c'est la partie entière.", `$E(${nL(x)}) = ${Math.floor(x)}$.`, `on retient $${Math.floor(x)}$ ans.`));
    }
    const q = un(Q_E);
    return court(`Avec $x = ${nL(v)}$, ${q.toLowerCase()} $x - E(x)$${fin(q)}`, r, expl(DEF_E, "on calcule d'abord $E(x)$, puis la différence.", `$E(${nL(v)}) = ${Math.floor(v)}$, donc $${nL(v)} - (${Math.floor(v)}) = ${nL(r)}$.`, `$x - E(x) = ${nL(r)}$.`));
  }),
];
