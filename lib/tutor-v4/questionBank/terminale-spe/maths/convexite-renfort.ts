// Renfort convexité de Terminale spé (02/11/2026).
//
// Mesure du 02/11 (scripts/mesurer-squelettes-coach.ts terminale-spe
// convexite_fonction) : 9 à 12 squelettes par micro, 52 items figés pour
// 2 gabarits, 15 à 18 répétitions sur 20 à chaque étoile. On branche des
// générateurs : familles de fonctions × tournures × situations (physique,
// économie, santé, sport, ingénierie : les maths sont transversales).
// Aucune question « open » : QCM ou réponse courte.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Nombre en LaTeX : virgule décimale « {,} ». */
function n(x: number) {
  const r = Math.round(x * 1000) / 1000;
  return String(r).replace(".", "{,}");
}

/** Nombre pour une réponse tapée : virgule décimale. */
function fr(x: number) {
  return String(Math.round(x * 1000) / 1000).replace(".", ",");
}

/** Polynôme en LaTeX à partir de [coefficient, puissance], sans les termes nuls. */
function poly(termes: Array<[number, number]>) {
  let s = "";
  for (const [c, p] of termes) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = p === 0 ? n(abs) : `${abs === 1 ? "" : n(abs)}${p === 1 ? "x" : `x^${p}`}`;
    if (!s) s = (c < 0 ? "-" : "") + corps;
    else s += (c < 0 ? " - " : " + ") + corps;
  }
  return s || "0";
}

/** (x + m) en LaTeX : « x + 3 », « x - 2 », « x ». */
function xPlus(m: number) {
  return m === 0 ? "x" : m > 0 ? `x + ${n(m)}` : `x - ${n(-m)}`;
}

const R = "$\\mathbb{R}$";
const gauche = (k: number) => `$]-\\infty\\,;${n(k)}]$`;
const droite = (k: number) => `$[${n(k)}\\,;+\\infty[$`;
const ferme = (a: number, b: number) => `$[${n(a)}\\,;${n(b)}]$`;

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Écriture usuelle : « (x)e^x » → « xe^x », « 6(x)e^{2x} » → « 6xe^{2x} », « 1e^{…} » → « e^{…} ». */
function propre(s: string) {
  return s.replace(/\(x\)e/g, "xe").replace(/(^|[^\d}])1e\^/g, "$1e^");
}

function qcm(text: string, correct: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const bon = propre(correct);
  return { text: propre(text), format: "qcm", choices: makeChoices(bon, pieges.map(propre)), expected: [bon], comparator: "mcq_exact", explanation: propre(explanation), ...(canvas ? { canvas } : {}) };
}

function court(text: string, valeur: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text: propre(text), format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation: propre(explanation), ...(canvas ? { canvas } : {}) };
}

/** « une usine » → « d’une usine ». */
function de(gn: string) {
  return /^(un|une) /.test(gn) ? `d’${gn}` : `de ${gn}`;
}

/** Courbe échantillonnée (type « points ») ; le rendu ignore ce qui sort du cadre. */
function courbe(f: (x: number) => number, xmin: number, xmax: number, ymin: number, ymax: number, extra: Partial<Extract<CanvasFigure, { kind: "fonctionGraphique" }>> = {}): CanvasFigure {
  const points: { x: number; y: number }[] = [];
  const pas = (xmax - xmin) / 40;
  for (let i = 0; i <= 40; i++) {
    const x = Math.round((xmin + i * pas) * 1000) / 1000;
    const y = f(x);
    if (Number.isFinite(y)) points.push({ x, y: Math.round(y * 1000) / 1000 });
  }
  return {
    kind: "fonctionGraphique",
    size: { width: 320, height: 250 },
    xmin,
    xmax,
    ymin,
    ymax,
    grille: true,
    ...extra,
    courbes: [{ id: "f", type: "points", couleur: "#2563eb", points }, ...((extra as any).courbes ?? [])],
  } as CanvasFigure;
}

type Nature = "convexe" | "concave";
const autre = (v: Nature): Nature => (v === "convexe" ? "concave" : "convexe");

/* =========================================================
   CONVEXITE_RECONNAITRE
========================================================= */

const FORMES: Array<[string, Nature, string]> = [
  ["le profil d’un half-pipe de skate", "convexe", "il forme un creux"],
  ["la trajectoire d’un ballon de basket lancé vers le panier", "concave", "elle forme une bosse"],
  ["le câble porteur d’un pont suspendu, entre deux pylônes", "convexe", "il pend en creux"],
  ["une arche de pont en pierre", "concave", "elle forme une bosse"],
  ["le jet d’eau d’une fontaine", "concave", "il monte puis retombe en bosse"],
  ["la coupe d’une antenne parabolique", "convexe", "elle forme un creux"],
  ["une chaîne tenue par ses deux extrémités", "convexe", "elle pend en creux"],
  ["un dos-d’âne vu de côté", "concave", "il forme une bosse"],
  ["la trajectoire d’un boulet de canon", "concave", "elle forme une bosse"],
  ["la distance de freinage d’une voiture en fonction de sa vitesse", "convexe", "elle augmente de plus en plus vite (elle est proportionnelle au carré de la vitesse)"],
  ["l’aire d’un carré en fonction de la longueur de son côté", "convexe", "elle augmente de plus en plus vite"],
  ["un capital placé à intérêts composés, en fonction du temps", "convexe", "il augmente de plus en plus vite"],
  ["la température d’un café qui refroidit dans une pièce, en fonction du temps", "convexe", "elle baisse de moins en moins vite"],
  ["la vitesse d’un parachutiste qui s’approche de sa vitesse limite", "concave", "elle augmente de moins en moins vite"],
  ["la charge d’une batterie qui ralentit à l’approche de 100 %", "concave", "elle augmente de moins en moins vite"],
  ["la récolte d’un champ en fonction de l’engrais, quand chaque sac en plus rapporte de moins en moins", "concave", "elle augmente de moins en moins vite"],
  ["le coût total d’une usine dont chaque pièce supplémentaire coûte de plus en plus cher", "convexe", "il augmente de plus en plus vite"],
  ["le nombre de bactéries en début de culture", "convexe", "il augmente de plus en plus vite"],
  ["le nombre de mots appris en langue, quand les progrès ralentissent", "concave", "il augmente de moins en moins vite"],
  ["la quantité de médicament éliminée par le corps, qui ralentit au fil des heures", "concave", "elle augmente de moins en moins vite"],
  ["la hauteur d’un bambou en fin de croissance", "concave", "elle augmente de moins en moins vite"],
  ["la valeur d’une voiture d’occasion qui perd beaucoup au début puis de moins en moins", "convexe", "elle baisse de moins en moins vite"],
];

function genForme() {
  const [ctx, nat, raison] = randomChoice(FORMES);
  const text = randomChoice([
    `On modélise ${ctx} par la courbe d’une fonction. Sur l’intervalle étudié, cette fonction est plutôt :`,
    `Une ingénieure trace ${ctx}. La fonction qui modélise cette courbe est-elle convexe ou concave ?`,
    `Pense à ${ctx}. Quel mot décrit la fonction qui modélise cette situation ?`,
  ]);
  return qcm(
    text,
    nat,
    [autre(nat), "ni convexe ni concave", "affine"],
    expl(
      "convexe = courbe « en creux » (les pentes augmentent) ; concave = courbe « en bosse » (les pentes diminuent).",
      "on regarde comment la grandeur varie : de plus en plus vite, ou de moins en moins vite, ou en creux / en bosse.",
      `pour ${ctx}, ${raison}.`,
      `la fonction est ${nat}.`
    )
  );
}

/** Familles de courbes à lire sur un graphique, sans formule. */
function familleGraphe(): { f: (x: number) => number; nat: Nature; xmin: number; xmax: number; ymin: number; ymax: number } {
  const t = randomInt(1, 6);
  const s = randomChoice([1, -1]);
  const nat: Nature = s > 0 ? "convexe" : "concave";
  if (t === 1) {
    const a = randomChoice([0.5, 1, 2]) * s;
    const h = randomInt(-1, 1);
    const k = s > 0 ? randomInt(-3, -1) : randomInt(1, 3);
    return { f: (x) => a * (x - h) ** 2 + k, nat, xmin: -4, xmax: 4, ymin: -5, ymax: 5 };
  }
  if (t === 2) {
    const a = randomChoice([0.5, 1]) * s;
    return { f: (x) => a * Math.exp(x), nat, xmin: -4, xmax: 2, ymin: -5, ymax: 5 };
  }
  if (t === 3) {
    const a = randomChoice([0.5, 1]) * s;
    return { f: (x) => a * Math.exp(-x), nat, xmin: -2, xmax: 4, ymin: -5, ymax: 5 };
  }
  if (t === 4) {
    const a = randomChoice([1, 2]) * -s;
    return { f: (x) => a * Math.log(x), nat, xmin: 0, xmax: 6, ymin: -4, ymax: 4 };
  }
  if (t === 5) {
    const a = randomChoice([1, 2]) * -s;
    return { f: (x) => a * Math.sqrt(x), nat, xmin: 0, xmax: 6, ymin: -5, ymax: 5 };
  }
  const a = randomChoice([1, 2]) * s;
  return { f: (x) => (x <= 0 ? NaN : a / x), nat, xmin: 0, xmax: 6, ymin: -5, ymax: 5 };
}

