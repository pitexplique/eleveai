// Renfort « variations des fonctions », 1re spé (02/11/2026).
//
// Mesure du 02/11 (scripts/mesurer-squelettes-coach.ts premiere-spe
// variations_fonctions) : 11 à 91 squelettes par micro, 5,6 à 19 répétitions
// sur 20 à chaque étoile. On branche des GÉNÉRATEURS : familles de fonctions
// (trinômes, cubiques, quotients, exponentielle) × tournures × situations de
// métiers (physique, économie, santé, sport, ingénierie, biologie, logistique :
// les maths sont transversales). Aucune question « open » : QCM ou réponse
// courte (un nombre). Modèle : terminale-spe/maths/convexite-renfort.ts.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

/** Contrôle numérique (utilisé par le script de vérification, inactif sur le site). */
export const verifRenfortVariations = { actif: false, erreurs: [] as string[] };
function verifie(ok: boolean, msg: string) {
  if (verifRenfortVariations.actif && !ok) verifRenfortVariations.erreurs.push(msg);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rc<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function arrondi(x: number) {
  const r = Math.round(x * 1000) / 1000;
  return Object.is(r, -0) ? 0 : r;
}

/** Nombre en LaTeX : virgule décimale « {,} ». */
function n(x: number) {
  return String(arrondi(x)).replace(".", "{,}");
}

/** Nombre pour une réponse tapée : virgule décimale. */
function fr(x: number) {
  return String(arrondi(x)).replace(".", ",");
}

/** Nombre dans un canvas (texte brut) : vrai signe moins, virgule. */
function nbC(x: number) {
  return String(arrondi(x)).replace("-", "−").replace(".", ",");
}

type Terme = [number, number];

/** Polynôme en LaTeX à partir de [coefficient, puissance], sans les termes nuls. */
function poly(termes: Terme[], v = "x") {
  let s = "";
  for (const [c, p] of termes) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = p === 0 ? n(abs) : `${abs === 1 ? "" : n(abs)}${p === 1 ? v : `${v}^${p}`}`;
    if (!s) s = (c < 0 ? "-" : "") + corps;
    else s += (c < 0 ? " - " : " + ") + corps;
  }
  return s || "0";
}

function evalP(termes: Terme[], x: number) {
  return termes.reduce((acc, [c, p]) => acc + c * x ** p, 0);
}

function deriveP(termes: Terme[]): Terme[] {
  return termes.filter(([, p]) => p > 0).map(([c, p]) => [c * p, p - 1] as Terme);
}

/** « + 3x », « - 2x », rien si nul. */
function plusTerme(c: number, suffixe: string) {
  if (c === 0) return "";
  const abs = Math.abs(c);
  const coef = abs === 1 && suffixe ? "" : n(abs);
  return `${c > 0 ? " + " : " - "}${coef}${suffixe}`;
}

/** (x + m) en LaTeX : « x + 3 », « x - 2 », « x ». */
function xPlus(m: number, v = "x") {
  return m === 0 ? v : m > 0 ? `${v} + ${n(m)}` : `${v} - ${n(-m)}`;
}

/** Facteur (x - r) : « x » si r = 0, sinon « (x - 3) ». */
function facteurX(r: number) {
  return r === 0 ? "x" : `(${xPlus(-r)})`;
}

/** Dérivée numérique proche de la dérivée annoncée ? */
function verifDerivee(f: (x: number) => number, fp: (x: number) => number, tag: string, xs = [-2.3, -0.7, 0.4, 1.9, 3.1]) {
  for (const x of xs) {
    const h = 1e-5;
    const num = (f(x + h) - f(x - h)) / (2 * h);
    if (!Number.isFinite(num)) continue;
    verifie(Math.abs(num - fp(x)) < 1e-3 * (1 + Math.abs(fp(x))), `${tag} : dérivée fausse en ${x}`);
  }
}

const R = "$\\mathbb{R}$";
const gauche = (k: number) => `$]-\\infty\\,;${n(k)}]$`;
const droite = (k: number) => `$[${n(k)}\\,;+\\infty[$`;
const ferme = (a: number, b: number) => `$[${n(a)}\\,;${n(b)}]$`;
const ouvert = (a: number, b: number) => `$]${n(a)}\\,;${n(b)}[$`;
const deuxCotes = (a: number, b: number) => `$]-\\infty\\,;${n(a)}]$ et $[${n(b)}\\,;+\\infty[$`;
const horsOuvert = (a: number, b: number) => `$]-\\infty\\,;${n(a)}[ \\cup ]${n(b)}\\,;+\\infty[$`;

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Écriture usuelle : « 1e^x » → « e^x ». */
function propre(s: string) {
  return s.replace(/(^|[^\d}])1e\^/g, "$1e^");
}

function qcm(text: string, correct: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const bon = propre(correct);
  return { text: propre(text), format: "qcm", choices: makeChoices(bon, pieges.map(propre)), expected: [bon], comparator: "mcq_exact", explanation: propre(explanation), ...(canvas ? { canvas } : {}) };
}

function court(text: string, valeur: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text: propre(text), format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation: propre(explanation), ...(canvas ? { canvas } : {}) };
}

/* ---------- Situations : qui étudie la fonction ---------- */

// Une seule situation réunionnaise sur 25 (≈ 4 %).
const ETUDES = [
  "Pour régler un amplificateur, une ingénieure du son",
  "Pour suivre une culture de levures, un biologiste",
  "Pour prévoir une recette, une économiste",
  "Pour dimensionner un pont, un ingénieur en génie civil",
  "Pour ajuster une dose, une pharmacienne",
  "Pour analyser une course, un entraîneur d’athlétisme",
  "Pour planifier des livraisons, une logisticienne",
  "Pour étudier une trajectoire, un physicien",
  "Pour suivre un banc de poissons, une biologiste marine",
  "Pour calculer une prime d’assurance, un actuaire",
  "Pour piloter un four industriel, une technicienne de production",
  "Pour programmer un jeu vidéo, un développeur",
  "Pour préparer une prévision, une météorologue",
  "Pour orienter un panneau solaire, un technicien en énergie",
  "Pour étudier un rythme cardiaque, une cardiologue",
  "Pour régler un drone, une ingénieure en robotique",
  "Pour analyser des ventes, un data scientist",
  "Pour dessiner une piste de skate, une architecte",
  "Pour suivre une réaction chimique, un chimiste",
  "Pour gérer un stock, un gestionnaire d’entrepôt",
  "Pour bâtir un plan d’entraînement, une coach sportive",
  "Pour suivre une épidémie, une épidémiologiste",
  "Pour dessiner une carrosserie, un designer automobile",
  "Pour suivre l’activité du Piton de la Fournaise, une volcanologue",
  "Pour fixer un tarif, une commerçante",
];

/** Phrase qui pose la fonction (sans ou avec une situation de métier). */
function intro(f: string, nom = "f", v = "x", domaine = R) {
  const def = `$${nom}(${v}) = ${f}$`;
  const t = randomInt(1, 4);
  if (t === 1) return `Soit $${nom}$ la fonction définie sur ${domaine} par ${def}.`;
  if (t === 2) return `On considère la fonction $${nom}$ définie sur ${domaine} par ${def}.`;
  return `${rc(ETUDES)} étudie la fonction $${nom}$ définie sur ${domaine} par ${def}.`;
}

/** Grandeurs de la vie courante : [description, nom, variable]. */
const GRANDEURS: Array<[string, string, string]> = [
  ["la température d’un four (en °C) au bout de $t$ minutes", "T", "t"],
  ["le nombre d’abonnés d’une application (en milliers) au bout de $t$ semaines", "N", "t"],
  ["la masse d’un nourrisson (en kg) à l’âge de $t$ mois", "m", "t"],
  ["le volume d’eau d’une citerne (en m³) au bout de $t$ heures", "V", "t"],
  ["le coût de fabrication (en milliers d’euros) de $q$ centaines d’objets", "C", "q"],
  ["la concentration d’un médicament dans le sang (en mg/L) au bout de $t$ heures", "C", "t"],
  ["la vitesse d’un cycliste (en km/h) au bout de $t$ secondes", "v", "t"],
  ["le bénéfice d’une coopérative (en milliers d’euros) pour $q$ tonnes vendues", "B", "q"],
  ["l’altitude d’un parapentiste (en m) au bout de $t$ minutes", "h", "t"],
  ["la population de bactéries (en millions) au bout de $t$ heures", "P", "t"],
  ["la charge d’une batterie (en %) au bout de $t$ minutes", "Q", "t"],
  ["la hauteur d’eau d’un port (en m) au bout de $t$ heures", "H", "t"],
];

/* ---------- Canvas ---------- */

function courbe(f: (x: number) => number, xmin: number, xmax: number, ymin: number, ymax: number, extra: Record<string, unknown> = {}): CanvasFigure {
  const points: { x: number; y: number }[] = [];
  const pas = (xmax - xmin) / 60;
  for (let i = 0; i <= 60; i++) {
    const x = Math.round((xmin + i * pas) * 1000) / 1000;
    const y = f(x);
    if (Number.isFinite(y)) points.push({ x, y: Math.round(y * 1000) / 1000 });
  }
  return {
    kind: "fonctionGraphique",
    size: { width: 320, height: 260 },
    xmin,
    xmax,
    ymin,
    ymax,
    grille: true,
    ...extra,
    courbes: [{ id: "f", type: "points", couleur: "#2563eb", points }],
  } as CanvasFigure;
}

function paraboleCanvas(a: number, h: number, k: number, marquer = true, titre?: string): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    ...(titre ? { titre } : {}),
    size: { width: 320, height: 260 },
    xmin: -6,
    xmax: 6,
    ymin: -8,
    ymax: 8,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b: -2 * a * h, c: a * h * h + k, couleur: "#2563eb" }],
    ...(marquer ? { misesEnEvidence: [{ point: { x: h, y: k, label: "S", couleur: "#dc2626" } }] } : {}),
  } as CanvasFigure;
}

function tableauVar(bornes: number[], signes: ("+" | "-")[], valeurs: number[], nom = "f", v = "x"): CanvasFigure {
  return {
    kind: "tableau_variations",
    bornes: bornes.map(nbC),
    variable: v,
    derivee: { label: `${nom} ′(${v})`, signes, marques: Array(bornes.length - 2).fill("0") },
    variations: { label: `${nom}(${v})`, valeurs: valeurs.map(nbC) },
    size: { width: 380, height: 200 },
  } as CanvasFigure;
}

function tableauSig(bornes: string[], signes: ("+" | "-")[], nom = "f", v = "x"): CanvasFigure {
  return {
    kind: "tableau_signes",
    bornes,
    variable: v,
    lignes: [{ label: `${nom} ′(${v})`, signes, marques: Array(bornes.length - 2).fill("0") }],
    size: { width: 380, height: 140 },
  } as CanvasFigure;
}

/* ---------- Familles de fonctions ---------- */

/** Trinôme a(x − h)² + k développé : sommet à coordonnées entières. */
function trinome(hNonNul = false, as: number[] = [1, 2, 3, -1, -2, -3]) {
  const a = rc(as);
  let h = randomInt(-4, 4);
  while (hNonNul && h === 0) h = randomInt(-4, 4);
  const k = randomInt(-9, 9);
  const T: Terme[] = [[a, 2], [-2 * a * h, 1], [a * h * h + k, 0]];
  const f = (x: number) => evalP(T, x);
  const D = deriveP(T);
  verifie(Math.abs(f(h) - k) < 1e-9 && Math.abs(evalP(D, h)) < 1e-9, "trinome : sommet faux");
  return { a, h, k, T, tex: poly(T), fp: poly(D), f, fpf: (x: number) => evalP(D, x) };
}

/** Cubique de dérivée 6·sens·(x − r)(x − s). */
function cubique(sens: 1 | -1, r: number, s: number, d: number) {
  const T: Terme[] = [[2 * sens, 3], [-3 * sens * (r + s), 2], [6 * sens * r * s, 1], [d, 0]];
  const D = deriveP(T);
  const f = (x: number) => evalP(T, x);
  verifie(Math.abs(evalP(D, r)) < 1e-9 && Math.abs(evalP(D, s)) < 1e-9, "cubique : racines de f' fausses");
  return { T, tex: poly(T), fp: poly(D), f, fpf: (x: number) => evalP(D, x), r, s, sens };
}

function deuxRacines() {
  const r = randomInt(-4, 3);
  return { r, s: randomInt(r + 1, Math.min(r + 5, 4)) };
}

function facteur(m: number) {
  return m === 0 ? "x" : `(${xPlus(m)})`;
}
function facteurInv(m: number) {
  return m === 0 ? "-x" : `(${n(m)} - x)`;
}

/** f avec exponentielle : x0 = zéro de f', racineF = zéro du facteur de f (piège). */
function expFamille() {
  const t = randomInt(1, 3);
  const m = randomInt(-3, 3);
  if (t === 1) {
    const r = { tex: `${facteur(m)}e^x`, fp: `${facteur(m + 1)}e^x`, x0: -m - 1, racineF: -m, croissanteADroite: true, ex: "e^x", f: (x: number) => (x + m) * Math.exp(x), fpf: (x: number) => (x + m + 1) * Math.exp(x) };
    verifDerivee(r.f, r.fpf, "exp1");
    return r;
  }
  if (t === 2) {
    const r = { tex: `${facteurInv(m)}e^x`, fp: `${facteurInv(m - 1)}e^x`, x0: m - 1, racineF: m, croissanteADroite: false, ex: "e^x", f: (x: number) => (m - x) * Math.exp(x), fpf: (x: number) => (m - 1 - x) * Math.exp(x) };
    verifDerivee(r.f, r.fpf, "exp2");
    return r;
  }
  const r = { tex: `${facteur(m)}e^{-x}`, fp: `${facteurInv(1 - m)}e^{-x}`, x0: 1 - m, racineF: -m, croissanteADroite: false, ex: "e^{-x}", f: (x: number) => (x + m) * Math.exp(-x), fpf: (x: number) => (1 - m - x) * Math.exp(-x) };
  verifDerivee(r.f, r.fpf, "exp3");
  return r;
}

/** « un menu » → « d’un menu ». */
function de(gn: string) {
  return /^(un|une) /.test(gn) ? `d’${gn}` : `de ${gn}`;
}

/** Intervalle de temps (ou de quantité) : bornes positives. */
function intervallePositif() {
  const a = randomInt(0, 6);
  const b = a + randomInt(2, 8);
  return rc([ferme(a, b), droite(a), ouvert(a, b)]);
}

function intervalleAuHasard() {
  const a = randomInt(-5, 3);
  const b = a + randomInt(2, 6);
  return rc([ferme(a, b), gauche(b), droite(a), ouvert(a, b), R]);
}

type Sens = "croissante" | "décroissante";
const autreSens = (s: Sens): Sens => (s === "croissante" ? "décroissante" : "croissante");

/* =========================================================
   VAR_SIGNE_DERIVEE
========================================================= */

function genSigneDonne() {
  const pos = randomInt(0, 1) === 1;
  let I = intervalleAuHasard();
  const bon: Sens = pos ? "croissante" : "décroissante";
  let text: string;
  let nom = "f";
  if (randomInt(1, 3) === 3) {
    I = intervallePositif();
    const [desc, F, v] = rc(GRANDEURS);
    nom = F;
    text = `On note $${F}(${v})$ ${desc}. Sur ${I}, $${F}'(${v}) ${pos ? ">" : "<"} 0$. Sur cet intervalle, la fonction $${F}$ est :`;
  } else
    text = rc([
      `On sait que $f'(x) ${pos ? ">" : "<"} 0$ pour tout $x$ de ${I}. Sur ${I}, la fonction $f$ est :`,
      `Sur ${I}, la dérivée de $f$ est strictement ${pos ? "positive" : "négative"}. Que peut-on dire de $f$ sur ${I} ?`,
      `Le tableau de signes de $f'$ ne porte que des signes « ${pos ? "+" : "−"} » sur ${I}. Sur cet intervalle, $f$ est :`,
      `Une élève a montré que $f'(x) ${pos ? ">" : "<"} 0$ sur ${I}. Elle en déduit que, sur ${I}, $f$ est :`,
    ]);
  return qcm(
    text,
    bon,
    [autreSens(bon), pos ? "positive" : "négative", "constante"],
    expl(
      "le signe de la dérivée donne le sens de variation.",
      "dérivée positive : la fonction monte ; dérivée négative : elle descend.",
      `$${nom}'$ est ${pos ? "positive" : "négative"} sur ${I}. Attention : c’est le signe de $${nom}'$, pas celui de $${nom}$.`,
      `$${nom}$ est ${bon} sur ${I}.`
    )
  );
}

function genAffineSens() {
  const m = rc([-5, -4, -3, -2, -1.5, -0.5, 0.5, 1.5, 2, 3, 4, 5]);
  const p = randomInt(-9, 9);
  const tex = poly([[m, 1], [p, 0]]);
  const bon = m > 0 ? `croissante sur ${R}` : `décroissante sur ${R}`;
  return qcm(
    `${intro(tex)} ${rc(["Que peut-on dire de son sens de variation ?", "Sur $\\mathbb{R}$, la fonction $f$ est :", "En calculant $f'(x)$, on trouve que $f$ est :"])}`,
    bon,
    [m > 0 ? `décroissante sur ${R}` : `croissante sur ${R}`, `constante sur ${R}`, m > 0 ? "décroissante puis croissante" : "croissante puis décroissante"],
    expl("le signe de $f'$ donne le sens de variation de $f$.", "pour $f(x) = mx + p$, on a $f'(x) = m$.", `$f'(x) = ${n(m)}$, qui est ${m > 0 ? "positif" : "négatif"} pour tout $x$.`, `$f$ est ${bon}.`)
  );
}

