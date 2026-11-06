// ÉQUATIONS ET INÉQUATIONS AVEC VALEUR ABSOLUE (06/11/2026). Hors programme français au-delà de |x − a| ≤ r
// (registre `hors_france`). Lignes visées : Maroc TC I-5a, Sénégal 3e AN 2 et 2nde AN 1, Côte d'Ivoire 2nde C1-L3.
// `valeur_absolue_distance` garde |x − a| = r ; ici a ≠ ±1 ou deux valeurs absolues. Solutions tirées d'abord.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, qcm, un } from "../../lycee-commun";
import { aff, ensL, fracL, interL, nz, REELS, va, versMoins, versPlus, VIDE } from "./themes-3-pays-ecritures";

const tpl = fabrique("seconde", "valeur_absolue_equations", "2de_");
const ME = "va_equation_affine";
const MI = "va_inequation_affine";

const LETTRES = ["x", "x", "x", "t", "u"];
const eg = "\\nobreak=\\nobreak";
const pm = (n: number) => (n < 0 ? `(${n})` : String(n));
/** ax + b à solutions entières m ± k ; a ≠ 1 ; parfois écrit b + ax. */
function tirer(v: string) {
  const a = un([2, 2, 3, 3, 4, 5, -2, -3]);
  const m = nz(-6, 6);
  const k = entre(1, 5);
  const b = -a * m;
  const c = Math.abs(a) * k;
  const E = b && un([true, false, false]) ? `${b} ${a < 0 ? "-" : "+"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}${v}` : aff(a, b, v);
  return { a, b, c, m, k, E };
}
const S = (l: (string | number)[]) => `$S = ${ensL(l)}$`;

const DEF_E = "pour $c > 0$, $|A| = c$ équivaut à $A = c$ ou $A = -c$ ; si $c = 0$, $A = 0$ ; si $c < 0$, il n'y a aucune solution, car une valeur absolue n'est jamais négative.";
const DEF_E2 = "$|A| = |B|$ équivaut à $A = B$ ou $A = -B$ : deux nombres de même valeur absolue sont égaux ou opposés.";
const DEF_I = "pour $c > 0$, $|A| \\leq c$ équivaut à $-c \\leq A \\leq c$, et $|A| \\geq c$ équivaut à $A \\leq -c$ ou $A \\geq c$.";
const INTRO_E = ["On veut résoudre l'équation", "Résous l'équation", "Soit l'équation", "On considère l'équation", "On donne l'équation", "Voici l'équation"];
const INTRO_I = ["On veut résoudre l'inéquation", "Résous l'inéquation", "Soit l'inéquation", "On considère l'inéquation", "On donne l'inéquation", "Voici l'inéquation"];
const pose = (intro: string[], f: string) => `${un(intro)} :\n\n$${f}$`;

const Q_GRAND = (v: string) => un([`Quelle est sa plus grande solution ?`, `Que vaut la plus grande valeur de $${v}$ qui convient ?`, `Donne la plus grande des deux solutions.`, `Quelle est la solution la plus grande ?`, `Laquelle des deux solutions est la plus grande ?`]);
const Q_PETIT = (v: string) => un([`Quelle est sa plus petite solution ?`, `Que vaut la plus petite valeur de $${v}$ qui convient ?`, `Donne la plus petite des deux solutions.`, `Quelle est la solution la plus petite ?`, `Laquelle des deux solutions est la plus petite ?`]);
const Q_ENS = ["Quel est l'ensemble de ses solutions ?", "Quelles sont ses solutions ?", "Quel ensemble $S$ convient ?", "Quelles valeurs conviennent ?", "Quel est l'ensemble $S$ des solutions ?"];
const AUCUNE = "Aucune solution";
const UNE = "Une seule solution";
const DEUX = "Exactement deux solutions";
const INFINIE = "Une infinité de solutions";

/* ───── situations : a objets de x chacun, cible T, écart e ───── */