function genGrapheNature() {
  const g = familleGraphe();
  const canvas = courbe(g.f, g.xmin, g.xmax, g.ymin, g.ymax);
  const t = randomInt(1, 3);
  if (t === 3) {
    const affirme = randomChoice<Nature>(["convexe", "concave"]);
    const correct = affirme === g.nat ? "Oui" : `Non, elle est ${g.nat}`;
    return qcm(
      `Sur l’intervalle affiché, un élève affirme que la fonction $f$ tracée ci-dessous est ${affirme}. A-t-il raison ?`,
      correct,
      affirme === g.nat ? [`Non, elle est ${autre(g.nat)}`, "On ne peut pas savoir sans sa formule"] : ["Oui", "On ne peut pas savoir sans sa formule"],
      expl("convexe = en creux, concave = en bosse.", "on regarde si la courbe se creuse vers le haut ou se bombe.", `la courbe est ${g.nat === "convexe" ? "en creux" : "en bosse"}.`, `$f$ est ${g.nat} sur cet intervalle.`),
      canvas
    );
  }
  return qcm(
    randomChoice([
      "Voici la courbe d’une fonction $f$. Sur l’intervalle affiché, $f$ est :",
      "D’après le graphique, sur l’intervalle affiché, la fonction $f$ est :",
      "Observe la courbe de $f$ : est-elle « en creux » ou « en bosse » ? $f$ est donc :",
      "Une physicienne a tracé la courbe ci-dessous. Sur l’intervalle affiché, la fonction est :",
    ]),
    g.nat,
    [autre(g.nat), "ni convexe ni concave", "affine"],
    expl("convexe = en creux, concave = en bosse.", "on regarde la forme de la courbe sur tout l’intervalle.", `la courbe est ${g.nat === "convexe" ? "en creux" : "en bosse"}.`, `$f$ est ${g.nat} sur cet intervalle.`),
    canvas
  );
}

const PROPRIETES: Array<[string, Nature]> = [
  ["sa courbe est au-dessus de chacune de ses tangentes", "convexe"],
  ["sa courbe est au-dessous de chacune de ses tangentes", "concave"],
  ["sa courbe est au-dessous de chacune de ses cordes (les segments qui joignent deux de ses points)", "convexe"],
  ["sa courbe est au-dessus de chacune de ses cordes (les segments qui joignent deux de ses points)", "concave"],
  ["sa dérivée $f'$ est croissante", "convexe"],
  ["sa dérivée $f'$ est décroissante", "concave"],
  ["les coefficients directeurs de ses tangentes augmentent quand $x$ augmente", "convexe"],
  ["les coefficients directeurs de ses tangentes diminuent quand $x$ augmente", "concave"],
  ["sa dérivée seconde $f''$ est positive", "convexe"],
  ["sa dérivée seconde $f''$ est négative", "concave"],
];

const INTERVALLES = ["sur $\\mathbb{R}$", "sur un intervalle $I$", "sur $[0\\,;+\\infty[$", "sur $]-\\infty\\,;2]$", "sur $]0\\,;5[$"];

function genPropriete() {
  const [p, nat] = randomChoice(PROPRIETES);
  const I = randomChoice(INTERVALLES);
  const ex = expl(
    "$f$ convexe ⟺ $f'$ croissante ⟺ $f'' \\ge 0$ ⟺ courbe au-dessus de ses tangentes et au-dessous de ses cordes (et l’inverse pour concave).",
    "on relie la propriété donnée à l’une de ces caractérisations.",
    `${p} : c’est la caractérisation d’une fonction ${nat}.`,
    `$f$ est ${nat} ${I}.`
  );
  if (randomInt(1, 3) === 3) {
    const teste = randomChoice<Nature>(["convexe", "concave"]);
    return qcm(`Vrai ou faux ? Si, ${I}, ${p}, alors $f$ est ${teste} ${I}.`, teste === nat ? "Vrai" : "Faux", [teste === nat ? "Faux" : "Vrai"], ex);
  }
  return qcm(
    randomChoice([`Une fonction $f$ dérivable vérifie, ${I} : ${p}. Alors, ${I}, $f$ est :`, `On sait que, ${I}, ${p}. Que peut-on dire de $f$ ${I} ?`]),
    nat,
    [autre(nat), "croissante", "ni convexe ni concave"],
    ex
  );
}

const REFERENCES: Array<[string, string, Nature, string]> = [
  ["la fonction exponentielle", "$\\mathbb{R}$", "convexe", "$(e^x)'' = e^x > 0$"],
  ["la fonction logarithme népérien", "$]0\\,;+\\infty[$", "concave", "$(\\ln x)'' = -\\dfrac{1}{x^2} < 0$"],
  ["la fonction carré", "$\\mathbb{R}$", "convexe", "$(x^2)'' = 2 > 0$"],
  ["la fonction racine carrée", "$]0\\,;+\\infty[$", "concave", "$(\\sqrt{x})'' = -\\dfrac{1}{4x\\sqrt{x}} < 0$"],
  ["la fonction inverse", "$]0\\,;+\\infty[$", "convexe", "$\\left(\\dfrac{1}{x}\\right)'' = \\dfrac{2}{x^3} > 0$ pour $x > 0$"],
  ["la fonction inverse", "$]-\\infty\\,;0[$", "concave", "$\\left(\\dfrac{1}{x}\\right)'' = \\dfrac{2}{x^3} < 0$ pour $x < 0$"],
  ["la fonction cube", "$[0\\,;+\\infty[$", "convexe", "$(x^3)'' = 6x \\ge 0$ pour $x \\ge 0$"],
  ["la fonction cube", "$]-\\infty\\,;0]$", "concave", "$(x^3)'' = 6x \\le 0$ pour $x \\le 0$"],
  ["la fonction $x \\mapsto -x^2$", "$\\mathbb{R}$", "concave", "$(-x^2)'' = -2 < 0$"],
  ["la fonction $x \\mapsto e^{-x}$", "$\\mathbb{R}$", "convexe", "$(e^{-x})'' = e^{-x} > 0$"],
  ["la fonction $x \\mapsto -\\ln x$", "$]0\\,;+\\infty[$", "convexe", "$(-\\ln x)'' = \\dfrac{1}{x^2} > 0$"],
  ["la fonction $x \\mapsto x^4$", "$\\mathbb{R}$", "convexe", "$(x^4)'' = 12x^2 \\ge 0$"],
];

function genReference() {
  const [nom, I, nat, calc] = randomChoice(REFERENCES);
  return qcm(
    randomChoice([`Sur ${I}, ${nom} est :`, `Quelle est la convexité de ${nom} sur ${I} ?`, `Un élève doit tracer ${nom} sur ${I}. Sa courbe sera :`]),
    nat,
    [autre(nat), "ni convexe ni concave", "convexe puis concave"],
    expl("on lit la convexité sur le signe de la dérivée seconde.", "on dérive deux fois.", `${calc}.`, `${nom} est ${nat} sur ${I}.`)
  );
}

/** $f'$ donnée : son sens de variation donne la convexité de $f$. */
function genDeriveeDonnee() {
  const t = randomInt(1, 6);
  let fp = "", I = "$\\mathbb{R}$", sens = "", nat: Nature = "convexe";
  const a = randomInt(2, 6), b = randomInt(-5, 5);
  if (t === 1) { const s = randomChoice([1, -1]); fp = poly([[s * a, 1], [b, 0]]); nat = s > 0 ? "convexe" : "concave"; sens = `$f'$ est affine de coefficient directeur ${s > 0 ? "positif" : "négatif"}, donc ${s > 0 ? "croissante" : "décroissante"}`; }
  else if (t === 2) { const s = randomChoice([1, -1]); fp = `${s > 0 ? "" : "-"}${a === 1 ? "" : a}e^x${b ? (b > 0 ? ` + ${b}` : ` - ${-b}`) : ""}`; nat = s > 0 ? "convexe" : "concave"; sens = `$e^x$ est croissante, donc $f'$ est ${s > 0 ? "croissante" : "décroissante"}`; }
  else if (t === 3) { fp = `\\ln x${b ? (b > 0 ? ` + ${b}` : ` - ${-b}`) : ""}`; I = "$]0\\,;+\\infty[$"; nat = "convexe"; sens = "$\\ln$ est croissante, donc $f'$ est croissante"; }
  else if (t === 4) { fp = `\\dfrac{${a}}{x}`; I = "$]0\\,;+\\infty[$"; nat = "concave"; sens = "$\\dfrac{1}{x}$ est décroissante sur $]0\\,;+\\infty[$, donc $f'$ est décroissante"; }
  else if (t === 5) { fp = `-${a}e^{-x}`; nat = "convexe"; sens = `$e^{-x}$ est décroissante, donc $-${a}e^{-x}$ est croissante`; }
  else { fp = `${a}\\sqrt{x}`; I = "$[0\\,;+\\infty[$"; nat = "convexe"; sens = "$\\sqrt{x}$ est croissante, donc $f'$ est croissante"; }
  return qcm(
    randomChoice([`On sait que, sur ${I}, $f'(x) = ${fp}$. Sur ${I}, $f$ est :`, `La dérivée d’une fonction $f$ vaut $f'(x) = ${fp}$ sur ${I}. Que peut-on dire de la convexité de $f$ ?`, `Un économiste modélise un coût $f$ dont la dérivée (le coût marginal) est $f'(x) = ${fp}$ sur ${I}. La fonction $f$ est :`]),
    nat,
    [autre(nat), "croissante, donc convexe", "ni convexe ni concave"],
    expl("$f$ est convexe quand $f'$ est croissante, concave quand $f'$ est décroissante.", "on étudie le sens de variation de $f'$ (pas son signe !).", `${sens}.`, `$f$ est ${nat} sur ${I}.`)
  );
}