function genSensVersSigne() {
  const croit = randomInt(0, 1) === 1;
  let I = intervalleAuHasard();
  let nom = "f";
  let v = "x";
  let text: string;
  if (randomInt(1, 3) === 3) {
    I = intervallePositif();
    const g = rc(GRANDEURS);
    nom = g[1];
    v = g[2];
    text = `On note $${nom}(${v})$ ${g[0]}. Cette grandeur ${croit ? "augmente" : "diminue"} sur ${I}. Pour tout $${v}$ de ${I}, on a :`;
  } else
    text = rc([
      `Si $f$ est ${croit ? "croissante" : "décroissante"} sur ${I}, alors pour tout $x$ de ${I} :`,
      `La courbe de $f$ ${croit ? "monte" : "descend"} sur ${I}. Pour tout $x$ de ${I}, on a :`,
      `Une fonction dérivable $f$ est ${croit ? "croissante" : "décroissante"} sur ${I}. Que peut-on dire, pour $x$ dans ${I} ?`,
    ]);
  const bon = `$${nom}'(${v}) ${croit ? "\\ge" : "\\le"} 0$`;
  return qcm(
    text,
    bon,
    [`$${nom}'(${v}) ${croit ? "\\le" : "\\ge"} 0$`, `$${nom}(${v}) ${croit ? "\\ge" : "\\le"} 0$`, `$${nom}'(${v}) = 0$`],
    expl(
      "sur un intervalle, $f$ croissante ⟺ $f' \\ge 0$ ; $f$ décroissante ⟺ $f' \\le 0$.",
      "on parle du signe de la DÉRIVÉE, pas de celui de la fonction.",
      `$${nom}$ est ${croit ? "croissante" : "décroissante"} sur ${I}.`,
      `${bon} sur ${I}.`
    )
  );
}

function genDeriveeAffineIntervalle(donneFp: boolean) {
  const T = trinome(true);
  const demande: Sens = rc(["croissante", "décroissante"]);
  const aDroite = (demande === "croissante") === T.a > 0;
  const cote = (k: number) => (aDroite ? droite(k) : gauche(k));
  const bon = cote(T.h);
  return qcm(
    `${intro(T.tex)} ${donneFp ? `On a $f'(x) = ${T.fp}$. ` : ""}${rc([`Sur quel intervalle $f$ est-elle ${demande} ?`, `Où la fonction $f$ est-elle ${demande} ?`, `Quel intervalle convient : $f$ y est ${demande} ?`])}`,
    bon,
    [aDroite ? gauche(T.h) : droite(T.h), cote(-T.h), cote(2 * T.h), R],
    expl(
      "$f$ est croissante là où $f' \\ge 0$, décroissante là où $f' \\le 0$.",
      "on résout $f'(x) = 0$, puis on lit le signe de cette expression affine.",
      `$f'(x) = ${T.fp}$ s’annule en $x = ${n(T.h)}$ ; le coefficient de $x$ est ${T.a > 0 ? "positif" : "négatif"}, donc $f'$ est ${T.a > 0 ? "négative puis positive" : "positive puis négative"}.`,
      `$f$ est ${demande} sur ${bon}.`
    )
  );
}

function genDeriveePositive() {
  const t = randomInt(1, 5);
  const h = randomInt(-4, 4);
  const a = rc([1, 2]);
  const p = randomInt(1, 6);
  const q = randomInt(-6, 6);
  let enonce = "";
  let croit = true;
  let raison = "";
  const carre = h === 0 ? "x^2" : `(${xPlus(-h)})^2`;
  if (t === 1) {
    const T: Terme[] = [[a, 3], [p, 1], [q, 0]];
    enonce = `${intro(poly(T))} On a $f'(x) = ${poly(deriveP(T))}$.`;
    raison = `$${poly([[3 * a, 2]])} \\ge 0$, donc $f'(x) \\ge ${p} > 0$`;
  } else if (t === 2) {
    const T: Terme[] = [[-a, 3], [-p, 1], [q, 0]];
    enonce = `${intro(poly(T))} On a $f'(x) = ${poly(deriveP(T))}$.`;
    croit = false;
    raison = `$-${poly([[3 * a, 2]])} \\le 0$, donc $f'(x) \\le -${p} < 0$`;
  } else if (t === 3) {
    enonce = rc([`Une fonction $f$ a pour dérivée $f'(x) = ${carre}$ sur $\\mathbb{R}$.`, `${rc(ETUDES)} trouve que la dérivée de sa fonction $f$ est $f'(x) = ${carre}$.`]);
    raison = `un carré est positif ou nul : $f'$ s’annule en $${n(h)}$ mais ne change pas de signe`;
  } else if (t === 4) {
    enonce = rc([`Une fonction $f$ a pour dérivée $f'(x) = -${carre} - ${p}$ sur $\\mathbb{R}$.`, `${rc(ETUDES)} trouve que la dérivée de sa fonction $f$ est $f'(x) = -${carre} - ${p}$.`]);
    croit = false;
    raison = `$-${carre} \\le 0$, donc $f'(x) \\le -${p} < 0$`;
  } else {
    const s = rc([1, -1]);
    croit = s > 0;
    enonce = `${intro(`${s > 0 ? "" : "-"}e^x${plusTerme(s * p, "x")}`)} On a $f'(x) = ${s > 0 ? "" : "-"}e^x${plusTerme(s * p, "")}$.`;
    raison = s > 0 ? `$e^x > 0$, donc $f'(x) > ${p}$` : `$e^x > 0$, donc $f'(x) < -${p}$`;
  }
  const bon = croit ? `croissante sur ${R}` : `décroissante sur ${R}`;
  return qcm(
    `${enonce} ${rc(["Que peut-on dire de $f$ ?", "Sur $\\mathbb{R}$, la fonction $f$ est :", "Quel est le sens de variation de $f$ ?"])}`,
    bon,
    [croit ? `décroissante sur ${R}` : `croissante sur ${R}`, croit ? `décroissante sur ${gauche(h)}, puis croissante` : `croissante sur ${gauche(h)}, puis décroissante`, `constante sur ${R}`],
    expl("le signe de $f'$ donne le sens de variation.", "on cherche le signe de $f'(x)$ pour tout réel $x$.", `${raison}.`, `$f$ est ${bon}.`)
  );
}

function genSensCubique(donneFp: boolean) {
  const { r, s } = deuxRacines();
  const sens = rc([1, -1] as const);
  const C = cubique(sens, r, s, randomInt(-5, 5));
  const demande: Sens = rc(["croissante", "décroissante"]);
  const entre = (demande === "décroissante") === sens > 0;
  const bon = entre ? ferme(r, s) : deuxCotes(r, s);
  return qcm(
    `${intro(C.tex)} ${donneFp ? `Sa dérivée est $f'(x) = ${C.fp}$, qui s’annule en $${n(r)}$ et en $${n(s)}$. ` : ""}Sur quel(s) intervalle(s) $f$ est-elle ${demande} ?`,
    bon,
    [entre ? deuxCotes(r, s) : ferme(r, s), entre ? ferme(-s, -r) : deuxCotes(-s, -r), entre ? droite(s) : droite(s), R],
    expl(
      "$f$ est croissante là où $f' \\ge 0$, décroissante là où $f' \\le 0$.",
      "on factorise $f'$ ; un trinôme a le signe de son coefficient $a$ à l’extérieur des racines, le signe contraire entre elles.",
      `$f'(x) = ${C.fp} = ${sens > 0 ? "" : "-"}6${facteurX(r)}${facteurX(s)}$ : ${sens > 0 ? "positive à l’extérieur de" : "négative à l’extérieur de"} $[${n(r)}\\,;${n(s)}]$, ${sens > 0 ? "négative" : "positive"} entre $${n(r)}$ et $${n(s)}$.`,
      `$f$ est ${demande} sur ${bon}.`
    )
  );
}

function genSensExp(donneFp: boolean) {
  const E = expFamille();
  const demande: Sens = rc(["croissante", "décroissante"]);
  const aDroite = (demande === "croissante") === E.croissanteADroite;
  const cote = (k: number) => (aDroite ? droite(k) : gauche(k));
  const bon = cote(E.x0);
  return qcm(
    `${intro(E.tex)} ${donneFp ? `On admet que $f'(x) = ${E.fp}$. ` : ""}Sur quel intervalle $f$ est-elle ${demande} ?`,
    bon,
    [aDroite ? gauche(E.x0) : droite(E.x0), cote(E.racineF), R],
    expl(
      "$f$ est croissante là où $f' \\ge 0$.",
      `$${E.ex} > 0$, donc $f'(x)$ a le signe de son facteur affine.`,
      `$f'(x) = ${E.fp}$ s’annule en $x = ${n(E.x0)}$ ; son facteur affine est ${E.croissanteADroite ? "négatif avant, positif après" : "positif avant, négatif après"}.`,
      `$f$ est ${demande} sur ${bon}.`
    )
  );
}

function genQuotientSens() {
  const a = rc([1, 2, 3, -1, -2]);
  const c = randomInt(-4, 4);
  let b = randomInt(-6, 6);
  if (a * c - b === 0) b += 1;
  const num = a * c - b;
  const tex = `\\dfrac{${poly([[a, 1], [b, 0]])}}{${xPlus(c)}}`;
  const den = c === 0 ? "x^2" : `(${xPlus(c)})^2`;
  const fp = `\\dfrac{${n(num)}}{${den}}`;
  verifDerivee((x) => (a * x + b) / (x + c), (x) => num / (x + c) ** 2, "quotient", [-c + 0.6, -c + 1.7, -c + 3.2]);
  const dom = `$]${n(-c)}\\,;+\\infty[$`;
  const bon = num > 0 ? `croissante sur ${dom}` : `décroissante sur ${dom}`;
  return qcm(
    `${intro(tex, "f", "x", dom)} On admet que $f'(x) = ${fp}$. ${rc(["Quel est le sens de variation de $f$ ?", "Sur cet intervalle, $f$ est :", "Que peut-on dire de $f$ ?"])}`,
    bon,
    [num > 0 ? `décroissante sur ${dom}` : `croissante sur ${dom}`, `croissante puis décroissante sur ${dom}`, `constante sur ${dom}`],
    expl("le signe de $f'$ donne le sens de variation.", "un carré non nul est strictement positif : $f'$ a le signe de son numérateur.", `le numérateur vaut $${n(num)}$, ${num > 0 ? "positif" : "négatif"}, et $${den} > 0$ sur ${dom}.`, `$f$ est ${bon}.`)
  );
}

/* =========================================================
   VAR_TABLEAU
========================================================= */

function tableauAuHasard(positif = false) {
  const nbPieces = rc([2, 3]);
  const bornes = [positif ? 0 : randomInt(-6, -2)];
  for (let i = 0; i < nbPieces; i++) bornes.push(bornes[i] + randomInt(2, 4));
  const signes: ("+" | "-")[] = [];
  let s: "+" | "-" = rc(["+", "-"]);
  for (let i = 0; i < nbPieces; i++) {
    signes.push(s);
    s = s === "+" ? "-" : "+";
  }
  const valeurs = [randomInt(-5, 5)];
  for (let i = 0; i < nbPieces; i++) valeurs.push(valeurs[i] + (signes[i] === "+" ? 1 : -1) * randomInt(2, 7));
  if (positif) {
    const mini = Math.min(...valeurs);
    if (mini <= 0) for (let i = 0; i < valeurs.length; i++) valeurs[i] += 1 - mini + randomInt(0, 10);
  }
  return { bornes, signes, valeurs };
}

/** Le tableau, avec ou sans situation. */
function poseTableau() {
  if (randomInt(1, 2) === 1) {
    const [desc, F, v] = rc(GRANDEURS);
    const tb = tableauAuHasard(true);
    return { ...tb, nom: F, v, phrase: `Le tableau ci-dessous donne les variations de $${F}$, où $${F}(${v})$ est ${desc}.` };
  }
  const tb = tableauAuHasard();
  return {
    ...tb,
    nom: "f",
    v: "x",
    phrase: rc([
      `Voici le tableau de variations d’une fonction $f$ sur $[${n(tb.bornes[0])}\\,;${n(tb.bornes[tb.bornes.length - 1])}]$.`,
      `${rc(ETUDES)} a dressé le tableau de variations ci-dessous.`,
      "On donne le tableau de variations de $f$ ci-dessous.",
    ]),
  };
}

function genTableauLireSens() {
  const P = poseTableau();
  const i = randomInt(0, P.signes.length - 1);
  const I = ferme(P.bornes[i], P.bornes[i + 1]);
  const bon: Sens = P.signes[i] === "+" ? "croissante" : "décroissante";
  return qcm(
    `${P.phrase} ${rc([`Sur ${I}, la fonction $${P.nom}$ est :`, `Que fait $${P.nom}$ sur ${I} ?`, `Sur ${I}, quel est le sens de variation de $${P.nom}$ ?`])}`,
    bon,
    [autreSens(bon), "constante", bon === "croissante" ? "décroissante puis croissante" : "croissante puis décroissante"],
    expl("dans un tableau de variations, une flèche qui monte = fonction croissante ; une flèche qui descend = décroissante.", "on repère la flèche entre les deux bornes de l’intervalle.", `entre $${n(P.bornes[i])}$ et $${n(P.bornes[i + 1])}$, la flèche ${bon === "croissante" ? "monte" : "descend"} (signe « ${P.signes[i] === "+" ? "+" : "−"} » pour la dérivée).`, `$${P.nom}$ est ${bon} sur ${I}.`),
    tableauVar(P.bornes, P.signes, P.valeurs, P.nom, P.v)
  );
}

function genTableauLireMax() {
  let P = poseTableau();
  const mot = rc(["maximum", "minimum"]);
  const cible = () => (mot === "maximum" ? Math.max(...P.valeurs) : Math.min(...P.valeurs));
  for (let k = 0; k < 30 && P.valeurs.filter((x) => x === cible()).length > 1; k++) P = poseTableau();
  const val = cible();
  const ou = P.bornes[P.valeurs.indexOf(val)];
  const I = ferme(P.bornes[0], P.bornes[P.bornes.length - 1]);
  const abscisse = randomInt(1, 3) === 3;
  return court(
    `${P.phrase} ${abscisse ? rc([`En quelle valeur de $${P.v}$ le ${mot} de $${P.nom}$ sur ${I} est-il atteint ?`, `Pour quelle valeur de $${P.v}$ la fonction $${P.nom}$ atteint-elle son ${mot} sur ${I} ?`]) : rc([`Quel est le ${mot} de $${P.nom}$ sur ${I} ?`, `Quelle est la plus ${mot === "maximum" ? "grande" : "petite"} valeur prise par $${P.nom}$ sur ${I} ?`])}`,
    abscisse ? ou : val,
    expl(`le ${mot} est la plus ${mot === "maximum" ? "grande" : "petite"} valeur de la ligne des variations.`, "on compare TOUTES les valeurs écrites, y compris aux bornes de l’intervalle.", `la plus ${mot === "maximum" ? "grande" : "petite"} valeur est $${n(val)}$, atteinte en $${P.v} = ${n(ou)}$.`, abscisse ? `le ${mot} est atteint en $${P.v} = ${n(ou)}$.` : `le ${mot} vaut $${n(val)}$.`),
    tableauVar(P.bornes, P.signes, P.valeurs, P.nom, P.v)
  );
}

function genSignesVersVariations() {
  const deux = randomInt(0, 1) === 1;
  const r = randomInt(-5, 2);
  const s = r + randomInt(1, 4);
  const premier: "+" | "-" = rc(["+", "-"]);
  const autre = premier === "+" ? "-" : "+";
  const signes: ("+" | "-")[] = deux ? [premier, autre] : [premier, autre, premier];
  const bornes = deux ? ["−∞", nbC(r), "+∞"] : ["−∞", nbC(r), nbC(s), "+∞"];
  const mot = (x: "+" | "-") => (x === "+" ? "croissante" : "décroissante");
  const motSigne = (x: "+" | "-") => (x === "+" ? "positive" : "négative");
  const bon = signes.map(mot).join(", puis ");
  const inverse = signes.map((x) => mot(x === "+" ? "-" : "+")).join(", puis ");
  return qcm(
    rc([
      "Voici le tableau de signes de $f'$. Que fait $f$, de gauche à droite ?",
      "On a étudié le signe de la dérivée (tableau ci-dessous). Quelles sont les variations de $f$, de gauche à droite ?",
      `${rc(ETUDES)} obtient le tableau de signes de $f'$ ci-dessous. De gauche à droite, $f$ est :`,
    ]),
    bon,
    [inverse, `croissante sur ${R}`, signes.map(motSigne).join(", puis ")],
    expl("chaque « + » de $f'$ donne une flèche qui monte, chaque « − » une flèche qui descend.", "on traduit les signes un par un, de gauche à droite.", `les signes de $f'$ sont : ${signes.map((x) => (x === "+" ? "+" : "−")).join(" ; ")}.`, `$f$ est ${bon}. (Le tableau ne dit rien du signe de $f$ elle-même.)`),
    tableauSig(bornes, signes)
  );
}

function genTableauTrinomeValeur(donneFp: boolean) {
  const T = trinome();
  const valeur = randomInt(0, 1) === 1;
  return court(
    `${intro(T.tex)} ${donneFp ? `On a $f'(x) = ${T.fp}$. ` : ""}${valeur ? rc(["Dans son tableau de variations, quelle valeur écrit-on là où les flèches changent de sens ?", `Quelle valeur de $f$ écrit-on au bout de la flèche, là où $f'$ s’annule ?`]) : rc(["En quelle valeur de $x$ les flèches du tableau de variations changent-elles de sens ?", "Quelle valeur de $x$ place-t-on dans la première ligne du tableau, entre $-\\infty$ et $+\\infty$ ?"])}`,
    valeur ? T.k : T.h,
    expl("on place dans le tableau les valeurs de $x$ où $f'$ s’annule, et les valeurs de $f$ correspondantes.", "on résout $f'(x) = 0$, puis on calcule l’image.", `$f'(x) = ${T.fp} = 0$ pour $x = ${n(T.h)}$, et $f(${n(T.h)}) = ${n(T.k)}$.`, valeur ? `on écrit $${n(T.k)}$.` : `les flèches changent de sens en $x = ${n(T.h)}$.`)
  );
}

