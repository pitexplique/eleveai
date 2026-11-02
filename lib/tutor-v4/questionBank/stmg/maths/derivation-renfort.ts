// Renfort dérivation de 1re STMG (02/11/2026).
//
// Mesure du 02/11 (scripts/mesurer-squelettes-coach.ts stmg der_…) : 2 à 149
// squelettes par micro, 1,7 à 18 répétitions sur 20. On branche des
// générateurs, sur le modèle de terminale-spe/maths/convexite-renfort.ts :
// familles de polynômes (degré 3 au plus) × tournures × situations de métiers
// (gestion, commerce, marketing, RH, logistique, banque, santé, sport,
// tourisme, artisanat : les maths sont transversales ; La Réunion apparaît
// dans une seule situation sur vingt-cinq).
// Aucune question « open » : QCM ou réponse courte (un nombre). Toute réponse
// qui est une expression (dérivée, équation de tangente) passe en QCM.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

/* ─────────────────────────── outils ─────────────────────────── */

function rint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const arr = (x: number) => Math.round(x * 1000) / 1000;

/** Nombre en LaTeX : virgule décimale « {,} ». */
function n(x: number) {
  return String(arr(x)).replace(".", "{,}");
}

/** Nombre pour une réponse tapée : virgule décimale. */
function fr(x: number) {
  return String(arr(x)).replace(".", ",");
}

/** Polynôme en LaTeX à partir de [coefficient, puissance], sans les termes nuls. */
function poly(termes: Array<[number, number]>, v = "x") {
  let s = "";
  for (const [c0, p] of termes) {
    const c = arr(c0);
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = p === 0 ? n(abs) : `${abs === 1 ? "" : n(abs)}${p === 1 ? v : `${v}^${p}`}`;
    if (!s) s = (c < 0 ? "-" : "") + corps;
    else s += (c < 0 ? " - " : " + ") + corps;
  }
  return s || "0";
}

/** « x - 3 », « x + 2 », « x ». */
function xMoins(r: number, v = "x") {
  return r === 0 ? v : r > 0 ? `${v} - ${n(r)}` : `${v} + ${n(-r)}`;
}

/** y = f'(a)(x - a) + f(a) écrit proprement : « -x + 2 », « 5(t - 2) », « 6x + 5 ». */
function tanDev(m: number, a: number, y0: number, v = "x") {
  const facteur = a === 0 ? v : `(${xMoins(a, v)})`;
  const debut = m === 0 ? "" : `${m === 1 ? "" : m === -1 ? "-" : n(m)}${facteur}`;
  if (!debut) return n(y0);
  return y0 === 0 ? debut : `${debut} ${y0 < 0 ? "-" : "+"} ${n(Math.abs(y0))}`;
}

/** k(x - r)(x - s) en LaTeX, avec « x » seul quand une racine est nulle. */
function prodTex(k: number, r: number, s: number, v = "x") {
  const kk = k === 1 ? "" : k === -1 ? "-" : n(k);
  const fac = (u: number) => (u === 0 ? v : `(${xMoins(u, v)})`);
  return r === 0 ? `${kk}${v}${fac(s)}` : s === 0 ? `${kk}${v}${fac(r)}` : `${kk}${fac(r)}${fac(s)}`;
}

/** Polynôme de degré 3 au plus : [a, b, c, d] pour ax³ + bx² + cx + d. */
type Q = [number, number, number, number];
const ev = (p: Q, x: number) => ((p[0] * x + p[1]) * x + p[2]) * x + p[3];
const der = (p: Q): Q => [0, 3 * p[0], 2 * p[1], p[2]];
const tex = (p: Q, v = "x") => poly([[p[0], 3], [p[1], 2], [p[2], 1], [p[3], 0]], v);
const droiteTex = (m: number, p: number) => `y = ${poly([[m, 1], [p, 0]])}`;

const maj = (s: string) => s[0].toUpperCase() + s.slice(1);
const min = (s: string) => s[0].toLowerCase() + s.slice(1);
/** « de » contracté : « du résultat », « de l’écart », « de la trésorerie ». */
const de = (gn: string) => (gn.startsWith("le ") ? `du ${gn.slice(3)}` : gn.startsWith("les ") ? `des ${gn.slice(4)}` : `de ${gn}`);
const iv = (a: number, b: number) => `$[${n(a)}\\,;${n(b)}]$`;
const ivG = (k: number) => `$]-\\infty\\,;${n(k)}]$`;
const ivD = (k: number) => `$[${n(k)}\\,;+\\infty[$`;
const pt = (x: number, y: number) => `$(${n(x)}\\,;${n(y)})$`;

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Nombre négatif entre parenthèses dans un calcul : « 3 × (-2) ». */
function par(x: number) {
  return x < 0 ? `(${n(x)})` : n(x);
}

/** Hors LaTeX, la virgule décimale s’écrit « , » et non « {,} ». */
function prose(s: string) {
  return s
    .split("$")
    .map((morceau, i) => (i % 2 === 0 ? morceau.replace(/\{,\}/g, ",") : morceau))
    .join("$");
}

function qcm(text: string, correct: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const bon = prose(correct);
  return { text: prose(text), format: "qcm", choices: makeChoices(bon, pieges.map(prose)), expected: [bon], comparator: "mcq_exact", explanation: prose(explanation), ...(canvas ? { canvas } : {}) };
}

function court(text: string, valeur: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text: prose(text), format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation: prose(explanation), ...(canvas ? { canvas } : {}) };
}

/** Vrai / faux, ou « a-t-il raison ? ». */
function vraiFaux(affirmation: string, vrai: boolean, explanation: string): TutorGeneratedQuestionV4 {
  const t = rint(1, 3);
  if (t === 1) return qcm(`Vrai ou faux ? ${affirmation}`, vrai ? "Vrai" : "Faux", [vrai ? "Faux" : "Vrai"], explanation);
  if (t === 2) return qcm(`Un camarade affirme : « ${affirmation} » A-t-il raison ?`, vrai ? "Oui" : "Non", [vrai ? "Non" : "Oui"], explanation);
  return qcm(`Une élève écrit sur sa copie : « ${affirmation} » Est-ce juste ?`, vrai ? "Oui" : "Non", [vrai ? "Non" : "Oui"], explanation);
}

/** Courbe échantillonnée, avec droites (sécante, tangente) et points marqués. */
function graphe(
  f: (x: number) => number,
  xmin: number,
  xmax: number,
  opt: { droites?: Array<{ m: number; p: number; couleur?: string }>; points?: Array<{ x: number; y: number; label?: string }> } = {}
): CanvasFigure {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = arr(xmin + (i * (xmax - xmin)) / 60);
    const y = f(x);
    if (Number.isFinite(y)) points.push({ x, y: arr(y) });
  }
  const ys = [...points.map((p) => p.y), ...(opt.points ?? []).map((p) => p.y), 0];
  return {
    kind: "fonctionGraphique",
    size: { width: 320, height: 260 },
    xmin,
    xmax,
    ymin: Math.floor(Math.min(...ys)) - 1,
    ymax: Math.ceil(Math.max(...ys)) + 1,
    grille: true,
    courbes: [
      { id: "f", type: "points", couleur: "#2563eb", points },
      ...(opt.droites ?? []).map((d, i) => ({ id: `d${i}`, type: "affine" as const, a: d.m, b: d.p, couleur: d.couleur ?? "#16a34a" })),
    ],
    misesEnEvidence: (opt.points ?? []).map((p) => ({ point: { x: p.x, y: arr(p.y), label: p.label, couleur: "#dc2626" } })),
  } as CanvasFigure;
}

/* ─────────────────── réservoirs de situations ─────────────────── */

type Prod = { qui: string; unites: string; un: string; f: boolean };

/** 25 situations de production ; une seule à La Réunion (≈ 4 %). */
const PRODS: Prod[] = [
  { qui: "Une artisane ébéniste", unites: "tables", un: "une table", f: true },
  { qui: "Un boulanger", unites: "baguettes", un: "une baguette", f: true },
  { qui: "Une responsable d’atelier de vélos", unites: "vélos", un: "un vélo", f: false },
  { qui: "Un brasseur artisanal", unites: "fûts de bière", un: "un fût", f: false },
  { qui: "Une créatrice de bijoux", unites: "bracelets", un: "un bracelet", f: false },
  { qui: "Un torréfacteur", unites: "sacs de café", un: "un sac", f: false },
  { qui: "Une couturière", unites: "robes", un: "une robe", f: true },
  { qui: "Un fleuriste", unites: "bouquets", un: "un bouquet", f: false },
  { qui: "Une éditrice de jeux", unites: "jeux de société", un: "un jeu", f: false },
  { qui: "Un chocolatier", unites: "boîtes de chocolats", un: "une boîte", f: true },
  { qui: "Une menuisière", unites: "chaises", un: "une chaise", f: true },
  { qui: "Un potier", unites: "vases", un: "un vase", f: false },
  { qui: "Une imprimeuse", unites: "affiches", un: "une affiche", f: true },
  { qui: "Un gérant de laboratoire cosmétique", unites: "flacons de crème", un: "un flacon", f: false },
  { qui: "Une fabricante de skateboards", unites: "planches", un: "une planche", f: true },
  { qui: "Un traiteur", unites: "plateaux-repas", un: "un plateau-repas", f: false },
  { qui: "Une apicultrice", unites: "pots de miel", un: "un pot", f: false },
  { qui: "Un maroquinier", unites: "sacs à main", un: "un sac", f: false },
  { qui: "Une installatrice de panneaux solaires", unites: "panneaux", un: "un panneau", f: false },
  { qui: "Un responsable de production pharmaceutique", unites: "lots de vaccins", un: "un lot", f: false },
  { qui: "Une agente de voyages", unites: "séjours", un: "un séjour", f: false },
  { qui: "Un développeur d’applications", unites: "licences", un: "une licence", f: true },
  { qui: "Une luthière", unites: "guitares", un: "une guitare", f: true },
  { qui: "Un gérant de salle de sport", unites: "abonnements", un: "un abonnement", f: false },
  { qui: "Une coopérative de vanille de La Réunion", unites: "kilos de vanille", un: "un kilo", f: false },
];
const vendus = (P: Prod) => `vendu${P.f ? "e" : ""}s`;

type Temps = { qui: string; quoi: string; court: string; L: string; t: string };

/** Grandeurs qui évoluent dans le temps et peuvent être négatives (écarts, soldes…). */
const TEMPS: Temps[] = [
  { qui: "Une trésorière d’association", quoi: "la trésorerie de l’association (en milliers d’euros)", court: "la trésorerie", L: "S", t: "le temps en mois" },
  { qui: "Un frigoriste", quoi: "la température d’une chambre froide (en °C)", court: "la température", L: "\\theta", t: "le temps en heures" },
  { qui: "Une analyste financière", quoi: "l’écart entre le cours d’une action et son prix d’achat (en euros)", court: "l’écart", L: "E", t: "le temps en jours" },
  { qui: "Un contrôleur de gestion", quoi: "le résultat d’une entreprise (en milliers d’euros)", court: "le résultat", L: "R", t: "le nombre de mois écoulés" },
  { qui: "Une pilote de drone", quoi: "l’altitude d’un drone par rapport à son point de départ (en m)", court: "l’altitude", L: "A", t: "le temps en secondes" },
  { qui: "Un technicien d’ascenseur", quoi: "la position d’un ascenseur par rapport au rez-de-chaussée (en m)", court: "la position", L: "P", t: "le temps en secondes" },
  { qui: "Une océanographe", quoi: "la hauteur de la mer par rapport à son niveau moyen (en dm)", court: "la hauteur", L: "H", t: "le temps en heures" },
  { qui: "Un météorologue", quoi: "la température extérieure (en °C)", court: "la température", L: "\\theta", t: "le temps en heures" },
  { qui: "Une responsable des stocks", quoi: "l’écart entre le stock et le stock idéal (en centaines de pièces)", court: "l’écart", L: "E", t: "le temps en semaines" },
  { qui: "Un conseiller bancaire", quoi: "le solde d’un compte professionnel (en milliers d’euros)", court: "le solde", L: "S", t: "le temps en mois" },
  { qui: "Une infirmière", quoi: "l’écart entre la température d’un patient et 37 °C (en °C)", court: "l’écart", L: "E", t: "le temps en heures" },
  { qui: "Un entraîneur de natation", quoi: "l’avance d’un nageur sur le record (en m)", court: "l’avance", L: "D", t: "le temps en secondes" },
  { qui: "Une gestionnaire de réseau électrique", quoi: "l’écart entre production et consommation d’électricité (en MW)", court: "l’écart", L: "E", t: "le temps en heures" },
  { qui: "Un responsable marketing", quoi: "l’écart entre les ventes et l’objectif (en milliers d’euros)", court: "l’écart", L: "V", t: "le nombre de semaines écoulées" },
  { qui: "Une agente de voyages", quoi: "l’écart du nombre de réservations par rapport à l’an dernier (en centaines)", court: "l’écart", L: "N", t: "le nombre de semaines écoulées" },
  { qui: "Un hydrologue", quoi: "le niveau d’une rivière par rapport à son niveau habituel (en cm)", court: "le niveau", L: "N", t: "le temps en heures" },
  { qui: "Une économiste", quoi: "la croissance d’un pays (en %)", court: "la croissance", L: "G", t: "le temps en trimestres" },
  { qui: "Un chef de chantier", quoi: "l’avance du chantier sur son planning (en jours)", court: "l’avance", L: "A", t: "le nombre de semaines écoulées" },
  { qui: "Une préparatrice physique", quoi: "la variation de masse d’un sportif depuis le début de la saison (en kg)", court: "la variation de masse", L: "M", t: "le temps en semaines" },
  { qui: "Un responsable RH", quoi: "l’écart entre l’effectif et l’effectif prévu (en salariés)", court: "l’écart", L: "E", t: "le nombre de mois écoulés" },
];

/** Qui trace une courbe (questions graphiques). */
const METIERS = [
  "Une ingénieure",
  "Un économiste",
  "Une contrôleuse de gestion",
  "Un analyste de données",
  "Une chargée de marketing",
  "Un logisticien",
  "Une banquière",
  "Un kinésithérapeute",
  "Une météorologue",
  "Un urbaniste",
  "Une architecte",
  "Un entraîneur d’athlétisme",
  "Une pharmacienne",
  "Un technicien de maintenance",
  "Une responsable RH",
  "Un agent immobilier",
  "Une journaliste économique",
  "Un hôtelier",
  "Une gestionnaire de patrimoine",
  "Un professeur de physique",
];

type Cadre = { intro: string; F: string; v: string; quoi: string; pos: boolean };

/** Habille une expression : fonction nue, coût, recette, bénéfice ou grandeur qui évolue dans le temps. */
function cadre(E: (v: string) => string, positif: boolean, nu = false): Cadre {
  const options = positif ? 9 : 7;
  const t = nu ? rint(1, 3) : rint(1, options);
  if (t === 1) return { intro: `Soit $f(x) = ${E("x")}$.`, F: "f", v: "x", quoi: "$f$", pos: false };
  if (t === 2) return { intro: `On considère la fonction $g$ définie sur $\\mathbb{R}$ par $g(x) = ${E("x")}$.`, F: "g", v: "x", quoi: "$g$", pos: false };
  if (t === 3) return { intro: `Une fonction $h$ est définie par $h(x) = ${E("x")}$.`, F: "h", v: "x", quoi: "$h$", pos: false };
  if (t === 4) {
    const P = pick(PRODS);
    return { intro: `${P.qui} modélise son bénéfice : pour $x$ ${P.unites} ${vendus(P)}, il vaut $B(x) = ${E("x")}$ euros.`, F: "B", v: "x", quoi: "le bénéfice", pos: true };
  }
  if (t <= 7) {
    const T = pick(TEMPS);
    return { intro: `${T.qui} modélise ${T.quoi} par $${T.L}(t) = ${E("t")}$, où $t$ est ${T.t}.`, F: T.L, v: "t", quoi: T.court, pos: true };
  }
  const P = pick(PRODS);
  if (t === 8) return { intro: `${P.qui} modélise son coût de production : pour $x$ ${P.unites}, il vaut $C(x) = ${E("x")}$ euros.`, F: "C", v: "x", quoi: "le coût", pos: true };
  return { intro: `${P.qui} estime sa recette : pour $x$ ${P.unites} ${vendus(P)}, elle vaut $R(x) = ${E("x")}$ euros.`, F: "R", v: "x", quoi: "la recette", pos: true };
}

const COURS_DERIVEES = "$(x^3)' = 3x^2$, $(x^2)' = 2x$, $(x)' = 1$, une constante a pour dérivée 0, et $(k \\times u)' = k \\times u'$.";

function polyAuHasard(deg: 2 | 3, deci = false): Q {
  const A = deci ? [0.5, -0.5, 1.5, 2, -2, 3, 0.2, -1, 2.5] : [1, 2, 3, 4, 5, -1, -2, -3, 6];
  if (deg === 3) return [pick(A), rint(-6, 6), rint(-9, 9), rint(-10, 10)];
  return [0, pick(A), rint(-9, 9) || 4, rint(-10, 10)];
}
const positif = (p: Q) => p.every((c) => c >= 0);

/** Erreurs typiques d’élève sur la dérivée d’un polynôme. */
function piegesDerivee(p: Q, v: string): string[] {
  const [a, b, c, d] = p;
  return [
    poly([[3 * a, 3], [2 * b, 2], [c, 1]], v), // exposants non baissés
    poly([[a, 2], [b, 1], [c, 0]], v), // exposant non multiplié
    poly([[3 * a, 2], [b, 1], [c, 0]], v), // oubli du 2 devant x²
    poly([[3 * a, 2], [2 * b, 1], [c, 0], [d, 0]], v), // constante gardée
    poly([[3 * a, 2], [2 * b, 1]], v), // (cx)' = 0
    poly([[3 * a, 2], [2 * b, 1], [c, 1]], v), // (cx)' = cx
  ];
}

/* =========================================================
   GÉNÉRATEURS COMMUNS : dérivée, nombre dérivé, tangente horizontale
========================================================= */

function genDeriveeExpr(deg: 2 | 3, deci = false) {
  return () => {
    const p = polyAuHasard(deg, deci);
    const c = cadre((v) => tex(p, v), positif(p));
    const F = `${c.F}'(${c.v})`;
    const eq = (s: string) => `$${F} = ${s}$`;
    const bon = tex(der(p), c.v);
    return qcm(
      `${c.intro} ${pick([`Quelle est l’expression de $${F}$ ?`, "Dérive cette fonction. On obtient :", "Quelle est sa fonction dérivée ?", `Parmi ces expressions, laquelle est celle de $${F}$ ?`])}`,
      eq(bon),
      piegesDerivee(p, c.v).map(eq),
      expl(COURS_DERIVEES, "on dérive terme à terme, puis on additionne.", `${eq(bon)}.`, `la bonne réponse est ${eq(bon)}.`)
    );
  };
}

function genDeriveeValeur(deg: 2 | 3, deci = false) {
  return () => {
    const p = polyAuHasard(deg, deci);
    const c = cadre((v) => tex(p, v), positif(p));
    const x0 = c.pos ? rint(0, 6) : rint(-4, 5);
    const val = ev(der(p), x0);
    const F = `${c.F}'`;
    const q = pick([
      `Calcule $${F}(${x0})$.`,
      `Que vaut le nombre dérivé $${F}(${x0})$ ?`,
      `Quel est le coefficient directeur de la tangente à la courbe au point d’abscisse $${x0}$ ?`,
      `On dérive, puis on remplace par $${x0}$. Que vaut $${F}(${x0})$ ?`,
    ]);
    return court(
      `${c.intro} ${q}`,
      val,
      expl(COURS_DERIVEES, `on calcule d’abord $${F}(${c.v})$, puis on remplace $${c.v}$ par $${x0}$.`, `$${F}(${c.v}) = ${tex(der(p), c.v)}$, donc $${F}(${x0}) = ${n(val)}$.`, `$${F}(${x0}) = ${n(val)}$.`)
    );
  };
}