/** Courbe de $f'$ affichée : piège classique, on lit le SENS de variation de $f'$. */
function genGrapheDerivee() {
  const s = randomChoice([1, -1]);
  const t = randomInt(1, 3);
  const nat: Nature = s > 0 ? "convexe" : "concave";
  const h = randomInt(-1, 1);
  const f = t === 1 ? (x: number) => s * 0.8 * (x - h) : t === 2 ? (x: number) => s * Math.exp(x) - s * 2 : (x: number) => s * Math.atan(x - h) * 2;
  const canvas = courbe(f, -4, 4, -4, 4);
  return qcm(
    randomChoice([
      "Attention : la courbe tracée est celle de la DÉRIVÉE $f'$. Sur l’intervalle affiché, $f$ est :",
      "Voici la courbe de $f'$, la dérivée d’une fonction $f$. Que peut-on dire de la convexité de $f$ sur l’intervalle affiché ?",
      "Un capteur enregistre la vitesse $f'$ d’un véhicule (courbe ci-dessous). La position $f$ est, sur l’intervalle affiché :",
    ]),
    nat,
    [autre(nat), "positive", "ni convexe ni concave"],
    expl("$f$ convexe ⟺ $f'$ croissante ; $f$ concave ⟺ $f'$ décroissante.", "sur la courbe de $f'$, on lit si elle monte ou descend (et non si elle est au-dessus de l’axe).", `la courbe de $f'$ ${s > 0 ? "monte" : "descend"}.`, `$f$ est ${nat} sur l’intervalle affiché.`),
    canvas
  );
}

/** Variations de $f'$ (ou signe de $f''$) en mots → intervalle de convexité. */
function genTableauDerivee() {
  const k = randomInt(-3, 3);
  const monte = randomChoice([true, false]);
  const demande = randomChoice<Nature>(["convexe", "concave"]);
  const convexeADroite = monte;
  const bon = (demande === "convexe") === convexeADroite ? droite(k) : gauche(k);
  const desc = monte
    ? `$f'$ est décroissante sur $]-\\infty\\,;${n(k)}]$ puis croissante sur $[${n(k)}\\,;+\\infty[$`
    : `$f'$ est croissante sur $]-\\infty\\,;${n(k)}]$ puis décroissante sur $[${n(k)}\\,;+\\infty[$`;
  return qcm(
    randomChoice([
      `On sait que ${desc}. Sur quel intervalle $f$ est-elle ${demande} ?`,
      `Le tableau de variations de la dérivée donne : ${desc}. Sur quel intervalle $f$ est-elle ${demande} ?`,
      `Une data scientist observe que ${desc}. Sur quel intervalle $f$ est-elle ${demande} ?`,
    ]),
    bon,
    [bon === droite(k) ? gauche(k) : droite(k), R, ferme(k - 1, k + 1)],
    expl("$f$ convexe là où $f'$ croît, concave là où $f'$ décroît.", "on lit le sens de variation de $f'$ sur chaque intervalle.", desc + ".", `$f$ est ${demande} sur ${bon}.`)
  );
}

/** Courbe avec un point d’inflexion : lire l’intervalle de convexité. */
function cubiqueInflexion() {
  const h = randomInt(-2, 2);
  const k = randomInt(-1, 1);
  const s = randomChoice([1, -1]);
  const a = randomChoice([0.3, 0.5]) * s;
  const b = randomChoice([-1.5, -1, 0.5]) * s;
  return { h, k, s, f: (x: number) => a * (x - h) ** 3 + b * (x - h) + k };
}

function genIntervalleGraphe() {
  const c = cubiqueInflexion();
  const demande = randomChoice<Nature>(["convexe", "concave"]);
  // a > 0 : concave à gauche de h, convexe à droite.
  const bon = (demande === "convexe") === c.s > 0 ? droite(c.h) : gauche(c.h);
  return qcm(
    randomChoice([
      `Voici la courbe d’une fonction $f$ (le point marqué I est un point d’inflexion). Sur quel intervalle $f$ semble-t-elle ${demande} ?`,
      `D’après le graphique, sur quel intervalle la fonction $f$ est-elle ${demande} ? (I est le point d’inflexion.)`,
      `Une architecte dessine le profil d’une toiture avec la courbe ci-dessous. Sur quel intervalle ce profil est-il ${demande} ?`,
      `La courbe de $f$ change de convexité en I. Sur quel intervalle $f$ est-elle ${demande} ?`,
      `Un économiste trace l’évolution d’un prix (courbe ci-dessous). Sur quel intervalle cette courbe est-elle ${demande} ?`,
    ]),
    bon,
    [bon === droite(c.h) ? gauche(c.h) : droite(c.h), R, ferme(c.h - 2, c.h + 2)],
    expl("convexe = en creux, concave = en bosse ; la courbe change de convexité au point d’inflexion.", "on repère l’abscisse de I, puis la forme de la courbe de chaque côté.", `I a pour abscisse ${n(c.h)}.`, `$f$ est ${demande} sur ${bon}.`),
    courbe(c.f, c.h - 4, c.h + 4, c.k - 4, c.k + 4, { misesEnEvidence: [{ point: { x: c.h, y: c.k, label: "I", couleur: "#dc2626" } }] })
  );
}

/** Courbe de $f''$ affichée : convexité là où elle est positive. */
function genGrapheSeconde() {
  const k = randomInt(-2, 2);
  const s = randomChoice([1, -1]);
  const demande = randomChoice<Nature>(["convexe", "concave"]);
  const bon = (demande === "convexe") === s > 0 ? droite(k) : gauche(k);
  return qcm(
    randomChoice([
      `La courbe tracée est celle de la dérivée SECONDE $f''$. Sur quel intervalle $f$ est-elle ${demande} ?`,
      `Voici la courbe de $f''$. Sur quel intervalle la fonction $f$ est-elle ${demande} ?`,
      `En physique, $f''$ est l’accélération. Voici sa courbe : sur quel intervalle la position $f$ est-elle ${demande} ?`,
      `On a tracé $f''$ (et non $f$ !). Sur quel intervalle $f$ est-elle ${demande} ?`,
      `Lis le signe de $f''$ sur sa courbe ci-dessous. Sur quel intervalle $f$ est-elle ${demande} ?`,
    ]),
    bon,
    [bon === droite(k) ? gauche(k) : droite(k), R, "aucun"],
    expl("$f$ convexe là où $f'' \\ge 0$, concave là où $f'' \\le 0$.", "sur la courbe de $f''$, on lit son SIGNE : au-dessus ou au-dessous de l’axe.", `$f''$ change de signe en ${n(k)}.`, `$f$ est ${demande} sur ${bon}.`),
    courbe((x) => s * 0.8 * (x - k), -4, 4, -4, 4)
  );
}

/* =========================================================
   CONVEXITE_DERIVEE_SECONDE
========================================================= */

/** f polynôme : sa dérivée seconde (QCM) ou f''(x0) (réponse courte). */
function polyAuHasard() {
  const t = randomInt(1, 3);
  const a = randomChoice([1, 2, 3, -1, -2, 4]);
  const b = randomInt(-5, 5);
  const c = randomInt(-6, 6);
  const d = randomInt(-4, 4);
  if (t === 1) return { f: poly([[a, 3], [b, 2], [c, 1], [d, 0]]), fp: poly([[3 * a, 2], [2 * b, 1], [c, 0]]), fs: poly([[6 * a, 1], [2 * b, 0]]), val: (x: number) => 6 * a * x + 2 * b, pieges: [poly([[3 * a, 2], [2 * b, 1], [c, 0]]), poly([[6 * a, 2], [2 * b, 1]]), poly([[3 * a, 1], [b, 0]])] };
  if (t === 2) return { f: poly([[a, 4], [b, 2], [c, 0]]), fp: poly([[4 * a, 3], [2 * b, 1]]), fs: poly([[12 * a, 2], [2 * b, 0]]), val: (x: number) => 12 * a * x * x + 2 * b, pieges: [poly([[4 * a, 3], [2 * b, 1]]), poly([[12 * a, 2], [2 * b, 1]]), poly([[12 * a, 3], [2 * b, 0]])] };
  const e = a === 1 ? 2 : a;
  return { f: poly([[e, 2], [b || 3, 1], [c, 0]]), fp: poly([[2 * e, 1], [b || 3, 0]]), fs: poly([[2 * e, 0]]), val: () => 2 * e, pieges: [poly([[2 * e, 1], [b || 3, 0]]), poly([[2 * e, 1]]), poly([[e, 0]])] };
}