function genTableauForme() {
  const T = trinome(true);
  const dc = (h: number) => `$f$ décroît sur ${gauche(h)}, puis croît sur ${droite(h)}`;
  const cd = (h: number) => `$f$ croît sur ${gauche(h)}, puis décroît sur ${droite(h)}`;
  const bon = T.a > 0 ? dc(T.h) : cd(T.h);
  return qcm(
    `${intro(T.tex)} ${rc(["Que donne son tableau de variations ?", "Quelle phrase résume son tableau de variations ?", "Quelle ligne des variations est juste ?"])}`,
    bon,
    [T.a > 0 ? cd(T.h) : dc(T.h), T.a > 0 ? dc(-T.h) : cd(-T.h), `$f$ croît sur ${R}`],
    expl("on lit les variations sur le signe de $f'$.", "on calcule $f'(x)$ et on cherche où elle s’annule.", `$f'(x) = ${T.fp}$ s’annule en $${n(T.h)}$ ; elle est ${T.a > 0 ? "négative puis positive" : "positive puis négative"}.`, `${bon}.`)
  );
}

function genTableauCubiqueSignes() {
  const { r, s } = deuxRacines();
  const sens = rc([1, -1] as const);
  const C = cubique(sens, r, s, randomInt(-5, 5));
  const plus = "$+$, puis $-$, puis $+$";
  const moins = "$-$, puis $+$, puis $-$";
  const bon = sens > 0 ? plus : moins;
  return qcm(
    `${intro(C.tex)} On a $f'(x) = ${C.fp}$, qui s’annule en $${n(r)}$ et en $${n(s)}$. Dans le tableau de variations, quels sont les signes de $f'(x)$, de gauche à droite ?`,
    bon,
    [sens > 0 ? moins : plus, "$+$ partout", "$-$, puis $+$"],
    expl("un trinôme a le signe de son coefficient $a$ à l’extérieur de ses racines.", "on regarde le coefficient de $x^2$ dans $f'(x)$.", `ce coefficient vaut $${6 * sens}$ : $f'$ est ${sens > 0 ? "positive" : "négative"} à l’extérieur de $[${n(r)}\\,;${n(s)}]$.`, `les signes sont ${bon}.`)
  );
}

function genTableauCubiqueValeur() {
  const { r, s } = deuxRacines();
  const sens = rc([1, -1] as const);
  const C = cubique(sens, r, s, randomInt(-6, 6));
  const x0 = rc([r, s]);
  const mot = (x0 === r) === sens > 0 ? "maximum local" : "minimum local";
  return court(
    `${intro(C.tex)} Sa dérivée s’annule en $${n(r)}$ et en $${n(s)}$. ${rc([`Quelle valeur écrit-on dans le tableau de variations sous $x = ${n(x0)}$ ?`, `Dans le tableau de variations, que vaut $f$ en $${n(x0)}$ ?`, `Calcule le ${mot} de $f$, atteint en $x = ${n(x0)}$.`])}`,
    C.f(x0),
    expl("dans le tableau, sous chaque valeur où $f'$ s’annule, on écrit son image par $f$.", "on remplace $x$ dans l’expression de $f$.", `$f(${n(x0)}) = ${n(C.f(x0))}$.`, `on écrit $${n(C.f(x0))}$ (c’est un ${mot}).`)
  );
}

function genTableauComparer() {
  const P = poseTableau();
  const i = randomInt(0, P.signes.length - 1);
  const a = P.bornes[i];
  const b = P.bornes[i + 1];
  const u = a + rc([0.5, 1]);
  const w = b - rc([0, 0.5]);
  const nom = P.nom;
  const lt = `$${nom}(${n(u)}) < ${nom}(${n(w)})$`;
  const gt = `$${nom}(${n(u)}) > ${nom}(${n(w)})$`;
  const bon = P.signes[i] === "+" ? lt : gt;
  return qcm(
    `${P.phrase} ${rc([`Compare $${nom}(${n(u)})$ et $${nom}(${n(w)})$.`, `Sans calcul, que peut-on dire de $${nom}(${n(u)})$ et $${nom}(${n(w)})$ ?`])}`,
    bon,
    [bon === lt ? gt : lt, `$${nom}(${n(u)}) = ${nom}(${n(w)})$`, "On ne peut pas les comparer"],
    expl("sur un intervalle où une fonction est croissante, elle conserve l’ordre ; où elle est décroissante, elle l’inverse.", "on vérifie que les deux nombres sont dans le MÊME intervalle de monotonie.", `$${n(u)}$ et $${n(w)}$ sont dans $[${n(a)}\\,;${n(b)}]$, où $${nom}$ est ${P.signes[i] === "+" ? "croissante" : "décroissante"}, et $${n(u)} < ${n(w)}$.`, `${bon}.`),
    tableauVar(P.bornes, P.signes, P.valeurs, P.nom, P.v)
  );
}

function genTableauNbSolutions() {
  const tb = tableauAuHasard();
  const mini = Math.min(...tb.valeurs);
  const maxi = Math.max(...tb.valeurs);
  const k = randomInt(mini - 1, maxi) + 0.5;
  let nb = 0;
  for (let i = 0; i < tb.signes.length; i++) {
    const lo = Math.min(tb.valeurs[i], tb.valeurs[i + 1]);
    const hi = Math.max(tb.valeurs[i], tb.valeurs[i + 1]);
    if (k > lo && k < hi) nb++;
  }
  const I = ferme(tb.bornes[0], tb.bornes[tb.bornes.length - 1]);
  return court(
    `${rc(["Voici le tableau de variations d’une fonction $f$ continue.", `${rc(ETUDES)} a dressé le tableau de variations ci-dessous ($f$ est continue).`, "La fonction $f$ est continue ; son tableau de variations est ci-dessous."])} ${rc([`Combien de solutions l’équation $f(x) = ${n(k)}$ a-t-elle sur ${I} ?`, `Combien de fois $f$ prend-elle la valeur $${n(k)}$ sur ${I} ?`])}`,
    nb,
    expl("sur un intervalle où $f$ est continue et strictement monotone, $f$ prend une seule fois chaque valeur comprise entre les images des bornes.", "on regarde, flèche par flèche, si la valeur cherchée est entre les deux valeurs extrêmes de la flèche.", `$${n(k)}$ est atteint sur ${nb} flèche${nb > 1 ? "s" : ""}.`, `l’équation a ${nb} solution${nb > 1 ? "s" : ""}.`),
    tableauVar(tb.bornes, tb.signes, tb.valeurs)
  );
}

function genTableauIntervalle() {
  const T = trinome(false, [1, 2, -1, -2]);
  const u = T.h - randomInt(0, 4);
  const w = Math.max(u + 2, T.h + randomInt(-1, 4));
  const mot = rc(["maximum", "minimum"]);
  const cands = [u, w, ...(T.h >= u && T.h <= w ? [T.h] : [])].map((x) => T.f(x));
  const val = mot === "maximum" ? Math.max(...cands) : Math.min(...cands);
  // contrôle par balayage
  let bal = mot === "maximum" ? -Infinity : Infinity;
  for (let i = 0; i <= 400; i++) {
    const y = T.f(u + ((w - u) * i) / 400);
    bal = mot === "maximum" ? Math.max(bal, y) : Math.min(bal, y);
  }
  verifie(Math.abs(bal - val) < 1e-2, "tableau intervalle : extremum faux");
  return court(
    `${intro(T.tex)} On étudie $f$ seulement sur ${ferme(u, w)}. ${rc([`Quel est le ${mot} de $f$ sur cet intervalle ?`, `En dressant le tableau de variations sur ${ferme(u, w)}, quel ${mot} trouve-t-on ?`])}`,
    val,
    expl("sur un intervalle fermé, l’extremum se trouve en un point où $f'$ s’annule ou en une borne.", "on dresse le tableau sur l’intervalle et on compare les valeurs.", `$f'(x) = ${T.fp}$ s’annule en $${n(T.h)}$${T.h >= u && T.h <= w ? "" : " (hors de l’intervalle)"} ; $f(${n(u)}) = ${n(T.f(u))}$, $f(${n(w)}) = ${n(T.f(w))}$${T.h > u && T.h < w ? `, $f(${n(T.h)}) = ${n(T.k)}$` : ""}.`, `le ${mot} vaut $${n(val)}$.`)
  );
}

/* =========================================================
   VAR_EXTREMUM
========================================================= */

function genChangementSigne() {
  const cas = randomInt(1, 4);
  const s1: "+" | "-" = cas === 1 || cas === 3 ? "+" : "-";
  const s2: "+" | "-" = cas === 1 || cas === 4 ? "-" : "+";
  const AUCUN = "elle n’admet pas d’extremum";
  const MAX = "elle admet un maximum local";
  const MIN = "elle admet un minimum local";
  const bon = s1 === s2 ? AUCUN : s1 === "+" ? MAX : MIN;
  const mot = (x: "+" | "-") => (x === "+" ? "positive" : "négative");
  let text: string;
  let canvas: CanvasFigure | undefined;
  let nom = "f";
  const t = randomInt(1, 3);
  if (t === 3) {
    const [desc, F, v] = rc(GRANDEURS);
    nom = F;
    const a = randomInt(1, 9);
    text = `On note $${F}(${v})$ ${desc}. La dérivée $${F}'$ s’annule en $${a}$ : elle est ${mot(s1)} avant et ${mot(s2)} après. Que peut-on dire de $${F}$ en $${v} = ${a}$ ?`;
  } else {
    const a = randomInt(-5, 5);
    if (t === 2) {
      canvas = tableauSig(["−∞", nbC(a), "+∞"], [s1, s2]);
      text = `Voici le tableau de signes de $f'$. Que peut-on dire de $f$ en $x = ${n(a)}$ ?`;
    } else text = `La dérivée $f'$ s’annule en $${n(a)}$ : elle est ${mot(s1)} avant $${n(a)}$ et ${mot(s2)} après. Que peut-on dire de $f$ en $x = ${n(a)}$ ?`;
  }
  return qcm(
    text,
    bon,
    [MAX, MIN, AUCUN].filter((x) => x !== bon),
    expl("un extremum local apparaît là où $f'$ s’annule EN CHANGEANT DE SIGNE.", "+ puis − : la fonction monte puis descend (maximum) ; − puis + : minimum ; même signe : pas d’extremum.", `$${nom}'$ est ${mot(s1)} puis ${mot(s2)}.`, bon === AUCUN ? `$${nom}$ n’admet pas d’extremum en ce point.` : `$${nom}$ ${bon.slice(5)}.`),
    canvas
  );
}

function genAbscisseExtremumTrinome() {
  const T = trinome();
  const mot = T.a > 0 ? "minimum" : "maximum";
  return court(
    `${intro(T.tex)} ${rc([`En quelle valeur de $x$ la fonction $f$ atteint-elle son ${mot} ?`, "Pour quelle valeur de $x$ la fonction $f$ admet-elle un extremum ?", `Donne l’abscisse du point où $f$ atteint son ${mot}.`])}`,
    T.h,
    expl("un extremum est atteint là où $f'$ s’annule en changeant de signe.", "on calcule $f'(x)$ et on résout $f'(x) = 0$.", `$f'(x) = ${T.fp} = 0$ pour $x = ${n(T.h)}$ ; $f'$ change de signe en ce point.`, `le ${mot} est atteint en $x = ${n(T.h)}$.`)
  );
}

function genValeurExtremumTrinome() {
  const T = trinome();
  const mot = T.a > 0 ? "minimum" : "maximum";
  return court(
    `${intro(T.tex)} ${rc([`Quel est le ${mot} de $f$ sur $\\mathbb{R}$ ?`, "Quelle est la valeur de l’extremum de $f$ ?", `Quelle est la ${mot === "minimum" ? "plus petite" : "plus grande"} valeur prise par $f$ ?`])}`,
    T.k,
    expl("l’extremum est la valeur de $f$ au point où $f'$ s’annule en changeant de signe.", "on résout $f'(x) = 0$, puis on calcule l’image.", `$f'(x) = ${T.fp}$ s’annule en $${n(T.h)}$ ; $f(${n(T.h)}) = ${n(T.k)}$.`, `le ${mot} vaut $${n(T.k)}$.`)
  );
}

function genNatureExtremum() {
  const T = trinome(true);
  const mot = T.a > 0 ? "minimum" : "maximum";
  const autre = T.a > 0 ? "maximum" : "minimum";
  const c0 = T.f(0);
  const bon = `un ${mot} égal à $${n(T.k)}$`;
  return qcm(
    `${intro(T.tex)} ${rc([`En $x = ${n(T.h)}$, la fonction $f$ admet :`, "Que peut-on dire de l’extremum de $f$ ?", "Quel est l’extremum de $f$ sur $\\mathbb{R}$ ?"])}`,
    bon,
    [`un ${autre} égal à $${n(T.k)}$`, `un ${mot} égal à $${n(T.h)}$`, `un ${mot} égal à $${n(c0)}$`, `un ${autre} égal à $${n(T.h)}$`],
    expl("on lit l’extremum sur le tableau de variations.", "on calcule $f'(x)$, son zéro et son signe, puis l’image de ce zéro.", `$f'(x) = ${T.fp}$ est ${T.a > 0 ? "négative puis positive" : "positive puis négative"} autour de $${n(T.h)}$, et $f(${n(T.h)}) = ${n(T.k)}$.`, `$f$ admet ${bon}, atteint en $x = ${n(T.h)}$.`)
  );
}

function genExtremumExp(donneFp: boolean) {
  const E = expFamille();
  const mot = E.croissanteADroite ? "minimum" : "maximum";
  return court(
    `${intro(E.tex)} ${donneFp ? `On admet que $f'(x) = ${E.fp}$. ` : ""}${rc([`En quelle valeur de $x$ la fonction $f$ atteint-elle son ${mot} ?`, "Pour quelle valeur de $x$ la fonction $f$ admet-elle un extremum ?"])}`,
    E.x0,
    expl("l’extremum est atteint là où $f'$ s’annule en changeant de signe.", `$${E.ex} > 0$ : $f'$ a le signe de son facteur affine.`, `$f'(x) = ${E.fp}$ s’annule en $${n(E.x0)}$ et change de signe.`, `le ${mot} est atteint en $x = ${n(E.x0)}$.`)
  );
}

function genExtremumCubique(valeur: boolean) {
  const { r, s } = deuxRacines();
  const sens = rc([1, -1] as const);
  const C = cubique(sens, r, s, randomInt(-6, 6));
  const mot = rc(["maximum local", "minimum local"]);
  const x0 = (mot === "maximum local") === sens > 0 ? r : s;
  const donne = randomInt(0, 1) === 1;
  return court(
    `${intro(C.tex)} ${donne ? `On admet que $f'(x) = ${C.fp}$. ` : ""}${valeur ? `Quelle est la valeur du ${mot} de $f$ ?` : `En quelle valeur de $x$ la fonction $f$ admet-elle un ${mot} ?`}`,
    valeur ? C.f(x0) : x0,
    expl("un extremum local est atteint là où $f'$ s’annule en changeant de signe.", "on factorise $f'$ et on dresse le tableau de signes.", `$f'(x) = ${sens > 0 ? "" : "-"}6${facteurX(r)}${facteurX(s)}$ : $f$ est ${sens > 0 ? "croissante, décroissante puis croissante" : "décroissante, croissante puis décroissante"} ; $f(${n(x0)}) = ${n(C.f(x0))}$.`, `le ${mot} ${valeur ? `vaut $${n(C.f(x0))}$` : `est atteint en $x = ${n(x0)}$`}.`)
  );
}

function genExtremumAXplusBsurX(valeur: boolean) {
  const a = rc([1, 2, 3, 4]);
  const x0 = randomInt(1, 6);
  const b = a * x0 * x0;
  const tex = `${a === 1 ? "" : a}x + \\dfrac{${b}}{x}`;
  verifDerivee((x) => a * x + b / x, (x) => a - b / (x * x), "ax+b/x", [0.7, 1.9, 3.3]);
  return court(
    `${intro(tex, "f", "x", "$]0\\,;+\\infty[$")} On admet que $f'(x) = \\dfrac{${poly([[a, 2], [-b, 0]])}}{x^2}$. ${valeur ? "Quel est le minimum de $f$ sur $]0\\,;+\\infty[$ ?" : "En quelle valeur de $x$ la fonction $f$ atteint-elle son minimum ?"}`,
    valeur ? 2 * a * x0 : x0,
    expl("le minimum est atteint là où $f'$ s’annule en changeant de signe.", "$x^2 > 0$ : $f'$ a le signe de son numérateur.", `$${poly([[a, 2], [-b, 0]])} = 0$ pour $x = ${x0}$ (avec $x > 0$) ; négatif avant, positif après. $f(${x0}) = ${n(2 * a * x0)}$.`, valeur ? `le minimum vaut $${n(2 * a * x0)}$.` : `le minimum est atteint en $x = ${x0}$.`)
  );
}

/* =========================================================
   VAR_OPTIMISATION
========================================================= */

const LANCERS = [
  "Une volleyeuse frappe un ballon vers le haut",
  "Des élèves d’un club de sciences lancent une fusée à eau",
  "Un artificier tire une fusée de feu d’artifice",
  "Une joueuse de tennis fait un lob",
  "Un kitesurfeur s’élève au-dessus des vagues",
  "Un plongeur s’élance d’un tremplin",
  "Un jongleur lance une balle",
  "Une basketteuse tire au panier",
  "Un ingénieur teste une catapulte de chantier",
];

