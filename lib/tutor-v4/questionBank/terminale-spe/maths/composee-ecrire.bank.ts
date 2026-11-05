// COMPOSÉE g ∘ f : l'écrire, la calculer, la décomposer (05/11/2026). Au programme français de Terminale
// spé (« Composée de deux fonctions, notation v ∘ u ») : NON masquée. Elle prépare `derivation_composee`.
// Lignes visées : Maroc 1re bac AA-4b, Belgique S6 3.1.1d, Sénégal 2nde AN 3, Côte d'Ivoire 1re C1-L3.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, court, entre, expl, fabrique, fr, melange, phrase, qcm, somme, un } from "../../lycee-commun";

const tpl = fabrique("terminale-spe", "derivation_fonction", "tle_");
const M = "composee_ecrire";

const DEF = "$(g \\circ f)(x) = g(f(x))$ : on applique d'abord $f$, puis $g$ au résultat. En général, $g \\circ f$ et $f \\circ g$ sont différentes.";

const NOMS = [["f", "g"], ["u", "v"], ["p", "q"], ["h", "k"], ["r", "s"]] as const;
const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
const aff = (m: number, p: number) => somme([T(m, 1, "x"), T(p, 1)]);
/** Une fonction simple : son écriture en x, et comment y remplacer x par une autre écriture. */
type Fn = { s: string; de: (u: string) => string; val: (x: number) => number };
function affine(): Fn {
  const m = nz(-5, 5);
  const p = nz(-8, 8);
  const coef = m === 1 ? "" : m === -1 ? "-" : String(m);
  return {
    s: aff(m, p),
    de: (u) => `${m === 1 ? u : u.includes(" ") ? `${coef}(${u})` : `${coef}${u}`} ${p < 0 ? "-" : "+"} ${Math.abs(p)}`,
    val: (x) => m * x + p,
  };
}
function carre(): Fn {
  const c = entre(-6, 6);
  const fin = c === 0 ? "" : ` ${c < 0 ? "-" : "+"} ${Math.abs(c)}`;
  return { s: `x^{2}${fin}`, de: (u) => `(${u})^{2}${fin}`, val: (x) => x * x + c };
}
const simple = () => (Math.random() < 0.6 ? affine() : carre());
/** Deux fonctions qui ne commutent pas : l'ordre compte vraiment. */
function deux(): [Fn, Fn] {
  for (;;) {
    const [F, G] = [simple(), simple()];
    if (![1, 2].every((x) => G.val(F.val(x)) === F.val(G.val(x)))) return [F, G];
  }
}
const O = (a: string, b: string) => `${a} \\circ ${b}`;
const DONNE = (f: string, g: string, sf: string, sg: string) => [
  `Soit $${f}(x) = ${sf}$ et $${g}(x) = ${sg}$.`,
  `On donne $${f}(x) = ${sf}$ et $${g}(x) = ${sg}$.`,
  `Les fonctions $${f}$ et $${g}$ sont définies par $${f}(x) = ${sf}$ et $${g}(x) = ${sg}$.`,
  `On considère $${f}(x) = ${sf}$ et $${g}(x) = ${sg}$.`,
];

/* Décompositions : l'expression, la fonction intérieure, l'extérieure, écrites toutes deux en x. */
function aDecomposer() {
  const m = nz(-5, 5);
  const p = nz(-8, 8);
  const n = un([2, 3, 4]);
  const inter = aff(m, p);
  const carreP = `x^{2} + ${entre(1, 9)}`;
  return un([
    { h: `(${inter})^{${n}}`, u: inter, v: `x^{${n}}`, fauxU: `x^{${n}}`, fauxV: inter },
    { h: `\\sqrt{${carreP}}`, u: carreP, v: `\\sqrt{x}`, fauxU: `\\sqrt{x}`, fauxV: carreP },
    { h: `\\mathrm{e}^{${inter}}`, u: inter, v: `\\mathrm{e}^{x}`, fauxU: `\\mathrm{e}^{x}`, fauxV: inter },
    { h: `\\ln(${carreP})`, u: carreP, v: `\\ln(x)`, fauxU: `\\ln(x)`, fauxV: carreP },
    { h: `\\dfrac{1}{${carreP}}`, u: carreP, v: `\\dfrac{1}{x}`, fauxU: `\\dfrac{1}{x}`, fauxV: carreP },
    { h: `\\cos(${inter})`, u: inter, v: `\\cos(x)`, fauxU: `\\cos(x)`, fauxV: inter },
  ]);
}

