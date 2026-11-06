// DROITES PERPENDICULAIRES PAR a × a' = −1 (06/11/2026). Hors programme français (registre `hors_france` : en
// France, la perpendicularité passe par les vecteurs normaux, en 1re spé). Lignes visées : Maroc 3AC S2-8,
// Sénégal 3e AG 6, Côte d'Ivoire 3e C3-L6. Les coefficients sont tirés pour que tout tombe juste.
// Le repère orthonormé est toujours précisé : le critère n'est vrai que dans ce cas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, qcm, un } from "../../lycee-commun";
import { BLEU, droiteL, fracL, nz, repere, type Pt } from "./themes-3-pays-ecritures";

const tpl = fabrique("seconde", "droites_perpendiculaires", "2de_");
const M = "droite_perpendiculaire_coeff";

const pm = (n: number) => (n < 0 ? `(${n})` : String(n));
const pt = (N: string, x: number, y: number) => `$${N}(${x}\\,;${y})$`;
const LETTRES = [["d", "d'"], ["d", "d'"], ["D", "D'"], ["(d_1)", "(d_2)"], ["\\Delta", "\\Delta'"]];
const REP = ["Dans un repère orthonormé,", "Le plan est muni d'un repère orthonormé.", "On travaille dans un repère orthonormé :", "Dans le plan muni d'un repère orthonormé,"];
const DEF = "dans un repère orthonormé, deux droites de coefficients directeurs $a$ et $a'$ sont perpendiculaires si et seulement si $a \\times \\nobreak a' = \\nobreak -1$. Autrement dit, $a' = -\\dfrac{1}{a}$.";

