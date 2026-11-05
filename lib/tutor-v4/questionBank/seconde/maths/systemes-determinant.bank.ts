// SYSTÈMES 2 × 2 : DÉTERMINANT ET FORMULES DE CRAMER (05/11/2026). Hors programme français
// (registre `hors_france`). Lignes visées : Maroc TC I-5c, Belgique S6 3.2.2b, Sénégal 2nde AN 6,
// Côte d'Ivoire 1re C1-L2. `droite_systeme` (combinaison) reste à part : ici on calcule ab' - a'b.
// Les solutions sont tirées d'abord : tout tombe juste.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "systemes_determinant", "2de_");
const M1 = "systeme_determinant";
const M2 = "systeme_cramer";

/* ───────────────── écritures ───────────────── */

const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
const PAIRES = [["x", "y"], ["x", "y"], ["u", "v"], ["s", "t"], ["p", "q"]];
const mono = (c: number | string, v: string) => (c === 1 ? v : c === -1 ? `-${v}` : `${c}${v}`);
const gauche = (a: number | string, b: number | string, X: string, Y: string) =>
  typeof b === "string" ? `${mono(a, X)} + ${b}${Y}` : `${mono(a, X)} ${b < 0 ? "-" : "+"} ${mono(Math.abs(b), Y)}`;
const eq = (a: number | string, b: number | string, c: number, X: string, Y: string) => `${gauche(a, b, X, Y)} = ${c}`;
const accolade = (e1: string, e2: string) => `\\begin{cases} ${e1} \\\\ ${e2} \\end{cases}`;
const pm = (x: number) => (x < 0 ? `(${x})` : String(x));
const vm = (a: number, b: number, c: number, d: number) => `\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}`;

type S = { a: number; b: number; c: number; d: number; e: number; f: number; X: string; Y: string };
const sys = (s: S) => accolade(eq(s.a, s.b, s.c, s.X, s.Y), eq(s.d, s.e, s.f, s.X, s.Y));
const det = (s: S) => s.a * s.e - s.b * s.d;
const dX = (s: S) => s.c * s.e - s.b * s.f;
const dY = (s: S) => s.a * s.f - s.c * s.d;

/* ───────────────── tirages ───────────────── */

/** Un système quelconque, de déterminant non nul. */
function quelconque(): S {
  for (;;) {
    const [X, Y] = un(PAIRES);
    const s: S = { a: nz(-6, 6), b: nz(-6, 6), c: entre(-12, 12), d: nz(-6, 6), e: nz(-6, 6), f: entre(-12, 12), X, Y };
    if (det(s)) return s;
  }
}
/** La solution est tirée d'abord. */
function avecSolution(): S & { x0: number; y0: number } {
  for (;;) {
    const [X, Y] = un(PAIRES);
    const x0 = nz(-5, 5);
    const y0 = nz(-5, 5);
    const a = nz(-5, 5);
    const b = nz(-5, 5);
    const d = nz(-5, 5);
    const e = nz(-5, 5);
    const s = { a, b, c: a * x0 + b * y0, d, e, f: d * x0 + e * y0, X, Y, x0, y0 };
    if (det(s) && Math.abs(det(s)) <= 25) return s;
  }
}
type Genre = "une" | "aucune" | "infinie";
/** Un système du genre voulu : lignes proportionnelles si le déterminant est nul. */
function duGenre(g: Genre): S {
  if (g === "une") return quelconque();
  const [X, Y] = un(PAIRES);
  const a = nz(-5, 5);
  const b = nz(-5, 5);
  const c = nz(-9, 9);
  const t = un([2, 3, -1, -2, -3]);
  return { a, b, c, d: t * a, e: t * b, f: g === "infinie" ? t * c : t * c + nz(-4, 4), X, Y };
}

/** Une équation écrite autrement : il faut la remettre en ordre avant de calculer. */
function autrement(a: number, b: number, c: number, X: string, Y: string) {
  const reste = (k: number, v: string) => `${k < 0 ? "+" : "-"} ${mono(Math.abs(k), v)}`;
  const forme = entre(0, 2);
  if (c === 0) return forme === 2 ? `${gauche(a, b, X, Y)} = 0` : forme === 0 ? `${mono(b, Y)} = ${mono(-a, X)}` : `${mono(a, X)} = ${mono(-b, Y)}`;
  if (forme === 0) return `${mono(b, Y)} = ${c} ${reste(a, X)}`;
  if (forme === 1) return `${mono(a, X)} = ${c} ${reste(b, Y)}`;
  return `${gauche(a, b, X, Y)} ${c < 0 ? "+" : "-"} ${Math.abs(c)} = 0`;
}