/* Enchaînements concrets : deux formules affines, la première nourrit la seconde. */
const CHAINES: ((f: string, g: string, sf: string, sg: string) => string)[] = [
  (f, g, sf, sg) => `Une usine fabrique $${f}(x) = ${sf}$ pièces en $x$ heures, et ces pièces utilisent $${g}(x) = ${sg}$ kilos de matière pour $x$ pièces.`,
  (f, g, sf, sg) => `Un vélo parcourt $${f}(x) = ${sf}$ kilomètres en $x$ heures, et une cycliste brûle $${g}(x) = ${sg}$ kilocalories pour $x$ kilomètres.`,
  (f, g, sf, sg) => `Une chorale de $x$ personnes occupe $${f}(x) = ${sf}$ rangs, et $x$ rangs prennent $${g}(x) = ${sg}$ mètres de scène.`,
  (f, g, sf, sg) => `Un panneau solaire produit $${f}(x) = ${sf}$ unités d'énergie en $x$ heures, et $x$ unités alimentent $${g}(x) = ${sg}$ lampes.`,
  (f, g, sf, sg) => `Un pommier donne $${f}(x) = ${sf}$ kilos de fruits en $x$ semaines, et $x$ kilos de fruits donnent $${g}(x) = ${sg}$ bocaux.`,
  (f, g, sf, sg) => `Un bateau parcourt $${f}(x) = ${sf}$ milles en $x$ heures, et consomme $${g}(x) = ${sg}$ litres pour $x$ milles.`,
  (f, g, sf, sg) => `Une équipe de football marque $${f}(x) = ${sf}$ points en $x$ matchs, et $x$ points lui rapportent $${g}(x) = ${sg}$ places au classement.`,
  (f, g, sf, sg) => `Une imprimante sort $${f}(x) = ${sf}$ pages en $x$ minutes, et $x$ pages demandent $${g}(x) = ${sg}$ millilitres d'encre.`,
];

function tableau(f: string, g: string, xs: number[], vf: number[], vg: number[]): CanvasFigure {
  return {
    kind: "tableau_donnees",
    coin: "x",
    headers: xs.map(String),
    rows: [
      { label: `${f}(x)`, values: vf },
      { label: `${g}(x)`, values: vg },
    ],
    display: { compact: true },
  } as CanvasFigure;
}