function genD2Poly() {
  const p = polyAuHasard();
  return qcm(
    randomChoice([
      `Soit $f(x) = ${p.f}$. Quelle est sa dérivée seconde $f''(x)$ ?`,
      `On dérive deux fois $f(x) = ${p.f}$. On obtient :`,
      `Pour étudier la convexité de $f(x) = ${p.f}$ sur $\\mathbb{R}$, on calcule $f''(x)$. Que vaut-elle ?`,
    ]),
    `$${p.fs}$`,
    p.pieges.map((x) => `$${x}$`),
    expl("$f''$ est la dérivée de $f'$.", "on dérive une première fois, puis une seconde.", `$f'(x) = ${p.fp}$, puis $f''(x) = ${p.fs}$.`, `$f''(x) = ${p.fs}$.`)
  );
}

const MOBILES = [
  ["d’un drone qui décolle", "m"],
  ["d’une cycliste sur une piste", "m"],
  ["d’un ascenseur", "m"],
  ["d’un train qui quitte la gare", "m"],
  ["d’une voiture radiocommandée", "m"],
  ["d’une fusée à eau", "m"],
  ["d’un robot de livraison dans un entrepôt", "m"],
  ["d’une nageuse lors d’un départ", "m"],
];

function genD2Valeur() {
  const p = polyAuHasard();
  const x0 = randomInt(-2, 3);
  const t = randomInt(1, 2);
  if (t === 2) {
    const [mob] = randomChoice(MOBILES);
    const tt = Math.abs(x0) || 1;
    const fT = p.f.replace(/x/g, "t");
    return court(
      `La position ${mob} est modélisée par $s(t) = ${fT}$ (en mètres, $t$ en secondes). Son accélération est $s''(t)$. Calcule $s''(${tt})$.`,
      p.val(tt),
      expl("l’accélération est la dérivée seconde de la position.", "on dérive deux fois, puis on remplace $t$.", `$s''(t) = ${p.fs.replace(/x/g, "t")}$, donc $s''(${tt}) = ${n(p.val(tt))}$.`, `l’accélération vaut ${n(p.val(tt))} m/s² à $t = ${tt}$ s.`)
    );
  }
  return court(
    randomChoice([`Soit $f(x) = ${p.f}$. Calcule $f''(${x0})$.`, `Pour $f(x) = ${p.f}$, que vaut la dérivée seconde en $${x0}$ ?`]),
    p.val(x0),
    expl("$f''$ est la dérivée de $f'$.", "on dérive deux fois, puis on remplace $x$.", `$f'(x) = ${p.fp}$, $f''(x) = ${p.fs}$, donc $f''(${x0}) = ${n(p.val(x0))}$.`, `$f''(${x0}) = ${n(p.val(x0))}$.`)
  );
}

/** Signe de f'' → intervalle de convexité. */
function secondeAuHasard() {
  const t = randomInt(1, 5);
  const k = randomInt(-3, 3);
  const m = randomChoice([2, 3, 6, 12]);
  const s = randomChoice([1, -1]);
  if (t === 1) return { fs: poly([[s * m, 1], [-s * m * k, 0]]), k, droiteConvexe: s > 0, signe: `$${poly([[s * m, 1], [-s * m * k, 0]])}$ ${s > 0 ? "≥" : "≤"} 0 pour $x \\ge ${n(k)}$` };
  if (t === 2) return { fs: `(${xPlus(-k)})e^x`, k, droiteConvexe: true, signe: `$e^x > 0$, donc $f''(x)$ a le signe de $${xPlus(-k)}$` };
  if (t === 3) return { fs: k === 0 ? "-xe^{-x}" : `(${n(k)} - x)e^{-x}`, k, droiteConvexe: false, signe: `$e^{-x} > 0$, donc $f''(x)$ a le signe de $${n(k)} - x$` };
  if (t === 4) return { fs: `${m}(${xPlus(-k)})e^{2x}`, k, droiteConvexe: true, signe: `$${m}e^{2x} > 0$, donc $f''(x)$ a le signe de $${xPlus(-k)}$` };
  return { fs: `\\dfrac{${xPlus(-k)}}{x^2 + 1}`, k, droiteConvexe: true, signe: "$x^2 + 1 > 0$, donc $f''(x)$ a le signe du numérateur" };
}

function genSigneSeconde() {
  const q = secondeAuHasard();
  const demande = randomChoice<Nature>(["convexe", "concave"]);
  const bon = (demande === "convexe") === q.droiteConvexe ? droite(q.k) : gauche(q.k);
  return qcm(
    randomChoice([
      `On a calculé $f''(x) = ${q.fs}$ sur $\\mathbb{R}$. Sur quel intervalle $f$ est-elle ${demande} ?`,
      `Pour une fonction $f$ définie sur $\\mathbb{R}$, $f''(x) = ${q.fs}$. Sur quel intervalle $f$ est-elle ${demande} ?`,
      `En étudiant le signe de $f''(x) = ${q.fs}$, on trouve que $f$ est ${demande} sur :`,
    ]),
    bon,
    [bon === droite(q.k) ? gauche(q.k) : droite(q.k), R, ferme(q.k - 1, q.k + 1)],
    expl("$f$ convexe là où $f'' \\ge 0$, concave là où $f'' \\le 0$.", "on étudie le signe de $f''$.", `${q.signe} ; $f''$ change de signe en ${n(q.k)}.`, `$f$ est ${demande} sur ${bon}.`)
  );
}

/** f avec exponentielle ou logarithme : f'' (QCM). */
function genD2ExpLn() {
  const t = randomInt(1, 6);
  const m = randomInt(-3, 3);
  const k = randomChoice([2, 3, -2, -3]);
  const a = randomInt(2, 5);
  let f = "", fp = "", fs = "", pieges: string[] = [];
  if (t === 1) { f = `(${xPlus(m)})e^x`; fp = `(${xPlus(m + 1)})e^x`; fs = `(${xPlus(m + 2)})e^x`; pieges = [fp, `e^x`, `(${xPlus(m)})e^x`]; }
  else if (t === 2) { f = `e^{${k}x}`; fp = `${k}e^{${k}x}`; fs = `${k * k}e^{${k}x}`; pieges = [fp, `${k * k}e^{x}`, `e^{${k}x}`]; }
  else if (t === 3) { f = "x\\ln x"; fp = "\\ln x + 1"; fs = "\\dfrac{1}{x}"; pieges = [fp, "\\ln x", "-\\dfrac{1}{x^2}"]; }
  else if (t === 4) { f = `${a}\\ln x + x^2`; fp = `\\dfrac{${a}}{x} + 2x`; fs = `-\\dfrac{${a}}{x^2} + 2`; pieges = [fp, `\\dfrac{${a}}{x^2} + 2`, `-\\dfrac{${a}}{x^2} + 2x`]; }
  else if (t === 5) { f = "xe^{-x}"; fp = "(1 - x)e^{-x}"; fs = "(x - 2)e^{-x}"; pieges = [fp, "(2 - x)e^{-x}", "-e^{-x}"]; }
  else { f = `e^x - ${a}x^2`; fp = `e^x - ${2 * a}x`; fs = `e^x - ${2 * a}`; pieges = [fp, `e^x + ${2 * a}`, `e^x - ${a}`]; }
  return qcm(
    randomChoice([
      `Soit $f(x) = ${f}$. Quelle est sa dérivée seconde $f''(x)$ ?`,
      `On a $f(x) = ${f}$ et $f'(x) = ${fp}$. Que vaut $f''(x)$ ?`,
      `Pour étudier la convexité de $f(x) = ${f}$, on calcule $f''(x)$. On trouve :`,
    ]),
    `$${fs}$`,
    pieges.map((x) => `$${x}$`),
    expl("$f''$ est la dérivée de $f'$ ; $(uv)' = u'v + uv'$, $(e^{u})' = u'e^{u}$.", "on dérive une première fois, puis une seconde.", `$f'(x) = ${fp}$, puis $f''(x) = ${fs}$.`, `$f''(x) = ${fs}$.`)
  );
}

/* =========================================================
   CONVEXITE_POINT_INFLEXION
========================================================= */