function genProjectile(quoi: "instant" | "max") {
  const v = rc([10, 15, 20, 25, 30, 40]);
  const h0 = rc([0, 1, 2, 3, 5]);
  const H: Terme[] = [[-5, 2], [v, 1], [h0, 0]];
  const tmax = v / 10;
  const hmax = h0 + (v * v) / 20;
  verifie(Math.abs(evalP(H, tmax) - hmax) < 1e-9, "projectile");
  const donne = randomInt(0, 1) === 1;
  return court(
    `${rc(LANCERS)}. Sa hauteur (en m) au bout de $t$ secondes est $h(t) = ${poly(H, "t")}$. ${donne ? `On a $h'(t) = ${poly(deriveP(H), "t")}$. ` : ""}${quoi === "instant" ? rc(["À quel instant $t$ (en s) la hauteur est-elle maximale ?", "Au bout de combien de secondes le point le plus haut est-il atteint ?"]) : rc(["Quelle est la hauteur maximale atteinte, en mètres ?", "Quelle hauteur maximale (en m) est atteinte ?"])}`,
    quoi === "instant" ? tmax : hmax,
    expl("la hauteur est maximale là où $h'$ s’annule en passant de positive à négative.", "on dérive, on résout $h'(t) = 0$, puis on calcule $h$ en ce point.", `$h'(t) = ${poly(deriveP(H), "t")} = 0$ pour $t = ${n(tmax)}$ ; $h(${n(tmax)}) = ${n(hmax)}$.`, quoi === "instant" ? `la hauteur est maximale à $t = ${n(tmax)}$ s.` : `la hauteur maximale est $${n(hmax)}$ m.`)
  );
}

const VENTES: Array<[string, string, string]> = [
  ["Un cinéma d’art et d’essai", "une place", "spectateurs"],
  ["Une salle d’escalade", "une entrée", "grimpeurs"],
  ["Un loueur de vélos électriques", "une location", "clients"],
  ["Une plateforme de musique en ligne", "un abonnement", "centaines d’abonnés"],
  ["Un food truck", "un menu", "menus vendus"],
  ["Un club de yoga", "une séance", "participants"],
  ["Une compagnie de théâtre", "une place", "spectateurs"],
  ["Un parc aquatique", "un billet", "centaines de visiteurs"],
  ["Une librairie en ligne", "un livre numérique", "centaines de ventes"],
  ["Un organisateur de concerts", "un billet", "centaines de spectateurs"],
];

function genRecette(quoi: "prix" | "max") {
  const [qui, objet, unite] = rc(VENTES);
  const k = rc([1, 2, 4, 5]);
  const ps = randomInt(3, 20);
  const N = 2 * k * ps;
  const dem = poly([[N, 0], [-k, 1]], "p");
  const Rv: Terme[] = [[N, 1], [-k, 2]];
  verifie(Math.abs(evalP(deriveP(Rv), ps)) < 1e-9, "recette");
  return court(
    `${qui} fixe le prix $p$ (en euros) ${de(objet)}. Une économiste prévoit alors $${dem}$ ${unite}, donc une recette $R(p) = p(${dem})$. ${quoi === "prix" ? rc(["Quel prix rend la recette maximale ?", "Pour quel prix $p$ la recette est-elle la plus grande ?"]) : rc(["Quelle est la recette maximale ?", "Combien vaut la recette au prix optimal ?"])}`,
    quoi === "prix" ? ps : k * ps * ps,
    expl("on cherche le maximum de $R$ grâce au signe de $R'$.", "on développe, on dérive, on résout $R'(p) = 0$.", `$R(p) = ${poly([[N, 1], [-k, 2]], "p")}$, $R'(p) = ${poly(deriveP(Rv), "p")} = 0$ pour $p = ${ps}$ (positive avant, négative après) ; $R(${ps}) = ${n(k * ps * ps)}$.`, quoi === "prix" ? `la recette est maximale pour $p = ${ps}$ euros.` : `la recette maximale vaut $${n(k * ps * ps)}$.`)
  );
}

const ENCLOS: Array<[string, string]> = [
  ["Un éleveur clôture un parc rectangulaire pour ses chèvres, le long d’une rivière", "de grillage"],
  ["Une paysagiste délimite un potager rectangulaire contre un mur", "de bordure"],
  ["Un maître-nageur balise une zone de baignade rectangulaire le long d’une plage", "de ligne de bouées"],
  ["Une agricultrice installe un enclos rectangulaire contre sa grange", "de clôture"],
  ["Un organisateur de festival délimite un espace rectangulaire contre une façade", "de barrières"],
  ["Une architecte dessine une terrasse rectangulaire adossée à une maison", "de garde-corps"],
];

function genEnclos(quoi: "x" | "aire") {
  const [ctx, mat] = rc(ENCLOS);
  const q = randomInt(3, 25);
  const L = 4 * q;
  return court(
    `${ctx}. On dispose de ${L} m ${mat} pour les trois côtés libres. Si $x$ est la largeur (en m), l’aire est $A(x) = x(${poly([[L, 0], [-2, 1]])})$. ${quoi === "x" ? rc(["Quelle largeur $x$ rend l’aire maximale ?", "Pour quelle valeur de $x$ l’aire est-elle la plus grande ?"]) : rc(["Quelle est l’aire maximale, en m² ?", "Quelle aire maximale peut-on obtenir, en m² ?"])}`,
    quoi === "x" ? q : 2 * q * q,
    expl("on cherche le maximum de $A$ grâce au signe de $A'$.", "on développe, on dérive, on résout $A'(x) = 0$.", `$A(x) = ${poly([[L, 1], [-2, 2]])}$, $A'(x) = ${poly([[L, 0], [-4, 1]])} = 0$ pour $x = ${q}$ ; $A(${q}) = ${2 * q * q}$.`, quoi === "x" ? `la largeur optimale est $${q}$ m.` : `l’aire maximale est $${2 * q * q}$ m².`)
  );
}

function genIntervalleEtude() {
  const t = randomInt(1, 3);
  if (t === 1) {
    const [ctx, mat] = rc(ENCLOS);
    const L = 4 * randomInt(3, 25);
    return qcm(
      `${ctx}, avec ${L} m ${mat}. Si $x$ est la largeur (en m), l’aire est $A(x) = x(${poly([[L, 0], [-2, 1]])})$. Sur quel intervalle l’étude a-t-elle un sens ?`,
      ferme(0, L / 2),
      [ferme(0, L), droite(0), R, ferme(0, L / 4)],
      expl("une longueur est positive ou nulle.", "on écrit $x \\ge 0$ et $" + poly([[L, 0], [-2, 1]]) + " \\ge 0$.", `$x \\ge 0$ et $x \\le ${n(L / 2)}$.`, `on étudie $A$ sur ${ferme(0, L / 2)}.`)
    );
  }
  if (t === 2) {
    const [qui, objet, unite] = rc(VENTES);
    const k = rc([1, 2, 4, 5]);
    const N = 2 * k * randomInt(3, 20);
    const dem = poly([[N, 0], [-k, 1]], "p");
    return qcm(
      `${qui} fixe le prix $p$ (en euros) ${de(objet)} ; on prévoit $${dem}$ ${unite}. La recette est $R(p) = p(${dem})$. Sur quel intervalle l’étude a-t-elle un sens ?`,
      ferme(0, N / k),
      [ferme(0, N), droite(0), R, ferme(0, N / (2 * k))],
      expl("un prix et un nombre de clients sont positifs ou nuls.", `on écrit $p \\ge 0$ et $${dem} \\ge 0$.`, `$p \\ge 0$ et $p \\le ${n(N / k)}$.`, `on étudie $R$ sur ${ferme(0, N / k)}.`)
    );
  }
  const L = 6 * randomInt(2, 8);
  return qcm(
    `${rc(FABRICANTS)} découpe un carré de côté $x$ cm à chaque coin d’une plaque carrée de ${L} cm de côté, puis relève les bords. Le volume de la boîte est $V(x) = x(${L} - 2x)^2$. Sur quel intervalle l’étude a-t-elle un sens ?`,
    ferme(0, L / 2),
    [ferme(0, L), droite(0), R, ferme(0, L / 6)],
    expl("une longueur est positive ou nulle.", `on écrit $x \\ge 0$ et $${L} - 2x \\ge 0$.`, `$x \\ge 0$ et $x \\le ${n(L / 2)}$.`, `on étudie $V$ sur ${ferme(0, L / 2)}.`)
  );
}

const FABRICANTS = ["Un fabricant d’emballages", "Une chaudronnière", "Un designer de packaging", "Une élève de lycée professionnel, en atelier,", "Un artisan du carton"];

function genBoite(quoi: "x" | "volume") {
  const q = randomInt(2, 8);
  const L = 6 * q;
  const V = (x: number) => x * (L - 2 * x) ** 2;
  verifDerivee(V, (x) => (L - 2 * x) * (L - 6 * x), "boite");
  return court(
    `${rc(FABRICANTS)} découpe un carré de côté $x$ cm à chaque coin d’une plaque carrée de ${L} cm de côté, puis relève les bords pour former une boîte sans couvercle. Son volume est $V(x) = x(${L} - 2x)^2$ (en cm³), pour $x$ dans $[0\\,;${n(L / 2)}]$. On admet que $V'(x) = (${L} - 2x)(${L} - 6x)$. ${quoi === "x" ? rc(["Pour quelle valeur de $x$ le volume est-il maximal ?", "Quel côté $x$ (en cm) faut-il découper pour un volume maximal ?", "Quelle valeur de $x$ donne la boîte la plus grande ?"]) : rc(["Quel est le volume maximal, en cm³ ?", "Quel volume maximal (en cm³) peut-on obtenir ?", "Combien vaut le plus grand volume possible, en cm³ ?"])}`,
    quoi === "x" ? q : V(q),
    expl("le maximum est atteint là où $V'$ passe de positive à négative.", "on étudie le signe de chaque facteur sur $[0\\,;" + n(L / 2) + "]$.", `$${L} - 2x \\ge 0$ sur l’intervalle ; $${L} - 6x$ s’annule en $x = ${q}$, positif avant, négatif après. $V(${q}) = ${n(V(q))}$.`, quoi === "x" ? `le volume est maximal pour $x = ${q}$ cm.` : `le volume maximal est $${n(V(q))}$ cm³.`)
  );
}

const USINES: Array<[string, string]> = [
  ["une usine de vélos", "centaines de vélos"],
  ["une imprimerie", "milliers de livres"],
  ["une ferme aquacole", "tonnes de poissons"],
  ["un atelier de céramique", "centaines de bols"],
  ["une start-up de drones", "dizaines de drones"],
  ["une fromagerie", "centaines de fromages"],
  ["un fabricant de trottinettes", "centaines de trottinettes"],
  ["une entreprise de panneaux solaires", "centaines de panneaux"],
];

function genCoutMoyen(quoi: "q" | "cout") {
  const [ent, unite] = rc(USINES);
  const a = rc([1, 2, 4, 5]);
  const qs = randomInt(2, 10);
  const c = a * qs * qs;
  const b = randomInt(5, 30);
  const CM = (q: number) => a * q + b + c / q;
  verifDerivee(CM, (q) => a - c / (q * q), "cout moyen", [0.8, 2.2, 5.1]);
  return court(
    `Pour ${ent}, ${rc(["une contrôleuse de gestion", "un ingénieur de production", "une économiste", "un responsable des achats"])} modélise le coût moyen de fabrication par $C_M(q) = ${a === 1 ? "" : a}q + ${b} + \\dfrac{${c}}{q}$ (en euros par unité, $q$ en ${unite}, $q > 0$). ${quoi === "q" ? rc(["Quelle quantité $q$ rend ce coût moyen minimal ?", "Pour quelle production $q$ le coût moyen est-il le plus bas ?"]) : rc(["Quel est le coût moyen minimal ?", "Quel est le plus petit coût moyen possible ?"])}`,
    quoi === "q" ? qs : CM(qs),
    expl("le minimum est atteint là où $C_M'$ passe de négative à positive.", `$C_M'(q) = ${a} - \\dfrac{${c}}{q^2} = \\dfrac{${poly([[a, 2], [-c, 0]], "q")}}{q^2}$.`, `le numérateur s’annule pour $q = ${qs}$ (avec $q > 0$) ; $C_M(${qs}) = ${n(CM(qs))}$.`, quoi === "q" ? `le coût moyen est minimal pour $q = ${qs}$.` : `le coût moyen minimal est $${n(CM(qs))}$ euros par unité.`)
  );
}

const PRODUCTEURS = ["une coopérative laitière", "une brasserie artisanale", "une miellerie", "une scierie", "une entreprise de recyclage", "une ferme maraîchère", "une conserverie", "une distillerie d’huiles essentielles"];

function genBeneficeCubique() {
  const r = rc([1, 2]);
  const s = randomInt(3 * r + 1, 3 * r + 5);
  const d = -randomInt(5, 20);
  const C = cubique(-1, r, s, d);
  const fin = s + 2;
  let best = 0;
  for (let i = 0; i <= 800; i++) {
    const x = (fin * i) / 800;
    if (C.f(x) > C.f(best)) best = x;
  }
  verifie(Math.abs(best - s) < 0.02, "bénéfice cubique : maximum faux");
  return court(
    `${rc(["Le gérant", "La comptable", "L’économiste", "La directrice"])} ${de(rc(PRODUCTEURS))} modélise son bénéfice (en milliers d’euros) par $B(x) = ${poly(C.T)}$, pour $x$ tonnes vendues, avec $x$ dans $[0\\,;${fin}]$. On admet que $B'(x) = -6(x - ${r})(x - ${s})$. ${rc(["Quelle quantité $x$ rend le bénéfice maximal ?", "Combien de tonnes faut-il vendre pour un bénéfice maximal ?", "Pour quelle valeur de $x$ le bénéfice est-il le plus grand ?"])}`,
    s,
    expl("on compare les maximums locaux et les valeurs aux bornes.", "on dresse le tableau de signes de $B'$ sur $[0\\," + `;${fin}]$.`, `$B'$ est négative sur $[0\\,;${r}]$, positive sur $[${r}\\,;${s}]$, négative après. $B(0) = ${n(C.f(0))}$ et $B(${s}) = ${n(C.f(s))}$.`, `le bénéfice est maximal pour $x = ${s}$ tonnes.`)
  );
}

/* =========================================================
   VAR_CONSTANTE
========================================================= */

const CTX_CONST: Array<[string, string, string]> = [
  ["Un thermostat maintient la température $T(t)$ d’une serre (en °C)", "T", "t"],
  ["Un régulateur de vitesse maintient la vitesse $v(t)$ d’un camion (en km/h)", "v", "t"],
  ["Une pompe maintient le niveau $h(t)$ d’un bassin de pisciculture (en cm)", "h", "t"],
  ["Un satellite géostationnaire garde une altitude $z(t)$ (en km)", "z", "t"],
  ["Une perfusion maintient la concentration $C(t)$ d’un médicament (en mg/L)", "C", "t"],
  ["Un climatiseur garde l’humidité $H(t)$ d’un musée (en %)", "H", "t"],
  ["Un abonnement de streaming coûte $P(n)$ euros par mois, quel que soit le nombre $n$ de films vus", "P", "n"],
];

function genValeurConstante() {
  const val = rc([randomInt(2, 90), randomInt(2, 90) + 0.5]);
  const D = randomInt(6, 24);
  const a = randomInt(0, D);
  let c = randomInt(0, D);
  if (c === a) c = (a + 3) % (D + 1);
  if (randomInt(1, 3) === 3) {
    const u = randomInt(-6, 0);
    const w = u + randomInt(5, 10);
    const a2 = randomInt(u, w);
    let c2 = randomInt(u, w);
    if (c2 === a2) c2 = a2 === w ? u : w;
    return court(
      `Sur ${ferme(u, w)}, une fonction $f$ vérifie $f'(x) = 0$ et $f(${n(a2)}) = ${n(val)}$. Combien vaut $f(${n(c2)})$ ?`,
      val,
      expl("une fonction de dérivée nulle sur un intervalle y est constante.", "toutes les images sont égales sur l’intervalle.", `$f(${n(c2)}) = f(${n(a2)})$.`, `$f(${n(c2)}) = ${n(val)}$.`)
    );
  }
  const [ctx, F, v] = rc(CTX_CONST);
  return court(
    `${ctx}. On sait que $${F}'(${v}) = 0$ pour tout $${v}$ de $[0\\,;${D}]$ et que $${F}(${a}) = ${n(val)}$. Combien vaut $${F}(${c})$ ?`,
    val,
    expl("une fonction de dérivée nulle sur un intervalle y est constante.", "toutes les images sont égales sur l’intervalle.", `$${F}(${c}) = ${F}(${a})$.`, `$${F}(${c}) = ${n(val)}$.`)
  );
}

/** Constantes écrites de façons variées : [LaTeX, piège typique]. */
function constanteAuHasard(): [string, string] {
  const p = randomInt(2, 9);
  const q = randomInt(2, 9);
  return rc<[string, string]>([
    [n(randomInt(-20, 20) || 7), "1"],
    [`\\sqrt{${p + 1}}`, `\\dfrac{1}{2\\sqrt{${p + 1}}}`],
    [`${p}\\pi`, "\\pi"],
    [`\\dfrac{${p}}{${q + p}}`, `\\dfrac{1}{${q + p}}`],
    [`e^{${p}}`, `e^{${p}}`],
    [`${p}^2`, `${2 * p}`],
    [`\\pi^2`, "2\\pi"],
  ]);
}

function genDeriveeConstanteQCM() {
  const [K, piege] = constanteAuHasard();
  return qcm(
    rc([`Quelle est la dérivée de la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = ${K}$ ?`, `${intro(K)} Que vaut $f'(x)$ ?`, `Un abonnement coûte $f(x) = ${K}$ euros, quel que soit le nombre $x$ d’heures d’utilisation. Que vaut $f'(x)$ ?`]),
    "$f'(x) = 0$",
    [`$f'(x) = ${piege}$`, `$f'(x) = ${K}$`, "$f'(x) = 1$", `$f'(x) = ${K === "1" ? "" : K === "-1" ? "-" : K}x$`],
    expl("la dérivée d’une fonction constante est nulle.", "on regarde si $f(x)$ dépend de $x$.", `$${K}$ est un nombre fixe : il ne dépend pas de $x$.`, "$f'(x) = 0$.")
  );
}