type Lot = { d: (a: number) => string; u: string; quoi: string; cible: string; plage: [number, number] };
const LOTS: Lot[] = [
  { d: (a) => `Une pâtissière pèse ${a} gâteaux identiques de $x$ g chacun.`, u: "g", quoi: "la masse totale", cible: "la masse visée", plage: [120, 400] },
  { d: (a) => `Un menuisier aligne ${a} planches identiques de $x$ cm chacune.`, u: "cm", quoi: "la longueur totale", cible: "la longueur prévue", plage: [40, 150] },
  { d: (a) => `Une infirmière prépare ${a} flacons identiques de $x$ mL chacun.`, u: "mL", quoi: "le volume total", cible: "le volume prescrit", plage: [20, 100] },
  { d: (a) => `Une nageuse enchaîne ${a} longueurs identiques de $x$ secondes chacune.`, u: "secondes", quoi: "le temps total", cible: "le temps visé", plage: [30, 90] },
  { d: (a) => `Un musicien joue ${a} mesures identiques de $x$ secondes chacune.`, u: "secondes", quoi: "la durée totale", cible: "la durée prévue", plage: [4, 20] },
  { d: (a) => `Un technicien branche ${a} lampes identiques de $x$ W chacune.`, u: "W", quoi: "la puissance totale", cible: "la puissance prévue", plage: [15, 80] },
  { d: (a) => `Une vigneronne remplit ${a} tonneaux identiques de $x$ L chacun.`, u: "L", quoi: "le volume total", cible: "le volume attendu", plage: [100, 300] },
  { d: (a) => `Une éleveuse répartit ${a} rations identiques de $x$ kg chacune.`, u: "kg", quoi: "la masse totale", cible: "la masse prévue", plage: [5, 30] },
  { d: (a) => `Une couturière coupe ${a} bandes identiques de $x$ cm chacune.`, u: "cm", quoi: "la longueur totale", cible: "la longueur demandée", plage: [30, 120] },
  { d: (a) => `Un géologue prélève ${a} carottes identiques de $x$ cm chacune.`, u: "cm", quoi: "la longueur totale", cible: "la longueur attendue", plage: [20, 80] },
  { d: (a) => `Sur un chantier à Saint-Denis de La Réunion, un maçon pose ${a} parpaings identiques de $x$ cm chacun.`, u: "cm", quoi: "la longueur totale", cible: "la longueur prévue", plage: [30, 60] },
];
function lot() {
  const L = un(LOTS);
  const a = un([2, 3, 4, 5, 6, 8, 10]);
  const k = entre(1, 3);
  const x0 = entre(L.plage[0], L.plage[1]);
  return { L, a, e: a * k, T: a * x0, x0, k };
}

type Mob = { d: string; v: string; u: string };
const MOBS: Mob[] = [
  { d: "Deux robots se déplacent sur un même rail. À l'instant $t$, en secondes, leurs positions par rapport à la borne zéro sont", v: "t", u: "seconde(s)" },
  { d: "Deux trains roulent sur une voie rectiligne. À l'instant $t$, en minutes, leurs positions par rapport à la gare sont", v: "t", u: "minute(s)" },
  { d: "Deux nageurs s'entraînent dans un long canal. À l'instant $t$, en minutes, leurs positions par rapport au ponton sont", v: "t", u: "minute(s)" },
  { d: "Deux drones survolent une route droite. À l'instant $t$, en secondes, leurs positions par rapport à la balise sont", v: "t", u: "seconde(s)" },
  { d: "Deux cyclistes roulent sur une piste droite. À l'instant $t$, en minutes, leurs positions par rapport au départ sont", v: "t", u: "minute(s)" },
  { d: "Deux tortues marines sont suivies le long d'une plage. Au bout de $t$ heures, leurs positions par rapport au poste de garde sont", v: "t", u: "heure(s)" },
  { d: "Deux ascenseurs desservent une tour. À l'instant $t$, en secondes, leurs altitudes par rapport au hall sont", v: "t", u: "seconde(s)" },
  { d: "Deux pistons bougent dans un moteur d'essai. À l'instant $t$, en secondes, leurs positions par rapport au point mort sont", v: "t", u: "seconde(s)" },
];
const ENTRE2 = (A: string, B: string) => `$${A}$ et $${B}$`;