const AFFIRMATIONS_INFLEXION: Array<[string, boolean, string]> = [
  ["En un point d’inflexion, la courbe traverse sa tangente.", true, "de part et d’autre, la courbe est au-dessus puis au-dessous de sa tangente"],
  ["Si $f''(a) = 0$, alors la courbe admet forcément un point d’inflexion d’abscisse $a$.", false, "pour $x^4$, $f''(0) = 0$ mais $f'' = 12x^2$ ne change pas de signe"],
  ["Si $f''$ s’annule en $a$ en changeant de signe, la courbe admet un point d’inflexion d’abscisse $a$.", true, "c’est la méthode du cours"],
  ["Un point d’inflexion est toujours un maximum ou un minimum de $f$.", false, "la fonction cube a un point d’inflexion en 0 et n’y a pas d’extremum"],
  ["En un point d’inflexion, la courbe passe de convexe à concave, ou l’inverse.", true, "c’est la définition"],
  ["Si $f'$ change de sens de variation en $a$, la courbe de $f$ a un point d’inflexion d’abscisse $a$.", true, "la convexité dépend du sens de variation de $f'$"],
  ["La courbe de la fonction carré a un point d’inflexion en 0.", false, "$x^2$ est convexe sur $\\mathbb{R}$, elle ne change jamais de convexité"],
  ["La courbe de la fonction cube a un point d’inflexion à l’origine.", true, "$(x^3)'' = 6x$ change de signe en 0"],
  ["Une fonction convexe sur $\\mathbb{R}$ peut avoir un point d’inflexion.", false, "elle ne change jamais de convexité"],
  ["La tangente en un point d’inflexion est toujours horizontale.", false, "pour $x^3 - 3x$, la tangente en 0 a pour coefficient directeur $-3$"],
  ["La courbe de l’exponentielle a un point d’inflexion.", false, "$(e^x)'' = e^x > 0$ : elle est convexe partout"],
  ["Au point d’inflexion, la dérivée $f'$ atteint un extremum local.", true, "$f'$ change de sens de variation en ce point"],
];