/* ───────────────── tournures ───────────────── */

const INTRO = ["On considère le système", "Soit le système", "On donne le système", "Voici le système", "On étudie le système", "Prenons le système"];
const DEF_D = "le déterminant du système $ax + by = c$, $a'x + b'y = c'$ est le nombre $ab' - a'b$ ; les seconds membres n'y entrent pas.";
const DEF_N = "si le déterminant n'est pas nul, le système a une seule solution. S'il est nul, les premiers membres sont proportionnels : aucune solution si les seconds membres ne suivent pas la même proportion, une infinité sinon.";
const DEF_C = "si $\\Delta = ab' - a'b \\neq 0$, la solution est $x = \\dfrac{\\Delta_x}{\\Delta}$ et $y = \\dfrac{\\Delta_y}{\\Delta}$, où $\\Delta_x = cb' - c'b$ et $\\Delta_y = ac' - a'c$ : on remplace la colonne de l'inconnue par les seconds membres.";

const UNE = "Une seule solution";
const AUCUNE = "Aucune solution";
const INFINIE = "Une infinité de solutions";
const DEUX = "Exactement deux solutions";
const NOM_SOL: Record<Genre, string> = { une: UNE, aucune: AUCUNE, infinie: INFINIE };
const GENRES: Genre[] = ["une", "aucune", "infinie"];
const SECANTES = "Sécantes";
const PARALLELES = "Strictement parallèles";
const CONFONDUES = "Confondues";
const INCONNU = "On ne peut pas le savoir";
const NOM_POS: Record<Genre, string> = { une: SECANTES, aucune: PARALLELES, infinie: CONFONDUES };

const Q_NB = [
  "Combien ce système a-t-il de solutions ?",
  "Quel est le nombre de solutions de ce système ?",
  "Que peut-on dire de ses solutions ?",
  "Sans le résoudre, combien a-t-il de solutions ?",
  "Calcule son déterminant : combien a-t-il de solutions ?",
  "Combien de couples sont solutions de ce système ?",
];

/* ───────────────── situations ───────────────── */

type Ctx = {
  d: string;
  l: (a: number, b: number, c: number) => string;
  x: string;
  y: string;
  rx: [number, number];
  ry: [number, number];
};
const CTX: Ctx[] = [
  { d: "Un atelier expédie deux modèles de caisses.", l: (a, b, c) => `${a} caisses A et ${b} caisses B pèsent ${c} kg.`, x: "la masse d'une caisse A, en kg,", y: "celle d'une caisse B", rx: [5, 40], ry: [5, 40] },
  { d: "Une chanteuse minute une chanson.", l: (a, b, c) => `${a} couplets et ${b} refrains durent ${c} secondes.`, x: "la durée d'un couplet, en secondes,", y: "celle d'un refrain", rx: [15, 40], ry: [10, 30] },
  { d: "Un entraîneur chronomètre une nageuse.", l: (a, b, c) => `${a} longueurs de crawl et ${b} longueurs de brasse prennent ${c} secondes.`, x: "la durée d'une longueur de crawl, en secondes,", y: "celle d'une longueur de brasse", rx: [20, 40], ry: [30, 60] },
  { d: "Un pâtissier prépare ses commandes.", l: (a, b, c) => `${a} petits gâteaux et ${b} grands gâteaux demandent ${c} g de farine.`, x: "la masse de farine d'un petit gâteau, en g,", y: "celle d'un grand gâteau", rx: [20, 40], ry: [50, 80] },
  { d: "Une électricienne mesure une installation.", l: (a, b, c) => `${a} lampes et ${b} ventilateurs consomment ${c} W.`, x: "la puissance d'une lampe, en W,", y: "celle d'un ventilateur", rx: [10, 25], ry: [30, 60] },
  { d: "Une agricultrice compare deux engrais.", l: (a, b, c) => `${a} sacs d'engrais A et ${b} sacs d'engrais B apportent ${c} kg d'azote.`, x: "l'azote d'un sac d'engrais A, en kg,", y: "celui d'un sac d'engrais B", rx: [3, 15], ry: [3, 15] },
  { d: "Un tournoi de jeu vidéo compte les points.", l: (a, b, c) => `${a} victoires et ${b} matchs nuls rapportent ${c} points.`, x: "les points d'une victoire", y: "ceux d'un match nul", rx: [3, 10], ry: [1, 3] },
  { d: "Une bibliothécaire range ses rayons.", l: (a, b, c) => `${a} romans et ${b} atlas occupent ${c} cm d'étagère.`, x: "l'épaisseur d'un roman, en cm,", y: "celle d'un atlas", rx: [2, 5], ry: [4, 9] },
  { d: "Un biologiste nourrit ses animaux.", l: (a, b, c) => `${a} souris et ${b} rats mangent ${c} g de graines par jour.`, x: "la ration d'une souris, en g,", y: "celle d'un rat", rx: [3, 6], ry: [15, 30] },
  { d: "Une photographe remplit sa carte mémoire.", l: (a, b, c) => `${a} photos et ${b} vidéos occupent ${c} Mo.`, x: "la taille d'une photo, en Mo,", y: "celle d'une vidéo", rx: [2, 9], ry: [40, 90] },
  { d: "Sur un sentier de Mafate, à La Réunion, une guide note ses temps.", l: (a, b, c) => `${a} km de montée et ${b} km de descente prennent ${c} minutes.`, x: "le temps pour un km de montée, en minutes,", y: "celui pour un km de descente", rx: [12, 20], ry: [6, 10] },
  { d: "Un menuisier mesure son stock.", l: (a, b, c) => `${a} planches longues et ${b} planches courtes mesurent en tout ${c} cm.`, x: "la longueur d'une planche longue, en cm,", y: "celle d'une planche courte", rx: [60, 90], ry: [20, 50] },
  { d: "Une infirmière prépare un chariot.", l: (a, b, c) => `${a} flacons et ${b} ampoules contiennent ${c} mL.`, x: "le contenu d'un flacon, en mL,", y: "celui d'une ampoule", rx: [20, 50], ry: [5, 15] },
  { d: "Une éleveuse d'abeilles compare ses ruches.", l: (a, b, c) => `${a} ruches du verger et ${b} ruches de la forêt donnent ${c} kg de miel.`, x: "le miel d'une ruche du verger, en kg,", y: "celui d'une ruche de la forêt", rx: [8, 20], ry: [8, 20] },
];
/** Coefficients de 2 à 6, déterminant non nul : un seul couple possible. */
function enContexte() {
  for (;;) {
    const a = entre(2, 6);
    const b = entre(2, 6);
    const d = entre(2, 6);
    const e = entre(2, 6);
    if (a * e - b * d) {
      const ctx = un(CTX);
      const x0 = entre(ctx.rx[0], ctx.rx[1]);
      const y0 = entre(ctx.ry[0], ctx.ry[1]);
      return { ctx, a, b, c: a * x0 + b * y0, d, e, f: d * x0 + e * y0, x0, y0, X: "x", Y: "y" };
    }
  }
}
const recit = (c: Ctx, a: number, b: number, s: number, d: number, e: number, f: number) => `${c.d} ${c.l(a, b, s)} Par ailleurs, ${c.l(d, e, f)}`;