/** |ax + b| = |cx + d| à deux solutions entières distinctes. */
function deuxAbs(v: string, positives = false) {
  for (;;) {
    const a = entre(1, 5) * un([1, 1, -1]);
    const c = entre(1, 5) * un([1, 1, -1]);
    if (a === c || a === -c) continue;
    const x1 = positives ? entre(1, 9) : nz(-6, 6);
    const x2 = positives ? entre(1, 9) : nz(-6, 6);
    if (x1 === x2) continue;
    const s = (a - c) * x1 + (a + c) * x2;
    if (s % 2) continue;
    const b = -s / 2;
    const d = ((a - c) * x1 - (a + c) * x2) / 2;
    if (!b || !d || Math.abs(b) > 40 || Math.abs(d) > 40) continue;
    if (!Number.isInteger(b) || !Number.isInteger(d)) continue;
    return { a, b, c, d, x1, x2, A: aff(a, b, v), B: aff(c, d, v) };
  }
}

/* ───── inéquations : écriture des intervalles ───── */

type Rel = "\\leq" | "<" | "\\geq" | ">";
function solIneq(p: number, q: number, rel: Rel) {
  if (rel === "\\leq") return interL(p, q);
  if (rel === "<") return interL(p, q, false, false);
  if (rel === "\\geq") return `${versMoins(p)}{} \\cup {}${versPlus(q)}`;
  return `${versMoins(p, false)}{} \\cup {}${versPlus(q, false)}`;
}
const inverse: Record<Rel, Rel> = { "\\leq": ">", "<": "\\geq", "\\geq": "<", ">": "\\leq" };