/** f(x) = ax² + bx + c ; pour quelle valeur f'(x) = v ? */
function genDeriveeAntecedent(avecC: boolean) {
  return () => {
    const a = pick([1, 2, 3, -1, -2, 0.5, 4, -3]);
    const b = avecC ? rint(-8, 8) : 0;
    const p: Q = [0, a, b, rint(-9, 9)];
    const c = cadre((v) => tex(p, v), positif(p));
    const x0 = c.pos ? rint(1, 8) : rint(-6, 8);
    const val = arr(2 * a * x0 + b);
    const F = `${c.F}'`;
    return court(
      `${c.intro} ${pick([`Pour quelle valeur de $${c.v}$ a-t-on $${F}(${c.v}) = ${n(val)}$ ?`, `Résous l’équation $${F}(${c.v}) = ${n(val)}$.`, `En quel point la tangente à la courbe a-t-elle pour coefficient directeur $${n(val)}$ ? Donne son abscisse.`])}`,
      x0,
      expl(COURS_DERIVEES, `on calcule $${F}(${c.v})$, puis on résout une équation du premier degré.`, `$${F}(${c.v}) = ${poly([[2 * a, 1], [b, 0]], c.v)} = ${n(val)}$ donne $${c.v} = ${n(x0)}$.`, `$${c.v} = ${n(x0)}$.`)
    );
  };
}

/** Sommet d’une parabole : la tangente y est horizontale. */
function genTangenteHoriz() {
  const a = pick([1, 2, -1, -2, 3, 0.5, -0.5, 4]);
  const x0 = rint(1, 9);
  const p: Q = [0, a, -2 * a * x0, rint(-9, 9)];
  const c = cadre((v) => tex(p, v), positif(p));
  const F = `${c.F}'`;
  return court(
    `${c.intro} ${pick([`Pour quelle valeur de $${c.v}$ la tangente à la courbe est-elle horizontale ?`, `En quelle valeur $${F}(${c.v})$ s’annule-t-elle ?`, `À quelle abscisse la courbe a-t-elle une tangente parallèle à l’axe des abscisses ?`])}`,
    x0,
    expl("une tangente horizontale a un coefficient directeur nul : on cherche $f'(x) = 0$.", "on dérive, puis on résout l’équation.", `$${F}(${c.v}) = ${poly([[2 * a, 1], [-2 * a * x0, 0]], c.v)} = 0$ donne $${c.v} = ${n(x0)}$.`, `la tangente est horizontale en $${c.v} = ${n(x0)}$.`)
  );
}

/* =========================================================
   DER_F_CARRE
========================================================= */

function genCarreExpr(niv: number) {
  return () => {
    const a = niv === 1 ? pick([1, 2, 3, 4, 5, 6, -1, -2, -3, -4]) : pick([0.5, 1.5, 2.5, -0.5, -1.5, 0.25, 7, -6, 10, 0.1]);
    const c = cadre((v) => poly([[a, 2]], v), a > 0);
    const F = `${c.F}'(${c.v})`;
    const eq = (s: string) => `$${F} = ${s}$`;
    const bon = poly([[2 * a, 1]], c.v);
    return qcm(
      `${c.intro} ${pick([`Quelle est l’expression de $${F}$ ?`, "Quelle est sa fonction dérivée ?", `On dérive. Que vaut $${F}$ ?`, `Parmi ces expressions, laquelle est $${F}$ ?`])}`,
      eq(bon),
      [eq(poly([[a, 1]], c.v)), eq(poly([[2 * a, 2]], c.v)), eq(poly([[2, 1]], c.v)), eq(poly([[a, 2]], c.v)), eq(n(2 * a))],
      expl("la dérivée de $x^2$ est $2x$, et $(kx^2)' = k \\times 2x$.", "on garde le coefficient, on multiplie par l’exposant 2 et on baisse l’exposant d’un rang.", `$${F} = ${n(a)} \\times 2${c.v} = ${bon}$.`, `${eq(bon)}.`)
    );
  };
}

function genCarreValeur(niv: number) {
  return () => {
    const a = niv === 1 ? pick([1, 1, 2, 3, -1, -2, 5]) : pick([0.5, 1.5, -0.5, 2.5, 0.2, -4]);
    const c = cadre((v) => poly([[a, 2]], v), a > 0);
    const x0 = c.pos ? rint(1, 9) : rint(-6, 9) || 3;
    const val = 2 * a * x0;
    const F = `${c.F}'`;
    return court(
      `${c.intro} ${pick([`Calcule $${F}(${x0})$.`, `Que vaut le nombre dérivé en $${x0}$ ?`, `Quel est le coefficient directeur de la tangente au point d’abscisse $${x0}$ ?`, `Donne la valeur de $${F}(${x0})$.`])}`,
      val,
      expl("la dérivée de $x^2$ est $2x$.", `on écrit $${F}(${c.v}) = ${poly([[2 * a, 1]], c.v)}$, puis on remplace par $${x0}$.`, `$${F}(${x0}) = ${n(2 * a)} \\times ${x0 < 0 ? `(${x0})` : x0} = ${n(val)}$.`, `$${F}(${x0}) = ${n(val)}$.`)
    );
  };
}

function genCarreTangente() {
  const a = pick([1, 0.5, -1, -0.5, 2, -2]);
  const x0 = pick([-2, -1, 1, 2, 3, -3].filter((x) => Math.abs(a * x * x) <= 9));
  const m = 2 * a * x0;
  const y0 = a * x0 * x0;
  const M = pick(METIERS);
  return court(
    `${M} a tracé la parabole d’équation $y = ${poly([[a, 2]])}$ et sa tangente au point A d’abscisse $${x0}$. ${pick([
      "Quel est le coefficient directeur de cette tangente ?",
      `Que vaut le nombre dérivé en $${x0}$ ?`,
      "Calcule la pente de la droite verte.",
    ])}`,
    m,
    expl("le coefficient directeur de la tangente en $a$ est le nombre dérivé $f'(a)$.", `pour $f(x) = ${poly([[a, 2]])}$, $f'(x) = ${poly([[2 * a, 1]])}$.`, `$f'(${x0}) = ${n(2 * a)} \\times ${x0 < 0 ? `(${x0})` : x0} = ${n(m)}$.`, `le coefficient directeur vaut ${n(m)}.`),
    graphe((x) => a * x * x, -4, 4, { droites: [{ m, p: y0 - m * x0 }], points: [{ x: x0, y: y0, label: "A" }] })
  );
}