const DROITES = [
  "Sur un plan de ville, deux rues rectilignes suivent les droites d'équations",
  "Sur le schéma d'une usine, deux tuyaux suivent les droites d'équations",
  "Une géomètre trace deux limites de parcelle, d'équations",
  "Sur un écran de contrôle aérien, deux avions suivent les droites d'équations",
  "Sur une carte de randonnée, deux chemins suivent les droites d'équations",
  "Deux rayons laser d'un spectacle suivent les droites d'équations",
  "Sur le plan d'un pont, deux câbles tendus suivent les droites d'équations",
  "Sur le plan d'un stade, deux lignes de jeu ont pour équations",
  "Un maître verrier place deux baguettes de plomb sur les droites d'équations",
  "Sur le plan d'un réseau, deux lignes de tram suivent les droites d'équations",
];
const Q_PARA = [
  "Pour quelle valeur de $m$ ces droites sont-elles parallèles ?",
  "Quelle valeur de $m$ les rend parallèles ?",
  "Pour quelle valeur de $m$ ces droites ne se coupent-elles jamais ?",
  "Trouve $m$ pour que ces droites soient parallèles.",
  "Pour quel nombre $m$ n'ont-elles aucun point commun ?",
];

/* ───────────────── banque ───────────────── */

export const systemesDeterminantBank: TutorBankItemV4[] = [
  /* ─────────────── systeme_determinant ─────────────── */
  tpl(M1, 1, 1, "Fais a × b' − a' × b avec les coefficients des inconnues, sans toucher aux seconds membres.", () => {
    const s = quelconque();
    const v = det(s);
    return court(
      `${un(INTRO)} $${sys(s)}$. ${un(["Calcule son déterminant.", "Que vaut son déterminant ?", "Quel est son déterminant ?", "Donne la valeur de son déterminant.", "Détermine son déterminant $\\Delta$.", "Calcule le déterminant $\\Delta$ de ce système.", "Combien vaut le déterminant de ce système ?"])}`,
      v,
      expl(DEF_D, "on multiplie les coefficients en croix, puis on soustrait.", `$${pm(s.a)} \\times ${pm(s.e)} - ${pm(s.b)} \\times ${pm(s.d)} = ${v}$.`, `le déterminant vaut $${v}$.`),
    );
  }),
  tpl(M1, 2, 1, "Diagonale descendante moins diagonale montante.", () => {
    const [a, b, c, d] = [nz(-9, 9), nz(-9, 9), nz(-9, 9), nz(-9, 9)];
    const v = a * d - b * c;
    const m = vm(a, b, c, d);
    const nom = un(["", "\\Delta = ", "D = "]);
    const ecrit = `$${nom}${m}$`;
    return court(
      un([
        `Calcule ${ecrit}.`,
        `Que vaut le déterminant ${ecrit} ?`,
        `Donne la valeur du déterminant ${ecrit}.`,
        `Quelle est la valeur de ${ecrit} ?`,
        `Évalue ${ecrit}.`,
        `Les coefficients d'un système donnent ${ecrit}. Calcule ce déterminant.`,
        `Combien vaut ${ecrit} ?`,
        `Sans calculatrice, calcule ${ecrit}.`,
        `Un tableau de deux lignes donne ${ecrit}. Que vaut ce déterminant ?`,
        `Détermine la valeur de ${ecrit}.`,
        `Écris ${ecrit} sous la forme d'un seul nombre.`,
        `À quel nombre ${ecrit} est-il égal ?`,
      ]),
      v,
      expl("le déterminant du tableau de lignes $a, b$ et $c, d$ est $ad - bc$.", "on fait le produit de la diagonale descendante, moins celui de la diagonale montante.", `$${pm(a)} \\times ${pm(d)} - ${pm(b)} \\times ${pm(c)} = ${v}$.`, `le déterminant vaut $${v}$.`),
    );
  }),
  tpl(M1, 3, 1, "Seuls les coefficients des inconnues comptent, multipliés en croix.", () => {
    for (;;) {
      const s = quelconque();
      const v = det(s);
      const pr = (p: number, q: number, r: number, t: number, op = "-") => ({ t: `$${pm(p)} \\times ${pm(q)} ${op} ${pm(r)} \\times ${pm(t)}$`, v: op === "-" ? p * q - r * t : p * q + r * t });
      const faux = [pr(s.a, s.e, s.b, s.d, "+"), pr(s.a, s.d, s.b, s.e), pr(s.a, s.b, s.d, s.e), pr(s.c, s.e, s.b, s.f), pr(s.a, s.e, s.c, s.d), pr(s.b, s.d, s.a, s.e)].filter((f) => f.v !== v);
      const valeurs = new Map(faux.map((f) => [f.v, f.t]));
      if (valeurs.size < 3) continue;
      return qcm(
        `${un(INTRO)} $${sys(s)}$. ${un(["Quel calcul donne son déterminant ?", "Quel calcul faut-il faire pour obtenir son déterminant ?", "Parmi ces calculs, lequel donne le déterminant ?", "Comment calcule-t-on son déterminant ?", "Quelle écriture correspond à son déterminant ?", "Choisis le calcul de son déterminant."])}`,
        pr(s.a, s.e, s.b, s.d).t,
        [...valeurs.values()],
        expl(DEF_D, "on repère $a$, $b$, $a'$, $b'$ sur les deux lignes.", `$a = ${s.a}$, $b = ${s.b}$, $a' = ${s.d}$, $b' = ${s.e}$.`, `le déterminant se calcule par ${pr(s.a, s.e, s.b, s.d).t}, soit $${v}$.`),
      );
    }
  }),
  tpl(M1, 4, 2, "Calcule le déterminant ; s'il est nul, compare les seconds membres.", () => {
    const g = un(GENRES);
    const s = duGenre(g);
    return qcm(
      `${un(INTRO)} $${sys(s)}$. ${un(Q_NB)}`,
      NOM_SOL[g],
      [UNE, AUCUNE, INFINIE, DEUX],
      expl(DEF_N, "on calcule le déterminant, puis on regarde les seconds membres s'il est nul.", `$${pm(s.a)} \\times ${pm(s.e)} - ${pm(s.b)} \\times ${pm(s.d)} = ${det(s)}$.`, `le système a : ${NOM_SOL[g].toLowerCase()}.`),
    );
  }),
  tpl(M1, 5, 2, "Déterminant non nul : sécantes. Déterminant nul : parallèles ou confondues.", () => {
    const g = un(GENRES);
    const s = duGenre(g);
    const [n1, n2] = un([["d", "d'"], ["(d_1)", "(d_2)"], ["\\Delta", "\\Delta'"], ["D", "D'"]]);
    return qcm(
      `Dans un repère, $${n1}$ a pour équation $${eq(s.a, s.b, s.c, "x", "y")}$ et $${n2}$ a pour équation $${eq(s.d, s.e, s.f, "x", "y")}$. ${un(["Quelle est leur position relative ?", "Comment sont ces deux droites ?", "Que peut-on dire de ces deux droites ?", "Quelle est la position de ces droites l'une par rapport à l'autre ?", "Le déterminant permet de conclure : comment sont-elles ?"])}`,
      NOM_POS[g],
      [SECANTES, PARALLELES, CONFONDUES, INCONNU],
      expl("le déterminant du système formé par deux équations de droites dit si elles se coupent. Non nul : sécantes. Nul : parallèles, et confondues si les seconds membres suivent la même proportion.", "on calcule le déterminant, puis on compare les seconds membres s'il est nul.", `$${pm(s.a)} \\times ${pm(s.e)} - ${pm(s.b)} \\times ${pm(s.d)} = ${det(s)}$.`, `ces droites sont : ${NOM_POS[g].toLowerCase()}.`),
    );
  }),
  tpl(M1, 6, 2, "Écris le déterminant avec m, puis résous : déterminant = 0.", () => {
    const [X, Y] = un(PAIRES);
    const a = nz(-5, 5);
    const b = nz(-5, 5);
    const t = un([2, 3, -1, -2, -3]);
    const k = entre(0, 3);
    const co: (number | string)[] = [a, b, t * a, t * b];
    const v = co[k] as number;
    co[k] = "m";
    const c = nz(-9, 9);
    const f = nz(-9, 9);
    const q = un([
      "Pour quelle valeur de $m$ son déterminant est-il nul ?",
      "Quelle valeur de $m$ annule son déterminant ?",
      "Pour quelle valeur de $m$ n'a-t-il pas une unique solution ?",
      "Trouve $m$ tel que son déterminant soit égal à $0$.",
      "Pour quel nombre $m$ ses premiers membres sont-ils proportionnels ?",
    ]);
    return court(
      `${un(INTRO)} $${accolade(eq(co[0], co[1], c, X, Y), eq(co[2], co[3], f, X, Y))}$. ${q}`,
      v,
      expl(DEF_D, "on écrit $ab' - a'b = 0$ en gardant $m$, puis on résout cette équation du premier degré.", `avec les coefficients $${a}$, $${b}$ et $${t * a}$, $${t * b}$, le déterminant s'annule pour $m = ${v}$.`, `$m = ${v}$.`),
    );
  }),
  tpl(M1, 7, 3, "Remets d'abord chaque équation sous la forme ax + by = c.", () => {
    const g = un(GENRES);
    const s = duGenre(g);
    return qcm(
      `${un(INTRO)} $${accolade(autrement(s.a, s.b, s.c, s.X, s.Y), autrement(s.d, s.e, s.f, s.X, s.Y))}$. ${un(Q_NB)}`,
      NOM_SOL[g],
      [UNE, AUCUNE, INFINIE, DEUX],
      expl(DEF_N, "on passe les inconnues à gauche et les nombres à droite, puis on calcule le déterminant.", `$${eq(s.a, s.b, s.c, s.X, s.Y)}$ et $${eq(s.d, s.e, s.f, s.X, s.Y)}$ : le déterminant vaut $${det(s)}$.`, `le système a : ${NOM_SOL[g].toLowerCase()}.`),
    );
  }),
  tpl(M1, 8, 3, "Écris les deux relations : les membres de gauche sont-ils proportionnels ? Les totaux aussi ?", () => {
    const ctx = un(CTX);
    const g = un(GENRES);
    const x0 = entre(ctx.rx[0], ctx.rx[1]);
    const y0 = entre(ctx.ry[0], ctx.ry[1]);
    let a = entre(2, 3);
    let b = entre(2, 3);
    let d = 2 * a;
    let e = 2 * b;
    let f = d * x0 + e * y0;
    if (g === "une") {
      a = entre(2, 6);
      b = entre(2, 6);
      d = entre(2, 6);
      e = entre(2, 6);
      while (a * e - b * d === 0) e = entre(2, 6);
      f = d * x0 + e * y0;
    }
    const c = a * x0 + b * y0;
    if (g === "aucune") f += un([-6, -4, -2, 2, 4, 6]);
    const juste = g === "une" ? "Oui : une seule réponse possible" : g === "aucune" ? "Non : ces mesures se contredisent" : "Non : une infinité de réponses possibles";
    return qcm(
      `${recit(ctx, a, b, c, d, e, f)} ${un(["Ces deux mesures permettent-elles de trouver chaque valeur ?", "Peut-on en déduire la valeur de chaque élément ?", "Ces données suffisent-elles pour trouver les deux valeurs ?", "Peut-on trouver les deux valeurs inconnues ?"])}`,
      juste,
      ["Oui : une seule réponse possible", "Non : ces mesures se contredisent", "Non : une infinité de réponses possibles", "Oui : exactement deux réponses possibles"],
      expl(DEF_N, "on écrit le système donné par les deux mesures et on calcule son déterminant.", `$${a} \\times ${e} - ${b} \\times ${d} = ${a * e - b * d}$.`, `${juste}.`),
    );
  }),
  tpl(M1, 9, 3, "Deux droites parallèles : le déterminant de leurs équations est nul.", () => {
    const a = nz(-5, 5);
    const b = nz(-5, 5);
    const t = un([2, 3, -1, -2, -3]);
    const k = entre(0, 3);
    const co: (number | string)[] = [a, b, t * a, t * b];
    const v = co[k] as number;
    co[k] = "m";
    const c = nz(-9, 9);
    const f = t * c + nz(-4, 4);
    return court(
      `${un(DROITES)} $${eq(co[0], co[1], c, "x", "y")}$ et $${eq(co[2], co[3], f, "x", "y")}$. ${un(Q_PARA)}`,
      v,
      expl("deux droites sont parallèles lorsque le déterminant de leurs équations est nul.", "on écrit $ab' - a'b = 0$ en gardant $m$, puis on résout.", `le déterminant s'annule pour $m = ${v}$, et les seconds membres ne suivent pas la même proportion.`, `$m = ${v}$.`),
    );
  }),

  /* ─────────────── systeme_cramer ─────────────── */
  tpl(M2, 1, 1, "Dans le tableau du déterminant, remplace la colonne de l'inconnue par les seconds membres.", () => {
    for (;;) {
      const s = avecSolution();
      const pour = un([0, 1]);
      const L = pour ? s.Y : s.X;
      const juste = pour ? vm(s.a, s.c, s.d, s.f) : vm(s.c, s.b, s.f, s.e);
      const faux = [vm(s.a, s.b, s.d, s.e), pour ? vm(s.c, s.b, s.f, s.e) : vm(s.a, s.c, s.d, s.f), vm(s.b, s.c, s.e, s.f), vm(s.c, s.a, s.f, s.d), vm(s.a, s.d, s.c, s.f)].filter((f) => f !== juste);
      if (new Set(faux).size < 3) continue;
      return qcm(
        `${un(INTRO)} $${sys(s)}$. ${un([`Par la méthode de Cramer, quel déterminant est $\\Delta_{${L}}$ ?`, `Quel déterminant donne $\\Delta_{${L}}$ ?`, `Dans les formules de Cramer, comment s'écrit $\\Delta_{${L}}$ ?`, `Parmi ces déterminants, lequel est $\\Delta_{${L}}$ ?`, `Choisis le déterminant $\\Delta_{${L}}$ des formules de Cramer.`, `Quelle écriture correspond à $\\Delta_{${L}}$ ?`])}`,
        `$${juste}$`,
        faux.map((f) => `$${f}$`),
        expl(DEF_C, `on part du déterminant du système et on remplace la colonne de $${L}$ par les seconds membres.`, `$\\Delta_{${L}} = ${juste}$.`, `$\\Delta_{${L}} = ${juste}$.`),
      );
    }
  }),
  tpl(M2, 2, 1, "Une inconnue = son déterminant divisé par celui du système.", () => {
    const [X, Y] = un(PAIRES);
    const D = nz(-9, 9);
    const x0 = nz(-6, 6);
    const y0 = nz(-6, 6);
    const asked = un([X, Y]);
    const donnees = `$\\Delta = ${D}$, $\\Delta_{${X}} = ${D * x0}$ et $\\Delta_{${Y}} = ${D * y0}$`;
    const v = asked === X ? x0 : y0;
    return court(
      `${un([`Pour un système d'inconnues $${X}$ et $${Y}$, on a trouvé ${donnees}.`, `Un système d'inconnues $${X}$ et $${Y}$ vérifie ${donnees}.`, `En appliquant la méthode de Cramer à un système d'inconnues $${X}$ et $${Y}$, on obtient ${donnees}.`, `On résout un système d'inconnues $${X}$ et $${Y}$ : ${donnees}.`, `Les calculs donnent ${donnees}, pour les inconnues $${X}$ et $${Y}$.`])} ${un([`Que vaut $${asked}$ ?`, `Calcule $${asked}$.`, `Quelle est la valeur de $${asked}$ ?`, `Déduis-en $${asked}$.`, `Donne $${asked}$.`])}`,
      v,
      expl(DEF_C, "on divise le déterminant de l'inconnue par celui du système.", `$${asked} = \\dfrac{${asked === X ? D * x0 : D * y0}}{${D}} = ${v}$.`, `$${asked} = ${v}$.`),
    );
  }),
  tpl(M2, 3, 1, "Remplace la colonne de l'inconnue par les seconds membres, puis calcule en croix.", () => {
    const s = avecSolution();
    const pour = un([0, 1]);
    const L = pour ? s.Y : s.X;
    const v = pour ? dY(s) : dX(s);
    return court(
      `${un(INTRO)} $${sys(s)}$. ${un([`Calcule $\\Delta_{${L}}$.`, `Que vaut $\\Delta_{${L}}$ ?`, `Dans les formules de Cramer, que vaut $\\Delta_{${L}}$ ?`, `Quelle est la valeur de $\\Delta_{${L}}$ ?`, `Donne le déterminant $\\Delta_{${L}}$ de la méthode de Cramer.`, `Pour appliquer Cramer, calcule d'abord $\\Delta_{${L}}$.`])}`,
      v,
      expl(DEF_C, `on remplace la colonne de $${L}$ par les seconds membres.`, pour ? `$${pm(s.a)} \\times ${pm(s.f)} - ${pm(s.c)} \\times ${pm(s.d)} = ${v}$.` : `$${pm(s.c)} \\times ${pm(s.e)} - ${pm(s.b)} \\times ${pm(s.f)} = ${v}$.`, `$\\Delta_{${L}} = ${v}$.`),
    );
  }),
  tpl(M2, 4, 2, "Calcule Δ, puis le déterminant de l'inconnue, puis divise.", () => {
    const s = avecSolution();
    const asked = un([s.X, s.Y]);
    const v = asked === s.X ? s.x0 : s.y0;
    return court(
      `${un(INTRO)} $${sys(s)}$. ${un([`Par la méthode de Cramer, que vaut $${asked}$ ?`, `Résous-le par les formules de Cramer et donne $${asked}$.`, `Avec les déterminants, calcule $${asked}$.`, `Quelle est la valeur de $${asked}$ dans sa solution ?`, `Applique Cramer : que vaut $${asked}$ ?`, `Détermine $${asked}$ à l'aide des déterminants.`])}`,
      v,
      expl(DEF_C, "on calcule les deux déterminants utiles, puis on divise.", `$\\Delta = ${det(s)}$, $\\Delta_{${s.X}} = ${dX(s)}$, $\\Delta_{${s.Y}} = ${dY(s)}$.`, `$${asked} = ${v}$.`),
    );
  }),
  tpl(M2, 5, 2, "Calcule les trois déterminants ; attention à l'ordre des coordonnées.", () => {
    const s = avecSolution();
    const co = (a: number, b: number) => `$(${a}\\,;${b})$`;
    return qcm(
      `${un(INTRO)} $${sys(s)}$. ${un([`Quel est le couple $(${s.X}\\,;${s.Y})$ solution ?`, `Par la méthode de Cramer, quelle est sa solution $(${s.X}\\,;${s.Y})$ ?`, `Quel couple $(${s.X}\\,;${s.Y})$ le résout ?`, `Résous-le avec les déterminants : quel est le couple $(${s.X}\\,;${s.Y})$ ?`, `Choisis sa solution $(${s.X}\\,;${s.Y})$.`])}`,
      co(s.x0, s.y0),
      [co(s.y0, s.x0), co(-s.x0, s.y0), co(s.x0, -s.y0), co(-s.x0, -s.y0), co(s.x0 + 1, s.y0), co(s.x0, s.y0 - 1)],
      expl(DEF_C, "on calcule $\\Delta$, puis les deux autres déterminants, puis on divise.", `$\\Delta = ${det(s)}$, $\\Delta_{${s.X}} = ${dX(s)}$, $\\Delta_{${s.Y}} = ${dY(s)}$.`, `la solution est $(${s.x0}\\,;${s.y0})$.`),
    );
  }),
  tpl(M2, 6, 2, "Le déterminant du système va toujours au dénominateur.", () => {
    const s = avecSolution();
    const pour = un([0, 1]);
    const L = pour ? s.Y : s.X;
    const n = pour ? dY(s) : dX(s);
    const m = pour ? dX(s) : dY(s);
    const D = det(s);
    const fr = (a: number, b: number) => `$\\dfrac{${a}}{${b}}$`;
    return qcm(
      `${un(INTRO)} $${sys(s)}$. ${un([`Quelle fraction donne $${L}$ par la méthode de Cramer ?`, `Avant de simplifier, comment s'écrit $${L}$ avec les formules de Cramer ?`, `Quelle écriture de $${L}$ donnent les formules de Cramer ?`, `Parmi ces fractions, laquelle est celle de Cramer pour $${L}$ ?`, `Choisis la fraction de Cramer qui donne $${L}$.`])}`,
      fr(n, D),
      [fr(D, n), fr(m, D), fr(-n, D), fr(D, m), fr(n, -D), fr(n, m), fr(2 * n, D), fr(n, 2 * D)],
      expl(DEF_C, "au numérateur, le déterminant de l'inconnue ; au dénominateur, celui du système.", `$\\Delta = ${D}$ et $\\Delta_{${L}} = ${n}$.`, `$${L} = \\dfrac{${n}}{${D}}$, soit $${pour ? s.y0 : s.x0}$.`),
    );
  }),
  tpl(M2, 7, 3, "Écris le système, puis applique les formules de Cramer.", () => {
    const { ctx, a, b, c, d, e, f, x0, y0 } = enContexte();
    const asked = un(["x", "y"]);
    const v = asked === "x" ? x0 : y0;
    const D = a * e - b * d;
    return court(
      `${recit(ctx, a, b, c, d, e, f)} On note $x$ ${ctx.x} et $y$ ${ctx.y}. ${un([`Par la méthode de Cramer, que vaut $${asked}$ ?`, `Résous le système obtenu et donne $${asked}$.`, `Avec les déterminants, calcule $${asked}$.`, `Quelle est la valeur de $${asked}$ ?`, `Trouve $${asked}$ à l'aide des formules de Cramer.`])}`,
      v,
      expl(DEF_C, "chaque mesure donne une équation, puis on calcule les déterminants.", `$${a}x + ${b}y = ${c}$ et $${d}x + ${e}y = ${f}$ : $\\Delta = ${D}$, $\\Delta_x = ${c * e - b * f}$, $\\Delta_y = ${a * f - c * d}$.`, `$${asked} = ${v}$.`),
    );
  }),
  tpl(M2, 8, 3, "Chaque mesure donne une ligne, dans l'ordre : les nombres gardent leur place.", () => {
    const { ctx, a, b, c, d, e, f } = enContexte();
    const S = (p: number, q: number, r: number, s: number, t: number, u: number) => `$${accolade(eq(p, q, r, "x", "y"), eq(s, t, u, "x", "y"))}$`;
    return qcm(
      `${recit(ctx, a, b, c, d, e, f)} On note $x$ ${ctx.x} et $y$ ${ctx.y}. ${un(["Quel système traduit ces mesures ?", "Quel système permet d'appliquer la méthode de Cramer ?", "Quelle mise en équation est juste ?", "Choisis le système qui correspond à ces mesures.", "Quel système faut-il résoudre ?"])}`,
      S(a, b, c, d, e, f),
      [S(b, a, c, e, d, f), S(a, d, c, b, e, f), S(a, b, f, d, e, c), S(c, b, a, f, e, d), S(a, -b, c, d, -e, f)],
      expl("chaque mesure donne une équation ; $x$ et $y$ gardent le même rôle sur les deux lignes.", "on remplace chaque objet par son inconnue.", `$${a}x + ${b}y = ${c}$ et $${d}x + ${e}y = ${f}$.`, `le système est ${S(a, b, c, d, e, f)}.`),
    );
  }),
  tpl(M2, 9, 3, "Remets chaque équation en ordre avant de calculer les déterminants.", () => {
    {
      const s = avecSolution();
      const asked = un([s.X, s.Y]);
      const v = asked === s.X ? s.x0 : s.y0;
      return court(
        `${un(INTRO)} $${accolade(autrement(s.a, s.b, s.c, s.X, s.Y), autrement(s.d, s.e, s.f, s.X, s.Y))}$. ${un([`Mets-le sous la forme habituelle, puis calcule $${asked}$ par la méthode de Cramer.`, `Par la méthode de Cramer, que vaut $${asked}$ ?`, `Remets-le en ordre : que vaut $${asked}$ ?`, `Avec les déterminants, calcule $${asked}$.`, `Quelle est la valeur de $${asked}$ dans sa solution ?`])}`,
        v,
        expl(DEF_C, "on passe les inconnues à gauche et les nombres à droite, puis on calcule les déterminants.", `$${eq(s.a, s.b, s.c, s.X, s.Y)}$ et $${eq(s.d, s.e, s.f, s.X, s.Y)}$ : $\\Delta = ${det(s)}$, $\\Delta_{${s.X}} = ${dX(s)}$, $\\Delta_{${s.Y}} = ${dY(s)}$.`, `$${asked} = ${v}$.`),
      );
    }
  }),
];