/** Un coefficient (p/q) réduit, non nul, différent de ±1 si `pasUn`. */
function coeff(pasUn = true): [number, number] {
  for (;;) {
    const [p, q] = un<[number, number]>([[2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [1, 3], [1, 4], [3, 2], [2, 3], [4, 3], [3, 4], [5, 2], [2, 5], [1, 1]]);
    if (pasUn && p === q) continue;
    const s = un([1, -1]);
    return [s * p, q];
  }
}
const perp = ([p, q]: [number, number]): [number, number] => (p > 0 ? [-q, p] : [q, -p]);
const Lfrac = (c: [number, number]) => fracL(c[0], c[1]);
/** Un coefficient qui donne des entiers : p/q avec q divisant x0. */
const droiteC = (c: [number, number], b: number) => droiteL(c[0], c[1], b);
/** La droite de coefficient c passant par un point à coordonnées entières, b entier. */
function parPoint(c: [number, number]) {
  for (;;) {
    const x0 = c[1] * nz(-3, 3);
    const y0 = entre(-6, 6);
    const b = y0 - (c[0] * x0) / c[1];
    if (Number.isInteger(b) && x0 && Math.abs(b) <= 20) return { x0, y0, b };
  }
}

const REL_P = "Perpendiculaires";
const REL_D = "Parallèles";
const REL_S = "Sécantes, mais pas perpendiculaires";
const REL_C = "Confondues";
const Q_REL = ["Comment sont ces deux droites ?", "Quelle est leur position relative ?", "Que peut-on dire de ces deux droites ?", "Quelle est la position de ces droites l'une par rapport à l'autre ?", "Calcule $a \\times a'$ : comment sont-elles ?"];

const POINTS = ["A", "B", "M", "P", "F", "K"];
type Sit = { d: (eq: string, A: string) => string; q: string };
const SITS: Sit[] = [
  { d: (eq, A) => `Sur le plan d'un quartier, une avenue suit la droite d'équation $${eq}$. On veut ouvrir une rue perpendiculaire passant par la fontaine ${A}.`, q: "cette rue" },
  { d: (eq, A) => `Sur le plan d'une ferme, une clôture suit la droite d'équation $${eq}$. Une allée perpendiculaire doit passer par le puits ${A}.`, q: "cette allée" },
  { d: (eq, A) => `Sur un terrain de sport, une ligne suit la droite d'équation $${eq}$. Un arbitre trace la perpendiculaire passant par le point ${A}.`, q: "cette perpendiculaire" },
  { d: (eq, A) => `Une ingénieure dessine un pont : le tablier suit la droite d'équation $${eq}$. Un câble doit lui être perpendiculaire et passer par l'attache ${A}.`, q: "ce câble" },
  { d: (eq, A) => `Sur l'écran d'un jeu vidéo, un mur suit la droite d'équation $${eq}$. Une balle rebondit au point ${A}, où part un rayon perpendiculaire au mur.`, q: "ce rayon" },
  { d: (eq, A) => `Une physicienne trace un miroir plan selon la droite d'équation $${eq}$. La normale au miroir passe par le point ${A}.`, q: "cette normale" },
  { d: (eq, A) => `Sur un plan de câblage, un fil principal suit la droite d'équation $${eq}$. Une dérivation perpendiculaire part de la borne ${A}.`, q: "cette dérivation" },
  { d: (eq, A) => `Une couturière trace une droite de coupe d'équation $${eq}$ sur un patron. Une pince perpendiculaire passe par le repère ${A}.`, q: "cette pince" },
  { d: (eq, A) => `Une géomètre borne un terrain le long de la droite d'équation $${eq}$. Elle vise une limite perpendiculaire passant par la borne ${A}.`, q: "cette limite" },
  { d: (eq, A) => `Sur la carte d'un sentier de La Réunion, une ravine suit la droite d'équation $${eq}$. Une passerelle perpendiculaire passe par le point ${A}.`, q: "cette passerelle" },
  { d: (eq, A) => `Une architecte fait passer une cloison le long de la droite d'équation $${eq}$. Une poutre perpendiculaire passe par le point ${A}.`, q: "cette poutre" },
  { d: (eq, A) => `Un menuisier trace un axe d'équation $${eq}$ sur une planche. Une entaille perpendiculaire passe par le point ${A}.`, q: "cette entaille" },
];
const Q_EQ = (s: string) => un([`Quelle est une équation de ${s} ?`, `Quelle équation réduite a ${s} ?`, `Quelle équation convient pour ${s} ?`]);

/** Pièges d'équation : la parallèle, le coefficient opposé, l'inverse, l'ordonnée fausse. */
function pieges(c: [number, number], x0: number, y0: number, b: number, a: [number, number]) {
  const de = (k: [number, number]) => {
    const r = y0 - (k[0] * x0) / k[1];
    return Number.isInteger(r) ? `y = ${droiteC(k, r)}` : null;
  };
  const l = [de(a), de([-c[0], c[1]]), de([c[1], c[0]]), `y = ${droiteC(c, -b || 1)}`, `y = ${droiteC(c, b + 1)}`, `y = ${droiteC(c, b - 1)}`, `y = ${droiteC(a, b)}`];
  return l.filter((x): x is string => !!x);
}

const eqR = (c: [number, number], b: number) => `y = ${droiteC(c, b)}`;
/** Une écriture cartésienne de y = (p/q) x + b, sans fraction : q y = p x + q b → p x − q y = −q b. */
function cartesienne(c: [number, number], b: number) {
  const [p, q] = c;
  const r = -q * b;
  const X = p === 1 ? "x" : p === -1 ? "-x" : `${p}x`;
  const Y = q === 1 ? "y" : `${q}y`;
  return `${X} - ${Y} = ${r}`;
}
/** Un triangle dont le côté [BC] a un coefficient simple et dont la hauteur tombe juste. */
function triangle() {
  for (;;) {
    const c = coeff(false);
    const [ap, aq] = perp(c);
    const B = { x: entre(-5, 3), y: entre(-5, 4) };
    const k = un([1, 2]);
    const C = { x: B.x + c[1] * k, y: B.y + c[0] * k };
    const A = { x: entre(-5, 5), y: entre(-5, 5) };
    // Un sommet en y = −1 ou x = −1 pose sa lettre sur une graduation des axes.
    if ([A, B, C].some((P) => P.x === -1 || P.y === -1)) continue;
    const hb = A.y - (ap * A.x) / aq;
    if (!Number.isInteger(hb) || Math.abs(hb) > 15) continue;
    if ((A.x === B.x && A.y === B.y) || (A.x === C.x && A.y === C.y)) continue;
    // A hors de (BC) et figure dans le cadre.
    if ((C.x - B.x) * (A.y - B.y) === (C.y - B.y) * (A.x - B.x)) continue;
    if (Math.max(Math.abs(C.x), Math.abs(C.y)) > 6) continue;
    return { A, B, C, c, h: [ap, aq] as [number, number], hb };
  }
}
/** Deux points dont le milieu et la pente donnent une médiatrice à ordonnée entière. */
function segmentMed() {
  for (;;) {
    const c = coeff(false);
    const k = 2 * un([1, 1, 2]);
    const A = { x: entre(-6, 4), y: entre(-6, 4) };
    const B = { x: A.x + c[1] * k, y: A.y + c[0] * k };
    const I = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const m = perp(c);
    const b = I.y - (m[0] * I.x) / m[1];
    if (Number.isInteger(b) && Math.abs(b) <= 15 && Math.abs(B.x) <= 9 && Math.abs(B.y) <= 9) return { A, B, I, c, m, b };
  }
}
const CTX_TRI = [
  "Trois balises",
  "Trois antennes",
  "Trois bornes d'un terrain",
  "Trois arbres d'un verger",
  "Trois joueuses sur un terrain",
  "Trois poteaux d'une clôture",
  "Trois stations de mesure",
];

export const droitesPerpendiculairesBank: TutorBankItemV4[] = [
  /* ─────────── ★1 ─────────── */
  tpl(M, 1, 1, "Multiplie les deux coefficients directeurs : −1 signifie perpendiculaires.", () => {
    const [n1, n2] = un(LETTRES);
    const c = coeff();
    const g = un(["perp", "perp", "para", "sec"]);
    const c2: [number, number] = g === "perp" ? perp(c) : g === "para" ? c : ([c[1], c[0]] as [number, number]);
    const b1 = entre(-6, 6);
    let b2 = entre(-6, 6);
    if (g === "para" && b2 === b1) b2 = b1 + 1;
    const J = g === "perp" ? REL_P : g === "para" ? REL_D : REL_S;
    return qcm(
      `${un(REP)} $${n1}$ a pour équation $${eqR(c, b1)}$ et $${n2}$ a pour équation $${eqR(c2, b2)}$.\n\n${un(Q_REL)}`,
      J,
      [REL_P, REL_D, REL_S, REL_C],
      expl(DEF, "on compare les coefficients, puis on calcule leur produit.", `Coefficients $${Lfrac(c)}$ et $${Lfrac(c2)}$.`, `ces droites sont : ${J.toLowerCase()}.`),
    );
  }),
  tpl(M, 2, 1, "a' est l'opposé de l'inverse de a.", () => {
    const [n1] = un(LETTRES);
    const c = coeff();
    const b = entre(-6, 6);
    const j = `$${Lfrac(perp(c))}$`;
    return qcm(
      `${un(REP)} $${n1}$ a pour équation $${eqR(c, b)}$.\n\n${un(["Quel est le coefficient directeur de toute droite perpendiculaire à celle-ci ?", "Quel coefficient directeur $a'$ a une perpendiculaire à cette droite ?", "Une droite lui est perpendiculaire : quel est son coefficient directeur ?", "Quel nombre $a'$ vérifie $a \\times \\nobreak a' = \\nobreak -1$ ici ?", "Quel coefficient directeur rend une droite perpendiculaire à celle-ci ?"])}`,
      j,
      [`$${Lfrac(c)}$`, `$${fracL(-c[0], c[1])}$`, `$${fracL(c[1], c[0])}$`, `$${fracL(-c[1], 2 * c[0])}$`].filter((x) => x !== j),
      expl(DEF, "on prend l'inverse, puis l'opposé.", `$a = ${Lfrac(c)}$, donc $a' = ${Lfrac(perp(c))}$.`, `$a' = ${Lfrac(perp(c))}$.`),
    );
  }),
  tpl(M, 3, 1, "Écris a × m = −1, puis divise.", () => {
    const [n1, n2] = un(LETTRES);
    const a = un([2, 4, 5, 8, 10, -2, -4, -5, -8, -10]);
    const b1 = entre(-6, 6);
    const b2 = nz(-6, 6);
    const v = -1 / a;
    return court(
      `${un(REP)} $${n1}$ a pour équation $${eqR([a, 1], b1)}$ et $${n2}$ a pour équation $y = mx ${b2 < 0 ? "-" : "+"} ${Math.abs(b2)}$.\n\n${un(["Pour quelle valeur de $m$ sont-elles perpendiculaires ?", "Quelle valeur de $m$ les rend perpendiculaires ?", "Trouve $m$ pour qu'elles soient perpendiculaires.", "Quel nombre $m$ donne un angle droit entre ces droites ?"])}`,
      v,
      expl(DEF, "on écrit le produit des coefficients.", `$${a} \\times m = -1$.`, `$m = ${fr(v)}$.`),
    );
  }),

  /* ─────────── ★2 ─────────── */
  tpl(M, 4, 2, "D'abord a', puis on remplace les coordonnées du point pour trouver b.", () => {
    const [n1] = un(LETTRES);
    const a = coeff();
    const c = perp(a);
    const { x0, y0, b } = parPoint(c);
    const b1 = entre(-6, 6);
    const N = un(POINTS);
    const j = eqR(c, b);
    return qcm(
      `${un(REP)} $${n1}$ a pour équation $${eqR(a, b1)}$, et ${pt(N, x0, y0)} est un point.\n\n${un([`Quelle est l'équation de la perpendiculaire à $${n1}$ passant par $${N}$ ?`, `Quelle droite passe par $${N}$ et est perpendiculaire à $${n1}$ ?`, `Quelle équation a la droite perpendiculaire à $${n1}$ issue de $${N}$ ?`, `Parmi ces droites, laquelle est perpendiculaire à $${n1}$ et passe par $${N}$ ?`])}`,
      `$${j}$`,
      pieges(c, x0, y0, b, a).filter((x) => x !== j).map((x) => `$${x}$`),
      expl(DEF, "on calcule $a'$, puis $b$ avec les coordonnées du point.", `$a' = ${Lfrac(c)}$ et $${y0} = ${Lfrac(c)} \\times ${pm(x0)} + b$.`, `$${j}$.`),
    );
  }),
  tpl(M, 5, 2, "Calcule a' ; remplace x et y par les coordonnées du point ; isole b.", () => {
    const [n1] = un(LETTRES);
    const a = coeff();
    const c = perp(a);
    const { x0, y0, b } = parPoint(c);
    const b1 = entre(-6, 6);
    const N = un(POINTS);
    return court(
      `${un(REP)} $${n1}$ a pour équation $${eqR(a, b1)}$. La perpendiculaire à $${n1}$ passant par ${pt(N, x0, y0)} a pour équation $y = a'x + b$.\n\n${un(["Que vaut $b$ ?", "Quelle est son ordonnée à l'origine $b$ ?", "Calcule $b$.", "Combien vaut $b$ ?", "Détermine $b$."])}`,
      b,
      expl(DEF, "on calcule $a'$, puis on remplace par les coordonnées du point.", `$a' = ${Lfrac(c)}$ et $${y0} = ${Lfrac(c)} \\times ${pm(x0)} + b$.`, `$b = ${b}$.`),
    );
  }),
  tpl(M, 6, 2, "Lis le coefficient directeur sur le dessin, puis calcule −1 ÷ a.", () => {
    const c = coeff();
    const b = entre(-3, 3);
    const xs = [-7, 7];
    const y = (x: number) => (c[0] * x) / c[1] + b;
    // La droite tracée, découpée au cadre.
    const pts: Pt[] = [];
    for (let i = xs[0] * 10; i <= xs[1] * 10; i++) {
      const x = i / 10;
      if (Math.abs(y(x)) <= 7) pts.push({ x, y: Math.round(y(x) * 1000) / 1000 });
    }
    const ptsAff = [pts[0], pts[pts.length - 1]];
    const j = `$${Lfrac(perp(c))}$`;
    return qcm(
      `${un(["Le repère est orthonormé.", "Dans ce repère orthonormé, une droite est tracée.", "Voici une droite dans un repère orthonormé."])} ${un(["Quel est le coefficient directeur d'une perpendiculaire à cette droite ?", "Une droite lui est perpendiculaire : quel est son coefficient directeur ?", "Quel coefficient directeur $a'$ a une droite perpendiculaire à celle-ci ?", "Lis son coefficient directeur $a$, puis donne $a'$ pour une perpendiculaire."])}`,
      j,
      [`$${Lfrac(c)}$`, `$${fracL(-c[0], c[1])}$`, `$${fracL(c[1], c[0])}$`, `$${fracL(c[1], 2 * c[0])}$`].filter((x) => x !== j),
      expl(DEF, "on lit le coefficient sur le dessin (variation de $y$ pour une variation de $x$), puis on applique la règle.", `$a = ${Lfrac(c)}$.`, `$a' = ${Lfrac(perp(c))}$.`),
      repere([ptsAff]),
    );
  }),

  /* ─────────── ★3 ─────────── */
  tpl(M, 7, 3, "Mets d'abord l'équation sous la forme y = ax + b, puis cherche la perpendiculaire.", () => {
    const [n1] = un(LETTRES);
    const a = coeff();
    const c = perp(a);
    const { x0, y0, b } = parPoint(c);
    const b1 = entre(-6, 6);
    const N = un(POINTS);
    const j = eqR(c, b);
    return qcm(
      `${un(REP)} $${n1}$ a pour équation $${cartesienne(a, b1)}$, et ${pt(N, x0, y0)} est un point.\n\n${un([`Quelle est l'équation de la perpendiculaire à $${n1}$ passant par $${N}$ ?`, `Quelle droite passe par $${N}$ et coupe $${n1}$ à angle droit ?`, `Écris l'équation réduite de $${n1}$, puis celle de sa perpendiculaire par $${N}$.`])}`,
      `$${j}$`,
      pieges(c, x0, y0, b, a).filter((x) => x !== j).map((x) => `$${x}$`),
      expl(DEF, "on isole $y$ pour lire $a$.", `$a = ${Lfrac(a)}$, donc $a' = ${Lfrac(c)}$.`, `$${j}$.`),
    );
  }),
  tpl(M, 8, 3, "La hauteur passe par le sommet et elle est perpendiculaire au côté opposé.", () => {
    const { A, B, C, c, h, hb } = triangle();
    const j = eqR(h, hb);
    const fig = repere([[A, B, C, A]], { xmin: -8, xmax: 8, ymin: -8, ymax: 8, points: [{ x: A.x, y: A.y, label: "A", couleur: BLEU }, { x: B.x, y: B.y, label: "B", couleur: BLEU }, { x: C.x, y: C.y, label: "C", couleur: BLEU }] });
    return qcm(
      `${un(["Dans un repère orthonormé, on donne le triangle", "Le plan a un repère orthonormé. On considère le triangle", "Une géomètre relève, en repère orthonormé, le triangle", "Sur un plan en repère orthonormé, on trace le triangle"])} ABC :\n\n${pt("A", A.x, A.y)}, ${pt("B", B.x, B.y)}, ${pt("C", C.x, C.y)}\n\n${un(["Quelle est l'équation de la hauteur issue de $A$ ?", "Quelle droite est la hauteur issue de $A$ ?", "Quelle équation a la hauteur partant de $A$ ?", "Laquelle de ces équations est celle de la hauteur issue de $A$ ?"])}`,
      `$${j}$`,
      pieges(h, A.x, A.y, hb, c).filter((x) => x !== j).map((x) => `$${x}$`),
      expl(DEF, "on calcule le coefficient de (BC), puis celui de la hauteur, puis $b$ avec $A$.", `Coefficient de (BC) : $${Lfrac(c)}$ ; celui de la hauteur : $${Lfrac(h)}$.`, `$${j}$.`),
      fig,
    );
  }),
  tpl(M, 9, 3, "La médiatrice passe par le milieu et elle est perpendiculaire au segment.", () => {
    const { A, B, I, c, m, b } = segmentMed();
    const j = eqR(m, b);
    const [P, Q] = un([["A", "B"], ["E", "F"], ["R", "S"], ["M", "N"]]);
    return qcm(
      `${un(["Dans un repère orthonormé, on donne", "Le plan a un repère orthonormé. On place", "En repère orthonormé, une architecte place deux piliers", "En repère orthonormé, un marin repère deux bouées"])} ${pt(P, A.x, A.y)} et ${pt(Q, B.x, B.y)}.\n\n${un([`Quelle est l'équation de la médiatrice de $[${P}${Q}]$ ?`, `Quelle droite est la médiatrice du segment $[${P}${Q}]$ ?`, `Quelle équation a l'ensemble des points à égale distance de $${P}$ et de $${Q}$ ?`, `Laquelle de ces droites est la médiatrice de $[${P}${Q}]$ ?`])}`,
      `$${j}$`,
      pieges(m, I.x, I.y, b, c).filter((x) => x !== j).map((x) => `$${x}$`),
      expl(DEF, "on calcule le milieu, le coefficient du segment, puis celui de la médiatrice.", `Milieu $(${I.x}\\,;${I.y})$ ; coefficient du segment $${Lfrac(c)}$ ; médiatrice $${Lfrac(m)}$.`, `$${j}$.`),
    );
  }),
  tpl(M, 10, 3, "Calcule les deux coefficients directeurs depuis le sommet et fais leur produit.", () => {
    const rect = un([true, true, false]);
    const S = { x: entre(-4, 4), y: entre(-4, 4) };
    const c = coeff();
    const k = un([1, 2]);
    const Pp = { x: S.x + c[1] * k, y: S.y + c[0] * k };
    const c2 = rect ? perp(c) : ([c[1], c[0]] as [number, number]);
    const l = un([1, 2]);
    const R = { x: S.x + c2[1] * l, y: S.y + c2[0] * l };
    const X = un(CTX_TRI);
    const J = rect ? "Oui" : "Non";
    return qcm(
      `${X} forment un triangle, en repère orthonormé :\n\n${pt("A", S.x, S.y)}, ${pt("B", Pp.x, Pp.y)}, ${pt("C", R.x, R.y)}\n\n${un(["Ce triangle est-il rectangle en $A$ ?", "Les droites $(AB)$ et $(AC)$ sont-elles perpendiculaires ?", "L'angle en $A$ est-il droit ?", "Y a-t-il un angle droit en $A$ ?"])}`,
      J,
      ["Oui", "Non", "On ne peut pas le savoir", "Seulement si $AB = AC$"],
      expl(DEF, "on calcule les coefficients de $(AB)$ et $(AC)$, puis leur produit.", `Coefficients $${Lfrac(c)}$ et $${Lfrac(c2)}$.`, `la réponse est : ${J.toLowerCase()}.`),
    );
  }),
  tpl(M, 11, 3, "a' = −1 ÷ a, puis le point donne b.", () => {
    const S = un(SITS);
    const a = coeff();
    const c = perp(a);
    const { x0, y0, b } = parPoint(c);
    const b1 = entre(-6, 6);
    const N = un(POINTS);
    const j = eqR(c, b);
    return qcm(
      `${S.d(eqR(a, b1), pt(N, x0, y0))} Le repère est orthonormé.\n\n${Q_EQ(S.q)}`,
      `$${j}$`,
      pieges(c, x0, y0, b, a).filter((x) => x !== j).map((x) => `$${x}$`),
      expl(DEF, "on calcule $a'$, puis $b$ avec les coordonnées du point.", `$a' = ${Lfrac(c)}$ et $${y0} = ${Lfrac(c)} \\times ${pm(x0)} + b$.`, `$${j}$.`),
    );
  }),
];