function genCarreVraiFaux() {
  const k = pick([2, 3, 4, 5, -2, -3, 6]);
  const x0 = pick([3, 4, 5, -3, 6, -4]);
  const liste: Array<[string, boolean, string]> = [
    [`La dérivée de $${k}x^2$ est $${2 * k}x$.`, true, `$(${k}x^2)' = ${k} \\times 2x = ${2 * k}x$`],
    [`La dérivée de $${k}x^2$ est $${k}x$.`, false, `on a oublié de multiplier par 2 : $(${k}x^2)' = ${2 * k}x$`],
    [`La dérivée de $${k}x^2$ est $${2 * k}x^2$.`, false, `l’exposant baisse d’un rang : $(${k}x^2)' = ${2 * k}x$`],
    [`Si $f(x) = x^2$, alors $f'(${x0}) = ${2 * x0}$.`, true, `$f'(x) = 2x$, donc $f'(${x0}) = ${2 * x0}$`],
    [`Si $f(x) = x^2$, alors $f'(${x0}) = ${x0 * x0}$.`, false, `$${x0 * x0}$ est $f(${x0})$ ; or $f'(${x0}) = 2 \\times ${x0 < 0 ? `(${x0})` : x0} = ${2 * x0}$`],
    ["La dérivée de $x^2$ vaut 2 pour tout $x$.", false, "$(x^2)' = 2x$ dépend de $x$"],
    ["La tangente à la parabole $y = x^2$ au point d’abscisse 0 est horizontale.", true, "$f'(0) = 2 \\times 0 = 0$"],
    [`La tangente à la parabole $y = x^2$ au point d’abscisse $${x0}$ a pour coefficient directeur $${2 * x0}$.`, true, `$f'(${x0}) = ${2 * x0}$`],
  ];
  const [aff, vrai, raison] = pick(liste);
  return vraiFaux(aff, vrai, expl("$(x^2)' = 2x$ et $(kx^2)' = 2kx$.", "on dérive, puis on compare.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`));
}

/** Retrouver f à partir de f'(x) = 2ax. */
function genCarrePrimitive() {
  const a = pick([2, 3, 4, 5, -2, -3, 0.5, 1.5, 6]);
  const t = rint(1, 3);
  let intro = "", F = "f", v = "x";
  if (t === 1) intro = `Une fonction $f$ a pour dérivée $f'(x) = ${poly([[2 * a, 1]])}$.`;
  else if (t === 2 && a > 0) {
    const P = pick(PRODS);
    intro = `${P.qui} sait que son coût marginal vaut $C'(x) = ${poly([[2 * a, 1]])}$ pour $x$ ${P.unites}.`;
    F = "C";
  } else {
    const T = pick(TEMPS);
    intro = `${T.qui} étudie ${T.quoi} et trouve la dérivée $${T.L}'(t) = ${poly([[2 * a, 1]], "t")}$.`;
    F = T.L;
    v = "t";
  }
  const eq = (s: string) => `$${F}(${v}) = ${s}$`;
  const bon = poly([[a, 2]], v);
  return qcm(
    `${intro} ${pick([`Laquelle de ces expressions peut être celle de $${F}(${v})$ ?`, `Quelle fonction a pour dérivée $${F}'(${v})$ ?`, `Parmi ces quatre fonctions, laquelle convient ?`])}`,
    eq(bon),
    [eq(poly([[2 * a, 2]], v)), eq(poly([[4 * a, 2]], v)), eq(poly([[2 * a, 3]], v)), eq(poly([[a, 1]], v))],
    expl("$(kx^2)' = 2kx$.", "on dérive chaque proposition et on garde celle qui redonne la dérivée de l’énoncé.", `$(${bon})' = ${poly([[2 * a, 1]], v)}$.`, `${eq(bon)} convient.`)
  );
}

const CARRES: Array<[string, string, string]> = [
  ["Un paysagiste agrandit une terrasse carrée", "côté", "m"],
  ["Une carreleuse découpe un carreau carré", "côté", "cm"],
  ["Un vitrier taille une plaque de verre carrée", "côté", "dm"],
  ["Une géomètre étudie une parcelle carrée", "côté", "m"],
  ["Un décorateur choisit un tapis carré", "côté", "m"],
  ["Une maçonne coule une dalle carrée", "côté", "m"],
  ["Un afficheur imprime un panneau publicitaire carré", "côté", "m"],
  ["Une graphiste agrandit un logo carré", "côté", "cm"],
];

/** Aire d’un carré : variation approchée A'(c) × h. */
function genCarreApprox() {
  const [qui, , u] = pick(CARRES);
  const c = rint(3, 15);
  const h = pick([0.1, 0.2, 0.5, 0.01, 0.05]);
  const t = rint(1, 2);
  const ex = expl("pour une petite variation $h$, $A(c + h) - A(c) \\approx A'(c) \\times h$.", "l’aire est $A(x) = x^2$, donc $A'(x) = 2x$.", `$A'(${c}) = ${2 * c}$.`, t === 1 ? `$A'(${c}) = ${2 * c}$.` : `l’aire augmente d’environ $${2 * c} \\times ${n(h)} = ${n(2 * c * h)}$ ${u}².`);
  if (t === 1) return court(`${qui}. Son aire est $A(x) = x^2$, où $x$ est le côté en ${u}. Que vaut $A'(${c})$ ?`, 2 * c, ex);
  return court(`${qui} de côté ${c} ${u}. Son aire est $A(x) = x^2$. Grâce au nombre dérivé $A'(${c})$, de combien l’aire augmente-t-elle environ si le côté passe à $${n(c + h)}$ ${u} ?`, 2 * c * h, ex);
}

const CHUTES: Array<[string, string, number]> = [
  ["Une physicienne lâche une bille ; la distance parcourue", "en m", 4.9],
  ["Un moniteur d’auto-école fait démarrer une voiture ; la distance parcourue", "en m", 1.5],
  ["Une ingénieure ferroviaire étudie un train qui démarre ; la distance parcourue", "en m", 0.5],
  ["Un entraîneur filme le départ d’une sprinteuse ; la distance parcourue", "en m", 2.5],
  ["Une technicienne teste une bille sur un plan incliné ; la distance parcourue", "en cm", 20],
  ["Un pilote de drone laisse tomber un colis ; la hauteur de chute", "en m", 4.9],
  ["Une monitrice de ski observe un skieur qui s’élance ; la distance parcourue", "en m", 1.2],
  ["Un logisticien étudie un chariot qui démarre ; la distance parcourue", "en m", 0.25],
];

/** d(t) = k t² : vitesse instantanée d'(t0) = 2k t0. */
function genCarreChute() {
  const [qui, unite, k] = pick(CHUTES);
  const t0 = rint(1, 8);
  const v = 2 * k * t0;
  return court(
    `${qui} au bout de $t$ secondes vaut $d(t) = ${poly([[k, 2]], "t")}$ (${unite}). ${pick([`Sa vitesse instantanée est $d'(t)$. Calcule $d'(${t0})$.`, `Quelle est la vitesse instantanée à $t = ${t0}$ ?`, `Que vaut le nombre dérivé $d'(${t0})$ ?`])}`,
    v,
    expl("la vitesse instantanée est le nombre dérivé de la distance.", `$d'(t) = ${n(k)} \\times 2t = ${poly([[2 * k, 1]], "t")}$.`, `$d'(${t0}) = ${n(2 * k)} \\times ${t0} = ${n(v)}$.`, `la vitesse vaut ${n(v)} (${unite} par seconde) à $t = ${t0}$.`)
  );
}

/* =========================================================
   DER_F_CUBE
========================================================= */

function genCubeExpr(deci = false) {
  return () => {
    const a = deci ? pick([0.5, -0.5, 2.5, 0.2, -1.5, 10, -4]) : pick([1, 2, 3, 4, 5, -1, -2, -3]);
    const c = cadre((v) => poly([[a, 3]], v), a > 0);
    const F = `${c.F}'(${c.v})`;
    const eq = (s: string) => `$${F} = ${s}$`;
    const bon = poly([[3 * a, 2]], c.v);
    return qcm(
      `${c.intro} ${pick([`Quelle est l’expression de $${F}$ ?`, "Quelle est sa fonction dérivée ?", `On dérive. Que vaut $${F}$ ?`, `Laquelle de ces expressions est $${F}$ ?`])}`,
      eq(bon),
      [eq(poly([[3 * a, 3]], c.v)), eq(poly([[a, 2]], c.v)), eq(poly([[3 * a, 1]], c.v)), eq(poly([[3, 2]], c.v)), eq(poly([[2 * a, 2]], c.v))],
      expl("la dérivée de $x^3$ est $3x^2$, et $(kx^3)' = k \\times 3x^2$.", "on multiplie le coefficient par l’exposant 3, puis on baisse l’exposant d’un rang.", `$${F} = ${n(a)} \\times 3${c.v}^2 = ${bon}$.`, `${eq(bon)}.`)
    );
  };
}

function genCubeValeur(deci = false) {
  return () => {
    const a = deci ? pick([0.5, -0.5, 0.2, 1.5, -2, 4]) : pick([1, 2, -1, -2, 3, 1]);
    const c = cadre((v) => poly([[a, 3]], v), a > 0);
    const x0 = c.pos ? rint(1, 5) : rint(-4, 5) || 2;
    const val = 3 * a * x0 * x0;
    const F = `${c.F}'`;
    return court(
      `${c.intro} ${pick([`Calcule $${F}(${x0})$.`, `Que vaut le nombre dérivé en $${x0}$ ?`, `Quel est le coefficient directeur de la tangente au point d’abscisse $${x0}$ ?`, `Donne $${F}(${x0})$.`])}`,
      val,
      expl("la dérivée de $x^3$ est $3x^2$.", `$${F}(${c.v}) = ${poly([[3 * a, 2]], c.v)}$, puis on remplace.`, `$${F}(${x0}) = ${n(3 * a)} \\times ${x0 < 0 ? `(${x0})` : x0}^2 = ${n(val)}$.`, `$${F}(${x0}) = ${n(val)}$.`)
    );
  };
}

function genCubeTangente() {
  const a = pick([1, -1, 0.5, -0.5, 0.25]);
  const x0 = pick([-2, -1, 1, 2].filter((x) => Math.abs(a * x ** 3) <= 8));
  const m = 3 * a * x0 * x0;
  const y0 = a * x0 ** 3;
  return court(
    `${pick(METIERS)} a tracé la courbe d’équation $y = ${poly([[a, 3]])}$ et sa tangente au point A d’abscisse $${x0}$. ${pick(["Quel est le coefficient directeur de cette tangente ?", `Que vaut le nombre dérivé en $${x0}$ ?`, "Calcule la pente de la droite verte."])}`,
    m,
    expl("le coefficient directeur de la tangente en $a$ est $f'(a)$.", `$f'(x) = ${poly([[3 * a, 2]])}$.`, `$f'(${x0}) = ${n(3 * a)} \\times ${x0 < 0 ? `(${x0})` : x0}^2 = ${n(m)}$.`, `le coefficient directeur vaut ${n(m)}.`),
    graphe((x) => a * x ** 3, -2.5, 2.5, { droites: [{ m, p: y0 - m * x0 }], points: [{ x: x0, y: y0, label: "A" }] })
  );
}

function genCubeVraiFaux() {
  const k = pick([2, 3, 4, -2, 5, -3]);
  const x0 = pick([2, 3, -2, 4, -1]);
  const liste: Array<[string, boolean, string]> = [
    [`La dérivée de $${k}x^3$ est $${3 * k}x^2$.`, true, `$(${k}x^3)' = ${k} \\times 3x^2 = ${3 * k}x^2$`],
    [`La dérivée de $${k}x^3$ est $${3 * k}x^3$.`, false, `l’exposant baisse d’un rang : $${3 * k}x^2$`],
    [`La dérivée de $${k}x^3$ est $${k}x^2$.`, false, `on a oublié de multiplier par 3 : $${3 * k}x^2$`],
    [`Si $f(x) = x^3$, alors $f'(${x0}) = ${3 * x0 * x0}$.`, true, `$f'(x) = 3x^2$, donc $f'(${x0}) = ${3 * x0 * x0}$`],
    [`Si $f(x) = x^3$, alors $f'(${x0}) = ${x0 ** 3}$.`, false, `$${x0 ** 3}$ est $f(${x0})$ ; $f'(${x0}) = 3 \\times ${x0 < 0 ? `(${x0})` : x0}^2 = ${3 * x0 * x0}$`],
    ["La dérivée de $x^3$ est positive ou nulle pour tout $x$.", true, "$3x^2 \\ge 0$"],
    ["La dérivée de $x^3$ est négative pour $x < 0$.", false, "$3x^2 \\ge 0$ même quand $x < 0$"],
    ["La tangente à la courbe de $x^3$ en 0 est horizontale.", true, "$f'(0) = 3 \\times 0^2 = 0$"],
  ];
  const [aff, vrai, raison] = pick(liste);
  return vraiFaux(aff, vrai, expl("$(x^3)' = 3x^2$ et $(kx^3)' = 3kx^2$.", "on dérive, puis on compare.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`));
}

const CUBES = [
  "Un designer d’emballages étudie une boîte cubique",
  "Une aquariophile choisit un aquarium cubique",
  "Un fabricant de cuves étudie une cuve cubique",
  "Une architecte d’intérieur dessine un pouf cubique",
  "Un logisticien étudie un carton cubique",
  "Une maçonne coule un bloc de béton cubique",
  "Un confiseur moule un bonbon cubique",
  "Une ingénieure étudie un conteneur cubique",
];

function genCubeVolume() {
  const qui = pick(CUBES);
  const c = rint(2, 9);
  const t = rint(1, 2);
  const h = pick([0.1, 0.01, 0.2, 0.05]);
  const ex = expl("le volume d’un cube de côté $x$ est $V(x) = x^3$ ; pour une petite variation $h$, $V(c + h) - V(c) \\approx V'(c) \\times h$.", "$V'(x) = 3x^2$.", `$V'(${c}) = 3 \\times ${c}^2 = ${3 * c * c}$.`, t === 1 ? `$V'(${c}) = ${3 * c * c}$.` : `le volume augmente d’environ $${3 * c * c} \\times ${n(h)} = ${n(3 * c * c * h)}$ dm³.`);
  if (t === 1) return court(`${qui}. Son volume vaut $V(x) = x^3$ pour un côté de $x$ dm. Que vaut $V'(${c})$ ?`, 3 * c * c, ex);
  return court(`${qui} de côté ${c} dm, de volume $V(x) = x^3$. Grâce à $V'(${c})$, de combien le volume augmente-t-il environ (en dm³) si le côté passe à $${n(c + h)}$ dm ?`, 3 * c * c * h, ex);
}

function genCubeAntecedent() {
  const a = pick([1, 2, -1, -2, 0.5, 3]);
  const c = cadre((v) => poly([[a, 3]], v), a > 0);
  const x0 = rint(1, 6);
  const val = 3 * a * x0 * x0;
  const F = `${c.F}'`;
  return court(
    `${c.intro} ${pick([`Pour quelle valeur POSITIVE de $${c.v}$ a-t-on $${F}(${c.v}) = ${n(val)}$ ?`, `Résous $${F}(${c.v}) = ${n(val)}$ et donne la solution positive.`])}`,
    x0,
    expl("$(kx^3)' = 3kx^2$.", "on écrit l’équation, on isole le carré, puis on prend la racine positive.", `$${n(3 * a)}${c.v}^2 = ${n(val)}$ donne $${c.v}^2 = ${x0 * x0}$, donc $${c.v} = ${x0}$ (ou $-${x0}$).`, `la solution positive est ${x0}.`)
  );
}

function genCubeSigne() {
  const a = pick([1, 2, 3, -1, -2, 0.5, -4]);
  const c = cadre((v) => poly([[a, 3]], v), a > 0);
  const F = `${c.F}'(${c.v})`;
  const pos = `$${F} \\ge 0$ pour tout $${c.v}$`;
  const neg = `$${F} \\le 0$ pour tout $${c.v}$`;
  const bon = a > 0 ? pos : neg;
  return qcm(
    `${c.intro} ${pick([`Que peut-on dire du signe de $${F}$ ?`, `Quel est le signe de la dérivée $${F}$ ?`, `Après avoir dérivé, que dire du signe de $${F}$ ?`])}`,
    bon,
    [a > 0 ? neg : pos, `$${F} \\ge 0$ seulement pour $${c.v} \\ge 0$`, `$${F} = 0$ pour tout $${c.v}$`],
    expl("$(kx^3)' = 3kx^2$, et un carré est toujours positif ou nul.", "on dérive, puis on regarde le signe du coefficient.", `$${F} = ${poly([[3 * a, 2]], c.v)}$ : le coefficient $${n(3 * a)}$ est ${a > 0 ? "positif" : "négatif"}.`, `${bon}.`)
  );
}

/* =========================================================
   DER_F_KF
========================================================= */

const AFFINES: Array<(m: number, p: number) => [string, string]> = [
  (m, p) => [`Un chauffeur de taxi facture $${n(p)}$ € de prise en charge, puis $${n(m)}$ € par kilomètre. Pour $x$ km, le prix est $P(x) = ${poly([[m, 1], [p, 0]])}$.`, "P"],
  (m, p) => [`Une commerciale touche un fixe de $${n(p)}$ € et $${n(m)}$ € par contrat signé. Pour $x$ contrats, son salaire est $S(x) = ${poly([[m, 1], [p, 0]])}$.`, "S"],
  (m, p) => [`Un plombier facture $${n(p)}$ € de déplacement et $${n(m)}$ € par heure. Pour $x$ heures, la facture est $F(x) = ${poly([[m, 1], [p, 0]])}$.`, "F"],
  (m, p) => [`Une imprimerie compte $${n(p)}$ € de frais fixes et $${n(m)}$ € par page. Pour $x$ pages, le coût est $C(x) = ${poly([[m, 1], [p, 0]])}$.`, "C"],
  (m, p) => [`Un loueur de voitures facture $${n(p)}$ € par jour et $${n(m)}$ € par kilomètre. Pour $x$ km, le prix est $L(x) = ${poly([[m, 1], [p, 0]])}$.`, "L"],
  (m, p) => [`Une société de livraison facture $${n(p)}$ € par envoi et $${n(m)}$ € par kilo. Pour $x$ kg, le prix est $T(x) = ${poly([[m, 1], [p, 0]])}$.`, "T"],
  (m, p) => [`Un fournisseur d’électricité facture un abonnement de $${n(p)}$ € et $${n(m)}$ € par kWh. Pour $x$ kWh, la facture est $E(x) = ${poly([[m, 1], [p, 0]])}$.`, "E"],
  (m, p) => [`Une salle d’escalade demande $${n(p)}$ € d’adhésion et $${n(m)}$ € par séance. Pour $x$ séances, le coût est $A(x) = ${poly([[m, 1], [p, 0]])}$.`, "A"],
  (m, p) => [`Un traiteur compte $${n(p)}$ € de frais fixes et $${n(m)}$ € par invité. Pour $x$ invités, le prix est $P(x) = ${poly([[m, 1], [p, 0]])}$.`, "P"],
  (m, p) => [`Une citerne contient $${n(p)}$ L et se remplit de $${n(m)}$ L par minute. Après $x$ minutes, elle contient $V(x) = ${poly([[m, 1], [p, 0]])}$ L.`, "V"],
];

function genKfAffine(niv: number) {
  return () => {
    const m = niv === 1 ? rint(2, 30) : pick([0.15, 1.8, 2.5, 0.12, 0.8, 12.5, 1.25, 0.6]);
    const p = rint(2, 60);
    const [intro, F] = pick(AFFINES)(m, p);
    const x0 = rint(2, 120);
    return court(
      `${intro} ${pick([`Que vaut $${F}'(${x0})$ ?`, `Calcule le nombre dérivé $${F}'(${x0})$.`, `Quel est le coefficient directeur de la droite qui représente $${F}$ ?`, `Que vaut $${F}'(x)$, pour tout $x$ ?`])}`,
      m,
      expl("$(mx + p)' = m$ : la dérivée d’une fonction affine est son coefficient directeur.", "le terme constant a pour dérivée 0 et $(mx)' = m$.", `$${F}'(x) = ${n(m)}$ pour tout $x$, en particulier en $${x0}$.`, `la réponse est ${n(m)}.`)
    );
  };
}

function genKfConstante() {
  const k = rint(5, 80);
  const t = rint(1, 4);
  const x0 = rint(1, 30);
  let intro = "";
  let F = "f";
  if (t === 1) intro = `Soit $f(x) = ${k}$ pour tout réel $x$.`;
  else if (t === 2) { intro = `Une box internet coûte ${k} € par mois, quelle que soit la quantité $x$ de données utilisée : $A(x) = ${k}$.`; F = "A"; }
  else if (t === 3) { intro = `Un loyer de bureau vaut ${k} centaines d’euros, quel que soit le nombre $x$ de salariés : $L(x) = ${k}$.`; F = "L"; }
  else { intro = `Un abonnement de transport coûte ${k} € par mois, quel que soit le nombre $x$ de trajets : $T(x) = ${k}$.`; F = "T"; }
  return court(
    `${intro} ${pick([`Que vaut $${F}'(${x0})$ ?`, `Calcule le nombre dérivé en $${x0}$.`, `Quelle est la valeur de $${F}'(x)$ ?`])}`,
    0,
    expl("la dérivée d’une fonction constante est nulle.", "la courbe est une droite horizontale : sa pente est 0.", `$${F}'(x) = 0$ pour tout $x$.`, "la réponse est 0.")
  );
}

function genKfExpr(niv: number) {
  return () => {
    const k = niv === 1 ? pick([2, 3, 4, 5, -2, -3, 7, 10]) : pick([0.5, 1.5, -0.5, 2.5, 0.1, -1.2, 0.25]);
    const e = pick([1, 2, 3]);
    const c = cadre((v) => poly([[k, e]], v), k > 0);
    const F = `${c.F}'(${c.v})`;
    const eq = (s: string) => `$${F} = ${s}$`;
    const bon = poly([[k * e, e - 1]], c.v);
    return qcm(
      `${c.intro} ${pick([`Quelle est l’expression de $${F}$ ?`, `Que vaut $${F}$ ?`, "Quelle est sa fonction dérivée ?"])}`,
      eq(bon),
      [eq(poly([[k * e, e]], c.v)), eq(poly([[k, e - 1]], c.v)), eq(poly([[e, e - 1]], c.v)), eq(n(k)), eq(poly([[k, e]], c.v)), eq("0")],
      expl("$(k \\times u)' = k \\times u'$ : on garde le coefficient.", `on dérive $${c.v}${e > 1 ? `^${e}` : ""}$, puis on multiplie par $${n(k)}$.`, `$${F} = ${n(k)} \\times ${e === 1 ? "1" : `${e}${c.v}${e - 1 > 1 ? `^${e - 1}` : ""}`} = ${bon}$.`, `${eq(bon)}.`)
    );
  };
}

function genKfValeur(deg3: boolean) {
  return () => {
    const k = pick([0.5, 1.5, -0.5, 2.5, 0.1, -1.2, 0.25, 4, -3]);
    const e = deg3 ? pick([2, 3]) : pick([1, 2]);
    const c = cadre((v) => poly([[k, e]], v), k > 0);
    const x0 = c.pos ? rint(1, 6) : rint(-4, 6) || 2;
    const val = k * e * x0 ** (e - 1);
    const F = `${c.F}'`;
    return court(
      `${c.intro} ${pick([`Calcule $${F}(${x0})$.`, `Que vaut le nombre dérivé en $${x0}$ ?`, `Donne la valeur de $${F}(${x0})$.`])}`,
      val,
      expl("$(k \\times u)' = k \\times u'$.", `$${F}(${c.v}) = ${poly([[k * e, e - 1]], c.v)}$, puis on remplace.`, `$${F}(${x0}) = ${n(val)}$.`, `$${F}(${x0}) = ${n(val)}$.`)
    );
  };
}

function genKfVraiFaux() {
  const k = pick([2, 3, 4, 5, -2, 7]);
  const p = rint(1, 9);
  const liste: Array<[string, boolean, string]> = [
    [`La dérivée de $${k}x$ est $${k}$.`, true, `$(${k}x)' = ${k} \\times 1 = ${k}$`],
    [`La dérivée de $${k}x$ est $0$.`, false, `$(${k}x)' = ${k}$ ; c’est la dérivée d’une constante qui est nulle`],
    [`La dérivée de $${k}x + ${p}$ est $${k} + ${p}$.`, false, `la constante ${p} a pour dérivée 0 : on trouve $${k}$`],
    [`La dérivée de la constante $${p}$ est $0$.`, true, "une constante ne varie pas"],
    [`La dérivée de $${k}x^2$ est $${k} \\times 2x$.`, true, "$(k \\times u)' = k \\times u'$"],
    [`La dérivée de $${k}x^3$ est $${k} \\times 3x^3$.`, false, `l’exposant baisse : $${k} \\times 3x^2$`],
    [`Si $f(x) = ${k}x + ${p}$, le nombre dérivé est le même en tout point.`, true, "la courbe est une droite : sa pente est la même partout"],
    [`Si $f(x) = ${k}x + ${p}$, alors $f'(x) = ${k}x$.`, false, `$f'(x) = ${k}$, sans $x$`],
  ];
  const [aff, vrai, raison] = pick(liste);
  return vraiFaux(aff, vrai, expl("$(k \\times u)' = k \\times u'$, $(x)' = 1$ et une constante a pour dérivée 0.", "on dérive, puis on compare.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`));
}

const CONVERSIONS: Array<[string, number, string]> = [
  ["Le prix TTC vaut 1,2 fois le prix hors taxes", 1.2, "TTC"],
  ["Une entreprise exporte : son coût en dollars vaut 1,1 fois son coût en euros", 1.1, "en dollars"],
  ["Une filiale suisse convertit les coûts : en francs suisses, ils valent 0,95 fois ceux en euros", 0.95, "en francs suisses"],
  ["Un comptable exprime les coûts en centimes : ils valent 100 fois ceux en euros", 100, "en centimes"],
  ["Un grossiste vend par lots de 12 : le coût d’un lot vaut 12 fois celui d’une pièce", 12, "par lot"],
  ["Après une hausse de 5 %, chaque coût est multiplié par 1,05", 1.05, "après la hausse"],
  ["Une remise de 20 % multiplie chaque prix par 0,8", 0.8, "après remise"],
  ["Une coopérative partage les coûts entre 4 associés : chacun paie 0,25 fois le coût total", 0.25, "par associé"],
];

/** (k × C)' = k × C' en situation. */
function genKfCompare() {
  const [phrase, k, mot] = pick(CONVERSIONS);
  const x0 = rint(10, 200);
  const v = rint(2, 40);
  return court(
    `${phrase}. On note $C(x)$ le coût et $D(x) = ${n(k)} \\times C(x)$ le coût ${mot}. On sait que $C'(${x0}) = ${v}$. ${pick([`Que vaut $D'(${x0})$ ?`, `Calcule $D'(${x0})$.`, `Quel est le coût marginal ${mot} en $${x0}$ ?`])}`,
    k * v,
    expl("$(k \\times u)' = k \\times u'$.", "on multiplie le nombre dérivé par la même constante.", `$D'(${x0}) = ${n(k)} \\times ${v} = ${n(k * v)}$.`, `$D'(${x0}) = ${n(k * v)}$.`)
  );
}

/* =========================================================
   DER_F_SOMME (complète les gabarits gardés)
========================================================= */

function genSommeErreurValeur() {
  const p = polyAuHasard(2);
  const c = cadre((v) => tex(p, v), positif(p));
  const x0 = c.pos ? rint(1, 6) : rint(-4, 6) || 2;
  const bon = ev(der(p), x0);
  const faux = bon + p[3];
  const F = `${c.F}'`;
  if (p[3] === 0) return genDeriveeValeur(2)();
  return qcm(
    `${c.intro} Un élève calcule $${F}(${x0}) = ${n(faux)}$. ${pick(["A-t-il raison ?", "Que penser de son résultat ?"])}`,
    `Non, $${F}(${x0}) = ${n(bon)}$ : il a gardé la constante`,
    [`Oui, $${F}(${x0}) = ${n(faux)}$`, ...[...new Set([ev(p, x0), bon - p[3], bon + 1, bon - 1])].filter((w) => w !== bon && w !== faux).slice(0, 2).map((w) => `Non, $${F}(${x0}) = ${n(w)}$`)],
    expl(COURS_DERIVEES, "on dérive terme à terme : la constante disparaît.", `$${F}(${c.v}) = ${tex(der(p), c.v)}$, donc $${F}(${x0}) = ${n(bon)}$.`, `l’élève s’est trompé : il a ajouté la constante $${n(p[3])}$.`)
  );
}

/* =========================================================
   DER_ND_DEFINITION
========================================================= */

function genNdSens() {
  const T = pick(TEMPS);
  const a = rint(2, 12);
  const L = T.L;
  const bon = `la vitesse à laquelle ${T.court} évolue à l’instant $t = ${a}$`;
  return qcm(
    `${T.qui} modélise ${T.quoi} par une fonction $${L}$, où $t$ est ${T.t}. ${pick([`Que représente le nombre dérivé $${L}'(${a})$ ?`, `Comment interpréter $${L}'(${a})$ ?`, `Que mesure $${L}'(${a})$ ?`])}`,
    bon,
    [`la valeur ${de(T.court)} à l’instant $t = ${a}$`, `l’évolution moyenne ${de(T.court)} entre $t = 0$ et $t = ${a}$`, `la valeur ${de(T.court)} à l’instant $t = ${a + 1}$`],
    expl("le nombre dérivé $f'(a)$ est la vitesse d’évolution instantanée de $f$ en $a$.", "on distingue la valeur $f(a)$, l’évolution moyenne entre deux instants, et le nombre dérivé.", `$${L}'(${a})$ mesure le rythme instantané de variation à $t = ${a}$.`, `$${L}'(${a})$ est ${bon}.`)
  );
}

function genNdTauxMoyen() {
  const p = polyAuHasard(2);
  const c = cadre((v) => tex(p, v), positif(p));
  const a = c.pos ? rint(0, 5) : rint(-4, 4);
  const b = a + pick([1, 2, 4]);
  const taux = (ev(p, b) - ev(p, a)) / (b - a);
  return court(
    `${c.intro} ${pick([`Quel est le taux de variation moyen de $${c.F}$ entre $${a}$ et $${b}$ ?`, `Calcule $\\dfrac{${c.F}(${b}) - ${c.F}(${a})}{${b} - ${a < 0 ? `(${a})` : a}}$.`, `Quel est le coefficient directeur de la sécante entre les points d’abscisses $${a}$ et $${b}$ ?`])}`,
    taux,
    expl("le taux de variation moyen entre $a$ et $b$ est $\\dfrac{f(b) - f(a)}{b - a}$.", "on calcule les deux images, puis le quotient.", `$${c.F}(${b}) = ${n(ev(p, b))}$ et $${c.F}(${a}) = ${n(ev(p, a))}$, donc le taux vaut $\\dfrac{${n(ev(p, b) - ev(p, a))}}{${b - a}} = ${n(taux)}$.`, `le taux de variation moyen vaut ${n(taux)}.`)
  );
}

/** Taux entre x0 et x0 + h pour h de plus en plus petit : la limite est f'(x0). */
function genNdLimite(mot: "taux" | "secante") {
  return () => {
    const a = pick([1, 2, -1, 3, 0.5, -2]);
    const b = rint(-6, 6);
    const p: Q = [0, a, b, rint(-5, 5)];
    const c = cadre((v) => tex(p, v), positif(p));
    const x0 = c.pos ? rint(1, 6) : rint(-3, 4);
    const lim = 2 * a * x0 + b;
    const hs = pick([[1, 0.1, 0.01], [0.5, 0.1, 0.01], [1, 0.5, 0.1, 0.01]]);
    const liste = hs.map((h) => `$${n(lim + a * h)}$ pour $h = ${n(h)}$`).join(", ");
    const quoi = mot === "taux" ? `le taux de variation de $${c.F}$ entre $${x0}$ et $${x0} + h$` : `le coefficient directeur de la sécante entre les points d’abscisses $${x0}$ et $${x0} + h$`;
    return court(
      `${c.intro} On calcule ${quoi} : ${liste}. ${pick([`Vers quelle valeur se rapproche-t-il quand $h$ devient très petit ?`, `Quelle est la valeur de $${c.F}'(${x0})$ ?`, `Quel nombre dérivé ces calculs suggèrent-ils ?`])}`,
      lim,
      expl("le nombre dérivé $f'(a)$ est la valeur dont se rapproche le taux de variation entre $a$ et $a + h$ quand $h$ se rapproche de 0.", "on observe la suite des valeurs, ou on dérive pour vérifier.", `$${c.F}'(${c.v}) = ${poly([[2 * a, 1], [b, 0]], c.v)}$, donc $${c.F}'(${x0}) = ${n(lim)}$.`, `les valeurs se rapprochent de ${n(lim)}.`)
    );
  };
}

function genNdVraiFaux() {
  const a = rint(-4, 6);
  const b = a + rint(1, 4);
  const liste: Array<[string, boolean, string]> = [
    [`Le nombre dérivé $f'(${a})$ est le coefficient directeur de la tangente au point d’abscisse $${a}$.`, true, "c’est l’interprétation graphique du nombre dérivé"],
    [`Le nombre dérivé $f'(${a})$ est l’image de $${a}$ par $f$.`, false, `l’image est $f(${a})$, pas $f'(${a})$`],
    [`$f'(${a})$ est la valeur dont se rapproche le taux de variation entre $${a}$ et $${a} + h$ quand $h$ se rapproche de 0.`, true, "c’est la définition du nombre dérivé"],
    [`$f'(${a})$ est le taux de variation moyen de $f$ entre $${a}$ et $${b}$.`, false, `ce taux est le coefficient directeur d’une sécante, pas de la tangente`],
    [`Si $f'(${a}) > 0$, la courbe monte au point d’abscisse $${a}$.`, true, "la tangente a une pente positive"],
    [`Si $f(${a}) > 0$, alors $f'(${a}) > 0$.`, false, "une fonction positive peut très bien décroître"],
    [`Le taux de variation moyen entre $${a}$ et $${b}$ est le coefficient directeur de la sécante passant par les points d’abscisses $${a}$ et $${b}$.`, true, "c’est sa définition graphique"],
  ];
  const [aff, vrai, raison] = pick(liste);
  return vraiFaux(aff, vrai, expl("$f'(a)$ est la limite du taux de variation entre $a$ et $a + h$ ; c’est le coefficient directeur de la tangente en $a$.", "on compare l’affirmation à la définition.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`));
}

/* =========================================================
   Paraboles « lisibles » pour les graphiques
========================================================= */

function paraboleLisible(pentesEntieres = true) {
  const a = pentesEntieres ? pick([0.5, 1, -0.5, -1]) : pick([0.25, -0.25, 0.75, -0.75]);
  const h = rint(-1, 1);
  const k = a > 0 ? rint(-3, 0) : rint(0, 3);
  const f = (x: number) => a * (x - h) ** 2 + k;
  const fp = (x: number) => 2 * a * (x - h);
  // a(x - h)² + k = a x² - 2ah x + a h² + k
  const p: Q = [0, a, -2 * a * h, a * h * h + k];
  return { a, h, k, f, fp, p, xmin: h - 4, xmax: h + 4 };
}

/* =========================================================
   DER_ND_GEOMETRIQUE
========================================================= */

function genNgCoef() {
  const g = paraboleLisible();
  const x0 = g.h + pick([-2, -1, 1, 2]);
  const m = g.fp(x0);
  const y0 = g.f(x0);
  const bon = `$f'(${x0})$`;
  return qcm(
    `${pick(METIERS)} a tracé la courbe d’une fonction $f$ et, en vert, sa tangente au point A d’abscisse $${x0}$. ${pick(["Que représente le coefficient directeur de la droite verte ?", "Le coefficient directeur de cette tangente est égal à :", "Quel nombre la pente de la droite verte donne-t-elle ?"])}`,
    bon,
    [`$f(${x0})$`, `$${x0}$`, x0 === 0 ? "$f(1)$" : "$f'(0)$", "$f(0)$"],
    expl("le coefficient directeur de la tangente en $a$ est le nombre dérivé $f'(a)$.", "on reconnaît la tangente au point d’abscisse donnée.", `ici, il vaut $f'(${x0}) = ${n(m)}$.`, `c’est $f'(${x0})$.`),
    graphe(g.f, g.xmin, g.xmax, { droites: [{ m, p: y0 - m * x0 }], points: [{ x: x0, y: y0, label: "A" }] })
  );
}

function genNgSigne() {
  const g = paraboleLisible();
  const x0 = g.h + pick([-2, -1, 0, 1, 2]);
  const m = g.fp(x0);
  const y0 = g.f(x0);
  const bon = m > 0 ? `$f'(${x0}) > 0$` : m < 0 ? `$f'(${x0}) < 0$` : `$f'(${x0}) = 0$`;
  return qcm(
    `${pick(METIERS)} a tracé la courbe de $f$ et sa tangente au point A d’abscisse $${x0}$. ${pick([`Que peut-on dire de $f'(${x0})$, sans le calculer ?`, `Quel est le signe du nombre dérivé $f'(${x0})$ ?`, `D’après la tangente tracée, $f'(${x0})$ est :`])}`,
    bon,
    [`$f'(${x0}) > 0$`, `$f'(${x0}) < 0$`, `$f'(${x0}) = 0$`, `$f'(${x0}) = ${n(y0)}$`],
    expl("$f'(a)$ est la pente de la tangente : positive si elle monte, négative si elle descend, nulle si elle est horizontale.", "on regarde la direction de la tangente, de gauche à droite.", `la tangente ${m > 0 ? "monte" : m < 0 ? "descend" : "est horizontale"}.`, `${bon}.`),
    graphe(g.f, g.xmin, g.xmax, { droites: [{ m, p: y0 - m * x0 }], points: [{ x: x0, y: y0, label: "A" }] })
  );
}

function genNgEquation() {
  const a = rint(-4, 6);
  const m = pick([-5, -4, -3, -2, -1, 2, 3, 4, 5, 0.5, 1.5, -2.5]);
  const pp = rint(-9, 9) || 7;
  return court(
    `${pick(METIERS)} trouve que la tangente à la courbe de $f$ au point d’abscisse $${a}$ a pour équation $${droiteTex(m, pp)}$. ${pick([`Que vaut $f'(${a})$ ?`, `Quel est le nombre dérivé de $f$ en $${a}$ ?`, `Donne $f'(${a})$.`])}`,
    m,
    expl("$f'(a)$ est le coefficient directeur de la tangente en $a$.", "dans $y = mx + p$, le coefficient directeur est $m$ (et pas $p$).", `ici $m = ${n(m)}$.`, `$f'(${a}) = ${n(m)}$.`)
  );
}

function genNgDeuxPoints() {
  const a = rint(-3, 4);
  const m = pick([-3, -2, -1, 1, 2, 3, 4, 0.5, -0.5]);
  const ya = rint(-5, 5);
  const d = pick([1, 2, 4]);
  return court(
    `${pick(METIERS)} trace la tangente à la courbe de $f$ au point A${pt(a, ya)}. Elle passe aussi par B${pt(a + d, ya + m * d)}. ${pick([`Que vaut $f'(${a})$ ?`, `Quel est le nombre dérivé de $f$ en $${a}$ ?`, "Quel est le coefficient directeur de cette tangente ?"])}`,
    m,
    expl("$f'(a)$ est le coefficient directeur de la tangente en $a$.", "coefficient directeur $= \\dfrac{y_B - y_A}{x_B - x_A}$.", `$\\dfrac{${n(ya + m * d)} - ${ya < 0 ? `(${ya})` : ya}}{${n(a + d)} - ${a < 0 ? `(${a})` : a}} = \\dfrac{${n(m * d)}}{${d}} = ${n(m)}$.`, `$f'(${a}) = ${n(m)}$.`)
  );
}

/* =========================================================
   DER_ND_LIRE_GRAPHIQUE
========================================================= */

function genLireTangente(niv: number) {
  return () => {
    const g = paraboleLisible(niv === 2);
    const choix = [-2, -1, 1, 2].map((d) => g.h + d).filter((x) => (niv === 2 ? true : Math.abs(g.fp(x)) % 1 !== 0));
    const x0 = pick(choix.length ? choix : [g.h + 2]);
    const m = g.fp(x0);
    const y0 = g.f(x0);
    const d = niv === 2 ? 1 : 2;
    return court(
      `${pick(METIERS)} a tracé la courbe de $f$ et sa tangente au point A d’abscisse $${x0}$${niv === 2 ? " (le point B est sur la tangente)" : ""}. ${pick([`Lis graphiquement $f'(${x0})$.`, `Que vaut le nombre dérivé $f'(${x0})$ ?`, "Lis le coefficient directeur de la tangente.", `D’après le graphique, que vaut $f'(${x0})$ ?`])}`,
      m,
      expl("$f'(a)$ est le coefficient directeur de la tangente en $a$.", "depuis A, on avance de 1 (ou de 2) vers la droite et on lit de combien la tangente monte ou descend.", `en avançant de ${d}, la tangente ${m * d >= 0 ? "monte" : "descend"} de ${n(Math.abs(m * d))} : $f'(${x0}) = \\dfrac{${n(m * d)}}{${d}} = ${n(m)}$.`, `$f'(${x0}) = ${n(m)}$.`),
      graphe(g.f, g.xmin, g.xmax, { droites: [{ m, p: y0 - m * x0 }], points: [{ x: x0, y: y0, label: "A" }, ...(niv === 2 ? [{ x: x0 + 1, y: y0 + m, label: "B" }] : [])] })
    );
  };
}

function genLireHoriz() {
  const g = paraboleLisible();
  return court(
    `${pick(METIERS)} a tracé la courbe d’une fonction $f$. ${pick(["En quelle abscisse le nombre dérivé est-il nul ?", "Pour quelle valeur de $x$ a-t-on $f'(x) = 0$ ?", "À quelle abscisse la tangente est-elle horizontale ?"])}`,
    g.h,
    expl("$f'(a) = 0$ quand la tangente en $a$ est horizontale.", "on repère le sommet de la courbe.", `le sommet a pour abscisse $${g.h}$.`, `$f'(${g.h}) = 0$.`),
    graphe(g.f, g.xmin, g.xmax)
  );
}

function genLireComparer() {
  const g = paraboleLisible();
  const [x1, x2] = pick([[-2, 1], [-1, 2], [-2, 2], [1, 2], [-2, -1], [-1, 1]]).map((d) => g.h + d);
  const m1 = g.fp(x1), m2 = g.fp(x2);
  const cmp = (u: number, v: number) => (u < v ? "<" : u > v ? ">" : "=");
  const bon = `$f'(${x1}) ${cmp(m1, m2)} f'(${x2})$`;
  return qcm(
    `${pick(METIERS)} a tracé la courbe de $f$ et placé les points A et B d’abscisses $${x1}$ et $${x2}$. ${pick(["Compare les nombres dérivés en ces deux points.", "Laquelle de ces comparaisons est juste ?", "Imagine les tangentes en A et en B. Que peut-on dire ?"])}`,
    bon,
    ["<", ">", "="].filter((s) => s !== cmp(m1, m2)).map((s) => `$f'(${x1}) ${s} f'(${x2})$`),
    expl("$f'(a)$ est la pente de la tangente en $a$.", "on compare l’inclinaison des tangentes en A et en B.", `$f'(${x1}) = ${n(m1)}$ et $f'(${x2}) = ${n(m2)}$.`, `${bon}.`),
    graphe(g.f, g.xmin, g.xmax, { points: [{ x: x1, y: g.f(x1), label: "A" }, { x: x2, y: g.f(x2), label: "B" }] })
  );
}

function genLireSigneZone() {
  const g = paraboleLisible();
  const demande = pick(["positif", "négatif"]);
  // a > 0 : f' < 0 avant h, > 0 après.
  const bon = (demande === "positif") === g.a > 0 ? ivD(g.h) : ivG(g.h);
  return qcm(
    `${pick(METIERS)} a tracé la courbe d’une fonction $f$. ${pick([`Sur quel intervalle le nombre dérivé $f'(x)$ est-il ${demande} ?`, `D’après la courbe, où $f'(x)$ est-il ${demande} ?`])}`,
    bon,
    [bon === ivD(g.h) ? ivG(g.h) : ivD(g.h), "$\\mathbb{R}$", bon === ivD(g.h) ? ivD(g.h + 2) : ivG(g.h - 2)],
    expl("$f'(x) > 0$ là où la courbe monte, $f'(x) < 0$ là où elle descend.", "on lit où la courbe monte et où elle descend.", `la courbe ${g.a > 0 ? "descend puis monte" : "monte puis descend"}, avec un sommet en $x = ${g.h}$.`, `$f'(x)$ est ${demande} sur ${bon}.`),
    graphe(g.f, g.xmin, g.xmax)
  );
}

function genLireEquation() {
  const g = paraboleLisible();
  const x0 = g.h + pick([-2, -1, 1, 2]);
  const m = g.fp(x0);
  const y0 = g.f(x0);
  const p = y0 - m * x0;
  const bon = `$${droiteTex(m, p)}$`;
  return qcm(
    `${pick(METIERS)} a tracé la courbe de $f$ et sa tangente au point A d’abscisse $${x0}$. ${pick(["Lis $f(" + x0 + ")$ et $f'(" + x0 + ")$, puis choisis l’équation de la tangente.", "Quelle est l’équation réduite de la tangente tracée ?"])}`,
    bon,
    [`$${droiteTex(m, y0)}$`, `$${droiteTex(y0, m)}$`, `$${droiteTex(-m, y0 + m * x0)}$`, `$${droiteTex(m, p + 1)}$`, `$${droiteTex(m + 1, p)}$`, `$${droiteTex(m, p - 2)}$`],
    expl("la tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.", "on lit $f(a)$ (ordonnée de A) et $f'(a)$ (pente de la tangente).", `$f(${x0}) = ${n(y0)}$ et $f'(${x0}) = ${n(m)}$, donc $y = ${tanDev(m, x0, y0)}$.`, `${bon}.`),
    graphe(g.f, g.xmin, g.xmax, { droites: [{ m, p }], points: [{ x: x0, y: y0, label: "A" }] })
  );
}

/* =========================================================
   DER_ND_COUT_MARGINAL
========================================================= */

function genMargInterp() {
  const P = pick(PRODS);
  const q = rint(2, 30) * 10;
  const v = rint(3, 60);
  const bon = `produire ${P.un} de plus coûte environ ${v} €`;
  return qcm(
    `${P.qui} note $C(x)$ le coût total, en euros, de $x$ ${P.unites}. On a calculé $C'(${q}) = ${v}$. ${pick(["Comment interpréter ce nombre ?", "Que signifie ce résultat ?", "Quelle phrase traduit ce coût marginal ?"])}`,
    bon,
    [`produire ${q} ${P.unites} coûte ${v} €`, `le coût moyen par unité est de ${v} €`, `produire ${v} ${P.unites} de plus coûte environ ${q} €`],
    expl("le coût marginal $C'(q)$ est le coût approximatif d’une unité supplémentaire, quand on en produit déjà $q$.", "on distingue le coût total $C(q)$, le coût moyen et le coût marginal $C'(q)$.", `$C'(${q}) = ${v}$ : passer de ${q} à ${q + 1} coûte environ ${v} €.`, `${bon}.`)
  );
}

function genMargCalcul() {
  const P = pick(PRODS);
  const a = pick([0.5, 0.1, 0.2, 1, 0.05, 2]);
  const b = rint(2, 30);
  const c = rint(50, 900);
  const q = rint(2, 20) * 5;
  const v = 2 * a * q + b;
  return court(
    `${P.qui} produit $x$ ${P.unites}. Le coût total est $C(x) = ${poly([[a, 2], [b, 1], [c, 0]])}$ euros. ${pick([`Calcule le coût marginal $C'(${q})$.`, `Que vaut $C'(${q})$ ?`, `Combien coûte environ ${P.un} de plus, quand on en produit déjà ${q} ?`])}`,
    v,
    expl("le coût marginal est $C'(q)$.", `$C'(x) = ${poly([[2 * a, 1], [b, 0]])}$.`, `$C'(${q}) = ${n(2 * a)} \\times ${q} + ${b} = ${n(v)}$.`, `le coût marginal vaut ${n(v)} € pour $x = ${q}$.`)
  );
}

function genMargDecision() {
  const P = pick(PRODS);
  const q = rint(2, 30) * 10;
  const cm = rint(10, 50);
  const prix = cm + pick([-8, -5, -3, 3, 5, 10, 15]);
  const rentable = prix > cm;
  const bon = rentable ? `oui : ${P.un} de plus rapporte ${prix} € et coûte environ ${cm} €` : `non : ${P.un} de plus coûte environ ${cm} € et ne rapporte que ${prix} €`;
  return qcm(
    `${P.qui} produit déjà ${q} ${P.unites}, et le coût marginal vaut $C'(${q}) = ${cm}$ €. Chaque unité se vend ${prix} €. ${pick(["A-t-on intérêt à produire une unité de plus ?", "Produire une unité supplémentaire est-il rentable ?"])}`,
    bon,
    rentable
      ? [`non : ${P.un} de plus coûte environ ${cm} € et ne rapporte que ${prix} €`, `on ne peut pas savoir sans $C(${q})$`, `non : il faudrait que $C'(${q}) = 0$`]
      : [`oui : ${P.un} de plus rapporte ${prix} € et coûte environ ${cm} €`, `on ne peut pas savoir sans $C(${q})$`, `oui : il faut toujours produire plus`],
    expl("$C'(q)$ est le coût approximatif d’une unité supplémentaire.", "on compare ce coût au prix de vente.", `prix ${prix} € ; coût marginal ${cm} €.`, `${bon}.`)
  );
}

const MOUVEMENTS: Array<[string, string]> = [
  ["Une cycliste sur piste", "m"],
  ["Un coureur de 100 m", "m"],
  ["Une voiture de rallye au départ", "m"],
  ["Un nageur sur 50 m", "m"],
  ["Une skieuse sur une pente", "m"],
  ["Un drone de livraison", "m"],
  ["Une trottinette électrique", "m"],
  ["Un tramway qui quitte la station", "m"],
];

function genVitesseInst() {
  const [qui, u] = pick(MOUVEMENTS);
  const a = pick([0.5, 1, 1.5, 2, 0.25]);
  const b = rint(1, 8);
  const t0 = rint(1, 10);
  const v = 2 * a * t0 + b;
  return court(
    `${qui} parcourt $d(t) = ${poly([[a, 2], [b, 1]], "t")}$ ${u} en $t$ secondes. On veut connaître la vitesse à $t = ${t0}$. ${pick([`Calcule $d'(${t0})$.`, `Quelle est la vitesse instantanée à $t = ${t0}$ (en ${u}/s) ?`])}`,
    v,
    expl("la vitesse instantanée est le nombre dérivé de la distance.", `$d'(t) = ${poly([[2 * a, 1], [b, 0]], "t")}$.`, `$d'(${t0}) = ${n(2 * a)} \\times ${t0} + ${b} = ${n(v)}$.`, `la vitesse vaut ${n(v)} ${u}/s.`)
  );
}

/* =========================================================
   DER_SECANTE_TRACER
========================================================= */

function genSecPente() {
  const g = paraboleLisible();
  const [d1, d2] = pick([[-2, 1], [-1, 2], [-3, 1], [0, 2], [-2, 0], [1, 3], [-3, -1]]);
  const x1 = g.h + d1, x2 = g.h + d2;
  const y1 = g.f(x1), y2 = g.f(x2);
  const m = (y2 - y1) / (x2 - x1);
  return court(
    `${pick(METIERS)} a tracé la courbe de $f$ et la sécante qui passe par les points A et B d’abscisses $${x1}$ et $${x2}$. ${pick(["Quel est le coefficient directeur de cette sécante ?", "Calcule la pente de la droite (AB).", `Quel est le taux de variation moyen de $f$ entre $${x1}$ et $${x2}$ ?`])}`,
    m,
    expl("la sécante (AB) a pour coefficient directeur $\\dfrac{f(b) - f(a)}{b - a}$.", "on lit les ordonnées de A et de B, puis on calcule le quotient.", `A${pt(x1, y1)} et B${pt(x2, y2)} : $\\dfrac{${n(y2)} - ${y1 < 0 ? `(${n(y1)})` : n(y1)}}{${x2} - ${x1 < 0 ? `(${x1})` : x1}} = ${n(m)}$.`, `le coefficient directeur vaut ${n(m)}.`),
    graphe(g.f, g.xmin, g.xmax, { droites: [{ m, p: y1 - m * x1, couleur: "#9333ea" }], points: [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }] })
  );
}

function genSecPoints() {
  const g = paraboleLisible();
  const [d1, d2] = pick([[-2, 1], [-1, 2], [-3, 1], [0, 2], [-2, 0], [1, 3], [-3, -1]]);
  const x1 = g.h + d1, x2 = g.h + d2;
  const m = (g.f(x2) - g.f(x1)) / (x2 - x1);
  const bon = `les points d’abscisses $${x1}$ et $${x2}$`;
  return qcm(
    `${pick(METIERS)} a tracé la courbe de $f$ et une sécante. ${pick(["En quels points cette sécante coupe-t-elle la courbe ?", "Par quels points de la courbe passe la droite tracée ?", "Lis les abscisses des points communs à la droite et à la courbe."])}`,
    bon,
    [`les points d’abscisses $${x1}$ et $${x2 + 1}$`, `les points d’abscisses $${x1 - 1}$ et $${x2}$`, `le seul point d’abscisse $${x1}$`, `les points d’abscisses $${-x1}$ et $${-x2}$`],
    expl("une sécante coupe la courbe en deux points.", "on lit les abscisses des points d’intersection.", `la droite coupe la courbe en $x = ${x1}$ et en $x = ${x2}$.`, `${bon}.`),
    graphe(g.f, g.xmin, g.xmax, { droites: [{ m, p: g.f(x1) - m * x1, couleur: "#9333ea" }] })
  );
}

function genSecTaux() {
  const a = rint(-4, 5);
  const b = a + rint(1, 5);
  const bon = `$\\dfrac{f(${b}) - f(${a})}{${b} - ${a < 0 ? `(${a})` : a}}$`;
  return qcm(
    `${pick(METIERS)} trace la sécante à la courbe de $f$ passant par les points d’abscisses $${a}$ et $${b}$. ${pick(["Son coefficient directeur est égal à :", "Comment calcule-t-on la pente de cette sécante ?", "Quel quotient donne le coefficient directeur de cette droite ?"])}`,
    bon,
    [`$\\dfrac{${b} - ${a < 0 ? `(${a})` : a}}{f(${b}) - f(${a})}$`, `$f(${b}) - f(${a})$`, `$f'(${a})$`, `$\\dfrac{f(${b}) + f(${a})}{${b} + ${a < 0 ? `(${a})` : a}}$`],
    expl("le coefficient directeur d’une droite passant par deux points est $\\dfrac{\\Delta y}{\\Delta x}$.", "variation des ordonnées divisée par variation des abscisses.", "on calcule $\\dfrac{f(b) - f(a)}{b - a}$ : c’est le taux de variation moyen.", `${bon}.`)
  );
}

function genSecEquation() {
  const a = pick([1, -1, 2, 0.5]);
  const b = rint(-4, 4);
  const p: Q = [0, a, b, rint(-5, 5)];
  const x1 = rint(-3, 2);
  const x2 = x1 + pick([1, 2]);
  const m = (ev(p, x2) - ev(p, x1)) / (x2 - x1);
  const q = ev(p, x1) - m * x1;
  const bon = `$${droiteTex(m, q)}$`;
  const mt = 2 * a * x1 + b;
  return qcm(
    `Soit $f(x) = ${tex(p)}$. ${pick([`Quelle est l’équation de la sécante passant par les points de la courbe d’abscisses $${x1}$ et $${x2}$ ?`, `On trace la droite qui joint les points de la courbe d’abscisses $${x1}$ et $${x2}$. Son équation est :`])}`,
    bon,
    [`$${droiteTex(mt, ev(p, x1) - mt * x1)}$`, `$${droiteTex(m, ev(p, x1))}$`, `$${droiteTex(-m, ev(p, x1) + m * x1)}$`, `$${droiteTex(m, q + 2)}$`, `$${droiteTex(m + 1, q)}$`, `$${droiteTex(m, q - 1)}$`],
    expl("la sécante passe par A$(x_1\\,;f(x_1))$ et B$(x_2\\,;f(x_2))$.", "on calcule le coefficient directeur, puis l’ordonnée à l’origine avec A.", `$f(${x1}) = ${n(ev(p, x1))}$, $f(${x2}) = ${n(ev(p, x2))}$, $m = ${n(m)}$, puis $p = ${n(ev(p, x1))} - ${par(m)} \\times ${par(x1)} = ${n(q)}$.`, `${bon}.`)
  );
}

/* =========================================================
   DER_TANGENTE_LIMITE
========================================================= */

function genLimVers() {
  const g = paraboleLisible();
  const x0 = g.h + pick([-2, -1, 1]);
  const x1 = x0 + 2;
  const m = (g.f(x1) - g.f(x0)) / 2;
  const bon = "la tangente à la courbe au point A";
  return qcm(
    `${pick(METIERS)} a tracé la sécante (AB) à la courbe de $f$, avec A d’abscisse $${x0}$ et B d’abscisse $${x1}$. On rapproche B de A, en restant sur la courbe. ${pick(["Vers quelle droite la sécante se rapproche-t-elle ?", "Quelle position limite la sécante atteint-elle ?"])}`,
    bon,
    ["la tangente à la courbe au point B", "l’axe des abscisses", "la droite qui passe par A et par l’origine"],
    expl("la tangente en A est la position limite des sécantes (AB) quand B se rapproche de A.", "on imagine B glisser le long de la courbe jusqu’à A.", `les sécantes pivotent autour de A et se rapprochent de la tangente en A, de coefficient directeur $f'(${x0}) = ${n(g.fp(x0))}$.`, `${bon}.`),
    graphe(g.f, g.xmin, g.xmax, { droites: [{ m, p: g.f(x0) - m * x0, couleur: "#9333ea" }], points: [{ x: x0, y: g.f(x0), label: "A" }, { x: x1, y: g.f(x1), label: "B" }] })
  );
}

const CHRONOS: Array<[string, string]> = [
  ["Une entraîneuse chronomètre un sprinteur", "m"],
  ["Un ingénieur teste un train", "m"],
  ["Une physicienne lâche une balle", "m"],
  ["Un moniteur observe une voiture qui démarre", "m"],
  ["Une technicienne teste un ascenseur", "m"],
  ["Un coach suit une cycliste", "m"],
];

function genLimVitesse() {
  const [qui, u] = pick(CHRONOS);
  const k = pick([0.5, 1, 2, 2.5, 5]);
  const t0 = rint(1, 8);
  const lim = 2 * k * t0;
  const hs = [1, 0.1, 0.01];
  const liste = hs.map((h) => `$${n(lim + k * h)}$ ${u}/s entre $t = ${t0}$ et $t = ${n(t0 + h)}$`).join(", ");
  return court(
    `${qui} : la distance parcourue est $d(t) = ${poly([[k, 2]], "t")}$ (en ${u}). Les vitesses moyennes valent ${liste}. ${pick([`Quelle est la vitesse instantanée à $t = ${t0}$ ?`, `Vers quelle valeur se rapprochent ces vitesses moyennes ?`])}`,
    lim,
    expl("la vitesse instantanée est la limite des vitesses moyennes sur des durées de plus en plus courtes : c’est $d'(t)$.", "on observe la suite des vitesses moyennes, ou on dérive.", `$d'(t) = ${poly([[2 * k, 1]], "t")}$, donc $d'(${t0}) = ${n(lim)}$.`, `la vitesse instantanée vaut ${n(lim)} ${u}/s.`)
  );
}

function genLimFormule() {
  const a = pick([1, 2, -1, 3, -2, 0.5]);
  const b = rint(-6, 6);
  const p: Q = [0, a, b, rint(-6, 6)];
  const x0 = rint(-3, 4);
  const m = 2 * a * x0 + b;
  return court(
    `Soit $f(x) = ${tex(p)}$. On montre que le coefficient directeur de la sécante entre les points d’abscisses $${x0}$ et $${x0} + h$ vaut $${poly([[m, 0], [a, 1]], "h")}$. ${pick(["Vers quelle valeur tend-il quand $h$ se rapproche de 0 ?", `Quel est le coefficient directeur de la tangente au point d’abscisse $${x0}$ ?`, `Que vaut $f'(${x0})$ ?`])}`,
    m,
    expl("la tangente est la position limite des sécantes ; son coefficient directeur est la limite de leurs pentes.", "quand $h$ se rapproche de 0, le terme en $h$ disparaît.", `il reste $${n(m)}$ ; d’ailleurs $f'(x) = ${poly([[2 * a, 1], [b, 0]])}$ donne $f'(${x0}) = ${n(m)}$.`, `la limite vaut ${n(m)}.`)
  );
}

/* =========================================================
   DER_TANGENTE_RECONNAITRE
========================================================= */

function genRecoCanvas() {
  const g = paraboleLisible();
  const x0 = g.h + pick([-2, -1, 1, 2]);
  const y0 = g.f(x0);
  const estTangente = Math.random() < 0.5;
  const x1 = x0 + pick([-2, 2]);
  const m = estTangente ? g.fp(x0) : (g.f(x1) - y0) / (x1 - x0);
  const bon = estTangente ? "la tangente à la courbe en A" : "une sécante à la courbe";
  return qcm(
    `${pick(METIERS)} a tracé la courbe de $f$ et une droite passant par le point A d’abscisse $${x0}$. ${pick(["Cette droite est :", "Comment appelle-t-on la droite tracée ?", "La droite verte est-elle la tangente en A ?"])}`,
    bon,
    [estTangente ? "une sécante à la courbe" : "la tangente à la courbe en A", "l’axe de symétrie de la courbe", "on ne peut pas savoir"],
    expl("la tangente « frôle » la courbe en A et suit sa direction ; une sécante la coupe en un second point.", "on regarde si la droite recoupe la courbe près de A.", estTangente ? "la droite touche la courbe en A sans la traverser." : `la droite recoupe la courbe au point d’abscisse $${x1}$.`, `c’est ${bon}.`),
    graphe(g.f, g.xmin, g.xmax, { droites: [{ m, p: y0 - m * x0 }], points: [{ x: x0, y: y0, label: "A" }] })
  );
}

function genRecoTest() {
  const p = polyAuHasard(2);
  const x0 = rint(-3, 4);
  const y0 = ev(p, x0);
  const fp0 = ev(der(p), x0);
  const estTangente = Math.random() < 0.5;
  const m = estTangente ? fp0 : fp0 + pick([-2, -1, 1, 2, 3]);
  const q = y0 - m * x0;
  const bon = estTangente ? `oui : elle passe par A et son coefficient directeur vaut $f'(${x0})$` : `non : son coefficient directeur n’est pas $f'(${x0}) = ${n(fp0)}$`;
  return qcm(
    `Soit $f(x) = ${tex(p)}$ et A le point de la courbe d’abscisse $${x0}$. La droite $${droiteTex(m, q)}$ passe par A. ${pick(["Est-ce la tangente en A ?", "Cette droite est-elle tangente à la courbe en A ?"])}`,
    bon,
    estTangente
      ? [`non : son coefficient directeur n’est pas $f'(${x0})$`, "on ne peut pas savoir sans tracer la courbe", "non : une tangente passe par l’origine"]
      : [`oui : elle passe par A et son coefficient directeur vaut $f'(${x0})$`, "oui : il suffit qu’elle passe par A", "on ne peut pas savoir sans tracer la courbe"],
    expl("la tangente en A passe par A ET a pour coefficient directeur $f'(x_A)$.", "on calcule $f'(x_A)$ et on le compare au coefficient directeur de la droite.", `$f'(x) = ${tex(der(p))}$, donc $f'(${x0}) = ${n(fp0)}$ ; la droite a pour coefficient directeur $${n(m)}$.`, `${bon}.`)
  );
}

function genRecoCritere() {
  const a = rint(-4, 5);
  const liste: Array<[string, boolean, string]> = [
    [`La tangente au point d’abscisse $${a}$ a pour coefficient directeur $f'(${a})$.`, true, "c’est sa définition"],
    [`Une droite qui passe par le point de la courbe d’abscisse $${a}$ est forcément la tangente en ce point.`, false, "une infinité de droites passent par ce point ; une seule a la bonne pente"],
    [`La tangente au point d’abscisse $${a}$ est la position limite des sécantes passant par ce point.`, true, "on rapproche le second point du premier"],
    [`La tangente au point d’abscisse $${a}$ a pour coefficient directeur $f(${a})$.`, false, `c’est $f'(${a})$, pas $f(${a})$`],
    ["Au sommet d’une parabole, la tangente est horizontale.", true, "le nombre dérivé y est nul"],
    ["Une sécante coupe la courbe en au moins deux points.", true, "c’est sa définition"],
    [`Si $f'(${a}) = 0$, la tangente au point d’abscisse $${a}$ est verticale.`, false, "un coefficient directeur nul donne une droite horizontale"],
  ];
  const [aff, vrai, raison] = pick(liste);
  return vraiFaux(aff, vrai, expl("la tangente en $a$ passe par le point de la courbe d’abscisse $a$ et a pour coefficient directeur $f'(a)$.", "on compare l’affirmation à la définition.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`));
}

function genRecoEquation() {
  const p = polyAuHasard(2);
  const c = cadre((v) => tex(p, v), positif(p));
  const x0 = c.pos ? rint(1, 5) : rint(-3, 4);
  const y0 = ev(p, x0), m = ev(der(p), x0);
  const q = y0 - m * x0;
  const v = c.v;
  const dt = (mm: number, pp: number) => `$y = ${poly([[mm, 1], [pp, 0]], v)}$`;
  const ms = (ev(p, x0 + 1) - y0);
  return qcm(
    `${c.intro} ${pick([`Parmi ces droites, laquelle est la tangente à la courbe au point d’abscisse $${x0}$ ?`, `Quelle droite est tangente à la courbe de $${c.F}$ en $${x0}$ ?`])}`,
    dt(m, q),
    [dt(ms, y0 - ms * x0), dt(m, y0), dt(y0, m), dt(m + 1, y0 - (m + 1) * x0), dt(m, q + 1), dt(-m, q)],
    expl("la tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.", "on calcule $f(a)$ et $f'(a)$.", `$${c.F}(${x0}) = ${n(y0)}$ et $${c.F}'(${x0}) = ${n(m)}$, donc $y = ${tanDev(m, x0, y0, v)}$.`, `la tangente est ${dt(m, q)}.`)
  );
}

/* =========================================================
   DER_TG_* : tangente
========================================================= */

/** Point de contact (a ; f(a)) et pente m, à partir d’un polynôme habillé. */
function tangenteHabillee() {
  const deg = pick([2, 2, 3] as const);
  const p = deg === 3 ? ([pick([1, -1, 0.5]), rint(-3, 3), rint(-6, 6), rint(-5, 5)] as Q) : polyAuHasard(2);
  const c = cadre((v) => tex(p, v), positif(p));
  const a = c.pos ? rint(1, 4) : rint(-3, 3);
  const y0 = ev(p, a), m = ev(der(p), a);
  return { p, c, a, y0, m, q: y0 - m * a };
}

function genTgEqCtx() {
  const { p, c, a, y0, m, q } = tangenteHabillee();
  const v = c.v;
  const dt = (mm: number, pp: number) => `$y = ${poly([[mm, 1], [pp, 0]], v)}$`;
  const bon = dt(m, q);
  return qcm(
    `${c.intro} ${pick([`Quelle est l’équation réduite de la tangente à la courbe au point d’abscisse $${a}$ ?`, `Donne l’équation de la tangente en $${a}$.`, `On trace la tangente à la courbe de $${c.F}$ en $${a}$. Son équation réduite est :`])}`,
    bon,
    [dt(m, y0), dt(y0, m), dt(m, y0 + m * a), dt(-m, y0 + m * a), dt(m + 1, q), dt(m, q - 1), dt(m - 1, q + 1)],
    expl("la tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.", "on calcule $f(a)$, puis $f'(a)$, puis on développe.", `$${c.F}(${a}) = ${n(y0)}$ ; $${c.F}'(${v}) = ${tex(der(p), v)}$ donc $${c.F}'(${a}) = ${n(m)}$ ; $y = ${tanDev(m, a, y0, v)}$.`, `${bon}.`)
  );
}

function intro2(a: number, y0: number, m: number) {
  const t = rint(1, 3);
  if (t === 1) return { intro: `On sait que $f(${a}) = ${n(y0)}$ et $f'(${a}) = ${n(m)}$.`, F: "f", v: "x" };
  if (t === 2) {
    const P = pick(PRODS);
    return { intro: `${P.qui} étudie son bénéfice $B(x)$ pour $x$ ${P.unites} (en centaines d’euros). On sait que $B(${a}) = ${n(y0)}$ et $B'(${a}) = ${n(m)}$.`, F: "B", v: "x" };
  }
  const T = pick(TEMPS);
  return { intro: `${T.qui} étudie ${T.quoi}, notée $${T.L}(t)$ où $t$ est ${T.t}. On sait que $${T.L}(${a}) = ${n(y0)}$ et $${T.L}'(${a}) = ${n(m)}$.`, F: T.L, v: "t" };
}

function genTgEqDonnees() {
  const a = rint(1, 6);
  const y0 = rint(-9, 12);
  const m = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5, 0.5, -0.5]);
  const { intro, v } = intro2(a, y0, m);
  const dt = (mm: number, pp: number) => `$y = ${poly([[mm, 1], [pp, 0]], v)}$`;
  const bon = dt(m, y0 - m * a);
  return qcm(
    `${intro} ${pick([`Quelle est l’équation réduite de la tangente à la courbe au point d’abscisse $${a}$ ?`, "Quelle est l’équation de la tangente en ce point ?"])}`,
    bon,
    [dt(m, y0), dt(y0, m), dt(m, y0 + m * a), dt(y0, m - y0 * a), dt(m + 1, y0 - m * a), dt(m, y0 - m * a + 2)],
    expl("la tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.", "on remplace, puis on développe.", `$y = ${tanDev(m, a, y0, v)} = ${poly([[m, 1], [y0 - m * a, 0]], v)}$.`, `${bon}.`)
  );
}

function genTgOrdonnee() {
  const { c, a, y0, m, q } = tangenteHabillee();
  return court(
    `${c.intro} On trace la tangente à la courbe au point d’abscisse $${a}$. ${pick(["Quelle est son ordonnée à l’origine ?", `En quelle ordonnée coupe-t-elle l’axe des ordonnées ?`])}`,
    q,
    expl("la tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.", "on calcule $f(a)$ et $f'(a)$, puis on développe : l’ordonnée à l’origine est le terme constant.", `$${c.F}(${a}) = ${n(y0)}$, $${c.F}'(${a}) = ${n(m)}$, donc $y = ${poly([[m, 1], [q, 0]], c.v)}$.`, `l’ordonnée à l’origine vaut ${n(q)}.`)
  );
}

function genTgApprox() {
  const a = rint(1, 8);
  const y0 = rint(-9, 20);
  const m = pick([-4, -3, -2, -1.5, 1, 2, 3, 4, 0.5, 6]);
  const h = pick([0.1, 0.2, -0.1, 0.5, 0.05]);
  const { intro, F } = intro2(a, y0, m);
  const val = y0 + m * h;
  return court(
    `${intro} ${pick([`Grâce à la tangente en $${a}$, donne une valeur approchée de $${F}(${n(a + h)})$.`, `En approchant la courbe par sa tangente en $${a}$, estime $${F}(${n(a + h)})$.`])}`,
    val,
    expl("près de $a$, la courbe est proche de sa tangente : $f(a + h) \\approx f(a) + f'(a) \\times h$.", "on remplace dans l’équation de la tangente.", `$${F}(${n(a + h)}) \\approx ${n(y0)} + ${par(m)} \\times ${par(h)} = ${n(val)}$.`, `la valeur approchée est ${n(val)}.`)
  );
}

function genConsSecondPoint() {
  const a = rint(-3, 5);
  const y0 = rint(-6, 6);
  const m = pick([-4, -3, -2, -1, 1, 2, 3, 4, 0.5, -0.5]);
  const bon = pt(a + 1, y0 + m);
  return qcm(
    `${pick(METIERS)} veut tracer à la règle la tangente à la courbe de $f$ au point A${pt(a, y0)}, sachant que $f'(${a}) = ${n(m)}$. ${pick(["Quel second point de la tangente peut-on placer ?", "Quel point appartient aussi à cette tangente ?"])}`,
    bon,
    [pt(a + m, y0 + 1), pt(a + 1, y0 - m), pt(a + 1, m), pt(a, y0 + m)],
    expl("la tangente en A a pour coefficient directeur $f'(a)$ : quand $x$ augmente de 1, $y$ varie de $f'(a)$.", "depuis A, on avance de 1 et on monte (ou on descend) de $f'(a)$.", `$(${a} + 1\\,;${n(y0)} + ${m < 0 ? `(${n(m)})` : n(m)}) = (${a + 1}\\,;${n(y0 + m)})$.`, `${bon}.`)
  );
}

function genConsMethode() {
  const a = rint(-3, 5);
  const y0 = rint(-6, 6);
  const m = pick([-4, -3, -2, 2, 3, 4, 5, -5]);
  const geste = (mm: number) => (mm > 0 ? `monter de ${mm}` : `descendre de ${-mm}`);
  const bon = `placer A${pt(a, y0)}, puis avancer de 1 vers la droite et ${geste(m)}`;
  return qcm(
    `On sait que $f(${a}) = ${y0}$ et $f'(${a}) = ${m}$. ${pick([`Comment tracer la tangente au point d’abscisse $${a}$, sans calculer son équation ?`, "Quelle méthode permet de construire la tangente en ce point ?"])}`,
    bon,
    [`placer A${pt(a, y0)}, puis avancer de 1 vers la droite et ${geste(-m)}`, `placer A${pt(a, y0)}, puis avancer de ${Math.abs(m)} vers la droite et monter de 1`, `placer A${pt(a, m)}, puis avancer de 1 vers la droite et ${geste(y0 || 1)}`],
    expl("le coefficient directeur $f'(a)$ indique de combien $y$ varie quand $x$ augmente de 1.", "on place le point de contact, puis on utilise la pente.", `$f'(${a}) = ${m}$ : pour 1 vers la droite, il faut ${geste(m)}.`, `${bon}.`)
  );
}

function genConsOrdonnee() {
  const a = rint(-3, 5);
  const y0 = rint(-6, 8);
  const m = pick([-4, -3, -2, -1, 1, 2, 3, 4, 0.5, 1.5]);
  const k = pick([2, 3, -1, -2, 4]);
  return court(
    `${pick(METIERS)} construit la tangente à la courbe de $f$ au point A${pt(a, y0)}, avec $f'(${a}) = ${n(m)}$. ${pick([`Quelle est l’ordonnée du point de la tangente d’abscisse $${a + k}$ ?`, `Sur cette tangente, quel point a pour abscisse $${a + k}$ ? Donne son ordonnée.`])}`,
    y0 + k * m,
    expl("quand $x$ varie de $k$ sur la tangente, $y$ varie de $k \\times f'(a)$.", "on part de A et on multiplie le déplacement horizontal par la pente.", `$${n(y0)} + ${k < 0 ? `(${k})` : k} \\times ${m < 0 ? `(${n(m)})` : n(m)} = ${n(y0 + k * m)}$.`, `l’ordonnée vaut ${n(y0 + k * m)}.`)
  );
}

function genConsAxe() {
  const a = rint(1, 5);
  const y0 = rint(-6, 8);
  const m = pick([-4, -3, -2, -1, 1, 2, 3, 0.5, 1.5]);
  return court(
    `${pick(METIERS)} trace la tangente à la courbe de $f$ au point A${pt(a, y0)}, avec $f'(${a}) = ${n(m)}$. ${pick(["En quelle ordonnée la tangente coupe-t-elle l’axe des ordonnées ?", "Quelle est l’ordonnée à l’origine de cette tangente ?"])}`,
    y0 - m * a,
    expl("la tangente a pour équation $y = f'(a)(x - a) + f(a)$.", "on remplace $x$ par 0.", `$y = ${n(m)} \\times (0 - ${a}) + ${y0 < 0 ? `(${y0})` : y0} = ${n(y0 - m * a)}$.`, `elle coupe l’axe des ordonnées en ${n(y0 - m * a)}.`)
  );
}

function genVerifPoint() {
  const { c, a, y0, m, q } = tangenteHabillee();
  const xM = a + pick([-2, -1, 1, 2, 3]);
  const surT = Math.random() < 0.5;
  const yM = m * xM + q + (surT ? 0 : pick([-2, -1, 1, 2]));
  const bon = surT ? "oui" : "non";
  return qcm(
    `${c.intro} La tangente au point d’abscisse $${a}$ a pour équation $y = ${poly([[m, 1], [q, 0]], c.v)}$. ${pick([`Le point M${pt(xM, yM)} appartient-il à cette tangente ?`, `Le point M${pt(xM, yM)} est-il sur cette tangente ?`])}`,
    bon,
    [surT ? "non" : "oui", "on ne peut pas savoir sans la courbe"],
    expl("un point est sur une droite si ses coordonnées vérifient son équation.", "on remplace l’abscisse de M dans l’équation et on compare à son ordonnée.", `$${n(m)} \\times ${xM < 0 ? `(${xM})` : xM} + ${q < 0 ? `(${n(q)})` : n(q)} = ${n(m * xM + q)}$, à comparer à $${n(yM)}$.`, `réponse : ${bon}.`)
  );
}

function genVerifManquante() {
  const { c, a, y0, m, q } = tangenteHabillee();
  const xM = a + pick([-2, -1, 1, 2, 3]);
  return court(
    `${c.intro} La tangente au point d’abscisse $${a}$ a pour équation $y = ${poly([[m, 1], [q, 0]], c.v)}$. ${pick([`Le point M d’abscisse $${xM}$ est sur cette tangente. Quelle est son ordonnée ?`, `Complète : le point M$(${xM}\\,;\\,?)$ appartient à la tangente. Quelle est son ordonnée ?`])}`,
    m * xM + q,
    expl("un point est sur une droite si ses coordonnées vérifient son équation.", "on remplace $x$ par l’abscisse de M.", `$y = ${n(m)} \\times ${xM < 0 ? `(${xM})` : xM} + ${q < 0 ? `(${n(q)})` : n(q)} = ${n(m * xM + q)}$.`, `l’ordonnée de M vaut ${n(m * xM + q)}.`)
  );
}

function genVerifQuel() {
  const m = pick([-3, -2, -1, 1, 2, 3, 4, 0.5]);
  const q = rint(-6, 6);
  const xs = [rint(-3, -1), rint(0, 2), rint(3, 5)];
  const xB = pick(xs);
  const bon = `M${pt(xB, m * xB + q)}`;
  const pieges = xs.filter((x) => x !== xB).map((x) => `M${pt(x, m * x + q + pick([-1, 1, 2]))}`);
  pieges.push(`M${pt(xB, m * xB - q + (q === 0 ? 1 : 0))}`);
  return qcm(
    `${pick(METIERS)} a trouvé la tangente $${droiteTex(m, q)}$ à une courbe. ${pick(["Lequel de ces points appartient à cette tangente ?", "Quel point est situé sur cette tangente ?"])}`,
    bon,
    pieges,
    expl("un point est sur une droite si ses coordonnées vérifient son équation.", "pour chaque point, on calcule $mx + p$ et on compare à son ordonnée.", `$${n(m)} \\times ${xB < 0 ? `(${xB})` : xB} + ${q < 0 ? `(${q})` : q} = ${n(m * xB + q)}$.`, `${bon} est sur la tangente.`)
  );
}

/* =========================================================
   DER_V_* : variations
========================================================= */

/** Dérivée affine f'(x) = m(x - r), habillée. */
function deriveeAffine() {
  const m = pick([1, 2, 3, 4, 5, -1, -2, -3, -4, 0.5]);
  const t = rint(1, 3);
  const r = t === 1 ? rint(-5, 6) : rint(2, 40);
  const expr = (v: string) => poly([[m, 1], [-m * r, 0]], v);
  if (t === 1) return { intro: `La dérivée d’une fonction $f$ définie sur $\\mathbb{R}$ est $f'(x) = ${expr("x")}$.`, F: "f", v: "x", m, r, quoi: "$f$" };
  if (t === 2) {
    const P = pick(PRODS);
    return { intro: `${P.qui} calcule la dérivée de son bénéfice : $B'(x) = ${expr("x")}$, pour $x$ ${P.unites} ${vendus(P)}.`, F: "B", v: "x", m, r, quoi: "le bénéfice" };
  }
  const T = pick(TEMPS);
  return { intro: `${T.qui} étudie ${T.quoi}, notée $${T.L}(t)$, où $t$ est ${T.t}. On trouve $${T.L}'(t) = ${expr("t")}$.`, F: T.L, v: "t", m, r, quoi: T.court };
}

function genSigneAffine() {
  const d = deriveeAffine();
  const F = `${d.F}'(${d.v})`;
  const s = (neg: boolean, k: number) => (neg ? `$${F} < 0$ pour $${d.v} < ${n(k)}$ et $${F} > 0$ pour $${d.v} > ${n(k)}$` : `$${F} > 0$ pour $${d.v} < ${n(k)}$ et $${F} < 0$ pour $${d.v} > ${n(k)}$`);
  const bon = s(d.m > 0, d.r);
  return qcm(
    `${d.intro} ${pick([`Quel est le signe de $${F}$ ?`, `Étudie le signe de $${F}$.`, `Laquelle de ces phrases décrit le signe de $${F}$ ?`])}`,
    bon,
    [s(d.m < 0, d.r), s(d.m > 0, -d.r), `$${F} > 0$ pour tout $${d.v}$`],
    expl("une expression affine $mx + p$ change de signe en sa racine ; elle a le signe de $m$ à droite de la racine.", `on résout $${F} = 0$, puis on regarde le signe de $${n(d.m)}$.`, `$${F} = 0$ pour $${d.v} = ${n(d.r)}$ ; le coefficient $${n(d.m)}$ est ${d.m > 0 ? "positif" : "négatif"}.`, `${bon}.`)
  );
}

function genSigneFact() {
  const k = pick([1, 2, 3, -1, -2, -3]);
  const r = rint(-5, 3);
  const s = r + rint(1, 6);
  const fp = `${prodTex(k, r, s)}`;
  const cadreTxt = pick([
    `La dérivée d’une fonction $f$ est $f'(x) = ${fp}$.`,
    `${pick(METIERS)} obtient, après calcul, $f'(x) = ${fp}$.`,
    `On a factorisé la dérivée : $f'(x) = ${fp}$.`,
  ]);
  const phrase = (posDehors: boolean, a: number, b: number) =>
    posDehors ? `$f'(x) > 0$ en dehors de ${iv(a, b)}, $f'(x) < 0$ entre $${a}$ et $${b}$` : `$f'(x) < 0$ en dehors de ${iv(a, b)}, $f'(x) > 0$ entre $${a}$ et $${b}$`;
  const bon = phrase(k > 0, r, s);
  return qcm(
    `${cadreTxt} ${pick(["Quel est le signe de $f'(x)$ ?", "Laquelle de ces phrases décrit le signe de $f'(x)$ ?"])}`,
    bon,
    [phrase(k < 0, r, s), phrase(k > 0, -s, -r), `$f'(x) > 0$ pour tout $x$`],
    expl("un produit $k(x - r)(x - s)$ a le signe de $k$ à l’extérieur des racines, le signe contraire entre elles.", "on repère les racines $r$ et $s$, puis le signe de $k$.", `racines $${r}$ et $${s}$ ; $k = ${k}$ est ${k > 0 ? "positif" : "négatif"}.`, `${bon}.`)
  );
}

function genSigneZero() {
  return genTangenteHorizSigne();
}

function genTangenteHorizSigne() {
  const a = pick([1, 2, -1, -2, 3, -3, 0.5]);
  const x0 = rint(1, 9);
  const p: Q = [0, a, -2 * a * x0, rint(-9, 9)];
  const c0 = cadre((v) => tex(p, v), positif(p));
  const intro = c0.intro;
  const F = `${c0.F}'`;
  return court(
    `${intro} ${pick([`En quelle valeur $${F}(${c0.v})$ change-t-elle de signe ?`, `Pour quelle valeur de $${c0.v}$ la dérivée s’annule-t-elle ?`, `Résous $${F}(${c0.v}) = 0$.`])}`,
    x0,
    expl("une dérivée affine change de signe là où elle s’annule.", "on dérive, puis on résout $f'(x) = 0$.", `$${F}(${c0.v}) = ${poly([[2 * a, 1], [-2 * a * x0, 0]], c0.v)}$ s’annule en $${c0.v} = ${n(x0)}$.`, `la dérivée change de signe en $${n(x0)}$.`)
  );
}

function genSigneCanvas() {
  const m = pick([1, 2, -1, -2, 0.5, -0.5]);
  const r = rint(-3, 3);
  const demande = pick(["positive", "négative"]);
  const bon = (demande === "positive") === m > 0 ? ivD(r) : ivG(r);
  return qcm(
    `${pick(METIERS)} a tracé la courbe de la DÉRIVÉE $f'$ (et non celle de $f$). ${pick([`Sur quel intervalle $f'(x)$ est-elle ${demande} ?`, `D’après ce graphique, où la dérivée est-elle ${demande} ?`])}`,
    bon,
    [bon === ivD(r) ? ivG(r) : ivD(r), "$\\mathbb{R}$", bon === ivD(r) ? ivD(-r === r ? r + 1 : -r) : ivG(-r === r ? r - 1 : -r)],
    expl("$f'(x) > 0$ là où la courbe de $f'$ est au-dessus de l’axe des abscisses.", "on lit le signe de $f'$ : au-dessus ou au-dessous de l’axe.", `la droite coupe l’axe en $x = ${r}$.`, `$f'(x)$ est ${demande} sur ${bon}.`),
    graphe((x) => m * (x - r), r - 4, r + 4)
  );
}

function genLienDirect() {
  const a = rint(-6, 2);
  const b = a + rint(2, 8);
  const pos = Math.random() < 0.5;
  const I = iv(a, b);
  const bon = `$f$ est ${pos ? "croissante" : "décroissante"} sur ${I}`;
  return qcm(
    `${pick([`Sur l’intervalle ${I}, la dérivée $f'$ est strictement ${pos ? "positive" : "négative"}.`, `${pick(METIERS)} a montré que $f'(x) ${pos ? ">" : "<"} 0$ pour tout $x$ de ${I}.`, `Le tableau de signes indique $f'(x) ${pos ? ">" : "<"} 0$ sur ${I}.`])} ${pick(["Que peut-on en déduire pour $f$ ?", "Quel est le sens de variation de $f$ sur cet intervalle ?"])}`,
    bon,
    [`$f$ est ${pos ? "décroissante" : "croissante"} sur ${I}`, `$f$ est ${pos ? "positive" : "négative"} sur ${I}`, `$f$ est constante sur ${I}`],
    expl("si $f' > 0$ sur un intervalle, $f$ y est croissante ; si $f' < 0$, elle y est décroissante.", "on lit le signe de la dérivée (pas celui de $f$).", `$f'$ est ${pos ? "positive" : "négative"} sur ${I}.`, `${bon}.`)
  );
}

function genLienInverse() {
  const a = rint(-6, 2);
  const b = a + rint(2, 8);
  const crois = Math.random() < 0.5;
  const I = iv(a, b);
  const bon = `$f'(x) ${crois ? "\\ge" : "\\le"} 0$ sur ${I}`;
  return qcm(
    `${pick([`${pick(METIERS)} observe qu’une fonction $f$ est ${crois ? "croissante" : "décroissante"} sur ${I}.`, `On sait que $f$ est ${crois ? "croissante" : "décroissante"} sur ${I}.`, `Le tableau de variations montre que $f$ est ${crois ? "croissante" : "décroissante"} sur ${I}.`])} ${pick(["Que peut-on dire du signe de $f'$ ?", "Quel est le signe de la dérivée sur cet intervalle ?"])}`,
    bon,
    [`$f'(x) ${crois ? "\\le" : "\\ge"} 0$ sur ${I}`, `$f(x) ${crois ? "\\ge" : "\\le"} 0$ sur ${I}`, `$f'(x) = 0$ sur ${I}`],
    expl("$f$ croissante ⟺ $f' \\ge 0$ ; $f$ décroissante ⟺ $f' \\le 0$ (sur un intervalle).", "on traduit le sens de variation en signe de la dérivée.", `$f$ est ${crois ? "croissante" : "décroissante"} sur ${I}.`, `${bon}.`)
  );
}

function genLienCtx() {
  const P = pick(PRODS);
  const a = rint(1, 5) * 10;
  const pos = Math.random() < 0.5;
  const bon = pos ? `le bénéfice augmente quand on passe de 0 à ${a} ${P.unites}` : `le bénéfice diminue quand on passe de 0 à ${a} ${P.unites}`;
  return qcm(
    `${P.qui} note $B(x)$ son bénéfice pour $x$ ${P.unites} ${vendus(P)}. Pour $x$ entre 0 et ${a}, on a $B'(x) ${pos ? ">" : "<"} 0$. ${pick(["Que peut-on en conclure ?", "Quelle phrase est juste ?"])}`,
    bon,
    [pos ? `le bénéfice diminue quand on passe de 0 à ${a} ${P.unites}` : `le bénéfice augmente quand on passe de 0 à ${a} ${P.unites}`, `le bénéfice est ${pos ? "positif" : "négatif"} entre 0 et ${a} ${P.unites}`, `le bénéfice est maximal pour ${a} ${P.unites}`],
    expl("le signe de $B'$ donne le sens de variation de $B$, pas son signe.", `$B' ${pos ? ">" : "<"} 0$ sur $[0\\,;${a}]$.`, `$B$ est ${pos ? "croissante" : "décroissante"} sur $[0\\,;${a}]$.`, `${bon}.`)
  );
}

function genLienPiege() {
  const a = rint(-6, 0);
  const b = a + rint(2, 6);
  const fPos = Math.random() < 0.5;
  const dPos = Math.random() < 0.5;
  const I = `$]${a}\\,;${b}[$`;
  const bon = `elle ${dPos ? "monte" : "descend"}, en restant ${fPos ? "au-dessus" : "au-dessous"} de l’axe des abscisses`;
  return qcm(
    `Sur l’intervalle ${I}, une fonction $f$ est ${fPos ? "POSITIVE" : "NÉGATIVE"} et sa dérivée $f'$ est ${dPos ? "POSITIVE" : "NÉGATIVE"}. ${pick(["Que fait la courbe de $f$ sur cet intervalle ?", "Comment se comporte la courbe de $f$ sur cet intervalle ?"])}`,
    bon,
    [`elle ${dPos ? "descend" : "monte"}, en restant ${fPos ? "au-dessus" : "au-dessous"} de l’axe des abscisses`, `elle ${dPos ? "monte" : "descend"}, en restant ${fPos ? "au-dessous" : "au-dessus"} de l’axe des abscisses`, `elle ${fPos ? "monte" : "descend"}, en restant ${dPos ? "au-dessus" : "au-dessous"} de l’axe des abscisses`],
    expl("le signe de $f$ dit où est la courbe par rapport à l’axe ; le signe de $f'$ dit si elle monte ou descend.", "on traite les deux informations séparément.", `$f ${fPos ? ">" : "<"} 0$ : courbe ${fPos ? "au-dessus" : "au-dessous"} ; $f' ${dPos ? ">" : "<"} 0$ : courbe qui ${dPos ? "monte" : "descend"}.`, `${bon}.`)
  );
}

function genLienGraphe() {
  const m = pick([1, 2, -1, -2, 0.5, -0.5]);
  const r = rint(-3, 3);
  const bon = m > 0 ? `$f$ est décroissante sur ${ivG(r)} puis croissante sur ${ivD(r)}` : `$f$ est croissante sur ${ivG(r)} puis décroissante sur ${ivD(r)}`;
  const inverse = m > 0 ? `$f$ est croissante sur ${ivG(r)} puis décroissante sur ${ivD(r)}` : `$f$ est décroissante sur ${ivG(r)} puis croissante sur ${ivD(r)}`;
  return qcm(
    `${pick(METIERS)} a tracé la courbe de la DÉRIVÉE $f'$. ${pick(["Quel est le sens de variation de $f$ ?", "Que peut-on en déduire pour $f$ ?"])}`,
    bon,
    [inverse, "$f$ est croissante sur $\\mathbb{R}$", "$f$ est décroissante sur $\\mathbb{R}$"],
    expl("$f$ croît là où $f' > 0$ et décroît là où $f' < 0$.", "on lit le SIGNE de $f'$ sur sa courbe (au-dessus ou au-dessous de l’axe).", `$f'$ change de signe en $x = ${r}$ : ${m > 0 ? "négative puis positive" : "positive puis négative"}.`, `${bon}.`),
    graphe((x) => m * (x - r), r - 4, r + 4)
  );
}

function tableauSignes(r: number, gauche: number, droite: number, posApres: boolean, titre: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    caption: "Le signe de la dérivée commande le sens de variation",
    headers: ["x", String(gauche), "", String(r), "", String(droite)],
    rows: [{ label: "signe de f'(x)", values: ["", posApres ? "−" : "+", "0", posApres ? "+" : "−", ""] }],
  } as CanvasFigure;
}

function genTabSens() {
  const r = rint(-3, 30);
  const g = r - rint(2, 10);
  const d = r + rint(2, 10);
  const posApres = Math.random() < 0.5;
  const t = rint(1, 3);
  let intro = "Le tableau donne le signe de $f'(x)$.", F = "f", qui = "";
  if (t === 2) { const P = pick(PRODS); intro = `${P.qui} étudie son bénéfice $B$. Le tableau donne le signe de $B'(x)$.`; F = "B"; qui = P.qui; }
  if (t === 3) { const T = pick(TEMPS); intro = `${T.qui} étudie ${T.quoi}, notée $${T.L}$. Le tableau donne le signe de sa dérivée.`; F = T.L; qui = T.qui; }
  const ph = (pa: boolean) => `$${F}$ est ${pa ? "décroissante" : "croissante"} sur ${iv(g, r)}, puis ${pa ? "croissante" : "décroissante"} sur ${iv(r, d)}`;
  const bon = ph(posApres);
  return qcm(
    `${intro} ${pick([`Quel est le sens de variation de $${F}$ sur ${iv(g, d)} ?`, "Quelles flèches faut-il placer dans le tableau de variations ?", `Que peut-on dire des variations de $${F}$ ?`])}`,
    bon,
    [ph(!posApres), `$${F}$ est croissante sur ${iv(g, d)}`, `$${F}$ est décroissante sur ${iv(g, d)}`],
    expl("$f$ croît là où $f' > 0$ et décroît là où $f' < 0$.", "on lit la ligne des signes, intervalle par intervalle.", `signe ${posApres ? "− puis +" : "+ puis −"}, changement en $${r}$${qui ? "" : ""}.`, `${bon}.`),
    tableauSignes(r, g, d, posApres, `Signe de ${F === "\\theta" ? "θ" : F}' sur [${g} ; ${d}]`)
  );
}

/** Cubique f(x) = a x³ - 1,5a(r+s) x² + 3a r s x + d : f'(x) = 3a(x - r)(x - s). */
function cubique() {
  const a = pick([1, -1, 2, -2]);
  const r = rint(-4, 3);
  const s = r + 2 * rint(1, 3);
  const d = rint(-6, 6);
  const p: Q = [a, -1.5 * a * (r + s), 3 * a * r * s, d];
  return { a, r, s, p };
}

function genTabCubique() {
  const { a, r, s, p } = cubique();
  const c = cadre((v) => tex(p, v), positif(p), r < 1);
  const v = c.v;
  const ph = (k: number) =>
    k > 0
      ? `croissante sur $]-\\infty\\,;${r}]$, décroissante sur ${iv(r, s)}, croissante sur $[${s}\\,;+\\infty[$`
      : `décroissante sur $]-\\infty\\,;${r}]$, croissante sur ${iv(r, s)}, décroissante sur $[${s}\\,;+\\infty[$`;
  const bon = ph(a);
  return qcm(
    `${c.intro} On admet que $${c.F}'(${v}) = ${prodTex(3 * a, r, s, v)}$. ${pick([`Quelles sont les variations de $${c.F}$ ?`, `D’après le tableau de variations, la fonction $${c.F}$ est :`])}`,
    bon,
    [ph(-a), `croissante sur $]-\\infty\\,;${s}]$, décroissante sur $[${s}\\,;+\\infty[$`, `croissante sur $]-\\infty\\,;${-s}]$, décroissante sur ${iv(-s, -r)}, croissante sur $[${-r}\\,;+\\infty[$`],
    expl("$f$ croît là où $f' > 0$, décroît là où $f' < 0$.", "on étudie le signe du produit : signe de $3a$ à l’extérieur des racines, contraire entre elles.", `racines $${r}$ et $${s}$, coefficient $${n(3 * a)}$ ${a > 0 ? "positif" : "négatif"}.`, `$${c.F}$ est ${bon}.`)
  );
}

function genTabValeur() {
  const a = pick([1, 2, -1, -2, 3, -3]);
  const r = rint(-4, 5);
  const k = rint(-8, 10);
  const p: Q = [0, a, -2 * a * r, a * r * r + k];
  const c = cadre((v) => tex(p, v), positif(p));
  return court(
    `${c.intro} Dans le tableau de variations de $${c.F}$, quelle valeur faut-il écrire au bout des flèches, en $${c.v} = ${r}$ ?`,
    k,
    expl("au changement de sens de variation, on écrit la valeur de la fonction : c’est l’extremum.", `on calcule $${c.F}'(${c.v}) = ${poly([[2 * a, 1], [-2 * a * r, 0]], c.v)}$, qui s’annule en $${r}$, puis $${c.F}(${r})$.`, `$${c.F}(${r}) = ${n(k)}$.`, `on écrit ${n(k)}, ${a > 0 ? "le minimum" : "le maximum"} de $${c.F}$.`)
  );
}

function genExtNature() {
  const d = deriveeAffine();
  const nature = d.m > 0 ? "minimum" : "maximum";
  const bon = `un ${nature} en $${d.v} = ${n(d.r)}$`;
  return qcm(
    `${d.intro} ${pick([`Que peut-on dire de $${d.F}$ en $${d.v} = ${n(d.r)}$ ?`, `$${d.F}$ admet-elle un extremum ? Lequel ?`])}`,
    bon,
    [`un ${d.m > 0 ? "maximum" : "minimum"} en $${d.v} = ${n(d.r)}$`, `un ${nature} en $${d.v} = ${n(-d.r === d.r ? d.r + 1 : -d.r)}$`, "aucun extremum"],
    expl("si $f'$ s’annule en changeant de signe, $f$ a un extremum : minimum si $f'$ passe de − à +, maximum si elle passe de + à −.", "on étudie le signe de la dérivée affine.", `la dérivée s’annule en $${n(d.r)}$ et passe ${d.m > 0 ? "de − à +" : "de + à −"}.`, `${d.F === "f" ? "$f$" : `$${d.F}$`} admet ${bon}.`)
  );
}

function genExtCubique() {
  const { a, r, s, p } = cubique();
  const c = cadre((v) => tex(p, v), positif(p), r < 1);
  const demande = pick(["maximum", "minimum"]);
  // a > 0 : max local en r, min local en s.
  const rep = (demande === "maximum") === a > 0 ? r : s;
  return court(
    `${c.intro} On admet que $${c.F}'(${c.v}) = ${prodTex(3 * a, r, s, c.v)}$. ${pick([`En quelle valeur $${c.F}$ admet-elle un ${demande} local ?`, `Donne l’abscisse du ${demande} local de $${c.F}$.`])}`,
    rep,
    expl("un extremum local est atteint là où $f'$ s’annule en changeant de signe.", "on étudie le signe du produit.", `$${c.F}'$ est ${a > 0 ? "positive, puis négative entre les racines, puis positive" : "négative, puis positive entre les racines, puis négative"} (racines $${r}$ et $${s}$).`, `le ${demande} local est atteint en $${rep}$.`)
  );
}

function genExtCtx() {
  const T = pick(TEMPS);
  const a = pick([1, 2, 0.5, 3]);
  const h = rint(1, 9);
  const k = rint(-5, 25);
  const sgn = pick([1, -1]);
  const p: Q = [0, -sgn * a, 2 * sgn * a * h, k - sgn * a * h * h];
  const nature = sgn > 0 ? "maximal" : "minimal";
  const t = rint(1, 2);
  const ex = expl("l’extremum est atteint là où la dérivée s’annule en changeant de signe.", "on dérive, on résout, puis on calcule la valeur.", `$${T.L}'(t) = ${poly([[-2 * sgn * a, 1], [2 * sgn * a * h, 0]], "t")}$ s’annule en $t = ${h}$, et $${T.L}(${h}) = ${n(k)}$.`, t === 1 ? `l’extremum est atteint à $t = ${h}$.` : `la valeur extrême est ${n(k)}.`);
  const base = `${T.qui} modélise ${T.quoi} par $${T.L}(t) = ${tex(p, "t")}$, où $t$ est ${T.t}.`;
  if (t === 1) return court(`${base} À quel instant $t$ la valeur ${de(T.court)} est-elle ${nature}e ?`, h, ex);
  return court(`${base} Quelle est la valeur ${nature === "maximal" ? "maximale" : "minimale"} ${de(T.court)} ?`, k, ex);
}

function genExtPiege() {
  const a = rint(-4, 5);
  const liste: Array<[string, boolean, string]> = [
    [`Si $f'(${a}) = 0$, alors $f$ admet forcément un extremum en $${a}$.`, false, "pour $x^3$, $f'(0) = 0$ mais la dérivée $3x^2$ ne change pas de signe"],
    [`Si $f'$ s’annule en $${a}$ en passant de − à +, $f$ admet un minimum en $${a}$.`, true, "$f$ décroît puis croît"],
    [`Si $f'$ s’annule en $${a}$ en passant de + à −, $f$ admet un minimum en $${a}$.`, false, "$f$ croît puis décroît : c’est un maximum"],
    [`Si $f'(x) > 0$ pour tout $x$, $f$ n’a pas d’extremum sur $\\mathbb{R}$.`, true, "$f$ est strictement croissante"],
    ["La fonction cube admet un extremum en 0.", false, "$3x^2 \\ge 0$ : la fonction cube est croissante sur $\\mathbb{R}$"],
    [`Un maximum de $f$ en $${a}$ correspond à une tangente horizontale en $${a}$.`, true, `$f'(${a}) = 0$`],
  ];
  const [aff, vrai, raison] = pick(liste);
  return vraiFaux(aff, vrai, expl("$f$ a un extremum en $a$ quand $f'$ s’annule en $a$ EN CHANGEANT DE SIGNE.", "on vérifie le changement de signe, pas seulement l’annulation.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`));
}

/* =========================================================
   DER_O_* : optimisation
========================================================= */

function beneficeConcave() {
  const P = pick(PRODS);
  const a = pick([0.5, 1, 2, 0.1, 0.2, 5]);
  const xs = rint(2, 16) * 5;
  const b = 2 * a * xs;
  const max = a * xs * xs;
  const c = Math.round(max * pick([0.2, 0.3, 0.5, 0.6]));
  return { P, a, xs, b, c, Bmax: max - c, B: poly([[-a, 2], [b, 1], [-c, 0]]) };
}

function genOptQuantite() {
  const o = beneficeConcave();
  return court(
    `${o.P.qui} estime le bénéfice, en euros, pour $x$ ${o.P.unites} ${vendus(o.P)} : $B(x) = ${o.B}$. ${pick(["Pour quelle quantité le bénéfice est-il maximal ?", `Combien de ${o.P.unites} faut-il vendre pour un bénéfice maximal ?`, "Quelle quantité rend le bénéfice maximal ?"])}`,
    o.xs,
    expl("le bénéfice est maximal là où $B'$ s’annule en passant de + à −.", "on dérive, on résout $B'(x) = 0$, puis on vérifie le signe.", `$B'(x) = ${poly([[-2 * o.a, 1], [o.b, 0]])}$ s’annule en $x = ${o.xs}$ ; positive avant, négative après.`, `le bénéfice est maximal pour ${o.xs} ${o.P.unites}.`)
  );
}

function genOptMax() {
  const o = beneficeConcave();
  return court(
    `${o.P.qui} estime le bénéfice, en euros, pour $x$ ${o.P.unites} ${vendus(o.P)} : $B(x) = ${o.B}$. Le maximum est atteint pour $x = ${o.xs}$. ${pick(["Quel est le bénéfice maximal, en euros ?", "Combien vaut ce bénéfice maximal ?"])}`,
    o.Bmax,
    expl("le bénéfice maximal est $B(x_0)$, où $x_0$ annule $B'$.", "on remplace $x$ par la quantité optimale.", `$B(${o.xs}) = ${n(-o.a)} \\times ${o.xs}^2 + ${n(o.b)} \\times ${o.xs} - ${o.c} = ${n(o.Bmax)}$.`, `le bénéfice maximal vaut ${n(o.Bmax)} €.`)
  );
}

function genOptRecetteCout() {
  const P = pick(PRODS);
  const a = pick([0.5, 1, 0.1, 0.2, 2]);
  const xs = rint(2, 12) * 5;
  const b = rint(2, 20);
  const prix = b + 2 * a * xs;
  const c = Math.max(5, Math.round(a * xs * xs * pick([0.2, 0.3, 0.5])));
  const t = rint(1, 2);
  const Bmax = a * xs * xs - c;
  const ex = expl("$B(x) = R(x) - C(x)$ ; le bénéfice est maximal là où $B'$ s’annule en passant de + à −.", "on écrit $B$, on dérive, on résout.", `$B(x) = ${n(prix)}x - (${poly([[a, 2], [b, 1], [c, 0]])}) = ${poly([[-a, 2], [prix - b, 1], [-c, 0]])}$ ; $B'(x) = ${poly([[-2 * a, 1], [prix - b, 0]])}$ s’annule en $${xs}$ ; $B(${xs}) = ${n(Bmax)}$.`, t === 1 ? `il faut produire ${xs} ${P.unites}.` : `le bénéfice maximal vaut ${n(Bmax)} €.`);
  const base = `${P.qui} vend chaque unité ${fr(prix)} €. Le coût de production de $x$ ${P.unites} est $C(x) = ${poly([[a, 2], [b, 1], [c, 0]])}$ euros.`;
  if (t === 1) return court(`${base} ${pick(["Quelle quantité rend le bénéfice maximal ?", "Combien d’unités faut-il produire et vendre pour un bénéfice maximal ?"])}`, xs, ex);
  return court(`${base} Le bénéfice est maximal pour $x = ${xs}$. Quel est ce bénéfice maximal, en euros ?`, Bmax, ex);
}

function genOptCubique() {
  const P = pick(PRODS);
  const r = rint(2, 9);
  const s = Math.max(1, r + 2 * rint(-1, 2));
  const sr = s - r;
  // B'(x) = -3(x - r)(x + s) = -3x² - 3(s - r)x + 3rs
  const d = -rint(5, 40);
  const p: Q = [-1, -1.5 * sr, 3 * r * s, d];
  if (!Number.isInteger(1.5 * sr)) return genOptQuantite();
  const M = r + rint(3, 6);
  return court(
    `${P.qui} produit $x$ centaines de ${P.unites}, avec $x$ entre 0 et ${M}. Le bénéfice, en milliers d’euros, est $B(x) = ${tex(p)}$. On admet que $B'(x) = -3(${xMoins(r)})(${xMoins(-s)})$. ${pick(["Pour quelle valeur de $x$ le bénéfice est-il maximal ?", "Combien de centaines d’unités faut-il produire pour un bénéfice maximal ?"])}`,
    r,
    expl("le bénéfice est maximal là où $B'$ s’annule en passant de + à −.", "on étudie le signe de $B'$ sur $[0\\,;" + M + "]$.", `sur $[0\\,;${M}]$, $x + ${s} > 0$ : $B'(x)$ a le signe de $-3(x - ${r})$, positif avant ${r}, négatif après.`, `le bénéfice est maximal pour $x = ${r}$, soit ${r} centaines.`)
  );
}

const PRIX: Array<[string, string]> = [
  ["Une organisatrice de concerts fixe le prix $p$ d’un billet, en euros", "billets"],
  ["Un gérant de salle de sport fixe le prix $p$ de l’abonnement mensuel, en euros", "abonnés"],
  ["Une restauratrice fixe le prix $p$ du menu du jour, en euros", "menus"],
  ["Un hôtelier fixe le prix $p$ d’une nuit, en euros", "réservations"],
  ["Une professeure de yoga fixe le prix $p$ d’un cours, en euros", "inscriptions"],
  ["Un loueur de vélos fixe le prix $p$ d’une location, en euros", "locations"],
  ["Une gérante de cinéma fixe le prix $p$ d’une place, en euros", "entrées"],
  ["Un éditeur fixe le prix $p$ d’un abonnement à son magazine, en euros", "abonnés"],
];

function genOptPrix() {
  const [phrase, qui] = pick(PRIX);
  const k = pick([2, 4, 5, 10, 20]);
  const ps = rint(4, 30);
  const N0 = 2 * k * ps;
  return court(
    `${phrase}. Une étude de marché prévoit $${N0} - ${k}p$ ${qui}. La recette est donc $R(p) = ${poly([[-k, 2], [N0, 1]], "p")}$. ${pick(["Quel prix rend la recette maximale ?", "Pour quel prix $p$ la recette est-elle maximale ?"])}`,
    ps,
    expl("la recette est maximale là où $R'$ s’annule en passant de + à −.", "on dérive, puis on résout $R'(p) = 0$.", `$R'(p) = ${poly([[-2 * k, 1], [N0, 0]], "p")}$ s’annule en $p = ${ps}$.`, `le prix optimal est ${ps} €.`)
  );
}

function coutConvexe() {
  const P = pick(PRODS);
  const a = pick([0.5, 1, 2, 0.1, 0.2, 5]);
  const xs = rint(2, 16) * 5;
  const b = 2 * a * xs;
  const cmin = rint(20, 400);
  const c = a * xs * xs + cmin;
  return { P, a, xs, b, c, cmin, C: poly([[a, 2], [-b, 1], [c, 0]]) };
}

function genCoutMinQ() {
  const o = coutConvexe();
  return court(
    `${o.P.qui} fabrique ses ${o.P.unites} par séries. Pour une série de $x$ ${o.P.unites}, le coût unitaire est $C(x) = ${o.C}$ centimes. ${pick(["Pour quelle taille de série ce coût est-il minimal ?", "Quelle valeur de $x$ rend ce coût minimal ?"])}`,
    o.xs,
    expl("le coût est minimal là où $C'$ s’annule en passant de − à +.", "on dérive, puis on résout $C'(x) = 0$.", `$C'(x) = ${poly([[2 * o.a, 1], [-o.b, 0]])}$ s’annule en $${o.xs}$ ; négative avant, positive après.`, `le coût est minimal pour ${o.xs} ${o.P.unites}.`)
  );
}

function genCoutMinVal() {
  const o = coutConvexe();
  return court(
    `${o.P.qui} fabrique ses ${o.P.unites} par séries. Pour une série de $x$ ${o.P.unites}, le coût unitaire est $C(x) = ${o.C}$ centimes ; il est minimal pour $x = ${o.xs}$. ${pick(["Quel est ce coût minimal ?", "Combien vaut le coût unitaire minimal, en centimes ?"])}`,
    o.cmin,
    expl("le coût minimal est $C(x_0)$, où $x_0$ annule $C'$.", "on remplace $x$ par la valeur trouvée.", `$C(${o.xs}) = ${n(o.a)} \\times ${o.xs}^2 - ${n(o.b)} \\times ${o.xs} + ${n(o.c)} = ${n(o.cmin)}$.`, `le coût minimal vaut ${n(o.cmin)} centimes.`)
  );
}

function genCoutJustif() {
  const o = coutConvexe();
  const bon = `$C'$ est négative avant $${o.xs}$ et positive après : le coût descend puis remonte`;
  return qcm(
    `${o.P.qui} a trouvé $C'(${o.xs}) = 0$, où $C(x) = ${o.C}$ est un coût de production. ${pick([`Pourquoi $C$ atteint-il un minimum en $${o.xs}$ ?`, `Quel argument prouve que $${o.xs}$ donne un coût MINIMAL ?`])}`,
    bon,
    [`$C'$ est positive avant $${o.xs}$ et négative après : le coût monte puis descend`, `$C'(${o.xs}) = 0$ suffit toujours`, `$C(${o.xs})$ est positif`],
    expl("un minimum est atteint là où $C'$ s’annule en passant de − à +.", "on étudie le signe de $C'$ autour de la valeur trouvée.", `$C'(x) = ${poly([[2 * o.a, 1], [-o.b, 0]])}$ : négative pour $x < ${o.xs}$, positive pour $x > ${o.xs}$.`, `${bon}.`)
  );
}

const DEPENSES: Array<[string, string]> = [
  ["la consommation de carburant d’un camion, selon sa vitesse $x$ (en dizaines de km/h)", "Un transporteur"],
  ["le coût d’entretien d’une machine, selon sa durée d’utilisation $x$ (en centaines d’heures)", "Une technicienne de maintenance"],
  ["le coût de stockage d’un entrepôt, selon la taille $x$ des commandes (en centaines d’unités)", "Un logisticien"],
  ["la dépense d’énergie d’un serveur informatique, selon sa charge $x$ (en dizaines de %)", "Une administratrice réseau"],
  ["le temps d’attente moyen à un guichet, selon le nombre $x$ de dossiers traités par heure", "Un responsable d’agence bancaire"],
  ["le coût de livraison d’une tournée, selon le nombre $x$ de colis (en dizaines)", "Une gestionnaire de tournées"],
  ["le coût d’arrosage d’un golf, selon le débit $x$ des arroseurs (en m³ par heure)", "Un intendant de golf"],
  ["le coût de chauffage d’un hôtel, selon la température de consigne $x$ (en °C au-dessus de 15)", "Une directrice d’hôtel"],
];

function genCoutCubique() {
  const [quoi, qui] = pick(DEPENSES);
  const s = rint(1, 4);
  const r = s + 2 * rint(1, 3);
  // D'(x) = 3(x - s)(x - r) = 3x² - 3(r + s)x + 3rs
  const p: Q = [1, -1.5 * (r + s), 3 * r * s, rint(10, 60)];
  const M = r + rint(2, 5);
  return court(
    `${qui} modélise ${quoi} par $D(x) = ${tex(p)}$, pour $x$ entre ${s} et ${M}. On admet que $D'(x) = 3(${xMoins(s)})(${xMoins(r)})$. ${pick(["Pour quelle valeur de $x$ la fonction $D$ est-elle minimale ?", `Quelle valeur de $x$ rend $D$ minimale sur $[${s}\\,;${M}]$ ?`])}`,
    r,
    expl("un minimum est atteint là où $D'$ s’annule en passant de − à +.", `on étudie le signe de $D'$ sur $[${s}\\,;${M}]$.`, `pour $${s} < x < ${r}$, $D'(x) < 0$ ; pour $x > ${r}$, $D'(x) > 0$.`, `$D$ est minimale pour $x = ${r}$.`)
  );
}

function genConclBenef() {
  const P = pick(PRODS);
  const xs = rint(2, 20) * 5;
  const B = rint(30, 300) * 10;
  const bon = `Pour ${xs} ${P.unites}, le bénéfice est maximal et vaut ${B} €.`;
  return qcm(
    `${P.qui} étudie son bénéfice $B(x)$ pour $x$ ${P.unites}. L’étude donne un maximum en $x = ${xs}$, avec $B(${xs}) = ${B}$. ${pick(["Quelle phrase de conclusion est correcte ?", "Laquelle de ces conclusions répond au problème ?", "Comment rédiger la conclusion ?"])}`,
    bon,
    [`Pour ${B} ${P.unites}, le bénéfice est maximal et vaut ${xs} €.`, `Pour ${xs} ${P.unites}, le bénéfice est minimal et vaut ${B} €.`, `Le bénéfice maximal vaut ${xs} €.`, `Pour ${xs} ${P.unites}, le coût est maximal et vaut ${B} €.`],
    expl("une conclusion répond à la question dans le contexte, avec les unités.", `$x$ est la quantité (${P.unites}) ; $B(x)$ est le bénéfice (en €).`, `maximum en $x = ${xs}$, valeur $${B}$.`, `« ${bon} »`)
  );
}

function genConclCout() {
  const P = pick(PRODS);
  const xs = rint(2, 20) * 5;
  const C = rint(5, 90);
  const bon = `En fabriquant des séries de ${xs} ${P.unites}, le coût unitaire est minimal : ${C} €.`;
  return qcm(
    `${P.qui} cherche la taille de série qui rend le coût unitaire minimal. Le calcul donne un minimum en $x = ${xs}$, avec $C(${xs}) = ${C}$ €. ${pick(["Quelle conclusion faut-il écrire ?", "Quelle phrase répond au problème ?"])}`,
    bon,
    [`En fabriquant des séries de ${C} ${P.unites}, le coût unitaire est minimal : ${xs} €.`, `En fabriquant des séries de ${xs} ${P.unites}, le coût unitaire est maximal : ${C} €.`, `Le coût minimal est atteint pour $x = 0$.`, `En fabriquant des séries de ${xs} ${P.unites}, le bénéfice est de ${C} €.`],
    expl("on répond par une phrase, dans le contexte, avec les unités.", "$x$ est la taille de série ; $C(x)$ est un coût en euros.", `minimum en $x = ${xs}$, valeur ${C} €.`, `« ${bon} »`)
  );
}

function genConclTableau() {
  const P = pick(PRODS);
  const xs = rint(2, 12) * 5;
  const M = xs + rint(2, 8) * 5;
  const B = rint(30, 300) * 10;
  const b0 = -rint(5, 50) * 10;
  const bM = rint(1, B / 10 - 1) * 10;
  const bon = `Pour ${xs} ${P.unites}, le bénéfice est maximal : ${B} €.`;
  return qcm(
    `${P.qui} a dressé le tableau de variations de son bénéfice $B(x)$, en euros, pour $x$ ${P.unites} entre 0 et ${M}. ${pick(["Quelle conclusion peut-on rédiger ?", "Quelle phrase répond au problème ?"])}`,
    bon,
    [`Pour ${B} ${P.unites}, le bénéfice est maximal : ${xs} €.`, `Pour ${M} ${P.unites}, le bénéfice est maximal : ${bM} €.`, `Pour ${xs} ${P.unites}, le bénéfice est minimal : ${B} €.`],
    expl("on lit le maximum dans le tableau : la flèche monte puis descend.", "la valeur de $x$ est sur la première ligne, celle de $B(x)$ sur la seconde.", `maximum ${B} € atteint en $x = ${xs}$.`, `« ${bon} »`),
    {
      kind: "tableau_donnees",
      title: "Variations du bénéfice B",
      caption: "x en unités, B(x) en euros",
      headers: ["x", "0", "", String(xs), "", String(M)],
      rows: [
        { label: "signe de B'(x)", values: ["", "+", "0", "−", ""] },
        { label: "variations de B", values: [String(b0), "↗", String(B), "↘", String(bM)] },
      ],
    } as CanvasFigure
  );
}

function genConclTemps() {
  const T = pick(TEMPS);
  const t0 = rint(2, 12);
  const v = rint(-9, 30);
  const tous = ["maximum", "minimum"] as const;
  const nat = pick(tous);
  const bon = `${maj(T.court)} atteint son ${nat}, ${v}, à $t = ${t0}$.`;
  return qcm(
    `${T.qui} étudie ${T.quoi} au cours du temps ($t$ : ${T.t}). L’étude de la dérivée donne un ${nat} en $t = ${t0}$, de valeur $${v}$. ${pick(["Quelle conclusion est correcte ?", "Comment conclure ?"])}`,
    bon,
    [`${maj(T.court)} atteint son ${nat}, ${t0}, à $t = ${v}$.`, `${maj(T.court)} atteint son ${nat === "maximum" ? "minimum" : "maximum"}, ${v}, à $t = ${t0}$.`, `${maj(T.court)} atteint son ${nat}, ${v}, à $t = 0$.`],
    expl("on conclut dans le contexte : à quel instant, et quelle valeur.", "$t$ est le temps ; la valeur de la fonction est la grandeur étudiée.", `${nat} en $t = ${t0}$, valeur ${v}.`, `« ${bon} »`)
  );
}

/* ---------- Gabarits et fusion ---------- */

const NOTION: Record<string, string> = {
  der_f_carre: "der_formules",
  der_f_cube: "der_formules",
  der_f_kf: "der_formules",
  der_f_somme: "der_formules",
  der_nd_definition: "der_nombre_derive",
  der_nd_geometrique: "der_nombre_derive",
  der_nd_lire_graphique: "der_nombre_derive",
  der_nd_cout_marginal: "der_nombre_derive",
  der_o_benefice: "der_optimisation",
  der_o_cout: "der_optimisation",
  der_o_conclure: "der_optimisation",
  der_p_degre2: "der_polynome",
  der_p_degre3: "der_polynome",
  der_p_nombre_derive: "der_polynome",
  der_p_forme_factorisee: "der_polynome",
  der_secante_tracer: "der_secante_tangente",
  der_tangente_limite: "der_secante_tangente",
  der_tangente_reconnaitre: "der_secante_tangente",
  der_tg_equation_reduite: "der_tangente_equation",
  der_tg_construire: "der_tangente_equation",
  der_tg_verifier_point: "der_tangente_equation",
  der_v_signe_derivee: "der_variations",
  der_v_lien_signe: "der_variations",
  der_v_tableau: "der_variations",
  der_v_extremum: "der_variations",
};

function tpl(microId: string, difficulty: number, rang: number, generate: () => TutorGeneratedQuestionV4, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `stmg_der_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "stmg",
    matiere: "maths",
    notionId: NOTION[microId],
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["stmg", "maths", "derivation", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_CARRE = "(x²)' = 2x, et (kx²)' = 2kx.";
const H_CUBE = "(x³)' = 3x², et (kx³)' = 3kx².";
const H_KF = "(k × u)' = k × u' ; une constante a pour dérivée 0.";
const H_SOMME = "On dérive terme à terme ; la constante disparaît.";
const H_ND = "f'(a) est la vitesse d’évolution instantanée en a, et la pente de la tangente.";
const H_LIRE = "Depuis le point de contact, avance de 1 : la tangente monte (ou descend) de f'(a).";
const H_MARG = "Le coût marginal C'(q) ≈ coût d’une unité de plus.";
const H_SEC = "Pente d’une sécante = (f(b) − f(a)) / (b − a).";
const H_LIM = "La tangente est la position limite des sécantes.";
const H_TAN = "La tangente en a passe par (a ; f(a)) et a pour pente f'(a).";
const H_EQ = "Tangente : y = f'(a)(x − a) + f(a).";
const H_SIGNE = "f croît là où f' > 0, décroît là où f' < 0.";
const H_EXT = "Extremum : f' s’annule EN CHANGEANT DE SIGNE.";
const H_OPT = "On dérive, on résout f'(x) = 0, on vérifie le changement de signe.";
const H_CONCL = "Une phrase, dans le contexte, avec les unités.";

type Ligne = [string, number, () => TutorGeneratedQuestionV4, string];

const LIGNES: Ligne[] = [
  ["der_f_carre", 1, genCarreExpr(1), H_CARRE],
  ["der_f_carre", 1, genCarreValeur(1), H_CARRE],
  ["der_f_carre", 1, genCarreTangente, H_CARRE],
  ["der_f_carre", 1, genCarreVraiFaux, H_CARRE],
  ["der_f_carre", 2, genCarreExpr(2), H_CARRE],
  ["der_f_carre", 2, genCarreChute, H_CARRE],
  ["der_f_carre", 2, genCarrePrimitive, H_CARRE],
  ["der_f_carre", 2, genCarreValeur(2), H_CARRE],
  ["der_f_carre", 3, genDeriveeAntecedent(false), H_CARRE],
  ["der_f_carre", 3, genCarreApprox, H_CARRE],
  ["der_f_carre", 3, genCarrePrimitive, H_CARRE],
  ["der_f_carre", 3, genCarreChute, H_CARRE],

  ["der_f_cube", 2, genCubeExpr(false), H_CUBE],
  ["der_f_cube", 2, genCubeValeur(false), H_CUBE],
  ["der_f_cube", 2, genCubeTangente, H_CUBE],
  ["der_f_cube", 2, genCubeVraiFaux, H_CUBE],
  ["der_f_cube", 3, genCubeVolume, H_CUBE],
  ["der_f_cube", 3, genCubeAntecedent, H_CUBE],
  ["der_f_cube", 3, genCubeSigne, H_CUBE],
  ["der_f_cube", 3, genCubeValeur(true), H_CUBE],
  ["der_f_cube", 3, genCubeExpr(true), H_CUBE],

  ["der_f_kf", 1, genKfAffine(1), H_KF],
  ["der_f_kf", 1, genKfConstante, H_KF],
  ["der_f_kf", 1, genKfExpr(1), H_KF],
  ["der_f_kf", 1, genKfVraiFaux, H_KF],
  ["der_f_kf", 2, genKfAffine(2), H_KF],
  ["der_f_kf", 2, genKfExpr(2), H_KF],
  ["der_f_kf", 2, genKfValeur(false), H_KF],
  ["der_f_kf", 2, genKfVraiFaux, H_KF],
  ["der_f_kf", 3, genKfCompare, H_KF],
  ["der_f_kf", 3, genKfValeur(true), H_KF],

  ["der_f_somme", 2, genDeriveeExpr(2), H_SOMME],
  ["der_f_somme", 2, genDeriveeValeur(2), H_SOMME],
  ["der_f_somme", 3, genDeriveeExpr(3), H_SOMME],
  ["der_f_somme", 3, genDeriveeAntecedent(true), H_SOMME],
  ["der_f_somme", 3, genSommeErreurValeur, H_SOMME],

  ["der_nd_definition", 2, genNdSens, H_ND],
  ["der_nd_definition", 2, genNdTauxMoyen, H_ND],
  ["der_nd_definition", 2, genNdLimite("taux"), H_ND],
  ["der_nd_definition", 2, genNdVraiFaux, H_ND],

  ["der_nd_geometrique", 2, genNgCoef, H_ND],
  ["der_nd_geometrique", 2, genNgSigne, H_ND],
  ["der_nd_geometrique", 2, genNgEquation, H_ND],
  ["der_nd_geometrique", 2, genNgDeuxPoints, H_ND],

  ["der_nd_lire_graphique", 2, genLireTangente(2), H_LIRE],
  ["der_nd_lire_graphique", 2, genLireHoriz, H_LIRE],
  ["der_nd_lire_graphique", 2, genLireComparer, H_LIRE],
  ["der_nd_lire_graphique", 2, genLireSigneZone, H_LIRE],
  ["der_nd_lire_graphique", 3, genLireTangente(3), H_LIRE],
  ["der_nd_lire_graphique", 3, genLireEquation, H_LIRE],
  ["der_nd_lire_graphique", 3, genLireComparer, H_LIRE],
  ["der_nd_lire_graphique", 3, genLireSigneZone, H_LIRE],

  ["der_nd_cout_marginal", 3, genMargInterp, H_MARG],
  ["der_nd_cout_marginal", 3, genMargCalcul, H_MARG],
  ["der_nd_cout_marginal", 3, genMargDecision, H_MARG],
  ["der_nd_cout_marginal", 3, genVitesseInst, H_MARG],

  ["der_o_benefice", 3, genOptQuantite, H_OPT],
  ["der_o_benefice", 3, genOptMax, H_OPT],
  ["der_o_benefice", 3, genOptRecetteCout, H_OPT],
  ["der_o_benefice", 3, genOptCubique, H_OPT],
  ["der_o_benefice", 3, genOptPrix, H_OPT],

  ["der_o_cout", 3, genCoutMinQ, H_OPT],
  ["der_o_cout", 3, genCoutMinVal, H_OPT],
  ["der_o_cout", 3, genCoutJustif, H_OPT],
  ["der_o_cout", 3, genCoutCubique, H_OPT],

  ["der_o_conclure", 2, genConclBenef, H_CONCL],
  ["der_o_conclure", 2, genConclCout, H_CONCL],
  ["der_o_conclure", 2, genConclTableau, H_CONCL],
  ["der_o_conclure", 2, genConclTemps, H_CONCL],

  ["der_p_degre2", 2, genDeriveeExpr(2), H_SOMME],
  ["der_p_degre2", 2, genDeriveeValeur(2), H_SOMME],
  ["der_p_degre2", 3, genDeriveeExpr(2, true), H_SOMME],
  ["der_p_degre2", 3, genSommeErreurValeur, H_SOMME],

  ["der_p_nombre_derive", 2, genDeriveeValeur(2), H_SOMME],
  ["der_p_nombre_derive", 2, genTangenteHoriz, H_SOMME],
  ["der_p_nombre_derive", 3, genDeriveeValeur(3), H_SOMME],
  ["der_p_nombre_derive", 3, genDeriveeAntecedent(true), H_SOMME],

  ["der_p_forme_factorisee", 3, genTabCubiqueFact, H_SOMME],
  ["der_p_forme_factorisee", 3, genFactRacines, H_SOMME],
  ["der_p_forme_factorisee", 3, genFactValeur, H_SOMME],

  ["der_secante_tracer", 2, genSecPente, H_SEC],
  ["der_secante_tracer", 2, genSecPoints, H_SEC],
  ["der_secante_tracer", 2, genSecTaux, H_SEC],
  ["der_secante_tracer", 2, genSecEquation, H_SEC],

  ["der_tangente_limite", 3, genLimVers, H_LIM],
  ["der_tangente_limite", 3, genLimVitesse, H_LIM],
  ["der_tangente_limite", 3, genLimFormule, H_LIM],
  ["der_tangente_limite", 3, genNdLimite("secante"), H_LIM],

  ["der_tangente_reconnaitre", 2, genRecoCanvas, H_TAN],
  ["der_tangente_reconnaitre", 2, genRecoTest, H_TAN],
  ["der_tangente_reconnaitre", 2, genRecoCritere, H_TAN],
  ["der_tangente_reconnaitre", 2, genLireHoriz, H_TAN],
  ["der_tangente_reconnaitre", 3, genRecoCanvas, H_TAN],
  ["der_tangente_reconnaitre", 3, genRecoEquation, H_TAN],
  ["der_tangente_reconnaitre", 3, genRecoTest, H_TAN],
  ["der_tangente_reconnaitre", 3, genRecoCritere, H_TAN],

  ["der_tg_equation_reduite", 3, genTgEqCtx, H_EQ],
  ["der_tg_equation_reduite", 3, genTgEqDonnees, H_EQ],
  ["der_tg_equation_reduite", 3, genTgOrdonnee, H_EQ],
  ["der_tg_equation_reduite", 3, genTgApprox, H_EQ],

  ["der_tg_construire", 2, genConsSecondPoint, H_TAN],
  ["der_tg_construire", 2, genConsMethode, H_TAN],
  ["der_tg_construire", 2, genConsOrdonnee, H_TAN],
  ["der_tg_construire", 2, genConsAxe, H_TAN],

  ["der_tg_verifier_point", 2, genVerifPoint, H_EQ],
  ["der_tg_verifier_point", 2, genVerifManquante, H_EQ],
  ["der_tg_verifier_point", 2, genVerifQuel, H_EQ],

  ["der_v_signe_derivee", 3, genSigneAffine, H_SIGNE],
  ["der_v_signe_derivee", 3, genSigneFact, H_SIGNE],
  ["der_v_signe_derivee", 3, genSigneZero, H_SIGNE],
  ["der_v_signe_derivee", 3, genSigneCanvas, H_SIGNE],

  ["der_v_lien_signe", 2, genLienDirect, H_SIGNE],
  ["der_v_lien_signe", 2, genLienInverse, H_SIGNE],
  ["der_v_lien_signe", 2, genLienCtx, H_SIGNE],
  ["der_v_lien_signe", 2, genLienGraphe, H_SIGNE],
  ["der_v_lien_signe", 3, genLienPiege, H_SIGNE],
  ["der_v_lien_signe", 3, genLienGraphe, H_SIGNE],
  ["der_v_lien_signe", 3, genLienInverse, H_SIGNE],
  ["der_v_lien_signe", 3, genLienCtx, H_SIGNE],

  ["der_v_tableau", 3, genTabSens, H_SIGNE],
  ["der_v_tableau", 3, genTabCubique, H_SIGNE],
  ["der_v_tableau", 3, genTabValeur, H_SIGNE],

  ["der_v_extremum", 3, genExtNature, H_EXT],
  ["der_v_extremum", 3, genExtCubique, H_EXT],
  ["der_v_extremum", 3, genExtCtx, H_EXT],
  ["der_v_extremum", 3, genExtPiege, H_EXT],
];

/* =========================================================
   DER_P_FORME_FACTORISEE (déclarées après la table : hissées)
========================================================= */

/** Quelle forme factorisée est f'(x) ? */
function genTabCubiqueFact() {
  const { a, r, s, p } = cubique();
  const c = cadre((v) => tex(p, v), positif(p));
  const v = c.v;
  const f = (kk: number, u: number, w: number) => `$${c.F}'(${v}) = ${prodTex(kk, u, w, v)}$`;
  const bon = f(3 * a, r, s);
  return qcm(
    `${c.intro} ${pick([`Quelle est la forme factorisée de $${c.F}'(${v})$ ?`, `Parmi ces expressions, laquelle est égale à $${c.F}'(${v})$ ?`])}`,
    bon,
    [f(3 * a, -s, -r), f(a, r, s), f(3 * a, r, -s === s ? s + 1 : -s), f(-3 * a, r, s)],
    expl("on dérive, puis on vérifie la forme factorisée en la développant.", "$k(x - r)(x - s) = kx^2 - k(r + s)x + krs$.", `$${c.F}'(${v}) = ${tex(der(p), v)}$ et $${prodTex(3 * a, r, s, v)}$ redonne bien cette expression.`, `${bon}.`)
  );
}

/** f'(x) = k(x - r)(x - s) : tangentes horizontales. */
function genFactRacines() {
  const { a, r, s } = cubique();
  const t = rint(1, 3);
  const fp = `${prodTex(3 * a, r, s)}`;
  const bon = `en $x = ${r}$ et en $x = ${s}$`;
  const intro = t === 1 ? `La dérivée d’une fonction $f$ se factorise en $f'(x) = ${fp}$.` : t === 2 ? `${pick(METIERS)} obtient $f'(x) = ${fp}$.` : `${pick(PRODS).qui} étudie un bénéfice $f$ et obtient $f'(x) = ${fp}$.`;
  return qcm(
    `${intro} ${pick(["En quels points la tangente à la courbe de $f$ est-elle horizontale ?", "Pour quelles valeurs de $x$ la dérivée s’annule-t-elle ?", "Résous $f'(x) = 0$."])}`,
    bon,
    [`en $x = ${-r}$ et en $x = ${-s}$`, `en $x = ${n(3 * a)}$ seulement`, `en $x = ${r}$ seulement`, r !== 0 && s !== 0 ? `en $x = 0$, $x = ${r}$ et $x = ${s}$` : `en $x = ${r === 0 ? s : r}$ et en $x = ${n(3 * a)}$`],
    expl("un produit est nul si l’un de ses facteurs est nul.", "on annule chaque facteur.", `$${xMoins(r)} = 0$ donne $x = ${r}$ ; $${xMoins(s)} = 0$ donne $x = ${s}$.`, `la tangente est horizontale ${bon}.`)
  );
}

/** Calculer f'(x0) avec la forme factorisée. */
function genFactValeur() {
  const { a, r, s, p } = cubique();
  const c = cadre((v) => tex(p, v), positif(p));
  const x0 = c.pos ? rint(0, 8) : rint(-5, 6);
  const val = 3 * a * (x0 - r) * (x0 - s);
  return court(
    `${c.intro} On admet que $${c.F}'(${c.v}) = ${prodTex(3 * a, r, s, c.v)}$. ${pick([`Calcule $${c.F}'(${x0})$.`, `Avec cette forme, que vaut $${c.F}'(${x0})$ ?`])}`,
    val,
    expl("la forme factorisée permet de calculer vite un nombre dérivé.", "on remplace dans chaque facteur, puis on multiplie.", `$${c.F}'(${x0}) = ${n(3 * a)} \\times (${n(x0 - r)}) \\times (${n(x0 - s)}) = ${n(val)}$.`, `$${c.F}'(${x0}) = ${n(val)}$.`)
  );
}

export const renfortDerivation: TutorBankItemV4[] = (() => {
  const rangs = new Map<string, number>();
  return LIGNES.map(([micro, d, g, h]) => {
    const cle = `${micro}_${d}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    return tpl(micro, d, r, g, h);
  });
})();