export const valeurAbsolueEquationsBank: TutorBankItemV4[] = [
  /* ═════════════════ va_equation_affine ═════════════════ */
  tpl(ME, 1, 1, "Sépare en deux équations : ax + b = c ou ax + b = −c.", () => {
    const v = un(LETTRES);
    const { a, b, c, m, k, E } = tirer(v);
    const grand = un([true, false]);
    return court(
      `${pose(INTRO_E, `${va(E)} ${eg} ${c}`)}\n\n${grand ? Q_GRAND(v) : Q_PETIT(v)}`,
      grand ? m + k : m - k,
      expl(DEF_E, "on résout les deux équations du premier degré.", `$${aff(a, b, v)} = ${c}$ ou $${aff(a, b, v)} = ${-c}$ : $${v} = ${m + (a > 0 ? k : -k)}$ ou $${v} = ${m - (a > 0 ? k : -k)}$.`, `la solution cherchée est $${grand ? m + k : m - k}$.`),
    );
  }),
  tpl(ME, 2, 1, "Une valeur absolue égale à c : le contenu vaut c ou −c.", () => {
    const v = un(LETTRES);
    const { a, b, c, m, k, E } = tirer(v);
    const j = S([m - k, m + k]);
    return qcm(
      `${pose(INTRO_E, `${va(E)} ${eg} ${c}`)}\n\n${un(Q_ENS)}`,
      j,
      [S([m + k]), S([m - k]), S([-(m + k), -(m - k)].sort((p, q) => p - q)), S(ordre((c - b) / a, (c + b) / a)), `$S = ${VIDE}$`, S([m - k - 1, m + k + 1])].filter((x) => x !== j),
      expl(DEF_E, "on sépare en deux équations.", `$${aff(a, b, v)} = ${c}$ ou $${aff(a, b, v)} = ${-c}$.`, `${j}.`),
    );
  }),
  tpl(ME, 3, 1, "Regarde le signe du second membre : une valeur absolue n'est jamais négative.", () => {
    const v = un(LETTRES);
    const { a, b, E } = tirer(v);
    const g = un(["neg", "neg", "nul", "pos"]);
    const c = g === "neg" ? -entre(1, 9) : g === "nul" ? 0 : entre(1, 9);
    const j = g === "neg" ? AUCUNE : g === "nul" ? UNE : DEUX;
    return qcm(
      `${pose(INTRO_E, `${va(E)} ${eg} ${c}`)}\n\n${un(["Combien a-t-elle de solutions ?", "Quel est le nombre de ses solutions ?", "Sans la résoudre, combien a-t-elle de solutions ?", "Que peut-on dire de ses solutions ?", "Combien de valeurs de $" + v + "$ conviennent ?"])}`,
      j,
      [AUCUNE, UNE, DEUX, INFINIE],
      expl(DEF_E, "on regarde le signe du second membre.", `Le second membre vaut $${c}$ ; le contenu est $${aff(a, b, v)}$.`, `${j.toLowerCase()}.`),
    );
  }),
  tpl(ME, 4, 2, "|A| = c équivaut à A = c OU A = −c.", () => {
    const v = un(LETTRES);
    const { a, b, c, E } = tirer(v);
    const eq = (s: string, d: number) => `$${s} = ${d}$`;
    const A = aff(a, b, v);
    return qcm(
      `${pose(INTRO_E, `${va(E)} ${eg} ${c}`)}\n\n${un(["À quoi équivaut-elle ?", "Quelle disjonction des cas est juste ?", "Comment la sépare-t-on en deux équations ?", "Par quelles équations la remplace-t-on ?", "Quelles sont les deux équations à résoudre ?"])}`,
      `${eq(A, c)} ou ${eq(A, -c)}`,
      [`${eq(A, c)} et ${eq(A, -c)}`, ...(b + c ? [`${eq(A, c)} ou ${eq(aff(a, -b, v), c)}`] : []), `${eq(A, c)} ou ${eq(aff(-a, b, v), c)}`, `${eq(A, c)} seulement`],
      expl(DEF_E, "on écrit les deux valeurs possibles du contenu.", `Le contenu vaut $${c}$ ou $${-c}$.`, `${eq(A, c)} ou ${eq(A, -c)}.`),
    );
  }),
  tpl(ME, 5, 2, "Isole d'abord la valeur absolue.", () => {
    const v = un(LETTRES);
    const { a, b, c, m, k, E } = tirer(v);
    const p = nz(-9, 9);
    const avant = un([true, false]);
    const coef = un([1, 1, 2, 3]);
    const G = `${coef === 1 ? "" : coef}${va(E)} ${p < 0 ? "-" : "+"} ${Math.abs(p)}`;
    const D = coef * c + p;
    const grand = un([true, false]);
    return court(
      `${pose(INTRO_E, avant ? `${G} ${eg} ${D}` : `${D} ${eg} ${G}`)}\n\n${grand ? Q_GRAND(v) : Q_PETIT(v)}`,
      grand ? m + k : m - k,
      expl(DEF_E, "on isole la valeur absolue, puis on sépare en deux équations.", `$${va(E)} = ${c}$, donc $${aff(a, b, v)} = ${c}$ ou $${aff(a, b, v)} = ${-c}$.`, `la solution cherchée est $${grand ? m + k : m - k}$.`),
    );
  }),
  tpl(ME, 6, 2, "|A| = |B| équivaut à A = B ou A = −B.", () => {
    const v = un(LETTRES);
    const { A, B, x1, x2 } = deuxAbs(v);
    const j = S(ordre(x1, x2));
    return qcm(
      `${pose(INTRO_E, `${va(A)} ${eg} ${va(B)}`)}\n\n${un(Q_ENS)}`,
      j,
      [S([x1]), S([x2]), S(ordre(-x1, -x2)), S(ordre(x1, -x2)), S(ordre(-x1, x2)), `$S = ${VIDE}$`].filter((x) => x !== j),
      expl(DEF_E2, "on résout $A = B$, puis $A = -B$.", `$${A} = ${B}$ donne $${v} = ${x1}$ ; $${A} = -(${B})$ donne $${v} = ${x2}$.`, `${j}.`),
    );
  }),
  tpl(ME, 7, 2, "Résous A = B, puis A = −B, et compare les deux solutions.", () => {
    const v = un(LETTRES);
    const { A, B, x1, x2 } = deuxAbs(v);
    const grand = un([true, false]);
    const r = grand ? Math.max(x1, x2) : Math.min(x1, x2);
    return court(`${pose(INTRO_E, `${va(A)} ${eg} ${va(B)}`)}\n\n${grand ? Q_GRAND(v) : Q_PETIT(v)}`, r, expl(DEF_E2, "on résout $A = B$, puis $A = -B$.", `On trouve $${v} = ${x1}$ et $${v} = ${x2}$.`, `la solution cherchée est $${r}$.`));
  }),
  tpl(ME, 8, 3, "Écris l'écart à la cible avec une valeur absolue, puis sépare les cas.", () => {
    const { L, a, e, T, x0, k } = lot();
    const grand = un([true, false]);
    const r = grand ? x0 + k : x0 - k;
    return court(
      `${L.d(a)} ${un([`Cette fois, ${L.quoi} s'écarte d'exactement ${e} ${L.u} de ${L.cible}, qui est de ${T} ${L.u}.`, `L'écart entre ${L.quoi} et ${L.cible}, soit ${T} ${L.u}, vaut ${e} ${L.u}.`, `Par rapport à ${L.cible}, de ${T} ${L.u}, on mesure un écart de ${e} ${L.u}, sans savoir dans quel sens.`])} ${un(grand ? ["Quelle est la plus grande valeur possible de $x$ ?", "Que vaut $x$ si le total est au-dessus de la cible ?", "Quelle est la valeur de $x$ la plus élevée possible ?"] : ["Quelle est la plus petite valeur possible de $x$ ?", "Que vaut $x$ si le total est au-dessous de la cible ?", "Quelle est la valeur de $x$ la plus basse possible ?"])}`,
      r,
      expl(DEF_E, `l'écart s'écrit $|${a}x - ${T}| = ${e}$.`, `$${a}x = ${T + e}$ ou $${a}x = ${T - e}$, soit $x = ${x0 + k}$ ou $x = ${x0 - k}$.`, `la valeur cherchée est $${r}$ ${L.u}.`),
    );
  }),
  tpl(ME, 9, 3, "Être à la même distance du point zéro, c'est avoir des positions égales ou opposées.", () => {
    const M = un(MOBS);
    const { A, B, x1, x2 } = deuxAbs(M.v, true);
    const grand = un([true, false]);
    const r = grand ? Math.max(x1, x2) : Math.min(x1, x2);
    return court(
      `${M.d} ${ENTRE2(A, B)}.\n\n${un(grand ? ["À quel instant, le plus tardif, sont-ils à la même distance de ce point ?", "Quand sont-ils pour la dernière fois à égale distance de ce point ?", "Quel est le dernier instant où leurs distances à ce point sont égales ?"] : ["À quel instant, le plus tôt, sont-ils à la même distance de ce point ?", "Quand sont-ils pour la première fois à égale distance de ce point ?", "Quel est le premier instant où leurs distances à ce point sont égales ?"])}`,
      r,
      expl(DEF_E2, `on résout $${va(A)} = ${va(B)}$.`, `On trouve $t = ${x1}$ et $t = ${x2}$.`, `l'instant cherché est $t = ${r}$.`),
    );
  }),
  tpl(ME, 10, 3, "Remplace x par sa valeur : le contenu vaut c ou −c.", () => {
    const v = un(LETTRES);
    const a = un([2, 3, 4, 5, -2, -3]);
    const x0 = nz(-5, 5);
    const c = entre(1, 9);
    const b1 = c - a * x0;
    const b2 = -c - a * x0;
    const j = S(ordre(b1, b2));
    return qcm(
      `On sait que $${v} ${eg} ${x0}$ est solution de l'équation :\n\n$${va(`${a}${v} + b`)} ${eg} ${c}$\n\n${un(["Quelles sont les valeurs possibles de $b$ ?", "Que peut valoir $b$ ?", "Quel ensemble contient toutes les valeurs de $b$ qui conviennent ?", "Pour quelles valeurs de $b$ est-ce vrai ?"])}`,
      j,
      [S([b1]), S([b2]), S(ordre(-b1, -b2)), S(ordre(b1, -b2)), S(ordre(c + a * x0, c - a * x0))].filter((x) => x !== j),
      expl(DEF_E, `on remplace $${v}$ par $${x0}$ : le contenu vaut $${c}$ ou $${-c}$.`, `$${a} \\times ${pm(x0)} + b = ${c}$ ou $${a} \\times ${pm(x0)} + b = ${-c}$.`, `${j}.`),
    );
  }),

  /* ═════════════════ va_inequation_affine ═════════════════ */
  tpl(MI, 1, 1, "|A| ≤ c se réécrit −c ≤ A ≤ c.", () => {
    const v = un(LETTRES);
    const { a, b, c, E } = tirer(v);
    const A = aff(a, b, v);
    const strict = un([true, false]);
    const s = strict ? "<" : "\\leq";
    return qcm(
      `${pose(INTRO_I, `${va(E)} ${s} ${c}`)}\n\n${un(["Quel encadrement lui est équivalent ?", "À quelle double inégalité équivaut-elle ?", "Comment l'écrire sans valeur absolue ?", "Quelle écriture sans barres lui est équivalente ?", "Par quelle double inégalité la remplace-t-on ?"])}`,
      `$${-c} ${s} ${A} ${s} ${c}$`,
      [`$0 ${s} ${A} ${s} ${c}$`, `$${A} ${s} ${c}$`, `$${A} ${s} ${-c}$ ou $${A} ${strict ? ">" : "\\geq"} ${c}$`, `$${c} ${s} ${A} ${s} ${-c}$`],
      expl(DEF_I, "le contenu reste à une distance de $0$ inférieure à la borne.", `Le contenu est $${A}$.`, `$${-c} ${s} ${A} ${s} ${c}$.`),
    );
  }),
  tpl(MI, 2, 1, "Écris l'encadrement, puis isole l'inconnue (attention si a est négatif).", () => {
    const v = un(LETTRES);
    const { c, m, k, E } = tirer(v);
    const rel = un<Rel>(["\\leq", "\\leq", "<"]);
    const J = `$${solIneq(m - k, m + k, rel)}$`;
    return qcm(
      `${pose(INTRO_I, `${va(E)} ${rel} ${c}`)}\n\n${un(["Quel est l'ensemble de ses solutions ?", "Quel intervalle contient exactement ses solutions ?", "Quelles valeurs conviennent ?", "Sous quelle forme écrit-on ses solutions ?", "Quel est l'intervalle des solutions ?"])}`,
      J,
      [`$${solIneq(m - k, m + k, inverse[rel])}$`, `$${solIneq(m - k, m + k, rel === "<" ? "\\leq" : "<")}$`, `$${solIneq(-m - k, -m + k, rel)}$`, `$${solIneq(m - c, m + c, rel)}$`, `$${solIneq(m - k - 1, m + k + 1, rel)}$`].filter((x) => x !== J),
      expl(DEF_I, "on passe à l'encadrement, puis on isole l'inconnue.", `Les bornes sont $${m - k}$ et $${m + k}$.`, `$S = ${solIneq(m - k, m + k, rel)}$.`),
    );
  }),
  tpl(MI, 3, 1, "Trouve l'intervalle des solutions, puis compte les entiers dedans.", () => {
    const v = un(LETTRES);
    const { c, m, k, E } = tirer(v);
    const q = un(["nb", "grand", "petit"]);
    const r = q === "nb" ? 2 * k + 1 : q === "grand" ? m + k : m - k;
    return court(
      `${pose(INTRO_I, `${va(E)} \\leq ${c}`)}\n\n${q === "nb" ? un(["Combien de nombres entiers sont solutions ?", "Combien d'entiers la vérifient ?", "Quel est le nombre de solutions entières ?"]) : q === "grand" ? un(["Quel est le plus grand entier solution ?", "Quelle est la plus grande solution ?", "Quelle est la borne supérieure de l'intervalle des solutions ?"]) : un(["Quel est le plus petit entier solution ?", "Quelle est la plus petite solution ?", "Quelle est la borne inférieure de l'intervalle des solutions ?"])}`,
      r,
      expl(DEF_I, "on écrit l'intervalle des solutions.", `$S = ${interL(m - k, m + k)}$.`, `la réponse est $${r}$.`),
    );
  }),
  tpl(MI, 4, 2, "|A| ≥ c : le contenu est loin de 0, on obtient deux morceaux.", () => {
    const v = un(LETTRES);
    const { c, m, k, E } = tirer(v);
    const rel = un<Rel>(["\\geq", ">", "\\geq", ">", "\\leq", "<"]);
    const J = `$${solIneq(m - k, m + k, rel)}$`;
    return qcm(
      `${pose(INTRO_I, `${va(E)} ${rel} ${c}`)}\n\n${un(["Quel est l'ensemble de ses solutions ?", "Quelles valeurs conviennent ?", "Sous quelle forme écrit-on ses solutions ?", "Quel ensemble $S$ convient ?", "Écris ses solutions avec des intervalles."])}`,
      J,
      [`$${solIneq(m - k, m + k, inverse[rel])}$`, `$${solIneq(m - k, m + k, rel === "<" ? "\\leq" : rel === "\\leq" ? "<" : rel === ">" ? "\\geq" : ">")}$`, `$${solIneq(-m - k, -m + k, rel)}$`, `$${solIneq(m - c, m + c, rel)}$`].filter((x) => x !== J),
      expl(DEF_I, "on regarde le sens de l'inégalité : petit écart, un seul intervalle ; grand écart, deux morceaux.", `Les valeurs frontières sont $${m - k}$ et $${m + k}$.`, `$S = ${solIneq(m - k, m + k, rel)}$.`),
    );
  }),
  tpl(MI, 5, 2, "Une valeur absolue est toujours positive ou nulle : regarde le second membre.", () => {
    const v = un(LETTRES);
    const { a, m, E } = tirer(v);
    const cas = un(["neg_leq", "neg_geq", "zero_leq", "zero_geq", "zero_gt", "neg_lt"]);
    const c = cas.startsWith("neg") ? -entre(1, 9) : 0;
    const rel: Rel = cas.endsWith("leq") ? "\\leq" : cas.endsWith("geq") ? "\\geq" : cas.endsWith("gt") ? ">" : "<";
    const J = cas === "neg_leq" || cas === "neg_lt" ? VIDE : cas === "neg_geq" ? REELS : cas === "zero_leq" ? ensL([m]) : cas === "zero_geq" ? REELS : `${REELS} \\setminus ${ensL([m])}`;
    return qcm(
      `${pose(INTRO_I, `${va(E)} ${rel} ${c}`)}\n\n${un(["Quel est l'ensemble de ses solutions ?", "Quelles valeurs conviennent ?", "Sans calcul long, quel est l'ensemble $S$ ?", "Que peut-on dire de ses solutions ?", "Quel ensemble $S$ convient ?"])}`,
      `$S = ${J}$`,
      [VIDE, REELS, ensL([m]), `${REELS} \\setminus ${ensL([m])}`, interL(m - 1, m + 1)].map((x) => `$S = ${x}$`),
      expl(DEF_I, "une valeur absolue n'est jamais négative, et ne s'annule que si le contenu est nul.", `Le contenu est nul pour $${v} = ${m}$ (coefficient $${a}$).`, `$S = ${J}$.`),
    );
  }),
  tpl(MI, 6, 2, "Les solutions de |x − m| ≤ r vont de m − r à m + r : m est le centre, r le rayon.", () => {
    const v = un(LETTRES);
    const { c, m, k, E } = tirer(v);
    const centre = un([true, false]);
    return court(
      `${un(["Les solutions de cette inéquation forment un intervalle :", "Cette inéquation a pour solutions un intervalle :", "Les solutions forment un intervalle, pour l'inéquation :", "On résout l'inéquation suivante, dont les solutions forment un intervalle :"])}\n\n$${va(E)} \\leq ${c}$\n\n${centre ? un(["Quel est son centre ?", "Quel nombre est au milieu de cet intervalle ?", "Quelle est l'abscisse de son milieu ?", "Quel nombre annule le contenu de la valeur absolue, au milieu de l'intervalle ?"]) : un(["Quel est son rayon ?", "Quelle est sa demi-longueur ?", "De combien peut-on s'écarter au plus de son centre ?", "Quelle est la moitié de sa longueur ?"])}`,
      centre ? m : k,
      expl(DEF_I, "on écrit l'intervalle, puis son centre et son rayon.", `$S = ${interL(m - k, m + k)}$.`, `${centre ? "le centre" : "le rayon"} vaut $${centre ? m : k}$.`),
    );
  }),
  tpl(MI, 7, 3, "L'écart à la cible reste au plus égal à la tolérance : |ax − T| ≤ e.", () => {
    const { L, a, e, T, x0, k } = lot();
    const j = `$${interL(x0 - k, x0 + k)}$`;
    return qcm(
      `${L.d(a)} ${un([`${L.quoi.charAt(0).toUpperCase() + L.quoi.slice(1)} doit rester à au plus ${e} ${L.u} de ${L.cible}, qui est de ${T} ${L.u}.`, `La tolérance est de ${e} ${L.u} autour de ${L.cible}, soit ${T} ${L.u}.`, `On accepte un écart d'au plus ${e} ${L.u} avec ${L.cible}, de ${T} ${L.u}.`])} ${un(["Quelles valeurs de $x$ sont acceptables ?", "Dans quel intervalle doit se trouver $x$ ?", "Quel intervalle donne les valeurs admises de $x$ ?"])}`,
      j,
      [`$${interL(x0 - e, x0 + e)}$`, `$${solIneq(x0 - k, x0 + k, "\\geq")}$`, `$${interL(x0 - k, x0 + k, false, false)}$`, `$${interL(x0, x0 + k)}$`].filter((x) => x !== j),
      expl(DEF_I, `la condition s'écrit $|${a}x - ${T}| \\leq ${e}$.`, `$${T - e} \\leq ${a}x \\leq ${T + e}$, puis on divise par $${a}$.`, `$x$ appartient à ${j}.`),
    );
  }),
  tpl(MI, 8, 3, "Pour chaque proposition, cherche le centre (contenu nul) et le rayon (c ÷ a).", () => {
    const v = un(LETTRES);
    const a = un([2, 3, 4, 5]);
    const m = nz(-6, 6);
    const k = entre(1, 5);
    const ch = (A: number, M: number, K: number, R = "\\leq") => `$${va(aff(A, -A * M, v))} ${R} ${A * K}$`;
    const j = ch(a, m, k);
    return qcm(
      `${un(["L'ensemble des solutions d'une inéquation est", "Une inéquation a pour ensemble de solutions", "On cherche une inéquation dont les solutions forment", "Les solutions cherchées forment"])}\n\n$${interL(m - k, m + k)}$\n\n${un(["Quelle inéquation convient ?", "Laquelle de ces inéquations a ces solutions ?", "Quelle inéquation a exactement ces solutions ?", "Laquelle est la bonne ?"])}`,
      j,
      [ch(a, -m, k), ch(a, m, a * k), ch(a, m, k, "\\geq"), ch(a, m, k + 1), ch(a, m + 1, k)].filter((x) => x !== j),
      expl(DEF_I, "le centre annule le contenu ; le rayon vaut la borne divisée par le coefficient.", `Centre $${m}$, rayon $${k}$.`, `l'inéquation est ${j}.`),
    );
  }),
  tpl(MI, 9, 3, "Isole la valeur absolue : passer un moins de l'autre côté retourne l'inégalité.", () => {
    const v = un(LETTRES);
    const { a, b, c, m, k, E } = tirer(v);
    const p = entre(1, 9);
    const rel = un<Rel>(["\\leq", "\\geq", "<", ">"]);
    const moins = un([true, false]);
    const G = moins ? `${p + c} - ${va(E)}` : `${va(E)} + ${p}`;
    const R: Rel = moins ? ({ "\\leq": "\\geq", "\\geq": "\\leq", "<": ">", ">": "<" } as Record<Rel, Rel>)[rel] : rel;
    const D = moins ? p : p + c;
    const J = `$${solIneq(m - k, m + k, R)}$`;
    return qcm(
      `${pose(INTRO_I, `${G} ${rel} ${D}`)}\n\n${un(["Quel est l'ensemble de ses solutions ?", "Quelles valeurs conviennent ?", "Quel ensemble $S$ convient ?", "Isole la valeur absolue : quel ensemble obtient-on ?"])}`,
      J,
      [`$${solIneq(m - k, m + k, inverse[R])}$`, `$${solIneq(-m - k, -m + k, R)}$`, `$${solIneq(m - c, m + c, R)}$`, `$${solIneq(m - k - 1, m + k + 1, R)}$`].filter((x) => x !== J),
      expl(DEF_I, "on isole d'abord la valeur absolue ; passer un moins de l'autre côté retourne l'inégalité.", `$${va(aff(a, b, v))} ${R} ${c}$.`, `$S = ${solIneq(m - k, m + k, R)}$.`),
    );
  }),
];

function ordre(p: number, q: number): (string | number)[] {
  const [g, d] = p < q ? [p, q] : [q, p];
  const ecr = (x: number) => (Number.isInteger(x) ? x : fracL(Math.round(x * 60), 60));
  return g === d ? [ecr(g)] : [ecr(g), ecr(d)];
}