function genAffirmationInflexion() {
  const [aff, vrai, raison] = randomChoice(AFFIRMATIONS_INFLEXION);
  const ex = expl("un point d’inflexion est un point où la courbe change de convexité (là où $f''$ s’annule en changeant de signe).", "on confronte l’affirmation à la définition, ou à un contre-exemple.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`);
  if (randomInt(1, 2) === 1) return qcm(`Vrai ou faux ? ${aff}`, vrai ? "Vrai" : "Faux", [vrai ? "Faux" : "Vrai"], ex);
  return qcm(`Un camarade affirme : « ${aff} » A-t-il raison ?`, vrai ? "Oui" : "Non", [vrai ? "Non" : "Oui"], ex);
}

function genLireInflexion() {
  const c = cubiqueInflexion();
  return court(
    randomChoice([
      "Voici la courbe d’une fonction $f$. Lis l’abscisse de son point d’inflexion.",
      "Sur ce graphique, à quelle abscisse la courbe passe-t-elle de « en creux » à « en bosse » (ou l’inverse) ?",
      "Un sismographe trace la courbe ci-dessous. En quelle abscisse la courbe change-t-elle de convexité ?",
      "La courbe ci-dessous admet un point d’inflexion. Quelle est son abscisse ?",
      "D’après le graphique, en quelle valeur de $x$ la tangente traverse-t-elle la courbe ?",
      "Un ingénieur routier dessine le profil d’une route (ci-dessous). À quelle abscisse le virage change-t-il de sens ?",
      "Sur ce graphique, la pente de la courbe est la plus forte (ou la plus faible) en un point. Lis son abscisse.",
      "Lis sur le graphique l’abscisse du point où la courbe passe de convexe à concave, ou l’inverse.",
    ]),
    c.h,
    expl("au point d’inflexion, la courbe change de convexité.", "on repère où la courbe passe de creux à bosse.", `la courbe change de forme en $x = ${n(c.h)}$.`, `l’abscisse du point d’inflexion est ${n(c.h)}.`),
    courbe(c.f, c.h - 4, c.h + 4, c.k - 4, c.k + 4)
  );
}

function genInflexionDepuisSeconde() {
  const q = secondeAuHasard();
  return court(
    randomChoice([
      `On a $f''(x) = ${q.fs}$. Quelle est l’abscisse du point d’inflexion de la courbe de $f$ ?`,
      `La dérivée seconde de $f$ est $f''(x) = ${q.fs}$. En quelle abscisse la courbe change-t-elle de convexité ?`,
      `Une biologiste étudie une croissance $f$ avec $f''(x) = ${q.fs}$. Donne l’abscisse du point d’inflexion.`,
    ]),
    q.k,
    expl("le point d’inflexion est là où $f''$ s’annule en changeant de signe.", "on étudie le signe de $f''$.", `${q.signe} ; il change de signe en ${n(q.k)}.`, `l’abscisse du point d’inflexion est ${n(q.k)}.`)
  );
}

function genInflexionDepuisF() {
  const t = randomInt(1, 2);
  if (t === 1) {
    const a = randomChoice([1, 2, -1, 3]);
    const k = randomInt(-3, 3) || 2;
    const c = randomInt(-5, 5);
    const f = poly([[a, 3], [-3 * a * k, 2], [c, 1], [randomInt(-4, 4), 0]]);
    const fs = poly([[6 * a, 1], [-6 * a * k, 0]]);
    return court(
      randomChoice([`Soit $f(x) = ${f}$. Quelle est l’abscisse du point d’inflexion de sa courbe ?`, `Détermine l’abscisse du point d’inflexion de la courbe de $f(x) = ${f}$.`]),
      k,
      expl("le point d’inflexion est là où $f''$ s’annule en changeant de signe.", "on calcule $f''$ puis on résout $f''(x) = 0$.", `$f''(x) = ${fs}$, qui s’annule en changeant de signe en $x = ${n(k)}$.`, `l’abscisse du point d’inflexion est ${n(k)}.`)
    );
  }
  const m = randomInt(-3, 3);
  return court(
    randomChoice([`Soit $f(x) = (${xPlus(m)})e^x$. Quelle est l’abscisse du point d’inflexion de sa courbe ?`, `On admet que $f(x) = (${xPlus(m)})e^x$ a pour dérivée seconde $f''(x) = (${xPlus(m + 2)})e^x$. Donne l’abscisse du point d’inflexion.`]),
    -m - 2,
    expl("le point d’inflexion est là où $f''$ s’annule en changeant de signe.", "$e^x > 0$, donc $f''$ a le signe de son facteur affine.", `$f''(x) = (${xPlus(m + 2)})e^x$ s’annule en $x = ${n(-m - 2)}$ en changeant de signe.`, `l’abscisse du point d’inflexion est ${n(-m - 2)}.`)
  );
}

function genNombreInflexions() {
  const t = randomInt(1, 4);
  const k = randomInt(1, 3);
  const c = randomInt(1, 6);
  let f = "", fs = "", nb = 0, raison = "";
  if (t === 1) { f = poly([[1, 4], [-6 * k * k, 2], [c, 0]]); fs = poly([[12, 2], [-12 * k * k, 0]]); nb = 2; raison = `$f''(x) = 12(x^2 - ${k * k})$ change de signe en $-${k}$ et en $${k}$`; }
  else if (t === 2) { f = poly([[1, 4], [6 * c, 2]]); fs = poly([[12, 2], [12 * c, 0]]); nb = 0; raison = "$f''(x) > 0$ pour tout $x$ : pas de changement de signe"; }
  else if (t === 3) { f = poly([[c, 4]]); fs = poly([[12 * c, 2]]); nb = 0; raison = "$f''(x) = " + poly([[12 * c, 2]]) + "$ s’annule en 0 sans changer de signe"; }
  else { f = poly([[c, 3], [-3 * c * k, 2]]); fs = poly([[6 * c, 1], [-6 * c * k, 0]]); nb = 1; raison = `$f''(x) = ${fs}$ change de signe une seule fois, en ${k}`; }
  return qcm(
    randomChoice([`Combien de points d’inflexion la courbe de $f(x) = ${f}$ possède-t-elle ?`, `On a $f(x) = ${f}$, donc $f''(x) = ${fs}$. Combien la courbe a-t-elle de points d’inflexion ?`]),
    String(nb),
    ["0", "1", "2", "3"].filter((x) => x !== String(nb)),
    expl("un point d’inflexion = un changement de signe de $f''$.", "on calcule $f''$ et on compte ses changements de signe (pas seulement ses zéros).", `${raison}.`, `la courbe a ${nb} point${nb > 1 ? "s" : ""} d’inflexion.`)
  );
}

const CROISSANCES = [
  ["le nombre de ventes cumulées d’un jeu vidéo (en milliers)", "semaines", "les ventes progressent le plus vite"],
  ["le nombre d’abonnés d’une chaîne de cuisine (en milliers)", "mois", "les abonnements arrivent le plus vite"],
  ["le nombre de cas d’une épidémie de grippe (en centaines)", "semaines", "l’épidémie progresse le plus vite"],
  ["la hauteur d’un tournesol (en cm)", "semaines", "le tournesol pousse le plus vite"],
  ["le nombre de téléchargements d’une application (en milliers)", "jours", "les téléchargements s’accélèrent le plus"],
  ["le nombre de personnes ayant vu une vidéo virale (en milliers)", "heures", "la vidéo se diffuse le plus vite"],
  ["la surface couverte par une algue dans un lac (en m²)", "jours", "l’algue s’étend le plus vite"],
  ["le nombre de billets vendus pour un festival (en centaines)", "jours", "la billetterie tourne le plus vite"],
  ["la masse d’un poussin (en dizaines de grammes)", "jours", "le poussin grossit le plus vite"],
  ["le nombre de panneaux solaires installés dans une région (en milliers)", "mois", "les installations progressent le plus vite"],
];

function genInflexionContexte() {
  const [quoi, unite, sens] = randomChoice(CROISSANCES);
  const k = randomInt(2, 6);
  const c = randomInt(1, 20);
  const fT = poly([[-1, 3], [3 * k, 2], [c, 0]]).replace(/x/g, "t");
  const N = (t: number) => -(t ** 3) + 3 * k * t * t + c;
  const t = randomInt(1, 2);
  const ex = expl(
    "la vitesse de croissance est $N'(t)$ ; elle est maximale là où $N'$ change de sens, c’est-à-dire au point d’inflexion.",
    "on calcule $N''(t)$ et on cherche où elle s’annule en changeant de signe.",
    `$N'(t) = -3t^2 + ${6 * k}t$, $N''(t) = -6t + ${6 * k}$, qui s’annule en changeant de signe en $t = ${k}$ ; $N(${k}) = ${n(N(k))}$.`,
    `${sens} à $t = ${k}$ ${unite}.`
  );
  if (t === 2)
    return court(`Pour $t$ entre 0 et ${2 * k} (en ${unite}), on modélise ${quoi} par $N(t) = ${fT}$. Quelle est la valeur de $N$ au point d’inflexion ?`, N(k), ex);
  return court(`Pour $t$ entre 0 et ${2 * k} (en ${unite}), on modélise ${quoi} par $N(t) = ${fT}$. Au bout de combien de ${unite} ${sens} ?`, k, ex);
}

/* =========================================================
   CONVEXITE_TANGENTE
========================================================= */

function genTangenteConcept() {
  const [nom, I, nat] = randomChoice(REFERENCES);
  const bon = nat === "convexe" ? "au-dessus de ses tangentes" : "au-dessous de ses tangentes";
  return qcm(
    randomChoice([`Sur ${I}, la courbe de ${nom} est :`, `Où se trouve la courbe de ${nom} par rapport à ses tangentes, sur ${I} ?`, `On trace une tangente à la courbe de ${nom}, en un point d’abscisse dans ${I}. Sur ${I}, la courbe est :`]),
    bon,
    [nat === "convexe" ? "au-dessous de ses tangentes" : "au-dessus de ses tangentes", "elle coupe toujours ses tangentes", "confondue avec ses tangentes"],
    expl("convexe : courbe au-dessus de ses tangentes ; concave : au-dessous.", "on détermine d’abord la convexité de la fonction.", `${nom} est ${nat} sur ${I}.`, `sa courbe est ${bon}.`)
  );
}

const INEGALITES: Array<[string, string, string[], string]> = [
  ["exponentielle", "$e^x \\ge x + 1$ pour tout réel $x$", ["$e^x \\le x + 1$ pour tout réel $x$", "$e^x \\ge x$ seulement pour $x \\ge 0$", "$e^x \\le 1$ pour tout réel $x$"], "exp est convexe et $y = x + 1$ est sa tangente en 0"],
  ["logarithme népérien", "$\\ln x \\le x - 1$ pour tout $x > 0$", ["$\\ln x \\ge x - 1$ pour tout $x > 0$", "$\\ln x \\le x$ seulement pour $x \\ge 1$", "$\\ln x \\ge 0$ pour tout $x > 0$"], "ln est concave et $y = x - 1$ est sa tangente en 1"],
  ["racine carrée", "$\\sqrt{x} \\le \\dfrac{x + 1}{2}$ pour tout $x \\ge 0$", ["$\\sqrt{x} \\ge \\dfrac{x + 1}{2}$ pour tout $x \\ge 0$", "$\\sqrt{x} \\le x$ pour tout $x \\ge 0$", "$\\sqrt{x} \\ge x + 1$ pour tout $x \\ge 0$"], "la racine carrée est concave et $y = \\dfrac{x + 1}{2}$ est sa tangente en 1"],
  ["inverse", "$\\dfrac{1}{x} \\ge 2 - x$ pour tout $x > 0$", ["$\\dfrac{1}{x} \\le 2 - x$ pour tout $x > 0$", "$\\dfrac{1}{x} \\ge x$ pour tout $x > 0$", "$\\dfrac{1}{x} \\le 1$ pour tout $x > 0$"], "la fonction inverse est convexe sur $]0\\,;+\\infty[$ et $y = 2 - x$ est sa tangente en 1"],
  ["$x \\mapsto e^{-x}$", "$e^{-x} \\ge 1 - x$ pour tout réel $x$", ["$e^{-x} \\le 1 - x$ pour tout réel $x$", "$e^{-x} \\ge 1$ pour tout réel $x$", "$e^{-x} \\le x$ pour tout réel $x$"], "$x \\mapsto e^{-x}$ est convexe et $y = 1 - x$ est sa tangente en 0"],
  ["carré", "$x^2 \\ge 2x - 1$ pour tout réel $x$", ["$x^2 \\le 2x - 1$ pour tout réel $x$", "$x^2 \\ge x$ pour tout réel $x$", "$x^2 \\le 2x$ pour tout réel $x$"], "la fonction carré est convexe et $y = 2x - 1$ est sa tangente en 1"],
  ["exponentielle, avec sa tangente en 1,", "$e^x \\ge ex$ pour tout réel $x$", ["$e^x \\le ex$ pour tout réel $x$", "$e^x \\ge e$ pour tout réel $x$", "$e^x \\le x + e$ pour tout réel $x$"], "exp est convexe et $y = ex$ est sa tangente en 1"],
];

function genInegalite() {
  const [nom, bon, pieges, raison] = randomChoice(INEGALITES);
  return qcm(
    randomChoice([
      `Quelle inégalité découle de la convexité (ou de la concavité) de la fonction ${nom} ?`,
      `Grâce à la position de la courbe de la fonction ${nom} par rapport à une de ses tangentes, on obtient :`,
      `Une ingénieure veut encadrer la fonction ${nom} par une droite. Quelle inégalité est juste ?`,
    ]),
    bon,
    pieges,
    expl("convexe : courbe au-dessus de ses tangentes ; concave : au-dessous.", "on écrit la tangente en un point simple, puis on compare.", `${raison}.`, `${bon}.`)
  );
}

function genTangenteGraphe() {
  const s = randomChoice([1, -1]);
  const a = randomChoice([0.5, 1]) * s;
  const h = randomInt(-1, 1);
  const k = s > 0 ? randomInt(-2, 0) : randomInt(0, 2);
  const x0 = h + randomChoice([-2, -1, 1, 2]);
  const y0 = a * (x0 - h) ** 2 + k;
  const pente = 2 * a * (x0 - h);
  const bon = s > 0 ? "au-dessus de la tangente" : "au-dessous de la tangente";
  const canvas = {
    kind: "fonctionGraphique",
    size: { width: 320, height: 250 },
    xmin: -4,
    xmax: 4,
    ymin: -5,
    ymax: 5,
    grille: true,
    courbes: [
      { id: "f", type: "quadratique", a, b: -2 * a * h, c: a * h * h + k, couleur: "#2563eb" },
      { id: "t", type: "affine", a: pente, b: y0 - pente * x0, couleur: "#16a34a" },
    ],
    misesEnEvidence: [{ point: { x: x0, y: y0, label: "A", couleur: "#dc2626" } }],
  } as CanvasFigure;
  return qcm(
    randomChoice([
      "On a tracé la courbe de $f$ (en bleu) et sa tangente en A (en vert). Sur l’intervalle affiché, la courbe est :",
      "Où se situe la courbe de $f$ par rapport à sa tangente en A ?",
      "Une économiste approche la courbe bleue par sa tangente en A (en vert). La courbe est :",
      "Le point A est sur la courbe de $f$ ; la droite verte est la tangente en A. Que peut-on dire de la position de la courbe ?",
      "Un skateur roule sur la rampe bleue ; la droite verte touche la rampe en A. La rampe est :",
      "Regarde la courbe bleue et la droite verte, tangente en A. Sur tout l’intervalle affiché, la courbe est :",
    ]),
    bon,
    [s > 0 ? "au-dessous de la tangente" : "au-dessus de la tangente", "au-dessus à gauche de A, au-dessous à droite", "confondue avec la tangente"],
    expl("convexe : courbe au-dessus de ses tangentes ; concave : au-dessous.", "on lit la forme de la courbe.", `la courbe est ${s > 0 ? "en creux : $f$ est convexe" : "en bosse : $f$ est concave"}.`, `la courbe est ${bon}.`),
    canvas
  );
}

const METIERS_APPROX = [
  "Une ingénieure en aéronautique",
  "Un météorologue",
  "Une économiste",
  "Un pharmacien",
  "Une physicienne",
  "Un architecte",
  "Une data scientist",
  "Un technicien en énergie solaire",
];

function genApproximation() {
  const [nom, I, nat] = randomChoice(REFERENCES);
  const qui = randomChoice(METIERS_APPROX);
  const bon = nat === "convexe" ? "par défaut (la tangente est en dessous de la courbe)" : "par excès (la tangente est au-dessus de la courbe)";
  return qcm(
    `${qui} remplace ${nom} par sa tangente en un point de ${I}, pour faire un calcul rapide. Sur ${I}, cette approximation est :`,
    bon,
    [nat === "convexe" ? "par excès (la tangente est au-dessus de la courbe)" : "par défaut (la tangente est en dessous de la courbe)", "exacte", "par excès à gauche du point, par défaut à droite"],
    expl("convexe : la tangente est sous la courbe ; concave : au-dessus.", "on détermine la convexité, puis la position de la tangente.", `${nom} est ${nat} sur ${I}.`, `l’approximation est ${bon.split(" (")[0]}.`)
  );
}

function genEcartTangente() {
  const a = randomChoice([1, 2, 3, -1, -2]);
  const b = randomInt(-4, 4);
  const c = randomInt(-5, 5);
  const x0 = randomInt(-2, 2);
  const x1 = x0 + randomChoice([-3, -2, -1, 1, 2, 3]);
  const f = poly([[a, 2], [b, 1], [c, 0]]);
  const ecart = a * (x1 - x0) ** 2;
  const t = randomInt(1, 2);
  const ex = expl(
    "la tangente en $x_0$ est $T(x) = f(x_0) + f'(x_0)(x - x_0)$.",
    "pour un polynôme du second degré, $f(x) - T(x) = a(x - x_0)^2$.",
    `$f(${x1}) - T(${x1}) = ${n(a)} \\times (${x1} - (${x0}))^2 = ${n(ecart)}$.`,
    `l’écart vaut ${n(ecart)} : la courbe est ${a > 0 ? "au-dessus" : "au-dessous"} de sa tangente (f est ${a > 0 ? "convexe" : "concave"}).`
  );
  if (t === 2)
    return qcm(
      `Soit $f(x) = ${f}$ et $T$ sa tangente au point d’abscisse ${x0}. Pour tout $x$, la courbe de $f$ est :`,
      a > 0 ? "au-dessus de T" : "au-dessous de T",
      [a > 0 ? "au-dessous de T" : "au-dessus de T", "au-dessus de T seulement pour x > " + x0, "confondue avec T"],
      ex
    );
  return court(`Soit $f(x) = ${f}$ et $T$ sa tangente au point d’abscisse ${x0}. Calcule $f(${x1}) - T(${x1})$.`, ecart, ex);
}

const MINORANTS: Array<[string, string, (h: number) => [string, number], "min" | "maj"]> = [
  ["l’exponentielle est convexe", "sa tangente en 0 est $y = x + 1$", (h) => [`e^{${n(h)}}`, 1 + h], "min"],
  ["l’exponentielle est convexe", "sa tangente en 0 est $y = x + 1$", (h) => [`e^{-${n(h)}}`, 1 - h], "min"],
  ["le logarithme népérien est concave", "sa tangente en 1 est $y = x - 1$", (h) => [`\\ln(${n(1 + h)})`, h], "maj"],
  ["la racine carrée est concave", "sa tangente en 1 est $y = \\dfrac{x + 1}{2}$", (h) => [`\\sqrt{${n(1 + h)}}`, (2 + h) / 2], "maj"],
  ["la fonction inverse est convexe sur $]0\\,;+\\infty[$", "sa tangente en 1 est $y = 2 - x$", (h) => [`\\dfrac{1}{${n(1 + h)}}`, 1 - h], "min"],
  ["la fonction carré est convexe", "sa tangente en 1 est $y = 2x - 1$", (h) => [`${n(1 + h)}^2`, 1 + 2 * h], "min"],
];

function genMinorant() {
  const [prop, tan, val, sens] = randomChoice(MINORANTS);
  const h = randomChoice([0.01, 0.02, 0.03, 0.05, 0.1, 0.2]);
  const [expr, v] = val(h);
  const mot = sens === "min" ? "minorant" : "majorant";
  const signe = sens === "min" ? "\\ge" : "\\le";
  return court(
    randomChoice([
      `On sait que ${prop} et que ${tan}. Quel ${mot} de $${expr}$ obtient-on ainsi ?`,
      `Sans calculatrice : ${prop}, et ${tan}. Donne le ${mot} de $${expr}$ fourni par cette tangente.`,
      `Une ingénieure estime $${expr}$ grâce à une tangente : ${prop} et ${tan}. Quelle valeur obtient-elle (un ${mot}) ?`,
    ]),
    v,
    expl(sens === "min" ? "une courbe convexe est au-dessus de ses tangentes." : "une courbe concave est au-dessous de ses tangentes.", "on remplace $x$ par la valeur dans l’équation de la tangente.", `$${expr} ${signe} ${n(v)}$.`, `le ${mot} vaut ${n(v)}.`)
  );
}

/* =========================================================
   CONVEXITE_DEFI — exercices type bac en situation
========================================================= */

function genMedicament() {
  const k = randomChoice([0.5, 1, 2, 0.25]);
  const a = randomChoice([4, 5, 8, 10]);
  const ti = 2 / k;
  const ek = k === 1 ? "-t" : `-${n(k)}t`;
  const qui = randomChoice(["une infirmière", "un pharmacologue", "une médecin du sport", "un vétérinaire"]);
  const ex = expl(
    "la concentration baisse le plus vite là où $C'$ est minimale, c’est-à-dire au point d’inflexion.",
    "on étudie le signe de $C''$.",
    `$C''(t) = ${n(a * k)}e^{${ek}}(${n(k)}t - 2)$ s’annule en changeant de signe en $t = ${n(ti)}$.`,
    `point d’inflexion à $t = ${n(ti)}$ h ; $C$ est concave sur $[0\\,;${n(ti)}]$ et convexe sur $[${n(ti)}\\,;+\\infty[$.`
  );
  const t = randomInt(1, 2);
  if (t === 1)
    return court(`Pour suivre un traitement, ${qui} modélise la concentration d’un médicament dans le sang par $C(t) = ${a}te^{${ek}}$ ($t$ en heures). On admet que $C''(t) = ${n(a * k)}e^{${ek}}(${n(k)}t - 2)$. À quel instant la concentration diminue-t-elle le plus vite ?`, ti, ex);
  return qcm(
    `${qui[0].toUpperCase() + qui.slice(1)} modélise la concentration d’un médicament par $C(t) = ${a}te^{${ek}}$ ($t \\ge 0$ en heures), avec $C''(t) = ${n(a * k)}e^{${ek}}(${n(k)}t - 2)$. Sur quel intervalle $C$ est-elle convexe ?`,
    droite(ti),
    [ferme(0, ti), "$[0\\,;+\\infty[$", droite(ti / 2)],
    ex
  );
}

const PRODUCTIONS = [
  ["une fabrique de vélos électriques", "centaines de vélos"],
  ["une brasserie artisanale de jus de fruits", "milliers de litres"],
  ["un atelier d’impression 3D", "centaines de pièces"],
  ["une usine de panneaux solaires", "milliers de panneaux"],
  ["une boulangerie industrielle", "milliers de baguettes"],
  ["une entreprise de textile", "centaines de tee-shirts"],
];

function genCoutMarginal() {
  const [ent, unite] = randomChoice(PRODUCTIONS);
  const k = randomInt(2, 6);
  const c = randomInt(3 * k * k + 1, 3 * k * k + 20);
  const d = randomInt(5, 40);
  const C = poly([[1, 3], [-3 * k, 2], [c, 1], [d, 0]]).replace(/x/g, "q");
  const ex = expl(
    "le coût marginal est $C'(q)$ ; il augmente là où $C'' \\ge 0$, c’est-à-dire là où $C$ est convexe.",
    "on calcule $C''$ et on étudie son signe.",
    `$C'(q) = 3q^2 - ${6 * k}q + ${c}$, $C''(q) = 6q - ${6 * k}$, positive pour $q \\ge ${k}$.`,
    `le coût marginal est minimal en $q = ${k}$ (point d’inflexion), puis augmente.`
  );
  if (randomInt(1, 2) === 1)
    return court(
      randomChoice([
        `Le coût total ${de(ent)} est $C(q) = ${C}$ (en milliers d’euros, $q$ en ${unite}). À partir de quelle quantité $q$ le coût marginal $C'(q)$ se met-il à augmenter ?`,
        `Pour ${ent}, le coût total vaut $C(q) = ${C}$ ($q$ en ${unite}). Pour quelle quantité le coût marginal est-il le plus bas ?`,
        `La gestionnaire ${de(ent)} modélise le coût total par $C(q) = ${C}$ ($q$ en ${unite}). Quelle est l’abscisse du point d’inflexion de la courbe de $C$ ?`,
      ]),
      k,
      ex
    );
  return qcm(`Le coût total ${de(ent)} est $C(q) = ${C}$ ($q$ en ${unite}). Sur quel intervalle la fonction $C$ est-elle convexe ?`, droite(k), [ferme(0, k), "$[0\\,;+\\infty[$", droite(2 * k)], ex);
}

function genSolutionsTangente() {
  const t = randomInt(1, 2);
  if (t === 1) {
    const m = randomChoice([-1, 0, 0.5, 1, 1, 2, 3]);
    const nb = m > 1 ? 2 : m === 1 ? 1 : 0;
    const membre = xPlus(m);
    return court(
      `Combien l’équation $e^x = ${membre}$ a-t-elle de solutions réelles ? (Indice : $y = x + 1$ est la tangente à la courbe de l’exponentielle en 0.)`,
      nb,
      expl("exp est convexe : sa courbe est au-dessus de sa tangente $y = x + 1$, et ne la touche qu’en 0.", "on compare la droite $y = x + m$ à la tangente $y = x + 1$ (droites parallèles).", m > 1 ? "la droite est au-dessus de la tangente : elle coupe la courbe deux fois" : m === 1 ? "la droite EST la tangente : un seul point commun" : "la droite est sous la tangente, donc sous la courbe : aucun point commun", `${nb} solution${nb > 1 ? "s" : ""}.`)
    );
  }
  const m = randomChoice([-3, -2, -1, -1, 0, 1]);
  const nb = m < -1 ? 2 : m === -1 ? 1 : 0;
  const membre = xPlus(m);
  return court(
    `Combien l’équation $\\ln x = ${membre}$ a-t-elle de solutions sur $]0\\,;+\\infty[$ ? (Indice : $y = x - 1$ est la tangente à la courbe de $\\ln$ en 1.)`,
    nb,
    expl("ln est concave : sa courbe est au-dessous de sa tangente $y = x - 1$, et ne la touche qu’en 1.", "on compare la droite $y = x + m$ à la tangente $y = x - 1$ (droites parallèles).", m < -1 ? "la droite est sous la tangente : elle coupe la courbe deux fois" : m === -1 ? "la droite EST la tangente : un seul point commun" : "la droite est au-dessus de la tangente, donc au-dessus de la courbe : aucun point commun", `${nb} solution${nb > 1 ? "s" : ""}.`)
  );
}

function genQuartique() {
  const k = randomInt(1, 3);
  const c = randomInt(-5, 5);
  const f = poly([[1, 4], [-6 * k * k, 2], [c, 0]]);
  const demande = randomChoice<Nature>(["convexe", "concave"]);
  const bon = demande === "concave" ? ferme(-k, k) : `$]-\\infty\\,;${-k}]$ et $[${k}\\,;+\\infty[$`;
  return qcm(
    randomChoice([`Soit $f(x) = ${f}$. Sur quel(s) intervalle(s) $f$ est-elle ${demande} ?`, `Un ingénieur modélise le profil d’une piste de skate par $f(x) = ${f}$. Où ce profil est-il ${demande} ?`]),
    bon,
    [demande === "concave" ? `$]-\\infty\\,;${-k}]$ et $[${k}\\,;+\\infty[$` : ferme(-k, k), ferme(0, k), R],
    expl("$f$ convexe là où $f'' \\ge 0$, concave là où $f'' \\le 0$.", "on calcule $f''$ et on étudie son signe (trinôme).", `$f''(x) = 12x^2 - ${12 * k * k} = 12(x - ${k})(x + ${k})$, négatif entre les racines.`, `$f$ est ${demande} sur ${bon}.`)
  );
}

function genExpAffine() {
  const m = randomInt(-3, 3);
  const demande = randomChoice<Nature>(["convexe", "concave"]);
  const k = -m - 2;
  const bon = demande === "convexe" ? droite(k) : gauche(k);
  return qcm(
    `Soit $f(x) = (${xPlus(m)})e^x$. Après avoir calculé $f''$, sur quel intervalle $f$ est-elle ${demande} ?`,
    bon,
    [demande === "convexe" ? gauche(k) : droite(k), demande === "convexe" ? droite(-m - 1) : gauche(-m - 1), R],
    expl("$f$ convexe là où $f'' \\ge 0$.", "$(uv)' = u'v + uv'$ deux fois, puis signe (avec $e^x > 0$).", `$f'(x) = (${xPlus(m + 1)})e^x$, $f''(x) = (${xPlus(m + 2)})e^x$, positive pour $x \\ge ${n(k)}$.`, `$f$ est ${demande} sur ${bon}.`)
  );
}

/* ---------- Gabarits et fusion ---------- */

function tpl(microId: string, difficulty: number, rang: number, generate: () => TutorGeneratedQuestionV4, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `terminale_spe_convexite_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["terminale-spe", "convexite", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_FORME = "Convexe = « en creux » ; concave = « en bosse ».";
const H_CARAC = "Convexe ⟺ f' croissante ⟺ f'' ≥ 0 ⟺ courbe au-dessus de ses tangentes.";
const H_D2 = "f'' est la dérivée de f' : on dérive deux fois.";
const H_SIGNE = "f est convexe là où f'' ≥ 0, concave là où f'' ≤ 0.";
const H_INFL = "Point d’inflexion : f'' s’annule EN CHANGEANT DE SIGNE.";
const H_TAN = "Convexe : courbe au-dessus de ses tangentes ; concave : au-dessous.";

type Ligne = [string, number, () => TutorGeneratedQuestionV4, string];

const LIGNES: Ligne[] = [
  ["convexite_reconnaitre", 1, genForme, H_FORME],
  ["convexite_reconnaitre", 1, genGrapheNature, H_FORME],
  ["convexite_reconnaitre", 2, genPropriete, H_CARAC],
  ["convexite_reconnaitre", 2, genReference, H_CARAC],
  ["convexite_reconnaitre", 2, genForme, H_FORME],
  ["convexite_reconnaitre", 3, genDeriveeDonnee, H_CARAC],
  ["convexite_reconnaitre", 3, genGrapheDerivee, "Sur la courbe de f', on lit si elle MONTE ou DESCEND."],
  ["convexite_reconnaitre", 3, genPropriete, H_CARAC],
  ["convexite_reconnaitre", 4, genIntervalleGraphe, H_FORME],
  ["convexite_reconnaitre", 4, genGrapheSeconde, H_SIGNE],
  ["convexite_reconnaitre", 4, genTableauDerivee, H_CARAC],
  ["convexite_reconnaitre", 4, genDeriveeDonnee, H_CARAC],

  ["convexite_derivee_seconde", 2, genD2Poly, H_D2],
  ["convexite_derivee_seconde", 2, genD2Valeur, H_D2],
  ["convexite_derivee_seconde", 3, genSigneSeconde, H_SIGNE],
  ["convexite_derivee_seconde", 3, genD2Valeur, H_D2],
  ["convexite_derivee_seconde", 3, genGrapheSeconde, H_SIGNE],
  ["convexite_derivee_seconde", 4, genD2ExpLn, H_D2],
  ["convexite_derivee_seconde", 4, genSigneSeconde, H_SIGNE],
  ["convexite_derivee_seconde", 4, genExpAffine, H_SIGNE],

  ["convexite_point_inflexion", 2, genAffirmationInflexion, H_INFL],
  ["convexite_point_inflexion", 2, genLireInflexion, H_INFL],
  ["convexite_point_inflexion", 2, genInflexionDepuisSeconde, H_INFL],
  ["convexite_point_inflexion", 3, genInflexionDepuisSeconde, H_INFL],
  ["convexite_point_inflexion", 3, genLireInflexion, H_INFL],
  ["convexite_point_inflexion", 3, genAffirmationInflexion, H_INFL],
  ["convexite_point_inflexion", 4, genInflexionDepuisF, H_INFL],
  ["convexite_point_inflexion", 4, genNombreInflexions, H_INFL],
  ["convexite_point_inflexion", 4, genInflexionDepuisSeconde, H_INFL],
  ["convexite_point_inflexion", 5, genInflexionContexte, H_INFL],
  ["convexite_point_inflexion", 5, genNombreInflexions, H_INFL],
  ["convexite_point_inflexion", 5, genInflexionDepuisF, H_INFL],

  ["convexite_tangente", 2, genTangenteConcept, H_TAN],
  ["convexite_tangente", 2, genTangenteGraphe, H_TAN],
  ["convexite_tangente", 2, genApproximation, H_TAN],
  ["convexite_tangente", 3, genInegalite, H_TAN],
  ["convexite_tangente", 3, genTangenteGraphe, H_TAN],
  ["convexite_tangente", 3, genApproximation, H_TAN],
  ["convexite_tangente", 4, genEcartTangente, "f(x) − T(x) = a(x − x₀)² pour un trinôme."],
  ["convexite_tangente", 4, genApproximation, H_TAN],
  ["convexite_tangente", 4, genInegalite, H_TAN],
  ["convexite_tangente", 5, genMinorant, H_TAN],
  ["convexite_tangente", 5, genEcartTangente, H_TAN],
  ["convexite_tangente", 5, genSolutionsTangente, H_TAN],
  ["convexite_tangente", 5, genInegalite, H_TAN],

  ["convexite_defi", 4, genCoutMarginal, H_SIGNE],
  ["convexite_defi", 4, genQuartique, H_SIGNE],
  ["convexite_defi", 4, genExpAffine, H_SIGNE],
  ["convexite_defi", 4, genInflexionContexte, H_INFL],
  ["convexite_defi", 5, genMedicament, H_INFL],
  ["convexite_defi", 5, genSolutionsTangente, H_TAN],
  ["convexite_defi", 5, genCoutMarginal, H_SIGNE],
  ["convexite_defi", 5, genQuartique, H_SIGNE],
  ["convexite_defi", 5, genInflexionContexte, H_INFL],
  ["convexite_defi", 4, genSolutionsTangente, H_TAN],
];

export const renfortConvexite: TutorBankItemV4[] = (() => {
  const rangs = new Map<string, number>();
  return LIGNES.map(([micro, d, g, h]) => {
    const cle = `${micro}_${d}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    return tpl(micro, d, r, g, h);
  });
})();