const gabarits: TutorBankItemV4[] = [
  /* ★1 */
  tpl(M, 1, 1, "Calcule d'abord l'image par la fonction écrite à droite du rond.", () => {
    const [f, g] = un(NOMS);
    const [F, G] = deux();
    const a = entre(-4, 5);
    const interne = F.val(a);
    return court(
      phrase(DONNE(f, g, F.s, G.s), [`Calcule $(${O(g, f)})(${a})$.`, `Que vaut $(${O(g, f)})(${a})$ ?`, `Donne $(${O(g, f)})(${a})$.`, `Quelle est l'image de $${a}$ par $${O(g, f)}$ ?`, `Trouve $${g}(${f}(${a}))$.`]),
      G.val(interne),
      expl(DEF, `On calcule d'abord $${f}(${a}) = ${interne}$.`, `Puis $${g}(${interne}) = ${G.val(interne)}$.`, `$(${O(g, f)})(${a}) = ${G.val(interne)}$.`),
    );
  }),
  tpl(M, 2, 1, "Lis f(a) dans le tableau, puis cherche ce résultat sur la ligne de x.", () => {
    const [f, g] = un(NOMS);
    const xs = melange([0, 1, 2, 3, 4, 5, 6]).slice(0, 5).sort((p, q) => p - q);
    const vf = xs.map(() => un(xs));
    const vg = xs.map(() => entre(-9, 9));
    const i = entre(0, 4);
    const a = xs[i];
    const j = vg[xs.indexOf(vf[i])];
    return court(
      phrase([`Le tableau donne des valeurs de $${f}$ et de $${g}$.`, `On lit dans le tableau les valeurs de $${f}$ et de $${g}$.`, `Voici un tableau de valeurs de deux fonctions $${f}$ et $${g}$.`, `Ce tableau donne quelques valeurs de $${f}$ et de $${g}$.`], [`Que vaut $(${O(g, f)})(${a})$ ?`, `Lis $(${O(g, f)})(${a})$.`, `Donne $${g}(${f}(${a}))$.`, `Quelle est l'image de $${a}$ par $${O(g, f)}$ ?`, `Trouve $(${O(g, f)})(${a})$.`]),
      j,
      expl(DEF, `On lit $${f}(${a}) = ${vf[i]}$.`, `Puis $${g}(${vf[i]}) = ${j}$.`, `$(${O(g, f)})(${a}) = ${j}$.`),
      tableau(f, g, xs, vf, vg),
    );
  }),
  tpl(M, 3, 1, "La fonction écrite à droite du rond s'applique en premier.", () => {
    const [f, g] = un(NOMS);
    const l = un(["x", "t", "a", "y"]);
    const inverse = Math.random() < 0.5;
    const [A, B] = inverse ? [f, g] : [g, f];
    const m = `(${O(A, B)})(${l})`;
    return qcm(
      phrase([`À quoi est égal $${m}$ ?`, `Comment se lit $${m}$ ?`, `Quelle écriture vaut $${m}$ ?`, `Que signifie la notation $${m}$ ?`, `Par définition, que vaut $${m}$ ?`, `Laquelle de ces écritures est $${m}$ ?`], ["", "Choisis la bonne écriture.", "Une seule écriture convient."]),
      `$${A}(${B}(${l}))$`,
      [`$${B}(${A}(${l}))$`, `$${A}(${l}) \\times ${B}(${l})$`, `$${A}(${l}) + ${B}(${l})$`, `$${A}(${l}) \\circ ${B}$`],
      expl(DEF, `On applique d'abord $${B}$, celle qui touche la variable.`, `Puis $${A}$ s'applique au résultat.`, `$${m} = ${A}(${B}(${l}))$.`),
    );
  }),
  /* ★2 */
  tpl(M, 4, 2, "Remplace chaque x de g par l'expression de f.", () => {
    const [f, g] = un(NOMS);
    const F = affine();
    let G = simple();
    // Deux fonctions affines peuvent commuter : la question sur l'ordre n'aurait plus de bonne réponse unique.
    while ([1, 2].every((x) => G.val(F.val(x)) === F.val(G.val(x)))) G = simple();
    const j = `$${G.de(F.s)}$`;
    return qcm(
      phrase(DONNE(f, g, F.s, G.s), [`Que vaut $(${O(g, f)})(x)$ ?`, `Écris $(${O(g, f)})(x)$.`, `Quelle est l'expression de $${g}(${f}(x))$ ?`, `Exprime $(${O(g, f)})(x)$ en fonction de $x$.`, `Quelle écriture est celle de $${O(g, f)}$ ?`]),
      j,
      [`$${F.de(G.s)}$`, `$(${F.s})(${G.s})$`, `$(${F.s}) + (${G.s})$`, `$${G.de(F.s)} + 1$`, `$${G.s}$`],
      expl(DEF, `Dans $${g}(x) = ${G.s}$, on remplace $x$ par $${f}(x)$.`, `On obtient ${j}.`, `$(${O(g, f)})(x)$ s'écrit ${j}.`),
    );
  }),
  tpl(M, 5, 2, "Ici c'est f qui reçoit g : respecte l'ordre.", () => {
    const [f, g] = un(NOMS);
    const F = affine();
    const G = carre();
    const j = `$${F.de(G.s)}$`;
    return qcm(
      phrase(DONNE(f, g, F.s, G.s), [`Que vaut $(${O(f, g)})(x)$ ?`, `Écris $(${O(f, g)})(x)$.`, `Quelle est l'expression de $${f}(${g}(x))$ ?`, `Attention à l'ordre : que vaut $(${O(f, g)})(x)$ ?`, `Exprime $(${O(f, g)})(x)$ en fonction de $x$.`]),
      j,
      [`$${G.de(F.s)}$`, `$(${F.s})(${G.s})$`, `$(${F.s}) + (${G.s})$`, `$${F.de(G.s)} + 2$`, `$${F.s}$`],
      expl(DEF, `Dans $${f}(x) = ${F.s}$, on remplace $x$ par $${g}(x)$.`, `On obtient ${j}.`, `$(${O(f, g)})(x)$ s'écrit ${j}.`),
    );
  }),
  tpl(M, 6, 2, "Cherche ce qu'on calcule en premier : c'est la fonction intérieure.", () => {
    const [u, v] = un(NOMS);
    const d = aDecomposer();
    const paire = (a: string, b: string) => `$${u}(x) = ${a}$ et $${v}(x) = ${b}$`;
    return qcm(
      `${un([`On veut écrire $h(x) = ${d.h}$ sous la forme $h = ${O(v, u)}$.`, `La fonction $h(x) = ${d.h}$ s'écrit $h = ${O(v, u)}$.`, `Décompose $h(x) = ${d.h}$ en $h = ${O(v, u)}$.`, `Pour dériver $h(x) = ${d.h}$, on l'écrit $h = ${O(v, u)}$.`])} ${un(["Quel choix convient ?", `Que prendre pour $${u}$ et $${v}$ ?`, "Quelle décomposition est juste ?", "Laquelle de ces décompositions est la bonne ?"])}`,
      paire(d.u, d.v),
      [paire(d.fauxU, d.fauxV), paire(d.u, d.u), paire(d.v, d.v), paire(`x`, d.u)],
      expl(DEF, "On regarde ce qui se calcule en premier à partir de $x$.", `C'est $${d.u}$ ; la dernière opération donne la fonction extérieure.`, `${paire(d.u, d.v)}.`),
    );
  }),
  tpl(M, 7, 2, "Applique la fonction deux fois : f(f(a)).", () => {
    const [f] = un(NOMS);
    const F = simple();
    const a = entre(-3, 4);
    const inter = F.val(a);
    const v = F.val(inter);
    return court(
      phrase([`Soit $${f}(x) = ${F.s}$.`, `On donne $${f}(x) = ${F.s}$.`, `La fonction $${f}$ est définie par $${f}(x) = ${F.s}$.`, `On considère $${f}(x) = ${F.s}$.`], [`Calcule $(${O(f, f)})(${a})$.`, `Que vaut $${f}(${f}(${a}))$ ?`, `Donne $(${O(f, f)})(${a})$.`, `Applique $${f}$ deux fois à partir de $${a}$ : que trouves-tu pour $(${O(f, f)})(${a})$ ?`]),
      v,
      expl(DEF, `$${f}(${a}) = ${inter}$.`, `$${f}(${inter}) = ${v}$.`, `$(${O(f, f)})(${a}) = ${v}$.`),
    );
  }),
  /* ★3 */
  tpl(M, 8, 3, "Calcule les deux composées séparément, puis compare.", () => {
    const [f, g] = un(NOMS);
    const [F, G] = deux();
    const a = entre(-4, 5);
    const un1 = G.val(F.val(a));
    const de = F.val(G.val(a));
    return court(
      phrase(DONNE(f, g, F.s, G.s), [`Calcule $(${O(g, f)})(${a}) - (${O(f, g)})(${a})$.`, `L'ordre compte-t-il ? Calcule $(${O(g, f)})(${a}) - (${O(f, g)})(${a})$.`, `Quel écart sépare les deux ordres, $(${O(g, f)})(${a}) - (${O(f, g)})(${a})$ ?`, `Une élève croit que $${O(g, f)}$ et $${O(f, g)}$ sont pareilles. Calcule $(${O(g, f)})(${a}) - (${O(f, g)})(${a})$ pour vérifier.`]),
      un1 - de,
      expl(DEF, `$(${O(g, f)})(${a}) = ${un1}$.`, `$(${O(f, g)})(${a}) = ${de}$.`, `L'écart vaut $${un1 - de}$.`),
    );
  }),
  tpl(M, 9, 3, "Le résultat de la première étape devient l'entrée de la seconde.", () => {
    const [f, g] = un([["f", "g"], ["u", "v"], ["p", "q"]] as const);
    const mf = entre(2, 30);
    const pf = entre(1, 9) * 5;
    const mg = un([0.5, 2, 3, 0.2, 1.5, 4]);
    const pg = entre(1, 20);
    const sf = `${mf}x + ${pf}`;
    const sg = `${String(mg).replace(".", "{,}")}x + ${pg}`;
    const a = entre(1, 9);
    const inter = mf * a + pf;
    const v = mg * inter + pg;
    return court(
      `${un(CHAINES)(f, g, sf, sg)} ${un([`Calcule $(${O(g, f)})(${a})$.`, `Que vaut $(${O(g, f)})(${a})$ ?`, `Pour $x = ${a}$, enchaîne les deux étapes : que vaut $${g}(${f}(${a}))$ ?`, `Donne $(${O(g, f)})(${a})$, le résultat final pour $x = ${a}$.`])}`,
      v,
      expl(DEF, `$${f}(${a}) = ${inter}$.`, `$${g}(${inter}) = ${fr(v).replace(",", "{,}")}$.`, `$(${O(g, f)})(${a}) = ${fr(v).replace(",", "{,}")}$.`),
    );
  }),
  tpl(M, 10, 3, "La composée n'existe que si l'intérieur tombe là où l'extérieure est définie.", () => {
    const [u, v] = un(NOMS);
    const a = entre(1, 9);
    const m = un([1, 2, 3, 4, 5]);
    const sens = Math.random() < 0.5;
    // x ↦ √(mx − a·m) : définie pour x ≥ a. x ↦ ln(mx − a·m) : définie pour x > a.
    const inter = aff(m, -a * m);
    const R = sens ? `\\sqrt{${inter}}` : `\\ln(${inter})`;
    const ext = sens ? `\\sqrt{x}` : `\\ln(x)`;
    const j = sens ? `$[${a}\\,;+\\infty[$` : `$]${a}\\,;+\\infty[$`;
    return qcm(
      `${un([`Soit $${u}(x) = ${inter}$ et $${v}(x) = ${ext}$.`, `On compose $${u}(x) = ${inter}$ puis $${v}(x) = ${ext}$.`, `Un logiciel de calcul enchaîne $${u}(x) = ${inter}$ puis $${v}(x) = ${ext}$.`, `Une physicienne modélise une mesure par $${u}(x) = ${inter}$, puis $${v}(x) = ${ext}$.`])} ${un([`Sur quel ensemble $${O(v, u)}$ est-elle définie, avec $(${O(v, u)})(x) = ${R}$ ?`, `Quel est l'ensemble de définition de $(${O(v, u)})(x) = ${R}$ ?`, `Pour quels $x$ peut-on calculer $(${O(v, u)})(x) = ${R}$ ?`])}`,
      j,
      [`$[${a}\\,;+\\infty[$`, `$]${a}\\,;+\\infty[$`, `$]-\\infty\\,;${a}]$`, `$]-\\infty\\,;${a}[$`, `$\\mathbb{R}$`],
      expl(DEF, `Il faut que $${u}(x)$ soit dans l'ensemble de définition de $${v}$.`, `On résout $${inter} ${sens ? "\\geqslant" : ">"} 0$.`, `L'ensemble est ${j}.`),
    );
  }),
  tpl(M, 11, 3, "Calcule g(f(x)) et f(g(x)) pour une valeur, puis repère l'égalité.", () => {
    const [f, g] = un(NOMS);
    const F = affine();
    const G = carre();
    const a = entre(-4, 5);
    const interne = G.val(a);
    const v = F.val(interne);
    return court(
      `${un([`Dans un jeu vidéo, le score passe d'abord par $${g}(x) = ${G.s}$, puis par $${f}(x) = ${F.s}$.`, `Une machine de tri applique $${g}(x) = ${G.s}$, puis $${f}(x) = ${F.s}$.`, `Un programme de musique transforme une note $x$ par $${g}(x) = ${G.s}$, puis par $${f}(x) = ${F.s}$.`, `Un capteur météo traite une mesure $x$ par $${g}(x) = ${G.s}$, puis par $${f}(x) = ${F.s}$.`, `Dans un atelier de robotique, un signal $x$ passe par $${g}(x) = ${G.s}$, puis par $${f}(x) = ${F.s}$.`])} ${un([`Pour $x = ${a}$, que vaut le résultat, c'est-à-dire $(${O(f, g)})(${a})$ ?`, `Calcule $(${O(f, g)})(${a})$.`, `Quel nombre sort pour l'entrée $${a}$ ? C'est $(${O(f, g)})(${a})$.`, `Donne $(${O(f, g)})(${a})$.`])}`,
      v,
      expl(DEF, `La première étape est $${g}$ : $${g}(${a}) = ${interne}$.`, `Puis $${f}(${interne}) = ${v}$.`, `$(${O(f, g)})(${a}) = ${v}$.`),
    );
  }),
];

/**
 * ⛔ 05/11/2026, capture à 375 px : « (q ○ » puis « p)(a) » à la ligne. KaTeX coupe après le rond,
 * sauf devant `\nobreak`. Les correcteurs relisent le texte sans lui.
 */
const sansCoupure = (t: string) => t.replace(/\(([a-z]) \\circ ([a-z])\)/g, "($1 \\circ\\nobreak $2)");

export const composeeEcrireBank: TutorBankItemV4[] = gabarits.map((g) => ({
  ...g,
  generate: () => {
    const q = g.generate();
    return { ...q, text: sansCoupure(q.text) };
  },
}));