function genReconnaitreConstante(difficile: boolean) {
  const a = rc([1, 2, 3, 4, 5, -1, -2, -3]);
  const k = randomInt(2, 9);
  if (!difficile) {
    const [K] = constanteAuHasard();
    return qcm(
      rc(["Laquelle de ces fonctions a une dérivée nulle sur $\\mathbb{R}$ ?", `${rc(ETUDES)} cherche une fonction de dérivée nulle sur $\\mathbb{R}$. Laquelle convient ?`, "Quelle fonction est constante sur $\\mathbb{R}$ ?"]),
      `$f(x) = ${K}$`,
      [`$f(x) = ${k}x$`, `$f(x) = ${xPlus(k)}$`, `$f(x) = ${k}x^2$`],
      expl("une fonction de dérivée nulle sur $\\mathbb{R}$ est constante.", "on dérive chaque proposition.", `$(${k}x)' = ${k}$, $(${xPlus(k)})' = 1$, $(${k}x^2)' = ${2 * k}x$, et $(${K})' = 0$.`, `c’est $f(x) = ${K}$.`)
    );
  }
  const bonTex = `(${xPlus(a)})^2 - x^2${plusTerme(-2 * a, "x")}`;
  verifie([0, 1, 2.5, -3].every((x) => Math.abs((x + a) ** 2 - x * x - 2 * a * x - a * a) < 1e-9), "constante difficile");
  return qcm(
    rc(["Laquelle de ces fonctions est constante sur $\\mathbb{R}$ ?", "Laquelle de ces fonctions a une dérivée nulle sur $\\mathbb{R}$ ?", `${rc(ETUDES)} veut savoir laquelle de ces fonctions ne varie pas. Laquelle ?`]),
    `$f(x) = ${bonTex}$`,
    [`$f(x) = (${xPlus(a)})^2 - x^2$`, `$f(x) = (${xPlus(a)})^2${plusTerme(-a * a, "")}$`, `$f(x) = x^2 - (${xPlus(-a)})^2$`],
    expl("une fonction de dérivée nulle sur $\\mathbb{R}$ est constante.", "on développe (ou on dérive) chaque proposition.", `$(${xPlus(a)})^2 - x^2${plusTerme(-2 * a, "x")} = ${n(a * a)}$ : sa dérivée est nulle. Les autres contiennent encore un terme en $x$.`, `c’est $f(x) = ${bonTex}$.`)
  );
}

function simplifiable() {
  const a = rc([1, 2, 3, 4, 5, 6, -1, -2, -3, -4]);
  const b = rc([1, 2, 3, 5, -2, -3, -5]);
  const t = randomInt(1, 5);
  if (t === 1) return { tex: `(${xPlus(a)})^2 - x^2${plusTerme(-2 * a, "x")}`, K: a * a, f: (x: number) => (x + a) ** 2 - x * x - 2 * a * x, a };
  if (t === 2) return { tex: `(${xPlus(a)})(${xPlus(-a)}) - x^2`, K: -a * a, f: (x: number) => (x + a) * (x - a) - x * x, a };
  if (t === 3) return { tex: `(${xPlus(a)})^2 - (${xPlus(-a)})^2${plusTerme(-4 * a, "x")}`, K: 0, f: (x: number) => (x + a) ** 2 - (x - a) ** 2 - 4 * a * x, a };
  if (t === 4) return { tex: `(2x${plusTerme(a, "")})^2 - 4x(${xPlus(a)})`, K: a * a, f: (x: number) => (2 * x + a) ** 2 - 4 * x * (x + a), a };
  return { tex: `(${xPlus(-a)})(${xPlus(b)}) - x^2${plusTerme(a - b, "x")}`, K: -a * b, f: (x: number) => (x - a) * (x + b) - x * x + (a - b) * x, a };
}

function genSimplifieConstante(format: "qcm" | "court") {
  const S = simplifiable();
  verifie([-2, 0, 1.5, 4].every((x) => Math.abs(S.f(x) - S.K) < 1e-9), "simplifiable : constante fausse");
  const ex = expl("une fonction de dérivée nulle sur $\\mathbb{R}$ est constante.", "on développe et on réduit l’expression (ou on dérive).", `en développant, tous les termes en $x$ s’éliminent : $f(x) = ${n(S.K)}$, donc $f'(x) = 0$.`, `$f$ est constante, égale à $${n(S.K)}$.`);
  if (format === "court") {
    const c = randomInt(-9, 9);
    return court(`${intro(S.tex)} ${rc([`Montre que $f'(x) = 0$, puis donne la valeur de $f(${c})$.`, `Calcule $f'(x)$. Combien vaut $f(${c})$ ?`, `Sans calculatrice, que vaut $f(${c})$ ?`])}`, S.K, ex);
  }
  const bon = `$f$ est constante, égale à $${n(S.K)}$`;
  return qcm(
    `${intro(S.tex)} ${rc(["Que peut-on dire de $f$ ?", "En calculant $f'(x)$, que trouve-t-on ?", "Quelle affirmation est juste ?"])}`,
    bon,
    [`$f$ est constante, égale à $${n(S.K === 0 ? S.a * S.a : -S.K)}$`, `$f$ est croissante sur ${R}`, `$f$ est constante, égale à $${n(S.K === 0 ? 2 * S.a : 0)}$`],
    ex
  );
}

const CTX_MEME: Array<[string, boolean]> = [
  ["Deux trains roulent côte à côte, à la même vitesse à chaque instant. Leurs positions $f(t)$ et $g(t)$ (en km) ont donc la même dérivée.", true],
  ["Deux cuves se remplissent avec exactement le même débit. Leurs volumes $f(t)$ et $g(t)$ (en L) ont donc la même dérivée.", true],
  ["Deux plants de tomates poussent exactement à la même vitesse. Leurs hauteurs $f(t)$ et $g(t)$ (en cm) ont donc la même dérivée.", true],
  ["Deux comptes reçoivent les mêmes versements, au même rythme. Leurs soldes $f(t)$ et $g(t)$ (en euros) ont donc la même dérivée.", true],
  ["Deux coureurs d’un relais avancent à la même vitesse à chaque instant. Leurs distances parcourues $f(t)$ et $g(t)$ (en m) ont la même dérivée.", true],
  ["Deux fonctions $f$ et $g$ vérifient $f'(x) = g'(x)$ pour tout réel $x$.", false],
  ["Deux fonctions $f$ et $g$ ont la même dérivée sur $\\mathbb{R}$.", false],
];

function genMemeDerivee() {
  const [ctx, temps] = rc(CTX_MEME);
  const v = temps ? "t" : "x";
  const p = randomInt(2, 40);
  const q = randomInt(2, 40);
  const u = p + randomInt(3, 50);
  const c = randomInt(2, 12);
  const rep = u - p + q;
  return court(
    `${ctx} On sait que $f(0) = ${p}$, $g(0) = ${q}$ et $f(${c}) = ${u}$. ${rc([`Combien vaut $g(${c})$ ?`, `Calcule $g(${c})$.`])}`,
    rep,
    expl(`si $f' = g'$, alors $(f - g)' = 0$ : $f - g$ est constante.`, `on calcule cette constante en $${v} = 0$.`, `$f(0) - g(0) = ${p} - ${q} = ${n(p - q)}$, donc $g(${c}) = f(${c}) - (${n(p - q)}) = ${n(rep)}$.`, `$g(${c}) = ${n(rep)}$.`)
  );
}

const AFFIRMATIONS_CONSTANTE: Array<[string, boolean, string]> = [
  ["Si $f'(x) = 0$ pour tout $x$ d’un intervalle $I$, alors $f$ est constante sur $I$.", true, "c’est le théorème du cours"],
  ["Si $f'(A) = 0$, alors $f$ est constante.", false, "$f(x) = (x - A)^2$ vérifie $f'(A) = 0$ et n’est pas constante"],
  ["Une fonction constante a une dérivée nulle.", true, "la dérivée d’une constante est $0$"],
  ["Si $f$ et $g$ ont la même dérivée sur $I$, alors $f = g$ sur $I$.", false, "$x^2$ et $x^2 + A$ ont la même dérivée mais sont différentes"],
  ["Si $f$ et $g$ ont la même dérivée sur $I$, alors $f - g$ est constante sur $I$.", true, "$(f - g)' = 0$ sur $I$"],
  ["Si $f'(x) = 0$ sur $\\mathbb{R}$, la courbe de $f$ est une droite horizontale.", true, "$f$ est constante, sa courbe est une droite parallèle à l’axe des abscisses"],
  ["Si $f'(x) = 0$ sur un intervalle $I$, alors $f(x) = 0$ sur $I$.", false, "$f(x) = A$ a une dérivée nulle sans être nulle"],
  ["La fonction $f(x) = Ax$ a une dérivée nulle.", false, "$f'(x) = A$, qui n’est pas nul"],
  ["La fonction $f(x) = \\sqrt{A}$ a une dérivée nulle.", true, "$\\sqrt{A}$ est un nombre fixe"],
  ["La fonction $f(x) = e^{A}$ a pour dérivée $e^{A}$.", false, "$e^{A}$ est un nombre fixe : sa dérivée est $0$"],
];

function genVraiFauxConstante() {
  const A = String(randomInt(2, 9));
  const [aff0, vrai, raison0] = rc(AFFIRMATIONS_CONSTANTE);
  const aff = aff0.replace(/A/g, A);
  const raison = raison0.replace(/A/g, A);
  const ex = expl("une fonction est constante sur un INTERVALLE quand sa dérivée y est nulle en tout point.", "on confronte l’affirmation au cours ou à un contre-exemple.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`);
  const t = randomInt(1, 3);
  if (t === 1) return qcm(`Vrai ou faux ? ${aff}`, vrai ? "Vrai" : "Faux", [vrai ? "Faux" : "Vrai"], ex);
  if (t === 2) return qcm(`Un camarade affirme : « ${aff} » A-t-il raison ?`, vrai ? "Oui" : "Non", [vrai ? "Non" : "Oui"], ex);
  return qcm(`${rc(ETUDES)} lit dans un cours : « ${aff} » Cette phrase est-elle juste ?`, vrai ? "Oui, elle est juste" : "Non, elle est fausse", [vrai ? "Non, elle est fausse" : "Oui, elle est juste"], ex);
}

/* =========================================================
   VAR_LECTURE_COURBE
========================================================= */

/** Parabole lisible dans la fenêtre [-6 ; 6] × [-8 ; 8]. */
function paraboleLisible() {
  const a = rc([0.5, 1, -0.5, -1]);
  const h = randomInt(-3, 3);
  const k = a > 0 ? randomInt(-6, 2) : randomInt(-2, 6);
  return { a, h, k, f: (x: number) => a * (x - h) ** 2 + k };
}

/** Cubique lisible : extremums en r et s entiers. */
function cubiqueLisible() {
  const r = randomInt(-3, 1);
  const s = r + rc([2, 3]);
  const alpha = (s - r === 2 ? rc([0.5, 0.75]) : 0.25) * rc([1, -1]);
  const g = (x: number) => alpha * (2 * x ** 3 - 3 * (r + s) * x ** 2 + 6 * r * s * x);
  const beta = Math.round(-(g(r) + g(s)) / 2);
  const f = (x: number) => g(x) + beta;
  const xmin = r - 2;
  const xmax = s + 2;
  return { r, s, f, croitDAbord: alpha > 0, canvas: courbe(f, xmin, xmax, -7, 7) };
}

function genCourbeSens() {
  if (randomInt(0, 1) === 1) {
    const P = paraboleLisible();
    const d = randomInt(1, 3);
    const droiteS = randomInt(0, 1) === 1;
    const I = droiteS ? ferme(P.h, P.h + d) : ferme(P.h - d, P.h);
    const bon: Sens = droiteS === P.a > 0 ? "croissante" : "décroissante";
    return qcm(
      `${rc(["Voici la courbe d’une fonction $f$.", `${rc(ETUDES)} a tracé la courbe de $f$ ci-dessous.`, "On a tracé la courbe de $f$ ci-dessous."])} Sur ${I}, la fonction $f$ est :`,
      bon,
      [autreSens(bon), "constante", bon === "croissante" ? "décroissante puis croissante" : "croissante puis décroissante"],
      expl("une courbe qui monte de gauche à droite = fonction croissante ; qui descend = décroissante.", "on suit la courbe de gauche à droite sur l’intervalle.", `sur ${I}, la courbe ${bon === "croissante" ? "monte" : "descend"}.`, `$f$ est ${bon} sur ${I}.`),
      paraboleCanvas(P.a, P.h, P.k)
    );
  }
  const C = cubiqueLisible();
  const t = randomInt(1, 3);
  const I = t === 1 ? ferme(C.r - 1, C.r) : t === 2 ? ferme(C.r, C.s) : ferme(C.s, C.s + 1);
  const monte = t === 2 ? !C.croitDAbord : C.croitDAbord;
  const bon: Sens = monte ? "croissante" : "décroissante";
  return qcm(
    `${rc(["Voici la courbe d’une fonction $f$.", `${rc(ETUDES)} a tracé la courbe de $f$ ci-dessous.`])} Sur ${I}, la fonction $f$ est :`,
    bon,
    [autreSens(bon), "constante", monte ? "décroissante puis croissante" : "croissante puis décroissante"],
    expl("une courbe qui monte de gauche à droite = fonction croissante ; qui descend = décroissante.", "on suit la courbe de gauche à droite sur l’intervalle.", `sur ${I}, la courbe ${monte ? "monte" : "descend"}.`, `$f$ est ${bon} sur ${I}.`),
    C.canvas
  );
}

function genCourbeSigneDerivee() {
  const C = cubiqueLisible();
  const t = randomInt(1, 3);
  const I = t === 1 ? ouvert(C.r - 1, C.r) : t === 2 ? ouvert(C.r, C.s) : ouvert(C.s, C.s + 1);
  const monte = t === 2 ? !C.croitDAbord : C.croitDAbord;
  const bon = monte ? "positif" : "négatif";
  return qcm(
    `${rc(["Voici la courbe d’une fonction $f$.", `${rc(ETUDES)} a tracé la courbe de $f$ ci-dessous.`, "Observe la courbe de $f$."])} ${rc([`Sur ${I}, le signe de $f'(x)$ est :`, `Pour $x$ dans ${I}, $f'(x)$ est :`])}`,
    bon,
    [monte ? "négatif" : "positif", "nul", "positif puis négatif"],
    expl("$f' > 0$ là où la courbe monte, $f' < 0$ là où elle descend.", "on lit le sens de variation, pas la position de la courbe par rapport à l’axe.", `sur ${I}, la courbe ${monte ? "monte" : "descend"}.`, `$f'(x)$ est ${bon} sur ${I}.`),
    C.canvas
  );
}

function genLireExtremumCourbe() {
  const P = paraboleLisible();
  const mot = P.a > 0 ? "minimum" : "maximum";
  const valeur = randomInt(0, 1) === 1;
  return court(
    `${rc(["Voici la courbe d’une fonction $f$ ; son sommet est le point S.", `${rc(ETUDES)} a tracé la courbe de $f$ (sommet S).`, "La parabole ci-dessous représente $f$ ; S est son sommet."])} ${valeur ? rc([`Quel est le ${mot} de $f$ ?`, `Lis la valeur du ${mot} de $f$.`]) : rc([`En quelle valeur de $x$ le ${mot} de $f$ est-il atteint ?`, `Lis l’abscisse du point où $f$ atteint son ${mot}.`])}`,
    valeur ? P.k : P.h,
    expl("l’extremum se lit au sommet : son abscisse dit OÙ, son ordonnée dit COMBIEN.", "on lit les coordonnées de S sur le quadrillage.", `S a pour coordonnées $(${n(P.h)}\\,;${n(P.k)})$.`, valeur ? `le ${mot} vaut $${n(P.k)}$.` : `le ${mot} est atteint en $x = ${n(P.h)}$.`),
    paraboleCanvas(P.a, P.h, P.k)
  );
}

function genSigneDeriveeEnPoint() {
  const C = cubiqueLisible();
  const t = randomInt(1, 4);
  const c = t === 1 ? C.r - 1 : t === 2 ? rc([C.r, C.s]) : t === 3 ? C.s + 1 : C.r + 1;
  const monte = c < C.r || c > C.s ? C.croitDAbord : !C.croitDAbord;
  const bon = t === 2 ? `$f'(${n(c)}) = 0$` : monte ? `$f'(${n(c)}) > 0$` : `$f'(${n(c)}) < 0$`;
  return qcm(
    `${rc(["Voici la courbe d’une fonction $f$.", `${rc(ETUDES)} a tracé la courbe de $f$ ci-dessous.`])} ${rc([`Que peut-on dire de $f'(${n(c)})$ ?`, `Quel est le signe du nombre dérivé $f'(${n(c)})$ ?`])}`,
    bon,
    [`$f'(${n(c)}) > 0$`, `$f'(${n(c)}) < 0$`, `$f'(${n(c)}) = 0$`, "On ne peut pas le savoir sans la formule"],
    expl("$f'(c)$ est la pente de la tangente au point d’abscisse $c$.", "tangente qui monte : $f'(c) > 0$ ; qui descend : $f'(c) < 0$ ; horizontale : $f'(c) = 0$.", t === 2 ? `en $x = ${n(c)}$, la courbe a un sommet : la tangente est horizontale.` : `en $x = ${n(c)}$, la courbe ${monte ? "monte" : "descend"}.`, `${bon}.`),
    C.canvas
  );
}

function genNbTangentesHoriz() {
  const t = randomInt(1, 4);
  let canvas: CanvasFigure;
  let nb: number;
  let raison: string;
  if (t === 1) {
    canvas = cubiqueLisible().canvas;
    nb = 2;
    raison = "la courbe a deux sommets : une bosse et un creux";
  } else if (t === 2) {
    const a = rc([0.15, 0.25]) * rc([1, -1]);
    const b = randomInt(-2, 2);
    const p = rc([0.5, 1]) * Math.sign(a);
    canvas = courbe((x) => a * x ** 3 + p * x + b, -4, 4, -7, 7);
    nb = 0;
    raison = "la courbe ne change jamais de sens : elle n’a aucun sommet ni palier";
  } else if (t === 3) {
    const h = randomInt(-2, 2);
    const b = randomInt(-2, 2);
    const a = rc([0.3, 0.5, -0.3, -0.5]);
    canvas = courbe((x) => a * (x - h) ** 3 + b, h - 4, h + 4, -7, 7);
    nb = 1;
    raison = "la courbe marque un palier (comme $x^3$ en 0) : la tangente y est horizontale, sans extremum";
  } else {
    const P = paraboleLisible();
    canvas = paraboleCanvas(P.a, P.h, P.k, false);
    nb = 1;
    raison = "la parabole a un seul sommet";
  }
  return court(
    `${rc(["Voici la courbe d’une fonction $f$.", `${rc(ETUDES)} a tracé la courbe de $f$ ci-dessous.`, "On a tracé la courbe de $f$ sur l’intervalle affiché."])} ${rc(["En combien de points la tangente est-elle horizontale ?", "Combien de solutions l’équation $f'(x) = 0$ a-t-elle sur l’intervalle affiché ?"])}`,
    nb,
    expl("la tangente est horizontale là où $f'(x) = 0$ : aux sommets et aux paliers.", "on compte les sommets (bosses, creux) et les paliers de la courbe.", `${raison}.`, `il y a ${nb} point${nb > 1 ? "s" : ""} à tangente horizontale.`),
    canvas
  );
}

function courbeDeriveeCanvas(a: number, r: number, s: number): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    titre: "courbe de la dérivée f ′",
    size: { width: 320, height: 260 },
    xmin: -6,
    xmax: 6,
    ymin: -8,
    ymax: 8,
    grille: true,
    courbes: [{ id: "fprime", type: "quadratique", a, b: -a * (r + s), c: a * r * s, couleur: "#2563eb" }],
    misesEnEvidence: [
      { point: { x: r, y: 0, label: nbC(r), couleur: "#dc2626" } },
      { point: { x: s, y: 0, label: nbC(s), couleur: "#dc2626" } },
    ],
  } as CanvasFigure;
}

function genCourbeDerivee(mode: "extremum" | "intervalle") {
  const r = randomInt(-4, 2);
  const s = r + randomInt(2, 4);
  const a = rc([0.5, 1, -0.5, -1]);
  const intro0 = rc(["ATTENTION : la courbe tracée est celle de la DÉRIVÉE $f'$.", `${rc(ETUDES)} a tracé la courbe de la dérivée $f'$ (et non de $f$).`, "Voici la courbe de $f'$, la dérivée d’une fonction $f$.", "Un capteur donne la vitesse $f'$ d’un mobile (courbe ci-dessous) ; $f$ est sa position."]);
  const ex = expl("$f$ croît là où $f'$ est positive (courbe de $f'$ au-dessus de l’axe), décroît là où elle est négative.", "sur la courbe de $f'$, on lit le SIGNE : au-dessus ou au-dessous de l’axe des abscisses.", `$f'$ est ${a > 0 ? "positive, négative entre" : "négative, positive entre"} $${n(r)}$ et $${n(s)}$, puis ${a > 0 ? "positive" : "négative"}.`, a > 0 ? `$f$ est croissante, décroissante sur $[${n(r)}\\,;${n(s)}]$, puis croissante.` : `$f$ est décroissante, croissante sur $[${n(r)}\\,;${n(s)}]$, puis décroissante.`);
  if (mode === "extremum") {
    const mot = rc(["maximum local", "minimum local"]);
    const x0 = (mot === "maximum local") === a > 0 ? r : s;
    return court(`${intro0} ${rc([`En quelle valeur de $x$ la fonction $f$ admet-elle un ${mot} ?`, `Lis l’abscisse du ${mot} de $f$.`, `Pour quelle valeur de $x$ la fonction $f$ atteint-elle un ${mot} ?`])}`, x0, ex, courbeDeriveeCanvas(a, r, s));
  }
  const demande: Sens = rc(["croissante", "décroissante"]);
  const entre = (demande === "décroissante") === a > 0;
  const bon = entre ? ferme(r, s) : deuxCotes(r, s);
  return qcm(`${intro0} ${rc([`Sur quel(s) intervalle(s) la fonction $f$ est-elle ${demande} ?`, `Où la fonction $f$ est-elle ${demande} ?`])}`, bon, [entre ? deuxCotes(r, s) : ferme(r, s), R, entre ? droite(s) : gauche(r)], ex, courbeDeriveeCanvas(a, r, s));
}

function genSigneVsVariations() {
  for (let essai = 0; essai < 60; essai++) {
    const P = paraboleLisible();
    const droiteS = randomInt(0, 1) === 1;
    const d = randomInt(1, 3);
    const off = randomInt(0, 2);
    const u = droiteS ? P.h + off : P.h - off - d;
    const w = u + d;
    const vals = Array.from({ length: 41 }, (_, i) => P.f(u + (d * i) / 40));
    if (vals.some((y) => Math.abs(y) < 1e-9) || !(vals.every((y) => y > 0) || vals.every((y) => y < 0))) continue;
    if (Math.abs(P.f(u)) > 8 || Math.abs(P.f(w)) > 8) continue;
    const signe = vals[0] > 0 ? "positive" : "négative";
    const sens: Sens = droiteS === P.a > 0 ? "croissante" : "décroissante";
    const bon = `${signe} et ${sens}`;
    const autreSigne = signe === "positive" ? "négative" : "positive";
    return qcm(
      `${rc(["Voici la courbe d’une fonction $f$.", `${rc(ETUDES)} a tracé la courbe de $f$ ci-dessous.`, "Observe la courbe de $f$."])} ${rc([`Sur ${ferme(u, w)}, la fonction $f$ est :`, `Que peut-on dire du signe et des variations de $f$ sur ${ferme(u, w)} ?`])}`,
      bon,
      [`${autreSigne} et ${sens}`, `${signe} et ${autreSens(sens)}`, `${autreSigne} et ${autreSens(sens)}`],
      expl("le SIGNE se lit par rapport à l’axe des abscisses ; les VARIATIONS se lisent en suivant la courbe de gauche à droite.", "on répond aux deux questions séparément.", `sur ${ferme(u, w)}, la courbe est ${signe === "positive" ? "au-dessus" : "au-dessous"} de l’axe et elle ${sens === "croissante" ? "monte" : "descend"}.`, `$f$ est ${bon}.`),
      paraboleCanvas(P.a, P.h, P.k, false)
    );
  }
  return genCourbeSens();
}

/* =========================================================
   VAR_EXTREMUM_TANGENTE
========================================================= */

function genTangenteHorizTrinome() {
  const T = trinome();
  return court(
    `${intro(T.tex)} ${rc(["En quelle abscisse la tangente à la courbe de $f$ est-elle horizontale ?", "Pour quelle valeur de $x$ a-t-on $f'(x) = 0$ ?", "En quel point la courbe de $f$ a-t-elle une tangente parallèle à l’axe des abscisses ? Donne son abscisse."])}`,
    T.h,
    expl("la tangente au point d’abscisse $a$ est horizontale quand $f'(a) = 0$.", "on dérive et on résout $f'(x) = 0$.", `$f'(x) = ${T.fp} = 0$ pour $x = ${n(T.h)}$.`, `la tangente est horizontale en $x = ${n(T.h)}$ (c’est le sommet).`)
  );
}

function genEquationTangenteExtremum(cub: boolean) {
  let h: number, k: number, enonce: string;
  if (cub) {
    const { r, s } = deuxRacines();
    const C = cubique(rc([1, -1] as const), r, s, randomInt(-6, 6));
    h = rc([r, s]);
    k = C.f(h);
    enonce = `${intro(C.tex)} On a $f'(x) = ${C.fp}$, et $f'(${n(h)}) = 0$.`;
  } else if (randomInt(0, 1) === 1) {
    const T = trinome(true);
    h = T.h;
    k = T.k;
    enonce = `${intro(T.tex)} On a $f'(${n(h)}) = 0$.`;
  } else {
    h = randomInt(-6, 6) || 2;
    k = randomInt(-9, 9);
    enonce = `${rc(["Une fonction dérivable $f$", `${rc(ETUDES)} trouve qu’une fonction $f$`])} admet un ${rc(["minimum", "maximum"])} égal à $${n(k)}$, atteint en $x = ${n(h)}$.`;
  }
  const bon = `$y = ${n(k)}$`;
  return qcm(
    `${enonce} Quelle est l’équation de la tangente à la courbe de $f$ au point d’abscisse $${n(h)}$ ?`,
    bon,
    [`$x = ${n(h)}$`, `$y = ${n(h)}$`, "$y = 0$", `$y = ${k === 0 ? "" : k === 1 ? "" : k === -1 ? "-" : n(k)}x$`],
    expl("la tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.", "ici $f'(a) = 0$ : la tangente est horizontale.", `$f'(${n(h)}) = 0$ et $f(${n(h)}) = ${n(k)}$.`, `la tangente a pour équation $y = ${n(k)}$.`)
  );
}

function genTangentesHorizCubique() {
  const { r, s } = deuxRacines();
  const C = cubique(rc([1, -1] as const), r, s, randomInt(-6, 6));
  const paire = (a: number, b: number) => {
    const [p, q] = [a, b].sort((x, y) => x - y);
    return p === q ? `seulement en $x = ${n(p)}$` : `en $x = ${n(p)}$ et en $x = ${n(q)}$`;
  };
  const bon = paire(r, s);
  return qcm(
    `${intro(C.tex)} ${rc(["En quelles abscisses la tangente à la courbe de $f$ est-elle horizontale ?", "Pour quelles valeurs de $x$ a-t-on $f'(x) = 0$ ?"])}`,
    bon,
    [paire(-r, -s), "seulement en $x = 0$", `seulement en $x = ${n(r + s)}$`, paire(r + 1, s + 1)],
    expl("tangente horizontale ⟺ $f'(x) = 0$.", "on dérive, puis on résout l’équation du second degré.", `$f'(x) = ${C.fp}$ ; en divisant par $${6 * C.sens}$ : $${poly([[1, 2], [-(r + s), 1], [r * s, 0]])} = 0$, de racines $${n(r)}$ et $${n(s)}$.`, `la tangente est horizontale ${bon}.`)
  );
}

function genPalier() {
  const t = randomInt(1, 4);
  const a = randomInt(-3, 3);
  const b = randomInt(-6, 6);
  const cube = a === 0 ? "x^3" : `(${xPlus(-a)})^3`;
  const carre = a === 0 ? "x^2" : `(${xPlus(-a)})^2`;
  const NON = "Non : $f'$ s’annule sans changer de signe";
  const MIN = "Oui, un minimum local : $f'$ change de signe";
  const MAX = "Oui, un maximum local : $f'$ change de signe";
  const SUFFIT = "Oui, car $f'(a) = 0$ suffit";
  let tex: string, fp: string, bon: string, raison: string;
  if (t === 1) {
    tex = `${cube}${plusTerme(b, "")}`;
    fp = `3${carre}`;
    bon = NON;
    raison = `$f'(x) = 3${carre} \\ge 0$ : elle s’annule en $${n(a)}$ mais reste positive`;
  } else if (t === 2) {
    tex = `-${cube}${plusTerme(b, "")}`;
    fp = `-3${carre}`;
    bon = NON;
    raison = `$f'(x) = -3${carre} \\le 0$ : elle s’annule en $${n(a)}$ mais reste négative`;
  } else if (t === 3) {
    tex = `${carre}${plusTerme(b, "")}`;
    fp = a === 0 ? "2x" : `2(${xPlus(-a)})`;
    bon = MIN;
    raison = `$f'(x) = ${fp}$ est négative avant $${n(a)}$, positive après`;
  } else {
    tex = `-${carre}${plusTerme(b, "")}`;
    fp = a === 0 ? "-2x" : `-2(${xPlus(-a)})`;
    bon = MAX;
    raison = `$f'(x) = ${fp}$ est positive avant $${n(a)}$, négative après`;
  }
  return qcm(
    `${intro(tex)} On a $f'(x) = ${fp}$, donc $f'(${n(a)}) = 0$. ${rc([`La fonction $f$ admet-elle un extremum en $${n(a)}$ ?`, `Y a-t-il un extremum en $x = ${n(a)}$ ?`])}`.replace("f'(a)", `f'(${n(a)})`),
    bon,
    [NON, MIN, MAX, SUFFIT.replace("f'(a)", `f'(${n(a)})`)].filter((x) => x !== bon),
    expl("un extremum local exige que $f'$ s’annule EN CHANGEANT DE SIGNE ; $f'(a) = 0$ seul ne suffit pas.", "on étudie le signe de $f'$ autour du point.", `${raison}.`, `${bon}.`)
  );
}

const AFFIRMATIONS_EXTREMUM: Array<[string, boolean, string]> = [
  ["Si $f$ admet un maximum local en $A$ (à l’intérieur de l’intervalle), alors $f'(A) = 0$.", true, "en un extremum intérieur, la tangente est horizontale"],
  ["Si $f'(A) = 0$, alors $f$ admet un extremum en $A$.", false, "$f(x) = (x - A)^3$ vérifie $f'(A) = 0$ sans extremum"],
  ["En un extremum local intérieur, la tangente est horizontale.", true, "c’est la propriété du cours : $f'(a) = 0$"],
  ["Si $f'$ s’annule en $A$ en changeant de signe, $f$ admet un extremum en $A$.", true, "c’est la condition qui permet de conclure"],
  ["La fonction cube admet un extremum en $0$.", false, "$(x^3)' = 3x^2$ s’annule en $0$ sans changer de signe"],
  ["Une tangente horizontale signale toujours un maximum.", false, "elle peut signaler un minimum, ou un palier comme pour $x^3$"],
  ["Si $f'$ passe de négative à positive en $A$, alors $f(A)$ est un minimum local.", true, "$f$ descend puis remonte"],
  ["Si $f$ admet un minimum en $A$ (intérieur), la tangente en $A$ a pour équation $y = f(A)$.", true, "$f'(A) = 0$, donc $y = 0 \\times (x - A) + f(A)$"],
  ["La tangente en un extremum local a pour équation $x = A$.", false, "elle est horizontale : $y = f(A)$, pas verticale"],
  ["Si $f'(x) > 0$ pour tout réel $x$, alors $f$ n’a aucun extremum local.", true, "$f'$ ne s’annule jamais"],
];

function genVraiFauxExtremum() {
  const A = String(randomInt(1, 9));
  const [aff0, vrai, raison0] = rc(AFFIRMATIONS_EXTREMUM);
  const aff = aff0.replace(/A/g, A);
  const raison = raison0.replace(/A/g, A);
  const ex = expl("extremum local intérieur ⟹ $f'(a) = 0$ ; la réciproque est fausse : il faut un changement de signe de $f'$.", "on confronte l’affirmation au cours ou à un contre-exemple.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`);
  const t = randomInt(1, 3);
  if (t === 1) return qcm(`Vrai ou faux ? ${aff}`, vrai ? "Vrai" : "Faux", [vrai ? "Faux" : "Vrai"], ex);
  if (t === 2) return qcm(`Une camarade affirme : « ${aff} » A-t-elle raison ?`, vrai ? "Oui" : "Non", [vrai ? "Non" : "Oui"], ex);
  return qcm(`${rc(ETUDES)} lit dans un cours : « ${aff} » Cette phrase est-elle juste ?`, vrai ? "Oui, elle est juste" : "Non, elle est fausse", [vrai ? "Non, elle est fausse" : "Oui, elle est juste"], ex);
}

function genNbExtremumsCubique() {
  const t = randomInt(1, 3);
  let tex: string, fp: string, nb: number, raison: string;
  if (t === 1) {
    const { r, s } = deuxRacines();
    const C = cubique(rc([1, -1] as const), r, s, randomInt(-6, 6));
    tex = C.tex;
    fp = C.fp;
    nb = 2;
    raison = `$f'$ s’annule en $${n(r)}$ et en $${n(s)}$ en changeant de signe`;
  } else if (t === 2) {
    const a = rc([1, 2, -1]);
    const p = randomInt(1, 9) * Math.sign(a);
    const T: Terme[] = [[a, 3], [p, 1], [randomInt(-5, 5), 0]];
    tex = poly(T);
    fp = poly(deriveP(T));
    nb = 0;
    raison = `$f'(x) = ${fp}$ garde le même signe sur $\\mathbb{R}$ : elle ne s’annule jamais`;
  } else {
    const a = randomInt(-3, 3);
    const b = randomInt(-5, 5);
    tex = `${a === 0 ? "x^3" : `(${xPlus(-a)})^3`}${plusTerme(b, "")}`;
    fp = `3${a === 0 ? "x^2" : `(${xPlus(-a)})^2`}`;
    nb = 0;
    raison = `$f'(x) = ${fp}$ s’annule en $${n(a)}$ sans changer de signe`;
  }
  return court(
    `${intro(tex)} On a $f'(x) = ${fp}$. ${rc(["Combien d’extremums locaux la fonction $f$ admet-elle sur $\\mathbb{R}$ ?", "Combien de points de la courbe sont des sommets (maximum ou minimum local) ?"])}`,
    nb,
    expl("un extremum local = un zéro de $f'$ où elle CHANGE de signe.", "on étudie le signe de $f'$.", `${raison}.`, nb === 0 ? "$f$ n’admet aucun extremum local." : `$f$ admet ${nb} extremums locaux.`)
  );
}

/* =========================================================
   VAR_INEGALITE
========================================================= */

const COMPARAISONS = [
  "Pour comparer deux forfaits téléphoniques",
  "Pour comparer deux trajectoires de drones",
  "Pour comparer deux modèles de croissance d’une plante",
  "Pour vérifier qu’un câble reste au-dessus d’une route",
  "Pour comparer deux coûts de production",
  "Pour comparer deux profils de piste de ski",
  "Pour comparer la consommation de deux moteurs",
  "Pour vérifier qu’une poutre reste au-dessus d’une canalisation",
  "Pour comparer deux doses de médicament",
  "Pour comparer deux plans d’épargne",
];

function differenceTrinome(k: number) {
  const t = randomInt(-4, 4);
  const a = rc([1, 2]);
  const m = randomInt(-5, 5);
  const r = randomInt(-6, 6);
  const F: Terme[] = [[a, 2], [m - 2 * a * t, 1], [r + a * t * t + k, 0]];
  const G: Terme[] = [[m, 1], [r, 0]];
  const H: Terme[] = [[a, 2], [-2 * a * t, 1], [a * t * t + k, 0]];
  verifie(Math.abs(evalP(F, t) - evalP(G, t) - k) < 1e-9 && Math.abs(evalP(deriveP(H), t)) < 1e-9, "différence trinôme");
  return { t, a, F, G, H };
}

function genMinDiff() {
  const k = randomInt(1, 9) * rc([1, 1, -1]);
  const D = differenceTrinome(k);
  return court(
    `${rc(COMPARAISONS)}, on compare $f(x) = ${poly(D.F)}$ et $g(x) = ${poly(D.G)}$. On pose $h(x) = f(x) - g(x)$. ${rc(["Quel est le minimum de $h$ sur $\\mathbb{R}$ ?", "En étudiant les variations de $h$, quel minimum trouve-t-on ?"])}`,
    k,
    expl("pour comparer $f$ et $g$, on étudie le signe de $h = f - g$ grâce à son minimum.", "on calcule $h(x)$, puis $h'(x)$, et on cherche où $h'$ s’annule.", `$h(x) = ${poly(D.H)}$, $h'(x) = ${poly(deriveP(D.H))}$ s’annule en $${n(D.t)}$ ; $h(${n(D.t)}) = ${n(k)}$.`, `le minimum de $h$ vaut $${n(k)}$${k > 0 ? " : donc $f(x) > g(x)$ pour tout $x$" : ""}.`)
  );
}

function genConclusionIneg() {
  const k = rc([randomInt(1, 9), 0, -randomInt(1, 9), randomInt(1, 5) + 0.5]);
  const t = randomInt(-5, 5);
  const SUP = "$f(x) > g(x)$ pour tout réel $x$";
  const SUPEG = "$f(x) \\ge g(x)$ pour tout réel $x$";
  const INF = "$f(x) < g(x)$ pour tout réel $x$";
  const PARFOIS = "$f(x) < g(x)$ pour au moins une valeur de $x$";
  let bon: string, pieges: string[];
  if (k > 0) {
    bon = SUP;
    pieges = [INF, PARFOIS, `$f(x) > g(x)$ seulement pour $x > ${n(t)}$`];
  } else if (k === 0) {
    bon = SUPEG;
    pieges = [SUP, INF, PARFOIS];
  } else {
    bon = PARFOIS;
    pieges = [SUP, SUPEG, `$f(x) = g(x)$ seulement en $x = ${n(t)}$`];
  }
  return qcm(
    `${rc(COMPARAISONS)}, on étudie $h(x) = f(x) - g(x)$ sur $\\mathbb{R}$. Son tableau de variations montre que $h$ admet un minimum égal à $${n(k)}$, atteint en $x = ${n(t)}$. ${rc(["Que peut-on conclure ?", "Quelle conclusion est juste ?"])}`,
    bon,
    pieges,
    expl("si le minimum de $h = f - g$ est positif, alors $h(x) \\ge$ ce minimum pour tout $x$.", "on regarde le signe du minimum.", k > 0 ? `$h(x) \\ge ${n(k)} > 0$ pour tout $x$.` : k === 0 ? `$h(x) \\ge 0$, avec égalité en $x = ${n(t)}$.` : `$h(${n(t)}) = ${n(k)} < 0$.`, `${bon}.`)
  );
}

function genMinTrinomeIneg() {
  const a = rc([1, 2, 3]);
  const h = randomInt(-5, 5);
  const k = randomInt(1, 9);
  const T: Terme[] = [[a, 2], [-2 * a * h, 1], [a * h * h + k, 0]];
  return court(
    `${rc([`Pour démontrer que $${poly(T)} > 0$ pour tout réel $x$, on étudie`, `${rc(ETUDES)} veut démontrer que $${poly(T)} > 0$ pour tout réel $x$. On étudie`])} $f(x) = ${poly(T)}$. ${rc(["Quel est le minimum de $f$ ?", "Quelle est la plus petite valeur prise par $f$ ?"])}`,
    k,
    expl("si le minimum de $f$ est strictement positif, alors $f(x) > 0$ pour tout $x$.", "on dérive, on cherche le zéro de $f'$, on calcule l’image.", `$f'(x) = ${poly(deriveP(T))}$ s’annule en $${n(h)}$ (négative avant, positive après) ; $f(${n(h)}) = ${n(k)}$.`, `le minimum vaut $${n(k)} > 0$ : l’inégalité est démontrée.`)
  );
}

function genIneqExp(format: "qcm" | "court") {
  const c = rc([-3, -2, -1, 0, 0.5, 1, 1, 1.5, 2, 3, 4]);
  if (format === "court") {
    return court(
      `${rc(["On compare $e^x$ et", `${rc(ETUDES)} compare $e^x$ et`])} $${xPlus(c)}$. On pose $h(x) = e^x - x${plusTerme(-c, "")}$, avec $h'(x) = e^x - 1$. Quel est le minimum de $h$ sur $\\mathbb{R}$ ?`,
      1 - c,
      expl("on étudie le signe de $h$ grâce à son minimum.", "$h'(x) = e^x - 1$ est négative pour $x < 0$, positive pour $x > 0$.", `le minimum est $h(0) = 1 - 0${plusTerme(-c, "")} = ${n(1 - c)}$.`, `le minimum de $h$ vaut $${n(1 - c)}$.`)
    );
  }
  const vrai = c <= 1;
  const bon = vrai ? "Oui, pour tout réel $x$" : "Non : elle est fausse en $x = 0$";
  return qcm(
    `L’inégalité $e^x \\ge ${xPlus(c)}$ est-elle vraie pour tout réel $x$ ? (Indice : étudie $h(x) = e^x - x${plusTerme(-c, "")}$, avec $h'(x) = e^x - 1$.)`,
    bon,
    [vrai ? "Non : elle est fausse en $x = 0$" : "Oui, pour tout réel $x$", "Oui, mais seulement pour $x \\ge 0$", "Non : elle est fausse pour tout réel $x$"],
    expl("l’inégalité est vraie partout si et seulement si le minimum de $h$ est positif ou nul.", "$h'(x) = e^x - 1$ s’annule en $0$ : $h$ décroît puis croît.", `le minimum est $h(0) = ${n(1 - c)}$, ${vrai ? "positif ou nul" : "négatif"}.`, `${bon}.`)
  );
}

function genIneqCubique() {
  const t = rc([1, 2, 3]);
  const v = randomInt(-5, 10);
  const c = 2 * t ** 3 + v;
  const H: Terme[] = [[1, 3], [-3 * t * t, 1], [c, 0]];
  verifie(Math.abs(evalP(H, t) - v) < 1e-9, "inégalité cubique");
  return court(
    `${rc(COMPARAISONS)}, on compare $f(x) = ${poly([[1, 3], [c, 0]])}$ et $g(x) = ${poly([[3 * t * t, 1]])}$ sur $[0\\,;+\\infty[$. On pose $h(x) = f(x) - g(x)$, avec $h'(x) = 3x^2 - ${3 * t * t}$. Quel est le minimum de $h$ sur $[0\\,;+\\infty[$ ?`,
    v,
    expl("on étudie le signe de $h = f - g$ grâce à son minimum.", "on cherche où $h'$ s’annule sur $[0\\,;+\\infty[$.", `$h'(x) = 3(x - ${t})(x + ${t})$ : négative sur $[0\\,;${t}]$, positive après. Minimum : $h(${t}) = ${n(v)}$.`, `le minimum de $h$ vaut $${n(v)}$${v > 0 ? " : donc $f(x) > g(x)$ sur $[0\\,;+\\infty[$" : ""}.`)
  );
}

function genIneqQuotient() {
  const a = rc([1, 2, 3, 4]);
  const x0 = randomInt(1, 6);
  const b = a * x0 * x0;
  const tex = `${a === 1 ? "" : a}x + \\dfrac{${b}}{x}`;
  return court(
    `${rc(["On veut démontrer une inégalité du type", `${rc(ETUDES)} veut démontrer une inégalité du type`])} $${tex} \\ge m$ pour tout $x > 0$. On admet que la dérivée de $f(x) = ${tex}$ est $f'(x) = \\dfrac{${poly([[a, 2], [-b, 0]])}}{x^2}$. Quelle est la plus grande valeur possible de $m$ ?`,
    2 * a * x0,
    expl("la meilleure valeur de $m$ est le minimum de $f$ sur $]0\\,;+\\infty[$.", "$x^2 > 0$ : $f'$ a le signe de son numérateur.", `le numérateur s’annule en $x = ${x0}$ (négatif avant, positif après) ; $f(${x0}) = ${n(2 * a * x0)}$.`, `$m = ${n(2 * a * x0)}$.`)
  );
}

/* =========================================================
   VAR_POSITION_RELATIVE
========================================================= */

function genPosParabDroite(donneFacto: boolean) {
  const u = randomInt(-5, 2);
  const v = u + randomInt(1, 5);
  const a = rc([1, -1, 2]);
  const m = randomInt(-5, 5);
  const r = randomInt(-6, 6);
  const F: Terme[] = [[a, 2], [m - a * (u + v), 1], [r + a * u * v, 0]];
  const G: Terme[] = [[m, 1], [r, 0]];
  verifie(Math.abs(evalP(F, u) - evalP(G, u)) < 1e-9 && Math.abs(evalP(F, v) - evalP(G, v)) < 1e-9, "position parabole droite");
  const demande = rc(["au-dessus", "au-dessous"]);
  const dehors = (demande === "au-dessus") === a > 0;
  const bon = dehors ? horsOuvert(u, v) : ouvert(u, v);
  const facto = `${a === 1 ? "" : a === -1 ? "-" : a}${facteurX(u)}${facteurX(v)}`;
  return qcm(
    `${rc(COMPARAISONS)}, on compare $f(x) = ${poly(F)}$ et $g(x) = ${poly(G)}$. ${donneFacto ? `On a $f(x) - g(x) = ${facto}$. ` : ""}Sur quel ensemble la courbe de $f$ est-elle strictement ${demande} de celle de $g$ ?`,
    bon,
    [dehors ? ouvert(u, v) : horsOuvert(u, v), dehors ? horsOuvert(-v, -u) : ouvert(-v, -u), R, "nulle part"],
    expl("la courbe de $f$ est au-dessus de celle de $g$ là où $f(x) - g(x) > 0$.", "on étudie le signe de $f(x) - g(x)$ (un trinôme : signe de $a$ à l’extérieur des racines).", `$f(x) - g(x) = ${facto}$, de racines $${n(u)}$ et $${n(v)}$, ${a > 0 ? "positif" : "négatif"} à l’extérieur.`, `la courbe de $f$ est ${demande} sur ${bon}.`)
  );
}

function genNbIntersections() {
  const signe = randomInt(1, 3);
  const a = rc([1, -1, 2]);
  const kAbs = randomInt(1, 9);
  const k = signe === 1 ? Math.sign(a) * kAbs : signe === 2 ? 0 : -Math.sign(a) * kAbs;
  const nb = signe === 1 ? 0 : signe === 2 ? 1 : 2;
  const t = randomInt(-4, 4);
  const m = randomInt(-5, 5);
  const r = randomInt(-6, 6);
  const F: Terme[] = [[a, 2], [m - 2 * a * t, 1], [r + a * t * t + k, 0]];
  const G: Terme[] = [[m, 1], [r, 0]];
  const H: Terme[] = [[a, 2], [-2 * a * t, 1], [a * t * t + k, 0]];
  const delta = (2 * a * t) ** 2 - 4 * a * (a * t * t + k);
  verifie((delta > 0 ? 2 : delta === 0 ? 1 : 0) === nb, "intersections");
  return court(
    `${rc(COMPARAISONS)}, on trace les courbes de $f(x) = ${poly(F)}$ et $g(x) = ${poly(G)}$. ${rc(["En combien de points ces courbes se coupent-elles ?", "Combien de solutions l’équation $f(x) = g(x)$ a-t-elle ?"])}`,
    nb,
    expl("les points communs ont pour abscisses les solutions de $f(x) - g(x) = 0$.", "on calcule $f(x) - g(x)$ et son discriminant.", `$f(x) - g(x) = ${poly(H)}$ ; $\\Delta = ${n(delta)}$.`, `${nb} point${nb > 1 ? "s" : ""} d’intersection.`)
  );
}

const PAIRES = [
  ["deux forfaits téléphoniques : $f(x)$ et $g(x)$ sont leurs prix (en euros) pour $x$ heures d’appel", "x"],
  ["deux trajectoires de drones : $f(x)$ et $g(x)$ sont leurs altitudes (en m)", "x"],
  ["deux modèles de croissance : $f(x)$ et $g(x)$ sont des tailles prévues (en cm)", "x"],
  ["deux courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$", "x"],
  ["deux profils de rampe de skate, de hauteurs $f(x)$ et $g(x)$ (en m)", "x"],
];

function genSignePosition() {
  const [desc] = rc(PAIRES);
  const I = intervalleAuHasard();
  const neg = randomInt(0, 1) === 1;
  const bon = neg ? "la courbe de $f$ est au-dessous de celle de $g$" : "la courbe de $f$ est au-dessus de celle de $g$";
  return qcm(
    `On étudie ${desc}. On sait que $f(x) - g(x) ${neg ? "<" : ">"} 0$ pour tout $x$ de ${I}. Sur ${I} :`,
    bon,
    [neg ? "la courbe de $f$ est au-dessus de celle de $g$" : "la courbe de $f$ est au-dessous de celle de $g$", "les deux courbes se coupent", neg ? "$f$ est décroissante" : "$f$ est croissante"],
    expl("$f(x) - g(x) > 0$ ⟺ $f(x) > g(x)$ ⟺ la courbe de $f$ est au-dessus.", "on lit le signe de la différence, pas le sens de variation.", `$f(x) ${neg ? "<" : ">"} g(x)$ sur ${I}.`, `${bon}.`)
  );
}

function genPosTangente() {
  const T = trinome();
  const x0 = randomInt(-3, 3);
  const p = T.fpf(x0);
  const q = T.f(x0) - p * x0;
  verifie([-2, 0.5, 3].every((x) => Math.abs(T.f(x) - (p * x + q) - T.a * (x - x0) ** 2) < 1e-9), "position tangente");
  const bon = T.a > 0 ? "au-dessus de $\\Delta$, et la touche en un seul point" : "au-dessous de $\\Delta$, et la touche en un seul point";
  return qcm(
    `${intro(T.tex)} Sa tangente au point d’abscisse $${n(x0)}$ est la droite $\\Delta : y = ${poly([[p, 1], [q, 0]])}$. Quelle est la position de la courbe de $f$ par rapport à $\\Delta$ ?`,
    bon,
    [T.a > 0 ? "au-dessous de $\\Delta$, et la touche en un seul point" : "au-dessus de $\\Delta$, et la touche en un seul point", `au-dessus de $\\Delta$ pour $x < ${n(x0)}$, au-dessous ensuite`, "elle coupe $\\Delta$ en deux points"],
    expl(`on étudie le signe de $f(x) - (${poly([[p, 1], [q, 0]])})$.`, "on réduit la différence et on la factorise.", `$f(x) - (${poly([[p, 1], [q, 0]])}) = ${T.a === 1 ? "" : T.a === -1 ? "-" : n(T.a)}${x0 === 0 ? "x^2" : `(${xPlus(-x0)})^2`}$, ${T.a > 0 ? "positif" : "négatif"} et nul seulement en $${n(x0)}$.`, `la courbe est ${bon}.`)
  );
}

function genPosExp() {
  const c = rc([-2, -1, 0, 0.5, 1, 1, 1.5, 2, 3]);
  const nb = c < 1 ? 0 : c === 1 ? 1 : 2;
  const moins = randomInt(0, 1) === 1;
  const ex = moins ? "e^{-x}" : "e^x";
  const g = moins ? poly([[-1, 1], [c, 0]]) : xPlus(c);
  const h = moins ? `e^{-x} + x${plusTerme(-c, "")}` : `e^x - x${plusTerme(-c, "")}`;
  return court(
    `${rc(COMPARAISONS)}, on compare $f(x) = ${ex}$ et $g(x) = ${g}$. On pose $h(x) = ${h}$, qui admet un minimum en $x = 0$. En combien de points les courbes de $f$ et $g$ se coupent-elles ?`,
    nb,
    expl("les points communs correspondent aux zéros de $h = f - g$.", "on regarde le minimum de $h$ : $h$ décroît puis croît, et tend vers $+\\infty$ des deux côtés.", `$h(0) = ${n(1 - c)}$ : ${nb === 0 ? "le minimum est positif, $h$ ne s’annule pas" : nb === 1 ? "le minimum est nul, $h$ s’annule une seule fois" : "le minimum est négatif, $h$ s’annule deux fois"}.`, `${nb} point${nb > 1 ? "s" : ""} commun${nb > 1 ? "s" : ""}.`)
  );
}

function genPosCubique() {
  const t = randomInt(1, 4);
  const c = randomInt(-5, 5);
  const cas = randomInt(1, 4);
  const I = cas === 1 ? ouvert(0, t) : cas === 2 ? `$]${t}\\,;+\\infty[$` : cas === 3 ? ouvert(-t, 0) : `$]-\\infty\\,;${-t}[$`;
  const dessus = cas === 2 || cas === 3;
  const bon = dessus ? "au-dessus de celle de $g$" : "au-dessous de celle de $g$";
  return qcm(
    `${rc(COMPARAISONS)}, on compare $f(x) = ${poly([[1, 3], [c, 0]])}$ et $g(x) = ${poly([[t * t, 1], [c, 0]])}$. On a $f(x) - g(x) = x(${xPlus(-t)})(${xPlus(t)})$. Sur ${I}, la courbe de $f$ est :`,
    bon,
    [dessus ? "au-dessous de celle de $g$" : "au-dessus de celle de $g$", "confondue avec celle de $g$", "tantôt au-dessus, tantôt au-dessous"],
    expl("la courbe de $f$ est au-dessus de celle de $g$ là où $f(x) - g(x) > 0$.", "tableau de signes des trois facteurs $x$, $x - " + t + "$ et $x + " + t + "$.", `sur ${I}, le produit est ${dessus ? "positif" : "négatif"}.`, `la courbe de $f$ est ${bon}.`)
  );
}

/* =========================================================
   VAR_SECOND_DEGRE
========================================================= */

function genDeriveeTrinome() {
  const a = rc([1, 2, 3, 4, 5, -1, -2, -3, -4]);
  const b = randomInt(-9, 9) || 4;
  let c = randomInt(-9, 9);
  if (c === b) c += 1;
  const T: Terme[] = [[a, 2], [b, 1], [c, 0]];
  const bon = `$${poly([[2 * a, 1], [b, 0]])}$`;
  return qcm(
    `${intro(poly(T))} ${rc(["Quelle est sa dérivée $f'(x)$ ?", "Que vaut $f'(x)$ ?", "En dérivant, on obtient :"])}`,
    bon,
    [`$${poly([[a, 1], [b, 0]])}$`, `$${poly([[2 * a, 1]])}$`, `$${poly([[2 * a, 2], [b, 1]])}$`, `$${poly([[2 * a, 1], [c, 0]])}$`],
    expl("$(ax^2 + bx + c)' = 2ax + b$.", "on dérive terme à terme ; la constante disparaît.", `$(${poly([[a, 2]])})' = ${poly([[2 * a, 1]])}$, $(${poly([[b, 1]])})' = ${n(b)}$, $(${n(c)})' = 0$.`, `$f'(x) = ${poly([[2 * a, 1], [b, 0]])}$.`)
  );
}

function genSensSelonA() {
  const T = trinome(true);
  const dc = (h: number) => `décroissante sur ${gauche(h)}, puis croissante sur ${droite(h)}`;
  const cd = (h: number) => `croissante sur ${gauche(h)}, puis décroissante sur ${droite(h)}`;
  const bon = T.a > 0 ? dc(T.h) : cd(T.h);
  return qcm(
    `${intro(T.tex)} ${rc(["Quel est son sens de variation ?", "Que donne l’étude de sa dérivée ?", "La fonction $f$ est :"])}`,
    bon,
    [T.a > 0 ? cd(T.h) : dc(T.h), T.a > 0 ? dc(-T.h) : cd(-T.h), `croissante sur ${R}`],
    expl("pour un trinôme, $f'(x) = 2ax + b$ s’annule en $-\\dfrac{b}{2a}$.", "le signe de $a$ donne l’ordre des variations.", `$f'(x) = ${T.fp}$ s’annule en $${n(T.h)}$ ; $a = ${n(T.a)}$ est ${T.a > 0 ? "positif" : "négatif"}.`, `$f$ est ${bon}.`)
  );
}

function genSommetAbscisse() {
  const T = trinome();
  return court(
    `${intro(T.tex)} ${rc(["Quelle est l’abscisse du sommet de sa parabole ?", "En quelle valeur $f'(x)$ s’annule-t-elle ?", "Quelle est l’abscisse de l’extremum de $f$ ?"])}`,
    T.h,
    expl("l’abscisse du sommet annule la dérivée : $x = -\\dfrac{b}{2a}$.", "on calcule $f'(x)$ et on résout $f'(x) = 0$.", `$f'(x) = ${T.fp} = 0$ pour $x = ${n(T.h)}$.`, `l’abscisse du sommet est $${n(T.h)}$.`)
  );
}

function genSommetValeur() {
  const T = trinome();
  return court(
    `${intro(T.tex)} ${rc(["Quelle est l’ordonnée du sommet de sa parabole ?", `Quel est l’extremum de $f$ (un ${T.a > 0 ? "minimum" : "maximum"}) ?`, "Calcule la valeur de $f$ au sommet."])}`,
    T.k,
    expl("le sommet a pour abscisse le zéro de $f'$, et pour ordonnée son image.", "on résout $f'(x) = 0$ puis on calcule $f$ en ce point.", `$f'(x) = ${T.fp}$ s’annule en $${n(T.h)}$ ; $f(${n(T.h)}) = ${n(T.k)}$.`, `l’ordonnée du sommet est $${n(T.k)}$.`)
  );
}

function genFormeFactorisee() {
  const r = randomInt(-6, 3);
  const s = r + randomInt(1, 6);
  const a = rc([1, 2, -1, -2]);
  const xs = (r + s) / 2;
  const val = -a * ((s - r) ** 2) / 4;
  const f = (x: number) => a * (x - r) * (x - s);
  verifie(Math.abs(f(xs) - val) < 1e-9, "forme factorisée");
  const tex = `${a === 1 ? "" : a === -1 ? "-" : a}${facteurX(r)}${facteurX(s)}`;
  const valeur = randomInt(0, 1) === 1;
  return court(
    `${intro(tex)} ${valeur ? `Quel est l’extremum de $f$ (un ${a > 0 ? "minimum" : "maximum"}) ?` : "En quelle valeur de $x$ la fonction $f$ atteint-elle son extremum ?"}`,
    valeur ? val : xs,
    expl("le sommet d’une parabole est au milieu de ses deux racines.", "on développe et on dérive, ou on prend le milieu des racines.", `$f'(x) = ${poly([[2 * a, 1], [-a * (r + s), 0]])}$ s’annule en $${n(xs)}$, milieu de $${n(r)}$ et $${n(s)}$ ; $f(${n(xs)}) = ${n(val)}$.`, valeur ? `l’extremum vaut $${n(val)}$.` : `l’extremum est atteint en $x = ${n(xs)}$.`)
  );
}

const ENTREPRISES: Array<[string, string]> = [
  ["Un producteur de fraises", "centaines de barquettes"],
  ["Une agence de voyages", "dizaines de séjours"],
  ["Un atelier de réparation de vélos", "dizaines de réparations"],
  ["Une société de covoiturage", "centaines de trajets"],
  ["Une entreprise de cosmétiques bio", "centaines de flacons"],
  ["Un studio de jeux vidéo", "milliers de licences"],
  ["Une ferme d’algues", "tonnes"],
  ["Un traiteur", "dizaines de repas"],
];

function genTrinomeContexte() {
  const [ent, unite] = rc(ENTREPRISES);
  const a = rc([1, 2, 5]);
  const xs = randomInt(5, 30);
  const c = -randomInt(10, a * xs * xs - 10);
  const B: Terme[] = [[-a, 2], [2 * a * xs, 1], [c, 0]];
  const Bmax = a * xs * xs + c;
  verifie(Math.abs(evalP(B, xs) - Bmax) < 1e-9, "bénéfice trinôme");
  const valeur = randomInt(0, 1) === 1;
  return court(
    `${ent} modélise son bénéfice (en euros) par $B(x) = ${poly(B)}$, pour $x$ ${unite}. ${valeur ? "Quel est le bénéfice maximal ?" : "Quelle quantité $x$ rend le bénéfice maximal ?"}`,
    valeur ? Bmax : xs,
    expl("le maximum d’un trinôme avec $a < 0$ est atteint là où sa dérivée s’annule.", "on dérive et on résout $B'(x) = 0$.", `$B'(x) = ${poly(deriveP(B))} = 0$ pour $x = ${xs}$ ; $B(${xs}) = ${n(Bmax)}$.`, valeur ? `le bénéfice maximal est $${n(Bmax)}$ euros.` : `le bénéfice est maximal pour $x = ${xs}$.`)
  );
}

/* ---------- Gabarits et fusion ---------- */

function tpl(microId: string, difficulty: number, rang: number, generate: () => TutorGeneratedQuestionV4, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `premiere_var_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["premiere", "maths", "variations", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_SIGNE = "f' > 0 : f croissante ; f' < 0 : f décroissante.";
const H_TAB = "Chaque « + » de f' donne une flèche qui monte, chaque « − » une flèche qui descend.";
const H_EXT = "Extremum : f' s’annule EN CHANGEANT DE SIGNE.";
const H_OPT = "On dérive, on résout f'(x) = 0, on vérifie le changement de signe.";
const H_CST = "Dérivée nulle sur un intervalle ⟺ fonction constante sur cet intervalle.";
const H_COURBE = "La courbe monte : f' > 0. Elle descend : f' < 0. Sommet : f' = 0.";
const H_TAN = "Tangente horizontale ⟺ f'(a) = 0.";
const H_INEG = "Pour comparer f et g, on étudie le minimum de h = f − g.";
const H_POS = "Courbe de f au-dessus de celle de g ⟺ f(x) − g(x) > 0.";
const H_SD = "Pour ax² + bx + c : f'(x) = 2ax + b, qui s’annule en −b/(2a).";

type Ligne = [string, number, () => TutorGeneratedQuestionV4, string];

const LIGNES: Ligne[] = [
  ["var_signe_derivee", 2, genSigneDonne, H_SIGNE],
  ["var_signe_derivee", 2, genAffineSens, H_SIGNE],
  ["var_signe_derivee", 2, genSensVersSigne, H_SIGNE],
  ["var_signe_derivee", 3, () => genDeriveeAffineIntervalle(true), H_SIGNE],
  ["var_signe_derivee", 3, genDeriveePositive, H_SIGNE],
  ["var_signe_derivee", 3, genSensVersSigne, H_SIGNE],
  ["var_signe_derivee", 4, () => genSensCubique(true), H_SIGNE],
  ["var_signe_derivee", 4, () => genSensExp(true), H_SIGNE],
  ["var_signe_derivee", 4, genDeriveePositive, H_SIGNE],
  ["var_signe_derivee", 5, () => genSensCubique(false), H_SIGNE],
  ["var_signe_derivee", 5, () => genSensExp(false), H_SIGNE],
  ["var_signe_derivee", 5, genQuotientSens, H_SIGNE],

  ["var_tableau", 2, genTableauLireSens, H_TAB],
  ["var_tableau", 2, genSignesVersVariations, H_TAB],
  ["var_tableau", 2, genTableauLireMax, H_TAB],
  ["var_tableau", 3, () => genTableauTrinomeValeur(true), H_TAB],
  ["var_tableau", 3, genTableauForme, H_TAB],
  ["var_tableau", 3, genSignesVersVariations, H_TAB],
  ["var_tableau", 4, genTableauCubiqueSignes, H_TAB],
  ["var_tableau", 4, genTableauComparer, H_TAB],
  ["var_tableau", 4, () => genTableauTrinomeValeur(false), H_TAB],
  ["var_tableau", 5, genTableauNbSolutions, H_TAB],
  ["var_tableau", 5, genTableauIntervalle, H_TAB],
  ["var_tableau", 5, genTableauCubiqueValeur, H_TAB],

  ["var_extremum", 2, genChangementSigne, H_EXT],
  ["var_extremum", 2, genTableauLireMax, H_EXT],
  ["var_extremum", 2, genLireExtremumCourbe, H_EXT],
  ["var_extremum", 3, genAbscisseExtremumTrinome, H_EXT],
  ["var_extremum", 3, genChangementSigne, H_EXT],
  ["var_extremum", 3, genNatureExtremum, H_EXT],
  ["var_extremum", 4, genValeurExtremumTrinome, H_EXT],
  ["var_extremum", 4, () => genExtremumExp(true), H_EXT],
  ["var_extremum", 4, genNatureExtremum, H_EXT],
  ["var_extremum", 5, () => genExtremumCubique(randomInt(0, 1) === 1), H_EXT],
  ["var_extremum", 5, () => genExtremumAXplusBsurX(randomInt(0, 1) === 1), H_EXT],
  ["var_extremum", 5, () => genExtremumExp(false), H_EXT],

  ["var_optimisation", 3, () => genProjectile("instant"), H_OPT],
  ["var_optimisation", 3, () => genRecette("prix"), H_OPT],
  ["var_optimisation", 3, () => genEnclos("x"), H_OPT],
  ["var_optimisation", 4, () => genProjectile("max"), H_OPT],
  ["var_optimisation", 4, () => genRecette("max"), H_OPT],
  ["var_optimisation", 4, () => genEnclos("aire"), H_OPT],
  ["var_optimisation", 4, genIntervalleEtude, "Une longueur, un prix, une quantité sont positifs ou nuls."],
  ["var_optimisation", 5, () => genBoite(randomInt(0, 1) === 1 ? "x" : "volume"), H_OPT],
  ["var_optimisation", 5, () => genCoutMoyen(randomInt(0, 1) === 1 ? "q" : "cout"), H_OPT],
  ["var_optimisation", 5, genBeneficeCubique, H_OPT],
  ["var_optimisation", 5, genIntervalleEtude, "Une longueur, un prix, une quantité sont positifs ou nuls."],

  ["var_constante", 3, genValeurConstante, H_CST],
  ["var_constante", 3, genDeriveeConstanteQCM, H_CST],
  ["var_constante", 3, () => genReconnaitreConstante(false), H_CST],
  ["var_constante", 4, () => genSimplifieConstante("qcm"), H_CST],
  ["var_constante", 4, genMemeDerivee, "Si f' = g', alors f − g est constante."],
  ["var_constante", 4, genVraiFauxConstante, H_CST],
  ["var_constante", 4, genValeurConstante, H_CST],
  ["var_constante", 5, () => genSimplifieConstante("court"), H_CST],
  ["var_constante", 5, genMemeDerivee, "Si f' = g', alors f − g est constante."],
  ["var_constante", 5, genVraiFauxConstante, H_CST],
  ["var_constante", 5, () => genReconnaitreConstante(true), H_CST],

  ["var_lecture_courbe", 2, genCourbeSens, H_COURBE],
  ["var_lecture_courbe", 2, genCourbeSigneDerivee, H_COURBE],
  ["var_lecture_courbe", 2, genLireExtremumCourbe, H_COURBE],
  ["var_lecture_courbe", 4, genLireExtremumCourbe, H_COURBE],
  ["var_lecture_courbe", 4, genSigneDeriveeEnPoint, H_COURBE],
  ["var_lecture_courbe", 4, genNbTangentesHoriz, H_COURBE],
  ["var_lecture_courbe", 5, () => genCourbeDerivee("extremum"), "Sur la courbe de f', on lit le SIGNE (au-dessus ou au-dessous de l’axe)."],
  ["var_lecture_courbe", 5, genSigneVsVariations, "Signe : position par rapport à l’axe. Variations : la courbe monte ou descend."],
  ["var_lecture_courbe", 5, () => genCourbeDerivee("intervalle"), "Sur la courbe de f', on lit le SIGNE (au-dessus ou au-dessous de l’axe)."],

  ["var_extremum_tangente", 4, genTangenteHorizTrinome, H_TAN],
  ["var_extremum_tangente", 4, () => genEquationTangenteExtremum(false), H_TAN],
  ["var_extremum_tangente", 4, genTangentesHorizCubique, H_TAN],
  ["var_extremum_tangente", 5, genPalier, H_EXT],
  ["var_extremum_tangente", 5, genVraiFauxExtremum, H_EXT],
  ["var_extremum_tangente", 5, genNbExtremumsCubique, H_EXT],
  ["var_extremum_tangente", 5, () => genEquationTangenteExtremum(true), H_TAN],

  ["var_inegalite", 4, genMinDiff, H_INEG],
  ["var_inegalite", 4, genConclusionIneg, H_INEG],
  ["var_inegalite", 4, genMinTrinomeIneg, H_INEG],
  ["var_inegalite", 5, () => genIneqExp(randomInt(0, 1) === 1 ? "qcm" : "court"), H_INEG],
  ["var_inegalite", 5, genIneqCubique, H_INEG],
  ["var_inegalite", 5, genIneqQuotient, H_INEG],
  ["var_inegalite", 5, genConclusionIneg, H_INEG],

  ["var_position_relative", 4, () => genPosParabDroite(true), H_POS],
  ["var_position_relative", 4, genNbIntersections, H_POS],
  ["var_position_relative", 4, genSignePosition, H_POS],
  ["var_position_relative", 5, genPosTangente, H_POS],
  ["var_position_relative", 5, genPosExp, H_POS],
  ["var_position_relative", 5, genPosCubique, H_POS],
  ["var_position_relative", 5, () => genPosParabDroite(false), H_POS],

  ["var_second_degre", 3, genDeriveeTrinome, H_SD],
  ["var_second_degre", 3, genSensSelonA, H_SD],
  ["var_second_degre", 3, genSommetAbscisse, H_SD],
  ["var_second_degre", 4, genSommetAbscisse, H_SD],
  ["var_second_degre", 4, genSensSelonA, H_SD],
  ["var_second_degre", 4, () => genDeriveeAffineIntervalle(false), H_SD],
  ["var_second_degre", 5, genSommetValeur, H_SD],
  ["var_second_degre", 5, genFormeFactorisee, H_SD],
  ["var_second_degre", 5, genTrinomeContexte, H_SD],
];

export const renfortVariations: TutorBankItemV4[] = (() => {
  const rangs = new Map<string, number>();
  return LIGNES.map(([micro, d, g, h]) => {
    const cle = `${micro}_${d}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    return tpl(micro, d, r, g, h);
  });
})();
